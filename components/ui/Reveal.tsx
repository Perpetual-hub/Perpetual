/**
 * Formerly a scroll fade-in. Removed because sections that had not yet faded in looked like
 * empty space; kept as a plain wrapper so existing markup doesn't change.
 */
export function Reveal({ children, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <div className={className || undefined}>{children}</div>;
}
