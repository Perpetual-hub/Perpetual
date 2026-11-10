import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel,
  id,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-semibold text-brand-blue">{eyebrow}</p>}
        <h2 id={id} className="text-2xl font-bold tracking-tight md:text-[2rem]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="group hidden shrink-0 items-center gap-1 text-sm font-medium text-brand-blue sm:inline-flex">
          {linkLabel ?? "View all"}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}
