"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export default function About() {
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
              About Us
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              Our story, mission, and the people behind Traditions Field Club
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section
          id="mission"
          ref={(el) => { sectionRefs.current["mission"] = el; }}
          className="py-16 md:py-24 bg-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Mission */}
              <div
                className={`transition-all duration-1000 ease-out ${
                  isVisible("mission")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Our Purpose</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Our Mission
                </h2>
                <p className="text-[#333333] leading-relaxed mb-4">
                  Traditions Field Club is dedicated to preserving and sharing the heritage of Southern outdoor sporting traditions.
                  We provide a premier destination where families, veterans, and outdoor enthusiasts can experience
                  world-class shooting sports in a safe, welcoming environment.
                </p>
                <p className="text-[#333333] leading-relaxed">
                  Our commitment extends beyond the sport itself—we are stewards of the land,
                  educators of safety and skill, and builders of a community united by shared values
                  and a love for the outdoors.
                </p>
              </div>

              {/* Vision */}
              <div
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isVisible("mission")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Looking Forward</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Our Vision
                </h2>
                <p className="text-[#333333] leading-relaxed mb-4">
                  We envision Traditions Field Club as more than a shooting range—it&apos;s a destination.
                  A place where the beauty of South Carolina&apos;s Lowcountry meets the refined traditions
                  of heritage outdoor sports.
                </p>
                <p className="text-[#333333] leading-relaxed">
                  From walking trails and camping areas to a future barn-style lodge,
                  we&apos;re building a place where memories are made, skills are passed down through generations,
                  and the traditions of Southern outdoor life are celebrated and preserved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section
          id="values"
          ref={(el) => { sectionRefs.current["values"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div
              className={`text-center mb-12 transition-all duration-1000 ease-out ${
                isVisible("values")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
                <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">What We Stand For</span>
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              </div>
              <h2
                className="text-3xl md:text-4xl text-[#162838]"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Our Values
              </h2>
              <div className="flex justify-center mt-4">
                <span className="h-[1px] w-16 bg-[#a75235]"></span>
              </div>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Veteran-Owned */}
              <div
                className={`bg-white p-6 rounded-lg shadow-sm border border-[#e8e4dc] text-center transition-all duration-700 ease-out hover:shadow-md ${
                  isVisible("values")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <div className="w-16 h-16 bg-[#162838] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <h3
                  className="text-xl text-[#162838] mb-3"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Veteran-Owned
                </h3>
                <p className="text-[#333333] text-sm leading-relaxed">
                  Founded by veterans who understand discipline, service, and the importance of tradition.
                </p>
              </div>

              {/* Family-Friendly */}
              <div
                className={`bg-white p-6 rounded-lg shadow-sm border border-[#e8e4dc] text-center transition-all duration-700 ease-out hover:shadow-md ${
                  isVisible("values")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="w-16 h-16 bg-[#3d5a45] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3
                  className="text-xl text-[#162838] mb-3"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Family-Friendly
                </h3>
                <p className="text-[#333333] text-sm leading-relaxed">
                  A welcoming environment for all ages, with youth programs designed to inspire the next generation.
                </p>
              </div>

              {/* Safety-First */}
              <div
                className={`bg-white p-6 rounded-lg shadow-sm border border-[#e8e4dc] text-center transition-all duration-700 ease-out hover:shadow-md ${
                  isVisible("values")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="w-16 h-16 bg-[#a75235] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3
                  className="text-xl text-[#162838] mb-3"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Safety-First
                </h3>
                <p className="text-[#333333] text-sm leading-relaxed">
                  Certified instructors and rigorous safety protocols ensure a secure experience for everyone.
                </p>
              </div>

              {/* Community-Driven */}
              <div
                className={`bg-white p-6 rounded-lg shadow-sm border border-[#e8e4dc] text-center transition-all duration-700 ease-out hover:shadow-md ${
                  isVisible("values")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div className="w-16 h-16 bg-[#162838] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3
                  className="text-xl text-[#162838] mb-3"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Community-Driven
                </h3>
                <p className="text-[#333333] text-sm leading-relaxed">
                  Built by volunteers and members who share a passion for preserving outdoor traditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Land Section */}
        <section
          id="land"
          ref={(el) => { sectionRefs.current["land"] = el; }}
          className="py-16 md:py-24 bg-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Photo Coming Soon */}
              <div
                className={`relative h-[300px] sm:h-[350px] md:h-[450px] bg-[#e8e4dc] rounded-lg overflow-hidden transition-all duration-1000 ease-out ${
                  isVisible("land")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#162838]">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm uppercase tracking-widest opacity-60">Photo Coming Soon</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isVisible("land")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">The Setting</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  The Land
                </h2>
                <p className="text-[#333333] leading-relaxed mb-4">
                  Nestled in the quiet rural heart of South Carolina&apos;s Lowcountry, Traditions Field Club
                  sits on land that embodies the natural beauty and rich heritage of the South.
                  Rolling fields, mature pine forests, and the peaceful sounds of nature create
                  an atmosphere unlike any other.
                </p>
                <p className="text-[#333333] leading-relaxed mb-6">
                  We are stewards of this land—committed to its preservation and enhancement.
                  Our courses wind through the natural terrain, designed to showcase the landscape
                  while providing a world-class sporting experience. Here, you&apos;ll find deer trails,
                  wildlife, and the kind of tranquility that can only be found away from the rush of modern life.
                </p>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full flex-shrink-0"></span>
                    Located along Highway 21 in Ruffin, SC
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full flex-shrink-0"></span>
                    Natural landscape with wildlife presence
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full flex-shrink-0"></span>
                    Designed as a destination, not just a range
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Owners Section */}
        <section
          id="owners"
          ref={(el) => { sectionRefs.current["owners"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div
              className={`text-center mb-12 transition-all duration-1000 ease-out ${
                isVisible("owners")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
                <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">The Founders</span>
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              </div>
              <h2
                className="text-3xl md:text-4xl text-[#162838]"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Meet the Owners
              </h2>
              <div className="flex justify-center mt-4">
                <span className="h-[1px] w-16 bg-[#a75235]"></span>
              </div>
            </div>

            {/* Shared Intro */}
            <div
              className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ease-out ${
                isVisible("owners")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-[#333333] leading-relaxed">
                Brian Seifrit and Jim Nicholson are co-owners of Traditions Field Club, united by their shared commitment to faith, family, personal growth, and the outdoors. Guided by strong Christian values, they are dedicated to preserving outdoor traditions while creating meaningful opportunities for families and future generations to experience them firsthand. Together, they are building a place where faith, fellowship, mentorship, and outdoor heritage come together to strengthen families and communities.
              </p>
            </div>

            {/* Owners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {/* Owner 1 */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden transition-all duration-700 ease-out hover:shadow-md ${
                  isVisible("owners")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                {/* Photo Placeholder */}
                <div className="relative h-[250px] sm:h-[300px] md:h-[350px] bg-[#e8e4dc]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-[#162838]">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <p className="text-sm uppercase tracking-widest opacity-60">Photo Placeholder</p>
                    </div>
                  </div>
                </div>
                {/* Bio */}
                <div className="p-6 md:p-8">
                  <h3
                    className="text-2xl text-[#162838] mb-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Brian Seifrit
                  </h3>
                  <p className="text-[#a75235] text-sm uppercase tracking-wider mb-4">Co-Owner</p>
                  <p className="text-[#333333] leading-relaxed mb-4">
                    An accomplished marksman and seasoned outdoorsman, Brian brings decades of experience in hunting, shooting sports, land stewardship, and wildlife conservation. He is especially passionate about mentoring youth, teaching safe and responsible firearm handling, and helping young people develop confidence, discipline, and respect for the outdoors.
                  </p>
                  <p className="text-[#333333] leading-relaxed">
                    For Brian, every day at the club is an opportunity to pass down the traditions and values that shaped him.
                  </p>
                </div>
              </div>

              {/* Owner 2 */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden transition-all duration-700 ease-out hover:shadow-md ${
                  isVisible("owners")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                {/* Photo Placeholder */}
                <div className="relative h-[250px] sm:h-[300px] md:h-[350px] bg-[#e8e4dc]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-[#162838]">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <p className="text-sm uppercase tracking-widest opacity-60">Photo Placeholder</p>
                    </div>
                  </div>
                </div>
                {/* Bio */}
                <div className="p-6 md:p-8">
                  <h3
                    className="text-2xl text-[#162838] mb-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Jim Nicholson
                  </h3>
                  <p className="text-[#a75235] text-sm uppercase tracking-wider mb-4">Co-Owner</p>
                  <p className="text-[#333333] leading-relaxed">
                    Jim Nicholson brings a complementary professional background focused on recognizing individual strengths and guiding people toward achieving their personal and professional goals. His expertise in leadership development and employee growth directly supports the club&apos;s emphasis on mentorship, character-building, and community—ensuring members grow not only in outdoor skill but also in purpose and integrity.
                  </p>
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
              <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">Join Us</span>
              <span className="h-[1px] w-12 md:w-20 bg-[#f5f2ec]/30"></span>
            </div>
            <h2
              className="text-3xl md:text-4xl text-[#f5f2ec] mb-4"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Become Part of the Tradition
            </h2>
            <div className="flex justify-center mb-6">
              <span className="h-[1px] w-16 bg-[#a75235]"></span>
            </div>
            <p className="text-[#f5f2ec] opacity-90 max-w-2xl mx-auto mb-8">
              We&apos;re building something special in the heart of South Carolina.
              Join our community of outdoor enthusiasts and be part of the journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/membership"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Learn About Membership
              </a>
              <a
                href="/contact"
                className="inline-block bg-transparent border-2 border-[#f5f2ec] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#3d5a45] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
