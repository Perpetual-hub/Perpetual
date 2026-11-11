// Zod schemas for every record in /data. The data layer (lib/data.ts) parses all
// seed files with these at module load, so `next build` fails with a readable
// message if any record breaks the schema.
import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected an ISO date (YYYY-MM-DD)");
const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "expected a kebab-case slug");
const iso2 = z.string().regex(/^[A-Z]{2}$/, "expected an ISO 3166-1 alpha-2 country code");

export const technology = z.enum([
  "solar",
  "wind",
  "hydro",
  "storage",
  "geothermal",
  "hydrogen",
  "bioenergy",
  "marine",
]);
export const projectStatus = z.enum([
  "announced",
  "permitting",
  "financing",
  "construction",
  "operating",
  "decommissioned",
  "cancelled",
]);
export const ownership = z.enum(["private", "public", "ppp", "community", "mixed"]);

export const source = z.object({
  publisher: z.string().min(1),
  title: z.string().min(1),
  url: z.string().min(1),
  retrievedAt: isoDate,
});

export const party = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  stakePct: z.number().min(0).max(100).optional(),
  country: iso2.optional(),
});

export const dateValue = z.object({
  date: isoDate,
  confidence: z.enum(["confirmed", "estimated"]),
});

export const money = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  usd: z.number().positive().optional(),
  fxDate: isoDate.optional(),
});

export const project = z
  .object({
    id: z.string().min(1),
    slug,
    name: z.string().min(1),
    isSample: z.boolean(),
    technology,
    subType: z.string().optional(),
    capacityMW: z.number().positive().optional(),
    capacityBasis: z.enum(["AC", "DC"]).optional(),
    storageMWh: z.number().positive().optional(),
    hydrogenTonnesPerYear: z.number().positive().optional(),
    country: iso2,
    region: z.string().min(1),
    admin1: z.string().optional(),
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    status: projectStatus,
    ownership,
    developer: z.array(party).optional(),
    owners: z.array(party).optional(),
    epc: z.array(party).optional(),
    om: z.array(party).optional(),
    offtake: z
      .object({
        offtaker: z.string().optional(),
        type: z.enum(["PPA", "CfD", "FiT", "merchant", "corporate PPA", "auction"]).optional(),
        tenorYears: z.number().positive().optional(),
      })
      .optional(),
    financing: z
      .object({
        financialClose: dateValue.optional(),
        totalCapex: money.optional(),
        debt: z.array(party).optional(),
        equity: z.array(party).optional(),
        instruments: z.array(z.string()).optional(),
      })
      .optional(),
    dates: z.object({
      announced: dateValue.optional(),
      permits: dateValue.optional(),
      construction: dateValue.optional(),
      cod: dateValue.optional(),
      decommission: dateValue.optional(),
    }),
    designLifeYears: z.number().positive().optional(),
    description: z.string().optional(),
    sources: z.array(source).min(1, "every project needs at least one source"),
    lastUpdated: isoDate,
    dataVersion: z.string().min(1),
  })
  .superRefine((p, ctx) => {
    if (p.capacityBasis && p.technology !== "solar")
      ctx.addIssue({ code: "custom", message: "capacityBasis is for solar projects only" });
    if (p.storageMWh && p.technology !== "storage")
      ctx.addIssue({ code: "custom", message: "storageMWh is for storage projects only" });
    if (p.hydrogenTonnesPerYear && p.technology !== "hydrogen")
      ctx.addIssue({ code: "custom", message: "hydrogenTonnesPerYear is for hydrogen projects only" });
    const owners = p.owners?.reduce((sum, o) => sum + (o.stakePct ?? 0), 0) ?? 0;
    if (owners > 100.01) ctx.addIssue({ code: "custom", message: `owner stakes add up to ${owners}%` });
  });

export const deal = z.object({
  id: z.string().min(1),
  slug,
  isSample: z.boolean(),
  date: isoDate,
  type: z.enum([
    "M&A",
    "project finance",
    "equity raise",
    "PPA",
    "IPO",
    "fund close",
    "joint venture",
    "refinancing",
    "development finance",
  ]),
  status: z.enum(["announced", "completed", "terminated"]),
  title: z.string().min(1),
  technologies: z.array(technology).min(1),
  countries: z.array(iso2),
  region: z.string().min(1),
  buyers: z.array(party).optional(),
  sellers: z.array(party).optional(),
  target: z.string().optional(),
  stakePct: z.number().min(0).max(100).optional(),
  value: money.extend({ disclosed: z.boolean() }).optional(),
  capacityMW: z.number().positive().optional(),
  advisors: z.array(party).optional(),
  projectIds: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  summary: z.string().min(1),
  /** Project and technology specifics (capacity mix, storage duration, stage, timeline), in our own words. */
  details: z.string().optional(),
  /** Why the deal matters for the parties, in our own words. */
  context: z.string().optional(),
  sources: z.array(source).min(1),
});


export const researchItem = z.object({
  id: z.string().min(1),
  slug,
  isSample: z.boolean(),
  date: isoDate,
  type: z.enum(["report", "opinion", "paper", "data-note"]),
  title: z.string().min(1),
  authors: z.array(z.string()).min(1),
  publisher: z.string().min(1),
  abstract: z.string().min(1),
  technologies: z.array(technology),
  url: z.string().optional(),
  inHouse: z.boolean(),
});

const isoDay = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const gw = z.number().nonnegative();

const statSource = z.object({
      title: z.string().min(1),
      publisher: z.string().min(1),
      via: z.string().optional(),
      citation: z.string().min(1),
      url: z.string().url(),
      licence: z.string().min(1),
      lastUpdated: isoDay.optional(),
      published: z.string().optional(),
      nextUpdate: isoDay.optional(),
      retrieved: isoDay,
    });

export const capacitySeries = z
  .object({
    unit: z.literal("GW"),
    source: statSource,
    rows: z
      .array(
        z.object({
          year: z.number().int().min(1990).max(2100),
          solar: gw,
          wind: gw,
          hydro: gw,
          bioenergy: gw,
          geothermal: gw,
          marine: gw,
          total: gw,
        }),
      )
      .min(1),
  })
  .refine((s) => s.rows.every((r, i) => i === 0 || r.year === s.rows[i - 1].year + 1), "Years must be consecutive");

const consecutive = (rows: { year: number }[]) => rows.every((r, i) => i === 0 || r.year === rows[i - 1].year + 1);

export const capacityOutlook = z.object({
  unit: z.literal("GW"),
  edition: z.string().regex(/^\d{4}$/),
  source: statSource,
  scenarios: z
    .array(
      z.object({
        id: z.string().min(1),
        label: z.string().min(1),
        rows: z
          .array(
            z.object({
              year: z.number().int().min(1990).max(2100),
              solar: gw,
              wind: gw,
              hydro: gw,
              geothermal: gw,
              other: gw,
              total: gw,
              battery: gw,
            }),
          )
          .min(1)
          .refine(consecutive, "Years must be consecutive"),
      }),
    )
    .min(1),
});

const mwSeries = z.array(z.number().nonnegative());
export const countryCapacityData = z
  .object({
    unit: z.object({ capacity: z.literal("MW"), generation: z.literal("GWh") }),
    years: z.tuple([z.number().int(), z.number().int()]),
    source: statSource,
    countries: z
      .array(
        z.object({
          iso2: z.string().regex(/^[A-Z]{2}$/),
          name: z.string().min(1),
          region: z.string().min(1),
          capacityMW: z.partialRecord(
            z.enum([
              "solar",
              "windOnshore",
              "windOffshore",
              "hydro",
              "bioenergy",
              "geothermal",
              "marine",
              "fossil",
              "nuclear",
              "pumpedStorage",
              "otherNonRenewable",
            ]),
            mwSeries,
          ),
          generationGWh: z.object({
            renewable: z.array(z.number().nonnegative().nullable()),
            total: z.array(z.number().nonnegative().nullable()),
          }),
        }),
      )
      .min(1),
  })
  .superRefine((d, ctx) => {
    const n = d.years[1] - d.years[0] + 1;
    const seen = new Set<string>();
    for (const c of d.countries) {
      if (seen.has(c.iso2)) ctx.addIssue({ code: "custom", message: `duplicate country ${c.iso2}` });
      seen.add(c.iso2);
      for (const [k, v] of Object.entries(c.capacityMW))
        if (v && v.length !== n) ctx.addIssue({ code: "custom", message: `${c.iso2}.${k}: expected ${n} years` });
      if (c.generationGWh.total.length !== n || c.generationGWh.renewable.length !== n)
        ctx.addIssue({ code: "custom", message: `${c.iso2}: generation must have ${n} years` });
    }
  });
