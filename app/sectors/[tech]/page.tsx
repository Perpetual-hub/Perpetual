import { plainText } from "@/lib/plain-text";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { InvestorsCard } from "@/components/area/InvestorsCard";
import { ChartCard, ListCard, ListRow } from "@/components/area/AreaPage";
import { dealValue } from "@/components/cards/Cards";
import { BarList } from "@/components/charts/BarList";
import { CapacityAdditionsChart } from "@/components/charts/CapacityAdditionsChart";

const IRENA_TECHS: string[] = ["solar", "wind", "hydro", "bioenergy", "geothermal", "marine"];
import { TechHero } from "@/components/tech/TechHero";
import { TechSwitcher } from "@/components/tech/TechSwitcher";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import {
  countryStats,
  getGlobalCapacity,
  getTechProfile,
  getTopInvestors,
} from "@/lib/data";
import { GlobalCapacityChart } from "@/components/charts/GlobalCapacityChart";
import type { CapacityRow, CapacitySeries } from "@/lib/types";
import {
  countryName,
  DEAL_TYPE_LABEL,
} from "@/lib/format";
import { TECHNOLOGIES, TECH_BY_ID, isTechnology } from "@/lib/tech";

export function generateStaticParams() {
  return TECHNOLOGIES.map((t) => ({ tech: t.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/sectors/[tech]">): Promise<Metadata> {
  const { tech } = await params;
  if (!isTechnology(tech)) return {};
  const t = TECH_BY_ID[tech];
  return {
    title: `${t.label} Capacity, Deals and Investors`,
    description: `${t.label}: world installed capacity from official IRENA statistics, leading countries, ${getTechProfile(tech).deals.length} deals on record and the most active investors and lenders.`,
  };
}

export default function TechnologyPage({
  params,
}: PageProps<"/sectors/[tech]">) {
  // URL params sit behind Suspense so the shared App Shell can prefetch instantly.
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <TechnologyContent params={params} />
    </Suspense>
  );
}

async function TechnologyContent({
  params,
}: {
  params: PageProps<"/sectors/[tech]">["params"];
}) {
  const { tech } = await params;
  if (!isTechnology(tech)) notFound();
  const t = TECH_BY_ID[tech];
  const prof = getTechProfile(tech);

  // Official world figures (IRENA) where IRENA reports this sector.
  const world = getGlobalCapacity();
  const key = tech as keyof CapacityRow;
  const irena = [
    "solar",
    "wind",
    "hydro",
    "bioenergy",
    "geothermal",
    "marine",
  ].includes(tech);
  const now = world.rows[world.rows.length - 1];
  const before =
    world.rows.find((r) => r.year === now.year - 5) ?? world.rows[0];
  const series: CapacitySeries = {
    ...world,
    rows: world.rows.map((r) => {
      const v = irena ? (r[key] as number) : 0;
      return {
        year: r.year,
        solar: 0,
        wind: 0,
        hydro: 0,
        bioenergy: 0,
        geothermal: 0,
        marine: 0,
        [key]: v,
        total: v,
      };
    }),
  };
  const leaders = irena
    ? countryStats
        .all()
        .map((c) => ({ iso2: c.iso2, mw: countryStats.techMW(c, tech) }))
        .filter((c) => c.mw > 0)
        .sort((a, b) => b.mw - a.mw)
        .slice(0, 10)
    : [];
  const dealCountries = new Set(prof.deals.flatMap((d) => d.countries)).size;
  const lenders = new Set(
    prof.deals.flatMap((d) => (d.buyers ?? []).map((b) => b.name)),
  ).size;
  const gw = (mw: number) =>
    (mw / 1000).toLocaleString("en-GB", {
      maximumFractionDigits: mw < 10_000 ? 1 : 0,
    });

  return (
    <div style={{ "--accent": t.hex } as React.CSSProperties}>
      <TechSwitcher current={tech} />

      <TechHero
        t={t}
        stats={
          irena
            ? [
                {
                  label: `World capacity, ${now.year}`,
                  value: gw((now[key] as number) * 1000),
                  unit: "GW",
                },
                {
                  label: `Added since ${before.year}`,
                  value: gw(
                    ((now[key] as number) - (before[key] as number)) * 1000,
                  ),
                  unit: "GW",
                },
                { label: "Deals on Record", value: String(prof.deals.length) },
                { label: "Countries with Deals", value: String(dealCountries) },
              ]
            : [
                { label: "Deals on Record", value: String(prof.deals.length) },
                { label: "Countries with Deals", value: String(dealCountries) },
                { label: "Investors and Lenders", value: String(lenders) },
                { label: "Deals in the Last 30 Days", value: String(prof.dealsLast30Days) },
              ]
        }
      />

      <div className="container-page space-y-14 py-12">
        {irena && (
          <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <section
              aria-labelledby="world-h"
              className="rounded-[var(--radius)] bg-paper p-6 md:p-8"
            >
              <h2
                id="world-h"
                className="mb-6 font-display text-[2rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a] md:text-[2.6rem]"
              >
                World Installed Capacity
              </h2>
              <GlobalCapacityChart
                series={series}
                place={`the world (${t.label.toLowerCase()})`}
              />
            </section>
            <ChartCard
              title={`Leading Countries, ${now.year}`}
              note="Click a bar for the country"
            >
              <BarList
                caption={`Installed ${t.label.toLowerCase()} capacity by country, ${now.year}`}
                rows={leaders.map((c) => ({
                  key: c.iso2,
                  label: countryName(c.iso2),
                  value: c.mw,
                  color: t.hex,
                  href: `/countries/${c.iso2}`,
                }))}
              />
              <p className="mt-4 text-xs text-muted">
                Data from {plainText(countryStats.source.citation)}
              </p>
            </ChartCard>
          </div>
        )}

        {IRENA_TECHS.includes(tech) && (
          <section className="rounded-[var(--radius)] bg-paper p-6">
            <CapacityAdditionsChart series={getGlobalCapacity()} only={tech as "solar"} />
          </section>
        )}

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-2">
          <ListCard
            title={`Latest ${t.label} Deals`}
            empty="No deals tracked for this sector yet."
            href="/deals"
          >
            {prof.deals.slice(0, 5).map((d) => (
              <ListRow
                key={d.id}
                href={`/deals/${d.slug}`}
                kicker={DEAL_TYPE_LABEL[d.type]}
                date={d.date}
                title={d.title}
                extra={dealValue(d)}
              />
            ))}
          </ListCard>
          <InvestorsCard investors={getTopInvestors(prof.deals)} />
        </div>
      </div>
    </div>
  );
}
