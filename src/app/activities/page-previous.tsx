"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import FadeImage from "@/components/FadeImage";
import Link from "next/link";

export default function Activities() {
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

      <main id="main" className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-32">
          <div
            className="absolute inset-0 bg-[#3d5a45]"
          >
            <div className="absolute inset-0 bg-[#3d5a45]/70"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Activities
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              Experience premier shooting sports in the heart of South Carolina&apos;s Lowcountry
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
              <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">What We Offer</span>
              <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
            </div>
            <h2
              className="text-3xl md:text-4xl text-[#162838] mb-6"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              World-Class Shooting Sports
            </h2>
            <div className="flex justify-center mb-6">
              <span className="h-[1px] w-16 bg-[#a75235]"></span>
            </div>
            <p className="text-lg text-[#333333] leading-relaxed">
              At Traditions Field Club, we offer shooting sports designed to challenge and delight
              enthusiasts of all skill levels. The scenic journey of sporting clays connects you with
              the traditions of Southern outdoor sports.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <a
                href="#sporting-clays"
                className="px-5 py-2 rounded-full border-2 border-[#3d5a45] text-[#3d5a45] text-sm font-semibold uppercase tracking-wide hover:bg-[#3d5a45] hover:text-[#f5f2ec] transition-colors"
              >
                Now
              </a>
              <a
                href="#5-stand"
                className="px-5 py-2 rounded-full border-2 border-[#a75235] text-[#a75235] text-sm font-semibold uppercase tracking-wide hover:bg-[#a75235] hover:text-[#f5f2ec] transition-colors"
              >
                Coming Soon
              </a>
              <a
                href="#future"
                className="px-5 py-2 rounded-full border-2 border-[#162838] text-[#162838] text-sm font-semibold uppercase tracking-wide hover:bg-[#162838] hover:text-[#f5f2ec] transition-colors"
              >
                Future
              </a>
            </div>
          </div>
        </section>

        {/* Sporting Clays Section - Image Right */}
        <section
          id="sporting-clays"
          ref={(el) => { sectionRefs.current["sporting-clays"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] scroll-mt-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              <span className="text-[#3d5a45] text-sm font-bold tracking-[0.3em] uppercase">Now</span>
              <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content - First on mobile, second on desktop */}
              <div
                className={`order-2 lg:order-1 transition-all duration-1000 ease-out ${
                  isVisible("sporting-clays")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Premier Experience</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Sporting Clays
                </h2>
                <p className="text-lg text-[#333333] mb-4 leading-relaxed">
                  Often called &quot;golf with a shotgun,&quot; our sporting clays courses wind through South
                  Carolina&apos;s natural beauty — rolling fields, mature pines, and quiet Lowcountry scenery
                  that shifts from stand to stand. Each station offers a different view and a different target
                  presentation, simulating the flight patterns of various game birds.
                </p>
                <p className="text-[#333333] mb-6 leading-relaxed">
                  We offer two courses — a 15-station course winding through our most scenic terrain, and a
                  12-station course designed for newer shooters. Both showcase the natural variety of the
                  property, so every round feels a little different.
                </p>
                <ul className="space-y-3 text-[#333333] mb-8">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Two courses — 15 stations and 12 stations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Varied natural scenery at every stand</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Realistic game bird flight simulations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Certified instruction available</span>
                  </li>
                </ul>
              </div>

              {/* Image - Second on mobile, first on desktop */}
              <div
                className={`relative h-[300px] sm:h-[350px] md:h-[450px] order-1 lg:order-2 transition-all duration-1000 ease-out delay-200 ${
                  isVisible("sporting-clays")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <FadeImage
                    src="/images/shooter_at_stand.webp"
                    alt="Sporting clays shooting at Traditions Field Club"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative accent */}
                <div className="hidden sm:block absolute -bottom-4 -left-4 w-32 h-32 bg-[#a75235]/10 rounded-lg -z-10"></div>
                <div className="hidden sm:block absolute -top-4 -right-4 w-24 h-24 bg-[#3d5a45]/10 rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Lessons & Instruction Section */}
        <section
          id="lessons"
          ref={(el) => { sectionRefs.current["lessons"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] scroll-mt-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div
                className={`order-2 transition-all duration-1000 ease-out delay-200 ${
                  isVisible("lessons")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Improve Your Skills</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Lessons & Instruction
                </h2>
                <p className="text-lg text-[#333333] mb-4 leading-relaxed">
                  Whether you&apos;re picking up a shotgun for the first time or looking to refine your technique,
                  our certified instructor is here to help you reach your goals. Private and group lessons are
                  available for shooters of all ages and skill levels.
                </p>
                <p className="text-[#333333] mb-6 leading-relaxed">
                  From mastering the fundamentals to breaking through plateaus, personalized coaching can
                  accelerate your progress and deepen your enjoyment of the sport.
                </p>
                <ul className="space-y-3 text-[#333333] mb-8">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Certified shooting instructor on staff</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Private and group sessions available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Beginner through advanced skill levels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Youth instruction programs</span>
                  </li>
                </ul>
                <Link
                  href="/contact?topic=lessons"
                  className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Inquire About Lessons
                </Link>
              </div>

              {/* Image */}
              <div
                className={`relative h-[300px] sm:h-[350px] md:h-[450px] order-1 transition-all duration-1000 ease-out ${
                  isVisible("lessons")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <FadeImage
                    src="/images/coach-shooting-lesson.webp"
                    alt="Coach instructing a shooter at Traditions Field Club"
                    fill
                    className="object-cover object-[center_30%]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative accent */}
                <div className="hidden sm:block absolute -bottom-4 -left-4 w-32 h-32 bg-[#a75235]/10 rounded-lg -z-10"></div>
                <div className="hidden sm:block absolute -top-4 -right-4 w-24 h-24 bg-[#3d5a45]/10 rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Width Image Break */}
        <section
          id="imagebreak"
          ref={(el) => { sectionRefs.current["imagebreak"] = el; }}
          className="relative h-[300px] md:h-[400px]"
        >
          <div
            className="absolute inset-0 bg-[#162838]"
          >
            <div className="absolute inset-0 bg-[#162838]/60"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <p
                className={`text-[#f5f2ec]/70 text-lg md:text-xl tracking-wide transition-all duration-1000 ease-out ${
                  isVisible("imagebreak")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                — Coming Soon —
              </p>
            </div>
          </div>
        </section>

        {/* 5-Stand Section - Image Left */}
        <section
          id="5-stand"
          ref={(el) => { sectionRefs.current["5-stand"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] scroll-mt-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              <span className="text-[#a75235] text-sm font-bold tracking-[0.3em] uppercase">Coming Soon</span>
              <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div
                className={`relative h-[300px] sm:h-[350px] md:h-[450px] order-1 lg:order-2 transition-all duration-1000 ease-out delay-200 ${
                  isVisible("5-stand")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <FadeImage
                    src="/images/shooting_stations_construction.webp"
                    alt="5-Stand shooting stations at Traditions Field Club"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[#162838]/40 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold tracking-[0.3em] uppercase bg-[#162838]/60 px-4 py-2 rounded">Coming Soon</span>
                  </div>
                </div>
                {/* Decorative accent */}
                <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 bg-[#a75235]/10 rounded-lg -z-10"></div>
                <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 bg-[#3d5a45]/10 rounded-lg -z-10"></div>
              </div>

              {/* Content */}
              <div
                className={`order-2 lg:order-1 transition-all duration-1000 ease-out ${
                  isVisible("5-stand")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Shooting Sports</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  5-Stand
                </h2>
                <p className="text-lg text-[#333333] mb-4 leading-relaxed">
                  Our dedicated 5-Stand facility will offer an exciting and challenging shooting experience for all skill levels.
                  With five shooting stations and multiple trap machines presenting targets from various angles and distances,
                  you&apos;ll enjoy a dynamic round that tests your reflexes and marksmanship.
                </p>
                <p className="text-[#333333] mb-6 leading-relaxed">
                  Perfect for those looking to sharpen their skills or enjoy a quick session, 5-Stand will provide the thrill
                  of sporting clays in a compact format.
                </p>
                <ul className="space-y-3 text-[#333333] mb-8">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Five shooting stations with varied presentations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Multiple target combinations per station</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Suitable for beginners and experienced shooters</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Virtual Training Section - Image Left */}
        <section
          id="virtual-training"
          ref={(el) => { sectionRefs.current["virtual-training"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] scroll-mt-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image Placeholder */}
              <div
                className={`relative h-[300px] sm:h-[350px] md:h-[450px] order-1 transition-all duration-1000 ease-out ${
                  isVisible("virtual-training")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden bg-[#e8e4dc] border-2 border-dashed border-[#162838]/20 flex flex-col items-center justify-center gap-3">
                  <svg className="w-12 h-12 text-[#162838]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[#162838]/40 text-sm font-semibold tracking-[0.2em] uppercase">Image Coming Soon</span>
                  <div className="absolute inset-0 bg-[#162838]/40 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold tracking-[0.3em] uppercase bg-[#162838]/60 px-4 py-2 rounded">Coming Soon</span>
                  </div>
                </div>
                {/* Decorative accent */}
                <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 bg-[#a75235]/10 rounded-lg -z-10"></div>
                <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 bg-[#3d5a45]/10 rounded-lg -z-10"></div>
              </div>

              {/* Content */}
              <div
                className={`order-2 transition-all duration-1000 ease-out delay-200 ${
                  isVisible("virtual-training")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Train Anytime</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Virtual Training
                </h2>
                <p className="text-lg text-[#333333] mb-6 leading-relaxed">
                  Can&apos;t make it to the range? Our virtual training program will let you sharpen your
                  fundamentals from anywhere, with certified instructors reviewing your technique remotely.
                </p>
                <ul className="space-y-3 text-[#333333] mb-8">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Shotgun mount fundamentals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Stance, posture, and target acquisition</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Swing mechanics and follow-through</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Remote technique review with a certified instructor</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Width Image Break 3 */}
        <section
          id="imagebreak3"
          ref={(el) => { sectionRefs.current["imagebreak3"] = el; }}
          className="relative h-[300px] md:h-[400px]"
        >
          <div
            className="absolute inset-0 bg-[#162838]"
          >
            <div className="absolute inset-0 bg-[#162838]/60"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <p
                className={`text-[#f5f2ec]/70 text-lg md:text-xl tracking-wide transition-all duration-1000 ease-out ${
                  isVisible("imagebreak3")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                — In The Works —
              </p>
            </div>
          </div>
        </section>

        {/* Future Section - In The Works teaser */}
        <section
          id="future"
          ref={(el) => { sectionRefs.current["future"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] scroll-mt-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-12 transition-all duration-1000 ease-out ${
                isVisible("future")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
                <span className="text-[#a75235] text-sm font-bold tracking-[0.3em] uppercase">Future</span>
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              </div>
              <h2
                className="text-3xl md:text-4xl text-[#162838] mb-6"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                In The Works
              </h2>
              <div className="flex justify-center mb-6">
                <span className="h-[1px] w-16 bg-[#a75235]"></span>
              </div>
              <p className="text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto">
                As Traditions Field Club continues to grow, here&apos;s a look at what we&apos;re planning
                down the road.
              </p>
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ease-out delay-200 ${
                isVisible("future")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 text-center">
                <div className="w-12 h-12 bg-[#162838]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#162838]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <h3
                  className="text-xl text-[#162838] mb-2"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Night Shooting
                </h3>
                <p className="text-sm text-[#333333]">
                  Low-light and after-dark sessions for members looking for a new kind of challenge.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 text-center">
                <div className="w-12 h-12 bg-[#162838]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#162838]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3
                  className="text-xl text-[#162838] mb-2"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Tournaments &amp; Leagues
                </h3>
                <p className="text-sm text-[#333333]">
                  Competitive events and leagues for members who want to test their skills against each other.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 text-center">
                <div className="w-12 h-12 bg-[#162838]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#162838]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3
                  className="text-xl text-[#162838] mb-2"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Youth Shooting &amp; Events
                </h3>
                <p className="text-sm text-[#333333]">
                  Dedicated programs and events built around introducing young shooters to the sport.
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
              <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">Get Started</span>
              <span className="h-[1px] w-12 md:w-20 bg-[#f5f2ec]/30"></span>
            </div>
            <h2
              className="text-3xl md:text-4xl text-[#f5f2ec] mb-4"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Ready to Experience Traditions?
            </h2>
            <div className="flex justify-center mb-6">
              <span className="h-[1px] w-16 bg-[#a75235]"></span>
            </div>
            <p className="text-[#f5f2ec] opacity-90 max-w-2xl mx-auto mb-8">
              Join our community of outdoor enthusiasts and become part of something special.
              We&apos;re currently accepting interest for memberships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                View Membership
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-transparent border-2 border-[#f5f2ec] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#3d5a45] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
