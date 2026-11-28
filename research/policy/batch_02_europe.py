# Second wave, Europe. Desk review from the Legal 500 Renewable Energy guide 2026, the CMS Expert Guide to
# renewable energy (2024) and US International Trade Administration country guides. November 2026.
def L5(iso, name, firm, slug, mod="2026-06-11"):
    return (f"l5{iso}", f"Renewable Energy, {name} (comparative guide)", f"Legal 500 ({firm})", f"https://www.legal500.com/guides/chapter/{slug}-renewable-energy/", mod, "s")
def CMS(iso, name, slug, pub="2024-02-22"):
    return (f"cms{iso}", f"Renewable energy in {name}", "CMS Expert Guides", f"https://cms.law/en/int/expert-guides/cms-expert-guide-to-renewable-energy/{slug}", pub, "s")
def TG(iso, name, slug, page, title, pub):
    return (f"tg{iso}{page[:2]}", f"{name} Country Commercial Guide, {title}", "US International Trade Administration", f"https://www.trade.gov/country-commercial-guides/{slug}-{page}", pub, "s")

GB5=L5("gb","United Kingdom","White & Case","united-kingdom","2026-08-07"); GBC=CMS("gb","the United Kingdom","united-kingdom")
GBF=TG("gb","United Kingdom","united-kingdom","trade-financing","trade financing","2023-11-03")
DE5=L5("de","Germany","ARQIS","germany"); DEC=CMS("de","Germany","germany")
DEF=TG("de","Germany","germany","trade-financing","trade financing","2025-08-01"); DEE=TG("de","Germany","germany","energy","energy","2025-08-01")
IT5=L5("it","Italy","Norton Rose Fulbright","italy"); ITC=CMS("it","Italy","italy")
ITF=TG("it","Italy","italy","trade-financing","trade financing","2026-04-14")
PT5=L5("pt","Portugal","Abreu Advogados","portugal"); PTC=CMS("pt","Portugal","portugal")
PTF=TG("pt","Portugal","portugal","trade-financing","trade financing","2026-04-20"); PTE=TG("pt","Portugal","portugal","energy","energy","2026-04-16")

COUNTRIES = [
c("GB",
  "Great Britain supports new renewables through annual Contract for Difference auctions with a government-owned counterparty, and capital moves freely. Grid connection delays and planning are the main constraints.",
  U=[("S","m","Contracts for Difference are allocated in auctions that now run every year, and older projects keep Renewables Obligation support for 20 years.",["l5gb","cmsgb"]),
     ("S","m","A Contract for Difference pays a fixed strike price whatever the market price, which lenders treat as bankable.",["l5gb","cmsgb"]),
     ("S","m","The contract counterparty, the Low Carbon Contracts Company, is owned by the government.",["l5gb"]),
     ("S","l","There are no exchange controls on moving funds in or out, and no foreign ownership cap on generation was found in the sources reviewed.",["tggbtr"]),
     ("M","m","Planning and grid connection are the two biggest causes of delay, with upgrades needed at both transmission and distribution level.",["l5gb"]),
     ("M","l","Net zero by 2050 is set in law and planning rules were eased in 2025, but existing generators pay the Electricity Generator Levy on exceptional revenues.",["cmsgb","l5gb"])],
  Ud=("i","The Planning and Infrastructure Act 2025 streamlines consent and makes the Environment Agency a single lead regulator.",["l5gb"]),
  C=[("S","l","Corporate power purchase agreements are used alongside Contracts for Difference to give projects long-term revenue.",["l5gb"]),
     ("N",None,None,[]),
     ("N",None,None,[]),
     ("S","l","No exchange controls, and no foreign ownership cap on generation was found.",["tggbtr"]),
     ("M","m","Grid connection delays affect distribution as well as transmission connections.",["l5gb"]),
     ("M","l","Net zero is set in law, but the Electricity Generator Levy shows existing revenues can be taxed.",["cmsgb"])],
  Cd=("s","No change to corporate buying rules was found in the period reviewed.",[]),
  gaps="Contract length, curtailment compensation and C&I contract terms were not covered by the sources reviewed. Connection queue times were not quantified.",
  events=[("2017","other","mixed","Renewables Obligation closes to new projects, existing support continues for 20 years",["utility"],["l5gb"]),
          ("2023","law","positive","Energy Act 2023 sets a new framework for energy production and system planning",["utility","ci"],["cmsgb"]),
          ("2023","tax","negative","Electricity Generator Levy applies to exceptional revenues of existing generators",["utility","ci"],["cmsgb"]),
          ("2025","law","positive","Planning and Infrastructure Act 2025 streamlines consent for energy infrastructure",["utility","ci"],["l5gb"])],
  sources=[GB5,GBC,GBF]),

c("DE",
  "Germany tenders large volumes of wind and solar under the Renewable Energy Sources Act, with a sliding market premium that lenders accept, and corporate PPAs are growing. Slow permitting and grid bottlenecks are the main obstacles.",
  U=[("S","m","The Federal Network Agency regularly tenders large wind and solar volumes under the Renewable Energy Sources Act, and offshore sites are tendered with grid access included.",["l5de","cmsde"]),
     ("S","m","Auction winners receive a sliding market premium that stabilises revenue and is accepted by banks and development lenders.",["l5de"]),
     ("N",None,None,[]),
     ("S","l","There are no restrictions on moving capital, foreign exchange earnings or dividends.",["tgdetr"]),
     ("M","m","Lengthy approvals and bottlenecks in grid expansion and connection remain major obstacles, despite acceleration measures.",["l5de"]),
     ("S","l","Targets of 80% renewable electricity by 2030 and 70 GW offshore wind by 2045 are set in law, and no retroactive cut was found.",["tgdeen","cmsde"])],
  Ud=("s","Tendering continues under the existing framework, and no major change was found in the period reviewed.",["l5de"]),
  C=[("S","l","Corporate power purchase agreements are gaining importance for projects outside the support scheme, mainly solar and onshore wind.",["l5de"]),
     ("N",None,None,[]),
     ("N",None,None,[]),
     ("S","l","No restrictions on moving capital or dividends.",["tgdetr"]),
     ("M","m","Grid connection delays and limited storage hold back new installations.",["l5de"]),
     ("S","l","Renewable targets are set in law, and no retroactive change to corporate buying was found.",["tgdeen"])],
  Cd=("s","No change to corporate buying rules was found in the period reviewed.",[]),
  gaps="Buyer credit, curtailment compensation and C&I contract terms were not covered by the sources reviewed.",
  events=[("2022","law","positive","Coal Exit Act sets the phase-out of coal power by 2038",["utility"],["cmsde"]),
          ("2023","law","positive","Revised Offshore Wind Act sets 30 GW by 2030, 40 GW by 2035 and 70 GW by 2045",["utility"],["cmsde"]),
          ("2023-07","auction","positive","Largest offshore wind tender to date opens, 7 GW across four sites",["utility"],["cmsde"])],
  sources=[DE5,DEC,DEF,DEE]),

c("IT",
  "Italy supports renewables through two-way Contracts for Difference run by the state energy agency GSE, under the FER 2 and FER X decrees, and profits move freely. Permitting and tension between national and regional rules are the main risks.",
  U=[("S","m","Support is allocated through GSE schemes, FER 2 for innovative technologies from June 2024 and the transitional FER X from December 2024.",["l5it"]),
     ("S","l","Larger plants receive two-way Contracts for Difference, and plants below 300 kW receive an all-inclusive tariff.",["l5it"]),
     ("S","l","Payments come from GSE, a state-controlled body.",["l5it"]),
     ("S","l","There are no restrictions on currency transfers, and profits can be freely repatriated.",["tgittr"]),
     ("M","m","Permitting remains a significant issue despite simplification, and landscape and heritage constraints can block plants.",["l5it","cmsit"]),
     ("M","l","Tension between national and regional rules creates legal uncertainty for developers.",["l5it"])],
  Ud=("i","FER X and FER 2 opened new support rounds in 2024, and permitting has been simplified.",["l5it","cmsit"]),
  C=[("S","l","Self-consumption rules were updated recently, alongside simplified authorisation for smaller plants.",["cmsit"]),
     ("N",None,None,[]),
     ("N",None,None,[]),
     ("S","l","No restrictions on currency transfers or repatriating profits.",["tgittr"]),
     ("M","l","Permitting and regional rules remain the main barriers.",["l5it"]),
     ("M","l","Regional fragmentation creates legal uncertainty.",["l5it"])],
  Cd=("s","No major change to self-consumption rules was found after 2024.",[]),
  gaps="Contract length, grid connection times and corporate PPA practice were not covered by the sources reviewed.",
  events=[("2024-06-19","decree","positive","FER 2 decree supports offshore wind, floating solar, geothermal and marine energy",["utility"],["l5it"]),
          ("2024-12-30","decree","positive","Transitional FER X decree opens Contracts for Difference for mature technologies",["utility"],["l5it"])],
  sources=[IT5,ITC,ITF]),

c("PT",
  "Portugal allocates grid capacity and support through auctions, plans 10 GW of offshore wind capacity, and funds self-consumption and storage. Congested grid capacity is the central constraint.",
  U=[("S","m","The government runs auctions to reserve grid injection capacity and allocate support, and plans 10 GW of offshore wind capacity through auctions.",["l5pt","cmspt"]),
     ("N",None,None,[]),
     ("N",None,None,[]),
     ("S","l","Portugal imposes no exchange controls, and no foreign ownership cap on generation was found.",["tgpttr"]),
     ("M","m","Limited and congested grid capacity is the central constraint, and securing new network capacity is slow and costly.",["l5pt"]),
     ("S","l","The updated National Energy and Climate Plan 2030 sets targets, and no retroactive cut was found.",["l5pt","tgpten"])],
  Ud=("s","No major change to auction rules was found in the period reviewed.",[]),
  C=[("S","l","EU recovery funds and the Environmental Fund support self-consumption, storage and efficiency projects.",["l5pt"]),
     ("N",None,None,[]),
     ("N",None,None,[]),
     ("S","l","No exchange controls.",["tgpttr"]),
     ("M","l","Grid congestion also affects connection of consumption sites in high-demand zones.",["l5pt"]),
     ("S","l","National plan targets support self-consumption, and no retroactive change was found.",["l5pt"])],
  Cd=("s","No major change was found in the period reviewed.",[]),
  gaps="Contract terms, buyer credit and the timing of the first offshore wind auction were not established from the sources reviewed.",
  events=[("2024","plan","positive","Updated National Energy and Climate Plan 2030 raises renewable targets",["utility","ci"],["l5pt"])],
  sources=[PT5,PTC,PTF,PTE]),
]
