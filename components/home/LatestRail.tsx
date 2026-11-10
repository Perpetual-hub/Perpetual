"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { TechTag } from "@/components/ui/TechTag";
import { TimeAgo } from "@/components/ui/TimeAgo";
import type { Technology } from "@/lib/types";

export interface RailItem {
  id: string;
  href: string;
  date: string;
  title: string;
  summary: string;
  tech?: Technology;
  breaking?: boolean;
}

const TABS = [
  { id: "news", label: "News" },
  { id: "deals", label: "Deals" },
] as const;

export function LatestRail({ news, deals }: { news: RailItem[]; deals: RailItem[] }) {
  const [tab, setTab] = useState<"news" | "deals">("news");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const items = tab === "news" ? news : deals;

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tab === "news" ? "deals" : "news";
    setTab(next);
    tabRefs.current[next === "news" ? 0 : 1]?.focus();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 pt-6 pb-3 lg:pt-8">
        <h2 className="font-display text-sm font-semibold text-hero-muted">Latest</h2>
        <div role="tablist" aria-label="Latest" className="flex rounded-full border border-hero-line p-0.5" onKeyDown={onKeyDown}>
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="latest-panel"
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors duration-150 ${
                tab === t.id ? "bg-white text-brand-navy" : "text-hero-muted hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div id="latest-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="flex-1 px-6">
      <ol>
        {items.map((it) => (
          <li key={it.id} className="border-t border-hero-line first:border-t-0">
            <Link href={it.href} className="group block py-4">
              <div className="mb-1.5 flex items-center gap-2.5 text-[11px] text-hero-muted">
                {it.breaking && (
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-sun">
                    <span className="size-1.5 rounded-full bg-brand-sun" aria-hidden />
                    New
                  </span>
                )}
                <TimeAgo date={it.date} className="tabular" />
                {it.tech && <TechTag tech={it.tech} tone="dark" size="xs" />}
              </div>
              <h3 className="font-sans text-[0.94rem] leading-snug font-semibold text-white decoration-white/40 underline-offset-2 group-hover:underline">
                {it.title}
              </h3>
              <p className="mt-1 line-clamp-1 text-[13px] text-hero-muted">{it.summary}</p>
            </Link>
          </li>
        ))}
      </ol>
      </div>
      <div className="px-6 pt-2 pb-6">
        <Link
          href={tab === "news" ? "/news" : "/deals"}
          className="group inline-flex items-center gap-1 text-sm font-medium text-brand-sky hover:text-white"
        >
          All {tab === "news" ? "news & policy" : "deals"}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
