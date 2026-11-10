"use client";

import { List, Maximize2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MapPlaceholder } from "@/components/map/MapPlaceholder";
import { ProjectDrawer } from "@/components/map/ProjectDrawer";
import type { MapMode } from "@/components/map/ProjectMap";
import { ProjectGlobeLazy } from "@/components/map/ProjectMapLazy";
import type { MapPoint } from "@/lib/data";
import { PIPELINE_STATUSES } from "@/lib/filters";
import { formatGW, formatMW } from "@/lib/format";
import { TECHNOLOGIES, TECH_BY_ID } from "@/lib/tech";
import type { Technology } from "@/lib/types";

interface Props {
  points: MapPoint[];
  /** Technologies of each deal dated in the last 30 days (for the live counter). */
  recentDealTechs: Technology[][];
  rail: React.ReactNode;
}

export function HomeHero({ points, recentDealTechs, rail }: Props) {
  const router = useRouter();
  const [active, setActive] = useState<Technology[]>([]);
  const [selected, setSelected] = useState<MapPoint | null>(null);
  const [view, setView] = useState<"globe" | "list">("globe");
  const [mode, setMode] = useState<MapMode>("projects");
  const isWide = useMediaQuery("(min-width: 1024px)");

  const filtered = useMemo(
    () => (active.length ? points.filter((p) => active.includes(p.technology)) : points),
    [points, active],
  );
  const stats = useMemo(() => {
    const sum = (xs: MapPoint[]) => xs.reduce((s, p) => s + p.capacityMW, 0);
    return {
      projects: filtered.length,
      countries: new Set(filtered.map((p) => p.country)).size,
      total: sum(filtered),
      operating: sum(filtered.filter((p) => p.status === "operating")),
      pipeline: sum(filtered.filter((p) => PIPELINE_STATUSES.includes(p.status))),
      deals: recentDealTechs.filter((ts) => !active.length || ts.some((t) => active.includes(t))).length,
    };
  }, [filtered, recentDealTechs, active]);

  const toggle = (t: Technology) =>
    setActive((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
  const explorerHref = `/projects${active.length ? `?tech=${active.join(",")}` : ""}`;

  return (
    <section className="on-dark relative bg-hero text-hero-ink" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        Perpetual: a global map of renewable energy projects, deals and policy
      </h1>
      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex min-w-0 flex-col">
          {/* Toolbar: technology filter + view controls */}
          <div className="container-page border-b border-hero-line py-3">
            <div
              role="group"
              aria-label="Filter by technology"
              className="-mx-1 flex gap-1.5 overflow-x-auto px-1 py-0.5 [scrollbar-width:none] md:flex-wrap md:overflow-visible"
            >
              <Chip pressed={active.length === 0} onClick={() => setActive([])}>
                All
              </Chip>
              {TECHNOLOGIES.map((t) => (
                <Chip key={t.id} pressed={active.includes(t.id)} onClick={() => toggle(t.id)}>
                  <span className="size-2 rounded-full" style={{ background: t.hex }} aria-hidden />
                  {t.label}
                </Chip>
              ))}
            </div>
          </div>

          {/* Globe */}
          <div className="relative h-[64vh] min-h-[400px] lg:h-[calc(100svh-17rem)] lg:min-h-[560px]">
            <div className="absolute top-3 left-4 z-10 flex flex-wrap items-center gap-2 md:left-8">
              <Segmented
                label="Group by"
                value={mode}
                onChange={(v) => {
                  setMode(v);
                  setView("globe");
                }}
                options={[
                  { id: "projects", label: "Projects" },
                  { id: "countries", label: "Countries" },
                ]}
              />
              <button
                type="button"
                aria-pressed={view === "list"}
                onClick={() => setView((v) => (v === "globe" ? "list" : "globe"))}
                className="inline-flex items-center gap-1.5 rounded-full border border-hero-line bg-hero/80 px-3 py-1.5 text-xs font-medium text-hero-ink transition-colors duration-150 hover:bg-white/5 aria-pressed:bg-white aria-pressed:text-brand-navy"
              >
                <List className="size-3.5" aria-hidden />
                List
              </button>
              <Link
                href={explorerHref}
                className="hidden items-center gap-1.5 rounded-full border border-hero-line bg-hero/80 px-3 py-1.5 text-xs font-medium text-hero-ink transition-colors duration-150 hover:bg-white/5 sm:inline-flex"
              >
                <Maximize2 className="size-3.5" aria-hidden />
                Explorer
              </Link>
            </div>

            {isWide === null ? (
              <MapPlaceholder theme="dark" />
            ) : view === "globe" ? (
              <ProjectGlobeLazy
                points={filtered}
                theme="dark"
                projection="globe"
                mode={mode}
                autoRotate
                initialView={{ center: [isWide ? 15 : 20, 18], zoom: isWide ? 2.0 : 0.85 }}
                onSelect={setSelected}
                onCountrySelect={(code) => router.push(`/countries/${code}`)}
                selectedId={selected?.id}
                ariaLabel="Interactive globe of renewable energy projects. Use the List button for a keyboard-friendly alternative."
              />
            ) : (
              <ProjectList points={filtered} onSelect={setSelected} />
            )}
            {view === "globe" && (
              <p className="pointer-events-none absolute bottom-3 left-4 max-w-[60%] text-[11px] text-hero-muted md:left-8">
                {mode === "projects"
                  ? "Circle area = capacity. Rings group nearby projects; click to zoom in."
                  : "One bubble per country, area = total capacity. Click for the country profile."}
              </p>
            )}
          </div>

          {/* Stats strip */}
          <dl
            aria-live="polite"
            className="container-page grid grid-cols-2 gap-x-6 gap-y-5 border-t border-hero-line py-6 sm:grid-cols-3 xl:grid-cols-6"
          >
            <Stat label="Projects tracked" value={stats.projects.toLocaleString("en")} />
            <Stat label="Countries" value={String(stats.countries)} />
            <Stat label="Total capacity" value={formatGW(stats.total)} unit="GW" />
            <Stat label="Operating" value={formatGW(stats.operating)} unit="GW" />
            <Stat label="In pipeline" value={formatGW(stats.pipeline)} unit="GW" />
            <Stat label="Deals, last 30 days" value={String(stats.deals)} />
          </dl>
        </div>

        <aside aria-label="Latest news and deals" className="border-t border-hero-line lg:border-t-0 lg:border-l lg:bg-[#071f3d]">
          {rail}
        </aside>
      </div>

      <ProjectDrawer point={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div>
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
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
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
    <div role="radiogroup" aria-label={label} className="flex rounded-full border border-hero-line bg-hero/80 p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150 ${
            value === o.id ? "bg-white text-brand-navy" : "text-hero-muted hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Keyboard- and screen-reader-friendly alternative to the globe. */
function ProjectList({ points, onSelect }: { points: MapPoint[]; onSelect: (p: MapPoint) => void }) {
  const sorted = [...points].sort((a, b) => b.capacityMW - a.capacityMW);
  return (
    <div className="absolute inset-0 overflow-y-auto pt-16 pb-4">
      <div className="container-page max-w-4xl">
        <p className="mb-3 text-xs text-hero-muted">
          {sorted.length} projects, largest first.{" "}
          <Link href="/projects" className="text-hero-ink underline underline-offset-2">
            Open the full explorer
          </Link>
        </p>
        <ul className="divide-y divide-hero-line border-y border-hero-line">
          {sorted.map((p) => {
            const t = TECH_BY_ID[p.technology];
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onSelect(p)}
                  className="flex w-full items-center gap-3 py-3 text-left transition-colors duration-150 hover:bg-white/5"
                >
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: t.hex }} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-white">{p.name}</span>
                    <span className="block text-xs text-hero-muted">
                      {t.label} · {p.country}
                    </span>
                  </span>
                  <span className="tabular text-sm text-hero-ink">{formatMW(p.capacityMW)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
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
