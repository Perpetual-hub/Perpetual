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
            {c.basis === "indicators" && (
              <p className="mt-3 rounded-lg border border-line bg-surface-2 px-3 py-2 text-xs leading-relaxed text-muted">
                <strong className="text-ink">Data-based score.</strong> Computed from renewable policies in force, World Bank
                and IRENA data, compared with other countries. Updated {c.assessedAt}.
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
          {c.indicators && (
            <div className="md:col-span-2">
              <h3 className="font-sans text-base font-semibold text-ink">Why These Scores</h3>
              <ul className="mt-4 grid gap-x-10 gap-y-6 md:grid-cols-2">
                {PILLARS.map((p) => {
                  const reasons = (c.indicators?.[p.id] ?? []).map((i) => i.reason).filter(Boolean);
                  if (!reasons.length) return null;
                  return (
                    <li key={p.id}>
                      <p className="flex items-baseline gap-2 text-sm font-semibold text-ink">
                        <span className="font-display text-lg font-extrabold text-brand-blue">{p.id}</span>
                        {p.name}
                        <span className="tabular ml-auto text-sm text-muted">{c.scores[p.id].toFixed(1)} / 5</span>
                      </p>
                      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/85">
                        {reasons.map((r) => (
                          <li key={r} className="flex gap-2">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue/60" aria-hidden />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {!!c.policies?.length && (
            <div className="md:col-span-2">
              <h3 className="font-sans text-base font-semibold text-ink">Renewable Policies in Force</h3>
              <ul className="mt-3 divide-y divide-line rounded-[var(--radius)] border border-line">
                {c.policies.map((pol) => (
                  <li key={pol.title} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3 text-sm">
                    <span className="tabular w-10 text-muted">{pol.year ?? "—"}</span>
                    {pol.url ? (
                      <a href={pol.url} target="_blank" rel="noopener" className="min-w-0 flex-1 font-medium text-ink underline-offset-2 hover:text-brand-blue hover:underline">
                        {pol.title}
                      </a>
                    ) : (
                      <span className="min-w-0 flex-1 font-medium text-ink">{pol.title}</span>
                    )}
                    <span className="text-xs text-muted">{pol.instrument}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-muted">
                Source: Climate Policy Database 2025 (NewClimate Institute, Wageningen University and PBL, CC BY 4.0), which
                includes policies from the IEA Policies Hub.
              </p>
            </div>
          )}
          {c.indicators && (
            <details className="group md:col-span-2">
              <summary className="cursor-pointer text-sm font-medium text-brand-blue">Show the data behind each pillar</summary>
              <div className="mt-4 overflow-x-auto rounded-lg border border-line">
                <table className="w-full text-sm">
                  <caption className="sr-only">Indicators behind the PROFITS scores for {name}</caption>
                  <thead className="bg-surface-2 text-left text-xs text-muted">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-medium">Pillar</th>
                      <th scope="col" className="px-3 py-2 font-medium">Indicator</th>
                      <th scope="col" className="px-3 py-2 text-right font-medium">Value</th>
                      <th scope="col" className="px-3 py-2 text-right font-medium">Year</th>
                      <th scope="col" className="px-3 py-2 text-right font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {PILLARS.flatMap((p) =>
                      (c.indicators?.[p.id] ?? []).map((ind, i) => (
                        <tr key={`${p.id}-${ind.id}`}>
                          <td className="px-3 py-2 font-bold text-brand-blue">{i === 0 ? p.id : ""}</td>
                          <td className="px-3 py-2 text-ink">{ind.name}</td>
                          <td className="tabular px-3 py-2 text-right">
                            {ind.display ?? ind.value.toLocaleString("en-GB", { maximumFractionDigits: Math.abs(ind.value) >= 100 ? 0 : 2 })}
                          </td>
                          <td className="tabular px-3 py-2 text-right text-muted">{ind.year}</td>
                          <td className="tabular px-3 py-2 text-right font-semibold">{ind.score.toFixed(1)}</td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-muted">
                Sources: {c.sources.map((x) => x.title).join(", ")}. Each indicator is ranked against every country with data
                and scaled to 1 (lowest) to 5 (highest), reversed where lower is better.
              </p>
            </details>
          )}
        </div>
      )}
    </section>
  );
}
