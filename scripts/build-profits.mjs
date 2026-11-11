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
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const isoCountries = createRequire(import.meta.url)("i18n-iso-countries");

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
// ----- Climate Policy Database (NewClimate Institute et al., CC BY 4.0) -----
// Country-level climate and energy policies, many sourced from the IEA Policies Hub.
const CPDB_URL = "https://zenodo.org/api/records/19682932/files/ClimatePolicyDatabase_v2025.csv/content";
const CPDB_FILE = new URL(".cache/cpdb-2025.csv", ROOT);
if (!existsSync(CPDB_FILE)) {
  mkdirSync(new URL(".cache/", ROOT), { recursive: true });
  const r = await fetch(CPDB_URL, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`Climate Policy Database: HTTP ${r.status}`);
  writeFileSync(CPDB_FILE, Buffer.from(await r.arrayBuffer()));
}
function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (ch !== "\r") cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows;
  const keys = head.map((h) => h.replace(/^\uFEFF/, "").trim());
  return body.filter((r) => r.length > 1).map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? ""])));
}
const cpdbRows = parseCsv(readFileSync(CPDB_FILE, "utf8")).filter((r) => r.jurisdiction === "Country");
const cpdb = new Map(); // iso2 -> { total, re: [] }
for (const r of cpdbRows) {
  const iso2 = isoCountries.alpha3ToAlpha2(r.country_iso);
  if (!iso2) continue;
  if (!cpdb.has(iso2)) cpdb.set(iso2, { total: 0, re: [] });
  const c = cpdb.get(iso2);
  c.total++;
  // Renewable power policies: renewables in the type and a power or renewables sector, or a renewable target.
  const renewable =
    (/Renewables/.test(r.policy_type) && /Renewables|Electricity and heat/.test(r.sector)) ||
    /Renewables/.test(r.sector) ||
    /renewable energy target/i.test(r.policy_instrument);
  if (renewable && r.policy_status === "In force") c.re.push(r);
}
// Countries with too few records are not scored on policy indicators: "no record" is not "no policy".
const CPDB_MIN = 10;
const cpdbFor = (iso2) => {
  const c = cpdb.get(iso2);
  return c && c.total >= CPDB_MIN ? c : undefined;
};
const hasInst = (c, re) => c.re.some((r) => re.test(r.policy_instrument));

const SRC = {
  cpdb: {
    publisher: "NewClimate Institute, Wageningen University and PBL",
    title: "Climate Policy Database 2025 (CC BY 4.0), including policies from the IEA Policies Hub",
    url: "https://climatepolicydatabase.org/",
  },
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
    {
      id: "re-target",
      name: "Renewable energy target in force",
      src: "cpdb",
      fixed: true,
      calc: (c) => {
        const p = cpdbFor(c.iso2);
        if (!p) return undefined;
        const binding = hasInst(p, /Formal & legally binding renewable energy target/);
        const any = binding || hasInst(p, /renewable energy target/i);
        return binding
          ? { value: 5, display: "Legally binding", reason: "A legally binding renewable energy target is in force." }
          : any
            ? { value: 3, display: "Stated, not binding", reason: "A renewable energy target exists but is not legally binding." }
            : { value: 1, display: "None recorded", reason: "No renewable energy target is recorded as in force." };
      },
    },
    {
      id: "re-momentum",
      name: "Renewable policies adopted in the last five years",
      src: "cpdb",
      higher: true,
      calc: (c) => {
        const p = cpdbFor(c.iso2);
        if (!p) return undefined;
        const from = new Date().getFullYear() - 5;
        return { value: p.re.filter((r) => Number(r.decision_date.slice(0, 4)) >= from).length, year: new Date().getFullYear() };
      },
    },
    { id: "GOV_WGI_PV.EST", name: "Political stability (WGI)", src: "wgi", higher: true, wb: true },
  ],
  R: [
    {
      id: "re-support",
      name: "Renewable support schemes in force",
      src: "cpdb",
      fixed: true,
      calc: (c) => {
        const p = cpdbFor(c.iso2);
        if (!p) return undefined;
        const kinds = [
          [/Feed-in tariffs or premiums/, "feed-in tariffs or premiums"],
          [/Obligation schemes/, "obligation schemes"],
          [/Green certificates/, "green certificates"],
          [/Market-based instruments/, "market-based instruments"],
          [/Regulatory Instruments/, "renewable regulations"],
        ].filter(([re]) => hasInst(p, re));
        const n = kinds.length;
        return {
          value: Math.min(5, 1 + n),
          display: n ? `${n} of 5 types` : "None recorded",
          reason: n
            ? `Renewable support in force includes ${kinds.map(([, l]) => l).join(", ")}.`
            : "No renewable support schemes are recorded as in force.",
        };
      },
    },
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
    {
      id: "re-incentives",
      name: "Financial incentives for renewables in force",
      src: "cpdb",
      fixed: true,
      calc: (c) => {
        const p = cpdbFor(c.iso2);
        if (!p) return undefined;
        const kinds = [
          [/Grants and subsidies/, "grants and subsidies"],
          [/Tax relief/, "tax relief"],
          [/Loans/, "concessional loans"],
          [/Direct investment/, "public investment"],
        ].filter(([re]) => hasInst(p, re));
        const n = kinds.length;
        return {
          value: Math.min(5, 1 + n),
          display: n ? `${n} of 4 types` : "None recorded",
          reason: n
            ? `Financial support for renewables includes ${kinds.map(([, l]) => l).join(", ")}.`
            : "No financial incentives for renewables are recorded as in force.",
        };
      },
    },
    { id: "FP.CPI.TOTL.ZG", name: "Inflation, 5-year average (%)", src: "wdi", higher: false, wb: true, avg: 5 },
    { id: "PA.NUS.FCRF", name: "Currency change against USD over 5 years (%)", src: "wdi", higher: false, wb: true, change: 5 },
    { id: "FR.INR.LEND", name: "Lending interest rate (%)", src: "wdi", higher: false, wb: true, mrv: true },
  ],
  I: [
    {
      id: "irena-re-share",
      name: "Renewable share of electricity (%)",
      src: "irena",
      higher: true,
      calc: (c) => {
        for (let i = c.generationGWh.total.length - 1; i >= 0; i--) {
          const t = c.generationGWh.total[i];
          const r = c.generationGWh.renewable[i];
          if (t != null && t > 0 && r != null) return { value: (r / t) * 100, year: y0 + i };
        }
        return undefined;
      },
    },
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

// One plain sentence per indicator. Governance estimates have no meaningful unit, so only the comparison is given.
function reasonFor(ind, shown, year, better) {
  const label = ind.name.replace(/ \((WGI|%|MW|% of [^)]*)\)$/, "");
  const when = year ? ` (${year})` : "";
  if (ind.src === "wgi") return `${label} is better than in ${better}% of countries${when}.`;
  const unit = /\(MW\)/.test(ind.name) ? " MW" : /\(%|\(% of/.test(ind.name) ? "%" : "";
  return `${label}: ${shown}${unit}${when}, better than ${better}% of countries.`;
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
      const shown = Math.abs(v.value) >= 100 ? Math.round(v.value).toLocaleString("en-GB") : (Math.round(v.value * 10) / 10).toLocaleString("en-GB");
      const better = Math.round(pct * 100);
      (rec.indicators[pillar] ??= []).push({
        id: ind.id,
        name: ind.name,
        value: Math.round(v.value * 100) / 100,
        year: v.year ?? new Date().getFullYear(),
        score: ind.fixed ? v.value : round1(1 + 4 * pct),
        source: ind.src,
        ...(v.display ? { display: v.display } : {}),
        reason: v.reason ?? reasonFor(ind, shown, v.year, better),
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
  const pol = cpdbFor(iso2);
  const policies = pol
    ? [...pol.re]
        .sort((a, b) => b.decision_date.localeCompare(a.decision_date))
        .slice(0, 6)
        .map((r) => ({
          title: r.policy_name || r.policy_title,
          year: r.decision_date.slice(0, 4) || undefined,
          instrument: r.policy_instrument.split(",")[0].trim(),
          ...(/^https?:\/\//.test(r.reference.trim()) ? { url: r.reference.trim().split(/\s+/)[0] } : {}),
        }))
    : [];
  out.push({
    country: iso2,
    isSample: false,
    basis: "indicators",
    scores: pillars,
    dealBreakers: [],
    assessedAt: today,
    indicators: rec.indicators,
    ...(policies.length ? { policies } : {}),
    sources: [...used].map((k) => ({ ...SRC[k], retrievedAt: today })),
  });
}
out.sort((a, b) => a.country.localeCompare(b.country));

writeFileSync(
  new URL("data/policy-scores.ts", ROOT),
  `// GENERATED by scripts/build-profits.mjs. Do not edit by hand.
// Indicator-based PROFITS baseline: Climate Policy Database (incl. IEA Policies Hub), World Bank WGI and WDI, IRENA and Perpetual's deal record.
import type { CountryPolicy } from "./policy";

export const indicatorPolicies: CountryPolicy[] = ${JSON.stringify(out)};
`,
);
console.log(`Scored ${out.length} countries on all seven pillars.`);
