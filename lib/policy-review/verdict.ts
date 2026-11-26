// The verdict rule from the Policy Review method, applied in a fixed order so verdicts cannot drift.
import type { CountryReview, Freshness, RatingEntry, RedFlag, SegmentId, Verdict } from "./types";

// Kept here (not imported) so the rule runs under node --test without a bundler.
const QUESTION_IDS = ["access", "terms", "buyer", "ownership", "build", "stability"] as const;
const GATE_IDS = ["access", "ownership"] as const;

export function verdictFor(ratings: Record<string, RatingEntry>, flags: RedFlag[], segment: SegmentId): Verdict {
  const all = QUESTION_IDS.map((q) => ratings[q]);
  const gates = GATE_IDS.map((g) => ratings[g]);
  const count = (r: string) => all.filter((x) => x.rating === r).length;

  if (flags.some((f) => f.status === "active" && f.segments.includes(segment))) return "difficult";
  if (gates.some((g) => g.rating === "not_rated") || count("not_rated") > 2) return "not_reviewed";
  if (gates.some((g) => g.rating === "unsupportive") || count("unsupportive") >= 2) return "difficult";
  if (gates.every((g) => g.rating === "supportive") && count("unsupportive") === 0 && count("mixed") <= 2) return "ready";
  return "workable";
}

/** Verdict shown on the site: the override when a reviewer wrote one, otherwise the rule. */
export function segmentVerdict(c: CountryReview, segment: SegmentId): { verdict: Verdict; override?: string } {
  if (c.status === "not_reviewed") return { verdict: "not_reviewed" };
  const s = c.segments[segment];
  if (s.override) return { verdict: s.override.verdict, override: s.override.reason };
  return { verdict: verdictFor(s.ratings, c.redFlags, segment) };
}

/** Current under six months, review due from six to nine, out of date after nine. */
export function freshness(lastReviewed: string | undefined, today: string): Freshness | undefined {
  if (!lastReviewed) return undefined;
  const months = (Date.parse(today) - Date.parse(lastReviewed)) / (1000 * 60 * 60 * 24 * 30.44);
  return months < 6 ? "current" : months < 9 ? "review_due" : "out_of_date";
}
