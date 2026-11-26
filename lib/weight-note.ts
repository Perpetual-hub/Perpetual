import { PILLARS, type PillarId } from "@/data/policy";

const NOUN: Record<PillarId, string> = {
  P: "politics",
  R: "regulation",
  O: "offtake",
  F: "finance",
  I: "infrastructure",
  T: "track record",
  S: "social factors",
};

const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** One plain sentence on how a weight preset tilts the score, instead of showing raw multipliers. */
export function weightNote(weights: Record<PillarId, number>): string {
  const values = Object.values(weights);
  const max = Math.max(...values);
  const min = Math.min(...values);
  if (max === min) return "All seven pillars count equally.";
  const top = PILLARS.filter((p) => weights[p.id] === max).map((p) => NOUN[p.id]);
  return `${list(top).charAt(0).toUpperCase()}${list(top).slice(1)} count${top.length === 1 ? "s" : ""} most in this score, so countries strong there rank higher.`;
}
