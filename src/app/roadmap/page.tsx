"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Roadmap() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative py-20 md:py-28 lg:py-32">
          <div className="absolute inset-0 bg-[#3d5a45]">
            <div className="absolute inset-0 bg-[#3d5a45]/70"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Roadmap
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              Our journey from vision to reality — see what&apos;s coming next
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section
          id="intro"
          ref={(el) => { sectionRefs.current["intro"] = el; }}
          className="py-16 md:py-24 bg-white overflow-hidden"
        >
          <div
            className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ease-out ${
              isVisible("intro")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">The Journey</span>
              <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
            </div>
            <h2
              className="text-3xl md:text-4xl text-[#162838] mb-6"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Building Something Special
            </h2>
            <div className="flex justify-center mb-6">
              <span className="h-[1px] w-16 bg-[#a75235]"></span>
            </div>
            <p className="text-lg text-[#333333] leading-relaxed">
              Traditions Field Club is being built in phases, each one bringing us closer to our vision
              of a premier outdoor sporting destination. From our initial sporting clays courses to
              future camping facilities and a barn-style lodge, every phase is designed to enhance
              your experience while preserving the natural beauty of the land.
            </p>
          </div>
        </section>

        {/* Phase 1 - Image Left */}
        <section
          id="phase1"
          ref={(el) => { sectionRefs.current["phase1"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Phase 1 Image */}
              <div
                className={`relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden transition-all duration-1000 ease-out ${
                  isVisible("phase1")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 md:-translate-x-10"
                }`}
              >
                <Image
                  src="/images/land_clearing_chainsaw.webp"
                  alt="Land clearing work for Phase 1 at Traditions Field Club"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isVisible("phase1")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 md:translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Current Phase</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#3d5a45] text-[#f5f2ec] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    In Progress
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Phase 1: Foundation
                </h2>
                <p className="text-[#333333] leading-relaxed mb-6">
                  Establishing the core shooting sports facilities and building the foundation
                  for everything to come. This phase focuses on creating a world-class sporting
                  clays experience from day one.
                </p>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>2 sporting clays courses with 12 stations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Dedicated 5-stand facility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Outdoor archery range</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Member check-in and basic amenities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Safety infrastructure and signage</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 2 - Image Right */}
        <section
          id="phase2"
          ref={(el) => { sectionRefs.current["phase2"] = el; }}
          className="py-16 md:py-24 bg-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content - First on mobile */}
              <div
                className={`order-2 lg:order-1 transition-all duration-1000 ease-out ${
                  isVisible("phase2")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 md:-translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Coming Soon</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#162838] text-[#f5f2ec] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Planned
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Phase 2: Expansion
                </h2>
                <p className="text-[#333333] leading-relaxed mb-6">
                  Growing our facilities to accommodate more members and enhance the overall
                  experience with improved amenities and additional course options.
                </p>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Third sporting clays course</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Pro shop with equipment and supplies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Key card member access system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Covered pavilion for events and gatherings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Youth and beginner instruction programs</span>
                  </li>
                </ul>
              </div>

              {/* Phase 2 Image */}
              <div
                className={`relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden order-1 lg:order-2 transition-all duration-1000 ease-out delay-200 ${
                  isVisible("phase2")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 md:translate-x-10"
                }`}
              >
                <Image
                  src="/images/entrance_gate_pines.webp"
                  alt="Entrance gate concept for Traditions Field Club"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#162838]/50 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold tracking-[0.3em] uppercase bg-[#162838]/60 px-4 py-2 rounded">Coming Soon</span>
                </div>
                <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/60 italic">*Rendering — subject to change</p>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 3 - Image Left */}
        <section
          id="phase3"
          ref={(el) => { sectionRefs.current["phase3"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Phase 3 Image */}
              <div
                className={`relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden transition-all duration-1000 ease-out ${
                  isVisible("phase3")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 md:-translate-x-10"
                }`}
              >
                <Image
                  src="/images/lodge_exterior_render.webp"
                  alt="Lodge exterior concept for Traditions Field Club"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#162838]/50 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold tracking-[0.3em] uppercase bg-[#162838]/60 px-4 py-2 rounded">Coming Soon</span>
                </div>
                <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/60 italic">*Rendering — subject to change</p>
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isVisible("phase3")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 md:translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Future Vision</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#162838] text-[#f5f2ec] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Planned
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Phase 3: Recreation
                </h2>
                <p className="text-[#333333] leading-relaxed mb-6">
                  Transforming the property into a full outdoor recreation destination
                  with trails, camping, and facilities for extended stays.
                </p>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Walking paths and hiking trails</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Barn-style lodge with Southern charm</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Hosted events with food truck or private catering options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Duck blinds and wildlife viewing areas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Outdoor event spaces</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 4 - Image Right */}
        <section
          id="phase4"
          ref={(el) => { sectionRefs.current["phase4"] = el; }}
          className="py-16 md:py-24 bg-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content - First on mobile */}
              <div
                className={`order-2 lg:order-1 transition-all duration-1000 ease-out ${
                  isVisible("phase4")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 md:-translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">The Dream</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#162838] text-[#f5f2ec] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Long-Term
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Phase 4: The Lodge
                </h2>
                <p className="text-[#333333] leading-relaxed mb-6">
                  The crown jewel of our vision — a barn-style lodge that serves as the heart
                  of Traditions Field Club, welcoming families, hosting events, and creating
                  memories for generations to come.
                </p>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Primitive camping areas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>RV lot with hookups</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Event and banquet facilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Overnight accommodations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Corporate retreat packages</span>
                  </li>
                </ul>
              </div>

              {/* Phase 4 Image */}
              <div
                className={`relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden order-1 lg:order-2 transition-all duration-1000 ease-out delay-200 ${
                  isVisible("phase4")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 md:translate-x-10"
                }`}
              >
                <Image
                  src="/images/rv_campground_pines.webp"
                  alt="RV campground concept in pine forest at Traditions Field Club"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#162838]/50 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold tracking-[0.3em] uppercase bg-[#162838]/60 px-4 py-2 rounded">Coming Soon</span>
                </div>
                <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/60 italic">*Rendering — subject to change</p>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Gallery */}
        <section
          id="progress"
          ref={(el) => { sectionRefs.current["progress"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] overflow-hidden scroll-mt-[140px]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div
              className={`text-center mb-16 transition-all duration-1000 ease-out ${
                isVisible("progress")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
                <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">From the Ground Up</span>
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              </div>
              <h2
                className="text-3xl md:text-4xl text-[#162838] mb-6"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                See It Coming Together
              </h2>
              <div className="flex justify-center mb-6">
                <span className="h-[1px] w-16 bg-[#a75235]"></span>
              </div>
              <p className="text-lg text-[#333333] leading-relaxed max-w-3xl mx-auto">
                Every great tradition starts somewhere. Here&apos;s a look at the hands-on work
                that&apos;s turning our vision into reality.
              </p>
            </div>

            {/* November 2025 */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-[#162838] text-[#f5f2ec] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                  January 2026
                </span>
                <span className="h-[1px] flex-grow bg-[#162838]/15"></span>
              </div>
              <h3
                className="text-2xl text-[#162838] mb-2"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Exploring the Land
              </h3>
              <p className="text-[#333333] mb-6">
                Walking the property for the first time, surveying the terrain, and discovering
                the natural beauty that would become Traditions Field Club.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { src: "zillow_aerial_property_map", alt: "Aerial property map of the land" },
                  { src: "open_field_treeline", alt: "Open field with treeline" },
                  { src: "cleared_land_panoramic", alt: "Panoramic view of cleared land" },
                  { src: "brush_pile_clearing", alt: "Brush pile during land clearing" },
                  { src: "log_pile_trail", alt: "Log pile along trail" },
                  { src: "debris_pile_field", alt: "Debris pile in open field" },
                  { src: "cypress_trees_leaf_floor", alt: "Cypress trees with leaf-covered floor" },
                  { src: "cypress_swamp_creek_2", alt: "Cypress swamp and creek" },
                  { src: "bridge_construction_workers", alt: "Workers building a trail bridge" },
                  { src: "spanish_moss_forest", alt: "Forest with Spanish moss" },
                  { src: "swamp_trees_water", alt: "Swamp trees reflecting in water" },
                ].map((img) => (
                  <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                    <Image
                      src={`/images/${img.src}.webp`}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* February 2026 */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-[#3d5a45] text-[#f5f2ec] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                  February 2026
                </span>
                <span className="h-[1px] flex-grow bg-[#162838]/15"></span>
              </div>
              <h3
                className="text-2xl text-[#162838] mb-2"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Clearing, Building &amp; First Shots Fired
              </h3>
              <p className="text-[#333333] mb-6">
                Chainsaws running, trees coming down, stations going up, and the first rounds
                echoing across the property. It&apos;s happening.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { src: "cleared_field_worker", alt: "Worker in cleared field" },
                  { src: "chainsaw_felled_tree", alt: "Chainsaw on a felled tree" },
                  { src: "felled_pine_trail", alt: "Felled pine along trail" },
                  { src: "man_sitting_fallen_log", alt: "Taking a break on a fallen log" },
                  { src: "trail_bridge_building_1", alt: "Building a trail bridge" },
                  { src: "pond_work_crew", alt: "Work crew at the pond" },
                  { src: "skid_steer_station_frame", alt: "Skid steer moving station frames" },
                  { src: "station_frames_construction", alt: "Station frames under construction" },
                  { src: "five_stand_stations_row", alt: "Row of 5-stand shooting stations" },
                  { src: "skid_steer_stations_lumber", alt: "Skid steer delivering lumber to stations" },
                  { src: "shooting_stations_construction", alt: "Shooting stations being built" },
                  { src: "station_interior_field_view", alt: "View from inside a shooting station" },
                  { src: "station_clay_thrower_field", alt: "Station with clay thrower and field view" },
                  { src: "clay_thrower_trailer_delivery", alt: "Clay thrower delivery on trailer" },
                  { src: "shooter_aiming_field", alt: "Shooter aiming in the field" },
                  { src: "shooting_from_deck_swamp", alt: "Shooting from deck overlooking swamp" },
                ].map((img) => (
                  <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                    <Image
                      src={`/images/${img.src}.webp`}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* March 2026 */}
            <div className="mt-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-[#a75235] text-[#f5f2ec] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                  March 2026
                </span>
                <span className="h-[1px] flex-grow bg-[#162838]/15"></span>
              </div>
              <div className="bg-white rounded-lg border border-[#e8e4dc] p-8 md:p-12 text-center">
                <p className="text-4xl mb-4">👀</p>
                <h3
                  className="text-2xl md:text-3xl text-[#162838] mb-3"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Stay Tuned...
                </h3>
                <p className="text-lg text-[#333333] max-w-xl mx-auto">
                  We&apos;re not done yet. Grab some shells and check back soon — you won&apos;t want to miss what&apos;s next.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-[#3d5a45]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Decorative Header */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-[1px] w-12 md:w-20 bg-[#f5f2ec]/30"></span>
              <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">Be Part of It</span>
              <span className="h-[1px] w-12 md:w-20 bg-[#f5f2ec]/30"></span>
            </div>
            <h2
              className="text-3xl md:text-4xl text-[#f5f2ec] mb-4"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Join Us on the Journey
            </h2>
            <div className="flex justify-center mb-6">
              <span className="h-[1px] w-16 bg-[#a75235]"></span>
            </div>
            <p className="text-[#f5f2ec] opacity-90 max-w-2xl mx-auto mb-8">
              We&apos;re building something special, and we want you to be part of it from the beginning.
              Early members help shape the future of Traditions Field Club.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/membership"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Explore Membership
              </a>
              <a
                href="/contact"
                className="inline-block bg-transparent border-2 border-[#f5f2ec] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#3d5a45] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
