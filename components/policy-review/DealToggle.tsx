"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { SegmentId } from "@/lib/policy-review/types";

/** Utility-scale or C&I, kept in the address (?deal=ci) so a view can be shared. */
export function useDeal(): SegmentId {
  return useSearchParams().get("deal") === "ci" ? "ci" : "utility";
}

export function DealToggle({ tone = "light" }: { tone?: "light" | "dark" }) {
  const deal = useDeal();
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const set = (d: SegmentId) => {
    const q = new URLSearchParams(sp);
    if (d === "ci") q.set("deal", "ci");
    else q.delete("deal");
    router.replace(q.size ? `${pathname}?${q}` : pathname, { scroll: false });
  };
  const dark = tone === "dark";
  return (
    <div role="radiogroup" aria-label="Deal type" className={`inline-flex rounded-full p-1 ${dark ? "bg-white/10" : "border border-line bg-white"}`}>
      {(["utility", "ci"] as const).map((d) => (
        <button
          key={d}
          type="button"
          role="radio"
          aria-checked={deal === d}
          onClick={() => set(d)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            deal === d ? (dark ? "bg-hero-ink text-[#0b1f3a]" : "bg-[#0b1f3a] text-white") : dark ? "text-hero-ink/80 hover:text-hero-ink" : "text-muted hover:text-ink"
          }`}
        >
          {d === "utility" ? "Utility-scale" : "C&I"}
        </button>
      ))}
    </div>
  );
}
