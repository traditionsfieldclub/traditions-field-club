"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Script from "next/script";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
    // Honeypot field for bot detection
    companyFax: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [submitTime, setSubmitTime] = useState<number | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Turnstile callback — called when challenge is solved
  const handleTurnstileCallback = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  // Expose callback globally for Turnstile widget
  useEffect(() => {
    window.onTurnstileCallback = handleTurnstileCallback;
    return () => {
      window.onTurnstileCallback = undefined;
    };
  }, [handleTurnstileCallback]);

  // Scroll animation observer
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

  // Track when form is first interacted with (for timing-based bot detection)
  const handleFocus = () => {
    if (!submitTime) {
      setSubmitTime(Date.now());
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Security check 1: Honeypot field should be empty — fake success
    if (formData.companyFax) {
      setShowSuccess(true);
      return;
    }

    // Security check 2: Form should take at least 3 seconds to fill out — fake success
    if (submitTime && Date.now() - submitTime < 3000) {
      setShowSuccess(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          topic: formData.topic,
          message: formData.message,
          companyFax: formData.companyFax,
          cfTurnstileToken: turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setShowSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        topic: "",
        message: "",
        companyFax: "",
      });
      setSubmitTime(null);
      setTurnstileToken(null);
      // Reset Turnstile widget for next submission
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.reset(turnstileRef.current);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative py-20 md:py-28 lg:py-32">
          <div className="absolute inset-0 bg-[#3d5a45] bg-cover bg-center">
            <div className="absolute inset-0 bg-[#3d5a45]/70"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              Get in touch with questions, partnership inquiries, or to learn more
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          id="contact"
          ref={(el) => { sectionRefs.current["contact"] = el; }}
          className="py-16 md:py-24 bg-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Decorative Header */}
            <div
              className={`text-center mb-12 transition-all duration-1000 ease-out ${
                isVisible("contact")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
                <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Get Started</span>
                <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              </div>
              <h2
                className="text-3xl md:text-4xl text-[#162838]"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                How Can We Help You?
              </h2>
              <div className="flex justify-center mt-4">
                <span className="h-[1px] w-16 bg-[#a75235]"></span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Column - Contact Info */}
              <div
                className={`transition-all duration-1000 ease-out delay-100 ${
                  isVisible("contact")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                {/* Address */}
                <div className="mb-6">
                  <h3
                    className="text-lg text-[#162838] font-semibold mb-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Address
                  </h3>
                  <p className="text-[#333333]">
                    TBD
                  </p>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <h3
                    className="text-lg text-[#162838] font-semibold mb-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Phone
                  </h3>
                  <p className="text-[#333333]">
                    Coming Soon
                  </p>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <h3
                    className="text-lg text-[#162838] font-semibold mb-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Email
                  </h3>
                  <a
                    href="mailto:info@traditionsfieldclub.com"
                    className="text-[#333333] hover:text-[#a75235] transition-colors"
                  >
                    info@traditionsfieldclub.com
                  </a>
                </div>

                {/* Hours */}
                <div className="mb-6">
                  <h3
                    className="text-lg text-[#162838] font-semibold mb-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Contact Hours
                  </h3>
                  <p className="text-[#333333]">
                    Monday - Friday: 8am - 5pm
                  </p>
                  <p className="text-sm text-[#666666] mt-1">
                    After hours contact based on availability
                  </p>
                </div>

                {/* Member Access */}
                <div className="p-4 bg-[#f5f2ec] rounded-lg">
                  <h3
                    className="text-lg text-[#162838] font-semibold mb-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Member Access
                  </h3>
                  <p className="text-[#333333]">
                    7 Days a Week<br />
                    Sun Up to Sun Down
                  </p>
                </div>
              </div>

              {/* Right Column - Form */}
              <div
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isVisible("contact")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from users, bots will fill it */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="companyFax">Fax</label>
                    <input
                      type="text"
                      id="companyFax"
                      name="companyFax"
                      value={formData.companyFax}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="nope"
                    />
                  </div>

                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-[#333333] mb-2"
                      >
                        First Name <span className="text-[#a75235]">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-[#333333] mb-2"
                      >
                        Last Name <span className="text-[#a75235]">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent transition-colors"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#333333] mb-2"
                    >
                      Email <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[#333333] mb-2"
                    >
                      Phone <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {/* Topic Dropdown */}
                  <div>
                    <label
                      htmlFor="topic"
                      className="block text-sm font-medium text-[#333333] mb-2"
                    >
                      How can we help? <span className="text-[#a75235]">*</span>
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      required
                      value={formData.topic}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent transition-colors bg-white"
                    >
                      <option value="">Select a topic...</option>
                      <option value="membership">Membership Inquiry</option>
                      <option value="lessons">Lessons</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="partnerships">Partnerships</option>
                      <option value="general">General Inquiry</option>
                      <option value="scheduling">Scheduling / Group Events</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message (Optional) */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#333333] mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Cloudflare Turnstile */}
                  <div
                    ref={turnstileRef}
                    className="cf-turnstile"
                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    data-callback="onTurnstileCallback"
                    data-theme="light"
                  ></div>
                  <Script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                    strategy="lazyOnload"
                  />

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#a75235] text-[#f5f2ec] px-8 py-4 font-semibold tracking-wide hover:bg-[#162838] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                      style={{ fontFamily: "var(--font-heading), serif" }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Width Image Break */}
        <section
          id="imagebreak"
          ref={(el) => { sectionRefs.current["imagebreak"] = el; }}
          className="relative h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#162838] bg-cover bg-center">
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-[#162838]/50"></div>
          </div>

          {/* Animated Text Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-5xl">
              {/* Top Decorative Line */}
              <div
                className={`flex items-center justify-center gap-4 mb-6 transition-all duration-1000 ease-out ${
                  isVisible("imagebreak")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <span className="h-[1px] w-12 md:w-20 bg-[#f5f2ec]/40"></span>
                <span className="text-[#f5f2ec]/60 text-xs sm:text-sm tracking-[0.3em] uppercase">
                  Corporate &amp; Group Events
                </span>
                <span className="h-[1px] w-12 md:w-20 bg-[#f5f2ec]/40"></span>
              </div>

              {/* Main Heading - Single Line */}
              <h2
                className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl text-[#f5f2ec] mb-6 tracking-wide transition-all duration-1000 ease-out delay-200 ${
                  isVisible("imagebreak")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Host Your Team at Traditions Field Club
              </h2>

              {/* Elegant Tagline */}
              <p
                className={`text-[#f5f2ec]/70 text-sm sm:text-base md:text-lg tracking-wide mb-8 transition-all duration-1000 ease-out delay-400 ${
                  isVisible("imagebreak")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                — A safe, professional environment for training &amp; team building —
              </p>

              {/* Bottom Decorative Line */}
              <div
                className={`flex justify-center transition-all duration-1000 ease-out delay-500 ${
                  isVisible("imagebreak")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <span className="h-[1px] w-24 md:w-32 bg-[#a75235]"></span>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section
          id="location"
          ref={(el) => { sectionRefs.current["location"] = el; }}
          className="py-16 md:py-24 bg-[#f5f2ec] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Location Info */}
              <div
                className={`transition-all duration-1000 ease-out ${
                  isVisible("location")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
                  <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Visit Us</span>
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Centrally Located
                </h2>
                <p className="text-base sm:text-lg text-[#333333] mb-6 leading-relaxed">
                  Traditions Field Club is located strategically in the quiet rural areas of South Carolina.
                  Address TBD.
                </p>

                <div className="mb-8">
                  <h3
                    className="text-xl text-[#162838] mb-4 font-semibold"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Travel Times
                  </h3>
                  <ul className="space-y-2 text-[#333333]">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mr-3 flex-shrink-0"></span>
                      1.5 hours from Charleston
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mr-3 flex-shrink-0"></span>
                      1 hour from Bluffton/Hilton Head
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mr-3 flex-shrink-0"></span>
                      1 hour 15 minutes from Savannah
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mr-3 flex-shrink-0"></span>
                      1 hour from Beaufort
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#a75235] rounded-full mr-3 flex-shrink-0"></span>
                      1 hour 45 minutes from Columbia
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/activities"
                    className="inline-block bg-[#3d5a45] text-[#f5f2ec] px-6 py-3 text-center font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    View Activities
                  </a>
                  <a
                    href="/membership"
                    className="inline-block bg-[#a75235] text-[#f5f2ec] px-6 py-3 text-center font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Become a Member
                  </a>
                </div>
              </div>

              {/* Right Column - Google Map */}
              <div
                className={`h-[300px] sm:h-[350px] lg:h-full min-h-[300px] lg:min-h-[400px] transition-all duration-1000 ease-out delay-200 ${
                  isVisible("location")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-80.85435667019426!3d32.89696941753158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDUzJzQ5LjEiTiA4MMKwNTEnMTUuNyJX!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-sm"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA Section */}
        <NewsletterForm
          heading="Newsletter Sign Up"
          description="Sign up for our mailing list to keep up to date with current events, promotions, and opportunities."
        />
      </main>

      <Footer />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-[#3d5a45] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3
              className="text-2xl text-[#162838] mb-3"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Thank You!
            </h3>
            <p className="text-[#333333] mb-6">
              Your message has been submitted. We will be in touch soon.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-[#a75235] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3
              className="text-2xl text-[#162838] mb-3"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Something Went Wrong
            </h3>
            <p className="text-[#333333] mb-6">
              Please try again or email us directly at{" "}
              <a href="mailto:info@traditionsfieldclub.com" className="text-[#a75235] hover:underline">
                info@traditionsfieldclub.com
              </a>
            </p>
            <button
              onClick={() => setShowError(false)}
              className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
