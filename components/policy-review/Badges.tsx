// Small Policy Review labels. Colour never carries meaning alone: every badge also shows its word.
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { DIRECTION_LABEL, VERDICT_LABEL, VERDICT_STYLE } from "@/lib/policy-review/cells";
import type { Freshness, Rating, Verdict } from "@/lib/policy-review/types";

export function VerdictBadge({ verdict, size = "md" }: { verdict: Verdict; size?: "md" | "lg" }) {
  const st = VERDICT_STYLE[verdict];
  const lg = size === "lg";
  return (
    <span className={`inline-flex items-center whitespace-nowrap text-ink ${lg ? "gap-3" : "gap-2"}`}>
      <span className={`shrink-0 ${lg ? "h-7 w-1.5" : "h-3.5 w-1"}`} style={{ background: st.dot }} aria-hidden />
      <span className={lg ? "font-display text-[1.9rem] leading-none font-light tracking-[-0.03em]" : "text-[15px] font-medium"}>
        {VERDICT_LABEL[verdict]}
      </span>
    </span>
  );
}

const RATING: Record<Rating, { label: string; cls: string; dot: string }> = {
  supportive: { label: "Supportive", cls: "text-ink", dot: "#3f9d5a" },
  mixed: { label: "Mixed", cls: "text-ink", dot: "#e3a73a" },
  unsupportive: { label: "Unsupportive", cls: "text-ink", dot: "#cf4b3f" },
  not_rated: { label: "Not rated", cls: "text-muted", dot: "#b4bfcd" },
};

export function RatingChip({ rating }: { rating: Rating }) {
  const r = RATING[rating];
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap ${r.cls}`}>
      <span className="h-3 w-1 shrink-0" style={{ background: r.dot }} aria-hidden />
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
    current: ["Current", "text-[#1f6b37]"],
    review_due: ["Review due", "text-[#7a4d00]"],
    out_of_date: ["Out of date", "text-[#9c2a20]"],
  }[value];
  return <span className={`text-sm font-medium ${m[1]}`}>{m[0]}</span>;
}
