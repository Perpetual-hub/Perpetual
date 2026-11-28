import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SECTION_PHOTOS } from "@/lib/hero-photos";

export const metadata: Metadata = {
  title: "Knowledge",
  description: "How renewable energy works, from the technologies that generate clean power to the markets that finance it.",
};

export default function KnowledgePage() {
  return (
    <PageHero
      photo={SECTION_PHOTOS.knowledge}
      eyebrow="Knowledge"
      title="How Renewable Energy Works"
      lede="Clear guides to the technologies, markets and terms behind renewable energy."
    />
  );
}
