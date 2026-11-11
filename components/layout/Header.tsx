"use client";

import { ChevronDown, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { TECHNOLOGIES } from "@/lib/tech";
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
  { href: "/projects", label: "Projects" },
  { href: "/deals", label: "Deals" },
  { href: "/policy", label: "Policy" },
  { href: "/statistics", label: "Statistics" },
  { href: "/methodology", label: "Methodology" },
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

  // Lock scroll behind the mobile menu.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const linkCls =
    "rounded-md px-2.5 py-1.5 text-sm font-medium text-ink/80 transition-colors duration-150 hover:bg-surface-2 hover:text-ink";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/85">
      <div className="container-page flex h-16 items-center gap-6">
        <Link href="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
          {logo}
        </Link>

        <nav aria-label="Main" className="hidden flex-1 items-center gap-0.5 lg:flex">
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
                  className="anim-enter-down absolute top-full left-0 mt-2 w-[540px] rounded-xl border border-line bg-white p-2 shadow-[0_12px_32px_-12px_rgba(11,27,46,0.18)]"
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
            className="hidden h-9 w-56 items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 text-sm text-muted transition-colors duration-150 hover:border-[#cfd7e2] md:flex"
          >
            <Search className="size-4" aria-hidden />
            <span className="flex-1 text-left">Search</span>
            <kbd className="rounded border border-line bg-white px-1.5 font-sans text-[11px] text-muted">⌘K</kbd>
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="rounded-md p-2 text-ink md:hidden"
          >
            <Search className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            className="-mr-2 rounded-md p-2 text-ink lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {mobileOpen && (
          <nav
            id="mobile-menu"
            aria-label="Main"
            className="anim-fade-in fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white lg:hidden"
          >
            <div className="container-page py-6">
              <ul className="divide-y divide-line border-y border-line">
                {NAV.slice(0, 1).map((n) => (
                  <MobileLink key={n.href} {...n} onClick={() => setMobileOpen(false)} />
                ))}
              </ul>
              <p className="mt-8 mb-3 text-xs font-semibold text-muted">Sectors</p>
              <ul className="grid grid-cols-2 gap-2">
                {TECHNOLOGIES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <li key={t.id}>
                      <Link
                        href={`/sectors/${t.id}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg border border-line px-3 py-3 text-sm font-medium"
                      >
                        <Icon className="size-4" style={{ color: t.hex }} aria-hidden />
                        {t.label}
                        <span className="tabular ml-auto text-xs text-muted">{techCounts[t.id].deals} deals</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {NAV.slice(1).map((n) => (
                  <MobileLink key={n.href} {...n} onClick={() => setMobileOpen(false)} />
                ))}
              </ul>
            </div>
          </nav>
        )}
      <SearchLauncher open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

function MobileLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <li>
      <Link href={href} onClick={onClick} className="block py-4 font-display text-xl font-semibold text-brand-navy">
        {label}
      </Link>
    </li>
  );
}
