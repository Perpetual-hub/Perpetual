import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SampleBadge } from "@/components/ui/Badge";
import { PolicyRanking } from "@/components/policy/PolicyRanking";
import { PageHeader } from "@/components/prose/Prose";
import { DEAL_BREAKERS, PILLARS, WEIGHT_PRESETS } from "@/data/policy";
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
        intro="PROFITS looks at a country the way an investor would: seven pillars, each scored 1 to 5, then weighted for the kind of deal you are doing."
      />
      <div className="container-page space-y-16 py-10 md:py-14">
        <section aria-labelledby="ranking-h">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 id="ranking-h" className="text-2xl font-bold tracking-tight">
                  Country Ranking
                </h2>
                <SampleBadge />
              </div>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted">
                Weighted PROFITS score for each country, highest first. Choose a deal type to change the weights.
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

        <section aria-labelledby="pillars-h">
          <SectionHead id="pillars-h" title="Framework Pillars">
            Each pillar is scored 1 (weak) to 5 (strong). A country can be strongly pro-renewable and still hard to invest in: high
            targets (P) mean little if contracts (R) and money (F) are uncertain, so the pillars are kept apart.
          </SectionHead>
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

        <section aria-labelledby="weights-h">
          <SectionHead id="weights-h" title="Weights by Deal Type">
            Weights are relative: a pillar weighted 2 counts twice as much as one weighted 1. The weighted score is the sum of each
            pillar score times its weight, divided by the sum of the weights.
          </SectionHead>
          {/* Focusable so keyboard users can scroll it sideways on small screens. */}
          <div
            tabIndex={0}
            role="region"
            aria-label="Weights table (scrolls sideways)"
            className="relative overflow-x-auto rounded-[var(--radius)] border border-line"
          >
            <table className="w-full min-w-[760px] table-fixed text-sm">
              <thead className="bg-surface-2">
                <tr className="border-b border-line text-left">
                  <th scope="col" className="w-[37%] px-5 py-3 text-xs font-semibold text-muted">
                    Preset
                  </th>
                  {PILLARS.map((p) => (
                    <th key={p.id} scope="col" className="w-[9%] px-1 py-3 text-center align-bottom">
                      <span className="block font-display text-base font-bold text-brand-blue">{p.id}</span>
                      <span className="mt-0.5 block text-[11px] leading-tight font-medium text-muted">{p.name.split(" & ")[0]}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {WEIGHT_PRESETS.map((w) => {
                  const max = Math.max(...Object.values(w.weights));
                  const flat = Object.values(w.weights).every((v) => v === max);
                  return (
                    <tr key={w.id} className="align-middle">
                      <th scope="row" className="px-5 py-4 text-left align-top font-normal">
                        <span className="block font-semibold text-ink">{w.label}</span>
                        <span className="mt-1 block max-w-sm text-xs leading-relaxed text-muted">{w.description}</span>
                      </th>
                      {PILLARS.map((p) => {
                        const v = w.weights[p.id];
                        const top = !flat && v === max;
                        return (
                          <td key={p.id} className="px-2 py-4 text-center">
                            <span
                              className={`tabular inline-flex h-8 min-w-12 items-center justify-center rounded-[var(--radius)] px-2 ${
                                top ? "bg-brand-navy font-semibold text-white" : "text-ink"
                              }`}
                            >
                              {v}
                              <span className="sr-only">{top ? " (highest)" : ""}</span>
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted">Shaded cells mark the most heavily weighted pillars for each preset.</p>
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
  ["World Bank RISE", "Policy and regulatory indicators for renewable energy"],
  ["BNEF Climatescope", "Country-level clean energy investment attractiveness"],
  ["EY RECAI", "Renewable energy country attractiveness rankings"],
  ["IEA and IRENA", "Installed capacity, generation and market data"],
  ["Rating agencies", "Sovereign and utility credit strength"],
  ["Grid operators and deal records", "Curtailment, connection queues and transaction trends, including Perpetual\u2019s tracker"],
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
