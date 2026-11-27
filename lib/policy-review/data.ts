import "server-only";
// Loads the Policy Review country files once at build time. Drafts show only outside production.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { DATA_AS_OF } from "@/data/meta";
import { countryName } from "@/lib/format";
import type { VerdictCell, VerdictCells } from "./cells";
import { countryReview, type CountryReview, type SegmentId } from "./types";
import { freshness, segmentVerdict } from "./verdict";

const DIR = join(process.cwd(), "content", "policy", "countries");
const showDrafts = process.env.VERCEL_ENV !== "production";

const reviews: CountryReview[] = readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => countryReview.parse(JSON.parse(readFileSync(join(DIR, f), "utf8"))))
  .filter((c) => c.status === "reviewed" || (c.status === "draft" && showDrafts));
const byIso = new Map(reviews.map((c) => [c.country, c]));

export function getReview(iso2: string): CountryReview | undefined {
  return byIso.get(iso2.toUpperCase());
}
export function getReviews(): CountryReview[] {
  return reviews;
}

export interface ReviewRow {
  iso2: string;
  name: string;
  status: CountryReview["status"];
  lastReviewed?: string;
  freshness?: ReturnType<typeof freshness>;
  basis?: string;
  segments: Record<SegmentId, VerdictCell & { override?: string }>;
  activeFlags: number;
}

export function reviewRow(c: CountryReview): ReviewRow {
  const fr = freshness(c.lastReviewed, DATA_AS_OF);
  const seg = (s: SegmentId) => {
    const v = segmentVerdict(c, s);
    return {
      verdict: v.verdict,
      override: v.override,
      direction: c.segments[s].direction.value,
      lastReviewed: c.lastReviewed,
      freshness: fr,
      redFlag: c.redFlags.some((f) => f.status === "active" && f.segments.includes(s)),
    };
  };
  return {
    iso2: c.country,
    name: countryName(c.country),
    status: c.status,
    lastReviewed: c.lastReviewed,
    freshness: fr,
    basis: c.basis,
    segments: { utility: seg("utility"), ci: seg("ci") },
    activeFlags: c.redFlags.filter((f) => f.status === "active").length,
  };
}

export function getReviewRows(): ReviewRow[] {
  return reviews.map(reviewRow).sort((a, b) => a.name.localeCompare(b.name));
}

/** Map cells for both deal types, keyed by ISO code. */
export function getVerdictCells(): Record<SegmentId, VerdictCells> {
  const out: Record<SegmentId, VerdictCells> = { utility: {}, ci: {} };
  for (const r of getReviewRows()) for (const s of ["utility", "ci"] as const) out[s][r.iso2] = r.segments[s];
  return out;
}

export interface PolicyEvent {
  iso2: string;
  name: string;
  date: string;
  precision: "day" | "month" | "year";
  title: string;
  effect: "positive" | "negative" | "mixed";
  kind: string;
  segments: SegmentId[];
  url?: string;
}

/** Newest dated policy events across all reviewed countries. */
export function getLatestEvents(n = 10): PolicyEvent[] {
  return reviews
    .flatMap((c) =>
      c.events.map((e) => ({
        iso2: c.country,
        name: countryName(c.country),
        date: e.date,
        precision: e.precision,
        title: e.title,
        effect: e.effect,
        kind: e.kind,
        segments: e.segments,
        url: c.sources.find((s) => s.id === e.sources[0])?.url,
      })),
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, n);
}

/** Every dated event across reviewed countries, for the overview timeline. */
export function getAllEvents() {
  return reviews.flatMap((c) =>
    c.events.map((e) => ({
      date: e.date,
      precision: e.precision,
      effect: e.effect,
      title: e.title,
      segments: e.segments,
      refs: e.sources.map((id, i) => ({ n: i + 1, url: c.sources.find((s) => s.id === id)?.url ?? "" })),
      country: { name: countryName(c.country), href: `/policy/${c.country.toLowerCase()}` },
    })),
  );
}
