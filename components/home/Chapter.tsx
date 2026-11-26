// Landing-page building blocks: chapter header, large display heading, pill link and photo band.
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

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
