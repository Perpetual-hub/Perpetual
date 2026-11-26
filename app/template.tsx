"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MarkOutline } from "@/components/brand/Mark";
import { sectionName } from "@/lib/section-name";

declare global {
  interface Window {
    __ppNavigated?: boolean;
  }
}

/**
 * Page change: a Perpetual blue curtain with the mark turning behind the name of the section being
 * opened, which then lifts to reveal the page. Not shown on the first load (the intro plays there)
 * or for reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [curtain] = useState(() => typeof window !== "undefined" && window.__ppNavigated === true);
  useEffect(() => {
    window.__ppNavigated = true;
  }, []);
  return (
    <>
      {curtain && (
        <div className="pp-curtain" aria-hidden>
          <span className="pp-curtain-mark absolute">
            <MarkOutline size={300} color="rgba(255,255,255,0.55)" strokeWidth={1.6} />
          </span>
          <span className="pp-curtain-word relative px-6 text-center font-display text-[clamp(2.8rem,8vw,6.5rem)] leading-none font-normal tracking-[-0.045em] text-white">
            {sectionName(path)}
          </span>
        </div>
      )}
      {children}
    </>
  );
}
