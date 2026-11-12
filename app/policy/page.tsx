import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SampleBadge } from "@/components/ui/Badge";
import { PillarSpine } from "@/components/policy/PillarSpine";
import { PolicyRanking } from "@/components/policy/PolicyRanking";
import { PageHeader } from "@/components/prose/Prose";
import { DEAL_BREAKERS } from "@/data/policy";
import { countryName } from "@/lib/format";
import { getPolicyRows } from "@/lib/policy";

export const metadata: Metadata = {
  title: "Policy Map: PROFITS",
  description:
    "PROFITS scores how investable each country is for renewable energy across seven pillars: political, regulatory, offtake, financial, infrastructure, track record and social.",
};

export default function PolicyPage() {
  const rows = getPolicyRows(countryName);
  return (
    <>
      <PageHeader
        title="Policy Assessment"
        intro="PROFITS rates each country the way an investor would: seven pillars, each scored 1 to 5, weighted for the kind of deal you are doing. The framework comes first, then the results."
      />
      <div className="container-page space-y-16 py-10 md:py-14">
        <section aria-labelledby="pillars-h">
          <SectionHead id="pillars-h" title="The PROFITS Framework">
            A country can want renewables and still be hard to invest in, so each pillar is scored on its own before the
            seven are combined.
          </SectionHead>
          <PillarSpine />
        </section>

        <section aria-labelledby="breakers-h">
          <SectionHead id="breakers-h" title="Deal-Breakers">
            Any one of these fails a country whatever its total score. On the globe they show as a dashed outline.
          </SectionHead>
          <ol className="grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line md:grid-cols-3">
            {DEAL_BREAKERS.map((d, i) => (
              <li key={d.id} className="flex flex-col bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="tabular inline-flex size-7 items-center justify-center rounded-[var(--radius)] bg-[#fff1cc] text-xs font-bold text-[#7a5500]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans text-base font-semibold text-ink">{d.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{d.label}.</p>
              </li>
            ))}
          </ol>
        </section>

        {rows.length > 0 ? (
          <section aria-labelledby="ranking-h">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 id="ranking-h" className="text-2xl font-bold tracking-tight">
                    Country Ranking
                  </h2>
                  {rows.every((r) => r.isSample) && <SampleBadge />}
                </div>
                <p className="mt-2 max-w-3xl leading-relaxed text-muted">
                  The results: weighted PROFITS score for each country, highest first. Choose a deal type to change the
                  weights. Scores are computed from published data, including renewable policies recorded in the Climate
                  Policy Database (which draws on the IEA Policies Hub), World Bank indicators and IRENA statistics. Open
                  a country for the reasons behind each pillar.
                </p>
              </div>
              <Link
                href="/#policy"
                className="group inline-flex items-center gap-1.5 rounded-lg bg-brand-navy px-3.5 py-2 text-sm font-semibold text-white hover:bg-brand-blue"
              >
                See it on the globe
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
            <PolicyRanking rows={rows} />
          </section>
        ) : (
          <section
            aria-labelledby="ranking-h"
            className="grid gap-6 rounded-[var(--radius)] border border-line bg-surface-2 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8"
          >
            <div>
              <h2 id="ranking-h" className="text-2xl font-bold tracking-tight">
                Country Ranking
              </h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted">
                Country scores are being researched. Each country will be published with a score and the sources behind
                every pillar, starting with the largest renewable markets.
              </p>
            </div>
            <Link
              href="/statistics#countries-h"
              className="group inline-flex items-center gap-1.5 justify-self-start rounded-lg bg-brand-navy px-3.5 py-2 text-sm font-semibold text-white hover:bg-brand-blue"
            >
              Country statistics
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </section>
        )}

        <section aria-labelledby="reference-h">
          <SectionHead id="reference-h" title="Reference Data">
            Existing indices are starting points and cross-checks, not substitutes for pillar-by-pillar research.
          </SectionHead>
          <dl className="grid grid-cols-[minmax(0,1fr)] border-t border-line md:grid-cols-2">
            {REFERENCES.map(([name, use]) => (
              <div key={name} className="grid grid-cols-[minmax(0,1fr)] gap-1 border-b border-line py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6 md:odd:pr-8 md:even:pl-8">
                <dt className="text-sm font-semibold text-ink">{name}</dt>
                <dd className="text-sm leading-relaxed text-muted">{use}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
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

function SectionHead({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 id={id} className="text-2xl font-bold tracking-tight">
        {title}
      </h2>
      {children && <p className="mt-2 max-w-3xl leading-relaxed text-muted">{children}</p>}
    </div>
  );
}
