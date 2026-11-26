"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bar, BarChart, Cell, LabelList, Tooltip, XAxis, YAxis } from "recharts";
import { formatMW } from "@/lib/format";

export interface BarRow {
  key: string;
  label: string;
  value: number;
  /** Mark colour. Text always stays in ink, never the series colour. */
  color?: string;
  /** Secondary figure for the tooltip, e.g. a project count. */
  count?: number;
  /** Where a click on the bar goes (explorer filter, region page, ...). */
  href?: string;
}

/**
 * Horizontal bar list (one series, so no legend box). Hover for details; bars with an
 * `href` are clickable and keyboard-reachable through the table below.
 */
export function BarList({
  rows,
  caption,
  countLabel = "projects",
  format = formatMW,
}: {
  rows: BarRow[];
  caption: string;
  countLabel?: string;
  /** How values are shown (default: MW/GW). */
  format?: (v: number) => string;
}) {
  const router = useRouter();
  const [active, setActive] = useState<number | null>(null);
  const data = [...rows].sort((a, b) => b.value - a.value);
  const height = data.length * 34 + 8;

  return (
    <figure>
      <figcaption className="sr-only">{caption}</figcaption>
      <BarChart
        responsive
        layout="vertical"
        data={data}
        style={{ width: "100%", height }}
        margin={{ top: 0, right: 88, bottom: 0, left: 0 }}
        barCategoryGap={9}
        onMouseLeave={() => setActive(null)}
      >
        <XAxis type="number" hide domain={[0, "dataMax"]} />
        <YAxis
          type="category"
          dataKey="label"
          width={136}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 13, fill: "var(--ink)" }}
          interval={0}
        />
        <Tooltip
          cursor={{ fill: "rgba(11,92,173,0.05)" }}
          content={({ active: on, payload }) => {
            const r = on ? (payload?.[0]?.payload as BarRow | undefined) : undefined;
            if (!r) return null;
            return (
              <div className="rounded-lg border border-line bg-white px-3 py-2 text-xs shadow-[0_8px_24px_-12px_rgba(11,27,46,0.25)]">
                <div className="font-semibold text-ink">{r.label}</div>
                <div className="tabular mt-0.5 text-ink">{format(r.value)}</div>
                {r.count != null && (
                  <div className="tabular text-muted">
                    {r.count} {countLabel}
                  </div>
                )}
                {r.href && <div className="mt-1 text-brand-blue">Click to explore</div>}
              </div>
            );
          }}
        />
        <Bar
          dataKey="value"
          radius={[0, 4, 4, 0]}
          maxBarSize={14}
          isAnimationActive={false}
          onMouseEnter={(_, i) => setActive(i)}
          onClick={(d) => {
            const href = (d as unknown as { payload?: BarRow }).payload?.href;
            if (href) router.push(href);
          }}
          style={{ cursor: "pointer" }}
        >
          {data.map((r, i) => (
            <Cell key={r.key} fill={r.color ?? "var(--brand-navy)"} fillOpacity={active == null || active === i ? 1 : 0.45} />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            formatter={(v) => format(Number(v))}
            style={{ fontSize: 12, fontWeight: 600, fill: "var(--ink)", fontVariantNumeric: "tabular-nums" }}
          />
        </Bar>
      </BarChart>
      {/* Keyboard and screen-reader route to the same data and links */}
      <div className="sr-only">
      <table>
        <tbody>
          {data.map((r) => (
            <tr key={r.key}>
              <th scope="row">{r.href ? <a href={r.href}>{r.label}</a> : r.label}</th>
              <td>{format(r.value)}</td>
              {r.count != null && <td>{r.count} {countLabel}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </figure>
  );
}
