export function Section({ id, title, children, aside }: { id: string; title: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line pt-8">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 id={id} className="font-display text-[1.75rem] leading-tight font-light tracking-[-0.03em] text-[#0b1f3a] md:text-[2.1rem]">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

/** Definition grid that silently drops empty values (no "N/A" walls). */
export function FactGrid({ facts }: { facts: [string, React.ReactNode][] }) {
  const shown = facts.filter(([, v]) => v !== undefined && v !== null && v !== false && v !== "");
  return (
    <dl className="grid overflow-hidden rounded-[var(--radius)] border-t border-l border-line bg-white/50 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map(([k, v]) => (
        <div key={k} className="border-r border-b border-line px-5 py-4">
          <dt className="text-xs font-medium text-muted">{k}</dt>
          <dd className="mt-1 text-[0.95rem] font-semibold text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
