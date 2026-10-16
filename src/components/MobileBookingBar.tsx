"use client";

import Link from "next/link";

export default function MobileBookingBar() {
  return (
    <>
      <div className="h-[72px] md:hidden" aria-hidden="true"></div>
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#162838]/95 backdrop-blur border-t border-white/10 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/tour#book"
            className="border-2 border-[#f5f2ec] text-[#f5f2ec] text-sm font-bold uppercase tracking-wider py-[10px] text-center rounded"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Book a Tour
          </Link>
          <Link
            href="/member-for-a-day#book"
            className="bg-[#a75235] border-2 border-[#a75235] text-[#f5f2ec] text-sm font-bold uppercase tracking-wider py-[10px] text-center rounded"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Book Your Day
          </Link>
        </div>
      </div>
    </>
  );
}
