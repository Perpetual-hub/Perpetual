"use client";

import { Banknote, FileText, Globe, HardHat, Landmark, Plug, Scale } from "lucide-react";
import { useState } from "react";
import { QUESTIONS, type QuestionId } from "@/lib/policy-review/types";

const ICON: Record<QuestionId, typeof Plug> = { access: Plug, terms: FileText, buyer: Banknote, ownership: Globe, build: HardHat, stability: Scale };
const RATINGS = [
  { word: "Supportive", bg: "#1f9d55", tint: "#e8f6ee", ink: "#14683a" },
  { word: "Mixed", bg: "#e9a23b", tint: "#fdf3e1", ink: "#7a4d00" },
  { word: "Unsupportive", bg: "#d63c2f", tint: "#fcebe9", ink: "#9c2a20" },
];

/** The six questions as a picker: choose one on the left, read what is checked and what earns each rating. */
export function MethodExplorer({ check, earns }: { check: Record<string, [string, string]>; earns: Record<string, [string, string, string]> }) {
  const [id, setId] = useState<QuestionId>("access");
  const [seg, setSeg] = useState<0 | 1>(0);
  const q = QUESTIONS.find((x) => x.id === id)!;
  const Icon = ICON[id];
  const gate = id === "access" || id === "ownership";

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1" role="tablist" aria-label="Investor questions">
        {QUESTIONS.map((x) => {
          const I = ICON[x.id];
          const on = x.id === id;
          return (
            <li key={x.id}>
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setId(x.id)}
                className={`group flex w-full items-center gap-4 rounded-[12px] border px-4 py-4 text-left transition-colors ${
                  on ? "border-[#0b5cad] bg-[#0b5cad] text-white" : "border-line bg-white text-[#0b1f3a] hover:border-[#0b5cad]/40"
                }`}
              >
                <span className={`tabular font-display text-3xl leading-none font-light ${on ? "text-white/60" : "text-[#8396ae]"}`}>{String(x.n).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{x.short}</span>
                  <span className={`hidden text-sm sm:block ${on ? "text-white/75" : "text-soft"}`}>{x.ask}</span>
                </span>
                <I className={`hidden size-5 shrink-0 lg:block ${on ? "text-white" : "text-[#0b5cad]"}`} aria-hidden />
              </button>
            </li>
          );
        })}
      </ol>

      <div role="tabpanel" className="overflow-hidden rounded-[16px] border border-line bg-white">
        <div className="relative overflow-hidden bg-[#083b6e] px-6 py-8 text-white md:px-10 md:py-10">
          <Icon className="absolute -top-6 -right-6 size-48 text-white/[0.07]" strokeWidth={1.2} aria-hidden />
          <p className="tabular text-sm text-white/60">Question {q.n} of 6</p>
          <h3 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] leading-none font-light tracking-[-0.035em] text-white">{q.ask}</h3>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-white/80">{q.short}</span>
            {gate && <span className="rounded-full bg-[#5aa9e6] px-3 py-1 text-xs font-semibold text-[#061a33]">Gate Question</span>}
          </div>
        </div>

        <div className="px-6 py-8 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-medium text-[#0b1f3a]">What We Check</p>
            <div role="radiogroup" aria-label="Deal type" className="inline-flex rounded-full border border-line p-1">
              {["Utility-Scale", "C&I"].map((l, i) => (
                <button
                  key={l}
                  type="button"
                  role="radio"
                  aria-checked={seg === i}
                  onClick={() => setSeg(i as 0 | 1)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${seg === i ? "bg-[#0b1f3a] text-white" : "text-muted hover:text-ink"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink/85">{check[id][seg]}.</p>

          <p className="mt-10 font-medium text-[#0b1f3a]">What Earns Each Rating</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {RATINGS.map((r, i) => (
              <div key={r.word} className="rounded-[12px] p-5" style={{ background: r.tint }}>
                <span className="inline-block rounded-[6px] px-2.5 py-1 text-sm font-semibold text-white" style={{ background: r.bg }}>
                  {r.word}
                </span>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: r.ink }}>
                  {earns[id][i]}
                </p>
              </div>
            ))}
          </div>
          {gate && (
            <p className="mt-6 flex items-start gap-3 text-[15px] text-soft">
              <Landmark className="mt-0.5 size-4 shrink-0 text-[#0b5cad]" aria-hidden />
              As a gate, an Unsupportive answer here makes the verdict Difficult on its own.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
