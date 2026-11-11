// SAMPLE DATA. Every record here is illustrative (isSample: true): names, owners,
// financing and dates are invented. Coordinates point at real places only so the map
// looks realistic. Add a project by appending an object; zod validates it at build.
import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "prj-001",
    slug: "kalahari-sun-field",
    name: "Kalahari Sun Field",
    isSample: true,
    technology: "solar",
    subType: "utility-scale PV",
    capacityMW: 450,
    capacityBasis: "AC",
    country: "ZA",
    region: "Southern Africa",
    admin1: "Northern Cape",
    lat: -28.45,
    lng: 21.25,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Tanaro Renewables",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Tanaro Renewables",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Cendra Capital",
        role: "co-investor",
        stakePct: 30
      }
    ],
    epc: [
      {
        name: "Takemi Construction",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Kinora Asset Management",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "corporate PPA",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2018-01-03",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 6709000000,
        currency: "ZAR",
        usd: 369000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Pan-Regional Development Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Tanaro Renewables"
        },
        {
          name: "Cendra Capital"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2015-06-05",
        confidence: "confirmed"
      },
      permits: {
        date: "2017-07-21",
        confidence: "confirmed"
      },
      construction: {
        date: "2019-01-03",
        confidence: "confirmed"
      },
      cod: {
        date: "2021-09-04",
        confidence: "confirmed"
      },
      decommission: {
        date: "2051-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 450 MW utility-scale PV project in Northern Cape, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Kalahari Sun Field",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-04",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-002",
    slug: "ninh-thuan-coastal-pv",
    name: "Ninh Thuan Coastal PV",
    isSample: true,
    technology: "solar",
    subType: "utility-scale PV",
    capacityMW: 200,
    capacityBasis: "AC",
    country: "VN",
    region: "Southeast Asia",
    admin1: "Ninh Thuan",
    lat: 11.57,
    lng: 108.99,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Quillon Power",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Quillon Power",
        role: "sponsor",
        stakePct: 51
      },
      {
        name: "Saltmarsh Energy Holdings",
        role: "co-investor",
        stakePct: 49
      }
    ],
    epc: [
      {
        name: "Ferrocasa EPC",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Revell Operations",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "auction",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2017-04-02",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 4100000000000,
        currency: "VND",
        usd: 164000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Marlow Commercial Bank",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "Quillon Power"
        },
        {
          name: "Saltmarsh Energy Holdings"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2014-02-18",
        confidence: "confirmed"
      },
      permits: {
        date: "2016-07-02",
        confidence: "confirmed"
      },
      construction: {
        date: "2018-10-04",
        confidence: "confirmed"
      },
      cod: {
        date: "2020-04-21",
        confidence: "confirmed"
      },
      decommission: {
        date: "2050-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 200 MW utility-scale PV project in Ninh Thuan, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Ninh Thuan Coastal PV",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-05",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-003",
    slug: "altiplano-ridge-solar",
    name: "Altiplano Ridge Solar",
    isSample: true,
    technology: "solar",
    subType: "utility-scale PV",
    capacityMW: 600,
    capacityBasis: "AC",
    country: "CL",
    region: "South America",
    admin1: "Antofagasta",
    lat: -22.9,
    lng: -69.3,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Siravo Energy",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Siravo Energy",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Ostrel Infrastructure Partners",
        role: "co-investor",
        stakePct: 40
      }
    ],
    epc: [
      {
        name: "Brightline Builders",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "corporate PPA",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2026-11-05",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 423000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Varenne Export Credit Agency",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Siravo Energy"
        },
        {
          name: "Ostrel Infrastructure Partners"
        }
      ],
      instruments: [
        "senior debt",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2021-07-05",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-09-04",
        confidence: "confirmed"
      },
      construction: {
        date: "2025-10-10",
        confidence: "confirmed"
      },
      cod: {
        date: "2027-09-27",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 600 MW utility-scale PV project in Antofagasta, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Altiplano Ridge Solar",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-02",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-004",
    slug: "thar-plains-solar-park",
    name: "Thar Plains Solar Park",
    isSample: true,
    technology: "solar",
    subType: "utility-scale PV",
    capacityMW: 1200,
    capacityBasis: "AC",
    country: "IN",
    region: "South Asia",
    admin1: "Rajasthan",
    lat: 27.53,
    lng: 71.91,
    status: "operating",
    ownership: "ppp",
    developer: [
      {
        name: "Ardent Basin Developments",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Ardent Basin Developments",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Aurovale Investments",
        role: "co-investor",
        stakePct: 30
      }
    ],
    epc: [
      {
        name: "Ondulo Marine Contractors",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Kinora Asset Management",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "State power purchaser (sample)",
      type: "auction",
      tenorYears: 20
    },
    financing: {
      financialClose: {
        date: "2019-05-08",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 79167000000,
        currency: "INR",
        usd: 950000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Heliot Green Bank",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "Ardent Basin Developments"
        },
        {
          name: "Aurovale Investments"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2016-10-02",
        confidence: "confirmed"
      },
      permits: {
        date: "2018-10-07",
        confidence: "confirmed"
      },
      construction: {
        date: "2020-08-22",
        confidence: "confirmed"
      },
      cod: {
        date: "2022-09-14",
        confidence: "confirmed"
      },
      decommission: {
        date: "2052-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 1,200 MW utility-scale PV project in Rajasthan, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Thar Plains Solar Park",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-04",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-005",
    slug: "mojave-ridge-solar",
    name: "Mojave Ridge Solar",
    isSample: true,
    technology: "solar",
    subType: "utility-scale PV",
    capacityMW: 350,
    capacityBasis: "AC",
    country: "US",
    region: "North America",
    admin1: "California",
    lat: 35.0,
    lng: -117.6,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Kestrava Renewables",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Kestrava Renewables",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Harrowgate Grid Capital",
        role: "co-investor",
        stakePct: 30
      }
    ],
    epc: [
      {
        name: "Granwell Engineering",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Revell Operations",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2016-09-14",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 289000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Cendra Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Kestrava Renewables"
        },
        {
          name: "Harrowgate Grid Capital"
        }
      ],
      instruments: [
        "senior debt",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2013-02-19",
        confidence: "confirmed"
      },
      permits: {
        date: "2015-05-17",
        confidence: "confirmed"
      },
      construction: {
        date: "2017-08-11",
        confidence: "confirmed"
      },
      cod: {
        date: "2019-12-15",
        confidence: "confirmed"
      },
      decommission: {
        date: "2049-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 350 MW utility-scale PV project in California, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Mojave Ridge Solar",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-03",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-006",
    slug: "high-atlas-foothills-solar",
    name: "High Atlas Foothills Solar",
    isSample: true,
    technology: "solar",
    subType: "CSP + PV hybrid",
    capacityMW: 300,
    capacityBasis: "AC",
    country: "MA",
    region: "North Africa",
    admin1: "Drâa-Tafilalet",
    lat: 31.3,
    lng: -7.4,
    status: "financing",
    ownership: "ppp",
    developer: [
      {
        name: "Corvane Power",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Corvane Power",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Tessaline Pension Trust",
        role: "co-investor",
        stakePct: 30
      }
    ],
    offtake: {
      offtaker: "State power purchaser (sample)",
      type: "auction",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2026-04-19",
        confidence: "estimated"
      },
      totalCapex: {
        amount: 2280000000,
        currency: "MAD",
        usd: 228000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Pan-Regional Development Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Corvane Power"
        },
        {
          name: "Tessaline Pension Trust"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2022-08-14",
        confidence: "confirmed"
      },
      permits: {
        date: "2024-01-22",
        confidence: "confirmed"
      },
      construction: {
        date: "2026-02-25",
        confidence: "estimated"
      },
      cod: {
        date: "2028-09-19",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 300 MW CSP + PV hybrid project in Drâa-Tafilalet, currently financing. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for High Atlas Foothills Solar",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-02",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-007",
    slug: "riverina-plains-solar",
    name: "Riverina Plains Solar",
    isSample: true,
    technology: "solar",
    subType: "utility-scale PV",
    capacityMW: 280,
    capacityBasis: "AC",
    country: "AU",
    region: "Oceania",
    admin1: "New South Wales",
    lat: -34.8,
    lng: 146.4,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Mazuri Energy Partners",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Mazuri Energy Partners",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Northmoor Utilities",
        role: "co-investor",
        stakePct: 30
      }
    ],
    epc: [
      {
        name: "Ferrocasa EPC",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "corporate PPA",
      tenorYears: 20
    },
    financing: {
      financialClose: {
        date: "2024-05-23",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 355000000,
        currency: "AUD",
        usd: 234000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Marlow Commercial Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Mazuri Energy Partners"
        },
        {
          name: "Northmoor Utilities"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2021-05-16",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-12-22",
        confidence: "confirmed"
      },
      construction: {
        date: "2026-10-12",
        confidence: "confirmed"
      },
      cod: {
        date: "2027-12-23",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 280 MW utility-scale PV project in New South Wales, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Riverina Plains Solar",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-06",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-008",
    slug: "aswan-desert-pv",
    name: "Aswan Desert PV",
    isSample: true,
    technology: "solar",
    subType: "utility-scale PV",
    capacityMW: 500,
    capacityBasis: "AC",
    country: "EG",
    region: "North Africa",
    admin1: "Aswan",
    lat: 23.9,
    lng: 32.4,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Orrin Hydrogen",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Orrin Hydrogen",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Lumbre Infrastructure Fund",
        role: "co-investor",
        stakePct: 40
      }
    ],
    epc: [
      {
        name: "Brightline Builders",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Revell Operations",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2016-04-13",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 432000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Varenne Export Credit Agency",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "Orrin Hydrogen"
        },
        {
          name: "Lumbre Infrastructure Fund"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2013-01-15",
        confidence: "confirmed"
      },
      permits: {
        date: "2015-06-06",
        confidence: "confirmed"
      },
      construction: {
        date: "2017-10-04",
        confidence: "confirmed"
      },
      cod: {
        date: "2019-08-02",
        confidence: "confirmed"
      },
      decommission: {
        date: "2049-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 500 MW utility-scale PV project in Aswan, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Aswan Desert PV",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-02",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-009",
    slug: "alentejo-montado-solar",
    name: "Alentejo Montado Solar",
    isSample: true,
    technology: "solar",
    subType: "agrivoltaic",
    capacityMW: 220,
    capacityBasis: "AC",
    country: "PT",
    region: "Europe",
    admin1: "Alentejo",
    lat: 38.0,
    lng: -7.9,
    status: "permitting",
    ownership: "private",
    developer: [
      {
        name: "Brevant Storage",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Brevant Storage",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Cendra Capital",
        role: "co-investor",
        stakePct: 30
      }
    ],
    dates: {
      announced: {
        date: "2023-03-15",
        confidence: "confirmed"
      },
      permits: {
        date: "2025-07-18",
        confidence: "estimated"
      },
      construction: {
        date: "2027-05-05",
        confidence: "estimated"
      },
      cod: {
        date: "2029-07-28",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 220 MW agrivoltaic project in Alentejo, currently permitting. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Alentejo Montado Solar",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-07",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-010",
    slug: "sert-o-bright-solar",
    name: "Sertão Bright Solar",
    isSample: true,
    technology: "solar",
    subType: "utility-scale PV",
    capacityMW: 400,
    capacityBasis: "AC",
    country: "BR",
    region: "South America",
    admin1: "Ceará",
    lat: -5.2,
    lng: -39.5,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Kaliko Geothermal",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Kaliko Geothermal",
        role: "sponsor",
        stakePct: 51
      },
      {
        name: "Saltmarsh Energy Holdings",
        role: "co-investor",
        stakePct: 49
      }
    ],
    epc: [
      {
        name: "Granwell Engineering",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "corporate PPA",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2024-05-10",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 1772000000,
        currency: "BRL",
        usd: 319000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Cendra Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Kaliko Geothermal"
        },
        {
          name: "Saltmarsh Energy Holdings"
        }
      ],
      instruments: [
        "senior debt",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2021-04-05",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-02-06",
        confidence: "confirmed"
      },
      construction: {
        date: "2026-10-25",
        confidence: "confirmed"
      },
      cod: {
        date: "2027-11-08",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 400 MW utility-scale PV project in Ceará, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Sertão Bright Solar",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-25",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-011",
    slug: "ili-steppe-pv",
    name: "Ili Steppe PV",
    isSample: true,
    technology: "solar",
    subType: "utility-scale PV",
    capacityMW: 100,
    capacityBasis: "AC",
    country: "KZ",
    region: "Central Asia",
    admin1: "Almaty Region",
    lat: 43.8,
    lng: 77.0,
    status: "announced",
    ownership: "private",
    developer: [
      {
        name: "Pelagic Tide Co.",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Pelagic Tide Co.",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Ostrel Infrastructure Partners",
        role: "co-investor",
        stakePct: 40
      }
    ],
    dates: {
      announced: {
        date: "2026-10-14",
        confidence: "confirmed"
      },
      cod: {
        date: "2029-10-11",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 100 MW utility-scale PV project in Almaty Region, currently announced. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Ili Steppe PV",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-01",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-012",
    slug: "west-java-reservoir-floating-pv",
    name: "West Java Reservoir Floating PV",
    isSample: true,
    technology: "solar",
    subType: "floating PV",
    capacityMW: 90,
    capacityBasis: "AC",
    country: "ID",
    region: "Southeast Asia",
    admin1: "West Java",
    lat: -6.91,
    lng: 107.37,
    status: "announced",
    ownership: "ppp",
    developer: [
      {
        name: "Velmora Energy",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Velmora Energy",
        role: "sponsor",
        stakePct: 80
      },
      {
        name: "Aurovale Investments",
        role: "co-investor",
        stakePct: 20
      }
    ],
    offtake: {
      offtaker: "State power purchaser (sample)",
      type: "auction",
      tenorYears: 25
    },
    dates: {
      announced: {
        date: "2026-10-22",
        confidence: "confirmed"
      },
      cod: {
        date: "2029-11-26",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 90 MW floating PV project in West Java, currently announced. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for West Java Reservoir Floating PV",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-22",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-013",
    slug: "halvard-bank-offshore-wind",
    name: "Halvard Bank Offshore Wind",
    isSample: true,
    technology: "wind",
    subType: "offshore fixed-bottom",
    capacityMW: 1400,
    country: "GB",
    region: "Europe",
    admin1: "North Sea",
    lat: 54.9,
    lng: 2.0,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Tanaro Renewables",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Tanaro Renewables",
        role: "sponsor",
        stakePct: 51
      },
      {
        name: "Harrowgate Grid Capital",
        role: "co-investor",
        stakePct: 49
      }
    ],
    epc: [
      {
        name: "Brightline Builders",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "auction",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2025-09-04",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 1359000000,
        currency: "GBP",
        usd: 1726000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Varenne Export Credit Agency",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Tanaro Renewables"
        },
        {
          name: "Harrowgate Grid Capital"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2022-04-03",
        confidence: "confirmed"
      },
      permits: {
        date: "2024-04-15",
        confidence: "confirmed"
      },
      construction: {
        date: "2026-03-04",
        confidence: "confirmed"
      },
      cod: {
        date: "2028-06-20",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 1,400 MW offshore fixed-bottom project in North Sea, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Halvard Bank Offshore Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-01",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-014",
    slug: "helgren-offshore-wind",
    name: "Helgren Offshore Wind",
    isSample: true,
    technology: "wind",
    subType: "offshore fixed-bottom",
    capacityMW: 900,
    country: "DE",
    region: "Europe",
    admin1: "North Sea",
    lat: 54.3,
    lng: 6.5,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Quillon Power",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Quillon Power",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Tessaline Pension Trust",
        role: "co-investor",
        stakePct: 30
      }
    ],
    epc: [
      {
        name: "Ondulo Marine Contractors",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Revell Operations",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2020-02-28",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 1203000000,
        currency: "EUR",
        usd: 1299000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Heliot Green Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Quillon Power"
        },
        {
          name: "Tessaline Pension Trust"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2017-02-28",
        confidence: "confirmed"
      },
      permits: {
        date: "2019-04-20",
        confidence: "confirmed"
      },
      construction: {
        date: "2021-07-05",
        confidence: "confirmed"
      },
      cod: {
        date: "2023-11-09",
        confidence: "confirmed"
      },
      decommission: {
        date: "2053-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 900 MW offshore fixed-bottom project in North Sea, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Helgren Offshore Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-08",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-015",
    slug: "pomeranian-shelf-offshore-wind",
    name: "Pomeranian Shelf Offshore Wind",
    isSample: true,
    technology: "wind",
    subType: "offshore fixed-bottom",
    capacityMW: 1100,
    country: "PL",
    region: "Europe",
    admin1: "Baltic Sea",
    lat: 54.9,
    lng: 17.6,
    status: "financing",
    ownership: "private",
    developer: [
      {
        name: "Siravo Energy",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Siravo Energy",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Northmoor Utilities",
        role: "co-investor",
        stakePct: 30
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "auction",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2027-05-01",
        confidence: "estimated"
      },
      totalCapex: {
        amount: 6120000000,
        currency: "PLN",
        usd: 1530000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Cendra Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Siravo Energy"
        },
        {
          name: "Northmoor Utilities"
        }
      ],
      instruments: [
        "senior debt",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2023-08-10",
        confidence: "confirmed"
      },
      permits: {
        date: "2025-02-05",
        confidence: "confirmed"
      },
      construction: {
        date: "2027-02-24",
        confidence: "estimated"
      },
      cod: {
        date: "2029-06-24",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 1,100 MW offshore fixed-bottom project in Baltic Sea, currently financing. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Pomeranian Shelf Offshore Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-06",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-016",
    slug: "llano-estacado-wind",
    name: "Llano Estacado Wind",
    isSample: true,
    technology: "wind",
    subType: "onshore",
    capacityMW: 500,
    country: "US",
    region: "North America",
    admin1: "Texas",
    lat: 35.3,
    lng: -101.8,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Ardent Basin Developments",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Ardent Basin Developments",
        role: "sponsor",
        stakePct: 51
      },
      {
        name: "Lumbre Infrastructure Fund",
        role: "co-investor",
        stakePct: 49
      }
    ],
    epc: [
      {
        name: "Takemi Construction",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Kinora Asset Management",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2015-06-06",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 741000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Pan-Regional Development Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Ardent Basin Developments"
        },
        {
          name: "Lumbre Infrastructure Fund"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2012-03-23",
        confidence: "confirmed"
      },
      permits: {
        date: "2014-09-01",
        confidence: "confirmed"
      },
      construction: {
        date: "2016-09-10",
        confidence: "confirmed"
      },
      cod: {
        date: "2018-11-28",
        confidence: "confirmed"
      },
      decommission: {
        date: "2048-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 500 MW onshore project in Texas, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Llano Estacado Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-09",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-017",
    slug: "chubut-plateau-wind",
    name: "Chubut Plateau Wind",
    isSample: true,
    technology: "wind",
    subType: "onshore",
    capacityMW: 220,
    country: "AR",
    region: "South America",
    admin1: "Chubut",
    lat: -45.8,
    lng: -67.5,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Kestrava Renewables",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Kestrava Renewables",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Cendra Capital",
        role: "co-investor",
        stakePct: 40
      }
    ],
    epc: [
      {
        name: "Ferrocasa EPC",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2024-04-07",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 336000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Marlow Commercial Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Kestrava Renewables"
        },
        {
          name: "Cendra Capital"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2021-09-25",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-09-11",
        confidence: "confirmed"
      },
      construction: {
        date: "2025-11-08",
        confidence: "confirmed"
      },
      cod: {
        date: "2026-10-30",
        confidence: "confirmed"
      },
      decommission: {
        date: "2056-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 220 MW onshore project in Chubut, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Chubut Plateau Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-30",
    dataVersion: "2026.11.0",
    om: [
      {
        name: "Revell Operations",
        role: "O&M provider"
      }
    ]
  },
  {
    id: "prj-018",
    slug: "northern-rift-wind",
    name: "Northern Rift Wind",
    isSample: true,
    technology: "wind",
    subType: "onshore",
    capacityMW: 300,
    country: "KE",
    region: "East Africa",
    admin1: "Marsabit",
    lat: 2.5,
    lng: 36.8,
    status: "operating",
    ownership: "ppp",
    developer: [
      {
        name: "Corvane Power",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Corvane Power",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Saltmarsh Energy Holdings",
        role: "co-investor",
        stakePct: 30
      }
    ],
    epc: [
      {
        name: "Brightline Builders",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Steadfast O&M Services",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "State power purchaser (sample)",
      type: "auction",
      tenorYears: 20
    },
    financing: {
      financialClose: {
        date: "2017-06-03",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 413000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Varenne Export Credit Agency",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "Corvane Power"
        },
        {
          name: "Saltmarsh Energy Holdings"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2014-01-26",
        confidence: "confirmed"
      },
      permits: {
        date: "2016-05-16",
        confidence: "confirmed"
      },
      construction: {
        date: "2018-05-07",
        confidence: "confirmed"
      },
      cod: {
        date: "2020-12-20",
        confidence: "confirmed"
      },
      decommission: {
        date: "2050-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 300 MW onshore project in Marsabit, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Northern Rift Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-08",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-019",
    slug: "kutch-coast-wind",
    name: "Kutch Coast Wind",
    isSample: true,
    technology: "wind",
    subType: "onshore",
    capacityMW: 600,
    country: "IN",
    region: "South Asia",
    admin1: "Gujarat",
    lat: 22.3,
    lng: 69.5,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Mazuri Energy Partners",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Mazuri Energy Partners",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Ostrel Infrastructure Partners",
        role: "co-investor",
        stakePct: 30
      }
    ],
    epc: [
      {
        name: "Ondulo Marine Contractors",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Kinora Asset Management",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "CfD",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2018-02-13",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 76333000000,
        currency: "INR",
        usd: 916000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Heliot Green Bank",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "Mazuri Energy Partners"
        },
        {
          name: "Ostrel Infrastructure Partners"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2015-04-11",
        confidence: "confirmed"
      },
      permits: {
        date: "2017-04-16",
        confidence: "confirmed"
      },
      construction: {
        date: "2019-10-20",
        confidence: "confirmed"
      },
      cod: {
        date: "2021-01-16",
        confidence: "confirmed"
      },
      decommission: {
        date: "2051-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 600 MW onshore project in Gujarat, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Kutch Coast Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-08",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-020",
    slug: "grassland-steppe-wind",
    name: "Grassland Steppe Wind",
    isSample: true,
    technology: "wind",
    subType: "onshore",
    capacityMW: 1000,
    country: "CN",
    region: "East Asia",
    admin1: "Inner Mongolia",
    lat: 41.9,
    lng: 113.6,
    status: "operating",
    ownership: "public",
    developer: [
      {
        name: "Orrin Hydrogen",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "State energy agency (sample)",
        role: "owner",
        stakePct: 100
      }
    ],
    epc: [
      {
        name: "Granwell Engineering",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Revell Operations",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "National grid utility (sample)",
      type: "CfD",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2019-03-06",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 9707000000,
        currency: "CNY",
        usd: 1359000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Cendra Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "State energy agency (sample)"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2016-03-14",
        confidence: "confirmed"
      },
      permits: {
        date: "2018-11-11",
        confidence: "confirmed"
      },
      construction: {
        date: "2020-02-26",
        confidence: "confirmed"
      },
      cod: {
        date: "2022-12-13",
        confidence: "confirmed"
      },
      decommission: {
        date: "2052-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 1,000 MW onshore project in Inner Mongolia, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Grassland Steppe Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-03",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-021",
    slug: "lukang-strait-offshore-wind",
    name: "Lukang Strait Offshore Wind",
    isSample: true,
    technology: "wind",
    subType: "offshore fixed-bottom",
    capacityMW: 640,
    country: "TW",
    region: "East Asia",
    admin1: "Changhua",
    lat: 24.2,
    lng: 120.1,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Brevant Storage",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Brevant Storage",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Harrowgate Grid Capital",
        role: "co-investor",
        stakePct: 30
      }
    ],
    epc: [
      {
        name: "Takemi Construction",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "auction",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2024-01-01",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 25935000000,
        currency: "TWD",
        usd: 804000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Pan-Regional Development Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Brevant Storage"
        },
        {
          name: "Harrowgate Grid Capital"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2021-10-15",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-11-05",
        confidence: "confirmed"
      },
      construction: {
        date: "2025-10-27",
        confidence: "confirmed"
      },
      cod: {
        date: "2027-10-16",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 640 MW offshore fixed-bottom project in Changhua, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Lukang Strait Offshore Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-02",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-022",
    slug: "mekong-delta-nearshore-wind",
    name: "Mekong Delta Nearshore Wind",
    isSample: true,
    technology: "wind",
    subType: "nearshore",
    capacityMW: 150,
    country: "VN",
    region: "Southeast Asia",
    admin1: "Bac Lieu",
    lat: 9.2,
    lng: 105.8,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Kaliko Geothermal",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Kaliko Geothermal",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Tessaline Pension Trust",
        role: "co-investor",
        stakePct: 30
      }
    ],
    epc: [
      {
        name: "Ferrocasa EPC",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Kinora Asset Management",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "auction",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2018-10-11",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 4800000000000,
        currency: "VND",
        usd: 192000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Marlow Commercial Bank",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "Kaliko Geothermal"
        },
        {
          name: "Tessaline Pension Trust"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2015-09-24",
        confidence: "confirmed"
      },
      permits: {
        date: "2017-03-14",
        confidence: "confirmed"
      },
      construction: {
        date: "2019-04-27",
        confidence: "confirmed"
      },
      cod: {
        date: "2021-04-01",
        confidence: "confirmed"
      },
      decommission: {
        date: "2051-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 150 MW nearshore project in Bac Lieu, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Mekong Delta Nearshore Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-03",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-023",
    slug: "outer-cape-offshore-wind",
    name: "Outer Cape Offshore Wind",
    isSample: true,
    technology: "wind",
    subType: "offshore fixed-bottom",
    capacityMW: 800,
    country: "US",
    region: "North America",
    admin1: "Massachusetts",
    lat: 41.0,
    lng: -70.4,
    status: "permitting",
    ownership: "private",
    developer: [
      {
        name: "Pelagic Tide Co.",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Pelagic Tide Co.",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Northmoor Utilities",
        role: "co-investor",
        stakePct: 40
      }
    ],
    dates: {
      announced: {
        date: "2024-01-24",
        confidence: "confirmed"
      },
      permits: {
        date: "2026-06-15",
        confidence: "estimated"
      },
      construction: {
        date: "2028-11-19",
        confidence: "estimated"
      },
      cod: {
        date: "2030-09-14",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 800 MW offshore fixed-bottom project in Massachusetts, currently permitting. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Outer Cape Offshore Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-08",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-024",
    slug: "spencer-gulf-wind",
    name: "Spencer Gulf Wind",
    isSample: true,
    technology: "wind",
    subType: "onshore",
    capacityMW: 400,
    country: "AU",
    region: "Oceania",
    admin1: "South Australia",
    lat: -33.3,
    lng: 138.6,
    status: "announced",
    ownership: "private",
    developer: [
      {
        name: "Velmora Energy",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Velmora Energy",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Lumbre Infrastructure Fund",
        role: "co-investor",
        stakePct: 40
      }
    ],
    dates: {
      announced: {
        date: "2026-11-03",
        confidence: "confirmed"
      },
      cod: {
        date: "2030-01-25",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 400 MW onshore project in South Australia, currently announced. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Spencer Gulf Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-03",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-025",
    slug: "potiguar-coast-wind",
    name: "Potiguar Coast Wind",
    isSample: true,
    technology: "wind",
    subType: "onshore",
    capacityMW: 350,
    country: "BR",
    region: "South America",
    admin1: "Rio Grande do Norte",
    lat: -5.5,
    lng: -36.0,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Tanaro Renewables",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Tanaro Renewables",
        role: "sponsor",
        stakePct: 51
      },
      {
        name: "Cendra Capital",
        role: "co-investor",
        stakePct: 49
      }
    ],
    epc: [
      {
        name: "Granwell Engineering",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Kinora Asset Management",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "CfD",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2017-04-09",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 3033000000,
        currency: "BRL",
        usd: 546000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Cendra Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Tanaro Renewables"
        },
        {
          name: "Cendra Capital"
        }
      ],
      instruments: [
        "senior debt",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2014-09-02",
        confidence: "confirmed"
      },
      permits: {
        date: "2016-06-22",
        confidence: "confirmed"
      },
      construction: {
        date: "2018-09-17",
        confidence: "confirmed"
      },
      cod: {
        date: "2020-09-16",
        confidence: "confirmed"
      },
      decommission: {
        date: "2050-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 350 MW onshore project in Rio Grande do Norte, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Potiguar Coast Wind",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-09",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-026",
    slug: "upper-valley-run-of-river",
    name: "Upper Valley Run-of-River",
    isSample: true,
    technology: "hydro",
    subType: "run-of-river",
    capacityMW: 216,
    country: "NP",
    region: "South Asia",
    admin1: "Bagmati",
    lat: 27.9,
    lng: 85.6,
    status: "construction",
    ownership: "ppp",
    developer: [
      {
        name: "Quillon Power",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Quillon Power",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Saltmarsh Energy Holdings",
        role: "co-investor",
        stakePct: 40
      }
    ],
    epc: [
      {
        name: "Takemi Construction",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "State power purchaser (sample)",
      type: "PPA",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2026-10-27",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 571000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Pan-Regional Development Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Quillon Power"
        },
        {
          name: "Saltmarsh Energy Holdings"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2021-08-18",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-01-25",
        confidence: "confirmed"
      },
      construction: {
        date: "2025-02-15",
        confidence: "confirmed"
      },
      cod: {
        date: "2027-06-20",
        confidence: "estimated"
      }
    },
    designLifeYears: 80,
    description: "Sample record. A 216 MW run-of-river project in Bagmati, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Upper Valley Run-of-River",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-09",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-027",
    slug: "northern-laos-hydro",
    name: "Northern Laos Hydro",
    isSample: true,
    technology: "hydro",
    subType: "reservoir",
    capacityMW: 400,
    country: "LA",
    region: "Southeast Asia",
    admin1: "Luang Prabang",
    lat: 19.0,
    lng: 102.8,
    status: "construction",
    ownership: "ppp",
    developer: [
      {
        name: "Siravo Energy",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Siravo Energy",
        role: "sponsor",
        stakePct: 80
      },
      {
        name: "Ostrel Infrastructure Partners",
        role: "co-investor",
        stakePct: 20
      }
    ],
    epc: [
      {
        name: "Ferrocasa EPC",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "State power purchaser (sample)",
      type: "PPA",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2025-04-14",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 983000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Marlow Commercial Bank",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "Siravo Energy"
        },
        {
          name: "Ostrel Infrastructure Partners"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2022-05-18",
        confidence: "confirmed"
      },
      permits: {
        date: "2024-04-27",
        confidence: "confirmed"
      },
      construction: {
        date: "2026-08-05",
        confidence: "confirmed"
      },
      cod: {
        date: "2028-07-04",
        confidence: "estimated"
      }
    },
    designLifeYears: 80,
    description: "Sample record. A 400 MW reservoir project in Luang Prabang, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Northern Laos Hydro",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-05",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-028",
    slug: "hardanger-pumped-storage",
    name: "Hardanger Pumped Storage",
    isSample: true,
    technology: "hydro",
    subType: "pumped storage",
    capacityMW: 1000,
    country: "NO",
    region: "Europe",
    admin1: "Vestland",
    lat: 59.5,
    lng: 6.8,
    status: "permitting",
    ownership: "public",
    developer: [
      {
        name: "Ardent Basin Developments",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "State energy agency (sample)",
        role: "owner",
        stakePct: 100
      }
    ],
    dates: {
      announced: {
        date: "2025-02-25",
        confidence: "confirmed"
      },
      permits: {
        date: "2027-03-23",
        confidence: "estimated"
      },
      construction: {
        date: "2029-11-22",
        confidence: "estimated"
      },
      cod: {
        date: "2031-06-05",
        confidence: "estimated"
      }
    },
    designLifeYears: 80,
    description: "Sample record. A 1,000 MW pumped storage project in Vestland, currently permitting. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Hardanger Pumped Storage",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-02",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-029",
    slug: "southern-highlands-hydro",
    name: "Southern Highlands Hydro",
    isSample: true,
    technology: "hydro",
    subType: "reservoir",
    capacityMW: 600,
    country: "ET",
    region: "East Africa",
    admin1: "SNNPR",
    lat: 6.2,
    lng: 38.3,
    status: "construction",
    ownership: "public",
    developer: [
      {
        name: "Kestrava Renewables",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "State energy agency (sample)",
        role: "owner",
        stakePct: 100
      }
    ],
    epc: [
      {
        name: "Ondulo Marine Contractors",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "National grid utility (sample)",
      type: "PPA",
      tenorYears: 20
    },
    financing: {
      financialClose: {
        date: "2026-06-03",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 1428000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Heliot Green Bank",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "State energy agency (sample)"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2023-07-16",
        confidence: "confirmed"
      },
      permits: {
        date: "2025-03-22",
        confidence: "confirmed"
      },
      construction: {
        date: "2027-04-06",
        confidence: "confirmed"
      },
      cod: {
        date: "2029-12-14",
        confidence: "estimated"
      }
    },
    designLifeYears: 80,
    description: "Sample record. A 600 MW reservoir project in SNNPR, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Southern Highlands Hydro",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-06",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-030",
    slug: "central-andes-run-of-river",
    name: "Central Andes Run-of-River",
    isSample: true,
    technology: "hydro",
    subType: "run-of-river",
    capacityMW: 180,
    country: "PE",
    region: "South America",
    admin1: "Junín",
    lat: -12.0,
    lng: -75.0,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Corvane Power",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Corvane Power",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Tessaline Pension Trust",
        role: "co-investor",
        stakePct: 30
      }
    ],
    epc: [
      {
        name: "Granwell Engineering",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Steadfast O&M Services",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2014-04-04",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 452000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Cendra Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Corvane Power"
        },
        {
          name: "Tessaline Pension Trust"
        }
      ],
      instruments: [
        "senior debt",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2011-09-15",
        confidence: "confirmed"
      },
      permits: {
        date: "2013-08-23",
        confidence: "confirmed"
      },
      construction: {
        date: "2015-01-13",
        confidence: "confirmed"
      },
      cod: {
        date: "2017-06-17",
        confidence: "confirmed"
      },
      decommission: {
        date: "2097-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 80,
    description: "Sample record. A 180 MW run-of-river project in Junín, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Central Andes Run-of-River",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-01",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-031",
    slug: "c-te-nord-hydro",
    name: "Côte-Nord Hydro",
    isSample: true,
    technology: "hydro",
    subType: "reservoir",
    capacityMW: 900,
    country: "CA",
    region: "North America",
    admin1: "Quebec",
    lat: 51.5,
    lng: -68.0,
    status: "operating",
    ownership: "public",
    developer: [
      {
        name: "Mazuri Energy Partners",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "State energy agency (sample)",
        role: "owner",
        stakePct: 100
      }
    ],
    epc: [
      {
        name: "Takemi Construction",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Kinora Asset Management",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "National grid utility (sample)",
      type: "PPA",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2012-06-03",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 2996000000,
        currency: "CAD",
        usd: 2187000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Pan-Regional Development Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "State energy agency (sample)"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2009-03-09",
        confidence: "confirmed"
      },
      permits: {
        date: "2011-03-27",
        confidence: "confirmed"
      },
      construction: {
        date: "2013-07-28",
        confidence: "confirmed"
      },
      cod: {
        date: "2015-11-27",
        confidence: "confirmed"
      },
      decommission: {
        date: "2095-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 80,
    description: "Sample record. A 900 MW reservoir project in Quebec, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Côte-Nord Hydro",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-03",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-032",
    slug: "atherton-tablelands-pumped-hydro",
    name: "Atherton Tablelands Pumped Hydro",
    isSample: true,
    technology: "hydro",
    subType: "pumped storage",
    capacityMW: 250,
    country: "AU",
    region: "Oceania",
    admin1: "Queensland",
    lat: -17.5,
    lng: 145.5,
    status: "permitting",
    ownership: "public",
    developer: [
      {
        name: "Orrin Hydrogen",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "State energy agency (sample)",
        role: "owner",
        stakePct: 100
      }
    ],
    dates: {
      announced: {
        date: "2024-07-03",
        confidence: "confirmed"
      },
      permits: {
        date: "2026-05-01",
        confidence: "estimated"
      },
      construction: {
        date: "2028-11-03",
        confidence: "estimated"
      },
      cod: {
        date: "2030-05-03",
        confidence: "estimated"
      }
    },
    designLifeYears: 80,
    description: "Sample record. A 250 MW pumped storage project in Queensland, currently permitting. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Atherton Tablelands Pumped Hydro",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-01",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-033",
    slug: "varzob-valley-hydro",
    name: "Varzob Valley Hydro",
    isSample: true,
    technology: "hydro",
    subType: "run-of-river",
    capacityMW: 350,
    country: "TJ",
    region: "Central Asia",
    admin1: "Districts of Republican Subordination",
    lat: 38.5,
    lng: 69.4,
    status: "financing",
    ownership: "public",
    developer: [
      {
        name: "Brevant Storage",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "State energy agency (sample)",
        role: "owner",
        stakePct: 100
      }
    ],
    offtake: {
      offtaker: "National grid utility (sample)",
      type: "PPA",
      tenorYears: 20
    },
    financing: {
      financialClose: {
        date: "2027-01-06",
        confidence: "estimated"
      },
      totalCapex: {
        amount: 990000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Varenne Export Credit Agency",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "State energy agency (sample)"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2023-06-18",
        confidence: "confirmed"
      },
      permits: {
        date: "2025-07-09",
        confidence: "confirmed"
      },
      construction: {
        date: "2027-10-05",
        confidence: "estimated"
      },
      cod: {
        date: "2029-01-17",
        confidence: "estimated"
      }
    },
    designLifeYears: 80,
    description: "Sample record. A 350 MW run-of-river project in Districts of Republican Subordination, currently financing. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Varzob Valley Hydro",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-05",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-034",
    slug: "tehachapi-grid-battery",
    name: "Tehachapi Grid Battery",
    isSample: true,
    technology: "storage",
    subType: "lithium-ion BESS",
    capacityMW: 400,
    storageMWh: 1600,
    country: "US",
    region: "North America",
    admin1: "California",
    lat: 34.9,
    lng: -118.9,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Kaliko Geothermal",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Kaliko Geothermal",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Saltmarsh Energy Holdings",
        role: "co-investor",
        stakePct: 30
      }
    ],
    epc: [
      {
        name: "Ondulo Marine Contractors",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Kinora Asset Management",
        role: "O&M provider"
      }
    ],
    offtake: {
      type: "merchant"
    },
    financing: {
      financialClose: {
        date: "2020-01-01",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 343000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Heliot Green Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Kaliko Geothermal"
        },
        {
          name: "Saltmarsh Energy Holdings"
        }
      ],
      instruments: [
        "senior debt",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2017-09-25",
        confidence: "confirmed"
      },
      permits: {
        date: "2019-04-10",
        confidence: "confirmed"
      },
      construction: {
        date: "2021-08-17",
        confidence: "confirmed"
      },
      cod: {
        date: "2023-11-06",
        confidence: "confirmed"
      },
      decommission: {
        date: "2043-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 20,
    description: "Sample record. A 1,600 MWh / 400 MW lithium-ion BESS project in California, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Tehachapi Grid Battery",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-09",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-035",
    slug: "permian-basin-storage",
    name: "Permian Basin Storage",
    isSample: true,
    technology: "storage",
    subType: "lithium-ion BESS",
    capacityMW: 300,
    storageMWh: 600,
    country: "US",
    region: "North America",
    admin1: "Texas",
    lat: 31.8,
    lng: -102.4,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Pelagic Tide Co.",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Pelagic Tide Co.",
        role: "sponsor",
        stakePct: 80
      },
      {
        name: "Ostrel Infrastructure Partners",
        role: "co-investor",
        stakePct: 20
      }
    ],
    epc: [
      {
        name: "Granwell Engineering",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2024-05-23",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 283000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Cendra Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Pelagic Tide Co."
        },
        {
          name: "Ostrel Infrastructure Partners"
        }
      ],
      instruments: [
        "senior debt",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2021-04-17",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-08-08",
        confidence: "confirmed"
      },
      construction: {
        date: "2025-08-04",
        confidence: "confirmed"
      },
      cod: {
        date: "2027-11-27",
        confidence: "estimated"
      }
    },
    designLifeYears: 20,
    description: "Sample record. A 600 MWh / 300 MW lithium-ion BESS project in Texas, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Permian Basin Storage",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-06",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-036",
    slug: "midlands-grid-battery",
    name: "Midlands Grid Battery",
    isSample: true,
    technology: "storage",
    subType: "lithium-ion BESS",
    capacityMW: 100,
    storageMWh: 200,
    country: "GB",
    region: "Europe",
    admin1: "West Midlands",
    lat: 52.5,
    lng: -1.5,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Velmora Energy",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Velmora Energy",
        role: "sponsor",
        stakePct: 51
      },
      {
        name: "Aurovale Investments",
        role: "co-investor",
        stakePct: 49
      }
    ],
    epc: [
      {
        name: "Takemi Construction",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Steadfast O&M Services",
        role: "O&M provider"
      }
    ],
    offtake: {
      type: "merchant"
    },
    financing: {
      financialClose: {
        date: "2021-11-24",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 78000000,
        currency: "GBP",
        usd: 99000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Pan-Regional Development Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Velmora Energy"
        },
        {
          name: "Aurovale Investments"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2018-04-27",
        confidence: "confirmed"
      },
      permits: {
        date: "2020-12-24",
        confidence: "confirmed"
      },
      construction: {
        date: "2022-11-05",
        confidence: "confirmed"
      },
      cod: {
        date: "2024-07-12",
        confidence: "confirmed"
      },
      decommission: {
        date: "2044-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 20,
    description: "Sample record. A 200 MWh / 100 MW lithium-ion BESS project in West Midlands, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Midlands Grid Battery",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-03",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-037",
    slug: "leipzig-lowland-battery",
    name: "Leipzig Lowland Battery",
    isSample: true,
    technology: "storage",
    subType: "lithium-ion BESS",
    capacityMW: 150,
    storageMWh: 300,
    country: "DE",
    region: "Europe",
    admin1: "Saxony",
    lat: 51.4,
    lng: 12.4,
    status: "financing",
    ownership: "private",
    developer: [
      {
        name: "Tanaro Renewables",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Tanaro Renewables",
        role: "sponsor",
        stakePct: 70
      },
      {
        name: "Harrowgate Grid Capital",
        role: "co-investor",
        stakePct: 30
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2026-04-06",
        confidence: "estimated"
      },
      totalCapex: {
        amount: 129000000,
        currency: "EUR",
        usd: 139000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Marlow Commercial Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Tanaro Renewables"
        },
        {
          name: "Harrowgate Grid Capital"
        }
      ],
      instruments: [
        "senior debt",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2022-01-03",
        confidence: "confirmed"
      },
      permits: {
        date: "2024-11-27",
        confidence: "confirmed"
      },
      construction: {
        date: "2026-07-28",
        confidence: "estimated"
      },
      cod: {
        date: "2028-09-22",
        confidence: "estimated"
      }
    },
    designLifeYears: 20,
    description: "Sample record. A 300 MWh / 150 MW lithium-ion BESS project in Saxony, currently financing. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Leipzig Lowland Battery",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-01",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-038",
    slug: "western-plains-battery",
    name: "Western Plains Battery",
    isSample: true,
    technology: "storage",
    subType: "lithium-ion BESS",
    capacityMW: 300,
    storageMWh: 1200,
    country: "AU",
    region: "Oceania",
    admin1: "Victoria",
    lat: -37.8,
    lng: 144.4,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Quillon Power",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Quillon Power",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Tessaline Pension Trust",
        role: "co-investor",
        stakePct: 40
      }
    ],
    epc: [
      {
        name: "Brightline Builders",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Revell Operations",
        role: "O&M provider"
      }
    ],
    offtake: {
      type: "merchant"
    },
    financing: {
      financialClose: {
        date: "2021-07-03",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 391000000,
        currency: "AUD",
        usd: 258000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Varenne Export Credit Agency",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Quillon Power"
        },
        {
          name: "Tessaline Pension Trust"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2018-05-12",
        confidence: "confirmed"
      },
      permits: {
        date: "2020-06-18",
        confidence: "confirmed"
      },
      construction: {
        date: "2022-06-08",
        confidence: "confirmed"
      },
      cod: {
        date: "2024-01-10",
        confidence: "confirmed"
      },
      decommission: {
        date: "2044-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 20,
    description: "Sample record. A 1,200 MWh / 300 MW lithium-ion BESS project in Victoria, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Western Plains Battery",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-04",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-039",
    slug: "central-luzon-bess",
    name: "Central Luzon BESS",
    isSample: true,
    technology: "storage",
    subType: "lithium-ion BESS",
    capacityMW: 120,
    storageMWh: 240,
    country: "PH",
    region: "Southeast Asia",
    admin1: "Central Luzon",
    lat: 15.5,
    lng: 120.6,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Siravo Energy",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Siravo Energy",
        role: "sponsor",
        stakePct: 80
      },
      {
        name: "Northmoor Utilities",
        role: "co-investor",
        stakePct: 20
      }
    ],
    epc: [
      {
        name: "Ondulo Marine Contractors",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2024-05-10",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 6529000000,
        currency: "PHP",
        usd: 111000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Heliot Green Bank",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "Siravo Energy"
        },
        {
          name: "Northmoor Utilities"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2021-04-17",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-01-03",
        confidence: "confirmed"
      },
      construction: {
        date: "2026-11-01",
        confidence: "confirmed"
      },
      cod: {
        date: "2027-02-05",
        confidence: "estimated"
      }
    },
    designLifeYears: 20,
    description: "Sample record. A 240 MWh / 120 MW lithium-ion BESS project in Central Luzon, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Central Luzon BESS",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-01",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-040",
    slug: "hokkaido-west-storage",
    name: "Hokkaido West Storage",
    isSample: true,
    technology: "storage",
    subType: "lithium-ion BESS",
    capacityMW: 100,
    storageMWh: 400,
    country: "JP",
    region: "East Asia",
    admin1: "Hokkaido",
    lat: 43.2,
    lng: 141.6,
    status: "announced",
    ownership: "private",
    developer: [
      {
        name: "Ardent Basin Developments",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Ardent Basin Developments",
        role: "sponsor",
        stakePct: 80
      },
      {
        name: "Lumbre Infrastructure Fund",
        role: "co-investor",
        stakePct: 20
      }
    ],
    dates: {
      announced: {
        date: "2026-10-19",
        confidence: "confirmed"
      },
      cod: {
        date: "2029-12-26",
        confidence: "estimated"
      }
    },
    designLifeYears: 20,
    description: "Sample record. A 400 MWh / 100 MW lithium-ion BESS project in Hokkaido, currently announced. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Hokkaido West Storage",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-19",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-041",
    slug: "western-region-desert-storage",
    name: "Western Region Desert Storage",
    isSample: true,
    technology: "storage",
    subType: "lithium-ion BESS",
    capacityMW: 400,
    storageMWh: 1600,
    country: "AE",
    region: "Middle East",
    admin1: "Abu Dhabi",
    lat: 24.2,
    lng: 54.6,
    status: "permitting",
    ownership: "public",
    developer: [
      {
        name: "Kestrava Renewables",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "State energy agency (sample)",
        role: "owner",
        stakePct: 100
      }
    ],
    dates: {
      announced: {
        date: "2022-05-24",
        confidence: "confirmed"
      },
      permits: {
        date: "2024-10-21",
        confidence: "estimated"
      },
      construction: {
        date: "2026-03-02",
        confidence: "estimated"
      },
      cod: {
        date: "2028-12-17",
        confidence: "estimated"
      }
    },
    designLifeYears: 20,
    description: "Sample record. A 1,600 MWh / 400 MW lithium-ion BESS project in Abu Dhabi, currently permitting. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Western Region Desert Storage",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-09",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-042",
    slug: "rift-valley-escarpment-geothermal",
    name: "Rift Valley Escarpment Geothermal",
    isSample: true,
    technology: "geothermal",
    subType: "flash steam",
    capacityMW: 140,
    country: "KE",
    region: "East Africa",
    admin1: "Nakuru",
    lat: -0.9,
    lng: 36.3,
    status: "operating",
    ownership: "public",
    developer: [
      {
        name: "Corvane Power",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "State energy agency (sample)",
        role: "owner",
        stakePct: 100
      }
    ],
    epc: [
      {
        name: "Ferrocasa EPC",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Steadfast O&M Services",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "National grid utility (sample)",
      type: "PPA",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2016-11-12",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 490000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Marlow Commercial Bank",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "State energy agency (sample)"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2013-09-19",
        confidence: "confirmed"
      },
      permits: {
        date: "2015-01-27",
        confidence: "confirmed"
      },
      construction: {
        date: "2017-11-19",
        confidence: "confirmed"
      },
      cod: {
        date: "2019-12-22",
        confidence: "confirmed"
      },
      decommission: {
        date: "2049-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 140 MW flash steam project in Nakuru, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Rift Valley Escarpment Geothermal",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-08",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-043",
    slug: "priangan-highlands-geothermal",
    name: "Priangan Highlands Geothermal",
    isSample: true,
    technology: "geothermal",
    subType: "flash steam",
    capacityMW: 110,
    country: "ID",
    region: "Southeast Asia",
    admin1: "West Java",
    lat: -7.2,
    lng: 107.6,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Mazuri Energy Partners",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Mazuri Energy Partners",
        role: "sponsor",
        stakePct: 80
      },
      {
        name: "Ostrel Infrastructure Partners",
        role: "co-investor",
        stakePct: 20
      }
    ],
    epc: [
      {
        name: "Brightline Builders",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "FiT",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2025-12-17",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 409000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Varenne Export Credit Agency",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "Mazuri Energy Partners"
        },
        {
          name: "Ostrel Infrastructure Partners"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2022-09-02",
        confidence: "confirmed"
      },
      permits: {
        date: "2024-11-01",
        confidence: "confirmed"
      },
      construction: {
        date: "2026-11-18",
        confidence: "confirmed"
      },
      cod: {
        date: "2028-11-08",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 110 MW flash steam project in West Java, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Priangan Highlands Geothermal",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-09",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-044",
    slug: "southern-peninsula-geothermal",
    name: "Southern Peninsula Geothermal",
    isSample: true,
    technology: "geothermal",
    subType: "flash steam",
    capacityMW: 90,
    country: "IS",
    region: "Europe",
    admin1: "Southern Peninsula",
    lat: 64.0,
    lng: -21.3,
    status: "operating",
    ownership: "public",
    developer: [
      {
        name: "Orrin Hydrogen",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "State energy agency (sample)",
        role: "owner",
        stakePct: 100
      }
    ],
    epc: [
      {
        name: "Ondulo Marine Contractors",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Revell Operations",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "National grid utility (sample)",
      type: "PPA",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2013-12-21",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 331000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Heliot Green Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "State energy agency (sample)"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2010-02-24",
        confidence: "confirmed"
      },
      permits: {
        date: "2012-12-16",
        confidence: "confirmed"
      },
      construction: {
        date: "2014-05-26",
        confidence: "confirmed"
      },
      cod: {
        date: "2016-02-28",
        confidence: "confirmed"
      },
      decommission: {
        date: "2046-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 90 MW flash steam project in Southern Peninsula, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Southern Peninsula Geothermal",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-07",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-045",
    slug: "davao-uplands-geothermal",
    name: "Davao Uplands Geothermal",
    isSample: true,
    technology: "geothermal",
    subType: "binary cycle",
    capacityMW: 60,
    country: "PH",
    region: "Southeast Asia",
    admin1: "Davao",
    lat: 7.0,
    lng: 125.2,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Brevant Storage",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Brevant Storage",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Harrowgate Grid Capital",
        role: "co-investor",
        stakePct: 40
      }
    ],
    epc: [
      {
        name: "Granwell Engineering",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Steadfast O&M Services",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 20
    },
    financing: {
      financialClose: {
        date: "2015-05-21",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 12353000000,
        currency: "PHP",
        usd: 210000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Cendra Bank",
          role: "senior lender"
        },
        {
          name: "Pan-Regional Development Bank",
          role: "DFI lender"
        }
      ],
      equity: [
        {
          name: "Brevant Storage"
        },
        {
          name: "Harrowgate Grid Capital"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2012-02-16",
        confidence: "confirmed"
      },
      permits: {
        date: "2014-11-10",
        confidence: "confirmed"
      },
      construction: {
        date: "2016-01-20",
        confidence: "confirmed"
      },
      cod: {
        date: "2018-11-21",
        confidence: "confirmed"
      },
      decommission: {
        date: "2048-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 60 MW binary cycle project in Davao, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Davao Uplands Geothermal",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-03",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-046",
    slug: "black-rock-basin-geothermal",
    name: "Black Rock Basin Geothermal",
    isSample: true,
    technology: "geothermal",
    subType: "enhanced geothermal (EGS)",
    capacityMW: 75,
    country: "US",
    region: "North America",
    admin1: "Nevada",
    lat: 39.8,
    lng: -118.7,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Kaliko Geothermal",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Kaliko Geothermal",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Tessaline Pension Trust",
        role: "co-investor",
        stakePct: 40
      }
    ],
    epc: [
      {
        name: "Takemi Construction",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "FiT",
      tenorYears: 25
    },
    financing: {
      financialClose: {
        date: "2025-09-10",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 316000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Pan-Regional Development Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Kaliko Geothermal"
        },
        {
          name: "Tessaline Pension Trust"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan"
      ]
    },
    dates: {
      announced: {
        date: "2022-01-16",
        confidence: "confirmed"
      },
      permits: {
        date: "2024-01-16",
        confidence: "confirmed"
      },
      construction: {
        date: "2026-05-22",
        confidence: "confirmed"
      },
      cod: {
        date: "2028-02-23",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 75 MW enhanced geothermal (EGS) project in Nevada, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Black Rock Basin Geothermal",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-02",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-047",
    slug: "taup-volcanic-zone-geothermal",
    name: "Taupō Volcanic Zone Geothermal",
    isSample: true,
    technology: "geothermal",
    subType: "binary cycle",
    capacityMW: 100,
    country: "NZ",
    region: "Oceania",
    admin1: "Waikato",
    lat: -38.6,
    lng: 176.1,
    status: "permitting",
    ownership: "mixed",
    developer: [
      {
        name: "Pelagic Tide Co.",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Pelagic Tide Co.",
        role: "sponsor",
        stakePct: 51
      },
      {
        name: "Northmoor Utilities",
        role: "co-investor",
        stakePct: 49
      }
    ],
    dates: {
      announced: {
        date: "2023-09-07",
        confidence: "confirmed"
      },
      permits: {
        date: "2025-05-03",
        confidence: "estimated"
      },
      construction: {
        date: "2027-08-01",
        confidence: "estimated"
      },
      cod: {
        date: "2029-05-15",
        confidence: "estimated"
      }
    },
    designLifeYears: 30,
    description: "Sample record. A 100 MW binary cycle project in Waikato, currently permitting. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Taupō Volcanic Zone Geothermal",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-05",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-048",
    slug: "hamersley-coast-hydrogen-hub",
    name: "Hamersley Coast Hydrogen Hub",
    isSample: true,
    technology: "hydrogen",
    subType: "PEM electrolyser",
    capacityMW: 500,
    hydrogenTonnesPerYear: 75000,
    country: "AU",
    region: "Oceania",
    admin1: "Western Australia",
    lat: -21.0,
    lng: 117.5,
    status: "announced",
    ownership: "private",
    developer: [
      {
        name: "Velmora Energy",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Velmora Energy",
        role: "sponsor",
        stakePct: 51
      },
      {
        name: "Lumbre Infrastructure Fund",
        role: "co-investor",
        stakePct: 49
      }
    ],
    dates: {
      announced: {
        date: "2026-10-28",
        confidence: "confirmed"
      },
      cod: {
        date: "2031-04-03",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 500 MW PEM electrolyser project in Western Australia, currently announced. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Hamersley Coast Hydrogen Hub",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-28",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-049",
    slug: "al-wusta-hydrogen-coast",
    name: "Al Wusta Hydrogen Coast",
    isSample: true,
    technology: "hydrogen",
    subType: "alkaline electrolyser",
    capacityMW: 300,
    hydrogenTonnesPerYear: 45000,
    country: "OM",
    region: "Middle East",
    admin1: "Al Wusta",
    lat: 19.6,
    lng: 57.7,
    status: "financing",
    ownership: "ppp",
    developer: [
      {
        name: "Tanaro Renewables",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Tanaro Renewables",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Cendra Capital",
        role: "co-investor",
        stakePct: 40
      }
    ],
    offtake: {
      offtaker: "State power purchaser (sample)",
      type: "PPA",
      tenorYears: 20
    },
    financing: {
      financialClose: {
        date: "2027-01-06",
        confidence: "estimated"
      },
      totalCapex: {
        amount: 540000000,
        currency: "USD"
      },
      debt: [
        {
          name: "Heliot Green Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Tanaro Renewables"
        },
        {
          name: "Cendra Capital"
        }
      ],
      instruments: [
        "senior debt",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2023-10-27",
        confidence: "confirmed"
      },
      permits: {
        date: "2025-11-17",
        confidence: "confirmed"
      },
      construction: {
        date: "2027-05-04",
        confidence: "estimated"
      },
      cod: {
        date: "2029-12-12",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 300 MW alkaline electrolyser project in Al Wusta, currently financing. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Al Wusta Hydrogen Coast",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-08",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-050",
    slug: "strait-plains-hydrogen",
    name: "Strait Plains Hydrogen",
    isSample: true,
    technology: "hydrogen",
    subType: "PEM electrolyser",
    capacityMW: 250,
    hydrogenTonnesPerYear: 35000,
    country: "CL",
    region: "South America",
    admin1: "Magallanes",
    lat: -52.8,
    lng: -70.9,
    status: "permitting",
    ownership: "private",
    developer: [
      {
        name: "Quillon Power",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Quillon Power",
        role: "sponsor",
        stakePct: 51
      },
      {
        name: "Saltmarsh Energy Holdings",
        role: "co-investor",
        stakePct: 49
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 20
    },
    dates: {
      announced: {
        date: "2024-07-10",
        confidence: "confirmed"
      },
      permits: {
        date: "2026-12-05",
        confidence: "estimated"
      },
      construction: {
        date: "2028-07-12",
        confidence: "estimated"
      },
      cod: {
        date: "2030-07-11",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 250 MW PEM electrolyser project in Magallanes, currently permitting. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Strait Plains Hydrogen",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-04",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-051",
    slug: "gulf-of-c-diz-hydrogen",
    name: "Gulf of Cádiz Hydrogen",
    isSample: true,
    technology: "hydrogen",
    subType: "PEM electrolyser",
    capacityMW: 100,
    hydrogenTonnesPerYear: 15000,
    country: "ES",
    region: "Europe",
    admin1: "Andalusia",
    lat: 37.2,
    lng: -6.9,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Siravo Energy",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Siravo Energy",
        role: "sponsor",
        stakePct: 80
      },
      {
        name: "Ostrel Infrastructure Partners",
        role: "co-investor",
        stakePct: 20
      }
    ],
    epc: [
      {
        name: "Takemi Construction",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 20
    },
    financing: {
      financialClose: {
        date: "2026-10-21",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 192000000,
        currency: "EUR",
        usd: 207000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Pan-Regional Development Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Siravo Energy"
        },
        {
          name: "Ostrel Infrastructure Partners"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2021-12-01",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-12-10",
        confidence: "confirmed"
      },
      construction: {
        date: "2025-05-12",
        confidence: "confirmed"
      },
      cod: {
        date: "2027-02-13",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 100 MW PEM electrolyser project in Andalusia, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Gulf of Cádiz Hydrogen",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-09-05",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-052",
    slug: "rotterdam-delta-electrolyser",
    name: "Rotterdam Delta Electrolyser",
    isSample: true,
    technology: "hydrogen",
    subType: "PEM electrolyser",
    capacityMW: 200,
    hydrogenTonnesPerYear: 30000,
    country: "NL",
    region: "Europe",
    admin1: "South Holland",
    lat: 51.95,
    lng: 4.05,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Ardent Basin Developments",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Ardent Basin Developments",
        role: "sponsor",
        stakePct: 80
      },
      {
        name: "Aurovale Investments",
        role: "co-investor",
        stakePct: 20
      }
    ],
    epc: [
      {
        name: "Ferrocasa EPC",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 20
    },
    financing: {
      financialClose: {
        date: "2024-07-01",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 334000000,
        currency: "EUR",
        usd: 361000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Marlow Commercial Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Ardent Basin Developments"
        },
        {
          name: "Aurovale Investments"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2021-02-02",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-11-10",
        confidence: "confirmed"
      },
      construction: {
        date: "2025-11-05",
        confidence: "confirmed"
      },
      cod: {
        date: "2027-04-09",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 200 MW PEM electrolyser project in South Holland, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Rotterdam Delta Electrolyser",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-07",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-053",
    slug: "namib-coast-hydrogen",
    name: "Namib Coast Hydrogen",
    isSample: true,
    technology: "hydrogen",
    subType: "alkaline electrolyser",
    capacityMW: 300,
    hydrogenTonnesPerYear: 40000,
    country: "NA",
    region: "Southern Africa",
    admin1: "ǁKaras",
    lat: -26.6,
    lng: 15.2,
    status: "announced",
    ownership: "ppp",
    developer: [
      {
        name: "Kestrava Renewables",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Kestrava Renewables",
        role: "sponsor",
        stakePct: 51
      },
      {
        name: "Harrowgate Grid Capital",
        role: "co-investor",
        stakePct: 49
      }
    ],
    dates: {
      announced: {
        date: "2026-11-08",
        confidence: "confirmed"
      },
      cod: {
        date: "2031-04-24",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 300 MW alkaline electrolyser project in ǁKaras, currently announced. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Namib Coast Hydrogen",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-08",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-054",
    slug: "ribeir-o-cane-bioenergy",
    name: "Ribeirão Cane Bioenergy",
    isSample: true,
    technology: "bioenergy",
    subType: "bagasse cogeneration",
    capacityMW: 120,
    country: "BR",
    region: "South America",
    admin1: "São Paulo",
    lat: -21.2,
    lng: -48.5,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Corvane Power",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Corvane Power",
        role: "sponsor",
        stakePct: 80
      },
      {
        name: "Tessaline Pension Trust",
        role: "co-investor",
        stakePct: 20
      }
    ],
    epc: [
      {
        name: "Ondulo Marine Contractors",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Steadfast O&M Services",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 20
    },
    financing: {
      financialClose: {
        date: "2013-05-24",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 1689000000,
        currency: "BRL",
        usd: 304000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Heliot Green Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Corvane Power"
        },
        {
          name: "Tessaline Pension Trust"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2010-11-28",
        confidence: "confirmed"
      },
      permits: {
        date: "2012-05-16",
        confidence: "confirmed"
      },
      construction: {
        date: "2014-01-18",
        confidence: "confirmed"
      },
      cod: {
        date: "2016-03-06",
        confidence: "confirmed"
      },
      decommission: {
        date: "2041-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 120 MW bagasse cogeneration project in São Paulo, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Ribeirão Cane Bioenergy",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-05",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-055",
    slug: "karelia-forest-biomass-chp",
    name: "Karelia Forest Biomass CHP",
    isSample: true,
    technology: "bioenergy",
    subType: "biomass CHP",
    capacityMW: 60,
    country: "FI",
    region: "Europe",
    admin1: "North Karelia",
    lat: 62.6,
    lng: 29.8,
    status: "operating",
    ownership: "public",
    developer: [
      {
        name: "Mazuri Energy Partners",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "State energy agency (sample)",
        role: "owner",
        stakePct: 100
      }
    ],
    epc: [
      {
        name: "Granwell Engineering",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Kinora Asset Management",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "National grid utility (sample)",
      type: "FiT",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2014-04-17",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 130000000,
        currency: "EUR",
        usd: 140000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Cendra Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "State energy agency (sample)"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2011-07-21",
        confidence: "confirmed"
      },
      permits: {
        date: "2013-04-10",
        confidence: "confirmed"
      },
      construction: {
        date: "2015-08-18",
        confidence: "confirmed"
      },
      cod: {
        date: "2017-11-13",
        confidence: "confirmed"
      },
      decommission: {
        date: "2042-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 60 MW biomass CHP project in North Karelia, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Karelia Forest Biomass CHP",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-09",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-056",
    slug: "chao-phraya-biogas-cluster",
    name: "Chao Phraya Biogas Cluster",
    isSample: true,
    technology: "bioenergy",
    subType: "biogas",
    capacityMW: 50,
    country: "TH",
    region: "Southeast Asia",
    admin1: "Ayutthaya",
    lat: 14.0,
    lng: 100.5,
    status: "operating",
    ownership: "community",
    developer: [
      {
        name: "Orrin Hydrogen",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Ayutthaya Energy Co-operative (sample)",
        role: "community owner",
        stakePct: 60
      },
      {
        name: "Orrin Hydrogen",
        role: "sponsor",
        stakePct: 40
      }
    ],
    epc: [
      {
        name: "Takemi Construction",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Revell Operations",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "FiT",
      tenorYears: 20
    },
    financing: {
      financialClose: {
        date: "2017-09-03",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 4286000000,
        currency: "THB",
        usd: 120000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Pan-Regional Development Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Ayutthaya Energy Co-operative (sample)"
        },
        {
          name: "Orrin Hydrogen"
        }
      ],
      instruments: [
        "senior debt",
        "DFI loan",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2014-04-15",
        confidence: "confirmed"
      },
      permits: {
        date: "2016-06-25",
        confidence: "confirmed"
      },
      construction: {
        date: "2018-08-14",
        confidence: "confirmed"
      },
      cod: {
        date: "2020-03-18",
        confidence: "confirmed"
      },
      decommission: {
        date: "2045-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 50 MW biogas project in Ayutthaya, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Chao Phraya Biogas Cluster",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-05",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-057",
    slug: "northeast-england-biomass",
    name: "Northeast England Biomass",
    isSample: true,
    technology: "bioenergy",
    subType: "biomass power",
    capacityMW: 40,
    country: "GB",
    region: "Europe",
    admin1: "North Yorkshire",
    lat: 54.6,
    lng: -1.2,
    status: "construction",
    ownership: "private",
    developer: [
      {
        name: "Brevant Storage",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Brevant Storage",
        role: "sponsor",
        stakePct: 60
      },
      {
        name: "Cendra Capital",
        role: "co-investor",
        stakePct: 40
      }
    ],
    epc: [
      {
        name: "Ferrocasa EPC",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "PPA",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2024-08-09",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 79000000,
        currency: "GBP",
        usd: 100000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Marlow Commercial Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Brevant Storage"
        },
        {
          name: "Cendra Capital"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2021-10-07",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-01-24",
        confidence: "confirmed"
      },
      construction: {
        date: "2026-10-18",
        confidence: "confirmed"
      },
      cod: {
        date: "2027-07-24",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 40 MW biomass power project in North Yorkshire, currently construction. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Northeast England Biomass",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-18",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-058",
    slug: "ashanti-cocoa-husk-power",
    name: "Ashanti Cocoa-Husk Power",
    isSample: true,
    technology: "bioenergy",
    subType: "agricultural residue",
    capacityMW: 25,
    country: "GH",
    region: "West Africa",
    admin1: "Ashanti",
    lat: 6.7,
    lng: -1.6,
    status: "announced",
    ownership: "community",
    developer: [
      {
        name: "Kaliko Geothermal",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Ashanti Energy Co-operative (sample)",
        role: "community owner",
        stakePct: 60
      },
      {
        name: "Kaliko Geothermal",
        role: "sponsor",
        stakePct: 40
      }
    ],
    dates: {
      announced: {
        date: "2026-10-16",
        confidence: "confirmed"
      },
      cod: {
        date: "2029-09-21",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 25 MW agricultural residue project in Ashanti, currently announced. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Ashanti Cocoa-Husk Power",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-10-16",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-059",
    slug: "orkney-channel-tidal-array",
    name: "Orkney Channel Tidal Array",
    isSample: true,
    technology: "marine",
    subType: "tidal stream",
    capacityMW: 20,
    country: "GB",
    region: "Europe",
    admin1: "Scotland",
    lat: 58.68,
    lng: -3.1,
    status: "operating",
    ownership: "private",
    developer: [
      {
        name: "Pelagic Tide Co.",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Pelagic Tide Co.",
        role: "sponsor",
        stakePct: 80
      },
      {
        name: "Ostrel Infrastructure Partners",
        role: "co-investor",
        stakePct: 20
      }
    ],
    epc: [
      {
        name: "Ondulo Marine Contractors",
        role: "EPC contractor"
      }
    ],
    om: [
      {
        name: "Revell Operations",
        role: "O&M provider"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "FiT",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2015-02-13",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 108000000,
        currency: "GBP",
        usd: 137000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Heliot Green Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Pelagic Tide Co."
        },
        {
          name: "Ostrel Infrastructure Partners"
        }
      ],
      instruments: [
        "senior debt"
      ]
    },
    dates: {
      announced: {
        date: "2012-11-15",
        confidence: "confirmed"
      },
      permits: {
        date: "2014-07-10",
        confidence: "confirmed"
      },
      construction: {
        date: "2016-01-05",
        confidence: "confirmed"
      },
      cod: {
        date: "2018-01-14",
        confidence: "confirmed"
      },
      decommission: {
        date: "2043-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 20 MW tidal stream project in Scotland, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Orkney Channel Tidal Array",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-08",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-060",
    slug: "channel-race-tidal",
    name: "Channel Race Tidal",
    isSample: true,
    technology: "marine",
    subType: "tidal stream",
    capacityMW: 12,
    country: "FR",
    region: "Europe",
    admin1: "Normandy",
    lat: 49.7,
    lng: -1.95,
    status: "operating",
    ownership: "mixed",
    developer: [
      {
        name: "Velmora Energy",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Velmora Energy",
        role: "sponsor",
        stakePct: 51
      },
      {
        name: "Aurovale Investments",
        role: "co-investor",
        stakePct: 49
      }
    ],
    epc: [
      {
        name: "Granwell Engineering",
        role: "EPC contractor"
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "FiT",
      tenorYears: 15
    },
    financing: {
      financialClose: {
        date: "2024-09-25",
        confidence: "confirmed"
      },
      totalCapex: {
        amount: 76000000,
        currency: "EUR",
        usd: 82000000,
        fxDate: "2026-10-31"
      },
      debt: [
        {
          name: "Cendra Bank",
          role: "senior lender"
        }
      ],
      equity: [
        {
          name: "Velmora Energy"
        },
        {
          name: "Aurovale Investments"
        }
      ],
      instruments: [
        "senior debt",
        "green bond"
      ]
    },
    dates: {
      announced: {
        date: "2021-08-08",
        confidence: "confirmed"
      },
      permits: {
        date: "2023-02-08",
        confidence: "confirmed"
      },
      construction: {
        date: "2025-03-05",
        confidence: "confirmed"
      },
      cod: {
        date: "2026-11-04",
        confidence: "confirmed"
      },
      decommission: {
        date: "2051-12-31",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 12 MW tidal stream project in Normandy, currently operating. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Channel Race Tidal",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-04",
    dataVersion: "2026.11.0",
    om: [
      {
        name: "Kinora Asset Management",
        role: "O&M provider"
      }
    ]
  },
  {
    id: "prj-061",
    slug: "fundy-narrows-tidal",
    name: "Fundy Narrows Tidal",
    isSample: true,
    technology: "marine",
    subType: "tidal stream",
    capacityMW: 9,
    country: "CA",
    region: "North America",
    admin1: "Nova Scotia",
    lat: 45.3,
    lng: -64.4,
    status: "permitting",
    ownership: "private",
    developer: [
      {
        name: "Tanaro Renewables",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "Tanaro Renewables",
        role: "sponsor",
        stakePct: 80
      },
      {
        name: "Harrowgate Grid Capital",
        role: "co-investor",
        stakePct: 20
      }
    ],
    offtake: {
      offtaker: "Regional utility (sample)",
      type: "CfD",
      tenorYears: 20
    },
    dates: {
      announced: {
        date: "2023-10-02",
        confidence: "confirmed"
      },
      permits: {
        date: "2025-11-23",
        confidence: "estimated"
      },
      construction: {
        date: "2027-05-05",
        confidence: "estimated"
      },
      cod: {
        date: "2029-11-09",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 9 MW tidal stream project in Nova Scotia, currently permitting. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Fundy Narrows Tidal",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-04",
    dataVersion: "2026.11.0"
  },
  {
    id: "prj-062",
    slug: "southwest-coast-tidal",
    name: "Southwest Coast Tidal",
    isSample: true,
    technology: "marine",
    subType: "tidal stream",
    capacityMW: 30,
    country: "KR",
    region: "East Asia",
    admin1: "South Jeolla",
    lat: 34.4,
    lng: 126.2,
    status: "announced",
    ownership: "public",
    developer: [
      {
        name: "Quillon Power",
        role: "lead developer"
      }
    ],
    owners: [
      {
        name: "State energy agency (sample)",
        role: "owner",
        stakePct: 100
      }
    ],
    offtake: {
      offtaker: "National grid utility (sample)",
      type: "FiT",
      tenorYears: 20
    },
    dates: {
      announced: {
        date: "2026-11-06",
        confidence: "confirmed"
      },
      cod: {
        date: "2030-04-26",
        confidence: "estimated"
      }
    },
    designLifeYears: 25,
    description: "Sample record. A 30 MW tidal stream project in South Jeolla, currently announced. Facts on this page are illustrative and do not describe a real project.",
    sources: [
      {
        publisher: "Perpetual sample data",
        title: "Illustrative record for Southwest Coast Tidal",
        url: "#sample",
        retrievedAt: "2026-11-01"
      }
    ],
    lastUpdated: "2026-11-06",
    dataVersion: "2026.11.0"
  }
];
