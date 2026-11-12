import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DEAL_TYPE_LABEL, formatDate, formatMoney } from "@/lib/format";
import type { Benchmark, CapitalLayer, HistoryEvent, OwnershipChange } from "@/lib/project-insights";

/** The project's life story: milestones and deals on one line, oldest first. */
export function ProjectHistory({ events }: { events: HistoryEvent[] }) {
  return (
    <ol className="relative border-l-2 border-line pl-6">
      {events.map((e, i) => {
        const est = e.confidence === "estimated";
        const body = (
          <>
            <div className="flex flex-wrap items-baseline gap-x-3 text-sm">
              <span className="tabular font-semibold text-ink">{formatDate(e.date)}</span>
              <span className={e.deal ? "font-medium text-brand-blue" : "font-medium text-ink"}>{e.label}</span>
              {est && <span className="text-xs text-muted italic">Estimated</span>}
              {e.deal?.status === "announced" && <span className="text-xs text-muted">Announced, not yet completed</span>}
            </div>
            {e.detail && <p className="mt-1 leading-snug text-ink/85 group-hover:text-brand-blue">{e.detail}</p>}
          </>
        );
        return (
          <li key={`${e.date}-${i}`} className="relative pb-6 last:pb-0">
            <span
              aria-hidden
              className={`absolute top-1 -left-[31px] size-3 rounded-full border-2 ${
                est ? "border-[#9aabbf] bg-white" : e.deal ? "border-brand-blue bg-white" : "border-brand-navy bg-brand-navy"
              }`}
            />
            {e.deal ? (
              <Link href={`/deals/${e.deal.slug}`} className="group block">
                {body}
              </Link>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Each change of hands as a row: who bought, from whom, how much. */
export function OwnershipHistory({ changes }: { changes: OwnershipChange[] }) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {changes.map((c) => (
        <li key={c.deal.id} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-baseline">
          <span className="tabular text-sm text-muted">{formatDate(c.date)}</span>
          <div className="text-sm">
            <span className="font-semibold text-ink">{c.buyers.join(", ") || "Undisclosed buyer"}</span>
            <span className="text-muted">{c.status === "announced" ? " agreed to take " : " took "}</span>
            <span className="font-semibold text-ink">{c.stakePct ? `${c.stakePct}%` : "a stake"}</span>
            {c.sellers.length > 0 && (
              <>
                <span className="text-muted"> from </span>
                <span className="font-semibold text-ink">{c.sellers.join(", ")}</span>
              </>
            )}
          </div>
          <Link href={`/deals/${c.deal.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline">
            Deal <ArrowRight className="size-3.5" aria-hidden />
          </Link>
          {c.stakePct != null && (
            <div className="h-1.5 bg-surface-2 sm:col-start-2" aria-hidden>
              <div className="h-full bg-brand-navy" style={{ width: `${c.stakePct}%` }} />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

const LAYER_COLOR: Record<CapitalLayer["kind"], string> = {
  "Senior debt": "var(--brand-navy)",
  "Development finance": "var(--brand-blue)",
  Refinancing: "#7d93ad",
  Equity: "var(--brand-green)",
  "Tax equity": "var(--brand-sky)",
};

/** Financing rounds; where amounts are stated in dollars, a bar shows the split. */
export function CapitalStack({ layers }: { layers: CapitalLayer[] }) {
  const priced = layers.filter((l) => l.usd);
  const total = priced.reduce((s, l) => s + l.usd!, 0);
  return (
    <div>
      {priced.length > 1 && (
        <div className="mb-5">
          <div className="flex h-3 overflow-hidden rounded-[3px]" role="img" aria-label="Share of stated financing by type">
            {priced.map((l) => (
              <span key={l.deal.id} style={{ width: `${(l.usd! / total) * 100}%`, background: LAYER_COLOR[l.kind] }} />
            ))}
          </div>
          <p className="mt-1.5 text-xs text-muted">Share of financing stated in US dollars: {formatMoney(total, "USD")}</p>
        </div>
      )}
      <ul className="divide-y divide-line border-y border-line">
        {layers.map((l) => (
          <li key={l.deal.id} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <div className="flex items-center gap-2 text-sm">
                <span aria-hidden className="size-2.5 rounded-[2px]" style={{ background: LAYER_COLOR[l.kind] }} />
                <span className="font-semibold text-ink">{l.kind}</span>
                <span className="tabular text-muted">· {formatDate(l.date)}</span>
              </div>
              <p className="mt-1 text-sm text-ink/80">{l.providers.length ? l.providers.join(", ") : "Providers not disclosed"}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="tabular font-display text-lg font-bold text-brand-navy">
                {l.amount && l.currency ? formatMoney(l.amount, l.currency) : "Undisclosed"}
              </span>
              <Link href={`/deals/${l.deal.slug}`} className="block text-xs font-medium text-brand-blue hover:underline">
                {DEAL_TYPE_LABEL[l.deal.type]}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function fmt(v: number, unit: Benchmark["unit"]) {
  if (unit === "USD/MW") return `${formatMoney(v, "USD")}/MW`;
  if (unit === "MW") return v >= 1000 ? `${(v / 1000).toLocaleString("en", { maximumFractionDigits: 2 })} GW` : `${v.toLocaleString("en", { maximumFractionDigits: 1 })} MW`;
  return v.toLocaleString("en", { maximumFractionDigits: 1 });
}

/** The project beside the median of comparable plants, as a pair of bars. */
export function Benchmarks({ items, techLabel }: { items: Benchmark[]; techLabel: string }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2">
      {items.map((b) => {
        const max = Math.max(b.value ?? 0, b.peerMedian ?? 0) || 1;
        return (
          <li key={b.label + b.scope} className="bg-white p-5 sm:[&:last-child:nth-child(odd)]:col-span-2">
            <p className="text-sm font-semibold text-ink">
              {b.label} <span className="font-normal text-muted">vs {techLabel.toLowerCase()} projects {b.scope}</span>
            </p>
            {b.rank && (
              <p className="mt-1 text-xs text-muted">
                Ranks {b.rank} of {b.peers + 1}
              </p>
            )}
            <dl className="mt-4 space-y-2.5 text-sm">
              <div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink">This project</dt>
                  <dd className="tabular font-semibold text-ink">{fmt(b.value ?? 0, b.unit)}</dd>
                </div>
                <div className="mt-1 h-2 bg-surface-2" aria-hidden>
                  <div className="h-full bg-brand-blue" style={{ width: `${((b.value ?? 0) / max) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Median of {b.peers} peers</dt>
                  <dd className="tabular text-muted">{fmt(b.peerMedian ?? 0, b.unit)}</dd>
                </div>
                <div className="mt-1 h-2 bg-surface-2" aria-hidden>
                  <div className="h-full bg-[#9aabbf]" style={{ width: `${((b.peerMedian ?? 0) / max) * 100}%` }} />
                </div>
              </div>
            </dl>
          </li>
        );
      })}
    </ul>
  );
}
