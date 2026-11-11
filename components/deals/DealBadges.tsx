import { DEAL_STATUS_LABEL } from "@/lib/format";
import type { DealStatus } from "@/lib/types";

// Same palette as project status badges (components/ui/Badge.tsx).
const STYLE: Record<DealStatus, { box: string; dot: string }> = {
  announced: { box: "border-brand-blue/30 bg-[#eef4fb] text-brand-blue", dot: "bg-brand-blue" },
  completed: { box: "border-brand-green/40 bg-[#eef8f0] text-[#1f6e30]", dot: "bg-brand-green" },
  terminated: { box: "border-[#c2362b]/40 bg-[#fdf0ef] text-[#a8261c]", dot: "bg-[#c2362b]" },
};

/** Deal status as a coloured label; the text always names the status, so colour is never the only signal. */
export function DealStatusBadge({ status }: { status: DealStatus }) {
  const st = STYLE[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${st.box}`}>
      <span aria-hidden className={`size-1.5 rounded-full ${st.dot}`} />
      {DEAL_STATUS_LABEL[status]}
    </span>
  );
}
