/** Long-form reading layout: ~70 characters per line, calm vertical rhythm. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="max-w-[70ch] text-[1.0625rem] leading-[1.75] text-ink/90 [&_a]:font-medium [&_a]:text-brand-blue [&_a]:underline-offset-2 hover:[&_a]:underline [&_dd]:mb-4 [&_dd]:text-ink/80 [&_dt]:font-semibold [&_dt]:text-ink [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-sans [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-6"
    >
      {children}
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header>
      <div className="container-page pt-16 pb-10 md:pt-24 md:pb-14">
        {eyebrow && <p className="mb-3 text-[13px] text-soft">{eyebrow}</p>}
        <h1 className="max-w-4xl text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.025em] md:text-[3rem]">{title}</h1>
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
