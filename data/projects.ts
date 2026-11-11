// Project records written from the press releases behind our hand-written deals.
// Every record cites its release. Map positions come from OpenStreetMap (Nominatim) place names given in the release.
import type { Project } from "@/lib/types";

export const projects: Project[] = [
 {
  "id": "prj-001",
  "slug": "baixas-bess",
  "name": "Baixas BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "capacityMW": 100,
  "storageMWh": 400,
  "country": "FR",
  "region": "Europe",
  "admin1": "Pyrénées-Orientales",
  "lat": 42.7498,
  "lng": 2.8092,
  "status": "permitting",
  "ownership": "private",
  "developer": [
   {
    "name": "Recurrent Energy"
   }
  ],
  "owners": [
   {
    "name": "BW ESS",
    "stakePct": 100
   }
  ],
  "dates": {},
  "description": "Standalone four-hour battery with a transmission-level grid connection position. Recurrent Energy leads the rest of development before BW ESS takes over construction and operation.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Recurrent Energy Completes Sale of Two 100 MW / 400 MWh BESS Projects in France to BW ESS",
    "url": "https://www.prnewswire.com/news-releases/recurrent-energy-completes-sale-of-two-100-mw--400-mwh-bess-projects-in-france-to-bw-ess-302920922.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-002",
  "slug": "coquainvilliers-bess",
  "name": "Coquainvilliers BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "capacityMW": 100,
  "storageMWh": 400,
  "country": "FR",
  "region": "Europe",
  "admin1": "Calvados",
  "lat": 49.1976,
  "lng": 0.2097,
  "status": "permitting",
  "ownership": "private",
  "developer": [
   {
    "name": "Recurrent Energy"
   }
  ],
  "owners": [
   {
    "name": "BW ESS",
    "stakePct": 100
   }
  ],
  "dates": {},
  "description": "Standalone four-hour battery in Normandy, sold with Baixas as BW ESS's first French projects.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Recurrent Energy Completes Sale of Two 100 MW / 400 MWh BESS Projects in France to BW ESS",
    "url": "https://www.prnewswire.com/news-releases/recurrent-energy-completes-sale-of-two-100-mw--400-mwh-bess-projects-in-france-to-bw-ess-302920922.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-003",
  "slug": "big-muddy-solar",
  "name": "Big Muddy Solar",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 124,
  "capacityBasis": "DC",
  "country": "US",
  "region": "North America",
  "admin1": "Illinois",
  "lat": 37.7669,
  "lng": -89.3564,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Arevon Energy"
   }
  ],
  "owners": [
   {
    "name": "Arevon Energy",
    "stakePct": 100
   }
  ],
  "financing": {
   "debt": [
    {
     "name": "Wells Fargo",
     "role": "Tax equity"
    }
   ],
   "instruments": [
    "Tax equity",
    "Construction debt"
   ]
  },
  "dates": {
   "construction": {
    "date": "2025-06-30",
    "confidence": "confirmed"
   },
   "cod": {
    "date": "2026-12-31",
    "confidence": "estimated"
   }
  },
  "description": "Arevon's first utility-scale project in Illinois, financed with a US$183 million debt package and US$120 million of tax equity from Wells Fargo.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Arevon Closes on $120 Million Tax Equity Commitment with Wells Fargo for its Big Muddy Solar Project in Illinois",
    "url": "https://www.prnewswire.com/news-releases/arevon-closes-on-120-million-tax-equity-commitment-with-wells-fargo-for-its-big-muddy-solar-project-in-illinois-302919590.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-004",
  "slug": "five-estuaries-offshore-wind-farm",
  "name": "Five Estuaries Offshore Wind Farm",
  "isSample": false,
  "technology": "wind",
  "subType": "offshore",
  "capacityMW": 1080,
  "country": "GB",
  "region": "Europe",
  "admin1": "North Sea, off Essex and Suffolk (approximate)",
  "lat": 51.9446,
  "lng": 1.2899,
  "status": "financing",
  "ownership": "private",
  "owners": [
   {
    "name": "EDF power solutions",
    "stakePct": 33.33
   },
   {
    "name": "Copenhagen Infrastructure Partners",
    "stakePct": 25
   },
   {
    "name": "ESB",
    "stakePct": 20.83
   },
   {
    "name": "Sumitomo Corporation",
    "stakePct": 20.83
   }
  ],
  "dates": {},
  "description": "Up to 1,080 MW about 40 km off the north Essex and south Suffolk coast. Development consent granted in December 2025. Map position is the nearest coastal town.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Copenhagen Infrastructure Partners acquires 25% stake in Five Estuaries Offshore Wind Farm",
    "url": "https://www.prnewswire.com/news-releases/copenhagen-infrastructure-partners-acquires-25-stake-in-five-estuaries-offshore-wind-farm-302906693.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-005",
  "slug": "kilmarnock-south-bess",
  "name": "Kilmarnock South BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "capacityMW": 350,
  "storageMWh": 1400,
  "country": "GB",
  "region": "Europe",
  "admin1": "South Ayrshire",
  "lat": 55.6101,
  "lng": -4.4965,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Noriker Power"
   }
  ],
  "owners": [
   {
    "name": "Copenhagen Infrastructure Partners",
    "stakePct": 100
   }
  ],
  "offtake": {
   "offtaker": "Shell Energy Europe (optimisation agreement)"
  },
  "dates": {
   "construction": {
    "date": "2026-10-02",
    "confidence": "confirmed"
   },
   "cod": {
    "date": "2028-03-31",
    "confidence": "estimated"
   }
  },
  "description": "Four-hour lithium-ion battery storing surplus Scottish wind power, the longest-duration asset in CIP's UK fleet.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Copenhagen Infrastructure Partners announces EUR 270 million investment in new Scottish battery storage project",
    "url": "https://www.prnewswire.com/news-releases/copenhagen-infrastructure-partners-announces-eur-270-million-investment-in-new-scottish-battery-storage-project-302897097.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-006",
  "slug": "mesa-view-bess",
  "name": "Mesa View BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "capacityMW": 250,
  "storageMWh": 500,
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 31.372,
  "lng": -102.0386,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Linea Energy"
   }
  ],
  "owners": [
   {
    "name": "Linea Energy"
   }
  ],
  "financing": {
   "financialClose": {
    "date": "2026-10-01",
    "confidence": "confirmed"
   },
   "debt": [
    {
     "name": "NORD/LB",
     "role": "Coordinating lead arranger"
    },
    {
     "name": "Texas Capital",
     "role": "Lender"
    }
   ],
   "equity": [
    {
     "name": "D.E. Shaw Renewable Investments",
     "role": "Preferred equity"
    }
   ],
   "instruments": [
    "Construction-to-term loan",
    "Tax equity bridge loan",
    "Letter of credit"
   ]
  },
  "dates": {
   "cod": {
    "date": "2027-12-31",
    "confidence": "estimated"
   }
  },
  "description": "Two-hour standalone battery selling into the ERCOT market.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Linea Energy Closes Project Debt Financing and Preferred Equity Commitment for 250 MW / 500 MWh Mesa View BESS in Texas",
    "url": "https://www.prnewswire.com/news-releases/linea-energy-closes-project-debt-financing-and-preferred-equity-commitment-for-250-mw--500-mwh-mesa-view-bess-in-texas-302896689.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-007",
  "slug": "kafue-solar",
  "name": "Kafue Solar",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 40,
  "capacityBasis": "AC",
  "country": "ZM",
  "region": "Africa",
  "admin1": "Lusaka Province",
  "lat": -14.3735,
  "lng": 27.1952,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Globeleq"
   }
  ],
  "owners": [
   {
    "name": "Globeleq",
    "stakePct": 100
   }
  ],
  "offtake": {
   "offtaker": "ZESCO",
   "type": "FiT",
   "tenorYears": 25
  },
  "financing": {
   "financialClose": {
    "date": "2026-10-01",
    "confidence": "confirmed"
   },
   "debt": [
    {
     "name": "FMO",
     "role": "Lender"
    },
    {
     "name": "British International Investment",
     "role": "Lender"
    }
   ],
   "instruments": [
    "Senior debt",
    "Grant (Norad)"
   ]
  },
  "dates": {},
  "description": "40 MWac (56 MWp) plant awarded through the GET FiT Zambia programme, Globeleq's first greenfield project in Zambia.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "GLOBELEQ REACHES FINANCIAL CLOSE ON 40MWac KAFUE SOLAR IN ZAMBIA",
    "url": "https://www.prnewswire.com/news-releases/globeleq-reaches-financial-close-on-40mwac-kafue-solar-in-zambia-302895876.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-008",
  "slug": "stip-wind-farm-phase-one",
  "name": "Štip Wind Farm (phase one)",
  "isSample": false,
  "technology": "wind",
  "subType": "onshore",
  "capacityMW": 131.25,
  "country": "MK",
  "region": "Europe",
  "admin1": "Štip",
  "lat": 41.7375,
  "lng": 22.1936,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Alcazar Energy Partners"
   }
  ],
  "owners": [
   {
    "name": "Alcazar Energy Partners"
   }
  ],
  "offtake": {
   "offtaker": "International investment-grade corporation",
   "type": "corporate PPA"
  },
  "financing": {
   "financialClose": {
    "date": "2026-09-23",
    "confidence": "confirmed"
   }
  },
  "dates": {},
  "description": "First phase of a project planned at up to 396 MW, using 21 Envision 6.25 MW turbines. North Macedonia's largest wind project.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Envision Energy Advances Southeastern Europe's Wind Market as North Macedonia's Largest Wind Project Reaches Financial Close",
    "url": "https://www.prnewswire.com/news-releases/envision-energy-advances-southeastern-europes-wind-market-as-north-macedonias-largest-wind-project-reaches-financial-close-302887442.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-009",
  "slug": "cobalt-solar",
  "name": "Cobalt Solar",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 330,
  "country": "US",
  "region": "North America",
  "admin1": "Riverside County, California",
  "lat": 33.6135,
  "lng": -114.5938,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Recurrent Energy"
   }
  ],
  "owners": [
   {
    "name": "Recurrent Energy",
    "stakePct": 100
   }
  ],
  "financing": {
   "financialClose": {
    "date": "2026-08-13",
    "confidence": "confirmed"
   },
   "debt": [
    {
     "name": "MUFG",
     "role": "Lead lender"
    },
    {
     "name": "NORD/LB",
     "role": "Lead lender"
    },
    {
     "name": "Wells Fargo",
     "role": "Tax equity"
    }
   ],
   "instruments": [
    "Construction and term loans",
    "Tax equity"
   ]
  },
  "dates": {
   "cod": {
    "date": "2027-12-31",
    "confidence": "estimated"
   }
  },
  "description": "Fully permitted project about 20 miles west of Blythe, built by Blattner Energy.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Recurrent Energy Secures $695 Million in Project Financing for 330 MW California Solar Project",
    "url": "https://www.prnewswire.com/news-releases/recurrent-energy-secures-695-million-in-project-financing-for-330-mw-california-solar-project-302849434.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-010",
  "slug": "jaalan-bani-bu-ali-wind-ipp",
  "name": "Jaalan Bani Bu Ali Wind IPP",
  "isSample": false,
  "technology": "wind",
  "subType": "onshore",
  "capacityMW": 120,
  "country": "OM",
  "region": "Middle East",
  "admin1": "South Al Sharqiyah",
  "lat": 22.0609,
  "lng": 59.3002,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "EDF power solutions"
   },
   {
    "name": "Al Khadra Partners"
   },
   {
    "name": "OQ Alternative Energy"
   }
  ],
  "owners": [
   {
    "name": "EDF power solutions"
   },
   {
    "name": "Al Khadra Partners"
   },
   {
    "name": "OQ Alternative Energy"
   }
  ],
  "offtake": {
   "offtaker": "Nama Power and Water Procurement Company",
   "type": "PPA",
   "tenorYears": 20
  },
  "financing": {
   "financialClose": {
    "date": "2026-08-11",
    "confidence": "confirmed"
   }
  },
  "dates": {
   "cod": {
    "date": "2027-09-30",
    "confidence": "estimated"
   }
  },
  "description": "16 turbines of 7.7 MW, one of Oman's largest onshore wind farms.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "EDF power solutions, Al Khadra Partners and OQAE reach Financial Close on the 120 MW JBB Wind Project in the Sultanate of Oman",
    "url": "https://www.prnewswire.com/news-releases/edf-power-solutions-al-khadra-partners-and-oqae-reach-financial-close-on-the-120-mw-jbb-wind-project-in-the-sultanate-of-oman-302848110.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-011",
  "slug": "crooked-creek-solar",
  "name": "Crooked Creek Solar",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 155,
  "capacityBasis": "AC",
  "country": "US",
  "region": "North America",
  "admin1": "Oklahoma",
  "lat": 34.145,
  "lng": -94.7802,
  "status": "announced",
  "ownership": "private",
  "developer": [
   {
    "name": "RWE"
   }
  ],
  "owners": [
   {
    "name": "RWE",
    "stakePct": 100
   }
  ],
  "offtake": {
   "offtaker": "Google",
   "type": "corporate PPA",
   "tenorYears": 15
  },
  "dates": {
   "cod": {
    "date": "2028-12-31",
    "confidence": "estimated"
   }
  },
  "description": "RWE's first solar project in Oklahoma, with all output sold to Google.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "RWE and Google sign power purchase agreement for Oklahoma solar project",
    "url": "https://www.prnewswire.com/news-releases/rwe-and-google-sign-power-purchase-agreement-for-oklahoma-solar-project-302841226.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-012",
  "slug": "rabbit-s-foot-solar",
  "name": "Rabbit's Foot Solar",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 298,
  "capacityBasis": "AC",
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 33.4199,
  "lng": -94.448,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "RWE"
   }
  ],
  "owners": [
   {
    "name": "RWE",
    "stakePct": 100
   }
  ],
  "offtake": {
   "offtaker": "Meta",
   "type": "corporate PPA"
  },
  "dates": {
   "construction": {
    "date": "2026-03-31",
    "confidence": "confirmed"
   },
   "cod": {
    "date": "2027-12-31",
    "confidence": "estimated"
   }
  },
  "description": "RWE's fourth project contracted with Meta since 2024.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Meta expands partnership with RWE through a long-term corporate PPA for Rabbit's Foot Solar in North Texas",
    "url": "https://www.prnewswire.com/news-releases/meta-expands-partnership-with-rwe-through-a-long-term-corporate-ppa-for-rabbits-foot-solar-in-north-texas-302798053.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-013",
  "slug": "cambria-wind-farm",
  "name": "Cambria Wind Farm",
  "isSample": false,
  "technology": "wind",
  "subType": "onshore repowering",
  "capacityMW": 61.6,
  "country": "US",
  "region": "North America",
  "admin1": "Cambria County, Pennsylvania",
  "lat": 40.3025,
  "lng": -78.7468,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Exus Renewables North America"
   }
  ],
  "owners": [
   {
    "name": "Exus Renewables North America",
    "stakePct": 100
   }
  ],
  "financing": {
   "financialClose": {
    "date": "2026-07-20",
    "confidence": "confirmed"
   },
   "debt": [
    {
     "name": "KeyBanc Capital Markets",
     "role": "Coordinating lead arranger"
    }
   ],
   "instruments": [
    "Construction financing"
   ]
  },
  "dates": {
   "cod": {
    "date": "2026-11-30",
    "confidence": "estimated"
   }
  },
  "description": "Repowered wind farm using Vestas turbines.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Exus Renewables North America Closes $356M Construction Financing for Two Pennsylvania Wind Projects",
    "url": "https://www.prnewswire.com/news-releases/exus-renewables-north-america-closes-356m-construction-financing-for-two-pennsylvania-wind-projects-302828905.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-014",
  "slug": "highland-north-wind-farm",
  "name": "Highland North Wind Farm",
  "isSample": false,
  "technology": "wind",
  "subType": "onshore repowering",
  "capacityMW": 75,
  "country": "US",
  "region": "North America",
  "admin1": "Cambria County, Pennsylvania",
  "lat": 40.4844,
  "lng": -78.7189,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Exus Renewables North America"
   }
  ],
  "owners": [
   {
    "name": "Exus Renewables North America",
    "stakePct": 100
   }
  ],
  "financing": {
   "financialClose": {
    "date": "2026-07-20",
    "confidence": "confirmed"
   },
   "debt": [
    {
     "name": "KeyBanc Capital Markets",
     "role": "Coordinating lead arranger"
    }
   ],
   "instruments": [
    "Construction financing"
   ]
  },
  "dates": {},
  "description": "Repowered wind farm using Vestas turbines, financed with Cambria.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Exus Renewables North America Closes $356M Construction Financing for Two Pennsylvania Wind Projects",
    "url": "https://www.prnewswire.com/news-releases/exus-renewables-north-america-closes-356m-construction-financing-for-two-pennsylvania-wind-projects-302828905.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-015",
  "slug": "watertown-solar",
  "name": "Watertown Solar",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 172,
  "capacityBasis": "DC",
  "country": "US",
  "region": "North America",
  "admin1": "Michigan",
  "lat": 43.4151,
  "lng": -82.8235,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Linea Energy"
   }
  ],
  "owners": [
   {
    "name": "Linea Energy"
   }
  ],
  "offtake": {
   "offtaker": "Consumers Energy",
   "type": "PPA",
   "tenorYears": 25
  },
  "financing": {
   "debt": [
    {
     "name": "Santander",
     "role": "Lead lender"
    },
    {
     "name": "Société Générale",
     "role": "Lender"
    },
    {
     "name": "NORD/LB",
     "role": "Lender"
    },
    {
     "name": "Truist Bank",
     "role": "Lender"
    }
   ],
   "equity": [
    {
     "name": "Crux",
     "role": "Tax equity"
    }
   ],
   "instruments": [
    "Construction-to-term loan",
    "Tax equity"
   ]
  },
  "dates": {},
  "description": "Total capital raise of US$457 million.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Linea Energy and Crux Close Tax Equity Financing for 172 MWdc Michigan Solar Project",
    "url": "https://www.prnewswire.com/news-releases/linea-energy-and-crux-close-tax-equity-financing-for-172-mwdc-michigan-solar-project-302818739.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-016",
  "slug": "alamo-city-bess",
  "name": "Alamo City BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "capacityMW": 120,
  "storageMWh": 480,
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 29.4264,
  "lng": -98.5105,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "OCI Energy"
   }
  ],
  "owners": [
   {
    "name": "OCI Energy"
   }
  ],
  "offtake": {
   "offtaker": "CPS Energy (storage capacity agreement)"
  },
  "financing": {
   "equity": [
    {
     "name": "Greenprint Capital",
     "role": "Tax equity"
    }
   ],
   "instruments": [
    "Construction financing",
    "Tax equity"
   ]
  },
  "dates": {
   "construction": {
    "date": "2026-05-31",
    "confidence": "confirmed"
   }
  },
  "description": "Four-hour battery near San Antonio.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "OCI Energy closes $130 million tax equity financing with Greenprint Capital for San Antonio-area battery project",
    "url": "https://www.prnewswire.com/news-releases/oci-energy-closes-130-million-tax-equity-financing-with-greenprint-capital-for-san-antonio-area-battery-project-302806665.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-017",
  "slug": "nazareth-solar",
  "name": "Nazareth Solar",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 201,
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 34.4723,
  "lng": -101.712,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Vesper Energy"
   }
  ],
  "owners": [
   {
    "name": "Vesper Energy"
   }
  ],
  "financing": {
   "financialClose": {
    "date": "2026-06-01",
    "confidence": "confirmed"
   },
   "debt": [
    {
     "name": "MUFG",
     "role": "Sole coordinating lead arranger"
    },
    {
     "name": "Associated Bank",
     "role": "Joint lead arranger"
    },
    {
     "name": "BayernLB",
     "role": "Joint lead arranger"
    }
   ],
   "instruments": [
    "Construction-to-term loan",
    "Letter of credit"
   ]
  },
  "dates": {},
  "description": "Spans more than 2,400 acres next to Vesper's 600 MW Hornet Solar.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Vesper Energy Closes $236 Million Financing for 201 MW Nazareth Solar",
    "url": "https://www.prnewswire.com/news-releases/vesper-energy-closes-236-million-financing-for-201-mw-nazareth-solar-302787087.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-018",
  "slug": "frontier-solar",
  "name": "Frontier Solar",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 120,
  "country": "US",
  "region": "North America",
  "admin1": "Washington and Marion counties, Kentucky",
  "lat": 37.7311,
  "lng": -85.175,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "BrightNight"
   }
  ],
  "owners": [
   {
    "name": "BrightNight"
   }
  ],
  "offtake": {
   "offtaker": "Louisville Gas and Electric and Kentucky Utilities (build-transfer)"
  },
  "financing": {
   "financialClose": {
    "date": "2026-05-26",
    "confidence": "confirmed"
   },
   "debt": [
    {
     "name": "ING Capital",
     "role": "Lender"
    },
    {
     "name": "Natixis",
     "role": "Lender"
    },
    {
     "name": "HSBC",
     "role": "Lender"
    }
   ]
  },
  "dates": {
   "cod": {
    "date": "2027-11-30",
    "confidence": "estimated"
   }
  },
  "description": "Built by BrightNight and transferred to the utilities on completion.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "BrightNight Announces Financial Close for Frontier, a 120 MW Solar Project Delivering Clean Power to Kentucky",
    "url": "https://www.prnewswire.com/news-releases/brightnight-announces-financial-close-for-frontier-a-120-mw-solar-project-delivering-clean-power-to-kentucky-302782086.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-019",
  "slug": "jk1-and-jk2-wind-projects",
  "name": "JK1 and JK2 Wind Projects",
  "isSample": false,
  "technology": "wind",
  "subType": "onshore",
  "capacityMW": 259,
  "country": "CO",
  "region": "South America",
  "admin1": "La Guajira",
  "lat": 11.4354,
  "lng": -72.9002,
  "status": "permitting",
  "ownership": "private",
  "developer": [
   {
    "name": "AES Colombia"
   }
  ],
  "owners": [
   {
    "name": "AES Colombia",
    "stakePct": 51
   },
   {
    "name": "Ecopetrol",
    "stakePct": 49
   }
  ],
  "offtake": {
   "offtaker": "Ecopetrol Group (own use)"
  },
  "dates": {},
  "description": "Two of six projects in the Jemeiwaa Ka'I wind cluster, with a 35 km transmission line. Expected to produce about 1,100 GWh a year.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Ecopetrol advances acquisition of the Jemeiwaa Ka'I wind cluster in La Guajira with the purchase of a 49% interest in the JK1 and JK2 wind projects",
    "url": "https://www.prnewswire.com/news-releases/ecopetrol-advances-acquisition-of-the-jemeiwaa-kai-wind-cluster-in-la-guajira-with-the-purchase-of-a-49-interest-in-the-jk1-and-jk2-wind-projects-302777666.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-020",
  "slug": "northfield-mountain",
  "name": "Northfield Mountain",
  "isSample": false,
  "technology": "storage",
  "subType": "pumped hydro",
  "capacityMW": 1168,
  "country": "US",
  "region": "North America",
  "admin1": "Massachusetts",
  "lat": 42.6945,
  "lng": -72.456,
  "status": "operating",
  "ownership": "private",
  "owners": [
   {
    "name": "FirstLight USA",
    "stakePct": 100
   }
  ],
  "dates": {},
  "description": "The largest energy storage facility in New England. FirstLight's owner PSP Investments agreed in 2026 to sell FirstLight to Hull Street Energy.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Hull Street Energy to Acquire FirstLight's U.S. Generation Fleet, Scaling the Firm's Hydro Footprint",
    "url": "https://www.prnewswire.com/news-releases/hull-street-energy-to-acquire-firstlights-us-generation-fleet-scaling-the-firms-hydro-footprint-302776103.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-021",
  "slug": "eagle-springs-solar-storage",
  "name": "Eagle Springs Solar + Storage",
  "isSample": false,
  "technology": "solar",
  "subType": "solar plus storage",
  "capacityMW": 77,
  "capacityBasis": "AC",
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 33.3927,
  "lng": -95.6749,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Sunraycer Renewables"
   }
  ],
  "owners": [
   {
    "name": "Sunraycer Renewables"
   }
  ],
  "financing": {
   "financialClose": {
    "date": "2026-05-14",
    "confidence": "confirmed"
   },
   "instruments": [
    "Construction-to-term loan",
    "Tax credit bridge loan"
   ]
  },
  "dates": {
   "construction": {
    "date": "2025-12-31",
    "confidence": "confirmed"
   },
   "cod": {
    "date": "2026-12-31",
    "confidence": "estimated"
   }
  },
  "description": "77 MWac of solar with a 33 MWac two-hour battery.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Sunraycer Renewables Closes $901 Million Project Financing Facility with MUFG Bank, Ltd., Ally Bank, Nomura Securities International, Inc., Norddeutsche Landesbank Girozentrale, and Societe Generale",
    "url": "https://www.prnewswire.com/news-releases/sunraycer-renewables-closes-901-million-project-financing-facility-with-mufg-bank-ltd-ally-bank-nomura-securities-international-inc-norddeutsche-landesbank-girozentrale-and-societe-generale-302771800.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-022",
  "slug": "lupinus-1-solar-storage",
  "name": "Lupinus 1 Solar + Storage",
  "isSample": false,
  "technology": "solar",
  "subType": "solar plus storage",
  "capacityMW": 161.5,
  "capacityBasis": "AC",
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 33.2003,
  "lng": -95.2232,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Sunraycer Renewables"
   }
  ],
  "owners": [
   {
    "name": "Sunraycer Renewables"
   }
  ],
  "offtake": {
   "offtaker": "Google",
   "type": "corporate PPA"
  },
  "financing": {
   "financialClose": {
    "date": "2026-05-14",
    "confidence": "confirmed"
   },
   "instruments": [
    "Construction-to-term loan",
    "Tax credit bridge loan"
   ]
  },
  "dates": {
   "construction": {
    "date": "2025-12-31",
    "confidence": "confirmed"
   },
   "cod": {
    "date": "2027-12-31",
    "confidence": "estimated"
   }
  },
  "description": "161.5 MWac of solar with an 82 MWac two-hour battery.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Sunraycer Renewables Closes $901 Million Project Financing Facility with MUFG Bank, Ltd., Ally Bank, Nomura Securities International, Inc., Norddeutsche Landesbank Girozentrale, and Societe Generale",
    "url": "https://www.prnewswire.com/news-releases/sunraycer-renewables-closes-901-million-project-financing-facility-with-mufg-bank-ltd-ally-bank-nomura-securities-international-inc-norddeutsche-landesbank-girozentrale-and-societe-generale-302771800.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-023",
  "slug": "lupinus-2-solar-storage",
  "name": "Lupinus 2 Solar + Storage",
  "isSample": false,
  "technology": "solar",
  "subType": "solar plus storage",
  "capacityMW": 241,
  "capacityBasis": "AC",
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 33.2003,
  "lng": -95.2232,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Sunraycer Renewables"
   }
  ],
  "owners": [
   {
    "name": "Sunraycer Renewables"
   }
  ],
  "offtake": {
   "offtaker": "Google",
   "type": "corporate PPA"
  },
  "financing": {
   "financialClose": {
    "date": "2026-05-14",
    "confidence": "confirmed"
   },
   "instruments": [
    "Construction-to-term loan",
    "Tax credit bridge loan"
   ]
  },
  "dates": {
   "construction": {
    "date": "2025-12-31",
    "confidence": "confirmed"
   },
   "cod": {
    "date": "2027-12-31",
    "confidence": "estimated"
   }
  },
  "description": "241 MWac of solar with a 121.5 MWac two-hour battery.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Sunraycer Renewables Closes $901 Million Project Financing Facility with MUFG Bank, Ltd., Ally Bank, Nomura Securities International, Inc., Norddeutsche Landesbank Girozentrale, and Societe Generale",
    "url": "https://www.prnewswire.com/news-releases/sunraycer-renewables-closes-901-million-project-financing-facility-with-mufg-bank-ltd-ally-bank-nomura-securities-international-inc-norddeutsche-landesbank-girozentrale-and-societe-generale-302771800.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-024",
  "slug": "eccles-bess",
  "name": "Eccles BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "capacityMW": 500,
  "storageMWh": 1000,
  "country": "GB",
  "region": "Europe",
  "admin1": "Scottish Borders",
  "lat": 55.6905,
  "lng": -2.3356,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Matrix Renewables"
   }
  ],
  "owners": [
   {
    "name": "Matrix Renewables"
   }
  ],
  "offtake": {
   "offtaker": "EDF (partnership)"
  },
  "financing": {
   "financialClose": {
    "date": "2026-04-28",
    "confidence": "confirmed"
   },
   "debt": [
    {
     "name": "CIBC",
     "role": "Underwriter"
    },
    {
     "name": "MUFG",
     "role": "Underwriter"
    },
    {
     "name": "NatWest",
     "role": "Underwriter"
    }
   ],
   "instruments": [
    "Non-recourse project financing"
   ]
  },
  "dates": {
   "construction": {
    "date": "2025-11-30",
    "confidence": "confirmed"
   },
   "cod": {
    "date": "2027-09-30",
    "confidence": "estimated"
   }
  },
  "description": "Transmission-connected two-hour battery at Eccles-Leitholm.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "MATRIX RENEWABLES CLOSES £245 MILLION NON-RECOURSE FINANCING FOR 500MW BATTERY STORAGE PROJECT IN SCOTLAND",
    "url": "https://www.prnewswire.com/news-releases/matrix-renewables-closes-245-million-non-recourse-financing-for-500mw-battery-storage-project-in-scotland-302755662.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-025",
  "slug": "chalan-solar-storage",
  "name": "Chalan Solar + Storage",
  "isSample": false,
  "technology": "solar",
  "subType": "solar plus storage",
  "capacityMW": 65,
  "capacityBasis": "AC",
  "country": "US",
  "region": "North America",
  "admin1": "Kern County, California",
  "lat": 35.3146,
  "lng": -118.7538,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Origis Energy"
   }
  ],
  "owners": [
   {
    "name": "Origis Energy"
   }
  ],
  "offtake": {
   "offtaker": "Pioneer Community Energy",
   "type": "PPA",
   "tenorYears": 20
  },
  "financing": {
   "equity": [
    {
     "name": "RBC Community Investments",
     "role": "Tax equity"
    }
   ],
   "instruments": [
    "Tax equity"
   ]
  },
  "dates": {
   "cod": {
    "date": "2026-12-31",
    "confidence": "estimated"
   }
  },
  "description": "65 MWac of solar with a 25 MW / 100 MWh battery.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Origis Energy Secures Tax Equity from RBC for California Solar + Storage Project",
    "url": "https://www.prnewswire.com/news-releases/origis-energy-secures-tax-equity-from-rbc-for-california-solar--storage-project-302737223.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-026",
  "slug": "roccasecca-bess",
  "name": "Roccasecca BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "capacityMW": 127,
  "storageMWh": 506,
  "country": "US",
  "region": "North America",
  "admin1": "Nevada",
  "lat": 35.9788,
  "lng": -114.8338,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Eolus North America"
   }
  ],
  "owners": [
   {
    "name": "DESRI",
    "stakePct": 100
   }
  ],
  "offtake": {
   "offtaker": "Tolling agreement (15 years)"
  },
  "financing": {
   "debt": [
    {
     "name": "Zions Bancorporation",
     "role": "Lead arranger"
    },
    {
     "name": "Société Générale",
     "role": "Lead arranger"
    },
    {
     "name": "Intesa Sanpaolo",
     "role": "Lead arranger"
    },
    {
     "name": "BayernLB",
     "role": "Lead arranger"
    }
   ]
  },
  "dates": {
   "cod": {
    "date": "2026-12-31",
    "confidence": "estimated"
   }
  },
  "description": "Fully contracted battery bought by DESRI in an all-cash deal.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "IOWN Energy Facilitates Financing and Sale of 127 MW Battery Project in Nevada",
    "url": "https://www.prnewswire.com/news-releases/iown-energy-facilitates-financing-and-sale-of-127-mw-battery-project-in-nevada-302730629.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-027",
  "slug": "boxcar-energy-storage",
  "name": "Boxcar Energy Storage",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "capacityMW": 150,
  "storageMWh": 300,
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 33.0152,
  "lng": -96.5388,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "esVolta"
   }
  ],
  "owners": [
   {
    "name": "esVolta"
   }
  ],
  "offtake": {
   "offtaker": "Major corporate customer (unnamed)"
  },
  "financing": {
   "debt": [
    {
     "name": "MUFG",
     "role": "Lender"
    }
   ],
   "instruments": [
    "Construction loan",
    "Tax equity bridge loan",
    "Term loan"
   ]
  },
  "dates": {},
  "description": "Two-hour battery northeast of Dallas.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "esVolta Secures $139.6 Million Project Financing for 300 MWh Boxcar Energy Storage Project in Texas",
    "url": "https://www.prnewswire.com/news-releases/esvolta-secures-139-6-million-project-financing-for-300-mwh-boxcar-energy-storage-project-in-texas-302722809.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-028",
  "slug": "megamouth-bess",
  "name": "Megamouth BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "capacityMW": 100,
  "storageMWh": 200,
  "country": "US",
  "region": "North America",
  "admin1": "Houston, Texas",
  "lat": 29.7589,
  "lng": -95.3677,
  "status": "permitting",
  "ownership": "private",
  "developer": [
   {
    "name": "Grid Connected Infrastructure"
   }
  ],
  "owners": [
   {
    "name": "Banpu Power US",
    "stakePct": 100
   }
  ],
  "dates": {
   "cod": {
    "date": "2027-12-31",
    "confidence": "estimated"
   }
  },
  "description": "Two-hour battery in ERCOT's Houston zone.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Grid Connected Infrastructure Sells 100 MW Megamouth Battery Energy Storage Project in Houston to Banpu Power US",
    "url": "https://www.prnewswire.com/news-releases/grid-connected-infrastructure-sells-100-mw-megamouth-battery-energy-storage-project-in-houston-to-banpu-power-us-302722650.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-029",
  "slug": "cold-creek-solar-storage",
  "name": "Cold Creek Solar + Storage",
  "isSample": false,
  "technology": "solar",
  "subType": "solar plus storage",
  "capacityMW": 430,
  "capacityBasis": "AC",
  "country": "US",
  "region": "North America",
  "admin1": "Schleicher and Tom Green counties, Texas",
  "lat": 30.8791,
  "lng": -100.5419,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Doral Renewables"
   }
  ],
  "owners": [
   {
    "name": "Doral Renewables"
   }
  ],
  "financing": {
   "financialClose": {
    "date": "2026-03-24",
    "confidence": "confirmed"
   },
   "debt": [
    {
     "name": "MUFG",
     "role": "Lead arranger"
    },
    {
     "name": "Santander",
     "role": "Lender"
    },
    {
     "name": "HSBC",
     "role": "Lender"
    },
    {
     "name": "Ally",
     "role": "Lender"
    },
    {
     "name": "IDB",
     "role": "Lender"
    }
   ],
   "instruments": [
    "Construction-to-term loan",
    "Tax credit transfer"
   ]
  },
  "dates": {
   "construction": {
    "date": "2026-03-24",
    "confidence": "confirmed"
   },
   "cod": {
    "date": "2028-08-31",
    "confidence": "estimated"
   }
  },
  "description": "430 MWac of solar with 340 MWh of storage.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Doral Renewables Secures Nearly $900 Million of Financing Commitments for Construction of Cold Creek Solar + Storage Project",
    "url": "https://www.prnewswire.com/news-releases/doral-renewables-secures-nearly-900-million-of-financing-commitments-for-construction-of-cold-creek-solar--storage-project-302723255.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-030",
  "slug": "steel-river-solar-storage",
  "name": "Steel River Solar + Storage",
  "isSample": false,
  "technology": "solar",
  "subType": "solar plus storage",
  "capacityMW": 2450,
  "country": "US",
  "region": "North America",
  "admin1": "Arkansas",
  "lat": 35.7548,
  "lng": -90.0876,
  "status": "permitting",
  "ownership": "private",
  "developer": [
   {
    "name": "Swift Current Energy"
   }
  ],
  "owners": [
   {
    "name": "Cypress Creek Renewables",
    "stakePct": 100
   }
  ],
  "dates": {},
  "description": "2.45 GW of solar with 720 MW / 2.9 GWh of storage, with estimated capital costs above US$4.5 billion.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Cypress Creek Acquires 2.5 GW Solar Project with 2.9 GWh Energy Storage in Development in Arkansas from Swift Current Energy",
    "url": "https://www.prnewswire.com/news-releases/cypress-creek-acquires-2-5-gw-solar-project-with-2-9-gwh-energy-storage-in-development-in-arkansas-from-swift-current-energy-302711078.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-031",
  "slug": "nighthawk-energy-storage",
  "name": "Nighthawk Energy Storage",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "capacityMW": 300,
  "storageMWh": 1200,
  "country": "US",
  "region": "North America",
  "admin1": "San Diego County, California",
  "lat": 32.9628,
  "lng": -117.0359,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Arevon Energy"
   }
  ],
  "owners": [
   {
    "name": "Arevon Energy"
   }
  ],
  "financing": {
   "debt": [
    {
     "name": "CIBC",
     "role": "Left lead arranger"
    },
    {
     "name": "ING Capital",
     "role": "Lender"
    },
    {
     "name": "NORD/LB",
     "role": "Lender"
    },
    {
     "name": "Santander",
     "role": "Lender"
    },
    {
     "name": "Zions Bancorporation",
     "role": "Lender"
    }
   ],
   "equity": [
    {
     "name": "Goldman Sachs Alternatives",
     "role": "Preferred equity"
    }
   ],
   "instruments": [
    "Debt facility",
    "Preferred equity",
    "Tax credit transfer"
   ]
  },
  "dates": {},
  "description": "Arevon's largest standalone battery, financed with US$920 million.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Arevon Closes $920 Million in Financing for its 1,200 Megawatt-Hour Nighthawk Energy Storage Project in California",
    "url": "https://www.prnewswire.com/news-releases/arevon-closes-920-million-in-financing-for-its-1-200-megawatt-hour-nighthawk-energy-storage-project-in-california-302710346.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-032",
  "slug": "gemini-solar-storage",
  "name": "Gemini Solar + Storage",
  "isSample": false,
  "technology": "solar",
  "subType": "solar plus storage",
  "capacityMW": 690,
  "capacityBasis": "AC",
  "country": "US",
  "region": "North America",
  "admin1": "Clark County, Nevada",
  "lat": 36.3468,
  "lng": -115.0907,
  "status": "operating",
  "ownership": "private",
  "developer": [
   {
    "name": "Primergy"
   }
  ],
  "owners": [
   {
    "name": "Primergy"
   },
   {
    "name": "Quinbrook"
   }
  ],
  "offtake": {
   "type": "PPA",
   "tenorYears": 25
  },
  "financing": {
   "instruments": [
    "Senior secured notes",
    "Tax credit transfer"
   ]
  },
  "dates": {
   "cod": {
    "date": "2024-06-30",
    "confidence": "confirmed"
   }
  },
  "description": "690 MWac of solar with 380 MWac of storage, the largest co-located single-phase project of its kind in the US.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Gemini Solar + Storage Project Closes $600 Million Bond Refinancing",
    "url": "https://www.prnewswire.com/news-releases/gemini-solar--storage-project-closes-600-million-bond-refinancing-302708904.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-033",
  "slug": "elora-bess",
  "name": "Elora BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "country": "CA",
  "region": "North America",
  "admin1": "Wellington County, Ontario",
  "lat": 43.6811,
  "lng": -80.4296,
  "status": "construction",
  "ownership": "mixed",
  "developer": [
   {
    "name": "Aypa Power"
   },
   {
    "name": "Six Nations of the Grand River Development Corporation"
   }
  ],
  "owners": [
   {
    "name": "Aypa Power"
   },
   {
    "name": "Six Nations of the Grand River Development Corporation"
   }
  ],
  "financing": {
   "debt": [
    {
     "name": "CIBC",
     "role": "Left lead arranger"
    },
    {
     "name": "Sumitomo Mitsui Banking Corporation",
     "role": "Right lead arranger"
    }
   ],
   "instruments": [
    "Construction-to-term loan",
    "ITC bridge loan"
   ]
  },
  "dates": {},
  "description": "Financed with the Hedley battery under a C$700 million package. Capacity not disclosed.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Aypa Power and Six Nations of the Grand River Development Corporation Secure CA$700 Million Financing Close for Ontario Battery Energy Storage Projects",
    "url": "https://www.prnewswire.com/news-releases/aypa-power-and-six-nations-of-the-grand-river-development-corporation-secure-ca700-million-financing-close-for-ontario-battery-energy-storage-projects-302708425.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-034",
  "slug": "rockhound-solar-projects",
  "name": "Rockhound Solar Projects",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 413,
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 31.8942,
  "lng": -102.5794,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Origis Energy"
   }
  ],
  "owners": [
   {
    "name": "Origis Energy"
   }
  ],
  "financing": {
   "financialClose": {
    "date": "2026-03-05",
    "confidence": "confirmed"
   },
   "debt": [
    {
     "name": "Natixis",
     "role": "Joint underwriter"
    },
    {
     "name": "Santander",
     "role": "Joint underwriter"
    }
   ]
  },
  "dates": {
   "cod": {
    "date": "2026-08-31",
    "confidence": "estimated"
   }
  },
  "description": "Three projects in a West Texas solar complex that will exceed 700 MW.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Origis Energy Announces $545 Million Financing for Texas Solar Portfolio",
    "url": "https://www.prnewswire.com/news-releases/origis-energy-announces-545-million-financing-for-texas-solar-portfolio-302704419.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-035",
  "slug": "lunsemfwa-hydro-power",
  "name": "Lunsemfwa Hydro Power",
  "isSample": false,
  "technology": "hydro",
  "subType": "run-of-river",
  "capacityMW": 56,
  "country": "ZM",
  "region": "Africa",
  "admin1": "Central Province",
  "lat": -14.4434,
  "lng": 28.4465,
  "status": "operating",
  "ownership": "private",
  "owners": [
   {
    "name": "Globeleq",
    "stakePct": 51
   },
   {
    "name": "Wanda Gorge Investments",
    "stakePct": 49
   }
  ],
  "offtake": {
   "offtaker": "ZESCO and private buyers",
   "type": "PPA"
  },
  "dates": {},
  "description": "Two hydro plants, plus a 27 MWp solar plant under construction. Holds a Southern African Power Pool trading licence.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "GLOBELEQ CONFIRMS ACQUISITION OF A MAJORITY STAKE IN ZAMBIA'S LUNSEMFWA HYDRO POWER COMPANY",
    "url": "https://www.prnewswire.com/news-releases/globeleq-confirms-acquisition-of-a-majority-stake-in-zambias-lunsemfwa-hydro-power-company-302703086.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-036",
  "slug": "sunroper-solar",
  "name": "SunRoper Solar",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 347,
  "capacityBasis": "DC",
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 29.2455,
  "lng": -96.2291,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "OCI Energy"
   },
   {
    "name": "Arava Power"
   }
  ],
  "owners": [
   {
    "name": "OCI Energy"
   },
   {
    "name": "Arava Power"
   }
  ],
  "offtake": {
   "offtaker": "Fortune 100 company (unnamed)",
   "type": "corporate PPA",
   "tenorYears": 20
  },
  "financing": {
   "financialClose": {
    "date": "2026-02-25",
    "confidence": "confirmed"
   },
   "debt": [
    {
     "name": "ING Capital",
     "role": "Sole coordinating lead arranger"
    }
   ]
  },
  "dates": {},
  "description": "Total investment expected at about US$394 million.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "OCI Energy and Arava Power have closed construction financing with ING Capital to support a 347 MWdc solar energy project near Houston",
    "url": "https://www.prnewswire.com/news-releases/oci-energy-and-arava-power-have-closed-construction-financing-with-ing-capital-to-support-a-347-mwdc-solar-energy-project-near-houston-302697538.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-037",
  "slug": "fort-duncan-bess",
  "name": "Fort Duncan BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "capacityMW": 100,
  "storageMWh": 200,
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 28.7092,
  "lng": -100.4993,
  "status": "operating",
  "ownership": "private",
  "developer": [
   {
    "name": "Recurrent Energy"
   }
  ],
  "owners": [
   {
    "name": "Hunt Energy Network",
    "stakePct": 100
   }
  ],
  "offtake": {
   "type": "merchant"
  },
  "dates": {
   "cod": {
    "date": "2025-06-30",
    "confidence": "confirmed"
   }
  },
  "description": "Merchant battery relieving local congestion in ERCOT.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "HUNT ENERGY NETWORK ACQUIRES 100MW BATTERY FROM RECURRENT ENERGY",
    "url": "https://www.prnewswire.com/news-releases/hunt-energy-network-acquires-100mw-battery-from-recurrent-energy-302695223.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-038",
  "slug": "three-rivers-solar",
  "name": "Three Rivers Solar",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 100,
  "capacityBasis": "AC",
  "country": "US",
  "region": "North America",
  "admin1": "Maine",
  "lat": 44.7135,
  "lng": -68.2995,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Swift Current Energy"
   }
  ],
  "owners": [
   {
    "name": "Swift Current Energy"
   }
  ],
  "offtake": {
   "type": "PPA",
   "tenorYears": 20
  },
  "financing": {
   "debt": [
    {
     "name": "Crédit Agricole CIB",
     "role": "Coordinating lead arranger"
    },
    {
     "name": "Lloyds Bank",
     "role": "Coordinating lead arranger"
    },
    {
     "name": "NatWest",
     "role": "Coordinating lead arranger"
    },
    {
     "name": "Société Générale",
     "role": "Coordinating lead arranger"
    }
   ],
   "instruments": [
    "Project financing",
    "Tax equity"
   ]
  },
  "dates": {
   "cod": {
    "date": "2026-12-31",
    "confidence": "estimated"
   }
  },
  "description": "122 MWdc (100 MWac), Swift Current's first project in Maine.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Swift Current Energy Secures Project Financing and Tax Equity for 122 MW Energy Facility in Maine",
    "url": "https://www.prnewswire.com/news-releases/swift-current-energy-secures-project-financing-and-tax-equity-for-122-mw-energy-facility-in-maine-302691415.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-039",
  "slug": "odesa-wind-project-notus-energy",
  "name": "Odesa Wind Project (Notus Energy)",
  "isSample": false,
  "technology": "wind",
  "subType": "onshore",
  "capacityMW": 124,
  "country": "UA",
  "region": "Europe",
  "admin1": "Odesa region",
  "lat": 46.1147,
  "lng": 29.9567,
  "status": "financing",
  "ownership": "private",
  "developer": [
   {
    "name": "Notus Energy"
   }
  ],
  "owners": [
   {
    "name": "Horizon Capital Catalyst Fund",
    "stakePct": 45
   },
   {
    "name": "Notus Energy"
   }
  ],
  "financing": {
   "instruments": [
    "DFI debt (EBRD, IFC and others)"
   ]
  },
  "dates": {},
  "description": "Ready-to-build project expected to mobilise more than €220 million. First of three Notus wind farms in Ukraine.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Kyiv-Based Horizon Capital Backs Notus Energy in Launching a 124 MW Wind Power Project in Ukraine as the First Investment from Horizon Capital Catalyst Fund, its Newest Fund",
    "url": "https://www.prnewswire.com/news-releases/kyiv-based-horizon-capital-backs-notus-energy-in-launching-a-124-mw-wind-power-project-in-ukraine-as-the-first-investment-from-horizon-capital-catalyst-fund-its-newest-fund-302665428.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-040",
  "slug": "tormes-solar",
  "name": "Tormes Solar",
  "isSample": false,
  "technology": "solar",
  "subType": "utility-scale PV",
  "capacityMW": 457,
  "capacityBasis": "DC",
  "country": "US",
  "region": "North America",
  "admin1": "Texas",
  "lat": 32.028,
  "lng": -96.4985,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Matrix Renewables"
   }
  ],
  "owners": [
   {
    "name": "Matrix Renewables"
   }
  ],
  "financing": {
   "financialClose": {
    "date": "2026-06-23",
    "confidence": "confirmed"
   },
   "equity": [
    {
     "name": "DESRI",
     "role": "Preferred equity"
    }
   ]
  },
  "dates": {},
  "description": "Part of a 1.3 billion dollar Matrix portfolio financing.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "MATRIX RENEWABLES CLOSES PORTFOLIO FINANCING AND SECURES TAX EQUITY COMMITMENTS FOR U.S. UTILITY-SCALE SOLAR AND STORAGE PROJECTS WITH A COMBINED CAPACITY OF 859MWdc AND 167MWh",
    "url": "https://www.prnewswire.com/news-releases/matrix-renewables-closes-portfolio-financing-and-secures-tax-equity-commitments-for-us-utility-scale-solar-and-storage-projects-with-a-combined-capacity-of-859mwdc-and-167mwh-302807761.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-041",
  "slug": "gawara-baya-wind-and-battery",
  "name": "Gawara Baya Wind and Battery",
  "isSample": false,
  "technology": "wind",
  "subType": "onshore plus storage",
  "capacityMW": 408,
  "country": "AU",
  "region": "Oceania",
  "admin1": "North Queensland (south-west of Ingham)",
  "lat": -18.6476,
  "lng": 146.1603,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Windlab"
   }
  ],
  "owners": [
   {
    "name": "Copenhagen Infrastructure Partners",
    "stakePct": 100
   }
  ],
  "offtake": {
   "offtaker": "Stanwell and SmartestEnergy"
  },
  "financing": {
   "financialClose": {
    "date": "2026-08-31",
    "confidence": "confirmed"
   },
   "instruments": [
    "A$1.7 billion bank facility"
   ]
  },
  "dates": {
   "cod": {
    "date": "2030-12-31",
    "confidence": "estimated"
   }
  },
  "description": "408 MW of wind (68 turbines) with a 104 MW grid-forming battery on Gugu Badhun Country.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Copenhagen Infrastructure Partners acquires onshore wind and battery project in Australia",
    "url": "https://www.prnewswire.com/news-releases/copenhagen-infrastructure-partners-acquires-onshore-wind-and-battery-project-in-australia-302864684.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-042",
  "slug": "red-willow-solar-storage",
  "name": "Red Willow Solar + Storage",
  "isSample": false,
  "technology": "solar",
  "subType": "solar plus storage",
  "capacityMW": 225,
  "capacityBasis": "AC",
  "country": "CA",
  "region": "North America",
  "admin1": "Alberta",
  "lat": 52.2258,
  "lng": -112.5692,
  "status": "permitting",
  "ownership": "private",
  "developer": [
   {
    "name": "Westbridge Renewable Energy"
   }
  ],
  "dates": {},
  "description": "Up to 225 MWac of solar with a proposed 100 MW battery, sold by Westbridge in 2026.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Westbridge Announces Definitive Agreement for the Sale of Red Willow Solar Project and Highlights Improving Market Fundamentals in Alberta and Growing AI-Driven Demand Across North America",
    "url": "https://www.prnewswire.com/news-releases/westbridge-announces-definitive-agreement-for-the-sale-of-red-willow-solar-project-and-highlights-improving-market-fundamentals-in-alberta-and-growing-ai-driven-demand-across-north-america-302862833.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-043",
  "slug": "plymouth-bess",
  "name": "Plymouth BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "country": "GB",
  "region": "Europe",
  "admin1": "Devon",
  "lat": 50.3714,
  "lng": -4.1424,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Pulse Clean Energy"
   }
  ],
  "owners": [
   {
    "name": "Pulse Clean Energy"
   }
  ],
  "financing": {
   "instruments": [
    "Technology performance insurance"
   ]
  },
  "dates": {},
  "description": "Under construction with technology performance insurance from Ariel Green. Capacity not disclosed.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Pulse Clean Energy Closes Two UK Energy Storage Projects With Support From Ariel Green's Technology Performance Insurance",
    "url": "https://www.prnewswire.com/news-releases/pulse-clean-energy-closes-two-uk-energy-storage-projects-with-support-from-ariel-greens-technology-performance-insurance-302818797.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 },
 {
  "id": "prj-044",
  "slug": "dowlais-bess",
  "name": "Dowlais BESS",
  "isSample": false,
  "technology": "storage",
  "subType": "battery",
  "country": "GB",
  "region": "Europe",
  "admin1": "Merthyr Tydfil",
  "lat": 51.7625,
  "lng": -3.3556,
  "status": "construction",
  "ownership": "private",
  "developer": [
   {
    "name": "Pulse Clean Energy"
   }
  ],
  "owners": [
   {
    "name": "Pulse Clean Energy"
   }
  ],
  "financing": {
   "instruments": [
    "Technology performance insurance"
   ]
  },
  "dates": {},
  "description": "Under construction with technology performance insurance from Ariel Green. Capacity not disclosed.",
  "sources": [
   {
    "publisher": "PR Newswire",
    "title": "Pulse Clean Energy Closes Two UK Energy Storage Projects With Support From Ariel Green's Technology Performance Insurance",
    "url": "https://www.prnewswire.com/news-releases/pulse-clean-energy-closes-two-uk-energy-storage-projects-with-support-from-ariel-greens-technology-performance-insurance-302818797.html",
    "retrievedAt": "2026-11-11"
   }
  ],
  "lastUpdated": "2026-11-11",
  "dataVersion": "2026.11.5"
 }
];
