// Builds the indicator-based PROFITS baseline: data/policy-scores.ts.
//
//   node scripts/build-profits.mjs
//
// Each pillar is scored from published indicators (World Bank WGI and WDI, IRENA
// statistics and Perpetual's own deal record). For every indicator, countries are
// ranked against each other and the percentile is mapped to 1-5 (lowest to
// highest; reversed where lower is better, e.g. inflation). A pillar is the mean
// of its available indicators. Nothing is judged by hand: this is a transparent
// baseline that researched, qualitative scores can later replace country by country.
import { readFileSync, writeFileSync } from "node:fs";

const ROOT = new URL("../", import.meta.url);
const UA = "PerpetualDataBot/0.1 (open data import)";
const YEARS = "2019:2025";

const readTsJson = (file, open = "= {") => {
  const s = readFileSync(new URL(file, ROOT), "utf8");
  return JSON.parse(s.slice(s.indexOf(open) + open.length - 1, s.lastIndexOf(";")));
};
const irena = readTsJson("data/stats/country-capacity.ts");
const deals = [...readTsJson("data/deals-worldbank.ts", "= ["), ...readTsJson("data/deals-iati.ts", "= [")];
const countries = new Set(irena.countries.map((c) => c.iso2));

async function wb(indicator) {
  const url = `https://api.worldbank.org/v2/country/all/indicator/${indicator}?format=json&per_page=20000&date=${YEARS}`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`${indicator}: HTTP ${r.status}`);
  const [, rows] = await r.json();
  const by = new Map(); // iso2 -> [{year, value}]
  for (const x of rows ?? []) {
    const iso2 = x.country?.id;
    if (x.value == null || !countries.has(iso2)) continue;
    if (!by.has(iso2)) by.set(iso2, []);
    by.get(iso2).push({ year: Number(x.date), value: x.value });
  }
  for (const v of by.values()) v.sort((a, b) => a.year - b.year);
  return by;
}
const latest = (series) => series?.at(-1);
const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;

// ----- indicator definitions -----
const SRC = {
  wgi: { publisher: "World Bank", title: "Worldwide Governance Indicators", url: "https://www.worldbank.org/en/publication/worldwide-governance-indicators" },
  wdi: { publisher: "World Bank", title: "World Development Indicators", url: "https://databank.worldbank.org/source/world-development-indicators" },
  irena: { publisher: "IRENA", title: irena.source.citation, url: irena.source.url },
  deals: { publisher: "Perpetual", title: "Perpetual deal record (World Bank and IATI financings)", url: "/deals" },
};

const [y0, y1] = irena.years;
const irenaRE = (c, year) =>
  ["solar", "windOnshore", "windOffshore", "hydro", "bioenergy", "geothermal", "marine"].reduce(
    (s, k) => s + (c.capacityMW[k]?.[year - y0] ?? 0),
    0,
  );
const genTotal = (c) => {
  const pts = c.generationGWh.total.map((v, i) => ({ year: y0 + i, value: v })).filter((p) => p.value != null && p.value > 0);
  return pts;
};
const dealCount = new Map();
for (const d of deals) if (d.date >= "2021-01-01") for (const c of d.countries) dealCount.set(c, (dealCount.get(c) ?? 0) + 1);

/** Each indicator returns, per country, { value, year, label } or nothing. `higher` = higher is better. */
const INDICATORS = {
  P: [
    { id: "GOV_WGI_PV.EST", name: "Political stability (WGI)", src: "wgi", higher: true, wb: true },
    { id: "GOV_WGI_GE.EST", name: "Government effectiveness (WGI)", src: "wgi", higher: true, wb: true },
  ],
  R: [
    { id: "GOV_WGI_RQ.EST", name: "Regulatory quality (WGI)", src: "wgi", higher: true, wb: true },
    { id: "GOV_WGI_RL.EST", name: "Rule of law (WGI)", src: "wgi", higher: true, wb: true },
  ],
  O: [
    { id: "NY.GDP.MKTP.KD.ZG", name: "GDP growth, 5-year average (%)", src: "wdi", higher: true, wb: true, avg: 5 },
    {
      id: "irena-demand",
      name: "Electricity generation growth, 5-year average (%)",
      src: "irena",
      higher: true,
      calc: (c) => {
        const pts = genTotal(c);
        const last = pts.at(-1);
        const first = pts.find((p) => p.year === last?.year - 5);
        if (!last || !first || first.value <= 0) return undefined;
        return { value: (Math.pow(last.value / first.value, 1 / 5) - 1) * 100, year: last.year };
      },
    },
  ],
  F: [
    { id: "FP.CPI.TOTL.ZG", name: "Inflation, 5-year average (%)", src: "wdi", higher: false, wb: true, avg: 5 },
    { id: "PA.NUS.FCRF", name: "Currency change against USD over 5 years (%)", src: "wdi", higher: false, wb: true, change: 5 },
    { id: "FR.INR.LEND", name: "Lending interest rate (%)", src: "wdi", higher: false, wb: true, mrv: true },
  ],
  I: [
    { id: "EG.ELC.ACCS.ZS", name: "Access to electricity (% of population)", src: "wdi", higher: true, wb: true },
    { id: "EG.ELC.LOSS.ZS", name: "Transmission and distribution losses (% of output)", src: "wdi", higher: false, wb: true },
    {
      id: "irena-growth",
      name: "Renewable capacity growth, 5 years (%)",
      src: "irena",
      higher: true,
      calc: (c) => {
        const a = irenaRE(c, y1 - 5);
        const b = irenaRE(c, y1);
        return a > 0 ? { value: (b / a - 1) * 100, year: y1 } : undefined;
      },
    },
  ],
  T: [
    {
      id: "irena-installed",
      name: "Installed renewable capacity (MW)",
      src: "irena",
      higher: true,
      calc: (c) => ({ value: irenaRE(c, y1), year: y1 }),
    },
    {
      id: "irena-added",
      name: "Renewable capacity added in 5 years (MW)",
      src: "irena",
      higher: true,
      calc: (c) => ({ value: Math.max(0, irenaRE(c, y1) - irenaRE(c, y1 - 5)), year: y1 }),
    },
    {
      id: "deals",
      name: "Renewable financings on record since 2021",
      src: "deals",
      higher: true,
      calc: (c) => ({ value: dealCount.get(c.iso2) ?? 0, year: Number(new Date().getFullYear()) }),
    },
  ],
  S: [
    { id: "GOV_WGI_VA.EST", name: "Voice and accountability (WGI)", src: "wgi", higher: true, wb: true },
    { id: "GOV_WGI_CC.EST", name: "Control of corruption (WGI)", src: "wgi", higher: true, wb: true },
  ],
};

// ----- fetch World Bank series -----
const series = {};
for (const list of Object.values(INDICATORS))
  for (const ind of list)
    if (ind.wb) {
      series[ind.id] = await wb(ind.id);
      console.log(`${ind.id}: ${series[ind.id].size} countries`);
    }

function valueFor(ind, c) {
  if (ind.calc) return ind.calc(c);
  const s = series[ind.id].get(c.iso2);
  if (!s?.length) return undefined;
  const last = latest(s);
  if (ind.avg) {
    const pts = s.filter((p) => p.year > last.year - ind.avg);
    return { value: mean(pts.map((p) => p.value)), year: last.year };
  }
  if (ind.change) {
    const first = s.find((p) => p.year === last.year - ind.change);
    if (!first || first.value <= 0) return undefined;
    return { value: (last.value / first.value - 1) * 100, year: last.year };
  }
  if (last.year < 2019) return undefined;
  return last;
}

// ----- percentile scoring -----
const round1 = (x) => Math.round(x * 10) / 10;
const scored = new Map(irena.countries.map((c) => [c.iso2, { pillars: {}, indicators: {} }]));
for (const [pillar, list] of Object.entries(INDICATORS)) {
  for (const ind of list) {
    const vals = irena.countries.map((c) => [c.iso2, valueFor(ind, c)]).filter(([, v]) => v && Number.isFinite(v.value));
    const sorted = vals.map(([, v]) => v.value).sort((a, b) => a - b);
    for (const [iso2, v] of vals) {
      // Mid-rank percentile, so ties share a score.
      const lo = sorted.findIndex((x) => x >= v.value);
      const hi = sorted.length - 1 - [...sorted].reverse().findIndex((x) => x <= v.value);
      let pct = sorted.length > 1 ? (lo + hi) / 2 / (sorted.length - 1) : 0.5;
      if (!ind.higher) pct = 1 - pct;
      const rec = scored.get(iso2);
      (rec.indicators[pillar] ??= []).push({
        id: ind.id,
        name: ind.name,
        value: Math.round(v.value * 100) / 100,
        year: v.year,
        score: round1(1 + 4 * pct),
        source: ind.src,
      });
    }
  }
}

const today = new Date().toISOString().slice(0, 10);
const out = [];
for (const [iso2, rec] of scored) {
  const pillars = {};
  for (const p of Object.keys(INDICATORS)) {
    const xs = rec.indicators[p];
    if (xs?.length) pillars[p] = round1(mean(xs.map((x) => x.score)));
  }
  // Publish a country only when every pillar has at least one indicator.
  if (Object.keys(pillars).length < 7) continue;
  const used = new Set(Object.values(rec.indicators).flat().map((x) => x.source));
  out.push({
    country: iso2,
    isSample: false,
    basis: "indicators",
    scores: pillars,
    dealBreakers: [],
    assessedAt: today,
    indicators: rec.indicators,
    sources: [...used].map((k) => ({ ...SRC[k], retrievedAt: today })),
  });
}
out.sort((a, b) => a.country.localeCompare(b.country));

writeFileSync(
  new URL("data/policy-scores.ts", ROOT),
  `// GENERATED by scripts/build-profits.mjs. Do not edit by hand.
// Indicator-based PROFITS baseline: World Bank WGI and WDI, IRENA and Perpetual's deal record.
import type { CountryPolicy } from "./policy";

export const indicatorPolicies: CountryPolicy[] = ${JSON.stringify(out)};
`,
);
console.log(`Scored ${out.length} countries on all seven pillars.`);
