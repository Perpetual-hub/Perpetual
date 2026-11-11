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

/** Badge tint, text and dot colour per status. Text colours meet WCAG AA (4.5:1) on their tint. */
const STATUS_STYLE: Record<ProjectStatus, { box: string; dot: string }> = {
  announced: { box: "border-[#8e6cd8]/40 bg-[#f6f2fd] text-[#5a3ea8]", dot: "bg-[#8e6cd8]" },
  permitting: { box: "border-[#f5b000]/60 bg-[#fff8e5] text-[#7f5200]", dot: "bg-[#f5b000]" },
  financing: { box: "border-[#14a3ad]/40 bg-[#ebf8f9] text-[#0a6168]", dot: "bg-[#14a3ad]" },
  construction: { box: "border-brand-blue/30 bg-[#eef4fb] text-brand-blue", dot: "bg-brand-blue" },
  operating: { box: "border-brand-green/40 bg-[#eef8f0] text-[#1f6e30]", dot: "bg-brand-green" },
  decommissioned: { box: "border-[#7b8a9c]/40 bg-[#f2f4f7] text-[#475569]", dot: "bg-[#7b8a9c]" },
  cancelled: { box: "border-[#c2362b]/40 bg-[#fdf0ef] text-[#a8261c]", dot: "bg-[#c2362b]" },
};

/** Status as a coloured label; the text always names the status, so colour is never the only signal. */
export function StatusBadge({ status }: { status: ProjectStatus }) {
  const st = STATUS_STYLE[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${st.box}`}>
      <span aria-hidden className={`size-1.5 rounded-full ${st.dot}`} />
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
