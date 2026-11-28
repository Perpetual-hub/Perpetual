import { countryName } from "@/lib/format";
import { TECH_BY_ID } from "@/lib/tech";
import type { Technology } from "@/lib/types";

const FIXED: Record<string, string> = {
  "/": "Perpetual",
  "/knowledge": "Knowledge",
  "/deals": "Deals",
  "/policy": "Policy",
  "/policy/method": "Method",
  "/statistics": "Statistics",
  "/disclosure": "Disclosure",
  "/about": "About",
  "/corrections": "Corrections",
};

const title = (slug: string) => slug.split("-").map((w) => (w === "and" || w === "the" ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(" ");

/** The name shown on the page-change curtain for a path. */
export function sectionName(path: string): string {
  if (FIXED[path]) return FIXED[path];
  const [, first, second] = path.split("/");
  if (first === "deals") return "Deals";
  if (first === "sectors" && second) return TECH_BY_ID[second as Technology]?.label ?? "Sectors";
  if (first === "countries" && second) return countryName(second.toUpperCase());
  if (first === "regions" && second) return title(second);
  return "Perpetual";
}
