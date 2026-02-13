'use client';

export default function AnnouncementBar() {
  const announcements = [
    "Coming to the Lowcountry",
    "•",
    "Sporting Clays",
    "•",
    "5-Stand",
    "•",
    "Archery",
    "•",
    "Family-Friendly",
    "•",
    "Now Accepting Interest",
    "•",
  ];

  // Double the content for seamless loop
  const scrollContent = [...announcements, ...announcements];

  return (
    <div className="bg-[#a75235] text-[#f5f2ec] py-2 overflow-hidden">
      <div className="animate-scroll flex whitespace-nowrap">
        {scrollContent.map((item, index) => (
          <span
            key={index}
            className="mx-4 text-sm font-bold uppercase tracking-widest"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            {item}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
        @media (min-width: 1024px) {
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
