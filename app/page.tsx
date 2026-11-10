import { ArrowRight, FileCheck2, History, Link2 } from "lucide-react";
import Link from "next/link";
import { FeatureDealCard, FeatureStoryCard, SmallCard } from "@/components/cards/Cards";
import { AreaTable } from "@/components/charts/AreaTable";
import { HomeHero } from "@/components/home/HomeHero";
import { LatestRail, type RailItem } from "@/components/home/LatestRail";
import { TechGrid } from "@/components/home/TechGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  DATA_AS_OF,
  getDeals,
  getFeatured,
  getLatest,
  getMapPoints,
  getNews,
  getRegions,
  getTechCounts,
} from "@/lib/data";
import { NEWS_CATEGORY_LABEL, daysBetween, DEAL_TYPE_LABEL } from "@/lib/format";

export default function Home() {
  const latest = getLatest(6);
  const { deal: featuredDeal, story: featuredStory } = getFeatured();

  const railNews: RailItem[] = latest.news.map((n) => ({
    id: n.id,
    href: `/news/${n.slug}`,
    date: n.date,
    title: n.headline,
    summary: n.summary,
    tech: n.technologies[0],
    breaking: n.breaking,
  }));
  const railDeals: RailItem[] = latest.deals.map((d) => ({
    id: d.id,
    href: `/deals/${d.slug}`,
    date: d.date,
    title: d.title,
    summary: d.summary,
    tech: d.technologies[0],
  }));
  const recentDealTechs = getDeals()
    .filter((d) => {
      const age = daysBetween(d.date, DATA_AS_OF);
      return age >= 0 && age <= 30;
    })
    .map((d) => d.technologies);

  const moreNews = getNews().filter((n) => n.id !== featuredStory.id).slice(0, 2);
  const moreDeals = getDeals().filter((d) => d.id !== featuredDeal.id).slice(0, 2);

  return (
    <>
      <HomeHero
        points={getMapPoints()}
        recentDealTechs={recentDealTechs}
        rail={<LatestRail news={railNews} deals={railDeals} />}
      />

      {/* This week */}
      <section className="container-page py-20 md:py-28" aria-labelledby="this-week">
        <Reveal>
          <SectionHeading id="this-week" eyebrow="This week" title="What moved in renewables" href="/news" linkLabel="All news & policy" />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <FeatureStoryCard item={featuredStory} />
          </Reveal>
          <Reveal delay={0.05}>
            <FeatureDealCard deal={featuredDeal} />
          </Reveal>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {moreNews.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.04}>
              <SmallCard
                href={`/news/${n.slug}`}
                kicker={NEWS_CATEGORY_LABEL[n.category]}
                date={n.date}
                title={n.headline}
                techs={n.technologies}
                isSample={n.isSample}
              />
            </Reveal>
          ))}
          {moreDeals.map((d, i) => (
            <Reveal key={d.id} delay={0.08 + i * 0.04}>
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
                { icon: Link2, title: "Sourced", body: "Every record lists its publisher, title, link and the date we retrieved it." },
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
