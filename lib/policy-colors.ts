// Policy heatmap colours and cell type (client-safe; shared by the map and its legend).

/** Per-country policy score for the heatmap (null = not scored yet). */
export interface PolicyCell {
  score: number | null;
  rank?: number;
  flagged?: boolean;
  isSample?: boolean;
}
export type PolicyScores = Record<string, PolicyCell>;

/** Sequential ramp (lightness rises with the score), readable on the navy globe. */
export const POLICY_RAMP: [number, string][] = [
  [1, "#2b3a52"],
  [2.5, "#2a6a7a"],
  [3, "#2b8a72"],
  [3.5, "#46aa62"],
  [4, "#8fd36a"],
  [5, "#e6f39a"],
];
