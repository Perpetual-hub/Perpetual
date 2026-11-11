import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DEAL_BREAKERS, PILLARS, WEIGHT_PRESETS } from "@/data/policy";
import { getCountryPolicy, weightedScore } from "@/lib/policy";

/** PROFITS breakdown for one country (server-rendered, utility-scale weights). */
export function CountryPolicyCard({ code, name }: { code: string; name: string }) {
  const c = getCountryPolicy(code);
  const preset = WEIGHT_PRESETS[1];
  return (
    <section aria-labelledby="profits-h" className="rounded-[var(--radius)] border border-line p-6">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="profits-h" className="text-xl font-bold tracking-tight">
          Policy Assessment
        </h2>
        <Link href="/policy" className="group inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
          About PROFITS
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
      {!c ? (
        <p className="text-sm text-muted">Not scored yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <p className="text-xs text-muted">PROFITS score ({preset.label})</p>
            <p className="tabular mt-1 font-display text-5xl font-extrabold text-brand-navy">
              {weightedScore(c.scores, preset.weights).toFixed(1)}
              <span className="text-xl font-semibold text-muted"> / 5</span>
            </p>
            {c.isSample && (
              <p className="mt-3 rounded-lg border border-brand-sun/50 bg-brand-sun/10 px-3 py-2 text-xs leading-relaxed">
                <strong>Illustrative score</strong>, not an assessment of {name}.
              </p>
            )}
            <p className="mt-3 text-xs text-muted">
              {c.dealBreakers.length
                ? `Deal-breaker: ${c.dealBreakers.map((d) => DEAL_BREAKERS.find((x) => x.id === d)?.label).join(", ")}`
                : "No deal-breakers recorded."}
            </p>
          </div>
          <ul className="space-y-3">
            {PILLARS.map((p) => (
              <li key={p.id} className="grid grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)_2.5rem] items-center gap-3 text-sm">
                <span className="truncate text-ink">
                  <span className="mr-1.5 font-bold text-brand-blue">{p.id}</span>
                  {p.name}
                </span>
                <span className="h-2 rounded-r-[4px] bg-surface-2" aria-hidden>
                  <span className="block h-full rounded-r-[4px] bg-brand-navy" style={{ width: `${(c.scores[p.id] / 5) * 100}%` }} />
                </span>
                <span className="tabular text-right font-semibold">{c.scores[p.id].toFixed(1)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
