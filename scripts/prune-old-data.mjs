// Deletes deals dated before the rolling five-year window from every deal data file.
// Usage: node scripts/prune-old-data.mjs [--dry-run]
// Run daily by .github/workflows/prune-old-data.yml; the commit it makes triggers a fresh site build.
import { readFileSync, writeFileSync } from "node:fs";

const WINDOW_YEARS = 5; // keep in step with lib/window.ts
const now = new Date();
const cutoff = new Date(Date.UTC(now.getUTCFullYear() - WINDOW_YEARS, now.getUTCMonth(), now.getUTCDate()))
  .toISOString()
  .slice(0, 10);
const dry = process.argv.includes("--dry-run");

// Each file holds one JSON array of deals; the .ts files wrap it in a typed export.
const FILES = ["data/deals-news.json", "data/deals-curated.ts", "data/deals-iati.ts", "data/deals-worldbank.ts"];

let removed = 0;
for (const file of FILES) {
  const text = readFileSync(file, "utf8");
  const isJson = file.endsWith(".json");
  const start = isJson ? text.indexOf("[") : text.indexOf("[", text.indexOf("= "));
  const end = text.lastIndexOf("]");
  if (start < 0 || end < start) throw new Error(`${file}: no array found`);
  const list = JSON.parse(text.slice(start, end + 1));
  const kept = list.filter((d) => !d.date || d.date >= cutoff);
  const gone = list.length - kept.length;
  if (!gone) continue;
  removed += gone;
  console.log(`${file}: removing ${gone} of ${list.length} deals dated before ${cutoff}`);
  if (dry) continue;
  // Keep each file's existing layout: pretty-printed files stay pretty, compact ones compact.
  const indent = /^\[\n( +)/.exec(text.slice(start, start + 20))?.[1].length ?? 0;
  const body = indent ? JSON.stringify(kept, null, indent) : JSON.stringify(kept);
  writeFileSync(file, text.slice(0, start) + body + text.slice(end + 1));
}
console.log(removed ? `Removed ${removed} deals older than ${cutoff}${dry ? " (dry run)" : ""}.` : `Nothing older than ${cutoff}.`);
