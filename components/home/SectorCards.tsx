import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { SectorSummary } from "@/lib/data";
import { TECHNOLOGIES } from "@/lib/tech";
import { TECH_PHOTOS } from "@/lib/tech-photos";
import type { Technology } from "@/lib/types";

const gw = (mw: number) => `${(mw / 1000).toLocaleString("en-GB", { maximumFractionDigits: mw < 10_000 ? 1 : 0 })} GW`;

/** Glass cards on the forest band: a photo inset, the sector, world capacity and deals on record. */
export function SectorCards({ counts }: { counts: Record<Technology, SectorSummary> }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
      {TECHNOLOGIES.map((t) => {
        const c = counts[t.id];
        const photo = TECH_PHOTOS[t.id];
        return (
          <li key={t.id}>
            <Link
              href={`/sectors/${t.id}`}
              className="group flex h-full flex-col rounded-[16px] border border-white/12 bg-white/[0.06] p-1.5 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.1]"
            >
              <span className="relative block h-24 overflow-hidden sm:h-32 rounded-[11px] bg-white/5">
                {photo && (
                  // eslint-disable-next-line @next/next/no-img-element -- self-hosted, credited on the sector page
                  <img
                    src={photo.src}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ objectPosition: photo.position ?? "center" }}
                  />
                )}
              </span>
              <span className="flex flex-1 flex-col px-2.5 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-4">
                <span className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg font-light tracking-[-0.02em] text-[var(--home-forest-ink)] sm:text-2xl">{t.label}</span>
                  <span
                    className="hidden size-7 shrink-0 place-items-center rounded-full bg-[var(--home-forest-ink)] text-[#1d2a22] transition-transform duration-200 group-hover:rotate-45 sm:grid"
                    aria-hidden
                  >
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </span>
                <span className="mt-3 space-y-1.5 text-[12px] sm:mt-4 sm:text-[13px] text-[var(--home-forest-muted)]">
                  {c.worldMW != null && (
                    <span className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full" style={{ background: t.hex }} aria-hidden />
                      <span className="tabular">{gw(c.worldMW)} installed worldwide</span>
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-white/40" aria-hidden />
                    <span className="tabular">
                      {c.deals.toLocaleString("en-GB")} {c.deals === 1 ? "deal" : "deals"} on record
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
