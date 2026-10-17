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
  lat: number;
  lng: number;
  description: string;
  photo: string | null;
  video: string | null;
};

type Bounds = { north: number; south: number; west: number; east: number };

const stations = data.stations as Station[];
const FULL = data.bounds as Bounds;
const COURSES = data.courseView as Bounds;
const boundary = data.boundary as number[][];
const landmarks = data.landmarks as { id: string; label: string; lat: number; lng: number }[];

const VIEWS = {
  courses: { bounds: COURSES, image: "tfc-aerial-courses-2023", aspect: "1293 / 1317" },
  property: { bounds: FULL, image: "tfc-aerial-2023", aspect: "2000 / 1224" },
} as const;
type ViewKey = keyof typeof VIEWS;

function toPct(b: Bounds, lat: number, lng: number) {
  return {
    x: ((lng - b.west) / (b.east - b.west)) * 100,
    y: ((b.north - lat) / (b.north - b.south)) * 100,
  };
}

const COURSE_STYLE: Record<string, { pin: string; chip: string }> = {
  Riverside: { pin: "bg-[#a75235] text-[#f5f2ec]", chip: "bg-[#a75235]" },
  Evergreen: { pin: "bg-[#f5f2ec] text-[#4d5c47] !ring-2 !ring-[#4d5c47]", chip: "bg-[#4d5c47]" },
  "5-Stand": { pin: "bg-[#162838] text-[#f5f2ec]", chip: "bg-[#162838]" },
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

export default function TourTheCourse() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [view, setView] = useState<ViewKey>("courses");
  const v = VIEWS[view];
  const outline = boundary
    .map(([lng, lat]) => {
      const p = toPct(v.bounds, lat, lng);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    })
    .join(" ");
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
              Two sporting clays courses, Riverside and Evergreen, with Riverside stands 12 to 15 along the old Salkehatchie River, plus a 5-Stand with fourteen machines.
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
                ["Riverside", "Riverside: 15 stands"],
                ["Evergreen", "Evergreen: 12 stands"],
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

            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-lg border-2 border-[#162838]/20 p-1 bg-white">
                {([
                  ["courses", "The courses"],
                  ["property", "Whole property"],
                ] as [ViewKey, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setView(key)}
                    aria-pressed={view === key}
                    className={`px-4 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition-colors ${
                      view === key ? "bg-[#4d5c47] text-[#f5f2ec]" : "text-[#162838] hover:bg-[#f5f2ec]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`relative w-full mx-auto rounded-lg overflow-hidden shadow-md select-none bg-[#2f3b2a] ${view === "courses" ? "max-w-3xl" : ""}`}
              style={{ aspectRatio: v.aspect }}
            >
              <Picture
                name={v.image}
                alt={view === "courses" ? "2023 aerial view of the Riverside and Evergreen courses" : "2023 aerial view of the whole Traditions Field Club property"}
                imgClassName="absolute inset-0 w-full h-full object-cover"
              />
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <defs>
                  <linearGradient id="wild" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#0f1a0e" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#0f1a0e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Members-only wild side tease: a soft veil to the west, no pin */}
                <rect x="0" y="0" width={view === "courses" ? 22 : 48} height="100" fill="url(#wild)" />
                <polygon points={outline} fill="none" stroke="#f5f2ec" strokeOpacity="0.75" strokeWidth="1.5" strokeDasharray="6 4" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="absolute left-[2%] top-[3%] max-w-[30%] text-[#f5f2ec]/85 text-[10px] sm:text-xs md:text-sm italic leading-snug pointer-events-none [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                {view === "courses" ? "Beyond the courses lies the wild side." : "The wild side."} Members only.
              </div>
              {view === "courses" && (
                <div
                  className="absolute text-[#f5f2ec] text-[9px] sm:text-[11px] md:text-xs font-semibold tracking-wider uppercase pointer-events-none [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] -rotate-90 origin-left whitespace-nowrap"
                  style={{ left: "6%", top: "98%" }}
                >
                  Old Salkehatchie River
                </div>
              )}
              {landmarks.map((l) => {
                const p = toPct(v.bounds, l.lat, l.lng);
                return (
                  <div
                    key={l.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <span className="block w-3 h-3 rotate-45 bg-[#f5f2ec] shadow"></span>
                    {view === "courses" && (
                      <span className="mt-1 text-[#f5f2ec] text-[9px] sm:text-[11px] font-bold uppercase tracking-wider [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
                        {l.label}
                      </span>
                    )}
                  </div>
                );
              })}
              {visible.map((s) => {
                const p = view === "courses" ? toPct(v.bounds, s.lat, s.lng) : { x: s.x, y: s.y };
                const small = view === "property";
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveId(s.id)}
                    aria-label={`${s.name}, ${s.difficulty}`}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-bold shadow-lg cursor-pointer transition-transform hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70 touch-manipulation ring-1 ring-[#f5f2ec]/80 ${
                      small
                        ? "w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[0px]"
                        : "w-5 h-5 text-[10px] sm:w-7 sm:h-7 sm:text-xs md:w-8 md:h-8 md:text-sm"
                    } ${COURSE_STYLE[s.course].pin} ${activeId === s.id ? "scale-125 ring-4 ring-white z-10" : ""}`}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    {small ? "" : s.label}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[#666666] text-center mt-3">
              Aerial imagery 2023. Imagery: USDA NAIP 2023. Station positions are approximate, and photos and videos are being added.
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
