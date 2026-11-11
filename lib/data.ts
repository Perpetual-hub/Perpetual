// The only module that reads /data. Pages call these functions, never the seed
// files directly, so a database or CMS can replace the files later without
// touching any page.
//
// Every seed file is validated with zod when this module first loads. Because
// pages are prerendered during `next build`, a broken record fails the build
// with a message naming the file, record and field.
import { z } from "zod";
import { deals as rawDeals } from "@/data/deals";
import { DATA_AS_OF, DATA_VERSION, changelog } from "@/data/meta";
import { projects as rawProjects } from "@/data/projects";
import { research as rawResearch } from "@/data/research";
import { PIPELINE_STATUSES, matchesFilters, regionSlug, type ProjectFilters } from "./filters";
import { DEAL_TYPE_LABEL, countryName, daysBetween, formatDate } from "./format";
import type { Milestone, MilestoneKind } from "./milestones";
import * as S from "./schema";
import type {
  Deal,
  Ownership,
  Project,
  ProjectStatus,
  ResearchItem,
  Technology,
} from "./types";

function validate<T>(file: string, schema: z.ZodType<T>, rows: unknown[]): T[] {
  const errors: string[] = [];
  const out = rows.map((row, i) => {
    const r = schema.safeParse(row);
    if (!r.success) {
      const id = (row as { id?: string })?.id ?? `#${i}`;
      for (const issue of r.error.issues) {
        errors.push(`  ${file} › ${id} › ${issue.path.join(".") || "(record)"}: ${issue.message}`);
      }
    }
    return row as T;
  });
  if (errors.length) {
    throw new Error(`\n\nPerpetual seed data failed validation:\n${errors.join("\n")}\n`);
  }
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const row of out as { id: string; slug: string }[]) {
    if (ids.has(row.id)) throw new Error(`${file}: duplicate id "${row.id}"`);
    if (slugs.has(row.slug)) throw new Error(`${file}: duplicate slug "${row.slug}"`);
    ids.add(row.id);
    slugs.add(row.slug);
  }
  return out;
}

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);

const projects = validate("data/projects.ts", S.project, rawProjects);
const deals = validate("data/deals.ts", S.deal, rawDeals).sort(byDateDesc);
const research = validate("data/research.ts", S.researchItem, rawResearch).sort(byDateDesc);

// Cross-file reference checks.
{
  const projectIds = new Set(projects.map((p) => p.id));
  const bad: string[] = [];
  for (const d of deals)
    for (const id of d.projectIds ?? []) if (!projectIds.has(id)) bad.push(`deals › ${d.id} › unknown project ${id}`);
  if (bad.length) throw new Error(`\n\nPerpetual seed data has broken references:\n  ${bad.join("\n  ")}\n`);
}

export { DATA_AS_OF, DATA_VERSION, changelog };

// ---------- Projects ----------

export type { ProjectFilters };

export function getProjects(filters: ProjectFilters = {}): Project[] {
  return projects.filter((p) => matchesFilters(toMapPoint(p), filters));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/** A trimmed-down project shape for the map, so we ship less data to the browser. */
export interface MapPoint {
  id: string;
  slug: string;
  name: string;
  technology: Technology;
  capacityMW: number;
  storageMWh?: number;
  country: string;
  region: string;
  status: ProjectStatus;
  lat: number;
  lng: number;
  isSample: boolean;
  subType?: string;
  ownership: Ownership;
  developer?: string;
  cod?: string;
  codConfidence?: "confirmed" | "estimated";
  admin1?: string;
  instruments?: string[];
  /** The most recent confirmed milestone on or before the dataset date. */
  milestone?: Milestone;
}


/** Latest confirmed milestone up to the dataset date (estimated dates never count). */
export function latestMilestone(p: Project, asOf = DATA_AS_OF): Milestone | undefined {
  const c: [MilestoneKind, Project["dates"]["announced"]][] = [
    ["announced", p.dates.announced],
    ["permits", p.dates.permits],
    ["financing", p.financing?.financialClose],
    ["construction", p.dates.construction],
    ["operating", p.dates.cod],
  ];
  return c
    .filter(([, v]) => v && v.confidence === "confirmed" && v.date <= asOf)
    .map(([kind, v]) => ({ kind, date: v!.date }))
    .sort((a, b) => b.date.localeCompare(a.date))[0];
}

export function toMapPoint(p: Project): MapPoint {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    technology: p.technology,
    capacityMW: p.capacityMW ?? 0,
    storageMWh: p.storageMWh,
    country: p.country,
    region: p.region,
    status: p.status,
    lat: p.lat,
    lng: p.lng,
    isSample: p.isSample,
    subType: p.subType,
    ownership: p.ownership,
    developer: p.developer?.[0]?.name,
    cod: p.dates.cod?.date,
    codConfidence: p.dates.cod?.confidence,
    admin1: p.admin1,
    instruments: p.financing?.instruments,
    milestone: latestMilestone(p),
  };
}

export function getMapPoints(filters?: ProjectFilters): MapPoint[] {
  return getProjects(filters).map(toMapPoint);
}

/** Projects that reached a confirmed milestone in the `days` before the dataset date. */
export function getRecentMilestonePoints(days = 30): MapPoint[] {
  return projects
    .map(toMapPoint)
    .filter((p) => p.milestone && daysBetween(p.milestone.date, DATA_AS_OF) <= days)
    .sort((a, b) => b.milestone!.date.localeCompare(a.milestone!.date));
}

// ---------- Deals and research ----------

export function getDeals(): Deal[] {
  return deals;
}
export function getDeal(slug: string): Deal | undefined {
  return deals.find((d) => d.slug === slug);
}
export function getResearch(): ResearchItem[] {
  return research;
}
export function getResearchItem(slug: string): ResearchItem | undefined {
  return research.find((r) => r.slug === slug);
}

export function getLatest(n: number) {
  return { deals: deals.slice(0, n), research: research.slice(0, n) };
}

export function getFeaturedDeal(): Deal {
  return deals.find((d) => d.featured) ?? deals[0];
}

export function getDealsForProject(id: string): Deal[] {
  return deals.filter((d) => d.projectIds?.includes(id));
}

// ---------- Stats ----------

export interface Stats {
  projects: number;
  totalMW: number;
  operatingMW: number;
  pipelineMW: number;
  dealsLast30Days: number;
}

export function getStats(tech?: Technology): Stats {
  const list = tech ? projects.filter((p) => p.technology === tech) : projects;
  const sum = (xs: Project[]) => xs.reduce((s, p) => s + (p.capacityMW ?? 0), 0);
  const dealList = tech ? deals.filter((d) => d.technologies.includes(tech)) : deals;
  return {
    projects: list.length,
    totalMW: sum(list),
    operatingMW: sum(list.filter((p) => p.status === "operating")),
    pipelineMW: sum(list.filter((p) => PIPELINE_STATUSES.includes(p.status))),
    dealsLast30Days: dealList.filter((d) => {
      const age = daysBetween(d.date, DATA_AS_OF);
      return age >= 0 && age <= 30;
    }).length,
  };
}

export function getTechCounts(): Record<Technology, { projects: number; totalMW: number }> {
  const out = {} as Record<Technology, { projects: number; totalMW: number }>;
  for (const t of S.technology.options) out[t] = { projects: 0, totalMW: 0 };
  for (const p of projects) {
    out[p.technology].projects += 1;
    out[p.technology].totalMW += p.capacityMW ?? 0;
  }
  return out;
}

// ---------- Countries & regions ----------

export interface AreaSummary {
  kind: "country" | "region";
  /** ISO code for countries, slug for regions. */
  key: string;
  name: string;
  region?: string;
  projects: number;
  totalMW: number;
  operatingMW: number;
  pipelineMW: number;
  byTech: Record<Technology, number>;
  countries: number;
  deals: number;
}

function summarise(kind: AreaSummary["kind"], key: string, name: string, list: Project[], dealCount: number): AreaSummary {
  const byTech = Object.fromEntries(S.technology.options.map((t) => [t, 0])) as Record<Technology, number>;
  for (const p of list) byTech[p.technology] += p.capacityMW ?? 0;
  const sum = (xs: Project[]) => xs.reduce((s, p) => s + (p.capacityMW ?? 0), 0);
  return {
    kind,
    key,
    name,
    region: kind === "country" ? list[0]?.region : undefined,
    projects: list.length,
    totalMW: sum(list),
    operatingMW: sum(list.filter((p) => p.status === "operating")),
    pipelineMW: sum(list.filter((p) => PIPELINE_STATUSES.includes(p.status))),
    byTech,
    countries: new Set(list.map((p) => p.country)).size,
    deals: dealCount,
  };
}

const byMWDesc = (a: AreaSummary, b: AreaSummary) => b.totalMW - a.totalMW;

export function getCountries(): AreaSummary[] {
  const codes = [...new Set(projects.map((p) => p.country))];
  return codes
    .map((c) =>
      summarise(
        "country",
        c,
        countryName(c),
        projects.filter((p) => p.country === c),
        deals.filter((d) => d.countries.includes(c)).length,
      ),
    )
    .sort(byMWDesc);
}

export function getRegions(): AreaSummary[] {
  const names = [...new Set(projects.map((p) => p.region))];
  return names
    .map((r) =>
      summarise(
        "region",
        regionSlug(r),
        r,
        projects.filter((p) => p.region === r),
        deals.filter((d) => d.region === r).length,
      ),
    )
    .sort(byMWDesc);
}

export interface AreaProfile {
  summary: AreaSummary;
  projects: Project[];
  deals: Deal[];
  /** For regions: the countries inside it. */
  countries: AreaSummary[];
}

export function getCountryProfile(code: string): AreaProfile | undefined {
  const c = code.toUpperCase();
  const summary = getCountries().find((x) => x.key === c);
  if (!summary) return undefined;
  return {
    summary,
    projects: projects.filter((p) => p.country === c),
    deals: deals.filter((d) => d.countries.includes(c)),
    countries: [],
  };
}

export function getRegionProfile(slug: string): AreaProfile | undefined {
  const summary = getRegions().find((x) => x.key === slug);
  if (!summary) return undefined;
  const inRegion = projects.filter((p) => p.region === summary.name);
  const codes = new Set(inRegion.map((p) => p.country));
  return {
    summary,
    projects: inRegion,
    deals: deals.filter((d) => d.region === summary.name || d.countries.some((c) => codes.has(c))),
    countries: getCountries().filter((c) => codes.has(c.key)),
  };
}

// ---------- Technologies ----------

export interface TechProfile {
  tech: Technology;
  stats: Stats & { countries: number };
  projects: Project[];
  deals: Deal[];
  byStatus: { status: ProjectStatus; mw: number; count: number }[];
  byRegion: { region: string; mw: number; count: number }[];
  codByYear: { year: number; confirmed: number; estimated: number }[];
}

export function getTechProfile(tech: Technology): TechProfile {
  const list = projects.filter((p) => p.technology === tech);
  const group = <K extends string>(key: (p: Project) => K) => {
    const m = new Map<K, { mw: number; count: number }>();
    for (const p of list) {
      const g = m.get(key(p)) ?? { mw: 0, count: 0 };
      g.mw += p.capacityMW ?? 0;
      g.count += 1;
      m.set(key(p), g);
    }
    return m;
  };
  const statuses = group((p) => p.status);
  const regions = group((p) => p.region);
  const years = list.filter((p) => p.dates.cod).map((p) => Number(p.dates.cod!.date.slice(0, 4)));
  const codByYear: TechProfile["codByYear"] = [];
  if (years.length) {
    for (let y = Math.min(...years); y <= Math.max(...years); y++) {
      const inYear = list.filter((p) => p.dates.cod?.date.startsWith(String(y)));
      codByYear.push({
        year: y,
        confirmed: inYear.filter((p) => p.dates.cod!.confidence === "confirmed").length,
        estimated: inYear.filter((p) => p.dates.cod!.confidence === "estimated").length,
      });
    }
  }
  return {
    tech,
    stats: { ...getStats(tech), countries: new Set(list.map((p) => p.country)).size },
    projects: list,
    deals: deals.filter((d) => d.technologies.includes(tech)),
    byStatus: [...statuses].map(([status, v]) => ({ status, ...v })),
    byRegion: [...regions].map(([region, v]) => ({ region, ...v })).sort((a, b) => b.mw - a.mw),
    codByYear,
  };
}

// ---------- Capacity timeline (historical vs forecast) ----------

/**
 * One cell of the capacity timeline: projects of one technology reaching commercial operation
 * in one year. `forecast` is true when the COD is estimated (not yet confirmed), so the chart
 * can show historical and forecast capacity differently.
 */
export interface TimelineCell {
  year: number;
  tech: Technology;
  forecast: boolean;
  mw: number;
  n: number;
}

export function getTimeline(filter: (p: Project) => boolean = () => true): TimelineCell[] {
  const m = new Map<string, TimelineCell>();
  for (const p of projects) {
    if (!filter(p) || !p.dates.cod || p.status === "cancelled") continue;
    const year = Number(p.dates.cod.date.slice(0, 4));
    const forecast = p.dates.cod.confidence === "estimated";
    const key = `${year}|${p.technology}|${forecast}`;
    const c = m.get(key) ?? { year, tech: p.technology, forecast, mw: 0, n: 0 };
    c.mw += p.capacityMW ?? 0;
    c.n += 1;
    m.set(key, c);
  }
  return [...m.values()].sort((a, b) => a.year - b.year);
}

export const AS_OF_YEAR = Number(DATA_AS_OF.slice(0, 4));

// ---------- Search index (⌘K) ----------

export type SearchType = "project" | "technology" | "country" | "region" | "deal" | "page";

export interface SearchEntry {
  type: SearchType;
  title: string;
  subtitle: string;
  href: string;
  /** Extra words to match on (developer, country name, sub-type ...). */
  keywords: string;
  tech?: Technology;
}

export function getSearchIndex(): SearchEntry[] {
  const techLabel = (t: Technology) => t.charAt(0).toUpperCase() + t.slice(1);
  return [
    ...projects.map((p) => ({
      type: "project" as const,
      title: p.name,
      subtitle: `${techLabel(p.technology)} · ${p.capacityMW ?? "?"} MW · ${countryName(p.country)}`,
      href: `/projects/${p.slug}`,
      keywords: [p.subType, p.admin1, p.region, countryName(p.country), ...(p.developer ?? []).map((d) => d.name), ...(p.owners ?? []).map((o) => o.name)].join(" "),
      tech: p.technology,
    })),
    ...S.technology.options.map((t) => ({
      type: "technology" as const,
      title: techLabel(t),
      subtitle: "Sector overview",
      href: `/sectors/${t}`,
      keywords: t,
      tech: t,
    })),
    ...getCountries().map((c) => ({
      type: "country" as const,
      title: c.name,
      subtitle: `${c.projects} projects · ${c.region}`,
      href: `/countries/${c.key}`,
      keywords: c.key,
    })),
    ...getRegions().map((r) => ({
      type: "region" as const,
      title: r.name,
      subtitle: `${r.projects} projects · ${r.countries} countries`,
      href: `/regions/${r.key}`,
      keywords: "region",
    })),
    ...deals.map((d) => ({
      type: "deal" as const,
      title: d.title,
      subtitle: `${DEAL_TYPE_LABEL[d.type]} · ${formatDate(d.date)}`,
      href: `/deals/${d.slug}`,
      keywords: [...(d.buyers ?? []), ...(d.sellers ?? [])].map((x) => x.name).join(" ") + " " + d.countries.map(countryName).join(" "),
      tech: d.technologies[0],
    })),
    ...[
      { title: "Project explorer", href: "/projects" },
      { title: "Deal tracker", href: "/deals" },
      { title: "Policy map (PROFITS)", href: "/policy" },
      { title: "Statistics", href: "/statistics" },
      { title: "Methodology", href: "/methodology" },
      { title: "Report a correction", href: "/corrections" },
      { title: "About the beta", href: "/about" },
    ].map((p) => ({ type: "page" as const, title: p.title, subtitle: "Page", href: p.href, keywords: "" })),
  ];
}

// ---------- Investors ----------

export interface InvestorSummary {
  name: string;
  deals: number;
  /** Sum of disclosed deal values in USD (undisclosed deals add nothing). */
  usd: number;
}

/** Most active buyers, lenders and investors across a set of deals. */
export function getTopInvestors(list: Deal[] = deals, n = 5): InvestorSummary[] {
  const m = new Map<string, InvestorSummary>();
  for (const d of list) {
    for (const b of d.buyers ?? []) {
      if (/\(sample\)|investors$/i.test(b.name)) continue; // skip generic placeholders like "Bond investors"
      const x = m.get(b.name) ?? { name: b.name, deals: 0, usd: 0 };
      x.deals += 1;
      x.usd += d.value?.disclosed ? (d.value.usd ?? 0) / Math.max(d.buyers!.length, 1) : 0;
      m.set(b.name, x);
    }
  }
  return [...m.values()].sort((a, b) => b.deals - a.deals || b.usd - a.usd).slice(0, n);
}

export { MILESTONE_LABEL } from "./milestones";
export type { Milestone, MilestoneKind } from "./milestones";
