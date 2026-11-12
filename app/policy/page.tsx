import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SampleBadge } from "@/components/ui/Badge";
import { PolicyRanking } from "@/components/policy/PolicyRanking";
import { Eyebrow, Lede, Paper, StepGlyph, Statement } from "@/components/editorial/Editorial";
import { getPolicyEvaluation } from "@/lib/data";
import { countryName } from "@/lib/format";
import { getPolicyRows } from "@/lib/policy";

export const metadata: Metadata = {
  title: "Policy Map: PROFITS",
  description:
    "PROFITS scores how investable each country is for renewable energy across seven pillars: political, regulatory, offtake, financial, infrastructure, track record and social.",
};

export default function PolicyPage() {
  const rows = getPolicyRows(countryName);
  const ev = getPolicyEvaluation();
  return (
    <div className="container-page pb-24">
      <header className="grid gap-10 pt-16 md:pt-24 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <div className="max-w-[52rem]">
          <Eyebrow>Policy</Eyebrow>
          <Statement as="h1" className="mt-3">
            Where renewable investment is best supported
          </Statement>
          <Lede className="mt-6">
            PROFITS scores {rows.length} countries on seven pillars, from political commitment to social licence. Choose a
            deal type to re-weight the ranking, and open a country to see the evidence behind each pillar.
          </Lede>
        </div>
        <Link href="/policy/method" className="group block rounded-[var(--radius)] bg-paper p-6 transition-colors hover:bg-[#e9ede5]">
          <StepGlyph n={3} tone="accent" />
          <p className="mt-4 text-[13px] text-soft">Method &amp; Evaluation</p>
          <p className="mt-1.5 font-display text-lg font-semibold text-ink">How the scores are built and tested</p>
          {ev && (
            <p className="mt-2 text-sm leading-relaxed text-soft">
              Top-scoring countries grew renewables by{" "}
              <span className="tabular text-accent">{Math.round(ev.growth.topMedian * 100)}%</span> from {ev.fromYear} to{" "}
              {ev.toYear}, against {Math.round(ev.growth.bottomMedian * 100)}% for the lowest.
            </p>
          )}
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink">
            Read the method
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
      </header>

      {rows.length > 0 ? (
        <section aria-labelledby="ranking-h" className="pt-16 md:pt-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Statement id="ranking-h" quiet="highest first.">
                  Country ranking,
                </Statement>
                {rows.every((r) => r.isSample) && <SampleBadge />}
              </div>
              <Lede className="mt-3 text-base">
                Scores come from the Climate Policy Database (which draws on the IEA Policies Hub), World Bank indicators,
                IRENA statistics and our deal record.
              </Lede>
            </div>
            <Link
              href="/#policy"
              className="group inline-flex items-center gap-1.5 rounded-[var(--radius)] bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy"
            >
              See it on the globe
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <PolicyRanking rows={rows} />
        </section>
      ) : (
        <section aria-labelledby="ranking-h" className="pt-16">
          <Paper>
            <Statement id="ranking-h">Country scores are being researched.</Statement>
            <Lede className="mt-3 text-base">Each country will be published with a score and the sources behind every pillar.</Lede>
          </Paper>
        </section>
      )}

      <section aria-labelledby="reference-h" className="pt-20 md:pt-28">
        <Statement id="reference-h" quiet="and what each is used for.">
          Reference data,
        </Statement>
        <dl className="mt-8 grid grid-cols-[minmax(0,1fr)] border-t border-line md:grid-cols-2">
          {REFERENCES.map(([name, use]) => (
            <div key={name} className="grid grid-cols-[minmax(0,1fr)] gap-1 border-b border-line py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6 md:odd:pr-8 md:even:pl-8">
              <dt className="text-sm font-semibold text-ink">{name}</dt>
              <dd className="text-sm leading-relaxed text-soft">{use}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

const REFERENCES: [string, string][] = [
  ["World Bank WGI", "Political stability, government effectiveness, regulatory quality, rule of law, voice and accountability, control of corruption (pillars P, R and S)"],
  ["World Bank WDI", "GDP growth, inflation, exchange rates, lending rates, electricity access and grid losses (pillars O, F and I)"],
  ["IRENA statistics", "Installed renewable capacity, growth and electricity generation (pillars O, I and T)"],
  ["Perpetual deal record", "Renewable financings recorded since 2021 (pillar T)"],
  ["World Bank RISE, BNEF Climatescope, EY RECAI", "Cross-checks when a country receives a researched score"],
  ["Rating agencies and grid operators", "Sovereign credit, utility credit, curtailment and connection queues for researched scores"],
];
