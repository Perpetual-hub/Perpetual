// Editorial building blocks: statement headings, grey ledes, borderless "paper" cards, numbered
// step cards, metric cards with a headline number, and source notes. Used on method pages and
// anywhere a section explains how something works.
import type { ReactNode } from "react";

/** Small label above a page or section title. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[13px] text-soft">{children}</p>;
}

/** A statement heading; `quiet` is appended in grey, like a closing thought. */
export function Statement({
  id,
  as: Tag = "h2",
  children,
  quiet,
  className = "",
}: {
  id?: string;
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  quiet?: ReactNode;
  className?: string;
}) {
  const size =
    Tag === "h1"
      ? "text-[2rem] leading-[1.1] md:text-[2.75rem]"
      : Tag === "h2"
        ? "text-[1.6rem] leading-[1.15] md:text-[2rem]"
        : "text-xl leading-snug";
  return (
    <Tag id={id} className={`font-display font-semibold tracking-[-0.02em] text-ink ${size} ${className}`}>
      {children}
      {quiet && <span className="text-soft"> {quiet}</span>}
    </Tag>
  );
}

/** Grey introductory paragraph under a statement. */
export function Lede({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`max-w-[46rem] text-lg leading-relaxed text-soft ${className}`}>{children}</p>;
}

/** A section: statement, optional lede, then content, with generous space above. */
export function EditorialSection({
  id,
  title,
  quiet,
  lede,
  children,
}: {
  id: string;
  title: ReactNode;
  quiet?: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="pt-20 md:pt-28">
      <Statement id={id} quiet={quiet}>
        {title}
      </Statement>
      {lede && <Lede className="mt-5">{lede}</Lede>}
      {children && <div className="mt-10">{children}</div>}
    </section>
  );
}

/** Borderless off-white card. */
export function Paper({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  return <Tag className={`rounded-[var(--radius)] bg-paper p-6 md:p-7 ${className}`}>{children}</Tag>;
}

/** Row of small squares that counts the step (1 square for step 1, and so on). */
export function StepGlyph({ n, tone = "ink" }: { n: number; tone?: "ink" | "accent" }) {
  return (
    <span className="flex gap-1" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={`size-[7px] ${tone === "accent" ? "bg-accent" : "bg-ink"}`} />
      ))}
    </span>
  );
}

/** Numbered step: glyph, small label, statement title, body and an optional figure and caption. */
export function StepCard({
  n,
  label,
  title,
  children,
  figure,
  caption,
}: {
  n: number;
  label: string;
  title: string;
  children: ReactNode;
  figure?: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <Paper as="li" className="flex flex-col">
      <StepGlyph n={n} />
      <p className="mt-4 text-[13px] text-soft">
        {n}. {label}
      </p>
      <h3 className="mt-1.5 font-display text-xl font-semibold tracking-[-0.01em] text-ink">{title}</h3>
      <div className="mt-3 text-[15px] leading-relaxed text-ink/85">{children}</div>
      {figure && <div className="mt-6 flex-1">{figure}</div>}
      {caption && <p className="mt-5 text-[13px] text-soft">{caption}</p>}
    </Paper>
  );
}

/** Thin labelled bar: the highlighted row is green, the comparison rows grey. */
export function MetricBar({ label, value, display, max, highlight }: { label: string; value: number; display: string; max: number; highlight?: boolean }) {
  return (
    <div>
      <div className={`flex justify-between gap-3 text-[13px] ${highlight ? "text-ink" : "text-soft"}`}>
        <span>{label}</span>
        <span className={`tabular ${highlight ? "text-accent" : ""}`}>{display}</span>
      </div>
      <div className="mt-1.5 h-2.5 bg-white" aria-hidden>
        <div className={`h-full ${highlight ? "bg-accent" : "bg-[#c9cfc6]"}`} style={{ width: `${Math.max(1.5, (value / (max || 1)) * 100)}%` }} />
      </div>
    </div>
  );
}

/** Evaluation card: title, description, a large green number, its bars and what it means. */
export function MetricCard({
  title,
  description,
  value,
  children,
  meaning,
}: {
  title: string;
  description: ReactNode;
  value: string;
  children: ReactNode;
  meaning: ReactNode;
}) {
  return (
    <Paper as="article" className="flex flex-col">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-ink">{title}</h3>
          <p className="mt-1 text-[15px] leading-snug text-soft">{description}</p>
        </div>
        <p className="tabular font-display text-[2.6rem] leading-none font-semibold tracking-[-0.02em] text-accent">{value}</p>
      </div>
      <div className="mt-6 flex-1 space-y-4">{children}</div>
      <p className="mt-6 border-t border-[#dfe3dc] pt-4 text-[15px] text-ink">
        What this means: <span className="text-soft">{meaning}</span>
      </p>
    </Paper>
  );
}

/** "Source:" line under a figure. */
export function SourceNote({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[13px] text-soft [&_a]:underline [&_a]:decoration-line [&_a]:underline-offset-2 hover:[&_a]:text-ink">Source: {children}</p>;
}
