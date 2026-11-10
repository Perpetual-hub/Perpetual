import Image from "next/image";
import type { TechMeta } from "@/lib/tech";
import { TECH_PHOTOS } from "@/lib/tech-photos";

interface Stat {
  label: string;
  value: string;
  unit?: string;
}

/**
 * Technology page header. With a photo: full-bleed HD image under a navy overlay (keeps
 * text at AA contrast), white type, and the required attribution. Without one: a subtle
 * wash of the technology colour.
 */
export function TechHero({ t, stats }: { t: TechMeta; stats: Stat[] }) {
  const Icon = t.icon;
  const photo = TECH_PHOTOS[t.id];
  const dark = Boolean(photo);

  return (
    <header
      className={`relative isolate overflow-hidden border-b border-line ${dark ? "on-dark bg-hero" : ""}`}
      style={dark ? undefined : { background: `${t.hex}0d` }}
    >
      {photo && (
        <>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="100vw"
            quality={80}
            className="-z-20 object-cover"
            style={{ objectPosition: photo.position ?? "center" }}
          />
          {/* Overlay: strong on the left where the text sits, lighter on the right so the photo shows */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(6,26,51,0.9) 0%, rgba(6,26,51,0.72) 40%, rgba(6,26,51,0.18) 100%), linear-gradient(0deg, rgba(6,26,51,0.5) 0%, rgba(6,26,51,0) 40%)",
            }}
          />
        </>
      )}
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: t.hex }} aria-hidden />

      <div
        className={`container-page grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end ${
          dark ? "pt-20 pb-16 md:pt-28 md:pb-20" : "pt-12 pb-12"
        }`}
      >
        <div>
          <div className="flex items-center gap-3">
            <span
              className={`flex size-12 items-center justify-center rounded-xl border ${dark ? "border-white/20 bg-white/10 backdrop-blur-sm" : "border-line bg-white"}`}
              aria-hidden
            >
              <Icon className="size-6" style={{ color: dark ? "#fff" : t.hex }} />
            </span>
            <p className={`text-xs font-semibold ${dark ? "text-hero-muted" : "text-muted"}`}>Sector</p>
          </div>
          <h1 className={`mt-5 text-4xl font-extrabold tracking-[-0.025em] md:text-6xl ${dark ? "text-white" : ""}`}>{t.label}</h1>
          <p className={`mt-5 max-w-[60ch] text-lg leading-relaxed ${dark ? "text-[#d5e0ec]" : "text-ink/80"}`}>{t.explainer}</p>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line shadow-[0_12px_40px_-20px_rgba(0,0,0,0.5)]">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-5 py-4">
              <dt className="text-xs font-medium text-muted">{s.label}</dt>
              <dd className="tabular mt-1 font-display text-3xl font-bold tracking-tight text-brand-navy">
                {s.value}
                {s.unit && <span className="ml-1 text-base font-semibold text-muted">{s.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {photo && (
        <p className="absolute right-4 bottom-2 max-w-[70%] truncate text-right text-[10px] text-white/70 md:right-8">
          Photo:{" "}
          <a href={photo.sourceUrl} target="_blank" rel="noopener" className="underline-offset-2 hover:text-white hover:underline">
            {photo.credit}
          </a>
          ,{" "}
          <a href={photo.licenseUrl} target="_blank" rel="noopener license" className="underline-offset-2 hover:text-white hover:underline">
            {photo.license}
          </a>
          {photo.modified && ", cropped and darkened"}
        </p>
      )}
    </header>
  );
}
