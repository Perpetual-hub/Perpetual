import { PillLink } from "@/components/home/Chapter";

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
    <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-line pt-8">
      <div className="max-w-3xl">
        <h2 id={id} className="font-display text-[2.1rem] leading-[1.05] font-light tracking-[-0.035em] text-[#0b1f3a] sm:text-[2.6rem] lg:text-[3.2rem]">
          {title}
        </h2>
        {description && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-soft">{description}</p>}
      </div>
      {href && <PillLink href={href}>{linkLabel ?? "View all"}</PillLink>}
    </div>
  );
}
