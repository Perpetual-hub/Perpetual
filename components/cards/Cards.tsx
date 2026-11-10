import Link from "next/link";
import { SampleBadge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import { DEAL_TYPE_LABEL, NEWS_CATEGORY_LABEL, formatDate, formatMW, formatMoney } from "@/lib/format";
import type { Deal, NewsItem } from "@/lib/types";

const cardBase =
  "group relative flex h-full flex-col rounded-[var(--radius)] border border-line bg-white transition-[border-color,box-shadow] duration-200 hover:border-[#cdd6e2] hover:shadow-[0_8px_24px_-14px_rgba(11,27,46,0.22)]";

function Meta({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">{children}</div>;
}

export function dealValue(d: Deal): string | undefined {
  if (!d.value?.disclosed) return undefined;
  return formatMoney(d.value.amount, d.value.currency);
}

/** Large editorial card for a featured deal. */
export function FeatureDealCard({ deal }: { deal: Deal }) {
  const value = dealValue(deal);
  return (
    <article className={`${cardBase} overflow-hidden`}>
      <div className="border-b border-line bg-surface-2 px-7 pt-7 pb-6">
        <Meta>
          <span className="font-semibold text-brand-blue">Featured Deal</span>
          <span>{formatDate(deal.date)}</span>
          {deal.isSample && <SampleBadge />}
        </Meta>
        <dl className="mt-6 grid grid-cols-3 gap-4">
          <BigStat label="Value" value={value ?? "Undisclosed"} />
          <BigStat label="Stake" value={deal.stakePct ? `${deal.stakePct}%` : "—"} />
          <BigStat label="Capacity" value={formatMW(deal.capacityMW)} />
        </dl>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-3 flex flex-wrap gap-3">
          {deal.technologies.map((t) => (
            <TechTag key={t} tech={t} />
          ))}
          <span className="text-xs text-muted">{DEAL_TYPE_LABEL[deal.type]}</span>
        </div>
        <h3 className="text-xl leading-snug font-bold tracking-tight md:text-2xl">
          <Link href={`/deals/${deal.slug}`} className="after:absolute after:inset-0">
            {deal.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{deal.summary}</p>
      </div>
    </article>
  );
}

function BigStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="tabular mt-1 font-display text-lg font-bold tracking-tight text-brand-navy md:text-xl">{value}</dd>
    </div>
  );
}

/** Large editorial card for a featured story. */
export function FeatureStoryCard({ item }: { item: NewsItem }) {
  return (
    <article className={`${cardBase} p-7`}>
      <Meta>
        <span className="font-semibold text-brand-blue">{NEWS_CATEGORY_LABEL[item.category]}</span>
        <span>{formatDate(item.date)}</span>
        {item.isSample && <SampleBadge />}
      </Meta>
      <h3 className="mt-6 text-2xl leading-[1.15] font-bold tracking-tight md:text-[2rem]">
        <Link href={`/news/${item.slug}`} className="after:absolute after:inset-0">
          {item.headline}
        </Link>
      </h3>
      <p className="mt-4 text-lg leading-relaxed text-muted">{item.summary}</p>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
        {item.technologies.map((t) => (
          <TechTag key={t} tech={t} />
        ))}
        <span className="ml-auto text-xs text-muted">Source: {item.source.publisher}</span>
      </div>
    </article>
  );
}

/** Compact card for news or deals. */
export function SmallCard({
  href,
  kicker,
  date,
  title,
  techs,
  isSample,
}: {
  href: string;
  kicker: string;
  date: string;
  title: string;
  techs: Deal["technologies"];
  isSample?: boolean;
}) {
  return (
    <article className={`${cardBase} p-5`}>
      <Meta>
        <span className="font-semibold text-brand-blue">{kicker}</span>
        <span>{formatDate(date, { year: false })}</span>
      </Meta>
      <h3 className="mt-3 font-sans text-[0.98rem] leading-snug font-semibold text-ink">
        <Link href={href} className="after:absolute after:inset-0 group-hover:text-brand-blue">
          {title}
        </Link>
      </h3>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
        {techs.slice(0, 2).map((t) => (
          <TechTag key={t} tech={t} size="xs" />
        ))}
        {isSample && <span className="ml-auto text-[11px] text-muted">Sample</span>}
      </div>
    </article>
  );
}
