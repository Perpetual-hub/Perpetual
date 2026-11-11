// PROFITS: Perpetual's framework for how investable a country is for renewable energy,
// seen the way an investor would. Seven pillars, each scored 1–5, then weighted.
//
// SAMPLE DATA. The country scores below are ILLUSTRATIVE PLACEHOLDERS generated to test the
// design. They are not an assessment of any country. Replace them with researched scores
// (and sources) before publishing; every record carries isSample: true until then.

export const PILLARS = [
  {
    id: "P",
    name: "Political & Policy",
    question: "Does the government actually want renewables, and will that last?",
    checks: [
      "Renewable targets (NDC, national power plan)",
      "Whether targets are in law or just stated",
      "Policy stability when governments change",
      "Any history of changing terms after the fact",
      "Fossil fuel subsidies",
    ],
  },
  {
    id: "R",
    name: "Regulatory & Legal",
    question: "Can you build, own and get paid under clear rules?",
    checks: [
      "PPA framework (FiT, auctions, direct corporate PPAs)",
      "Permitting time",
      "Foreign ownership limits",
      "Land rights",
      "Dispute settlement (local courts or international arbitration)",
      "Whether contracts are honoured",
    ],
  },
  {
    id: "O",
    name: "Offtake & Market",
    question: "Who buys the power, and can they pay?",
    checks: [
      "Power demand growth",
      "Credit strength of the state utility",
      "How tariffs are set",
      "Demand for corporate PPAs and RECs",
      "Whether private sellers can sell to customers directly",
    ],
  },
  {
    id: "F",
    name: "Financial & Macro",
    question: "Can the project be financed, and does the money hold its value?",
    checks: [
      "Sovereign credit rating",
      "Currency risk and convertibility",
      "USD or local-currency tariffs",
      "Local interest rates",
      "Access to DFI and green financing",
      "Tax incentives",
    ],
  },
  {
    id: "I",
    name: "Infrastructure & Implementation",
    question: "Can the grid take the power, and can projects actually get built and run?",
    checks: [
      "Solar and wind resource quality",
      "Grid capacity and curtailment",
      "Time to get a grid connection",
      "Transmission plans and storage rules",
      "Local EPC and O&M providers, supply chain, skilled workers",
    ],
  },
  {
    id: "T",
    name: "Track Record & Transactions",
    question: "Has anyone already made money here?",
    checks: [
      "Capacity installed so far",
      "Projects finished vs announced",
      "M&A and refinancing activity",
      "Foreign investors present",
      "Exits that worked",
    ],
  },
  {
    id: "S",
    name: "Social & Environmental",
    question: "Will local people and the wider environment accept the projects?",
    checks: [
      "Community acceptance",
      "Land acquisition disputes",
      "Environmental permit rules",
      "Local content rules",
      "Public view of energy prices",
    ],
  },
] as const;

export type PillarId = (typeof PILLARS)[number]["id"];

/** Weight presets by deal type. Weights are relative; they are normalised when scoring. */
export const WEIGHT_PRESETS: { id: string; label: string; description: string; weights: Record<PillarId, number> }[] = [
  {
    id: "balanced",
    label: "Balanced",
    description: "Every pillar counts the same.",
    weights: { P: 1, R: 1, O: 1, F: 1, I: 1, T: 1, S: 1 },
  },
  {
    id: "utility",
    label: "Utility-scale IPP",
    description: "Regulation, offtake and finance decide whether you get paid; the grid matters more at scale.",
    weights: { P: 1, R: 2, O: 2, F: 2, I: 1.5, T: 1, S: 0.75 },
  },
  {
    id: "ci",
    label: "C&I / rooftop",
    description: "Commercial and industrial deals live or die on the buyer, so offtake counts most.",
    weights: { P: 0.75, R: 1.5, O: 2.5, F: 1.5, I: 0.75, T: 1, S: 0.75 },
  },
];

/** Deal-breakers fail a country whatever its total score. */
export const DEAL_BREAKERS = [
  { id: "fx", title: "Currency Convertibility", label: "Currency cannot be converted or profits taken out of the country" },
  { id: "retroactive", title: "Retroactive Changes", label: "Contracts changed after the fact, with no fix" },
  { id: "ownership", title: "Foreign Ownership", label: "Foreign owners cannot hold a controlling stake" },
] as const;

export type DealBreakerId = (typeof DEAL_BREAKERS)[number]["id"];

export interface CountryPolicy {
  /** ISO 3166-1 alpha-2. */
  country: string;
  isSample: boolean;
  scores: Record<PillarId, number>;
  dealBreakers: DealBreakerId[];
  assessedAt: string;
  sources: { publisher: string; title: string; url: string; retrievedAt: string }[];
}

// Illustrative placeholder scores: derived from a fixed hash of the country code, so they
// carry no judgement about any real country. Countries are those with sample projects.
const SAMPLE_COUNTRIES = [
  "ZA", "VN", "CL", "IN", "US", "MA", "AU", "EG", "PT", "BR", "KZ", "ID", "GB", "DE", "PL", "AR", "KE", "CN", "TW", "NP",
  "LA", "NO", "ET", "PE", "CA", "TJ", "PH", "JP", "AE", "IS", "NZ", "OM", "ES", "NL", "NA", "FI", "TH", "GH", "FR", "KR",
];

function placeholderScore(country: string, pillar: string): number {
  let h = 2166136261;
  for (const ch of `${country}:${pillar}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const u = ((h >>> 0) % 1000) / 1000; // 0–1
  return Math.round((1.5 + u * 3.5) * 2) / 2; // 1.5–5.0 in half steps
}

export const countryPolicies: CountryPolicy[] = SAMPLE_COUNTRIES.map((country) => ({
  country,
  isSample: true,
  scores: Object.fromEntries(PILLARS.map((p) => [p.id, placeholderScore(country, p.id)])) as Record<PillarId, number>,
  dealBreakers: [],
  assessedAt: "2026-11-10",
  sources: [
    {
      publisher: "Perpetual sample data",
      title: "Illustrative placeholder scores (not an assessment)",
      url: "#sample",
      retrievedAt: "2026-11-10",
    },
  ],
}));
