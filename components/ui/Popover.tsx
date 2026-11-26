"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

/** Filter button + panel. Closes on outside click or Escape and returns focus to the button. */
export function FilterPopover({
  label,
  summary,
  active,
  children,
  align = "left",
}: {
  label: string;
  /** Short text shown when the filter is set, e.g. "Solar, Wind". */
  summary?: string;
  active: boolean;
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm transition-colors duration-150 ${
          active
            ? "border-brand-blue/40 bg-[#eef5fc] text-brand-navy"
            : "border-line bg-white text-ink hover:border-[#cdd6e2]"
        }`}
      >
        <span className="font-medium">{label}</span>
        {summary && <span className="max-w-36 truncate text-brand-blue">{summary}</span>}
        <ChevronDown className={`size-3.5 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <div
          id={id}
          role="dialog"
          aria-label={`${label} filter`}
          className={`absolute top-full z-30 mt-2 w-72 rounded-xl border border-line bg-white p-3 shadow-[0_12px_32px_-12px_rgba(11,27,46,0.22)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
