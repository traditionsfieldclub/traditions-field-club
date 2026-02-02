"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

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
          {/* Background Image Placeholder */}
          <div
            className="absolute inset-0 bg-[#3d5a45] bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/roadmap-hero.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-[#3d5a45]/70"></div>
          </div>

          {/* Placeholder Indicator */}
          <div className="absolute top-4 right-4 bg-[#162838]/50 text-[#f5f2ec]/50 text-xs px-3 py-1 rounded">
            (image here)
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
              {/* Image Placeholder */}
              <div
                className={`relative h-[250px] sm:h-[300px] md:h-[400px] bg-[#e8e4dc] rounded-lg overflow-hidden transition-all duration-1000 ease-out ${
                  isVisible("phase1")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#162838]">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm uppercase tracking-widest opacity-60">Image Placeholder</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isVisible("phase1")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
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
                    : "opacity-0 -translate-x-10"
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

              {/* Image Placeholder - Second on mobile */}
              <div
                className={`relative h-[250px] sm:h-[300px] md:h-[400px] bg-[#e8e4dc] rounded-lg overflow-hidden order-1 lg:order-2 transition-all duration-1000 ease-out delay-200 ${
                  isVisible("phase2")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#162838]">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm uppercase tracking-widest opacity-60">Image Placeholder</p>
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
              {/* Image Placeholder */}
              <div
                className={`relative h-[250px] sm:h-[300px] md:h-[400px] bg-[#e8e4dc] rounded-lg overflow-hidden transition-all duration-1000 ease-out ${
                  isVisible("phase3")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#162838]">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm uppercase tracking-widest opacity-60">Image Placeholder</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isVisible("phase3")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
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
                    <span>Primitive camping areas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>RV lot with hookups</span>
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
                    : "opacity-0 -translate-x-10"
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
                    <span>Barn-style lodge with Southern charm</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Event and banquet facilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Full-service restaurant and bar</span>
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

              {/* Image Placeholder - Second on mobile */}
              <div
                className={`relative h-[250px] sm:h-[300px] md:h-[400px] bg-[#e8e4dc] rounded-lg overflow-hidden order-1 lg:order-2 transition-all duration-1000 ease-out delay-200 ${
                  isVisible("phase4")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#162838]">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm uppercase tracking-widest opacity-60">Image Placeholder</p>
                  </div>
                </div>
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
