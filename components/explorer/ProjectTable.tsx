"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import type { MapPoint } from "@/lib/data";
import { OWNERSHIP_LABEL, STATUSES } from "@/lib/filters";
import { countryName, formatDate } from "@/lib/format";

type Key = "name" | "technology" | "capacityMW" | "status" | "country" | "region" | "cod" | "ownership" | "developer";

const COLS: { key: Key; label: string; numeric?: boolean }[] = [
  { key: "name", label: "Project" },
  { key: "technology", label: "Sector" },
  { key: "capacityMW", label: "Capacity (MW)", numeric: true },
  { key: "status", label: "Status" },
  { key: "country", label: "Country" },
  { key: "region", label: "Region" },
  { key: "cod", label: "COD" },
  { key: "ownership", label: "Ownership" },
  { key: "developer", label: "Developer" },
];

function sortValue(p: MapPoint, k: Key): string | number {
  if (k === "status") return STATUSES.indexOf(p.status);
  if (k === "country") return countryName(p.country);
  if (k === "capacityMW") return p.capacityMW;
  return (p[k] ?? "") as string;
}

export function ProjectTable({ points }: { points: MapPoint[] }) {
  const [sort, setSort] = useState<{ key: Key; dir: "asc" | "desc" }>({ key: "capacityMW", dir: "desc" });
  const [limit, setLimit] = useState(300);
  const rows = useMemo(() => {
    const out = [...points].sort((a, b) => {
      const x = sortValue(a, sort.key);
      const y = sortValue(b, sort.key);
      const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return sort.dir === "asc" ? c : -c;
    });
    return out;
  }, [points, sort]);

  const toggle = (key: Key) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: key === "capacityMW" || key === "cod" ? "desc" : "asc" },
    );

  return (
    <div className="relative overflow-x-auto rounded-[var(--radius)] border border-line bg-white">
      <table className="w-full min-w-[1080px] text-sm">
        <caption className="sr-only">Projects matching the current filters. Column headers sort the table.</caption>
        <thead className="sticky top-0 z-10 bg-white">
          <tr className="border-b border-line">
            {COLS.map((c) => {
              const active = sort.key === c.key;
              const Icon = !active ? ArrowUpDown : sort.dir === "asc" ? ArrowUp : ArrowDown;
              return (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                  className={`px-4 py-2.5 text-xs font-medium text-muted ${c.numeric ? "text-right" : "text-left"}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(c.key)}
                    className={`inline-flex items-center gap-1 rounded px-1 py-0.5 hover:text-ink ${active ? "text-ink" : ""}`}
                  >
                    {c.label}
                    <Icon className={`size-3 ${active ? "" : "opacity-40"}`} aria-hidden />
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.slice(0, limit).map((p) => (
            <tr key={p.id} className="transition-colors duration-100 hover:bg-surface-2">
              <th scope="row" className="max-w-64 px-4 py-3 text-left font-medium">
                <Link href={`/projects/${p.slug}`} className="text-ink hover:text-brand-blue">
                  {p.name}
                </Link>
              </th>
              <td className="px-4 py-3">
                <TechTag tech={p.technology} />
              </td>
              <td className="tabular px-4 py-3 text-right">
                {p.capacityMW.toLocaleString("en")}
                {p.storageMWh && <div className="text-xs text-muted">{p.storageMWh.toLocaleString("en")} MWh</div>}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={p.status} />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">{countryName(p.country)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-muted">{p.region}</td>
              <td className="tabular px-4 py-3 whitespace-nowrap">
                {p.cod ? formatDate(p.cod) : "—"}
                {p.codConfidence === "estimated" && <span className="ml-1 text-xs text-muted italic">est.</span>}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-muted">{p.ownership ? OWNERSHIP_LABEL[p.ownership] : "—"}</td>
              <td className="px-4 py-3 whitespace-nowrap text-muted">{p.developer ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > limit && (
        <div className="border-t border-line p-4 text-center">
          <button type="button" onClick={() => setLimit((l) => l + 500)} className="rounded-[3px] border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-surface-2">
            Show more ({(rows.length - limit).toLocaleString("en-GB")} left)
          </button>
        </div>
      )}
    </div>
  );
}
