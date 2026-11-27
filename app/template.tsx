"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark, MarkOutline } from "@/components/brand/Mark";
import { sectionName } from "@/lib/section-name";

declare global {
  interface Window {
    __ppNavigated?: boolean;
    /** Set when the Perpetual logo is clicked, so the page change replays the opening intro. */
    __ppLogoNav?: boolean;
  }
}

/**
 * Page change: a Perpetual blue curtain with the mark turning behind the name of the section being
 * opened, which then lifts to reveal the page. Keyed by the full path, so it also plays between pages
 * of the same section (a country review back to Policy). Not shown on the first load (the intro
 * plays there) or for reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <>
      <Curtain key={path} path={path} />
      {children}
    </>
  );
}

function Curtain({ path }: { path: string }) {
  const [kind] = useState<"none" | "section" | "intro">(() => {
    if (typeof window === "undefined" || window.__ppNavigated !== true) return "none";
    return window.__ppLogoNav ? "intro" : "section";
  });
  useEffect(() => {
    window.__ppNavigated = true;
    window.__ppLogoNav = false;
  }, []);
  if (kind === "intro")
    return (
      <div className="pp-replay" aria-hidden>
        <div className="flex flex-col items-center gap-5">
          <span className="pp-intro-mark">
            <Mark size={112} />
          </span>
          <span className="pp-intro-word font-wordmark text-[2.4rem] font-extrabold tracking-[-0.03em] text-[#0b5cad]">perpetual</span>
        </div>
      </div>
    );
  if (kind === "section")
    return (
      <div className="pp-curtain" aria-hidden>
        <span className="pp-curtain-mark absolute">
          <MarkOutline size={300} color="rgba(255,255,255,0.55)" strokeWidth={1.6} />
        </span>
        <span className="pp-curtain-word relative px-6 text-center font-display text-[clamp(2.8rem,8vw,6.5rem)] leading-none font-normal tracking-[-0.045em] text-white">
          {sectionName(path)}
        </span>
      </div>
    );
  return null;
}
