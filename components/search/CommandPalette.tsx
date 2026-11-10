"use client";

import Fuse from "fuse.js";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { SearchEntry, SearchType } from "@/lib/data";
import { TECH_BY_ID } from "@/lib/tech";

const GROUP_LABEL: Record<SearchType, string> = {
  project: "Projects",
  technology: "Technologies",
  country: "Countries",
  region: "Regions",
  deal: "Deals",
  news: "News & Policy",
  page: "Pages",
};
const GROUP_ORDER: SearchType[] = ["project", "technology", "country", "region", "deal", "news", "page"];
const PER_GROUP = 5;

/** Opens with ⌘K / Ctrl K (or the header search button) and searches everything at once. */
let indexPromise: Promise<SearchEntry[]> | null = null;
const loadIndex = () => (indexPromise ??= fetch("/search-index.json").then((r) => r.json() as Promise<SearchEntry[]>));

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [index, setIndex] = useState<SearchEntry[]>([]);
  useEffect(() => {
    loadIndex().then(setIndex, () => setIndex([]));
  }, []);
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<Element | null>(null);
  const id = useId();

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: "title", weight: 3 },
          { name: "keywords", weight: 1 },
          { name: "subtitle", weight: 0.5 },
        ],
        threshold: 0.36,
        ignoreLocation: true,
      }),
    [index],
  );

  const groups = useMemo(() => {
    const hits = q.trim()
      ? fuse.search(q.trim(), { limit: 60 }).map((r) => r.item)
      : index.filter((e) => e.type === "technology" || e.type === "page");
    const gs = GROUP_ORDER.map((type) => ({ type, items: hits.filter((h) => h.type === type).slice(0, PER_GROUP) })).filter(
      (g) => g.items.length,
    );
    // Each group's offset into the flat list, for keyboard navigation.
    return gs.map((g, k) => ({ ...g, start: gs.slice(0, k).reduce((n, x) => n + x.items.length, 0) }));
  }, [q, fuse, index]);
  const flat = groups.flatMap((g) => g.items);

  // Focus management + scroll lock.
  useEffect(() => {
    if (open) {
      returnTo.current = document.activeElement;
      document.documentElement.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.documentElement.style.overflow = "";
      (returnTo.current as HTMLElement | null)?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const close = useCallback(() => {
    onOpenChange(false);
    setQ("");
    setActive(0);
  }, [onOpenChange]);

  const go = (e?: SearchEntry) => {
    if (!e) return;
    close();
    router.push(e.href);
  };

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(flat[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus in the dialog
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" role="presentation">
      <div className="absolute inset-0 bg-[#061a33]/40" onClick={close} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search Perpetual"
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-20px_rgba(6,26,51,0.45)]"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-5 shrink-0 text-muted" aria-hidden />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={`${id}-list`}
            aria-activedescendant={flat[active] ? `${id}-opt-${active}` : undefined}
            aria-autocomplete="list"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Search projects, countries, deals, news…"
            className="h-14 flex-1 bg-transparent text-base text-ink placeholder:text-muted/80 focus:outline-none"
          />
          <button type="button" onClick={close} aria-label="Close search" className="rounded-md p-1.5 text-muted hover:bg-surface-2">
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div ref={listRef} id={`${id}-list`} role="listbox" aria-label="Results" className="max-h-[60vh] overflow-y-auto p-2">
          {flat.length === 0 && (
            <p className="px-3 py-10 text-center text-sm text-muted">
              No results for &ldquo;{q}&rdquo;. Try a project, company, country or technology.
            </p>
          )}
          {groups.map((g) => (
            <div key={g.type} role="group" aria-labelledby={`${id}-g-${g.type}`} className="py-1">
              <div id={`${id}-g-${g.type}`} className="px-3 pt-2 pb-1 text-xs font-semibold text-muted">
                {q.trim() ? GROUP_LABEL[g.type] : g.type === "page" ? "Pages" : "Jump to a technology"}
              </div>
              {g.items.map((e, j) => {
                const idx = g.start + j;
                const on = idx === active;
                const t = e.tech ? TECH_BY_ID[e.tech] : undefined;
                return (
                  <div
                    key={e.href}
                    id={`${id}-opt-${idx}`}
                    role="option"
                    aria-selected={on}
                    data-index={idx}
                    onMouseMove={() => setActive(idx)}
                    onClick={() => go(e)}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${on ? "bg-surface-2" : ""}`}
                  >
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ background: t?.hex ?? "var(--line)" }}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{e.title}</span>
                      <span className="block truncate text-xs text-muted">{e.subtitle}</span>
                    </span>
                    {on ? (
                      <CornerDownLeft className="size-4 shrink-0 text-muted" aria-hidden />
                    ) : (
                      <ArrowRight className="size-4 shrink-0 text-transparent" aria-hidden />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-line bg-surface-2 px-4 py-2.5 text-xs text-muted">
          <span>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> to move
          </span>
          <span>
            <Kbd>Enter</Kbd> to open
          </span>
          <span>
            <Kbd>Esc</Kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-line bg-white px-1.5 py-0.5 font-sans text-[11px] text-ink">{children}</kbd>;
}
