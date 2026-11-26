import { PageHero } from "@/components/ui/PageHero";
import type { HeroPhoto } from "@/lib/hero-photos";

/** Long-form reading layout: ~70 characters per line, calm vertical rhythm. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="max-w-[70ch] text-[1.0625rem] leading-[1.75] text-ink/90 [&_a]:font-medium [&_a]:text-brand-blue [&_a]:underline-offset-2 hover:[&_a]:underline [&_dd]:mb-4 [&_dd]:text-ink/80 [&_dt]:font-semibold [&_dt]:text-ink [&_h2]:mt-16 [&_h2]:mb-4 [&_h2]:scroll-mt-28 [&_h2]:border-t [&_h2]:border-line [&_h2]:pt-8 [&_h2]:text-[2rem] [&_h2]:leading-tight [&_h2]:font-light [&_h2]:tracking-[-0.03em] [&_h2]:text-[#0b1f3a] [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-sans [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-6"
    >
      {children}
    </div>
  );
}

/** Page header. With a photo it becomes the landing-style photo hero; without, a light paper header. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
  photo,
  aside,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  photo?: HeroPhoto;
  aside?: React.ReactNode;
}) {
  if (photo)
    return (
      <PageHero photo={photo} eyebrow={eyebrow ?? title} title={title} lede={intro} aside={aside}>
        {children}
      </PageHero>
    );
  return (
    <header>
      <div className="container-page pt-16 pb-10 md:pt-24 md:pb-14">
        {eyebrow && (
          <p className="mb-4 text-sm text-soft">{eyebrow}</p>
        )}
        <h1 className="max-w-4xl font-display text-[2.6rem] leading-[1] font-light tracking-[-0.04em] text-[#0b1f3a] sm:text-[3.4rem] lg:text-[4.6rem]">{title}</h1>
        {intro && <p className="mt-6 max-w-[46rem] text-lg leading-relaxed text-soft">{intro}</p>}
        {children}
      </div>
    </header>
  );
}

/** Sticky in-page contents for long pages. */
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
      <p className="mb-3 text-xs font-semibold text-muted">On this page</p>
      <ol className="space-y-2 border-l border-line text-sm">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-brand-blue hover:text-ink">
              {i.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
