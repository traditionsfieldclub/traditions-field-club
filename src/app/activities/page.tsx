"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Image from "next/image";
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
              At Traditions Field Club, we offer a variety of shooting sports designed to challenge and delight
              enthusiasts of all skill levels. From the fast-paced action of 5-Stand to the scenic journey of
              sporting clays, each experience connects you with the traditions of Southern outdoor sports.
            </p>
          </div>
        </section>

        {/* 5-Stand Section - Image Left */}
        <section
          id="5-stand"
          ref={(el) => { sectionRefs.current["5-stand"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] scroll-mt-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div
                className={`relative h-[300px] sm:h-[350px] md:h-[450px] transition-all duration-1000 ease-out ${
                  isVisible("5-stand")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <Image
                    src="/images/shooting_stations_construction.webp"
                    alt="5-Stand shooting stations at Traditions Field Club"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative accent */}
                <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 bg-[#a75235]/10 rounded-lg -z-10"></div>
                <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 bg-[#3d5a45]/10 rounded-lg -z-10"></div>
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isVisible("5-stand")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
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
                  Our dedicated 5-Stand facility offers an exciting and challenging shooting experience for all skill levels.
                  With five shooting stations and multiple trap machines presenting targets from various angles and distances,
                  you&apos;ll enjoy a dynamic round that tests your reflexes and marksmanship.
                </p>
                <p className="text-[#333333] mb-6 leading-relaxed">
                  Perfect for those looking to sharpen their skills or enjoy a quick session, 5-Stand provides the thrill
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
                — Where Tradition Meets Excellence —
              </p>
            </div>
          </div>
        </section>

        {/* Sporting Clays Section - Image Right */}
        <section
          id="sporting-clays"
          ref={(el) => { sectionRefs.current["sporting-clays"] = el; }}
          className="py-16 md:py-24 bg-white scroll-mt-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  Often called &quot;golf with a shotgun,&quot; our sporting clays courses wind through the natural
                  beauty of South Carolina&apos;s southern fields. Each station presents unique target presentations
                  that simulate the flight patterns of various game birds.
                </p>
                <p className="text-[#333333] mb-6 leading-relaxed">
                  Our courses feature 15 stations across beautifully maintained grounds, with a second course
                  designed for newer shooters coming soon. The varying terrain creates a truly memorable shooting environment.
                </p>
                <ul className="space-y-3 text-[#333333] mb-8">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>15 stations across scenic terrain</span>
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
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Second 12-station course for beginners coming soon</span>
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
                  <Image
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

        {/* Full-Width Image Break 2 */}
        <section
          id="imagebreak2"
          ref={(el) => { sectionRefs.current["imagebreak2"] = el; }}
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
                  isVisible("imagebreak2")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                — For Every Generation —
              </p>
            </div>
          </div>
        </section>

        {/* Archery Section - Image Left */}
        <section
          id="archery"
          ref={(el) => { sectionRefs.current["archery"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] scroll-mt-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div
                className={`relative h-[300px] sm:h-[350px] md:h-[450px] transition-all duration-1000 ease-out ${
                  isVisible("archery")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <Image
                    src="/images/archery_range_shooting.webp"
                    alt="Archery range at Traditions Field Club"
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
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isVisible("archery")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Traditional Sport</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Archery
                </h2>
                <p className="text-lg text-[#333333] mb-4 leading-relaxed">
                  Discover the timeless art of archery at our dedicated outdoor range. Whether you&apos;re
                  drawn to traditional recurve bows, modern compounds, or want to introduce your family
                  to this rewarding discipline, our archery facilities provide a safe and welcoming environment.
                </p>
                <p className="text-[#333333] mb-6 leading-relaxed">
                  Our range is designed with youth and beginners in mind, featuring proper safety measures
                  and distance markers for progressive skill development.
                </p>
                <ul className="space-y-3 text-[#333333] mb-8">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Youth and family-friendly programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Beginner instruction available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Safe, well-maintained outdoor range</span>
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
                — Sharpen Your Skills —
              </p>
            </div>
          </div>
        </section>

        {/* Lessons & Instruction Section */}
        <section
          id="lessons"
          ref={(el) => { sectionRefs.current["lessons"] = el; }}
          className="py-16 md:py-24 bg-white scroll-mt-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content - First on mobile, second on desktop */}
              <div
                className={`order-2 lg:order-1 transition-all duration-1000 ease-out ${
                  isVisible("lessons")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
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

              {/* Image - Second on mobile, first on desktop */}
              <div
                className={`relative h-[300px] sm:h-[350px] md:h-[450px] order-1 lg:order-2 transition-all duration-1000 ease-out delay-200 ${
                  isVisible("lessons")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <Image
                    src="/images/shooting_lesson_group.webp"
                    alt="Group shooting lesson at Traditions Field Club"
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
