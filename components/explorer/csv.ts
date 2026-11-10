import type { MapPoint } from "@/lib/data";
import { STATUS_LABEL, countryName } from "@/lib/format";
import { TECH_BY_ID } from "@/lib/tech";

const esc = (v: unknown) => {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** Builds a CSV of the current filtered view and triggers a download in the browser. */
export function downloadProjectsCSV(points: MapPoint[], filename = "perpetual-projects.csv") {
  const header = [
    "id", "name", "sector", "sub_type", "capacity_mw", "storage_mwh", "status", "country_code",
    "country", "region", "admin1", "lat", "lng", "ownership", "developer", "cod", "cod_confidence",
    "financing_instruments", "profile_url", "sample_data",
  ];
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const rows = points.map((p) => [
    p.id, p.name, TECH_BY_ID[p.technology].label, p.subType, p.capacityMW, p.storageMWh, STATUS_LABEL[p.status],
    p.country, countryName(p.country), p.region, p.admin1, p.lat, p.lng, p.ownership, p.developer, p.cod,
    p.codConfidence, p.instruments?.join("; "), `${origin}/projects/${p.slug}`, p.isSample ? "yes" : "no",
  ]);
  const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
