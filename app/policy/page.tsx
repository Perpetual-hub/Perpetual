import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PolicyRanking } from "@/components/policy/PolicyRanking";
import { PageHeader } from "@/components/prose/Prose";
import { DEAL_BREAKERS, PILLARS, WEIGHT_PRESETS } from "@/data/policy";
import { countryName } from "@/lib/format";
import { getPolicyRows } from "@/lib/policy";

export const metadata: Metadata = {
  title: "Policy map: PROFITS",
  description:
    "PROFITS scores how investable each country is for renewable energy across seven pillars: political, regulatory, offtake, financial, infrastructure, track record and social.",
};

export default function PolicyPage() {
  const rows = getPolicyRows(countryName);
  return (
    <>
      <PageHeader
        eyebrow="Policy map"
        title="How investable is each country?"
        intro="PROFITS looks at a country the way an investor would: seven pillars, each scored 1 to 5, then weighted for the kind of deal you are doing."
      />
      <div className="container-page space-y-14 py-12">
        <div className="flex flex-wrap items-start gap-4 rounded-[var(--radius)] border border-brand-sun/50 bg-brand-sun/10 px-5 py-4 text-sm leading-relaxed">
          <p className="max-w-3xl flex-1">
            <strong>Illustrative scores.</strong> The scores below are placeholders generated for the beta, so the design and the
            maths can be tested. They are <strong>not an assessment</strong> of any country. Researched scores, with sources for each
            pillar, will replace them.
          </p>
          <Link
            href="/#policy"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-brand-navy px-3.5 py-2 text-sm font-semibold text-white hover:bg-brand-blue"
          >
            See it on the globe
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <section aria-labelledby="ranking-h">
          <h2 id="ranking-h" className="mb-5 text-2xl font-bold tracking-tight">
            Ranking
          </h2>
          <PolicyRanking rows={rows} />
        </section>

        <section aria-labelledby="pillars-h">
          <h2 id="pillars-h" className="mb-2 text-2xl font-bold tracking-tight">
            The seven pillars
          </h2>
          <p className="mb-6 max-w-3xl text-muted">
            Each pillar is scored 1 (weak) to 5 (strong). A country can be strongly pro-renewable and still hard to invest in: high
            targets (P) mean little if contracts (R) and money (F) are uncertain, so the pillars are kept apart.
          </p>
          <ol className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line md:grid-cols-2">
            {PILLARS.map((p) => (
              <li key={p.id} className="bg-white p-6 md:last:col-span-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl font-extrabold text-brand-blue">{p.id}</span>
                  <h3 className="font-sans text-base font-semibold text-ink">{p.name}</h3>
                </div>
                <p className="mt-2 font-medium text-ink">{p.question}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                  {p.checks.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-2">
          <section aria-labelledby="weights-h">
            <h2 id="weights-h" className="mb-4 text-xl font-bold tracking-tight">
              Weights by deal type
            </h2>
            {/* Focusable so keyboard users can scroll it sideways on small screens. */}
            <div tabIndex={0} role="region" aria-label="Weights table (scrolls sideways)" className="overflow-x-auto rounded-[var(--radius)] border border-line">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs text-muted">
                    <th scope="col" className="px-4 py-2.5 font-medium">
                      Preset
                    </th>
                    {PILLARS.map((p) => (
                      <th key={p.id} scope="col" className="px-2 py-2.5 text-center font-medium" title={p.name}>
                        {p.id}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {WEIGHT_PRESETS.map((w) => (
                    <tr key={w.id}>
                      <th scope="row" className="px-4 py-3 text-left font-medium">
                        {w.label}
                        <div className="text-xs font-normal text-muted">{w.description}</div>
                      </th>
                      {PILLARS.map((p) => (
                        <td key={p.id} className="tabular px-2 py-3 text-center">
                          {w.weights[p.id]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted">Weights are relative: a pillar weighted 2 counts twice as much as one weighted 1.</p>
          </section>

          <section aria-labelledby="breakers-h">
            <h2 id="breakers-h" className="mb-4 text-xl font-bold tracking-tight">
              Deal-breakers
            </h2>
            <p className="mb-3 text-muted">These fail a country whatever its total score. On the globe they show as a dashed outline.</p>
            <ul className="space-y-2">
              {DEAL_BREAKERS.map((d) => (
                <li key={d.id} className="rounded-[var(--radius)] border border-line px-4 py-3 text-sm text-ink">
                  {d.label}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 mb-2 font-sans text-base font-semibold text-ink">Data to draw on</h3>
            <p className="text-sm leading-relaxed text-muted">
              Existing indices are useful starting points and checks: the World Bank&rsquo;s RISE indicators, BNEF Climatescope and EY
              RECAI, with IEA and IRENA for capacity and market data. Utility credit strength, curtailment and deal trends usually come
              from rating agencies, grid operators and deal records like Perpetual&rsquo;s own tracker.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
