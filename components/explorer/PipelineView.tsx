"use client";

import Link from "next/link";
import type { MapPoint } from "@/lib/data";
import { STATUS_LABEL, formatGW } from "@/lib/format";
import { TECH_BY_ID } from "@/lib/tech";
import type { ProjectStatus } from "@/lib/types";

const STAGES: ProjectStatus[] = ["announced", "permitting", "financing", "construction", "operating"];

const fmt = (mw: number) => (mw >= 1000 ? `${formatGW(mw)} GW` : `${Math.round(mw).toLocaleString("en")} MW`);

/**
 * Where the filtered projects stand: capacity at each stage from announcement to operation,
 * overall and by sector. Follows the same filters as the map and table.
 */
export function PipelineView({ points }: { points: MapPoint[] }) {
  const inPipe = points.filter((p) => STAGES.includes(p.status));
  const total = Object.fromEntries(STAGES.map((s) => [s, inPipe.filter((p) => p.status === s)])) as Record<ProjectStatus, MapPoint[]>;
  const mw = (xs: MapPoint[]) => xs.reduce((a, p) => a + p.capacityMW, 0);
  const maxStage = Math.max(1, ...STAGES.map((s) => mw(total[s])));
  const techs = [...new Set(inPipe.map((p) => p.technology))].sort(
    (a, b) => mw(inPipe.filter((p) => p.technology === b)) - mw(inPipe.filter((p) => p.technology === a)),
  );

  return (
    <div className="container-page py-8">
      <p className="text-sm font-semibold text-brand-blue">Pipeline</p>
      <h2 className="mt-1 max-w-3xl font-display text-2xl leading-snug font-bold tracking-tight">
        {fmt(mw(inPipe))} across {inPipe.length.toLocaleString("en")} projects, from first announcement to operation.
      </h2>

      {/* Stage funnel */}
      <ol className="mt-8 grid gap-3 sm:grid-cols-5">
        {STAGES.map((s, i) => (
          <li key={s} className="rounded-[var(--radius)] bg-paper p-4">
            <p className="text-xs text-muted">
              {i + 1}. {STATUS_LABEL[s]}
            </p>
            <p className="tabular mt-1 font-display text-2xl font-bold text-brand-navy">{fmt(mw(total[s]))}</p>
            <p className="tabular text-xs text-muted">{total[s].length} projects</p>
            <div className="mt-3 h-1.5 bg-white" aria-hidden>
              <div className="h-full bg-brand-navy" style={{ width: `${(mw(total[s]) / maxStage) * 100}%` }} />
            </div>
          </li>
        ))}
      </ol>

      {/* By sector */}
      <div className="mt-10 overflow-x-auto" tabIndex={0} role="region" aria-label="Pipeline by sector (scrolls sideways)">
        <table className="w-full min-w-[640px] text-sm">
          <caption className="mb-3 text-left font-semibold text-ink">Capacity by sector and stage</caption>
          <thead>
            <tr className="border-b border-ink/80 text-left text-xs text-muted">
              <th scope="col" className="py-2 pr-4 font-medium">Sector</th>
              {STAGES.map((s) => (
                <th key={s} scope="col" className="px-2 py-2 text-right font-medium">
                  {STATUS_LABEL[s]}
                </th>
              ))}
              <th scope="col" className="py-2 pl-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {techs.map((t) => {
              const row = inPipe.filter((p) => p.technology === t);
              const rowMax = Math.max(1, ...STAGES.map((s) => mw(row.filter((p) => p.status === s))));
              return (
                <tr key={t}>
                  <th scope="row" className="py-3 pr-4 text-left font-medium">
                    <Link href={`/projects?tech=${t}&view=table`} className="inline-flex items-center gap-2 hover:text-brand-blue">
                      <span aria-hidden className="size-2.5 rounded-full" style={{ background: TECH_BY_ID[t].hex }} />
                      {TECH_BY_ID[t].label}
                    </Link>
                  </th>
                  {STAGES.map((s) => {
                    const v = mw(row.filter((p) => p.status === s));
                    return (
                      <td key={s} className="px-2 py-3 text-right">
                        <span className="tabular">{v ? fmt(v) : "—"}</span>
                        <span className="mt-1 ml-auto block h-1 max-w-24 bg-surface-2" aria-hidden>
                          <span className="block h-full" style={{ width: `${(v / rowMax) * 100}%`, background: TECH_BY_ID[t].hex }} />
                        </span>
                      </td>
                    );
                  })}
                  <td className="tabular py-3 pl-2 text-right font-semibold">{fmt(mw(row))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-muted">
        Stages follow the latest recorded event for each project. Capacity is as stated by the source; projects without a stated capacity count toward the number of projects only.
      </p>
    </div>
  );
}
