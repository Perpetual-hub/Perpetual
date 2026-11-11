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

  return {
    source: data.source,
    latestYear: y1,
    get: (iso2: string) => byIso.get(iso2.toUpperCase()),
    all: () => data.countries,
    snapshot,
    series,
  };
}
