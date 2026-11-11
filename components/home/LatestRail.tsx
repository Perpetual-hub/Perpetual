import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TechTag } from "@/components/ui/TechTag";
import { TimeAgo } from "@/components/ui/TimeAgo";
import type { Technology } from "@/lib/types";

export interface RailItem {
  id: string;
  href: string;
  date: string;
  kicker: string;
  title: string;
  value?: string;
  tech?: Technology;
  isNew?: boolean;
}

/** Latest deals, on the right of the globe. */
export function LatestRail({ items }: { items: RailItem[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-6 pb-2 lg:pt-8">
        <h2 className="font-display text-sm font-semibold text-hero-muted">Latest deals</h2>
      </div>
      <ol className="flex-1 px-6">
        {items.map((it) => (
          <li key={it.id} className="border-t border-hero-line first:border-t-0">
            <Link href={it.href} className="group block py-4">
              <div className="mb-1.5 flex items-center gap-2.5 text-[11px] text-hero-muted">
                {it.isNew && (
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-sun">
                    <span className="size-1.5 rounded-full bg-brand-sun" aria-hidden />
                    New
                  </span>
                )}
                <TimeAgo date={it.date} className="tabular" />
                <span className="font-medium text-hero-ink">{it.kicker}</span>
                {it.tech && <TechTag tech={it.tech} tone="dark" size="xs" />}
              </div>
              <h3 className="font-sans text-[0.94rem] leading-snug font-semibold text-white decoration-white/40 underline-offset-2 group-hover:underline">
                {it.title}
              </h3>
              {it.value && <p className="tabular mt-1 text-[13px] text-hero-muted">{it.value}</p>}
            </Link>
          </li>
        ))}
      </ol>
      <div className="px-6 pt-2 pb-6">
        <Link href="/deals" className="group inline-flex items-center gap-1 text-sm font-medium text-brand-sky hover:text-white">
          Open the deal tracker
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
