"use client";

import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { VERDICT_CODE, VERDICT_LABEL } from "@/lib/policy-review/cells";
import type { SegmentId, Verdict } from "@/lib/policy-review/types";
import { formatDate } from "@/lib/format";
import { DirectionArrow, FreshnessBadge } from "./Badges";

export interface OverviewRow {
  iso2: string;
  name: string;
  region?: string;
  lastReviewed?: string;
  freshness?: "current" | "review_due" | "out_of_date";
  activeFlags: number;
  events: number;
  segments: Record<SegmentId, { verdict: Verdict; direction?: "improving" | "stable" | "worsening" }>;
}

const TAG: Record<Verdict, string> = {
  ready: "bg-[#e5f3e8] text-[#1f6b37]",
  workable: "bg-[#fcf0d8] text-[#7a4d00]",
  difficult: "bg-[#fbe5e2] text-[#9c2a20]",
  not_reviewed: "bg-[#edf1f6] text-[#56667c]",
};

/** Verdict as a plain tinted tag, the way policy databases show a status. */
export function VerdictTag({ verdict }: { verdict: Verdict }) {
  return <span className={`inline-block rounded-[4px] px-2 py-0.5 text-[13px] font-medium whitespace-nowrap ${TAG[verdict]}`}>{VERDICT_LABEL[verdict]}</span>;
}

const flag = (iso: string) => String.fromCodePoint(...[...iso.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)));

type SortKey = "name" | "region" | "utility" | "ci" | "flags" | "events" | "reviewed";

const selectCls =
  "h-10 rounded-[6px] border border-line bg-white pr-8 pl-3 text-sm text-ink focus:outline-2 focus:outline-brand-blue";

/** Reviewed markets as a filterable policy table: search, region, deal type and verdict filters. */
export function ReviewTable({ rows }: { rows: OverviewRow[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("all");
  const [seg, setSeg] = useState<SegmentId>("utility");
  const [verdict, setVerdict] = useState<"all" | Verdict>("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "utility", dir: "desc" });
  const regions = useMemo(() => [...new Set(rows.map((r) => r.region).filter(Boolean) as string[])].sort(), [rows]);

  const shown = useMemo(() => {
    const val = (r: OverviewRow): number | string =>
      sort.key === "name"
        ? r.name
        : sort.key === "region"
          ? (r.region ?? "")
          : sort.key === "utility" || sort.key === "ci"
            ? VERDICT_CODE[r.segments[sort.key].verdict]
            : sort.key === "flags"
              ? r.activeFlags
              : sort.key === "events"
                ? r.events
                : (r.lastReviewed ?? "");
    return rows
      .filter((r) => r.name.toLowerCase().includes(q.trim().toLowerCase()))
      .filter((r) => region === "all" || r.region === region)
      .filter((r) => verdict === "all" || r.segments[seg].verdict === verdict)
      .sort((a, b) => {
        const x = val(a), y = val(b);
        const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
        return (sort.dir === "asc" ? c : -c) || a.name.localeCompare(b.name);
      });
  }, [rows, q, region, seg, verdict, sort]);

  const th = (key: SortKey, label: string, cls = "") => (
    <th scope="col" aria-sort={sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"} className={`px-4 py-3 text-left text-[13px] font-semibold text-ink ${cls}`}>
      <button
        type="button"
        onClick={() => setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: key === "name" || key === "region" ? "asc" : "desc" }))}
        className="inline-flex items-center gap-1 hover:text-brand-blue"
      >
        {label}
        {sort.key === key ? (sort.dir === "asc" ? <ArrowUp className="size-3.5" aria-hidden /> : <ArrowDown className="size-3.5" aria-hidden />) : <ArrowUpDown className="size-3.5 opacity-35" aria-hidden />}
      </button>
    </th>
  );

  return (
    <div>
      <div className="flex flex-wrap items-end gap-3 rounded-[10px] border border-line bg-white/80 p-4">
        <label className="flex min-w-56 flex-1 flex-col gap-1.5 text-xs font-medium text-muted">
          Search
          <span className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Country name"
              className="h-10 w-full rounded-[6px] border border-line bg-white pr-3 pl-9 text-sm text-ink placeholder:text-soft focus:outline-2 focus:outline-brand-blue"
            />
          </span>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-muted">
          Region
          <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectCls}>
            <option value="all">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-muted">
          Deal type
          <select value={seg} onChange={(e) => setSeg(e.target.value as SegmentId)} className={selectCls}>
            <option value="utility">Utility-Scale</option>
            <option value="ci">C&amp;I</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-muted">
          Verdict
          <select value={verdict} onChange={(e) => setVerdict(e.target.value as "all" | Verdict)} className={selectCls}>
            <option value="all">Any verdict</option>
            {(["ready", "workable", "difficult", "not_reviewed"] as const).map((v) => (
              <option key={v} value={v}>
                {VERDICT_LABEL[v]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 mb-2 text-sm text-muted" aria-live="polite">
        Showing <span className="tabular font-semibold text-ink">{shown.length}</span> of {rows.length} reviewed markets
      </p>

      <div className="overflow-x-auto rounded-[10px] border border-line bg-white">
        <table className="w-full min-w-[920px] text-[15px]">
          <caption className="sr-only">Reviewed markets with their verdicts. Column headers sort the table, and each row opens the full review.</caption>
          <thead className="border-b border-line bg-[#f2f5f9]">
            <tr>
              {th("name", "Country")}
              {th("region", "Region")}
              {th("utility", "Utility-Scale")}
              {th("ci", "C&I")}
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-semibold text-ink">
                Direction
              </th>
              {th("flags", "Red Flags")}
              {th("events", "Policy Changes")}
              {th("reviewed", "Reviewed")}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {shown.map((r) => (
              <tr
                key={r.iso2}
                onClick={() => router.push(`/policy/${r.iso2.toLowerCase()}`)}
                className="cursor-pointer transition-colors hover:bg-[#f6f9fc]"
              >
                <th scope="row" className="px-4 py-3.5 text-left font-medium">
                  <Link href={`/policy/${r.iso2.toLowerCase()}`} className="inline-flex items-center gap-2.5 text-ink hover:text-brand-blue" onClick={(e) => e.stopPropagation()}>
                    <span className="text-lg leading-none" aria-hidden>
                      {flag(r.iso2)}
                    </span>
                    {r.name}
                  </Link>
                </th>
                <td className="px-4 py-3.5 text-sm text-muted">{r.region}</td>
                <td className="px-4 py-3.5">
                  <VerdictTag verdict={r.segments.utility.verdict} />
                </td>
                <td className="px-4 py-3.5">
                  <VerdictTag verdict={r.segments.ci.verdict} />
                </td>
                <td className="px-4 py-3.5">{r.segments[seg].direction && <DirectionArrow value={r.segments[seg].direction!} />}</td>
                <td className="tabular px-4 py-3.5 text-sm">{r.activeFlags ? <span className="font-medium text-[#9c2a20]">{r.activeFlags} active</span> : <span className="text-muted">None</span>}</td>
                <td className="tabular px-4 py-3.5 text-sm text-muted">{r.events}</td>
                <td className="px-4 py-3.5 text-sm text-muted">
                  <span className="flex flex-wrap items-center gap-2 whitespace-nowrap">
                    {r.lastReviewed ? formatDate(r.lastReviewed) : ""}
                    {r.freshness !== "current" && <FreshnessBadge value={r.freshness} />}
                  </span>
                </td>
              </tr>
            ))}
            {!shown.length && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted">
                  No reviewed market matches these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">Direction is shown for the deal type chosen above.</p>
    </div>
  );
}
