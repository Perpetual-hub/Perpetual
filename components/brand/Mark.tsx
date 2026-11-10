// The Perpetual mark, from the logo design canvas, Round 5 ("Turbine: panel, wind, drop"),
// white-background version, "Ocean & Leaf" palette. A three-blade turbine: a solar panel
// with a sun, a wind blade with swirls, and a water drop with a wave, around a navy hub.
// The mark uses white cut-outs, so only place it on light surfaces.

export const BRAND_COLORS = {
  blue: "#0B5CAD",
  green: "#34A04A",
  sky: "#5AA9E6",
  navy: "#083B6E",
  sun: "#F5B000",
};

const c = BRAND_COLORS;

/** Full-detail mark (use at 40px and up). */
export function Mark({ size = 40, title }: { size?: number; title?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g>
        <polygon points="53,56 67,56 76,13 44,13" fill={c.blue} stroke={c.blue} strokeWidth="4" strokeLinejoin="round" />
        <g stroke="#FFFFFF" strokeWidth="2.5">
          <line x1="60" y1="12" x2="60" y2="52" />
          <line x1="44" y1="27" x2="76" y2="27" />
          <line x1="47" y1="41" x2="73" y2="41" />
        </g>
        <circle cx="76" cy="12" r="9" fill={c.sun} stroke="#FFFFFF" strokeWidth="3" />
      </g>
      <g transform="rotate(120 60 60)">
        <path d="M53 56 C44 36 48 12 64 4 C76 16 74 40 67 56 Z" fill={c.green} />
        <g fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
          <path d="M50 40 H62 a4 4 0 1 0 -4 -4" />
          <path d="M51 28 H66 a4 4 0 1 0 -4 -4" />
        </g>
      </g>
      <g transform="rotate(240 60 60)">
        <path d="M60 56 C55 46 45 36 45 25 A15 15 0 0 1 75 25 C75 36 65 46 60 56 Z" fill={c.sky} />
        <g fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
          <path d="M49 25 q5.5 -4 11 0 t11 0" />
          <path d="M52 35 q4 -3 8 0 t8 0" />
        </g>
      </g>
      <circle cx="60" cy="60" r="11" fill="#FFFFFF" stroke={c.navy} strokeWidth="5" />
      <circle cx="60" cy="60" r="3.5" fill={c.navy} />
    </svg>
  );
}

/** Simplified mark for small sizes (≤ 32px), as drawn on the canvas's 32px sample. */
export function MarkSmall({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      <g>
        <polygon points="52,58 68,58 78,12 42,12" fill={c.blue} stroke={c.blue} strokeWidth="5" strokeLinejoin="round" />
        <g stroke="#FFFFFF" strokeWidth="5">
          <line x1="60" y1="10" x2="60" y2="52" />
          <line x1="40" y1="32" x2="80" y2="32" />
        </g>
        <circle cx="77" cy="12" r="11" fill={c.sun} />
      </g>
      <g transform="rotate(120 60 60)">
        <path d="M52 58 C42 36 46 10 64 2 C78 14 76 40 68 58 Z" fill={c.green} />
        <path d="M49 32 H64 a5 5 0 1 0 -5 -5" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform="rotate(240 60 60)">
        <path d="M60 58 C54 47 43 37 43 25 A17 17 0 0 1 77 25 C77 37 66 47 60 58 Z" fill={c.sky} />
        <path d="M48 27 q6 -5 12 0 t12 0" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      </g>
      <circle cx="60" cy="60" r="12" fill={c.navy} />
    </svg>
  );
}

/** Round 5 dark-tile colours (the canvas's "darkBg" default and the updated tagline green). */
export const BRAND_DARK = {
  tile: "#0E4F91",
  tagline: "#54E071",
  /** Footer background: the same deep navy as the globe hero (--hero-bg). */
  footer: "#061A33",
};

/**
 * The mark for dark backgrounds, as drawn on the Round 5 dark tile: white solar blade with
 * tile-coloured panel lines, navy hub with a white ring. `bg` must match the surface behind it,
 * because the cut-out lines are drawn in that colour.
 */
export function MarkOnDark({ size = 40, bg = BRAND_DARK.tile }: { size?: number; bg?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      <g>
        <polygon points="53,56 67,56 76,13 44,13" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
        <g stroke={bg} strokeWidth="2.5">
          <line x1="60" y1="12" x2="60" y2="52" />
          <line x1="44" y1="27" x2="76" y2="27" />
          <line x1="47" y1="41" x2="73" y2="41" />
        </g>
        <circle cx="76" cy="12" r="9" fill={c.sun} stroke={bg} strokeWidth="3" />
      </g>
      <g transform="rotate(120 60 60)">
        <path d="M53 56 C44 36 48 12 64 4 C76 16 74 40 67 56 Z" fill={c.green} />
        <g fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
          <path d="M50 40 H62 a4 4 0 1 0 -4 -4" />
          <path d="M51 28 H66 a4 4 0 1 0 -4 -4" />
        </g>
      </g>
      <g transform="rotate(240 60 60)">
        <path d="M60 56 C55 46 45 36 45 25 A15 15 0 0 1 75 25 C75 36 65 46 60 56 Z" fill={c.sky} />
        <g fill="none" stroke={bg} strokeWidth="3" strokeLinecap="round">
          <path d="M49 25 q5.5 -4 11 0 t11 0" />
          <path d="M52 35 q4 -3 8 0 t8 0" />
        </g>
      </g>
      <circle cx="60" cy="60" r="11" fill={c.navy} stroke="#FFFFFF" strokeWidth="5" />
      <circle cx="60" cy="60" r="3.5" fill="#FFFFFF" />
    </svg>
  );
}
