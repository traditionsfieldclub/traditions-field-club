"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Let Us Know You're Interested",
    description:
      "Reach out to us through our contact form or give us a call to express your interest. We'll answer any questions you have about the club, discuss membership options, and help you plan your first visit. Whether you're an experienced shooter or brand new to the sport, we're here to make sure you feel welcome from the start.",
  },
  {
    number: "02",
    title: "Arrival",
    description:
      "When you arrive at Traditions Field Club, you'll be greeted by our friendly staff at the main entrance. We recommend arriving 15-20 minutes before your scheduled time to allow for check-in and preparation. Don't forget to bring a valid ID and wear appropriate outdoor attire—closed-toe shoes are required on the range.",
  },
  {
    number: "03",
    title: "Receive a Safety Brief",
    description:
      "Safety is our top priority. Before heading to the range, all first-time visitors receive a comprehensive safety briefing from one of our certified instructors. You'll learn proper firearm handling, range etiquette, and emergency procedures. This ensures everyone has a safe and enjoyable experience.",
  },
  {
    number: "04",
    title: "Learn the Layout",
    description:
      "Your guide will walk you through our facilities, showing you the sporting clays courses, 5-Stand area, archery range, and amenities. You'll learn how to navigate the grounds, understand the different stations, and discover all the features that make Traditions Field Club special.",
  },
  {
    number: "05",
    title: "Enjoy Your Shoot",
    description:
      "Now comes the fun part! Whether you're trying sporting clays, 5-Stand, or archery, our staff will be nearby to assist if needed. Take your time, enjoy the beautiful surroundings, and challenge yourself at your own pace. Don't worry if you're new—everyone starts somewhere, and our supportive environment is perfect for learning.",
  },
  {
    number: "06",
    title: "Let Us Know What You Think",
    description:
      "After your session, we'd love to hear about your experience. Your feedback helps us continue improving and ensures we're providing the best possible experience for all our guests. Plus, it's a great opportunity to ask about membership options and plan your next visit!",
  },
];

const faqs = [
  {
    question: "Do I need any experience to visit?",
    answer: "Not at all! We welcome complete beginners. Our certified instructors will provide a full safety briefing and can offer guidance throughout your visit. Many of our members started with zero experience.",
  },
  {
    question: "How long should I plan for my first visit?",
    answer: "Plan for about 2-3 hours for your first visit. This allows time for check-in, the safety briefing, orientation of the grounds, and your shooting session. You're welcome to stay longer if you'd like more time on the range.",
  },
  {
    question: "Can I bring my children?",
    answer: "Yes! We welcome youth shooters. Children under 18 must be accompanied by a parent or guardian at all times. We offer youth-friendly instruction and have programs designed specifically for younger shooters to learn safely.",
  },
  {
    question: "What if I don't have my own shotgun?",
    answer: "No problem—rentals are available on-site. Just let us know when you schedule your visit so we can have equipment ready for you. We also have ammunition and other supplies available for purchase.",
  },
];

export default function FirstTime() {
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

      <main id="main" className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-32">
          <div className="absolute inset-0 bg-[#162838]">
            <div className="absolute inset-0 bg-[#162838]/70"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              First Time Visitors
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              Everything you need to know for your first visit to Traditions Field Club
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
              <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Welcome</span>
              <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
            </div>
            <h2
              className="text-3xl md:text-4xl text-[#162838] mb-6"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Your First Visit, Step by Step
            </h2>
            <div className="flex justify-center mb-6">
              <span className="h-[1px] w-16 bg-[#a75235]"></span>
            </div>
            <p className="text-lg text-[#333333] leading-relaxed">
              We want your first experience at Traditions Field Club to be memorable for all the right reasons.
              Whether you&apos;re a seasoned shooter or picking up a shotgun for the first time, our team is here
              to guide you every step of the way. Here&apos;s what to expect when you visit us.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section
          id="steps"
          ref={(el) => { sectionRefs.current["steps"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] overflow-hidden"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-0">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative transition-all duration-700 ease-out ${
                    isVisible("steps")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 md:left-10 top-20 bottom-0 w-[2px] bg-[#a75235]/20"></div>
                  )}

                  <div className="flex gap-6 md:gap-10 pb-12 md:pb-16">
                    {/* Number Circle */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-20 md:h-20 bg-[#a75235] rounded-full flex items-center justify-center shadow-lg">
                        <span
                          className="text-[#f5f2ec] text-lg md:text-2xl font-bold"
                          style={{ fontFamily: "var(--font-heading), serif" }}
                        >
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow pt-1 md:pt-3">
                      <h3
                        className="text-xl md:text-2xl lg:text-3xl text-[#162838] mb-3"
                        style={{ fontFamily: "var(--font-heading), serif" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-[#333333] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Bring Section */}
        <section
          id="bring"
          ref={(el) => { sectionRefs.current["bring"] = el; }}
          className="py-16 md:py-24 bg-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div
                className={`transition-all duration-1000 ease-out ${
                  isVisible("bring")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="relative h-[300px] sm:h-[350px] md:h-[400px]">
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <Image
                      src="/images/clay_target_thrower.webp"
                      alt="Clay target thrower loaded with orange clays"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "center calc(50% + 20px)" }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {/* Decorative accent */}
                  <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 bg-[#a75235]/10 rounded-lg -z-10"></div>
                  <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 bg-[#3d5a45]/10 rounded-lg -z-10"></div>
                </div>
                <p
                  className="text-center text-2xl md:text-3xl text-[#162838] mt-8"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  We Bring the Rest
                </p>
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isVisible("bring")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Be Prepared</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  What to Bring
                </h2>
                <p className="text-[#333333] mb-6 leading-relaxed">
                  To ensure you have the best experience possible, here are a few things to keep in mind
                  before your visit:
                </p>
                <ul className="space-y-4 text-[#333333]">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span><strong>Valid ID</strong> — Required for all visitors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span><strong>Closed-toe shoes</strong> — Required on the range</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span><strong>Weather-appropriate clothing</strong> — We shoot rain or shine</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span><strong>Eye and ear protection</strong> — Available on-site if needed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span><strong>Your own firearm</strong> — Optional; rentals available</span>
                  </li>
                </ul>

                {/* Available On-Site Callout */}
                <div className="mt-8 bg-[#f5f2ec] border border-[#3d5a45]/20 rounded-lg p-5">
                  <h3
                    className="text-lg text-[#162838] mb-3 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    <svg className="w-5 h-5 text-[#3d5a45]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Available On-Site
                  </h3>
                  <ul className="space-y-2 text-[#333333] text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#a75235] mt-0.5">&#8226;</span>
                      <span><strong>Eye &amp; ear protection</strong> provided at no charge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#a75235] mt-0.5">&#8226;</span>
                      <span><strong>Firearm rentals</strong> available for guests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#a75235] mt-0.5">&#8226;</span>
                      <span><strong>Ammunition</strong> available for purchase</span>
                    </li>
                  </ul>
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
                <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Common Questions</span>
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              </div>
              <h2
                className="text-3xl md:text-4xl text-[#162838]"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                First Time FAQs
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
              Ready to Visit?
            </h2>
            <div className="flex justify-center mb-6">
              <span className="h-[1px] w-16 bg-[#a75235]"></span>
            </div>
            <p className="text-[#f5f2ec] opacity-90 max-w-2xl mx-auto mb-8">
              We can&apos;t wait to welcome you to Traditions Field Club. Reach out to schedule your first
              visit or sign our waiver ahead of time to speed up check-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/waiver"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Sign Our Waiver
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
