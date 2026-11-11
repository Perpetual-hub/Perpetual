import { ArrowRight, FileCheck2, History, Link2 } from "lucide-react";
import Link from "next/link";
import { InvestorsCard } from "@/components/area/InvestorsCard";
import { FeatureDealCard, SmallCard, dealValue } from "@/components/cards/Cards";
import { AreaTable } from "@/components/charts/AreaTable";
import { HomeHero } from "@/components/home/HomeHero";
import { LatestRail, type RailItem } from "@/components/home/LatestRail";
import { TechGrid } from "@/components/home/TechGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WEIGHT_PRESETS } from "@/data/policy";
import {
  DATA_AS_OF,
  getDeals,
  getFeaturedDeal,
  getRecentMilestonePoints,
  getRegions,
  getTechCounts,
  getTopInvestors,
} from "@/lib/data";
import { DEAL_TYPE_LABEL, countryName, daysBetween } from "@/lib/format";
import { getPolicyRows, rankPolicies } from "@/lib/policy";

export default function Home() {
  const deals = getDeals();
  const featured = getFeaturedDeal();
  const recent = deals.filter((d) => {
    const age = daysBetween(d.date, DATA_AS_OF);
    return age >= 0 && age <= 30;
  });
  const dealStats = {
    count: recent.length,
    usd: recent.reduce((s, d) => s + (d.value?.disclosed ? (d.value.usd ?? 0) : 0), 0),
  };
  const rail: RailItem[] = deals.slice(0, 7).map((d) => ({
    id: d.id,
    href: `/deals/${d.slug}`,
    date: d.date,
    kicker: DEAL_TYPE_LABEL[d.type],
    title: d.title,
    value: dealValue(d),
    tech: d.technologies[0],
    isNew: daysBetween(d.date, DATA_AS_OF) <= 3,
  }));
  const policyRows = getPolicyRows(countryName);
  const topCountries = rankPolicies(policyRows, WEIGHT_PRESETS[1].weights).slice(0, 5);
  const moreDeals = deals.filter((d) => d.id !== featured.id).slice(0, 4);

  return (
    <>
      <HomeHero points={getRecentMilestonePoints(30)} policyRows={policyRows} dealStats={dealStats} rail={<LatestRail items={rail} />} />

      {/* This week in deals */}
      <section className="container-page py-20 md:py-28" aria-labelledby="this-week">
        <Reveal>
          <SectionHeading id="this-week" eyebrow="This week" title="Where the money moved" href="/deals" linkLabel="Open the deal tracker" />
        </Reveal>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <Reveal>
            <FeatureDealCard deal={featured} />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {moreDeals.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.04}>
                <SmallCard
                  href={`/deals/${d.slug}`}
                  kicker={DEAL_TYPE_LABEL[d.type]}
                  date={d.date}
                  title={d.title}
                  techs={d.technologies}
                  isSample={d.isSample}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Investors and policy */}
      <section className="border-t border-line" aria-label="Investors and policy">
        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-12 py-20 md:py-24 lg:grid-cols-2">
          <Reveal>
            <InvestorsCard investors={getTopInvestors(deals, 6)} />
          </Reveal>
          <Reveal>
            <section>
              <div className="mb-4 flex items-baseline justify-between">
                <h2 className="text-xl font-bold tracking-tight">Most investable countries</h2>
                <Link href="/policy" className="text-sm font-medium text-brand-blue hover:underline">
                  Full ranking
                </Link>
              </div>
              <ol className="divide-y divide-line rounded-[var(--radius)] border border-line">
                {topCountries.map((c) => (
                  <li key={c.country}>
                    <Link href={`/countries/${c.country}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-2">
                      <span className="tabular w-5 text-sm text-muted">{c.rank}</span>
                      <span className="min-w-0 flex-1 truncate font-semibold text-ink">{c.name}</span>
                      <span className="h-1.5 w-28 rounded-full bg-surface-2" aria-hidden>
                        <span className="block h-full rounded-full bg-[#2f9264]" style={{ width: `${(c.score / 5) * 100}%` }} />
                      </span>
                      <span className="tabular w-10 text-right text-sm font-semibold">{c.score.toFixed(1)}</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-muted">
                PROFITS score, weighted for utility-scale IPPs. <strong className="font-semibold text-ink">Illustrative scores</strong> for
                the beta.
              </p>
            </section>
          </Reveal>
        </div>
      </section>

      {/* Where capacity is: region snapshot */}
      <section className="border-t border-line bg-surface-2" aria-labelledby="regions">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading id="regions" eyebrow="Statistics" title="Where the capacity is" href="/statistics" linkLabel="All statistics" />
          </Reveal>
          <Reveal>
            <AreaTable rows={getRegions()} hrefFor={(r) => `/regions/${r.key}`} nameHeader="Region" />
          </Reveal>
        </div>
      </section>

      {/* Technologies */}
      <section className="border-b border-line" aria-labelledby="techs">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading id="techs" eyebrow="Sectors" title="Eight sectors, one dataset" href="/projects" linkLabel="Explore all projects" />
          </Reveal>
          <Reveal>
            <TechGrid counts={getTechCounts()} />
          </Reveal>
        </div>
      </section>

      {/* Disclosure promise */}
      <section className="container-page py-20 md:py-24" aria-labelledby="sources-promise">
        <Reveal>
          <div className="grid gap-10 rounded-[calc(var(--radius)+4px)] bg-brand-navy px-7 py-12 text-white md:grid-cols-[1.1fr_1.5fr] md:px-12 md:py-14">
            <div>
              <h2 id="sources-promise" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Every number has a source.
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-[#c6d6e8]">
                Full information and full disclosure is the whole point. If a fact is on Perpetual, you can see where it came
                from and when we checked it.
              </p>
              <Link
                href="/methodology"
                className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-brand-navy transition-colors duration-150 hover:bg-[#e8f1fb]"
              >
                Read our methodology
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
            <ul className="grid gap-6 sm:grid-cols-3">
              {[
                { icon: Link2, title: "Sourced", body: "Every deal and project lists where it was disclosed and the date we checked it." },
                { icon: History, title: "Dated", body: "Estimated and confirmed dates are marked differently. Nothing is silently updated." },
                { icon: FileCheck2, title: "Correctable", body: "See something wrong? Every page has a way to report it, and we log the change." },
              ].map(({ icon: Icon, title, body }) => (
                <li key={title} className="border-t border-white/15 pt-5">
                  <Icon className="size-5 text-brand-sky" aria-hidden />
                  <h3 className="mt-4 font-sans text-base font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#c6d6e8]">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
