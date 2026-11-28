# Second wave, India, Brazil and Kenya. Desk review from official investment agencies, US ITA guides and trade press, November 2026.
INV=("in_inv","Renewable energy sector overview","Invest India","https://www.investindia.gov.in/sector/renewable-energy",None,"p")
INF=TG("in","India","india","trade-financing","trade financing","2026-04-17")
INDTE=("in_dte","India's renewable energy sector grapples with massive PPA signing delays","Down To Earth","https://www.downtoearth.org.in/energy/indias-renewable-energy-sector-grapples-with-massive-ppa-signing-delays","2025-12-25","s")
INHALT=("in_halt","India halts annual clean energy tender targets amid growing project backlog","Outlook Business (citing Reuters)","https://www.outlookbusiness.com/planet/industry/india-halts-annual-clean-energy-tender-targets-project-backlog","2026-01-27","s")
IN40=("in_rebid","India mulls reissuing tenders for stalled 40 GW renewable projects","Outlook Business (citing PTI)","https://www.outlookbusiness.com/planet/industry/india-rebid-40gw-renewable-projects-virtual-ppa-financing","2025-09-18","s")
IN50=("in_50","India's renewable projects stalled by grid gaps, legal disputes and unsigned power deals","Outlook Business (citing Reuters)","https://www.outlookbusiness.com/planet/industry/india-stranded-renewable-projects-50gw-grid-delays","2025-08-03","s")
BRI=TG("br","Brazil","brazil","investment-climate-statement","investment climate statement","2025-05-20")
BRP=TG("br","Brazil","brazil","power-generation-transmission-and-distribution-infrastructure","power generation, transmission and distribution","2025-08-21")
BRC=("br_tgc","Brazil energy curtailment","US International Trade Administration","https://www.trade.gov/market-intelligence/brazil-energy-curtailment","2026-01-05","s")
BRCS=("br_cs","Curtailment has already totaled 73.4 million MWh in Brazil since 2021","Canal Solar","https://canalsolar.com.br/en/Curtailment-totals-73-million-MWh-since-2021./","2026-09-16","s")
BRFW=("br_fw","Curtailment in Brazil, from operational constraint to market redesign","Financier Worldwide","https://www.financierworldwide.com/curtailment-in-brazil-from-operational-constraint-to-market-redesign",None,"s")
KEF=TG("ke","Kenya","kenya","trade-financing","trade financing","2024-07-05"); KEE=TG("ke","Kenya","kenya","energy-electrical-power-systems","energy and electrical power systems","2024-07-05")
KESQ=("ke_sq","Kenya reopens power purchase agreements with competitive auctions and stricter oversight","SolarQuarter","https://solarquarter.com/2026/02/26/kenya-reopens-power-purchase-agreements-with-competitive-auctions-and-stricter-oversight/","2026-02-26","s")

COUNTRIES = [
c("IN",
  "India allows 100% foreign ownership of renewable generation and targets 500 GW of non-fossil capacity by 2030, but about 43 to 45 GW of auctioned projects have no signed PPAs because state utilities delay buying. The government stopped setting annual tender targets in 2026 and now tenders only against utility demand.",
  U=[("M","m","Central agencies auction large volumes, but around 43 GW of awarded capacity still had no buyer in early 2026, and annual tender targets were dropped.",["in_halt","in_dte"]),
     ("N",None,None,[]),
     ("M","l","State distribution companies delay signing and buying, and industry bodies cite delays in payment from them.",["in_halt","in_rebid"]),
     ("S","m","100% foreign investment is allowed under the automatic route for renewable generation and distribution, though the rupee is only partially convertible.",["in_inv","tgintr"]),
     ("U","m","Stranded projects passed 50 GW in 2025 because of unfinished transmission lines, and 45 GW of granted or pending connectivity sits unused.",["in_50","in_dte"]),
     ("M","l","Long-term targets are firm, but the backlog has led to cancelled tenders and a change in how tenders are issued.",["in_inv","in_halt"])],
  Ud=("w","Unsold capacity grew through 2025, and some awarded projects may be cancelled or rebid.",["in_halt","in_rebid"]),
  C=[("M","l","Virtual PPAs were close to being finalised in 2025, which would let companies underwrite projects without taking physical delivery.",["in_rebid"]),
     ("N",None,None,[]),
     ("N",None,None,[]),
     ("S","m","100% foreign investment allowed under the automatic route.",["in_inv"]),
     ("N",None,None,[]),
     ("S","l","National targets support corporate buying.",["in_inv"])],
  Cd=("i","Virtual PPAs are being introduced for corporate buyers.",["in_rebid"]),
  gaps="PPA terms, curtailment compensation and state-level open access rules were not covered by the sources reviewed.",
  events=[("2021-11","plan","positive","India announces 500 GW non-fossil capacity target for 2030 and net zero by 2070",["utility","ci"],["in_inv"]),
          ("2025-09-18","plan","mixed","Government plans to rebid about 40 GW of projects stalled without PPAs",["utility"],["in_rebid"]),
          ("2025-11","grid","negative","Regulator paper finds 45 GW of connectivity idle while PPAs remain unsigned",["utility"],["in_dte"]),
          ("2026-01","plan","mixed","India drops annual tender targets and moves to demand-based tendering",["utility"],["in_halt"])],
  sources=[INV,INF,INDTE,INHALT,IN40,IN50]),

c("BR",
  "Brazil's grid is 87% renewable and foreign investors are treated like local ones, but curtailment of wind and solar has become structural, with losses above US$370 million in 2025. Utility-scale solar investment has stalled, while distributed solar keeps growing.",
  U=[("M","m","Private investment has built most new wind and solar, but recent government auctions focused on hydro and thermal capacity.",["tgbrpo"]),
     ("M","l","Curtailment is undermining the bankability of new wind and solar projects.",["br_tgc"]),
     ("N",None,None,[]),
     ("S","m","Foreign investors receive the same legal treatment as local investors in most sectors, and power is not among the restricted ones.",["tgbrin"]),
     ("U","m","Curtailment losses exceeded US$370 million in 2025, average cuts in 2026 were 18% higher than in 2025, and ONS expects most future cuts to come from oversupply.",["br_tgc","br_cs"]),
     ("M","l","Losses from curtailment are changing financing assumptions for new and operating projects, and rules are being redesigned.",["br_fw","br_tgc"])],
  Ud=("w","Curtailment kept rising in 2026, and the operator expects it to become mostly structural by 2029.",["br_cs","br_tgc"]),
  C=[("S","m","Distributed solar has grown to the largest share of solar capacity, helping make solar Brazil's second largest source.",["tgbrpo"]),
     ("N",None,None,[]),
     ("N",None,None,[]),
     ("S","m","Foreign investors are treated like locals in most sectors.",["tgbrin"]),
     ("M","l","Rapid growth of distributed generation adds to grid stress.",["br_fw"]),
     ("N",None,None,[])],
  Cd=("s","No change for distributed solar was found in the sources reviewed.",[]),
  gaps="Free market PPA terms, buyer credit and the details of curtailment compensation rules were not covered by the sources reviewed.",
  events=[("2024","other","positive","Solar becomes Brazil's second largest power source at almost 50 GW including distributed generation",["utility","ci"],["tgbrpo"]),
          ("2025","grid","negative","Curtailment losses exceed US$370 million",["utility"],["br_tgc"]),
          ("2025-06-27","auction","mixed","Capacity reserve auction for hydro and thermal plants, with 15-year contracts",["utility"],["tgbrpo"])],
  sources=[BRI,BRP,BRC,BRCS,BRFW]),

c("KE",
  "Kenya gets about 90% of its capacity from renewables, a third of it from independent power producers. A freeze on new PPAs was lifted with a move to competitive auctions, but the auction rules are still unclear. There are no foreign exchange controls.",
  U=[("M","m","New PPAs are allowed again, but through a competitive auction system whose rules investors are still waiting to see.",["ke_sq"]),
     ("M","l","Local costs may be paid in shillings while foreign debt can be serviced in hard currency, after a proposal for shilling-only contracts was dropped.",["ke_sq"]),
     ("N",None,None,[]),
     ("S","m","Kenya repealed exchange controls in 1993, and funds from investment can be converted and transferred freely.",["tgketr"]),
     ("N",None,None,[]),
     ("M","l","Contract changes now need regulator approval to stop informal renegotiation, and earlier projects face uncertainty.",["ke_sq"])],
  Ud=("i","The freeze on new PPAs has been lifted.",["ke_sq"]),
  C=[("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),
     ("S","m","No exchange controls.",["tgketr"]),
     ("N",None,None,[]),
     ("M","l","Rules ending the KPLC distribution monopoly were introduced in 2024.",["tgkeen"])],
  Cd=("i","2024 changes seek to open transmission and distribution.",["tgkeen"]),
  gaps="KPLC's payment record, the auction timetable and C&I buying routes were not covered by the sources reviewed.",
  events=[("2024","law","positive","Rules introduced to end the KPLC and KETRACO monopolies",["utility","ci"],["tgkeen"]),
          ("2026-02","law","positive","Kenya reopens new PPAs through competitive auctions, with regulator approval of contract changes",["utility"],["ke_sq"])],
  sources=[KEF,KEE,KESQ]),
]
