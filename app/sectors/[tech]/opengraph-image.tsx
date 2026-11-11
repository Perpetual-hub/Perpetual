import { getDeals, getGlobalCapacity } from "@/lib/data";
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
  const deals = getDeals().filter((d) => d.technologies.includes(tech));
  const last = getGlobalCapacity().rows.at(-1)!;
  const world = (last as unknown as Record<string, number>)[tech];
  return ogImage({
    eyebrow: "Sector",
    title: t.label,
    subtitle: t.short,
    accent: t.hex,
    stats: [
      ...(world != null ? [{ label: `World capacity, ${last.year}`, value: `${Math.round(world).toLocaleString("en")} GW` }] : []),
      { label: "Deals on record", value: String(deals.length) },
    ],
  });
}
