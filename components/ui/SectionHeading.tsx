import { ArrowRight } from "lucide-react";
import Link from "next/link";

/** Section title row: plain heading, optional one-line description, optional link on the right. */
export function SectionHeading({
  title,
  description,
  href,
  linkLabel,
  id,
}: {
  id?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  /** @deprecated eyebrows were removed from the design; kept so older call sites still compile. */
  eyebrow?: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <div className="max-w-2xl">
        <h2 id={id} className="text-[1.6rem] leading-tight font-semibold tracking-[-0.02em] md:text-[2rem]">
          {title}
        </h2>
        {description && <p className="mt-3 text-base leading-relaxed text-soft">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 border-b border-brand-blue/30 pb-0.5 text-sm font-semibold text-brand-blue hover:border-brand-blue"
        >
          {linkLabel ?? "View all"}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}
