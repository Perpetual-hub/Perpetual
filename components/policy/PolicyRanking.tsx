"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PILLARS, WEIGHT_PRESETS, type PillarId } from "@/data/policy";
import { rankPolicies } from "@/lib/policy-score";

interface Row {
  country: string;
  name: string;
  scores: Record<PillarId, number>;
  dealBreakers: string[];
  isSample: boolean;
}

type SortKey = "score" | "name" | PillarId;

/** Full PROFITS ranking with a weight-preset switch and sortable pillar columns. */
export function PolicyRanking({ rows }: { rows: Row[] }) {
  const [preset, setPreset] = useState(WEIGHT_PRESETS[1].id);
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "score", dir: "desc" });
  const p = WEIGHT_PRESETS.find((x) => x.id === preset)!;
  const ranked = useMemo(() => rankPolicies(rows, p.weights), [rows, p.weights]);
  const sorted = useMemo(() => {
    const v = (r: (typeof ranked)[number]) => (sort.key === "score" ? r.score : sort.key === "name" ? r.name : r.scores[sort.key]);
    return [...ranked].sort((a, b) => {
      const x = v(a);
      const y = v(b);
      const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return sort.dir === "asc" ? c : -c;
    });
  }, [ranked, sort]);

  const th = (key: SortKey, label: React.ReactNode) => {
    const on = sort.key === key;
    const Icon = !on ? ArrowUpDown : sort.dir === "asc" ? ArrowUp : ArrowDown;
    return (
      <th scope="col" aria-sort={on ? (sort.dir === "asc" ? "ascending" : "descending") : "none"} className="px-3 py-2.5 text-xs font-medium text-muted">
        <button
          type="button"
          onClick={() => setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: key === "name" ? "asc" : "desc" }))}
          className={`inline-flex items-center gap-1 hover:text-ink ${on ? "text-ink" : ""}`}
        >
          {label}
          <Icon className={`size-3 ${on ? "" : "opacity-40"}`} aria-hidden />
        </button>
      </th>
    );
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted">Weight for</span>
        <div role="radiogroup" aria-label="Weight preset" className="flex rounded-lg border border-line bg-white p-0.5">
          {WEIGHT_PRESETS.map((x) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={preset === x.id}
              onClick={() => setPreset(x.id)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${preset === x.id ? "bg-brand-navy text-white" : "text-muted hover:text-ink"}`}
            >
              {x.label}
            </button>
          ))}
        </div>
        <span className="text-sm text-muted">{p.description}</span>
      </div>
      <div className="relative overflow-x-auto rounded-[var(--radius)] border border-line">
        <table className="w-full min-w-[860px] text-sm">
          <caption className="sr-only">PROFITS scores by country, weighted for {p.label}. Column headers sort the table.</caption>
          <thead>
            <tr className="border-b border-line text-left">
              <th scope="col" className="w-12 px-3 py-2.5 text-xs font-medium text-muted">
                Rank
              </th>
              {th("name", "Country")}
              {th("score", "Score")}
              {PILLARS.map((pl) => (
                <th
                  key={pl.id}
                  scope="col"
                  aria-sort={sort.key === pl.id ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                  className="px-2 py-2.5 text-center text-xs font-medium text-muted"
                >
                  <button
                    type="button"
                    title={`${pl.name}${p.weights[pl.id] !== 1 ? ` (weight ×${p.weights[pl.id]})` : ""}`}
                    onClick={() => setSort((s) => (s.key === pl.id ? { key: pl.id, dir: s.dir === "asc" ? "desc" : "asc" } : { key: pl.id, dir: "desc" }))}
                    className={`inline-flex flex-col items-center hover:text-ink ${sort.key === pl.id ? "text-ink" : ""}`}
                  >
                    <span className="font-bold">{pl.id}</span>
                    <span className="sr-only">{pl.name}</span>
                    {p.weights[pl.id] !== 1 && <span className="tabular text-[10px]">×{p.weights[pl.id]}</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {sorted.map((r) => (
              <tr key={r.country} className="hover:bg-surface-2">
                <td className="tabular px-3 py-2.5 text-muted">{r.rank}</td>
                <th scope="row" className="px-3 py-2.5 text-left font-medium">
                  <Link href={`/countries/${r.country}`} className="text-ink hover:text-brand-blue">
                    {r.name}
                  </Link>
                  {r.dealBreakers.length > 0 && <span className="ml-2 text-xs font-medium text-[#9a6b00]">Deal-breaker</span>}
                </th>
                <td className="px-3 py-2.5">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-16 rounded-full bg-surface-2" aria-hidden>
                      <span className="block h-full rounded-full bg-[#2f9264]" style={{ width: `${(r.score / 5) * 100}%` }} />
                    </span>
                    <span className="tabular font-semibold">{r.score.toFixed(1)}</span>
                  </span>
                </td>
                {PILLARS.map((pl) => (
                  <td key={pl.id} className="tabular px-2 py-2.5 text-center">
                    <span
                      className="inline-block min-w-8 rounded px-1.5 py-0.5 text-xs"
                      style={{ background: `rgba(47,146,100,${0.08 + (r.scores[pl.id] - 1) * 0.12})` }}
                    >
                      {r.scores[pl.id].toFixed(1)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
