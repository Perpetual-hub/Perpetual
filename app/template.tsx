"use client";

import { useEffect, useState } from "react";
import { MarkOnDark } from "@/components/brand/Mark";

declare global {
  interface Window {
    __ppNavigated?: boolean;
  }
}

/**
 * Page change: a deep green curtain with the spinning mark covers the screen, then lifts to reveal
 * the new page. Not shown on the first load (the intro plays there) or for reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [curtain] = useState(() => typeof window !== "undefined" && window.__ppNavigated === true);
  useEffect(() => {
    window.__ppNavigated = true;
  }, []);
  return (
    <>
      {curtain && (
        <div className="pp-curtain" aria-hidden>
          <span className="pp-curtain-mark">
            <MarkOnDark size={72} bg="#16211b" />
          </span>
        </div>
      )}
      {children}
    </>
  );
}
