<!-- Source: the Perpetual Policy Review framework and build plan doc, exported as text. Personal details removed. -->
# Perpetual Policy Review: Framework and Build Plan
2026-11-26

## Summary
The Perpetual Policy Review replaces PROFITS with researched judgements, not a computed score. Each reviewed country gets a verdict for two deal types, utility-scale and C&I: Ready, Workable or Difficult. Every verdict is built from six investor questions, and each answer is rated Supportive, Mixed or Unsupportive, with a reason and a source.
The six questions are the ones an investment committee asks. Can you sell the power? Are the terms bankable? Will the buyer pay? Can a foreign investor own the project and take money home? Can it be built and connected on time? Will the rules hold? Three red flags override everything else, and an arrow shows whether policy is getting better or worse.
Coverage starts narrow: eight Asia-Pacific markets reviewed in depth, starting with the ones you already work on. Every other country keeps its data pages but shows "Not yet reviewed" instead of a score.
The last section is a build plan Claude Code can follow step by step. It stores each country as a reviewable file, works out verdicts by a fixed rule so they can't drift, and adds country pages, an overview map and a method page. It also removes PROFITS cleanly. One rule runs through it: Claude Code builds the structure but never writes policy facts or ratings from memory.

## At a glance
If you can't sell the power or can't get your money out, the verdict can't be Ready, and any active red flag makes it Difficult. A direction arrow (improving, stable or worsening) sits beside each verdict.

## Design decisions
Every choice below aims at one thing: a page an investor could rely on before an investment committee. Where PROFITS went for breadth and a single number, this framework goes for depth, reasons and sources.
 | 
# | 
Decision | 
Why
 | 
1 | 
A judgement with reasons, not a numeric score | 
A number like 3.4 suggests precision that research can't support. It also hides the trade-offs an investor needs to see. The PROFITS review showed that its number mostly repeated governance data.
 | 
2 | 
Six questions, phrased the way an investor asks them | 
They match the workstreams of real due diligence and the headings of an IC memo. Each one can be answered from laws, contracts and regulator documents.
 | 
3 | 
Three rating levels: Supportive, Mixed, Unsupportive | 
Finer grades can't be applied consistently from desk research. Three levels are easy to explain and hard to argue about.
 | 
4 | 
Separate verdicts for utility-scale and C&I | 
The same country can run good auctions but block corporate PPAs, or the reverse. One verdict would hide that.
 | 
5 | 
Verdicts follow a fixed rule, not an average | 
Deals fail at the weakest link. If you can't sell the power, a good grid doesn't help. A written rule also keeps verdicts consistent across countries and over time.
 | 
6 | 
Three red flags override any verdict | 
Blocked foreign control, blocked profit transfer and unresolved retroactive cuts stop deals in practice, whatever else is true.
 | 
7 | 
A direction-of-travel arrow | 
Investors price the next ten years, not today. A market that is Workable and improving is a different call from one that is Workable and worsening.
 | 
8 | 
Every rating cites a source, primary first | 
"Full disclosure" is Perpetual's promise. A reader should be able to click through to the decree, regulator notice or tender document.
 | 
9 | 
Eight markets in depth, not 195 in outline | 
This is where your edge is. RECAI covers 40 markets with a team of analysts. One person can cover eight well and keep them current.
 | 
10 | 
Dated reviews on a six-month cycle | 
Policy moves fast. A rating without a date can mislead, so every page shows when it was last checked and flags itself when overdue.
 | 
11 | 
Each country stored as a file in the code repository | 
Version history becomes an audit trail of every rating change. Changes can be reviewed before they go live, and no database is needed.
 | 
12 | 
No statistical back-test yet | 
With eight markets, correlations mean little. Instead, each verdict change is logged with its date, so the track record of calls builds over time.
 | 
13 | 
A plain name, no acronym | 
"Policy Review" says what it is. PROFITS's letters forced some pillar names to fit the word.
One choice is deliberately left out: weights. With a rule-based verdict, nothing needs weighting. That removes the hardest part of PROFITS to defend.

## The six questions
Each country is rated on six questions, separately for utility-scale and C&I. The first table says what to check for each deal type. The second says what earns each rating.

### What to check
 | 
Question | 
Utility-scale | 
C&I (rooftop, on-site and corporate PPAs)
 | 
1. Market access: can you sell the power? | 
Auctions, tenders, feed-in tariffs or open wholesale access for new private projects; whether rounds run on a schedule | 
Self-consumption rules; export and net metering; direct or virtual corporate PPAs; green tariffs and certificates
 | 
2. Revenue terms: are the terms bankable? | 
Contract length; currency and indexation; curtailment compensation; change-in-law and termination protection; whether a standard PPA exists | 
Freedom to agree price and length; whether long contracts are enforceable; rules on selling surplus power
 | 
3. Buyer and payment: will the buyer pay? | 
State utility's finances and payment record; payment security such as guarantees, letters of credit or escrow | 
Whether contracts with companies can be enforced through courts or arbitration; any rules that limit who may buy
 | 
4. Ownership and money: can a foreign investor own it and take money home? | 
Foreign ownership limits in power generation; licences; land ownership; currency conversion; dividend and capital transfer | 
Same as utility-scale, plus rules on foreign firms owning rooftop assets on someone else's building
 | 
5. Build and connect: can it be built and connected on time? | 
Grid connection process and typical time; transmission plans; curtailment levels; permits and land | 
Rooftop permits; limits on how much a site may connect; distribution grid rules
 | 
6. Rule stability: will the rules hold? | 
Targets in law or an official plan; any retroactive changes; how often rules change; protection for existing projects | 
Same, plus how often self-consumption and export rules have changed

### What earns each rating
 | 
Question | 
Supportive | 
Mixed | 
Unsupportive
 | 
1. Market access | 
A working route is in force, with implementing rules, and deals are closing through it. For C&I, both on-site and at least one off-site route work. | 
A route exists but is irregular, capped, a pilot, or missing its implementing rules. For C&I, on-site only. | 
No working route for new private projects, or procurement is frozen.
 | 
2. Revenue terms | 
Long contracts (15 years or more for utility-scale) in hard currency or indexed, with curtailment and change-in-law protection. | 
Long contracts with gaps, such as no curtailment compensation or an unindexed local currency. | 
Short or no contracts, or terms the government can change by decree.
 | 
3. Buyer and payment | 
The buyer is creditworthy or backed by a state guarantee or letter of credit, with no recent arrears to private generators. | 
The buyer is weak but paying, and security is available only case by case. | 
Arrears to private generators in the last three years, or no security and weak finances.
 | 
4. Ownership and money | 
Full foreign ownership allowed; free conversion and transfer of profits and capital. | 
Allowed with conditions: approvals, joint ventures for land, ownership caps above 50%, or slow currency conversion. | 
Foreign control blocked or profit transfer restricted. This also raises a red flag.
 | 
5. Build and connect | 
A clear connection process with published timelines, low curtailment and a funded grid plan. | 
A clear process, but slow or congested in key regions, or moderate curtailment. | 
Connection queues stalled, or high curtailment without compensation, or permits routinely blocked.
 | 
6. Rule stability | 
A target in law or an official plan; no retroactive changes in ten years; new rules protect existing projects. | 
Frequent changes or long policy gaps, but existing projects protected; or a retroactive change proposed and not enacted. | 
A retroactive change to operating projects in the last ten years, or a sudden reversal of policy.
When evidence points two ways, rate Mixed and say why in the reason line. When there is not enough evidence to rate, mark the question "Not rated" rather than guess.

## Verdicts, red flags and direction of travel
The verdict for each deal type follows from the six ratings by a fixed rule. Two questions are treated as gates: Market access (1) and Ownership and money (4). If you can't sell the power, or can't own the asset and get paid out, nothing else rescues the deal.

### The verdict rule

Difficult if any red flag is active, or question 1 or 4 is Unsupportive, or two or more questions are Unsupportive.

Ready if there is no red flag, questions 1 and 4 are both Supportive, nothing is Unsupportive, and no more than two questions are Mixed.

Workable in every other case.

Not yet reviewed if question 1 or 4 is not rated, or more than two questions are not rated.
The website works the verdict out from the ratings, so a page can never show a verdict its ratings don't support. A reviewer may override it only by writing a reason, which is shown on the page. Overrides should be rare.

### Red flags
 | 
Red flag | 
Active when | 
Data to check
 | 
Foreign control blocked | 
Foreign investors cannot hold more than 50% of the relevant generation assets | 
Investment law; OECD FDI Index where covered
 | 
Money can't leave | 
Profits or capital cannot be converted or sent abroad, or transfers face systematic long delays | 
IMF AREAER; central bank rules
 | 
Unresolved retroactive cut | 
Terms for operating projects were cut in the last ten years and not restored, settled or compensated | 
Official decisions; UNCTAD ISDS Navigator
A red flag has three states: Active, Resolved or None. It also names the deal types it applies to, with a reason, because a problem in one regime may not reach another. A resolved flag stays visible on the country page as history but no longer forces the verdict. That way a country that fixed a past problem isn't treated like one that never had it, and readers can still see what happened.

### Direction of travel
Each deal type also gets an arrow: Improving, Stable or Worsening. It looks at the last 12 months of dated policy events, plus changes that have been formally published with a start date.

Improving: a rating moved up, or a published change will clearly help a gating question.

Worsening: a rating moved down, or a formally published proposal would hurt existing or new projects.

Stable: neither.
The arrow carries a one-line reason, like every rating. Rumours and speeches don't count; only published laws, decrees, regulator decisions, draft rules open for consultation and tender notices do.

## Evidence and review rules
A rating is only as good as what it rests on, so every rating needs a reason, a source and a date. These rules make the ratings checkable and keep them current.

### Sources

Primary sources come first: the law or decree text, regulator decisions, ministry plans, tender documents, and utility annual reports.

Secondary sources support them: law-firm briefings, development-bank reports and established trade press.

Every rating cites at least one source. A Supportive or Unsupportive rating needs at least one primary source.

Each source records its title, publisher, link, publication date and the date it was checked. Government links often move, so keep an archived copy link too.


### Confidence
 | 
Level | 
When to use it
 | 
High | 
Primary source, and the rule is seen working in practice (for example, deals have closed under it)
 | 
Medium | 
Primary source but untested in practice, or secondary sources only
 | 
Low | 
Sources conflict, or the rule is new and its implementing details are not yet out
Confidence shows next to each rating. It tells readers where the judgement is firm and where it is a first read.

### Reason lines
Each rating and arrow carries one plain sentence of 30 words or fewer. It states a fact and its effect, not an adjective. For example: "Virtual corporate PPAs allowed, but only for buyers using 200,000 kWh a month or more." Not: "Strong support for corporate buyers."

### Review cycle

Full review every six months for each covered country.

Event-driven update within 10 working days of a major change: a new law or decree, an auction result, a retroactive action, or a change to ownership or currency rules.

After six months without review, the page shows "Review due". After nine months, the verdict is greyed out and marked "Out of date".

Every rating change is logged with the date, old and new rating, and the reason. The log is public on the country page.

### Coverage
The first wave is eight markets: Singapore, Vietnam, the Philippines, Malaysia, Thailand, Indonesia, South Korea and Taiwan. These are the markets you already work on or research, so the reviews start from real knowledge. Japan, India and Australia are natural next candidates. Every other country keeps its capacity and deal pages, marked "Not yet reviewed".

## Worked example: Vietnam
Applied to Vietnam, the framework gives Difficult for utility-scale and Workable, improving for C&I. That split is the point of rating deal types separately: the feed-in tariff dispute weighs on utility-scale, while the C&I rules have opened up sharply in 2025 and 2026.
This is a draft built from law-firm and trade-press sources. Under the evidence rules, the decree texts must be attached before it goes live. The latest coverage found of the feed-in tariff dispute is from mid-2026, so check for a final government decision first.

### Utility-scale: Difficult, stable
 | 
Question | 
Rating | 
Reason | 
Confidence
 | 
1. Market access | 
Mixed | 
Feed-in tariffs have ended, and new projects rely on DPPAs or negotiated terms rather than a regular auction (Norton Rose Fulbright). | 
Medium
 | 
2. Revenue terms | 
Unsupportive | 
Standard PPAs carry no curtailment compensation (pv magazine, May 2026), and lack international arbitration and strong termination terms (OECD). | 
Medium
 | 
3. Buyer and payment | 
Unsupportive | 
EVN has withheld part of payments to feed-in tariff projects and applied temporary tariffs below contract rates since January 2025 (The Investor). | 
Medium
 | 
4. Ownership and money | 
Mixed | 
Foreign investors may own up to 100% of power projects, but currency convertibility remains a key lender concern (Chambers 2026). | 
Medium
 | 
5. Build and connect | 
Mixed | 
Solar output in central Vietnam has outrun grid capacity, and transmission investment must grow fivefold to meet targets (pv magazine, May 2026). | 
Medium
 | 
6. Rule stability | 
Unsupportive | 
EVN proposed in April 2026 to cut tariffs by up to 43% retroactively for 173 projects; no final decision found (Gridwatch). | 
Medium
Red flag: unresolved retroactive cut (Active). Payments to about 173 wind and solar projects have been cut or delayed while their feed-in tariff eligibility is reviewed (Chambers 2026). This alone makes the verdict Difficult.
Direction: Stable. A government resolution in January 2026 started a review of the affected projects, but no settlement had been published by mid-2026.

### C&I: Workable, improving
 | 
Question | 
Rating | 
Reason | 
Confidence
 | 
1. Market access | 
Supportive | 
Self-consumption is allowed; physical DPPAs opened to buyers using 20,000 kWh a month from July 2026, down from 200,000 (Watson Farley & Williams). | 
Medium
 | 
2. Revenue terms | 
Mixed | 
DPPA prices are now freely agreed (Allen & Gledhill), but virtual DPPAs carry spot-price exposure and EVN charges (Chambers 2026). | 
Medium
 | 
3. Buyer and payment | 
Mixed | 
Buyers are private and vary; settlement, credit support and minimum consumption commitments remain open questions for lenders (Chambers 2026). | 
Low
 | 
4. Ownership and money | 
Mixed | 
Same as utility-scale: full foreign ownership allowed, convertibility a concern. | 
Medium
 | 
5. Build and connect | 
Mixed | 
EVN may refuse surplus rooftop power wherever it would overload the low- or medium-voltage grid (LNT via Conventus Law). | 
Medium
 | 
6. Rule stability | 
Mixed | 
Rooftop and DPPA rules changed three times between October 2024 and June 2026, all loosening; but the tariff dispute shows existing terms can be reopened. | 
Medium
Red flags: none active for C&I. The tariff dispute concerns feed-in tariff projects, not self-consumption or DPPAs, so it counts against Rule stability here rather than as a red flag.
Direction: Improving. Decree 243 of June 2026 raised the cap on selling surplus rooftop power from 20% to 50% of output (Nation Thailand). It also added data centres and EV charging operators as virtual DPPA buyers (Baker McKenzie).

### What the example shows
C&I misses Ready only because currency convertibility keeps Ownership and money at Mixed. That is the gate rule working as intended: an investor can now sell C&I power in Vietnam far more easily than two years ago, but getting money out still needs care. The judgement call worth noting is the red flag's scope. Each red flag should name the deal types it applies to, with a reason, as it does here.

## Build plan for Claude Code
This section is written for Claude Code to follow. Export this doc as Markdown, save it in your repository as docs/policy-review-spec.md, and start Claude Code with the prompt below. It works through Steps 0 to 11 on a separate branch and stops for your review at the key points.

### Ground rules

No policy content from memory. Claude Code builds structure only. Every rating starts as not_rated until you supply it with sources. The one exception is Step 5, which enters the Vietnam draft from this doc.

New section first, removal last. PROFITS stays live until the new section passes all checks, so the site is never half-broken.

Match the existing site. Reuse the current design system, fonts, colours, map component and page layout. Ask before adding any new dependency.

Leave the data pages alone. Capacity statistics, deal pages and country stats pages are not part of this change.

One commit per step, with a message that names the step.

### Data model
Each reviewed country is one JSON file in content/policy/countries/, named by its two-letter code (for example vn.json). A country with no file, or with status not_reviewed, shows as "Not yet reviewed". The shape:
 | 
Field | 
Allowed values
 | 
status | 
reviewed (live), draft (preview deployments only), not_reviewed
 | 
rating | 
supportive, mixed, unsupportive, not_rated
 | 
confidence | 
high, medium, low
 | 
direction.value | 
improving, stable, worsening
 | 
redFlags[].type | 
foreign_control, money_exit, retroactive_cut
 | 
redFlags[].status | 
active, resolved, none
 | 
events[].kind | 
law, decree, circular, plan, auction, tariff, grid, tax, court, other
 | 
events[].effect | 
positive, negative, mixed
 | 
sources[].kind | 
primary, secondary
The draft status lets you preview a country on a Vercel preview link before it goes live.

### Validation rules
A script, validate:policy, checks every country file and runs as part of the build. These rules fail the build:

The file matches the schema and all values are allowed values.

Every rating other than not_rated has a reason and at least one source id that exists in the file.

In a reviewed file, every Supportive or Unsupportive rating cites at least one primary source.

Every active red flag lists its deal types, a reason and a source.

Every source has a link, a kind and an accessed date.

A reviewed or draft file has a lastReviewed date that is not in the future.

Every override has a reason.
These only print warnings: a reason over 30 words, a review older than six months, and a source without an archive link. The script also prints a short report listing each country's next review date.

### The verdict function
Verdicts are worked out in code, never typed into a file. The function takes one deal type's six ratings plus the red flags and applies the rule in this order: all.filter(x => x.rating === r).length;

  if (flags.some(f => f.status === "active" && f.segments.includes(segment))) return "difficult";
  if (gates.some(g => g.rating === "not_rated") || count("not_rated") > 2) return "not_reviewed";
  if (gates.some(g => g.rating === "unsupportive") || count("unsupportive") >= 2) return "difficult";
  if (gates.every(g => g.rating === "supportive") && count("unsupportive") === 0 && count("mixed") ]]><
If the segment has an override, the page shows the override verdict with its reason and a small "Reviewer override" label. A second function returns freshness from lastReviewed: current under six months, review_due from six to nine months, out_of_date after nine.
Unit tests must cover at least these cases:

All six Supportive gives Ready.

Gates Supportive with three Mixed gives Workable.

Market access Mixed, everything else Supportive, gives Workable.

Ownership and money Unsupportive gives Difficult.

Two non-gate questions Unsupportive gives Difficult.

An active red flag on this deal type gives Difficult even when all six are Supportive.

An active red flag on the other deal type only, or a resolved flag, changes nothing.

Market access not rated, or three non-gate questions not rated, gives Not yet reviewed.

The Vietnam example from this doc gives Difficult for utility-scale and Workable for C&I.

### Pages
Policy overview (/policy)

A one-line lead, then a deal-type toggle: Utility-scale or C&I. The choice is kept in the address (?deal=ci) so a view can be shared.

The map is coloured by verdict for the chosen deal type, with countries not yet reviewed in grey and out-of-date reviews faded. Hovering shows country, verdict, arrow and last-reviewed date; clicking opens the country page.

A sortable table of reviewed countries: country, verdict, direction, active red flags and last reviewed.

A "Latest policy changes" list: the ten newest events across all countries, each with its effect and a link.

A link to the method page.
Country page (/policy/[iso2])

Header: country name, last reviewed, reviewer and a freshness badge.

Two verdict cards, utility-scale and C&I, each with its verdict, arrow and reason, and any red flags that apply.

The summary paragraph.

The six-question grid: one row per question and one column per deal type. Each cell shows the rating, confidence, reason and numbered source links.

Red flags, active and resolved.

The policy timeline, newest first, filterable by deal type.

The rating change log.

The source list, primary sources first, with archive links.

A link to the country's existing statistics page, and the existing "Report a correction" link.

For a country not yet reviewed: a plain notice, the link to its statistics page, and a note on current coverage.
Method page (/policy/method)
Rebuild it from a Markdown file, content/policy/method.md, so wording can change without code changes. It covers the six questions, both rating tables, the verdict rule, red flags, direction of travel, the evidence and review rules, coverage and the disclosure note. The text comes from this doc's sections from "Design decisions" to "Evidence and review rules".

### Components
 | 
Component | 
What it shows
 | 
VerdictBadge | 
Ready, Workable, Difficult or Not yet reviewed, as colour plus the word
 | 
RatingChip | 
Supportive, Mixed, Unsupportive or Not rated, as colour plus the word
 | 
ConfidenceMark | 
High, Medium or Low, with a tooltip saying what each means
 | 
DirectionArrow | 
Up, flat or down arrow plus the word, with the reason on hover
 | 
FreshnessBadge | 
Current, Review due or Out of date
 | 
DealToggle | 
Utility-scale or C&I, synced to the address
 | 
QuestionGrid | 
The six-by-two grid on the country page
 | 
RedFlagList | 
Active and resolved flags, with the deal types they apply to
 | 
PolicyTimeline | 
Dated events, newest first, with filters
 | 
SourceList | 
Numbered sources, primary first
 | 
PolicyMap | 
The existing map or globe component, recoloured by verdict
Colour never carries meaning alone: every badge and chip also shows its word. Use muted tones that sit with Perpetual's blue and green brand: green for Ready, amber for Workable, red for Difficult and grey for Not yet reviewed.

### Steps

Step 0: Explore and plan. Read the repository. Note the framework, routing, how data is loaded, where every piece of PROFITS lives, and how the map works. Write docs/policy-review-implementation-notes.md with the file plan. Check: stop and wait for approval.

Step 1: Branch. Create the policy-review branch.

Step 2: Schema and validator. Add the types, the schema and the validate:policy script, and run it in the build. Check: it passes on an empty folder and fails on a deliberately broken test file.

Step 3: Verdict and freshness functions. Add both with the unit tests listed above. Check: all tests pass.

Step 4: Seed files. Create files for Singapore, Vietnam, the Philippines, Malaysia, Thailand, Indonesia, South Korea and Taiwan with status not_reviewed, every rating not_rated, and no reasons or sources. Check: the validator passes, and a search finds no policy text in the seed files.

Step 5: Vietnam draft. Enter the Vietnam ratings, reasons, red flag, events and sources from this doc's Vietnam worked example, with status draft. Check: the validator passes (warnings allowed), and the verdicts come out as Difficult and Workable.

Step 6: Components. Build the components on a development-only page that shows every state of each. Check: every state renders, has a text label, and works by keyboard.

Step 7: Country page. Check: Vietnam renders on a preview build; a not-reviewed country shows its notice; every source link opens; the page works at 375 px wide.

Step 8: Overview page. Build the map, table and latest-changes list. Check: the toggle changes the map, table and address; unreviewed countries are grey; draft countries don't appear in production builds.

Step 9: Method page. Build it from content/policy/method.md. Check: it matches this doc, and the word PROFITS does not appear.

Step 10: Remove PROFITS. Delete the scoring code, score data, weight controls, validation exhibit, deal-breaker outlines and score heatmap. Replace the PROFITS section of the Disclosure page with a short Policy Review section linking to the method page. Add a changelog entry in the existing format and bump the data version. Check: a search for PROFITS finds it only in past changelog entries, which stay as written; the build passes; no internal links are broken.

Step 11: Final checks and preview. Run the build, lint, type check, tests and validator. Check accessibility on the overview, country and method pages, and deploy a Vercel preview for your review. Check: you approve the preview, then merge.

### After launch

Reviewing a country: do the research, then give Claude Code the ratings, reasons and sources and ask it to update the country file. It runs the validator and you check the preview before switching the status to reviewed.

A policy change: add an event, adjust any ratings, and add a line to the rating log with the reason.

Monthly: run validate:policy and read the report of reviews coming due.

## Sources
Framework and data sources:

OECD FDI Regulatory Restrictiveness Index

IMF Annual Report on Exchange Arrangements and Exchange Restrictions

UNCTAD Investment Dispute Settlement Navigator
Vietnam worked example:

Norton Rose Fulbright: Vietnam power sector snapshot

pv magazine: Vietnam solar boom strains grid and tests project finance (May 2026)

OECD: Clean Energy Finance and Investment Policy Review of Viet Nam

The Investor: investors petition to uphold feed-in tariffs (May 2025)

Chambers: Power Generation, Transmission & Distribution 2026, Vietnam and Renewable Energy 2026, Vietnam

Gridwatch: EVN proposes retroactive tariff cuts for 173 projects (April 2026)

Watson Farley & Williams: Vietnam revises the DPPA and rooftop solar framework

Allen & Gledhill: Vietnam's electricity sector, key regulatory developments (August 2026)

LNT via Conventus Law: DPPA and self-consumption amendments

Nation Thailand: Vietnam raises rooftop solar grid sales ceiling to 50% (June 2026)

Baker McKenzie: Decree 243/2026 enhanced DPPA framework

EVN: Government issues Decree 243/2026
Primary sources to attach before publishing Vietnam: Decree 57/2025, Decree 58/2025, Decree 243/2026, Circular 29/2026, Decision 768/QD-TTg (revised PDP8) and Resolution 17/NQ-CP (January 2026).
