import countries from "i18n-iso-countries";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-110m.json";

// Country outlines (Natural Earth 1:110m via world-atlas, public domain) as GeoJSON with an
// ISO alpha-2 code on each feature. Static: built once, fetched only when the policy
// heatmap is switched on.
export function GET() {
  const topo = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
  const fc = feature(topo, topo.objects.countries);
  // Round to 2 decimals (~1 km): plenty for a 1:110m world map, and much smaller to send.
  const round = (c: unknown): unknown => (typeof c === "number" ? Math.round(c * 100) / 100 : (c as unknown[]).map(round));
  // Rings cut at the antimeridian (Fiji, eastern Russia) jump from -180 to 180 and draw a stray
  // line across flat maps. Shift their western half by +360 so each ring stays contiguous.
  const unwrapRing = (ring: number[][]) => {
    const xs = ring.map((p) => p[0]);
    if (Math.max(...xs) - Math.min(...xs) <= 180) return ring;
    return ring.map(([x, y]) => [x < 0 ? x + 360 : x, y]);
  };
  const unwrap = (g: GeoJSON.Geometry): GeoJSON.Geometry => {
    if (g.type === "Polygon") return { ...g, coordinates: g.coordinates.map(unwrapRing) };
    if (g.type === "MultiPolygon") return { ...g, coordinates: g.coordinates.map((poly) => poly.map(unwrapRing)) };
    return g;
  };
  const features = fc.features
    .map((f) => ({
      type: "Feature" as const,
      geometry: { ...unwrap(f.geometry), coordinates: round((unwrap(f.geometry) as GeoJSON.Polygon).coordinates) },
      properties: { iso2: countries.numericToAlpha2(String(f.id ?? "")) ?? "", name: f.properties?.name ?? "" },
    }))
    // Antarctica's coarse outline wraps the pole and draws a ring on the globe; no projects or scores there.
    .filter((f) => f.properties.iso2 && f.properties.iso2 !== "AQ");
  return Response.json({ type: "FeatureCollection", features });
}
