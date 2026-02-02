"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-base md:text-lg text-[#f5f2ec] opacity-75">
              Last updated: January 2025
            </p>
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
              {/* Introduction */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Introduction
                </h2>
                <p className="leading-relaxed">
                  Traditions Field Club (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed
                  to protecting your personal information. This Privacy Policy explains how we collect, use, disclose,
                  and safeguard your information when you visit our website or use our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Information We Collect
                </h2>
                <p className="leading-relaxed mb-4">
                  We may collect information about you in a variety of ways, including:
                </p>
                <h3 className="text-xl text-[#162838] font-semibold mb-2">Personal Data</h3>
                <p className="leading-relaxed mb-4">
                  When you register for membership, sign up for our newsletter, or contact us, we may collect
                  personally identifiable information such as your name, email address, phone number, and mailing address.
                </p>
                <h3 className="text-xl text-[#162838] font-semibold mb-2">Usage Data</h3>
                <p className="leading-relaxed">
                  We may automatically collect certain information when you visit our website, including your IP address,
                  browser type, operating system, access times, and the pages you have viewed.
                </p>
              </div>

              {/* How We Use Your Information */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-4">
                  We may use the information we collect for various purposes, including to:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Process membership applications and manage member accounts</li>
                  <li>Send you newsletters, updates, and promotional communications</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </div>

              {/* Sharing Your Information */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Sharing Your Information
                </h2>
                <p className="leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personally identifiable information to outside
                  parties except as described in this policy. We may share information with trusted third parties
                  who assist us in operating our website, conducting our business, or servicing you, so long as
                  those parties agree to keep this information confidential.
                </p>
              </div>

              {/* Data Security */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction. However, no
                  method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </div>

              {/* Your Rights */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Your Rights
                </h2>
                <p className="leading-relaxed">
                  You have the right to access, correct, or delete your personal information. You may also opt out
                  of receiving promotional communications from us at any time by following the unsubscribe instructions
                  in those messages or by contacting us directly.
                </p>
              </div>

              {/* Contact Us */}
              <div className="mb-12">
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-6 bg-[#f5f2ec] rounded-lg">
                  <p className="font-semibold text-[#162838]">Traditions Field Club</p>
                  <p>Email: info@traditionsfieldclub.com</p>
                  <p>Address: XXXXX Lowcountry Hwy, Ruffin, SC 29475</p>
                </div>
              </div>

              {/* Changes to This Policy */}
              <div>
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Changes to This Policy
                </h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                  the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
