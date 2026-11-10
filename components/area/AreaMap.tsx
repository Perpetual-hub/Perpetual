"use client";

import { useState } from "react";
import { ProjectDrawer } from "@/components/map/ProjectDrawer";
import { ProjectMapLazy } from "@/components/map/ProjectMapLazy";
import type { MapPoint } from "@/lib/data";

export function AreaMap({ points, label }: { points: MapPoint[]; label: string }) {
  const [selected, setSelected] = useState<MapPoint | null>(null);
  return (
    <div className="h-[420px] overflow-hidden rounded-[var(--radius)] border border-line">
      <ProjectMapLazy
        points={points}
        theme="light"
        projection="mercator"
        fitToPoints
        onSelect={setSelected}
        selectedId={selected?.id}
        ariaLabel={`Map of projects in ${label}`}
      />
      <ProjectDrawer point={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
