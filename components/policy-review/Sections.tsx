// Country review building blocks: verdict cards, the six-question grid, red flags, timeline, sources.
import { AlertTriangle, ExternalLink } from "lucide-react";
import { SEGMENT_LABEL } from "@/lib/policy-review/cells";
import { QUESTIONS, SEGMENTS, type CountryReview, type SegmentId } from "@/lib/policy-review/types";
import { segmentVerdict } from "@/lib/policy-review/verdict";
import { formatDate } from "@/lib/format";
import { ConfidenceMark, DirectionArrow, RatingChip, VerdictBadge } from "./Badges";

const FLAG_LABEL = {
  foreign_control: "Foreign control blocked",
  money_exit: "Money can't leave",
  retroactive_cut: "Unresolved retroactive cut",
};

/** Source ids in order of first appearance, numbered for the page. */
export function sourceNumbers(c: CountryReview) {
  const ordered = [...c.sources].sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "primary" ? -1 : 1));
  return new Map(ordered.map((s, i) => [s.id, i + 1]));
}

function Refs({ ids, num }: { ids: string[]; num: Map<string, number> }) {
  if (!ids.length) return null;
  return (
    <span className="ml-1 text-xs text-muted">
      {ids.map((id) => (
        <a key={id} href={`#src-${num.get(id)}`} className="tabular ml-0.5 text-brand-blue hover:underline">
          [{num.get(id)}]
        </a>
      ))}
    </span>
  );
}

export function VerdictCards({ c, num }: { c: CountryReview; num: Map<string, number> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {SEGMENTS.map(({ id }) => {
        const v = segmentVerdict(c, id);
        const s = c.segments[id];
        const flags = c.redFlags.filter((f) => f.status === "active" && f.segments.includes(id));
        return (
          <article key={id} className="rounded-[14px] border border-line bg-white/70 p-6">
            <p className="text-sm text-soft">{SEGMENT_LABEL[id]}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <VerdictBadge verdict={v.verdict} size="lg" />
              <DirectionArrow value={s.direction.value} reason={s.direction.reason} />
            </div>
            {s.direction.reason && (
              <p className="mt-4 text-[15px] leading-relaxed text-ink/85">
                {s.direction.reason}
                <Refs ids={s.direction.sources} num={num} />
              </p>
            )}
            {v.override && (
              <p className="mt-3 text-sm text-muted">
                <span className="font-medium text-ink">Reviewer override.</span> {v.override}
              </p>
            )}
            {flags.map((f) => (
              <p key={f.type} className="mt-3 flex gap-2 text-sm text-[#9c2a20]">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  <span className="font-medium">{FLAG_LABEL[f.type]}.</span> {f.reason}
                </span>
              </p>
            ))}
          </article>
        );
      })}
    </div>
  );
}

export function QuestionGrid({ c, num }: { c: CountryReview; num: Map<string, number> }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-white/60">
      <div className="hidden grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,1fr)] border-b border-line bg-surface-2/60 text-sm font-medium text-muted md:grid">
        <span className="px-5 py-3">Question</span>
        <span className="px-5 py-3">Utility-scale</span>
        <span className="px-5 py-3">C&amp;I</span>
      </div>
      <ol className="divide-y divide-line">
        {QUESTIONS.map((q) => (
          <li key={q.id} className="grid md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="px-5 pt-5 md:py-5">
              <p className="tabular text-xs text-muted">{q.n}</p>
              <p className="mt-0.5 font-medium text-ink">{q.short}</p>
              <p className="text-sm text-soft">{q.ask}</p>
            </div>
            {(["utility", "ci"] as SegmentId[]).map((seg) => {
              const r = c.segments[seg].ratings[q.id];
              return (
                <div key={seg} className="px-5 py-4 md:py-5">
                  <p className="mb-2 text-xs text-muted md:hidden">{SEGMENT_LABEL[seg]}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <RatingChip rating={r.rating} />
                    <ConfidenceMark value={r.confidence} />
                  </div>
                  {r.reason && (
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink/85">
                      {r.reason}
                      <Refs ids={r.sources} num={num} />
                    </p>
                  )}
                </div>
              );
            })}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RedFlagList({ c, num }: { c: CountryReview; num: Map<string, number> }) {
  const shown = c.redFlags.filter((f) => f.status !== "none");
  if (!shown.length) return <p className="text-[15px] text-soft">No red flags recorded. Foreign control, money transfer and retroactive cuts were checked.</p>;
  return (
    <ul className="space-y-3">
      {shown.map((f, i) => (
        <li key={i} className="rounded-[12px] border border-line bg-white/60 p-5">
          <p className="flex flex-wrap items-center gap-3">
            <span className="font-medium text-ink">{FLAG_LABEL[f.type]}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${f.status === "active" ? "bg-[#fcecea] text-[#9c2a20]" : "bg-surface-2 text-muted"}`}>
              {f.status === "active" ? "Active" : "Resolved"}
            </span>
            <span className="text-sm text-muted">{f.segments.map((s) => SEGMENT_LABEL[s]).join(" and ")}</span>
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/85">
            {f.reason}
            <Refs ids={f.sources} num={num} />
          </p>
        </li>
      ))}
    </ul>
  );
}

export function Timeline({ c, num }: { c: CountryReview; num: Map<string, number> }) {
  const ev = [...c.events].sort((a, b) => b.date.localeCompare(a.date));
  if (!ev.length) return <p className="text-[15px] text-soft">No dated policy events recorded yet.</p>;
  const tone = { positive: "bg-[#3f9d5a]", negative: "bg-[#cf4b3f]", mixed: "bg-[#e3a73a]" };
  return (
    <ol className="relative space-y-6 border-l border-line pl-6">
      {ev.map((e, i) => (
        <li key={i} className="relative">
          <span className={`absolute top-1.5 -left-[29px] size-2.5 rounded-full ${tone[e.effect]}`} aria-hidden />
          <p className="text-sm text-muted">
            {formatDate(e.date)} · {e.segments.map((s) => SEGMENT_LABEL[s]).join(", ")} · {e.effect === "positive" ? "Positive" : e.effect === "negative" ? "Negative" : "Mixed"}
          </p>
          <p className="mt-1 text-[15px] text-ink">
            {e.title}
            <Refs ids={e.sources} num={num} />
          </p>
        </li>
      ))}
    </ol>
  );
}

export function ChangeLog({ c }: { c: CountryReview }) {
  if (!c.log.length)
    return <p className="text-[15px] text-soft">First review on {formatDate(c.lastReviewed ?? "")}. Every later rating change is listed here with its reason.</p>;
  return (
    <ul className="divide-y divide-line border-y border-line text-[15px]">
      {c.log.map((l, i) => (
        <li key={i} className="grid gap-1 py-3 md:grid-cols-[8rem_minmax(0,1fr)]">
          <span className="text-muted">{formatDate(l.date)}</span>
          <span>
            {SEGMENT_LABEL[l.segment]}, {l.question}, {l.from} to {l.to}. {l.reason}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function SourceList({ c, num }: { c: CountryReview; num: Map<string, number> }) {
  const ordered = [...c.sources].sort((a, b) => (num.get(a.id) ?? 0) - (num.get(b.id) ?? 0));
  return (
    <ol className="space-y-3">
      {ordered.map((s) => (
        <li key={s.id} id={`src-${num.get(s.id)}`} className="grid scroll-mt-28 grid-cols-[2.5rem_minmax(0,1fr)] text-sm">
          <span className="tabular text-muted">[{num.get(s.id)}]</span>
          <span>
            <a href={s.url} target="_blank" rel="noopener" className="inline-flex items-start gap-1 font-medium text-brand-blue hover:underline">
              {s.title}
              <ExternalLink className="mt-1 size-3 shrink-0" aria-hidden />
            </a>
            {s.originalTitle && <span className="block text-xs text-muted">Original title, {s.language}: {s.originalTitle}. English title translated by Perpetual.</span>}
            <span className="block text-xs text-muted">
              {s.publisher}
              {s.published ? ` · ${s.published}` : ""} · {s.kind === "primary" ? "Primary source" : "Secondary source"} · checked {formatDate(s.accessed)}
              {s.archive && (
                <>
                  {" · "}
                  <a href={s.archive} className="underline">
                    archived copy
                  </a>
                </>
              )}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}
