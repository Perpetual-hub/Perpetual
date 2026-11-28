// Landing page sections. Server components: motion is pure CSS (scroll timelines where the browser
// supports them, static otherwise), so the page stays fast and readable without JavaScript.
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Mark } from "@/components/brand/Mark";
import type { HeroPhoto } from "@/lib/hero-photos";
import { HERO_PHOTOS } from "@/lib/hero-photos";
import { TECHNOLOGIES } from "@/lib/tech";
import { TECH_PHOTOS } from "@/lib/tech-photos";
import type { Technology } from "@/lib/types";

const INK = "#0b1f3a";

/** Rounded pill link with a round arrow badge. */
export function Pill({ href, children, tone = "light" }: { href: string; children: ReactNode; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full border py-1.5 pr-1.5 pl-4 text-sm font-medium transition-colors ${
        dark ? "border-white/25 bg-white/10 text-[var(--home-forest-ink)] hover:bg-white/20" : "border-line bg-white/60 text-[#0b1f3a] hover:bg-white"
      }`}
    >
      {children}
      <span
        className={`grid size-7 place-items-center rounded-full transition-transform duration-200 group-hover:rotate-45 ${
          dark ? "bg-[var(--home-forest-ink)] text-[#0b1f3a]" : "bg-[#0b1f3a] text-[var(--home-paper)]"
        }`}
        aria-hidden
      >
        <ArrowUpRight className="size-3.5" />
      </span>
    </Link>
  );
}

function Credit({ photo, className = "" }: { photo: HeroPhoto | { credit?: string; license?: string; sourceUrl?: string }; className?: string }) {
  if (!photo.credit) return null;
  return (
    <p className={`text-[11px] [&_a]:underline [&_a]:underline-offset-2 ${className}`}>
      Photo by{" "}
      <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
        {photo.credit}
      </a>
      {photo.license && <>, {photo.license}</>}
    </p>
  );
}

/* 1. Full-bleed opening: one photograph, one staggered headline. */
export function OpeningHero() {
  const photo = HERO_PHOTOS.deals;
  return (
    <section aria-labelledby="home-h" className="on-dark relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-hero text-hero-ink">
      <Image src={photo.src} alt="" fill priority sizes="100vw" quality={80} className="pp-kenburns -z-20 object-cover" style={{ objectPosition: photo.position }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,26,51,0.15)_0%,rgba(6,26,51,0.35)_55%,rgba(6,26,51,0.8)_100%)]" />
      <div className="container-page flex flex-1 flex-col justify-end pb-10 md:pb-14">
        <h1 id="home-h" className="text-hero-ink font-display text-[clamp(2.8rem,8.6vw,8.6rem)] leading-[0.92] font-light tracking-[-0.05em]">
          <span className="pp-line block" style={{ animationDelay: "0.15s" }}>
            All things
          </span>
          <span className="pp-line block pl-[12vw]" style={{ animationDelay: "0.3s" }}>
            renewable energy,
          </span>
          <span className="pp-line block text-right" style={{ animationDelay: "0.45s" }}>
            in one place
          </span>
        </h1>
        <div className="mt-10 flex items-end justify-between gap-6 border-t border-white/20 pt-5 text-sm">
          <a href="#mission" className="inline-flex items-center gap-2 text-hero-ink/85 hover:text-hero-ink">
            <ArrowDown className="size-4 animate-bounce motion-reduce:animate-none" aria-hidden />
            Scroll to explore
          </a>
          <Credit photo={photo} className="text-white/60" />
        </div>
      </div>
    </section>
  );
}

/* 2. Mission: the mark turns slowly above one sentence, with two rows of photographs drifting in
   opposite directions underneath. The rows pause on hover and stand still for reduced motion. */
const ROW_A = [TECH_PHOTOS.solar!, HERO_PHOTOS.deals, TECH_PHOTOS.hydro!, HERO_PHOTOS.method, TECH_PHOTOS.storage!, HERO_PHOTOS.statistics];
const ROW_B = [TECH_PHOTOS.wind!, HERO_PHOTOS.policy, TECH_PHOTOS.geothermal!, HERO_PHOTOS.about, TECH_PHOTOS.marine!, HERO_PHOTOS.disclosure, TECH_PHOTOS.bioenergy!];

function PhotoRow({ photos, reverse = false }: { photos: { src: string; position?: string }[]; reverse?: boolean }) {
  const all = [...photos, ...photos];
  return (
    <div className="pp-marquee overflow-hidden">
      <ul className={`pp-marquee-track flex w-max gap-4 pr-4 ${reverse ? "pp-marquee-reverse" : ""}`}>
        {all.map((p, i) => (
          <li key={i} className="relative h-40 w-60 shrink-0 overflow-hidden rounded-[12px] md:h-52 md:w-80">
            <Image src={p.src} alt="" fill sizes="320px" className="object-cover" style={{ objectPosition: p.position ?? "center" }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Mission() {
  return (
    <section id="mission" aria-labelledby="mission-h" className="overflow-hidden bg-[var(--home-paper)] pb-24 md:pb-32">
      <div className="container-page flex flex-col items-center pt-24 pb-16 text-center md:pt-32 md:pb-20">
        <span className="pp-slow-spin mb-10 block">
          <Mark size={104} />
        </span>
        <h2 id="mission-h" className="pp-reveal max-w-[22ch] font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.12] font-light tracking-[-0.03em] text-[#0b1f3a]">
          Perpetual is an open guide to the world of renewable energy.
        </h2>
        <p className="pp-reveal mt-6 max-w-xl text-lg leading-relaxed text-soft">
          From the technologies that generate clean power to the markets, policies and investments that shape it.
        </p>
      </div>
      <div aria-hidden className="space-y-4">
        <PhotoRow photos={ROW_A} />
        <PhotoRow photos={ROW_B} reverse />
      </div>
    </section>
  );
}

/* 3. Key figures: four numbers on one baseline, then what last year's additions were made of. */
export function KeyFigures({
  year,
  added,
  installed,
  deals,
  countries,
  mix,
  citation,
  citationUrl,
  record,
}: {
  record: boolean;
  year: number;
  added: number;
  installed: number;
  deals: number;
  countries: number;
  mix: { key: Technology; gw: number }[];
  citation: string;
  citationUrl: string;
}) {
  const gw = (v: number) => Math.round(v).toLocaleString("en-GB");
  const total = mix.reduce((a, b) => a + b.gw, 0);
  const figures = [
    { value: gw(added), unit: "GW", label: `Renewable capacity added worldwide in ${year}` },
    { value: gw(installed), unit: "GW", label: `Renewable capacity installed worldwide at the end of ${year}` },
    { value: deals.toLocaleString("en-GB"), unit: "", label: "Renewable energy deals on record from the last five years" },
    { value: String(countries), unit: "", label: "Countries Where Those Deals Took Place" },
  ];
  return (
    <section aria-labelledby="figures-h" className="border-t border-line bg-[var(--home-paper)]">
      <div className="container-page py-20 md:py-28">
        <h2 id="figures-h" className="max-w-3xl font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] font-light tracking-[-0.035em] text-[#0b1f3a]">
          {record ? `The world added more renewable power in ${year} than in any year before.` : `How much renewable power the world added in ${year}.`}
        </h2>
        <dl className="mt-14 grid grid-cols-1 border-t border-[#0b1f3a] sm:grid-cols-2 lg:grid-cols-4">
          {figures.map((f, i) => (
            <div key={f.label} className={`border-b border-line py-8 sm:pr-8 lg:border-b-0 ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i % 2 === 1 ? "sm:border-l sm:pl-8 lg:pl-8" : ""}`}>
              <dd className="tabular font-display text-[clamp(3rem,5vw,4.6rem)] leading-none font-light tracking-[-0.045em] text-[#0b1f3a]">
                {f.value}
                {f.unit && <span className="ml-2 text-[0.4em] tracking-normal text-soft">{f.unit}</span>}
              </dd>
              <dt className="mt-4 max-w-[16rem] text-[15px] leading-snug text-soft">{f.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-14">
          <p className="text-[15px] text-ink">What the {gw(total)} GW added in {year} was made of</p>
          <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-white" role="img" aria-label={mix.map((m) => `${m.key} ${gw(m.gw)} GW`).join(", ")}>
            {mix.map((m) => (
              <span key={m.key} style={{ width: `${(m.gw / total) * 100}%`, background: TECHNOLOGIES.find((t) => t.id === m.key)!.hex }} />
            ))}
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-soft">
            {mix.map((m) => (
              <li key={m.key} className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ background: TECHNOLOGIES.find((t) => t.id === m.key)!.hex }} aria-hidden />
                {TECHNOLOGIES.find((t) => t.id === m.key)!.label}
                <span className="tabular text-ink">{Math.round((m.gw / total) * 100)}%</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-soft">
            Data from{" "}
            <a href={citationUrl} className="underline underline-offset-2 hover:text-ink">
              {citation}
            </a>{" "}
            and the Perpetual deal record.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 5. What Perpetual does: three cards that stack as the reader scrolls. */
export function StackedCards({ cards }: { cards: { n: string; title: string; body: string; href: string; cta: string; photo: string; tone: "paper" | "green" | "forest"; extra: ReactNode }[] }) {
  const tones = {
    paper: { bg: "bg-[#fbfcfe]", ink: "text-[#0b1f3a]", soft: "text-soft", pill: "light" as const },
    green: { bg: "bg-[#0b5cad]", ink: "text-white", soft: "text-white/80", pill: "dark" as const },
    forest: { bg: "bg-[var(--home-forest)]", ink: "text-[var(--home-forest-ink)]", soft: "text-[var(--home-forest-muted)]", pill: "dark" as const },
  };
  return (
    <section aria-labelledby="what-h" className="bg-[var(--home-paper)] pt-20 md:pt-28">
      <div className="container-page">
        <h2 id="what-h" className="max-w-[20ch] font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1] font-light tracking-[-0.04em] text-[#0b1f3a]">
          Four Ways to Explore Renewable Energy
        </h2>
      </div>
      <ol className="mt-14">
        {cards.map((c, i) => {
          const t = tones[c.tone];
          return (
            <li
              key={c.title}
              className={`sticky ${t.bg} ${c.tone !== "paper" ? "on-dark" : ""} rounded-t-[28px] border-t border-black/5`}
              style={{ top: `${4 + i * 0.75}rem` }}
            >
              <div className="container-page grid min-h-[86svh] gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                <div className="flex flex-col">
                  <span className={`tabular text-sm ${t.soft}`}>{c.n}</span>
                  <h3 className={`mt-4 font-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.9] font-light tracking-[-0.05em] ${t.ink}`}>{c.title}</h3>
                  <p className={`mt-8 max-w-lg text-lg leading-relaxed ${t.soft}`}>{c.body}</p>
                  <div className="mt-8">
                    <Pill href={c.href} tone={t.pill}>
                      {c.cta}
                    </Pill>
                  </div>
                  <div className={`mt-auto pt-10 ${t.ink}`}>{c.extra}</div>
                </div>
                <div className="relative hidden overflow-hidden rounded-[14px] lg:block">
                  <Image src={c.photo} alt="" fill sizes="45vw" className="object-cover" />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* 7. Sectors: full-width photo panels that stack, one per sector. */
export function SectorPanels({ counts }: { counts: Record<Technology, { deals: number; worldMW?: number }> }) {
  const gw = (mw: number) => `${(mw / 1000).toLocaleString("en-GB", { maximumFractionDigits: mw < 10_000 ? 1 : 0 })} GW`;
  return (
    <section aria-labelledby="sectors-h" className="on-dark bg-hero text-hero-ink">
      <div className="container-page flex flex-wrap items-end justify-between gap-6 pt-20 pb-12 md:pt-28">
        <h2 id="sectors-h" className="max-w-[16ch] text-hero-ink font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1] font-light tracking-[-0.04em]">
          Eight Renewable Sectors
        </h2>
      </div>
      <ol>
        {TECHNOLOGIES.map((t, i) => {
          const photo = TECH_PHOTOS[t.id];
          const c = counts[t.id];
          return (
            <li key={t.id} className="sticky top-16 h-[72svh] min-h-[440px] overflow-hidden border-t border-black/30" style={{ zIndex: i + 1 }}>
              <Link href={`/sectors/${t.id}`} className="group relative isolate flex h-full flex-col justify-start">
                {photo && (
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="100vw"
                    className="-z-20 object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                    style={{ objectPosition: photo.position }}
                  />
                )}
                <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,26,51,0.78)_0%,rgba(6,26,51,0.15)_45%,rgba(6,26,51,0.1)_100%)]" />
                <div className="container-page flex flex-wrap items-start justify-between gap-6 pt-8">
                  <div>
                    <span className="tabular text-sm text-hero-ink/70">{String(i + 1).padStart(2, "0")} / 08</span>
                    <p className="mt-2 font-display text-[clamp(3.4rem,10vw,9rem)] leading-[0.85] font-light tracking-[-0.05em] text-hero-ink">{t.label}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
                      {c.worldMW != null && <>{gw(c.worldMW)} installed · </>}
                      {c.deals.toLocaleString("en-GB")} {c.deals === 1 ? "deal" : "deals"}
                    </span>
                    <span className="grid size-11 place-items-center rounded-full bg-hero-ink text-[#0b1f3a] transition-transform duration-300 group-hover:rotate-45" aria-hidden>
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </div>
                {photo?.credit && (
                  <span className="absolute right-4 bottom-3 text-[11px] text-white/60 md:right-8">
                    Photo by {photo.credit}
                    {photo.license && <>, {photo.license}</>}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* 8. Closing statement. */
export function Closing() {
  return (
    <section aria-labelledby="close-h" className="bg-[var(--home-paper)]">
      <div className="container-page grid gap-10 py-24 md:py-32 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
        <h2 id="close-h" className="font-display text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.95] font-light tracking-[-0.045em] text-[#0b1f3a]">
          Every Number Has a Source
        </h2>
        <div>
          <p className="max-w-md text-lg leading-relaxed text-soft">
            Each deal and score lists where it was published and when we checked it. See something wrong? Every page has a way to report
            it, and we log the change.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Pill href="/disclosure">How our data works</Pill>
            <Pill href="/corrections">Report a correction</Pill>
          </div>
        </div>
      </div>
    </section>
  );
}

export { INK };
