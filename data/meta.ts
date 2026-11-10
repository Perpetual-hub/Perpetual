// Dataset metadata. Bump DATA_VERSION and add a changelog entry whenever /data changes.
export const DATA_VERSION = "2026.11.0";

/** The date the dataset was last compiled. "Last 30 days" style stats are measured from here. */
export const DATA_AS_OF = "2026-11-10";

export const changelog: { version: string; date: string; changes: string[] }[] = [
  {
    version: "2026.11.0",
    date: "2026-11-10",
    changes: [
      "First beta release.",
      "62 sample projects, 25 sample deals, 25 sample news items and 12 sample research items.",
      "All records are illustrative sample data.",
    ],
  },
];
