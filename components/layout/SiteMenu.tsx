"use client";

import { ArrowUpRight, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MarkOnDark } from "@/components/brand/Mark";
import { HERO_PHOTOS } from "@/lib/hero-photos";
import { TECHNOLOGIES } from "@/lib/tech";
import { TECH_PHOTOS } from "@/lib/tech-photos";

const ITEMS = [
  { href: "/deals", label: "Deal Tracker", note: "Every renewable deal of the last five years", photo: HERO_PHOTOS.deals.src },
  { href: "/policy", label: "Policy", note: "How investable each country is, scored with PROFITS", photo: HERO_PHOTOS.policy.src },
  { href: "/statistics", label: "Statistics", note: "Official capacity by region, country and sector", photo: HERO_PHOTOS.statistics.src },
  { href: "/disclosure", label: "Disclosure", note: "Where every figure comes from", photo: HERO_PHOTOS.disclosure.src },
  { href: "/about", label: "About", note: "Why Perpetual exists", photo: HERO_PHOTOS.about.src },
];

/** Full-screen menu: big numbered links on deep green, with a photo that follows the hovered link. */
export function SiteMenu({ open, onClose, onSearch }: { open: boolean; onClose: () => void; onSearch: () => void }) {
  const [active, setActive] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <div id="site-menu" role="dialog" aria-modal="true" aria-label="Menu" className="pp-menu on-dark fixed inset-0 z-[60] overflow-y-auto bg-[var(--home-forest)] text-[var(--home-forest-ink)]">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" onClick={onClose} className="flex items-center gap-3">
          <MarkOnDark size={36} bg="#16211b" />
          <span className="font-wordmark text-2xl font-extrabold tracking-[-0.03em]">perpetual</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSearch();
            }}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-sm hover:bg-white/10"
          >
            <Search className="size-4" aria-hidden />
            Search
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--home-forest-ink)] px-4 text-sm font-medium text-[#1d2a22]"
          >
            Close
            <X className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="container-page grid gap-10 pt-8 pb-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:pt-14">
        <nav aria-label="Main">
          <ol>
            {ITEMS.map((it, i) => (
              <li key={it.href} className="pp-menu-item border-b border-white/10" style={{ animationDelay: `${60 + i * 45}ms` }}>
                <Link
                  href={it.href}
                  onClick={onClose}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-x-4 py-4 md:py-5"
                >
                  <span className="tabular text-sm text-[var(--home-forest-muted)]">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-[2.4rem] leading-none font-light tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-2 sm:text-[3.4rem] lg:text-[4.2rem]">
                      {it.label}
                    </span>
                    <span className="mt-2 block text-sm text-[var(--home-forest-muted)]">{it.note}</span>
                  </span>
                  <ArrowUpRight className="size-7 opacity-40 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100" aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-white/5">
            {ITEMS.map((it, i) => (
              <Image
                key={it.href}
                src={it.photo}
                alt=""
                fill
                sizes="40vw"
                className={`object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--home-forest-muted)]">Sectors</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {TECHNOLOGIES.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/sectors/${t.id}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-sm hover:bg-white/10"
                >
                  <span className="size-2 rounded-full" style={{ background: t.hex }} aria-hidden />
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sectors on small screens, with their photos */}
        <ul className="grid grid-cols-2 gap-2 lg:hidden">
          {TECHNOLOGIES.map((t) => (
            <li key={t.id}>
              <Link href={`/sectors/${t.id}`} onClick={onClose} className="relative block h-20 overflow-hidden rounded-[10px]">
                {TECH_PHOTOS[t.id] && <Image src={TECH_PHOTOS[t.id]!.src} alt="" fill sizes="50vw" className="object-cover opacity-50" />}
                <span className="absolute inset-0 flex items-end p-3 text-sm font-medium">{t.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
