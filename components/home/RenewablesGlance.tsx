// The state of renewables in one band, from IRENA's world totals: what was added last year, what it
// was made of, and how the total has grown. Every figure is computed from the published series.
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MetricBar, SourceNote, StepGlyph } from "@/components/editorial/Editorial";
import { ChapterHead, Display } from "@/components/home/Chapter";
import type { ReactNode } from "react";
import { TECH_BY_ID } from "@/lib/tech";
import type { CapacitySeries } from "@/lib/types";

const KEYS = ["solar", "wind", "hydro", "bioenergy", "geothermal"] as const;
const gw = (v: number) => `${Math.round(v).toLocaleString("en-GB")} GW`;

export function RenewablesGlance({ series }: { series: CapacitySeries }) {
  const r = series.rows;
  const now = r[r.length - 1];
  const prev = r[r.length - 2];
  const ten = r.find((x) => x.year === now.year - 10) ?? r[0];
  const added = now.total - prev.total;
  const addedPrev = prev.total - r[r.length - 3].total;
  const parts = KEYS.map((k) => ({ k, v: now[k] - prev[k] })).sort((a, b) => b.v - a.v);
  const solarShare = (now.solar - prev.solar) / added;
  const growth = now.total / ten.total;

  return (
    <section aria-labelledby="glance-h" className="home-paper home-rails">
      <div className="container-page pt-14 pb-16 md:pt-20 md:pb-24">
      <ChapterHead label={`The state of renewables, ${now.year}`} n={1} of={6} />
      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
        <Display id="glance-h">
          {gw(added)} added<span className="text-[#7d8a72]"> in {now.year}.</span>
        </Display>
        <p className="max-w-md text-lg leading-relaxed text-[#4f5a4c] lg:justify-self-end">
          The world added {gw(added)} of renewable power capacity in {now.year}, {Math.round(solarShare * 100)}% of it solar. That is{" "}
          {Math.round((added / addedPrev - 1) * 100)}% more than in {prev.year}; installed capacity has grown {growth.toFixed(1)} times in ten
          years, to {gw(now.total)}.
        </p>
      </div>
      <ol className="mt-12 grid gap-3 lg:grid-cols-3">
        <Card>
          <StepGlyph n={1} tone="accent" />
          <p className="mt-4 text-[13px] text-soft">Added in {now.year}</p>
          <p className="tabular mt-1 font-display text-[2.6rem] leading-none font-semibold tracking-[-0.02em] text-accent">{gw(added)}</p>
          <div className="mt-6 space-y-3">
            {parts.slice(0, 4).map((p) => (
              <MetricBar key={p.k} label={TECH_BY_ID[p.k].label} value={p.v} display={gw(p.v)} max={parts[0].v} highlight={p.k === parts[0].k} />
            ))}
          </div>
        </Card>
        <Card>
          <StepGlyph n={2} tone="accent" />
          <p className="mt-4 text-[13px] text-soft">Installed worldwide</p>
          <p className="tabular mt-1 font-display text-[2.6rem] leading-none font-semibold tracking-[-0.02em] text-accent">{gw(now.total)}</p>
          <div className="mt-6 flex h-[132px] items-end gap-[3px]" role="img" aria-label={`Installed renewable capacity from ${ten.year} to ${now.year}`}>
            {r.filter((x) => x.year >= ten.year).map((x) => (
              <span key={x.year} title={`${x.year}: ${gw(x.total)}`} className={`flex-1 ${x.year === now.year ? "bg-accent" : "bg-[#c9cfc6]"}`} style={{ height: `${(x.total / now.total) * 100}%` }} />
            ))}
          </div>
          <p className="mt-2 flex justify-between text-[12px] text-soft">
            <span>{ten.year}</span>
            <span>{now.year}</span>
          </p>
        </Card>
        <Card className="flex flex-col">
          <StepGlyph n={3} tone="accent" />
          <p className="mt-4 text-[13px] text-soft">Where to go next</p>
          <ul className="mt-3 flex-1 divide-y divide-[#dfe3dc]">
            {[
              ["/deals", "Follow the deals financing them"],
              ["/policy", "See which countries support them best"],
              ["/statistics", "Read the official statistics"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="group flex items-center justify-between gap-3 py-3 text-[15px] text-ink hover:text-brand-navy">
                  {label}
                  <ArrowRight className="size-4 shrink-0 text-soft transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </ol>
      <SourceNote>
        <a href={series.source.url}>{series.source.citation}</a>.
      </SourceNote>
      </div>
    </section>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <li className={`rounded-[14px] border border-[var(--home-rule)] bg-white/55 p-6 md:p-7 ${className}`}>{children}</li>;
}
