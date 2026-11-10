import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Prose, Toc } from "@/components/prose/Prose";
import { DATA_AS_OF, DATA_VERSION, changelog } from "@/lib/data";
import { STATUS_LABEL, formatDate } from "@/lib/format";
import { TECHNOLOGIES } from "@/lib/tech";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How Perpetual's data works: what we track, definitions, how sources are chosen, how numbers are handled, known limitations, corrections and the data changelog.",
};

const TOC = [
  { id: "what-we-track", label: "What we track" },
  { id: "definitions", label: "Definitions" },
  { id: "sources", label: "Sources" },
  { id: "numbers", label: "How numbers are handled" },
  { id: "limitations", label: "Limitations" },
  { id: "corrections", label: "Corrections" },
  { id: "changelog", label: "Changelog" },
  { id: "legal", label: "Legal note" },
];

const STATUS_DEFINITIONS: Record<string, string> = {
  announced: "A developer or government has publicly named the project, but it has no permits yet.",
  permitting: "The project is seeking or has secured key permits (environmental, land, grid connection), but has not raised its financing.",
  financing: "Permits are largely in place and the project is raising debt and equity. It has not reached financial close.",
  construction: "Financial close has happened, or physical work has started on site.",
  operating: "The project has reached commercial operation (COD) and sells power or product.",
  decommissioned: "The project has stopped operating permanently.",
  cancelled: "The developer or authority has stopped the project before it operated.",
};

export default function MethodologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Methodology"
        title="How the data works"
        intro={
          <>
            Plain language, honest about limits. Data version <strong className="text-ink">{DATA_VERSION}</strong>, compiled{" "}
            {formatDate(DATA_AS_OF)}.
          </>
        }
      />
      <div className="container-page grid gap-12 py-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <Toc items={TOC} />
        <Prose>
          <div className="rounded-[var(--radius)] border border-brand-sun/50 bg-brand-sun/10 px-5 py-4 text-[0.95rem] leading-relaxed">
            <strong>Beta notice.</strong> Every project, deal and news record currently on Perpetual is <strong>sample data</strong>,
            made up to test the design. The rules below describe how real data will be handled.
          </div>

          <h2 id="what-we-track">What we track</h2>
          <p>
            Perpetual tracks renewable energy <strong>projects</strong>, the <strong>deals</strong> that fund or change hands over
            them, and the <strong>news and policy</strong> that shapes them, across eight technologies:
          </p>
          <dl>
            {TECHNOLOGIES.map((t) => (
              <div key={t.id}>
                <dt>{t.label}</dt>
                <dd>{t.explainer}</dd>
              </div>
            ))}
          </dl>
          <h3>What counts as a project</h3>
          <p>
            A project is a single power plant, storage facility or hydrogen plant at one site, with one main technology, built or
            proposed by an identifiable developer. Large schemes built in phases are one project unless the phases have separate
            owners or financing, in which case each phase is its own record. Hybrid sites (for example solar plus storage) are split
            into one record per technology and linked through their deals.
          </p>
          <h3>What counts as a deal</h3>
          <p>
            A deal is a transaction tied to renewable assets or companies: mergers and acquisitions, project finance, equity raises,
            power purchase agreements (PPAs), IPOs, fund closes, joint ventures and refinancings. We record the parties, stake,
            value (if disclosed), capacity and the projects involved.
          </p>

          <h2 id="definitions">Definitions</h2>
          <h3>Project status</h3>
          <dl>
            {Object.entries(STATUS_DEFINITIONS).map(([k, v]) => (
              <div key={k}>
                <dt>{STATUS_LABEL[k as keyof typeof STATUS_LABEL]}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <h3>COD and financial close</h3>
          <p>
            <strong>Commercial operation date (COD)</strong> is the date a project starts selling its output under normal operating
            conditions. <strong>Financial close</strong> is the date all financing agreements are signed and the first funds can be
            drawn.
          </p>
          <h3>AC and DC capacity</h3>
          <p>
            Solar panels produce direct current (DC); inverters convert it to alternating current (AC) for the grid. DC capacity is
            usually 10–30% higher than AC. We record AC where we can and label every solar capacity with its basis.
          </p>
          <h3>Estimated and confirmed dates</h3>
          <p>
            A <strong>confirmed</strong> date has happened and is backed by a source. An <strong>estimated</strong> date is a plan or
            forecast, from the developer or from us, and should be read as a range. On timelines, confirmed dates are filled markers
            with solid lines; estimated ones are hollow with dashed lines. In charts, estimated dates count as{" "}
            <strong>forecast</strong> and confirmed ones as <strong>historical</strong>.
          </p>

          <h2 id="sources">Sources</h2>
          <p>
            Every record lists its sources: publisher, title, link and the date we retrieved it. We prefer primary sources
            (regulators, grid operators, company filings and announcements, lenders) over secondary reporting. When a fact comes from
            news coverage, we link to the original article and write our own short summary; we never copy article text.
          </p>

          <h2 id="numbers">How numbers are handled</h2>
          <ul>
            <li>
              <strong>Currencies:</strong> we keep the original currency and amount. Where we show a USD equivalent, the FX date
              appears next to it.
            </li>
            <li>
              <strong>Capacity:</strong> power in megawatts (MW) or gigawatts (GW = 1,000 MW). Storage also shows energy in MWh.
              Hydrogen capacity is the electrolyser&rsquo;s power input in MW, with output in tonnes per year where known.
            </li>
            <li>
              <strong>Totals:</strong> statistics are sums of the project records on Perpetual, so they cover only what we track. They
              are not national totals.
            </li>
          </ul>

          <h2 id="limitations">Limitations</h2>
          <ul>
            <li>Coverage is uneven: some countries and technologies publish far more than others.</li>
            <li>Many announced projects are never built. Pipeline totals are not forecasts of what will be built.</li>
            <li>Projects are often delayed; estimated dates can slip by years.</li>
            <li>Sources sometimes conflict. We record the most authoritative one and note the disagreement.</li>
            <li>Deal values are often undisclosed; we never estimate a value and present it as fact.</li>
          </ul>

          <h2 id="corrections">Corrections</h2>
          <p>
            Every record has a <Link href="/corrections">Report a correction</Link> link. We aim to review reports within five working
            days. Accepted corrections update the record, its &ldquo;last updated&rdquo; date and the changelog below.
          </p>

          <h2 id="changelog">Changelog</h2>
          <ol className="!list-none !pl-0">
            {changelog.map((c) => (
              <li key={c.version} className="rounded-[var(--radius)] border border-line px-5 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <strong className="tabular">{c.version}</strong>
                  <span className="text-sm text-muted">{formatDate(c.date)}</span>
                </div>
                <ul className="mt-2 text-[0.95rem]">
                  {c.changes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <h2 id="legal">Legal note</h2>
          <p>
            Perpetual is provided for information only and is <strong>not investment advice</strong>. Third-party content, including
            linked articles and reports, belongs to its owners; we link to originals and summarise in our own words. Photos are used
            under their stated licences, credited where they appear. Map data © OpenStreetMap contributors, OpenMapTiles,
            OpenFreeMap.
          </p>
        </Prose>
      </div>
    </>
  );
}
