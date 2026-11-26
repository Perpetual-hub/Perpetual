import { Mark } from "@/components/brand/Mark";

/**
 * First-visit intro: the turbine mark spins up and settles, the wordmark appears, then the panel
 * lifts away. Pure CSS, so it never blocks the page: it plays once per browser session (the inline
 * script in the root layout marks it as seen) and is skipped for reduced motion.
 */
export function Intro() {
  return (
    <div className="pp-intro" aria-hidden>
      <div className="flex flex-col items-center gap-5">
        <span className="pp-intro-mark">
          <Mark size={112} />
        </span>
        <span className="pp-intro-word font-wordmark text-[2.4rem] font-extrabold tracking-[-0.03em] text-[#0b5cad]">perpetual</span>
      </div>
    </div>
  );
}

/** Runs before paint: shows the intro once per session. */
export const INTRO_SCRIPT =
  "try{var d=document.documentElement;d.classList.add('js');if(sessionStorage.getItem('pp-intro'))d.classList.add('intro-seen');else sessionStorage.setItem('pp-intro','1')}catch(e){}";
