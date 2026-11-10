import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AreaMap } from "@/components/area/AreaMap";
import { ChartCard, ListCard, ListRow } from "@/components/area/AreaPage";
import { dealValue } from "@/components/cards/Cards";
import { BarList } from "@/components/charts/BarList";
import { CapacityTimeline } from "@/components/charts/CapacityTimeline";
import { TechHero } from "@/components/tech/TechHero";
import { TechSwitcher } from "@/components/tech/TechSwitcher";
import { StatusBadge } from "@/components/ui/Badge";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import { AS_OF_YEAR, getTechProfile, getTimeline, toMapPoint } from "@/lib/data";
import { regionSlug } from "@/lib/filters";
import { NEWS_CATEGORY_LABEL, STATUS_LABEL, countryName, formatGW, formatMW, DEAL_TYPE_LABEL } from "@/lib/format";
import { TECHNOLOGIES, TECH_BY_ID, isTechnology } from "@/lib/tech";

export function generateStaticParams() {
  return TECHNOLOGIES.map((t) => ({ tech: t.id }));
}

export async function generateMetadata({ params }: PageProps<"/sectors/[tech]">): Promise<Metadata> {
  const { tech } = await params;
  if (!isTechnology(tech)) return {};
  const t = TECH_BY_ID[tech];
  const s = getTechProfile(tech).stats;
  return {
    title: `${t.label} sector: projects, deals and statistics`,
    description: `${s.projects} ${t.label.toLowerCase()} projects (${formatGW(s.totalMW)} GW) tracked worldwide: capacity by status and region, projects coming online, latest deals and policy news.`,
  };
}

export default function TechnologyPage({ params }: PageProps<"/sectors/[tech]">) {
  // URL params sit behind Suspense so the shared App Shell can prefetch instantly.
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <TechnologyContent params={params} />
    </Suspense>
  );
}

async function TechnologyContent({ params }: { params: PageProps<"/sectors/[tech]">["params"] }) {
  const { tech } = await params;
  if (!isTechnology(tech)) notFound();
  const t = TECH_BY_ID[tech];
  const prof = getTechProfile(tech);
  const { stats } = prof;
  const largest = [...prof.projects].sort((a, b) => (b.capacityMW ?? 0) - (a.capacityMW ?? 0)).slice(0, 6);

  return (
    <div style={{ "--accent": t.hex } as React.CSSProperties}>
      <TechSwitcher current={tech} />

      <TechHero
        t={t}
        stats={[
          { label: "Projects tracked", value: String(stats.projects) },
          { label: "Countries", value: String(stats.countries) },
          { label: "Operating", value: formatGW(stats.operatingMW), unit: "GW" },
          { label: "In pipeline", value: formatGW(stats.pipelineMW), unit: "GW" },
        ]}
      />

      <div className="container-page space-y-14 py-12">
        <section aria-labelledby="map-h">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="map-h" className="text-xl font-bold tracking-tight">
              {t.label} projects on the map
            </h2>
            <Link href={`/projects?tech=${tech}`} className="group inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
              Open in explorer
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <AreaMap points={prof.projects.map(toMapPoint)} label={`${t.label} projects`} />
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Capacity by status" note="Click a bar to explore">
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
          <ChartCard title="Capacity by region" note="Click a bar to explore">
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

        <section className="rounded-[var(--radius)] border border-line p-6">
          <CapacityTimeline cells={getTimeline((p) => p.technology === tech)} asOfYear={AS_OF_YEAR} title={`${t.label} capacity coming online`} />
        </section>

        <section aria-labelledby="largest-h">
          <h2 id="largest-h" className="mb-5 text-xl font-bold tracking-tight">
            Largest {t.label.toLowerCase()} projects
          </h2>
          <ul className="divide-y divide-line rounded-[var(--radius)] border border-line">
            {largest.map((p) => (
              <li key={p.id}>
                <Link href={`/projects/${p.slug}`} className="group flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5 hover:bg-surface-2">
                  <span className="min-w-0 flex-1 basis-full sm:basis-0">
                    <span className="block font-semibold text-ink group-hover:text-brand-blue">{p.name}</span>
                    <span className="block text-xs text-muted">
                      {p.subType && p.subType.charAt(0).toUpperCase() + p.subType.slice(1)} ·{" "}
                      <span className="text-muted">
                        {countryName(p.country)}, <span>{p.region}</span>
                      </span>
                    </span>
                  </span>
                  <StatusBadge status={p.status} />
                  <span className="tabular ml-auto w-24 text-right text-sm font-semibold">
                    {formatMW(p.capacityMW)}
                    {p.storageMWh && <span className="block text-xs font-normal text-muted">{p.storageMWh.toLocaleString("en")} MWh</span>}
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
                <Link href={`/regions/${regionSlug(r.region)}`} className="text-brand-blue underline underline-offset-2">
                  {r.region}
                </Link>
              </span>
            ))}
          </p>
        </section>

        <div className="grid gap-10 lg:grid-cols-2">
          <ListCard title={`Latest ${t.label.toLowerCase()} deals`} empty="No deals tracked for this sector yet." href="/deals">
            {prof.deals.slice(0, 5).map((d) => (
              <ListRow key={d.id} href={`/deals/${d.slug}`} kicker={DEAL_TYPE_LABEL[d.type]} date={d.date} title={d.title} extra={dealValue(d)} />
            ))}
          </ListCard>
          <ListCard title="Latest news & policy" empty="No news tracked for this sector yet." href="/news">
            {prof.news.slice(0, 5).map((n) => (
              <ListRow key={n.id} href={`/news/${n.slug}`} kicker={NEWS_CATEGORY_LABEL[n.category]} date={n.date} title={n.headline} />
            ))}
          </ListCard>
        </div>
      </div>
    </div>
  );
}
