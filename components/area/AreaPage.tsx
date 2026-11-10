import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { dealValue } from "@/components/cards/Cards";
import { AreaTable } from "@/components/charts/AreaTable";
import { BarList } from "@/components/charts/BarList";
import { CapacityTimeline } from "@/components/charts/CapacityTimeline";
import { StatusBadge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import { AS_OF_YEAR, type AreaProfile, getTimeline, toMapPoint } from "@/lib/data";
import { STATUSES, regionSlug } from "@/lib/filters";
import { NEWS_CATEGORY_LABEL, STATUS_LABEL, formatDate, formatGW, formatMW, DEAL_TYPE_LABEL } from "@/lib/format";
import { TECHNOLOGIES } from "@/lib/tech";
import { AreaMap } from "./AreaMap";

/** Shared template for country and region statistics pages. */
export function AreaPage({ profile }: { profile: AreaProfile }) {
  const { summary: s, projects, deals, news, countries } = profile;
  const filterQuery = s.kind === "country" ? `country=${s.key}` : `region=${encodeURIComponent(s.name)}`;
  const byStatus = STATUSES.map((st) => ({
    key: st,
    label: STATUS_LABEL[st],
    value: projects.filter((p) => p.status === st).reduce((x, p) => x + (p.capacityMW ?? 0), 0),
    count: projects.filter((p) => p.status === st).length,
    href: `/projects?${filterQuery}&status=${st}`,
  })).filter((r) => r.value > 0);
  const byTech = TECHNOLOGIES.filter((t) => s.byTech[t.id] > 0)
    .map((t) => ({
      key: t.id,
      label: t.label,
      value: s.byTech[t.id],
      color: t.hex,
      count: projects.filter((p) => p.technology === t.id).length,
      href: `/projects?${filterQuery}&tech=${t.id}`,
    }));
  const ids = new Set(projects.map((p) => p.id));
  const timeline = getTimeline((p) => ids.has(p.id));
  const top = [...projects].sort((a, b) => (b.capacityMW ?? 0) - (a.capacityMW ?? 0)).slice(0, 8);

  return (
    <div>
      <header className="border-b border-line bg-surface-2">
        <div className="container-page pt-8 pb-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-1.5 text-sm text-muted">
            <Link href="/statistics" className="hover:text-brand-blue">
              Statistics
            </Link>
            {s.kind === "country" && s.region && (
              <>
                <span aria-hidden>/</span>
                <Link href={`/regions/${regionSlug(s.region)}`} className="hover:text-brand-blue">
                  {s.region}
                </Link>
              </>
            )}
          </nav>
          <p className="text-xs font-semibold text-brand-blue">{s.kind === "country" ? "Country profile" : "Region profile"}</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.02em] md:text-5xl">{s.name}</h1>
          <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            <Stat label="Projects tracked" value={String(s.projects)} />
            <Stat label="Total capacity" value={formatGW(s.totalMW)} unit="GW" />
            <Stat label="Operating" value={formatGW(s.operatingMW)} unit="GW" />
            <Stat label="In pipeline" value={formatGW(s.pipelineMW)} unit="GW" />
            <Stat label="Deals tracked" value={String(s.deals)} />
          </dl>
        </div>
      </header>

      <div className="container-page space-y-14 py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <ChartCard title="Capacity by sector" note="Click a bar to explore">
            <BarList rows={byTech} caption={`Capacity by sector in ${s.name}`} />
          </ChartCard>
          <ChartCard title="Capacity by status" note="Click a bar to explore">
            <BarList rows={byStatus} caption={`Capacity by project status in ${s.name}`} />
          </ChartCard>
        </div>

        <section className="rounded-[var(--radius)] border border-line p-6">
          <CapacityTimeline cells={timeline} asOfYear={AS_OF_YEAR} title={`Capacity coming online in ${s.name}`} />
        </section>

        <section aria-labelledby="map-h">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="map-h" className="text-xl font-bold tracking-tight">
              Projects on the map
            </h2>
            <Link href={`/projects?${filterQuery}`} className="group inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
              Open in explorer
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <AreaMap points={projects.map(toMapPoint)} label={s.name} />
        </section>

        {countries.length > 0 && (
          <section aria-labelledby="countries-h">
            <h2 id="countries-h" className="mb-5 text-xl font-bold tracking-tight">
              Countries in {s.name}
            </h2>
            <AreaTable rows={countries} hrefFor={(c) => `/countries/${c.key}`} nameHeader="Country" />
          </section>
        )}

        <section aria-labelledby="largest-h">
          <h2 id="largest-h" className="mb-5 text-xl font-bold tracking-tight">
            Largest projects
          </h2>
          <ul className="divide-y divide-line rounded-[var(--radius)] border border-line">
            {top.map((p) => (
              <li key={p.id}>
                <Link href={`/projects/${p.slug}`} className="group flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5 hover:bg-surface-2">
                  <span className="min-w-0 flex-1 basis-full font-semibold text-ink group-hover:text-brand-blue sm:basis-0">{p.name}</span>
                  <TechTag tech={p.technology} />
                  <StatusBadge status={p.status} />
                  <span className="tabular ml-auto w-20 text-right text-sm font-semibold">{formatMW(p.capacityMW)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-10 lg:grid-cols-2">
          <ListCard title="Latest deals" empty="No deals tracked here yet." href="/deals">
            {deals.slice(0, 5).map((d) => (
              <ListRow key={d.id} href={`/deals/${d.slug}`} kicker={DEAL_TYPE_LABEL[d.type]} date={d.date} title={d.title} extra={dealValue(d)} />
            ))}
          </ListCard>
          <ListCard title="Latest news & policy" empty="No news tracked here yet." href="/news">
            {news.slice(0, 5).map((n) => (
              <ListRow key={n.id} href={`/news/${n.slug}`} kicker={NEWS_CATEGORY_LABEL[n.category]} date={n.date} title={n.headline} />
            ))}
          </ListCard>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="tabular mt-1 font-display text-3xl font-bold tracking-tight text-brand-navy">
        {value}
        {unit && <span className="ml-1 text-base font-semibold text-muted">{unit}</span>}
      </dd>
    </div>
  );
}

export function ChartCard({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[var(--radius)] border border-line p-6">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="font-sans text-base font-semibold text-ink">{title}</h2>
        {note && <span className="text-xs text-muted">{note}</span>}
      </div>
      {children}
    </section>
  );
}

export function ListCard({ title, empty, href, children }: { title: string; empty: string; href: string; children: React.ReactNode[] }) {
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <Link href={href} className="text-sm font-medium text-brand-blue hover:underline">
          View all
        </Link>
      </div>
      {children.length ? (
        <ul className="divide-y divide-line rounded-[var(--radius)] border border-line">{children}</ul>
      ) : (
        <p className="rounded-[var(--radius)] border border-dashed border-line px-5 py-8 text-center text-sm text-muted">{empty}</p>
      )}
    </section>
  );
}

export function ListRow({ href, kicker, date, title, extra }: { href: string; kicker: string; date: string; title: string; extra?: string }) {
  return (
    <li>
      <Link href={href} className="group block px-5 py-3.5 hover:bg-surface-2">
        <div className="text-xs text-muted">
          <span className="font-semibold text-brand-blue">{kicker}</span> · {formatDate(date)}
          {extra && <span className="tabular float-right font-semibold text-ink">{extra}</span>}
        </div>
        <div className="mt-1 text-sm font-semibold text-ink group-hover:text-brand-blue">{title}</div>
      </Link>
    </li>
  );
}
