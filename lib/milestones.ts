// Milestone types and labels (client-safe: no data or validation imports).
export type MilestoneKind = "announced" | "permits" | "financing" | "construction" | "operating";

export interface Milestone {
  kind: MilestoneKind;
  date: string;
}

export const MILESTONE_LABEL: Record<MilestoneKind, string> = {
  announced: "Announced",
  permits: "Permits granted",
  financing: "Financial close",
  construction: "Construction started",
  operating: "Started operating",
};
