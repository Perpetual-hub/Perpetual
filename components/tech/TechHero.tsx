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
                "linear-gradient(90deg, rgba(14,22,17,0.92) 0%, rgba(14,22,17,0.72) 42%, rgba(14,22,17,0.22) 100%), linear-gradient(0deg, rgba(14,22,17,0.55) 0%, rgba(14,22,17,0) 45%)",
            }}
          />
        </>
      )}

      <div
        className={`container-page grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end ${
          dark ? "pt-20 pb-16 md:pt-28 md:pb-20" : "pt-12 pb-12"
        }`}
      >
        <div>
          <div className="flex items-center gap-3">
            <span
              className={`flex size-10 items-center justify-center rounded-full border ${dark ? "border-white/20 bg-white/10 backdrop-blur-sm" : "border-line bg-white"}`}
              aria-hidden
            >
              <Icon className="size-5" style={{ color: dark ? "#fff" : t.hex }} />
            </span>
            <p className={`text-[11px] font-semibold tracking-[0.16em] uppercase ${dark ? "text-hero-ink" : "text-ink"}`}>Sector</p>
          </div>
          <h1 className={`mt-6 font-display text-[3.2rem] leading-[0.95] font-light tracking-[-0.045em] sm:text-[4.5rem] lg:text-[6.5rem] ${dark ? "text-hero-ink" : "text-[#1d2a22]"}`}>{t.label}</h1>
          <p className={`mt-5 max-w-[60ch] text-lg leading-relaxed ${dark ? "text-hero-ink/85" : "text-ink/80"}`}>{t.explainer}</p>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-white/15 bg-white/10 backdrop-blur-md">
          {stats.map((s) => (
            <div key={s.label} className={`px-5 py-4 ${dark ? "bg-[#16211b]/60" : "bg-white"}`}>
              <dt className={`text-xs ${dark ? "text-hero-muted" : "text-muted"}`}>{s.label}</dt>
              <dd className={`tabular mt-1 font-display text-3xl font-light tracking-[-0.02em] ${dark ? "text-hero-ink" : "text-[#1d2a22]"}`}>
                {s.value}
                {s.unit && <span className={`ml-1 text-base ${dark ? "text-hero-muted" : "text-muted"}`}>{s.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {photo?.credit && (
        <p className="absolute right-4 bottom-2 max-w-[70%] truncate text-right text-[10px] text-white/70 md:right-8">
          Photo by{" "}
          {photo.sourceUrl ? (
            <a href={photo.sourceUrl} target="_blank" rel="noopener" className="underline-offset-2 hover:text-white hover:underline">
              {photo.credit}
            </a>
          ) : (
            photo.credit
          )}
          {photo.license && (
            <>
              ,{" "}
              {photo.licenseUrl ? (
                <a href={photo.licenseUrl} target="_blank" rel="noopener license" className="underline-offset-2 hover:text-white hover:underline">
                  {photo.license}
                </a>
              ) : (
                photo.license
              )}
            </>
          )}
          {photo.modified && ", cropped and darkened"}
        </p>
      )}
    </header>
  );
}
