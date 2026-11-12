"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { PILLARS, WEIGHT_PRESETS, type PillarId } from "@/data/policy";

/**
 * PROFITS as one interactive exhibit, in the manner of a consulting report: a numbered caption,
 * a statement headline, a pillar list whose bars show each pillar's share of the final score for
 * the chosen deal type, and a detail panel for the selected pillar. Sentence case throughout.
 */
export function PillarSpine() {
  const [active, setActive] = useState<PillarId>("P");
  const [preset, setPreset] = useState(WEIGHT_PRESETS[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const weights = WEIGHT_PRESETS.find((w) => w.id === preset)!;
  const total = Object.values(weights.weights).reduce((a, b) => a + b, 0);
  const share = (id: PillarId) => (weights.weights[id] / total) * 100;
  const maxShare = Math.max(...PILLARS.map((p) => share(p.id)));
  const pillar = PILLARS.find((p) => p.id === active)!;
  const index = PILLARS.findIndex((p) => p.id === active);

  // Arrow keys move between pillars, as in any tab list.
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next: number | undefined;
    if (step) next = (i + step + PILLARS.length) % PILLARS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = PILLARS.length - 1;
    if (next === undefined) return;
    e.preventDefault();
    setActive(PILLARS[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <figure className="m-0">
      <figcaption className="max-w-3xl">
        <p className="text-sm font-semibold text-brand-blue">Exhibit 1</p>
        <p className="mt-2 font-display text-2xl leading-snug font-bold tracking-tight text-ink md:text-[1.75rem]">
          Seven pillars decide whether a country can host a bankable renewable energy project.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Share of the final score held by each pillar. Choose a deal type to re-weight it, and a pillar to see what sits behind it.
        </p>
      </figcaption>

      {/* Deal type */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/80 pt-4">
        <span className="text-sm text-muted" id="preset-label">
          Deal type
        </span>
        <div role="radiogroup" aria-labelledby="preset-label" className="inline-flex rounded-[var(--radius)] border border-line p-0.5">
          {WEIGHT_PRESETS.map((w) => (
            <button
              key={w.id}
              type="button"
              role="radio"
              aria-checked={preset === w.id}
              onClick={() => setPreset(w.id)}
              className={`rounded-[3px] px-3 py-1.5 text-sm transition-colors ${
                preset === w.id ? "bg-brand-navy font-semibold text-white" : "text-ink/75 hover:bg-surface-2"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted md:ml-2">{weights.description}</p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        {/* Pillar list with share-of-score bars */}
        <div role="tablist" aria-orientation="vertical" aria-label="PROFITS pillars" className="border-t border-line">
          {PILLARS.map((p, i) => {
            const on = p.id === active;
            const s = share(p.id);
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`pillar-tab-${p.id}`}
                aria-selected={on}
                aria-controls="pillar-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => {
                  setActive(p.id);
                  // On narrow screens the panel sits below the list, so bring it into view.
                  if (window.matchMedia("(max-width: 1023px)").matches)
                    requestAnimationFrame(() => document.getElementById("pillar-panel")?.scrollIntoView({ behavior: "smooth", block: "start" }));
                }}
                onKeyDown={(e) => onKey(e, i)}
                className={`group relative grid w-full grid-cols-[2.25rem_minmax(0,1fr)_3.25rem] items-center gap-x-3 border-b border-line py-3 pr-1 pl-3 text-left transition-colors ${
                  on ? "bg-surface-2" : "hover:bg-surface-2/60"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-[3px] bg-brand-blue transition-opacity ${on ? "opacity-100" : "opacity-0"}`}
                />
                <span className={`font-display text-2xl leading-none font-extrabold ${on ? "text-brand-blue" : "text-brand-navy"}`}>
                  {p.id}
                </span>
                <span className="min-w-0">
                  <span className={`block text-sm leading-tight ${on ? "font-semibold text-ink" : "font-medium text-ink/85"}`}>{p.name}</span>
                  <span className="mt-2 block h-1.5 bg-line/70" aria-hidden>
                    <span
                      className={`block h-full transition-[width] duration-500 ease-out ${s === maxShare && total !== 7 ? "bg-brand-blue" : "bg-brand-navy/70"}`}
                      style={{ width: `${(s / 30) * 100}%` }}
                    />
                  </span>
                </span>
                <span className="tabular text-right text-sm font-semibold text-ink">
                  {Math.round(s)}%<span className="sr-only"> of the score</span>
                </span>
              </button>
            );
          })}
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Each pillar is scored 1 to 5. The final score is the weighted average, so it is also 1 to 5.
          </p>
        </div>

        {/* Detail panel */}
        <div id="pillar-panel" role="tabpanel" aria-labelledby={`pillar-tab-${pillar.id}`} key={pillar.id} className="anim-enter-down scroll-mt-24">
          <div className="flex items-start gap-5">
            <span aria-hidden className="font-display text-[4.5rem] leading-[0.8] font-extrabold text-brand-navy">
              {pillar.id}
            </span>
            <div>
              <p className="text-sm text-muted">
                Pillar {index + 1} of 7 · {pillar.name}
              </p>
              <h3 className="mt-1 font-display text-xl leading-snug font-bold tracking-tight text-ink md:text-2xl">{pillar.thesis}</h3>
            </div>
          </div>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink/80">{pillar.why}</p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="border-b border-ink/80 pb-2 text-sm font-semibold text-ink">In the score today</h4>
              <ol className="mt-1 divide-y divide-line">
                {pillar.measures.map((m, i) => (
                  <li key={m} className="flex gap-3 py-2.5 text-sm text-ink/85">
                    <span className="tabular w-5 shrink-0 font-semibold text-brand-blue">{String(i + 1).padStart(2, "0")}</span>
                    {m}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h4 className="border-b border-ink/80 pb-2 text-sm font-semibold text-ink">What an investor checks</h4>
              <ul className="mt-1 divide-y divide-line">
                {pillar.checks.map((c) => (
                  <li key={c} className="py-2.5 text-sm text-ink/85">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="border-b border-ink/80 pb-2 text-sm font-semibold text-ink">Weight by deal type</h4>
            <dl className="mt-1 grid grid-cols-3 divide-x divide-line">
              {WEIGHT_PRESETS.map((w) => {
                const t = Object.values(w.weights).reduce((a, b) => a + b, 0);
                return (
                  <div key={w.id} className={`py-3 pr-3 pl-3 first:pl-0 ${w.id === preset ? "" : "opacity-60"}`}>
                    <dt className="text-xs leading-tight text-muted">{w.label}</dt>
                    <dd className="mt-1">
                      <span className="tabular font-display text-2xl font-bold text-brand-navy">×{w.weights[pillar.id]}</span>
                      <span className="tabular block text-xs text-muted sm:ml-2 sm:inline">{Math.round((w.weights[pillar.id] / t) * 100)}% of score</span>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>

      <p className="mt-8 border-t border-line pt-3 text-xs leading-relaxed text-muted">
        Score = sum of (pillar score × weight) ÷ sum of weights. Source: Perpetual analysis; indicator sources are listed on the
        Disclosure page.
      </p>
    </figure>
  );
}
