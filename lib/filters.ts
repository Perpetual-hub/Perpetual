// Project filters, shared by server (lib/data.ts) and client (explorer, globe).
// Filters always round-trip through the URL query string so every view is shareable:
//   /projects?tech=solar,wind&status=operating&country=VN&minMW=100&codFrom=2025
import { TECH_IDS } from "./tech";
import type { Ownership, ProjectStatus, Technology } from "./types";

export interface ProjectFilters {
  tech?: Technology[];
  status?: ProjectStatus[];
  country?: string[];
  region?: string[];
  ownership?: Ownership[];
  minMW?: number;
  maxMW?: number;
  codFrom?: number;
  codTo?: number;
  /** Financing instruments the project must have, e.g. "DFI loan", "green bond". */
  financing?: string[];
  q?: string;
}

/** The fields a filter needs. Both full projects and map points satisfy it. */
export interface Filterable {
  name: string;
  technology: Technology;
  status: ProjectStatus;
  country: string;
  region: string;
  ownership?: Ownership;
  capacityMW?: number;
  cod?: string;
  instruments?: string[];
  developer?: string;
}

export const STATUSES: ProjectStatus[] = [
  "announced",
  "permitting",
  "financing",
  "construction",
  "operating",
  "decommissioned",
  "cancelled",
];
export const PIPELINE_STATUSES: ProjectStatus[] = ["announced", "permitting", "financing", "construction"];
export const OWNERSHIPS: Ownership[] = ["private", "public", "ppp", "community", "mixed"];
export const OWNERSHIP_LABEL: Record<Ownership, string> = {
  private: "Private",
  public: "Public",
  ppp: "Public–private (PPP)",
  community: "Community",
  mixed: "Mixed",
};
export const FINANCING_OPTIONS = [
  { id: "DFI loan", label: "Has DFI loan" },
  { id: "green bond", label: "Has green bond" },
] as const;

export function matchesFilters(p: Filterable, f: ProjectFilters): boolean {
  if (f.tech?.length && !f.tech.includes(p.technology)) return false;
  if (f.status?.length && !f.status.includes(p.status)) return false;
  if (f.country?.length && !f.country.includes(p.country)) return false;
  if (f.region?.length && !f.region.includes(p.region)) return false;
  if (f.ownership?.length && (!p.ownership || !f.ownership.includes(p.ownership))) return false;
  if (f.minMW != null && (p.capacityMW ?? 0) < f.minMW) return false;
  if (f.maxMW != null && (p.capacityMW ?? 0) > f.maxMW) return false;
  const cod = p.cod ? Number(p.cod.slice(0, 4)) : undefined;
  if (f.codFrom != null && (cod == null || cod < f.codFrom)) return false;
  if (f.codTo != null && (cod == null || cod > f.codTo)) return false;
  if (f.financing?.length && !f.financing.every((x) => p.instruments?.includes(x))) return false;
  if (f.q) {
    const q = f.q.toLowerCase();
    if (!`${p.name} ${p.developer ?? ""}`.toLowerCase().includes(q)) return false;
  }
  return true;
}

// ---------- URL <-> filters ----------

type Params = { get(name: string): string | null };

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : undefined);
const num = (v: string | null) => (v != null && v !== "" && !Number.isNaN(Number(v)) ? Number(v) : undefined);

export function parseFilters(sp: Params): ProjectFilters {
  return {
    tech: list(sp.get("tech"))?.filter((t): t is Technology => (TECH_IDS as string[]).includes(t)),
    status: list(sp.get("status"))?.filter((s): s is ProjectStatus => (STATUSES as string[]).includes(s)),
    country: list(sp.get("country"))?.map((c) => c.toUpperCase()),
    region: list(sp.get("region")),
    ownership: list(sp.get("ownership"))?.filter((o): o is Ownership => (OWNERSHIPS as string[]).includes(o)),
    minMW: num(sp.get("minMW")),
    maxMW: num(sp.get("maxMW")),
    codFrom: num(sp.get("codFrom")),
    codTo: num(sp.get("codTo")),
    financing: list(sp.get("financing")),
    q: sp.get("q") || undefined,
  };
}

export function filtersToQuery(f: ProjectFilters, extra: Record<string, string | undefined> = {}): string {
  const sp = new URLSearchParams();
  const set = (k: string, v: string | number | string[] | undefined) => {
    if (v == null || v === "" || (Array.isArray(v) && !v.length)) return;
    sp.set(k, Array.isArray(v) ? v.join(",") : String(v));
  };
  set("q", f.q);
  set("tech", f.tech);
  set("status", f.status);
  set("country", f.country);
  set("region", f.region);
  set("ownership", f.ownership);
  set("minMW", f.minMW);
  set("maxMW", f.maxMW);
  set("codFrom", f.codFrom);
  set("codTo", f.codTo);
  set("financing", f.financing);
  for (const [k, v] of Object.entries(extra)) set(k, v);
  // Keep commas readable in shared links.
  return sp.toString().replace(/%2C/g, ",");
}

export function countActiveFilters(f: ProjectFilters): number {
  return (
    (f.tech?.length ? 1 : 0) +
    (f.status?.length ? 1 : 0) +
    (f.country?.length ? 1 : 0) +
    (f.region?.length ? 1 : 0) +
    (f.ownership?.length ? 1 : 0) +
    (f.minMW != null || f.maxMW != null ? 1 : 0) +
    (f.codFrom != null || f.codTo != null ? 1 : 0) +
    (f.financing?.length ? 1 : 0) +
    (f.q ? 1 : 0)
  );
}

export function regionSlug(region: string): string {
  return region.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
