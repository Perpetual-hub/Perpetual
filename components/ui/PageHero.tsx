import Image from "next/image";
import type { ReactNode } from "react";
import type { HeroPhoto } from "@/lib/hero-photos";

/**
 * Page header in the landing-page style: a full-bleed licensed photograph under a deep forest
 * wash, a small dotted label, a large light headline and a short lede. The photo credit sits in
 * the corner, as the licence requires.
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
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Shown under the lede (buttons, stats). */
  children?: ReactNode;
  /** Shown on the right on wide screens (a glass card, a stat grid). */
  aside?: ReactNode;
}) {
  return (
    <header className="on-dark relative isolate overflow-hidden bg-hero text-hero-ink">
      <Image
        src={photo.src}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={80}
        className="-z-20 object-cover"
        style={{ objectPosition: photo.position ?? "center" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(14,22,17,0.92) 0%, rgba(14,22,17,0.74) 45%, rgba(14,22,17,0.3) 100%), linear-gradient(0deg, rgba(14,22,17,0.55) 0%, rgba(14,22,17,0) 45%)",
        }}
      />
      <div
        className={`container-page grid grid-cols-[minmax(0,1fr)] gap-10 pt-20 pb-20 md:pt-28 md:pb-24 ${
          aside ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end" : ""
        }`}
      >
        <div>
          <p className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.16em] text-hero-ink uppercase">
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-[16ch] font-display text-[2.9rem] leading-[0.98] font-light tracking-[-0.04em] text-hero-ink sm:text-[4rem] lg:text-[5.4rem]">
            {title}
          </h1>
          {lede && <p className="mt-6 max-w-xl text-lg leading-relaxed text-hero-ink/85">{lede}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {aside}
      </div>
      <p className="absolute right-4 bottom-3 text-[11px] text-white/55 md:right-8 [&_a]:underline [&_a]:underline-offset-2">
        Photo by{" "}
        <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
          {photo.credit}
        </a>
        ,{" "}
        <a href={photo.licenseUrl} target="_blank" rel="noreferrer license">
          {photo.license}
        </a>
      </p>
    </header>
  );
}

/** Frosted stat grid for the right side of a PageHero. */
export function HeroStats({ stats }: { stats: { label: string; value: string; unit?: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-white/15 bg-white/10 backdrop-blur-md">
      {stats.map((s) => (
        <div key={s.label} className="bg-[#16211b]/60 px-5 py-4">
          <dt className="text-xs text-hero-muted">{s.label}</dt>
          <dd className="tabular mt-1 font-display text-3xl font-light tracking-[-0.02em] text-hero-ink">
            {s.value}
            {s.unit && <span className="ml-1 text-base text-hero-muted">{s.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
