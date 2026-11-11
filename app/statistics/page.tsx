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
      <header className="border-b border-line">
        <div className="container-page pt-16 pb-12 md:pt-24 md:pb-16">
          <h1 className="max-w-4xl text-[2.5rem] leading-[1.05] font-bold tracking-[-0.025em] md:text-[3.5rem]">Statistics</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Totals are built from the project records on Perpetual, so every number can be traced back to individual projects and their
            sources. Data version {DATA_VERSION}, compiled {formatDate(DATA_AS_OF)}.{" "}
            <Link href="/methodology" className="text-brand-blue underline underline-offset-2">
              How we count
            </Link>
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
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
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
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
            <CapacityTimeline cells={getTimeline()} asOfYear={AS_OF_YEAR} title="Capacity additions by year" />
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
