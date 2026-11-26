import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Pill } from "@/components/home/Landing";
import { PolicyGlobe, ReviewTable } from "@/components/policy-review/PolicyOverview";
import { HeroStats, PageHero } from "@/components/ui/PageHero";
import { countryStats } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { HERO_PHOTOS } from "@/lib/hero-photos";
import { getLatestEvents, getReviewRows, getVerdictCells } from "@/lib/policy-review/data";

export const metadata: Metadata = {
  title: "Policy Review",
  description:
    "How ready each market is for renewable investment. Every reviewed country gets a verdict for utility-scale and C&I deals, built from six investor questions with reasons and sources.",
};

export default function PolicyPage() {
  const rows = getReviewRows();
  const cells = getVerdictCells();
  const events = getLatestEvents(10);
  const ready = (s: "utility" | "ci") => rows.filter((r) => r.segments[s].verdict === "ready").length;
  const flagged = rows.filter((r) => r.activeFlags > 0).length;
  const total = countryStats.all().length;

  return (
    <>
      <PageHero
        photo={HERO_PHOTOS.policy}
        eyebrow="Policy"
        title="How ready each market is for renewable investment"
        lede="Each reviewed country gets a verdict for utility-scale and C&I deals. Ready, Workable or Difficult, built from six questions an investment committee asks, each with a reason and a source."
        aside={
          <HeroStats
            stats={[
              { label: "Markets reviewed", value: String(rows.length) },
              { label: "Ready for utility-scale", value: String(ready("utility")) },
              { label: "Ready for C&I", value: String(ready("ci")) },
              { label: "With an active red flag", value: String(flagged) },
            ]}
          />
        }
      />

      <section aria-labelledby="map-h" className="on-dark bg-hero text-hero-ink">
        <div className="container-page py-16 md:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <h2 id="map-h" className="max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1] font-light tracking-[-0.04em] text-hero-ink">
              The verdict map.
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-hero-ink/75">
              Choose a deal type. Grey countries have not been reviewed yet, and faded ones are out of date. Click a country for its full review.
            </p>
          </div>
          <Suspense fallback={<div className="h-[62vh] min-h-[420px] rounded-[16px] bg-white/5" />}>
            <PolicyGlobe cells={cells} />
          </Suspense>
        </div>
      </section>

      <div className="container-page space-y-20 py-16 md:py-24">
        <section aria-labelledby="table-h">
          <h2 id="table-h" className="mb-8 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-light tracking-[-0.035em] text-[#0b1f3a]">
            Reviewed markets.
          </h2>
          <Suspense fallback={<div className="skeleton h-96 rounded-[14px]" />}>
            <ReviewTable
              rows={rows.map((r) => ({
                iso2: r.iso2,
                name: r.name,
                lastReviewed: r.lastReviewed,
                freshness: r.freshness,
                activeFlags: r.activeFlags,
                segments: {
                  utility: { verdict: r.segments.utility.verdict, direction: r.segments.utility.direction },
                  ci: { verdict: r.segments.ci.verdict, direction: r.segments.ci.direction },
                },
              }))}
            />
          </Suspense>
          <p className="mt-4 max-w-3xl text-sm text-soft">
            {rows.length} of {total} countries and territories reviewed so far. The others show Not yet reviewed and keep their capacity and deal pages.
            Reviews are desk research from published legal guides and official documents, dated and listed with every source.
          </p>
        </section>

        {events.length > 0 && (
          <section aria-labelledby="changes-h">
            <h2 id="changes-h" className="mb-8 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-light tracking-[-0.035em] text-[#0b1f3a]">
              Latest policy changes.
            </h2>
            <ul className="divide-y divide-line border-y border-line">
              {events.map((e, i) => (
                <li key={i} className="grid gap-1 py-4 md:grid-cols-[9rem_12rem_minmax(0,1fr)_6rem] md:items-baseline md:gap-6">
                  <span className="text-sm text-muted">{formatDate(e.date)}</span>
                  <Link href={`/policy/${e.iso2.toLowerCase()}`} className="font-medium text-ink hover:text-brand-blue">
                    {e.name}
                  </Link>
                  <span className="text-[15px] text-ink/85">
                    {e.url ? (
                      <a href={e.url} target="_blank" rel="noopener" className="hover:underline">
                        {e.title}
                      </a>
                    ) : (
                      e.title
                    )}
                  </span>
                  <span className={`text-sm font-medium ${e.effect === "positive" ? "text-[#1f6b37]" : e.effect === "negative" ? "text-[#9c2a20]" : "text-[#7a4d00]"}`}>
                    {e.effect === "positive" ? "Positive" : e.effect === "negative" ? "Negative" : "Mixed"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="method-h" className="grid gap-8 border-t border-line pt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <h2 id="method-h" className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-light tracking-[-0.035em] text-[#0b1f3a]">
            How a verdict is reached.
          </h2>
          <div>
            <p className="max-w-md text-[15px] leading-relaxed text-soft">
              Six questions, three ratings, a fixed rule and three red flags that override everything else. No weights and no single score.
            </p>
            <div className="mt-6">
              <Pill href="/policy/method">Read the method</Pill>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
