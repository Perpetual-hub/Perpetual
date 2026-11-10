import { getProject, getProjects } from "@/lib/data";
import { STATUS_LABEL, countryName, formatMW } from "@/lib/format";
import { OG_SIZE, ogImage } from "@/lib/og";
import { TECH_BY_ID } from "@/lib/tech";

export const alt = "Perpetual project profile";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) return ogImage({ eyebrow: "Project", title: "Project not found" });
  const t = TECH_BY_ID[p.technology];
  return ogImage({
    eyebrow: `${t.label} project${p.isSample ? " · sample data" : ""}`,
    title: p.name,
    subtitle: `${p.subType ? `${p.subType[0].toUpperCase()}${p.subType.slice(1)} · ` : ""}${countryName(p.country)}`,
    accent: t.hex,
    stats: [
      { label: "Capacity", value: formatMW(p.capacityMW) },
      { label: "Status", value: STATUS_LABEL[p.status] },
      ...(p.dates.cod ? [{ label: p.status === "operating" ? "Operating since" : "Expected COD", value: p.dates.cod.date.slice(0, 4) }] : []),
    ],
  });
}
