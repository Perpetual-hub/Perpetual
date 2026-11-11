"use client";

import { useId, useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { TECH_BY_ID } from "@/lib/tech";
import type { CapacityRow, CapacitySeries, Technology } from "@/lib/types";

type Key = keyof CapacityRow & Technology;

// Bottom to top: the oldest, largest base first, so growth reads upward.
const ALL_SERIES: { key: Key; label: string }[] = [
  { key: "hydro", label: "Hydropower" },
  { key: "wind", label: "Wind" },
  { key: "solar", label: "Solar" },
  { key: "bioenergy", label: "Bioenergy" },
  { key: "geothermal", label: "Geothermal" },
  { key: "marine", label: "Marine" },
];

const fmt = (v: number) =>
  v >= 100 ? Math.round(v).toLocaleString("en-GB") : v.toLocaleString("en-GB", { maximumFractionDigits: 1 });

type TipProps = {
  active?: boolean;
  label?: number | string;
  payload?: readonly { payload?: unknown }[];
  unit: string;
  series: typeof ALL_SERIES;
};

function Tip({ active, label, payload, unit, series }: TipProps) {
  const row = payload?.[0]?.payload as CapacityRow | undefined;
  if (!active || !row) return null;
  return (
    <div className="min-w-48 rounded-lg border border-line bg-white px-3.5 py-3 text-sm shadow-lg">
      <p className="font-semibold text-ink">{label}</p>
      <ul className="mt-2 space-y-1">
        {[...series].reverse().map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className="size-2.5 rounded-[2px]" style={{ background: TECH_BY_ID[s.key].hex }} aria-hidden />
            <span className="flex-1 text-muted">{s.label}</span>
            <span className="tabular font-medium text-ink">
              {fmt(row[s.key])} {unit}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 flex justify-between gap-4 border-t border-line pt-2 font-semibold text-ink">
        <span>Total</span>
        <span className="tabular">
          {fmt(row.total)} {unit}
        </span>
      </p>
    </div>
  );
}

/**
 * Installed renewable capacity by technology, stacked, exactly as published by the source.
 * Used for the world total and for each country. Small totals switch to MW.
 */
export function GlobalCapacityChart({ series, place = "the world" }: { series: CapacitySeries; place?: string }) {
  const [view, setView] = useState<"chart" | "table">("chart");
  const id = useId();
  const { source } = series;
  const useMW = Math.max(...series.rows.map((r) => r.total)) < 10;
  const unit = useMW ? "MW" : "GW";
  const k = useMW ? 1000 : 1;
  const rows: CapacityRow[] = series.rows.map((r) => ({
    year: r.year,
    solar: r.solar * k,
    wind: r.wind * k,
    hydro: r.hydro * k,
    bioenergy: r.bioenergy * k,
    geothermal: r.geothermal * k,
    marine: r.marine * k,
    total: r.total * k,
  }));
  const SERIES = ALL_SERIES.filter((s) => rows.some((r) => r[s.key] > 0));
  const firstNonZero = rows.find((r) => r.total > 0) ?? rows[0];
  const last = rows[rows.length - 1];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Installed renewable capacity, {last.year}</p>
          <p className="tabular font-display text-4xl font-bold tracking-tight text-brand-navy">
            {fmt(last.total)} <span className="text-lg font-semibold text-muted">{unit}</span>
          </p>
          {firstNonZero.year < last.year && (
            <p className="mt-1 text-sm text-muted">
              Up from {fmt(firstNonZero.total)} {unit} in {firstNonZero.year}
            </p>
          )}
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

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Legend">
        {[...SERIES].reverse().map((s) => (
          <li key={s.key} className="flex items-center gap-2 text-ink">
            <span className="size-3 rounded-[3px]" style={{ background: TECH_BY_ID[s.key].hex }} aria-hidden />
            {s.label}
            <span className="tabular text-muted">
              {fmt(last[s.key])} {unit}
            </span>
          </li>
        ))}
      </ul>

      {view === "chart" ? (
        <figure className="mt-4" aria-labelledby={`${id}-cap`}>
          <figcaption id={`${id}-cap`} className="sr-only">
            Stacked area chart of installed renewable capacity in {place} by technology, {rows[0].year} to {last.year},
            in {useMW ? "megawatts" : "gigawatts"}. Use the Table view for exact values.
          </figcaption>
          <div className="h-[320px] w-full md:h-[380px]">
            <AreaChart
              responsive
              style={{ width: "100%", height: "100%" }}
              data={rows}
              margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
            >
              <CartesianGrid vertical={false} stroke="var(--line)" />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={{ stroke: "var(--line)" }}
                tick={{ fontSize: 12, fill: "var(--muted)" }}
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={56}
                tick={{ fontSize: 12, fill: "var(--muted)" }}
                tickFormatter={(v: number) => v.toLocaleString("en-GB")}
              />
              <Tooltip
                content={<Tip unit={unit} series={SERIES} />}
                cursor={{ stroke: "#0a1f3a", strokeWidth: 1, strokeDasharray: "3 3" }}
              />
              {SERIES.map((s) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stackId="cap"
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  fill={TECH_BY_ID[s.key].hex}
                  fillOpacity={0.92}
                  isAnimationActive={false}
                />
              ))}
            </AreaChart>
          </div>
        </figure>
      ) : (
        <div className="mt-4 max-h-[380px] overflow-auto rounded-lg border border-line">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Installed renewable capacity in {place} by technology, in {useMW ? "megawatts" : "gigawatts"}
            </caption>
            <thead className="sticky top-0 bg-surface-2 text-left text-xs text-muted">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">Year</th>
                {SERIES.map((s) => (
                  <th key={s.key} scope="col" className="px-3 py-2 text-right font-medium">{s.label}</th>
                ))}
                <th scope="col" className="px-3 py-2 text-right font-semibold text-ink">Total ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[...rows].reverse().map((r) => (
                <tr key={r.year}>
                  <th scope="row" className="px-3 py-2 text-left font-medium">{r.year}</th>
                  {SERIES.map((s) => (
                    <td key={s.key} className="tabular px-3 py-2 text-right">{fmt(r[s.key])}</td>
                  ))}
                  <td className="tabular px-3 py-2 text-right font-semibold">{fmt(r.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Source:{" "}
        <a href={source.url} target="_blank" rel="noopener" className="text-brand-blue underline underline-offset-2">
          {source.citation}
        </a>
        . {source.licence}. Hydropower excludes pumped storage, matching IRENA&rsquo;s renewables total.
        {source.lastUpdated
          ? ` Source updated ${source.lastUpdated}${source.nextUpdate ? `, next update expected ${source.nextUpdate}` : ""}.`
          : source.published
            ? ` Published ${source.published}, retrieved ${source.retrieved}.`
            : ""}
      </p>
    </div>
  );
}
