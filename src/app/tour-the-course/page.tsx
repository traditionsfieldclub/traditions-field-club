"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Picture from "@/components/Picture";
import data from "@/data/course-stations.json";

type Station = {
  id: string;
  label: string;
  name: string;
  course: string;
  difficulty: string;
  x: number;
  y: number;
  lat: number | null;
  lng: number | null;
  description: string;
  photo: string | null;
  video: string | null;
};

const stations = data.stations as Station[];

const COURSE_STYLE: Record<string, { pin: string; chip: string }> = {
  "Course 1": { pin: "bg-[#a75235] text-[#f5f2ec]", chip: "bg-[#a75235]" },
  "Course 2": { pin: "bg-[#4d5c47] text-[#f5f2ec]", chip: "bg-[#4d5c47]" },
  "5-Stand": { pin: "bg-[#162838] text-[#f5f2ec] ring-2 ring-[#f5f2ec]", chip: "bg-[#162838]" },
};

function isEmbeddable(url: string) {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}

function toEmbed(url: string) {
  const yt = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return url;
}

function CourseMap() {
  // Illustrated, not to scale. Pins are positioned by percent from src/data/course-stations.json.
  return (
    <svg viewBox="0 0 1000 700" className="absolute inset-0 w-full h-full" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <pattern id="pines" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="5" fill="#3f5a3a" opacity="0.55" />
          <circle cx="21" cy="19" r="6" fill="#36502f" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="1000" height="700" fill="#5b7a4f" />
      <rect width="1000" height="700" fill="url(#pines)" />
      {/* Wild side tease, upper left */}
      <rect x="0" y="0" width="300" height="230" fill="#1f2a1c" opacity="0.55" />
      {/* River */}
      <path d="M0 660 C 150 630, 260 700, 400 690 S 650 660, 760 700" stroke="#6f8fa3" strokeWidth="26" fill="none" opacity="0.9" />
      <path d="M0 660 C 150 630, 260 700, 400 690 S 650 660, 760 700" stroke="#9fb9c8" strokeWidth="8" fill="none" opacity="0.7" />
      {/* Trails */}
      <path d="M500 560 L560 500 L610 440 L660 385 L720 330 L780 280 L835 235 L870 300 L860 380 L820 450 L760 510 L700 560 L620 610 L540 640 L460 655 L380 640"
        stroke="#e9dfc7" strokeWidth="6" strokeDasharray="2 10" strokeLinecap="round" fill="none" />
      <path d="M500 560 L440 500 L400 450 L360 400 L320 350 L270 310 L220 280 L180 330 L170 400 L200 460 L250 500 L310 530 L370 540 L500 560"
        stroke="#e9dfc7" strokeWidth="6" strokeDasharray="2 10" strokeLinecap="round" fill="none" />
      {/* Pavilion and entrance */}
      <rect x="470" y="540" width="60" height="34" rx="4" fill="#e9dfc7" />
      <path d="M500 574 L500 700" stroke="#d8ccb0" strokeWidth="10" />
    </svg>
  );
}

export default function TourTheCourse() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const active = stations.find((s) => s.id === activeId) || null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  const step = (dir: number) => {
    if (!active) return;
    const i = stations.findIndex((s) => s.id === active.id);
    setActiveId(stations[(i + dir + stations.length) % stations.length].id);
  };

  const visible = stations.filter((s) => filter === "All" || s.course === filter);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-grow bg-[#f5f2ec]">
        {/* Hero */}
        <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[#162838]">
            <Picture name="overhead-trails" alt="" imgClassName="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#162838]/70"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Tour the Course
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              Two sporting clays courses, Riverside stands along the Salkehatchie, and a 5-Stand with fourteen machines.
              Tap any station to take a look.
            </p>
          </div>
        </section>

        {/* Map */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {[
                ["All", "All stations"],
                ["Course 1", "Course 1: 15 stations"],
                ["Course 2", "Course 2: 12 stations"],
                ["5-Stand", "5-Stand"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors cursor-pointer ${
                    filter === key
                      ? "bg-[#162838] border-[#162838] text-[#f5f2ec]"
                      : "border-[#162838]/30 text-[#162838] hover:border-[#162838]"
                  }`}
                >
                  {key !== "All" && <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${COURSE_STYLE[key].chip}`}></span>}
                  {label}
                </button>
              ))}
            </div>

            <div className="relative w-full aspect-[10/7] rounded-lg overflow-hidden shadow-md select-none">
              <CourseMap />
              <div className="absolute left-[2%] top-[3%] max-w-[26%] text-[#f5f2ec]/80 text-[10px] sm:text-xs md:text-sm italic leading-snug pointer-events-none">
                Beyond the courses lies the wild side. Members only.
              </div>
              <div className="absolute left-[3%] bottom-[11%] text-[#f5f2ec] text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase pointer-events-none">
                Salkehatchie River
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[73%] text-[#162838] text-[9px] sm:text-[11px] font-bold uppercase tracking-wider pointer-events-none mt-6 sm:mt-8">
                Pavilion
              </div>
              {visible.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  aria-label={`${s.name}, ${s.difficulty}`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg cursor-pointer transition-transform hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70 touch-manipulation ${
                    COURSE_STYLE[s.course].pin
                  } ${activeId === s.id ? "scale-125 ring-4 ring-white" : ""}`}
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#666666] text-center mt-3">
              Illustrated map, not to scale. Station photos and videos are being added.
            </p>
          </div>
        </section>

        {/* Book */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl text-[#162838] mb-4" style={{ fontFamily: "var(--font-heading), serif" }}>
              See it in person
            </h2>
            <p className="text-[#333333] mb-8">
              Shoot the course for a day at $100 per shooter, or take a complimentary tour. No cost, no commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/member-for-a-day#book"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Book Your Day
              </Link>
              <Link
                href="/tour#book"
                className="inline-block border-2 border-[#4d5c47] text-[#4d5c47] px-8 py-[10px] font-semibold tracking-wide hover:bg-[#4d5c47] hover:text-[#f5f2ec] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Book a Tour
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Station card */}
      {active && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center" role="dialog" aria-modal="true" aria-label={active.name}>
          <button type="button" aria-label="Close" className="absolute inset-0 bg-black/50 cursor-default" onClick={() => setActiveId(null)}></button>
          <div className="relative w-full md:max-w-lg bg-white rounded-t-2xl md:rounded-2xl shadow-xl max-h-[85vh] overflow-y-auto pb-[env(safe-area-inset-bottom)]">
            <div className="relative aspect-video bg-[#162838]">
              {active.video ? (
                isEmbeddable(active.video) ? (
                  <iframe
                    src={toEmbed(active.video)}
                    title={`${active.name} video`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video src={active.video} controls playsInline poster={active.photo || undefined} className="absolute inset-0 w-full h-full object-cover" />
                )
              ) : (
                <>
                  {active.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={active.photo} alt={active.name} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                    Video coming soon
                  </span>
                </>
              )}
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-[#f5f2ec] text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${COURSE_STYLE[active.course].chip}`}>
                  {active.course}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">{active.difficulty}</span>
              </div>
              <h3 className="text-2xl text-[#162838] mb-3" style={{ fontFamily: "var(--font-heading), serif" }}>
                {active.name}
              </h3>
              <p className="text-[#333333] leading-relaxed mb-5">{active.description}</p>
              <div className="flex items-center justify-between gap-3">
                <button type="button" onClick={() => step(-1)} className="px-4 py-2 rounded-lg border-2 border-[#162838]/20 text-[#162838] font-semibold cursor-pointer">
                  Previous
                </button>
                <Link href="/member-for-a-day#book" className="text-[#a75235] font-semibold hover:underline text-sm">
                  Book Your Day
                </Link>
                <button type="button" onClick={() => step(1)} className="px-4 py-2 rounded-lg border-2 border-[#162838]/20 text-[#162838] font-semibold cursor-pointer">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
