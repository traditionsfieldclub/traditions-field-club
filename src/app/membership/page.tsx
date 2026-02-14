"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Image from "next/image";

const faqs = [
  {
    question: "How do I apply for membership?",
    answer: "You can apply for membership by contacting us through our website or by visiting the club in person. We'll walk you through the application process and help you find the membership tier that best fits your needs."
  },
  {
    question: "What are the club hours?",
    answer: "Members have 7-day access from sun up to sun down. Our office hours are Monday through Friday, 8am to 5pm. After-hours contact is available based on availability."
  },
  {
    question: "Can I bring guests to the club?",
    answer: "Yes! All membership tiers include guest privileges. The number of guest passes varies by membership level, with our Exclusive tier offering unlimited guest passes."
  },
  {
    question: "Do I need to bring my own equipment?",
    answer: "While many members bring their own shotguns and equipment, rentals and supplies are available for those who need them. Clay targets and ammunition are available for purchase on-site."
  },
  {
    question: "Is there a minimum age requirement?",
    answer: "We welcome shooters of all ages! Youth shooters under 18 must be accompanied by a parent or guardian. We offer youth instruction programs designed specifically for young shooters to learn safely."
  },
  {
    question: "What if I've never shot sporting clays before?",
    answer: "We welcome beginners! Our certified instructors offer lessons for all skill levels. We recommend booking an introductory session where you'll learn safety protocols, proper technique, and get comfortable with the sport."
  },
];

export default function Membership() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
          <div className="absolute inset-0 bg-[#162838]">
            <div className="absolute inset-0 bg-[#162838]/70"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Membership
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              Join our community of outdoor enthusiasts
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
              <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Join Us</span>
              <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
            </div>
            <h2
              className="text-3xl md:text-4xl text-[#162838] mb-6"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Find Your Perfect Membership
            </h2>
            <div className="flex justify-center mb-6">
              <span className="h-[1px] w-16 bg-[#a75235]"></span>
            </div>
            <p className="text-lg text-[#333333] leading-relaxed">
              At Traditions Field Club, membership is more than access—it&apos;s an invitation to be part of
              something special. Choose the membership tier that fits your lifestyle and enjoy exclusive
              benefits, from priority access to member-only events.
            </p>
          </div>
        </section>

        {/* Membership Tiers */}
        <section
          id="tiers"
          ref={(el) => { sectionRefs.current["tiers"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Basic Membership */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden flex flex-col transition-all duration-700 ease-out hover:shadow-md ${
                  isVisible("tiers")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <div className="bg-[#162838] p-6 text-center">
                  <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">Individual</span>
                  <h3
                    className="text-2xl md:text-3xl text-[#f5f2ec] mt-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Basic Membership
                  </h3>
                </div>
                <div className="p-6 md:p-8 flex-grow">
                  <p className="text-[#333333] leading-relaxed mb-6">
                    Perfect for individuals looking to enjoy our sporting clays and archery facilities.
                    Access the club at your own pace with flexible scheduling and all the essentials
                    for a great shooting experience.
                  </p>
                  <ul className="space-y-3 text-[#333333] mb-8">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Access to sporting clays and 5-stand</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Archery range access</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Member pricing on clays and supplies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>7-day access, sun up to sun down</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Invitation to member events</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="/join"
                    className="block w-full bg-[#a75235] text-[#f5f2ec] px-6 py-3 text-center font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Apply Now
                  </a>
                </div>
              </div>

              {/* Family Membership */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden flex flex-col transition-all duration-700 ease-out hover:shadow-md ${
                  isVisible("tiers")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="bg-[#162838] p-6 text-center">
                  <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">Household</span>
                  <h3
                    className="text-2xl md:text-3xl text-[#f5f2ec] mt-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Family Membership
                  </h3>
                </div>
                <div className="p-6 md:p-8 flex-grow">
                  <p className="text-[#333333] leading-relaxed mb-6">
                    Share the tradition with your loved ones. Family membership includes access for
                    your entire household, making it easy to introduce the next generation to
                    the joys of outdoor sporting.
                  </p>
                  <ul className="space-y-3 text-[#333333] mb-8">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>All Basic Membership benefits</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Access for spouse and children under 18</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Youth instruction program discounts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Family event invitations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Guest passes included</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="/join"
                    className="block w-full bg-[#a75235] text-[#f5f2ec] px-6 py-3 text-center font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Apply Now
                  </a>
                </div>
              </div>

              {/* Corporate Membership */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden flex flex-col transition-all duration-700 ease-out hover:shadow-md ${
                  isVisible("tiers")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="bg-[#162838] p-6 text-center">
                  <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">Business</span>
                  <h3
                    className="text-2xl md:text-3xl text-[#f5f2ec] mt-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Corporate Membership
                  </h3>
                </div>
                <div className="p-6 md:p-8 flex-grow">
                  <p className="text-[#333333] leading-relaxed mb-6">
                    Build team relationships in a unique setting. Corporate membership provides
                    your organization with a premier venue for team building, client entertainment,
                    and company events.
                  </p>
                  <ul className="space-y-3 text-[#333333] mb-8">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Multiple employee access passes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Priority event booking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Dedicated corporate event coordinator</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Group instruction sessions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Catering and hospitality options</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="/join"
                    className="block w-full bg-[#a75235] text-[#f5f2ec] px-6 py-3 text-center font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Apply Now
                  </a>
                </div>
              </div>

              {/* Exclusive Membership */}
              <div
                className={`bg-white rounded-lg shadow-lg border-2 border-[#a75235] overflow-hidden flex flex-col relative transition-all duration-700 ease-out hover:shadow-xl ${
                  isVisible("tiers")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                {/* Featured Badge */}
                <div className="absolute top-4 right-4 bg-[#a75235] text-[#f5f2ec] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                  Premium
                </div>
                <div className="bg-[#162838] p-6 text-center">
                  <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">Elite</span>
                  <h3
                    className="text-2xl md:text-3xl text-[#f5f2ec] mt-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Exclusive Membership
                  </h3>
                </div>
                <div className="p-6 md:p-8 flex-grow">
                  <p className="text-[#333333] leading-relaxed mb-6">
                    The ultimate Traditions Field Club experience. Exclusive membership offers
                    unparalleled access, priority privileges, and recognition as a founding
                    supporter of our vision.
                  </p>
                  <ul className="space-y-3 text-[#333333] mb-8">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>All Family Membership benefits</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Unlimited guest passes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Private instruction sessions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>VIP access to all club events</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Founding member recognition</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Priority access to future phases</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="/join"
                    className="block w-full bg-[#a75235] text-[#f5f2ec] px-6 py-3 text-center font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Benefits Section */}
        <section
          id="benefits"
          ref={(el) => { sectionRefs.current["benefits"] = el; }}
          className="py-16 md:py-24 bg-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                className={`relative h-[300px] sm:h-[350px] md:h-[450px] rounded-lg overflow-hidden transition-all duration-1000 ease-out ${
                  isVisible("benefits")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <Image
                  src="/images/youth_shooting_team_silo.webp"
                  alt="Youth shooting team at Traditions Field Club"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isVisible("benefits")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Member Benefits</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  More Than Just Access
                </h2>
                <p className="text-[#333333] leading-relaxed mb-6">
                  Being a member of Traditions Field Club means joining a community of like-minded
                  individuals who share your passion for the outdoors. Beyond the facilities,
                  you&apos;ll enjoy exclusive benefits that enhance every visit.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#f5f2ec] p-4 rounded-lg">
                    <h4 className="text-[#162838] font-semibold mb-2">Clay Credits</h4>
                    <p className="text-sm text-[#333333]">Membership dues convert into shooting credits</p>
                  </div>
                  <div className="bg-[#f5f2ec] p-4 rounded-lg">
                    <h4 className="text-[#162838] font-semibold mb-2">Key Card Access</h4>
                    <p className="text-sm text-[#333333]">Convenient entry with your member card</p>
                  </div>
                  <div className="bg-[#f5f2ec] p-4 rounded-lg">
                    <h4 className="text-[#162838] font-semibold mb-2">Volunteer Perks</h4>
                    <p className="text-sm text-[#333333]">Earn free shooting through volunteer work</p>
                  </div>
                  <div className="bg-[#f5f2ec] p-4 rounded-lg">
                    <h4 className="text-[#162838] font-semibold mb-2">Community Events</h4>
                    <p className="text-sm text-[#333333]">Exclusive member gatherings and tournaments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          ref={(el) => { sectionRefs.current["faq"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] overflow-hidden"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div
              className={`text-center mb-12 transition-all duration-1000 ease-out ${
                isVisible("faq")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
                <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Have Questions?</span>
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              </div>
              <h2
                className="text-3xl md:text-4xl text-[#162838]"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Frequently Asked Questions
              </h2>
              <div className="flex justify-center mt-4">
                <span className="h-[1px] w-16 bg-[#a75235]"></span>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden transition-all duration-700 ease-out ${
                    isVisible("faq")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <button
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#f5f2ec]/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                  >
                    <span
                      className="text-lg text-[#162838] font-semibold"
                      style={{ fontFamily: "var(--font-heading), serif" }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`w-6 h-6 flex items-center justify-center text-[#a75235] transition-transform duration-300 flex-shrink-0 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-5 pt-0 text-[#333333] leading-relaxed border-t border-[#e8e4dc]">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* More Questions */}
            <div
              className={`text-center mt-10 transition-all duration-1000 ease-out delay-500 ${
                isVisible("faq")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-[#333333] mb-4">Still have questions?</p>
              <a
                href="/contact"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Contact Us
              </a>
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
              Ready to Join the Tradition?
            </h2>
            <div className="flex justify-center mb-6">
              <span className="h-[1px] w-16 bg-[#a75235]"></span>
            </div>
            <p className="text-[#f5f2ec] opacity-90 max-w-2xl mx-auto mb-8">
              Have questions about membership? Want to schedule a visit before joining?
              We&apos;d love to hear from you and help you find the perfect membership for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Contact Us
              </a>
              <a
                href="/roadmap"
                className="inline-block bg-transparent border-2 border-[#f5f2ec] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#3d5a45] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                View Our Roadmap
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
