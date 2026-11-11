// Official country statistics (IRENA), read through lib/data.ts. Values are as
// published. The only arithmetic here is summing IRENA's own technology groups
// and dividing published figures to get shares.
import type { CapacityRow, CapacitySeries, CountryCapacity, CountryCapacityData, CountryCapacityKey } from "./types";

const RE_KEYS: CountryCapacityKey[] = ["solar", "windOnshore", "windOffshore", "hydro", "bioenergy", "geothermal", "marine"];
const NON_RE_KEYS: CountryCapacityKey[] = ["fossil", "nuclear", "otherNonRenewable"];

export interface CountrySnapshot {
  iso2: string;
  year: number;
  renewableMW: number;
  solarMW: number;
  windMW: number;
  hydroMW: number;
  otherRenewableMW: number;
  /** All generating capacity IRENA lists, excluding pumped storage. */
  totalMW: number;
  /** Renewable share of capacity, 0 to 1. Undefined when no total is published. */
  renewableCapacityShare?: number;
  /** Latest year with published generation, and the renewable share of it. */
  generationYear?: number;
  renewableGenerationShare?: number;
  /** Renewable capacity added over the previous five years. */
  addedFiveYearsMW: number;
}

/** IRENA's region names, written out for display. */
export const REGION_DISPLAY: Record<string, string> = {
  Africa: "Africa",
  Asia: "Asia",
  "C America + Carib": "Central America and the Caribbean",
  Eurasia: "Eurasia",
  Europe: "Europe",
  "Middle East": "Middle East",
  "N America": "North America",
  Oceania: "Oceania",
  "S America": "South America",
};

export const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export interface RegionInfo {
  slug: string;
  name: string;
  countries: string[];
}

export function makeCountryStats(data: CountryCapacityData) {
  const [y0, y1] = data.years;
  const idx = (year: number) => year - y0;
  const at = (c: CountryCapacity, k: CountryCapacityKey, year: number) => c.capacityMW[k]?.[idx(year)] ?? 0;
  const sum = (c: CountryCapacity, keys: CountryCapacityKey[], year: number) => keys.reduce((s, k) => s + at(c, k, year), 0);
  const byIso = new Map(data.countries.map((c) => [c.iso2, c]));

  function snapshot(c: CountryCapacity): CountrySnapshot {
    const year = y1;
    const renewableMW = sum(c, RE_KEYS, year);
    const totalMW = renewableMW + sum(c, NON_RE_KEYS, year);
    let generationYear: number | undefined;
    let renewableGenerationShare: number | undefined;
    for (let y = y1; y >= y0; y--) {
      const t = c.generationGWh.total[idx(y)];
      const r = c.generationGWh.renewable[idx(y)];
      if (t != null && t > 0 && r != null) {
        generationYear = y;
        renewableGenerationShare = r / t;
        break;
      }
    }
    const solarMW = at(c, "solar", year);
    const windMW = at(c, "windOnshore", year) + at(c, "windOffshore", year);
    const hydroMW = at(c, "hydro", year);
    return {
      iso2: c.iso2,
      year,
      renewableMW,
      solarMW,
      windMW,
      hydroMW,
      otherRenewableMW: renewableMW - solarMW - windMW - hydroMW,
      totalMW,
      renewableCapacityShare: totalMW > 0 ? renewableMW / totalMW : undefined,
      generationYear,
      renewableGenerationShare,
      addedFiveYearsMW: Math.max(0, renewableMW - sum(c, RE_KEYS, Math.max(y0, year - 5))),
    };
  }

  function series(c: CountryCapacity): CapacitySeries {
    const rows: CapacityRow[] = [];
    for (let y = y0; y <= y1; y++) {
      const g = (k: CountryCapacityKey) => at(c, k, y) / 1000;
      const row = {
        year: y,
        solar: g("solar"),
        wind: g("windOnshore") + g("windOffshore"),
        hydro: g("hydro"),
        bioenergy: g("bioenergy"),
        geothermal: g("geothermal"),
        marine: g("marine"),
        total: 0,
      };
      row.total = row.solar + row.wind + row.hydro + row.bioenergy + row.geothermal + row.marine;
      rows.push(row);
    }
    return { unit: "GW", source: data.source, rows };
  }

  const regionMap = new Map<string, RegionInfo>();
  for (const c of data.countries) {
    const name = REGION_DISPLAY[c.region] ?? c.region;
    const slug = slugOf(name);
    if (!regionMap.has(slug)) regionMap.set(slug, { slug, name, countries: [] });
    regionMap.get(slug)!.countries.push(c.iso2);
  }

  /** A region as one synthetic "country": every series is the sum of its countries'. */
  function aggregate(region: RegionInfo): CountryCapacity {
    const n = y1 - y0 + 1;
    const members = region.countries.map((iso) => byIso.get(iso)!);
    const capacityMW: CountryCapacity["capacityMW"] = {};
    for (const m of members)
      for (const [k, v] of Object.entries(m.capacityMW) as [CountryCapacityKey, number[]][]) {
        const acc = (capacityMW[k] ??= Array(n).fill(0));
        v.forEach((x, i) => (acc[i] += x));
      }
    // Generation share only for years every member has published.
    const gen = (key: "renewable" | "total") =>
      Array.from({ length: n }, (_, i) =>
        members.every((m) => m.generationGWh.total[i] != null)
          ? members.reduce((s, m) => s + (m.generationGWh[key][i] ?? 0), 0)
          : null,
      );
    return { iso2: region.slug, name: region.name, region: region.name, capacityMW, generationGWh: { renewable: gen("renewable"), total: gen("total") } };
  }

  /** One technology's installed MW for a country, latest year (wind = onshore + offshore). */
  function techMW(c: CountryCapacity, tech: string): number {
    if (tech === "wind") return at(c, "windOnshore", y1) + at(c, "windOffshore", y1);
    return ["solar", "hydro", "bioenergy", "geothermal", "marine"].includes(tech) ? at(c, tech as CountryCapacityKey, y1) : 0;
  }

  return {
    source: data.source,
    techMW,
    regions: () => [...regionMap.values()].sort((a, b) => a.name.localeCompare(b.name)),
    region: (slug: string) => regionMap.get(slug),
    regionOf: (iso2: string) => {
      const c = byIso.get(iso2.toUpperCase());
      return c ? (REGION_DISPLAY[c.region] ?? c.region) : undefined;
    },
    aggregate,
    latestYear: y1,
    get: (iso2: string) => byIso.get(iso2.toUpperCase()),
    all: () => data.countries,
    snapshot,
    series,
  };
}
