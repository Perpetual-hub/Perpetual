import { ArrowLeft, ArrowRight, ArrowUpRight, Flag } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DealStatusBadge } from "@/components/deals/DealBadges";
import { FactGrid, Section } from "@/components/ui/Section";
import { SampleBadge } from "@/components/ui/Badge";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import { TechTag } from "@/components/ui/TechTag";
import { getDeal, getDeals } from "@/lib/data";
import { DEAL_TYPE_LABEL, countryName, formatDate, formatMW, formatMoney, titleCase } from "@/lib/format";
import type { Deal, Party } from "@/lib/types";
import { TECH_BY_ID } from "@/lib/tech";
import { TECH_PHOTOS } from "@/lib/tech-photos";

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
  const photo = TECH_PHOTOS[d.technologies[0]];
  const related = getDeals()
    .filter((x) => x.id !== d.id && x.technologies.some((t) => d.technologies.includes(t)))
    .slice(0, 4);

  return (
    <article>
      <header className="on-dark relative isolate overflow-hidden bg-hero text-hero-ink">
        {photo && (
          <Image src={photo.src} alt="" fill priority sizes="100vw" quality={75} className="-z-20 object-cover" style={{ objectPosition: photo.position ?? "center" }} />
        )}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(14,22,17,0.94) 0%, rgba(14,22,17,0.82) 50%, rgba(14,22,17,0.45) 100%), linear-gradient(0deg, rgba(14,22,17,0.6) 0%, rgba(14,22,17,0) 50%)",
          }}
        />
        <div className="container-page pt-10 pb-14 md:pt-14 md:pb-20">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm">
            <Link href="/deals" className="inline-flex items-center gap-1 text-hero-muted hover:text-hero-ink">
              <ArrowLeft className="size-3.5" aria-hidden />
              Deal Tracker
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase">
            <span className="flex items-center gap-2.5 text-hero-ink">
              <span className="size-1.5 rounded-full bg-current" aria-hidden />
              {DEAL_TYPE_LABEL[d.type]}
            </span>
            <span className="text-hero-muted">{formatDate(d.date)}</span>
            <DealStatusBadge status={d.status} />
            {d.isSample && <SampleBadge />}
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-[2.2rem] leading-[1.04] font-light tracking-[-0.035em] text-hero-ink sm:text-[3rem] lg:text-[3.8rem]">
            {d.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-hero-ink/85">{d.summary}</p>
          {d.sources[0] && !d.sources[0].url.startsWith("#") && (
            <a
              href={d.sources[0].url}
              target="_blank"
              rel="noopener"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 py-1.5 pr-1.5 pl-4 text-sm font-medium text-hero-ink backdrop-blur hover:bg-white/15"
            >
              Read the news
              <span className="text-hero-muted">{d.sources[0].publisher}</span>
              <span className="grid size-7 place-items-center rounded-full bg-hero-ink text-[#1d2a22] transition-transform duration-200 group-hover:rotate-45" aria-hidden>
                <ArrowUpRight className="size-3.5" />
              </span>
            </a>
          )}
          <dl className="mt-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-4">
            <HeadStat label="Value" value={d.value?.disclosed ? formatMoney(d.value.amount, d.value.currency) : "Undisclosed"} />
            {d.value?.disclosed && d.value.usd && d.value.currency !== "USD" && (
              <HeadStat label="In USD" value={formatMoney(d.value.usd, "USD")} note={d.value.fxDate && `FX of ${formatDate(d.value.fxDate)}`} />
            )}
            {d.stakePct != null && <HeadStat label="Stake" value={`${d.stakePct}%`} />}
            {d.capacityMW != null && <HeadStat label="Capacity" value={formatMW(d.capacityMW)} />}
          </dl>
        </div>
        {photo?.credit && (
          <p className="absolute right-4 bottom-3 text-[11px] text-white/55 md:right-8 [&_a]:underline [&_a]:underline-offset-2">
            Photo of {TECH_BY_ID[d.technologies[0]].label.toLowerCase()} by{" "}
            <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
              {photo.credit}
            </a>
            {photo.license && <>, {photo.license}</>}
          </p>
        )}
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
              className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-sm font-medium text-ink hover:border-[#c3c5b8]"
            >
              <Flag className="size-3.5" aria-hidden />
              Report a correction
            </Link>
          </Section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-2xl font-light tracking-[-0.02em] text-[#1d2a22]">Related deals</h2>
          <ul className="space-y-3">
            {related.map((x) => (
              <li key={x.id}>
                <Link href={`/deals/${x.slug}`} className="group block rounded-[var(--radius)] border border-line bg-white/50 px-4 py-3 hover:border-[#c3c5b8] hover:bg-white">
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
    <div className="bg-[#16211b]/60 px-5 py-4">
      <dt className="text-xs text-hero-muted">{label}</dt>
      <dd className="tabular mt-1 font-display text-2xl font-light tracking-[-0.02em] text-hero-ink">{value}</dd>
      {note && <dd className="text-xs text-hero-muted">{note}</dd>}
    </div>
  );
}
