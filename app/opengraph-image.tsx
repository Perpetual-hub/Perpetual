import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Perpetual: follow the money behind renewable energy";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "All things renewables",
    title: "Follow the money behind renewable energy.",
    subtitle: "Deals, new projects and how investable each country is, with a source behind every fact.",
  });
}
