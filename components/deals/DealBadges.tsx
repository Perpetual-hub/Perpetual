import { DEAL_STATUS_LABEL } from "@/lib/format";
import type { DealStatus } from "@/lib/types";

const STYLE: Record<DealStatus, string> = {
  announced: "border-brand-blue/30 text-brand-blue",
  completed: "border-brand-green/40 text-[#1f6e30]",
  terminated: "border-line text-muted line-through",
};

/** Deal status as text with a shape cue (never colour alone). */
export function DealStatusBadge({ status }: { status: DealStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border bg-white px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${STYLE[status]}`}>
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${status === "completed" ? "bg-brand-green" : status === "announced" ? "border border-current" : "bg-muted"}`}
      />
      {DEAL_STATUS_LABEL[status]}
    </span>
  );
}
