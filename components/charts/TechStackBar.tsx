"use client";

import { useState } from "react";
import { formatMW } from "@/lib/format";
import { TECHNOLOGIES } from "@/lib/tech";
import type { Technology } from "@/lib/types";

/**
 * Horizontal stacked bar of capacity by technology. Segments keep the fixed technology
 * order and colours, separated by 2px surface gaps. Hover (or focus) a segment for its value.
 * Always pair with a <TechLegend /> and a table, since some technology colours are light.
 */
export function TechStackBar({
  byTech,
  max,
  height = 12,
  label,
}: {
  byTech: Partial<Record<Technology, number>>;
  /** Bar length is relative to this (e.g. the largest row), so rows compare. */
  max: number;
  height?: number;
  label: string;
}) {
  const [hover, setHover] = useState<Technology | null>(null);
  const total = TECHNOLOGIES.reduce((s, t) => s + (byTech[t.id] ?? 0), 0);
  const segs = TECHNOLOGIES.filter((t) => (byTech[t.id] ?? 0) > 0);
  const hovered = hover ? TECHNOLOGIES.find((t) => t.id === hover) : undefined;
  return (
    <div className="relative">
      <div
        className="flex gap-[2px]"
        style={{ width: `${max ? (total / max) * 100 : 0}%`, minWidth: total ? 4 : 0, height }}
        role="img"
        aria-label={`${label}: ${segs.map((t) => `${t.label} ${formatMW(byTech[t.id])}`).join(", ")}`}
      >
        {segs.map((t, i) => (
          <span
            key={t.id}
            tabIndex={-1}
            onMouseEnter={() => setHover(t.id)}
            onMouseLeave={() => setHover(null)}
            className={`block h-full transition-opacity duration-150 ${hover && hover !== t.id ? "opacity-40" : ""} ${
              i === segs.length - 1 ? "rounded-r-[4px]" : ""
            }`}
            style={{ flexGrow: byTech[t.id], flexBasis: 0, background: t.hex, minWidth: 2 }}
          />
        ))}
      </div>
      {hovered && (
        <div className="pointer-events-none absolute -top-9 left-0 z-10 rounded-md border border-line bg-white px-2 py-1 text-xs whitespace-nowrap text-ink shadow-sm">
          <span className="mr-1.5 inline-block size-2 rounded-full" style={{ background: hovered.hex }} aria-hidden />
          {hovered.label} <span className="tabular text-muted">{formatMW(byTech[hovered.id])}</span>
        </div>
      )}
    </div>
  );
}

export function TechLegend({ techs = TECHNOLOGIES.map((t) => t.id) }: { techs?: Technology[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted" aria-label="Legend">
      {TECHNOLOGIES.filter((t) => techs.includes(t.id)).map((t) => (
        <li key={t.id} className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-[3px]" style={{ background: t.hex }} aria-hidden />
          {t.label}
        </li>
      ))}
    </ul>
  );
}
