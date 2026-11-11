"use client";

import { Banknote, ChevronDown, Handshake, History, Landmark, Leaf, Scale, Zap, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { PILLARS, WEIGHT_PRESETS, type PillarId } from "@/data/policy";

const ICON: Record<PillarId, LucideIcon> = {
  P: Landmark,
  R: Scale,
  O: Handshake,
  F: Banknote,
  I: Zap,
  T: History,
  S: Leaf,
};

// One accent per pillar, all dark enough for white text and distinct from each other.
const TONE: Record<PillarId, string> = {
  P: "#0b4a8f",
  R: "#1d6fb8",
  O: "#127a6a",
  F: "#2f8a3e",
  I: "#a66a00",
  T: "#b4502b",
  S: "#7a4fb5",
};

/**
 * PROFITS as a readable graphic: seven letters joined on one line, each with its name, the investor's
 * question and what is measured, so the framework is clear without clicking. Selecting a letter
 * opens the full detail below.
 */
export function PillarSpine() {
  const [open, setOpen] = useState<PillarId | null>(null);
  const pillar = PILLARS.find((p) => p.id === open);

  return (
    <div>
      <ol className="relative grid gap-y-10 md:grid-cols-7 md:gap-x-3">
        {/* The spine joining the letters (horizontal on wide screens, vertical on phones). */}
        <span aria-hidden className="absolute top-9 right-[7%] left-[7%] hidden h-[3px] rounded-full bg-gradient-to-r from-[#0b4a8f] via-[#2f8a3e] to-[#7a4fb5] md:block" />
        <span aria-hidden className="absolute top-4 bottom-4 left-9 w-[3px] rounded-full bg-gradient-to-b from-[#0b4a8f] via-[#2f8a3e] to-[#7a4fb5] md:hidden" />
        {PILLARS.map((p) => {
          const Icon = ICON[p.id];
          const active = open === p.id;
          return (
            <li key={p.id} className="relative grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 md:block md:text-center">
              <button
                type="button"
                aria-expanded={active}
                aria-controls="pillar-detail"
                onClick={() => setOpen(active ? null : p.id)}
                className="group relative z-10 mx-auto flex size-[4.5rem] flex-col items-center justify-center rounded-full border-4 border-white text-white shadow-[0_6px_18px_-6px_rgba(11,27,46,0.45)] transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
                style={{ background: TONE[p.id] }}
              >
                <span className="font-display text-3xl leading-none font-extrabold">{p.id}</span>
                <Icon className="mt-0.5 size-3.5 opacity-80" aria-hidden />
                <span className="sr-only">
                  {p.name}: {active ? "hide details" : "show details"}
                </span>
              </button>
              <div className="md:mt-4">
                <h3 className="font-sans text-[0.95rem] leading-snug font-semibold text-ink">{p.name}</h3>
                <p className="mt-1 text-sm leading-snug text-muted">{p.question}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5 md:justify-center" aria-label={`What ${p.name} measures`}>
                  {p.measures.map((m) => (
                    <li
                      key={m}
                      className="rounded-full px-2.5 py-1 text-[11px] leading-tight font-medium"
                      style={{ background: `${TONE[p.id]}14`, color: TONE[p.id] }}
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-8 text-center text-sm text-muted">
        Each pillar is scored 1 (weak) to 5 (strong), then the seven are combined with weights for your deal type.{" "}
        <span className="font-medium text-ink">Select a letter for the full detail.</span>
      </p>

      <div id="pillar-detail" aria-live="polite">
        {pillar && (
          <div
            className="anim-enter-down mt-6 grid gap-8 rounded-[var(--radius)] border-l-4 bg-surface-2 p-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:p-8"
            style={{ borderColor: TONE[pillar.id] }}
          >
            <div>
              <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: TONE[pillar.id] }}>
                Pillar {pillar.id}
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight">{pillar.name}</h3>
              <p className="mt-2 leading-relaxed text-muted">{pillar.question}</p>
              <h4 className="mt-6 font-sans text-sm font-semibold text-ink">What an investor checks</h4>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/85">
                {pillar.checks.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: TONE[pillar.id] }} aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-sm font-semibold text-ink">How we score it today</h4>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/85">
                {pillar.measures.map((m) => (
                  <li key={m} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink/40" aria-hidden />
                    {m}
                  </li>
                ))}
              </ul>
              <h4 className="mt-6 font-sans text-sm font-semibold text-ink">Weight by deal type</h4>
              <dl className="mt-2 grid grid-cols-3 gap-2">
                {WEIGHT_PRESETS.map((w) => (
                  <div key={w.id} className="rounded-lg bg-white px-3 py-2.5">
                    <dt className="text-[11px] leading-tight text-muted">{w.label}</dt>
                    <dd className="tabular mt-0.5 font-display text-xl font-bold text-ink">×{w.weights[pillar.id]}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="inline-flex items-center gap-1 justify-self-start text-sm font-medium text-brand-blue md:col-span-2"
            >
              <ChevronDown className="size-4 rotate-180" aria-hidden />
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
