export function Section({ id, title, children, aside }: { id: string; title: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line pt-8">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 id={id} className="text-xl font-bold tracking-tight">
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
    <dl className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
      {shown.map(([k, v]) => (
        <div key={k} className="border-r border-b border-line px-5 py-4">
          <dt className="text-xs font-medium text-muted">{k}</dt>
          <dd className="mt-1 text-[0.95rem] font-semibold text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
