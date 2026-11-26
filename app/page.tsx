import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { InvestorsCard } from "@/components/area/InvestorsCard";
import { FeatureDealCard, dealValue } from "@/components/cards/Cards";
import { CountryStatsTable } from "@/components/charts/CountryStatsTable";
import { HomeHero } from "@/components/home/HomeHero";
import { LatestRail, type RailItem } from "@/components/home/LatestRail";
import { ChapterHead, Display, PhotoBand, PillLink } from "@/components/home/Chapter";
import { RenewablesGlance } from "@/components/home/RenewablesGlance";
import { SectorCards } from "@/components/home/SectorCards";
import { Reveal } from "@/components/ui/Reveal";
import {
  DATA_AS_OF,
  countryStats,
  getCountryStatsRows,
  getDeals,
  getFeaturedDeal,
  getGlobalCapacity,
  getDealPoints,
  getRegionStatsRows,
  getSectorSummary,
  getTopInvestors,
} from "@/lib/data";
import { DEAL_TYPE_LABEL, countryName, daysBetween, formatDate } from "@/lib/format";
import { getPolicyRows } from "@/lib/policy";
import { TECH_PHOTOS } from "@/lib/tech-photos";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

export default function Home() {
  const deals = getDeals();
  const featured = getFeaturedDeal();
  const dealPoints = getDealPoints(365);
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
  const moreDeals = deals.filter((d) => d.id !== featured?.id).slice(0, 5);
  const countryRows = getCountryStatsRows();
  const leaders = [...countryRows].sort((a, b) => b.renewableMW - a.renewableMW).slice(0, 6);
  const leaderMax = leaders[0]?.renewableMW ?? 1;
  const dealCountries = new Set(deals.flatMap((d) => d.countries)).size;
  const windPhoto = TECH_PHOTOS.wind!;
  // The photo band shows the largest disclosed USD deal of the last 30 days (the featured deal appears below).
  const biggest = deals
    .filter((d) => d.id !== featured?.id && daysBetween(d.date, DATA_AS_OF) <= 30 && d.value?.usd)
    .sort((a, b) => (b.value!.usd ?? 0) - (a.value!.usd ?? 0))[0];
  const biggestPhoto = biggest ? TECH_PHOTOS[biggest.technologies[0]] : undefined;

  return (
    <>
      <HomeHero
        points={dealPoints}
        ages={Object.fromEntries(dealPoints.map((p) => [p.id, daysBetween(p.deal!.date, DATA_AS_OF)]))}
        policyRows={policyRows}
        totalDeals={deals.length}
        rail={<LatestRail items={rail} />}
      />

      <RenewablesGlance series={getGlobalCapacity()} />

      {/* Interlude: the deal record over a wind farm */}
      <PhotoBand
        src={windPhoto.src}
        position={windPhoto.position}
        labelledBy="record-h"
        credit={
          <>
            Photo: {windPhoto.credit},{" "}
            <a href={windPhoto.sourceUrl} target="_blank" rel="noreferrer">
              {windPhoto.license}
            </a>
          </>
        }
      >
        <div className="container-page grid gap-10 py-24 md:py-32 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--home-forest-muted)] uppercase">The deal record</p>
            <Display id="record-h" tone="photo" size="xl" className="mt-5">
              Follow the money.
            </Display>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--home-forest-ink)]/85">
              {deals.length.toLocaleString("en-GB")} renewable energy deals from the last five years, across {dealCountries} countries. Each one
              links to the news or filing it came from.
            </p>
            <div className="mt-8">
              <PillLink href="/deals" tone="forest">
                Open the Deal Tracker
              </PillLink>
            </div>
          </div>
          {biggest && (
            <Link
              href={`/deals/${biggest.slug}`}
              className="group rounded-[18px] border border-white/15 bg-[#16211b]/70 p-2 backdrop-blur-md transition-colors hover:border-white/30 lg:justify-self-end"
            >
              {biggestPhoto && (
                // eslint-disable-next-line @next/next/no-img-element -- self-hosted sector photo
                <img src={biggestPhoto.src} alt="" className="h-40 w-full rounded-[12px] object-cover" style={{ objectPosition: biggestPhoto.position }} />
              )}
              <div className="max-w-sm px-3 pt-4 pb-3">
                <p className="text-xs text-[var(--home-forest-muted)]">
                  Largest in the last 30 days · {DEAL_TYPE_LABEL[biggest.type]} · {formatDate(biggest.date)}
                </p>
                <p className="mt-2 text-[17px] leading-snug font-medium text-[var(--home-forest-ink)]">{biggest.title}</p>
                <p className="mt-4 flex items-center justify-between text-sm">
                  <span className="tabular text-[var(--home-forest-ink)]">{dealValue(biggest) ?? "Undisclosed"}</span>
                  <span className="grid size-8 place-items-center rounded-full bg-[var(--home-forest-ink)] text-[#1d2a22] transition-transform duration-200 group-hover:rotate-45">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </p>
              </div>
            </Link>
          )}
        </div>
      </PhotoBand>

      {/* 02 Recent transactions */}
      <section className="home-paper home-rails" aria-labelledby="this-week">
        <div className="container-page py-16 md:py-24">
          <ChapterHead label="Recent Transactions" n={2} of={6} />
          <Reveal>
            <div className="mt-10 mb-12 flex flex-wrap items-end justify-between gap-6 lg:mt-14">
              <Display id="this-week">The latest deals.</Display>
              <PillLink href="/deals">Deal Tracker</PillLink>
            </div>
          </Reveal>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>{featured && <FeatureDealCard deal={featured} />}</Reveal>
            <ul className="divide-y divide-[var(--home-rule)] border-y border-[var(--home-rule)]">
              {moreDeals.map((d, i) => (
                <li key={d.id}>
                  <Link href={`/deals/${d.slug}`} className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] gap-x-4 gap-y-1 py-5">
                    <span className="row-span-2 pt-0.5 font-display text-sm text-[#8a9483]" aria-hidden>
                      {ROMAN[i]}
                    </span>
                    <span className="text-xs text-soft">
                      <span className="font-semibold text-[#2f6b45]">{DEAL_TYPE_LABEL[d.type]}</span> · {formatDate(d.date)}
                    </span>
                    <span className="tabular row-span-2 self-center text-right text-sm font-semibold text-ink">{dealValue(d) ?? "Undisclosed"}</span>
                    <span className="text-lg leading-snug text-[#1d2a22] group-hover:text-[#2f6b45]">{d.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03 Investors and markets */}
      <section className="home-paper home-rails" aria-labelledby="markets">
        <div className="container-page pb-16 md:pb-24">
          <ChapterHead label="Investors and Markets" n={3} of={6} />
          <Reveal>
            <div className="mt-10 mb-12 flex flex-wrap items-end justify-between gap-6 lg:mt-14">
              <Display id="markets">Who builds, who pays.</Display>
              <PillLink href="/statistics">Statistics</PillLink>
            </div>
          </Reveal>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <InvestorsCard investors={getTopInvestors(deals, 6)} title="Most Active Investors" level={3} />
            </Reveal>
            <Reveal>
              <section>
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="font-sans text-lg font-semibold text-ink">Renewable Capacity Leaders</h3>
                  <Link href="/statistics#countries-h" className="text-sm font-medium text-[#2f6b45] hover:underline">
                    All countries
                  </Link>
                </div>
                <ol className="divide-y divide-[var(--home-rule)] rounded-[14px] border border-[var(--home-rule)] bg-white/55">
                  {leaders.map((c, i) => (
                    <li key={c.iso2}>
                      <Link href={`/countries/${c.iso2}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white">
                        <span className="tabular w-5 text-sm text-muted">{i + 1}</span>
                        <span className="min-w-0 flex-1 truncate font-semibold text-ink">{c.name}</span>
                        <span className="h-1.5 w-28 rounded-full bg-[#e3e4da]" aria-hidden>
                          <span className="block h-full rounded-[2px] bg-[#2f6b45]" style={{ width: `${(c.renewableMW / leaderMax) * 100}%` }} />
                        </span>
                        <span className="tabular w-20 text-right text-sm font-semibold">
                          {Math.round(c.renewableMW / 1000).toLocaleString("en-GB")} GW
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-xs text-muted">Installed renewable capacity, {countryStats.latestYear}. Source: IRENA.</p>
              </section>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 Capacity by region */}
      <section className="home-paper home-rails" aria-labelledby="regions">
        <div className="container-page pb-16 md:pb-24">
          <ChapterHead label="Capacity by Region" n={4} of={6} />
          <Reveal>
            <div className="mt-10 mb-12 flex flex-wrap items-end justify-between gap-6 lg:mt-14">
              <Display id="regions">Where the power is.</Display>
              <p className="max-w-sm text-[15px] leading-relaxed text-[#4f5a4c]">
                Installed renewable capacity in each region, {countryStats.latestYear}, from official IRENA statistics.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <CountryStatsTable rows={getRegionStatsRows()} year={countryStats.latestYear} basePath="/regions/" noun="region" />
          </Reveal>
        </div>
      </section>

      {/* 05 Sectors, on the forest band */}
      <section className="home-forest home-rails on-dark" aria-labelledby="techs">
        <div className="container-page py-16 md:py-24">
          <ChapterHead label="Sectors" n={5} of={6} tone="forest" />
          <Reveal>
            <div className="mt-10 mb-12 flex flex-wrap items-end justify-between gap-6 lg:mt-14">
              <Display id="techs" tone="forest">
                Eight ways to power the world.
              </Display>
              <p className="max-w-xs text-[15px] leading-relaxed text-[var(--home-forest-muted)]">
                World installed capacity from IRENA, and the deals on record in each sector.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <SectorCards counts={getSectorSummary()} />
          </Reveal>
        </div>
      </section>

      {/* 06 Data integrity */}
      <section className="home-paper home-rails" aria-labelledby="sources-promise">
        <div className="container-page py-16 md:py-24">
          <ChapterHead label="Data Integrity" n={6} of={6} />
          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <Display id="sources-promise">Every figure, traceable.</Display>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#4f5a4c]">
                Each deal and score lists its sources and the date they were checked, so every figure can be traced to where it was published.
              </p>
              <div className="mt-8">
                <PillLink href="/disclosure">Read our disclosure</PillLink>
              </div>
            </Reveal>
            <ol className="border-t border-[var(--home-rule)]">
              {[
                { title: "Sourced", body: "Every deal links to the article, release or filing where it was disclosed, with the date we checked it." },
                { title: "Dated", body: "Estimated and confirmed dates are marked differently. Nothing is silently updated." },
                { title: "Correctable", body: "See something wrong? Every page has a way to report it, and we log the change." },
              ].map(({ title, body }, i) => (
                <li key={title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-[var(--home-rule)] py-6">
                  <span className="pt-1 font-display text-sm text-[#8a9483]" aria-hidden>
                    {ROMAN[i]}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-light tracking-[-0.02em] text-[#1d2a22]">{title}</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#4f5a4c]">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
