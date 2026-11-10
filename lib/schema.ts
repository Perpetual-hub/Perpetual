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
  sources: z.array(source).min(1),
});

export const newsItem = z.object({
  id: z.string().min(1),
  slug,
  isSample: z.boolean(),
  date: isoDate,
  breaking: z.boolean().optional(),
  featured: z.boolean().optional(),
  category: z.enum(["policy", "auction", "corporate", "markets", "technology", "finance"]),
  headline: z.string().min(1),
  summary: z.string().min(1).max(600, "summaries are our own words, 1–3 sentences"),
  technologies: z.array(technology),
  countries: z.array(iso2),
  source,
  projectIds: z.array(z.string()).optional(),
  dealIds: z.array(z.string()).optional(),
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
