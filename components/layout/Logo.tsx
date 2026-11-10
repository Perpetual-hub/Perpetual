import { BRAND_COLORS, BRAND_DARK, Mark, MarkOnDark } from "@/components/brand/Mark";

/**
 * The Perpetual logo (Round 5, white-background version): mark + "perpetual" in Nunito 800,
 * with "All Things Renewables" right-aligned underneath in green when `withTagline`.
 * Proportions follow the canvas: mark ≈ 1.3× the wordmark size, tagline ≈ 0.29× it.
 * Light surfaces only.
 */
export function Logo({ withTagline = false, size = 34 }: { withTagline?: boolean; size?: number }) {
  const mark = Math.round(size * 1.32);
  return (
    <span className="inline-flex items-center" style={{ gap: size * 0.22 }}>
      {/* Without the tagline, centre the mark on the letters' ink (ascender to descender), not the
          text box: Nunito's box sits high, so the mark is nudged down by 0.17em (measured). */}
      <span style={withTagline ? undefined : { transform: `translateY(${(size * 0.17).toFixed(1)}px)` }} className="flex">
        <Mark size={mark} />
      </span>
      <span className="flex flex-col items-end font-wordmark" aria-hidden>
        <span
          style={{ fontSize: size, color: BRAND_COLORS.blue, letterSpacing: "-0.03em", lineHeight: 0.95 }}
          className="font-extrabold"
        >
          perpetual
        </span>
        {withTagline && (
          <span
            style={{ fontSize: size * 0.29, color: BRAND_DARK.tagline, lineHeight: 1.15, marginTop: size * 0.04 }}
            className="font-extrabold whitespace-nowrap"
          >
            All Things Renewables
          </span>
        )}
      </span>
      <span className="sr-only">Perpetual{withTagline ? ", All Things Renewables" : ""}</span>
    </span>
  );
}

/**
 * Logo for the dark footer (Round 5 dark tile): white mark variant, white wordmark,
 * tagline in the updated green. Proportions from the tile: mark 72, wordmark 52, tagline 16.
 */
export function LogoOnDark({ size = 52, bg = BRAND_DARK.tile }: { size?: number; bg?: string }) {
  return (
    <span className="inline-flex items-center" style={{ gap: size * 0.27 }}>
      <MarkOnDark size={Math.round(size * 1.385)} bg={bg} />
      <span className="flex flex-col items-end font-wordmark" aria-hidden>
        <span className="font-extrabold text-white" style={{ fontSize: size, letterSpacing: "-0.03em", lineHeight: 0.95 }}>
          perpetual
        </span>
        <span
          className="font-extrabold whitespace-nowrap"
          style={{ fontSize: size * 0.31, color: BRAND_DARK.tagline, lineHeight: 1.2 }}
        >
          All Things Renewables
        </span>
      </span>
      <span className="sr-only">Perpetual, All Things Renewables</span>
    </span>
  );
}
