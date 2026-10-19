"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Picture from "@/components/Picture";
import FadeImage from "@/components/FadeImage";

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
    question: "How long does it take to complete a course?",
    answer: "Approximately 1½ to 2 hours if you're shooting at a leisurely pace."
  },
  {
    question: "Can I bring guests to the club?",
    answer: "Yes! Both Prime and Corporate memberships include guest privileges, with guest allowances varying by tier."
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
            className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-500 ease-out ${
              isVisible("intro")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
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
              At Traditions Field Club, membership is more than access. It&apos;s an invitation to be part of
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
            {/* Section Header */}
            <div
              className={`text-center mb-12 transition-all duration-500 ease-out ${
                isVisible("tiers")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
                <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Membership Options</span>
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              </div>
              <h2
                className="text-3xl md:text-4xl text-[#162838]"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Choose Your Tier
              </h2>
              <div className="flex justify-center mt-4">
                <span className="h-[1px] w-16 bg-[#a75235]"></span>
              </div>
            </div>

            {/* 2027 Memberships Callout */}
            <div
              className={`bg-[#4d5c47] rounded-lg p-6 md:p-8 mb-8 md:mb-10 text-center transition-all duration-500 ease-out ${
                isVisible("tiers")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
            >
              <h3
                className="text-2xl md:text-3xl text-[#f5f2ec] mb-3"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                2027 Memberships Available Now
              </h3>
              <p className="text-[#f5f2ec]/90 max-w-2xl mx-auto">
                Join today and start shooting Riverside and Evergreen Courses and the 5-stand for the rest of 2026.
              </p>
              <p className="text-[#f5f2ec] font-semibold max-w-2xl mx-auto mt-3">
                Join our founding class of 100 members.
              </p>
            </div>

            {/* Property images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-8 md:mb-10">
              <div className="relative h-[240px] md:h-[300px] rounded-lg overflow-hidden">
                <Picture name="forest-trails-aerial" alt="Aerial view of the forest and trails at Traditions Field Club" imgClassName="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="relative h-[240px] md:h-[300px] rounded-lg overflow-hidden">
                <Picture name="sunset-stand" alt="A covered shooting stand at sunset at Traditions Field Club" imgClassName="absolute inset-0 w-full h-full object-cover object-bottom" />
              </div>
              <div className="relative h-[240px] md:h-[300px] rounded-lg overflow-hidden">
                <Picture name="sunset-trail" alt="Sunset along a trail at Traditions Field Club" imgClassName="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="relative h-[240px] md:h-[300px] rounded-lg overflow-hidden">
                <Picture name="sunset-pink" alt="Pink sunset sky over the pines at Traditions Field Club" imgClassName="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>

            {/* All Memberships Include */}
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-8 md:mb-10">
              <h3
                className="text-xl md:text-2xl text-[#162838] mb-4 text-center"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                All Memberships Include
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-[#333333]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#a75235] rounded-full flex-shrink-0"></span>
                  <span>Access to sporting clays</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#a75235] rounded-full flex-shrink-0"></span>
                  <span>7-day access, sun up to sun down</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#a75235] rounded-full flex-shrink-0"></span>
                  <span>Invitation to member and family events</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {/* Prime Membership */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden flex flex-col transition-all duration-500 ease-out hover:shadow-md ${
                  isVisible("tiers")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <div className="bg-[#162838] p-6 text-center">
                  <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">Individual &amp; Family</span>
                  <h3
                    className="text-2xl md:text-3xl text-[#f5f2ec] mt-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Prime Membership
                  </h3>
                  <p className="mt-3">
                    <span className="text-3xl md:text-4xl text-[#f5f2ec] font-semibold">$2,000</span>
                    <span className="text-sm text-[#f5f2ec]/60"> /year</span>
                  </p>
                  <p className="mt-1 text-sm text-[#f5f2ec]/70">or $500 quarterly</p>
                </div>
                <div className="p-6 md:p-8 flex-grow">
                  <p className="text-[#333333] leading-relaxed mb-6">
                    Perfect for individuals and families looking to make sporting clays part of
                    their routine, with room to bring along your household or regular shooting
                    partners.
                  </p>
                  <ul className="space-y-3 text-[#333333] mb-8">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>2 member cards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Up to 8 shooters</span>
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
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden flex flex-col transition-all duration-500 ease-out hover:shadow-md ${
                  isVisible("tiers")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="bg-[#162838] p-6 text-center">
                  <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">Business</span>
                  <h3
                    className="text-2xl md:text-3xl text-[#f5f2ec] mt-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Corporate Membership
                  </h3>
                  <p className="mt-3">
                    <span className="text-3xl md:text-4xl text-[#f5f2ec] font-semibold">$3,500</span>
                    <span className="text-sm text-[#f5f2ec]/60"> /year</span>
                  </p>
                  <p className="mt-1 text-sm text-[#f5f2ec]/70">or $875 quarterly</p>
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
                      <span>4 member cards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Up to 16 shooters</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Priority event booking</span>
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
            </div>

            <p className="max-w-4xl mx-auto mt-4 text-center text-sm text-[#333333]/80">
              Annual or quarterly billing available.
            </p>

            {/* Member for a Day - Try it first */}
            <div
              className={`max-w-4xl mx-auto mt-6 md:mt-8 bg-white rounded-lg shadow-sm border border-[#e8e4dc] border-l-4 border-l-[#4d5c47] p-6 md:p-8 transition-all duration-500 ease-out hover:shadow-md ${
                isVisible("tiers")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                <div className="grid grid-cols-2 gap-3 md:w-[260px] flex-shrink-0">
                  <div className="relative h-[140px] rounded-lg overflow-hidden">
                    <Picture name="stand-daylight" alt="Looking out from a covered shooting stand over the field in daylight" imgClassName="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="relative h-[140px] rounded-lg overflow-hidden">
                    <Picture name="sunset-mfad" alt="Sunset over a shooting stand at Traditions Field Club" imgClassName="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Try it first</span>
                  <div className="flex flex-wrap items-baseline justify-center md:justify-start gap-x-3 gap-y-1 mt-2 mb-2">
                    <h3
                      className="text-xl md:text-2xl text-[#162838]"
                      style={{ fontFamily: "var(--font-heading), serif" }}
                    >
                      Member for a Day
                    </h3>
                    <span className="text-2xl text-[#162838] font-semibold">$100 <span className="text-base font-normal text-[#666666]">per shooter, all in</span></span>
                  </div>
                  <p className="text-[#333333] leading-relaxed">
                    A warm-up at the 5-Stand, then a guided round on a few of our signature stands with one of us alongside you. 50 shots in all, about an hour to an hour and a half. Extra clays and shells are an added charge.
                  </p>
                  <p className="text-sm text-[#666666] italic mt-2">
                    Join within 30 days and your $100 goes toward your Prime membership.
                  </p>
                  <p className="text-sm text-[#666666] italic mt-1">
                    Shotgun rental, shells, and eye and ear protection all included.
                  </p>
                  <p className="text-sm text-[#666666] mt-1">
                    Want to look around first? Ask for a complimentary tour. No cost, no commitment.
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col gap-3">
                  <a
                    href="/member-for-a-day#book"
                    className="inline-block w-full md:w-auto border-2 border-[#a75235] text-[#a75235] px-8 py-3 text-center font-semibold tracking-wide hover:bg-[#a75235] hover:text-[#f5f2ec] transition-colors rounded-lg"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Book your day
                  </a>
                  <a
                    href="/tour#book"
                    className="inline-block w-full md:w-auto bg-[#4d5c47] border-2 border-[#4d5c47] text-[#f5f2ec] px-8 py-3 text-center font-semibold tracking-wide hover:bg-[#162838] hover:border-[#162838] transition-colors rounded-lg"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Tour Traditions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Member Vehicle Storage */}
        <section id="vehicle-storage" className="py-16 md:py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              <figure className="lg:order-2">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                  <Picture
                    name="member-utv-storage"
                    alt="A side-by-side outfitted for sporting clays, with a roll cage gun rack, shell bag and gear box, parked on a sandy trail among the pines"
                    imgClassName="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-[#666666] italic">Simulated photo for illustration.</figcaption>
              </figure>
              <div className="lg:order-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Member Perk</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Your Second Home Has Room for Your Ride
                </h2>
                <p className="text-[#333333] leading-relaxed mb-4">
                  Traditions is meant to feel like your second home, and we want to make it easy. Short
                  on space at home? Members may keep their UTV, side-by-side or golf cart here. Think of
                  it like dry stack storage at a marina: let us know you&apos;re coming out, and
                  we&apos;ll have your ride ready when you arrive.
                </p>
                <p className="text-sm text-[#666666] italic">
                  Vehicles must be covered by the owner&apos;s insurance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate and Hosted Events */}
        <section id="corporate-events" className="py-16 md:py-24 bg-[#162838] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-[300px] md:h-[440px] rounded-lg overflow-hidden">
                    <Picture name="photo-brian-stand" alt="Brian Seifrit, co-founder, at the stand" imgClassName="absolute inset-0 w-full h-full object-cover object-[60%_30%]" />
                  </div>
                  <div className="relative h-[300px] md:h-[440px] rounded-lg overflow-hidden">
                    <Picture name="photo-host-stand" alt="Jim Nicholson, co-founder, at the stand rail" imgClassName="absolute inset-0 w-full h-full object-cover object-[60%_30%]" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">Corporate &amp; Hosted Events</span>
                <h2
                  className="text-3xl md:text-4xl text-[#f5f2ec] mt-2 mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Bring Your People Out
                </h2>
                <p className="text-[#f5f2ec]/85 leading-relaxed mb-6">
                  Hosting clients or your team? Take a look around the property, then reach out and
                  we&apos;ll help you plan the day.
                </p>
                <div className="rounded-lg overflow-hidden bg-black aspect-video">
                  <video
                    controls
                    muted
                    playsInline
                    preload="none"
                    poster="/media/property-reel-v2-poster.jpg"
                    className="w-full h-full object-cover"
                    aria-label="Highlight reel of the Traditions Field Club property"
                  >
                    <source src="/media/property-reel-v2.mp4" type="video/mp4" />
                  </video>
                </div>
                <a
                  href="/contact"
                  className="inline-block mt-6 bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#162838] transition-colors rounded-lg"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Plan an Event
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* The Wild Side teaser */}
        <section id="wild-side" className="py-16 md:py-24 bg-[#1f2a1c] overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">Members Only</span>
            <h2
              className="text-3xl md:text-4xl text-[#f5f2ec] mt-2 mb-4"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              The Wild Side
            </h2>
            <p className="text-[#f5f2ec]/85 max-w-2xl mx-auto mb-8">
              Membership grants access to our wild side. Prime and Corporate members get to see what lies beyond the courses.
            </p>
            <div className="rounded-lg overflow-hidden bg-black aspect-video max-w-4xl mx-auto">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/media/wild-side-teaser-poster.jpg"
                className="w-full h-full object-cover"
                aria-label="A glimpse of the wild side of the Traditions Field Club property"
              >
                <source src="/media/wild-side-teaser.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/join"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#162838] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Become a Member
              </a>
              <a
                href="/tour#book"
                className="inline-block border-2 border-[#f5f2ec] text-[#f5f2ec] px-8 py-[10px] font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#162838] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Book a Tour
              </a>
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
                className={`relative h-[300px] sm:h-[350px] md:h-[450px] rounded-lg overflow-hidden transition-all duration-500 ease-out ${
                  isVisible("benefits")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <FadeImage
                  src="/images/kids_truck_bed_property.webp"
                  alt="Kids hanging out in a truck bed on the property at Traditions Field Club"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-500 ease-out delay-100 ${
                  isVisible("benefits")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
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
                    <h4 className="text-[#162838] font-semibold mb-2">Key Card Access</h4>
                    <p className="text-sm text-[#333333]">Use your member card for quick, convenient clay purchases on-site</p>
                  </div>
                  <div className="bg-[#f5f2ec] p-4 rounded-lg">
                    <h4 className="text-[#162838] font-semibold mb-2">Community Events</h4>
                    <p className="text-sm text-[#333333]">Exclusive member gatherings and tournaments</p>
                  </div>
                  <div className="bg-[#f5f2ec] p-4 rounded-lg sm:col-span-2">
                    <h4 className="text-[#162838] font-semibold mb-2">Room for Your Ride</h4>
                    <p className="text-sm text-[#333333]">Keep your UTV, side-by-side or golf cart at the club. Let us know you&apos;re coming and it will be ready</p>
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
              className={`text-center mb-12 transition-all duration-500 ease-out ${
                isVisible("faq")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
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
                  className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden transition-all duration-500 ease-out ${
                    isVisible("faq")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
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
              className={`text-center mt-10 transition-all duration-500 ease-out delay-500 ${
                isVisible("faq")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
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
        <section className="py-16 md:py-20 bg-[#4d5c47]">
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
                className="inline-block bg-transparent border-2 border-[#f5f2ec] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#4d5c47] transition-colors rounded-lg"
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
