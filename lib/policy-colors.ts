// Policy heatmap colours and cell type (client-safe; shared by the map and its legend).

/** Per-country policy score for the heatmap (null = not scored yet). */
export interface PolicyCell {
  score: number | null;
  /** Extra line for the tooltip, e.g. the data year. */
  note?: string;
  rank?: number;
  flagged?: boolean;
  isSample?: boolean;
}
export type PolicyScores = Record<string, PolicyCell>;

/**
 * Diverging ramp: red-orange = unsupportive, neutral sand at the midpoint (3), green = supportive.
 * The two ends also differ in lightness, and every score is shown as a number in tooltips,
 * panels and the list view, so colour is never the only cue.
 */
export const POLICY_RAMP: [number, string][] = [
  [1, "#c2362b"],
  [2, "#ec7a2e"],
  [3, "#d8cfae"],
  [4, "#5cbf6b"],
  [5, "#178a4f"],
];

/** Colour for a score on the diverging ramp (linear between stops). */
export function rampColor(score: number): string {
  const r = POLICY_RAMP;
  const v = Math.min(Math.max(score, r[0][0]), r[r.length - 1][0]);
  let i = 0;
  while (i < r.length - 2 && v > r[i + 1][0]) i++;
  const [a, ca] = r[i];
  const [b, cb] = r[i + 1];
  const t = (v - a) / (b - a);
  const hex = (c: string) => [1, 3, 5].map((k) => parseInt(c.slice(k, k + 2), 16));
  const [x, y] = [hex(ca), hex(cb)];
  return `#${x.map((n, k) => Math.round(n + (y[k] - n) * t).toString(16).padStart(2, "0")).join("")}`;
}

/**
 * Sequential ramp for the renewable-share globe (0 to 100%): one green hue, dark to bright,
 * so a higher share reads as more light against the navy globe.
 */
export const SHARE_RAMP: [number, string][] = [
  [0, "#1d3b4a"],
  [25, "#1f6b5a"],
  [50, "#2f9a62"],
  [75, "#5cc46c"],
  [100, "#b8e986"],
];

export function shareColor(pct: number): string {
  const r = SHARE_RAMP;
  const v = Math.min(Math.max(pct, 0), 100);
  let i = 0;
  while (i < r.length - 2 && v > r[i + 1][0]) i++;
  const [a, ca] = r[i];
  const [b, cb] = r[i + 1];
  const t = (v - a) / (b - a);
  const hex = (c: string) => [1, 3, 5].map((k) => parseInt(c.slice(k, k + 2), 16));
  const [x, y] = [hex(ca), hex(cb)];
  return `#${x.map((n, k) => Math.round(n + (y[k] - n) * t).toString(16).padStart(2, "0")).join("")}`;
}
