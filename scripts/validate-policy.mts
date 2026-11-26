// Checks every Policy Review country file. Runs before each build (npm run validate:policy).
// Errors fail the build; warnings are printed. Ends with a short report of reviews coming due.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { countryReview } from "../lib/policy-review/types.ts";

const dir = join(import.meta.dirname, "..", "content", "policy", "countries");
const today = new Date().toISOString().slice(0, 10);
const errors: string[] = [];
const warnings: string[] = [];
let noArchive = 0;
const due: { iso: string; next: string }[] = [];
const counts = { reviewed: 0, draft: 0, not_reviewed: 0 };

for (const f of readdirSync(dir).filter((x) => x.endsWith(".json")).sort()) {
  const at = (m: string) => `${f}: ${m}`;
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(join(dir, f), "utf8"));
  } catch (e) {
    errors.push(at(`not valid JSON (${(e as Error).message})`));
    continue;
  }
  const parsed = countryReview.safeParse(raw);
  if (!parsed.success) {
    for (const i of parsed.error.issues) errors.push(at(`${i.path.join(".")} ${i.message}`));
    continue;
  }
  const c = parsed.data;
  counts[c.status]++;
  if (f !== `${c.country.toLowerCase()}.json`) errors.push(at(`file name should be ${c.country.toLowerCase()}.json`));
  const ids = new Set(c.sources.map((s) => s.id));
  const kind = new Map(c.sources.map((s) => [s.id, s.kind]));
  if (ids.size !== c.sources.length) errors.push(at("duplicate source ids"));
  for (const s of c.sources) if (!s.archive) noArchive++;

  const checkSources = (where: string, list: string[]) => {
    for (const id of list) if (!ids.has(id)) errors.push(at(`${where} cites unknown source "${id}"`));
  };
  for (const seg of ["utility", "ci"] as const) {
    const s = c.segments[seg];
    for (const [q, r] of Object.entries(s.ratings)) {
      const where = `${seg}.${q}`;
      if (r.rating === "not_rated") continue;
      if (!r.reason) errors.push(at(`${where} has a rating but no reason`));
      if (!r.sources.length) errors.push(at(`${where} has a rating but no source`));
      if (!r.confidence) errors.push(at(`${where} has a rating but no confidence`));
      checkSources(where, r.sources);
      if (r.reason && r.reason.split(/\s+/).length > 30) warnings.push(at(`${where} reason is over 30 words`));
      // Supportive or Unsupportive needs a primary source. A desk review may rest on published legal guides
      // instead, but then its confidence can be at most medium.
      if (c.status === "reviewed" && (r.rating === "supportive" || r.rating === "unsupportive")) {
        const primary = r.sources.some((id) => kind.get(id) === "primary");
        if (!primary && !(c.basis === "desk" && r.confidence !== "high"))
          errors.push(at(`${where} is ${r.rating} without a primary source`));
      }
    }
    checkSources(`${seg}.direction`, s.direction.sources);
  }
  for (const [i, fl] of c.redFlags.entries()) {
    checkSources(`redFlags[${i}]`, fl.sources);
    if (fl.status === "active" && (!fl.segments.length || !fl.reason || !fl.sources.length))
      errors.push(at(`active red flag ${fl.type} needs deal types, a reason and a source`));
  }
  for (const [i, e] of c.events.entries()) checkSources(`events[${i}]`, e.sources);
  if (c.status !== "not_reviewed") {
    if (!c.lastReviewed) errors.push(at("reviewed or draft file needs lastReviewed"));
    else if (c.lastReviewed > today) errors.push(at("lastReviewed is in the future"));
    else {
      const next = new Date(Date.parse(c.lastReviewed) + 182 * 86400000).toISOString().slice(0, 10);
      due.push({ iso: c.country, next });
      if (next < today) warnings.push(at(`review is older than six months (last ${c.lastReviewed})`));
    }
  }
}

for (const w of warnings) console.warn(`warning  ${w}`);
if (noArchive) console.warn(`warning  ${noArchive} sources have no archive link`);
due.sort((a, b) => a.next.localeCompare(b.next));
console.log(
  `Policy Review: ${counts.reviewed} reviewed, ${counts.draft} draft, ${counts.not_reviewed} not reviewed.` +
    (due.length ? ` Next reviews due: ${due.slice(0, 5).map((d) => `${d.iso} ${d.next}`).join(", ")}` : ""),
);
if (errors.length) {
  for (const e of errors) console.error(`error    ${e}`);
  console.error(`\n${errors.length} policy file error(s).`);
  process.exit(1);
}
