"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import VideoHero from "@/components/VideoHero";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
        {/* Hero Section with Video */}
        <VideoHero />

        {/* What the Club Is Section */}
        <section
          id="intro"
          ref={(el) => { sectionRefs.current["intro"] = el; }}
          className="py-20 md:py-28 bg-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div
                className={`transition-all duration-1000 ease-out ${
                  isVisible("intro")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">
                    Welcome
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  A Premier Sporting Club in the Heart of the Lowcountry
                </h2>
                <p className="text-lg text-[#333333] leading-relaxed mb-6">
                  Traditions Field Club is more than a shooting range—it&apos;s a destination.
                  Nestled in the quiet rural beauty of South Carolina, we offer world-class
                  sporting clays, 5-stand, and archery in an environment that honors the
                  heritage of Southern outdoor traditions.
                </p>
                <p className="text-[#333333] leading-relaxed mb-6">
                  Veteran-owned, family-friendly, and community-driven, we&apos;re building
                  a place where memories are made and traditions are passed down through generations.
                </p>
                <p className="text-[#333333] leading-relaxed mb-8">
                  Rooted in a deep respect for the land, we&apos;re committed to conservation,
                  preservation, and responsible stewardship of our 410 acres—ensuring the natural
                  beauty of the Lowcountry thrives for generations to come.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/about"
                    className="inline-block bg-[#3d5a45] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg text-center"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-block bg-transparent border-2 border-[#162838] text-[#162838] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] hover:text-[#f5f2ec] transition-colors rounded-lg text-center"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>

              {/* Intro Video */}
              <div
                className={`relative h-[400px] md:h-[500px] transition-all duration-1000 ease-out delay-300 ${
                  isVisible("intro")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover object-left"
                    aria-label="Drive through the future sporting clays course at Traditions Field Club"
                    ref={(el) => { if (el) el.playbackRate = 0.8; }}
                  >
                    <source src="/images/property-drive-view.mp4" type="video/mp4" />
                  </video>
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-[#162838]/30"></div>
                  {/* Overlay text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p
                      className="text-[#f5f2ec] text-lg md:text-2xl tracking-[0.25em] uppercase font-normal text-center px-4"
                      style={{ fontFamily: "var(--font-heading), serif", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
                    >
                      Welcome to Your First Course
                    </p>
                  </div>
                </div>
                {/* Decorative accent */}
                <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 bg-[#a75235]/10 rounded-lg -z-10"></div>
                <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 bg-[#3d5a45]/10 rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Shooting Sports Overview */}
        <section
          id="activities"
          ref={(el) => { sectionRefs.current["activities"] = el; }}
          className="py-20 md:py-28 bg-[#f5f2ec]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div
              className={`text-center mb-16 transition-all duration-1000 ease-out ${
                isVisible("activities")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
                <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">
                  What We Offer
                </span>
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              </div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl text-[#162838] mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Shooting Sports
              </h2>
              <div className="flex justify-center mb-6">
                <span className="h-[1px] w-16 bg-[#a75235]"></span>
              </div>
              <p className="text-lg text-[#333333] max-w-2xl mx-auto">
                Experience premier shooting sports in a setting that connects you with
                the land and traditions of the South.
              </p>
            </div>

            {/* Activities Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 5-Stand */}
              <div
                className={`group bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden transition-all duration-700 ease-out hover:shadow-lg ${
                  isVisible("activities")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src="/images/shooting_stations_construction.webp"
                    alt="5-Stand shooting stations at Traditions Field Club"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#162838]/0 group-hover:bg-[#162838]/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3
                    className="text-2xl text-[#162838] mb-3"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    5-Stand
                  </h3>
                  <p className="text-[#333333] text-sm leading-relaxed mb-4">
                    Five shooting stations with varied target presentations. Perfect for
                    honing your skills or enjoying a quick session.
                  </p>
                  <Link
                    href="/activities#5-stand"
                    className="inline-flex items-center text-[#a75235] font-semibold text-sm hover:text-[#162838] transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Sporting Clays */}
              <div
                className={`group bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden transition-all duration-700 ease-out hover:shadow-lg ${
                  isVisible("activities")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src="/images/shooter_at_stand.webp"
                    alt="Sporting clays shooting at Traditions Field Club"
                    fill
                    quality={50}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#162838]/0 group-hover:bg-[#162838]/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3
                    className="text-2xl text-[#162838] mb-3"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Sporting Clays
                  </h3>
                  <p className="text-[#333333] text-sm leading-relaxed mb-4">
                    Often called &quot;golf with a shotgun,&quot; our courses wind through
                    the natural beauty of South Carolina&apos;s fields.
                  </p>
                  <Link
                    href="/activities#sporting-clays"
                    className="inline-flex items-center text-[#a75235] font-semibold text-sm hover:text-[#162838] transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Archery */}
              <div
                className={`group bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden transition-all duration-700 ease-out hover:shadow-lg ${
                  isVisible("activities")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src="/images/archery_range_shooting.webp"
                    alt="Archery range at Traditions Field Club"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#162838]/40 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold tracking-[0.3em] uppercase bg-[#162838]/60 px-4 py-2 rounded">Coming Soon</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className="text-2xl text-[#162838] mb-3"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Archery
                  </h3>
                  <p className="text-[#333333] text-sm leading-relaxed mb-4">
                    A dedicated outdoor range designed with youth and beginners in mind.
                    All ages and skill levels welcome.
                  </p>
                  <Link
                    href="/activities#archery"
                    className="inline-flex items-center text-[#a75235] font-semibold text-sm hover:text-[#162838] transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
              <Link
                href="/activities"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                View All Activities
              </Link>
            </div>
          </div>
        </section>

        {/* Full-Width Image Break */}
        <section className="relative h-[300px] md:h-[400px]" role="img" aria-label="Spanish moss hanging from trees in the forest at Traditions Field Club">
          <div className="absolute inset-0 bg-[#162838]">
            <Image
              src="/images/spanish_moss_forest.webp"
              alt=""
              fill
              unoptimized
              className="object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#162838]/60"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <p
                className="text-[#f5f2ec]/70 text-lg md:text-xl tracking-wide"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                — Where Tradition Meets Excellence —
              </p>
            </div>
          </div>
        </section>

        {/* Membership Preview */}
        <section
          id="membership"
          ref={(el) => { sectionRefs.current["membership"] = el; }}
          className="py-20 md:py-28 bg-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Membership Image */}
              <div
                className={`relative h-[400px] order-2 lg:order-1 transition-all duration-1000 ease-out ${
                  isVisible("membership")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <Image
                    src="/images/pond_selfie_2.webp"
                    alt="Members enjoying the property at Traditions Field Club"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content */}
              <div
                className={`order-1 lg:order-2 transition-all duration-1000 ease-out delay-200 ${
                  isVisible("membership")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">
                    Join Us
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Membership
                </h2>
                <p className="text-lg text-[#333333] leading-relaxed mb-6">
                  Become part of something special. Membership at Traditions Field Club
                  offers exclusive access, member-only events, and the opportunity to
                  be part of a community that shares your passion.
                </p>

                {/* Membership Highlights */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#f5f2ec] p-4 rounded-lg">
                    <p className="text-[#162838] font-semibold mb-1">7-Day Access</p>
                    <p className="text-sm text-[#333333]">Sun up to sun down</p>
                  </div>
                  <div className="bg-[#f5f2ec] p-4 rounded-lg">
                    <p className="text-[#162838] font-semibold mb-1">Clay Credits</p>
                    <p className="text-sm text-[#333333]">Dues convert to value</p>
                  </div>
                  <div className="bg-[#f5f2ec] p-4 rounded-lg">
                    <p className="text-[#162838] font-semibold mb-1">Family Friendly</p>
                    <p className="text-sm text-[#333333]">All ages welcome</p>
                  </div>
                  <div className="bg-[#f5f2ec] p-4 rounded-lg">
                    <p className="text-[#162838] font-semibold mb-1">Events</p>
                    <p className="text-sm text-[#333333]">Member-only access</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/membership"
                    className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg text-center"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    View Membership Options
                  </Link>
                  <Link
                    href="/join"
                    className="inline-block bg-transparent border-2 border-[#a75235] text-[#a75235] px-8 py-3 font-semibold tracking-wide hover:bg-[#a75235] hover:text-[#f5f2ec] transition-colors rounded-lg text-center"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Join Our Waitlist
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Preview */}
        <section
          id="roadmap"
          ref={(el) => { sectionRefs.current["roadmap"] = el; }}
          className="py-20 md:py-28 bg-[#162838]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div
              className={`text-center mb-16 transition-all duration-1000 ease-out ${
                isVisible("roadmap")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-[1px] w-12 md:w-20 bg-[#f5f2ec]/20"></span>
                <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">
                  The Journey
                </span>
                <span className="h-[1px] w-12 md:w-20 bg-[#f5f2ec]/20"></span>
              </div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl text-[#f5f2ec] mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Our Roadmap
              </h2>
              <div className="flex justify-center mb-6">
                <span className="h-[1px] w-16 bg-[#a75235]"></span>
              </div>
              <p className="text-lg text-[#f5f2ec]/80 max-w-2xl mx-auto">
                We&apos;re building something special, one phase at a time.
              </p>
            </div>

            {/* Roadmap Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { phase: "Phase 1", title: "Foundation", status: "In Progress", desc: "Sporting clays, 5-stand, archery range" },
                { phase: "Phase 2", title: "Expansion", status: "Planned", desc: "Pro shop, key card system, pavilion" },
                { phase: "Phase 3", title: "Recreation", status: "Planned", desc: "Trails, camping, RV lot" },
                { phase: "Phase 4", title: "The Lodge", status: "Long-Term", desc: "Barn-style lodge, events, catering" },
              ].map((item, index) => (
                <div
                  key={item.phase}
                  className={`text-center transition-all duration-700 ease-out ${
                    isVisible("roadmap")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    item.status === "In Progress" ? "bg-[#3d5a45]" : "bg-[#f5f2ec]/10"
                  }`}>
                    <span className="text-[#f5f2ec] font-bold">{index + 1}</span>
                  </div>
                  <span className={`text-xs uppercase tracking-wider ${
                    item.status === "In Progress" ? "text-[#3d5a45]" : "text-[#f5f2ec]/50"
                  }`}>
                    {item.status}
                  </span>
                  <h3
                    className="text-xl text-[#f5f2ec] mt-2 mb-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#f5f2ec]/60">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* View Full Roadmap */}
            <div className="text-center mt-12">
              <Link
                href="/roadmap"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#3d5a45] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                View Full Roadmap
              </Link>
            </div>
          </div>
        </section>

        {/* Volunteer Callout */}
        <section
          id="volunteer"
          ref={(el) => { sectionRefs.current["volunteer"] = el; }}
          className="py-20 md:py-28 bg-[#f5f2ec] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div
                className={`transition-all duration-1000 ease-out ${
                  isVisible("volunteer")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">
                    Get Involved
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Volunteer With Us
                </h2>
                <p className="text-lg text-[#333333] leading-relaxed mb-6">
                  Traditions Field Club is built on community. Our volunteer program offers
                  the opportunity to be part of something meaningful while enjoying exclusive perks.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[#333333]">
                      <strong className="text-[#162838]">Earn Clays</strong> — Volunteers can earn shooting clays
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[#333333]">
                      <strong className="text-[#162838]">Build Community</strong> — Work alongside fellow enthusiasts
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[#333333]">
                      <strong className="text-[#162838]">Shape the Club</strong> — Help build the future of Traditions
                    </span>
                  </li>
                </ul>
                <Link
                  href="/contact?topic=volunteer"
                  className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Become a Volunteer
                </Link>
              </div>

              {/* Image Placeholder */}
              <div
                className={`relative h-[400px] transition-all duration-1000 ease-out delay-200 ${
                  isVisible("volunteer")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <Image
                    src="/images/trap_setup_team_2.webp"
                    alt="Volunteers setting up trap machines at Traditions Field Club"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
