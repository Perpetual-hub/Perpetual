"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/format";

function relative(iso: string, now: number): string {
  const days = Math.floor((now - Date.parse(`${iso}T12:00:00Z`)) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return formatDate(iso, { year: false });
}

/**
 * Renders the plain date on the server (stable HTML, no hydration mismatch),
 * then swaps to "3d ago" in the browser.
 */
export function TimeAgo({ date, className }: { date: string; className?: string }) {
  const [label, setLabel] = useState(() => formatDate(date, { year: false }));
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- relative time is browser-only by design
    setLabel(relative(date, Date.now()));
  }, [date]);
  return (
    <time dateTime={date} title={formatDate(date)} className={className}>
      {label}
    </time>
  );
}
