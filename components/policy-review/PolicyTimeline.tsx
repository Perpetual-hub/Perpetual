"use client";

import { ArrowDown, ArrowUp, Minus } from "lucide-react";
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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const GREEN = "#1f9d55";
const RED = "#d63c2f";
const AMBER = "#e9a23b";

function when(e: TimelineEvent) {
  const [y, m, d] = e.date.split("-");
  if (e.precision === "year") return y;
  if (e.precision === "month") return `${MONTHS[+m - 1]} ${y}`;
  return `${+d} ${MONTHS[+m - 1]} ${y}`;
}

/** Positive, negative or mixed as a solid tag with an arrow, readable at a glance. */
export function EffectTag({ effect }: { effect: TimelineEvent["effect"] }) {
  const m = {
    positive: { label: "Positive", bg: GREEN, Icon: ArrowUp },
    negative: { label: "Negative", bg: RED, Icon: ArrowDown },
    mixed: { label: "Mixed", bg: AMBER, Icon: Minus },
  }[effect];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 text-sm font-semibold whitespace-nowrap text-white" style={{ background: m.bg }}>
      <m.Icon className="size-4" strokeWidth={2.5} aria-hidden />
      {m.label}
    </span>
  );
}

interface Cell {
  pos: number;
  neg: number;
  mix: number;
}
const total = (c: Cell) => c.pos + c.neg + c.mix;

/** Colour of a year: green when changes were mostly positive, red when mostly negative, amber when balanced. */
function cellStyle(c: Cell | undefined): { bg: string; fg: string; label: string; text: string } {
  if (!c || !total(c)) return { bg: "#e9eef4", fg: "#94a3b8", label: "No recorded change", text: "" };
  const net = c.pos - c.neg;
  if (net >= 2) return { bg: "#167a41", fg: "#fff", label: "Mostly positive", text: `+${net}` };
  if (net === 1) return { bg: GREEN, fg: "#fff", label: "Mostly positive", text: "+1" };
  if (net === -1) return { bg: RED, fg: "#fff", label: "Mostly negative", text: "−1" };
  if (net <= -2) return { bg: "#a8261c", fg: "#fff", label: "Mostly negative", text: `−${-net}` };
  return { bg: AMBER, fg: "#fff", label: "Mixed", text: "±" };
}

function overall(pos: number, neg: number, mix: number) {
  const n = pos + neg + mix;
  if (!n) return { word: "No recorded changes", color: "#56667c" };
  if (pos >= neg * 2 && pos / n >= 0.5) return { word: "Mostly positive", color: "#167a41" };
  if (neg >= pos * 2 && neg / n >= 0.5) return { word: "Mostly negative", color: "#a8261c" };
  return { word: "Mixed", color: "#9a6100" };
}

/**
 * Policy direction as a heat map: one row per country, one column per year. Each square shows
 * whether that year's policy changes were mostly positive (green), mostly negative (red) or
 * balanced (amber) for investors. Choosing a square or a year lists the changes underneath.
 */
export function PolicyTimeline({ events, currentYear }: { events: TimelineEvent[]; currentYear: number }) {
  const [seg, setSeg] = useState<"all" | SegmentId>("all");
  const shown = useMemo(() => events.filter((e) => seg === "all" || e.segments.includes(seg)), [events, seg]);
  const multi = events.some((e) => e.country);
  const years = useMemo(() => {
    const first = Math.min(currentYear, ...events.map((e) => +e.date.slice(0, 4)));
    return Array.from({ length: currentYear - first + 1 }, (_, i) => first + i);
  }, [events, currentYear]);
  const rows = useMemo(() => {
    const names = [...new Set(events.map((e) => e.country?.name ?? ""))].sort();
    return names.map((name) => ({ name, href: events.find((e) => e.country?.name === name)?.country?.href }));
  }, [events]);
  const grid = useMemo(() => {
    const m = new Map<string, Cell>();
    for (const e of shown) {
      const k = `${e.country?.name ?? ""}|${e.date.slice(0, 4)}`;
      const c = m.get(k) ?? { pos: 0, neg: 0, mix: 0 };
      if (e.effect === "positive") c.pos++;
      else if (e.effect === "negative") c.neg++;
      else c.mix++;
      m.set(k, c);
    }
    return m;
  }, [shown]);
  const latest = shown.length ? Math.max(...shown.map((e) => +e.date.slice(0, 4))) : currentYear;
  const [pick, setPick] = useState<{ row: string | null; year: number } | null>(null);
  const sel = pick ?? { row: null, year: latest };
  const list = shown
    .filter((e) => +e.date.slice(0, 4) === sel.year && (sel.row == null || (e.country?.name ?? "") === sel.row))
    .sort((a, b) => b.date.localeCompare(a.date));
  const pos = shown.filter((e) => e.effect === "positive").length;
  const neg = shown.filter((e) => e.effect === "negative").length;
  const mix = shown.length - pos - neg;
  const ov = overall(pos, neg, mix);
  const pct = (n: number) => (shown.length ? (n / shown.length) * 100 : 0);

  if (!events.length) return <p className="text-[15px] text-soft">No dated policy changes recorded yet.</p>;

  return (
    <div>
      {/* Overall direction, in words first */}
      <div className="grid gap-6 rounded-[12px] border border-line bg-white p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-center md:p-8">
        <div>
          <p className="text-sm text-muted">{multi ? "Across reviewed markets, " : "Policy for investors, "}since {years[0]}</p>
          <p className="mt-1 font-display text-[2.4rem] leading-none font-light tracking-[-0.035em]" style={{ color: ov.color }}>
            {ov.word}
          </p>
        </div>
        <div>
          <div className="flex h-5 overflow-hidden rounded-[6px] bg-[#e9eef4]" role="img" aria-label={`${pos} positive, ${mix} mixed and ${neg} negative changes`}>
            <span style={{ width: `${pct(pos)}%`, background: GREEN }} />
            <span style={{ width: `${pct(mix)}%`, background: AMBER }} />
            <span style={{ width: `${pct(neg)}%`, background: RED }} />
          </div>
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[15px] text-ink">
            <span>
              <b className="tabular font-semibold" style={{ color: "#167a41" }}>{pos}</b> positive
            </span>
            <span>
              <b className="tabular font-semibold" style={{ color: "#9a6100" }}>{mix}</b> mixed
            </span>
            <span>
              <b className="tabular font-semibold" style={{ color: "#a8261c" }}>{neg}</b> negative
            </span>
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
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
              {s === "all" ? "All deals" : s === "utility" ? "Utility-scale" : "C&I"}
            </button>
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink" aria-label="Key">
          {[
            ["#167a41", "Mostly positive"],
            [AMBER, "Mixed"],
            [RED, "Mostly negative"],
            ["#e9eef4", "No recorded change"],
          ].map(([c, l]) => (
            <li key={l} className="flex items-center gap-2">
              <span className="size-4 rounded-[4px]" style={{ background: c }} aria-hidden />
              {l}
            </li>
          ))}
        </ul>
      </div>

      {/* Heat map */}
      <div className="mt-5 overflow-x-auto rounded-[12px] border border-line bg-white p-4 md:p-5">
        <table className="border-separate border-spacing-1.5">
          <caption className="sr-only">Policy changes by year. Each square shows whether that year was mostly positive, mostly negative or mixed for investors.</caption>
          <thead>
            <tr>
              {multi && <th scope="col" className="sr-only">Market</th>}
              {years.map((y) => (
                <th key={y} scope="col" className="p-0">
                  <button
                    type="button"
                    onClick={() => setPick({ row: null, year: y })}
                    className={`tabular w-11 rounded-[4px] py-1 text-xs ${sel.year === y && sel.row == null ? "bg-[#0b1f3a] font-semibold text-white" : "text-muted hover:text-ink"}`}
                  >
                    {y}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                {multi && (
                  <th scope="row" className="pr-3 text-left text-sm font-medium whitespace-nowrap text-ink">
                    {r.href ? (
                      <a href={r.href} className="hover:text-brand-blue">
                        {r.name}
                      </a>
                    ) : (
                      r.name
                    )}
                  </th>
                )}
                {years.map((y) => {
                  const c = grid.get(`${r.name}|${y}`);
                  const st = cellStyle(c);
                  const active = sel.year === y && (sel.row == null ? false : sel.row === r.name);
                  return (
                    <td key={y} className="p-0">
                      <button
                        type="button"
                        disabled={!c}
                        onClick={() => setPick({ row: r.name, year: y })}
                        aria-label={`${r.name || "This market"} ${y}, ${c ? `${st.label}, ${c.pos} positive, ${c.neg} negative, ${c.mix} mixed` : "no recorded change"}`}
                        className={`tabular grid place-items-center rounded-[6px] text-sm font-semibold transition-transform ${multi ? "size-11" : "size-14 text-base"} ${c ? "hover:scale-105" : ""} ${active ? "ring-2 ring-[#0b1f3a] ring-offset-2" : ""}`}
                        style={{ background: st.bg, color: st.fg }}
                      >
                        {st.text}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 px-1.5 text-xs text-muted">
          The number in a square is positive minus negative changes that year. Choose a square{multi ? " or a year" : ""} to see what changed.
        </p>
      </div>

      {/* Changes for the chosen year */}
      <div className="mt-8" aria-live="polite">
        <p className="font-display text-[1.75rem] leading-none font-light tracking-[-0.03em] text-[#0b1f3a]">
          {sel.year}
          {sel.row ? <span className="text-soft">, {sel.row}</span> : multi ? <span className="text-soft">, all markets</span> : null}
        </p>
        {list.length ? (
          <ol className="mt-5 divide-y divide-line border-y border-line">
            {list.map((e, i) => (
              <li key={i} className="grid gap-2 py-5 md:grid-cols-[8rem_minmax(0,1fr)_auto] md:items-start md:gap-6">
                <span className="text-sm text-muted">{when(e)}</span>
                <span className="text-[15px] leading-relaxed text-ink">
                  {e.country && (
                    <a href={e.country.href} className="mb-0.5 block text-sm font-medium text-brand-blue hover:underline">
                      {e.country.name}
                    </a>
                  )}
                  {e.title}
                  {e.refs.map((r) => (
                    <a
                      key={r.n}
                      href={e.country ? r.url : `#src-${r.n}`}
                      target={e.country ? "_blank" : undefined}
                      rel={e.country ? "noopener" : undefined}
                      className="tabular ml-1 text-xs text-brand-blue hover:underline"
                    >
                      [{r.n}]
                    </a>
                  ))}
                  <span className="block text-xs text-muted">{e.segments.map((s) => (s === "ci" ? "C&I" : "Utility-scale")).join(" and ")}</span>
                </span>
                <EffectTag effect={e.effect} />
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 text-[15px] text-soft">No recorded change in {sel.year}.</p>
        )}
      </div>
    </div>
  );
}
