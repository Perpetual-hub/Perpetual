import type { Metadata } from "next";
import { Suspense } from "react";
import { Explorer } from "@/components/explorer/Explorer";
import { ExplorerSkeleton } from "@/components/explorer/ExplorerSkeleton";
import { getMapPoints } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore renewable energy projects worldwide by technology, status, country, capacity, ownership and financing. Download any view as CSV.",
};

export default function ProjectsPage() {
  // Filters live in the URL and are read on the client, so the page itself stays static.
  return (
    <Suspense fallback={<ExplorerSkeleton />}>
      <Explorer points={getMapPoints()} />
    </Suspense>
  );
}
