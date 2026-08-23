'use client';

import { useEffect, useRef } from "react";

export default function AnnouncementBar() {
  const barRef = useRef<HTMLDivElement>(null);

  // Keep --announcement-height in sync with the bar's real rendered height,
  // since the message wraps to 2 lines on narrow screens (Header reads this
  // var to position itself correctly instead of assuming a fixed 1-line height).
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty("--announcement-height", `${el.offsetHeight}px`);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} className="fixed top-0 left-0 right-0 z-[60]">
      <a
        href="/membership"
        className="block bg-[#162838] text-[#f5f2ec] py-2 text-center hover:bg-[#1e3a50] transition-colors"
      >
        <span
          className="text-xs min-[375px]:text-sm sm:text-xs font-bold uppercase tracking-[0.1em] min-[375px]:tracking-[0.15em] sm:tracking-[0.2em]"
          style={{ fontFamily: "var(--font-heading), serif" }}
        >
          <span className="sm:hidden">
            GET IN EARLY!
            <br />
            2027 Membership Launches Oct. 1
          </span>
          <span className="hidden sm:inline">
            GET IN EARLY! — 2027 Membership Launches Oct. 1
          </span>
        </span>
      </a>
    </div>
  );
}
