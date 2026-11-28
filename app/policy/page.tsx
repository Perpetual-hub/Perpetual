import type { Metadata } from "next";
import { Suspense } from "react";
import { Pill } from "@/components/home/Landing";
import { ReviewTable } from "@/components/policy-review/PolicyOverview";
import { HeroStats, PageHero } from "@/components/ui/PageHero";
import { DATA_AS_OF, countryStats } from "@/lib/data";
import { HERO_PHOTOS } from "@/lib/hero-photos";
import { getAllEvents, getReview, getReviewRows } from "@/lib/policy-review/data";
import { PolicyTimeline } from "@/components/policy-review/PolicyTimeline";

export const metadata: Metadata = {
  title: "Policy Review",
  description:
    "How ready each market is for renewable investment. Every reviewed country gets a verdict for utility-scale and C&I deals, built from six investor questions with reasons and sources.",
};

export default function PolicyPage() {
  const rows = getReviewRows();
  const ready = (s: "utility" | "ci") => rows.filter((r) => r.segments[s].verdict === "ready").length;
  const flagged = rows.filter((r) => r.activeFlags > 0).length;
  const total = countryStats.all().length;

  return (
    <>
      <PageHero
        photo={HERO_PHOTOS.policy}
        eyebrow="Policy"
        title="How Ready Each Market Is for Renewable Investment"
        lede="Country assessments of the policy and regulation behind renewable investment. Each reviewed market is rated Ready, Workable or Difficult for utility-scale and C&I deals, with the reasoning and sources behind every rating."
        aside={
          <HeroStats
            stats={[
              { label: "Markets Reviewed", value: String(rows.length) },
              { label: "Ready for Utility-Scale", value: String(ready("utility")) },
              { label: "Ready for C&I", value: String(ready("ci")) },
              { label: "With an Active Red Flag", value: String(flagged) },
            ]}
          />
        }
      >
        <Pill href="/#policy">See the Policy Map</Pill>
      </PageHero>


      <div className="container-page space-y-20 py-16 md:py-24">
        <section aria-labelledby="table-h">
          <h2 id="table-h" className="mb-8 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-light tracking-[-0.035em] text-[#0b1f3a]">
            Reviewed Markets
          </h2>
          <Suspense fallback={<div className="skeleton h-96 rounded-[14px]" />}>
            <ReviewTable
              rows={rows.map((r) => ({
                iso2: r.iso2,
                name: r.name,
                region: countryStats.regionOf(r.iso2),
                events: getReview(r.iso2)?.events.length ?? 0,
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
            {rows.length} of {total} countries and territories reviewed so far. The others show Not Yet Reviewed and keep their capacity and deal pages.
            Reviews are desk research from published legal guides and official documents, dated and listed with every source.
          </p>
        </section>

        <section aria-labelledby="changes-h">
          <h2 id="changes-h" className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-light tracking-[-0.035em] text-[#0b1f3a]">
            How Policy Has Moved
          </h2>
          <p className="mt-3 mb-10 max-w-2xl text-[15px] text-soft">
            Dated policy changes across every reviewed market, and whether each helped or hurt investors. Choose a year to see what changed.
          </p>
          <PolicyTimeline events={getAllEvents()} currentYear={+DATA_AS_OF.slice(0, 4)} />
        </section>

        <section aria-labelledby="method-h" className="grid gap-8 border-t border-line pt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <h2 id="method-h" className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-light tracking-[-0.035em] text-[#0b1f3a]">
            How a Verdict Is Reached
          </h2>
          <div>
            <div>
              <Pill href="/policy/method">Read the method</Pill>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
