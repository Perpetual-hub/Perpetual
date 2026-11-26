import assert from "node:assert/strict";
import { test } from "node:test";
import type { RatingEntry, RedFlag } from "./types.ts";
import { freshness, verdictFor } from "./verdict.ts";

const r = (rating: RatingEntry["rating"]): RatingEntry => ({ rating, sources: [] });
const set = (a: string, t: string, b: string, o: string, bu: string, s: string) =>
  Object.fromEntries(
    (["access", "terms", "buyer", "ownership", "build", "stability"] as const).map((k, i) => [k, r([a, t, b, o, bu, s][i] as RatingEntry["rating"])]),
  );
const S = "supportive", M = "mixed", U = "unsupportive", N = "not_rated";
const flag = (segments: ("utility" | "ci")[], status: RedFlag["status"] = "active"): RedFlag => ({ type: "retroactive_cut", status, segments, reason: "x", sources: [] });

test("all six Supportive gives Ready", () => assert.equal(verdictFor(set(S, S, S, S, S, S), [], "utility"), "ready"));
test("gates Supportive with three Mixed gives Workable", () => assert.equal(verdictFor(set(S, M, M, S, M, S), [], "utility"), "workable"));
test("market access Mixed, rest Supportive, gives Workable", () => assert.equal(verdictFor(set(M, S, S, S, S, S), [], "utility"), "workable"));
test("ownership Unsupportive gives Difficult", () => assert.equal(verdictFor(set(S, S, S, U, S, S), [], "utility"), "difficult"));
test("two non-gate Unsupportive gives Difficult", () => assert.equal(verdictFor(set(S, U, U, S, S, S), [], "utility"), "difficult"));
test("active red flag on this deal type gives Difficult", () => assert.equal(verdictFor(set(S, S, S, S, S, S), [flag(["utility"])], "utility"), "difficult"));
test("red flag on the other deal type changes nothing", () => assert.equal(verdictFor(set(S, S, S, S, S, S), [flag(["ci"])], "utility"), "ready"));
test("resolved red flag changes nothing", () => assert.equal(verdictFor(set(S, S, S, S, S, S), [flag(["utility"], "resolved")], "utility"), "ready"));
test("market access not rated gives Not yet reviewed", () => assert.equal(verdictFor(set(N, S, S, S, S, S), [], "utility"), "not_reviewed"));
test("three non-gate not rated gives Not yet reviewed", () => assert.equal(verdictFor(set(S, N, N, S, N, S), [], "utility"), "not_reviewed"));
test("Vietnam example: utility Difficult, C&I Workable", () => {
  const vnFlag = flag(["utility"]);
  assert.equal(verdictFor(set(M, U, U, M, M, U), [vnFlag], "utility"), "difficult");
  assert.equal(verdictFor(set(S, M, M, M, M, M), [vnFlag], "ci"), "workable");
});
test("freshness", () => {
  assert.equal(freshness("2026-06-01", "2026-11-26"), "current");
  assert.equal(freshness("2026-04-01", "2026-11-26"), "review_due");
  assert.equal(freshness("2026-01-01", "2026-11-26"), "out_of_date");
});
