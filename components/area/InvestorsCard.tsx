import Link from "next/link";
import type { InvestorSummary } from "@/lib/data";
import { formatMoney } from "@/lib/format";

/** "Most Active Investors and Lenders" list (deal count and disclosed value). */
export function InvestorsCard({
  investors,
  title = "Most Active Investors and Lenders",
  level = 2,
}: {
  investors: InvestorSummary[];
  title?: string;
  /** Heading level, so the card can sit under a section heading. */
  level?: 2 | 3;
}) {
  const H = level === 3 ? "h3" : "h2";
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <H className={level === 3 ? "font-sans text-lg font-semibold text-ink" : "text-xl font-semibold tracking-[-0.02em]"}>{title}</H>
        <Link href="/deals" className="text-sm font-medium text-brand-blue hover:underline">
          All deals
        </Link>
      </div>
      {investors.length ? (
        <ol className="divide-y divide-line rounded-[var(--radius)] border border-line">
          {investors.map((x, i) => (
            <li key={x.name} className="flex items-center gap-4 px-5 py-3.5">
              <span className="tabular w-5 text-sm text-muted">{i + 1}</span>
              <span className="min-w-0 flex-1 truncate font-semibold text-ink">{x.name}</span>
              <span className="tabular text-sm text-muted">
                {x.deals} deal{x.deals === 1 ? "" : "s"}
              </span>
              <span className="tabular w-24 text-right text-sm font-semibold text-ink">{x.usd ? formatMoney(x.usd, "USD") : "Undisclosed"}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="rounded-[var(--radius)] border border-dashed border-line px-5 py-8 text-center text-sm text-muted">No deals tracked here yet.</p>
      )}
    </section>
  );
}
