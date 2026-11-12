"use client";

import { List, Maximize2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MapPlaceholder } from "@/components/map/MapPlaceholder";
import { ProjectGlobeLazy } from "@/components/map/ProjectMapLazy";
import { PolicyPanel } from "@/components/policy/PolicyPanel";
import { WEIGHT_PRESETS, type PillarId } from "@/data/policy";
import type { MapPoint } from "@/lib/data";
import { POLICY_RAMP, rampColor, type PolicyScores } from "@/lib/policy-colors";
import { formatDate } from "@/lib/format";
import { rankPolicies } from "@/lib/policy-score";
import { TECHNOLOGIES, TECH_BY_ID } from "@/lib/tech";

type Mode = "deals" | "policy";

const PERIODS = [
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
  { days: 365, label: "12 months" },
] as const;

interface PolicyRow {
  country: string;
  name: string;
  scores: Record<PillarId, number>;
  dealBreakers: string[];
  isSample: boolean;
}

interface Props {
  /** Deals from the last 12 months as globe points (see getDealPoints). */
  points: MapPoint[];
  /** Days between each deal and the dataset date, keyed by deal id. */
  ages: Record<string, number>;
  policyRows: PolicyRow[];
  /** All deals on record. */
  totalDeals: number;
  rail: React.ReactNode;
}

export function HomeHero({ points, ages, policyRows, totalDeals, rail }: Props) {
  const [mode, setMode] = useState<Mode>("deals");
  const router = useRouter();
  const [days, setDays] = useState<number>(90);
  const [preset, setPreset] = useState(WEIGHT_PRESETS[1].id);
  const [policyPick, setPolicyPick] = useState<{ iso2: string; name: string } | null>(null);
  const [view, setView] = useState<"globe" | "list">("globe");
  const isWide = useMediaQuery("(min-width: 1024px)");

  // Deep link: /#policy opens the heatmap.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL hash once, browser-only
    if (window.location.hash === "#policy" && policyRows.length) setMode("policy");
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once on mount
  }, []);

  const modeOptions = [
    { id: "deals" as Mode, label: "Deals" },
    ...(policyRows.length ? [{ id: "policy" as Mode, label: "Policy Heatmap" }] : []),
  ];

  const filtered = useMemo(() => points.filter((p) => (ages[p.id] ?? Infinity) <= days), [points, ages, days]);

  const weights = WEIGHT_PRESETS.find((p) => p.id === preset)!.weights;
  const ranked = useMemo(() => rankPolicies(policyRows, weights), [policyRows, weights]);
  const policyScores: PolicyScores = useMemo(
    () =>
      Object.fromEntries(
        ranked.map((r) => [r.country, { score: r.score, rank: r.rank, flagged: r.dealBreakers.length > 0, isSample: r.isSample }]),
      ),
    [ranked],
  );

  const stats = useMemo(() => {
    const usd = filtered.reduce((s, p) => s + (p.deal?.usd ?? 0), 0);
    return {
      deals: filtered.length,
      usd,
      countries: new Set(filtered.map((p) => p.country)).size,
      sectors: new Set(filtered.map((p) => p.technology)).size,
    };
  }, [filtered]);

  const policyStats = useMemo(() => {
    const sorted = [...ranked].sort((a, b) => a.rank - b.rank);
    const sc = ranked.map((r) => r.score).sort((a, b) => a - b);
    const m = sc.length ? (sc.length % 2 ? sc[(sc.length - 1) / 2] : (sc[sc.length / 2 - 1] + sc[sc.length / 2]) / 2) : 0;
    return { top: sorted[0], median: m, flagged: ranked.filter((r) => r.dealBreakers.length > 0).length };
  }, [ranked]);

  const onSelect = useCallback((p: MapPoint) => p.deal && router.push(p.deal.href), [router]);
  const onPolicySelect = useCallback((iso2: string, name: string) => setPolicyPick({ iso2, name }), []);
  const presetLabel = WEIGHT_PRESETS.find((p) => p.id === preset)!.label;
  const periodLabel = PERIODS.find((p) => p.days === days)!.label;

  return (
    <section className="on-dark relative bg-hero text-hero-ink" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        Perpetual: the latest renewable energy deals around the world, and how investable each country is
      </h1>
      {/* Same centred grid as the header, so every edge lines up at any width. */}
      <div className="container-page grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
        <div className="flex min-w-0 flex-col">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-hero-line py-3">
            {modeOptions.length > 1 && (
              <Segmented
                label="Globe view"
                value={mode}
                onChange={(m) => {
                  setMode(m);
                  setView("globe");
                }}
                options={modeOptions}
              />
            )}
            {mode === "deals" ? (
              <div role="group" aria-label="Time period" className="flex flex-wrap gap-1.5">
                {PERIODS.map((p) => (
                  <Chip key={p.days} pressed={days === p.days} onClick={() => setDays(p.days)}>
                    {p.label}
                    <span className="tabular text-[11px] opacity-70">
                      {points.filter((x) => (ages[x.id] ?? Infinity) <= p.days).length}
                    </span>
                  </Chip>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-hero-muted">Weights for</span>
                <Segmented label="Weight preset" value={preset} onChange={setPreset} options={WEIGHT_PRESETS.map((p) => ({ id: p.id, label: p.label }))} />
              </div>
            )}
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                aria-pressed={view === "list"}
                onClick={() => setView((v) => (v === "globe" ? "list" : "globe"))}
                className="inline-flex items-center gap-1.5 rounded-[3px] border border-hero-line px-3 py-1.5 text-xs font-medium text-hero-ink transition-colors duration-150 hover:bg-white/5 aria-pressed:bg-white aria-pressed:text-brand-navy"
              >
                <List className="size-3.5" aria-hidden />
                List
              </button>
              <Link
                href={mode === "policy" ? "/policy" : "/deals"}
                className="hidden items-center gap-1.5 rounded-[3px] border border-hero-line px-3 py-1.5 text-xs font-medium text-hero-ink transition-colors duration-150 hover:bg-white/5 sm:inline-flex"
              >
                <Maximize2 className="size-3.5" aria-hidden />
                {mode === "policy" ? "Full ranking" : "All deals"}
              </Link>
            </div>
          </div>

          {/* Globe: auto-fitted to its box, so labels never sit on top of it */}
          <div className="starfield relative h-[68vh] min-h-[440px] lg:h-[calc(100svh-13rem)] lg:min-h-[600px]">
            {isWide === null ? (
              <MapPlaceholder theme="dark" />
            ) : view === "globe" ? (
              <ProjectGlobeLazy
                points={filtered}
                theme="dark"
                projection="globe"
                mode={mode === "policy" ? "policy" : "projects"}
                vivid
                autoRotate
                fitGlobe={0.94}
                initialView={{ center: [15, 16], zoom: 1.5 }}
                showControls={isWide}
                onSelect={onSelect}
                policy={policyScores}
                onPolicySelect={onPolicySelect}
                ariaLabel={
                  mode === "policy"
                    ? "Globe coloured by PROFITS policy score. Use the List button for a keyboard-friendly ranking."
                    : `Globe of renewable energy deals from the last ${periodLabel}, sized by deal value. Use the List button for a keyboard-friendly list.`
                }
              />
            ) : mode === "policy" ? (
              <PolicyList ranked={ranked} onSelect={(r) => setPolicyPick({ iso2: r.country, name: r.name })} />
            ) : (
              <DealList points={filtered} period={periodLabel} />
            )}
          </div>

          {/* Legend row, below the globe */}
          <div className="flex flex-col items-center gap-2 border-t border-hero-line py-4 text-center">
            {mode === "policy" ? <PolicyLegend /> : <SectorLegend points={filtered} period={periodLabel} />}
          </div>

          {/* Stats strip */}
          {mode === "policy" ? (
            <dl aria-live="polite" className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-hero-line py-6 sm:grid-cols-3 xl:grid-cols-5">
              <Stat label={`Top ranked, ${presetLabel.toLowerCase()} weights`} value={policyStats.top ? `${policyStats.top.name}` : "—"} />
              <Stat label="Top score (1–5)" value={policyStats.top ? policyStats.top.score.toFixed(2) : "—"} />
              <Stat label="Median score" value={policyStats.median ? policyStats.median.toFixed(2) : "—"} />
              <Stat label="Countries with a deal-breaker" value={String(policyStats.flagged)} />
              <Stat label="Countries scored" value={String(ranked.length)} />
            </dl>
          ) : (
          <dl aria-live="polite" className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-hero-line py-6 sm:grid-cols-3 xl:grid-cols-5">
            <Stat label={`Deals, last ${periodLabel}`} value={stats.deals.toLocaleString("en-GB")} />
            <Stat
              label="Disclosed value (USD deals)"
              value={stats.usd ? `$${stats.usd >= 1e9 ? `${(stats.usd / 1e9).toFixed(1)}bn` : `${Math.round(stats.usd / 1e6)}m`}` : "—"}
            />
            <Stat label="Countries" value={String(stats.countries)} />
            <Stat label="Sectors" value={String(stats.sectors)} />
            <Stat label="Deals on record" value={totalDeals.toLocaleString("en-GB")} />
          </dl>
          )}
        </div>

        {/* On wide screens the rail matches the globe column's height and scrolls inside it, so neither column leaves a gap. */}
        <aside aria-label="Latest deals" className="-mx-4 border-t border-hero-line md:-mx-8 lg:relative lg:mx-0 lg:border-t-0 lg:border-l lg:pl-2">
          <div className="lg:absolute lg:inset-0 lg:left-2">{rail}</div>
        </aside>
      </div>

      <PolicyPanel
        entry={policyPick ? (ranked.find((r) => r.country === policyPick.iso2) ?? null) : null}
        name={policyPick?.name ?? null}
        total={ranked.length}
        weights={weights}
        presetLabel={presetLabel}
        onClose={() => setPolicyPick(null)}
      />
    </section>
  );
}

function SectorLegend({ points, period }: { points: MapPoint[]; period: string }) {
  const present = TECHNOLOGIES.filter((t) => points.some((p) => p.technology === t.id));
  return (
    <>
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-[13px] text-hero-ink" aria-label="Sectors">
        {present.map((t) => (
          <li key={t.id} className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full" style={{ background: t.hex }} aria-hidden />
            {t.label}
          </li>
        ))}
      </ul>
      <p className="text-xs text-hero-muted">Deals from the last {period}, placed in the country of the assets. Circle size shows deal value.</p>
    </>
  );
}

function PolicyLegend() {
  const grad = `linear-gradient(90deg, ${POLICY_RAMP.map(([, c]) => c).join(", ")})`;
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pb-2 text-xs text-hero-ink">
      <div className="flex items-center gap-3">
        <span>Unsupportive</span>
        <span className="relative h-2 w-40 rounded-[2px]" style={{ background: grad }} aria-hidden>
          <span className="tabular absolute -bottom-4 left-0 text-[10px] text-hero-muted">1</span>
          <span className="tabular absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-hero-muted">3</span>
          <span className="tabular absolute right-0 -bottom-4 text-[10px] text-hero-muted">5</span>
        </span>
        <span>Supportive</span>
      </div>
      <span className="hidden h-5 w-px bg-hero-line sm:block" aria-hidden />
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Map key">
        <li className="inline-flex items-center gap-2">
          <span className="h-3 w-5 rounded-[2px] border border-white/15 bg-[#24364f]" aria-hidden />
          Not yet scored
        </li>
        <li className="inline-flex items-center gap-2">
          <span className="h-3 w-5 rounded-[2px] border-[1.5px] border-dashed border-[#f5b000]" aria-hidden />
          Deal-breaker
        </li>
      </ul>
    </div>
  );
}

function DealList({ points, period }: { points: MapPoint[]; period: string }) {
  const sorted = [...points].sort((a, b) => (b.deal?.date ?? "").localeCompare(a.deal?.date ?? ""));
  return (
    <div className="absolute inset-0 overflow-y-auto py-5">
      <div className="max-w-4xl">
        <p className="mb-3 text-xs text-hero-muted">{points.length} deals from the last {period}, newest first.</p>
        <ul className="divide-y divide-hero-line border-y border-hero-line">
          {sorted.map((p) => {
            const t = TECH_BY_ID[p.technology];
            return (
              <li key={p.id}>
                <Link href={p.deal?.href ?? "/deals"} className="flex w-full items-center gap-3 py-3 text-left hover:bg-white/5">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: t.hex }} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-white">{p.name}</span>
                    <span className="block text-xs text-hero-muted">
                      {p.deal && `${p.deal.type} · ${formatDate(p.deal.date)} · `}
                      {t.label} · {p.country}
                    </span>
                  </span>
                  <span className="tabular text-sm text-hero-ink">{p.deal?.value ?? "Undisclosed"}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function PolicyList({ ranked, onSelect }: { ranked: ReturnType<typeof rankPolicies>; onSelect: (r: ReturnType<typeof rankPolicies>[number]) => void }) {
  return (
    <div className="absolute inset-0 overflow-y-auto py-5">
      <div className="max-w-4xl">
        <p className="mb-3 text-xs text-hero-muted">{ranked.length} countries, highest score first.</p>
        <ol className="divide-y divide-hero-line border-y border-hero-line">
          {ranked.map((r) => (
            <li key={r.country}>
              <button type="button" onClick={() => onSelect(r)} className="flex w-full items-center gap-3 py-3 text-left hover:bg-white/5">
                <span className="tabular w-6 text-sm text-hero-muted">{r.rank}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-white">{r.name}</span>
                <span className="h-1.5 w-24 rounded-[3px] bg-white/10" aria-hidden>
                  <span className="block h-full rounded-[2px]" style={{ width: `${(r.score / 5) * 100}%`, background: rampColor(r.score) }} />
                </span>
                <span className="tabular w-10 text-right text-sm text-hero-ink">{r.score.toFixed(1)}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="text-center">
      <dt className="text-[11px] leading-tight font-medium text-hero-muted">{label}</dt>
      <dd className="tabular mt-1.5 font-display text-2xl font-bold tracking-tight text-white md:text-[1.75rem]">
        {value}
        {unit && <span className="ml-1 text-sm font-semibold text-hero-muted">{unit}</span>}
      </dd>
    </div>
  );
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-[3px] border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
        pressed ? "border-white bg-white text-brand-navy" : "border-hero-line text-hero-ink hover:border-white/30 hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}

function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-[3px] border border-hero-line bg-hero/80 p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={`rounded-[3px] px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
            value === o.id ? "bg-white text-brand-navy" : "text-hero-muted hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** `null` until known in the browser, so the globe isn't created with the wrong framing. */
function useMediaQuery(q: string) {
  const [match, setMatch] = useState<boolean | null>(null);
  useEffect(() => {
    const mql = window.matchMedia(q);
    const update = () => setMatch(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [q]);
  return match;
}
