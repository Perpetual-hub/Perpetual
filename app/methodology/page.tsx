import { AlertTriangle, ArrowRight, Building2, FileSearch, Landmark, Scale } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc } from "@/components/prose/Prose";
import { StatusBadge } from "@/components/ui/Badge";
import { DEAL_BREAKERS, PILLARS, WEIGHT_PRESETS } from "@/data/policy";
import { DATA_AS_OF, DATA_VERSION, changelog, getDeals, getProjects } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { rampColor } from "@/lib/policy-colors";
import { TECHNOLOGIES } from "@/lib/tech";
import type { ProjectStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How Perpetual's data works: coverage, definitions, sources, the PROFITS policy framework, how numbers are handled, limitations, corrections and the data changelog.",
};

const TOC = [
  { id: "coverage", label: "Coverage" },
  { id: "definitions", label: "Definitions" },
  { id: "sources", label: "Sources" },
  { id: "profits", label: "PROFITS framework" },
  { id: "numbers", label: "Numbers and units" },
  { id: "limitations", label: "Limitations" },
  { id: "corrections", label: "Corrections" },
  { id: "changelog", label: "Changelog" },
  { id: "legal", label: "Legal" },
];

const STATUSES: [ProjectStatus, string][] = [
  ["announced", "Publicly named by a developer or government. No permits yet."],
  ["permitting", "Seeking or securing key permits: environmental, land and grid connection."],
  ["financing", "Permits largely in place; raising debt and equity. Not yet at financial close."],
  ["construction", "Financial close reached, or physical work has started on site."],
  ["operating", "Commercial operation reached; selling power or product."],
  ["decommissioned", "Stopped operating permanently."],
  ["cancelled", "Stopped by the developer or an authority before operating."],
];

const SCALE: [number, string, string][] = [
  [1, "Prohibitive", "Risks make most investment impractical without exceptional support."],
  [2, "Weak", "Significant gaps; investable only with strong mitigation such as DFI cover or guarantees."],
  [3, "Adequate", "A workable framework with notable risks that must be priced in."],
  [4, "Strong", "Clear, stable rules; risks are understood and manageable."],
  [5, "Best practice", "Among the most predictable and bankable markets for this pillar."],
];

export default function MethodologyPage() {
  const projectCount = getProjects().length;
  const dealCount = getDeals().length;
  const utility = WEIGHT_PRESETS.find((w) => w.id === "utility")!;
  // Worked example with hypothetical pillar scores (not any real country).
  const example = { P: 4, R: 3, O: 3.5, F: 2.5, I: 3, T: 4, S: 3.5 } as const;
  const sumW = PILLARS.reduce((s, p) => s + utility.weights[p.id], 0);
  const sumWS = PILLARS.reduce((s, p) => s + utility.weights[p.id] * example[p.id], 0);

  return (
    <>
      <PageHeader title="Methodology" intro="How Perpetual collects, defines and scores its data, and where its limits are.">
        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
          {[
            ["Data version", DATA_VERSION],
            ["Compiled", formatDate(DATA_AS_OF)],
            ["Projects", String(projectCount)],
            ["Deals", String(dealCount)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs text-muted">{k}</dt>
              <dd className="tabular mt-1 text-lg font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <div className="container-page grid gap-16 py-16 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-20">
        <Toc items={TOC} />
        <div className="min-w-0 space-y-24">
          <p className="max-w-3xl rounded-[var(--radius)] border border-brand-sun/50 bg-brand-sun/10 px-5 py-4 text-sm leading-relaxed text-ink">
            <strong>Beta.</strong> Every project, deal and policy score currently on Perpetual is sample data, created to test the
            design. The rules below describe how real data will be handled.
          </p>

          {/* Coverage */}
          <Block
            id="coverage"
            title="Coverage"
            lead="Perpetual tracks renewable energy projects, the transactions that fund or change hands over them, and how investable each country's policies are."
          >
            <div className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
              {TECHNOLOGIES.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.id} className="bg-white p-5">
                    <div className="flex items-center gap-2">
                      <Icon className="size-4" style={{ color: t.hex }} aria-hidden />
                      <h3 className="font-sans text-sm font-semibold text-ink">{t.label}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{t.short}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card title="What Counts as a Project">
                One power plant, storage facility or hydrogen plant at one site, in one main sector, built or proposed by an identifiable
                developer. Phases with separate owners or financing are separate projects; hybrid sites are split by sector and linked
                through their deals.
              </Card>
              <Card title="What Counts as a Deal">
                A transaction tied to renewable assets or companies: M&amp;A, project finance, equity raises, power purchase agreements,
                IPOs, fund closes, joint ventures and refinancings. We record parties, stake, value (if disclosed), capacity and the
                projects involved.
              </Card>
            </div>
          </Block>

          {/* Definitions */}
          <Block id="definitions" title="Definitions">
            <h3 className="mb-3 font-sans text-base font-semibold text-ink">Project Status</h3>
            <Table head={["Status", "Meaning"]}>
              {STATUSES.map(([s, d]) => (
                <tr key={s}>
                  <td className="w-48 px-5 py-3.5 align-top">
                    <StatusBadge status={s} />
                  </td>
                  <td className="px-5 py-3.5 text-sm text-ink/85">{d}</td>
                </tr>
              ))}
            </Table>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Card title="Commercial Operation (COD)">The date a project starts selling its output under normal operating conditions.</Card>
              <Card title="Financial Close">The date all financing agreements are signed and the first funds can be drawn.</Card>
              <Card title="AC and DC Capacity">
                Panels produce DC; inverters convert it to AC. DC is usually 10–30% higher. We record AC where possible and label the basis.
              </Card>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="flex gap-4 rounded-[var(--radius)] border border-line p-5">
                <span className="mt-1 size-4 shrink-0 rounded-full border-2 border-brand-blue bg-brand-blue" aria-hidden />
                <div>
                  <h3 className="font-sans text-sm font-semibold text-ink">Confirmed Date</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Has happened and is backed by a source. Shown as a filled marker; counted as historical in charts.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-[var(--radius)] border border-line p-5">
                <span className="mt-1 size-4 shrink-0 rounded-full border-2 border-[#9aabbf] bg-white" aria-hidden />
                <div>
                  <h3 className="font-sans text-sm font-semibold text-ink">Estimated Date</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    A plan or forecast; read it as a range. Shown as a hollow marker; counted as forecast in charts.
                  </p>
                </div>
              </div>
            </div>
          </Block>

          {/* Sources */}
          <Block
            id="sources"
            title="Sources"
            lead="Perpetual records facts, not other people's articles. Every record lists where each fact was published and when we retrieved it."
          >
            <div className="grid gap-6 md:grid-cols-3">
              <Feature icon={Building2} title="Primary Disclosures">
                Company and investor announcements, stock-exchange and regulatory filings, lenders and development banks.
              </Feature>
              <Feature icon={Landmark} title="Official Sources">
                Regulators, grid operators, auction results and government publications.
              </Feature>
              <Feature icon={FileSearch} title="Open Datasets">
                Used under their licence terms and credited on the records they inform.
              </Feature>
            </div>
          </Block>

          {/* PROFITS */}
          <Block
            id="profits"
            title="PROFITS Framework"
            lead="PROFITS scores how investable a country is for renewable energy, from an investor's point of view. Seven pillars are each scored 1 to 5, then combined with weights that depend on the type of deal."
          >
            <h3 className="mb-3 font-sans text-base font-semibold text-ink">The Seven Pillars and Their Weights</h3>
            <Table head={["Pillar", "Key question", "What we assess", ...WEIGHT_PRESETS.map((w) => w.label)]} numericFrom={3} minWidth={980}>
              {PILLARS.map((p) => (
                <tr key={p.id} className="align-top">
                  <th scope="row" className="w-52 px-5 py-4 text-left">
                    <span className="flex items-baseline gap-2.5">
                      <span className="font-display text-xl font-bold text-brand-blue">{p.id}</span>
                      <span className="text-sm font-semibold text-ink">{p.name}</span>
                    </span>
                  </th>
                  <td className="w-60 px-5 py-4 text-sm text-ink">{p.question}</td>
                  <td className="px-5 py-4">
                    <ul className="list-disc space-y-1 pl-4 text-sm text-muted">
                      {p.checks.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </td>
                  {WEIGHT_PRESETS.map((w) => (
                    <td key={w.id} className="tabular px-4 py-4 text-center text-sm">
                      <span className={w.weights[p.id] > 1 ? "font-semibold text-ink" : "text-muted"}>×{w.weights[p.id]}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </Table>
            <ul className="mt-4 space-y-1 text-sm text-muted">
              {WEIGHT_PRESETS.map((w) => (
                <li key={w.id}>
                  <strong className="font-semibold text-ink">{w.label}:</strong> {w.description}
                </li>
              ))}
              <li>Weights are relative: a pillar weighted ×2 counts twice as much as one weighted ×1.</li>
            </ul>

            <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 xl:grid-cols-2">
              <div>
                <h3 className="mb-3 font-sans text-base font-semibold text-ink">Scoring Scale</h3>
                <Table head={["Score", "Meaning", "What it signals"]}>
                  {SCALE.map(([n, label, d]) => (
                    <tr key={n} className="align-top">
                      <td className="w-20 px-5 py-3.5">
                        <span className="tabular inline-flex items-center gap-2 font-semibold">
                          <span className="size-2.5 rounded-full" style={{ background: rampColor(n) }} aria-hidden />
                          {n}
                        </span>
                      </td>
                      <td className="w-32 px-5 py-3.5 text-sm font-semibold text-ink">{label}</td>
                      <td className="px-5 py-3.5 text-sm text-muted">{d}</td>
                    </tr>
                  ))}
                </Table>
                <p className="mt-3 text-sm text-muted">Half points (e.g. 3.5) are allowed. On the map, low scores are red-orange and high scores green.</p>
              </div>

              <div>
                <h3 className="mb-3 font-sans text-base font-semibold text-ink">How the Total Is Calculated</h3>
                <div className="rounded-[var(--radius)] border border-line bg-surface-2 p-6">
                  <p className="text-sm text-muted">Weighted average of the seven pillar scores:</p>
                  <p className="tabular mt-3 font-display text-lg font-semibold text-ink">Score = Σ (weight × pillar score) ÷ Σ weights</p>
                  <p className="mt-6 text-xs font-semibold text-muted">Worked example ({utility.label} weights, hypothetical scores)</p>
                  <div className="mt-2 grid grid-cols-7 gap-1 text-center">
                    {PILLARS.map((p) => (
                      <div key={p.id} className="rounded-[3px] bg-white px-1 py-2">
                        <div className="text-xs font-bold text-brand-blue">{p.id}</div>
                        <div className="tabular text-sm font-semibold text-ink">{example[p.id]}</div>
                        <div className="tabular text-[11px] text-muted">×{utility.weights[p.id]}</div>
                      </div>
                    ))}
                  </div>
                  <p className="tabular mt-4 text-sm text-ink">
                    {sumWS.toFixed(2)} ÷ {sumW} = <strong className="text-base">{(sumWS / sumW).toFixed(2)}</strong>
                  </p>
                </div>
              </div>
            </div>

            <h3 className="mt-12 mb-3 font-sans text-base font-semibold text-ink">Deal-Breakers</h3>
            <p className="mb-4 max-w-3xl text-sm text-muted">Any one of these fails a country whatever its total. On the map they show as a dashed outline.</p>
            <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
              {DEAL_BREAKERS.map((d) => (
                <div key={d.id} className="rounded-[var(--radius)] border border-line p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <AlertTriangle className="size-4 shrink-0 text-[#9a6b00]" aria-hidden />
                    {d.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.label}.</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Feature icon={Scale} title="Supportive Is Not the Same as Investable">
                A country can set ambitious targets (a high P) and still be hard to invest in if contracts (R) and money (F) are uncertain.
                Keeping the pillars separate makes that gap visible.
              </Feature>
              <Feature icon={FileSearch} title="Reference Indices">
                Scores are checked against the World Bank&rsquo;s RISE indicators, BNEF Climatescope and EY RECAI, with IEA and IRENA for
                capacity and market data. Utility credit, curtailment and deal trends come from rating agencies, grid operators and deal
                records.
              </Feature>
            </div>
            <p className="mt-6 text-sm text-muted">
              In the beta, all country scores are illustrative placeholders, not assessments.{" "}
              <Link href="/policy" className="font-medium text-brand-blue underline underline-offset-2">
                View the policy assessment
              </Link>
            </p>
          </Block>

          {/* Numbers */}
          <Block id="numbers" title="Numbers and Units">
            <div className="grid gap-6 md:grid-cols-3">
              <Card title="Currencies">
                The original currency and amount are always kept. Where a USD equivalent is shown, the exchange-rate date appears beside it.
              </Card>
              <Card title="Capacity">
                Power in MW or GW (1 GW = 1,000 MW). Storage also shows energy in MWh. Hydrogen capacity is the electrolyser&rsquo;s input
                in MW, with output in tonnes per year where known.
              </Card>
              <Card title="Totals">
                Statistics are sums of the records on Perpetual, so they cover only what is tracked. They are not national totals.
              </Card>
            </div>
          </Block>

          {/* Limitations */}
          <Block id="limitations" title="Limitations">
            <ol className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line md:grid-cols-2">
              {[
                ["Uneven Coverage", "Some countries and sectors publish far more than others."],
                ["Pipeline Is Not a Forecast", "Many announced projects are never built."],
                ["Delays", "Estimated dates often slip, sometimes by years."],
                ["Conflicting Sources", "We record the most authoritative one and note the disagreement."],
                ["Undisclosed Values", "Deal values are often private; we never estimate one and present it as fact."],
                ["Policy Can Change Quickly", "Scores reflect the assessment date shown on each country."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4 bg-white p-5">
                  <span className="tabular font-display text-lg font-bold text-brand-blue">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-ink">{t}</h3>
                    <p className="mt-1 text-sm text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          {/* Corrections */}
          <Block id="corrections" title="Corrections">
            <ol className="grid gap-6 md:grid-cols-3">
              {[
                ["Report", "Use “Report a correction” on any record, with a source if you have one."],
                ["Review", "We check the report against the source given and others. We aim to review within five working days."],
                ["Record", "Accepted changes update the record and its date, and are listed in the changelog."],
              ].map(([t, d], i) => (
                <li key={t} className="border-t-2 border-brand-navy pt-4">
                  <span className="tabular text-xs font-semibold text-muted">Step {i + 1}</span>
                  <h3 className="mt-1 font-sans text-base font-semibold text-ink">{t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
                </li>
              ))}
            </ol>
            <Link
              href="/corrections"
              className="group mt-8 inline-flex items-center gap-1.5 border-b border-brand-blue/30 pb-0.5 text-sm font-semibold text-brand-blue hover:border-brand-blue"
            >
              Report a correction
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </Block>

          {/* Changelog */}
          <Block id="changelog" title="Changelog">
            <Table head={["Version", "Date", "Changes"]}>
              {changelog.map((c) => (
                <tr key={c.version} className="align-top">
                  <td className="tabular w-32 px-5 py-4 font-semibold text-ink">{c.version}</td>
                  <td className="tabular w-36 px-5 py-4 text-muted">{formatDate(c.date)}</td>
                  <td className="px-5 py-4">
                    <ul className="list-disc space-y-1 pl-4 text-sm text-ink/85">
                      {c.changes.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </Table>
          </Block>

          {/* Legal */}
          <Block id="legal" title="Legal">
            <p className="max-w-3xl rounded-[var(--radius)] bg-surface-2 p-6 text-sm leading-relaxed text-muted">
              Perpetual is provided for information only and is <strong className="text-ink">not investment advice</strong>. Linked filings,
              announcements and reports belong to their owners; we link to them as sources. Policy scores are an opinion framework, not a
              rating or a recommendation to invest. Photos are used under their stated licences, credited where they appear. Map data ©
              OpenStreetMap contributors, OpenMapTiles, OpenFreeMap.
            </p>
          </Block>
        </div>
      </div>
    </>
  );
}

function Block({ id, title, lead, children }: { id: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-28">
      <h2 id={id} className="scroll-mt-28 text-[1.75rem] leading-tight font-bold tracking-[-0.015em]">
        {title}
      </h2>
      {lead && <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">{lead}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border border-line p-5">
      <h3 className="font-sans text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line pt-5">
      <Icon className="size-5 text-brand-blue" aria-hidden />
      <h3 className="mt-3 font-sans text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  );
}

function Table({ head, children, numericFrom, minWidth = 560 }: { head: string[]; children: React.ReactNode; numericFrom?: number; minWidth?: number }) {
  return (
    <div tabIndex={0} role="region" aria-label={`Table: ${head.join(", ")}`} className="relative overflow-x-auto rounded-[var(--radius)] border border-line">
      <table className="w-full text-left" style={{ minWidth }}>
        <thead className="bg-surface-2">
          <tr>
            {head.map((h, i) => (
              <th key={h} scope="col" className={`px-5 py-3 text-xs font-semibold text-muted ${numericFrom != null && i >= numericFrom ? "text-center" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}
