import { Suspense } from "react";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaPage } from "@/components/area/AreaPage";
import { getCountries, getCountryProfile } from "@/lib/data";
import { formatGW } from "@/lib/format";

export function generateStaticParams() {
  return getCountries().map((c) => ({ code: c.key }));
}

export async function generateMetadata({ params }: PageProps<"/countries/[code]">): Promise<Metadata> {
  const p = getCountryProfile((await params).code);
  if (!p) return {};
  return {
    title: `${p.summary.name}: renewable energy statistics`,
    description: `${p.summary.projects} renewable projects and ${formatGW(p.summary.totalMW)} GW tracked in ${p.summary.name}, by technology and status, with deals and policy news.`,
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
