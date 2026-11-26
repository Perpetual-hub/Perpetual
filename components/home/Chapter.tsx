// Landing-page building blocks: chapter header, large display heading, pill link and photo band.
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/** "• RECENT TRANSACTIONS ……………… 02 / 06" with a rule underneath. */
export function ChapterHead({ label, n, of, tone = "paper" }: { label: string; n: number; of: number; tone?: "paper" | "forest" }) {
  const dark = tone === "forest";
  return (
    <div className={`flex items-center justify-between border-b pb-4 ${dark ? "border-white/15" : "border-[var(--home-rule)]"}`}>
      <p className={`flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase ${dark ? "text-[var(--home-forest-ink)]" : "text-ink"}`}>
        <span className={`size-1.5 rounded-full ${dark ? "bg-[var(--home-forest-ink)]" : "bg-ink"}`} aria-hidden />
        {label}
      </p>
      <span className={`tabular text-[11px] tracking-[0.08em] ${dark ? "text-[var(--home-forest-muted)]" : "text-soft"}`} aria-hidden>
        {String(n).padStart(2, "0")} / {String(of).padStart(2, "0")}
      </span>
    </div>
  );
}

/** Very large, light display heading, ending in a full stop. */
export function Display({
  id,
  children,
  tone = "paper",
  size = "lg",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tone?: "paper" | "forest" | "photo";
  size?: "lg" | "xl";
  className?: string;
}) {
  const color = tone === "paper" ? "text-[#1d2a22]" : "text-[var(--home-forest-ink)]";
  const scale =
    size === "xl"
      ? "text-[3.2rem] sm:text-[4.5rem] lg:text-[6.5rem]"
      : "text-[2.6rem] sm:text-[3.4rem] lg:text-[4.6rem]";
  return (
    <h2 id={id} className={`font-display leading-[0.98] font-light tracking-[-0.035em] ${scale} ${color} ${className}`}>
      {children}
    </h2>
  );
}

/** Rounded pill link with a round arrow badge. */
export function PillLink({ href, children, tone = "paper" }: { href: string; children: ReactNode; tone?: "paper" | "forest" }) {
  const dark = tone === "forest";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full border py-1.5 pr-1.5 pl-4 text-sm font-medium transition-colors ${
        dark
          ? "border-white/20 bg-white/10 text-[var(--home-forest-ink)] backdrop-blur hover:bg-white/15"
          : "border-[var(--home-rule)] bg-white/60 text-[#1d2a22] hover:bg-white"
      }`}
    >
      {children}
      <span
        className={`grid size-7 place-items-center rounded-full transition-transform duration-200 group-hover:rotate-45 ${
          dark ? "bg-[var(--home-forest-ink)] text-[#1d2a22]" : "bg-[#1d2a22] text-[var(--home-paper)]"
        }`}
        aria-hidden
      >
        <ArrowUpRight className="size-3.5" />
      </span>
    </Link>
  );
}

/** Full-bleed photograph under a dark forest wash, with content on top. */
export function PhotoBand({
  src,
  position = "center",
  credit,
  children,
  labelledBy,
}: {
  src: string;
  position?: string;
  credit: ReactNode;
  children: ReactNode;
  labelledBy: string;
}) {
  return (
    <section aria-labelledby={labelledBy} className="on-dark relative isolate overflow-hidden text-[var(--home-forest-ink)]">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative, self-hosted, sized by CSS */}
      <img src={src} alt="" className="absolute inset-0 -z-20 size-full object-cover" style={{ objectPosition: position }} loading="lazy" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,22,17,0.92)_0%,rgba(14,22,17,0.72)_45%,rgba(14,22,17,0.35)_100%)]"
      />
      {children}
      <p className="absolute right-4 bottom-3 text-[11px] text-white/55 md:right-8 [&_a]:underline [&_a]:underline-offset-2">{credit}</p>
    </section>
  );
}
