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
  const features = fc.features
    .map((f) => ({
      type: "Feature" as const,
      geometry: { ...f.geometry, coordinates: round((f.geometry as GeoJSON.Polygon).coordinates) },
      properties: { iso2: countries.numericToAlpha2(String(f.id ?? "")) ?? "", name: f.properties?.name ?? "" },
    }))
    .filter((f) => f.properties.iso2);
  return Response.json({ type: "FeatureCollection", features });
}
