# Third wave. New markets reviewed mainly from news reports, read in full, plus US ITA guides for currency rules. November 2026.
SQ = lambda sid, t, url, pub: (sid, t, "SolarQuarter", url, pub, "s")
AE_ = lambda sid, t, url, pub: (sid, t, "Africa Energy", url, pub, "s")
AP = lambda sid, t, url, pub: (sid, t, "Asian Power", url, pub, "s")
N6 = [("N",None,None,[])]*6
def C_own(rating, reason, src):
    return [("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),(rating,"l",reason,src),("N",None,None,[]),("N",None,None,[])]
STABLE = ("s","No change for C&I buyers was found in the sources reviewed.",[])

AU1=SQ("sq_au_wa","Western Australia launches $4 billion renewable energy tenders under federal Capacity Investment Scheme","https://solarquarter.com/2025/08/29/western-australia-launches-4-billion-renewable-energy-tenders-under-federal-capacity-investment-scheme/","2025-08-29")
AU2=SQ("sq_au_dnsp","Australia moves to cut rooftop solar curtailment with 20-year grid planning reform","https://solarquarter.com/2026/04/27/australia-moves-to-cut-rooftop-solar-curtailment-with-20-year-grid-planning-reform/","2026-04-27")
AU3=AP("ap_au_osw","Australia includes financial security requirement in amended offshore wind regulation","https://asian-power.com/project/news/australia-includes-financial-security-requirement-in-amended-offshore-wind-regulation","2024-12-13")
AU4=SQ("sq_au_sunshot","Australia launches round 2 of $1 billion Solar Sunshot program","https://solarquarter.com/2025/09/05/australia-launches-round-2-of-1-billion-solar-sunshot-program/","2025-09-05")
AU5=SQ("sq_au_rating","Australia launches developer rating scheme to strengthen trust in renewable energy projects","https://solarquarter.com/2026/07/24/australia-launches-developer-rating-scheme-to-strengthen-trust-in-renewable-energy-projects/","2026-07-24")
TR1=("fb_tr_yeka","YEKA RES 2025 yarışmalarının kazananları belli oldu (Winners of the 2025 YEKA wind competitions announced)","Forbes Türkiye (Anadolu Agency)","https://www.forbes.com.tr/ekonomi/yeka-res-2025-yarismalarinin-kazananlari-belli-oldu","2025-12-09","s","Turkish","YEKA RES 2025 yarışmalarının kazananları belli oldu")
TR2=SQ("sq_tr_2035","Türkiye targets 54.7% renewable electricity generation by 2035","https://solarquarter.com/2026/07/15/turkiye-targets-54-7-renewable-electricity-generation-by-2035-with-major-solar-and-wind-expansion/","2026-07-15")
TRF=TG("tr","Türkiye","turkey","trade-financing","trade financing","2026-01-29")
NL1=SQ("sq_nl_nem","Enphase Energy applauds Dutch Senate's decision to extend solar net metering","https://solarquarter.com/2024/02/16/enphase-energy-applauds-dutch-senates-decision-to-extend-solar-net-metering/","2024-02-16")
NL2=("et_nl_osw","EU greenlights €10 billion Dutch offshore wind energy scheme","ESG Today","https://www.esgtoday.com/eu-greenlights-10-billion-dutch-offshore-wind-energy-scheme/","2026-11-18","s")
NLC=CMS("nl","the Netherlands","netherlands"); NLF=TG("nl","Netherlands","netherlands","trade-financing","trade financing","2026-01-30")
BE1=SQ("sq_be_osw","European Commission approves €2.04 billion Belgian State aid for 735 MW offshore wind project","https://solarquarter.com/2026/11/13/european-commission-approves-e2-04-billion-belgian-state-aid-for-735-mw-offshore-wind-project/","2026-11-13")
BEC=CMS("be","Belgium","belgium"); BEF=TG("be","Belgium","belgium","trade-financing","trade financing","2026-03-20")
ZM1=SQ("sq_zm_10gw","Zambia targets 10,000 MW power generation capacity by 2031","https://solarquarter.com/2026/10/29/zambia-targets-10000-mw-power-generation-capacity-by-2031-as-energy-reforms-boost-growth/","2026-10-29")
ZM2=SQ("sq_zm_zesco","ZESCO launches tender for 50 MW solar PV plants","https://solarquarter.com/2022/08/24/zambia-electricity-supply-corporation-launches-tender-for-50-mw-solar-pv-plants/","2022-08-24")
ZMF=TG("zm","Zambia","zambia","trade-financing","trade financing","2026-03-23")
JO1=SQ("sq_jo_ban","Jordan lifts ban on large-scale renewable energy projects","https://solarquarter.com/2024/09/02/jordan-lifts-ban-on-large-scale-renewable-energy-projects-new-regulations-effective-2024/","2024-09-02")
JOF=TG("jo","Jordan","jordan","trade-financing","trade financing","2026-02-26")
TN1=AE_("ae_tn_fit","Tunisia announces feed-in tariff and more renewables tenders","https://www.africa-energy.com/news-centre/article/tunisia-announces-feed-tariff-and-more-renewables-tenders",None)
TNF=TG("tn","Tunisia","tunisia","trade-financing","trade financing","2026-02-26")
UZ1=AP("ap_uz_hydro","Uzbekistan launches tender for 5 hydropower projects","https://asian-power.com/project/news/uzbekistan-launches-tender-5-hydropower-power-projects","2023-08-23")
UZF=TG("uz","Uzbekistan","uzbekistan","trade-financing","trade financing","2025-12-09")
IE1=SQ("sq_ie_sres","Ireland launches second phase of Small-Scale Renewable Electricity Support Scheme","https://solarquarter.com/2024/05/29/ireland-launches-second-phase-of-small-scale-renewable-electricity-support-scheme/","2024-05-29")
IEF=TG("ie","Ireland","ireland","trade-financing","trade financing","2026-02-02")
KZ1=SQ("sq_kz_auc","Kazakhstan announces 2025 renewable energy auction schedule with 1,810 MW","https://solarquarter.com/2025/02/13/kazakhstan-announces-2025-renewable-energy-auction-schedule-with-1810-mw-capacity/","2025-02-13")
KZ2=AP("ap_kz_miss","Kazakhstan could miss its revised 2030 renewables target","https://asian-power.com/power-utility/news/kazakhstan-could-miss-its-revised-2030-renewables-target","2023-04-14")
KZF=TG("kz","Kazakhstan","kazakhstan","trade-financing","trade financing","2026-03-10")
KW1=SQ("sq_kw_shag","Kuwait launches bidding for 500 MW Al Dibdibah Shagaya phase III solar project","https://solarquarter.com/2025/11/27/kuwait-launches-bidding-for-500-mw-al-dibdibah-shagaya-phase-iii-solar-project/","2025-11-27")
KW2=SQ("sq_kw_road","Kuwait unveils three-year roadmap to strengthen power sector and expand renewable energy","https://solarquarter.com/2026/01/03/kuwait-unveils-three-year-roadmap-to-strengthen-power-sector-and-expand-renewable-energy/","2026-01-03")
QA1=SQ("sq_qa_2035","Qatar targets 25.9% renewable energy share in power capacity by 2035","https://solarquarter.com/2026/10/26/qatar-targets-25-9-renewable-energy-share-in-power-capacity-by-2035/","2026-10-26")
IL1=SQ("sq_il_agri","Israel launches 100 MW agrivoltaic tender","https://solarquarter.com/2022/01/21/israel-launches-100-mw-capacity-of-agrivoltaic-tender/","2022-01-21")
ILF=TG("il","Israel","israel","trade-financing","trade financing","2026-04-24")
DZ1=SQ("sq_dz_1gw","Algeria launches tender for 1 GW solar PV plants","https://solarquarter.com/2022/01/06/algeria-launches-tender-for-1-gw-solar-pv-plants/","2022-01-06")
DZ2=("mi_dz_32","MENA weekly round-up, Algeria launches 3.2 GW solar projects","Mercom India","https://www.mercomindia.com/mena-weekly-round-up-algeria-launches-3-2-gw-solar-projects/","2025-03-24","s")
DZF=TG("dz","Algeria","algeria","trade-financing","trade financing","2023-01-31")
KH1=SQ("sq_kh_roof","Cambodia surpasses solar targets as rooftop solar growth faces policy roadblocks","https://solarquarter.com/2026/06/03/cambodia-surpasses-solar-targets-as-rooftop-solar-growth-faces-policy-roadblocks/","2026-06-03")
KH2=("sq_kh_bond","Cambodia lists record $99 million green bond to finance 350 MW solar project","SolarQuarter","https://solarquarter.com/2026/11/26/cambodia-lists-record-99-million-green-bond-to-finance-350-mw-solar-project/","2026-11-26","s")
LK1=SQ("sq_lk_adb","ADB approves $57.4 million to expand rooftop solar and virtual net metering in Sri Lanka","https://solarquarter.com/2026/06/26/adb-approves-57-4-million-to-expand-rooftop-solar-and-virtual-net-metering-in-sri-lanka/","2026-06-26")
SN1=SQ("sq_sn_500","Senegal launches 500 MW solar tender with battery storage","https://solarquarter.com/2026/03/06/senegal-launches-500-mw-solar-tender-with-battery-storage-to-accelerate-clean-energy-transition/","2026-03-06")
SNF=TG("sn","Senegal","senegal","trade-financing","trade financing","2026-03-30")
BW1=SQ("sq_bw_bpc","Botswana Power Corporation launches tender for seven solar PV projects","https://solarquarter.com/2023/02/13/botswana-power-corporation-launches-tender-for-seven-solar-pv-projects/","2023-02-13")

COUNTRIES = [
c("AU",
  "Australia underwrites new generation and storage through Capacity Investment Scheme tenders, including in Western Australia, and is reforming distribution planning to cut rooftop solar curtailment. Offshore wind has a licensing framework with financial security rules, and a developer rating scheme started in 2026.",
  U=[("S","m","The federal Capacity Investment Scheme runs tenders for generation and storage, including two Western Australian rounds opened in 2025.",["sq_au_wa"]),
     ("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),
     ("M","l","Rooftop solar is curtailed on distribution networks, and a reform proposes 20-year network plans to reduce it.",["sq_au_dnsp"]),
     ("S","l","Tender rounds, an offshore wind licensing framework and a developer rating scheme show a steady policy direction.",["sq_au_wa","ap_au_osw","sq_au_rating"])],
  Ud=("i","Grid planning reform aims to cut curtailment, and new tenders keep opening.",["sq_au_dnsp","sq_au_wa"]),
  C=[("S","l","One in three households has rooftop solar, the highest uptake in the world.",["sq_au_sunshot"]),("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),
     ("M","l","Rooftop solar faces curtailment on local networks.",["sq_au_dnsp"]),("N",None,None,[])],
  Cd=("i","Distribution planning reform targets rooftop curtailment.",["sq_au_dnsp"]),
  gaps="Foreign investment review, contract terms under the scheme and connection times were not covered by the sources reviewed, so the ownership gate is not rated.",
  events=[("2024-12","law","mixed","Offshore wind rules amended to require financial security from licence holders",["utility"],["ap_au_osw"]),
          ("2025-08","auction","positive","Two Capacity Investment Scheme tenders open in Western Australia",["utility"],["sq_au_wa"]),
          ("2025-09","other","positive","Second round of the Solar Sunshot manufacturing programme opens",["utility","ci"],["sq_au_sunshot"]),
          ("2026-04","grid","positive","Grid planning reform proposed to cut rooftop solar curtailment",["ci"],["sq_au_dnsp"]),
          ("2026-07","other","positive","Developer Rating Scheme launched to build community trust",["utility"],["sq_au_rating"])],
  sources=[AU1,AU2,AU3,AU4,AU5]),

c("TR",
  "Türkiye allocates wind and solar capacity through YEKA competitions, with 1,150 MW of wind awarded in December 2025 at 3.50 euro cents per kWh plus a fee paid to the state, and targets 54.7% renewable generation by 2035. The lira is convertible.",
  U=[("S","m","YEKA competitions allocate grid capacity, with 1,150 MW of wind awarded across five provinces in 2025.",["fb_tr_yeka"]),
     ("M","l","Winning bids are priced in euro cents per kWh, but bidders also pay a capacity fee per MW to the state.",["fb_tr_yeka"]),
     ("N",None,None,[]),
     ("S","l","The lira is fully convertible, with declaration rules on carrying cash out.",["tgtrtr"]),
     ("N",None,None,[]),
     ("S","l","The government targets 54.7% renewable generation by 2035.",["sq_tr_2035"])],
  Ud=("i","New capacity allocation rounds are planned from 2026.",["fb_tr_yeka"]),
  C=C_own("S","The lira is fully convertible.",["tgtrtr"]), Cd=STABLE,
  gaps="Buyer credit, connection times and corporate PPA rules were not covered by the sources reviewed.",
  events=[("2025-12-09","auction","positive","YEKA wind competitions award 1,150 MW at 3.50 euro cents per kWh",["utility"],["fb_tr_yeka"]),
          ("2026-07","plan","positive","Target set for 54.7% renewable generation by 2035",["utility","ci"],["sq_tr_2035"])],
  sources=[TR1,TR2,TRF]),

c("NL",
  "The Netherlands kept net metering for home solar after a 2024 Senate vote and is moving offshore wind tenders to a two-way support scheme approved by the EU in 2026. Grid congestion is the main barrier, with capacity allocated first come first served.",
  U=[("S","m","Offshore wind is tendered, and a €10 billion scheme approved in November 2026 supports 2 GW through competitive tenders.",["et_nl_osw"]),
     ("N",None,None,[]),("N",None,None,[]),
     ("S","l","There are no foreign exchange controls.",["tgnltr"]),
     ("U","m","The grid is congested in large areas, and capacity is allocated first come first served, with priority rules for public interest projects.",["cmsnl"]),
     ("S","l","No retroactive change was found, and net metering was extended.",["sq_nl_nem"])],
  Ud=("i","New offshore wind support was approved in 2026.",["et_nl_osw"]),
  C=[("S","l","Net metering for home solar was kept after the Senate vote in February 2024.",["sq_nl_nem"]),("N",None,None,[]),("N",None,None,[]),
     ("S","l","No foreign exchange controls.",["tgnltr"]),("U","m","Grid congestion limits new connections.",["cmsnl"]),("S","l","Net metering was extended.",["sq_nl_nem"])],
  Cd=STABLE,
  gaps="Onshore support terms and buyer credit were not covered by the sources reviewed.",
  events=[("2024-02","tariff","positive","Senate keeps net metering for home solar",["ci"],["sq_nl_nem"]),
          ("2026-11","other","positive","EU approves a €10 billion Dutch offshore wind support scheme for 2 GW",["utility"],["et_nl_osw"])],
  sources=[NL1,NL2,NLC,NLF]),

c("BE",
  "Belgium is building its first offshore wind farm in the Princess Elisabeth Zone with €2.04 billion of state support approved in 2026. Onshore wind permits in Flanders were disrupted by court rulings, and capital moves freely.",
  U=[("S","m","Offshore wind gets state support, with €2.04 billion approved for a 735 MW project in November 2026.",["sq_be_osw"]),
     ("N",None,None,[]),("N",None,None,[]),
     ("S","l","There are no restrictions on moving capital or profits.",["tgbetr"]),
     ("M","l","Court rulings on environmental assessment temporarily halted onshore wind permits in Flanders.",["cmsbe"]),
     ("M","l","Wallonia raised its wind target, but permit rules have been in flux.",["cmsbe"])],
  Ud=("i","Offshore wind support was approved in 2026.",["sq_be_osw"]),
  C=C_own("S","No restrictions on moving capital or profits.",["tgbetr"]), Cd=STABLE,
  gaps="Onshore support, PPA terms and buyer credit were not covered by the sources reviewed.",
  events=[("2026-11","other","positive","EU approves €2.04 billion support for a 735 MW offshore wind farm",["utility"],["sq_be_osw"])],
  sources=[BE1,BEC,BEF]),

c("ZM",
  "Zambia targets 10,000 MW of generation by 2031 and has added capacity quickly since 2024, with the utility ZESCO tendering solar plants to independent producers. Funds can be moved out of the country easily.",
  U=[("S","l","ZESCO has tendered solar plants to independent producers, and capacity rose from 3,777 MW in 2024 to 4,722 MW.",["sq_zm_zesco","sq_zm_10gw"]),
     ("N",None,None,[]),("N",None,None,[]),
     ("S","l","Accounts may be held in foreign currency, and funds are easily transferred out of the country.",["tgzmtr"]),
     ("N",None,None,[]),
     ("S","l","Reforms support a 10,000 MW target for 2031.",["sq_zm_10gw"])],
  Ud=("i","Energy reforms are boosting new capacity.",["sq_zm_10gw"]),
  C=C_own("S","Funds are easily transferred out of the country.",["tgzmtr"]), Cd=STABLE,
  gaps="PPA terms, ZESCO's payment record and grid access were not covered by the sources reviewed.",
  events=[("2022-08","auction","positive","ZESCO invites producers for 50 MW of solar plants",["utility"],["sq_zm_zesco"]),
          ("2026-10","plan","positive","Government targets 10,000 MW of capacity by 2031",["utility"],["sq_zm_10gw"])],
  sources=[ZM1,ZM2,ZMF]),

c("JO",
  "Jordan lifted its 2019 ban on large renewable projects using wheeling or net metering above 1 MW in 2024, alongside new grid connection rules. Foreign investors may remit capital and profits in convertible currency.",
  U=[("M","m","The ban on new large projects using wheeling or net metering was lifted in 2024 under new connection rules.",["sq_jo_ban"]),
     ("N",None,None,[]),("N",None,None,[]),
     ("S","m","Foreign investors may remit capital and returns abroad in fully convertible currency.",["tgjotr"]),
     ("N",None,None,[]),
     ("M","l","The 2019 freeze on large projects lasted five years before it was lifted.",["sq_jo_ban"])],
  Ud=("i","Large projects can apply again from 2024.",["sq_jo_ban"]),
  C=[("S","l","Wheeling and net metering above 1 MW are allowed again under the 2024 rules.",["sq_jo_ban"]),("N",None,None,[]),("N",None,None,[]),
     ("S","m","Capital and profits can be remitted abroad.",["tgjotr"]),("N",None,None,[]),("M","l","Rules were frozen from 2019 to 2024.",["sq_jo_ban"])],
  Cd=("i","Wheeling routes reopened in 2024.",["sq_jo_ban"]),
  gaps="Contract terms, buyer credit and connection capacity were not covered by the sources reviewed.",
  events=[("2024-09","law","positive","Cabinet lifts the 2019 ban on large wheeling and net metering projects",["utility","ci"],["sq_jo_ban"])],
  sources=[JO1,JOF]),

c("TN",
  "Tunisia launched a fifth bidding round and a new feed-in tariff that applies to current and past projects, after years of slow delivery under earlier programmes. Profits can be repatriated freely.",
  U=[("S","l","A fifth bidding round has been launched with a new feed-in tariff structure.",["ae_tn_fit"]),
     ("N",None,None,[]),("N",None,None,[]),
     ("S","l","Foreign investors may freely repatriate profits and sale proceeds, and the dinar is convertible for current transactions.",["tgtntr"]),
     ("N",None,None,[]),
     ("M","l","The new tariff applies to past projects too, and the government needs to persuade investors that delivery will improve.",["ae_tn_fit"])],
  Ud=("i","New tenders and tariffs were announced.",["ae_tn_fit"]),
  C=C_own("S","Profits can be repatriated freely.",["tgtntr"]), Cd=STABLE,
  gaps="Contract length, the utility's payment record and grid capacity were not covered by the sources reviewed.",
  events=[("2026","tariff","mixed","New feed-in tariff structure applies to current and past projects",["utility"],["ae_tn_fit"])],
  sources=[TN1,TNF]),

c("UZ",
  "Uzbekistan tenders power projects to private developers under concessions and is guaranteed by law to let foreign investors move funds in and out. Solar and hydro projects are being built with foreign partners.",
  U=[("S","l","The Ministry of Energy tenders projects to private developers to build, own and operate under concessions.",["ap_uz_hydro"]),
     ("N",None,None,[]),("N",None,None,[]),
     ("S","l","Foreign investors are formally guaranteed to transfer funds in foreign currency without limitation.",["tguztr"]),
     ("N",None,None,[]),("N",None,None,[])],
  Ud=("s","No change was found.",[]),
  C=C_own("S","Transfers of foreign currency are guaranteed by law.",["tguztr"]), Cd=STABLE,
  gaps="PPA terms, buyer credit, grid and rule stability were not covered by the sources reviewed.",
  events=[("2023-08","auction","positive","Tender for five private hydropower projects of 46.6 MW",["utility"],["ap_uz_hydro"])],
  sources=[UZ1,UZF]),

c("IE",
  "Ireland supports small renewable projects with a guaranteed premium tariff without auction since 2024, and capital and profits can be repatriated freely.",
  U=[("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),
     ("S","l","There are no restrictions on inward investment or repatriating capital and profits.",["tgietr"]),
     ("N",None,None,[]),("N",None,None,[])],
  Ud=("s","No change was found.",[]),
  C=[("S","m","Small-scale projects get a guaranteed premium tariff without auction, €150 per MWh for solar under 1 MW.",["sq_ie_sres"]),
     ("S","l","The scheme sets a fixed price for renewable certificates.",["sq_ie_sres"]),("N",None,None,[]),
     ("S","l","No restrictions on repatriating capital and profits.",["tgietr"]),("N",None,None,[]),("N",None,None,[])],
  Cd=("i","The second phase of the small-scale scheme opened in 2024.",["sq_ie_sres"]),
  gaps="Utility-scale auction terms, grid connection and permitting were not covered by the sources reviewed.",
  events=[("2024-05","tariff","positive","Second phase of the Small-Scale Renewable Electricity Support Scheme opens",["ci"],["sq_ie_sres"])],
  sources=[IE1,IEF]),

c("KZ",
  "Kazakhstan runs scheduled renewable auctions, 1,810 MW in 2025, and lets non-residents transfer dividends freely. It may still miss its 15% renewable target for 2030.",
  U=[("S","m","The Ministry of Energy approved a 2025 auction schedule for 1,810 MW of renewables.",["sq_kz_auc"]),
     ("N",None,None,[]),("N",None,None,[]),
     ("S","m","IMF commitments prohibit restrictions on conversion or repatriation of profits, and non-residents can transfer dividends freely.",["tgkztr"]),
     ("N",None,None,[]),
     ("M","l","The 2030 target was raised to 15% in 2021, but analysts expect it may be missed.",["ap_kz_miss"])],
  Ud=("i","Auctions are scheduled each year.",["sq_kz_auc"]),
  C=C_own("S","Dividends can be transferred freely.",["tgkztr"]), Cd=STABLE,
  gaps="PPA terms, buyer credit and grid access were not covered by the sources reviewed.",
  events=[("2025-02","auction","positive","2025 renewable auction schedule approved for 1,810 MW",["utility"],["sq_kz_auc"])],
  sources=[KZ1,KZ2,KZF]),

c("KW",
  "Kuwait tenders large solar projects through its partnership authority, including the 500 MW Shagaya phase III in 2025, and set out a three-year power sector roadmap in 2026.",
  U=[("S","l","The partnership authority and the electricity ministry tendered the 500 MW Al Dibdibah Shagaya phase III solar project.",["sq_kw_shag"]),
     ("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),
     ("S","l","A three-year roadmap to expand renewables was presented in 2026.",["sq_kw_road"])],
  Ud=("i","More solar is being tendered.",["sq_kw_shag"]),
  C=N6, Cd=STABLE,
  gaps="Foreign ownership rules, PPA terms and grid access were not covered by the sources reviewed.",
  events=[("2025-11","auction","positive","Bidding opens for the 500 MW Shagaya phase III solar project",["utility"],["sq_kw_shag"]),
          ("2026-01","plan","positive","Three-year roadmap to strengthen the power sector and add renewables",["utility"],["sq_kw_road"])],
  sources=[KW1,KW2]),

c("QA",
  "Qatar's solar build-out is projected to raise renewables to about 26% of power capacity by 2035, with natural gas still central.",
  U=[("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),
     ("S","l","Qatar is planning solar to reach about 25.9% of power capacity by 2035.",["sq_qa_2035"])],
  Ud=("i","Solar expansion is planned.",["sq_qa_2035"]),
  C=N6, Cd=STABLE,
  gaps="Procurement routes, ownership rules and contract terms were not covered by the sources reviewed.",
  events=[("2026-10","plan","positive","Renewables projected at 25.9% of power capacity by 2035",["utility"],["sq_qa_2035"])],
  sources=[QA1]),

c("IL",
  "Israel offers fixed tariffs through tenders, including a 23-year tariff for agrivoltaic projects, and abolished most foreign exchange controls in the 1990s.",
  U=[("S","l","Tenders award fixed tariffs, such as the 2022 agrivoltaic tender.",["sq_il_agri"]),
     ("S","l","The agrivoltaic tender pays a fixed tariff for 23 years.",["sq_il_agri"]),
     ("N",None,None,[]),
     ("S","l","Israel abolished most of its foreign exchange controls in the 1990s.",["tgiltr"]),
     ("N",None,None,[]),("N",None,None,[])],
  Ud=("s","No change was found.",[]),
  C=C_own("S","Most foreign exchange controls were abolished.",["tgiltr"]), Cd=STABLE,
  gaps="Grid connection, buyer credit and rule stability were not covered by the sources reviewed.",
  events=[("2022-01","auction","positive","100 MW agrivoltaic tender offers a 23-year fixed tariff",["utility"],["sq_il_agri"])],
  sources=[IL1,ILF]),

c("DZ",
  "Algeria tenders large solar programmes, 1 GW in 2022 and 3.2 GW under way from 2025, but barriers to moving money out of the country remain a challenge for investors.",
  U=[("S","l","Private investors were invited to build 50 to 300 MWp plants in a 1 GW tender, and a 3.2 GW programme began in 2025.",["sq_dz_1gw","mi_dz_32"]),
     ("N",None,None,[]),("N",None,None,[]),
     ("U","l","The government tightly controls foreign exchange, and barriers to outward transfers pose challenges for investors.",["tgdztr"]),
     ("N",None,None,[]),("N",None,None,[])],
  Ud=("i","The 3.2 GW programme is being rolled out across 12 provinces.",["mi_dz_32"]),
  C=C_own("U","Outward transfers face barriers.",["tgdztr"]), Cd=STABLE,
  flags=[("money_exit","active",["utility","ci"],"The government tightly controls foreign exchange, and investors report barriers to outward transfers.",["tgdztr"])],
  gaps="PPA terms, buyer credit and foreign ownership rules for power were not covered by the sources reviewed.",
  events=[("2022-01","auction","positive","Tender for 1 GW of private solar plants across 11 sites",["utility"],["sq_dz_1gw"]),
          ("2025-03","other","positive","Construction starts on a 3.2 GW solar programme across 12 provinces",["utility"],["mi_dz_32"])],
  sources=[DZ1,DZ2,DZF]),

c("KH",
  "Cambodia's utility-scale solar grew faster than planned to about 1.5 GW, beating targets set for 2030 and 2035, and project bonds now help finance it. Rooftop solar growth faces policy roadblocks.",
  U=[("S","l","Large utility solar projects have grown faster than expected, reaching about 1.5 GW.",["sq_kh_roof"]),
     ("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),
     ("S","l","A 2025 framework lets companies raise long-term bonds for infrastructure.",["sq_kh_bond"])],
  Ud=("i","Project bond financing is growing.",["sq_kh_bond"]),
  C=[("M","l","Rooftop solar growth faces policy roadblocks.",["sq_kh_roof"]),("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),("N",None,None,[])],
  Cd=STABLE,
  gaps="Ownership rules, PPA terms and the utility's payment record were not covered by the sources reviewed.",
  events=[("2026-06","other","positive","Installed solar reaches about 1.5 GW, beating 2030 and 2035 goals",["utility"],["sq_kh_roof"]),
          ("2026-11-16","other","positive","Record US$99 million green bond listed for a 350 MW solar project",["utility"],["sq_kh_bond"])],
  sources=[KH1,KH2]),

c("LK",
  "Sri Lanka is expanding rooftop solar and introducing virtual net metering with Asian Development Bank financing approved in 2026.",
  U=N6, Ud=("s","No change was found.",[]),
  C=[("S","l","Rooftop solar aggregation and virtual net metering are being expanded with ADB support.",["sq_lk_adb"]),("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),("N",None,None,[]),("N",None,None,[])],
  Cd=("i","Virtual net metering is being introduced.",["sq_lk_adb"]),
  gaps="Utility procurement, ownership rules and the utility's payment record were not covered by the sources reviewed.",
  events=[("2026-06","other","positive","ADB approves US$57.4 million for rooftop solar and virtual net metering",["ci"],["sq_lk_adb"])],
  sources=[LK1]),

c("SN",
  "Senegal's utility Senelec tendered 500 MW of solar with battery storage in 2026, and the CFA franc is freely convertible with no exchange controls since 1998.",
  U=[("S","l","Senelec launched a 500 MW solar tender with battery storage in 2026.",["sq_sn_500"]),
     ("N",None,None,[]),("N",None,None,[]),
     ("S","l","Foreign exchange controls were lifted in 1998, and the CFA franc is freely convertible through banks.",["tgsntr"]),
     ("N",None,None,[]),("N",None,None,[])],
  Ud=("i","A large solar and storage tender is under way.",["sq_sn_500"]),
  C=C_own("S","No foreign exchange controls.",["tgsntr"]), Cd=STABLE,
  gaps="PPA terms, Senelec's payment record and grid capacity were not covered by the sources reviewed.",
  events=[("2026-03","auction","positive","Senelec tenders 500 MW of solar with battery storage",["utility"],["sq_sn_500"])],
  sources=[SN1,SNF]),

c("BW",
  "Botswana Power Corporation tendered seven solar projects in 2023 to cut reliance on imports, but the tender was open only to companies wholly owned by Botswana citizens.",
  U=[("S","l","The utility tendered seven solar PV projects in 2023.",["sq_bw_bpc"]),
     ("N",None,None,[]),("N",None,None,[]),
     ("U","l","The 2023 tender was restricted to firms 100% owned by Botswana citizens.",["sq_bw_bpc"]),
     ("N",None,None,[]),("N",None,None,[])],
  Ud=("s","No change was found.",[]),
  C=N6, Cd=STABLE,
  gaps="Whether other tenders allow foreign ownership, contract terms and currency rules were not covered by the sources reviewed.",
  events=[("2023-02","auction","mixed","Utility tenders seven solar projects, open only to citizen-owned firms",["utility"],["sq_bw_bpc"])],
  sources=[BW1]),
]
