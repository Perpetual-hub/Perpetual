// MapLibre v6 loads its web worker from a URL next to its own bundle file. Bundlers
// rename that file, so we serve the worker from /public instead and point
// `setWorkerUrl` at it (see components/map/ProjectMap.tsx). Runs on install/dev/build
// so the worker always matches the installed maplibre-gl version.
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const pkgDir = path.dirname(require.resolve("maplibre-gl/package.json"));
const outDir = path.join(process.cwd(), "public", "vendor");
mkdirSync(outDir, { recursive: true });
copyFileSync(path.join(pkgDir, "dist", "maplibre-gl-worker.mjs"), path.join(outDir, "maplibre-gl-worker.mjs"));
