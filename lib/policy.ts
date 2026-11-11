// Scoring helpers for the PROFITS policy framework (see data/policy.ts).
import { z } from "zod";
import { DEAL_BREAKERS, PILLARS, WEIGHT_PRESETS, countryPolicies, type CountryPolicy, type PillarId } from "@/data/policy";

export { DEAL_BREAKERS, PILLARS, WEIGHT_PRESETS };
export type { CountryPolicy, PillarId };

const pillarIds = PILLARS.map((p) => p.id) as [PillarId, ...PillarId[]];
const schema = z.object({
  country: z.string().regex(/^[A-Z]{2}$/),
  isSample: z.boolean(),
  scores: z.record(z.enum(pillarIds), z.number().min(1).max(5)),
  dealBreakers: z.array(z.enum(DEAL_BREAKERS.map((d) => d.id) as [string, ...string[]])),
  assessedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sources: z.array(z.object({ publisher: z.string(), title: z.string(), url: z.string(), retrievedAt: z.string() })).min(1),
});

// Validate at module load so a broken score fails the build with a clear message.
for (const c of countryPolicies) {
  const r = schema.safeParse(c);
  if (!r.success) throw new Error(`data/policy.ts › ${c.country}: ${r.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
  for (const p of pillarIds) if (c.scores[p] == null) throw new Error(`data/policy.ts › ${c.country}: missing pillar ${p}`);
}

export function getCountryPolicies(): CountryPolicy[] {
  return countryPolicies;
}
export function getCountryPolicy(code: string): CountryPolicy | undefined {
  return countryPolicies.find((c) => c.country === code.toUpperCase());
}


export { weightedScore, rankPolicies } from "./policy-score";

/** Rows for the client: scores plus display names. */
export function getPolicyRows(nameOf: (code: string) => string) {
  return countryPolicies.map((c) => ({
    country: c.country,
    name: nameOf(c.country),
    scores: c.scores,
    dealBreakers: c.dealBreakers as string[],
    isSample: c.isSample,
  }));
}
