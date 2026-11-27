import { plainText } from "@/lib/plain-text";
import Link from "next/link";
import { dealValue } from "@/components/cards/Cards";
import { CapacityAdditionsChart } from "@/components/charts/CapacityAdditionsChart";
import {
  type AreaProfile,
  countryStats,
  getTopInvestors,
} from "@/lib/data";
import { CountryStatsTable } from "@/components/charts/CountryStatsTable";
import { countryPhotos } from "@/data/geo/country-photos";
import { HERO_PHOTOS } from "@/lib/hero-photos";
import { GlobalCapacityChart } from "@/components/charts/GlobalCapacityChart";
import { regionSlug } from "@/lib/filters";
import {
  countryName,
  formatDate,
  formatGW,
  DEAL_TYPE_LABEL,
} from "@/lib/format";
import { CountryReviewCard } from "@/components/policy-review/CountryReviewCard";
import { InvestorsCard } from "./InvestorsCard";

/** Shared template for country and region statistics pages. */
export function AreaPage({ profile }: { profile: AreaProfile }) {
  const { summary: s, deals } = profile;
  const regionInfo = s.kind === "region" ? countryStats.region(s.key) : undefined;
  const regionPhoto = HERO_PHOTOS.regions;
  const photo =
    s.kind === "country"
      ? countryPhotos[s.key]
      : { url: regionPhoto.src, page: regionPhoto.sourceUrl, artist: regionPhoto.credit, license: regionPhoto.license };
  const official =
    s.kind === "country" ? countryStats.get(s.key) : regionInfo ? countryStats.aggregate(regionInfo) : undefined;
  const memberRows = regionInfo
    ? regionInfo.countries
        .map((iso) => countryStats.get(iso))
        .filter((c) => c !== undefined)
        .map((c) => ({ ...countryStats.snapshot(c), name: countryName(c.iso2) }))
    : [];
  const snap = official ? countryStats.snapshot(official) : undefined;
  // Large systems read in GW, small ones in MW.
  const cap = (mw: number) =>
    mw >= 1000 || (snap?.renewableMW ?? 0) >= 1000
      ? { value: formatGW(mw), unit: "GW" }
      : { value: mw.toLocaleString("en", { maximumFractionDigits: 1 }), unit: "MW" };
  const pct = (x?: number) => (x == null ? "—" : `${Math.round(x * 100)}`);

  return (
    <div>
      <header className={photo ? "on-dark relative isolate overflow-hidden bg-hero text-white" : "border-b border-line"}>
        {photo && (
          <>
            {/* Background image, so a photo that fails to load leaves the plain navy band rather than a broken icon. */}
            <div aria-hidden className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url("${photo.url}")` }} />
            <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,26,51,0.9)_0%,rgba(6,26,51,0.6)_50%,rgba(6,26,51,0.25)_100%),linear-gradient(0deg,rgba(6,26,51,0.8)_0%,rgba(6,26,51,0)_60%)]" />
          </>
        )}
        <div className={`container-page pt-10 pb-12 md:pt-14 md:pb-14 ${photo ? "md:pt-32 md:pb-14" : ""}`}>
          <nav
            aria-label="Breadcrumb"
            className={`mb-6 flex flex-wrap gap-1.5 text-sm ${photo ? "text-white/80" : "text-muted"}`}
          >
            <Link href="/statistics" className="hover:text-brand-blue">
              Statistics
            </Link>
            {s.kind === "country" && s.region && (
              <>
                <span aria-hidden>/</span>
                <Link
                  href={`/regions/${regionSlug(s.region)}`}
                  className="hover:text-brand-blue"
                >
                  {s.region}
                </Link>
              </>
            )}
          </nav>
          <p className={`text-sm ${photo ? "text-hero-ink/75" : "text-soft"}`}>
            {s.kind === "country" ? "Country profile" : "Region profile"}
          </p>
          <h1 className={`mt-5 font-display text-[2.9rem] leading-[0.98] font-light tracking-[-0.04em] sm:text-[4rem] lg:text-[5.4rem] ${photo ? "text-hero-ink" : "text-[#0b1f3a]"}`}>
            {s.name}
          </h1>
          {snap ? (
            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              <Stat dark={!!photo}
                label={`Renewable capacity, ${snap.year}`}
                {...cap(snap.renewableMW)}
              />
              <Stat dark={!!photo} label="Solar" {...cap(snap.solarMW)} />
              <Stat dark={!!photo} label="Wind" {...cap(snap.windMW)} />
              <Stat dark={!!photo}
                label="Hydropower"
                {...cap(snap.hydroMW)}
              />
              <Stat dark={!!photo}
                label={
                  snap.generationYear
                    ? `Renewable share of electricity, ${snap.generationYear}`
                    : "Renewable Share of Electricity"
                }
                value={pct(snap.renewableGenerationShare)}
                unit={snap.renewableGenerationShare == null ? undefined : "%"}
              />
            </dl>
          ) : (
            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              <Stat dark={!!photo} label="Deals tracked" value={String(s.deals)} />
            </dl>
          )}
          {snap && (
            <p className={`mt-6 text-xs ${photo ? "text-white/70" : "text-muted"}`}>
              Data from {plainText(countryStats.source.citation)}
            </p>
          )}
          {photo && (
            <p className="mt-2 text-[11px] text-white/60">
              Photo by{" "}
              <a href={photo.page} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-white">
                {photo.artist || "Wikimedia Commons"}
              </a>
              , {photo.license}, via Wikimedia Commons
            </p>
          )}
        </div>
      </header>

      <div className="container-page space-y-14 py-12">
        {s.kind === "country" && (
          <CountryReviewCard code={s.key} name={s.name} />
        )}

        {official && (
          <section
            aria-labelledby="official-h"
            className="rounded-[var(--radius)] bg-paper p-6 md:p-8"
          >
            <h2 id="official-h" className="font-display text-[2rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a] md:text-[2.6rem]">
              Installed Renewable Capacity
            </h2>
            <p className="mt-2 mb-6 max-w-3xl leading-relaxed text-muted">
              Official capacity statistics for {s.name}
              {s.kind === "region" ? ", summed across its countries" : ""}, by technology, as published by the
              International Renewable Energy Agency.
            </p>
            <GlobalCapacityChart
              series={countryStats.series(official)}
              place={s.name}
            />
          </section>
        )}

        {memberRows.length > 0 && (
          <section aria-labelledby="countries-h">
            <h2 id="countries-h" className="mb-2 font-display text-[2rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a] md:text-[2.6rem]">
              Countries in {s.name}
            </h2>
            <p className="mb-6 max-w-3xl leading-relaxed text-muted">
              Official installed renewable capacity for each country in the region. Select a country for its full history.
            </p>
            <CountryStatsTable rows={memberRows} year={countryStats.latestYear} />
          </section>
        )}

        {official && (
          <section className="rounded-[var(--radius)] bg-paper p-6">
            <CapacityAdditionsChart series={countryStats.series(official)} place={s.name} />
          </section>
        )}

        {deals.length > 0 && (
          <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-2">
            <ListCard
              title="Latest Deals"
              empty="No deals tracked here yet."
              href="/deals"
            >
              {deals.slice(0, 5).map((d) => (
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
            <InvestorsCard investors={getTopInvestors(deals)} />
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  dark = false,
}: {
  label: string;
  value: string;
  unit?: string;
  dark?: boolean;
}) {
  return (
    <div>
      <dt className={`text-xs font-medium ${dark ? "text-white/75" : "text-muted"}`}>{label}</dt>
      <dd className={`tabular mt-1 font-display text-3xl font-light tracking-[-0.02em] ${dark ? "text-hero-ink" : "text-[#0b1f3a]"}`}>
        {value}
        {unit && (
          <span className={`ml-1 text-base font-semibold ${dark ? "text-white/70" : "text-muted"}`}>
            {unit}
          </span>
        )}
      </dd>
    </div>
  );
}

export function ChartCard({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius)] bg-paper p-6">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-xl font-light tracking-[-0.02em] text-[#0b1f3a]">{title}</h2>
        {note && <span className="text-xs text-muted">{note}</span>}
      </div>
      {children}
    </section>
  );
}

export function ListCard({
  title,
  empty,
  href,
  children,
}: {
  title: string;
  empty: string;
  href: string;
  children: React.ReactNode[];
}) {
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-display text-[1.75rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a]">{title}</h2>
        <Link
          href={href}
          className="text-sm font-medium text-brand-blue hover:underline"
        >
          View all
        </Link>
      </div>
      {children.length ? (
        <ul className="divide-y divide-line rounded-[var(--radius)] border border-line">
          {children}
        </ul>
      ) : (
        <p className="rounded-[var(--radius)] border border-dashed border-line px-5 py-8 text-center text-sm text-muted">
          {empty}
        </p>
      )}
    </section>
  );
}

export function ListRow({
  href,
  kicker,
  date,
  title,
  extra,
}: {
  href: string;
  kicker: string;
  date: string;
  title: string;
  extra?: string;
}) {
  return (
    <li>
      <Link href={href} className="group block px-5 py-3.5 hover:bg-surface-2">
        <div className="text-xs text-muted">
          <span className="font-semibold text-brand-blue">{kicker}</span> ·{" "}
          {formatDate(date)}
          {extra && (
            <span className="tabular float-right font-semibold text-ink">
              {extra}
            </span>
          )}
        </div>
        <div className="mt-1 text-sm font-semibold text-ink group-hover:text-brand-blue">
          {title}
        </div>
      </Link>
    </li>
  );
}
