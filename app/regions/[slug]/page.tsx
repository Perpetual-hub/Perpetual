import { Suspense } from "react";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaPage } from "@/components/area/AreaPage";
import { getRegionList, getRegionProfile } from "@/lib/data";

export function generateStaticParams() {
  return getRegionList().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/regions/[slug]">): Promise<Metadata> {
  const p = getRegionProfile((await params).slug);
  if (!p) return {};
  return {
    title: `${p.summary.name}: Renewable Energy Statistics`,
    description: `Installed renewable capacity across ${p.summary.countries} countries in ${p.summary.name}, from official IRENA statistics, with deals.`,
  };
}

export default function RegionPage({ params }: PageProps<"/regions/[slug]">) {
  // URL params sit behind Suspense so the shared App Shell can prefetch instantly.
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <RegionPageContent params={params} />
    </Suspense>
  );
}

async function RegionPageContent({ params }: { params: PageProps<"/regions/[slug]">["params"] }) {
  const profile = getRegionProfile((await params).slug);
  if (!profile) notFound();
  return <AreaPage profile={profile} />;
}
