import type { Metadata } from "next";
import Link from "next/link";
import { ChartCard } from "@/components/area/AreaPage";
import { AreaTable } from "@/components/charts/AreaTable";
import { BarList } from "@/components/charts/BarList";
import { CapacityTimeline } from "@/components/charts/CapacityTimeline";
import { AS_OF_YEAR, DATA_AS_OF, DATA_VERSION, getCountries, getRegions, getStats, getTechCounts, getTimeline } from "@/lib/data";
import { formatDate, formatGW } from "@/lib/format";
import { TECHNOLOGIES } from "@/lib/tech";

export const metadata: Metadata = {
  title: "Statistics",
  description: "Renewable energy capacity by region, country and sector, with operating and pipeline totals.",
};

export default function StatisticsPage() {
  const stats = getStats();
  const counts = getTechCounts();
  const regions = getRegions();
  const countries = getCountries();
  return (
    <div>
      <header className="border-b border-line bg-surface-2">
        <div className="container-page pt-12 pb-10">
          <p className="text-xs font-semibold text-brand-blue">Statistics</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-extrabold tracking-[-0.02em] md:text-5xl">Renewable capacity by region and country</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Totals are built from the project records on Perpetual, so every number can be traced back to individual projects and their
            sources. Data version {DATA_VERSION}, compiled {formatDate(DATA_AS_OF)}.{" "}
            <Link href="/methodology" className="text-brand-blue underline underline-offset-2">
              How we count
            </Link>
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ["Projects tracked", String(stats.projects)],
              ["Total capacity", `${formatGW(stats.totalMW)} GW`],
              ["Operating", `${formatGW(stats.operatingMW)} GW`],
              ["In pipeline", `${formatGW(stats.pipelineMW)} GW`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-medium text-muted">{k}</dt>
                <dd className="tabular mt-1 font-display text-3xl font-bold tracking-tight text-brand-navy">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container-page space-y-16 py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <ChartCard title="Capacity by sector" note="Click a bar to explore">
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
            <CapacityTimeline cells={getTimeline()} asOfYear={AS_OF_YEAR} title="Capacity coming online, by sector" />
          </section>
        </div>

        <section aria-labelledby="regions-h">
          <h2 id="regions-h" className="mb-5 text-2xl font-bold tracking-tight">
            By region
          </h2>
          <AreaTable rows={regions} hrefFor={(r) => `/regions/${r.key}`} nameHeader="Region" />
        </section>

        <section aria-labelledby="countries-h">
          <h2 id="countries-h" className="mb-5 text-2xl font-bold tracking-tight">
            By country
          </h2>
          <AreaTable rows={countries} hrefFor={(c) => `/countries/${c.key}`} nameHeader="Country" />
        </section>
      </div>
    </div>
  );
}
