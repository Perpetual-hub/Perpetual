import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Perpetual: every renewable project, deal and policy shift, with a source behind every fact";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "All things renewables",
    title: "Every renewable project, deal and policy shift.",
    subtitle: "A global map with a source behind every fact.",
  });
}
