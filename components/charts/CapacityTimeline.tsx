"use client";

import { useMemo, useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ReferenceArea,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimelineCell } from "@/lib/data";
import { formatMW } from "@/lib/format";
import { TECHNOLOGIES, TECH_BY_ID } from "@/lib/tech";
import type { Technology } from "@/lib/types";

type Metric = "mw" | "n";
type TipPayload = readonly { payload?: unknown }[];
type Mode = "annual" | "cumulative";

/**
 * Capacity (or project count) reaching commercial operation per year, by technology.
 * Historical = confirmed CODs (solid); forecast = estimated CODs (light fill, dashed outline).
 * Annual shows bars per year; cumulative shows the running total as stacked areas.
 */
export function CapacityTimeline({
  cells,
  asOfYear,
  title = "Capacity additions by year",
  defaultMode = "annual",
}: {
  cells: TimelineCell[];
  asOfYear: number;
  title?: string;
  defaultMode?: Mode;
}) {
  const [metric, setMetric] = useState<Metric>("mw");
  const [mode, setMode] = useState<Mode>(defaultMode);

  const techs = useMemo(
    () => TECHNOLOGIES.map((t) => t.id).filter((id) => cells.some((c) => c.tech === id)),
    [cells],
  );

  const data = useMemo(() => {
    if (!cells.length) return [];
    const years: number[] = [];
    const min = Math.min(...cells.map((c) => c.year));
    const max = Math.max(...cells.map((c) => c.year), asOfYear);
    for (let y = min; y <= max; y++) years.push(y);
    const running: Record<string, number> = {};
    return years.map((year) => {
      const row: Record<string, number | null> & { year: number } = { year };
      for (const t of techs) {
        const h = cells.filter((c) => c.year === year && c.tech === t && !c.forecast).reduce((s, c) => s + c[metric], 0);
        const f = cells.filter((c) => c.year === year && c.tech === t && c.forecast).reduce((s, c) => s + c[metric], 0);
        if (mode === "annual") {
          row[`${t}_h`] = h;
          row[`${t}_f`] = f;
        } else {
          running[`${t}_h`] = (running[`${t}_h`] ?? 0) + h;
          running[`${t}_all`] = (running[`${t}_all`] ?? 0) + h + f;
          // Historical line stops at the as-of year; forecast picks up from there.
          row[`${t}_h`] = year <= asOfYear ? running[`${t}_h`] : null;
          row[`${t}_f`] = year >= asOfYear ? running[`${t}_all`] : null;
        }
      }
      return row;
    });
  }, [cells, techs, metric, mode, asOfYear]);

  if (!data.length) return <p className="text-sm text-muted">No dated projects yet.</p>;
  const lastYear = data[data.length - 1].year;
  const fmt = (v: number) => (metric === "mw" ? formatMW(v) : `${v.toLocaleString("en")} project${v === 1 ? "" : "s"}`);
  // One unit per axis: GW when the axis reaches 1 GW, otherwise MW.
  const peak = Math.max(...data.flatMap((r) => techs.flatMap((t) => [r[`${t}_h`] ?? 0, r[`${t}_f`] ?? 0])));
  const useGW = metric === "mw" && peak >= 500;
  const axisFmt = (v: number) =>
    metric === "n" ? String(v) : useGW ? `${(v / 1000).toLocaleString("en", { maximumFractionDigits: 1 })} GW` : `${v} MW`;

  return (
    <figure>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <figcaption className="font-sans text-base font-semibold text-ink">{title}</figcaption>
        <div className="flex flex-wrap gap-2">
          <Toggle label="Measure" value={metric} onChange={setMetric} options={[{ id: "mw", label: "Capacity" }, { id: "n", label: "Projects" }]} />
          <Toggle label="View" value={mode} onChange={setMode} options={[{ id: "annual", label: "Annual" }, { id: "cumulative", label: "Cumulative" }]} />
        </div>
      </div>

      {/* Legend: technologies, plus historical vs forecast encoding */}
      <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted" aria-label="Legend">
        {techs.length > 1 &&
          techs.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-[3px]" style={{ background: TECH_BY_ID[t].hex }} aria-hidden />
              {TECH_BY_ID[t].label}
            </li>
          ))}
        <li className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-[3px] bg-muted" aria-hidden />
          Historical (confirmed)
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-[3px] border border-dashed border-muted bg-muted/20" aria-hidden />
          Forecast (estimated)
        </li>
      </ul>

      <ComposedChart responsive data={data} style={{ width: "100%", height: 300 }} margin={{ top: 22, right: 8, bottom: 0, left: 0 }} barCategoryGap="22%">
        <CartesianGrid vertical={false} stroke="var(--line)" />
        <XAxis dataKey="year" tickLine={false} axisLine={{ stroke: "var(--line)" }} tick={{ fontSize: 11, fill: "var(--muted)" }} />
        <YAxis tickFormatter={axisFmt} tickLine={false} axisLine={false} width={60} tick={{ fontSize: 11, fill: "var(--muted)" }} allowDecimals={false} />
        {lastYear > asOfYear && (
          <ReferenceArea
            x1={asOfYear + 1}
            x2={lastYear}
            fill="var(--surface-2)"
            fillOpacity={0.9}
            ifOverflow="extendDomain"
            label={{ value: "Forecast", position: "insideTopRight", fontSize: 11, fill: "var(--muted)" }}
          />
        )}
        <ReferenceLine x={asOfYear} stroke="var(--brand-navy)" strokeDasharray="3 3" label={{ value: "Today", position: "top", fontSize: 11, fill: "var(--brand-navy)" }} />
        <Tooltip content={(p) => <TimelineTooltip active={p.active} payload={p.payload as TipPayload} label={p.label} techs={techs} fmt={fmt} mode={mode} asOfYear={asOfYear} />} cursor={{ fill: "rgba(11,92,173,0.06)" }} />
        {mode === "annual"
          ? techs.flatMap((t) => [
              <Bar key={`${t}_h`} dataKey={`${t}_h`} stackId="y" fill={TECH_BY_ID[t].hex} maxBarSize={24} isAnimationActive={false} />,
              <Bar
                key={`${t}_f`}
                dataKey={`${t}_f`}
                stackId="y"
                fill={TECH_BY_ID[t].hex}
                fillOpacity={0.28}
                stroke={TECH_BY_ID[t].hex}
                strokeDasharray="3 2"
                maxBarSize={24}
                isAnimationActive={false}
              />,
            ])
          : techs.flatMap((t) => [
              <Area key={`${t}_h`} dataKey={`${t}_h`} stackId="h" type="monotone" fill={TECH_BY_ID[t].hex} fillOpacity={0.85} stroke={TECH_BY_ID[t].hex} strokeWidth={2} connectNulls={false} isAnimationActive={false} />,
              <Area
                key={`${t}_f`}
                dataKey={`${t}_f`}
                stackId="f"
                type="monotone"
                fill={TECH_BY_ID[t].hex}
                fillOpacity={0.18}
                stroke={TECH_BY_ID[t].hex}
                strokeDasharray="5 4"
                strokeWidth={2}
                connectNulls={false}
                isAnimationActive={false}
              />,
            ])}
      </ComposedChart>
      <TimelineTable data={data} techs={techs} fmt={fmt} />
    </figure>
  );
}

function TimelineTooltip({
  active,
  payload,
  label,
  techs,
  fmt,
  mode,
  asOfYear,
}: {
  active?: boolean;
  payload?: TipPayload;
  label?: string | number;
  techs: Technology[];
  fmt: (v: number) => string;
  mode: Mode;
  asOfYear: number;
}) {
  if (!active || !payload?.length) return null;
  const row = (payload[0].payload ?? {}) as Record<string, number | null>;
  const year = Number(label);
  const lines = techs
    .map((t) => ({ t, h: row[`${t}_h`] ?? 0, f: row[`${t}_f`] ?? 0 }))
    .filter((l) => l.h || l.f);
  const total = lines.reduce((s, l) => s + (mode === "annual" ? l.h + l.f : year > asOfYear ? l.f : l.h), 0);
  return (
    <div className="min-w-48 rounded-lg border border-line bg-white px-3 py-2.5 text-xs shadow-[0_8px_24px_-12px_rgba(11,27,46,0.25)]">
      <div className="mb-1.5 flex items-baseline justify-between gap-4">
        <span className="font-semibold text-ink">{year}</span>
        <span className="text-muted">{year > asOfYear ? "Forecast" : mode === "cumulative" ? "Cumulative" : "Historical"}</span>
      </div>
      {lines.length === 0 && <div className="text-muted">Nothing reaching operation</div>}
      <ul className="space-y-1">
        {lines.map(({ t, h, f }) => (
          <li key={t} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ background: TECH_BY_ID[t].hex }} aria-hidden />
            <span className="text-ink">{TECH_BY_ID[t].label}</span>
            <span className="tabular ml-auto pl-3 text-right text-ink">
              {mode === "annual" ? (
                <>
                  {h > 0 && fmt(h)}
                  {h > 0 && f > 0 && " + "}
                  {f > 0 && <span className="text-muted">{fmt(f)} est.</span>}
                </>
              ) : (
                fmt(year > asOfYear ? f : h)
              )}
            </span>
          </li>
        ))}
      </ul>
      {lines.length > 1 && (
        <div className="tabular mt-1.5 flex justify-between border-t border-line pt-1.5 font-semibold text-ink">
          <span>Total</span>
          <span>{fmt(total)}</span>
        </div>
      )}
    </div>
  );
}

/** Screen-reader table with the same numbers as the chart. */
function TimelineTable({ data, techs, fmt }: { data: Record<string, number | null>[]; techs: Technology[]; fmt: (v: number) => string }) {
  return (
    <div className="sr-only">
      <table>
      <caption>Values by year. Historical = confirmed, forecast = estimated.</caption>
      <thead>
        <tr>
          <th scope="col">Year</th>
          {techs.map((t) => (
            <th key={t} scope="col">
              {TECH_BY_ID[t].label} historical / forecast
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.year}>
            <th scope="row">{r.year}</th>
            {techs.map((t) => (
              <td key={t}>
                {fmt(r[`${t}_h`] ?? 0)} / {fmt(r[`${t}_f`] ?? 0)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
      </div>
  );
}

function Toggle<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-lg border border-line bg-white p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-150 ${
            value === o.id ? "bg-brand-navy text-white" : "text-muted hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
