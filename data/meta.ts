// Dataset metadata. Bump DATA_VERSION and add a changelog entry whenever /data changes.
export const DATA_VERSION = "2026.11.4";

/** The date the dataset was last compiled. "Last 30 days" style stats are measured from here. */
export const DATA_AS_OF = "2026-11-11";

export const changelog: { version: string; date: string; changes: string[] }[] = [
  {
    version: "2026.11.4",
    date: "2026-11-11",
    changes: [
      "PROFITS scores for 195 countries, computed from World Bank governance and development indicators, IRENA statistics and the deal record. The policy heatmap is back.",
      "24 deals from company press releases (August to October 2026), with project details and context written in our own words and a link to each release.",
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
      "Refocused on deals and investment: news items removed.",
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
