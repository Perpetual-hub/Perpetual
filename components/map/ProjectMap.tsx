"use client";

// The MapLibre map used across the site (home globe, explorer, profiles).
// Always load it through ProjectMapLazy so MapLibre never runs on the server.
//
// Staying readable at scale (thousands of projects):
// - "projects" mode clusters points; a cluster's size follows its total GW, not its count,
//   and individual points shrink when zoomed out, so dense regions stay calm.
// - "countries" mode replaces points with one bubble per country (sized by GW).
import {
  GeoJSONSource,
  Map as MlMap,
  NavigationControl,
  setWorkerUrl,
  type ExpressionSpecification,
  type MapLayerMouseEvent,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import type { MapPoint } from "@/lib/data";
import { countryName, formatMW } from "@/lib/format";
import { TECHNOLOGIES, TECH_BY_ID } from "@/lib/tech";
import type { Technology } from "@/lib/types";

// Served from /public (copied by scripts/copy-maplibre-worker.mjs), because the
// bundler can't resolve MapLibre's default worker path.
setWorkerUrl("/vendor/maplibre-gl-worker.mjs");

export type MapTheme = "dark" | "light";
export type MapProjection = "globe" | "mercator";
export type MapMode = "projects" | "countries";

const STYLE_URL: Record<MapTheme, string> = {
  dark: "https://tiles.openfreemap.org/styles/dark",
  light: "https://tiles.openfreemap.org/styles/positron",
};

const OSM_ATTRIBUTION =
  '<a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';

/** Used only if the basemap can't be fetched (offline, blocked): points still render. */
function fallbackStyle(theme: MapTheme): StyleSpecification {
  return {
    version: 8,
    sources: {},
    layers: [
      { id: "background", type: "background", paint: { "background-color": theme === "dark" ? "#0c2a4f" : "#eef2f7" } },
    ],
  };
}

const colorExpr = [
  "match",
  ["get", "technology"],
  ...TECHNOLOGIES.flatMap((t) => [t.id, t.hex]),
  "#888888",
] as unknown as ExpressionSpecification;

// Square-root scale (area ∝ capacity), shrunk when zoomed out so dense areas don't pile up.
// `zoom` must be the top-level input of an interpolate, so the data scale nests inside it.
const sqrtMW: ExpressionSpecification = ["sqrt", ["get", "capacityMW"]];
const pointRadius: ExpressionSpecification = [
  "interpolate",
  ["linear"],
  ["zoom"],
  1,
  ["interpolate", ["linear"], sqrtMW, 0, 2.5, 40, 9],
  5,
  ["interpolate", ["linear"], sqrtMW, 0, 4, 40, 16],
];
const clusterRadius: ExpressionSpecification = ["interpolate", ["linear"], ["sqrt", ["get", "totalMW"]], 0, 11, 100, 30];
const countryRadius: ExpressionSpecification = ["interpolate", ["linear"], ["sqrt", ["get", "totalMW"]], 0, 6, 60, 30];

interface CountryAgg {
  code: string;
  lat: number;
  lng: number;
  projects: number;
  totalMW: number;
  byTech: Partial<Record<Technology, number>>;
}

// TODO(data): use a proper country-centroid table once real data arrives. For now the
// bubble sits at the mean position of that country's projects.
function aggregateCountries(points: MapPoint[]): CountryAgg[] {
  const m = new Map<string, CountryAgg & { n: number }>();
  for (const p of points) {
    const a = m.get(p.country) ?? { code: p.country, lat: 0, lng: 0, n: 0, projects: 0, totalMW: 0, byTech: {} };
    a.lat += p.lat;
    a.lng += p.lng;
    a.n += 1;
    a.projects += 1;
    a.totalMW += p.capacityMW;
    a.byTech[p.technology] = (a.byTech[p.technology] ?? 0) + p.capacityMW;
    m.set(p.country, a);
  }
  return [...m.values()].map(({ n, ...a }) => ({ ...a, lat: a.lat / n, lng: a.lng / n }));
}

const numId = (id: string) => Number(id.replace(/\D/g, ""));

function pointsGeoJSON(points: MapPoint[]): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: "FeatureCollection",
    features: points.map((p) => ({
      type: "Feature",
      id: numId(p.id),
      geometry: { type: "Point", coordinates: [p.lng, p.lat] },
      properties: { pid: p.id, technology: p.technology, capacityMW: p.capacityMW },
    })),
  };
}

function countriesGeoJSON(aggs: CountryAgg[]): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: "FeatureCollection",
    features: aggs.map((a, i) => ({
      type: "Feature",
      id: i + 1,
      geometry: { type: "Point", coordinates: [a.lng, a.lat] },
      properties: { code: a.code, totalMW: a.totalMW, projects: a.projects, label: a.code },
    })),
  };
}

type Hover =
  | { kind: "point"; p: MapPoint; x: number; y: number }
  | { kind: "country"; c: CountryAgg; x: number; y: number };

interface Props {
  points: MapPoint[];
  theme?: MapTheme;
  projection?: MapProjection;
  mode?: MapMode;
  /** Slow spin when idle. Ignored when the user prefers reduced motion. */
  autoRotate?: boolean;
  initialView?: { center: [number, number]; zoom: number };
  /** Fit the map to the points whenever they change (explorer). */
  fitToPoints?: boolean;
  onSelect?: (p: MapPoint) => void;
  onCountrySelect?: (code: string) => void;
  selectedId?: string;
  ariaLabel?: string;
  interactive?: boolean;
  showControls?: boolean;
}

export default function ProjectMap({
  points,
  theme = "light",
  projection = "globe",
  mode = "projects",
  autoRotate = false,
  initialView = { center: [20, 18], zoom: 1.3 },
  fitToPoints = false,
  onSelect,
  onCountrySelect,
  selectedId,
  ariaLabel = "Map of renewable energy projects",
  interactive = true,
  showControls = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const pointsRef = useRef(points);
  const countriesRef = useRef<CountryAgg[]>(aggregateCountries(points));
  const modeRef = useRef(mode);
  const onSelectRef = useRef(onSelect);
  const onCountryRef = useRef(onCountrySelect);
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState<Hover | null>(null);

  useEffect(() => {
    onSelectRef.current = onSelect;
    onCountryRef.current = onCountrySelect;
  }, [onSelect, onCountrySelect]);

  // Create the map once.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dark = theme === "dark";

    const map = new MlMap({
      container,
      style: STYLE_URL[theme],
      center: initialView.center,
      zoom: initialView.zoom,
      minZoom: 0.5,
      maxZoom: 14,
      interactive,
      attributionControl: { compact: true, customAttribution: OSM_ATTRIBUTION },
      maplibreLogo: false,
      renderWorldCopies: projection === "mercator",
    });
    mapRef.current = map;
    if (interactive && showControls) map.addControl(new NavigationControl({ showCompass: false }), "top-right");
    map.getCanvas().setAttribute("aria-label", ariaLabel);

    let usedFallback = false;
    map.on("error", (e) => {
      if (!usedFallback && !map.isStyleLoaded()) {
        usedFallback = true;
        console.warn("[Perpetual] Basemap unavailable, using fallback style.", e.error?.message);
        map.setStyle(fallbackStyle(theme));
      }
    });

    // `style.load` fires on first load and after any setStyle, so (re)add everything here.
    map.on("style.load", () => {
      // Projection must be set inside style.load: setting it earlier throws.
      map.setProjection({ type: projection });
      if (dark) tintDarkBasemap(map);
      map.setSky({
        "atmosphere-blend": ["interpolate", ["linear"], ["zoom"], 0, 1, 5, 1, 7, 0],
        "sky-color": dark ? "#061a33" : "#ffffff",
        "horizon-color": dark ? "#1b4a7a" : "#dbe7f3",
      } as never);
      const hasGlyphs = Boolean(map.getStyle().glyphs);
      const visible = (m: MapMode) => (modeRef.current === m ? "visible" : "none");

      // --- Projects: clustered points ---
      map.addSource("projects", {
        type: "geojson",
        data: pointsGeoJSON(pointsRef.current),
        cluster: true,
        clusterRadius: 44,
        clusterMaxZoom: 5,
        clusterProperties: { totalMW: ["+", ["get", "capacityMW"]] },
      });
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "projects",
        filter: ["has", "point_count"],
        layout: { visibility: visible("projects") },
        paint: {
          "circle-color": dark ? "rgba(90,168,230,0.18)" : "rgba(11,92,173,0.10)",
          "circle-stroke-color": dark ? "rgba(232,238,246,0.55)" : "rgba(8,60,110,0.55)",
          "circle-stroke-width": 1,
          "circle-radius": clusterRadius,
        },
      });
      if (hasGlyphs) {
        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "projects",
          filter: ["has", "point_count"],
          layout: {
            visibility: visible("projects"),
            "text-field": ["get", "point_count_abbreviated"],
            "text-size": 11,
            "text-font": ["Noto Sans Bold"],
            "text-allow-overlap": true,
          },
          paint: { "text-color": dark ? "#ffffff" : "#083b6e" },
        });
      }
      map.addLayer({
        id: "points",
        type: "circle",
        source: "projects",
        filter: ["!", ["has", "point_count"]],
        layout: { visibility: visible("projects") },
        paint: {
          "circle-color": colorExpr,
          "circle-radius": pointRadius,
          "circle-opacity": 0.95,
          "circle-stroke-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            "#f5b000",
            dark ? "#061a33" : "#ffffff",
          ],
          "circle-stroke-width": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            3,
            ["boolean", ["feature-state", "hover"], false],
            2.5,
            1,
          ],
        },
      });

      // --- Countries: one bubble per country ---
      map.addSource("countries", { type: "geojson", data: countriesGeoJSON(countriesRef.current) });
      map.addLayer({
        id: "country-bubbles",
        type: "circle",
        source: "countries",
        layout: { visibility: visible("countries") },
        paint: {
          "circle-color": dark ? "rgba(90,168,230,0.28)" : "rgba(11,92,173,0.16)",
          "circle-stroke-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "#f5b000",
            dark ? "rgba(232,238,246,0.75)" : "#0b5cad",
          ],
          "circle-stroke-width": ["case", ["boolean", ["feature-state", "hover"], false], 2, 1],
          "circle-radius": countryRadius,
        },
      });
      if (hasGlyphs) {
        map.addLayer({
          id: "country-labels",
          type: "symbol",
          source: "countries",
          layout: {
            visibility: visible("countries"),
            "text-field": ["get", "label"],
            "text-size": 10,
            "text-font": ["Noto Sans Bold"],
          },
          paint: { "text-color": dark ? "#ffffff" : "#083b6e" },
        });
      }
      setReady(true);
    });

    // ----- Interaction -----
    let hovered: { source: string; id: number | string } | undefined;
    const setHoverState = (next?: { source: string; id: number | string }) => {
      if (hovered) map.setFeatureState(hovered, { hover: false });
      hovered = next;
      if (next) map.setFeatureState(next, { hover: true });
      map.getCanvas().style.cursor = next ? "pointer" : "";
    };
    map.on("mousemove", "points", (e: MapLayerMouseEvent) => {
      const f = e.features?.[0];
      if (!f || f.id === undefined) return;
      setHoverState({ source: "projects", id: f.id });
      const p = pointsRef.current.find((x) => x.id === f.properties?.pid);
      if (p) setHover({ kind: "point", p, x: e.point.x, y: e.point.y });
    });
    map.on("mousemove", "country-bubbles", (e: MapLayerMouseEvent) => {
      const f = e.features?.[0];
      if (!f || f.id === undefined) return;
      setHoverState({ source: "countries", id: f.id });
      const c = countriesRef.current.find((x) => x.code === f.properties?.code);
      if (c) setHover({ kind: "country", c, x: e.point.x, y: e.point.y });
    });
    for (const layer of ["points", "country-bubbles"]) {
      map.on("mouseleave", layer, () => {
        setHoverState(undefined);
        setHover(null);
      });
    }
    map.on("mouseenter", "clusters", () => (map.getCanvas().style.cursor = "pointer"));
    map.on("mouseleave", "clusters", () => (map.getCanvas().style.cursor = ""));
    map.on("click", "points", (e) => {
      const p = pointsRef.current.find((x) => x.id === e.features?.[0]?.properties?.pid);
      if (p) onSelectRef.current?.(p);
    });
    map.on("click", "country-bubbles", (e) => {
      const code = e.features?.[0]?.properties?.code;
      if (code) onCountryRef.current?.(code);
    });
    map.on("click", "clusters", async (e) => {
      const f = e.features?.[0];
      const id = f?.properties?.cluster_id;
      if (id == null || f?.geometry.type !== "Point") return;
      const zoom = await (map.getSource("projects") as GeoJSONSource).getClusterExpansionZoom(id);
      map.easeTo({ center: f.geometry.coordinates as [number, number], zoom: zoom + 0.25, duration: reduceMotion ? 0 : 600 });
    });

    // ----- Idle spin: stops for good as soon as the user touches the map -----
    // Performance: starts only once the map has settled (after first paint), renders at
    // ~30fps, and pauses while the map is off-screen or the tab is hidden.
    let spinning = autoRotate && !reduceMotion;
    let visibleOnScreen = true;
    let frame = 0;
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    let last = 0;
    const FRAME_MS = 33;
    const spin = (t: number) => {
      if (!spinning) return;
      const dt = last ? t - last : FRAME_MS;
      if (dt >= FRAME_MS) {
        last = t;
        if (visibleOnScreen && !document.hidden && !map.isMoving()) {
          const c = map.getCenter();
          map.jumpTo({ center: [c.lng + Math.min(dt, 100) * 0.0035, c.lat] });
        }
      }
      frame = requestAnimationFrame(spin);
    };
    const stopSpin = () => {
      spinning = false;
      clearTimeout(startTimer);
      cancelAnimationFrame(frame);
    };
    if (spinning) {
      map.once("idle", () => {
        startTimer = setTimeout(() => {
          if (spinning) frame = requestAnimationFrame(spin);
        }, 2500);
      });
      for (const ev of ["mousedown", "touchstart", "wheel", "dragstart"] as const) map.once(ev, stopSpin);
      container.addEventListener("keydown", stopSpin, { once: true });
    }
    const io = new IntersectionObserver(([entry]) => (visibleOnScreen = entry.isIntersecting));
    io.observe(container);

    return () => {
      stopSpin();
      io.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // The map is created once; prop changes are applied by the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update data when the filtered points change.
  useEffect(() => {
    pointsRef.current = points;
    countriesRef.current = aggregateCountries(points);
    const map = mapRef.current;
    if (!map || !ready) return;
    (map.getSource("projects") as GeoJSONSource | undefined)?.setData(pointsGeoJSON(points));
    (map.getSource("countries") as GeoJSONSource | undefined)?.setData(countriesGeoJSON(countriesRef.current));
    if (fitToPoints && points.length) {
      const lngs = points.map((p) => p.lng);
      const lats = points.map((p) => p.lat);
      map.fitBounds(
        [
          [Math.min(...lngs), Math.min(...lats)],
          [Math.max(...lngs), Math.max(...lats)],
        ],
        { padding: 80, maxZoom: 5, duration: 600 },
      );
    }
  }, [points, ready, fitToPoints]);

  // Switch between projects and countries.
  useEffect(() => {
    modeRef.current = mode;
    const map = mapRef.current;
    if (!map || !ready) return;
    const set = (ids: string[], on: boolean) =>
      ids.forEach((id) => map.getLayer(id) && map.setLayoutProperty(id, "visibility", on ? "visible" : "none"));
    set(["clusters", "cluster-count", "points"], mode === "projects");
    set(["country-bubbles", "country-labels"], mode === "countries");
  }, [mode, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (map && ready) map.setProjection({ type: projection });
  }, [projection, ready]);

  // Highlight the selected point.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !selectedId) return;
    const id = numId(selectedId);
    map.setFeatureState({ source: "projects", id }, { selected: true });
    return () => {
      if (map.getSource("projects")) map.setFeatureState({ source: "projects", id }, { selected: false });
    };
  }, [selectedId, ready]);

  return (
    <div className={`relative h-full w-full ${theme === "dark" ? "map-dark" : ""}`}>
      {/* Not absolutely positioned: maplibre-gl.css forces `position: relative` on the container. */}
      <div ref={containerRef} className="h-full w-full" />
      {hover && <Tooltip hover={hover} theme={theme} />}
    </div>
  );
}

function Tooltip({ hover, theme }: { hover: Hover; theme: MapTheme }) {
  const dark = theme === "dark";
  const muted = dark ? "text-hero-muted" : "text-muted";
  return (
    <div
      role="tooltip"
      className={`pointer-events-none absolute z-10 w-max max-w-64 -translate-x-1/2 -translate-y-full rounded-lg border px-3 py-2 text-xs shadow-sm ${
        dark ? "border-hero-line bg-[#0b2546] text-hero-ink" : "border-line bg-white text-ink"
      }`}
      style={{ left: hover.x, top: hover.y - 14 }}
    >
      {hover.kind === "point" ? (
        <>
          <div className="leading-snug font-semibold">{hover.p.name}</div>
          <div className={`mt-1 flex items-center gap-1.5 tabular ${muted}`}>
            <span className="size-2 rounded-full" style={{ background: TECH_BY_ID[hover.p.technology].hex }} aria-hidden />
            {TECH_BY_ID[hover.p.technology].label} · {formatMW(hover.p.capacityMW)}
            {hover.p.storageMWh ? ` / ${hover.p.storageMWh.toLocaleString("en")} MWh` : ""} · {hover.p.country}
          </div>
        </>
      ) : (
        <>
          <div className="leading-snug font-semibold">{countryName(hover.c.code)}</div>
          <div className={`mt-0.5 tabular ${muted}`}>
            {hover.c.projects} projects · {formatMW(hover.c.totalMW)}
          </div>
          <ul className="mt-1.5 space-y-0.5">
            {Object.entries(hover.c.byTech)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([t, mw]) => (
                <li key={t} className="flex items-center gap-1.5 tabular">
                  <span className="size-2 rounded-full" style={{ background: TECH_BY_ID[t as Technology].hex }} aria-hidden />
                  {TECH_BY_ID[t as Technology].label}
                  <span className={`ml-auto pl-3 ${muted}`}>{formatMW(mw)}</span>
                </li>
              ))}
          </ul>
          <div className={`mt-1.5 ${muted}`}>Click for country profile</div>
        </>
      )}
    </div>
  );
}

/** Pull the OpenFreeMap dark style towards the brand navy so the globe sits in the hero. */
function tintDarkBasemap(map: MlMap) {
  for (const layer of map.getStyle().layers ?? []) {
    try {
      if (layer.type === "background") map.setPaintProperty(layer.id, "background-color", "#0d2c52");
      else if (layer.type === "fill" && /water|ocean/.test(layer.id)) map.setPaintProperty(layer.id, "fill-color", "#071d3a");
      else if (layer.type === "line" && /boundary|admin/.test(layer.id))
        map.setPaintProperty(layer.id, "line-color", "rgba(159,178,200,0.35)");
    } catch {
      // Unknown layer shape: leave it as the style defines it.
    }
  }
}
