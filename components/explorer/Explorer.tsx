"use client";

import { Download, Globe2, List, Map as MapIcon, Search, SlidersHorizontal, Table2, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProjectDrawer } from "@/components/map/ProjectDrawer";
import { ProjectMapLazy } from "@/components/map/ProjectMapLazy";
import { StatusBadge } from "@/components/ui/Badge";
import type { MapPoint } from "@/lib/data";
import {
  FINANCING_OPTIONS,
  OWNERSHIPS,
  OWNERSHIP_LABEL,
  STATUSES,
  countActiveFilters,
  filtersToQuery,
  matchesFilters,
  parseFilters,
  type ProjectFilters,
} from "@/lib/filters";
import { STATUS_LABEL, countryName, formatGW, formatMW } from "@/lib/format";
import { TECHNOLOGIES, TECH_BY_ID } from "@/lib/tech";
import type { Ownership, ProjectStatus, Technology } from "@/lib/types";
import { CheckboxList, RangeInputs, type Option } from "./FilterControls";
import { FilterPopover } from "./Popover";
import { ProjectTable } from "./ProjectTable";
import { downloadProjectsCSV } from "./csv";

type View = "map" | "table";

export function Explorer({ points }: { points: MapPoint[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const filters = useMemo(() => parseFilters(sp), [sp]);
  const view: View = sp.get("view") === "table" ? "table" : "map";
  const projection = sp.get("proj") === "globe" ? "globe" : "mercator";
  const [selected, setSelected] = useState<MapPoint | null>(null);
  const [hovered, setHovered] = useState<string | undefined>();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mobilePane, setMobilePane] = useState<"list" | "map">("list");

  const filtered = useMemo(() => points.filter((p) => matchesFilters(p, filters)), [points, filters]);
  const totalMW = filtered.reduce((s, p) => s + p.capacityMW, 0);
  const active = countActiveFilters(filters);

  const push = (next: ProjectFilters, extra: { view?: View; proj?: string } = {}) => {
    const q = filtersToQuery(next, {
      view: (extra.view ?? view) === "table" ? "table" : undefined,
      proj: (extra.proj ?? projection) === "globe" ? "globe" : undefined,
    });
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };
  const update = (patch: Partial<ProjectFilters>) => push({ ...filters, ...patch });

  // Option lists with counts from the whole dataset.
  const opts = useMemo(() => {
    const count = <K extends keyof MapPoint>(k: K, v: MapPoint[K]) => points.filter((p) => p[k] === v).length;
    const countries = [...new Set(points.map((p) => p.country))]
      .map((c) => ({ id: c, label: countryName(c), count: count("country", c) }))
      .sort((a, b) => a.label.localeCompare(b.label));
    const regions = [...new Set(points.map((p) => p.region))]
      .sort()
      .map((r) => ({ id: r, label: r, count: count("region", r) }));
    const years = points.map((p) => Number(p.cod?.slice(0, 4))).filter(Boolean);
    return {
      tech: TECHNOLOGIES.map((t) => ({ id: t.id, label: t.label, dot: t.hex, count: count("technology", t.id) })) as Option<Technology>[],
      status: STATUSES.map((s) => ({ id: s, label: STATUS_LABEL[s], count: count("status", s) })).filter((o) => o.count) as Option<ProjectStatus>[],
      ownership: OWNERSHIPS.map((o) => ({ id: o, label: OWNERSHIP_LABEL[o], count: count("ownership", o) })) as Option<Ownership>[],
      financing: FINANCING_OPTIONS.map((f) => ({
        id: f.id,
        label: f.label,
        count: points.filter((p) => p.instruments?.includes(f.id)).length,
      })) as Option[],
      countries,
      regions,
      yearMin: Math.min(...years),
      yearMax: Math.max(...years),
    };
  }, [points]);

  const summarise = (ids: string[] | undefined, label: (id: string) => string) =>
    ids?.length ? (ids.length === 1 ? label(ids[0]) : `${ids.length} selected`) : undefined;
  const range = (lo?: number, hi?: number, unit = "") =>
    lo == null && hi == null ? undefined : `${lo ?? "…"}–${hi ?? "…"}${unit}`;

  const controls = {
    tech: (
      <CheckboxList legend="Technology" options={opts.tech} value={filters.tech ?? []} onChange={(v) => update({ tech: v })} />
    ),
    status: (
      <CheckboxList legend="Status" options={opts.status} value={filters.status ?? []} onChange={(v) => update({ status: v })} />
    ),
    region: (
      <CheckboxList legend="Region" options={opts.regions} value={filters.region ?? []} onChange={(v) => update({ region: v })} />
    ),
    country: (
      <CheckboxList legend="Country" options={opts.countries} value={filters.country ?? []} onChange={(v) => update({ country: v })} />
    ),
    capacity: (
      <RangeInputs
        key={`${filters.minMW}-${filters.maxMW}`}
        legend="Capacity"
        unit="MW"
        min={filters.minMW}
        max={filters.maxMW}
        onChange={(minMW, maxMW) => update({ minMW, maxMW })}
      />
    ),
    cod: (
      <RangeInputs
        key={`${filters.codFrom}-${filters.codTo}`}
        legend="Commercial operation year"
        unit="year"
        min={filters.codFrom}
        max={filters.codTo}
        placeholders={[String(opts.yearMin), String(opts.yearMax)]}
        onChange={(codFrom, codTo) => update({ codFrom, codTo })}
      />
    ),
    ownership: (
      <CheckboxList legend="Ownership" options={opts.ownership} value={filters.ownership ?? []} onChange={(v) => update({ ownership: v })} />
    ),
    financing: (
      <CheckboxList legend="Financing" options={opts.financing} value={filters.financing ?? []} onChange={(v) => update({ financing: v })} />
    ),
  };

  const clearAll = () => push({});

  return (
    <div className="flex flex-col lg:h-[calc(100svh-6.25rem)]">
      {/* Title row */}
      <div className="container-page flex flex-wrap items-end gap-x-6 gap-y-3 pt-8 pb-5">
        <div className="mr-auto">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Projects</h1>
          <p className="tabular mt-1.5 text-sm text-muted" aria-live="polite">
            <strong className="font-semibold text-ink">{filtered.length}</strong> of {points.length} projects ·{" "}
            <strong className="font-semibold text-ink">{formatGW(totalMW)} GW</strong>
            {active > 0 && " match your filters"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Segmented
            label="View"
            value={view}
            onChange={(v) => push(filters, { view: v })}
            options={[
              { id: "map", label: "Map", icon: MapIcon },
              { id: "table", label: "Table", icon: Table2 },
            ]}
          />
          <button
            type="button"
            onClick={() => downloadProjectsCSV(filtered)}
            disabled={!filtered.length}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink transition-colors hover:border-[#cdd6e2] disabled:opacity-50"
          >
            <Download className="size-4" aria-hidden />
            <span className="hidden sm:inline">Download</span> CSV
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="border-y border-line bg-surface-2">
        <div className="container-page flex flex-wrap items-center gap-2 py-3">
          <label className="relative min-w-0 flex-1 sm:max-w-64 sm:flex-none">
            <span className="sr-only">Search projects or developers</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              key={filters.q ?? ""}
              type="search"
              defaultValue={filters.q}
              placeholder="Search name or developer"
              onKeyDown={(e) => e.key === "Enter" && update({ q: e.currentTarget.value || undefined })}
              onBlur={(e) => e.currentTarget.value !== (filters.q ?? "") && update({ q: e.currentTarget.value || undefined })}
              className="h-9 w-full rounded-lg border border-line bg-white pr-3 pl-9 text-sm placeholder:text-muted/80 focus:border-brand-blue focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-sm font-medium md:hidden"
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            Filters{active > 0 && <span className="tabular rounded-full bg-brand-navy px-1.5 text-[11px] text-white">{active}</span>}
          </button>
          <div className="hidden flex-wrap items-center gap-2 md:flex">
            <FilterPopover label="Technology" active={!!filters.tech?.length} summary={summarise(filters.tech, (id) => TECH_BY_ID[id as Technology].label)}>
              {controls.tech}
            </FilterPopover>
            <FilterPopover label="Status" active={!!filters.status?.length} summary={summarise(filters.status, (id) => STATUS_LABEL[id as ProjectStatus])}>
              {controls.status}
            </FilterPopover>
            <FilterPopover label="Region" active={!!filters.region?.length} summary={summarise(filters.region, (r) => r)}>
              {controls.region}
            </FilterPopover>
            <FilterPopover label="Country" active={!!filters.country?.length} summary={summarise(filters.country, countryName)}>
              {controls.country}
            </FilterPopover>
            <FilterPopover label="Capacity" active={filters.minMW != null || filters.maxMW != null} summary={range(filters.minMW, filters.maxMW, " MW")}>
              {controls.capacity}
            </FilterPopover>
            <FilterPopover label="COD year" active={filters.codFrom != null || filters.codTo != null} summary={range(filters.codFrom, filters.codTo)}>
              {controls.cod}
            </FilterPopover>
            <FilterPopover label="Ownership" active={!!filters.ownership?.length} summary={summarise(filters.ownership, (o) => OWNERSHIP_LABEL[o as Ownership])}>
              {controls.ownership}
            </FilterPopover>
            <FilterPopover label="Financing" active={!!filters.financing?.length} summary={summarise(filters.financing, (f) => f)} align="right">
              {controls.financing}
            </FilterPopover>
          </div>
          {active > 0 && (
            <button type="button" onClick={clearAll} className="ml-1 inline-flex h-9 items-center gap-1 px-2 text-sm font-medium text-brand-blue hover:underline">
              <X className="size-3.5" aria-hidden />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState onClear={clearAll} />
      ) : view === "table" ? (
        <div className="container-page min-h-0 flex-1 overflow-auto py-6">
          <ProjectTable points={filtered} />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          {/* Mobile pane switch */}
          <div className="container-page flex gap-2 py-3 lg:hidden">
            <Segmented
              label="Show"
              value={mobilePane}
              onChange={setMobilePane}
              options={[
                { id: "list", label: "List", icon: List },
                { id: "map", label: "Map", icon: MapIcon },
              ]}
            />
          </div>
          <div className={`relative min-h-0 lg:flex-1 ${mobilePane === "map" ? "h-[65vh]" : "hidden"} lg:block lg:h-auto`}>
            <ProjectMapLazy
              points={filtered}
              theme="light"
              projection={projection}
              initialView={{ center: [20, 20], zoom: 1.2 }}
              fitToPoints
              onSelect={setSelected}
              selectedId={selected?.id ?? hovered}
              ariaLabel="Map of filtered projects. The results list beside it has the same projects."
            />
            <button
              type="button"
              onClick={() => push(filters, { proj: projection === "globe" ? "mercator" : "globe" })}
              className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-lg border border-line bg-white/95 px-3 py-1.5 text-xs font-medium text-ink shadow-sm hover:bg-white"
            >
              {projection === "globe" ? <MapIcon className="size-3.5" aria-hidden /> : <Globe2 className="size-3.5" aria-hidden />}
              {projection === "globe" ? "Flat map" : "Globe"}
            </button>
          </div>
          <div
            className={`min-h-0 border-line lg:block lg:w-[400px] lg:overflow-y-auto lg:border-l xl:w-[440px] ${mobilePane === "list" ? "" : "hidden"}`}
          >
            <ResultsList points={filtered} onHover={setHovered} />
          </div>
        </div>
      )}

      <ProjectDrawer point={selected} onClose={() => setSelected(null)} />

      {/* Mobile filter sheet */}
      {sheetOpen && (
        <div role="dialog" aria-modal="true" aria-label="Filters" className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="text-lg font-bold">Filters</h2>
            <button type="button" onClick={() => setSheetOpen(false)} aria-label="Close filters" className="rounded-md p-2">
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
            {(
              [
                ["Technology", controls.tech],
                ["Status", controls.status],
                ["Region", controls.region],
                ["Country", controls.country],
                ["Capacity", controls.capacity],
                ["COD year", controls.cod],
                ["Ownership", controls.ownership],
                ["Financing", controls.financing],
              ] as const
            ).map(([title, ctl]) => (
              <section key={title}>
                <h3 className="mb-2 font-sans text-sm font-semibold text-ink">{title}</h3>
                {ctl}
              </section>
            ))}
          </div>
          <div className="flex gap-3 border-t border-line p-4">
            <button type="button" onClick={clearAll} className="flex-1 rounded-lg border border-line py-3 text-sm font-medium">
              Clear all
            </button>
            <button type="button" onClick={() => setSheetOpen(false)} className="flex-1 rounded-lg bg-brand-navy py-3 text-sm font-semibold text-white">
              Show {filtered.length} projects
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultsList({ points, onHover }: { points: MapPoint[]; onHover: (id?: string) => void }) {
  const sorted = useMemo(() => [...points].sort((a, b) => b.capacityMW - a.capacityMW), [points]);
  return (
    <ul className="divide-y divide-line" aria-label="Results">
      {sorted.map((p) => {
        const t = TECH_BY_ID[p.technology];
        return (
          <li key={p.id} onMouseEnter={() => onHover(p.id)} onMouseLeave={() => onHover(undefined)}>
            <Link
              href={`/projects/${p.slug}`}
              onFocus={() => onHover(p.id)}
              onBlur={() => onHover(undefined)}
              className="group flex gap-3 px-4 py-3.5 transition-colors duration-100 hover:bg-surface-2 md:px-6 lg:px-5"
            >
              <span className="mt-1.5 size-2.5 shrink-0 rounded-full" style={{ background: t.hex }} aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink group-hover:text-brand-blue">{p.name}</span>
                <span className="mt-0.5 block text-xs text-muted">
                  {t.label} · {p.subType && p.subType.charAt(0).toUpperCase() + p.subType.slice(1)} · {countryName(p.country)}
                </span>
                <span className="mt-2 flex items-center gap-2">
                  <StatusBadge status={p.status} />
                </span>
              </span>
              <span className="tabular shrink-0 text-right text-sm font-semibold text-ink">
                {formatMW(p.capacityMW)}
                {p.storageMWh && <span className="block text-xs font-normal text-muted">{formatMW(p.storageMWh).replace("MW", "MWh")}</span>}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center py-24 text-center">
      <div className="flex size-12 items-center justify-center rounded-full border border-line bg-surface-2">
        <SlidersHorizontal className="size-5 text-muted" aria-hidden />
      </div>
      <h2 className="mt-5 text-xl font-bold">No projects match these filters</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        Try widening the capacity or year range, or removing a filter. Coverage in the beta is limited to sample data.
      </p>
      <button type="button" onClick={onClear} className="mt-6 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue">
        Clear all filters
      </button>
    </div>
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
  options: { id: T; label: string; icon: React.ComponentType<{ className?: string }> }[];
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex h-9 rounded-lg border border-line bg-white p-0.5">
      {options.map(({ id, label: l, icon: Icon }) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={value === id}
          onClick={() => onChange(id)}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors duration-150 ${
            value === id ? "bg-brand-navy text-white" : "text-muted hover:text-ink"
          }`}
        >
          <Icon className="size-4" aria-hidden />
          {l}
        </button>
      ))}
    </div>
  );
}
