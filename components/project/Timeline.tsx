import type { DateValue } from "@/lib/types";
import { formatDate } from "@/lib/format";

export interface Milestone {
  label: string;
  value?: DateValue;
}

/**
 * Project milestones in order. Confirmed dates get a filled marker and solid line;
 * estimated dates get a hollow marker, dashed line and an "Estimated" label (never colour alone).
 */
export function Timeline({ milestones }: { milestones: Milestone[] }) {
  const items = milestones.filter((m) => m.value);
  return (
    <ol className="relative">
      {items.map((m, i) => {
        const est = m.value!.confidence === "estimated";
        const last = i === items.length - 1;
        return (
          <li key={m.label} className="relative flex gap-4 pb-6 last:pb-0">
            {!last && (
              <span
                aria-hidden
                className={`absolute top-4 left-[7px] h-[calc(100%-0.5rem)] border-l-2 ${
                  items[i + 1].value!.confidence === "estimated" ? "border-dashed border-[#c4cfdc]" : "border-brand-blue/40"
                }`}
              />
            )}
            <span
              aria-hidden
              className={`relative mt-1 size-4 shrink-0 rounded-full border-2 ${
                est ? "border-[#9aabbf] bg-white" : "border-brand-blue bg-brand-blue"
              }`}
            />
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4">
              <span className="text-sm font-medium text-ink">{m.label}</span>
              <span className={`tabular text-sm ${est ? "text-muted" : "font-semibold text-ink"}`}>
                {formatDate(m.value!.date)}
                <span className={`ml-2 text-xs ${est ? "italic" : "text-[#1f6e30]"}`}>{est ? "Estimated" : "Confirmed"}</span>
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
