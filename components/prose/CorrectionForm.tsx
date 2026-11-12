"use client";

import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";

export interface RecordOption {
  id: string;
  label: string;
}

/**
 * Report-a-correction form. UI only for now: nothing is sent or stored, and the
 * confirmation says so. Pre-selects the record from `?record=<id>`.
 */
export function CorrectionForm({ records }: { records: RecordOption[] }) {
  const sp = useSearchParams();
  const initial = sp.get("record") ?? "";
  const [record, setRecord] = useState(records.some((r) => r.id === initial) ? initial : "");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const id = useId();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(f.get("problem") ?? "").trim()) next.problem = "Tell us what is wrong.";
    const src = String(f.get("source") ?? "").trim();
    if (src && !/^https?:\/\/\S+\.\S+/.test(src)) next.source = "Use a full link starting with http:// or https://";
    const email = String(f.get("email") ?? "").trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = "This doesn't look like an email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`${id}-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="rounded-[var(--radius)] border border-line bg-surface-2 p-8">
        <CheckCircle2 className="size-7 text-brand-green" aria-hidden />
        <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em]">Thank You</h2>
        <p className="mt-2 max-w-prose leading-relaxed text-muted">
          For now, correction reports are <strong className="text-ink">not sent or stored yet</strong>: the form shows how
          reporting will work. Once it is connected, we aim to review each report and log accepted changes in the methodology
          changelog.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium hover:border-[#cdd6e2]"
        >
          Report another correction
        </button>
      </div>
    );
  }

  const input =
    "mt-1.5 block w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[0.95rem] placeholder:text-muted/70 focus:border-brand-blue focus:outline-none aria-[invalid=true]:border-[#c0392b]";
  const label = "block text-sm font-semibold text-ink";
  const hint = "mt-1 text-xs text-muted";
  const err = (k: string) =>
    errors[k] && (
      <p id={`${id}-${k}-err`} className="mt-1.5 text-sm font-medium text-[#a32a1d]">
        {errors[k]}
      </p>
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div>
        <label htmlFor={`${id}-record`} className={label}>
          Which record?
        </label>
        <select id={`${id}-record`} name="record" value={record} onChange={(e) => setRecord(e.target.value)} className={input}>
          <option value="">General / not about one record</option>
          {records.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-problem`} className={label}>
          What is wrong? <span className="font-normal text-muted">(required)</span>
        </label>
        <textarea
          id={`${id}-problem`}
          name="problem"
          rows={4}
          required
          aria-invalid={!!errors.problem}
          aria-describedby={errors.problem ? `${id}-problem-err` : undefined}
          placeholder="e.g. The capacity is listed as 450 MW, but the regulator's filing says 420 MW (AC)."
          className={input}
        />
        {err("problem")}
      </div>
      <div>
        <label htmlFor={`${id}-correct`} className={label}>
          What should it say?
        </label>
        <input id={`${id}-correct`} name="correct" className={input} placeholder="e.g. 420 MW (AC)" />
      </div>
      <div>
        <label htmlFor={`${id}-source`} className={label}>
          Source link
        </label>
        <input
          id={`${id}-source`}
          name="source"
          type="url"
          inputMode="url"
          aria-invalid={!!errors.source}
          aria-describedby={`${id}-source-hint${errors.source ? ` ${id}-source-err` : ""}`}
          className={input}
          placeholder="https://"
        />
        <p id={`${id}-source-hint`} className={hint}>
          A primary source (regulator, company filing, grid operator) helps us check fastest.
        </p>
        {err("source")}
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={label}>
          Your email <span className="font-normal text-muted">(optional, only to follow up)</span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${id}-email-err` : undefined}
          className={input}
        />
        {err("email")}
      </div>
      <button type="submit" className="rounded-lg bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-blue">
        Send correction
      </button>
    </form>
  );
}
