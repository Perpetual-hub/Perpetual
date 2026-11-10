import { TECH_BY_ID } from "@/lib/tech";
import type { Technology } from "@/lib/types";

/** Technology label: colour dot + name (never colour alone). */
export function TechTag({
  tech,
  withIcon = false,
  tone = "light",
  size = "sm",
}: {
  tech: Technology;
  withIcon?: boolean;
  tone?: "light" | "dark";
  size?: "xs" | "sm";
}) {
  const t = TECH_BY_ID[tech];
  const Icon = t.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium whitespace-nowrap ${size === "xs" ? "text-[11px]" : "text-xs"} ${
        tone === "dark" ? "text-hero-ink" : "text-ink"
      }`}
    >
      {withIcon ? (
        <Icon className="size-3.5" style={{ color: t.hex }} aria-hidden />
      ) : (
        <span className="size-2 shrink-0 rounded-full" style={{ background: t.hex }} aria-hidden />
      )}
      {t.label}
    </span>
  );
}

export function TechDot({ tech, className = "size-2" }: { tech: Technology; className?: string }) {
  return <span className={`${className} inline-block shrink-0 rounded-full`} style={{ background: TECH_BY_ID[tech].hex }} aria-hidden />;
}
