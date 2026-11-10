import Link from "next/link";
import { TECHNOLOGIES } from "@/lib/tech";
import type { Technology } from "@/lib/types";

/** Sticky row of the eight technologies, so readers can jump between them. */
export function TechSwitcher({ current }: { current: Technology }) {
  return (
    <nav aria-label="Technologies" className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur-sm">
      <ul className="container-page flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        {TECHNOLOGIES.map((t) => {
          const Icon = t.icon;
          const active = t.id === current;
          return (
            <li key={t.id} className="shrink-0">
              <Link
                href={`/technologies/${t.id}`}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  active ? "bg-surface-2 text-ink shadow-[inset_0_-2px_0_var(--accent)]" : "text-muted hover:bg-surface-2 hover:text-ink"
                }`}
                style={{ "--accent": t.hex } as React.CSSProperties}
              >
                <Icon className="size-4" style={{ color: t.hex }} aria-hidden />
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
