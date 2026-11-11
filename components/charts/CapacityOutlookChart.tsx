"use client";

import { useId, useState } from "react";
import { Area, CartesianGrid, ComposedChart, Line, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { TECH_BY_ID } from "@/lib/tech";
import type { CapacityOutlook, CapacityRow, OutlookRow } from "@/lib/types";

type Key = "hydro" | "wind" | "solar" | "other" | "geothermal";

// Bottom to top, matching the historical chart.
const SERIES: { key: Key; label: string; color: string }[] = [
  { key: "hydro", label: "Hydropower", color: TECH_BY_ID.hydro.hex },
  { key: "wind", label: "Wind", color: TECH_BY_ID.wind.hex },
  { key: "solar", label: "Solar", color: TECH_BY_ID.solar.hex },
  { key: "other", label: "Other renewables", color: TECH_BY_ID.bioenergy.hex },
  { key: "geothermal", label: "Geothermal", color: TECH_BY_ID.geothermal.hex },
];

const ACTUAL = "#0a1f3a";

const fmt = (gw: number) => Math.round(gw).toLocaleString("en-GB");

type Row = OutlookRow & { actual?: number };
type TipProps = { active?: boolean; label?: number | string; payload?: readonly { payload?: unknown }[] };

function Tip({ active, label, payload }: TipProps) {
  const row = payload?.[0]?.payload as Row | undefined;
  if (!active || !row) return null;
  return (
    <div className="min-w-52 rounded-lg border border-line bg-white px-3.5 py-3 text-sm shadow-lg">
      <p className="font-semibold text-ink">{label} projection</p>
      <ul className="mt-2 space-y-1">
        {[...SERIES].reverse().map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className="size-2.5 rounded-[2px]" style={{ background: s.color }} aria-hidden />
            <span className="flex-1 text-muted">{s.label}</span>
            <span className="tabular font-medium text-ink">{fmt(row[s.key])} GW</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 flex justify-between border-t border-line pt-2 font-semibold text-ink">
        <span>Projected total</span>
        <span className="tabular">{fmt(row.total)} GW</span>
      </p>
      {row.actual !== undefined && (
        <p className="mt-1 flex justify-between gap-4 text-ink">
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-3 rounded" style={{ background: ACTUAL }} aria-hidden />
            Reported by IRENA
          </span>
          <span className="tabular font-semibold">{fmt(row.actual)} GW</span>
        </p>
      )}
    </div>
  );
}

/**
 * EIA's published projections of world renewable capacity, by scenario, with
 * IRENA's reported totals overlaid for the years both cover. No Perpetual forecasts.
 */
export function CapacityOutlookChart({ outlook, actual }: { outlook: CapacityOutlook; actual: CapacityRow[] }) {
  const [scenarioId, setScenarioId] = useState(outlook.scenarios[0].id);
  const [view, setView] = useState<"chart" | "table">("chart");
  const id = useId();
  const scenario = outlook.scenarios.find((s) => s.id === scenarioId) ?? outlook.scenarios[0];
  const actualByYear = new Map(actual.map((r) => [r.year, r.total]));
  const rows: Row[] = scenario.rows.map((r) => ({ ...r, actual: actualByYear.get(r.year) }));
  const end = rows[rows.length - 1];
  const lastActual = actual[actual.length - 1];
  const projectedAtLastActual = rows.find((r) => r.year === lastActual.year);
  const { source } = outlook;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Projected for {end.year}, {scenario.label.toLowerCase()}</p>
          <p className="tabular font-display text-4xl font-bold tracking-tight text-brand-navy">
            {fmt(end.total)} <span className="text-lg font-semibold text-muted">GW</span>
          </p>
          <p className="mt-1 text-sm text-muted">Plus {fmt(end.battery)} GW of battery storage</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div role="radiogroup" aria-label="Scenario" className="flex flex-wrap rounded-lg border border-line bg-white p-0.5">
            {outlook.scenarios.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={scenarioId === s.id}
                onClick={() => setScenarioId(s.id)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${scenarioId === s.id ? "bg-brand-navy text-white" : "text-muted hover:text-ink"}`}
              >
                {s.id === "Reference" ? "Reference" : s.id === "LowZTC" ? "Low-cost clean tech" : "High-cost clean tech"}
              </button>
            ))}
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
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Legend">
        {[...SERIES].reverse().map((s) => (
          <li key={s.key} className="flex items-center gap-2 text-ink">
            <span className="size-3 rounded-[3px]" style={{ background: s.color }} aria-hidden />
            {s.label}
          </li>
        ))}
        <li className="flex items-center gap-2 text-ink">
          <span className="h-0.5 w-4 rounded" style={{ background: ACTUAL }} aria-hidden />
          Reported by IRENA
        </li>
      </ul>

      {view === "chart" ? (
        <figure className="mt-4" aria-labelledby={`${id}-cap`}>
          <figcaption id={`${id}-cap`} className="sr-only">
            Stacked area chart of EIA projections of world renewable capacity by technology, {rows[0].year} to {end.year},
            {" "}{scenario.label}, with IRENA&rsquo;s reported totals as a line. Use the Table view for exact values.
          </figcaption>
          <div className="h-[320px] w-full md:h-[380px]">
            <ComposedChart
              responsive
              style={{ width: "100%", height: "100%" }}
              data={rows}
              margin={{ top: 20, right: 8, bottom: 0, left: 0 }}
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
              <ReferenceLine
                x={Number(outlook.edition)}
                stroke="var(--muted)"
                strokeDasharray="4 4"
                label={{ value: `Published ${outlook.edition}`, position: "insideTopLeft", fontSize: 11, fill: "var(--muted)", dy: -18 }}
              />
              <Tooltip content={<Tip />} cursor={{ stroke: ACTUAL, strokeWidth: 1, strokeDasharray: "3 3" }} />
              {SERIES.map((s) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stackId="out"
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  fill={s.color}
                  fillOpacity={0.55}
                  isAnimationActive={false}
                />
              ))}
              <Line
                type="monotone"
                dataKey="actual"
                name="Reported by IRENA"
                stroke={ACTUAL}
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: ACTUAL, stroke: "#ffffff", strokeWidth: 1.5 }}
                connectNulls={false}
                isAnimationActive={false}
              />
            </ComposedChart>
          </div>
        </figure>
      ) : (
        <div className="mt-4 max-h-[380px] overflow-auto rounded-lg border border-line">
          <table className="w-full text-sm">
            <caption className="sr-only">EIA projections of world renewable capacity, {scenario.label}, in gigawatts</caption>
            <thead className="sticky top-0 bg-surface-2 text-left text-xs text-muted">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">Year</th>
                {SERIES.map((s) => (
                  <th key={s.key} scope="col" className="px-3 py-2 text-right font-medium">{s.label}</th>
                ))}
                <th scope="col" className="px-3 py-2 text-right font-semibold text-ink">Total</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Battery storage</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">IRENA reported</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.year}>
                  <th scope="row" className="px-3 py-2 text-left font-medium">{r.year}</th>
                  {SERIES.map((s) => (
                    <td key={s.key} className="tabular px-3 py-2 text-right">{fmt(r[s.key])}</td>
                  ))}
                  <td className="tabular px-3 py-2 text-right font-semibold">{fmt(r.total)}</td>
                  <td className="tabular px-3 py-2 text-right">{fmt(r.battery)}</td>
                  <td className="tabular px-3 py-2 text-right">{r.actual !== undefined ? fmt(r.actual) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {projectedAtLastActual && (
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink">
          For {lastActual.year}, this outlook projected {fmt(projectedAtLastActual.total)} GW. IRENA reports{" "}
          {fmt(lastActual.total)} GW was actually installed, so capacity has grown faster than this edition expected.
        </p>
      )}

      <p className="mt-3 text-xs leading-relaxed text-muted">
        Source:{" "}
        <a href={source.url} target="_blank" rel="noopener" className="text-brand-blue underline underline-offset-2">
          {source.citation}
        </a>
        , world installed generating capacity (Table 21). {source.licence}. These are EIA&rsquo;s projections, not
        Perpetual&rsquo;s. Totals exclude battery storage and pumped hydro. Categories follow EIA&rsquo;s definitions,
        which differ slightly from IRENA&rsquo;s.
      </p>
    </div>
  );
}
