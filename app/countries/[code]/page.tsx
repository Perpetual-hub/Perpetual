import { Suspense } from "react";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaPage } from "@/components/area/AreaPage";
import { countryStats, getAllCountryCodes, getCountryProfile } from "@/lib/data";

export function generateStaticParams() {
  return getAllCountryCodes().map((code) => ({ code }));
}

export async function generateMetadata({ params }: PageProps<"/countries/[code]">): Promise<Metadata> {
  const p = getCountryProfile((await params).code);
  if (!p) return {};
  return {
    title: `${p.summary.name} Renewable Energy Statistics`,
    description: countryStats.get(p.summary.key)
      ? `Installed renewable capacity in ${p.summary.name} by technology, from official IRENA statistics, with deals and policy.`
      : `${p.summary.deals} renewable energy deals in ${p.summary.name}, with its Policy Review.`,
  };
}

export default function CountryPage({ params }: PageProps<"/countries/[code]">) {
  // URL params sit behind Suspense so the shared App Shell can prefetch instantly.
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <CountryPageContent params={params} />
    </Suspense>
  );
}

async function CountryPageContent({ params }: { params: PageProps<"/countries/[code]">["params"] }) {
  const profile = getCountryProfile((await params).code);
  if (!profile) notFound();
  return <AreaPage profile={profile} />;
}
