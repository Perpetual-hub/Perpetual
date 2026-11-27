import type { Metadata } from "next";
import { Pill } from "@/components/home/Landing";
import { PageHero } from "@/components/ui/PageHero";
import { HERO_PHOTOS } from "@/lib/hero-photos";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Ban, Banknote, RotateCcw } from "lucide-react";
import { MethodExplorer } from "@/components/policy-review/MethodExplorer";

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

const H2 = "font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1] font-light tracking-[-0.04em]";

const FLOW: { q: string; yes: string; color: string }[] = [
  { q: "Is any red flag active?", yes: "Difficult", color: "#d63c2f" },
  { q: "Is either gate Unsupportive, or are two or more questions Unsupportive?", yes: "Difficult", color: "#d63c2f" },
  { q: "Is either gate not rated, or are more than two questions not rated?", yes: "Not yet reviewed", color: "#8a98ab" },
  { q: "Are both gates Supportive, nothing Unsupportive, and two or fewer Mixed?", yes: "Ready", color: "#1f9d55" },
];

export default function PolicyMethodPage() {
  return (
    <>
      <PageHero
        photo={HERO_PHOTOS.method}
        eyebrow="Method"
        title="How a Policy Review is built"
        lede="Each reviewed country gets a verdict for utility-scale and C&I deals. Ready, Workable or Difficult, worked out by a fixed rule from six investor questions, each rated with a reason, a confidence level and a source."
      />

      {/* At a glance */}
      <section aria-label="The method at a glance" className="border-b border-line bg-white">
        <ol className="container-page grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {[
            ["6", "investor questions"],
            ["3", "ratings for each answer"],
            ["2", "verdicts, one per deal type"],
            ["3", "red flags that override all"],
          ].map(([n, l]) => (
            <li key={l} className="bg-white px-2 py-8 md:px-8 md:first:pl-0">
              <p className="tabular font-display text-[4rem] leading-none font-light tracking-[-0.05em] text-[#0b5cad]">{n}</p>
              <p className="mt-2 text-[15px] text-soft">{l}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Questions */}
      <section aria-labelledby="q-h" className="bg-[var(--home-paper)]">
        <div className="container-page py-20 md:py-28">
          <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 id="q-h" className={`${H2} text-[#0b1f3a]`}>
              Six questions an investment committee asks.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-soft lg:justify-self-end">
              Every country answers the same six, separately for utility-scale and for C&amp;I, meaning rooftop, on-site and corporate PPAs. Choose one to see how it is rated.
            </p>
          </div>
          <MethodExplorer check={CHECK} earns={EARNS} />
          <p className="mt-8 max-w-3xl text-[15px] text-soft">
            When evidence points two ways, the question is rated Mixed and the reason says why. When there is not enough evidence to rate, it is marked Not rated rather than guessed.
          </p>
        </div>
      </section>

      {/* Verdict rule */}
      <section aria-labelledby="rule-h" className="on-dark bg-[#083b6e] text-white">
        <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div>
            <h2 id="rule-h" className={`${H2} text-white`}>
              The verdict follows a rule, not an average.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
              Market access and ownership are gates. If you cannot sell the power, or cannot own the asset and take the money home, nothing else rescues the deal.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
              The site works the verdict out from the ratings, so a page can never show a verdict its ratings do not support. A reviewer may override it only with a written reason, shown on the page.
            </p>
          </div>
          <ol className="relative">
            {FLOW.map((f, i) => (
              <li key={i} className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 pb-6">
                <span aria-hidden className="absolute top-11 bottom-0 left-[1.35rem] w-px bg-white/25" />
                <span className="tabular relative grid size-11 place-items-center rounded-full border border-white/30 bg-[#0b5cad] font-display text-lg">{i + 1}</span>
                <div className="grid gap-3 rounded-[14px] bg-white/[0.07] p-5 backdrop-blur-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <p className="text-[17px] leading-snug text-white">{f.q}</p>
                  <p className="flex items-center gap-2 text-sm text-white/70">
                    Yes
                    <ArrowRight className="size-4" aria-hidden />
                    <span className="rounded-[6px] px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-white" style={{ background: f.color }}>
                      {f.yes}
                    </span>
                  </p>
                </div>
              </li>
            ))}
            <li className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4">
              <span className="relative grid size-11 place-items-center rounded-full bg-white font-display text-lg text-[#083b6e]">
                <ArrowRight className="size-5" aria-hidden />
              </span>
              <p className="flex flex-wrap items-center gap-3 self-center text-[17px] text-white">
                Otherwise
                <span className="rounded-[6px] bg-[#e9a23b] px-3 py-1.5 text-sm font-semibold text-white">Workable</span>
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Red flags */}
      <section aria-labelledby="flags-h" className="bg-[var(--home-paper)]">
        <div className="container-page py-20 md:py-28">
          <h2 id="flags-h" className={`${H2} max-w-[18ch] text-[#0b1f3a]`}>
            Three red flags override everything.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {(
              [
                [Ban, "Foreign control blocked", "Foreign investors cannot hold more than 50% of the relevant generation assets.", "Investment law, and the OECD FDI Regulatory Restrictiveness Index where it covers the country."],
                [Banknote, "Money can't leave", "Profits or capital cannot be converted or sent abroad, or transfers face systematic long delays.", "Central bank rules and the IMF Annual Report on Exchange Arrangements and Exchange Restrictions."],
                [RotateCcw, "Unresolved retroactive cut", "Terms for operating projects were cut in the last ten years and not restored, settled or compensated.", "Official decisions and the UNCTAD Investment Dispute Settlement Navigator."],
              ] as const
            ).map(([Icon, t, a, d]) => (
              <article key={t} className="relative overflow-hidden rounded-[16px] border border-line bg-white p-7">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-[#d63c2f]" />
                <span className="grid size-12 place-items-center rounded-full bg-[#fcebe9] text-[#d63c2f]">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-2xl font-light tracking-[-0.02em] text-[#0b1f3a]">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{a}</p>
                <p className="mt-5 border-t border-line pt-4 text-sm text-soft">Checked against {d.charAt(0).toLowerCase() + d.slice(1)}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-soft">
            A red flag is Active, Resolved or None, and names the deal types it applies to, because a problem in one regime may not reach another. A resolved flag stays on the country page as history but no longer forces the verdict.
          </p>
        </div>
      </section>

      {/* Direction */}
      <section aria-labelledby="dir-h" className="border-y border-line bg-white">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 id="dir-h" className={`${H2} text-[#0b1f3a]`}>
              Where it is heading.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-soft lg:justify-self-end">
              Each deal type gets an arrow from the last 12 months of dated policy events and changes formally published with a start date. Rumours and speeches do not count.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {(
              [
                [ArrowUpRight, "Improving", "A rating moved up, or a published change will clearly help a gate question.", "#1f9d55", "#e8f6ee"],
                [ArrowRight, "Stable", "No rating moved and nothing published will change one.", "#56667c", "#eef2f6"],
                [ArrowDownRight, "Worsening", "A rating moved down, or a formally published proposal would hurt existing or new projects.", "#d63c2f", "#fcebe9"],
              ] as const
            ).map(([Icon, t, d, c, bg]) => (
              <div key={t} className="rounded-[16px] p-7" style={{ background: bg }}>
                <Icon className="size-16" style={{ color: c }} strokeWidth={1.6} aria-hidden />
                <p className="mt-6 font-display text-3xl font-light tracking-[-0.03em]" style={{ color: c }}>
                  {t}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence */}
      <section aria-labelledby="ev-h" className="bg-[var(--home-paper)]">
        <div className="container-page py-20 md:py-28">
          <h2 id="ev-h" className={`${H2} max-w-[20ch] text-[#0b1f3a]`}>
            Every answer shows its evidence.
          </h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[16px] border border-line bg-white p-7 md:p-9">
              <h3 className="font-display text-2xl font-light tracking-[-0.02em] text-[#0b1f3a]">Confidence</h3>
              <ul className="mt-6 space-y-6">
                {[
                  ["High", 3, "A primary source, and the rule is seen working in practice."],
                  ["Medium", 2, "A primary source not yet tested in practice, or published legal guides only."],
                  ["Low", 1, "Sources conflict, or the rule is new and its details are not yet out."],
                ].map(([l, n, d]) => (
                  <li key={l as string} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4">
                    <div>
                      <p className="font-medium text-ink">{l}</p>
                      <p className="mt-2 flex gap-1" aria-hidden>
                        {[1, 2, 3].map((k) => (
                          <span key={k} className={`h-2 w-7 rounded-full ${k <= (n as number) ? "bg-[#0b5cad]" : "bg-[#dfe6ee]"}`} />
                        ))}
                      </p>
                    </div>
                    <p className="text-[15px] leading-relaxed text-ink/85">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[16px] border border-line bg-white p-7 md:p-9">
              <h3 className="font-display text-2xl font-light tracking-[-0.02em] text-[#0b1f3a]">Review cycle</h3>
              <div className="mt-8" aria-hidden>
                <div className="flex h-3 overflow-hidden rounded-full">
                  <span className="w-[66.6%] bg-[#1f9d55]" />
                  <span className="w-[16.7%] bg-[#e9a23b]" />
                  <span className="flex-1 bg-[#8a98ab]" />
                </div>
                <div className="tabular relative mt-2 h-5 text-xs text-muted">
                  <span className="absolute left-0">0</span>
                  <span className="absolute left-[66.6%] -translate-x-1/2">6 months</span>
                  <span className="absolute left-[83.3%] -translate-x-1/2">9</span>
                  <span className="absolute right-0">12</span>
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-[15px] text-ink/85">
                <li className="flex items-center gap-3"><span className="size-3 rounded-[3px] bg-[#1f9d55]" aria-hidden />Current</li>
                <li className="flex items-center gap-3"><span className="size-3 rounded-[3px] bg-[#e9a23b]" aria-hidden />Review due after six months</li>
                <li className="flex items-center gap-3"><span className="size-3 rounded-[3px] bg-[#8a98ab]" aria-hidden />Faded and marked Out of date after nine</li>
              </ul>
              <p className="mt-6 text-[15px] leading-relaxed text-soft">
                A full review every six months, and an update within ten working days of a major change. Every rating change is logged with its date, the old and new rating, and the reason.
              </p>
            </div>
            <div className="rounded-[16px] border border-line bg-white p-7 md:p-9">
              <h3 className="font-display text-2xl font-light tracking-[-0.02em] text-[#0b1f3a]">Sources</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[12px] bg-[#e9f2fb] p-5">
                  <p className="font-medium text-[#0b5cad]">Primary</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/85">Laws, decrees, regulator decisions, ministry plans and tender documents.</p>
                </div>
                <div className="rounded-[12px] bg-surface p-5">
                  <p className="font-medium text-ink">Secondary</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/85">Published legal guides, development bank reports and established trade press.</p>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-soft">
                Each source has its title, publisher, link, publication date and the date it was checked. Titles not in English are translated, with the original shown beside them.
              </p>
            </div>
            <div className="rounded-[16px] bg-[#0b5cad] p-7 text-white md:p-9">
              <h3 className="font-display text-2xl font-light tracking-[-0.02em] text-white">How the current reviews were made</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/85">
                The reviews published so far are desk reviews. They rest on law firm briefings, regulator and ministry documents, development bank reports and established trade press. We only use sources whose publishers allow automated reading. Without a primary source, a rating is held to medium confidence at most. Each country page lists what its sources could not establish, and every reason is written in our own words.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design decisions */}
      <section aria-labelledby="why-h" className="on-dark bg-hero text-white">
        <div className="container-page py-20 md:py-28">
          <h2 id="why-h" className={`${H2} max-w-[16ch] text-white`}>
            Why it works this way.
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[16px] bg-white/10 md:grid-cols-2">
            {DECISIONS.map(([t, d], i) => (
              <li key={t} className="bg-hero p-7 md:p-8">
                <p className="tabular font-display text-4xl leading-none font-light text-[#5aa9e6]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 text-lg font-medium text-white">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap gap-3">
            <Pill href="/policy" tone="dark">See the reviewed markets</Pill>
            <Pill href="/corrections" tone="dark">Report a correction</Pill>
          </div>
        </div>
      </section>
    </>
  );
}
