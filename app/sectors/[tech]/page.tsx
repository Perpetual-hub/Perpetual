import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AreaMap } from "@/components/area/AreaMap";
import { InvestorsCard } from "@/components/area/InvestorsCard";
import { ChartCard, ListCard, ListRow } from "@/components/area/AreaPage";
import { dealValue } from "@/components/cards/Cards";
import { BarList } from "@/components/charts/BarList";
import { CapacityAdditionsChart } from "@/components/charts/CapacityAdditionsChart";

const IRENA_TECHS: string[] = ["solar", "wind", "hydro", "bioenergy", "geothermal", "marine"];
import { TechHero } from "@/components/tech/TechHero";
import { TechSwitcher } from "@/components/tech/TechSwitcher";
import { StatusBadge } from "@/components/ui/Badge";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import {
  countryStats,
  getGlobalCapacity,
  getTechProfile,
  getTopInvestors,
  toMapPoint,
} from "@/lib/data";
import { GlobalCapacityChart } from "@/components/charts/GlobalCapacityChart";
import type { CapacityRow, CapacitySeries } from "@/lib/types";
import { regionSlug } from "@/lib/filters";
import {
  STATUS_LABEL,
  countryName,
  formatMW,
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
    title: `${t.label} Sector: Capacity, Deals and Investors`,
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
  const { stats } = prof;
  const largest = [...prof.projects]
    .sort((a, b) => (b.capacityMW ?? 0) - (a.capacityMW ?? 0))
    .slice(0, 6);
  const hasProjects = prof.projects.length > 0;

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
                { label: "Deals on record", value: String(prof.deals.length) },
                { label: "Countries with deals", value: String(dealCountries) },
              ]
            : [
                { label: "Deals on record", value: String(prof.deals.length) },
                { label: "Countries with deals", value: String(dealCountries) },
                { label: "Investors and lenders", value: String(lenders) },
                { label: "Projects tracked", value: String(stats.projects) },
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
                className="mb-6 text-2xl font-semibold tracking-[-0.02em]"
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
                Source: {countryStats.source.citation}
              </p>
            </ChartCard>
          </div>
        )}

        {hasProjects && (
          <>
            <section aria-labelledby="map-h">
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <h2 id="map-h" className="text-xl font-semibold tracking-[-0.02em]">
                  Project Map
                </h2>
                <Link
                  href={`/projects?tech=${tech}`}
                  className="group inline-flex items-center gap-1 text-sm font-medium text-brand-blue"
                >
                  Open in explorer
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
              <AreaMap
                points={prof.projects.map(toMapPoint)}
                label={`${t.label} projects`}
              />
            </section>

            <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2">
              <ChartCard
                title="Capacity by Status"
                note="Click a bar to explore"
              >
                <BarList
                  caption={`${t.label} capacity by project status`}
                  rows={prof.byStatus.map((s) => ({
                    key: s.status,
                    label: STATUS_LABEL[s.status],
                    value: s.mw,
                    color: t.hex,
                    count: s.count,
                    href: `/projects?tech=${tech}&status=${s.status}`,
                  }))}
                />
              </ChartCard>
              <ChartCard
                title="Capacity by Region"
                note="Click a bar to explore"
              >
                <BarList
                  caption={`${t.label} capacity by region`}
                  rows={prof.byRegion.map((r) => ({
                    key: r.region,
                    label: r.region,
                    value: r.mw,
                    color: t.hex,
                    count: r.count,
                    href: `/projects?tech=${tech}&region=${encodeURIComponent(r.region)}`,
                  }))}
                />
              </ChartCard>
            </div>

            {IRENA_TECHS.includes(tech) && (
              <section className="rounded-[var(--radius)] bg-paper p-6">
                <CapacityAdditionsChart series={getGlobalCapacity()} only={tech as "solar"} />
              </section>
            )}

            <section aria-labelledby="largest-h">
              <h2
                id="largest-h"
                className="mb-5 text-xl font-semibold tracking-[-0.02em]"
              >
                Largest {t.label} Projects
              </h2>
              <ul className="divide-y divide-line rounded-[var(--radius)] border border-line">
                {largest.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5 hover:bg-surface-2"
                    >
                      <span className="min-w-0 flex-1 basis-full sm:basis-0">
                        <span className="block font-semibold text-ink group-hover:text-brand-blue">
                          {p.name}
                        </span>
                        <span className="block text-xs text-muted">
                          {p.subType &&
                            p.subType.charAt(0).toUpperCase() +
                              p.subType.slice(1)}{" "}
                          ·{" "}
                          <span className="text-muted">
                            {countryName(p.country)}, <span>{p.region}</span>
                          </span>
                        </span>
                      </span>
                      <StatusBadge status={p.status} />
                      <span className="tabular ml-auto w-24 text-right text-sm font-semibold">
                        {formatMW(p.capacityMW)}
                        {p.storageMWh && (
                          <span className="block text-xs font-normal text-muted">
                            {p.storageMWh.toLocaleString("en")} MWh
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted">
                Strongest regions:{" "}
                {prof.byRegion.slice(0, 3).map((r, i) => (
                  <span key={r.region}>
                    {i > 0 && ", "}
                    <Link
                      href={`/regions/${regionSlug(r.region)}`}
                      className="text-brand-blue underline underline-offset-2"
                    >
                      {r.region}
                    </Link>
                  </span>
                ))}
              </p>
            </section>
          </>
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
