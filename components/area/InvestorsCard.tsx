import Link from "next/link";
import type { InvestorSummary } from "@/lib/data";
import { formatMoney } from "@/lib/format";

/** "Most active investors and lenders" list (deal count and disclosed value). */
export function InvestorsCard({ investors, title = "Most active investors and lenders" }: { investors: InvestorSummary[]; title?: string }) {
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
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
