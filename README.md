# Perpetual — All Things Renewables (beta)

A global map of renewable energy projects, deals and policy, with a source behind every fact.
**Every record in this beta is sample data.**

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Where things live

| Path | What |
|---|---|
| `app/` | Routes: `/`, `/projects`, `/projects/[slug]`, `/sectors/[tech]`, `/statistics`, `/countries/[code]`, `/regions/[slug]`, `/methodology`, `/about`, `/corrections`; plus `sitemap.xml`, `robots.txt`, `search-index.json` and Open Graph images |
| `components/` | `map/` (MapLibre globe/map, drawer), `explorer/`, `charts/`, `cards/`, `layout/`, `search/` (⌘K palette), `brand/` (logo marks), `prose/`, `ui/` |
| `data/` | Seed files (`projects.ts`, `deals.ts`, `news.ts`, `research.ts`, `meta.ts`) |
| `lib/data.ts` | The **only** module that reads `/data`. Swap it for a DB/CMS later without touching pages |
| `lib/schema.ts` | zod schemas. `next build` fails with a clear message if a record breaks them |
| `lib/filters.ts` | Project filters + URL query (de)serialisation, shared by server and client |
| `app/globals.css` | Brand tokens (`--brand-*`, `--tech-*`, surfaces). Technology hexes are mirrored in `lib/tech.ts` |
| `public/brand/` | Logo files (see below) |
| `components/charts/` | Recharts charts: `CapacityTimeline` (historical vs forecast), `BarList`; `AreaTable` (HTML micro-bars) |
| `lib/tech-photos.ts` | Technology hero photos (self-hosted in `public/photos/`) with their credit and licence |

## Add a record

- **Project**: append an object to `data/projects.ts`. Give it a unique `id` and kebab-case `slug`, an ISO-2 `country`, and at least one `sources` entry. Run `npm run build` to validate.
- **Deal / news item**: append to `data/deals.ts` / `data/news.ts`. Link projects with `projectIds` (and deals with `dealIds`); broken links fail the build.
- News stores **only** our own 1–3 sentence summary and a link to the original. Never paste article text.
- Bump `DATA_VERSION` and add a changelog entry in `data/meta.ts`.

## Brand files

The logo is drawn in code from the design canvas (Round 5, white-background version): `components/brand/Mark.tsx`
(mark) and `components/layout/Logo.tsx` (mark + Nunito 800 wordmark). `public/brand/perpetual-mark.svg` is a standalone copy.
The favicon `app/icon.svg` is the simplified small-size mark. The mark has white cut-outs: light surfaces only.

## Charts

- **Historical vs forecast**: a project's COD counts as historical when its date is `confirmed`, forecast when `estimated`.
  Forecast marks are lighter with a dashed outline, and a "Today" line marks `DATA_AS_OF`.
- Every chart has a legend (or a single series named by its title) and a screen-reader table with the same numbers.

## Photos

Technology hero photos come from Wikimedia Commons under open licences. Each entry in `lib/tech-photos.ts` keeps the
author, licence and source link, shown as a credit on the page. To change a photo, replace the file in `public/photos/`
and update its entry; never use a photo without a licence that allows reuse.

## Search, SEO and accessibility

- **⌘K / Ctrl K** opens search across projects, technologies, countries, regions, deals and news. The palette and its
  index (`/search-index.json`, built from `getSearchIndex()` in `lib/data.ts`) load only on first use.
- Every page sets its own title and description; projects and technologies get generated Open Graph images
  (`lib/og.tsx`, fonts in `assets/fonts/`). Set `NEXT_PUBLIC_SITE_URL` in production so OG and sitemap URLs are absolute.
- Checked with axe-core (WCAG 2.1 AA + best practice) on every page type at 1440px and 390px: no violations.

## Notes

- MapLibre v6 loads its web worker by URL, which bundlers break, so `scripts/copy-maplibre-worker.mjs`
  copies it to `public/vendor/` on install/dev/build.
- Basemap: OpenFreeMap (no key). Keep the attribution visible.
- Research is built into the data model but hidden from the UI for now.
- The corrections form is UI only in the beta: nothing is sent or stored, and the page says so.
- Animations are plain CSS (`anim-*` classes in `globals.css`), all disabled for `prefers-reduced-motion`.
