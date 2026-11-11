import { ArrowLeft, ArrowRight, Flag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DealStatusBadge } from "@/components/deals/DealBadges";
import { FactGrid, Section } from "@/components/project/Section";
import { SampleBadge, StatusBadge } from "@/components/ui/Badge";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import { TechTag } from "@/components/ui/TechTag";
import { getDeal, getDeals, getProjectById } from "@/lib/data";
import { DEAL_TYPE_LABEL, countryName, formatDate, formatMW, formatMoney, titleCase } from "@/lib/format";
import type { Deal, Party } from "@/lib/types";

export function generateStaticParams() {
  return getDeals().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/deals/[slug]">): Promise<Metadata> {
  const d = getDeal((await params).slug);
  if (!d) return {};
  return { title: d.title, description: d.summary };
}

export default function DealPage({ params }: PageProps<"/deals/[slug]">) {
  // URL params sit behind Suspense so the shared App Shell can prefetch instantly.
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <DealContent params={params} />
    </Suspense>
  );
}

async function DealContent({ params }: { params: PageProps<"/deals/[slug]">["params"] }) {
  const d = getDeal((await params).slug);
  if (!d) notFound();
  const projects = (d.projectIds ?? []).map(getProjectById).filter((p) => !!p);
  const related = getDeals()
    .filter((x) => x.id !== d.id && x.technologies.some((t) => d.technologies.includes(t)))
    .slice(0, 4);

  return (
    <article>
      <header className="border-b border-line">
        <div className="container-page pt-10 pb-12 md:pt-14 md:pb-14">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm">
            <Link href="/deals" className="inline-flex items-center gap-1 text-muted hover:text-brand-blue">
              <ArrowLeft className="size-3.5" aria-hidden />
              Deal tracker
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-2.5 text-sm">
            <span className="font-semibold text-brand-blue">{DEAL_TYPE_LABEL[d.type]}</span>
            <span className="text-muted">{formatDate(d.date)}</span>
            <DealStatusBadge status={d.status} />
            {d.isSample && <SampleBadge />}
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl leading-[1.1] font-bold tracking-[-0.02em] md:text-[2.75rem]">{d.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/80">{d.summary}</p>
          <dl className="mt-8 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            <HeadStat label="Value" value={d.value?.disclosed ? formatMoney(d.value.amount, d.value.currency) : "Undisclosed"} />
            {d.value?.disclosed && d.value.usd && d.value.currency !== "USD" && (
              <HeadStat label="In USD" value={formatMoney(d.value.usd, "USD")} note={d.value.fxDate && `FX of ${formatDate(d.value.fxDate)}`} />
            )}
            {d.stakePct != null && <HeadStat label="Stake" value={`${d.stakePct}%`} />}
            {d.capacityMW != null && <HeadStat label="Capacity" value={formatMW(d.capacityMW)} />}
          </dl>
        </div>
      </header>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-12">
          <Section id="facts" title="Key Facts">
            <FactGrid
              facts={[
                ["Deal type", DEAL_TYPE_LABEL[d.type]],
                ["Status", <DealStatusBadge key="s" status={d.status} />],
                ["Date", formatDate(d.date)],
                ["Target", d.target],
                ["Sectors", <span key="t" className="flex flex-wrap gap-3">{d.technologies.map((t) => <TechTag key={t} tech={t} />)}</span>],
                ["Countries", d.countries.map(countryName).join(", ")],
                ["Region", d.region],
                [
                  "Value",
                  d.value?.disclosed ? (
                    <span key="v" className="tabular">
                      {formatMoney(d.value.amount, d.value.currency)}
                      {d.value.usd && d.value.currency !== "USD" && (
                        <span className="block text-xs font-normal text-muted">
                          ≈ {formatMoney(d.value.usd, "USD")}
                          {d.value.fxDate && ` at FX of ${formatDate(d.value.fxDate)}`}
                        </span>
                      )}
                    </span>
                  ) : (
                    "Undisclosed"
                  ),
                ],
                ["Stake", d.stakePct != null && `${d.stakePct}%`],
                ["Capacity", d.capacityMW != null && formatMW(d.capacityMW)],
              ]}
            />
          </Section>

          {d.details && (
            <Section id="details" title="Project Details">
              <p className="max-w-3xl leading-relaxed text-ink/85">{d.details}</p>
            </Section>
          )}

          {d.context && (
            <Section id="context" title="Context">
              <p className="max-w-3xl leading-relaxed text-ink/85">{d.context}</p>
            </Section>
          )}

          <Section id="parties" title="Parties">
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              <PartyList title={partyTitle(d, "buyers")} parties={d.buyers} />
              <PartyList title={partyTitle(d, "sellers")} parties={d.sellers} />
              <PartyList title="Advisers" parties={d.advisors} />
            </div>
          </Section>

          {projects.length > 0 && (
            <Section id="projects" title="Associated Projects">
              <ul className="divide-y divide-line rounded-[var(--radius)] border border-line">
                {projects.map((p) => (
                  <li key={p.id}>
                    <Link href={`/projects/${p.slug}`} className="group flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 hover:bg-surface-2">
                      <span className="min-w-0 flex-1 basis-full sm:basis-0">
                        <span className="block font-semibold text-ink group-hover:text-brand-blue">{p.name}</span>
                        <span className="block text-xs text-muted">{countryName(p.country)}</span>
                      </span>
                      <TechTag tech={p.technology} />
                      <StatusBadge status={p.status} />
                      <span className="tabular ml-auto w-20 text-right text-sm font-semibold">{formatMW(p.capacityMW)}</span>
                      <ArrowRight className="size-4 text-muted" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section id="sources" title="Sources">
            <ol className="space-y-3">
              {d.sources.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="tabular mt-0.5 text-xs text-muted">[{i + 1}]</span>
                  <div>
                    {s.url.startsWith("#") ? (
                      <span className="font-medium text-ink">{s.title}</span>
                    ) : (
                      <a href={s.url} target="_blank" rel="noopener" className="font-medium text-brand-blue underline underline-offset-2">
                        {s.title}
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
              href={`/corrections?record=${d.id}`}
              className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-sm font-medium text-ink hover:border-[#cdd6e2]"
            >
              <Flag className="size-3.5" aria-hidden />
              Report a correction
            </Link>
          </Section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-sans text-sm font-semibold text-ink">Related Deals</h2>
          <ul className="space-y-3">
            {related.map((x) => (
              <li key={x.id}>
                <Link href={`/deals/${x.slug}`} className="group block rounded-[var(--radius)] border border-line px-4 py-3 hover:border-[#cdd6e2]">
                  <div className="text-xs text-muted">
                    <span className="font-semibold text-brand-blue">{DEAL_TYPE_LABEL[x.type]}</span> · {formatDate(x.date)}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink group-hover:text-brand-blue">{x.title}</div>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/deals?tech=${d.technologies.join(",")}`} className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline">
            More {d.technologies.length === 1 ? d.technologies[0] : "related"} deals
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </aside>
      </div>
    </article>
  );
}

/** Buyer/seller wording depends on the deal type (a lender isn't a "buyer"). */
function partyTitle(d: Deal, side: "buyers" | "sellers") {
  const t = d.type;
  if (side === "buyers") {
    if (t === "project finance" || t === "refinancing" || t === "development finance") return "Lenders";
    if (t === "PPA") return "Offtaker";
    if (t === "fund close") return "Fund manager";
    if (t === "joint venture") return "Partners";
    if (t === "equity raise" || t === "IPO") return "Investors";
    return "Buyers";
  }
  if (t === "development finance") return "Borrower";
  return t === "PPA" ? "Seller of power" : "Sellers";
}

function PartyList({ title, parties }: { title: string; parties?: Party[] }) {
  if (!parties?.length) return null;
  return (
    <div>
      <h3 className="mb-2 font-sans text-xs font-semibold text-muted">{title}</h3>
      <ul className="space-y-1.5">
        {parties.map((p) => (
          <li key={p.name}>
            <Link href={`/deals?q=${encodeURIComponent(p.name)}`} className="font-semibold text-ink hover:text-brand-blue">
              {p.name}
            </Link>
            {p.role && <span className="ml-2 text-sm text-muted">{titleCase(p.role)}</span>}
            {p.stakePct != null && <span className="tabular ml-2 text-sm text-muted">{p.stakePct}%</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HeadStat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="tabular mt-1 font-display text-2xl font-bold tracking-tight text-brand-navy">{value}</dd>
      {note && <dd className="text-xs text-muted">{note}</dd>}
    </div>
  );
}
