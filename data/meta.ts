// Dataset metadata. Bump DATA_VERSION and add a changelog entry whenever /data changes.
export const DATA_VERSION = "2026.11.2";

/** The date the dataset was last compiled. "Last 30 days" style stats are measured from here. */
export const DATA_AS_OF = "2026-11-10";

export const changelog: { version: string; date: string; changes: string[] }[] = [
  {
    version: "2026.11.2",
    date: "2026-11-11",
    changes: [
      "Added global installed renewable capacity by technology, 2000 to 2025, from IRENA via Our World in Data.",
      "Added the US EIA International Energy Outlook 2023 projections of world renewable capacity to 2050, in three scenarios.",
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
