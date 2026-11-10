/** Designed stand-in shown while MapLibre loads: a quiet wireframe globe. */
export function MapPlaceholder({ theme = "light" }: { theme?: "light" | "dark" }) {
  const stroke = theme === "dark" ? "rgba(159,178,200,0.28)" : "rgba(8,60,110,0.14)";
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${theme === "dark" ? "bg-hero" : "bg-surface-2"}`}
      role="status"
      aria-label="Loading map"
    >
      <svg viewBox="0 0 200 200" className="h-[min(70%,420px)] w-auto motion-safe:animate-pulse" aria-hidden>
        <circle cx="100" cy="100" r="90" fill="none" stroke={stroke} strokeWidth="1.2" />
        {[30, 55, 75].map((rx) => (
          <ellipse key={rx} cx="100" cy="100" rx={rx} ry="90" fill="none" stroke={stroke} strokeWidth="1" />
        ))}
        {[-55, -25, 0, 25, 55].map((dy) => {
          const half = Math.sqrt(90 * 90 - dy * dy);
          return <line key={dy} x1={100 - half} x2={100 + half} y1={100 + dy} y2={100 + dy} stroke={stroke} strokeWidth="1" />;
        })}
      </svg>
    </div>
  );
}
