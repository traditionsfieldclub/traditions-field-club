"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import FadeImage from "@/components/FadeImage";
import Lightbox, { type LightboxImage } from "@/components/Lightbox";

const julSepImages: LightboxImage[] = [
  { src: "/images/pavilion_completed_exterior_2.webp", alt: "Completed Pavilion exterior" },
  { src: "/images/property_sunset_silhouette.webp", alt: "Sunset over the property" },
  { src: "/images/pavilion_exterior_windows_installed.webp", alt: "Pavilion exterior with windows installed" },
  { src: "/images/blackwater_creek_reflection.webp", alt: "Blackwater creek reflection on the property" },
  { src: "/images/pavilion_concrete_slab_poured.webp", alt: "Freshly poured concrete slab for the Pavilion" },
  { src: "/images/youth_shotgun_instruction.webp", alt: "A young shooter getting shotgun instruction" },
  { src: "/images/shooting_stations_field_view.webp", alt: "Shooting stations across the field" },
  { src: "/images/pavilion_interior_sheathed_windows.webp", alt: "Close-up of the Pavilion's sheathing and windows" },
];

const aprJunImages: LightboxImage[] = [
  { src: "/images/pavilion_frame_tree_canopy.webp", alt: "Early Pavilion framing rising under the tree canopy" },
  { src: "/images/pavilion_truss_framing_scissor_lift.webp", alt: "Roof trusses going up on a scissor lift" },
  { src: "/images/swamp_creek_reflection_1.webp", alt: "Swamp creek reflection on the property" },
  { src: "/images/pavilion_interior_floor_grading.webp", alt: "Interior floor grading for the Pavilion" },
  { src: "/images/wild_blackberries_closeup.webp", alt: "Wild blackberries growing on the property" },
  { src: "/images/pavilion_floor_prep_rebar.webp", alt: "Rebar laid out for the Pavilion's concrete floor" },
  { src: "/images/crew_plumbing_trench_install.webp", alt: "Crew installing the plumbing trench" },
  { src: "/images/pavilion_front_symmetric_view.webp", alt: "Symmetric front view of the Pavilion" },
];

const exploringLandImages: LightboxImage[] = [
  { src: "/images/property_view_land.webp", alt: "Property view of the land" },
  { src: "/images/cypress_swamp_creek_2.webp", alt: "Cypress swamp and creek" },
  { src: "/images/spanish_moss_forest.webp", alt: "Forest with Spanish moss" },
  { src: "/images/open_field_treeline.webp", alt: "Open field with treeline" },
];

const clearingBuildingImages: LightboxImage[] = [
  { src: "/images/crew_brush_clearing_chainsaw.webp", alt: "Crew clearing brush with chainsaws" },
  { src: "/images/station_frames_construction.webp", alt: "Station frames under construction" },
  { src: "/images/shooter_aiming_field.webp", alt: "Shooter aiming in the field" },
  { src: "/images/shooting_from_deck_swamp.webp", alt: "Shooting from deck overlooking swamp" },
];

const course1TestingImages: LightboxImage[] = [
  { src: "/images/team_group_photo_1.webp", alt: "The crew posing together on the property" },
  { src: "/images/shooter_aiming_station.webp", alt: "Shooter aiming from a covered station" },
  { src: "/images/trap_setup_team_2.webp", alt: "Two crew members setting up a clay trap machine on the course" },
  { src: "/images/station_landscape_crew.webp", alt: "Covered station with crew in the distance" },
];

export default function Roadmap() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
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

      <main id="main" className="flex-grow">
        {/* Hero */}
        <section className="relative py-20 md:py-28 lg:py-32">
          <div className="absolute inset-0 bg-[#162838]">
            <div className="absolute inset-0 bg-[#162838]/70"></div>
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
            <a
              href="#progress"
              className="inline-flex items-center gap-2 mt-8 text-[#f5f2ec] text-sm tracking-[0.2em] uppercase border-b border-[#f5f2ec]/40 pb-1 hover:border-[#f5f2ec] transition-colors"
            >
              See Our Progress
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Intro Section */}
        <section
          id="intro"
          ref={(el) => { sectionRefs.current["intro"] = el; }}
          className="py-16 md:py-24 bg-white overflow-hidden"
        >
          <div
            className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-500 ease-out ${
              isVisible("intro")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
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
              of a premier outdoor sporting destination. From our sporting clays courses to a future
              Pavilion, hunting and outdoor recreation, every phase is designed to enhance
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
                className={`relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden transition-all duration-500 ease-out ${
                  isVisible("phase1")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 md:translate-y-3"
                }`}
              >
                <FadeImage
                  src="/images/land_clearing_chainsaw.webp"
                  alt="Land clearing work for Phase 1 at Traditions Field Club"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-500 ease-out delay-100 ${
                  isVisible("phase1")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 md:translate-y-3"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Open Now</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#a75235] text-[#f5f2ec] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Complete
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Phase 1: Foundation
                </h2>
                <p className="text-[#333333] leading-relaxed mb-6">
                  We&apos;ve established the core shooting sports facilities and built the foundation
                  for everything to come — a world-class sporting clays experience, open today.
                </p>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>2 sporting clays courses — 15 stations (intermediate to advanced) and 12 stations (beginner to intermediate)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Member check-in and basic amenities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Safety infrastructure and signage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Bath house with restrooms and basic facilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Youth and beginner instruction programs</span>
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
                className={`order-2 lg:order-1 transition-all duration-500 ease-out ${
                  isVisible("phase2")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 md:translate-y-3"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Opening Soon</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#4d5c47] text-[#f5f2ec] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    In Progress
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Phase 2: Pavilion
                </h2>
                <p className="text-[#333333] leading-relaxed mb-6">
                  Bringing the Pavilion to life — bathrooms, a kitchen, and outdoor seating built
                  for barbecues, group gatherings, and family hangout time while others are out shooting.
                </p>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Air-conditioned bathrooms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Full kitchen and outdoor seating for group gatherings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Pro shop with equipment and supplies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Space for barbecues, events, and family hangout time while others shoot</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Key card member access system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Habitat rebuilding and wildlife conservation</span>
                  </li>
                </ul>
              </div>

              {/* Phase 2 Image */}
              <div
                className={`relative h-[200px] min-[414px]:h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden order-1 lg:order-2 transition-all duration-500 ease-out delay-100 ${
                  isVisible("phase2")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 md:translate-y-3"
                }`}
              >
                <div className="absolute inset-0">
                  <FadeImage
                    src="/images/pavilion_rendering.webp"
                    alt="Architectural rendering of the completed Pavilion at Traditions Field Club"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-end justify-center pb-4">
                    <span className="text-white text-sm font-semibold tracking-[0.3em] uppercase">Rendering Image</span>
                  </div>
                </div>
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
                className={`relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden transition-all duration-500 ease-out ${
                  isVisible("phase3")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 md:translate-y-3"
                }`}
              >
                <div className="absolute inset-0">
                  <FadeImage
                    src="/images/hunting_outdoors_fly_fishing.webp"
                    alt="Member fly fishing on the property at Traditions Field Club"
                    fill
                    className="object-cover object-[center_69%]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-end justify-center pb-4">
                    <span className="text-white text-sm font-semibold tracking-[0.3em] uppercase">Coming Soon</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-500 ease-out delay-100 ${
                  isVisible("phase3")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 md:translate-y-3"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Future Vision</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#162838] text-[#f5f2ec] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Coming Soon
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Phase 3: Hunting &amp; Outdoors
                </h2>
                <p className="text-[#333333] leading-relaxed mb-6">
                  Expanding into the natural side of the property — hunting, fishing, and guided
                  outdoor experiences that let members connect even deeper with the land.
                </p>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Hunting — duck blinds, deer stands, food plots</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Fishing access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Guided wing shoots</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Natural-style property tours</span>
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
                className={`order-2 lg:order-1 transition-all duration-500 ease-out ${
                  isVisible("phase4")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 md:translate-y-3"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">The Dream</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#162838] text-[#f5f2ec] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Future
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Phase 4: Recreation
                </h2>
                <p className="text-[#333333] leading-relaxed mb-6">
                  Long-term, we&apos;re envisioning a full outdoor recreation destination — trails,
                  farm-based activities, and ways to stay active outdoors, for members and their
                  families to enjoy for years to come.
                </p>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Farm build-out</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Hiking and walking trails</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Outdoor fitness opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Additional recreational amenities as the vision grows</span>
                  </li>
                </ul>
              </div>

              {/* Phase 4 Image */}
              <div
                className={`relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden order-1 lg:order-2 transition-all duration-500 ease-out delay-100 ${
                  isVisible("phase4")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 md:translate-y-3"
                }`}
              >
                <FadeImage
                  src="/images/recreation_hiking_trail_group.webp"
                  alt="Members hiking a wooded trail at Traditions Field Club"
                  fill
                  className="object-cover object-[center_70%]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-end justify-center pb-4">
                  <span className="text-white text-sm font-semibold tracking-[0.3em] uppercase">Coming Soon</span>
                </div>
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
              className={`text-center mb-16 transition-all duration-500 ease-out ${
                isVisible("progress")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
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

            {/* Jul-Sep 2026 */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-[#a75235] text-[#f5f2ec] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                  Jul – Sep 2026
                </span>
                <span className="h-[1px] flex-grow bg-[#162838]/15"></span>
              </div>
              <p className="text-[#333333] mb-4 text-sm max-w-3xl">
                The Pavilion continues to take shape — windows in, exterior coming together.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {julSepImages.map((img) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setLightboxImage(img)}
                    aria-label={`View larger image: ${img.alt}`}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden group block w-full p-0 border-0 bg-transparent cursor-zoom-in"
                  >
                    <FadeImage
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-[#162838]/0 group-hover:bg-[#162838]/25 transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Apr-Jun 2026 */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-[#4d5c47] text-[#f5f2ec] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                  Apr – Jun 2026
                </span>
                <span className="h-[1px] flex-grow bg-[#162838]/15"></span>
              </div>
              <p className="text-[#333333] mb-4 text-sm max-w-3xl">
                Groundwork underway — floor prep, the concrete slab, and the Pavilion&apos;s first
                framing rising under the pines.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {aprJunImages.map((img) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setLightboxImage(img)}
                    aria-label={`View larger image: ${img.alt}`}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden group block w-full p-0 border-0 bg-transparent cursor-zoom-in"
                  >
                    <FadeImage
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-[#162838]/0 group-hover:bg-[#162838]/25 transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Jan-Mar 2026 */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-[#162838] text-[#f5f2ec] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                  Jan – Mar 2026
                </span>
                <span className="h-[1px] flex-grow bg-[#162838]/15"></span>
              </div>
              <p className="text-[#333333] mb-10 max-w-3xl">
                From walking the raw land for the first time to running the first live rounds on
                Course 1 — here&apos;s how the first three months came together.
              </p>

              {/* Exploring the Land */}
              <div className="mb-10">
                <h3
                  className="text-xl text-[#162838] mb-2"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Exploring the Land
                </h3>
                <p className="text-[#333333] mb-4 text-sm">
                  Walking the property for the first time, surveying the terrain, and discovering
                  the natural beauty that would become Traditions Field Club.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {exploringLandImages.map((img) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setLightboxImage(img)}
                      aria-label={`View larger image: ${img.alt}`}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden group block w-full p-0 border-0 bg-transparent cursor-zoom-in"
                    >
                      <FadeImage
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-[#162838]/0 group-hover:bg-[#162838]/25 transition-colors duration-300 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v6M8 11h6" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clearing, Building & First Shots Fired */}
              <div className="mb-10">
                <h3
                  className="text-xl text-[#162838] mb-2"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Clearing, Building &amp; First Shots Fired
                </h3>
                <p className="text-[#333333] mb-4 text-sm">
                  Chainsaws running, trees coming down, stations going up, and the first rounds
                  echoing across the property. It&apos;s happening.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {clearingBuildingImages.map((img) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setLightboxImage(img)}
                      aria-label={`View larger image: ${img.alt}`}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden group block w-full p-0 border-0 bg-transparent cursor-zoom-in"
                    >
                      <FadeImage
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-[#162838]/0 group-hover:bg-[#162838]/25 transition-colors duration-300 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v6M8 11h6" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Course 1 Testing */}
              <div>
                <h3
                  className="text-xl text-[#162838] mb-2"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Course 1 Testing — Team Tested, Team Approved
                </h3>
                <p className="text-[#333333] mb-4 text-sm">
                  Course 1 is nearly complete. Clay throwers dialed in, stations prepped, and a team takes their first shots.
                  Meanwhile, clearing continues as the property keeps taking shape.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {course1TestingImages.map((img) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setLightboxImage(img)}
                      aria-label={`View larger image: ${img.alt}`}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden group block w-full p-0 border-0 bg-transparent cursor-zoom-in"
                    >
                      <FadeImage
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-[#162838]/0 group-hover:bg-[#162838]/25 transition-colors duration-300 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v6M8 11h6" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-[#4d5c47]">
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
                className="inline-block bg-transparent border-2 border-[#f5f2ec] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#4d5c47] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      {lightboxImage && (
        <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      )}

      <Footer />
    </div>
  );
}
