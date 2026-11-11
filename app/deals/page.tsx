import type { Metadata } from "next";
import { Suspense } from "react";
import { DealTracker } from "@/components/deals/DealTracker";
import { PageHeader } from "@/components/prose/Prose";
import { DATA_AS_OF, getDeals } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Deal tracker",
  description:
    "Renewable energy M&A, project finance, equity raises, PPAs, IPOs and fund closes: who bought what, for how much, and who financed it.",
};

export default function DealsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Deal tracker"
        title="Who is buying, selling and financing renewables"
        intro={`M&A, project finance, equity raises, PPAs, IPOs and fund closes, with values in their original currency and USD. Data compiled ${formatDate(DATA_AS_OF)}.`}
      />
      {/* Filters live in the URL and are read on the client, so the page stays static. */}
      <Suspense fallback={<div className="container-page py-10"><div className="skeleton h-96 rounded-xl" aria-label="Loading deals" /></div>}>
        <div className="pt-8">
          <DealTracker deals={getDeals()} asOf={DATA_AS_OF} />
        </div>
      </Suspense>
    </>
  );
}
