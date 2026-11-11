import type { Metadata } from "next";
import Link from "next/link";
import { SampleBadge } from "@/components/ui/Badge";
import { ChartCard } from "@/components/area/AreaPage";
import { AreaTable } from "@/components/charts/AreaTable";
import { BarList } from "@/components/charts/BarList";
import { CapacityOutlookChart } from "@/components/charts/CapacityOutlookChart";
import { CapacityTimeline } from "@/components/charts/CapacityTimeline";
import { CountryStatsTable } from "@/components/charts/CountryStatsTable";
import { GlobalCapacityChart } from "@/components/charts/GlobalCapacityChart";
import {
  AS_OF_YEAR,
  DATA_AS_OF,
  countryStats,
  getCapacityOutlook,
  getGlobalCapacity,
  getRegions,
  getTechCounts,
  getTimeline,
} from "@/lib/data";
import { countryName, formatDate } from "@/lib/format";
import { TECHNOLOGIES } from "@/lib/tech";

export const metadata: Metadata = {
  title: "Statistics",
  description:
    "Renewable energy capacity by region, country and sector, with operating and pipeline totals.",
};

export default function StatisticsPage() {
  const counts = getTechCounts();
  const regions = getRegions();
  const world = getGlobalCapacity().rows;
  const worldNow = world[world.length - 1];
  const worldFiveAgo = world.find((r) => r.year === worldNow.year - 5) ?? world[0];
  const outlookRef = getCapacityOutlook().scenarios[0].rows.at(-1)!;
  const countryRows = countryStats
    .all()
    .map((c) => ({ ...countryStats.snapshot(c), name: countryName(c.iso2) }))
    .filter((r) => r.renewableMW > 0);
  const genYears = countryRows.map((r) => r.generationYear).filter((y): y is number => y != null);
  const generationYear = genYears.length ? Math.max(...genYears) : undefined;
  return (
    <div>
      <header className="border-b border-line">
        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-10 pt-16 pb-12 md:pt-24 md:pb-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div>
            <h1 className="max-w-4xl text-[2.5rem] leading-[1.05] font-bold tracking-[-0.025em] md:text-[3.5rem]">
              Statistics
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Capacity statistics are compiled from open public datasets, such
              as those published by the International Energy Agency (IEA) and
              the International Renewable Energy Agency (IRENA), and each figure
              is credited to its source. Figures marked as sample are
              sample data, compiled {formatDate(DATA_AS_OF)}.{" "}
              <Link
                href="/methodology#sources"
                className="text-brand-blue underline underline-offset-2"
              >
                Sources and methods
              </Link>
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line">
            {[
              [`World renewable capacity, ${worldNow.year}`, `${Math.round(worldNow.total).toLocaleString("en-GB")} GW`],
              [`Added since ${worldFiveAgo.year}`, `${Math.round(worldNow.total - worldFiveAgo.total).toLocaleString("en-GB")} GW`],
              ["Countries covered", String(countryRows.length)],
              [`EIA projection, ${outlookRef.year}`, `${Math.round(outlookRef.total).toLocaleString("en-GB")} GW`],
            ].map(([k, v]) => (
              <div key={k} className="bg-white p-5 md:p-6">
                <dt className="text-xs font-medium text-muted">{k}</dt>
                <dd className="tabular mt-1 font-display text-3xl font-bold tracking-tight text-brand-navy">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container-page space-y-16 py-12">
        <section aria-labelledby="global-h" className="rounded-[var(--radius)] border border-line p-6 md:p-8">
          <h2 id="global-h" className="text-2xl font-bold tracking-tight">
            Global Renewable Capacity
          </h2>
          <p className="mt-2 mb-6 max-w-3xl leading-relaxed text-muted">
            Installed renewable power capacity worldwide, by technology, as published by the International Renewable
            Energy Agency.
          </p>
          <GlobalCapacityChart series={getGlobalCapacity()} />
        </section>

        <section aria-labelledby="outlook-h" className="rounded-[var(--radius)] border border-line p-6 md:p-8">
          <h2 id="outlook-h" className="text-2xl font-bold tracking-tight">
            Capacity Outlook to {getCapacityOutlook().scenarios[0].rows.at(-1)?.year}
          </h2>
          <p className="mt-2 mb-6 max-w-3xl leading-relaxed text-muted">
            Projections of world renewable capacity from the US Energy Information Administration&rsquo;s International
            Energy Outlook, under three of its published scenarios.
          </p>
          <CapacityOutlookChart outlook={getCapacityOutlook()} actual={getGlobalCapacity().rows} />
        </section>

        <section aria-labelledby="countries-h">
          <h2 id="countries-h" className="mb-2 text-2xl font-bold tracking-tight">
            By Country
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-muted">
            Official installed renewable capacity for every country IRENA reports on. Select a country for its full
            history.
          </p>
          <CountryStatsTable rows={countryRows} year={countryStats.latestYear} generationYear={generationYear} />
          <p className="mt-3 text-xs text-muted">
            Source:{" "}
            <a href={countryStats.source.url} target="_blank" rel="noopener" className="text-brand-blue underline underline-offset-2">
              {countryStats.source.citation}
            </a>
            . {countryStats.source.licence}.
          </p>
        </section>

        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-14">
          <h2 className="text-2xl font-bold tracking-tight">Tracked Projects</h2>
          <SampleBadge />
          <p className="w-full max-w-3xl leading-relaxed text-muted">
            Capacity across the project records on Perpetual, by sector, year and region.
          </p>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <ChartCard title="Capacity by Sector" note="Click a bar to explore">
            <BarList
              caption="Total tracked capacity by sector"
              rows={TECHNOLOGIES.map((t) => ({
                key: t.id,
                label: t.label,
                value: counts[t.id].totalMW,
                color: t.hex,
                count: counts[t.id].projects,
                href: `/sectors/${t.id}`,
              }))}
            />
          </ChartCard>
          <section className="rounded-[var(--radius)] border border-line p-6">
            <CapacityTimeline
              cells={getTimeline()}
              asOfYear={AS_OF_YEAR}
              title="Capacity Additions by Year"
            />
          </section>
        </div>

        <section aria-labelledby="regions-h">
          <h3 id="regions-h" className="mb-5 font-sans text-lg font-semibold text-ink">
            By Region
          </h3>
          <AreaTable
            rows={regions}
            hrefFor={(r) => `/regions/${r.key}`}
            nameHeader="Region"
          />
        </section>

      </div>
    </div>
  );
}
