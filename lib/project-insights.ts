// What a project page adds on top of its deals: one life story, who has owned it, how it was paid
// for, and how it compares with similar plants. Everything is derived from recorded deals and
// project fields; nothing is estimated.
import { getDealsForProject, getProjects } from "./data";
import type { Deal, Project } from "./types";

export interface HistoryEvent {
  date: string;
  label: string;
  detail?: string;
  confidence: "confirmed" | "estimated";
  deal?: Deal;
}

const DEAL_EVENT: Record<Deal["type"], string> = {
  "M&A": "Change of ownership",
  "project finance": "Financing",
  "development finance": "Development finance",
  refinancing: "Refinancing",
  "equity raise": "Equity investment",
  PPA: "Power purchase agreement",
  IPO: "Listing",
  "fund close": "Fund close",
  "joint venture": "Joint venture",
};

/** Milestones and deals in one chronological list. */
export function projectHistory(p: Project): HistoryEvent[] {
  const deals = getDealsForProject(p.id);
  const ev: HistoryEvent[] = [];
  const add = (label: string, v?: { date: string; confidence: "confirmed" | "estimated" }) =>
    v && ev.push({ date: v.date, label, confidence: v.confidence });
  // "Announced" duplicates the first deal when the record was built from that deal.
  if (!deals.some((d) => d.date === p.dates.announced?.date)) add("Announced", p.dates.announced);
  add("Permits granted", p.dates.permits);
  if (!deals.some((d) => d.type === "project finance" && d.date === p.financing?.financialClose?.date))
    add("Financial close", p.financing?.financialClose);
  add("Construction start", p.dates.construction);
  add(p.status === "operating" ? "Commercial operation" : "Expected commercial operation", p.dates.cod);
  add("Planned decommissioning", p.dates.decommission);
  for (const d of deals)
    ev.push({ date: d.date, label: DEAL_EVENT[d.type], detail: d.title, confidence: "confirmed", deal: d });
  return ev.sort((a, b) => a.date.localeCompare(b.date));
}

export interface OwnershipChange {
  date: string;
  buyers: string[];
  sellers: string[];
  stakePct?: number;
  status: Deal["status"];
  deal: Deal;
}

/** Every recorded change of ownership, oldest first. */
export function ownershipHistory(p: Project): OwnershipChange[] {
  return getDealsForProject(p.id)
    .filter((d) => d.type === "M&A" || (d.type === "equity raise" && d.stakePct))
    .map((d) => ({
      date: d.date,
      buyers: (d.buyers ?? []).map((x) => x.name),
      sellers: (d.sellers ?? []).filter((x) => !/developer/i.test(x.role ?? "") || d.type === "M&A").map((x) => x.name),
      stakePct: d.stakePct,
      status: d.status,
      deal: d,
    }));
}

export interface CapitalLayer {
  kind: "Senior debt" | "Development finance" | "Refinancing" | "Equity" | "Tax equity";
  amount?: number;
  currency?: string;
  usd?: number;
  providers: string[];
  date: string;
  deal: Deal;
}

/** Financing rounds with their providers. Amounts appear only where the source states them. */
export function capitalStack(p: Project): CapitalLayer[] {
  const out: CapitalLayer[] = [];
  for (const d of getDealsForProject(p.id)) {
    let kind: CapitalLayer["kind"] | undefined;
    if (d.type === "project finance") kind = "Senior debt";
    else if (d.type === "development finance") kind = "Development finance";
    else if (d.type === "refinancing") kind = "Refinancing";
    else if (d.type === "equity raise")
      kind = (d.buyers ?? []).some((b) => /tax equity/i.test(b.role ?? "")) || /tax equity/i.test(d.title) ? "Tax equity" : "Equity";
    if (!kind) continue;
    out.push({
      kind,
      amount: d.value?.amount,
      currency: d.value?.currency,
      usd: d.value?.usd,
      providers: (d.buyers ?? []).map((b) => b.name),
      date: d.date,
      deal: d,
    });
  }
  return out;
}

const median = (xs: number[]) => {
  if (!xs.length) return undefined;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

/** Financing in US dollars per MW, where both are stated. */
function usdPerMW(p: Project): number | undefined {
  if (!p.capacityMW) return undefined;
  const usd = capitalStack(p)
    .filter((l) => l.kind !== "Refinancing")
    .reduce((s, l) => s + (l.usd ?? 0), 0);
  return usd > 0 ? usd / p.capacityMW : undefined;
}

export interface Benchmark {
  label: string;
  value?: number;
  peerMedian?: number;
  peers: number;
  rank?: number;
  unit: "MW" | "USD/MW" | "deals";
  scope: string;
}

/** How the project compares with plants of the same technology, in its country and worldwide. */
export function projectBenchmarks(p: Project): Benchmark[] {
  const same = getProjects().filter((q) => q.technology === p.technology && q.id !== p.id);
  const inCountry = same.filter((q) => q.country === p.country);
  const out: Benchmark[] = [];
  const cap = (list: Project[], scope: string) => {
    const caps = list.map((q) => q.capacityMW).filter((x): x is number => !!x);
    if (!p.capacityMW || caps.length < 2) return;
    out.push({
      label: "Capacity",
      value: p.capacityMW,
      peerMedian: median(caps),
      peers: caps.length,
      rank: caps.filter((c) => c > p.capacityMW!).length + 1,
      unit: "MW",
      scope,
    });
  };
  cap(inCountry, "in the country");
  cap(same, "worldwide");
  const own = usdPerMW(p);
  const peerCost = same.map(usdPerMW).filter((x): x is number => x !== undefined);
  if (own && peerCost.length >= 3)
    out.push({ label: "Financing per MW", value: own, peerMedian: median(peerCost), peers: peerCost.length, unit: "USD/MW", scope: "worldwide" });
  const counts = same.map((q) => getDealsForProject(q.id).length).filter((n) => n > 0);
  const own2 = getDealsForProject(p.id).length;
  if (counts.length >= 3 && (own2 > 1 || (median(counts) ?? 0) > 1))
    out.push({
      label: "Deals on record",
      value: getDealsForProject(p.id).length,
      peerMedian: median(counts),
      peers: counts.length,
      unit: "deals",
      scope: "worldwide",
    });
  return out;
}

export const PIPELINE_ORDER: Project["status"][] = ["announced", "permitting", "financing", "construction", "operating"];

/** Capacity at each stage, by technology, for the pipeline summary. */
export function pipeline(list: Project[] = getProjects()) {
  const rows = new Map<Project["technology"], Record<string, { mw: number; n: number }>>();
  for (const p of list) {
    if (!PIPELINE_ORDER.includes(p.status)) continue;
    const r = rows.get(p.technology) ?? Object.fromEntries(PIPELINE_ORDER.map((s) => [s, { mw: 0, n: 0 }]));
    r[p.status].mw += p.capacityMW ?? 0;
    r[p.status].n += 1;
    rows.set(p.technology, r);
  }
  const totals = Object.fromEntries(
    PIPELINE_ORDER.map((s) => [s, [...rows.values()].reduce((a, r) => ({ mw: a.mw + r[s].mw, n: a.n + r[s].n }), { mw: 0, n: 0 })]),
  ) as Record<string, { mw: number; n: number }>;
  return { rows: [...rows.entries()].sort((a, b) => sum(b[1]) - sum(a[1])), totals };
}
const sum = (r: Record<string, { mw: number }>) => Object.values(r).reduce((a, x) => a + x.mw, 0);
