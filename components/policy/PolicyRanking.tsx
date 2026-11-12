"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PILLARS, WEIGHT_PRESETS, type PillarId } from "@/data/policy";
import { rampColor } from "@/lib/policy-colors";
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
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const p = WEIGHT_PRESETS.find((x) => x.id === preset)!;
  const ranked = useMemo(() => rankPolicies(rows, p.weights), [rows, p.weights]);
  const sorted = useMemo(() => {
    const v = (r: (typeof ranked)[number]) => (sort.key === "score" ? r.score : sort.key === "name" ? r.name : r.scores[sort.key]);
    const needle = q.trim().toLowerCase();
    return [...ranked].filter((r) => !needle || r.name.toLowerCase().includes(needle)).sort((a, b) => {
      const x = v(a);
      const y = v(b);
      const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return sort.dir === "asc" ? c : -c;
    });
  }, [ranked, sort, q]);
  const shown = all || q ? sorted : sorted.slice(0, 25);

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
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a country"
          aria-label="Find a country"
          className="h-10 w-56 rounded-[var(--radius)] bg-paper px-3.5 text-sm text-ink placeholder:text-soft focus:bg-white focus:outline-2 focus:outline-brand-blue"
        />
        <span className="ml-2 text-sm text-soft">Weight for</span>
        <div role="radiogroup" aria-label="Weight preset" className="flex rounded-[var(--radius)] bg-paper p-0.5">
          {WEIGHT_PRESETS.map((x) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={preset === x.id}
              onClick={() => setPreset(x.id)}
              className={`rounded-[3px] px-3 py-1.5 text-sm font-medium ${preset === x.id ? "bg-ink text-white" : "text-soft hover:text-ink"}`}
            >
              {x.label}
            </button>
          ))}
        </div>
        <span className="text-sm text-soft">{p.description}</span>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <caption className="sr-only">PROFITS scores by country, weighted for {p.label}. Column headers sort the table.</caption>
          <thead>
            <tr className="border-b border-ink/80 text-left">
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
            {shown.map((r) => (
              <tr key={r.country} className="hover:bg-paper">
                <td className="tabular px-3 py-3.5 text-soft">{r.rank}</td>
                <th scope="row" className="px-3 py-3.5 text-left font-medium">
                  <Link href={`/countries/${r.country}`} className="text-ink hover:text-brand-blue">
                    {r.name}
                  </Link>
                  {r.dealBreakers.length > 0 && <span className="ml-2 text-xs font-medium text-[#9a6b00]">Deal-breaker</span>}
                </th>
                <td className="px-3 py-3.5">
                  <span className="flex items-center gap-3">
                    <span className="h-2 w-28 bg-paper" aria-hidden>
                      <span className="block h-full bg-accent" style={{ width: `${(r.score / 5) * 100}%` }} />
                    </span>
                    <span className="tabular font-semibold text-ink">{r.score.toFixed(1)}</span>
                  </span>
                </td>
                {PILLARS.map((pl) => (
                  <td key={pl.id} className="tabular px-1 py-1.5 text-center">
                    <span
                      className="flex h-9 min-w-10 items-center justify-center rounded-[3px] text-xs font-medium text-ink"
                      style={{ background: `color-mix(in srgb, ${rampColor(r.scores[pl.id])} 28%, white)` }}
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
      {!q && sorted.length > 25 && (
        <div className="mt-6 flex items-center gap-4">
          <button type="button" onClick={() => setAll((a) => !a)} className="rounded-[var(--radius)] bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy">
            {all ? "Show top 25" : `Show all ${sorted.length} countries`}
          </button>
          <span className="text-sm text-soft">Cells are shaded by score, from 1 (red) to 5 (green).</span>
        </div>
      )}
    </div>
  );
}
