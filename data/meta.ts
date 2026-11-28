// Dataset metadata. Bump DATA_VERSION and add a changelog entry whenever /data changes.
export const DATA_VERSION = "2026.11.7";

/** The date the dataset was last compiled. "Last 30 days" style stats are measured from here. */
export const DATA_AS_OF = "2026-11-28";

export const changelog: { version: string; date: string; changes: string[] }[] = [
  {
    version: "2026.11.7",
    date: "2026-11-28",
    changes: [
      "6 new deals from 26 to 27 November 2026, including financial close for Statera's Exeter battery and Lyra Energy's Noko solar plant.",
      "Policy Reviews for 20 more markets across Europe, North America, Japan, New Zealand and the UAE, from 2026 legal guides and US government country guides.",
    ],
  },
  {
    version: "2026.11.6",
    date: "2026-11-26",
    changes: [
      "PROFITS scores are replaced by the Policy Review, with researched verdicts for utility-scale and C&I deals, six investor questions, red flags and sources.",
      "First reviews published for Singapore, Vietnam, the Philippines, Malaysia, Thailand, Indonesia, South Korea and Taiwan. Other countries show Not yet reviewed.",
    ],
  },
  {
    version: "2026.11.5",
    date: "2026-11-26",
    changes: [
      "47 new deals from 9 to 26 November 2026, found across press-release wires, energy news sites and lenders' own announcements. Each deal page links to the news it came from.",
      "Deals are now kept for a rolling five years, and older records are deleted automatically every day.",
      "Removed the Projects section.",
    ],
  },
  {
    version: "2026.11.4",
    date: "2026-11-11",
    changes: [
      "PROFITS scores for 195 countries, computed from World Bank governance and development indicators, IRENA statistics and the deal record. The policy heatmap is back.",
      "68 deals from company press releases (January to October 2026), with project details and context written in our own words and a link to each release.",
    ],
  },
  {
    version: "2026.11.3",
    date: "2026-11-11",
    changes: [
      "Removed all sample projects, deals, research and placeholder policy scores.",
      "Added 404 renewable energy financings from development lenders' published IATI data (ADB, EIB, BII, AFD, AfDB, GCF, IDB).",
      "Region pages now use official IRENA statistics. The home globe shows each country's renewable share of electricity.",
    ],
  },
  {
    version: "2026.11.2",
    date: "2026-11-11",
    changes: [
      "Added global installed renewable capacity by technology, 2000 to 2025, from IRENA via Our World in Data.",
      "Added the US EIA International Energy Outlook 2023 projections of world renewable capacity to 2050, in three scenarios.",
      "Added official IRENA capacity and generation statistics for 224 countries, 2000 to 2025, with a page for every country.",
      "Added 102 real World Bank renewable energy financings (2015 to 2024) in 54 countries, each linked to its official project page.",
    ],
  },
  {
    version: "2026.11.1",
    date: "2026-11-11",
    changes: [
      "Refocused on deals and investment, with news items removed.",
      "Added 20 sample deals (45 in total) and recent milestones to 17 sample projects.",
      "Added PROFITS policy scores for 40 countries (illustrative placeholders).",
    ],
  },
  {
    version: "2026.11.0",
    date: "2026-11-10",
    changes: [
      "First beta release.",
      "62 sample projects, 25 sample deals, 25 sample news items and 12 sample research items (news later removed).",
      "All records are illustrative sample data.",
    ],
  },
];
