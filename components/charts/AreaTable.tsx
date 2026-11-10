import Link from "next/link";
import type { AreaSummary } from "@/lib/data";
import { formatGW } from "@/lib/format";
import { TechLegend, TechStackBar } from "./TechStackBar";

/** IRENA-style breakdown: one row per area with a capacity-by-technology bar and the numbers. */
export function AreaTable({
  rows,
  hrefFor,
  nameHeader,
}: {
  rows: AreaSummary[];
  hrefFor: (a: AreaSummary) => string;
  nameHeader: string;
}) {
  const max = Math.max(...rows.map((r) => r.totalMW), 1);
  return (
    <div>
      <div className="mb-4">
        <TechLegend />
      </div>
      <div className="overflow-x-auto rounded-[var(--radius)] border border-line bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th scope="col" className="px-5 py-3 font-medium">{nameHeader}</th>
              <th scope="col" className="w-[38%] px-5 py-3 font-medium">Capacity by technology</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Projects</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Operating GW</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Pipeline GW</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Total GW</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.key} className="transition-colors duration-150 hover:bg-surface-2">
                <th scope="row" className="px-5 py-3.5 text-left font-medium">
                  <Link href={hrefFor(r)} className="text-ink hover:text-brand-blue">
                    {r.name}
                  </Link>
                  {r.kind === "region" && <div className="text-xs font-normal text-muted">{r.countries} countries</div>}
                </th>
                <td className="px-5 py-3.5">
                  <TechStackBar byTech={r.byTech} max={max} label={r.name} />
                </td>
                <td className="tabular px-5 py-3.5 text-right">{r.projects}</td>
                <td className="tabular px-5 py-3.5 text-right">{formatGW(r.operatingMW)}</td>
                <td className="tabular px-5 py-3.5 text-right">{formatGW(r.pipelineMW)}</td>
                <td className="tabular px-5 py-3.5 text-right font-semibold">{formatGW(r.totalMW)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
