"use client";

import { useId, useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { TECH_BY_ID } from "@/lib/tech";
import type { CapacityRow, CapacitySeries, Technology } from "@/lib/types";

// Bottom to top: the oldest, largest base first, so growth reads upward.
const SERIES: { key: keyof CapacityRow & Technology; label: string }[] = [
  { key: "hydro", label: "Hydropower" },
  { key: "wind", label: "Wind" },
  { key: "solar", label: "Solar" },
  { key: "bioenergy", label: "Bioenergy" },
  { key: "geothermal", label: "Geothermal" },
  { key: "marine", label: "Marine" },
];

const fmt = (gw: number) =>
  gw >= 100 ? Math.round(gw).toLocaleString("en-GB") : gw.toLocaleString("en-GB", { maximumFractionDigits: 1 });

type TipProps = { active?: boolean; label?: number | string; payload?: readonly { payload?: unknown }[] };

function Tip({ active, label, payload }: TipProps) {
  const row = payload?.[0]?.payload as CapacityRow | undefined;
  if (!active || !row) return null;
  return (
    <div className="min-w-48 rounded-lg border border-line bg-white px-3.5 py-3 text-sm shadow-lg">
      <p className="font-semibold text-ink">{label}</p>
      <ul className="mt-2 space-y-1">
        {[...SERIES].reverse().map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className="size-2.5 rounded-[2px]" style={{ background: TECH_BY_ID[s.key].hex }} aria-hidden />
            <span className="flex-1 text-muted">{s.label}</span>
            <span className="tabular font-medium text-ink">{fmt(row[s.key])} GW</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 flex justify-between border-t border-line pt-2 font-semibold text-ink">
        <span>Total</span>
        <span className="tabular">{fmt(row.total)} GW</span>
      </p>
    </div>
  );
}

/** Global installed renewable capacity by technology, stacked, exactly as published by the source. */
export function GlobalCapacityChart({ series }: { series: CapacitySeries }) {
  const [view, setView] = useState<"chart" | "table">("chart");
  const id = useId();
  const { rows, source } = series;
  const first = rows[0];
  const last = rows[rows.length - 1];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Installed capacity, {last.year}</p>
          <p className="tabular font-display text-4xl font-bold tracking-tight text-brand-navy">
            {fmt(last.total)} <span className="text-lg font-semibold text-muted">GW</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            Up from {fmt(first.total)} GW in {first.year}
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

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Legend">
        {[...SERIES].reverse().map((s) => (
          <li key={s.key} className="flex items-center gap-2 text-ink">
            <span className="size-3 rounded-[3px]" style={{ background: TECH_BY_ID[s.key].hex }} aria-hidden />
            {s.label}
            <span className="tabular text-muted">{fmt(last[s.key])} GW</span>
          </li>
        ))}
      </ul>

      {view === "chart" ? (
        <figure className="mt-4" aria-labelledby={`${id}-cap`}>
          <figcaption id={`${id}-cap`} className="sr-only">
            Stacked area chart of global installed renewable capacity by technology, {first.year} to {last.year}, in
            gigawatts. Use the Table view for exact values.
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
                width={52}
                tick={{ fontSize: 12, fill: "var(--muted)" }}
                tickFormatter={(v: number) => v.toLocaleString("en-GB")}
              />
              <Tooltip content={<Tip />} cursor={{ stroke: "#0a1f3a", strokeWidth: 1, strokeDasharray: "3 3" }} />
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
            <caption className="sr-only">Global installed renewable capacity by technology, in gigawatts</caption>
            <thead className="sticky top-0 bg-surface-2 text-left text-xs text-muted">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">Year</th>
                {SERIES.map((s) => (
                  <th key={s.key} scope="col" className="px-3 py-2 text-right font-medium">{s.label}</th>
                ))}
                <th scope="col" className="px-3 py-2 text-right font-semibold text-ink">Total</th>
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
        . {source.licence}. Hydropower excludes pumped storage, matching IRENA&rsquo;s renewables total. Source updated{" "}
        {source.lastUpdated}, next update expected {source.nextUpdate ?? "when published"}.
      </p>
    </div>
  );
}
