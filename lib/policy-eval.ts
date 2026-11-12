// How well PROFITS lines up with what actually happened: renewable capacity growth (IRENA) and deal flow
// (Perpetual's record). Everything is computed from data already on the site; nothing is estimated.
import type { PillarId } from "@/data/policy";
import { getCountryPolicies } from "./policy";
import { weightedScore } from "./policy-score";

export interface EvalInput {
  /** Renewable capacity five years before the latest IRENA year, and now, in MW. */
  capacity: Map<string, { before: number; now: number; fromYear: number; toYear: number }>;
  /** Deals on record per country. */
  deals: Map<string, number>;
}

/** Spearman rank correlation (average ranks for ties). */
export function spearman(xs: number[], ys: number[]): number {
  const rank = (v: number[]) => {
    const idx = v.map((x, i) => [x, i] as const).sort((a, b) => a[0] - b[0]);
    const r = new Array<number>(v.length);
    for (let i = 0; i < idx.length; ) {
      let j = i;
      while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++;
      for (let k = i; k <= j; k++) r[idx[k][1]] = (i + j) / 2 + 1;
      i = j + 1;
    }
    return r;
  };
  const a = rank(xs);
  const b = rank(ys);
  const n = a.length;
  const ma = a.reduce((s, x) => s + x, 0) / n;
  const mb = b.reduce((s, x) => s + x, 0) / n;
  let num = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < n; i++) {
    num += (a[i] - ma) * (b[i] - mb);
    da += (a[i] - ma) ** 2;
    db += (b[i] - mb) ** 2;
  }
  return da && db ? num / Math.sqrt(da * db) : 0;
}

const median = (v: number[]) => {
  const s = [...v].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length ? (s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2) : 0;
};

const NO_TRACK: Record<PillarId, number> = { P: 1, R: 1, O: 1, F: 1, I: 1, T: 0, S: 1 };

export interface PolicyEvaluation {
  countries: number;
  fromYear: number;
  toYear: number;
  /** Score without the Track record pillar, so the test does not use the outcome it predicts. */
  growth: { rho: number; topMedian: number; bottomMedian: number; quintileSize: number };
  deals: { rho: number; topMedian: number; bottomMedian: number };
  /** Share of countries with at least one deal, top fifth vs bottom fifth. */
  anyDeal: { top: number; bottom: number };
}

export function evaluatePolicy({ capacity, deals }: EvalInput): PolicyEvaluation | undefined {
  const rows = getCountryPolicies()
    .map((c) => {
      const cap = capacity.get(c.country);
      if (!cap || cap.before < 50) return undefined; // growth from a tiny base is noise
      return {
        country: c.country,
        score: weightedScore(c.scores, NO_TRACK),
        growth: cap.now / cap.before - 1,
        deals: deals.get(c.country) ?? 0,
        cap,
      };
    })
    .filter((r): r is NonNullable<typeof r> => !!r)
    .sort((a, b) => b.score - a.score);
  if (rows.length < 20) return undefined;
  const q = Math.floor(rows.length / 5);
  const top = rows.slice(0, q);
  const bottom = rows.slice(-q);
  return {
    countries: rows.length,
    fromYear: rows[0].cap.fromYear,
    toYear: rows[0].cap.toYear,
    growth: {
      rho: spearman(
        rows.map((r) => r.score),
        rows.map((r) => r.growth),
      ),
      topMedian: median(top.map((r) => r.growth)),
      bottomMedian: median(bottom.map((r) => r.growth)),
      quintileSize: q,
    },
    deals: {
      rho: spearman(
        rows.map((r) => r.score),
        rows.map((r) => r.deals),
      ),
      topMedian: median(top.map((r) => r.deals)),
      bottomMedian: median(bottom.map((r) => r.deals)),
    },
    anyDeal: {
      top: top.filter((r) => r.deals > 0).length / q,
      bottom: bottom.filter((r) => r.deals > 0).length / q,
    },
  };
}
