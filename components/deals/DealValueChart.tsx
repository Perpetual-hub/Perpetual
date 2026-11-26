"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { formatMoney } from "@/lib/format";
import { TECHNOLOGIES, TECH_BY_ID } from "@/lib/tech";
import type { Deal, Technology } from "@/lib/types";

const quarterKey = (iso: string) => {
  const [y, m] = iso.split("-").map(Number);
  return y * 10 + Math.ceil(m / 3);
};
const quarterLabel = (k: number) => `Q${k % 10} ${Math.floor(k / 10)}`;
const nextQuarter = (k: number) => (k % 10 === 4 ? (Math.floor(k / 10) + 1) * 10 + 1 : k + 1);

const axisMoney = (v: number) =>
  v >= 1e9 ? `USD ${(v / 1e9).toLocaleString("en", { maximumFractionDigits: 1 })}bn` : `USD ${Math.round(v / 1e6)}m`;

/**
 * Disclosed deal value (USD) per quarter, stacked by sector. A deal spanning several sectors
 * is split evenly between them. Undisclosed deals add no value, so the chart says how many.
 */
export function DealValueChart({ deals }: { deals: Deal[] }) {
  const byQ = new Map<number, Record<string, number | string>>();
  const techs = new Set<Technology>();
  let undisclosed = 0;
  for (const d of deals) {
    const k = quarterKey(d.date);
    const row = byQ.get(k) ?? { label: quarterLabel(k) };
    if (!d.value?.disclosed || !d.value.usd) undisclosed += 1;
    else
      for (const t of d.technologies) {
        techs.add(t);
        row[t] = ((row[t] as number | undefined) ?? 0) + d.value.usd / d.technologies.length;
      }
    byQ.set(k, row);
  }
  const keys = [...byQ.keys()].sort((a, b) => a - b);
  // Fill empty quarters so time reads evenly.
  const rows: Record<string, number | string>[] = [];
  if (keys.length) for (let k = keys[0]; k <= keys[keys.length - 1]; k = nextQuarter(k)) rows.push(byQ.get(k) ?? { label: quarterLabel(k) });
  const order = TECHNOLOGIES.map((t) => t.id).filter((t) => techs.has(t));

  if (!rows.length) return <p className="text-sm text-muted">No deals match these filters.</p>;
  return (
    <figure>
      <figcaption className="sr-only">Disclosed deal value per quarter, by sector</figcaption>
      <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted" aria-label="Legend">
        {order.map((t) => (
          <li key={t} className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-[3px]" style={{ background: TECH_BY_ID[t].hex }} aria-hidden />
            {TECH_BY_ID[t].label}
          </li>
        ))}
      </ul>
      <BarChart responsive data={rows} style={{ width: "100%", height: 260 }} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--line)" />
        <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: "var(--line)" }} tick={{ fontSize: 11, fill: "var(--muted)" }} />
        <YAxis tickFormatter={axisMoney} tickLine={false} axisLine={false} width={72} tick={{ fontSize: 11, fill: "var(--muted)" }} />
        <Tooltip
          cursor={{ fill: "rgba(11,92,173,0.06)" }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            const items = payload.filter((p) => Number(p.value) > 0);
            const total = items.reduce((s, p) => s + Number(p.value), 0);
            return (
              <div className="min-w-44 rounded-lg border border-line bg-white px-3 py-2.5 text-xs shadow-[0_8px_24px_-12px_rgba(11,27,46,0.25)]">
                <div className="mb-1.5 font-semibold text-ink">{label}</div>
                {items.length === 0 && <div className="text-muted">No disclosed value</div>}
                <ul className="space-y-1">
                  {items.map((p) => (
                    <li key={String(p.dataKey)} className="flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ background: TECH_BY_ID[p.dataKey as Technology].hex }} aria-hidden />
                      <span className="text-ink">{TECH_BY_ID[p.dataKey as Technology].label}</span>
                      <span className="tabular ml-auto pl-3 text-ink">{formatMoney(Number(p.value), "USD")}</span>
                    </li>
                  ))}
                </ul>
                {items.length > 1 && (
                  <div className="tabular mt-1.5 flex justify-between border-t border-line pt-1.5 font-semibold text-ink">
                    <span>Total</span>
                    <span>{formatMoney(total, "USD")}</span>
                  </div>
                )}
              </div>
            );
          }}
        />
        {order.map((t, i) => (
          <Bar
            key={t}
            dataKey={t}
            stackId="v"
            fill={TECH_BY_ID[t].hex}
            maxBarSize={28}
            radius={i === order.length - 1 ? [4, 4, 0, 0] : 0}
            isAnimationActive={false}
          />
        ))}
      </BarChart>
      {undisclosed > 0 && (
        <p className="mt-2 text-xs text-muted">
          {undisclosed} deal{undisclosed === 1 ? "" : "s"} with undisclosed value not shown. Multi-sector deals are split evenly between
          sectors.
        </p>
      )}
    </figure>
  );
}
