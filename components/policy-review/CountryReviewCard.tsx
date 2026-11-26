// Policy Review summary for a country statistics page: both verdicts and a link to the full review.
import { Pill } from "@/components/home/Landing";
import { formatDate } from "@/lib/format";
import { getReview } from "@/lib/policy-review/data";
import { SEGMENTS } from "@/lib/policy-review/types";
import { segmentVerdict } from "@/lib/policy-review/verdict";
import { DirectionArrow, VerdictBadge } from "./Badges";

export function CountryReviewCard({ code, name }: { code: string; name: string }) {
  const c = getReview(code);
  return (
    <section aria-labelledby="review-h" className="rounded-[14px] border border-line bg-white/70 p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="review-h" className="font-display text-[2rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a]">
            Policy Review
          </h2>
          <p className="mt-1 text-sm text-soft">
            {c ? `How ready ${name} is for renewable investment. Last reviewed ${formatDate(c.lastReviewed ?? "")}.` : `${name} has not been reviewed yet.`}
          </p>
        </div>
        <Pill href={c ? `/policy/${code.toLowerCase()}` : "/policy"}>{c ? "Read the full review" : "See reviewed markets"}</Pill>
      </div>
      {c && (
        <>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {SEGMENTS.map((s) => (
              <div key={s.id} className="rounded-[12px] bg-surface-2/60 px-5 py-4">
                <dt className="text-sm text-soft">{s.label}</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-3">
                  <VerdictBadge verdict={segmentVerdict(c, s.id).verdict} />
                  <DirectionArrow value={c.segments[s.id].direction.value} reason={c.segments[s.id].direction.reason} />
                </dd>
              </div>
            ))}
          </dl>
          {c.summary && <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-ink/85">{c.summary}</p>}
        </>
      )}
    </section>
  );
}
