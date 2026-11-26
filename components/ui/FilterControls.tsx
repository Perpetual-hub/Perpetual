"use client";

import { useState } from "react";

export interface Option<T extends string = string> {
  id: T;
  label: string;
  count?: number;
  dot?: string;
}

/** Accessible checkbox list for multi-select filters. */
export function CheckboxList<T extends string>({
  legend,
  options,
  value,
  onChange,
  maxHeight = 260,
}: {
  legend: string;
  options: Option<T>[];
  value: T[];
  onChange: (v: T[]) => void;
  maxHeight?: number;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="overflow-y-auto" style={{ maxHeight }}>
        {options.map((o) => {
          const checked = value.includes(o.id);
          return (
            <label
              key={o.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-surface-2"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(checked ? value.filter((x) => x !== o.id) : [...value, o.id])}
                className="size-4 rounded border-line accent-[var(--brand-blue)]"
              />
              {o.dot && <span className="size-2 shrink-0 rounded-full" style={{ background: o.dot }} aria-hidden />}
              <span className="flex-1 text-ink">{o.label}</span>
              {o.count != null && <span className="tabular text-xs text-muted">{o.count}</span>}
            </label>
          );
        })}
      </div>
      {value.length > 0 && (
        <button type="button" onClick={() => onChange([])} className="mt-2 px-2 text-xs font-medium text-brand-blue hover:underline">
          Clear
        </button>
      )}
    </fieldset>
  );
}

/** Two number inputs that commit on blur or Enter (so the URL isn't rewritten on every keystroke). */
export function RangeInputs({
  legend,
  unit,
  min,
  max,
  onChange,
  placeholders = ["Min", "Max"],
}: {
  legend: string;
  unit: string;
  min?: number;
  max?: number;
  onChange: (min?: number, max?: number) => void;
  placeholders?: [string, string];
}) {
  const [lo, setLo] = useState(min?.toString() ?? "");
  const [hi, setHi] = useState(max?.toString() ?? "");
  const commit = () => onChange(lo === "" ? undefined : Number(lo), hi === "" ? undefined : Number(hi));
  const input =
    "tabular h-9 w-full rounded-lg border border-line bg-white px-3 text-sm placeholder:text-muted/70 focus:border-brand-blue focus:outline-none";
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-medium text-muted">{legend}</legend>
      <div className="flex items-center gap-2">
        <label className="flex-1">
          <span className="sr-only">Minimum {unit}</span>
          <input
            type="number"
            inputMode="numeric"
            className={input}
            placeholder={placeholders[0]}
            value={lo}
            onChange={(e) => setLo(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => e.key === "Enter" && commit()}
          />
        </label>
        <span className="text-muted" aria-hidden>
          –
        </span>
        <label className="flex-1">
          <span className="sr-only">Maximum {unit}</span>
          <input
            type="number"
            inputMode="numeric"
            className={input}
            placeholder={placeholders[1]}
            value={hi}
            onChange={(e) => setHi(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => e.key === "Enter" && commit()}
          />
        </label>
        <span className="text-xs text-muted">{unit}</span>
      </div>
    </fieldset>
  );
}
