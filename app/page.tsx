import Link from "next/link";
import { dealValue, FeatureDealCard } from "@/components/cards/Cards";
import { HomeHero } from "@/components/home/HomeHero";
import { Closing, KeyFigures, MapIntro, Mission, OpeningHero, Pill, SectorPanels, StackedCards } from "@/components/home/Landing";
import { LatestRail, type RailItem } from "@/components/home/LatestRail";
import { WEIGHT_PRESETS } from "@/data/policy";
import {
  DATA_AS_OF,
  getCountryStatsRows,
  getDealPoints,
  getDeals,
  getFeaturedDeal,
  getGlobalCapacity,
  getSectorSummary,
} from "@/lib/data";
import { DEAL_TYPE_LABEL, countryName, daysBetween, formatDate } from "@/lib/format";
import { HERO_PHOTOS } from "@/lib/hero-photos";
import { plainText } from "@/lib/plain-text";
import { getPolicyRows } from "@/lib/policy";
import { rankPolicies } from "@/lib/policy-score";

const ROMAN = ["I", "II", "III", "IV", "V"];

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
  const dealCountries = new Set(deals.flatMap((d) => d.countries)).size;

  // World capacity from IRENA: what was added last year and what it was made of.
  const series = getGlobalCapacity();
  const r = series.rows;
  const now = r[r.length - 1];
  const prev = r[r.length - 2];
  const additions = r.slice(1).map((x, i) => x.total - r[i].total);
  const added = now.total - prev.total;
  const record = added >= Math.max(...additions);
  const mix = (["solar", "wind", "hydro", "bioenergy", "geothermal"] as const)
    .map((k) => ({ key: k, gw: Math.max(0, now[k] - prev[k]) }))
    .filter((m) => m.gw > 0)
    .sort((a, b) => b.gw - a.gw);

  const last30 = deals.filter((d) => daysBetween(d.date, DATA_AS_OF) <= 30).length;
  const topPolicy = rankPolicies(policyRows, WEIGHT_PRESETS[0].weights).slice(0, 5);
  const leaders = [...getCountryStatsRows()].sort((a, b) => b.renewableMW - a.renewableMW).slice(0, 5);
  const leaderMax = leaders[0]?.renewableMW ?? 1;

  return (
    <>
      <OpeningHero />
      <Mission deals={deals.length} countries={dealCountries} />
      <KeyFigures
        record={record}
        year={now.year}
        added={added}
        installed={now.total}
        deals={deals.length}
        countries={dealCountries}
        mix={mix}
        citation={plainText(series.source.citation ?? series.source.publisher)}
        citationUrl={series.source.url}
      />

      <MapIntro />
      <HomeHero
        points={dealPoints}
        ages={Object.fromEntries(dealPoints.map((p) => [p.id, daysBetween(p.deal!.date, DATA_AS_OF)]))}
        policyRows={policyRows}
        totalDeals={deals.length}
        rail={<LatestRail items={rail} />}
      />

      <StackedCards
        cards={[
          {
            n: "01",
            title: "Deal Tracker",
            body: `Acquisitions, project finance, power purchase agreements and fund closes from the last five years. ${last30} new deals in the last 30 days, each linked to the news it came from.`,
            href: "/deals",
            cta: "Open the Deal Tracker",
            photo: HERO_PHOTOS.deals.src,
            tone: "paper",
            extra: (
              <ul className="divide-y divide-line border-t border-line text-[15px]">
                {deals.slice(0, 3).map((d) => (
                  <li key={d.id}>
                    <Link href={`/deals/${d.slug}`} className="flex justify-between gap-6 py-3 hover:text-brand-blue">
                      <span className="line-clamp-1">{d.title}</span>
                      <span className="tabular shrink-0 text-soft">{formatDate(d.date)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ),
          },
          {
            n: "02",
            title: "Policy",
            body: `PROFITS scores ${policyRows.length} countries on seven pillars, from political commitment to social licence, and weights them for the kind of deal being done.`,
            href: "/policy",
            cta: "See the country ranking",
            photo: HERO_PHOTOS.policy.src,
            tone: "green",
            extra: (
              <ol className="divide-y divide-white/20 border-t border-white/20 text-[15px]">
                {topPolicy.map((p) => (
                  <li key={p.country}>
                    <Link href={`/countries/${p.country}`} className="flex justify-between gap-6 py-3 hover:underline">
                      <span>
                        <span className="tabular mr-4 text-white/60">{p.rank}</span>
                        {p.name}
                      </span>
                      <span className="tabular">{p.score.toFixed(1)} of 5</span>
                    </Link>
                  </li>
                ))}
              </ol>
            ),
          },
          {
            n: "03",
            title: "Statistics",
            body: "Official installed capacity from IRENA for every region, country and sector, with projections from the US Energy Information Administration.",
            href: "/statistics",
            cta: "Explore the statistics",
            photo: HERO_PHOTOS.statistics.src,
            tone: "forest",
            extra: (
              <ol className="space-y-3 border-t border-white/15 pt-4 text-[15px]">
                {leaders.map((c) => (
                  <li key={c.iso2}>
                    <Link href={`/countries/${c.iso2}`} className="grid grid-cols-[8rem_minmax(0,1fr)_5rem] items-center gap-4 hover:underline">
                      <span className="truncate">{c.name}</span>
                      <span className="h-1.5 rounded-full bg-white/10" aria-hidden>
                        <span className="block h-full rounded-full bg-[var(--home-forest-ink)]" style={{ width: `${(c.renewableMW / leaderMax) * 100}%` }} />
                      </span>
                      <span className="tabular text-right">{Math.round(c.renewableMW / 1000).toLocaleString("en-GB")} GW</span>
                    </Link>
                  </li>
                ))}
              </ol>
            ),
          },
        ]}
      />

      {/* 6. Latest deals */}
      <section aria-labelledby="latest-h" className="relative z-10 bg-[var(--home-paper)]">
        <div className="container-page py-20 md:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 id="latest-h" className="max-w-[16ch] font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1] font-light tracking-[-0.04em] text-[#0b1f3a]">
              Latest renewable energy deals.
            </h2>
            <Pill href="/deals">All deals</Pill>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            {featured && <FeatureDealCard deal={featured} />}
            <ul className="divide-y divide-line border-y border-line">
              {moreDeals.map((d, i) => (
                <li key={d.id}>
                  <Link href={`/deals/${d.slug}`} className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] gap-x-4 gap-y-1 py-5">
                    <span className="row-span-2 pt-0.5 font-display text-sm text-[#8396ae]" aria-hidden>
                      {ROMAN[i]}
                    </span>
                    <span className="text-xs text-soft">
                      <span className="font-semibold text-brand-blue">{DEAL_TYPE_LABEL[d.type]}</span> · {formatDate(d.date)}
                    </span>
                    <span className="tabular row-span-2 self-center text-right text-sm font-semibold text-ink">{dealValue(d) ?? "Undisclosed"}</span>
                    <span className="text-lg leading-snug text-[#0b1f3a] group-hover:text-brand-blue">{d.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SectorPanels counts={getSectorSummary()} />
      <Closing />
    </>
  );
}

