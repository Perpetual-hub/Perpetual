import type { Metadata } from "next";
import { Suspense } from "react";
import { CorrectionForm } from "@/components/prose/CorrectionForm";
import { PageHeader } from "@/components/prose/Prose";
import { getDeals, getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Report a correction",
  description: "Spotted something wrong on Perpetual? Tell us what it should say and where you found it.",
};

export default function CorrectionsPage() {
  const records = [
    ...getProjects().map((p) => ({ id: p.id, label: `Project: ${p.name}` })),
    ...getDeals().map((d) => ({ id: d.id, label: `Deal: ${d.title}` })),
  ];
  return (
    <>
      <PageHeader
        title="Report a correction"
        intro="Every fact on Perpetual should be traceable and right. If something is wrong or out of date, tell us what it should say and where you found it."
      />
      <div className="container-page grid gap-12 py-12 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)]">
        {/* The form reads ?record= from the URL, so it sits behind Suspense. */}
        <Suspense fallback={<div className="skeleton h-[520px] rounded-xl" aria-label="Loading form" />}>
          <CorrectionForm records={records} />
        </Suspense>
        <aside className="h-fit rounded-[var(--radius)] border border-line bg-surface-2 p-6 text-sm leading-relaxed text-muted">
          <h2 className="font-sans text-base font-semibold text-ink">Review process</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>We check your report against the source you give, and others.</li>
            <li>If it holds up, we update the record and its &ldquo;last updated&rdquo; date.</li>
            <li>The change is listed in the methodology changelog.</li>
          </ol>
          <p className="mt-4">
            In this beta the form is not connected yet, so nothing is sent. Please don&rsquo;t include personal data beyond an
            email.
          </p>
        </aside>
      </div>
    </>
  );
}
