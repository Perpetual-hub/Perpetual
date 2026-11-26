// Adds deals written by hand (by a person or a Claude Code session) to data/deals-news.json,
// with no Claude API calls.
//
//   node scripts/add-deals-by-hand.mjs NEW-DEALS.json
//
// NEW-DEALS.json is an array. Each item is one article that was read in full:
//   {
//     "url": "https://...",            article link (shown as "Read the news")
//     "publisher": "ESG Today",
//     "headline": "Article headline as published",
//     "published": "2026-11-26",       date of the article
//     "type": "M&A" | "project finance" | "equity raise" | "PPA" | "IPO" | "fund close" |
//             "joint venture" | "refinancing" | "development finance",
//     "status": "announced" | "completed" | "terminated",
//     "title": "Short neutral headline in our own words",
//     "technologies": ["solar", "wind", "hydro", "storage", "geothermal", "hydrogen", "bioenergy", "marine"],
//     "countries": ["GB"],             ISO alpha-2 codes of where the assets are
//     "buyers": [{"name": "...", "role": "lender"}], "sellers": [...], "advisors": [...],
//     "target": "...", "stake_pct": 49,
//     "value_amount": 145000000,       full amount, not millions
//     "value_currency": "USD",
//     "capacity_mw": 300, "storage_mwh": 1200,
//     "summary": "...", "details": "...", "context": "..."   our own words, facts from the article only
//   }
// Each item goes into the same cache format scripts/extract-deals.mjs uses, then that script merges
// them: it skips articles already on the site and merges reports of the same deal.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [, , input] = process.argv;
if (!input) throw new Error("usage: node scripts/add-deals-by-hand.mjs NEW-DEALS.json");
const items = JSON.parse(readFileSync(input, "utf8"));

const TYPES = ["M&A", "project finance", "equity raise", "PPA", "IPO", "fund close", "joint venture", "refinancing", "development finance"];
const TECH = ["solar", "wind", "hydro", "storage", "geothermal", "hydrogen", "bioenergy", "marine"];
const problems = [];
items.forEach((d, i) => {
  const at = `item ${i} (${d.url})`;
  if (!/^https?:\/\//.test(d.url ?? "")) problems.push(`${at}: url`);
  if (!d.publisher) problems.push(`${at}: publisher`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.published ?? "")) problems.push(`${at}: published must be YYYY-MM-DD`);
  if (!TYPES.includes(d.type)) problems.push(`${at}: type`);
  if (!d.technologies?.length || d.technologies.some((t) => !TECH.includes(t))) problems.push(`${at}: technologies`);
  if (!d.countries?.every((c) => /^[A-Z]{2}$/.test(c))) problems.push(`${at}: countries`);
  if (!d.title || !d.summary) problems.push(`${at}: title and summary`);
  if ((d.details ?? "").length < 90 || (d.context ?? "").length < 60) problems.push(`${at}: details and context too short`);
  if (d.value_amount != null && d.value_amount < 100_000) problems.push(`${at}: value_amount looks like millions; give the full amount`);
  if (d.value_amount != null && !/^[A-Z]{3}$/.test(d.value_currency ?? "")) problems.push(`${at}: value_currency`);
});
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), "deals-by-hand-"));
const cache = join(dir, "extract");
mkdirSync(cache);
const key = (u) => createHash("sha1").update(u).digest("hex").slice(0, 16);
for (const d of items) {
  const data = {
    is_renewable_transaction: true,
    type: d.type,
    status: d.status ?? "announced",
    title: d.title,
    technologies: d.technologies,
    countries: d.countries ?? [],
    buyers: d.buyers ?? [],
    sellers: d.sellers ?? [],
    target: d.target ?? null,
    stake_pct: d.stake_pct ?? null,
    value_amount: d.value_amount ?? null,
    value_currency: d.value_currency ?? null,
    capacity_mw: d.capacity_mw ?? null,
    storage_mwh: d.storage_mwh ?? null,
    summary: d.summary,
    details: d.details ?? null,
    context: d.context ?? null,
    advisors: d.advisors ?? [],
  };
  writeFileSync(
    join(cache, `${key(d.url)}.json`),
    JSON.stringify({ url: d.url, publisher: d.publisher, headline: d.headline ?? d.title, published: d.published, data }),
  );
}
const candidates = join(dir, "candidates.json");
writeFileSync(candidates, JSON.stringify(items.map((d) => ({ url: d.url, publisher: d.publisher, lastmod: d.published }))));

// Every item is already in the cache, so extract-deals never calls the API; the key only lets it start.
execFileSync("node", [new URL("./extract-deals.mjs", import.meta.url).pathname, candidates, cache], {
  stdio: "inherit",
  env: { ...process.env, ANTHROPIC_API_KEY: "not-used-all-cached" },
});
