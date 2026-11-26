// The site keeps a rolling five-year window of deals. Anything dated before the start of the
// window is hidden when the site is built, and scripts/prune-old-data.mjs deletes it from the
// data files (run daily by .github/workflows/prune-old-data.yml).
export const WINDOW_YEARS = 5;

/** First day of the window: the same calendar day, five years before `today` (UTC). */
export function windowStart(today: Date = new Date()): string {
  const d = new Date(Date.UTC(today.getUTCFullYear() - WINDOW_YEARS, today.getUTCMonth(), today.getUTCDate()));
  return d.toISOString().slice(0, 10);
}
