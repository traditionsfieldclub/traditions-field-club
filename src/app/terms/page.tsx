"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
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
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-32 bg-[#162838]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Terms of Service
            </h1>
            <p className="text-base md:text-lg text-[#f5f2ec] opacity-75">
              Last updated: January 2025
            </p>
          </div>
        </section>

        {/* Safety Section - Highlighted */}
        <section
          id="safety"
          ref={(el) => { sectionRefs.current["safety"] = el; }}
          className="py-16 md:py-20 bg-white overflow-hidden"
        >
          <div
            className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
              isVisible("safety")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
                <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Important</span>
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              </div>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl text-[#162838] mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Safety Rules & Requirements
              </h2>
              <div className="flex justify-center mb-6">
                <span className="h-[1px] w-16 bg-[#a75235]"></span>
              </div>
              <p className="text-[#333333] text-lg max-w-2xl mx-auto">
                Safety is our highest priority at Traditions Field Club. All members and guests must adhere
                to the following safety rules at all times while on club property.
              </p>
            </div>

            <div className="bg-[#f5f2ec] rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
              <ul className="space-y-4 text-[#333333]">
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#f5f2ec] text-sm font-bold">1</span>
                  </span>
                  <div>
                    <strong className="text-[#162838]">Always treat every firearm as if it is loaded.</strong>
                    <p className="text-sm mt-1 opacity-75">Never assume a firearm is unloaded. Handle all firearms with the same respect and caution.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#f5f2ec] text-sm font-bold">2</span>
                  </span>
                  <div>
                    <strong className="text-[#162838]">Never point a firearm at anything you do not intend to shoot.</strong>
                    <p className="text-sm mt-1 opacity-75">Always keep the muzzle pointed in a safe direction, downrange or toward the ground.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#f5f2ec] text-sm font-bold">3</span>
                  </span>
                  <div>
                    <strong className="text-[#162838]">Keep your finger off the trigger until ready to shoot.</strong>
                    <p className="text-sm mt-1 opacity-75">Rest your finger along the side of the firearm until you have made the decision to fire.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#f5f2ec] text-sm font-bold">4</span>
                  </span>
                  <div>
                    <strong className="text-[#162838]">Be sure of your target and what is beyond it.</strong>
                    <p className="text-sm mt-1 opacity-75">Know where your shot will go and what it may hit if it misses or passes through the target.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#f5f2ec] text-sm font-bold">5</span>
                  </span>
                  <div>
                    <strong className="text-[#162838]">Eye and ear protection are mandatory on all ranges.</strong>
                    <p className="text-sm mt-1 opacity-75">Proper protective equipment must be worn at all times when on or near active shooting areas.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#f5f2ec] text-sm font-bold">6</span>
                  </span>
                  <div>
                    <strong className="text-[#162838]">Firearms must be unloaded and actions open when not in use.</strong>
                    <p className="text-sm mt-1 opacity-75">Break open shotguns or clear chambers when moving between stations or when not actively shooting.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#f5f2ec] text-sm font-bold">7</span>
                  </span>
                  <div>
                    <strong className="text-[#162838]">Alcohol and drugs are strictly prohibited on club property.</strong>
                    <p className="text-sm mt-1 opacity-75">Impairment of any kind is not tolerated. No alcohol or controlled substances are permitted anywhere on the premises.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-[#3d5a45] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#f5f2ec] text-sm font-bold">8</span>
                  </span>
                  <div>
                    <strong className="text-[#162838]">Follow all instructions from club staff and range officers.</strong>
                    <p className="text-sm mt-1 opacity-75">Staff members have the authority to enforce safety rules and may ask anyone to leave who does not comply.</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 p-4 bg-[#f5f2ec] rounded-lg border-l-4 border-[#3d5a45]">
                <p className="text-[#162838] font-semibold">
                  Violation of any safety rule may result in immediate removal from the premises and termination
                  of membership without refund. Safety is non-negotiable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section
          id="content"
          ref={(el) => { sectionRefs.current["content"] = el; }}
          className="py-16 md:py-24 bg-white overflow-hidden"
        >
          <div
            className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
              isVisible("content")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="prose prose-lg max-w-none text-[#333333]">
              {/* Agreement */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Agreement to Terms
                </h2>
                <p className="leading-relaxed">
                  By accessing or using Traditions Field Club&apos;s facilities, website, or services, you agree to be
                  bound by these Terms of Service. If you do not agree to these terms, you may not access or use
                  our facilities or services.
                </p>
              </div>

              {/* Membership */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Membership Terms
                </h2>
                <p className="leading-relaxed mb-4">
                  Membership at Traditions Field Club is a privilege, not a right. We reserve the right to deny,
                  suspend, or revoke membership at our discretion for any reason, including but not limited to:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Violation of safety rules or club policies</li>
                  <li>Disrespectful behavior toward staff, members, or guests</li>
                  <li>Failure to pay dues or fees</li>
                  <li>Damage to club property</li>
                  <li>Any illegal activity on club premises</li>
                </ul>
              </div>

              {/* Assumption of Risk */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Assumption of Risk
                </h2>
                <p className="leading-relaxed">
                  Participation in shooting sports and other activities at Traditions Field Club involves inherent
                  risks, including the risk of serious injury or death. By using our facilities, you acknowledge
                  these risks and voluntarily assume full responsibility for any injuries or damages that may occur.
                  All members and guests are required to sign a liability waiver before participating in any activities.
                </p>
              </div>

              {/* Conduct */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Code of Conduct
                </h2>
                <p className="leading-relaxed mb-4">
                  All members and guests are expected to conduct themselves in a respectful and responsible manner
                  at all times. This includes:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Treating all staff, members, and guests with courtesy and respect</li>
                  <li>Maintaining cleanliness and picking up after yourself</li>
                  <li>Respecting club property and equipment</li>
                  <li>Following all posted rules and signage</li>
                  <li>Supervising children and guests at all times</li>
                </ul>
              </div>

              {/* Guest Policy */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Guest Policy
                </h2>
                <p className="leading-relaxed">
                  Members may bring guests in accordance with their membership tier privileges. Members are
                  responsible for their guests&apos; behavior and ensuring they understand and follow all club rules.
                  All guests must sign a liability waiver and receive a safety briefing before participating
                  in any activities.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Limitation of Liability
                </h2>
                <p className="leading-relaxed">
                  To the fullest extent permitted by law, Traditions Field Club, its owners, officers, employees,
                  and agents shall not be liable for any direct, indirect, incidental, special, consequential, or
                  punitive damages arising from your use of our facilities or services, including but not limited
                  to personal injury, property damage, or loss of enjoyment.
                </p>
              </div>

              {/* Modifications */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Modifications to Terms
                </h2>
                <p className="leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective
                  immediately upon posting to our website. Your continued use of our facilities or services
                  after any changes constitutes acceptance of the new terms.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-6 bg-[#f5f2ec] rounded-lg">
                  <p className="font-semibold text-[#162838]">Traditions Field Club</p>
                  <p>Email: info@traditionsfieldclub.com</p>
                  <p>Address: XXXXX Lowcountry Hwy, Ruffin, SC 29475</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-[#f5f2ec]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#333333] mb-6">
              Ready to join? Make sure to review our safety rules and sign our waiver before your visit.
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
                className="inline-block bg-transparent border-2 border-[#162838] text-[#162838] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] hover:text-[#f5f2ec] transition-colors rounded-lg"
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
