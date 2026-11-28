import { HERO_PHOTOS } from "@/lib/hero-photos";
import type { Metadata } from "next";
import { Suspense } from "react";
import { DealTracker } from "@/components/deals/DealTracker";
import { PageHeader } from "@/components/prose/Prose";
import { DATA_AS_OF, getDeals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Deal Tracker",
  description:
    "Renewable energy M&A, project finance, development finance, equity raises, PPAs, IPOs and fund closes. See who bought what, for how much, and who financed it.",
};

export default function DealsPage() {
  return (
    <>
      <PageHeader
        photo={HERO_PHOTOS.deals}
        eyebrow="Deals"
        title="Renewable Energy Deals Worldwide"
        intro="A record of renewable energy transactions over the past five years, covering acquisitions, project finance, development finance, equity raises, power purchase agreements, IPOs and fund closes. Each entry is traced to its original announcement or report and the record is updated daily."
      />
      {/* Filters live in the URL and are read on the client, so the page stays static. */}
      <Suspense fallback={<div className="container-page py-10"><div className="skeleton h-96 rounded-xl" aria-label="Loading deals" /></div>}>
        <div className="pt-10">
          <DealTracker deals={getDeals()} asOf={DATA_AS_OF} />
        </div>
      </Suspense>
    </>
  );
}
