"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Picture from "@/components/Picture";
import { StandMarker, PavilionMarker, type MarkerStyle } from "@/components/StandMarker";

const MARKER: MarkerStyle = "C";
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
  display?: { lat: number; lng: number };
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
const courseLabels = data.labels as { id: string; text: string; lat: number; lng: number }[];
const ROUTE_COLOR: Record<string, string> = { Riverside: "#a75235", Evergreen: "#4d5c47" };

const VIEWS = {
  courses: { bounds: COURSES, aerial: "tfc-aerial-courses-2023", map: "tfc-map-illustrated-courses", aspect: "1400 / 1429" },
  property: { bounds: FULL, aerial: "tfc-aerial-2023", map: "tfc-map-illustrated", aspect: "2000 / 1224" },
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
  const [aerial, setAerial] = useState(false);
  const v = VIEWS[view];
  const LBL = aerial
    ? "text-[#f5f2ec] [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]"
    : "text-[#2f3b2a] [text-shadow:0_0_4px_rgba(245,242,236,0.95)]";
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
              Two sporting clays courses, Riverside and Evergreen, with Riverside stands 12 to 15 along the Little Salkehatchie River, plus a 5-Stand with fourteen machines.
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

            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
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
              <label className="inline-flex items-center gap-2 text-sm text-[#162838] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={aerial}
                  onChange={(e) => setAerial(e.target.checked)}
                  className="w-4 h-4 accent-[#4d5c47] cursor-pointer"
                />
                Aerial photo
              </label>
            </div>

            <div
              className={`relative w-full mx-auto rounded-lg overflow-hidden shadow-md select-none bg-[#e9e1cb] ${view === "courses" ? "max-w-3xl" : ""}`}
              style={{ aspectRatio: v.aspect }}
            >
              <Picture
                key={aerial ? v.aerial : v.map}
                name={aerial ? v.aerial : v.map}
                alt={
                  aerial
                    ? view === "courses" ? "2023 aerial view of the Riverside and Evergreen courses" : "2023 aerial view of the whole Traditions Field Club property"
                    : view === "courses" ? "Illustrated map of the Riverside and Evergreen courses" : "Illustrated map of the whole Traditions Field Club property"
                }
                imgClassName="absolute inset-0 w-full h-full object-cover"
              />
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <defs>
                  <linearGradient id="wild" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor={aerial ? "#0f1a0e" : "#f1ead6"} stopOpacity={aerial ? 0.6 : 0.7} />
                    <stop offset="1" stopColor={aerial ? "#0f1a0e" : "#f1ead6"} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Members-only wild side tease: a soft veil to the west, no pin */}
                <rect x="0" y="0" width={view === "courses" ? 22 : 48} height="100" fill="url(#wild)" />
                <polygon points={outline} fill="none" stroke={aerial ? "#f5f2ec" : "#7a5a3c"} strokeOpacity={aerial ? 0.75 : 0.55} strokeWidth="1.5" strokeDasharray="6 4" vectorEffect="non-scaling-stroke" />
                {view === "courses" &&
                  (["Riverside", "Evergreen"] as const)
                    .filter((c) => filter === "All" || filter === c)
                    .map((c) => (
                      <polyline
                        key={c}
                        points={stations
                          .filter((s) => s.course === c)
                          .map((s) => {
                            const q = toPct(v.bounds, s.lat, s.lng);
                            return `${q.x.toFixed(2)},${q.y.toFixed(2)}`;
                          })
                          .join(" ")}
                        fill="none"
                        stroke={ROUTE_COLOR[c]}
                        strokeOpacity="0.8"
                        strokeWidth="2"
                        strokeDasharray="1 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                {view === "courses" &&
                  visible
                    .filter((s) => s.display)
                    .map((s) => {
                      const a = toPct(v.bounds, s.lat, s.lng);
                      const b = toPct(v.bounds, s.display!.lat, s.display!.lng);
                      return (
                        <g key={`lead-${s.id}`}>
                          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={ROUTE_COLOR[s.course] || "#4d5c47"} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                          <circle cx={a.x} cy={a.y} r="0.45" fill={ROUTE_COLOR[s.course] || "#4d5c47"} />
                        </g>
                      );
                    })}
              </svg>
              {/* Compass */}
              <svg viewBox="0 0 40 40" className="absolute right-[3%] bottom-[3%] w-8 h-8 sm:w-11 sm:h-11 pointer-events-none opacity-80" aria-hidden="true">
                <circle cx="20" cy="20" r="13" fill="none" stroke="#5b4a36" strokeWidth="0.8" />
                <path d="M20 4 L23 20 L20 36 L17 20 Z" fill="#f5f2ec" stroke="#5b4a36" strokeWidth="0.8" />
                <path d="M20 4 L23 20 L17 20 Z" fill="#a75235" />
                <path d="M4 20 L20 17.5 L36 20 L20 22.5 Z" fill="#f5f2ec" stroke="#5b4a36" strokeWidth="0.6" />
                <text x="20" y="3.2" textAnchor="middle" fontSize="5" fill="#5b4a36" fontFamily="serif">N</text>
              </svg>
              {/* Soft vignette */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(74,60,40,0.25)]"></div>
              {view === "courses" &&
                courseLabels.map((l) => {
                  const q = toPct(v.bounds, l.lat, l.lng);
                  return (
                    <div
                      key={l.id}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none text-sm sm:text-lg md:text-xl italic tracking-wide ${
                        aerial ? "text-[#f5f2ec] [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]" : l.id === "riverside" ? "text-[#8a3f27] [text-shadow:0_0_5px_rgba(245,242,236,0.95)]" : "text-[#3c4a36] [text-shadow:0_0_5px_rgba(245,242,236,0.95)]"
                      }`}
                      style={{ left: `${q.x}%`, top: `${q.y}%`, fontFamily: "var(--font-heading), serif" }}
                    >
                      {l.text}
                    </div>
                  );
                })}
              <div className={`absolute left-[2%] top-[3%] max-w-[30%] text-[10px] sm:text-xs md:text-sm italic leading-snug pointer-events-none ${LBL}`} style={{ fontFamily: "var(--font-heading), serif" }}>
                {view === "courses" ? "Beyond the courses lies the wild side." : "The wild side."} Members only.
              </div>
              {view === "courses" && (
                <div
                  className={`absolute text-[10px] sm:text-xs md:text-sm italic tracking-wide pointer-events-none -rotate-90 origin-left whitespace-nowrap ${aerial ? LBL : "text-[#3f6474] [text-shadow:0_0_4px_rgba(245,242,236,0.95)]"}`}
                  style={{ left: "4%", top: "86%", fontFamily: "var(--font-heading), serif" }}
                >
                  Little Salkehatchie River
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
                    <PavilionMarker style={MARKER} />
                    {view === "courses" && (
                      <span className={`mt-1 text-[10px] sm:text-xs italic tracking-wide ${LBL}`} style={{ fontFamily: "var(--font-heading), serif" }}>
                        {l.label}
                      </span>
                    )}
                  </div>
                );
              })}
              {visible.map((s) => {
                const p =
                  view === "courses"
                    ? toPct(v.bounds, s.display?.lat ?? s.lat, s.display?.lng ?? s.lng)
                    : { x: s.x, y: s.y };
                const small = view === "property";
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveId(s.id)}
                    aria-label={`${s.name}, ${s.difficulty}`}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70 rounded-full touch-manipulation ${
                      small
                        ? `w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[0px] rounded-full ring-1 ring-[#f5f2ec]/80 shadow ${COURSE_STYLE[s.course].pin}`
                        : "w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
                    } ${activeId === s.id ? "scale-125 z-10" : ""}`}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    {!small && s.course === "5-Stand" && (
                      <span
                        className={`absolute top-1/2 -translate-y-1/2 right-full mr-1.5 whitespace-nowrap text-[10px] sm:text-xs italic font-normal ${LBL}`}
                        style={{ fontFamily: "var(--font-heading), serif" }}
                      >
                        5-Stand
                      </span>
                    )}
                    {!small && <StandMarker style={MARKER} course={s.course} id={s.id} text={s.course === "5-Stand" ? "5S" : s.label} />}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[#666666] text-center mt-3">
              {aerial
                ? "Aerial imagery 2023. Imagery: USDA NAIP 2023. Station positions are approximate."
                : "Illustrated map drawn from 2023 aerial imagery. Station positions are approximate."}{" "}
              Photos and videos are being added.
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
