"use client";

import { ArrowDown, ArrowUp, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export interface CountryStatsRow {
  iso2: string;
  name: string;
  renewableMW: number;
  solarMW: number;
  windMW: number;
  hydroMW: number;
  otherRenewableMW: number;
  addedFiveYearsMW: number;
  /** 0 to 1 */
  renewableGenerationShare?: number;
}

type SortKey = "name" | "renewableMW" | "solarMW" | "windMW" | "hydroMW" | "otherRenewableMW" | "addedFiveYearsMW" | "renewableGenerationShare";

const COLS: { key: SortKey; label: string; short?: string }[] = [
  { key: "renewableMW", label: "Renewable capacity", short: "Total" },
  { key: "solarMW", label: "Solar" },
  { key: "windMW", label: "Wind" },
  { key: "hydroMW", label: "Hydropower" },
  { key: "otherRenewableMW", label: "Other renewables", short: "Other" },
  { key: "addedFiveYearsMW", label: "Added in 5 years", short: "Added, 5 yrs" },
  { key: "renewableGenerationShare", label: "Renewable share of electricity", short: "RE share" },
];

const gw = (mw: number) =>
  mw >= 100_000
    ? Math.round(mw / 1000).toLocaleString("en-GB")
    : (mw / 1000).toLocaleString("en-GB", { maximumFractionDigits: mw >= 10_000 ? 1 : 2, minimumFractionDigits: 0 });

/** Every country IRENA covers, searchable and sortable. Capacity in GW. */
export function CountryStatsTable({
  rows,
  year,
  generationYear,
}: {
  rows: CountryStatsRow[];
  year: number;
  generationYear?: number;
}) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "renewableMW", dir: -1 });
  const [all, setAll] = useState(false);

  const sorted = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = needle ? rows.filter((r) => r.name.toLowerCase().includes(needle)) : rows;
    return [...list].sort((a, b) => {
      if (sort.key === "name") return a.name.localeCompare(b.name) * sort.dir;
      const av = a[sort.key] ?? -1;
      const bv = b[sort.key] ?? -1;
      return (av - bv) * sort.dir;
    });
  }, [rows, q, sort]);
  const shown = all || q ? sorted : sorted.slice(0, 25);

  const header = (key: SortKey, label: string, short?: string, left = false) => {
    const active = sort.key === key;
    return (
      <th
        key={key}
        scope="col"
        aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
        className={`px-3 py-2.5 font-medium whitespace-nowrap ${left ? "text-left" : "text-right"}`}
      >
        <button
          type="button"
          onClick={() => setSort({ key, dir: active ? (sort.dir === 1 ? -1 : 1) : key === "name" ? 1 : -1 })}
          className={`inline-flex items-center gap-1 hover:text-ink ${active ? "text-ink" : ""}`}
          title={label}
        >
          {short ? (
            <>
              <span className="hidden xl:inline">{label}</span>
              <span className="xl:hidden">{short}</span>
            </>
          ) : (
            label
          )}
          {active && (sort.dir === 1 ? <ArrowUp className="size-3" aria-hidden /> : <ArrowDown className="size-3" aria-hidden />)}
        </button>
      </th>
    );
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <label className="relative block w-full max-w-xs">
          <span className="sr-only">Find a country</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Find a country"
            className="w-full rounded-lg border border-line bg-white py-2 pr-3 pl-9 text-sm focus:border-brand-blue focus:outline-none"
          />
        </label>
        <p className="text-xs text-muted">
          Capacity in GW, {year}. Electricity share for {generationYear ?? "the latest published year"}.
        </p>
      </div>
      <div className="overflow-x-auto rounded-[var(--radius)] border border-line">
        <table className="w-full text-sm">
          <caption className="sr-only">
            Installed renewable capacity by country, {year}, in gigawatts. Select a column heading to sort.
          </caption>
          <thead className="bg-surface-2 text-xs text-muted">
            <tr>
              <th scope="col" className="w-10 px-3 py-2.5 text-left font-medium">#</th>
              {header("name", "Country", undefined, true)}
              {COLS.map((c) => header(c.key, c.label, c.short))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {shown.map((r, i) => (
              <tr key={r.iso2} className="hover:bg-surface-2">
                <td className="tabular px-3 py-2.5 text-muted">{i + 1}</td>
                <th scope="row" className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">
                  <Link href={`/countries/${r.iso2}`} className="text-ink hover:text-brand-blue">
                    {r.name}
                  </Link>
                </th>
                <td className="tabular px-3 py-2.5 text-right font-semibold">{gw(r.renewableMW)}</td>
                <td className="tabular px-3 py-2.5 text-right">{gw(r.solarMW)}</td>
                <td className="tabular px-3 py-2.5 text-right">{gw(r.windMW)}</td>
                <td className="tabular px-3 py-2.5 text-right">{gw(r.hydroMW)}</td>
                <td className="tabular px-3 py-2.5 text-right">{gw(r.otherRenewableMW)}</td>
                <td className="tabular px-3 py-2.5 text-right">{gw(r.addedFiveYearsMW)}</td>
                <td className="tabular px-3 py-2.5 text-right">
                  {r.renewableGenerationShare == null ? "—" : `${Math.round(r.renewableGenerationShare * 100)}%`}
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-muted">
                  No country matches &ldquo;{q}&rdquo;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!q && sorted.length > 25 && (
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          className="mt-4 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium hover:border-[#cdd6e2]"
        >
          {all ? "Show top 25" : `Show all ${sorted.length} countries`}
        </button>
      )}
    </div>
  );
}
