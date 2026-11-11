// Pure scoring maths for PROFITS (safe to import in the browser: no validation library).
import type { PillarId } from "@/data/policy";

const IDS: PillarId[] = ["P", "R", "O", "F", "I", "T", "S"];

/** Weighted average on the 1–5 scale. Weights are relative. */
export function weightedScore(scores: Record<PillarId, number>, weights: Record<PillarId, number>): number {
  let s = 0;
  let w = 0;
  for (const p of IDS) {
    s += scores[p] * weights[p];
    w += weights[p];
  }
  return w ? s / w : 0;
}

export interface RankedPolicy {
  country: string;
  name: string;
  score: number;
  rank: number;
  scores: Record<PillarId, number>;
  dealBreakers: string[];
  isSample: boolean;
}

/** Scores and ranks countries under one weight preset (ties share a rank). */
export function rankPolicies(
  rows: { country: string; name: string; scores: Record<PillarId, number>; dealBreakers: string[]; isSample: boolean }[],
  weights: Record<PillarId, number>,
): RankedPolicy[] {
  const scored = rows
    .map((r) => ({ ...r, score: Math.round(weightedScore(r.scores, weights) * 100) / 100, rank: 0 }))
    .sort((a, b) => b.score - a.score);
  scored.forEach((r, i) => (r.rank = i > 0 && scored[i - 1].score === r.score ? scored[i - 1].rank : i + 1));
  return scored;
}
