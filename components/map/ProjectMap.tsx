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
import { MILESTONE_LABEL } from "@/lib/milestones";
import { POLICY_RAMP, type PolicyCell, type PolicyScores } from "@/lib/policy-colors";
import { countryName, formatDate, formatMW } from "@/lib/format";
import { TECHNOLOGIES, TECH_BY_ID } from "@/lib/tech";
import type { Technology } from "@/lib/types";

// Served from /public (copied by scripts/copy-maplibre-worker.mjs), because the
// bundler can't resolve MapLibre's default worker path.
setWorkerUrl("/vendor/maplibre-gl-worker.mjs");

export type MapTheme = "dark" | "light";
export type MapProjection = "globe" | "mercator";
export type MapMode = "projects" | "countries" | "policy";

export type { PolicyCell, PolicyScores } from "@/lib/policy-colors";

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
      { id: "background", type: "background", paint: { "background-color": theme === "dark" ? "#041330" : "#eef2f7" } },
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
/** Point radius scaled by `k` (zoom must stay the top-level interpolate input). */
function pulseRadius(k: number): ExpressionSpecification {
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    1,
    ["interpolate", ["linear"], sqrtMW, 0, 3 * k, 40, 10 * k],
    5,
    ["interpolate", ["linear"], sqrtMW, 0, 4.5 * k, 40, 16 * k],
  ];
}

/** Land colours on the hero globe: a touch of green normally; neutral slate under the policy heatmap. */
const LAND = { projects: "#1d5550", vegetation: "#226352", policy: "#24364f" };

/** True when the basemap tiles loaded (not the offline fallback, whose background is the ocean). */
function hasTiles(map: MlMap) {
  return Object.values(map.getStyle().sources ?? {}).some((src) => src.type === "vector");
}

function setLand(map: MlMap, color: string) {
  if (map.getLayer("land-fill")) map.setPaintProperty("land-fill", "fill-color", color);
  const tiles = hasTiles(map);
  for (const layer of map.getStyle().layers ?? []) {
    try {
      if (layer.type === "background" && tiles) map.setPaintProperty(layer.id, "background-color", color);
      else if (layer.type === "fill" && /landcover|landuse|park|wood|grass/.test(layer.id))
        map.setPaintProperty(layer.id, "fill-color", color === LAND.policy ? color : LAND.vegetation);
    } catch {
      // Unknown layer shape: leave it.
    }
  }
}

/** Zoom at which the globe's diameter is about `px` pixels (measured for MapLibre's globe). */
function globeZoomFor(px: number): number {
  return Math.log2(Math.max(px, 80) / 133);
}

/** Writes scores onto the country outlines and refreshes the policy source. */
function applyPolicy(map: MlMap, fc: GeoJSON.FeatureCollection, scores?: PolicyScores) {
  const data: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: fc.features.map((f) => {
      const cell = scores?.[(f.properties as { iso2: string }).iso2];
      return { ...f, properties: { ...f.properties, score: cell?.score ?? null, flagged: !!cell?.flagged } };
    }),
  };
  (map.getSource("policy") as GeoJSONSource | undefined)?.setData(data);
}

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
  | { kind: "policy"; iso2: string; name: string; cell?: PolicyCell; x: number; y: number }
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
  /** Hero styling: brighter globe, glowing points, pulse rings, no clustering. */
  vivid?: boolean;
  /** Size the globe to this share of the container's shorter side (and keep it fitted on resize). */
  fitGlobe?: number;
  /** Scores for the policy heatmap (mode "policy"). */
  policy?: PolicyScores;
  onPolicySelect?: (iso2: string, name: string) => void;
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
  vivid = false,
  fitGlobe,
  policy,
  onPolicySelect,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const pointsRef = useRef(points);
  const countriesRef = useRef<CountryAgg[]>(aggregateCountries(points));
  const modeRef = useRef(mode);
  const onSelectRef = useRef(onSelect);
  const onCountryRef = useRef(onCountrySelect);
  const policyRef = useRef(policy);
  const onPolicyRef = useRef(onPolicySelect);
  const geoRef = useRef<GeoJSON.FeatureCollection | null>(null);
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState<Hover | null>(null);

  useEffect(() => {
    onSelectRef.current = onSelect;
    onCountryRef.current = onCountrySelect;
    onPolicyRef.current = onPolicySelect;
  }, [onSelect, onCountrySelect, onPolicySelect]);

  // Create the map once.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dark = theme === "dark";

    const fittedZoom = () => {
      const r = container.getBoundingClientRect();
      return globeZoomFor(fitGlobe! * Math.min(r.width, r.height));
    };
    const map = new MlMap({
      container,
      style: STYLE_URL[theme],
      center: initialView.center,
      zoom: fitGlobe ? fittedZoom() : initialView.zoom,
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
      if (dark) tintDarkBasemap(map, vivid);
      map.setSky({
        "atmosphere-blend": ["interpolate", ["linear"], ["zoom"], 0, 1, 5, 1, 7, 0],
        "sky-color": dark ? "#061a33" : "#ffffff",
        "horizon-color": dark ? (vivid ? "#3d8ee0" : "#1b4a7a") : "#dbe7f3",
      } as never);

      const hasGlyphs = Boolean(map.getStyle().glyphs);
      const visible = (m: MapMode) => (modeRef.current === m ? "visible" : "none");

      // --- Policy heatmap: country fills (data loaded on first use) ---
      map.addSource("policy", { type: "geojson", data: { type: "FeatureCollection", features: [] }, promoteId: "iso2" });
      if (vivid) {
        // Our own land layer (same outlines), so continents read clearly even if tiles are slow.
        map.addLayer({
          id: "land-fill",
          type: "fill",
          source: "policy",
          maxzoom: 4.5,
          // The coarse Antarctica outline draws a stray ring on the globe; leave it out.
          filter: ["!=", ["get", "iso2"], "AQ"],
          paint: { "fill-color": modeRef.current === "policy" ? LAND.policy : LAND.projects, "fill-opacity": 1 },
        });
      }
      map.addLayer({
        id: "policy-fill",
        type: "fill",
        source: "policy",
        layout: { visibility: visible("policy") },
        paint: {
          "fill-color": [
            "case",
            ["==", ["get", "score"], null],
            "rgba(255,255,255,0.03)",
            ["interpolate", ["linear"], ["get", "score"], ...POLICY_RAMP.flat()],
          ] as unknown as ExpressionSpecification,
          "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.88],
        },
      });
      map.addLayer({
        id: "policy-line",
        type: "line",
        source: "policy",
        layout: { visibility: visible("policy") },
        paint: {
          "line-color": ["case", ["boolean", ["feature-state", "hover"], false], "#f5b000", "rgba(6,26,51,0.9)"],
          "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 2, 0.6],
        },
      });
      map.addLayer({
        id: "policy-flag",
        type: "line",
        source: "policy",
        filter: ["==", ["get", "flagged"], true],
        layout: { visibility: visible("policy") },
        paint: { "line-color": "#f5b000", "line-width": 1.5, "line-dasharray": [2, 1.5] },
      });

      // --- Projects: clustered points ---
      map.addSource("projects", {
        type: "geojson",
        data: pointsGeoJSON(pointsRef.current),
        cluster: !vivid,
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
      if (vivid) {
        // Soft glow under each point, and a ring that pulses outwards.
        map.addLayer({
          id: "points-glow",
          type: "circle",
          source: "projects",
          filter: ["!", ["has", "point_count"]],
          layout: { visibility: visible("projects") },
          paint: { "circle-color": colorExpr, "circle-radius": pulseRadius(3.4), "circle-blur": 1, "circle-opacity": 0.7 },
        });
        map.addLayer({
          id: "points-pulse",
          type: "circle",
          source: "projects",
          filter: ["!", ["has", "point_count"]],
          layout: { visibility: visible("projects") },
          paint: {
            "circle-color": "rgba(0,0,0,0)",
            "circle-radius": pulseRadius(1.4),
            "circle-stroke-color": colorExpr,
            "circle-stroke-width": 1.5,
            "circle-stroke-opacity": 0,
          },
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
          "circle-radius": vivid ? pulseRadius(1.35) : pointRadius,
          "circle-opacity": 0.95,
          "circle-stroke-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            "#f5b000",
            vivid ? "rgba(255,255,255,0.9)" : dark ? "#061a33" : "#ffffff",
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
    if (vivid) {
      map.once("idle", () => {
        if (geoRef.current) return;
        fetch("/geo/countries.json")
          .then((r) => r.json())
          .then((fc: GeoJSON.FeatureCollection) => {
            geoRef.current = fc;
            applyPolicy(map, fc, policyRef.current);
          })
          .catch(() => console.warn("[Perpetual] Could not load country outlines."));
      });
    }
    // Keep the globe fitted to its box until the user zooms themselves.
    let userZoomed = false;
    map.once("wheel", () => (userZoomed = true));
    map.once("touchstart", () => (userZoomed = true));
    const ro = fitGlobe
      ? new ResizeObserver(() => {
          if (!userZoomed) map.jumpTo({ zoom: fittedZoom() });
        })
      : null;
    ro?.observe(container);

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
    map.on("mousemove", "policy-fill", (e: MapLayerMouseEvent) => {
      const f = e.features?.[0];
      const iso2 = f?.properties?.iso2 as string | undefined;
      if (!f || !iso2) return;
      setHoverState({ source: "policy", id: iso2 });
      setHover({ kind: "policy", iso2, name: f.properties?.name ?? iso2, cell: policyRef.current?.[iso2], x: e.point.x, y: e.point.y });
    });
    map.on("click", "policy-fill", (e) => {
      const iso2 = e.features?.[0]?.properties?.iso2;
      if (iso2) onPolicyRef.current?.(iso2, e.features?.[0]?.properties?.name ?? iso2);
    });
    for (const layer of ["points", "country-bubbles", "policy-fill"]) {
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
    // ----- Pulse rings (vivid only): ~20fps, paused off-screen, off for reduced motion -----
    let pulsing = vivid && !reduceMotion;
    let pulseFrame = 0;
    let pulseLast = 0;
    const pulse = (t: number) => {
      if (!pulsing) return;
      if (t - pulseLast >= 50 && visibleOnScreen && !document.hidden && map.getLayer("points-pulse") && modeRef.current === "projects") {
        pulseLast = t;
        const phase = (t % 2400) / 2400;
        map.setPaintProperty("points-pulse", "circle-radius", pulseRadius(1.5 + phase * 2.6));
        map.setPaintProperty("points-pulse", "circle-stroke-opacity", 0.9 * (1 - phase));
      }
      pulseFrame = requestAnimationFrame(pulse);
    };
    if (pulsing) map.once("idle", () => (pulseFrame = requestAnimationFrame(pulse)));
    const stopPulse = () => {
      pulsing = false;
      cancelAnimationFrame(pulseFrame);
    };

    const io = new IntersectionObserver(([entry]) => (visibleOnScreen = entry.isIntersecting));
    io.observe(container);

    return () => {
      stopSpin();
      stopPulse();
      io.disconnect();
      ro?.disconnect();
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
    set(["clusters", "cluster-count", "points", "points-glow", "points-pulse"], mode === "projects");
    set(["country-bubbles", "country-labels"], mode === "countries");
    set(["policy-fill", "policy-line", "policy-flag"], mode === "policy");
    if (vivid) setLand(map, mode === "policy" ? LAND.policy : LAND.projects);
    setHover(null);
    if (mode === "policy" && !geoRef.current) {
      fetch("/geo/countries.json")
        .then((r) => r.json())
        .then((fc: GeoJSON.FeatureCollection) => {
          geoRef.current = fc;
          applyPolicy(map, fc, policyRef.current);
        })
        .catch(() => console.warn("[Perpetual] Could not load country outlines."));
    }
  }, [mode, ready, vivid]);

  // Re-colour countries when the scores (e.g. the weight preset) change.
  useEffect(() => {
    policyRef.current = policy;
    const map = mapRef.current;
    if (map && ready && geoRef.current) applyPolicy(map, geoRef.current, policy);
  }, [policy, ready]);

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
      {hover.kind === "policy" ? (
        <>
          <div className="leading-snug font-semibold">{hover.name}</div>
          {hover.cell?.score != null ? (
            <div className={`mt-0.5 tabular ${muted}`}>
              Score {hover.cell.score.toFixed(1)} / 5{hover.cell.rank ? ` · rank ${hover.cell.rank}` : ""}
              {hover.cell.flagged && <div className="mt-1 font-medium text-[#f5b000]">Has a deal-breaker</div>}
              {hover.cell.isSample && <div className="mt-1">Illustrative score</div>}
              <div className="mt-1">Click for the breakdown</div>
            </div>
          ) : (
            <div className={`mt-0.5 ${muted}`}>Not scored yet</div>
          )}
        </>
      ) : hover.kind === "point" ? (
        <>
          <div className="leading-snug font-semibold">{hover.p.name}</div>
          <div className={`mt-1 flex items-center gap-1.5 tabular ${muted}`}>
            <span className="size-2 rounded-full" style={{ background: TECH_BY_ID[hover.p.technology].hex }} aria-hidden />
            {TECH_BY_ID[hover.p.technology].label} · {formatMW(hover.p.capacityMW)}
            {hover.p.storageMWh ? ` / ${hover.p.storageMWh.toLocaleString("en")} MWh` : ""} · {hover.p.country}
          </div>
          {hover.p.milestone && (
            <div className={`mt-1 ${muted}`}>
              {MILESTONE_LABEL[hover.p.milestone.kind]} · {formatDate(hover.p.milestone.date)}
            </div>
          )}
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

/**
 * Pull the OpenFreeMap dark style towards the brand navy. `vivid` (home hero) lifts the land
 * and coastlines so the globe reads as a lit planet rather than a flat disc.
 */
function tintDarkBasemap(map: MlMap, vivid = false) {
  const land = vivid ? LAND.projects : "#0d2c52";
  const water = vivid ? "#041330" : "#071d3a";
  const tiles = hasTiles(map);
  for (const layer of map.getStyle().layers ?? []) {
    try {
      if (layer.type === "background" && tiles) map.setPaintProperty(layer.id, "background-color", land);
      else if (layer.type === "fill" && /water|ocean/.test(layer.id)) map.setPaintProperty(layer.id, "fill-color", water);
      else if (layer.type === "fill" && vivid && /landcover|landuse|park|wood|grass/.test(layer.id))
        map.setPaintProperty(layer.id, "fill-color", LAND.vegetation);
      else if (layer.type === "line" && /boundary|admin/.test(layer.id))
        map.setPaintProperty(layer.id, "line-color", vivid ? "rgba(150,200,245,0.45)" : "rgba(159,178,200,0.35)");
      else if (layer.type === "line" && vivid && /water|coast/.test(layer.id)) map.setPaintProperty(layer.id, "line-color", "rgba(90,169,230,0.5)");
    } catch {
      // Unknown layer shape: leave it as the style defines it.
    }
  }
}
