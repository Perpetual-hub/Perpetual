import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialSection,
  Eyebrow,
  Lede,
  MetricBar,
  MetricCard,
  Paper,
  SourceNote,
  StepCard,
  Statement,
} from "@/components/editorial/Editorial";
import { PillarSpine } from "@/components/policy/PillarSpine";
import { DEAL_BREAKERS, PILLARS, WEIGHT_PRESETS, type PillarId } from "@/data/policy";
import { countryStats, getPolicyEvaluation } from "@/lib/data";
import { countryName } from "@/lib/format";
import { getPolicyRows, rankPolicies } from "@/lib/policy";

export const metadata: Metadata = {
  title: "PROFITS: Method & Evaluation",
  description:
    "How Perpetual scores each country's renewable investment climate across seven pillars, and how the scores compare with five years of real capacity growth and deal flow.",
};

const SOURCES = [
  ["Climate Policy Database", "Renewable targets and policies, including the IEA Policies Hub"],
  ["World Bank WGI", "Stability, regulatory quality, rule of law"],
  ["World Bank WDI", "Growth, inflation, lending rates, grid losses"],
  ["IRENA", "Installed capacity and generation"],
  ["Perpetual deal record", "Financings since 2021"],
] as const;

const pct = (v: number) => `${v >= 0 ? "+" : ""}${Math.round(v * 100)}%`;

export default function PolicyMethodPage() {
  const ev = getPolicyEvaluation();
  const rows = getPolicyRows(countryName);
  const top = rankPolicies(rows, WEIGHT_PRESETS[0].weights)[0];

  return (
    <div className="container-page pb-24">
      <header className="max-w-[56rem] pt-16 md:pt-24">
        <Eyebrow>Method &amp; Evaluation</Eyebrow>
        <Statement as="h1" className="mt-3">
          How Perpetual scores a country&rsquo;s renewable investment climate
        </Statement>
        <Lede className="mt-6">
          PROFITS rates every country the way an investor would: seven pillars, each scored 1 to 5 from published data,
          then weighted for the kind of deal being done. Here is how a score is built, and how the scores compare with what
          actually happened over the last five years.
        </Lede>
      </header>

      <EditorialSection
        id="build-h"
        title="From policy signals to an investable score."
        lede="A country can want renewables and still be hard to invest in. So each pillar is scored on its own evidence before the seven are combined."
      >
        <ol className="grid gap-3 lg:grid-cols-3">
          <StepCard
            n={1}
            label="Data sources"
            title="Start from published data."
            figure={
              <ul className="space-y-2">
                {SOURCES.map(([name, use]) => (
                  <li key={name} className="rounded-[3px] bg-white px-3.5 py-2.5">
                    <p className="text-sm font-medium text-ink">{name}</p>
                    <p className="text-[13px] text-soft">{use}</p>
                  </li>
                ))}
              </ul>
            }
            caption="Every indicator keeps its source and year, shown under each country."
          >
            Each pillar draws on indicators that anyone can check. Researched scores add rating agencies, grid operators and
            regulators&rsquo; own documents.
          </StepCard>
          <StepCard
            n={2}
            label="Pillar scoring"
            title="Score each pillar on its own."
            figure={top && <PillarBars scores={top.scores} />}
            caption={top ? `Example: ${top.name}, currently first with equal weights.` : undefined}
          >
            Indicators are converted to a 1 to 5 scale and averaged within their pillar. A weak grid cannot be hidden by a
            strong policy target.
          </StepCard>
          <StepCard
            n={3}
            label="Weighting"
            title="Weight for the deal being done."
            figure={<PresetBars />}
            caption="Weights are relative; each country's score is their weighted average."
          >
            A utility-scale developer cares most about regulation, offtake and finance. A rooftop deal lives or dies on its
            buyer. The same pillar scores give a different ranking for each.
          </StepCard>
        </ol>
      </EditorialSection>

      <EditorialSection id="pillars-h" title="Seven pillars," quiet="each scored 1 to 5.">
        <PillarSpine />
      </EditorialSection>

      <EditorialSection
        id="breakers-h"
        title="Three deal-breakers"
        quiet="override any score."
        lede="If any of these applies, a country is flagged whatever its total. On the globe it carries a dashed outline."
      >
        <ol className="grid gap-3 md:grid-cols-3">
          {DEAL_BREAKERS.map((d, i) => (
            <Paper as="li" key={d.id}>
              <p className="text-[13px] text-soft">Deal-breaker {i + 1}</p>
              <h3 className="mt-1.5 font-display text-lg font-semibold text-ink">{d.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{d.label}.</p>
            </Paper>
          ))}
        </ol>
      </EditorialSection>

      {ev && (
        <EditorialSection
          id="eval-h"
          title={`Tested against ${ev.toYear - ev.fromYear} years of`}
          quiet="real outcomes."
          lede={`If the scores capture something real, better-scoring countries should have added more renewable capacity and attracted more deals. We checked ${ev.countries} countries.`}
        >
          <div className="grid gap-3 lg:grid-cols-2">
            <MetricCard
              title="Capacity growth"
              description={`Median growth in installed renewable capacity, ${ev.fromYear} to ${ev.toYear}.`}
              value={pct(ev.growth.topMedian)}
              meaning={
                ev.growth.bottomMedian > 0
                  ? `Countries PROFITS rates highly grew their renewable capacity about ${Math.round(ev.growth.topMedian / ev.growth.bottomMedian)} times as fast.`
                  : "Countries PROFITS rates highly grew their renewable capacity faster."
              }
            >
              <MetricBar label="Top fifth by PROFITS score" value={ev.growth.topMedian} display={pct(ev.growth.topMedian)} max={ev.growth.topMedian} highlight />
              <MetricBar label="Bottom fifth by PROFITS score" value={ev.growth.bottomMedian} display={pct(ev.growth.bottomMedian)} max={ev.growth.topMedian} />
            </MetricCard>
            <MetricCard
              title="Deal flow"
              description="Share of countries with at least one renewable deal on record since 2021."
              value={`${Math.round(ev.anyDeal.top * 100)}%`}
              meaning="Capital is already finding the countries that score well, though not only them."
            >
              <MetricBar label="Top fifth by PROFITS score" value={ev.anyDeal.top} display={`${Math.round(ev.anyDeal.top * 100)}%`} max={1} highlight />
              <MetricBar label="Bottom fifth by PROFITS score" value={ev.anyDeal.bottom} display={`${Math.round(ev.anyDeal.bottom * 100)}%`} max={1} />
            </MetricCard>
            <MetricCard
              title="Deals per country"
              description="Median number of deals on record per country."
              value={fmtN(ev.deals.topMedian)}
              meaning={`A typical top-fifth country has ${fmtN(ev.deals.topMedian)} deals on record; a typical bottom-fifth country has ${fmtN(ev.deals.bottomMedian)}.`}
            >
              <MetricBar label="Top fifth by PROFITS score" value={ev.deals.topMedian} display={fmtN(ev.deals.topMedian)} max={ev.deals.topMedian || 1} highlight />
              <MetricBar label="Bottom fifth by PROFITS score" value={ev.deals.bottomMedian} display={fmtN(ev.deals.bottomMedian)} max={ev.deals.topMedian || 1} />
            </MetricCard>
            <MetricCard
              title="Rank agreement"
              description="Spearman correlation between a country's PROFITS rank and its outcome rank. 1 would be identical order, 0 no relation."
              value={ev.deals.rho.toFixed(2)}
              meaning="A clear but moderate link. Scores point in the right direction; they are not a forecast."
            >
              <MetricBar label="PROFITS score vs deals on record" value={ev.deals.rho} display={ev.deals.rho.toFixed(2)} max={1} highlight />
              <MetricBar label="PROFITS score vs capacity growth" value={ev.growth.rho} display={ev.growth.rho.toFixed(2)} max={1} />
            </MetricCard>
          </div>
          <SourceNote>
            <a href={countryStats.source.url}>{countryStats.source.citation}</a>; Perpetual deal record. Fifths contain{" "}
            {ev.growth.quintileSize} countries each.
          </SourceNote>
          <div className="mt-8 max-w-[46rem] space-y-4 text-[17px] leading-relaxed text-ink">
            <p>
              The test scores countries on six pillars, leaving out Track record, because that pillar is built from the same
              capacity and deal data we test against. Countries with less than 50 MW of renewables in {ev.fromYear} are left
              out, since growth from a very small base says little.
            </p>
            <p>
              These are correlations, not causes. Large, wealthy markets score well and also attract deals, and our deal record
              leans towards deals reported in English. We repeat the test each time scores or data are updated.
            </p>
          </div>
        </EditorialSection>
      )}

      <EditorialSection id="next-h" title="See the scores." quiet="Country by country.">
        <Link
          href="/policy"
          className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy"
        >
          Country ranking
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </EditorialSection>
    </div>
  );
}

const fmtN = (v: number) => v.toLocaleString("en-GB", { maximumFractionDigits: 1 });

function PillarBars({ scores }: { scores: Record<PillarId, number> }) {
  return (
    <div className="rounded-[3px] bg-white p-4">
      <div className="flex h-36 items-end gap-2" role="img" aria-label={`Pillar scores: ${PILLARS.map((p) => `${p.name} ${scores[p.id]}`).join(", ")}`}>
        {PILLARS.map((p) => (
          <div key={p.id} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="tabular text-[11px] text-soft">{scores[p.id].toFixed(1)}</span>
            <span className="w-full bg-accent" style={{ height: `${(scores[p.id] / 5) * 100}px` }} />
            <span className="text-xs font-semibold text-ink">{p.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PresetBars() {
  const max = Math.max(...WEIGHT_PRESETS.flatMap((w) => Object.values(w.weights)));
  return (
    <div className="space-y-3 rounded-[3px] bg-white p-4">
      {WEIGHT_PRESETS.map((w) => (
        <div key={w.id}>
          <p className="text-[13px] text-ink">{w.label}</p>
          <div className="mt-1.5 flex h-8 items-end gap-1" role="img" aria-label={`${w.label} weights: ${PILLARS.map((p) => `${p.id} ${w.weights[p.id]}`).join(", ")}`}>
            {PILLARS.map((p) => (
              <span key={p.id} className="flex-1 bg-[#c9cfc6]" style={{ height: `${(w.weights[p.id] / max) * 100}%` }} title={`${p.name}: ${w.weights[p.id]}`} />
            ))}
          </div>
        </div>
      ))}
      <div className="flex gap-1 text-center text-[11px] font-semibold text-soft">
        {PILLARS.map((p) => (
          <span key={p.id} className="flex-1">
            {p.id}
          </span>
        ))}
      </div>
    </div>
  );
}
