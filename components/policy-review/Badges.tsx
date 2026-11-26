// Small Policy Review labels. Colour never carries meaning alone: every badge also shows its word.
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { DIRECTION_LABEL, VERDICT_LABEL, VERDICT_STYLE } from "@/lib/policy-review/cells";
import type { Freshness, Rating, Verdict } from "@/lib/policy-review/types";

export function VerdictBadge({ verdict, size = "md" }: { verdict: Verdict; size?: "md" | "lg" }) {
  const st = VERDICT_STYLE[verdict];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border font-medium whitespace-nowrap ${st.chip} ${
        size === "lg" ? "px-3.5 py-1.5 text-base" : "px-2.5 py-0.5 text-[13px]"
      }`}
    >
      <span className="size-2 rounded-full" style={{ background: st.dot }} aria-hidden />
      {VERDICT_LABEL[verdict]}
    </span>
  );
}

const RATING: Record<Rating, { label: string; cls: string; dot: string }> = {
  supportive: { label: "Supportive", cls: "bg-[#ebf6ee] text-[#1f6b37]", dot: "#3f9d5a" },
  mixed: { label: "Mixed", cls: "bg-[#fdf4e2] text-[#7a4d00]", dot: "#e3a73a" },
  unsupportive: { label: "Unsupportive", cls: "bg-[#fcecea] text-[#9c2a20]", dot: "#cf4b3f" },
  not_rated: { label: "Not rated", cls: "bg-surface-2 text-muted", dot: "#8a98ab" },
};

export function RatingChip({ rating }: { rating: Rating }) {
  const r = RATING[rating];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[13px] font-medium whitespace-nowrap ${r.cls}`}>
      <span className="size-1.5 rounded-full" style={{ background: r.dot }} aria-hidden />
      {r.label}
    </span>
  );
}

const CONF_NOTE = {
  high: "Primary source, and the rule is seen working in practice",
  medium: "Primary source but untested in practice, or published legal guides only",
  low: "Sources conflict, or the rule is new and its details are not yet out",
};
export function ConfidenceMark({ value }: { value?: "high" | "medium" | "low" }) {
  if (!value) return null;
  const bars = value === "high" ? 3 : value === "medium" ? 2 : 1;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted" title={CONF_NOTE[value]}>
      <span className="flex items-end gap-[2px]" aria-hidden>
        {[1, 2, 3].map((b) => (
          <span key={b} className={`w-[3px] rounded-[1px] ${b <= bars ? "bg-ink/60" : "bg-ink/15"}`} style={{ height: 4 + b * 3 }} />
        ))}
      </span>
      {value.charAt(0).toUpperCase() + value.slice(1)} confidence
    </span>
  );
}

export function DirectionArrow({ value, reason }: { value: "improving" | "stable" | "worsening"; reason?: string }) {
  const Icon = value === "improving" ? ArrowUpRight : value === "worsening" ? ArrowDownRight : ArrowRight;
  const tone = value === "improving" ? "text-[#1f6b37]" : value === "worsening" ? "text-[#9c2a20]" : "text-muted";
  return (
    <span className={`inline-flex items-center gap-1 text-[13px] font-medium ${tone}`} title={reason}>
      <Icon className="size-4" aria-hidden />
      {DIRECTION_LABEL[value]}
    </span>
  );
}

export function FreshnessBadge({ value }: { value?: Freshness }) {
  if (!value) return null;
  const m = {
    current: ["Current", "bg-[#ebf6ee] text-[#1f6b37]"],
    review_due: ["Review due", "bg-[#fdf4e2] text-[#7a4d00]"],
    out_of_date: ["Out of date", "bg-[#fcecea] text-[#9c2a20]"],
  }[value];
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${m[1]}`}>{m[0]}</span>;
}
