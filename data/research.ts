// SAMPLE DATA. Every record here is illustrative (isSample: true). Company names,
// values and events are invented and do not describe real transactions or publications.
// In-house items (inHouse: true) have an MDX file in /content/research/<slug>.mdx.
import type { ResearchItem } from "@/lib/types";

export const research: ResearchItem[] = [
  {
    id: "res-001",
    slug: "why-disclosure-is-the-cheapest-climate-finance-tool",
    isSample: true,
    date: "2026-11-06",
    type: "opinion",
    title: "Why disclosure is the cheapest climate finance tool we have",
    authors: [
      "Perpetual Editorial Team"
    ],
    publisher: "Perpetual",
    abstract: "Open project-level data lowers the cost of capital by cutting the time lenders and investors spend on basic due diligence. This sample essay sets out the argument.",
    technologies: [
      "solar",
      "wind"
    ],
    inHouse: true
  },
  {
    id: "res-002",
    slug: "reading-a-project-timeline",
    isSample: true,
    date: "2026-10-28",
    type: "data-note",
    title: "Reading a project timeline: confirmed versus estimated dates",
    authors: [
      "Perpetual Data Desk"
    ],
    publisher: "Perpetual",
    abstract: "A short guide to how Perpetual labels project milestones, and why an estimated date should be read as a range.",
    technologies: [],
    inHouse: true
  },
  {
    id: "res-003",
    slug: "grid-connection-queues-a-sample-cross-country-comparison",
    isSample: true,
    date: "2026-10-20",
    type: "report",
    title: "Grid connection queues: a sample cross-country comparison",
    authors: [
      "A. Moreau",
      "K. Tanaka"
    ],
    publisher: "Halden Energy Institute (sample)",
    abstract: "Compares the size of connection queues relative to peak demand across eight sample markets and discusses reforms.",
    technologies: [
      "solar",
      "wind",
      "storage"
    ],
    inHouse: false,
    url: "#sample"
  },
  {
    id: "res-004",
    slug: "capacity-factors-of-floating-pv-in-tropical-reservoirs",
    isSample: true,
    date: "2026-10-12",
    type: "paper",
    title: "Capacity factors of floating PV in tropical reservoirs",
    authors: [
      "R. Wijaya",
      "L. Okafor",
      "M. Brandt"
    ],
    publisher: "Journal of Sample Energy Systems",
    abstract: "Uses two years of sample output data to estimate the cooling benefit of floating PV relative to ground-mounted plants.",
    technologies: [
      "solar"
    ],
    inHouse: false,
    url: "#sample"
  },
  {
    id: "res-005",
    slug: "green-hydrogen-cost-outlook-to-2035",
    isSample: true,
    date: "2026-10-02",
    type: "report",
    title: "Green hydrogen cost outlook to 2035",
    authors: [
      "Energy Futures Group (sample)"
    ],
    publisher: "Energy Futures Group (sample)",
    abstract: "Sets out sample cost scenarios for electrolytic hydrogen under different electricity price and utilisation assumptions.",
    technologies: [
      "hydrogen"
    ],
    inHouse: false,
    url: "#sample"
  },
  {
    id: "res-006",
    slug: "pumped-hydro-is-having-a-quiet-comeback",
    isSample: true,
    date: "2026-09-22",
    type: "opinion",
    title: "Pumped hydro is having a quiet comeback",
    authors: [
      "J. Lindqvist"
    ],
    publisher: "Northern Grid Review (sample)",
    abstract: "An argument that long-duration pumped storage deserves a bigger role in grid planning alongside batteries.",
    technologies: [
      "hydro",
      "storage"
    ],
    inHouse: false,
    url: "#sample"
  },
  {
    id: "res-007",
    slug: "offshore-wind-wake-losses-in-dense-clusters",
    isSample: true,
    date: "2026-09-10",
    type: "paper",
    title: "Offshore wind wake losses in dense clusters",
    authors: [
      "S. Petersen",
      "H. Ahmed"
    ],
    publisher: "Wind Sample Science",
    abstract: "Models how wake effects between neighbouring offshore wind farms reduce output, using sample layouts.",
    technologies: [
      "wind"
    ],
    inHouse: false,
    url: "#sample"
  },
  {
    id: "res-008",
    slug: "geothermal-s-next-decade-drilling-costs-and-new-techniques",
    isSample: true,
    date: "2026-08-28",
    type: "report",
    title: "Geothermal's next decade: drilling costs and new techniques",
    authors: [
      "Halden Energy Institute (sample)"
    ],
    publisher: "Halden Energy Institute (sample)",
    abstract: "Reviews sample cost trends in geothermal drilling and the prospects for enhanced geothermal systems.",
    technologies: [
      "geothermal"
    ],
    inHouse: false,
    url: "#sample"
  },
  {
    id: "res-009",
    slug: "how-we-convert-currencies",
    isSample: true,
    date: "2026-08-15",
    type: "data-note",
    title: "How we convert currencies",
    authors: [
      "Perpetual Data Desk"
    ],
    publisher: "Perpetual",
    abstract: "Explains why Perpetual keeps original currencies and shows the FX date next to every USD figure.",
    technologies: [],
    inHouse: false,
    url: "#sample"
  },
  {
    id: "res-010",
    slug: "tidal-stream-learning-rates-from-early-arrays",
    isSample: true,
    date: "2026-07-30",
    type: "paper",
    title: "Tidal stream learning rates from early arrays",
    authors: [
      "C. MacLeod",
      "A. Dubois"
    ],
    publisher: "Marine Energy Letters (sample)",
    abstract: "Estimates cost reductions from the first generation of tidal stream arrays, using sample data.",
    technologies: [
      "marine"
    ],
    inHouse: false,
    url: "#sample"
  },
  {
    id: "res-011",
    slug: "bioenergy-and-land-a-sample-assessment",
    isSample: true,
    date: "2026-07-12",
    type: "report",
    title: "Bioenergy and land: a sample assessment",
    authors: [
      "Land & Energy Forum (sample)"
    ],
    publisher: "Land & Energy Forum (sample)",
    abstract: "Assesses the land-use trade-offs of different bioenergy feedstocks in a set of sample regions.",
    technologies: [
      "bioenergy"
    ],
    inHouse: false,
    url: "#sample"
  },
  {
    id: "res-012",
    slug: "storage-auctions-need-better-design-not-bigger-targets",
    isSample: true,
    date: "2026-06-25",
    type: "opinion",
    title: "Storage auctions need better design, not bigger targets",
    authors: [
      "P. Navarro"
    ],
    publisher: "Grid Ledger (sample)",
    abstract: "Argues that storage procurement should reward duration and location, not just headline megawatts.",
    technologies: [
      "storage"
    ],
    inHouse: false,
    url: "#sample"
  }
];
