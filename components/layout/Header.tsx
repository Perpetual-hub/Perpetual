"use client";

import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { TECHNOLOGIES } from "@/lib/tech";
import { SiteMenu } from "./SiteMenu";
import type { Technology } from "@/lib/types";

// The palette (Fuse.js + index) is only downloaded the first time search is opened.
const CommandPalette = dynamic(() => import("@/components/search/CommandPalette").then((m) => m.CommandPalette), { ssr: false });

/** Listens for ⌘K / Ctrl K everywhere; loads the palette on first use. */
function SearchLauncher({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [used, setUsed] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setUsed(true);
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);
  if (!used && !open) return null;
  return <CommandPalette open={open} onOpenChange={onOpenChange} />;
}

export type TechCounts = Record<Technology, { deals: number; worldMW?: number }>;

const NAV = [
  { href: "/deals", label: "Deals" },
  { href: "/policy", label: "Policy" },
  { href: "/statistics", label: "Statistics" },
  { href: "/disclosure", label: "Disclosure" },
];

export function Header({
  logo,
  techCounts,
}: {
  logo: React.ReactNode;
  techCounts: TechCounts;
}) {
  const [techOpen, setTechOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const techRef = useRef<HTMLDivElement>(null);

  // Close the technologies panel on outside click or Escape.
  useEffect(() => {
    if (!techOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!techRef.current?.contains(e.target as Node)) setTechOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setTechOpen(false);
        techRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [techOpen]);

  const linkCls =
    "rounded-full px-3.5 py-1.5 text-sm font-medium text-ink/75 transition-colors duration-150 hover:bg-white hover:text-ink";

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-[var(--home-paper)]/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-6">
        <Link href="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
          {logo}
        </Link>

        <nav aria-label="Sections" className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          <Link href={NAV[0].href} className={linkCls}>
            {NAV[0].label}
          </Link>
          <div ref={techRef} className="relative">
            <button
              type="button"
              aria-expanded={techOpen}
              aria-controls="tech-panel"
              onClick={() => setTechOpen((o) => !o)}
              className={`${linkCls} inline-flex items-center gap-1`}
            >
              Sectors
              <ChevronDown className={`size-3.5 transition-transform duration-200 ${techOpen ? "rotate-180" : ""}`} aria-hidden />
            </button>
            {techOpen && (
                <div
                  id="tech-panel"
                  className="anim-enter-down absolute top-full left-1/2 mt-3 w-[540px] -translate-x-1/2 rounded-[16px] border border-line bg-white p-2 shadow-[0_12px_32px_-12px_rgba(20,30,22,0.18)]"
                >
                  <ul className="grid grid-cols-2 gap-0.5">
                    {TECHNOLOGIES.map((t) => {
                      const Icon = t.icon;
                      const c = techCounts[t.id];
                      return (
                        <li key={t.id}>
                          <Link
                            href={`/sectors/${t.id}`}
                            onClick={() => setTechOpen(false)}
                            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-surface-2"
                          >
                            <span
                              className="flex size-9 items-center justify-center rounded-lg border border-line bg-white"
                              aria-hidden
                            >
                              <Icon className="size-[18px]" style={{ color: t.hex }} />
                            </span>
                            <span className="flex-1">
                              <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                                <span className="size-2 rounded-full" style={{ background: t.hex }} aria-hidden />
                                {t.label}
                              </span>
                              <span className="tabular text-xs text-muted">
                                {c.worldMW != null ? `${(c.worldMW / 1000).toLocaleString("en", { maximumFractionDigits: c.worldMW < 10_000 ? 1 : 0 })} GW worldwide · ` : ""}
                                {c.deals} {c.deals === 1 ? "deal" : "deals"}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
          </div>
          {NAV.slice(1).map((n) => (
            <Link key={n.href} href={n.href} className={linkCls}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search (Command K)"
            aria-keyshortcuts="Meta+K Control+K"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-white"
          >
            <Search className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="site-menu"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 items-center gap-2.5 rounded-full bg-[#1d2a22] pr-3.5 pl-4 text-sm font-medium text-[var(--home-paper)] transition-colors hover:bg-black"
          >
            Menu
            <span className="flex w-4 flex-col gap-[3px]" aria-hidden>
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
          </button>
        </div>
      </div>
      <SiteMenu open={mobileOpen} onClose={() => setMobileOpen(false)} onSearch={() => setSearchOpen(true)} />
      <SearchLauncher open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
