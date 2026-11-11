"use client";

import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { PILLARS, WEIGHT_PRESETS, type PillarId } from "@/data/policy";

/**
 * PROFITS as an acronym band, in the spirit of consulting frameworks (7-S, RAPID): one colour,
 * strong letters, thin rules and plain text, so the whole framework reads at a glance.
 * Selecting a column opens its full detail underneath.
 */
export function PillarSpine() {
  const [open, setOpen] = useState<PillarId | null>(null);
  const pillar = PILLARS.find((p) => p.id === open);

  return (
    <div>
      <div className="border-t-2 border-brand-navy">
        <ol className="grid divide-y divide-line border-b border-line md:grid-cols-7 md:divide-x md:divide-y-0">
          {PILLARS.map((p) => {
            const active = open === p.id;
            return (
              <li key={p.id} className="relative">
                <button
                  type="button"
                  aria-expanded={active}
                  aria-controls="pillar-detail"
                  onClick={() => setOpen(active ? null : p.id)}
                  className={`group grid h-full w-full grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 px-1 py-6 text-left transition-colors duration-150 md:flex md:flex-col md:justify-start md:px-5 md:py-7 ${
                    active ? "bg-surface-2" : "hover:bg-surface-2/70"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -top-0.5 hidden h-1 bg-brand-blue transition-opacity md:block ${active ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
                  />
                  <span className="font-display text-5xl leading-none font-extrabold tracking-tight text-brand-navy md:text-6xl">
                    {p.id}
                  </span>
                  <span className="md:mt-5 md:block">
                    <span className="block text-[0.95rem] leading-snug font-semibold text-ink md:min-h-[2.6rem]">{p.name}</span>
                    <span className="mt-1.5 block text-sm leading-snug text-muted md:min-h-[5.4rem]">{p.question}</span>
                    <span className="mt-4 block border-t border-line pt-3 text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
                      What we measure
                    </span>
                    <span className="mt-2 block space-y-1">
                      {p.measures.map((m) => (
                        <span key={m} className="flex gap-2 text-[13px] leading-snug text-ink/80">
                          <span aria-hidden className="text-brand-blue">–</span>
                          {m}
                        </span>
                      ))}
                    </span>
                    <span className="sr-only">{active ? "Hide details" : "Show details"}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* How the seven combine */}
      <div className="mt-6 flex flex-col items-start gap-3 rounded-[var(--radius)] bg-brand-navy px-6 py-5 text-white md:flex-row md:items-center md:gap-6">
        <p className="text-sm font-semibold">7 pillar scores, each 1 to 5</p>
        <ArrowRight className="hidden size-4 text-brand-sky md:block" aria-hidden />
        <p className="text-sm font-semibold">× weights for your deal type</p>
        <ArrowRight className="hidden size-4 text-brand-sky md:block" aria-hidden />
        <p className="text-sm font-semibold">= PROFITS score, 1 to 5</p>
        <p className="text-xs text-white/70 md:ml-auto">Select a pillar above for its full detail.</p>
      </div>

      <div id="pillar-detail" aria-live="polite">
        {pillar && (
          <div className="anim-enter-down mt-6 border-t-2 border-brand-navy bg-surface-2">
            <div className="grid gap-10 p-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:p-8">
              <div>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-6xl leading-none font-extrabold text-brand-navy">{pillar.id}</span>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{pillar.name}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{pillar.question}</p>
                  </div>
                </div>
                <h4 className="mt-8 text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">What an investor checks</h4>
                <ul className="mt-3 divide-y divide-line border-y border-line text-sm text-ink/85">
                  {pillar.checks.map((c) => (
                    <li key={c} className="py-2.5">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">How we score it today</h4>
                <ul className="mt-3 divide-y divide-line border-y border-line text-sm text-ink/85">
                  {pillar.measures.map((m) => (
                    <li key={m} className="py-2.5">
                      {m}
                    </li>
                  ))}
                </ul>
                <h4 className="mt-8 text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Weight by deal type</h4>
                <dl className="mt-3 grid grid-cols-3 divide-x divide-line border-y border-line">
                  {WEIGHT_PRESETS.map((w) => (
                    <div key={w.id} className="px-3 py-3 first:pl-0">
                      <dt className="text-xs leading-tight text-muted">{w.label}</dt>
                      <dd className="tabular mt-1 font-display text-2xl font-bold text-brand-navy">×{w.weights[pillar.id]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="border-t border-line px-6 py-3 md:px-8">
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:underline"
              >
                <X className="size-4" aria-hidden />
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
