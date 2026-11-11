// Formatting helpers. Pure functions only, safe on server and client.
import type { DealStatus, DealType, ProjectStatus, ResearchType } from "./types";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function countryName(code: string): string {
  try {
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export function formatMW(mw?: number): string {
  if (mw == null) return "—";
  if (mw >= 1000) return `${(mw / 1000).toLocaleString("en", { maximumFractionDigits: 2 })} GW`;
  return `${mw.toLocaleString("en")} MW`;
}

export function formatGW(mw: number, digits = 1): string {
  return (mw / 1000).toLocaleString("en", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

export function formatMoney(amount: number, currency: string): string {
  const abs = Math.abs(amount);
  const [div, suffix] = abs >= 1e9 ? [1e9, "bn"] : abs >= 1e6 ? [1e6, "m"] : [1, ""];
  return `${currency} ${(amount / div).toLocaleString("en", { maximumFractionDigits: div === 1 ? 0 : 1 })}${suffix}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "7 Nov 2026". Parsed by hand so server and client always agree (no timezone drift). */
export function formatDate(iso: string, opts: { year?: boolean } = {}): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}${opts.year === false ? "" : ` ${y}`}`;
}

export function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  announced: "Announced",
  permitting: "Permitting",
  financing: "Financing",
  construction: "Under construction",
  operating: "Operating",
  decommissioned: "Decommissioned",
  cancelled: "Cancelled",
};


export const RESEARCH_TYPE_LABEL: Record<ResearchType, string> = {
  report: "Report",
  opinion: "Opinion",
  paper: "Paper",
  "data-note": "Data note",
};

export const DEAL_STATUS_LABEL: Record<DealStatus, string> = {
  announced: "Announced",
  completed: "Completed",
  terminated: "Terminated",
};

/** Deal types in title case; acronyms (M&A, PPA, IPO) stay as they are. */
export const DEAL_TYPE_LABEL: Record<DealType, string> = {
  "M&A": "M&A",
  "project finance": "Project Finance",
  "equity raise": "Equity Raise",
  PPA: "PPA",
  IPO: "IPO",
  "fund close": "Fund Close",
  "joint venture": "Joint Venture",
  refinancing: "Refinancing",
};
