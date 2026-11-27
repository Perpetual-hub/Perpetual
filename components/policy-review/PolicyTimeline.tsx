"use client";

import { useMemo, useState } from "react";
import type { SegmentId } from "@/lib/policy-review/types";

export interface TimelineEvent {
  date: string;
  precision: "day" | "month" | "year";
  effect: "positive" | "negative" | "mixed";
  title: string;
  segments: SegmentId[];
  refs: { n: number; url: string }[];
  /** Shown on the overview, where events from several countries are combined. */
  country?: { name: string; href: string };
}

const TONE = { positive: "#3f9d5a", negative: "#cf4b3f", mixed: "#e3a73a" } as const;
const LABEL = { positive: "Positive", negative: "Negative", mixed: "Mixed" } as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function when(e: TimelineEvent) {
  const [y, m, d] = e.date.split("-");
  if (e.precision === "year") return y;
  if (e.precision === "month") return `${MONTHS[+m - 1]} ${y}`;
  return `${+d} ${MONTHS[+m - 1]} ${y}`;
}

/**
 * Policy changes over the years: each year is a column, positive changes stack above the line,
 * negative ones below, mixed ones sit on it. Choosing a year lists its changes underneath.
 */
export function PolicyTimeline({ events, currentYear }: { events: TimelineEvent[]; currentYear: number }) {
  const [seg, setSeg] = useState<"all" | SegmentId>("all");
  const shown = useMemo(() => events.filter((e) => seg === "all" || e.segments.includes(seg)), [events, seg]);
  const years = useMemo(() => {
    const first = Math.min(currentYear, ...events.map((e) => +e.date.slice(0, 4)));
    return Array.from({ length: currentYear - first + 1 }, (_, i) => first + i);
  }, [events, currentYear]);
  const byYear = useMemo(() => {
    const m = new Map<number, TimelineEvent[]>();
    for (const e of shown) {
      const y = +e.date.slice(0, 4);
      m.set(y, [...(m.get(y) ?? []), e]);
    }
    return m;
  }, [shown]);
  const latest = [...byYear.keys()].sort((a, b) => b - a)[0];
  const [picked, setPicked] = useState<number | null>(null);
  const year = picked != null && byYear.has(picked) ? picked : latest;
  const max = Math.max(1, ...years.map((y) => (byYear.get(y) ?? []).filter((e) => e.effect !== "negative").length));
  const maxNeg = Math.max(1, ...years.map((y) => (byYear.get(y) ?? []).filter((e) => e.effect === "negative").length));
  const count = (k: TimelineEvent["effect"]) => shown.filter((e) => e.effect === k).length;
  const list = [...(byYear.get(year) ?? [])].sort((a, b) => b.date.localeCompare(a.date));
  // Blocks shrink when one year is crowded, so the chart stays about 200px tall.
  const BLOCK = Math.max(5, Math.min(18, Math.floor(200 / (max + maxNeg)) - 3));

  if (!events.length) return <p className="text-[15px] text-soft">No dated policy events recorded yet.</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="radiogroup" aria-label="Deal type" className="inline-flex rounded-full border border-line bg-white p-1">
          {(["all", "utility", "ci"] as const).map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={seg === s}
              onClick={() => setSeg(s)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${seg === s ? "bg-[#0b1f3a] text-white" : "text-muted hover:text-ink"}`}
            >
              {s === "all" ? "All" : s === "utility" ? "Utility-scale" : "C&I"}
            </button>
          ))}
        </div>
        <p className="text-sm text-soft">
          Since {years[0]}, {count("positive")} positive, {count("negative")} negative and {count("mixed")} mixed changes.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="flex min-w-max items-stretch gap-1.5" role="group" aria-label="Policy changes by year">
          {years.map((y) => {
            const ev = byYear.get(y) ?? [];
            const up = ev.filter((e) => e.effect === "positive");
            const mid = ev.filter((e) => e.effect === "mixed");
            const down = ev.filter((e) => e.effect === "negative");
            const active = y === year;
            return (
              <button
                key={y}
                type="button"
                disabled={!ev.length}
                aria-pressed={active}
                onClick={() => setPicked(y)}
                aria-label={`${y}, ${up.length} positive, ${down.length} negative, ${mid.length} mixed`}
                className={`group flex w-12 flex-col items-center rounded-[8px] px-1 pt-2 pb-1.5 transition-colors ${active ? "bg-white shadow-[0_0_0_1px_var(--line)]" : ev.length ? "hover:bg-white/70" : ""}`}
              >
                <span className="flex flex-col-reverse items-center gap-[3px]" style={{ height: max * (BLOCK + 3) + mid.length * 0 }}>
                  {[...up, ...mid].map((e, i) => (
                    <span key={i} className="block w-7 rounded-[3px]" style={{ height: BLOCK, background: TONE[e.effect], opacity: active ? 1 : 0.8 }} />
                  ))}
                </span>
                <span className="my-1.5 block h-px w-full bg-[#0b1f3a]/60" />
                <span className="flex flex-col items-center gap-[3px]" style={{ height: maxNeg * (BLOCK + 3) }}>
                  {down.map((e, i) => (
                    <span key={i} className="block w-7 rounded-[3px]" style={{ height: BLOCK, background: TONE.negative, opacity: active ? 1 : 0.8 }} />
                  ))}
                </span>
                <span className={`tabular mt-2 text-[11px] ${active ? "font-semibold text-ink" : ev.length ? "text-muted" : "text-muted/50"}`}>{y}</span>
              </button>
            );
          })}
        </div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted" aria-label="Key">
        {(["positive", "mixed", "negative"] as const).map((k) => (
          <li key={k} className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-[2px]" style={{ background: TONE[k] }} aria-hidden />
            {LABEL[k]}
          </li>
        ))}
        <li>Positive above the line, negative below. Choose a year to see its changes.</li>
      </ul>

      <div className="mt-8 border-t border-line pt-6" aria-live="polite">
        <p className="font-display text-[1.6rem] leading-none font-light tracking-[-0.03em] text-[#0b1f3a]">{year}</p>
        <ol className="mt-4 divide-y divide-line">
          {list.map((e, i) => (
            <li key={i} className="grid gap-1 py-4 md:grid-cols-[8rem_minmax(0,1fr)_7rem] md:gap-6">
              <span className="text-sm text-muted">{when(e)}</span>
              <span className="text-[15px] leading-relaxed text-ink">
                {e.country && (
                  <a href={e.country.href} className="mb-0.5 block text-sm font-medium text-brand-blue hover:underline">
                    {e.country.name}
                  </a>
                )}
                {e.title}
                {e.refs.map((r) => (
                  <a key={r.n} href={e.country ? r.url : `#src-${r.n}`} target={e.country ? "_blank" : undefined} rel={e.country ? "noopener" : undefined} className="tabular ml-1 text-xs text-brand-blue hover:underline">
                    [{r.n}]
                  </a>
                ))}
                <span className="block text-xs text-muted">{e.segments.map((s) => (s === "ci" ? "C&I" : "Utility-scale")).join(" and ")}</span>
              </span>
              <span className="flex items-start gap-2 text-sm font-medium text-ink md:justify-end">
                <span className="mt-1 h-3 w-1" style={{ background: TONE[e.effect] }} aria-hidden />
                {LABEL[e.effect]}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
