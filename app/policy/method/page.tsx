import type { Metadata } from "next";
import { Pill } from "@/components/home/Landing";
import { PageHero } from "@/components/ui/PageHero";
import { HERO_PHOTOS } from "@/lib/hero-photos";
import { QUESTIONS } from "@/lib/policy-review/types";

export const metadata: Metadata = {
  title: "Policy Review Method",
  description:
    "How Perpetual reviews a country's policy for renewable investment. Six investor questions, three ratings, a fixed verdict rule, three red flags and a direction of travel, each with reasons and sources.",
};

const CHECK: Record<string, [string, string]> = {
  access: [
    "Auctions, tenders, feed-in tariffs or open wholesale access for new private projects, and whether rounds run on a schedule",
    "Self-consumption rules, export and net metering, direct or virtual corporate PPAs, green tariffs and certificates",
  ],
  terms: [
    "Contract length, currency and indexation, curtailment compensation, change-in-law and termination protection, and whether a standard PPA exists",
    "Freedom to agree price and length, whether long contracts are enforceable, and rules on selling surplus power",
  ],
  buyer: [
    "The state utility's finances and payment record, and payment security such as guarantees, letters of credit or escrow",
    "Whether contracts with companies can be enforced through courts or arbitration, and any rules that limit who may buy",
  ],
  ownership: [
    "Foreign ownership limits in power generation, licences, land ownership, currency conversion, and dividend and capital transfer",
    "The same, plus rules on foreign firms owning rooftop assets on someone else's building",
  ],
  build: [
    "The grid connection process and typical time, transmission plans, curtailment levels, permits and land",
    "Rooftop permits, limits on how much a site may connect, and distribution grid rules",
  ],
  stability: [
    "Targets in law or an official plan, any retroactive changes, how often rules change, and protection for existing projects",
    "The same, plus how often self-consumption and export rules have changed",
  ],
};

const EARNS: Record<string, [string, string, string]> = {
  access: [
    "A working route is in force, with implementing rules, and deals are closing through it. For C&I, both on-site and at least one off-site route work.",
    "A route exists but is irregular, capped, a pilot, or missing its implementing rules. For C&I, on-site only.",
    "No working route for new private projects, or procurement is frozen.",
  ],
  terms: [
    "Long contracts, 15 years or more for utility-scale, in hard currency or indexed, with curtailment and change-in-law protection.",
    "Long contracts with gaps, such as no curtailment compensation or an unindexed local currency.",
    "Short or no contracts, or terms the government can change by decree.",
  ],
  buyer: [
    "The buyer is creditworthy or backed by a state guarantee or letter of credit, with no recent arrears to private generators.",
    "The buyer is weak but paying, and security is available only case by case.",
    "Arrears to private generators in the last three years, or no security and weak finances.",
  ],
  ownership: [
    "Full foreign ownership allowed, with free conversion and transfer of profits and capital.",
    "Allowed with conditions, such as approvals, joint ventures for land, ownership caps above 50%, or slow currency conversion.",
    "Foreign control blocked or profit transfer restricted. This also raises a red flag.",
  ],
  build: [
    "A clear connection process with published timelines, low curtailment and a funded grid plan.",
    "A clear process, but slow or congested in key regions, or moderate curtailment.",
    "Connection queues stalled, or high curtailment without compensation, or permits routinely blocked.",
  ],
  stability: [
    "A target in law or an official plan, no retroactive changes in ten years, and new rules that protect existing projects.",
    "Frequent changes or long policy gaps, but existing projects protected, or a retroactive change proposed and not enacted.",
    "A retroactive change to operating projects in the last ten years, or a sudden reversal of policy.",
  ],
};

const DECISIONS: [string, string][] = [
  ["A judgement with reasons, not a numeric score", "A number like 3.4 suggests precision that research cannot support, and it hides the trade-offs an investor needs to see."],
  ["Six questions, phrased the way an investor asks them", "They match the workstreams of real due diligence and the headings of an investment committee memo. Each can be answered from laws, contracts and regulator documents."],
  ["Three ratings", "Supportive, Mixed or Unsupportive. Finer grades cannot be applied consistently from desk research."],
  ["Separate verdicts for utility-scale and C&I", "The same country can run good auctions but block corporate PPAs, or the reverse. One verdict would hide that."],
  ["Verdicts follow a fixed rule, not an average", "Deals fail at the weakest link. If you cannot sell the power, a good grid does not help."],
  ["Three red flags override any verdict", "Blocked foreign control, blocked profit transfer and unresolved retroactive cuts stop deals in practice, whatever else is true."],
  ["A direction of travel", "Investors price the next ten years, not today. Workable and improving is a different call from Workable and worsening."],
  ["Every rating cites a source", "A reader should be able to click through to the law, regulator notice, tender document or legal guide behind it."],
  ["Dated reviews on a six-month cycle", "Policy moves fast, so every page shows when it was last checked and flags itself when overdue."],
  ["No weights", "With a rule-based verdict, nothing needs weighting."],
];

const H2 = "font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-light tracking-[-0.035em] text-[#0b1f3a]";

export default function PolicyMethodPage() {
  return (
    <>
      <PageHero
        photo={HERO_PHOTOS.method}
        eyebrow="Method"
        title="How a Policy Review is built"
        lede="Each reviewed country gets a verdict for utility-scale and C&I deals. Ready, Workable or Difficult, worked out by a fixed rule from six investor questions, each rated with a reason, a confidence level and a source."
      />

      <div className="container-page space-y-24 py-16 md:py-24">
        <section aria-labelledby="q-h">
          <h2 id="q-h" className={H2}>
            Six questions an investment committee asks.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
            Each country is rated on the same six questions, separately for utility-scale and for C&amp;I, meaning rooftop, on-site and corporate PPAs.
          </p>
          <ol className="mt-10 divide-y divide-line border-y border-line">
            {QUESTIONS.map((q) => (
              <li key={q.id} className="grid gap-6 py-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_minmax(0,1fr)]">
                <div>
                  <p className="tabular text-sm text-muted">{q.n}</p>
                  <h3 className="mt-1 font-display text-2xl font-light tracking-[-0.02em] text-[#0b1f3a]">{q.short}</h3>
                  <p className="mt-1 text-[15px] text-soft">{q.ask}</p>
                  {(q.id === "access" || q.id === "ownership") && <p className="mt-2 text-sm font-medium text-brand-blue">A gate question</p>}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">What we check, utility-scale</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{CHECK[q.id][0]}.</p>
                  <p className="mt-4 text-sm font-medium text-ink">What we check, C&amp;I</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{CHECK[q.id][1]}.</p>
                </div>
                <dl className="space-y-3 text-[15px] leading-relaxed">
                  {(["Supportive", "Mixed", "Unsupportive"] as const).map((r, i) => (
                    <div key={r}>
                      <dt className={`text-sm font-medium ${i === 0 ? "text-[#1f6b37]" : i === 1 ? "text-[#7a4d00]" : "text-[#9c2a20]"}`}>{r}</dt>
                      <dd className="text-ink/85">{EARNS[q.id][i]}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-[15px] text-soft">
            When evidence points two ways, the question is rated Mixed and the reason says why. When there is not enough evidence to rate, it is marked Not rated rather than guessed.
          </p>
        </section>

        <section aria-labelledby="rule-h" className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <h2 id="rule-h" className={H2}>
              The verdict rule.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-soft">
              Market access and ownership and money are gates. If you cannot sell the power, or cannot own the asset and get paid out, nothing else rescues the deal. The site works the verdict out from the ratings, so a page can never show a verdict its ratings do not support.
            </p>
          </div>
          <ol className="space-y-3">
            {[
              ["Difficult", "if any red flag is active, or either gate is Unsupportive, or two or more questions are Unsupportive.", "border-[#cf4b3f]"],
              ["Ready", "if there is no red flag, both gates are Supportive, nothing is Unsupportive, and no more than two questions are Mixed.", "border-[#3f9d5a]"],
              ["Workable", "in every other case.", "border-[#e3a73a]"],
              ["Not yet reviewed", "if either gate is not rated, or more than two questions are not rated.", "border-[#8a98ab]"],
            ].map(([v, t, c]) => (
              <li key={v} className={`rounded-[12px] border-l-4 bg-white/70 px-5 py-4 text-[15px] leading-relaxed ${c}`}>
                <span className="font-medium text-ink">{v}</span> {t}
              </li>
            ))}
            <li className="px-1 pt-2 text-sm text-soft">
              A reviewer may override a verdict only by writing a reason, which is shown on the page as a reviewer override. Overrides should be rare.
            </li>
          </ol>
        </section>

        <section aria-labelledby="flags-h">
          <h2 id="flags-h" className={H2}>
            Three red flags override everything.
          </h2>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {[
              ["Foreign control blocked", "Foreign investors cannot hold more than 50% of the relevant generation assets.", "Investment law, and the OECD FDI Regulatory Restrictiveness Index where it covers the country."],
              ["Money can't leave", "Profits or capital cannot be converted or sent abroad, or transfers face systematic long delays.", "Central bank rules and the IMF Annual Report on Exchange Arrangements and Exchange Restrictions."],
              ["Unresolved retroactive cut", "Terms for operating projects were cut in the last ten years and not restored, settled or compensated.", "Official decisions and the UNCTAD Investment Dispute Settlement Navigator."],
            ].map(([t, a, d]) => (
              <article key={t} className="rounded-[14px] border border-line bg-white/70 p-6">
                <h3 className="font-display text-xl font-light tracking-[-0.02em] text-[#0b1f3a]">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/85">
                  <span className="font-medium text-ink">Active when</span> {a.charAt(0).toLowerCase() + a.slice(1)}
                </p>
                <p className="mt-3 text-sm text-soft">Checked against {d.charAt(0).toLowerCase() + d.slice(1)}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-soft">
            A red flag is Active, Resolved or None, and names the deal types it applies to, because a problem in one regime may not reach another. A resolved flag stays on the country page as history but no longer forces the verdict.
          </p>
        </section>

        <section aria-labelledby="dir-h" className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="dir-h" className={H2}>
              Direction of travel.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-soft">
              Each deal type also gets an arrow, based on the last 12 months of dated policy events and changes formally published with a start date. Rumours and speeches do not count.
            </p>
          </div>
          <dl className="space-y-4 text-[15px] leading-relaxed">
            <div>
              <dt className="font-medium text-[#1f6b37]">Improving</dt>
              <dd>A rating moved up, or a published change will clearly help a gate question.</dd>
            </div>
            <div>
              <dt className="font-medium text-[#9c2a20]">Worsening</dt>
              <dd>A rating moved down, or a formally published proposal would hurt existing or new projects.</dd>
            </div>
            <div>
              <dt className="font-medium text-muted">Stable</dt>
              <dd>Neither.</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="ev-h">
          <h2 id="ev-h" className={H2}>
            Evidence and review rules.
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            <div>
              <h3 className="font-display text-xl font-light tracking-[-0.02em] text-[#0b1f3a]">Sources</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/85">
                Every rating cites at least one source, with its title, publisher, link, publication date and the date it was checked. Primary sources are laws, decrees, regulator decisions, ministry plans and tender documents. Secondary sources are published legal guides, development bank reports and established trade press. Titles of sources not in English are translated, with the original shown beside them.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-light tracking-[-0.02em] text-[#0b1f3a]">Confidence</h3>
              <dl className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink/85">
                <div>
                  <dt className="inline font-medium text-ink">High.</dt> <dd className="inline">A primary source, and the rule is seen working in practice.</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-ink">Medium.</dt> <dd className="inline">A primary source not yet tested in practice, or published legal guides only.</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-ink">Low.</dt> <dd className="inline">Sources conflict, or the rule is new and its details are not yet out.</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-display text-xl font-light tracking-[-0.02em] text-[#0b1f3a]">Review cycle</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/85">
                A full review every six months, and an update within ten working days of a major change. After six months a page shows Review due, and after nine its verdict is faded and marked Out of date. Every rating change is logged with its date, the old and new rating, and the reason.
              </p>
            </div>
          </div>
          <div className="mt-12 rounded-[14px] border border-line bg-white/70 p-6 md:p-8">
            <h3 className="font-display text-xl font-light tracking-[-0.02em] text-[#0b1f3a]">How the current reviews were made</h3>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink/85">
              The reviews published so far are desk reviews. They rest on law firm briefings, regulator and ministry documents, development bank reports and established trade press. We only use sources whose publishers allow automated reading. Without a primary source, a rating is held to medium confidence at most. Each country page lists what its sources could not establish. Every reason is written in our own words, and nothing comes from private or employer information.
            </p>
          </div>
        </section>

        <section aria-labelledby="why-h">
          <h2 id="why-h" className={H2}>
            Design decisions.
          </h2>
          <ol className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {DECISIONS.map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[2.5rem_minmax(0,1fr)]">
                <span className="tabular pt-0.5 text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-medium text-ink">{t}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-soft">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap gap-3">
            <Pill href="/policy">See the reviewed markets</Pill>
            <Pill href="/corrections">Report a correction</Pill>
          </div>
        </section>
      </div>
    </>
  );
}
