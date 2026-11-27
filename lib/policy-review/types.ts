// Perpetual Policy Review: data model. One JSON file per country in content/policy/countries.
// Verdicts are never stored; they are worked out from the ratings (see verdict.ts).
import { z } from "zod";

export const QUESTIONS = [
  { id: "access", n: 1, short: "Market access", ask: "Can you sell the power?" },
  { id: "terms", n: 2, short: "Revenue terms", ask: "Are the terms bankable?" },
  { id: "buyer", n: 3, short: "Buyer and payment", ask: "Will the buyer pay?" },
  { id: "ownership", n: 4, short: "Ownership and money", ask: "Can a foreign investor own it and take money home?" },
  { id: "build", n: 5, short: "Build and connect", ask: "Can it be built and connected on time?" },
  { id: "stability", n: 6, short: "Rule stability", ask: "Will the rules hold?" },
] as const;
export type QuestionId = (typeof QUESTIONS)[number]["id"];
export const GATES: QuestionId[] = ["access", "ownership"];

export const SEGMENTS = [
  { id: "utility", label: "Utility-scale" },
  { id: "ci", label: "C&I" },
] as const;
export type SegmentId = (typeof SEGMENTS)[number]["id"];

const rating = z.enum(["supportive", "mixed", "unsupportive", "not_rated"]);
const confidence = z.enum(["high", "medium", "low"]);
const segment = z.enum(["utility", "ci"]);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const ratingEntry = z.object({
  rating,
  confidence: confidence.optional(),
  reason: z.string().optional(),
  sources: z.array(z.string()).default([]),
});

const segmentEntry = z.object({
  ratings: z.object({
    access: ratingEntry,
    terms: ratingEntry,
    buyer: ratingEntry,
    ownership: ratingEntry,
    build: ratingEntry,
    stability: ratingEntry,
  }),
  direction: z.object({
    value: z.enum(["improving", "stable", "worsening"]),
    reason: z.string().optional(),
    sources: z.array(z.string()).default([]),
  }),
  override: z.object({ verdict: z.enum(["ready", "workable", "difficult"]), reason: z.string() }).optional(),
});

export const countryReview = z.object({
  country: z.string().regex(/^[A-Z]{2}$/),
  status: z.enum(["reviewed", "draft", "not_reviewed"]),
  /** "desk": built from published legal guides and official documents, without local interviews. */
  basis: z.enum(["desk"]).optional(),
  lastReviewed: isoDate.optional(),
  reviewer: z.string().optional(),
  summary: z.string().optional(),
  /** What the review could not establish from public sources. */
  gaps: z.string().optional(),
  segments: z.object({ utility: segmentEntry, ci: segmentEntry }),
  redFlags: z
    .array(
      z.object({
        type: z.enum(["foreign_control", "money_exit", "retroactive_cut"]),
        status: z.enum(["active", "resolved", "none"]),
        segments: z.array(segment),
        reason: z.string(),
        sources: z.array(z.string()).default([]),
      }),
    )
    .default([]),
  events: z
    .array(
      z.object({
        date: isoDate,
        /** How exact the date is. A year-only event is stored as 1 January of that year. */
        precision: z.enum(["day", "month", "year"]).default("day"),
        kind: z.enum(["law", "decree", "circular", "plan", "auction", "tariff", "grid", "tax", "court", "other"]),
        effect: z.enum(["positive", "negative", "mixed"]),
        title: z.string(),
        segments: z.array(segment),
        sources: z.array(z.string()).default([]),
      }),
    )
    .default([]),
  log: z
    .array(
      z.object({
        date: isoDate,
        segment,
        question: z.string(),
        from: z.string(),
        to: z.string(),
        reason: z.string(),
      }),
    )
    .default([]),
  sources: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        /** Original-language title, when the English title is our translation. */
        originalTitle: z.string().optional(),
        language: z.string().optional(),
        publisher: z.string(),
        url: z.string().url(),
        published: z.string().optional(),
        accessed: isoDate,
        kind: z.enum(["primary", "secondary"]),
        archive: z.string().url().optional(),
      }),
    )
    .default([]),
});

export type CountryReview = z.infer<typeof countryReview>;
export type Rating = z.infer<typeof rating>;
export type RatingEntry = z.infer<typeof ratingEntry>;
export type RedFlag = CountryReview["redFlags"][number];
export type Verdict = "ready" | "workable" | "difficult" | "not_reviewed";
export type Freshness = "current" | "review_due" | "out_of_date";
