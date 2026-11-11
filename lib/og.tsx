// Shared Open Graph image layout (1200×630), rendered with next/og at build time.
import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { BRAND_DARK, MarkOnDark } from "@/components/brand/Mark";

// Brand fonts for the image renderer (OFL-licensed, see assets/fonts/README.txt).
const font = (f: string) => readFileSync(path.join(process.cwd(), "assets", "fonts", f));
const FONTS = [
  { name: "Jakarta", data: font("PlusJakartaSans-800.ttf"), weight: 800 as const, style: "normal" as const },
  { name: "Nunito", data: font("Nunito-800.ttf"), weight: 800 as const, style: "normal" as const },
  { name: "Inter", data: font("Inter-500.ttf"), weight: 500 as const, style: "normal" as const },
];

export const OG_SIZE = { width: 1200, height: 630 };

export function ogImage({
  eyebrow,
  title,
  subtitle,
  accent = BRAND_DARK.tagline,
  stats = [],
  sample = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: string;
  stats?: { label: string; value: string }[];
  sample?: boolean;
}) {
  const bg = BRAND_DARK.tile;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: bg, color: "#fff", padding: 64, fontFamily: "Inter" }}>
        {/* Top row: accent + logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", height: 8, width: 120, background: accent, borderRadius: 4 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <MarkOnDark size={72} bg={bg} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontFamily: "Nunito" }}>
              <div style={{ display: "flex", fontSize: 48, fontWeight: 800, letterSpacing: -1.4, lineHeight: 0.95 }}>perpetual</div>
              <div style={{ display: "flex", fontSize: 15, fontWeight: 800, color: BRAND_DARK.tagline }}>All Things Renewables</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 24, color: "rgba(255,255,255,0.75)" }}>
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 14,
            fontFamily: "Jakarta",
            fontSize: title.length > 40 ? 62 : 78,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        {subtitle && <div style={{ display: "flex", marginTop: 18, fontSize: 30, color: "rgba(255,255,255,0.85)", maxWidth: 1000 }}>{subtitle}</div>}
        <div style={{ display: "flex", flex: 1 }} />
        <div style={{ display: "flex", gap: 56, borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 24 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.7)" }}>{s.label}</div>
              <div style={{ display: "flex", fontFamily: "Jakarta", fontSize: 40, fontWeight: 800 }}>{s.value}</div>
            </div>
          ))}
          {sample && !stats.length && <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.75)" }}>Sample data</div>}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: FONTS },
  );
}
