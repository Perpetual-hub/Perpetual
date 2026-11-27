// Client-safe pieces of the Policy Review: labels, colours and the per-country cell the map uses.
import type { Freshness, SegmentId, Verdict } from "./types";

export interface VerdictCell {
  verdict: Verdict;
  direction?: "improving" | "stable" | "worsening";
  lastReviewed?: string;
  freshness?: Freshness;
  redFlag?: boolean;
}
export type VerdictCells = Record<string, VerdictCell>;

export const VERDICT_LABEL: Record<Verdict, string> = {
  ready: "Ready",
  workable: "Workable",
  difficult: "Difficult",
  not_reviewed: "Not Yet Reviewed",
};
export const VERDICT_STYLE: Record<Verdict, { fill: string; chip: string; dot: string }> = {
  ready: { fill: "#3f9d5a", chip: "border-[#3f9d5a]/35 bg-[#ebf6ee] text-[#1f6b37]", dot: "#3f9d5a" },
  workable: { fill: "#e3a73a", chip: "border-[#e3a73a]/45 bg-[#fdf4e2] text-[#7a4d00]", dot: "#e3a73a" },
  difficult: { fill: "#cf4b3f", chip: "border-[#cf4b3f]/35 bg-[#fcecea] text-[#9c2a20]", dot: "#cf4b3f" },
  not_reviewed: { fill: "#8a98ab", chip: "border-line bg-surface-2 text-muted", dot: "#8a98ab" },
};
export const SEGMENT_LABEL: Record<SegmentId, string> = { utility: "Utility-Scale", ci: "C&I" };
export const DIRECTION_LABEL = { improving: "Improving", stable: "Stable", worsening: "Worsening" } as const;

/** Numeric code the map colours by (0 = not reviewed). */
export const VERDICT_CODE: Record<Verdict, number> = { not_reviewed: 0, difficult: 1, workable: 2, ready: 3 };

/** Map cells in the shape the globe takes (score is the verdict code). */
export function toPolicyScores(cells: VerdictCells): Record<string, { score: number | null; verdict?: string; direction?: string; lastReviewed?: string; faded?: boolean; flagged?: boolean }> {
  return Object.fromEntries(
    Object.entries(cells).map(([iso, c]) => [
      iso,
      {
        score: c.verdict === "not_reviewed" ? null : VERDICT_CODE[c.verdict],
        verdict: VERDICT_LABEL[c.verdict],
        direction: c.direction ? DIRECTION_LABEL[c.direction] : undefined,
        lastReviewed: c.lastReviewed,
        faded: c.freshness === "out_of_date",
        flagged: c.redFlag,
      },
    ]),
  );
}
