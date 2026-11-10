// SAMPLE DATA. Every record here is illustrative (isSample: true). Company names,
// values and events are invented and do not describe real transactions or publications.
// News items store only our own short summary and a link to the original.
import type { NewsItem } from "@/lib/types";

export const news: NewsItem[] = [
  {
    id: "news-001",
    slug: "vietnam-sets-out-new-direct-ppa-rules-for-large-power-users",
    isSample: true,
    date: "2026-11-09",
    breaking: true,
    featured: true,
    category: "policy",
    headline: "Vietnam sets out new direct PPA rules for large power users",
    summary: "Draft rules would let large industrial users buy power straight from wind and solar plants through the grid. The ministry is taking comments until January.",
    technologies: [
      "solar",
      "wind"
    ],
    countries: [
      "VN"
    ],
    source: {
      publisher: "Grid Ledger (sample)",
      title: "Vietnam sets out new direct PPA rules for large power users",
      url: "#sample",
      retrievedAt: "2026-11-09"
    }
  },
  {
    id: "news-002",
    slug: "chile-offshore-ready-grid-auction-draws-14-bids",
    isSample: true,
    date: "2026-11-08",
    category: "auction",
    headline: "Chile offshore-ready grid auction draws 14 bids",
    summary: "Fourteen bidders took part in a grid connection auction for northern Chile. Results are due before year-end.",
    technologies: [
      "solar",
      "storage"
    ],
    countries: [
      "CL"
    ],
    source: {
      publisher: "Perpetual sample source",
      title: "Chile offshore-ready grid auction draws 14 bids",
      url: "#sample",
      retrievedAt: "2026-11-08"
    },
    projectIds: [
      "prj-003"
    ]
  },
  {
    id: "news-003",
    slug: "siravo-energy-agrees-to-sell-minority-stake-in-halvard-bank",
    isSample: true,
    date: "2026-11-07",
    breaking: true,
    category: "corporate",
    headline: "Siravo Energy agrees to sell minority stake in Halvard Bank",
    summary: "The developer will keep a majority and operational control of the 1.4 GW project after the sale.",
    technologies: [
      "wind"
    ],
    countries: [
      "GB"
    ],
    source: {
      publisher: "The Sample Wire",
      title: "Siravo Energy agrees to sell minority stake in Halvard Bank",
      url: "#sample",
      retrievedAt: "2026-11-07"
    },
    projectIds: [
      "prj-013"
    ],
    dealIds: [
      "deal-001"
    ]
  },
  {
    id: "news-004",
    slug: "battery-prices-fall-again-in-third-quarter",
    isSample: true,
    date: "2026-11-06",
    category: "markets",
    headline: "Battery prices fall again in third quarter",
    summary: "Average quoted prices for grid-scale battery systems fell for the sixth quarter in a row, according to a sample industry survey.",
    technologies: [
      "storage"
    ],
    countries: [],
    source: {
      publisher: "Grid Ledger (sample)",
      title: "Battery prices fall again in third quarter",
      url: "#sample",
      retrievedAt: "2026-11-06"
    }
  },
  {
    id: "news-005",
    slug: "altiplano-ridge-solar-signs-debt-package",
    isSample: true,
    date: "2026-11-05",
    category: "finance",
    headline: "Altiplano Ridge Solar signs debt package",
    summary: "Lenders including a development bank have signed an 18-year loan for the 600 MW plant.",
    technologies: [
      "solar"
    ],
    countries: [
      "CL"
    ],
    source: {
      publisher: "Perpetual sample source",
      title: "Altiplano Ridge Solar signs debt package",
      url: "#sample",
      retrievedAt: "2026-11-05"
    },
    projectIds: [
      "prj-003"
    ],
    dealIds: [
      "deal-002"
    ]
  },
  {
    id: "news-006",
    slug: "eu-member-states-agree-faster-permitting-for-grid-upgrades",
    isSample: true,
    date: "2026-11-04",
    category: "policy",
    headline: "EU member states agree faster permitting for grid upgrades",
    summary: "Ministers backed a deadline of two years for permits on grid reinforcement linked to renewable projects.",
    technologies: [
      "solar",
      "wind",
      "storage"
    ],
    countries: [
      "DE",
      "PL",
      "PT",
      "ES",
      "NL",
      "FR",
      "FI"
    ],
    source: {
      publisher: "The Sample Wire",
      title: "EU member states agree faster permitting for grid upgrades",
      url: "#sample",
      retrievedAt: "2026-11-04"
    }
  },
  {
    id: "news-007",
    slug: "floating-pv-pilot-reports-first-year-of-output",
    isSample: true,
    date: "2026-11-03",
    category: "technology",
    headline: "Floating PV pilot reports first year of output",
    summary: "A 5 MW floating solar pilot on a reservoir in West Java produced slightly more than forecast in its first year, helped by water cooling.",
    technologies: [
      "solar"
    ],
    countries: [
      "ID"
    ],
    source: {
      publisher: "Grid Ledger (sample)",
      title: "Floating PV pilot reports first year of output",
      url: "#sample",
      retrievedAt: "2026-11-03"
    },
    projectIds: [
      "prj-012"
    ]
  },
  {
    id: "news-008",
    slug: "india-awards-2-gw-of-hybrid-wind-solar-capacity",
    isSample: true,
    date: "2026-11-02",
    category: "auction",
    headline: "India awards 2 GW of hybrid wind-solar capacity",
    summary: "A national tender for round-the-clock hybrid power was awarded across six winning bidders.",
    technologies: [
      "wind",
      "solar",
      "storage"
    ],
    countries: [
      "IN"
    ],
    source: {
      publisher: "Perpetual sample source",
      title: "India awards 2 GW of hybrid wind-solar capacity",
      url: "#sample",
      retrievedAt: "2026-11-02"
    }
  },
  {
    id: "news-009",
    slug: "australia-opens-consultation-on-hydrogen-guarantee-of-origin-rules",
    isSample: true,
    date: "2026-10-31",
    category: "policy",
    headline: "Australia opens consultation on hydrogen guarantee-of-origin rules",
    summary: "The scheme would certify how much carbon is emitted making each kilogram of hydrogen.",
    technologies: [
      "hydrogen"
    ],
    countries: [
      "AU"
    ],
    source: {
      publisher: "The Sample Wire",
      title: "Australia opens consultation on hydrogen guarantee-of-origin rules",
      url: "#sample",
      retrievedAt: "2026-10-31"
    },
    projectIds: [
      "prj-048"
    ]
  },
  {
    id: "news-010",
    slug: "lumbre-closes-third-infrastructure-fund-at-hard-cap",
    isSample: true,
    date: "2026-10-30",
    category: "finance",
    headline: "Lumbre closes third infrastructure fund at hard cap",
    summary: "The fund will invest in operating solar, wind and storage assets in OECD markets.",
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
    source: {
      publisher: "Grid Ledger (sample)",
      title: "Lumbre closes third infrastructure fund at hard cap",
      url: "#sample",
      retrievedAt: "2026-10-30"
    },
    dealIds: [
      "deal-004"
    ]
  },
  {
    id: "news-011",
    slug: "negative-price-hours-rise-across-european-power-markets",
    isSample: true,
    date: "2026-10-29",
    category: "markets",
    headline: "Negative-price hours rise across European power markets",
    summary: "Sample market data shows more hours with negative wholesale prices this autumn, strengthening the case for storage.",
    technologies: [
      "solar",
      "wind",
      "storage"
    ],
    countries: [
      "DE",
      "NL",
      "ES"
    ],
    source: {
      publisher: "Perpetual sample source",
      title: "Negative-price hours rise across European power markets",
      url: "#sample",
      retrievedAt: "2026-10-29"
    }
  },
  {
    id: "news-012",
    slug: "kenya-publishes-updated-geothermal-licensing-framework",
    isSample: true,
    date: "2026-10-27",
    category: "policy",
    headline: "Kenya publishes updated geothermal licensing framework",
    summary: "The new framework sets clearer timelines for exploration licences and steam supply contracts.",
    technologies: [
      "geothermal"
    ],
    countries: [
      "KE"
    ],
    source: {
      publisher: "The Sample Wire",
      title: "Kenya publishes updated geothermal licensing framework",
      url: "#sample",
      retrievedAt: "2026-10-27"
    },
    projectIds: [
      "prj-042"
    ]
  },
  {
    id: "news-013",
    slug: "enhanced-geothermal-pilot-hits-flow-target",
    isSample: true,
    date: "2026-10-25",
    category: "technology",
    headline: "Enhanced geothermal pilot hits flow target",
    summary: "A sample enhanced geothermal pilot in Nevada reports stable flow rates over a 30-day test.",
    technologies: [
      "geothermal"
    ],
    countries: [
      "US"
    ],
    source: {
      publisher: "Grid Ledger (sample)",
      title: "Enhanced geothermal pilot hits flow target",
      url: "#sample",
      retrievedAt: "2026-10-25"
    },
    projectIds: [
      "prj-046"
    ]
  },
  {
    id: "news-014",
    slug: "tehachapi-battery-owner-issues-green-bond",
    isSample: true,
    date: "2026-10-24",
    category: "finance",
    headline: "Tehachapi battery owner issues green bond",
    summary: "The bond refinances construction debt for the 400 MW battery.",
    technologies: [
      "storage"
    ],
    countries: [
      "US"
    ],
    source: {
      publisher: "Perpetual sample source",
      title: "Tehachapi battery owner issues green bond",
      url: "#sample",
      retrievedAt: "2026-10-24"
    },
    projectIds: [
      "prj-034"
    ],
    dealIds: [
      "deal-006"
    ]
  },
  {
    id: "news-015",
    slug: "uk-contracts-round-attracts-record-tidal-interest",
    isSample: true,
    date: "2026-10-22",
    category: "auction",
    headline: "UK contracts round attracts record tidal interest",
    summary: "Tidal stream developers bid more capacity than the ring-fenced budget allows.",
    technologies: [
      "marine",
      "wind"
    ],
    countries: [
      "GB"
    ],
    source: {
      publisher: "The Sample Wire",
      title: "UK contracts round attracts record tidal interest",
      url: "#sample",
      retrievedAt: "2026-10-22"
    },
    projectIds: [
      "prj-059"
    ]
  },
  {
    id: "news-016",
    slug: "kaliko-geothermal-raises-new-equity",
    isSample: true,
    date: "2026-10-20",
    category: "corporate",
    headline: "Kaliko Geothermal raises new equity",
    summary: "The developer will use the funds to drill at projects in the US and Indonesia.",
    technologies: [
      "geothermal"
    ],
    countries: [
      "US",
      "ID"
    ],
    source: {
      publisher: "Grid Ledger (sample)",
      title: "Kaliko Geothermal raises new equity",
      url: "#sample",
      retrievedAt: "2026-10-20"
    },
    projectIds: [
      "prj-046",
      "prj-043"
    ],
    dealIds: [
      "deal-008"
    ]
  },
  {
    id: "news-017",
    slug: "brazil-sets-rules-for-offshore-wind-seabed-leasing",
    isSample: true,
    date: "2026-10-17",
    category: "policy",
    headline: "Brazil sets rules for offshore wind seabed leasing",
    summary: "The regulator published the first rules for assigning offshore areas for wind development.",
    technologies: [
      "wind"
    ],
    countries: [
      "BR"
    ],
    source: {
      publisher: "Perpetual sample source",
      title: "Brazil sets rules for offshore wind seabed leasing",
      url: "#sample",
      retrievedAt: "2026-10-17"
    }
  },
  {
    id: "news-018",
    slug: "corporate-ppa-volumes-up-in-asia-pacific",
    isSample: true,
    date: "2026-10-15",
    category: "markets",
    headline: "Corporate PPA volumes up in Asia-Pacific",
    summary: "Companies signed more renewable power contracts in Asia-Pacific in the third quarter than in any previous quarter, according to sample figures.",
    technologies: [
      "solar",
      "wind"
    ],
    countries: [
      "IN",
      "AU",
      "JP",
      "TW"
    ],
    source: {
      publisher: "The Sample Wire",
      title: "Corporate PPA volumes up in Asia-Pacific",
      url: "#sample",
      retrievedAt: "2026-10-15"
    },
    dealIds: [
      "deal-003"
    ]
  },
  {
    id: "news-019",
    slug: "south-africa-extends-private-grid-access-scheme",
    isSample: true,
    date: "2026-10-13",
    category: "policy",
    headline: "South Africa extends private grid access scheme",
    summary: "The government extended a scheme that lets private generators use the national grid to sell power to customers.",
    technologies: [
      "solar",
      "wind"
    ],
    countries: [
      "ZA"
    ],
    source: {
      publisher: "Grid Ledger (sample)",
      title: "South Africa extends private grid access scheme",
      url: "#sample",
      retrievedAt: "2026-10-13"
    },
    projectIds: [
      "prj-001"
    ]
  },
  {
    id: "news-020",
    slug: "long-duration-storage-trial-completes-winter-test",
    isSample: true,
    date: "2026-10-10",
    category: "technology",
    headline: "Long-duration storage trial completes winter test",
    summary: "A sample 8-hour storage pilot completed its first full winter of grid service.",
    technologies: [
      "storage"
    ],
    countries: [
      "GB"
    ],
    source: {
      publisher: "Perpetual sample source",
      title: "Long-duration storage trial completes winter test",
      url: "#sample",
      retrievedAt: "2026-10-10"
    }
  },
  {
    id: "news-021",
    slug: "velmora-energy-pauses-sale-of-vietnam-wind-asset",
    isSample: true,
    date: "2026-10-07",
    category: "corporate",
    headline: "Velmora Energy pauses sale of Vietnam wind asset",
    summary: "The company ended talks with its preferred bidder and will keep the project for now.",
    technologies: [
      "wind"
    ],
    countries: [
      "VN"
    ],
    source: {
      publisher: "The Sample Wire",
      title: "Velmora Energy pauses sale of Vietnam wind asset",
      url: "#sample",
      retrievedAt: "2026-10-07"
    },
    projectIds: [
      "prj-022"
    ],
    dealIds: [
      "deal-011"
    ]
  },
  {
    id: "news-022",
    slug: "brevant-storage-completes-listing",
    isSample: true,
    date: "2026-10-02",
    category: "finance",
    headline: "Brevant Storage completes listing",
    summary: "The battery developer's shares started trading after a share sale.",
    technologies: [
      "storage"
    ],
    countries: [
      "GB",
      "DE"
    ],
    source: {
      publisher: "Grid Ledger (sample)",
      title: "Brevant Storage completes listing",
      url: "#sample",
      retrievedAt: "2026-10-02"
    },
    dealIds: [
      "deal-012"
    ]
  },
  {
    id: "news-023",
    slug: "oman-revises-hydrogen-land-allocation-terms",
    isSample: true,
    date: "2026-09-28",
    category: "policy",
    headline: "Oman revises hydrogen land allocation terms",
    summary: "New terms give developers more time to reach investment decisions on allocated land.",
    technologies: [
      "hydrogen"
    ],
    countries: [
      "OM"
    ],
    source: {
      publisher: "Perpetual sample source",
      title: "Oman revises hydrogen land allocation terms",
      url: "#sample",
      retrievedAt: "2026-09-28"
    },
    projectIds: [
      "prj-049"
    ]
  },
  {
    id: "news-024",
    slug: "philippines-green-energy-auction-round-opens",
    isSample: true,
    date: "2026-09-24",
    category: "auction",
    headline: "Philippines green energy auction round opens",
    summary: "The auction includes a dedicated tranche for battery storage for the first time.",
    technologies: [
      "solar",
      "storage",
      "wind"
    ],
    countries: [
      "PH"
    ],
    source: {
      publisher: "The Sample Wire",
      title: "Philippines green energy auction round opens",
      url: "#sample",
      retrievedAt: "2026-09-24"
    },
    projectIds: [
      "prj-039"
    ]
  },
  {
    id: "news-025",
    slug: "bioenergy-feedstock-prices-ease",
    isSample: true,
    date: "2026-09-18",
    category: "markets",
    headline: "Bioenergy feedstock prices ease",
    summary: "Sample data show lower prices for wood pellets and agricultural residues compared with a year ago.",
    technologies: [
      "bioenergy"
    ],
    countries: [
      "FI",
      "GB",
      "BR"
    ],
    source: {
      publisher: "Grid Ledger (sample)",
      title: "Bioenergy feedstock prices ease",
      url: "#sample",
      retrievedAt: "2026-09-18"
    }
  }
];
