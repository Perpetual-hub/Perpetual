import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Perpetual follows the money behind renewable energy";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "All things renewables",
    title: "All things renewable energy, in one place.",
    subtitle: "Knowledge, deals, policy and statistics for renewable energy, with a source behind every fact.",
  });
}
