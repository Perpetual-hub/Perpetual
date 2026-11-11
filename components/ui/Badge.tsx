import { FlaskConical } from "lucide-react";
import { STATUS_LABEL } from "@/lib/format";
import type { ProjectStatus } from "@/lib/types";

export function SampleBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      title="Illustrative sample record, not real data"
      className={`inline-flex items-center gap-1 rounded-[3px] border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${
        tone === "dark" ? "border-hero-line text-hero-muted" : "border-line bg-surface-2 text-muted"
      }`}
    >
      <FlaskConical className="size-3" aria-hidden />
      Sample data
    </span>
  );
}

const STATUS_STYLE: Record<ProjectStatus, string> = {
  announced: "border-line text-muted",
  permitting: "border-line text-muted",
  financing: "border-brand-sky/40 text-brand-navy",
  construction: "border-brand-blue/30 text-brand-blue",
  operating: "border-brand-green/40 text-[#1f6e30]",
  decommissioned: "border-line text-muted",
  cancelled: "border-line text-muted line-through",
};

/** Status as text with a small shape cue; colour is never the only signal. */
export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[3px] border bg-white px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${STATUS_STYLE[status]}`}>
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${status === "operating" ? "bg-brand-green" : status === "construction" ? "bg-brand-blue" : "border border-current"}`}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function Pill({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center rounded-[3px] px-2 py-0.5 text-[11px] font-semibold ${
        tone === "dark" ? "bg-white/10 text-hero-ink" : "bg-surface-2 text-brand-navy"
      }`}
    >
      {children}
    </span>
  );
}
