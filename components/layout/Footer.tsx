import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { BRAND_DARK } from "@/components/brand/Mark";
import { DATA_AS_OF, DATA_VERSION } from "@/lib/data";
import { CONTACT } from "@/lib/site";
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
      { href: "/about", label: "About Perpetual" },
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
          <div className="mt-6 flex flex-col gap-4 text-sm text-white/75 md:flex-row md:items-center md:justify-between">
            <p>© {DATA_AS_OF.slice(0, 4)} Perpetual</p>
            <div className="flex items-center gap-4">
              <span className="text-white/65">Connect With Us</span>
              <ul className="flex items-center gap-2">
                <li>
                  <SocialLink href={CONTACT.linkedin} label="LinkedIn">
                    <LinkedInIcon />
                  </SocialLink>
                </li>
                <li>
                  <SocialLink href={CONTACT.email ? `mailto:${CONTACT.email}` : null} label="Email">
                    <Mail className="size-[18px]" aria-hidden />
                  </SocialLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SOCIAL_BOX =
  "inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors";

function SocialLink({ href, label, children }: { href: string | null; label: string; children: React.ReactNode }) {
  if (!href) {
    return (
      <span role="img" className={`${SOCIAL_BOX} opacity-50`} title={`${label}, coming soon`} aria-label={`${label}, coming soon`}>
        {children}
      </span>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={external ? `${label} (opens in a new tab)` : label}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={`${SOCIAL_BOX} hover:border-white hover:bg-white hover:text-[#0a1f3a]`}
    >
      {children}
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[17px]" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
