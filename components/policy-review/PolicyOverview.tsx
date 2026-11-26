"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ProjectGlobeLazy } from "@/components/map/ProjectMapLazy";
import { SEGMENT_LABEL, VERDICT_CODE, VERDICT_LABEL, VERDICT_STYLE, toPolicyScores, type VerdictCells } from "@/lib/policy-review/cells";
import type { SegmentId } from "@/lib/policy-review/types";
import { formatDate } from "@/lib/format";
import { DirectionArrow, FreshnessBadge, VerdictBadge } from "./Badges";
import { DealToggle, useDeal } from "./DealToggle";

export interface OverviewRow {
  iso2: string;
  name: string;
  lastReviewed?: string;
  freshness?: "current" | "review_due" | "out_of_date";
  activeFlags: number;
  segments: Record<SegmentId, { verdict: "ready" | "workable" | "difficult" | "not_reviewed"; direction?: "improving" | "stable" | "worsening" }>;
}

/** Globe coloured by verdict for the chosen deal type. Clicking a country opens its review. */
export function PolicyGlobe({ cells }: { cells: Record<SegmentId, VerdictCells> }) {
  const deal = useDeal();
  const router = useRouter();
  const scores = useMemo(() => toPolicyScores(cells[deal]), [cells, deal]);
  const counts = useMemo(() => {
    const n = { ready: 0, workable: 0, difficult: 0 };
    for (const c of Object.values(cells[deal])) if (c.verdict !== "not_reviewed") n[c.verdict]++;
    return n;
  }, [cells, deal]);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <DealToggle tone="dark" />
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-hero-ink/85">
          {(["ready", "workable", "difficult"] as const).map((v) => (
            <li key={v} className="flex items-center gap-2">
              <span className="size-3 rounded-[3px]" style={{ background: VERDICT_STYLE[v].fill }} aria-hidden />
              {VERDICT_LABEL[v]} <span className="tabular text-hero-muted">{counts[v]}</span>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <span className="size-3 rounded-[3px] bg-white/15" aria-hidden />
            Not yet reviewed
          </li>
        </ul>
      </div>
      <div className="starfield relative mt-6 h-[62vh] min-h-[420px] overflow-hidden rounded-[16px]">
        <ProjectGlobeLazy
          points={[]}
          theme="dark"
          projection="globe"
          mode="policy"
          vivid
          autoRotate
          fitGlobe={0.92}
          initialView={{ center: [60, 15], zoom: 1.5 }}
          policy={scores}
          onPolicySelect={(iso) => router.push(`/policy/${iso.toLowerCase()}`)}
          ariaLabel={`Globe coloured by Policy Review verdict for ${SEGMENT_LABEL[deal]} deals. The table below lists the same verdicts.`}
        />
      </div>
    </div>
  );
}

type SortKey = "name" | "verdict" | "direction" | "flags" | "reviewed";
const DIR_RANK = { improving: 3, stable: 2, worsening: 1 } as const;

export function ReviewTable({ rows }: { rows: OverviewRow[] }) {
  const deal = useDeal();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "verdict", dir: "desc" });
  const shown = useMemo(() => {
    const val = (r: OverviewRow): number | string =>
      sort.key === "name"
        ? r.name
        : sort.key === "verdict"
          ? VERDICT_CODE[r.segments[deal].verdict]
          : sort.key === "direction"
            ? DIR_RANK[r.segments[deal].direction ?? "stable"]
            : sort.key === "flags"
              ? r.activeFlags
              : (r.lastReviewed ?? "");
    return rows
      .filter((r) => r.name.toLowerCase().includes(q.trim().toLowerCase()))
      .sort((a, b) => {
        const x = val(a), y = val(b);
        const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
        return (sort.dir === "asc" ? c : -c) || a.name.localeCompare(b.name);
      });
  }, [rows, q, sort, deal]);
  const th = (key: SortKey, label: string, cls = "") => (
    <th scope="col" aria-sort={sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"} className={`px-4 py-3 text-left text-sm font-medium text-muted ${cls}`}>
      <button
        type="button"
        onClick={() => setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: key === "name" ? "asc" : "desc" }))}
        className={`inline-flex items-center gap-1 hover:text-ink ${sort.key === key ? "text-ink" : ""}`}
      >
        {label}
        {sort.key === key ? (sort.dir === "asc" ? <ArrowUp className="size-3.5" aria-hidden /> : <ArrowDown className="size-3.5" aria-hidden />) : <ArrowUpDown className="size-3.5 opacity-40" aria-hidden />}
      </button>
    </th>
  );
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-4">
        <DealToggle />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a country"
          aria-label="Find a country"
          className="h-10 w-60 rounded-full border border-line bg-white px-4 text-sm text-ink placeholder:text-soft"
        />
        <span className="text-sm text-soft">
          {rows.length} {rows.length === 1 ? "market" : "markets"} reviewed, verdicts for {SEGMENT_LABEL[deal]} deals
        </span>
      </div>
      <div className="overflow-x-auto rounded-[14px] border border-line bg-white/70">
        <table className="w-full min-w-[720px] text-[15px]">
          <caption className="sr-only">Reviewed markets with their {SEGMENT_LABEL[deal]} verdict. Column headers sort the table.</caption>
          <thead className="border-b border-line bg-surface-2/60">
            <tr>
              {th("name", "Country")}
              {th("verdict", "Verdict")}
              {th("direction", "Direction")}
              {th("flags", "Active red flags")}
              {th("reviewed", "Last reviewed")}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {shown.map((r) => (
              <tr key={r.iso2} className="hover:bg-white">
                <th scope="row" className="px-4 py-3.5 text-left font-medium">
                  <Link href={`/policy/${r.iso2.toLowerCase()}${deal === "ci" ? "?deal=ci" : ""}`} className="text-ink hover:text-brand-blue">
                    {r.name}
                  </Link>
                </th>
                <td className="px-4 py-3.5">
                  <VerdictBadge verdict={r.segments[deal].verdict} />
                </td>
                <td className="px-4 py-3.5">{r.segments[deal].direction && <DirectionArrow value={r.segments[deal].direction!} />}</td>
                <td className="tabular px-4 py-3.5 text-muted">{r.activeFlags || "None"}</td>
                <td className="px-4 py-3.5 text-muted">
                  <span className="flex flex-wrap items-center gap-2">
                    {r.lastReviewed ? formatDate(r.lastReviewed) : ""}
                    {r.freshness !== "current" && <FreshnessBadge value={r.freshness} />}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
