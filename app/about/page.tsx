import { HERO_PHOTOS } from "@/lib/hero-photos";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Prose } from "@/components/prose/Prose";
import { DATA_VERSION } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Perpetual is an open platform for understanding renewable energy.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        photo={HERO_PHOTOS.about}
        eyebrow="About"
        title="All Things Renewable Energy, in One Place"
        intro="Perpetual is an open platform for understanding renewable energy, from the technologies that generate clean power to the markets, policies and investments that shape it."
      />
      <div className="container-page py-12">
        <Prose>
          <div className="rounded-[var(--radius)] border border-line bg-surface-2 px-5 py-4 text-[0.95rem] leading-relaxed">
            <strong>Open, sourced data.</strong> Statistics come from IRENA and the US Energy Information Administration, and deals
            from the World Bank and from development lenders&rsquo; own published data. Every record links to where it was
            published. Data version {DATA_VERSION}.
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
              See <Link href="/statistics">statistics</Link> by region, country and sector, including what is expected to come
              online in coming years.
            </li>
            <li>Follow renewable deals, financings and investors, and compare how investable each country&rsquo;s policies are.</li>
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
            We are connecting open datasets (checking each one&rsquo;s licence and freshness first), so the site updates
            itself. Accounts, watchlists and alerts may follow. Read the <Link href="/disclosure">disclosure page</Link> for how the data
            works.
          </p>
          <p className="text-sm text-muted">Perpetual is information only and not investment advice.</p>
        </Prose>
      </div>
    </>
  );
}
