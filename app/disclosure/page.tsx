import { ArrowRight, Building2, FileSearch, Landmark } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc } from "@/components/prose/Prose";
import { StatusBadge } from "@/components/ui/Badge";
import { DATA_AS_OF, DATA_VERSION, changelog, countryStats, getDeals } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { TECHNOLOGIES } from "@/lib/tech";
import type { ProjectStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "Disclosure",
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
  ["financing", "Permits largely in place, with debt and equity being raised. Not yet at financial close."],
  ["construction", "Financial close reached, or physical work has started on site."],
  ["operating", "Commercial operation reached and selling power or product."],
  ["decommissioned", "Stopped operating permanently."],
  ["cancelled", "Stopped by the developer or an authority before operating."],
];


export default function DisclosurePage() {
  const dealCount = getDeals().length;

  return (
    <>
      <PageHeader title="Disclosure" intro="Where every figure on Perpetual comes from, how it is defined and checked, and where its limits are.">
        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
          {[
            ["Data version", DATA_VERSION],
            ["Compiled", formatDate(DATA_AS_OF)],
            ["Countries", String(countryStats.all().length)],
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
          <p className="max-w-3xl rounded-[var(--radius)] border border-line bg-surface-2 px-5 py-4 text-sm leading-relaxed text-ink">
            <strong>Where the data comes from.</strong> Capacity statistics come from IRENA, projections from the US Energy
            Information Administration, and deals from the World Bank and from lenders&rsquo; own published (IATI) data. Every
            record links to its source. The rules below describe how every record is handled.
          </p>

          {/* Coverage */}
          <Block
            id="coverage"
            title="Coverage"
            lead="Perpetual tracks renewable energy projects, the transactions that fund or change hands over them, and how investable each country's policies are."
          >
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {TECHNOLOGIES.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.id} className="rounded-[var(--radius)] bg-paper p-5">
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
                developer. Phases with separate owners or financing are separate projects, and hybrid sites are split by sector and linked
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
                Panels produce DC, and inverters convert it to AC. DC is usually 10–30% higher. We record AC where possible and label the basis.
              </Card>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="flex gap-4 rounded-[var(--radius)] bg-paper p-5">
                <span className="mt-1 size-4 shrink-0 rounded-full border-2 border-brand-blue bg-brand-blue" aria-hidden />
                <div>
                  <h3 className="font-sans text-sm font-semibold text-ink">Confirmed Date</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Has happened and is backed by a source. Shown as a filled marker and counted as historical in charts.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-[var(--radius)] bg-paper p-5">
                <span className="mt-1 size-4 shrink-0 rounded-full border-2 border-[#9aabbf] bg-white" aria-hidden />
                <div>
                  <h3 className="font-sans text-sm font-semibold text-ink">Estimated Date</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    A plan or forecast, best read as a range. Shown as a hollow marker and counted as forecast in charts.
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

          {/* PROFITS lives on the Policy page */}
          <Block
            id="profits"
            title="PROFITS Framework"
            lead="Country scores use PROFITS, Perpetual's framework for how investable a country is for renewable energy. The framework, its weights, the deal-breakers and every country's score are explained in full on the Policy page."
          >
            <Link
              href="/policy"
              className="group inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue"
            >
              Open the PROFITS framework
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
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
                Country and regional statistics come from open public datasets such as IEA and IRENA, credited to each source. Project-level figures cover only what Perpetual tracks.
              </Card>
            </div>
          </Block>

          {/* Limitations */}
          <Block id="limitations" title="Limitations">
            <ol className="grid gap-3 md:grid-cols-2">
              {[
                ["Uneven Coverage", "Some countries and sectors publish far more than others."],
                ["Pipeline Is Not a Forecast", "Many announced projects are never built."],
                ["Delays", "Estimated dates often slip, sometimes by years."],
                ["Conflicting Sources", "We record the most authoritative one and note the disagreement."],
                ["Undisclosed Values", "Deal values are often private. We never estimate one and present it as fact."],
                ["Policy Can Change Quickly", "Scores reflect the assessment date shown on each country."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4 rounded-[var(--radius)] bg-paper p-5">
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
              announcements and reports belong to their owners, and we link to them as sources. Policy scores are an opinion framework, not a
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
    <div className="rounded-[var(--radius)] bg-paper p-5">
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
