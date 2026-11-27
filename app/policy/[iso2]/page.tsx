import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FreshnessBadge } from "@/components/policy-review/Badges";
import { ChangeLog, QuestionGrid, RedFlagList, SourceList, VerdictCards, sourceNumbers } from "@/components/policy-review/Sections";
import { PolicyTimeline } from "@/components/policy-review/PolicyTimeline";
import { Pill } from "@/components/home/Landing";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import { PageHero } from "@/components/ui/PageHero";
import { DATA_AS_OF, getAllCountryCodes } from "@/lib/data";
import { countryName, formatDate } from "@/lib/format";
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

async function Content({ params }: { params: PageProps<"/policy/[iso2]">["params"] }) {
  const raw = (await params).iso2;
  const iso = raw.toUpperCase();
  if (!/^[A-Z]{2}$/.test(iso)) notFound();
  const name = countryName(iso);
  const c = getReview(iso);

  if (!c)
    return (
      <>
        <PageHero
          photo={photoFor(iso)}
          eyebrow={name}
          title="Not yet reviewed"
          lede={`${name} has not had a Policy Review yet. Its installed capacity and deals are on its country page. Reviews are added market by market, and each one lists its sources.`}
        >
          <div className="flex flex-wrap gap-3">
            <Pill href={`/countries/${iso}`}>Country statistics</Pill>
            <Pill href="/policy">All reviewed markets</Pill>
          </div>
        </PageHero>
      </>
    );

  const num = sourceNumbers(c);
  const fr = freshness(c.lastReviewed, DATA_AS_OF);
  return (
    <>
      <PageHero
        photo={photoFor(iso)}
        eyebrow={name}
        title={c.status === "draft" ? "Policy Review (draft)" : "Policy Review"}
        lede={c.summary}
      >
        <p className="flex flex-wrap items-center gap-3 text-sm text-soft">
          <span>Last reviewed {formatDate(c.lastReviewed ?? "")}</span>
          <FreshnessBadge value={fr} />
          {c.basis === "desk" && <span>Desk review of published legal guides and official documents</span>}
        </p>
      </PageHero>

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
