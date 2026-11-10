"use client";

import { ProjectMapLazy } from "@/components/map/ProjectMapLazy";
import type { MapPoint } from "@/lib/data";

/** Small flat map centred on one project. */
export function LocatorMap({ point }: { point: MapPoint }) {
  return (
    <div className="h-64 overflow-hidden rounded-[var(--radius)] border border-line">
      <ProjectMapLazy
        points={[point]}
        theme="light"
        projection="mercator"
        initialView={{ center: [point.lng, point.lat], zoom: 4.2 }}
        ariaLabel={`Location of ${point.name}`}
        selectedId={point.id}
      />
    </div>
  );
}
