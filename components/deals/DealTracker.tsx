"use client";

import { ArrowDown, ArrowUp, ArrowUpDown, Download, LayoutGrid, Search, SlidersHorizontal, Table2, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BarList } from "@/components/charts/BarList";
import { CheckboxList, type Option } from "@/components/explorer/FilterControls";
import { FilterPopover } from "@/components/explorer/Popover";
import { SampleBadge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import {
  DEAL_STATUSES,
  DEAL_TYPES,
  PERIODS,
  SIZE_BANDS,
  countDealFilters,
  dealFiltersToQuery,
  matchesDeal,
  parseDealFilters,
  sizeBand,
  type DealFilters,
} from "@/lib/deal-filters";
import { DEAL_STATUS_LABEL, DEAL_TYPE_LABEL, countryName, formatDate, formatMW, formatMoney } from "@/lib/format";
import { TECHNOLOGIES, TECH_BY_ID } from "@/lib/tech";
import type { Deal, DealStatus, DealType, Technology } from "@/lib/types";
import { DealStatusBadge } from "./DealBadges";
import { DealValueChart } from "./DealValueChart";

type View = "table" | "cards";
type SortKey = "date" | "title" | "type" | "value" | "capacity";

export function DealTracker({ deals, asOf }: { deals: Deal[]; asOf: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const f = useMemo(() => parseDealFilters(sp), [sp]);
  const view: View = sp.get("view") === "cards" ? "cards" : "table";
  const [sheet, setSheet] = useState(false);

  const filtered = useMemo(() => deals.filter((d) => matchesDeal(d, f, asOf)), [deals, f, asOf]);
  const active = countDealFilters(f);

  const push = (next: DealFilters, v: View = view) => {
    const q = dealFiltersToQuery(next, { view: v === "cards" ? "cards" : undefined });
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };
  const update = (patch: Partial<DealFilters>) => push({ ...f, ...patch });

  // KPIs for the current view.
  const disclosed = filtered.filter((d) => d.value?.disclosed && d.value.usd);
  const totalUSD = disclosed.reduce((s, d) => s + (d.value!.usd ?? 0), 0);
  const recent = filtered.filter((d) => {
    const age = (Date.parse(asOf) - Date.parse(d.date)) / 86_400_000;
    return age >= 0 && age <= 30;
  }).length;
  const capacity = filtered.reduce((s, d) => s + (d.capacityMW ?? 0), 0);

  const byType = DEAL_TYPES.map((t) => ({
    key: t,
    label: DEAL_TYPE_LABEL[t],
    value: filtered.filter((d) => d.type === t).length,
    href: `${pathname}?${dealFiltersToQuery({ ...f, type: [t] })}`,
  })).filter((r) => r.value > 0);

  const investors = useMemo(() => {
    const m = new Map<string, { name: string; deals: number; usd: number }>();
    for (const d of filtered)
      for (const b of d.buyers ?? []) {
        if (/\(sample\)|investors$/i.test(b.name)) continue;
        const x = m.get(b.name) ?? { name: b.name, deals: 0, usd: 0 };
        x.deals += 1;
        x.usd += d.value?.disclosed ? (d.value.usd ?? 0) / Math.max(d.buyers!.length, 1) : 0;
        m.set(b.name, x);
      }
    return [...m.values()].sort((a, b) => b.deals - a.deals || b.usd - a.usd).slice(0, 6);
  }, [filtered]);

  const count = (pred: (d: Deal) => boolean) => deals.filter(pred).length;
  const opts = {
    type: DEAL_TYPES.map((t) => ({ id: t, label: DEAL_TYPE_LABEL[t], count: count((d) => d.type === t) })).filter((o) => o.count) as Option<DealType>[],
    tech: TECHNOLOGIES.map((t) => ({ id: t.id, label: t.label, dot: t.hex, count: count((d) => d.technologies.includes(t.id)) })).filter(
      (o) => o.count,
    ) as Option<Technology>[],
    region: [...new Set(deals.map((d) => d.region))].sort().map((r) => ({ id: r, label: r, count: count((d) => d.region === r) })),
    status: DEAL_STATUSES.map((s) => ({ id: s, label: DEAL_STATUS_LABEL[s], count: count((d) => d.status === s) })) as Option<DealStatus>[],
    size: SIZE_BANDS.map((b) => ({ id: b.id, label: b.label, count: count((d) => sizeBand(d) === b.id) })) as Option[],
  };
  const sum = (ids: string[] | undefined, label: (id: string) => string) =>
    ids?.length ? (ids.length === 1 ? label(ids[0]) : `${ids.length} selected`) : undefined;

  const controls = {
    type: <CheckboxList legend="Deal type" options={opts.type} value={f.type ?? []} onChange={(v) => update({ type: v })} />,
    tech: <CheckboxList legend="Sector" options={opts.tech} value={f.tech ?? []} onChange={(v) => update({ tech: v })} />,
    region: <CheckboxList legend="Region" options={opts.region} value={f.region ?? []} onChange={(v) => update({ region: v })} />,
    size: <CheckboxList legend="Deal size" options={opts.size} value={f.size ?? []} onChange={(v) => update({ size: v })} />,
    status: <CheckboxList legend="Status" options={opts.status} value={f.status ?? []} onChange={(v) => update({ status: v })} />,
    period: (
      <fieldset>
        <legend className="sr-only">Date</legend>
        {[{ id: "", label: "Any time" }, ...PERIODS].map((p) => (
          <label key={p.id} className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-surface-2">
            <input
              type="radio"
              name="period"
              checked={(f.period ?? "") === p.id}
              onChange={() => update({ period: p.id || undefined })}
              className="size-4 accent-[var(--brand-blue)]"
            />
            {p.label}
          </label>
        ))}
      </fieldset>
    ),
  };

  return (
    <div>
      {/* KPIs */}
      <dl className="container-page grid grid-cols-2 gap-6 border-b border-line pt-2 pb-8 sm:grid-cols-4">
        {[
          ["Deals in view", filtered.length.toLocaleString("en")],
          ["Disclosed value", totalUSD ? formatMoney(totalUSD, "USD") : "—"],
          ["Last 30 days", String(recent)],
          ["Capacity involved", capacity ? formatMW(capacity) : "—"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs font-medium text-muted">{k}</dt>
            <dd className="tabular mt-1 font-display text-3xl font-bold tracking-tight text-brand-navy">{v}</dd>
          </div>
        ))}
      </dl>

      {/* Filter bar */}
      <div className="sticky top-16 z-20 border-b border-line bg-surface-2/95 backdrop-blur-sm">
        <div className="container-page flex flex-wrap items-center gap-2 py-3">
          <label className="relative min-w-0 flex-1 sm:max-w-64 sm:flex-none">
            <span className="sr-only">Search deals, buyers or sellers</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              key={f.q ?? ""}
              type="search"
              defaultValue={f.q}
              placeholder="Search deal, buyer or seller"
              onKeyDown={(e) => e.key === "Enter" && update({ q: e.currentTarget.value || undefined })}
              onBlur={(e) => e.currentTarget.value !== (f.q ?? "") && update({ q: e.currentTarget.value || undefined })}
              className="h-9 w-full rounded-lg border border-line bg-white pr-3 pl-9 text-sm placeholder:text-muted/80 focus:border-brand-blue focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => setSheet(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-sm font-medium md:hidden"
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            Filters{active > 0 && <span className="tabular rounded-[3px] bg-brand-navy px-1.5 text-[11px] text-white">{active}</span>}
          </button>
          <div className="hidden flex-wrap items-center gap-2 md:flex">
            <FilterPopover label="Type" active={!!f.type?.length} summary={sum(f.type, (t) => DEAL_TYPE_LABEL[t as DealType])}>
              {controls.type}
            </FilterPopover>
            <FilterPopover label="Sector" active={!!f.tech?.length} summary={sum(f.tech, (t) => TECH_BY_ID[t as Technology].label)}>
              {controls.tech}
            </FilterPopover>
            <FilterPopover label="Region" active={!!f.region?.length} summary={sum(f.region, (r) => r)}>
              {controls.region}
            </FilterPopover>
            <FilterPopover label="Size" active={!!f.size?.length} summary={sum(f.size, (s) => SIZE_BANDS.find((b) => b.id === s)?.label ?? s)}>
              {controls.size}
            </FilterPopover>
            <FilterPopover label="Date" active={!!f.period} summary={PERIODS.find((p) => p.id === f.period)?.label}>
              {controls.period}
            </FilterPopover>
            <FilterPopover label="Status" active={!!f.status?.length} summary={sum(f.status, (s) => DEAL_STATUS_LABEL[s as DealStatus])} align="right">
              {controls.status}
            </FilterPopover>
          </div>
          {active > 0 && (
            <button type="button" onClick={() => push({})} className="inline-flex h-9 items-center gap-1 px-2 text-sm font-medium text-brand-blue hover:underline">
              <X className="size-3.5" aria-hidden />
              Clear all
            </button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <div role="radiogroup" aria-label="View" className="flex h-9 rounded-lg border border-line bg-white p-0.5">
              {(
                [
                  ["table", "Table", Table2],
                  ["cards", "Cards", LayoutGrid],
                ] as const
              ).map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={view === id}
                  aria-label={label}
                  onClick={() => push(f, id)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 text-sm font-medium ${view === id ? "bg-brand-navy text-white" : "text-muted hover:text-ink"}`}
                >
                  <Icon className="size-4" aria-hidden />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => downloadDealsCSV(filtered)}
              disabled={!filtered.length}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-sm font-medium hover:border-[#cdd6e2] disabled:opacity-50"
            >
              <Download className="size-4" aria-hidden />
              CSV
            </button>
          </div>
        </div>
      </div>

      <div className="container-page space-y-10 py-10">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-xl font-bold">No deals match these filters</h2>
            <p className="mt-2 text-sm text-muted">Try a longer date range or remove a filter.</p>
            <button type="button" onClick={() => push({})} className="mt-6 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue">
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {/* Charts */}
            <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
              <section className="rounded-[var(--radius)] border border-line p-6">
                <h2 className="mb-4 font-sans text-base font-semibold text-ink">Disclosed deal value by quarter</h2>
                <DealValueChart deals={filtered} />
              </section>
              <section className="rounded-[var(--radius)] border border-line p-6">
                <div className="mb-4 flex items-baseline justify-between">
                  <h2 className="font-sans text-base font-semibold text-ink">Deals by type</h2>
                  <span className="text-xs text-muted">Click a bar to filter</span>
                </div>
                <BarList rows={byType} caption="Number of deals by type" format={(v) => `${v} deal${v === 1 ? "" : "s"}`} countLabel="deals" />
              </section>
            </div>

            {/* Results */}
            <section aria-labelledby="results-h">
              <h2 id="results-h" className="sr-only">
                Deals
              </h2>
              {view === "table" ? <DealTable deals={filtered} /> : <DealCards deals={filtered} />}
            </section>

            {investors.length > 0 && (
              <section aria-labelledby="inv-h">
                <h2 id="inv-h" className="mb-4 text-xl font-bold tracking-tight">
                  Most active investors and lenders
                </h2>
                <ol className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                  {investors.map((x, i) => (
                    <li key={x.name} className="flex items-center gap-3 bg-white px-5 py-4">
                      <span className="tabular w-5 text-sm text-muted">{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold text-ink">{x.name}</span>
                        <span className="tabular block text-xs text-muted">
                          {x.deals} deal{x.deals === 1 ? "" : "s"}
                          {x.usd ? ` · ${formatMoney(x.usd, "USD")} disclosed` : ""}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </>
        )}
      </div>

      {/* Mobile filter sheet */}
      {sheet && (
        <div role="dialog" aria-modal="true" aria-label="Filters" className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="text-lg font-bold">Filters</h2>
            <button type="button" onClick={() => setSheet(false)} aria-label="Close filters" className="rounded-md p-2">
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
            {(
              [
                ["Type", controls.type],
                ["Sector", controls.tech],
                ["Region", controls.region],
                ["Size", controls.size],
                ["Date", controls.period],
                ["Status", controls.status],
              ] as const
            ).map(([title, ctl]) => (
              <section key={title}>
                <h3 className="mb-2 font-sans text-sm font-semibold text-ink">{title}</h3>
                {ctl}
              </section>
            ))}
          </div>
          <div className="flex gap-3 border-t border-line p-4">
            <button type="button" onClick={() => push({})} className="flex-1 rounded-lg border border-line py-3 text-sm font-medium">
              Clear all
            </button>
            <button type="button" onClick={() => setSheet(false)} className="flex-1 rounded-lg bg-brand-navy py-3 text-sm font-semibold text-white">
              Show {filtered.length} deals
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function valueText(d: Deal) {
  if (!d.value?.disclosed) return "Undisclosed";
  return formatMoney(d.value.amount, d.value.currency);
}

function DealTable({ deals }: { deals: Deal[] }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "date", dir: "desc" });
  const val = (d: Deal, k: SortKey): string | number =>
    k === "date" ? d.date : k === "title" ? d.title : k === "type" ? DEAL_TYPE_LABEL[d.type] : k === "value" ? (d.value?.disclosed ? (d.value.usd ?? 0) : -1) : (d.capacityMW ?? -1);
  const rows = [...deals].sort((a, b) => {
    const x = val(a, sort.key);
    const y = val(b, sort.key);
    const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
    return sort.dir === "asc" ? c : -c;
  });
  const th = (key: SortKey, label: string, right = false) => {
    const on = sort.key === key;
    const Icon = !on ? ArrowUpDown : sort.dir === "asc" ? ArrowUp : ArrowDown;
    return (
      <th scope="col" aria-sort={on ? (sort.dir === "asc" ? "ascending" : "descending") : "none"} className={`px-4 py-2.5 text-xs font-medium text-muted ${right ? "text-right" : "text-left"}`}>
        <button
          type="button"
          onClick={() => setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: key === "title" || key === "type" ? "asc" : "desc" }))}
          className={`inline-flex items-center gap-1 hover:text-ink ${on ? "text-ink" : ""}`}
        >
          {label}
          <Icon className={`size-3 ${on ? "" : "opacity-40"}`} aria-hidden />
        </button>
      </th>
    );
  };
  return (
    <div className="relative overflow-x-auto rounded-[var(--radius)] border border-line">
      <table className="w-full min-w-[1000px] text-sm">
        <caption className="sr-only">Deals matching the current filters. Column headers sort the table.</caption>
        <thead>
          <tr className="border-b border-line">
            {th("date", "Date")}
            {th("title", "Deal")}
            {th("type", "Type")}
            <th scope="col" className="px-4 py-2.5 text-left text-xs font-medium text-muted">
              Sector
            </th>
            {th("value", "Value", true)}
            {th("capacity", "Capacity", true)}
            <th scope="col" className="px-4 py-2.5 text-left text-xs font-medium text-muted">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((d) => (
            <tr key={d.id} className="hover:bg-surface-2">
              <td className="tabular px-4 py-3 whitespace-nowrap text-muted">{formatDate(d.date)}</td>
              <th scope="row" className="max-w-md px-4 py-3 text-left font-medium">
                <Link href={`/deals/${d.slug}`} className="text-ink hover:text-brand-blue">
                  {d.title}
                </Link>
                <div className="mt-0.5 text-xs font-normal text-muted">
                  {d.countries.slice(0, 3).map(countryName).join(", ")}
                  {d.countries.length > 3 ? ` +${d.countries.length - 3}` : ""}
                  {d.stakePct ? ` · ${d.stakePct}% stake` : ""}
                </div>
              </th>
              <td className="px-4 py-3 whitespace-nowrap">{DEAL_TYPE_LABEL[d.type]}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {d.technologies.map((t) => (
                    <TechTag key={t} tech={t} />
                  ))}
                </div>
              </td>
              <td className="tabular px-4 py-3 text-right whitespace-nowrap">
                <span className={d.value?.disclosed ? "font-semibold text-ink" : "text-muted"}>{valueText(d)}</span>
                {d.value?.disclosed && d.value.currency !== "USD" && d.value.usd && (
                  <div className="text-xs text-muted">≈ {formatMoney(d.value.usd, "USD")}</div>
                )}
              </td>
              <td className="tabular px-4 py-3 text-right whitespace-nowrap">{d.capacityMW ? formatMW(d.capacityMW) : "—"}</td>
              <td className="px-4 py-3">
                <DealStatusBadge status={d.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DealCards({ deals }: { deals: Deal[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {deals.map((d) => (
        <li key={d.id} className="group relative flex flex-col rounded-[var(--radius)] border border-line bg-white p-5 transition-[border-color,box-shadow] duration-200 hover:border-[#cdd6e2] hover:shadow-[0_8px_24px_-14px_rgba(11,27,46,0.22)]">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="font-semibold text-brand-blue">{DEAL_TYPE_LABEL[d.type]}</span>
            <span>{formatDate(d.date)}</span>
            <span className="ml-auto">
              <DealStatusBadge status={d.status} />
            </span>
          </div>
          <h3 className="mt-3 font-sans text-[0.98rem] leading-snug font-semibold text-ink">
            <Link href={`/deals/${d.slug}`} className="after:absolute after:inset-0 group-hover:text-brand-blue">
              {d.title}
            </Link>
          </h3>
          <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 text-xs">
            <div>
              <dt className="text-muted">Value</dt>
              <dd className="tabular mt-0.5 font-semibold text-ink">{d.value?.disclosed ? formatMoney(d.value.usd ?? d.value.amount, d.value.usd ? "USD" : d.value.currency) : "Undisclosed"}</dd>
            </div>
            <div>
              <dt className="text-muted">Stake</dt>
              <dd className="tabular mt-0.5 font-semibold text-ink">{d.stakePct ? `${d.stakePct}%` : "—"}</dd>
            </div>
            <div>
              <dt className="text-muted">Capacity</dt>
              <dd className="tabular mt-0.5 font-semibold text-ink">{d.capacityMW ? formatMW(d.capacityMW) : "—"}</dd>
            </div>
          </dl>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
            {d.technologies.map((t) => (
              <TechTag key={t} tech={t} size="xs" />
            ))}
            {d.isSample && (
              <span className="ml-auto">
                <SampleBadge />
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function downloadDealsCSV(deals: Deal[]) {
  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = ["id", "date", "type", "status", "title", "sectors", "countries", "region", "buyers", "sellers", "target", "stake_pct", "value", "currency", "value_usd", "fx_date", "capacity_mw", "deal_url", "sample_data"];
  const rows = deals.map((d) => [
    d.id, d.date, DEAL_TYPE_LABEL[d.type], DEAL_STATUS_LABEL[d.status], d.title, d.technologies.map((t) => TECH_BY_ID[t].label).join("; "),
    d.countries.join("; "), d.region, (d.buyers ?? []).map((b) => b.name).join("; "), (d.sellers ?? []).map((b) => b.name).join("; "), d.target,
    d.stakePct, d.value?.disclosed ? d.value.amount : "", d.value?.disclosed ? d.value.currency : "", d.value?.disclosed ? d.value.usd : "",
    d.value?.fxDate, d.capacityMW, `${window.location.origin}/deals/${d.slug}`, d.isSample ? "yes" : "no",
  ]);
  const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "perpetual-deals.csv" });
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
