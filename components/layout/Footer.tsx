import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BRAND_DARK } from "@/components/brand/Mark";
import { DATA_AS_OF, DATA_VERSION } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { TECHNOLOGIES } from "@/lib/tech";
import { LogoOnDark } from "./Logo";

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

// Link groups. One grid row, so every section starts on the same line:
// four columns on desktop, 2×2 on tablets, stacked on phones.
const GROUPS: { title: string; links: FooterLink[]; twoCol?: boolean }[] = [
  {
    title: "Explore Perpetual",
    links: [
      { href: "/projects", label: "Project Explorer" },
      { href: "/deals", label: "Deal Tracker" },
      { href: "/policy", label: "Policy Map" },
      { href: "/statistics", label: "Statistics" },
    ],
  },
  {
    title: "Sectors",
    twoCol: true,
    links: TECHNOLOGIES.map((t) => ({ href: `/sectors/${t.id}`, label: t.label })),
  },
  {
    title: "About Perpetual",
    links: [
      { href: "/about", label: "About the Beta" },
      { href: "/methodology", label: "Methodology" },
      { href: "/corrections", label: "Report a Correction" },
    ],
  },
  {
    title: "Data & Credits",
    links: [
      { href: "/methodology#changelog", label: `Data Version ${DATA_VERSION}` },
      { href: "https://www.openstreetmap.org/copyright", label: "OpenStreetMap", external: true },
      { href: "https://openfreemap.org", label: "OpenFreeMap", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-dark mt-auto text-white" style={{ background: BRAND_DARK.footer }}>
      <div className="container-page">
        {/* Link groups */}
        <div className="grid gap-x-10 gap-y-12 pt-16 pb-4 md:grid-cols-2 lg:grid-cols-[1fr_1.35fr_1fr_1fr] lg:pt-20">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="mb-6 font-sans text-sm font-medium text-white/65">
                {g.title}
              </h2>
              <ul className={g.twoCol ? "grid grid-cols-2 gap-x-8 gap-y-4" : "space-y-4"}>
                {g.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener"
                        className="group inline-flex items-center gap-1.5 text-[1.05rem] text-white decoration-white/40 underline-offset-4 hover:underline"
                      >
                        {l.label}
                        <ArrowUpRight className="size-4 text-white/60 group-hover:text-white" aria-label="(opens in a new tab)" />
                      </a>
                    ) : (
                      <Link href={l.href} className="text-[1.05rem] text-white decoration-white/40 underline-offset-4 hover:underline">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Logo directly above the copyright line (Brookfield-style) */}
        <div className="mt-16 pb-8 md:mt-20">
          <Link href="/" className="inline-block" aria-label="Perpetual, All Things Renewables, home">
            <LogoOnDark size={34} bg={BRAND_DARK.footer} />
          </Link>
          <div className="mt-6 flex flex-col gap-2 text-sm text-white/75 md:flex-row md:items-center md:justify-between">
            <p>© {DATA_AS_OF.slice(0, 4)} Perpetual</p>
            <p className="text-white/60">Beta: all records are sample data. Not investment advice. Data compiled {formatDate(DATA_AS_OF)}.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
