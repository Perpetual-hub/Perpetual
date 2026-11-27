import type { Metadata } from "next";
import { Pill } from "@/components/home/Landing";
import { PageHero } from "@/components/ui/PageHero";
import { HERO_PHOTOS } from "@/lib/hero-photos";
import { ArrowDownRight, ArrowRight, ArrowUpRight, PenLine, ShieldCheck } from "lucide-react";
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


const H2 = "font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1] font-light tracking-[-0.04em]";

const FLOW: { q: string; yes: string; color: string }[] = [
  { q: "Is any red flag active?", yes: "Difficult", color: "#d63c2f" },
  { q: "Is either gate Unsupportive, or are two or more questions Unsupportive?", yes: "Difficult", color: "#d63c2f" },
  { q: "Is either gate not rated, or are more than two questions not rated?", yes: "Not Yet Reviewed", color: "#8a98ab" },
  { q: "Are both gates Supportive, nothing Unsupportive, and two or fewer Mixed?", yes: "Ready", color: "#1f9d55" },
];

export default function PolicyMethodPage() {
  return (
    <>
      <PageHero
        photo={HERO_PHOTOS.method}
        eyebrow="Method"
        title="How a Policy Review Is Built"
        lede="Each reviewed country gets a verdict for utility-scale and C&I deals. Ready, Workable or Difficult, worked out by a fixed rule from six investor questions, each rated with a reason, a confidence level and a source."
      />

      {/* At a glance */}
      <section aria-label="The method at a glance" className="border-b border-line bg-white">
        <ol className="container-page grid grid-cols-2 md:grid-cols-4">
          {[
            ["6", "Investor Questions"],
            ["3", "Ratings per Answer"],
            ["2", "Verdicts per Market"],
            ["3", "Red Flags"],
          ].map(([n, l], i) => (
            <li key={l} className={`flex items-center gap-4 py-7 md:justify-center ${i % 2 ? "pl-5 md:pl-0" : ""} ${i > 0 ? "md:border-l md:border-line" : ""} ${i % 2 ? "border-l border-line md:border-l" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""}`}>
              <span className="tabular font-display text-[3.2rem] leading-none font-light tracking-[-0.05em] text-[#0b5cad]">{n}</span>
              <span className="max-w-[7rem] text-[15px] leading-snug font-medium text-[#0b1f3a]">{l}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Questions */}
      <section aria-labelledby="q-h" className="bg-[var(--home-paper)]">
        <div className="container-page py-20 md:py-28">
          <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 id="q-h" className={`${H2} text-[#0b1f3a]`}>
              Six Questions an Investment Committee Asks
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-soft lg:justify-self-end">
              Every country answers the same six, separately for utility-scale and for C&amp;I, meaning rooftop, on-site and corporate PPAs. Choose one to see how it is rated.
            </p>
          </div>
          <MethodExplorer check={CHECK} earns={EARNS} />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["The evidence points two ways", "Mixed", "#e9a23b", "#fff", "The reason explains both sides."],
              ["Not enough evidence to decide", "Not Rated", "#dfe6ee", "#3b4a5e", "We leave it open rather than guess, and list it as still to be established."],
            ].map(([when, tag, bg, fg, note]) => (
              <div key={tag} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 rounded-[14px] border border-line bg-white p-5 md:p-6">
                <div>
                  <p className="text-sm text-soft">When</p>
                  <p className="mt-0.5 text-[17px] font-medium text-[#0b1f3a]">{when}</p>
                  <p className="mt-1 text-sm text-soft">{note}</p>
                </div>
                <ArrowRight className="size-5 text-[#8396ae]" aria-hidden />
                <span className="w-[7.5rem] rounded-[6px] py-1.5 text-center text-sm font-semibold" style={{ background: bg, color: fg }}>
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verdict rule */}
      <section aria-labelledby="rule-h" className="on-dark bg-[#083b6e] text-white">
        <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div>
            <h2 id="rule-h" className={`${H2} text-white`}>
              The Verdict Follows a Rule, Not an Average
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
              Market access and ownership are gates. If you cannot sell the power, or cannot own the asset and take the money home, nothing else rescues the deal.
            </p>
            <div className="mt-10 max-w-md space-y-3">
              <div className="flex items-center gap-2 rounded-[14px] bg-white/[0.07] p-4 text-sm text-white">
                {["Six Ratings", "Fixed Rule", "Verdict"].map((x, i) => (
                  <span key={x} className="flex items-center gap-2">
                    {i > 0 && <ArrowRight className="size-4 text-white/50" aria-hidden />}
                    <span className={`rounded-[6px] px-3 py-1.5 font-medium ${i === 2 ? "bg-white text-[#083b6e]" : "bg-white/10"}`}>{x}</span>
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-[14px] border border-white/15 p-4">
                  <ShieldCheck className="size-5 text-[#5aa9e6]" aria-hidden />
                  <p className="mt-3 font-medium text-white">Worked Out by the Site</p>
                  <p className="mt-1 leading-relaxed text-white/65">A page can never show a verdict its ratings do not support.</p>
                </div>
                <div className="rounded-[14px] border border-white/15 p-4">
                  <PenLine className="size-5 text-[#5aa9e6]" aria-hidden />
                  <p className="mt-3 font-medium text-white">Overrides Are Rare</p>
                  <p className="mt-1 leading-relaxed text-white/65">A reviewer must write a reason, and it is shown on the page.</p>
                </div>
              </div>
            </div>
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
            Three Red Flags Override Everything
          </h2>
          <ol className="mt-12 border-b border-line">
            {[
              ["Foreign Control Blocked", "Foreign investors cannot hold more than 50% of the relevant generation assets.", "Investment law, and the OECD FDI Regulatory Restrictiveness Index where it covers the country"],
              ["Money Cannot Leave", "Profits or capital cannot be converted or sent abroad, or transfers face systematic long delays.", "Central bank rules and the IMF Annual Report on Exchange Arrangements and Exchange Restrictions"],
              ["Unresolved Retroactive Cut", "Terms for operating projects were cut in the last ten years and not restored, settled or compensated.", "Official decisions and the UNCTAD Investment Dispute Settlement Navigator"],
            ].map(([t, a, d], i) => (
              <li key={t} className="grid gap-4 border-t border-line py-8 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] md:gap-8">
                <span className="tabular font-display text-[2.6rem] leading-none font-light text-[#d63c2f]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-[1.6rem] leading-tight font-light tracking-[-0.02em] text-[#0b1f3a]">{t}</h3>
                <p className="text-[15px] leading-relaxed text-ink/85">{a}</p>
                <div className="text-sm">
                  <p className="font-medium text-ink">Checked Against</p>
                  <p className="mt-1 leading-relaxed text-soft">{d}</p>
                </div>
              </li>
            ))}
          </ol>
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
              Where It Is Heading
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
            Every Answer Shows Its Evidence
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
              <h3 className="font-display text-2xl font-light tracking-[-0.02em] text-[#0b1f3a]">Review Cycle</h3>
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
                  <p className="font-medium text-[#0b5cad]">Primary Sources</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/85">Laws, decrees, regulator decisions, ministry plans and tender documents.</p>
                </div>
                <div className="rounded-[12px] bg-surface p-5">
                  <p className="font-medium text-ink">Secondary Sources</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/85">Published legal guides, development bank reports and established trade press.</p>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-soft">
                Each source has its title, publisher, link, publication date and the date it was checked. Titles not in English are translated, with the original shown beside them.
              </p>
            </div>
            <div className="rounded-[16px] bg-[#0b5cad] p-7 text-white md:p-9">
              <h3 className="font-display text-2xl font-light tracking-[-0.02em] text-white">How the Current Reviews Were Made</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/85">
                The reviews published so far are desk reviews. They rest on law firm briefings, regulator and ministry documents, development bank reports and established trade press. We only use sources whose publishers allow automated reading. Without a primary source, a rating is held to medium confidence at most. Each country page lists what its sources could not establish, and every reason is written in our own words.
              </p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Pill href="/policy">See the Reviewed Markets</Pill>
            <Pill href="/corrections">Report a Correction</Pill>
          </div>
        </div>
      </section>
    </>
  );
}
