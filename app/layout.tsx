import type { Metadata, Viewport } from "next";
import { Inter, Nunito, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Logo } from "@/components/layout/Logo";
import { getSectorSummary } from "@/lib/data";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});
// Nunito is the logo wordmark face (see components/layout/Logo.tsx).
// Logo wordmark only: not preloaded, so it never competes with body text on first paint.
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["800"], display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Perpetual — All Things Renewables",
    template: "%s · Perpetual",
  },
  description:
    "Renewable energy deals, new projects and how investable each country is, with a source behind every fact.",
  openGraph: { siteName: "Perpetual", type: "website" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds a `js` class before hydration.
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${nunito.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal styles only hide content when they can show it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-brand-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
          <Header logo={<Logo />} techCounts={getSectorSummary()} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
