import Image from "next/image";
import type { ReactNode } from "react";
import type { HeroPhoto } from "@/lib/hero-photos";

/**
 * Page header: the page name set very large across the bottom, a photograph card overlapping it,
 * and the headline with a short lede at the top right. Stats or a link card sit underneath.
 */
export function PageHero({
  photo,
  eyebrow,
  title,
  lede,
  children,
  aside,
}: {
  photo: HeroPhoto;
  /** The page name, shown very large. */
  eyebrow: string;
  /** The headline, shown at the top right. */
  title: ReactNode;
  lede?: ReactNode;
  /** Shown under the lede (buttons, links). */
  children?: ReactNode;
  /** Shown in a row under the name (a stat strip, a link card). */
  aside?: ReactNode;
}) {
  // Size the name to the viewport so long and short names both fill the width without wrapping.
  const size = `min(12rem, ${Math.round(165 / Math.max(eyebrow.length, 6))}vw)`;
  return (
    <header className="relative overflow-hidden border-b border-line bg-[var(--home-paper)]">
      <div className="container-page relative pt-10 md:pt-14">
        {/* Copy on the left; on wide screens the photograph sits top right, behind the name's upper edge. */}
        <div className="pp-hero-copy max-w-[30rem] md:min-h-[17rem] lg:min-h-[19rem]">
          <p className="font-display text-[1.6rem] leading-[1.15] font-light tracking-[-0.025em] text-[#0b1f3a] md:text-[2rem]">{title}</p>
          {lede && <p className="mt-4 text-[15px] leading-relaxed text-soft">{lede}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>

        <div className="relative mt-8 md:mt-0">
          <figure className="pp-hero-photo relative z-0 md:absolute md:right-0 md:bottom-[46%] md:w-[46%] lg:w-[44%]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[12px]">
              <Image src={photo.src} alt="" fill priority unoptimized={photo.src.startsWith("http")} sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" style={{ objectPosition: photo.position ?? "center" }} />
            </div>
          </figure>
          <h1
            className="pp-hero-name relative z-10 -mt-[0.32em] text-right font-display leading-[0.8] font-light tracking-[-0.055em] text-[#0b1f3a] md:mt-0"
            style={{ fontSize: size }}
          >
            {eyebrow}
          </h1>
        </div>
        <p className="mt-5 pb-5 text-[11px] text-soft [&_a]:underline [&_a]:underline-offset-2">
          Photo by{" "}
          <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
            {photo.credit}
          </a>
          ,{" "}
          <a href={photo.licenseUrl} target="_blank" rel="noreferrer license">
            {photo.license}
          </a>
        </p>
      </div>
      {aside && (
        <div className="border-t border-line">
          <div className="container-page py-6">{aside}</div>
        </div>
      )}
    </header>
  );
}

/** Stat strip for under a PageHero: equal columns, one baseline, thin dividers. */
export function HeroStats({ stats }: { stats: { label: string; value: string; unit?: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:divide-x md:divide-line">
      {stats.map((s) => (
        <div key={s.label} className="md:px-6 md:first:pl-0">
          <dt className="text-[13px] text-soft">{s.label}</dt>
          <dd className="tabular mt-1.5 font-display text-[2rem] leading-none font-light tracking-[-0.03em] text-[#0b1f3a]">
            {s.value}
            {s.unit && <span className="ml-1.5 text-base text-soft">{s.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
