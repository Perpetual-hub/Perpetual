// Deal filters, shared by the deal tracker (client) and server code. Always round-trip
// through the URL so every view is shareable: /deals?type=M%26A&tech=wind&period=90
import { TECH_IDS } from "./tech";
import type { Deal, DealStatus, DealType, Technology } from "./types";

export const DEAL_TYPES: DealType[] = [
  "M&A",
  "project finance",
  "equity raise",
  "PPA",
  "IPO",
  "fund close",
  "joint venture",
  "refinancing",
  "development finance",
];
export const DEAL_STATUSES: DealStatus[] = ["announced", "completed", "terminated"];
export const PERIODS = [
  { id: "30", label: "Last 30 days", days: 30 },
  { id: "90", label: "Last 90 days", days: 90 },
  { id: "365", label: "Last 12 months", days: 365 },
] as const;
export const SIZE_BANDS = [
  { id: "lt100", label: "Under USD 100m", min: 0, max: 100e6 },
  { id: "100to500", label: "USD 100m–500m", min: 100e6, max: 500e6 },
  { id: "500to1000", label: "USD 500m–1bn", min: 500e6, max: 1e9 },
  { id: "gt1000", label: "Over USD 1bn", min: 1e9, max: Infinity },
  { id: "undisclosed", label: "Undisclosed", min: -1, max: -1 },
] as const;

export interface DealFilters {
  type?: DealType[];
  tech?: Technology[];
  region?: string[];
  status?: DealStatus[];
  size?: string[];
  period?: string;
  q?: string;
}

type Params = { get(name: string): string | null };
const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : undefined);

export function parseDealFilters(sp: Params): DealFilters {
  return {
    type: list(sp.get("type"))?.filter((t): t is DealType => (DEAL_TYPES as string[]).includes(t)),
    tech: list(sp.get("tech"))?.filter((t): t is Technology => (TECH_IDS as string[]).includes(t)),
    region: list(sp.get("region")),
    status: list(sp.get("status"))?.filter((s): s is DealStatus => (DEAL_STATUSES as string[]).includes(s)),
    size: list(sp.get("size")),
    period: sp.get("period") ?? undefined,
    q: sp.get("q") || undefined,
  };
}

export function dealFiltersToQuery(f: DealFilters, extra: Record<string, string | undefined> = {}): string {
  const sp = new URLSearchParams();
  const set = (k: string, v?: string | string[]) => {
    if (!v || (Array.isArray(v) && !v.length)) return;
    sp.set(k, Array.isArray(v) ? v.join(",") : v);
  };
  set("q", f.q);
  set("type", f.type);
  set("tech", f.tech);
  set("region", f.region);
  set("status", f.status);
  set("size", f.size);
  set("period", f.period);
  for (const [k, v] of Object.entries(extra)) set(k, v);
  return sp.toString().replace(/%2C/g, ",");
}

export function sizeBand(d: Deal): string {
  if (!d.value?.disclosed || !d.value.usd) return "undisclosed";
  return SIZE_BANDS.find((b) => b.min >= 0 && d.value!.usd! >= b.min && d.value!.usd! < b.max)?.id ?? "undisclosed";
}

/** `asOf` anchors relative periods to the dataset date, not the reader's clock. */
export function matchesDeal(d: Deal, f: DealFilters, asOf: string): boolean {
  if (f.type?.length && !f.type.includes(d.type)) return false;
  if (f.tech?.length && !d.technologies.some((t) => f.tech!.includes(t))) return false;
  if (f.region?.length && !f.region.includes(d.region)) return false;
  if (f.status?.length && !f.status.includes(d.status)) return false;
  if (f.size?.length && !f.size.includes(sizeBand(d))) return false;
  if (f.period) {
    const days = Number(f.period);
    const age = (Date.parse(asOf) - Date.parse(d.date)) / 86_400_000;
    if (!Number.isNaN(days) && (age < 0 || age > days)) return false;
  }
  if (f.q) {
    const hay = [d.title, d.target, ...(d.buyers ?? []).map((x) => x.name), ...(d.sellers ?? []).map((x) => x.name)].join(" ").toLowerCase();
    if (!hay.includes(f.q.toLowerCase())) return false;
  }
  return true;
}

export function countDealFilters(f: DealFilters): number {
  return [f.type, f.tech, f.region, f.status, f.size].filter((x) => x?.length).length + (f.period ? 1 : 0) + (f.q ? 1 : 0);
}
