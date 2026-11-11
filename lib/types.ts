// Core data model for Perpetual. These types are inferred from the zod schemas
// in ./schema.ts so the runtime validation and the TypeScript types can never drift.
import type { z } from "zod";
import type * as S from "./schema";

export type Technology = z.infer<typeof S.technology>;
export type ProjectStatus = z.infer<typeof S.projectStatus>;
export type Ownership = z.infer<typeof S.ownership>;
export type Source = z.infer<typeof S.source>;
export type Party = z.infer<typeof S.party>;
export type DateValue = z.infer<typeof S.dateValue>;
export type Money = z.infer<typeof S.money>;
export type Project = z.infer<typeof S.project>;
export type Deal = z.infer<typeof S.deal>;
export type DealType = Deal["type"];
export type DealStatus = Deal["status"];
export type ResearchItem = z.infer<typeof S.researchItem>;
export type ResearchType = ResearchItem["type"];

/** A published statistics series, stored exactly as the source publishes it. */
export interface StatSource {
  title: string;
  publisher: string;
  via?: string;
  citation: string;
  url: string;
  licence: string;
  /** ISO date the source last updated the series. */
  lastUpdated?: string;
  /** Year or date the source published the edition. */
  published?: string;
  nextUpdate?: string;
  retrieved: string;
}

export interface CapacityRow {
  year: number;
  solar: number;
  wind: number;
  hydro: number;
  bioenergy: number;
  geothermal: number;
  marine: number;
  total: number;
}

export interface CapacitySeries {
  unit: "GW";
  source: StatSource;
  rows: CapacityRow[];
}

export interface OutlookRow {
  year: number;
  solar: number;
  wind: number;
  hydro: number;
  geothermal: number;
  other: number;
  /** Renewables total as published (excludes battery storage). */
  total: number;
  battery: number;
}

/** Third-party projections, stored exactly as published. Perpetual makes no forecasts. */
export interface CapacityOutlook {
  unit: "GW";
  edition: string;
  source: StatSource;
  scenarios: { id: string; label: string; rows: OutlookRow[] }[];
}

export type CountryCapacityKey =
  | "solar"
  | "windOnshore"
  | "windOffshore"
  | "hydro"
  | "bioenergy"
  | "geothermal"
  | "marine"
  | "fossil"
  | "nuclear"
  | "pumpedStorage"
  | "otherNonRenewable";

/** One country's IRENA series, one value per year from `years[0]` to `years[1]`. */
export interface CountryCapacity {
  iso2: string;
  name: string;
  region: string;
  capacityMW: Partial<Record<CountryCapacityKey, number[]>>;
  /** null where the source has not published that year yet. */
  generationGWh: { renewable: (number | null)[]; total: (number | null)[] };
}

export interface CountryCapacityData {
  unit: { capacity: "MW"; generation: "GWh" };
  years: [number, number];
  source: StatSource;
  countries: CountryCapacity[];
}
