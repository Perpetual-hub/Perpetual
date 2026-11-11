import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Prose } from "@/components/prose/Prose";
import { DATA_VERSION } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "What Perpetual is: an open map and record of renewable energy projects, deals and policy. Currently in beta.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Perpetual"
        intro="Perpetual follows the money behind the energy transition: what is being built, where, who is financing it, and which countries make it easiest to invest."
      />
      <div className="container-page py-12">
        <Prose>
          <div className="rounded-[var(--radius)] border border-brand-sun/50 bg-brand-sun/10 px-5 py-4 text-[0.95rem] leading-relaxed">
            <strong>This is a beta.</strong> Every project, deal and policy score on the site is <strong>sample data</strong>, invented
            to test the design and the data model. Names, owners, values and dates do not describe real projects or companies.
            Sample records carry a &ldquo;Sample data&rdquo; badge. Data version {DATA_VERSION}.
          </div>

          <h2 id="why">Purpose</h2>
          <p>
            Information about renewable projects is scattered across regulators, company announcements, lenders and the press. It
            is often paywalled, out of date, or impossible to trace back to a source. Perpetual brings it together in one open place,
            with a source behind every fact.
          </p>

          <h2 id="what">Coverage</h2>
          <ul>
            <li>
              <Link href="/projects">Explore projects</Link> on a map or in a table, filter by sector, status, country, capacity,
              ownership or financing, and download any view as CSV.
            </li>
            <li>
              See <Link href="/statistics">statistics</Link> by region, country and sector, including what is expected to come
              online in coming years.
            </li>
            <li>Follow the deals, financings and investors behind the projects, and compare how investable each country&rsquo;s policies are.</li>
          </ul>

          <h2 id="principles">Principles</h2>
          <ul>
            <li>
              <strong>Full disclosure.</strong> Every record shows its sources and when they were checked.
            </li>
            <li>
              <strong>Honest uncertainty.</strong> Estimated dates and forecasts are labelled as such.
            </li>
            <li>
              <strong>Correctable.</strong> Anyone can <Link href="/corrections">report a correction</Link>.
            </li>
          </ul>

          <h2 id="next">Roadmap</h2>
          <p>
            After the beta we will connect open datasets (checking each one&rsquo;s licence and freshness first), so the site updates
            itself. Accounts, watchlists and alerts may follow. Read the <Link href="/methodology">methodology</Link> for how the data
            works.
          </p>
          <p className="text-sm text-muted">Perpetual is information only and not investment advice.</p>
        </Prose>
      </div>
    </>
  );
}
