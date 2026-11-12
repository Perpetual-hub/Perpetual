"use client";

import { useId, useState } from "react";
import { Bar, BarChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { TECH_BY_ID } from "@/lib/tech";
import type { CapacityRow, CapacitySeries, Technology } from "@/lib/types";

type Key = keyof CapacityRow & Technology;
const ORDER: { key: Key; label: string }[] = [
  { key: "hydro", label: "Hydropower" },
  { key: "wind", label: "Wind" },
  { key: "solar", label: "Solar" },
  { key: "bioenergy", label: "Bioenergy" },
  { key: "geothermal", label: "Geothermal" },
  { key: "marine", label: "Marine" },
];

const fmt = (v: number) =>
  Math.abs(v) >= 100 ? Math.round(v).toLocaleString("en-GB") : v.toLocaleString("en-GB", { maximumFractionDigits: 1 });

/**
 * Net renewable capacity added each year: the change in installed capacity published by IRENA.
 * Independent of the projects and deals Perpetual tracks, so every year has a value.
 */
export function CapacityAdditionsChart({
  series,
  only,
  place = "the world",
  title = "Capacity Additions by Year",
  fromYear = 2010,
}: {
  series: CapacitySeries;
  /** Show a single technology (sector pages). */
  only?: Key;
  place?: string;
  title?: string;
  fromYear?: number;
}) {
  const id = useId();
  const [view, setView] = useState<"chart" | "table">("chart");
  const keys = ORDER.filter((s) => (only ? s.key === only : series.rows.some((r) => r[s.key] > 0)));
  const raw = series.rows.slice(1).map((r, i) => {
    const prev = series.rows[i];
    const row: Record<string, number> & { year: number } = { year: r.year, total: 0 };
    for (const k of keys) {
      row[k.key] = r[k.key] - prev[k.key];
      row.total += row[k.key];
    }
    return row;
  });
  const peakGW = Math.max(...raw.map((r) => Math.abs(r.total)));
  const useMW = peakGW < 5;
  const unit = useMW ? "MW" : "GW";
  const m = useMW ? 1000 : 1;
  const rows = raw
    .filter((r) => r.year >= fromYear)
    .map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, k === "year" ? v : v * m])) as typeof r);
  const last = rows[rows.length - 1];
  const prev = rows[rows.length - 2];
  if (!last) return null;
  const change = prev && prev.total > 0 ? (last.total - prev.total) / prev.total : undefined;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink">{title}</h2>
          <p className="mt-1 text-sm text-muted">
            Net capacity added in {place} each year{only ? `, ${TECH_BY_ID[only].label.toLowerCase()}` : ""}
          </p>
        </div>
        <div role="radiogroup" aria-label="Show as" className="flex rounded-lg border border-line bg-white p-0.5">
          {(["chart", "table"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={view === v}
              onClick={() => setView(v)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize ${view === v ? "bg-brand-navy text-white" : "text-muted hover:text-ink"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">
        <span className="tabular font-display text-3xl font-bold tracking-tight text-brand-navy">
          {fmt(last.total)} {unit}
        </span>{" "}
        added in {last.year}
        {change !== undefined && (
          <span className={change >= 0 ? "text-[#2f7d4f]" : "text-[#b4452f]"}>
            {" "}
            ({change >= 0 ? "+" : ""}
            {Math.round(change * 100)}% on {prev.year})
          </span>
        )}
      </p>

      {view === "chart" ? (
        <figure className="mt-4" aria-labelledby={`${id}-cap`}>
          <figcaption id={`${id}-cap`} className="sr-only">
            Bar chart of net renewable capacity added in {place} per year, {rows[0].year} to {last.year}, in {unit}. Use the Table
            view for exact values.
          </figcaption>
          <div className="h-[300px] w-full">
            <BarChart responsive style={{ width: "100%", height: "100%" }} data={rows} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--line)" />
              <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted)" }} interval="preserveStartEnd" />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={52}
                tick={{ fontSize: 12, fill: "var(--muted)" }}
                tickFormatter={(v: number) => `${fmt(v)}`}
                label={{ value: unit, position: "insideTopLeft", offset: 0, dy: -6, fontSize: 11, fill: "var(--muted)" }}
              />
              <ReferenceLine y={0} stroke="var(--line)" />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
                content={({ active, payload, label }) => {
                  const r = payload?.[0]?.payload as Record<string, number> | undefined;
                  if (!active || !r) return null;
                  return (
                    <div className="min-w-44 rounded-lg border border-line bg-white px-3.5 py-3 text-sm shadow-lg">
                      <p className="font-semibold text-ink">{label}</p>
                      <ul className="mt-2 space-y-1">
                        {[...keys].reverse().map((k) => (
                          <li key={k.key} className="flex items-center gap-2">
                            <span className="size-2.5 rounded-[2px]" style={{ background: TECH_BY_ID[k.key].hex }} aria-hidden />
                            <span className="flex-1 text-muted">{k.label}</span>
                            <span className="tabular font-medium text-ink">
                              {fmt(r[k.key])} {unit}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {keys.length > 1 && (
                        <p className="mt-2 flex justify-between gap-4 border-t border-line pt-2 font-semibold text-ink">
                          <span>Total</span>
                          <span className="tabular">
                            {fmt(r.total)} {unit}
                          </span>
                        </p>
                      )}
                    </div>
                  );
                }}
              />
              {keys.map((k) => (
                <Bar key={k.key} dataKey={k.key} stackId="a" fill={TECH_BY_ID[k.key].hex} isAnimationActive={false} />
              ))}
            </BarChart>
          </div>
        </figure>
      ) : (
        <div className="mt-4 max-h-[340px] overflow-auto rounded-[var(--radius)] border border-line">
          <table className="w-full text-sm">
            <caption className="sr-only">Net renewable capacity added in {place} per year, in {unit}</caption>
            <thead className="sticky top-0 bg-surface-2 text-left text-muted">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">
                  Year
                </th>
                {keys.map((k) => (
                  <th key={k.key} scope="col" className="px-3 py-2 text-right font-medium">
                    {k.label}
                  </th>
                ))}
                {keys.length > 1 && (
                  <th scope="col" className="px-3 py-2 text-right font-medium">
                    Total
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[...rows].reverse().map((r) => (
                <tr key={r.year}>
                  <th scope="row" className="px-3 py-2 text-left font-medium text-ink">
                    {r.year}
                  </th>
                  {keys.map((k) => (
                    <td key={k.key} className="tabular px-3 py-2 text-right">
                      {fmt(r[k.key])}
                    </td>
                  ))}
                  {keys.length > 1 && <td className="tabular px-3 py-2 text-right font-semibold">{fmt(r.total)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-3 text-xs text-muted">
        Source:{" "}
        <a href={series.source.url} className="underline decoration-line underline-offset-2 hover:text-ink" target="_blank" rel="noreferrer">
          {series.source.citation ?? series.source.publisher}
        </a>
        . Net additions are the year-on-year change in installed capacity, so retirements reduce them.
      </p>
    </div>
  );
}
