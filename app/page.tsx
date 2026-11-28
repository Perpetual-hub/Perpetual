import Link from "next/link";
import { dealValue, FeatureDealCard } from "@/components/cards/Cards";
import { HomeHero } from "@/components/home/HomeHero";
import { Closing, KeyFigures, Mission, OpeningHero, Pill, SectorPanels, StackedCards } from "@/components/home/Landing";
import { LatestRail, type RailItem } from "@/components/home/LatestRail";
import {
  DATA_AS_OF,
  getCountryStatsRows,
  getDealPoints,
  getDeals,
  getFeaturedDeal,
  getGlobalCapacity,
  getSectorSummary,
} from "@/lib/data";
import { DEAL_TYPE_LABEL, daysBetween, formatDate } from "@/lib/format";
import { SECTION_PHOTOS } from "@/lib/hero-photos";
import { TECHNOLOGIES } from "@/lib/tech";
import { plainText } from "@/lib/plain-text";
import { getLatestEvents, getReviewRows, getVerdictCells } from "@/lib/policy-review/data";
import { VERDICT_CODE, VERDICT_LABEL } from "@/lib/policy-review/cells";

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
  const reviewRows = getReviewRows();
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

  const topPolicy = [...reviewRows]
    .sort((a, b) => VERDICT_CODE[b.segments.utility.verdict] - VERDICT_CODE[a.segments.utility.verdict] || a.name.localeCompare(b.name))
    .slice(0, 5);
  const leaders = [...getCountryStatsRows()].sort((a, b) => b.renewableMW - a.renewableMW).slice(0, 5);
  const leaderMax = leaders[0]?.renewableMW ?? 1;

  return (
    <>
      <OpeningHero />
      <Mission />
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

      <HomeHero
        points={dealPoints}
        ages={Object.fromEntries(dealPoints.map((p) => [p.id, daysBetween(p.deal!.date, DATA_AS_OF)]))}
        policyCells={getVerdictCells()}
        totalDeals={deals.length}
        rail={<LatestRail items={rail} />}
        policyRail={
          <LatestRail
            title="Latest Policy Changes"
            more={{ href: "/policy", label: "Open the Policy Review" }}
            items={getLatestEvents(12).map((e, i) => ({
              id: `${e.iso2}-${i}`,
              href: `/policy/${e.iso2.toLowerCase()}`,
              date: e.date,
              kicker: e.name,
              title: e.title,
              value: e.effect === "positive" ? "Positive for investors" : e.effect === "negative" ? "Negative for investors" : "Mixed for investors",
            }))}
          />
        }
      />

      <StackedCards
        cards={[
          {
            n: "01",
            title: "Knowledge",
            href: "/knowledge",
            cta: "Explore Knowledge",
            photo: SECTION_PHOTOS.knowledge.src,
            tone: "paper",
            extra: (
              <ul className="flex flex-wrap gap-2 border-t border-line pt-5 text-[15px]">
                {TECHNOLOGIES.map((t) => (
                  <li key={t.id}>
                    <Link href={`/sectors/${t.id}`} className="inline-block rounded-full border border-line bg-white px-4 py-1.5 hover:border-brand-blue hover:text-brand-blue">
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ),
          },
          {
            n: "02",
            title: "Deals",
            body: "Renewable energy transactions worldwide, from acquisitions and project finance to power purchase agreements and fund closes, each traced to its original source.",
            href: "/deals",
            cta: "Explore Deals",
            photo: SECTION_PHOTOS.deals.src,
            tone: "sky",
            extra: (
              <ul className="divide-y divide-[#0b1f3a]/15 border-t border-[#0b1f3a]/15 text-[15px]">
                {deals.slice(0, 3).map((d) => (
                  <li key={d.id}>
                    <Link href={`/deals/${d.slug}`} className="flex justify-between gap-6 py-3 hover:text-brand-blue">
                      <span className="line-clamp-1">{d.title}</span>
                      <span className="tabular shrink-0 text-[#0b1f3a]/65">{formatDate(d.date)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ),
          },
          {
            n: "03",
            title: "Policy",
            body: "Country assessments of how ready each market is for utility-scale and C&I renewable investment, with the reasoning and sources behind every verdict.",
            href: "/policy",
            cta: "See the reviewed markets",
            photo: SECTION_PHOTOS.policy.src,
            tone: "blue",
            extra: (
              <ol className="divide-y divide-white/20 border-t border-white/20 text-[15px]">
                {topPolicy.map((p) => (
                  <li key={p.iso2}>
                    <Link href={`/policy/${p.iso2.toLowerCase()}`} className="flex justify-between gap-6 py-3 hover:underline">
                      <span>{p.name}</span>
                      <span>
                        Utility-Scale {VERDICT_LABEL[p.segments.utility.verdict]}, C&amp;I {VERDICT_LABEL[p.segments.ci.verdict]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            ),
          },
          {
            n: "04",
            title: "Statistics",
            body: "Official installed capacity for every region, country and sector from IRENA, with projections from the US Energy Information Administration.",
            href: "/statistics",
            cta: "Explore the statistics",
            photo: SECTION_PHOTOS.statistics.src,
            tone: "navy",
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
              Latest Renewable Energy Deals
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

