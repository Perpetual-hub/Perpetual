import { Suspense } from "react";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import { ArrowLeft, ArrowRight, ExternalLink, Flag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FactGrid, Section } from "@/components/project/Section";
import { LocatorMap } from "@/components/project/LocatorMap";
import { Benchmarks, CapitalStack, OwnershipHistory, ProjectHistory } from "@/components/project/Insights";
import { SampleBadge, StatusBadge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import {
  getProject,
  getProjects,
  toMapPoint,
} from "@/lib/data";
import { OWNERSHIP_LABEL } from "@/lib/filters";
import { capitalStack, ownershipHistory, projectBenchmarks, projectHistory } from "@/lib/project-insights";
import { countryName, formatDate, formatMW, formatMoney, titleCase } from "@/lib/format";
import { TECH_BY_ID } from "@/lib/tech";
import type { Party, Project } from "@/lib/types";

export function generateStaticParams() {
  // Cache Components needs at least one param: with no projects, prerender a 404 placeholder.
  // Plants from the WRI database (about 14,000) render on first visit instead of at build time.
  const list = getProjects()
    .filter((p) => !p.id.startsWith("prj-g-"))
    .map((p) => ({ slug: p.slug }));
  return list.length ? list : [{ slug: "none" }];
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const t = TECH_BY_ID[p.technology].label;
  return {
    title: p.name,
    description: `${p.name}: ${formatMW(p.capacityMW)} ${t.toLowerCase()} project in ${countryName(p.country)}. Status, owners, financing, timeline and sources.`,
  };
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  // URL params sit behind Suspense so the shared App Shell can prefetch instantly.
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ProjectPageContent params={params} />
    </Suspense>
  );
}

async function ProjectPageContent({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const tech = TECH_BY_ID[p.technology];
  const history = projectHistory(p);
  const hasParties = !!(p.developer?.length || p.owners?.length || p.epc?.length || p.om?.length || p.offtake || p.financing?.debt?.length || p.financing?.equity?.length || p.financing?.instruments?.length);
  const owners = ownershipHistory(p);
  const stack = capitalStack(p);
  const bench = projectBenchmarks(p);
  const capex = p.financing?.totalCapex;

  const capacity =
    p.capacityMW != null && (
      <span className="tabular">
        {formatMW(p.capacityMW)}
        {p.capacityBasis && <span className="ml-1 text-xs font-medium text-muted">{p.capacityBasis}</span>}
      </span>
    );

  return (
    <article>
      {/* Header */}
      <header className="border-b border-line">
        <div className="container-page pt-10 pb-12 md:pt-14 md:pb-14">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm">
            <Link href="/projects" className="inline-flex items-center gap-1 text-muted hover:text-brand-blue">
              <ArrowLeft className="size-3.5" aria-hidden />
              All projects
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-2.5">
            <TechTag tech={p.technology} withIcon />
            <StatusBadge status={p.status} />
            {p.isSample && <SampleBadge />}
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl leading-[1.08] font-bold tracking-[-0.02em] md:text-5xl">{p.name}</h1>
          <p className="mt-3 text-lg text-muted">
            {[p.subType && sentence(p.subType), p.admin1].filter(Boolean).join(" · ")}
            {(p.subType || p.admin1) && " · "}
            <Link href={`/countries/${p.country}`} className="text-ink underline decoration-line underline-offset-4 hover:text-brand-blue">
              {countryName(p.country)}
            </Link>
          </p>
          <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            <HeadStat label="Capacity" value={formatMW(p.capacityMW)} />
            {p.storageMWh && <HeadStat label="Energy" value={`${p.storageMWh.toLocaleString("en")} MWh`} />}
            {p.hydrogenTonnesPerYear && <HeadStat label="Hydrogen output" value={`${(p.hydrogenTonnesPerYear / 1000).toLocaleString("en")}k t/yr`} />}
            {p.dates.cod && (
              <HeadStat
                label={p.status === "operating" ? "In operation since" : "Expected operation"}
                value={p.dates.cod.date.slice(0, 4)}
                note={p.dates.cod.confidence === "estimated" ? "Estimated" : undefined}
              />
            )}
            {capex && <HeadStat label="Total capex" value={formatMoney(capex.usd ?? capex.amount, capex.usd ? "USD" : capex.currency)} />}
          </dl>
        </div>
      </header>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-12">
          {p.description && <p className="max-w-[68ch] text-lg leading-relaxed text-ink/85">{p.description}</p>}

          <Section id="facts" title="Key Facts">
            <FactGrid
              facts={[
                ["Sector", <span key="t" className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: tech.hex }} aria-hidden />{tech.label}</span>],
                ["Sub-type", p.subType && sentence(p.subType)],
                ["Capacity", capacity],
                ["Energy storage", p.storageMWh && `${p.storageMWh.toLocaleString("en")} MWh`],
                ["Hydrogen output", p.hydrogenTonnesPerYear && `${p.hydrogenTonnesPerYear.toLocaleString("en")} t/yr`],
                ["Country", countryName(p.country)],
                ["Province / state", p.admin1],
                ["Region", p.region],
                ["Coordinates", p.locationPrecision === "country" ? "Not published" : <span key="c" className="tabular">{p.lat.toFixed(2)}, {p.lng.toFixed(2)}{p.locationPrecision === "area" ? " (approximate)" : ""}</span>],
                ["Ownership type", p.ownership && OWNERSHIP_LABEL[p.ownership]],
                ["Design life", p.designLifeYears && `${p.designLifeYears} years`],
                [
                  "Total capex",
                  capex && (
                    <span key="x" className="tabular">
                      {formatMoney(capex.amount, capex.currency)}
                      {capex.usd && capex.currency !== "USD" && (
                        <span className="block text-xs font-normal text-muted">
                          ≈ {formatMoney(capex.usd, "USD")} at FX of {capex.fxDate && formatDate(capex.fxDate)}
                        </span>
                      )}
                    </span>
                  ),
                ],
              ]}
            />
          </Section>

          {history.length > 0 && (
            <Section id="history" title="Project History">
              <ProjectHistory events={history} />
            </Section>
          )}

          {owners.length > 0 && (
            <Section id="ownership" title="Ownership History">
              <OwnershipHistory changes={owners} />
            </Section>
          )}

          {stack.length > 0 && (
            <Section id="capital" title="Capital Stack">
              <CapitalStack layers={stack} />
            </Section>
          )}

          {hasParties && (
          <Section id="parties" title="Parties">
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              <PartyBlock title="Developer" parties={p.developer} />
              <OwnersBlock owners={p.owners} />
              <PartyBlock title="EPC Contractor" parties={p.epc} />
              <PartyBlock title="Operations & Maintenance" parties={p.om} />
              {p.offtake && (
                <div>
                  <h3 className="mb-2 font-sans text-xs font-semibold text-muted">Offtake</h3>
                  <p className="font-semibold text-ink">{p.offtake.offtaker ?? (p.offtake.type === "merchant" ? "Merchant (no long-term buyer)" : "—")}</p>
                  {p.offtake.type && p.offtake.type !== "merchant" && (
                    <p className="mt-0.5 text-sm text-muted">
                      {p.offtake.type === "PPA" || p.offtake.type === "CfD" || p.offtake.type === "FiT" ? p.offtake.type : titleCase(p.offtake.type)}
                      {p.offtake.tenorYears && `, ${p.offtake.tenorYears} Years`}
                    </p>
                  )}
                </div>
              )}
              <PartyBlock title="Lenders" parties={p.financing?.debt} />
              <PartyBlock title="Equity" parties={p.financing?.equity} />
              {!!p.financing?.instruments?.length && (
                <div>
                  <h3 className="mb-2 font-sans text-xs font-semibold text-muted">Financing Instruments</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.financing.instruments.map((i) => (
                      <li key={i} className="rounded-[3px] border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink">
                        {sentence(i)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>
          )}

          {bench.length > 0 && (
            <Section id="benchmarks" title="How It Compares">
              <Benchmarks items={bench} techLabel={tech.label} />
            </Section>
          )}

          <Sources project={p} />
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div>
            <LocatorMap point={toMapPoint(p)} />
            {p.locationPrecision && p.locationPrecision !== "site" && (
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {p.locationPrecision === "area"
                  ? "Approximate location: the pin marks the town or district named in the source, not the exact site."
                  : "Approximate location: the source names only the country, so the pin marks the country."}
              </p>
            )}
          </div>
          <Link
            href={`/projects?country=${p.country}`}
            className="group flex items-center justify-between rounded-[var(--radius)] border border-line px-4 py-3 text-sm font-medium hover:border-[#cdd6e2]"
          >
            More projects in {countryName(p.country)}
            <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            href={`/projects?tech=${p.technology}`}
            className="group flex items-center justify-between rounded-[var(--radius)] border border-line px-4 py-3 text-sm font-medium hover:border-[#cdd6e2]"
          >
            All {tech.label.toLowerCase()} projects
            <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </aside>
      </div>
    </article>
  );
}

/** "offshore fixed-bottom" → "Offshore fixed-bottom" (keeps acronyms like PEM intact). */
function sentence(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function HeadStat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="tabular mt-1 font-display text-2xl font-semibold tracking-[-0.02em] text-brand-navy">
        {value}
        {note && <span className="ml-1.5 align-middle text-xs font-medium text-muted italic">{note}</span>}
      </dd>
    </div>
  );
}

function PartyBlock({ title, parties }: { title: string; parties?: Party[] }) {
  if (!parties?.length) return null;
  return (
    <div>
      <h3 className="mb-2 font-sans text-xs font-semibold text-muted">{title}</h3>
      <ul className="space-y-1.5">
        {parties.map((x) => (
          <li key={x.name}>
            <span className="font-semibold text-ink">{x.name}</span>
            {x.role && <span className="ml-2 text-sm text-muted">{titleCase(x.role)}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Owners with a stake bar, so the split reads at a glance. */
function OwnersBlock({ owners }: { owners?: Party[] }) {
  if (!owners?.length) return null;
  return (
    <div>
      <h3 className="mb-3 font-sans text-xs font-semibold text-muted">Owners</h3>
      <ul className="space-y-3">
        {owners.map((o) => (
          <li key={o.name}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold text-ink">{o.name}</span>
              {o.stakePct != null && <span className="tabular font-semibold text-ink">{o.stakePct}%</span>}
            </div>
            {o.stakePct != null && (
              <div className="mt-1.5 h-1.5 rounded-full bg-surface-2" aria-hidden>
                <div className="h-full rounded-[3px] bg-brand-navy" style={{ width: `${o.stakePct}%` }} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Sources({ project: p }: { project: Project }) {
  return (
    <Section
      id="sources"
      title="Sources"
      aside={
        <span className="tabular text-xs text-muted">
          Last updated {formatDate(p.lastUpdated)} · Data {p.dataVersion}
        </span>
      }
    >
      <ol className="space-y-3">
        {p.sources.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="tabular mt-0.5 text-xs text-muted">[{i + 1}]</span>
            <div>
              {s.url.startsWith("#") ? (
                <span className="font-medium text-ink">{s.title}</span>
              ) : (
                <a href={s.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-medium text-brand-blue hover:underline">
                  {s.title}
                  <ExternalLink className="size-3" aria-label="(opens in a new tab)" />
                </a>
              )}
              <div className="text-xs text-muted">
                {s.publisher} · retrieved {formatDate(s.retrievedAt)}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <Link
        href={`/corrections?record=${p.id}`}
        className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-sm font-medium text-ink hover:border-[#cdd6e2]"
      >
        <Flag className="size-3.5" aria-hidden />
        Report a correction
      </Link>
    </Section>
  );
}
