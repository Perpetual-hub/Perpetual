import { plainText } from "@/lib/plain-text";
import type { Metadata } from "next";
import { HeroStats, PageHero } from "@/components/ui/PageHero";
import { HERO_PHOTOS } from "@/lib/hero-photos";
import Link from "next/link";
import { CapacityOutlookChart } from "@/components/charts/CapacityOutlookChart";
import { CapacityAdditionsChart } from "@/components/charts/CapacityAdditionsChart";
import { CountryStatsTable } from "@/components/charts/CountryStatsTable";
import { GlobalCapacityChart } from "@/components/charts/GlobalCapacityChart";
import {
  DATA_AS_OF,
  countryStats,
  getCapacityOutlook,
  getGlobalCapacity,
  getRegionStatsRows,
} from "@/lib/data";
import { countryName, formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Statistics",
  description:
    "Renewable energy capacity by region, country and sector, with operating and pipeline totals.",
};

export default function StatisticsPage() {
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
      <PageHero
        photo={HERO_PHOTOS.statistics}
        eyebrow="Statistics"
        title="Renewable Power by the Numbers"
        lede={
          <>
            Official capacity statistics from IRENA and the US Energy Information Administration, for every region, country and
            sector. Each figure is credited to its source. Data compiled {formatDate(DATA_AS_OF)}.{" "}
            <Link href="/disclosure#sources" className="underline underline-offset-2">
              Sources and methods
            </Link>
          </>
        }
        aside={
          <HeroStats
            stats={[
              { label: `World renewable capacity, ${worldNow.year}`, value: Math.round(worldNow.total).toLocaleString("en-GB"), unit: "GW" },
              { label: `Added since ${worldFiveAgo.year}`, value: Math.round(worldNow.total - worldFiveAgo.total).toLocaleString("en-GB"), unit: "GW" },
              { label: "Countries Covered", value: String(countryRows.length) },
              { label: `EIA projection, ${outlookRef.year}`, value: Math.round(outlookRef.total).toLocaleString("en-GB"), unit: "GW" },
            ]}
          />
        }
      />

      <div className="container-page space-y-16 py-12">
        <section aria-labelledby="global-h" className="rounded-[var(--radius)] bg-paper p-6 md:p-8">
          <h2 id="global-h" className="font-display text-[2rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a] md:text-[2.6rem]">
            Global Renewable Capacity
          </h2>
          <p className="mt-2 mb-6 max-w-3xl leading-relaxed text-muted">
            Installed renewable power capacity worldwide, by technology, as published by the International Renewable
            Energy Agency.
          </p>
          <GlobalCapacityChart series={getGlobalCapacity()} />
        </section>

        <section aria-labelledby="outlook-h" className="rounded-[var(--radius)] bg-paper p-6 md:p-8">
          <h2 id="outlook-h" className="font-display text-[2rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a] md:text-[2.6rem]">
            Capacity Outlook to {getCapacityOutlook().scenarios[0].rows.at(-1)?.year}
          </h2>
          <p className="mt-2 mb-6 max-w-3xl leading-relaxed text-muted">
            Projections of world renewable capacity from the US Energy Information Administration&rsquo;s International
            Energy Outlook, under three of its published scenarios.
          </p>
          <CapacityOutlookChart outlook={getCapacityOutlook()} actual={getGlobalCapacity().rows} />
        </section>

        <section aria-labelledby="regions-h">
          <h2 id="regions-h" className="mb-2 font-display text-[2rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a] md:text-[2.6rem]">
            By Region
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-muted">
            Installed renewable capacity in each region, summed from IRENA&rsquo;s country figures.
          </p>
          <CountryStatsTable rows={getRegionStatsRows()} year={countryStats.latestYear} basePath="/regions/" noun="region" />
        </section>

        <section aria-labelledby="countries-h">
          <h2 id="countries-h" className="mb-2 font-display text-[2rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a] md:text-[2.6rem]">
            By Country
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-muted">
            Official installed renewable capacity for every country IRENA reports on. Select a country for its full
            history.
          </p>
          <CountryStatsTable rows={countryRows} year={countryStats.latestYear} generationYear={generationYear} />
          <p className="mt-3 text-xs text-muted">
            Data from{" "}
            <a href={countryStats.source.url} target="_blank" rel="noopener" className="text-brand-blue underline underline-offset-2">
              {plainText(countryStats.source.citation).replace(/\.+$/, "")}
            </a>
            . {plainText(countryStats.source.licence)}.
          </p>
        </section>

        <section className="rounded-[var(--radius)] bg-paper p-6">
          <CapacityAdditionsChart series={getGlobalCapacity()} />
        </section>

      </div>
    </div>
  );
}
