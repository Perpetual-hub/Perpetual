import { ArrowRight, FileCheck2, History, Link2 } from "lucide-react";
import Link from "next/link";
import { InvestorsCard } from "@/components/area/InvestorsCard";
import { FeatureDealCard, dealValue } from "@/components/cards/Cards";
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
import { DEAL_TYPE_LABEL, countryName, daysBetween, formatDate } from "@/lib/format";
import { getPolicyRows, rankPolicies } from "@/lib/policy";
import { rampColor } from "@/lib/policy-colors";

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
  const rail: RailItem[] = deals.slice(0, 10).map((d) => ({
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
  const moreDeals = deals.filter((d) => d.id !== featured.id).slice(0, 5);

  return (
    <>
      <HomeHero points={getRecentMilestonePoints(30)} policyRows={policyRows} dealStats={dealStats} rail={<LatestRail items={rail} />} />

      {/* This week in deals */}
      <section className="container-page py-14 md:py-20" aria-labelledby="this-week">
        <Reveal>
          <SectionHeading id="this-week" title="Recent Transactions" description="The latest acquisitions, financings, power purchase agreements and fund closes." href="/deals" linkLabel="Deal tracker" />
        </Reveal>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <FeatureDealCard deal={featured} />
          </Reveal>
          <ul className="divide-y divide-line border-y border-line">
            {moreDeals.map((d) => (
              <li key={d.id}>
                <Link href={`/deals/${d.slug}`} className="group grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 py-5">
                  <span className="text-xs text-muted">
                    <span className="font-semibold text-brand-blue">{DEAL_TYPE_LABEL[d.type]}</span> · {formatDate(d.date)}
                  </span>
                  <span className="tabular row-span-2 self-center text-right text-sm font-semibold text-ink">{dealValue(d) ?? "Undisclosed"}</span>
                  <span className="font-display text-lg leading-snug font-semibold text-ink group-hover:text-brand-blue">{d.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Investors and policy */}
      <section className="border-t border-line" aria-labelledby="markets">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <SectionHeading
              id="markets"
              title="Investors and Markets"
              description="The most active capital providers in the deal record, and the highest-scoring countries under the PROFITS framework."
              href="/policy"
              linkLabel="Policy assessment"
            />
          </Reveal>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <InvestorsCard investors={getTopInvestors(deals, 6)} title="Most Active Investors" level={3} />
          </Reveal>
          <Reveal>
            <section>
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-sans text-lg font-semibold text-ink">Country Rankings</h3>
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
                        <span className="block h-full rounded-[2px]" style={{ width: `${(c.score / 5) * 100}%`, background: rampColor(c.score) }} />
                      </span>
                      <span className="tabular w-10 text-right text-sm font-semibold">{c.score.toFixed(1)}</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-muted">
                PROFITS score, weighted for utility-scale IPPs. <strong className="font-semibold text-ink">Illustrative scores</strong> until
                researched scores are published.
              </p>
            </section>
          </Reveal>
          </div>
        </div>
      </section>

      {/* Where capacity is: region snapshot */}
      <section className="border-t border-line bg-surface-2" aria-labelledby="regions">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <SectionHeading id="regions" title="Capacity by Region" description="Operating and pipeline capacity across tracked projects, by sector." href="/statistics" linkLabel="Statistics" />
          </Reveal>
          <Reveal>
            <AreaTable rows={getRegions()} hrefFor={(r) => `/regions/${r.key}`} nameHeader="Region" />
          </Reveal>
        </div>
      </section>

      {/* Technologies */}
      <section className="border-b border-line" aria-labelledby="techs">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <SectionHeading id="techs" title="Sectors" description="Projects and capacity tracked in each sector." href="/projects" linkLabel="Project explorer" />
          </Reveal>
          <Reveal>
            <TechGrid counts={getTechCounts()} />
          </Reveal>
        </div>
      </section>

      {/* Disclosure promise */}
      <section className="container-page py-14 md:py-20" aria-labelledby="sources-promise">
        <Reveal>
          <div className="grid gap-10 rounded-[calc(var(--radius)+4px)] bg-brand-navy px-7 py-12 text-white md:grid-cols-[1.1fr_1.5fr] md:px-12 md:py-14">
            <div>
              <h2 id="sources-promise" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Data Integrity
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-[#c6d6e8]">
                Each deal, project and score lists its sources and the date they were checked, so every figure can be traced to
                where it was published.
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
