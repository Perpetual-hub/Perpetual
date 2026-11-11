import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TECHNOLOGIES } from "@/lib/tech";
import type { Technology } from "@/lib/types";

export function TechGrid({ counts }: { counts: Record<Technology, { deals: number; worldMW?: number }> }) {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line md:grid-cols-4">
      {TECHNOLOGIES.map((t) => {
        const Icon = t.icon;
        const c = counts[t.id];
        return (
          <li key={t.id} className="bg-white">
            <Link
              href={`/sectors/${t.id}`}
              className="group relative flex h-full flex-col p-5 transition-colors duration-200 hover:bg-surface-2 md:p-6"
              style={{ "--accent": t.hex } as React.CSSProperties}
            >
              {/* Accent bar slides in on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
              <span className="flex items-center justify-between">
                <Icon className="size-6" style={{ color: t.hex }} aria-hidden />
                <ArrowRight
                  className="size-4 -translate-x-1 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden
                />
              </span>
              <span className="mt-8 flex items-center gap-1.5 font-display text-lg font-bold tracking-tight text-brand-navy">
                {t.label}
              </span>
              <span className="tabular mt-1 text-sm text-muted">
                {c.worldMW != null ? `${(c.worldMW / 1000).toLocaleString("en", { maximumFractionDigits: c.worldMW < 10_000 ? 1 : 0 })} GW worldwide · ` : ""}
                {c.deals} {c.deals === 1 ? "deal" : "deals"}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
