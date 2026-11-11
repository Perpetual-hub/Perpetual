"use client";

import { AlertTriangle, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { DEAL_BREAKERS, PILLARS, type PillarId } from "@/data/policy";
import type { RankedPolicy } from "@/lib/policy-score";

/** Side panel with a country's PROFITS breakdown. Focus-trapped; Escape closes. */
export function PolicyPanel({
  entry,
  name,
  total,
  weights,
  presetLabel,
  onClose,
}: {
  entry: RankedPolicy | null;
  /** Shown when the country has no score yet. */
  name: string | null;
  total: number;
  weights: Record<PillarId, number>;
  presetLabel: string;
  onClose: () => void;
}) {
  const open = Boolean(name);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    returnTo.current ??= document.activeElement;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const els = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) return;
    (returnTo.current as HTMLElement | null)?.focus?.();
    returnTo.current = null;
  }, [open]);

  if (!open) return null;
  const maxW = Math.max(...Object.values(weights));

  return (
    <>
      <div className="anim-fade-in fixed inset-0 z-50 bg-[#061a33]/30" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-title"
        className="anim-enter-left fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white text-ink shadow-[-12px_0_40px_-16px_rgba(6,26,51,0.35)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 pt-6 pb-5">
          <div>
            <p className="text-xs font-semibold text-brand-blue">PROFITS policy score</p>
            <h2 id="policy-title" className="mt-1 text-2xl font-bold tracking-tight">
              {entry?.name ?? name}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close policy breakdown"
            className="-mt-1 -mr-2 rounded-md p-2 text-muted hover:bg-surface-2 hover:text-ink"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!entry ? (
            <p className="text-sm leading-relaxed text-muted">
              This country has not been scored yet. Scores are added as Perpetual&rsquo;s coverage grows.
            </p>
          ) : (
            <>
              {entry.isSample && (
                <p className="mb-5 rounded-lg border border-brand-sun/50 bg-brand-sun/10 px-3.5 py-2.5 text-xs leading-relaxed text-ink">
                  <strong>Illustrative score.</strong> Placeholder values for the beta, not an assessment of this country.
                </p>
              )}
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs text-muted">Weighted score</dt>
                  <dd className="tabular mt-0.5 font-display text-3xl font-bold text-brand-navy">
                    {entry.score.toFixed(1)}
                    <span className="text-base font-semibold text-muted"> / 5</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Rank ({presetLabel})</dt>
                  <dd className="tabular mt-0.5 font-display text-3xl font-bold text-brand-navy">
                    {entry.rank}
                    <span className="text-base font-semibold text-muted"> of {total}</span>
                  </dd>
                </div>
              </dl>

              {entry.dealBreakers.length > 0 ? (
                <div className="mt-5 rounded-lg border border-[#f5b000] bg-[#fff7e0] px-3.5 py-3 text-sm">
                  <p className="flex items-center gap-1.5 font-semibold text-ink">
                    <AlertTriangle className="size-4 text-[#9a6b00]" aria-hidden />
                    Deal-breaker
                  </p>
                  <ul className="mt-1 list-disc pl-5 text-ink/80">
                    {entry.dealBreakers.map((d) => (
                      <li key={d}>{DEAL_BREAKERS.find((x) => x.id === d)?.label ?? d}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-5 text-xs text-muted">No deal-breakers recorded.</p>
              )}

              <h3 className="mt-7 mb-3 font-sans text-sm font-semibold text-ink">Pillar scores</h3>
              <ul className="space-y-4">
                {PILLARS.map((p) => {
                  const v = entry.scores[p.id];
                  return (
                    <li key={p.id}>
                      <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="font-medium text-ink">
                          <span className="tabular mr-1.5 inline-block w-4 font-bold text-brand-blue">{p.id}</span>
                          {p.name}
                        </span>
                        <span className="tabular font-semibold">{v.toFixed(1)}</span>
                      </div>
                      <div className="mt-1.5 ml-[1.375rem] h-2 rounded-r-[4px] bg-surface-2" aria-hidden>
                        <div className="h-full rounded-r-[4px] bg-brand-navy" style={{ width: `${(v / 5) * 100}%` }} />
                      </div>
                      <p className="mt-1 ml-[1.375rem] text-xs text-muted">
                        {p.question}
                        {weights[p.id] !== 1 && (
                          <span className="ml-1 font-medium text-ink">
                            Weight ×{weights[p.id]}
                            {weights[p.id] === maxW ? " (highest)" : ""}
                          </span>
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        <div className="flex gap-3 border-t border-line p-6">
          {entry && (
            <Link
              href={`/countries/${entry.country}`}
              className="flex-1 rounded-lg border border-line px-4 py-3 text-center text-sm font-semibold text-ink hover:border-[#cdd6e2]"
            >
              Country profile
            </Link>
          )}
          <Link
            href="/policy"
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-navy px-4 py-3 text-sm font-semibold text-white hover:bg-brand-blue"
          >
            How PROFITS works
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </>
  );
}
