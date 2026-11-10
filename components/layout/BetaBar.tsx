import { Info } from "lucide-react";
import Link from "next/link";

/** Site-wide notice that the beta runs on sample data. */
export function BetaBar() {
  return (
    <aside aria-label="Beta notice" className="border-b border-line bg-surface-2 text-xs text-muted">
      <div className="container-page flex items-center gap-2 py-2">
        <Info className="size-3.5 shrink-0 text-brand-blue" aria-hidden />
        <p>
          You are viewing the Perpetual beta. Every record on this site is <strong className="font-semibold text-ink">sample data</strong>,
          not real projects or deals.{" "}
          <Link href="/about" className="font-medium text-brand-blue underline-offset-2 hover:underline">
            About the beta
          </Link>
        </p>
      </div>
    </aside>
  );
}
