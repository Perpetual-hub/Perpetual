// Operating renewable plants of 10 MW or more from the World Resources Institute's Global Power Plant
// Database v1.3 (2021), licensed CC BY 4.0. Built by scripts/import-gppd.py; records that duplicate a
// project already in our data were dropped.
import type { Project } from "@/lib/types";
import raw from "./projects-gppd.json";

export const gppdProjects = raw as unknown as Project[];
