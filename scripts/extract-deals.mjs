// Turns press releases into Perpetual deal records: data/deals-news.ts.
//
//   node scripts/extract-deals.mjs CANDIDATES.json [CACHE_DIR] [LIMIT]
//
// CANDIDATES.json comes from scripts/collect-deal-news.py. For each release we
// download the page (PR Newswire allows crawlers), keep the article text, and ask
// Claude to pull out only the facts the release states: parties, capacity, value,
// location, dates. The summary, details and context are written in our own words,
// never copied. Releases that are not a renewable transaction are skipped. Every
// record links to the release as its source. Results are cached per URL, so the
// script can be stopped and resumed, and existing records are never re-billed.
//
// Needs Claude API credentials (ANTHROPIC_API_KEY, or the environment's proxy).
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { z } from "zod";

const [, , candidatesPath, cacheDir = ".cache/extract", limitArg] = process.argv;
if (!candidatesPath) throw new Error("usage: node scripts/extract-deals.mjs CANDIDATES.json [CACHE_DIR] [LIMIT]");
const LIMIT = limitArg ? Number(limitArg) : Infinity;
const UA = "PerpetualDataBot/0.1 (open data import)";
const SINCE = new Date(Date.now() - 5 * 365 * 86_400_000).toISOString().slice(0, 10);
mkdirSync(cacheDir, { recursive: true });

const client = new Anthropic();
const MODEL = process.env.EXTRACT_MODEL || "claude-opus-5-5";

const Party = z.object({ name: z.string(), role: z.string().nullable() });
const Extracted = z.object({
  is_renewable_transaction: z
    .boolean()
    .describe("True only if the release announces a concrete transaction in renewable energy, storage or green hydrogen."),
  type: z.enum(["M&A", "project finance", "equity raise", "PPA", "IPO", "fund close", "joint venture", "refinancing", "development finance"]).nullable(),
  status: z.enum(["announced", "completed", "terminated"]).nullable(),
  title: z.string().describe("Short neutral headline in our own words, e.g. 'Energy Vault acquires 850 MW Japan storage portfolio from BayWa r.e.'"),
  technologies: z.array(z.enum(["solar", "wind", "hydro", "storage", "geothermal", "hydrogen", "bioenergy", "marine"])),
  countries: z.array(z.string()).describe("ISO 3166-1 alpha-2 codes of the countries where the assets are"),
  buyers: z.array(Party).describe("Acquirers, investors, lenders, offtakers or fund managers, as fits the deal type"),
  sellers: z.array(Party).describe("Sellers, borrowers, developers or power sellers, as fits the deal type"),
  target: z.string().nullable(),
  stake_pct: z.number().nullable(),
  value_amount: z.number().nullable().describe("Full amount in units, e.g. 145000000, only if stated"),
  value_currency: z.string().nullable().describe("ISO 4217 code"),
  capacity_mw: z.number().nullable().describe("Generation or storage power capacity in MW, only if stated"),
  storage_mwh: z.number().nullable(),
  summary: z.string().describe("Two or three sentences in our own words: who did what, how big, where."),
  details: z
    .string()
    .nullable()
    .describe(
      "Three to five sentences in our own words: what the assets are (capacity split, storage duration, location, stage), how the deal is structured (loan types, tax equity, offtake contract and its length), who the lenders or advisers are, and expected dates. Explain any jargon in plain words.",
    ),
  context: z
    .string()
    .nullable()
    .describe(
      "Two to four sentences in our own words: why the deal matters to the parties and the market, using only what the release says, with company claims reported as claims.",
    ),
  advisors: z.array(Party).describe("Legal, financial or technical advisers named in the release"),
});

const SYSTEM = `You extract renewable energy deal records from press releases for a public deal database.
Rules:
- Use only facts stated in the release. If something is not stated, use null or an empty list. Never estimate or infer numbers.
- Write title, summary, details and context in your own words. Do not copy sentences from the release. No marketing language, no quotes, no semicolons.
- Readers include students and people new to the industry: explain terms like tax equity, financial close, build-transfer or merchant in a few plain words when they appear.
- The company that issued the release is a party, not a source of truth for opinions: report its claims as claims ("the company expects...").
- Set is_renewable_transaction to false for product launches, earnings, appointments, market reports, awards, residential offers, or deals not in renewable energy, storage or green hydrogen.
- Dates and amounts: amounts in full units (US$145 million = 145000000).`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const key = (u) => createHash("sha1").update(u).digest("hex").slice(0, 16);

function articleText(page) {
  const body =
    page.match(/<section[^>]+class="[^"]*release-body[^"]*"[^>]*>([\s\S]*?)<\/section>/)?.[1] ??
    page.match(/<article[\s\S]*?<\/article>/)?.[0] ??
    page.match(/<div[^>]+class="[^"]*(?:entry-content|article-body|post-content|field--name-body|story-body|article__content)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/)?.[1] ??
    // Fallback: every paragraph on the page, which for news articles is mostly the story.
    (page.match(/<p[\s>][\s\S]*?<\/p>/g) ?? []).join("\n");
  return body
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
    .replace(/<\/(p|div|li|h\d|tr)>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

function meta(page, prop) {
  return page.match(new RegExp(`<meta[^>]+(?:property|name)="${prop}"[^>]+content="([^"]+)"`))?.[1];
}

async function extract(c) {
  const cachePath = `${cacheDir}/${key(c.url)}.json`;
  if (existsSync(cachePath)) return JSON.parse(readFileSync(cachePath, "utf8"));
  const r = await fetch(c.url, { headers: { "User-Agent": UA } });
  if (!r.ok) return { url: c.url, error: `HTTP ${r.status}` };
  const page = await r.text();
  const text = articleText(page);
  const published = (meta(page, "article:published_time") ?? meta(page, "date") ?? c.lastmod ?? "").slice(0, 10);
  const headline = meta(page, "og:title") ?? c.slugTitle;
  if (!text || text.length < 200) return { url: c.url, error: "no article text" };

  const response = await client.beta.messages.parse({
    model: MODEL,
    max_tokens: 4000,
    // Server-side refusal fallback where the model supports it (not on Haiku).
    ...(/haiku/.test(MODEL) ? {} : { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" }),
    output_config: { effort: "low", format: betaZodOutputFormat(Extracted) },
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: `Headline: ${headline}\nPublished: ${published}\n\nRelease text:\n${text.slice(0, 30000)}`,
      },
    ],
  });
  const result =
    response.stop_reason === "refusal" || !response.parsed_output
      ? { url: c.url, error: `no output (${response.stop_reason})` }
      : { url: c.url, publisher: c.publisher ?? "PR Newswire", headline, published, data: response.parsed_output };
  writeFileSync(cachePath, JSON.stringify(result));
  await sleep(1000); // be polite to the source site
  return result;
}

// Region names as shown on the site, from IRENA's country list.
const REGION_DISPLAY = {
  Africa: "Africa", Asia: "Asia", "C America + Carib": "Central America and the Caribbean", Eurasia: "Eurasia",
  Europe: "Europe", "Middle East": "Middle East", "N America": "North America", Oceania: "Oceania", "S America": "South America",
};
const irenaSrc = readFileSync(new URL("../data/stats/country-capacity.ts", import.meta.url), "utf8");
const regionOf = new Map(
  JSON.parse(irenaSrc.slice(irenaSrc.indexOf("= {") + 2, irenaSrc.lastIndexOf(";"))).countries.map((c) => [
    c.iso2,
    REGION_DISPLAY[c.region] ?? c.region,
  ]),
);

const slug = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90).replace(/-$/, "");

function toDeal(x) {
  const d = x.data;
  if (!d?.is_renewable_transaction || !d.type || !d.technologies.length) return null;
  if (!x.published || x.published < SINCE) return null;
  const countries = d.countries.map((c) => c.toUpperCase()).filter((c) => /^[A-Z]{2}$/.test(c));
  const parties = (ps) => ps.filter((p) => p.name).map((p) => ({ name: p.name, ...(p.role ? { role: p.role } : {}) }));
  const cur = d.value_currency?.toUpperCase();
  return {
    id: `news-${key(x.url)}`,
    slug: `${slug(d.title)}-${key(x.url).slice(0, 6)}`,
    isSample: false,
    date: x.published,
    type: d.type,
    status: d.status ?? "announced",
    title: d.title,
    technologies: [...new Set(d.technologies)],
    countries,
    region: countries.length === 1 ? (regionOf.get(countries[0]) ?? "Other") : countries.length ? "Multi-country" : "Global",
    ...(parties(d.buyers).length ? { buyers: parties(d.buyers) } : {}),
    ...(parties(d.sellers).length ? { sellers: parties(d.sellers) } : {}),
    ...(d.target ? { target: d.target } : {}),
    ...(d.stake_pct != null && d.stake_pct > 0 && d.stake_pct <= 100 ? { stakePct: d.stake_pct } : {}),
    ...(d.value_amount && d.value_amount > 0 && cur && /^[A-Z]{3}$/.test(cur)
      ? { value: { amount: d.value_amount, currency: cur, ...(cur === "USD" ? { usd: d.value_amount } : {}), disclosed: true } }
      : {}),
    ...(d.capacity_mw && d.capacity_mw > 0 ? { capacityMW: d.capacity_mw } : {}),
    ...(parties(d.advisors ?? []).length ? { advisors: parties(d.advisors) } : {}),
    summary: d.summary,
    ...(d.details ? { details: d.details } : {}),
    ...(d.context ? { context: d.context } : {}),
    sources: [{ publisher: x.publisher ?? "PR Newswire", title: x.headline, url: x.url, retrievedAt: new Date().toISOString().slice(0, 10) }],
  };
}

// Releases already written by hand, or already turned into a published deal, are not read (or billed) again.
const curatedSrc = readFileSync(new URL("../data/deals-curated.ts", import.meta.url), "utf8");
// PR Newswire regional copies of one release differ only in the trailing number.
const releaseKey = (u) => u.replace(/-\d+\.html$/, "");
const publishedSrc = curatedSrc + (existsSync(new URL("../data/deals-news.json", import.meta.url)) ? readFileSync(new URL("../data/deals-news.json", import.meta.url), "utf8") : "");
const curatedUrls = new Set([...publishedSrc.matchAll(/"url": "([^"]+)"/g)].map((m) => releaseKey(m[1])));
const candidates = JSON.parse(readFileSync(candidatesPath, "utf8")).filter((c, i, all) => !curatedUrls.has(releaseKey(c.url)) && all.findIndex((o) => releaseKey(o.url) === releaseKey(c.url)) === i);
const results = [];
// MAX_RELEASES caps how many new releases one run reads (newest first), which caps its cost.
const MAX = Math.min(Number.isFinite(LIMIT) ? LIMIT : Infinity, Number(process.env.MAX_RELEASES ?? Infinity));
const todo = candidates.slice(0, Number.isFinite(MAX) ? MAX : undefined);
const CONCURRENCY = Number(process.env.EXTRACT_CONCURRENCY ?? 4);
// Stop starting new releases after this many minutes, so a long catch-up still saves its work.
const deadline = Date.now() + Number(process.env.MAX_MINUTES ?? 300) * 60_000;
let next = 0;
let done = 0;
let authFailed = false;
async function worker() {
  while (next < todo.length && Date.now() < deadline && !authFailed) {
    const c = todo[next++];
    try {
      const x = await extract(c);
      results.push(x);
      if (x.error) console.log(`skip ${c.url}: ${x.error}`);
    } catch (e) {
      if (e instanceof Anthropic.AuthenticationError) {
        authFailed = true;
      } else if (e instanceof Anthropic.RateLimitError) {
        console.log("rate limited, waiting 60s");
        next--; // retry this release
        await sleep(60_000);
      } else {
        console.log(`error ${c.url}: ${e instanceof Error ? e.message : e}`);
      }
    }
    if (++done % 25 === 0) console.log(`${done}/${todo.length} processed`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
if (authFailed) throw new Error("No valid Claude API credentials. Check the ANTHROPIC_API_KEY secret.");
if (next < todo.length) console.log(`Stopped at the time limit: ${todo.length - next} releases left for the next run.`);

// Keep every deal already published, add the new ones, newest first, one record per release.
// Stored as JSON: a TypeScript literal this large is too complex for the type checker (TS2590).
const outFile = new URL("../data/deals-news.json", import.meta.url);
const existing = existsSync(outFile) ? JSON.parse(readFileSync(outFile, "utf8")) : [];
const deals = [];
const seenTitle = new Set();
const seenId = new Set();
for (const d of existing) {
  seenId.add(d.id);
  seenTitle.add(`${d.date}|${d.title.toLowerCase()}`);
  deals.push(d);
}
// The same deal is often reported by a company release and by news sites. Treat two records as one
// when their titles share most of their distinctive words (company and place names, not generic deal
// vocabulary) and they are dated within ten days. Titles that both state figures must share one, so
// two different PPAs signed by the same company in the same week are kept apart.
const GENERIC = new Set(("signs signed sign secures secured secure closes closed close reaches reached financial financing finance " +
  "loan loans debt equity invests investment invest acquires acquired acquire acquisition buys buy bought sells sold sale " +
  "stake deal agreement agreements ppa ppas power purchase year long term solar wind battery storage bess energy renewable " +
  "renewables project projects portfolio plant plants farm farms park parks hybrid green million billion with from for and " +
  "the its into new first offshore onshore utility scale firm round clock").split(" "));
const words = (t) => new Set(t.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(" ").filter((w) => w.length > 2 && !GENERIC.has(w)));
const figures = (t) => new Set((t.match(/\d[\d.,]*/g) ?? []).map((n) => n.replace(/[.,]$/, "")));
const curatedAll = JSON.parse(curatedSrc.slice(curatedSrc.indexOf("= [") + 2, curatedSrc.lastIndexOf(";")));
const known = [...curatedAll, ...existing].map((d) => ({ w: words(d.title), f: figures(d.title), t: Date.parse(d.date) }));
const sameDeal = (d) => {
  const w = words(d.title);
  const f = figures(d.title);
  const t = Date.parse(d.date);
  return known.some((k) => {
    if (Math.abs(k.t - t) > 10 * 86_400_000) return false;
    if (f.size && k.f.size && ![...f].some((x) => k.f.has(x))) return false;
    let shared = 0;
    for (const x of w) if (k.w.has(x)) shared++;
    return shared >= 2 && shared / Math.min(w.size, k.w.size) >= 0.6;
  });
};
for (const x of results) {
  const d = x && !x.error ? toDeal(x) : null;
  if (!d) continue;
  const k = `${d.date}|${d.title.toLowerCase()}`;
  if (seenTitle.has(k) || seenId.has(d.id) || sameDeal(d)) continue;
  known.push({ w: words(d.title), f: figures(d.title), t: Date.parse(d.date) });
  seenId.add(d.id);
  seenTitle.add(k);
  deals.push(d);
}
deals.sort((a, b) => b.date.localeCompare(a.date));
const slugs = new Set();
for (const d of deals) {
  while (slugs.has(d.slug)) d.slug += "-x";
  slugs.add(d.slug);
}
writeFileSync(outFile, JSON.stringify(deals, null, 1) + "\n");
console.log(`Wrote ${deals.length} deals from ${results.length} releases.`);
