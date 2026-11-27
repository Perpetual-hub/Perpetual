import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FreshnessBadge } from "@/components/policy-review/Badges";
import { ChangeLog, QuestionGrid, RedFlagList, SourceList, VerdictCards, sourceNumbers } from "@/components/policy-review/Sections";
import { PolicyTimeline } from "@/components/policy-review/PolicyTimeline";
import { Pill } from "@/components/home/Landing";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import { DATA_AS_OF, getAllCountryCodes } from "@/lib/data";
import { countryName, formatDate } from "@/lib/format";
import { countryPhotos } from "@/data/geo/country-photos";
import { VERDICT_STYLE } from "@/lib/policy-review/cells";
import type { ReactNode } from "react";
import { HERO_PHOTOS, type HeroPhoto } from "@/lib/hero-photos";
import { TECH_PHOTOS } from "@/lib/tech-photos";
import { getReview } from "@/lib/policy-review/data";
import { freshness, segmentVerdict } from "@/lib/policy-review/verdict";
import { VERDICT_LABEL } from "@/lib/policy-review/cells";

export function generateStaticParams() {
  return getAllCountryCodes().map((code) => ({ iso2: code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps<"/policy/[iso2]">): Promise<Metadata> {
  const iso = (await params).iso2.toUpperCase();
  const c = getReview(iso);
  const name = countryName(iso);
  if (!c) return { title: `${name} Policy Review`, description: `${name} has not been reviewed yet.` };
  return {
    title: `${name} Policy Review`,
    description: `Utility-scale ${VERDICT_LABEL[segmentVerdict(c, "utility").verdict]}, C&I ${VERDICT_LABEL[segmentVerdict(c, "ci").verdict]}. ${c.summary ?? ""}`,
  };
}

export default function PolicyCountryPage({ params }: PageProps<"/policy/[iso2]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <Content params={params} />
    </Suspense>
  );
}

/** A self-hosted photograph for the header, picked by country so it stays the same between visits. */
const PHOTO_POOL: HeroPhoto[] = [
  ...Object.values(HERO_PHOTOS),
  ...Object.values(TECH_PHOTOS)
    .filter((p) => p?.credit && p.license && p.sourceUrl)
    .map((p) => ({ src: p!.src, credit: p!.credit!, license: p!.license!, licenseUrl: p!.licenseUrl ?? p!.sourceUrl!, sourceUrl: p!.sourceUrl!, position: p!.position })),
];
function photoFor(iso: string): HeroPhoto {
  return PHOTO_POOL[(iso.charCodeAt(0) * 31 + iso.charCodeAt(1)) % PHOTO_POOL.length];
}

/**
 * Full-bleed header with a photograph of the country itself, like the sector pages. The country photo
 * is layered over a self-hosted one, so if the remote image fails the header still has a picture.
 */
function CountryHero({ iso, name, kicker, lede, stats, children }: { iso: string; name: string; kicker: string; lede?: string; stats?: { label: string; value: ReactNode }[]; children?: ReactNode }) {
  const cp = countryPhotos[iso];
  const local = photoFor(iso);
  const layers = [cp && `url("${cp.url.replace(/\/3840px-/, "/1920px-")}")`, `url("${local.src}")`].filter(Boolean).join(", ");
  const credit = cp ? { by: cp.artist, url: cp.page, license: cp.license } : { by: local.credit, url: local.sourceUrl, license: local.license };
  return (
    <header className="on-dark relative isolate overflow-hidden border-b border-line bg-hero">
      <div aria-hidden className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: layers }} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,26,51,0.9) 0%, rgba(6,26,51,0.66) 45%, rgba(6,26,51,0.2) 100%), linear-gradient(0deg, rgba(6,26,51,0.75) 0%, rgba(6,26,51,0) 55%)",
        }}
      />
      <div className="container-page grid min-h-[34rem] grid-cols-[minmax(0,1fr)] content-end gap-10 pt-28 pb-16 md:min-h-[40rem] md:pb-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <p className="text-sm text-hero-ink/75">{kicker}</p>
          <h1 className="mt-4 font-display text-[3.2rem] leading-[0.92] font-light tracking-[-0.045em] text-hero-ink sm:text-[4.5rem] lg:text-[6.5rem]">{name}</h1>
          {lede && <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-hero-ink/85">{lede}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
        {stats && (
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-white/15 bg-white/10 backdrop-blur-md">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#083b6e]/60 px-5 py-4">
                <dt className="text-xs text-hero-muted">{s.label}</dt>
                <dd className="mt-1.5 font-display text-2xl font-light tracking-[-0.02em] text-hero-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <p className="absolute right-4 bottom-2 max-w-[70%] truncate text-right text-[10px] text-white/70 md:right-8">
        Photo by{" "}
        <a href={credit.url} target="_blank" rel="noopener" className="underline-offset-2 hover:text-white hover:underline">
          {credit.by}
        </a>
        , {credit.license}
      </p>
    </header>
  );
}

function VerdictValue({ v }: { v: keyof typeof VERDICT_LABEL }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="h-6 w-1.5 rounded-full" style={{ background: VERDICT_STYLE[v].fill }} aria-hidden />
      {VERDICT_LABEL[v]}
    </span>
  );
}

async function Content({ params }: { params: PageProps<"/policy/[iso2]">["params"] }) {
  const raw = (await params).iso2;
  const iso = raw.toUpperCase();
  if (!/^[A-Z]{2}$/.test(iso)) notFound();
  const name = countryName(iso);
  const c = getReview(iso);

  if (!c)
    return (
      <>
        <CountryHero
          iso={iso}
          name={name}
          kicker="Policy Review"
          lede={`${name} has not had a Policy Review yet. Its installed capacity and deals are on its country page. Reviews are added market by market, and each one lists its sources.`}
        >
          <div className="flex flex-wrap gap-3">
            <Pill href={`/countries/${iso}`} tone="dark">Country statistics</Pill>
            <Pill href="/policy" tone="dark">All reviewed markets</Pill>
          </div>
        </CountryHero>
      </>
    );

  const num = sourceNumbers(c);
  const fr = freshness(c.lastReviewed, DATA_AS_OF);
  return (
    <>
      <CountryHero
        iso={iso}
        name={name}
        kicker={c.status === "draft" ? "Policy Review (draft)" : "Policy Review"}
        lede={c.summary}
        stats={[
          { label: "Utility-scale", value: <VerdictValue v={segmentVerdict(c, "utility").verdict} /> },
          { label: "C&I", value: <VerdictValue v={segmentVerdict(c, "ci").verdict} /> },
          { label: "Policy changes recorded", value: <span className="tabular">{c.events.length}</span> },
          { label: "Last reviewed", value: formatDate(c.lastReviewed ?? "") },
        ]}
      >
        <p className="flex flex-wrap items-center gap-3 text-sm text-hero-ink/75">
          <FreshnessBadge value={fr} />
          {c.basis === "desk" && <span>Desk review of published legal guides and official documents</span>}
        </p>
      </CountryHero>

      <div className="container-page space-y-16 py-14 md:py-20">
        <section aria-labelledby="verdict-h">
          <h2 id="verdict-h" className="mb-6 font-display text-[2rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a]">
            Verdicts
          </h2>
          <VerdictCards c={c} num={num} />
        </section>

        <section aria-labelledby="questions-h">
          <h2 id="questions-h" className="font-display text-[2rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a]">
            Six investor questions
          </h2>
          <p className="mt-2 mb-6 max-w-2xl text-[15px] text-soft">
            Each answer is rated for both deal types, with a reason, a confidence level and its sources.{" "}
            <Link href="/policy/method" className="text-brand-blue underline underline-offset-2">
              How verdicts are worked out
            </Link>
          </p>
          <QuestionGrid c={c} num={num} />

        </section>

        {c.gaps && (
          <section aria-labelledby="gaps-h" className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
            <div>
              <h2 id="gaps-h" className="font-display text-[1.75rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a]">
                Still to be established
              </h2>
              <p className="mt-2 max-w-sm text-[15px] text-soft">What public sources did not settle. These questions stay Not rated until they do.</p>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {c.gaps
                .split(/(?<=\.)\s+/)
                .filter(Boolean)
                .map((g) => (
                  <li key={g} className="py-4 text-[15px] leading-relaxed text-ink/85">
                    {g}
                  </li>
                ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="timeline-h">
          <h2 id="timeline-h" className="font-display text-[2rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a]">
            How policy has moved
          </h2>
          <p className="mt-2 mb-8 max-w-2xl text-[15px] text-soft">Dated laws, decrees, auctions and tariff decisions, and whether each helped or hurt investors.</p>
          <PolicyTimeline
            currentYear={+DATA_AS_OF.slice(0, 4)}
            events={c.events.map((e) => ({
              date: e.date,
              precision: e.precision,
              effect: e.effect,
              title: e.title,
              segments: e.segments,
              refs: e.sources.map((id) => ({ n: num.get(id) ?? 0, url: c.sources.find((x) => x.id === id)?.url ?? "" })),
            }))}
          />
        </section>

        <section aria-labelledby="flags-h">
          <h2 id="flags-h" className="mb-6 font-display text-[1.75rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a]">
            Red flags
          </h2>
          <RedFlagList c={c} num={num} />
        </section>

        <section aria-labelledby="log-h">
          <h2 id="log-h" className="mb-6 font-display text-[1.75rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a]">
            Rating changes
          </h2>
          <ChangeLog c={c} />
        </section>

        <section aria-labelledby="sources-h">
          <h2 id="sources-h" className="mb-6 font-display text-[1.75rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a]">
            Sources
          </h2>
          <SourceList c={c} num={num} />
          <div className="mt-10 flex flex-wrap gap-3">
            <Pill href={`/countries/${iso}`}>{name} statistics and deals</Pill>
            <Pill href={`/corrections?record=policy-${iso}`}>Report a correction</Pill>
          </div>
        </section>
      </div>
    </>
  );
}
