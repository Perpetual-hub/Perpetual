import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { DEAL_BREAKERS, PILLARS, WEIGHT_PRESETS } from "@/data/policy";
import { countryName } from "@/lib/format";
import { getCountryPolicy, getPolicyRows, rankPolicies, weightedScore } from "@/lib/policy";

const SOURCE_LABEL: Record<string, string> = {
  cpdb: "Climate Policy Database",
  wgi: "World Bank WGI",
  wdi: "World Bank WDI",
  irena: "IRENA",
  deals: "Perpetual deals",
};

/** One collapsible block with a hairline frame. Closed by default. */
function Fold({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) {
  return (
    <details className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center gap-3 py-4 [&::-webkit-details-marker]:hidden">
        <span className="font-sans text-base font-semibold text-ink">{title}</span>
        {count != null && <span className="tabular rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted">{count}</span>}
        <ChevronDown className="ml-auto size-5 text-muted transition-transform duration-200 group-open:rotate-180" aria-hidden />
      </summary>
      <div className="pb-6">{children}</div>
    </details>
  );
}

/** PROFITS assessment for one country (server-rendered, utility-scale weights). */
export function CountryPolicyCard({ code, name }: { code: string; name: string }) {
  const c = getCountryPolicy(code);
  const preset = WEIGHT_PRESETS[1];
  const ranked = c ? rankPolicies(getPolicyRows(countryName), preset.weights) : [];
  const rank = ranked.find((r) => r.country === c?.country)?.rank;

  return (
    <section aria-labelledby="profits-h" className="border-t-2 border-brand-navy">
      <div className="flex flex-wrap items-baseline justify-between gap-3 pt-6 pb-6">
        <div>
          <h2 id="profits-h" className="text-2xl font-bold tracking-tight">
            Policy Assessment
          </h2>
          <p className="mt-1 text-sm text-muted">How investable {name} is for renewable energy, scored with PROFITS.</p>
        </div>
        <Link href="/policy" className="group inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
          About PROFITS
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>

      {!c ? (
        <p className="border-y border-line py-6 text-sm text-muted">Not scored yet.</p>
      ) : (
        <>
          <div className="grid border-y border-line md:grid-cols-[260px_minmax(0,1fr)]">
            {/* Overall score */}
            <div className="border-b border-line py-6 md:border-r md:border-b-0 md:pr-8">
              <p className="text-xs font-medium text-muted">PROFITS score</p>
              <p className="tabular mt-2 font-display text-6xl leading-none font-extrabold text-brand-navy">
                {weightedScore(c.scores, preset.weights).toFixed(1)}
                <span className="ml-1 text-xl font-semibold text-muted">/ 5</span>
              </p>
              {rank && (
                <p className="mt-3 text-sm text-ink">
                  Ranked <strong className="tabular">{rank}</strong> of {ranked.length} countries
                </p>
              )}
              <p className="mt-1 text-xs text-muted">Weighted for {preset.label} projects</p>
              <dl className="mt-6 space-y-2 border-t border-line pt-4 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Basis</dt>
                  <dd className="text-right text-ink">{c.isSample ? "Illustrative" : c.basis === "researched" ? "Researched" : "Published data"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Updated</dt>
                  <dd className="tabular text-ink">{c.assessedAt}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Deal-breakers</dt>
                  <dd className="text-right text-ink">
                    {c.dealBreakers.length
                      ? c.dealBreakers.map((d) => DEAL_BREAKERS.find((x) => x.id === d)?.title).join(", ")
                      : "None recorded"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Pillars */}
            <ul className="divide-y divide-line md:pl-8">
              {PILLARS.map((p) => (
                <li key={p.id} className="grid grid-cols-[1.75rem_minmax(0,1fr)_minmax(0,9rem)_2.5rem] items-center gap-3 py-3 text-sm sm:grid-cols-[1.75rem_minmax(0,1fr)_minmax(0,14rem)_2.5rem]">
                  <span className="font-display text-lg font-extrabold text-brand-navy">{p.id}</span>
                  <span className="truncate text-ink">{p.name}</span>
                  <span className="h-1.5 rounded-full bg-surface-2" aria-hidden>
                    <span className="block h-full rounded-full bg-brand-navy" style={{ width: `${(c.scores[p.id] / 5) * 100}%` }} />
                  </span>
                  <span className="tabular text-right font-semibold text-ink">{c.scores[p.id].toFixed(1)}</span>
                </li>
              ))}
            </ul>
          </div>

          {c.indicators && (
            <Fold title="Behind the Scores">
              <div className="divide-y divide-line border-y border-line">
                {PILLARS.map((p) => {
                  const reasons = (c.indicators?.[p.id] ?? []).map((i) => i.reason).filter(Boolean);
                  if (!reasons.length) return null;
                  return (
                    <div key={p.id} className="grid gap-3 py-4 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-8">
                      <p className="flex items-baseline gap-2.5 text-sm">
                        <span className="font-display text-lg font-extrabold text-brand-navy">{p.id}</span>
                        <span className="font-semibold text-ink">{p.name}</span>
                        <span className="tabular ml-auto text-muted md:ml-2">{c.scores[p.id].toFixed(1)}</span>
                      </p>
                      <ul className="space-y-1.5 text-sm leading-relaxed text-ink/85">
                        {reasons.map((r) => (
                          <li key={r} className="flex gap-2.5">
                            <span aria-hidden className="text-brand-blue">–</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Fold>
          )}

          {!!c.policies?.length && (
            <Fold title="Renewable Policies in Force" count={c.policies.length}>
              <ul className="divide-y divide-line border-y border-line">
                {c.policies.map((pol) => (
                  <li key={pol.title} className="grid gap-1 py-3 text-sm sm:grid-cols-[4rem_minmax(0,1fr)_12rem] sm:gap-4">
                    <span className="tabular text-muted">{pol.year ?? "—"}</span>
                    {pol.url ? (
                      <a href={pol.url} target="_blank" rel="noopener" className="font-medium text-ink underline-offset-2 hover:text-brand-blue hover:underline">
                        {pol.title}
                      </a>
                    ) : (
                      <span className="font-medium text-ink">{pol.title}</span>
                    )}
                    <span className="text-xs text-muted sm:text-right">{pol.instrument}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted">
                Source: Climate Policy Database 2025 (NewClimate Institute, Wageningen University and PBL, CC BY 4.0), which
                includes policies from the IEA Policies Hub.
              </p>
            </Fold>
          )}

          {c.indicators && (
            <Fold title="Underlying Data">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <caption className="sr-only">Indicators behind the PROFITS scores for {name}</caption>
                  <thead className="border-y border-line text-left text-xs text-muted">
                    <tr>
                      <th scope="col" className="py-2 pr-3 font-medium">Pillar</th>
                      <th scope="col" className="py-2 pr-3 font-medium">Indicator</th>
                      <th scope="col" className="py-2 pr-3 text-right font-medium">Value</th>
                      <th scope="col" className="py-2 pr-3 text-right font-medium">Year</th>
                      <th scope="col" className="py-2 pr-3 font-medium">Source</th>
                      <th scope="col" className="py-2 text-right font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {PILLARS.flatMap((p) =>
                      (c.indicators?.[p.id] ?? []).map((ind, i) => (
                        <tr key={`${p.id}-${ind.id}`}>
                          <td className="py-2 pr-3 font-display font-extrabold text-brand-navy">{i === 0 ? p.id : ""}</td>
                          <td className="py-2 pr-3 text-ink">{ind.name}</td>
                          <td className="tabular py-2 pr-3 text-right">
                            {ind.display ?? ind.value.toLocaleString("en-GB", { maximumFractionDigits: Math.abs(ind.value) >= 100 ? 0 : 2 })}
                          </td>
                          <td className="tabular py-2 pr-3 text-right text-muted">{ind.year}</td>
                          <td className="py-2 pr-3 text-xs text-muted">{SOURCE_LABEL[ind.source] ?? ind.source}</td>
                          <td className="tabular py-2 text-right font-semibold">{ind.score.toFixed(1)}</td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted">
                Each indicator is compared with every country that has data and scaled from 1 (lowest) to 5 (highest),
                reversed where lower is better. Yes or no indicators score 1, 3 or 5.
              </p>
            </Fold>
          )}
        </>
      )}
    </section>
  );
}
