// The only module that reads /data. Pages call these functions, never the seed
// files directly, so a database or CMS can replace the files later without
// touching any page.
//
// Every seed file is validated with zod when this module first loads. Because
// pages are prerendered during `next build`, a broken record fails the build
// with a message naming the file, record and field.
import { z } from "zod";
import { deals as sampleDeals } from "@/data/deals";
import { curatedDeals } from "@/data/deals-curated";
import { iatiDeals } from "@/data/deals-iati";
import { newsDeals } from "@/data/deals-news";
import { plainText, plainTitle } from "@/lib/plain-text";
import { worldBankDeals } from "@/data/deals-worldbank";
import { DATA_AS_OF, DATA_VERSION, changelog } from "@/data/meta";
import { research as rawResearch } from "@/data/research";
import { capacityOutlook as rawCapacityOutlook } from "@/data/stats/capacity-outlook";
import { countryCapacity as rawCountryCapacity } from "@/data/stats/country-capacity";
import { globalCapacity as rawGlobalCapacity } from "@/data/stats/global-capacity";
import { DEAL_TYPE_LABEL, countryName, daysBetween, formatDate } from "./format";
import type { Milestone } from "./milestones";
import { centroids } from "@/data/geo/centroids";
import { makeCountryStats } from "./country-stats";
import { windowStart } from "./window";
import * as S from "./schema";
import type {
  CapacityOutlook,
  CapacitySeries,
  Deal,
  Ownership,
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

// Sample deals plus real records imported from open sources (see scripts/).
// PR Newswire publishes one release under several addresses (regional copies differ only in the
// trailing number), so the same deal can arrive twice. Keep the first: hand-written beats extracted.
const releaseKey = (d: Deal) => {
  const url = d.sources[0]?.url ?? "";
  // Only PR Newswire copies are merged. Development-bank records can share one project page and still be separate loans.
  return url.includes("prnewswire.com") ? url.replace(/-\d+\.html$/, "") : d.id;
};
const seenRelease = new Set<string>();
/** First day of the rolling five-year deal window (set in next.config.ts at build time). */
export const DEALS_FROM = process.env.DEALS_FROM ?? windowStart();
const uniqueDeals = [...sampleDeals, ...curatedDeals, ...newsDeals, ...worldBankDeals, ...iatiDeals].filter((d) => {
  if (d.date < DEALS_FROM) return false;
  const k = releaseKey(d);
  if (seenRelease.has(k)) return false;
  seenRelease.add(k);
  return true;
});
const deals = validate("data/deals*.ts", S.deal, uniqueDeals)
  .map((d) => ({
    ...d,
    title: plainTitle(d.title),
    summary: plainText(d.summary),
    details: plainText(d.details),
    context: plainText(d.context),
  }))
  .sort(byDateDesc);
const research = validate("data/research.ts", S.researchItem, rawResearch).sort(byDateDesc);

export { DATA_AS_OF, DATA_VERSION, changelog };

// ---------- Published statistics (open datasets, stored as published) ----------

function validateStat<T>(file: string, schema: z.ZodType<T>, raw: unknown): T {
  const r = schema.safeParse(raw);
  if (!r.success) {
    const msg = r.error.issues.map((i) => `  ${file} › ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`\n\nPerpetual statistics failed validation:\n${msg}\n`);
  }
  return r.data;
}

const globalCapacity = validateStat("data/stats/global-capacity.ts", S.capacitySeries, rawGlobalCapacity);
const capacityOutlook = validateStat("data/stats/capacity-outlook.ts", S.capacityOutlook, rawCapacityOutlook);

/** Official installed capacity and generation for every country (IRENA). */
export const countryStats = makeCountryStats(
  validateStat("data/stats/country-capacity.ts", S.countryCapacityData, rawCountryCapacity),
);
export type { CountrySnapshot } from "./country-stats";

/** EIA International Energy Outlook projections of world renewable capacity. Third-party forecasts only. */
export function getCapacityOutlook(): CapacityOutlook {
  return capacityOutlook;
}

/** Global installed renewable capacity by technology (IRENA via Our World in Data). */
export function getGlobalCapacity(): CapacitySeries {
  return globalCapacity;
}

/** A point on the globe: one deal, placed in its country. */
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
  ownership?: Ownership;
  developer?: string;
  cod?: string;
  codConfidence?: "confirmed" | "estimated";
  admin1?: string;
  instruments?: string[];
  /** The most recent confirmed milestone on or before the dataset date. */
  milestone?: Milestone;
  /** Set when the point is a deal (placed at its country), not a project site. */
  deal?: { type: string; date: string; value?: string; usd?: number; href: string };
}


/**
 * Deals from the last `days` days as globe points: one per deal, placed near the centre of its
 * (first) country with a small fixed offset so deals in one country don't sit on top of each other.
 * `capacityMW` carries the circle size: the disclosed value in millions (USD where given).
 */
export function getDealPoints(days = 365): MapPoint[] {
  const out: MapPoint[] = [];
  for (const d of deals) {
    const age = daysBetween(d.date, DATA_AS_OF);
    if (age < 0 || age > days || !d.countries.length) continue;
    const c = centroids[d.countries[0]];
    if (!c) continue;
    let h = 2166136261;
    for (const ch of d.id) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    const ang = ((h >>> 0) % 360) * (Math.PI / 180);
    const r = 0.6 + (((h >>> 9) % 100) / 100) * 1.6;
    const amount = d.value?.usd ?? d.value?.amount;
    out.push({
      id: d.id,
      slug: d.slug,
      name: d.title,
      technology: d.technologies[0],
      capacityMW: amount ? Math.min(amount / 1e6, 3000) : 15,
      country: d.countries[0],
      region: d.region,
      status: "financing",
      lat: c[1] + r * Math.sin(ang),
      lng: c[0] + r * Math.cos(ang),
      isSample: d.isSample,
      ownership: "private",
      deal: {
        type: DEAL_TYPE_LABEL[d.type],
        date: d.date,
        value: d.value?.disclosed ? `${d.value.currency} ${formatCompact(d.value.amount)}` : undefined,
        usd: d.value?.disclosed ? d.value.usd : undefined,
        href: `/deals/${d.slug}`,
      },
    });
  }
  return out;
}

function formatCompact(n: number): string {
  return n >= 1e9 ? `${(n / 1e9).toLocaleString("en", { maximumFractionDigits: 2 })}bn` : `${Math.round(n / 1e6).toLocaleString("en")}m`;
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

export function getFeaturedDeal(): Deal | undefined {
  return deals.find((d) => d.featured) ?? deals[0];
}

export interface SectorSummary {
  deals: number;
  /** World installed capacity from IRENA, where IRENA reports the sector. */
  worldMW?: number;
}

/** Real per-sector figures: world capacity (IRENA) and the number of deals on record. */
export function getSectorSummary(): Record<Technology, SectorSummary> {
  const last = globalCapacity.rows[globalCapacity.rows.length - 1];
  const out = {} as Record<Technology, SectorSummary>;
  for (const t of S.technology.options) {
    const gw = t in last ? (last as unknown as Record<string, number>)[t] : undefined;
    out[t] = { deals: deals.filter((d) => d.technologies.includes(t)).length, worldMW: gw != null ? gw * 1000 : undefined };
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
  countries: number;
  deals: number;
}

function summarise(kind: AreaSummary["kind"], key: string, name: string, dealCount: number): AreaSummary {
  return { kind, key, name, countries: 0, deals: dealCount };
}

export interface AreaProfile {
  summary: AreaSummary;
  deals: Deal[];
  /** For regions: the countries inside it. */
  countries: AreaSummary[];
}

/** Every country with a page: official statistics or deals. */
export function getAllCountryCodes(): string[] {
  const codes = new Set(countryStats.all().map((c) => c.iso2));
  for (const d of deals) for (const c of d.countries) codes.add(c);
  return [...codes].sort();
}

export function getCountryProfile(code: string): AreaProfile | undefined {
  const c = code.toUpperCase();
  const dealList = deals.filter((d) => d.countries.includes(c));
  if (!countryStats.get(c) && !dealList.length) return undefined;
  const summary = summarise("country", c, countryName(c), dealList.length);
  summary.region = countryStats.regionOf(c) ?? dealList[0]?.region;
  return { summary, deals: dealList, countries: [] };
}

/** Latest official figures for every country, for ranking tables. */
export function getCountryStatsRows() {
  return countryStats
    .all()
    .map((c) => ({ ...countryStats.snapshot(c), name: countryName(c.iso2) }))
    .filter((r) => r.renewableMW > 0);
}

/** Latest official figures for each IRENA region (sum of its countries). Keyed by region slug. */
export function getRegionStatsRows() {
  return countryStats.regions().map((r) => ({ ...countryStats.snapshot(countryStats.aggregate(r)), iso2: r.slug, name: r.name }));
}

/** Regions with a page: IRENA's regions, each listing its member countries. */
export function getRegionList() {
  return countryStats.regions();
}

export function getRegionProfile(slug: string): AreaProfile | undefined {
  const region = countryStats.region(slug);
  if (!region) return undefined;
  const codes = new Set(region.countries);
  const dealList = deals.filter((d) => d.countries.some((c) => codes.has(c)));
  const summary = summarise("region", slug, region.name, dealList.length);
  summary.countries = region.countries.length;
  const countries = region.countries.map((c) => {
    const n = deals.filter((d) => d.countries.includes(c)).length;
    return { ...summarise("country", c, countryName(c), n), region: region.name };
  });
  return { summary, deals: dealList, countries };
}

// ---------- Technologies ----------

export interface TechProfile {
  tech: Technology;
  deals: Deal[];
  /** Deals in the last 30 days. */
  dealsLast30Days: number;
  /** Countries with at least one deal in this sector. */
  countries: number;
}

export function getTechProfile(tech: Technology): TechProfile {
  const list = deals.filter((d) => d.technologies.includes(tech));
  return {
    tech,
    deals: list,
    dealsLast30Days: list.filter((d) => {
      const age = daysBetween(d.date, DATA_AS_OF);
      return age >= 0 && age <= 30;
    }).length,
    countries: new Set(list.flatMap((d) => d.countries)).size,
  };
}

export const AS_OF_YEAR = Number(DATA_AS_OF.slice(0, 4));

// ---------- Search index (⌘K) ----------

export type SearchType = "technology" | "country" | "region" | "deal" | "page";

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
    ...S.technology.options.map((t) => ({
      type: "technology" as const,
      title: techLabel(t),
      subtitle: "Sector overview",
      href: `/sectors/${t}`,
      keywords: t,
      tech: t,
    })),
    ...countryStats.all().map((c) => ({
      type: "country" as const,
      title: countryName(c.iso2),
      subtitle: `Country · ${countryStats.regionOf(c.iso2) ?? ""}`,
      href: `/countries/${c.iso2}`,
      keywords: c.iso2,
    })),
    ...countryStats.regions().map((r) => ({
      type: "region" as const,
      title: r.name,
      subtitle: `Region · ${r.countries.length} countries`,
      href: `/regions/${r.slug}`,
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
      { title: "Deal Tracker", href: "/deals" },
      { title: "Policy Review", href: "/policy" },
      { title: "Statistics", href: "/statistics" },
      { title: "Disclosure", href: "/disclosure" },
      { title: "Report a correction", href: "/corrections" },
      { title: "About Perpetual", href: "/about" },
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

