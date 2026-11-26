import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SampleBadge } from "@/components/ui/Badge";
import { PolicyRanking } from "@/components/policy/PolicyRanking";
import { Lede, Paper, Statement } from "@/components/editorial/Editorial";
import { PageHero } from "@/components/ui/PageHero";
import { HERO_PHOTOS } from "@/lib/hero-photos";
import { getPolicyEvaluation } from "@/lib/data";
import { countryName } from "@/lib/format";
import { getPolicyRows } from "@/lib/policy";

export const metadata: Metadata = {
  title: "PROFITS Policy Map",
  description:
    "PROFITS scores how investable each country is for renewable energy across seven pillars, covering political, regulatory, offtake, financial, infrastructure, track record and social factors.",
};

export default function PolicyPage() {
  const rows = getPolicyRows(countryName);
  const ev = getPolicyEvaluation();
  return (
    <div>
      <PageHero
        photo={HERO_PHOTOS.policy}
        eyebrow="Policy"
        title="Where renewable investment is best supported"
        lede={`PROFITS scores ${rows.length} countries on seven pillars, from political commitment to social licence. Choose a deal type to re-weight the ranking, and open a country to see the evidence behind each pillar.`}
        aside={
          <Link href="/policy/method" className="group flex flex-wrap items-center justify-between gap-4">
            <span className="max-w-3xl">
              <span className="font-display text-xl font-light tracking-[-0.02em] text-[#1d2a22]">How the scores are built and tested.</span>
              {ev && (
                <span className="ml-2 text-[15px] text-soft">
                  Top scoring countries grew renewables by <span className="tabular text-accent">{Math.round(ev.growth.topMedian * 100)}%</span> from{" "}
                  {ev.fromYear} to {ev.toYear}, against {Math.round(ev.growth.bottomMedian * 100)}% for the lowest.
                </span>
              )}
            </span>
            <span className="inline-flex items-center gap-3 rounded-full border border-line bg-white/60 py-1.5 pr-1.5 pl-4 text-sm font-medium text-[#1d2a22] group-hover:bg-white">
              Read the method
              <span className="grid size-7 place-items-center rounded-full bg-[#1d2a22] text-[var(--home-paper)] transition-transform duration-200 group-hover:rotate-45" aria-hidden>
                <ArrowUpRight className="size-3.5" />
              </span>
            </span>
          </Link>
        }
      />
      <div className="container-page pb-24">

      {rows.length > 0 ? (
        <section aria-labelledby="ranking-h" className="pt-16 md:pt-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Statement id="ranking-h">Countries ranked by investment climate.</Statement>
                {rows.every((r) => r.isSample) && <SampleBadge />}
              </div>
              <Lede className="mt-3 text-base">
                Scores come from the Climate Policy Database, which draws on the IEA Policies Hub, along with World Bank
                indicators, IRENA statistics and our deal record.
              </Lede>
            </div>
            <Link
              href="/#policy"
              className="group inline-flex items-center gap-3 rounded-full border border-line bg-white/60 py-1.5 pr-1.5 pl-4 text-sm font-medium text-[#1d2a22] hover:bg-white"
            >
              See it on the globe
              <span className="grid size-7 place-items-center rounded-full bg-[#1d2a22] text-[var(--home-paper)] transition-transform duration-200 group-hover:rotate-45" aria-hidden>
                <ArrowUpRight className="size-3.5" />
              </span>
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

      <section aria-labelledby="reference-h" className="mt-20 border-t border-line pt-10 md:mt-28 md:pt-14">
        <Statement id="reference-h">The data behind the scores.</Statement>
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
    </div>
  );
}

const REFERENCES: [string, string][] = [
  ["World Bank WGI", "Political stability, government effectiveness, regulatory quality, rule of law, voice and accountability, control of corruption (pillars P, R and S)"],
  ["World Bank WDI", "GDP growth, inflation, exchange rates, lending rates, electricity access and grid losses (pillars O, F and I)"],
  ["IRENA statistics", "Installed renewable capacity, growth and electricity generation (pillars O, I and T)"],
  ["Perpetual deal record", "Renewable financings recorded in the last five years (pillar T)"],
  ["World Bank RISE, BNEF Climatescope, EY RECAI", "Cross-checks when a country receives a researched score"],
  ["Rating agencies and grid operators", "Sovereign credit, utility credit, curtailment and connection queues for researched scores"],
];
