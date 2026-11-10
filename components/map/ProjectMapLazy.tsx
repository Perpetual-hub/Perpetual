"use client";

import dynamic from "next/dynamic";
import type { MapTheme } from "./ProjectMap";
import { MapPlaceholder } from "./MapPlaceholder";

/** Client-only map. MapLibre needs WebGL and `window`, so it never renders on the server. */
export const ProjectMapLazy = dynamic(() => import("./ProjectMap"), {
  ssr: false,
  loading: () => <MapPlaceholder theme="light" />,
});

/** Same map, but with the dark placeholder (for the hero). MapLibre (~1 MB) is fetched
 *  once the browser is idle, so it never competes with the page's first paint. */
export const ProjectGlobeLazy = dynamic(
  () =>
    new Promise<void>((resolve) => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout: 1500 });
      else setTimeout(resolve, 300);
    }).then(() => import("./ProjectMap")),
  { ssr: false, loading: () => <MapPlaceholder theme="dark" /> },
);

export type { MapTheme };
