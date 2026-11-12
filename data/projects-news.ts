// Projects drawn from the deal tracker: one record per named plant, built from the articles behind
// its deals (scripts are in the backfill workspace). Map positions come from OpenStreetMap place
// names; locationPrecision says whether a pin marks the site, a nearby area or only the country.
import type { Project } from "@/lib/types";
import raw from "./projects-news.json";

export const newsProjects = raw as unknown as Project[];
