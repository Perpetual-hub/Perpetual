"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SampleBadge, StatusBadge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import type { MapPoint } from "@/lib/data";
import { OWNERSHIP_LABEL } from "@/lib/filters";
import { countryName, formatDate, formatMW } from "@/lib/format";


/** Side drawer with a project's key facts. Traps focus, closes on Escape, restores focus on close. */
export function ProjectDrawer({ point, onClose }: { point: MapPoint | null; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<Element | null>(null);

  useEffect(() => {
    if (!point) return;
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
  }, [point, onClose]);

  useEffect(() => {
    if (point) return;
    (returnTo.current as HTMLElement | null)?.focus?.();
    returnTo.current = null;
  }, [point]);

  const facts: [string, React.ReactNode][] = point
    ? (
        [
          ["Capacity", <span key="c" className="tabular">{formatMW(point.capacityMW)}{point.storageMWh ? ` / ${point.storageMWh.toLocaleString("en")} MWh` : ""}</span>],
          ["Type", point.subType],
          ["Country", countryName(point.country)],
          ["Region", point.region],
          ["Developer", point.developer],
          ["Ownership", OWNERSHIP_LABEL[point.ownership]],
          [
            point.status === "operating" ? "Commercial operation" : "Expected operation",
            point.cod && (
              <span key="d" className="tabular">
                {formatDate(point.cod)}
                {point.codConfidence === "estimated" && <span className="ml-1.5 text-muted italic">(estimated)</span>}
              </span>
            ),
          ],
        ] as [string, React.ReactNode][]
      ).filter(([, v]) => v)
    : [];

  return (
    <>
      {point && (
        <>
          <div className="anim-fade-in fixed inset-0 z-50 bg-[#061a33]/30" onClick={onClose} aria-hidden />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className="anim-enter-left fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white text-ink shadow-[-12px_0_40px_-16px_rgba(6,26,51,0.35)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 pt-6 pb-5">
              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <TechTag tech={point.technology} withIcon />
                  <StatusBadge status={point.status} />
                  {point.isSample && <SampleBadge />}
                </div>
                <h2 id="drawer-title" className="text-2xl leading-tight font-bold tracking-tight">
                  {point.name}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="-mt-1 -mr-2 rounded-md p-2 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <dl className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[9.5rem_1fr] gap-4 py-3 text-sm">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-line p-6">
              <Link
                href={`/projects/${point.slug}`}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-4 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-blue"
              >
                Open full profile
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
