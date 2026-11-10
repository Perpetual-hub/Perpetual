import { getStats } from "@/lib/data";
import { formatGW } from "@/lib/format";
import { OG_SIZE, ogImage } from "@/lib/og";
import { TECHNOLOGIES, TECH_BY_ID, isTechnology } from "@/lib/tech";

export const alt = "Perpetual sector overview";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return TECHNOLOGIES.map((t) => ({ tech: t.id }));
}

export default async function Image({ params }: { params: Promise<{ tech: string }> }) {
  const { tech } = await params;
  if (!isTechnology(tech)) return ogImage({ eyebrow: "Sector", title: "Not found" });
  const t = TECH_BY_ID[tech];
  const s = getStats(tech);
  return ogImage({
    eyebrow: "Sector",
    title: t.label,
    subtitle: t.short,
    accent: t.hex,
    stats: [
      { label: "Projects", value: String(s.projects) },
      { label: "Operating", value: `${formatGW(s.operatingMW)} GW` },
      { label: "Pipeline", value: `${formatGW(s.pipelineMW)} GW` },
    ],
  });
}
