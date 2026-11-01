// Stand marker styles for the Map of Traditions.
// A: wooden shed-roof stand, B: hand-inked field-map circle, C: brass medallion.
export type MarkerStyle = "A" | "B" | "C";

const ACCENT: Record<string, string> = {
  Riverside: "#a75235",
  Evergreen: "#4d5c47",
  "5-Stand": "#162838",
};

const RING: Record<string, string> = { Riverside: "#b8471f", Evergreen: "#2f5a2c", "5-Stand": "#13294a" };

const SERIF = "var(--font-heading), serif";

export function StandMarker({ style, course, text, id }: { style: MarkerStyle; course: string; text: string; id: string }) {
  const accent = ACCENT[course] || "#162838";
  const fs = text.length > 1 ? 11 : 13;
  if (style === "A") {
    // Shed-roof shooting stand: slanted roof, wooden front, number on the front board.
    return (
      <svg viewBox="0 0 32 32" className="w-full h-full overflow-visible drop-shadow-[0_2px_2px_rgba(40,30,20,0.45)]" aria-hidden="true">
        <defs>
          <linearGradient id={`wood-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c99a66" />
            <stop offset="1" stopColor="#a87a4a" />
          </linearGradient>
        </defs>
        <path d="M3 11 L29 6 L29 10 L3 15 Z" fill="#5a3d26" />
        <path d="M3 11 L29 6" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
        <rect x="5" y="13" width="22" height="16" rx="1.5" fill={`url(#wood-${id})`} stroke="#5a3d26" strokeWidth="1.2" />
        <path d="M5 18.5 H27 M5 24 H27" stroke="#8a6440" strokeWidth="0.5" opacity="0.6" />
        <text x="16" y="25.5" textAnchor="middle" fontSize={fs} fontWeight="700" fill="#fbf6ea" fontFamily="Lato, Arial, sans-serif" stroke="#4a3220" strokeWidth="0.6" paintOrder="stroke">
          {text}
        </text>
      </svg>
    );
  }
  if (style === "B") {
    // Hand-inked circle: slightly irregular double stroke, cream fill, serif number.
    return (
      <svg viewBox="0 0 32 32" className="w-full h-full overflow-visible drop-shadow-[0_1px_1.5px_rgba(40,30,20,0.35)]" aria-hidden="true">
        <path d="M16 2.6 C24 2.2 29.6 8.4 29.3 16.2 C29 24 23.4 29.6 15.6 29.4 C7.9 29.2 2.5 23.6 2.7 15.8 C2.9 8.4 8.3 3 16 2.6 Z" fill="#f7f1e1" stroke={accent} strokeWidth="2" />
        <path d="M15.4 4.4 C22.6 4.2 27.8 9.2 27.6 16.4 C27.4 23 22.6 27.8 15.8 27.6" fill="none" stroke={accent} strokeWidth="0.7" opacity="0.55" />
        <text x="16" y="16.3" dominantBaseline="central" textAnchor="middle" fontSize={fs + 2} fontWeight="800" fill="#2b241c" fontFamily={SERIF}>
          {text}
        </text>
      </svg>
    );
  }
  // C: brass medallion with engraved number and a course-colored outer rim.
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full overflow-visible drop-shadow-[0_2px_2px_rgba(40,30,20,0.5)]" aria-hidden="true">
      <defs>
        <radialGradient id={`brass-${id}`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#f6e2a6" />
          <stop offset="0.45" stopColor="#d4a855" />
          <stop offset="1" stopColor="#8f6626" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="15.6" fill={RING[course] || accent} stroke="#2a1d0c" strokeOpacity="0.35" strokeWidth="0.6" />
      <circle cx="16" cy="16" r="11.6" fill={`url(#brass-${id})`} stroke="#4a3410" strokeWidth="0.9" />
      <circle cx="16" cy="16" r="9.8" fill="none" stroke="#fff4cf" strokeWidth="0.7" opacity="0.55" />
      <text x="16" y="17" dominantBaseline="central" textAnchor="middle" fontSize={fs} fontWeight="800" fill="#fff6d6" fontFamily={SERIF}>
        {text}
      </text>
      <text x="16" y="16.3" dominantBaseline="central" textAnchor="middle" fontSize={fs} fontWeight="800" fill="#2e1f06" fontFamily={SERIF}>
        {text}
      </text>
    </svg>
  );
}

export function PavilionMarker({ style }: { style: MarkerStyle }) {
  if (style === "A")
    return (
      <svg viewBox="0 0 24 20" className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm" aria-hidden="true">
        <path d="M1 8 L12 2 L23 8 Z" fill="#5a3d26" />
        <rect x="3" y="8" width="18" height="10" fill="#c99a66" stroke="#5a3d26" strokeWidth="1" />
        <path d="M7 8 V18 M12 8 V18 M17 8 V18" stroke="#5a3d26" strokeWidth="0.8" />
      </svg>
    );
  if (style === "B")
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true">
        <path d="M2.4 2.2 L17.8 2.6 L17.6 17.8 L2.2 17.4 Z" fill="#f7f1e1" stroke="#2b241c" strokeWidth="1.5" />
        <path d="M3 3 L17 17 M17 3 L3 17" stroke="#2b241c" strokeWidth="0.7" opacity="0.6" />
      </svg>
    );
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" aria-hidden="true">
      <defs>
        <linearGradient id="brass-pav" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f0d48e" />
          <stop offset="1" stopColor="#9c7230" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="16" height="16" fill="url(#brass-pav)" stroke="#5c4318" strokeWidth="1.2" />
      <rect x="6" y="6" width="8" height="8" fill="none" stroke="#5c4318" strokeWidth="0.8" />
    </svg>
  );
}
