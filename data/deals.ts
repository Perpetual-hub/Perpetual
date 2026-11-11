// SAMPLE DATA. Every record here is illustrative (isSample: true). Company names,
// values and events are invented and do not describe real transactions or publications.
import type { Deal } from "@/lib/types";

export const deals: Deal[] = [
  {
    id: "deal-001",
    slug: "harrowgate-grid-capital-to-buy-49-of-halvard-bank-offshore-wind",
    isSample: true,
    date: "2026-11-07",
    type: "M&A",
    status: "announced",
    title: "Harrowgate Grid Capital to buy 49% of Halvard Bank Offshore Wind",
    technologies: [
      "wind"
    ],
    countries: [
      "GB"
    ],
    region: "Europe",
    buyers: [
      {
        name: "Harrowgate Grid Capital"
      }
    ],
    sellers: [
      {
        name: "Siravo Energy"
      }
    ],
    target: "Halvard Bank Offshore Wind",
    stakePct: 49,
    value: {
      amount: 1450000000,
      currency: "GBP",
      usd: 1841000000,
      fxDate: "2026-11-07",
      disclosed: true
    },
    capacityMW: 1400,
    advisors: [
      {
        name: "Ledgerline Advisory",
        role: "financial adviser"
      }
    ],
    projectIds: [
      "prj-013"
    ],
    featured: true,
    summary: "Infrastructure investor agrees to take a 49% stake in the 1.4 GW offshore project from its developer, which keeps operational control. Completion is expected after regulatory approval.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Harrowgate Grid Capital to buy 49% of Halvard Bank Offshore Wind",
        url: "#sample",
        retrievedAt: "2026-11-07"
      }
    ]
  },
  {
    id: "deal-002",
    slug: "altiplano-ridge-solar-reaches-financial-close",
    isSample: true,
    date: "2026-11-05",
    type: "project finance",
    status: "completed",
    title: "Altiplano Ridge Solar reaches financial close",
    technologies: [
      "solar"
    ],
    countries: [
      "CL"
    ],
    region: "South America",
    buyers: [
      {
        name: "Cendra Bank"
      },
      {
        name: "Pan-Regional Development Bank"
      }
    ],
    target: "Altiplano Ridge Solar",
    value: {
      amount: 480000000,
      currency: "USD",
      usd: 480000000,
      disclosed: true
    },
    capacityMW: 600,
    projectIds: [
      "prj-003"
    ],
    summary: "Lenders sign a 18-year senior debt package for the 600 MW plant. Construction is already under way under an early-works agreement.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Altiplano Ridge Solar reaches financial close",
        url: "#sample",
        retrievedAt: "2026-11-05"
      }
    ]
  },
  {
    id: "deal-003",
    slug: "corvane-power-signs-15-year-ppa-for-kutch-coast-wind-output",
    isSample: true,
    date: "2026-11-03",
    type: "PPA",
    status: "completed",
    title: "Corvane Power signs 15-year PPA for Kutch Coast Wind output",
    technologies: [
      "wind"
    ],
    countries: [
      "IN"
    ],
    region: "South Asia",
    buyers: [
      {
        name: "Indus Alloys (sample)"
      }
    ],
    sellers: [
      {
        name: "Corvane Power"
      }
    ],
    target: "Kutch Coast Wind",
    capacityMW: 250,
    projectIds: [
      "prj-019"
    ],
    summary: "An industrial buyer contracts 250 MW of the wind farm's output for 15 years. Price terms were not disclosed.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Corvane Power signs 15-year PPA for Kutch Coast Wind output",
        url: "#sample",
        retrievedAt: "2026-11-03"
      }
    ]
  },
  {
    id: "deal-004",
    slug: "lumbre-infrastructure-fund-iii-closes-at-usd-2-1bn",
    isSample: true,
    date: "2026-10-30",
    type: "fund close",
    status: "completed",
    title: "Lumbre Infrastructure Fund III closes at USD 2.1bn",
    technologies: [
      "solar",
      "wind",
      "storage"
    ],
    countries: [
      "US",
      "GB",
      "AU"
    ],
    region: "Global",
    buyers: [
      {
        name: "Lumbre Infrastructure Fund"
      }
    ],
    value: {
      amount: 2100000000,
      currency: "USD",
      usd: 2100000000,
      disclosed: true
    },
    advisors: [
      {
        name: "Ashcombe Placement",
        role: "financial adviser"
      }
    ],
    summary: "The fund hit its hard cap with commitments from pension funds and insurers. It will target operating and late-stage solar, wind and storage assets in OECD markets.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Lumbre Infrastructure Fund III closes at USD 2.1bn",
        url: "#sample",
        retrievedAt: "2026-10-30"
      }
    ]
  },
  {
    id: "deal-005",
    slug: "orrin-hydrogen-and-northmoor-utilities-form-hydrogen-jv-in-oman",
    isSample: true,
    date: "2026-10-28",
    type: "joint venture",
    status: "announced",
    title: "Orrin Hydrogen and Northmoor Utilities form hydrogen JV in Oman",
    technologies: [
      "hydrogen"
    ],
    countries: [
      "OM"
    ],
    region: "Middle East",
    buyers: [
      {
        name: "Orrin Hydrogen"
      },
      {
        name: "Northmoor Utilities"
      }
    ],
    target: "Al Wusta Hydrogen Coast",
    stakePct: 50,
    capacityMW: 300,
    projectIds: [
      "prj-049"
    ],
    summary: "The two companies will jointly develop the 300 MW electrolyser project on a 50/50 basis. A final investment decision is targeted for 2027.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Orrin Hydrogen and Northmoor Utilities form hydrogen JV in Oman",
        url: "#sample",
        retrievedAt: "2026-10-28"
      }
    ]
  },
  {
    id: "deal-006",
    slug: "tehachapi-grid-battery-refinanced-with-green-bond",
    isSample: true,
    date: "2026-10-24",
    type: "refinancing",
    status: "completed",
    title: "Tehachapi Grid Battery refinanced with green bond",
    technologies: [
      "storage"
    ],
    countries: [
      "US"
    ],
    region: "North America",
    buyers: [
      {
        name: "Bond investors"
      }
    ],
    target: "Tehachapi Grid Battery",
    value: {
      amount: 620000000,
      currency: "USD",
      usd: 620000000,
      disclosed: true
    },
    capacityMW: 400,
    advisors: [
      {
        name: "Marlow Commercial Bank",
        role: "financial adviser"
      }
    ],
    projectIds: [
      "prj-034"
    ],
    summary: "The owner replaced construction debt with a USD 620m green bond. The bond is rated investment grade and amortises over 17 years.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Tehachapi Grid Battery refinanced with green bond",
        url: "#sample",
        retrievedAt: "2026-10-24"
      }
    ]
  },
  {
    id: "deal-007",
    slug: "aurovale-investments-completes-purchase-of-riverina-plains-solar",
    isSample: true,
    date: "2026-10-21",
    type: "M&A",
    status: "completed",
    title: "Aurovale Investments completes purchase of Riverina Plains Solar",
    technologies: [
      "solar"
    ],
    countries: [
      "AU"
    ],
    region: "Oceania",
    buyers: [
      {
        name: "Aurovale Investments"
      }
    ],
    sellers: [
      {
        name: "Ardent Basin Developments"
      }
    ],
    target: "Riverina Plains Solar",
    stakePct: 100,
    value: {
      amount: 390000000,
      currency: "AUD",
      usd: 257000000,
      fxDate: "2026-10-21",
      disclosed: true
    },
    capacityMW: 280,
    advisors: [
      {
        name: "Ledgerline Advisory",
        role: "financial adviser"
      }
    ],
    projectIds: [
      "prj-007"
    ],
    summary: "The investor now owns the whole 280 MW project, which remains under construction. The developer stays on as construction manager.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Aurovale Investments completes purchase of Riverina Plains Solar",
        url: "#sample",
        retrievedAt: "2026-10-21"
      }
    ]
  },
  {
    id: "deal-008",
    slug: "kaliko-geothermal-raises-usd-140m-series-c",
    isSample: true,
    date: "2026-10-18",
    type: "equity raise",
    status: "completed",
    title: "Kaliko Geothermal raises USD 140m Series C",
    technologies: [
      "geothermal"
    ],
    countries: [
      "US",
      "ID"
    ],
    region: "Global",
    buyers: [
      {
        name: "Tessaline Pension Trust"
      },
      {
        name: "Cendra Capital"
      }
    ],
    target: "Kaliko Geothermal",
    value: {
      amount: 140000000,
      currency: "USD",
      usd: 140000000,
      disclosed: true
    },
    projectIds: [
      "prj-046",
      "prj-043"
    ],
    summary: "The geothermal developer raised new equity to fund drilling at two projects. Existing investors also took part.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Kaliko Geothermal raises USD 140m Series C",
        url: "#sample",
        retrievedAt: "2026-10-18"
      }
    ]
  },
  {
    id: "deal-009",
    slug: "pomeranian-shelf-offshore-wind-mandates-lenders",
    isSample: true,
    date: "2026-10-15",
    type: "project finance",
    status: "announced",
    title: "Pomeranian Shelf Offshore Wind mandates lenders",
    technologies: [
      "wind"
    ],
    countries: [
      "PL"
    ],
    region: "Europe",
    buyers: [
      {
        name: "Varenne Export Credit Agency"
      },
      {
        name: "Heliot Green Bank"
      }
    ],
    target: "Pomeranian Shelf Offshore Wind",
    value: {
      amount: 14000000000,
      currency: "PLN",
      usd: 3500000000,
      fxDate: "2026-10-15",
      disclosed: true
    },
    capacityMW: 1100,
    projectIds: [
      "prj-015"
    ],
    summary: "The project has mandated a group of lenders for a debt package of about PLN 14bn. Financial close is expected in mid-2027.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Pomeranian Shelf Offshore Wind mandates lenders",
        url: "#sample",
        retrievedAt: "2026-10-15"
      }
    ]
  },
  {
    id: "deal-010",
    slug: "rotterdam-delta-electrolyser-signs-offshore-wind-supply-deal",
    isSample: true,
    date: "2026-10-12",
    type: "PPA",
    status: "completed",
    title: "Rotterdam Delta Electrolyser signs offshore wind supply deal",
    technologies: [
      "hydrogen",
      "wind"
    ],
    countries: [
      "NL"
    ],
    region: "Europe",
    buyers: [
      {
        name: "Rotterdam Delta Electrolyser"
      }
    ],
    sellers: [
      {
        name: "Helgren Offshore Wind"
      }
    ],
    capacityMW: 200,
    projectIds: [
      "prj-052",
      "prj-014"
    ],
    summary: "The electrolyser will buy power from an offshore wind farm under a 10-year contract, supporting its renewable hydrogen certification.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Rotterdam Delta Electrolyser signs offshore wind supply deal",
        url: "#sample",
        retrievedAt: "2026-10-12"
      }
    ]
  },
  {
    id: "deal-011",
    slug: "talks-end-on-sale-of-mekong-delta-nearshore-wind",
    isSample: true,
    date: "2026-10-08",
    type: "M&A",
    status: "terminated",
    title: "Talks end on sale of Mekong Delta Nearshore Wind",
    technologies: [
      "wind"
    ],
    countries: [
      "VN"
    ],
    region: "Southeast Asia",
    sellers: [
      {
        name: "Velmora Energy"
      }
    ],
    target: "Mekong Delta Nearshore Wind",
    stakePct: 70,
    capacityMW: 150,
    projectIds: [
      "prj-022"
    ],
    summary: "The seller says negotiations with a preferred bidder ended without agreement. It plans to keep the asset for now.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Talks end on sale of Mekong Delta Nearshore Wind",
        url: "#sample",
        retrievedAt: "2026-10-08"
      }
    ]
  },
  {
    id: "deal-012",
    slug: "brevant-storage-lists-on-exchange",
    isSample: true,
    date: "2026-10-02",
    type: "IPO",
    status: "completed",
    title: "Brevant Storage lists on exchange",
    technologies: [
      "storage"
    ],
    countries: [
      "GB",
      "DE"
    ],
    region: "Europe",
    buyers: [
      {
        name: "Public investors"
      }
    ],
    target: "Brevant Storage",
    stakePct: 28,
    value: {
      amount: 410000000,
      currency: "EUR",
      usd: 443000000,
      fxDate: "2026-10-02",
      disclosed: true
    },
    advisors: [
      {
        name: "Ashcombe Placement",
        role: "financial adviser"
      },
      {
        name: "Ledgerline Advisory",
        role: "financial adviser"
      }
    ],
    summary: "The battery storage developer floated 28% of its shares. Proceeds will fund a pipeline of grid batteries in Britain and Germany.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Brevant Storage lists on exchange",
        url: "#sample",
        retrievedAt: "2026-10-02"
      }
    ]
  },
  {
    id: "deal-013",
    slug: "northern-laos-hydro-signs-dfi-backed-loan",
    isSample: true,
    date: "2026-09-26",
    type: "project finance",
    status: "completed",
    title: "Northern Laos Hydro signs DFI-backed loan",
    technologies: [
      "hydro"
    ],
    countries: [
      "LA"
    ],
    region: "Southeast Asia",
    buyers: [
      {
        name: "Pan-Regional Development Bank"
      }
    ],
    target: "Northern Laos Hydro",
    value: {
      amount: 720000000,
      currency: "USD",
      usd: 720000000,
      disclosed: true
    },
    capacityMW: 400,
    projectIds: [
      "prj-027"
    ],
    summary: "A development bank leads a USD 720m loan for the 400 MW plant. Environmental and social conditions are attached to each disbursement.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Northern Laos Hydro signs DFI-backed loan",
        url: "#sample",
        retrievedAt: "2026-09-26"
      }
    ]
  },
  {
    id: "deal-014",
    slug: "mazuri-energy-partners-and-kestrava-form-east-africa-wind-platform",
    isSample: true,
    date: "2026-09-19",
    type: "joint venture",
    status: "completed",
    title: "Mazuri Energy Partners and Kestrava form East Africa wind platform",
    technologies: [
      "wind",
      "solar"
    ],
    countries: [
      "KE"
    ],
    region: "East Africa",
    buyers: [
      {
        name: "Mazuri Energy Partners"
      },
      {
        name: "Kestrava Renewables"
      }
    ],
    capacityMW: 600,
    projectIds: [
      "prj-018"
    ],
    summary: "The partners will combine early-stage wind and solar projects into a single platform targeting 600 MW.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Mazuri Energy Partners and Kestrava form East Africa wind platform",
        url: "#sample",
        retrievedAt: "2026-09-19"
      }
    ]
  },
  {
    id: "deal-015",
    slug: "saltmarsh-energy-holdings-buys-stake-in-orkney-channel-tidal-array",
    isSample: true,
    date: "2026-09-12",
    type: "M&A",
    status: "completed",
    title: "Saltmarsh Energy Holdings buys stake in Orkney Channel Tidal Array",
    technologies: [
      "marine"
    ],
    countries: [
      "GB"
    ],
    region: "Europe",
    buyers: [
      {
        name: "Saltmarsh Energy Holdings"
      }
    ],
    sellers: [
      {
        name: "Pelagic Tide Co."
      }
    ],
    target: "Orkney Channel Tidal Array",
    stakePct: 35,
    value: {
      amount: 22000000,
      currency: "GBP",
      usd: 28000000,
      fxDate: "2026-09-12",
      disclosed: true
    },
    capacityMW: 20,
    projectIds: [
      "prj-059"
    ],
    summary: "The buyer takes 35% of the operating tidal array. The developer will use proceeds to expand the site.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Saltmarsh Energy Holdings buys stake in Orkney Channel Tidal Array",
        url: "#sample",
        retrievedAt: "2026-09-12"
      }
    ]
  },
  {
    id: "deal-016",
    slug: "mojave-ridge-solar-signs-storage-tolling-agreement",
    isSample: true,
    date: "2026-09-04",
    type: "PPA",
    status: "completed",
    title: "Mojave Ridge Solar signs storage tolling agreement",
    technologies: [
      "solar",
      "storage"
    ],
    countries: [
      "US"
    ],
    region: "North America",
    buyers: [
      {
        name: "Western utility (sample)"
      }
    ],
    sellers: [
      {
        name: "Mojave Ridge Solar"
      }
    ],
    capacityMW: 350,
    projectIds: [
      "prj-005"
    ],
    summary: "A utility contracts the plant's output plus a new co-located battery for 12 years.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Mojave Ridge Solar signs storage tolling agreement",
        url: "#sample",
        retrievedAt: "2026-09-04"
      }
    ]
  },
  {
    id: "deal-017",
    slug: "ostrel-emerging-markets-climate-fund-closes-first-round",
    isSample: true,
    date: "2026-08-27",
    type: "fund close",
    status: "completed",
    title: "Ostrel Emerging Markets Climate Fund closes first round",
    technologies: [
      "solar",
      "wind",
      "hydro"
    ],
    countries: [
      "ZA",
      "IN",
      "BR"
    ],
    region: "Global",
    buyers: [
      {
        name: "Ostrel Infrastructure Partners"
      }
    ],
    value: {
      amount: 650000000,
      currency: "USD",
      usd: 650000000,
      disclosed: true
    },
    summary: "The fund reached a first close and will invest in renewable projects in emerging markets, with a minority of capital set aside for grid upgrades.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Ostrel Emerging Markets Climate Fund closes first round",
        url: "#sample",
        retrievedAt: "2026-08-27"
      }
    ]
  },
  {
    id: "deal-018",
    slug: "quillon-power-sells-potiguar-coast-wind",
    isSample: true,
    date: "2026-08-20",
    type: "M&A",
    status: "completed",
    title: "Quillon Power sells Potiguar Coast Wind",
    technologies: [
      "wind"
    ],
    countries: [
      "BR"
    ],
    region: "South America",
    buyers: [
      {
        name: "Aurovale Investments"
      }
    ],
    sellers: [
      {
        name: "Quillon Power"
      }
    ],
    target: "Potiguar Coast Wind",
    stakePct: 100,
    value: {
      amount: 1900000000,
      currency: "BRL",
      usd: 342000000,
      fxDate: "2026-08-20",
      disclosed: true
    },
    capacityMW: 350,
    projectIds: [
      "prj-025"
    ],
    summary: "The developer has sold the 350 MW operating wind farm to a long-term investor.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Quillon Power sells Potiguar Coast Wind",
        url: "#sample",
        retrievedAt: "2026-08-20"
      }
    ]
  },
  {
    id: "deal-019",
    slug: "gulf-of-c-diz-hydrogen-closes-debt",
    isSample: true,
    date: "2026-08-14",
    type: "project finance",
    status: "completed",
    title: "Gulf of Cádiz Hydrogen closes debt",
    technologies: [
      "hydrogen"
    ],
    countries: [
      "ES"
    ],
    region: "Europe",
    buyers: [
      {
        name: "Heliot Green Bank"
      },
      {
        name: "Marlow Commercial Bank"
      }
    ],
    target: "Gulf of Cádiz Hydrogen",
    value: {
      amount: 160000000,
      currency: "EUR",
      usd: 173000000,
      fxDate: "2026-08-14",
      disclosed: true
    },
    capacityMW: 100,
    projectIds: [
      "prj-051"
    ],
    summary: "Lenders agreed a EUR 160m facility for the 100 MW electrolyser, backed partly by public grant funding.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Gulf of Cádiz Hydrogen closes debt",
        url: "#sample",
        retrievedAt: "2026-08-14"
      }
    ]
  },
  {
    id: "deal-020",
    slug: "pelagic-tide-co-raises-growth-capital",
    isSample: true,
    date: "2026-08-06",
    type: "equity raise",
    status: "completed",
    title: "Pelagic Tide Co. raises growth capital",
    technologies: [
      "marine"
    ],
    countries: [
      "GB",
      "FR"
    ],
    region: "Europe",
    buyers: [
      {
        name: "Tessaline Pension Trust"
      }
    ],
    target: "Pelagic Tide Co.",
    value: {
      amount: 45000000,
      currency: "GBP",
      usd: 57000000,
      fxDate: "2026-08-06",
      disclosed: true
    },
    projectIds: [
      "prj-060"
    ],
    summary: "The tidal developer raised new equity to fund its second array in the English Channel.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Pelagic Tide Co. raises growth capital",
        url: "#sample",
        retrievedAt: "2026-08-06"
      }
    ]
  },
  {
    id: "deal-021",
    slug: "northmoor-utilities-acquires-karelia-forest-biomass-chp",
    isSample: true,
    date: "2026-07-29",
    type: "M&A",
    status: "completed",
    title: "Northmoor Utilities acquires Karelia Forest Biomass CHP",
    technologies: [
      "bioenergy"
    ],
    countries: [
      "FI"
    ],
    region: "Europe",
    buyers: [
      {
        name: "Northmoor Utilities"
      }
    ],
    sellers: [
      {
        name: "Municipal owner (sample)"
      }
    ],
    target: "Karelia Forest Biomass CHP",
    stakePct: 100,
    capacityMW: 60,
    projectIds: [
      "prj-055"
    ],
    summary: "The utility bought the combined heat and power plant from its municipal owner. Terms were not disclosed.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Northmoor Utilities acquires Karelia Forest Biomass CHP",
        url: "#sample",
        retrievedAt: "2026-07-29"
      }
    ]
  },
  {
    id: "deal-022",
    slug: "thar-plains-solar-park-refinanced",
    isSample: true,
    date: "2026-07-18",
    type: "refinancing",
    status: "completed",
    title: "Thar Plains Solar Park refinanced",
    technologies: [
      "solar"
    ],
    countries: [
      "IN"
    ],
    region: "South Asia",
    buyers: [
      {
        name: "Cendra Bank"
      }
    ],
    target: "Thar Plains Solar Park",
    value: {
      amount: 52000000000,
      currency: "INR",
      usd: 624000000,
      fxDate: "2026-07-18",
      disclosed: true
    },
    capacityMW: 1200,
    projectIds: [
      "prj-004"
    ],
    summary: "The plant's owners refinanced existing loans at a lower margin, citing three years of stable output.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Thar Plains Solar Park refinanced",
        url: "#sample",
        retrievedAt: "2026-07-18"
      }
    ]
  },
  {
    id: "deal-023",
    slug: "western-plains-battery-agrees-capacity-contract",
    isSample: true,
    date: "2026-07-09",
    type: "PPA",
    status: "announced",
    title: "Western Plains Battery agrees capacity contract",
    technologies: [
      "storage"
    ],
    countries: [
      "AU"
    ],
    region: "Oceania",
    buyers: [
      {
        name: "State grid operator (sample)"
      }
    ],
    sellers: [
      {
        name: "Western Plains Battery"
      }
    ],
    capacityMW: 300,
    projectIds: [
      "prj-038"
    ],
    summary: "The battery will provide system strength and capacity services under a 10-year contract.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Western Plains Battery agrees capacity contract",
        url: "#sample",
        retrievedAt: "2026-07-09"
      }
    ]
  },
  {
    id: "deal-024",
    slug: "siravo-energy-and-takemi-construction-team-up-on-taiwan-offshore-wind",
    isSample: true,
    date: "2026-06-30",
    type: "joint venture",
    status: "announced",
    title: "Siravo Energy and Takemi Construction team up on Taiwan offshore wind",
    technologies: [
      "wind"
    ],
    countries: [
      "TW"
    ],
    region: "East Asia",
    buyers: [
      {
        name: "Siravo Energy"
      },
      {
        name: "Takemi Construction"
      }
    ],
    target: "Lukang Strait Offshore Wind",
    stakePct: 40,
    capacityMW: 640,
    projectIds: [
      "prj-021"
    ],
    summary: "The construction firm takes a 40% stake alongside its EPC role on the 640 MW project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Siravo Energy and Takemi Construction team up on Taiwan offshore wind",
        url: "#sample",
        retrievedAt: "2026-06-30"
      }
    ]
  },
  {
    id: "deal-025",
    slug: "cendra-capital-buys-rift-valley-geothermal-stake",
    isSample: true,
    date: "2026-06-18",
    type: "M&A",
    status: "completed",
    title: "Cendra Capital buys Rift Valley geothermal stake",
    technologies: [
      "geothermal"
    ],
    countries: [
      "KE"
    ],
    region: "East Africa",
    buyers: [
      {
        name: "Cendra Capital"
      }
    ],
    sellers: [
      {
        name: "State energy agency (sample)"
      }
    ],
    target: "Rift Valley Escarpment Geothermal",
    stakePct: 25,
    value: {
      amount: 95000000,
      currency: "USD",
      usd: 95000000,
      disclosed: true
    },
    capacityMW: 140,
    projectIds: [
      "prj-042"
    ],
    summary: "The state owner sold a minority stake as part of a wider asset recycling programme.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Cendra Capital buys Rift Valley geothermal stake",
        url: "#sample",
        retrievedAt: "2026-06-18"
      }
    ]
  },

  {
    id: "deal-026",
    slug: "kalahari-sun-field-extension-secures-debt",
    isSample: true,
    date: "2026-06-05",
    type: "project finance",
    status: "completed",
    title: "Kalahari Sun Field extension secures debt",
    technologies: [
      "solar"
    ],
    countries: [
      "ZA"
    ],
    region: "Southern Africa",
    buyers: [
      {
        name: "Pan-Regional Development Bank"
      },
      {
        name: "Cendra Bank"
      }
    ],
    target: "Kalahari Sun Field",
    value: {
      amount: 2900000000,
      currency: "ZAR",
      usd: 160000000,
      fxDate: "2026-06-05",
      disclosed: true
    },
    capacityMW: 150,
    projectIds: [
      "prj-001"
    ],
    summary: "Lenders provided a ZAR 2.9bn loan for a 150 MW extension, with a development bank taking the longest tenor.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Kalahari Sun Field extension secures debt",
        url: "#sample",
        retrievedAt: "2026-06-05"
      }
    ]
  },
  {
    id: "deal-027",
    slug: "tessaline-pension-trust-buys-stake-in-helgren-offshore-wind",
    isSample: true,
    date: "2026-05-22",
    type: "M&A",
    status: "completed",
    title: "Tessaline Pension Trust buys stake in Helgren Offshore Wind",
    technologies: [
      "wind"
    ],
    countries: [
      "DE"
    ],
    region: "Europe",
    buyers: [
      {
        name: "Tessaline Pension Trust"
      }
    ],
    sellers: [
      {
        name: "Velmora Energy"
      }
    ],
    target: "Helgren Offshore Wind",
    stakePct: 25,
    value: {
      amount: 610000000,
      currency: "EUR",
      usd: 659000000,
      fxDate: "2026-05-22",
      disclosed: true
    },
    capacityMW: 900,
    advisors: [
      {
        name: "Ledgerline Advisory",
        role: "financial adviser"
      }
    ],
    projectIds: [
      "prj-014"
    ],
    summary: "A pension investor bought a quarter of the operating offshore wind farm for long-term income.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Tessaline Pension Trust buys stake in Helgren Offshore Wind",
        url: "#sample",
        retrievedAt: "2026-05-22"
      }
    ]
  },
  {
    id: "deal-028",
    slug: "data-centre-operator-signs-ppa-for-riverina-plains-solar",
    isSample: true,
    date: "2026-05-09",
    type: "PPA",
    status: "completed",
    title: "Data-centre operator signs PPA for Riverina Plains Solar",
    technologies: [
      "solar"
    ],
    countries: [
      "AU"
    ],
    region: "Oceania",
    buyers: [
      {
        name: "Data-centre operator (sample)"
      }
    ],
    sellers: [
      {
        name: "Aurovale Investments"
      }
    ],
    capacityMW: 180,
    projectIds: [
      "prj-007"
    ],
    summary: "A data-centre operator contracted 180 MW of output for 12 years, supporting the project's construction financing.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Data-centre operator signs PPA for Riverina Plains Solar",
        url: "#sample",
        retrievedAt: "2026-05-09"
      }
    ]
  },
  {
    id: "deal-029",
    slug: "heliot-green-bank-launches-storage-credit-fund",
    isSample: true,
    date: "2026-04-28",
    type: "fund close",
    status: "completed",
    title: "Heliot Green Bank launches storage credit fund",
    technologies: [
      "storage"
    ],
    countries: [
      "GB",
      "DE",
      "AU"
    ],
    region: "Global",
    buyers: [
      {
        name: "Heliot Green Bank"
      }
    ],
    value: {
      amount: 800000000,
      currency: "USD",
      usd: 800000000,
      disclosed: true
    },
    summary: "A dedicated fund will lend to battery storage projects with contracted revenues.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Heliot Green Bank launches storage credit fund",
        url: "#sample",
        retrievedAt: "2026-04-28"
      }
    ]
  },
  {
    id: "deal-030",
    slug: "orrin-hydrogen-raises-growth-equity",
    isSample: true,
    date: "2026-04-15",
    type: "equity raise",
    status: "completed",
    title: "Orrin Hydrogen raises growth equity",
    technologies: [
      "hydrogen"
    ],
    countries: [
      "OM",
      "CL"
    ],
    region: "Global",
    buyers: [
      {
        name: "Ostrel Infrastructure Partners"
      }
    ],
    target: "Orrin Hydrogen",
    value: {
      amount: 220000000,
      currency: "USD",
      usd: 220000000,
      disclosed: true
    },
    projectIds: [
      "prj-049",
      "prj-050"
    ],
    summary: "New equity will fund development of two green hydrogen projects to investment decision.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Orrin Hydrogen raises growth equity",
        url: "#sample",
        retrievedAt: "2026-04-15"
      }
    ]
  },
  {
    id: "deal-031",
    slug: "permian-basin-storage-closes-construction-loan",
    isSample: true,
    date: "2026-03-30",
    type: "project finance",
    status: "completed",
    title: "Permian Basin Storage closes construction loan",
    technologies: [
      "storage"
    ],
    countries: [
      "US"
    ],
    region: "North America",
    buyers: [
      {
        name: "Marlow Commercial Bank"
      }
    ],
    target: "Permian Basin Storage",
    value: {
      amount: 310000000,
      currency: "USD",
      usd: 310000000,
      disclosed: true
    },
    capacityMW: 300,
    projectIds: [
      "prj-035"
    ],
    summary: "A bank group provided construction and tax-equity bridge financing for the 300 MW battery.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Permian Basin Storage closes construction loan",
        url: "#sample",
        retrievedAt: "2026-03-30"
      }
    ]
  },
  {
    id: "deal-032",
    slug: "northmoor-utilities-buys-c-te-nord-hydro-minority-stake",
    isSample: true,
    date: "2026-03-12",
    type: "M&A",
    status: "completed",
    title: "Northmoor Utilities buys Côte-Nord Hydro minority stake",
    technologies: [
      "hydro"
    ],
    countries: [
      "CA"
    ],
    region: "North America",
    buyers: [
      {
        name: "Northmoor Utilities"
      }
    ],
    sellers: [
      {
        name: "State energy agency (sample)"
      }
    ],
    target: "Côte-Nord Hydro",
    stakePct: 20,
    value: {
      amount: 1200000000,
      currency: "CAD",
      usd: 876000000,
      fxDate: "2026-03-12",
      disclosed: true
    },
    capacityMW: 900,
    projectIds: [
      "prj-031"
    ],
    summary: "The utility bought a 20% stake from the provincial owner, which keeps control.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Northmoor Utilities buys Côte-Nord Hydro minority stake",
        url: "#sample",
        retrievedAt: "2026-03-12"
      }
    ]
  },
  {
    id: "deal-033",
    slug: "kestrava-and-mazuri-form-southeast-asia-solar-platform",
    isSample: true,
    date: "2026-02-26",
    type: "joint venture",
    status: "completed",
    title: "Kestrava and Mazuri form Southeast Asia solar platform",
    technologies: [
      "solar",
      "storage"
    ],
    countries: [
      "VN",
      "PH",
      "ID"
    ],
    region: "Southeast Asia",
    buyers: [
      {
        name: "Kestrava Renewables"
      },
      {
        name: "Mazuri Energy Partners"
      }
    ],
    stakePct: 50,
    capacityMW: 900,
    projectIds: [
      "prj-012",
      "prj-039"
    ],
    summary: "The partners will co-develop 900 MW of solar and storage across three markets.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Kestrava and Mazuri form Southeast Asia solar platform",
        url: "#sample",
        retrievedAt: "2026-02-26"
      }
    ]
  },
  {
    id: "deal-034",
    slug: "llano-estacado-wind-refinanced",
    isSample: true,
    date: "2026-02-10",
    type: "refinancing",
    status: "completed",
    title: "Llano Estacado Wind refinanced",
    technologies: [
      "wind"
    ],
    countries: [
      "US"
    ],
    region: "North America",
    buyers: [
      {
        name: "Cendra Bank"
      }
    ],
    target: "Llano Estacado Wind",
    value: {
      amount: 420000000,
      currency: "USD",
      usd: 420000000,
      disclosed: true
    },
    capacityMW: 500,
    projectIds: [
      "prj-016"
    ],
    summary: "The owner replaced its original loan with longer, cheaper debt backed by eight years of output.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Llano Estacado Wind refinanced",
        url: "#sample",
        retrievedAt: "2026-02-10"
      }
    ]
  },
  {
    id: "deal-035",
    slug: "tanaro-renewables-lists-shares",
    isSample: true,
    date: "2026-01-27",
    type: "IPO",
    status: "completed",
    title: "Tanaro Renewables lists shares",
    technologies: [
      "solar",
      "wind"
    ],
    countries: [
      "ZA",
      "IN"
    ],
    region: "Global",
    buyers: [
      {
        name: "Public investors"
      }
    ],
    target: "Tanaro Renewables",
    stakePct: 22,
    value: {
      amount: 560000000,
      currency: "USD",
      usd: 560000000,
      disclosed: true
    },
    advisors: [
      {
        name: "Ashcombe Placement",
        role: "financial adviser"
      }
    ],
    summary: "The developer sold 22% of its shares to fund a 2 GW pipeline in Africa and South Asia.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Tanaro Renewables lists shares",
        url: "#sample",
        retrievedAt: "2026-01-27"
      }
    ]
  },
  {
    id: "deal-036",
    slug: "high-atlas-foothills-solar-mandates-lenders",
    isSample: true,
    date: "2026-01-14",
    type: "project finance",
    status: "announced",
    title: "High Atlas Foothills Solar mandates lenders",
    technologies: [
      "solar"
    ],
    countries: [
      "MA"
    ],
    region: "North Africa",
    buyers: [
      {
        name: "Pan-Regional Development Bank"
      }
    ],
    target: "High Atlas Foothills Solar",
    value: {
      amount: 260000000,
      currency: "USD",
      usd: 260000000,
      disclosed: true
    },
    capacityMW: 300,
    projectIds: [
      "prj-006"
    ],
    summary: "A development bank will lead the debt package for the 300 MW hybrid plant.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: High Atlas Foothills Solar mandates lenders",
        url: "#sample",
        retrievedAt: "2026-01-14"
      }
    ]
  },
  {
    id: "deal-037",
    slug: "lumbre-infrastructure-fund-buys-mojave-ridge-solar",
    isSample: true,
    date: "2025-12-18",
    type: "M&A",
    status: "completed",
    title: "Lumbre Infrastructure Fund buys Mojave Ridge Solar",
    technologies: [
      "solar"
    ],
    countries: [
      "US"
    ],
    region: "North America",
    buyers: [
      {
        name: "Lumbre Infrastructure Fund"
      }
    ],
    sellers: [
      {
        name: "Quillon Power"
      }
    ],
    target: "Mojave Ridge Solar",
    stakePct: 100,
    value: {
      amount: 390000000,
      currency: "USD",
      usd: 390000000,
      disclosed: true
    },
    capacityMW: 350,
    advisors: [
      {
        name: "Ledgerline Advisory",
        role: "financial adviser"
      }
    ],
    projectIds: [
      "prj-005"
    ],
    summary: "The fund bought the operating plant outright from its developer.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Lumbre Infrastructure Fund buys Mojave Ridge Solar",
        url: "#sample",
        retrievedAt: "2025-12-18"
      }
    ]
  },
  {
    id: "deal-038",
    slug: "mining-group-signs-ppa-with-altiplano-ridge-solar",
    isSample: true,
    date: "2025-12-04",
    type: "PPA",
    status: "completed",
    title: "Mining group signs PPA with Altiplano Ridge Solar",
    technologies: [
      "solar"
    ],
    countries: [
      "CL"
    ],
    region: "South America",
    buyers: [
      {
        name: "Mining group (sample)"
      }
    ],
    sellers: [
      {
        name: "Ardent Basin Developments"
      }
    ],
    capacityMW: 400,
    projectIds: [
      "prj-003"
    ],
    summary: "A copper miner contracted 400 MW of daytime solar output for 15 years.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Mining group signs PPA with Altiplano Ridge Solar",
        url: "#sample",
        retrievedAt: "2025-12-04"
      }
    ]
  },
  {
    id: "deal-039",
    slug: "aurovale-energy-transition-fund-ii-closes",
    isSample: true,
    date: "2025-11-20",
    type: "fund close",
    status: "completed",
    title: "Aurovale Energy Transition Fund II closes",
    technologies: [
      "wind",
      "solar",
      "hydro"
    ],
    countries: [
      "BR",
      "CL",
      "AR"
    ],
    region: "South America",
    buyers: [
      {
        name: "Aurovale Investments"
      }
    ],
    value: {
      amount: 1100000000,
      currency: "USD",
      usd: 1100000000,
      disclosed: true
    },
    summary: "The fund will invest in operating renewables across Latin America.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Aurovale Energy Transition Fund II closes",
        url: "#sample",
        retrievedAt: "2025-11-20"
      }
    ]
  },
  {
    id: "deal-040",
    slug: "northern-laos-hydro-signs-equity-bridge",
    isSample: true,
    date: "2025-11-06",
    type: "project finance",
    status: "completed",
    title: "Northern Laos Hydro signs equity bridge",
    technologies: [
      "hydro"
    ],
    countries: [
      "LA"
    ],
    region: "Southeast Asia",
    buyers: [
      {
        name: "Marlow Commercial Bank"
      }
    ],
    target: "Northern Laos Hydro",
    value: {
      amount: 140000000,
      currency: "USD",
      usd: 140000000,
      disclosed: true
    },
    capacityMW: 400,
    projectIds: [
      "prj-027"
    ],
    summary: "A short-term bridge loan covers sponsor equity until the main DFI facility is drawn.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Northern Laos Hydro signs equity bridge",
        url: "#sample",
        retrievedAt: "2025-11-06"
      }
    ]
  },
  {
    id: "deal-041",
    slug: "saltmarsh-energy-holdings-to-buy-fundy-narrows-tidal-developer",
    isSample: true,
    date: "2026-07-24",
    type: "M&A",
    status: "announced",
    title: "Saltmarsh Energy Holdings to buy Fundy Narrows Tidal developer",
    technologies: [
      "marine"
    ],
    countries: [
      "CA"
    ],
    region: "North America",
    buyers: [
      {
        name: "Saltmarsh Energy Holdings"
      }
    ],
    sellers: [
      {
        name: "Pelagic Tide Co."
      }
    ],
    target: "Fundy Narrows Tidal",
    stakePct: 100,
    capacityMW: 9,
    projectIds: [
      "prj-061"
    ],
    summary: "The buyer agreed to acquire the early-stage tidal project and its permits. Terms were not disclosed.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Saltmarsh Energy Holdings to buy Fundy Narrows Tidal developer",
        url: "#sample",
        retrievedAt: "2026-07-24"
      }
    ]
  },
  {
    id: "deal-042",
    slug: "rotterdam-delta-electrolyser-reaches-financial-close",
    isSample: true,
    date: "2026-08-30",
    type: "project finance",
    status: "completed",
    title: "Rotterdam Delta Electrolyser reaches financial close",
    technologies: [
      "hydrogen"
    ],
    countries: [
      "NL"
    ],
    region: "Europe",
    buyers: [
      {
        name: "Heliot Green Bank"
      },
      {
        name: "Varenne Export Credit Agency"
      }
    ],
    target: "Rotterdam Delta Electrolyser",
    value: {
      amount: 540000000,
      currency: "EUR",
      usd: 583000000,
      fxDate: "2026-08-30",
      disclosed: true
    },
    capacityMW: 200,
    projectIds: [
      "prj-052"
    ],
    summary: "Lenders and public grants together fund the 200 MW electrolyser.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Rotterdam Delta Electrolyser reaches financial close",
        url: "#sample",
        retrievedAt: "2026-08-30"
      }
    ]
  },
  {
    id: "deal-043",
    slug: "kaliko-geothermal-adds-strategic-investor",
    isSample: true,
    date: "2026-09-15",
    type: "equity raise",
    status: "completed",
    title: "Kaliko Geothermal adds strategic investor",
    technologies: [
      "geothermal"
    ],
    countries: [
      "ID"
    ],
    region: "Southeast Asia",
    buyers: [
      {
        name: "Northmoor Utilities"
      }
    ],
    target: "Priangan Highlands Geothermal",
    stakePct: 30,
    value: {
      amount: 85000000,
      currency: "USD",
      usd: 85000000,
      disclosed: true
    },
    capacityMW: 110,
    projectIds: [
      "prj-043"
    ],
    summary: "A utility investor took 30% of the Indonesian geothermal project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Kaliko Geothermal adds strategic investor",
        url: "#sample",
        retrievedAt: "2026-09-15"
      }
    ]
  },
  {
    id: "deal-044",
    slug: "upper-valley-run-of-river-closes-dfi-loan",
    isSample: true,
    date: "2026-10-27",
    type: "project finance",
    status: "completed",
    title: "Upper Valley Run-of-River closes DFI loan",
    technologies: [
      "hydro"
    ],
    countries: [
      "NP"
    ],
    region: "South Asia",
    buyers: [
      {
        name: "Pan-Regional Development Bank"
      }
    ],
    target: "Upper Valley Run-of-River",
    value: {
      amount: 190000000,
      currency: "USD",
      usd: 190000000,
      disclosed: true
    },
    capacityMW: 216,
    projectIds: [
      "prj-026"
    ],
    summary: "A development bank loan completes the financing for the 216 MW run-of-river plant.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Upper Valley Run-of-River closes DFI loan",
        url: "#sample",
        retrievedAt: "2026-10-27"
      }
    ]
  },
  {
    id: "deal-045",
    slug: "ostrel-infrastructure-partners-to-buy-western-plains-battery",
    isSample: true,
    date: "2026-11-02",
    type: "M&A",
    status: "announced",
    title: "Ostrel Infrastructure Partners to buy Western Plains Battery",
    technologies: [
      "storage"
    ],
    countries: [
      "AU"
    ],
    region: "Oceania",
    buyers: [
      {
        name: "Ostrel Infrastructure Partners"
      }
    ],
    sellers: [
      {
        name: "Brevant Storage"
      }
    ],
    target: "Western Plains Battery",
    stakePct: 100,
    value: {
      amount: 520000000,
      currency: "AUD",
      usd: 343000000,
      fxDate: "2026-11-02",
      disclosed: true
    },
    capacityMW: 300,
    advisors: [
      {
        name: "Ledgerline Advisory",
        role: "financial adviser"
      }
    ],
    projectIds: [
      "prj-038"
    ],
    summary: "The infrastructure investor agreed to buy the operating battery outright. Completion is expected in early 2027.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record: Ostrel Infrastructure Partners to buy Western Plains Battery",
        url: "#sample",
        retrievedAt: "2026-11-02"
      }
    ]
  }
];
