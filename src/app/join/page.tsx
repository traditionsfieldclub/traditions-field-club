"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Script from "next/script";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export default function Join() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    // Membership Selection
    membershipType: "",
    // Family Members (for Family membership)
    spouseName: "",
    childrenInfo: "",
    // Shooting Experience
    experienceLevel: "",
    previousClubs: "",
    howHeard: "",
    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelationship: "",
    // Additional Info
    additionalInfo: "",
    // Agreements
    agreeRules: false,
    agreeWaiver: false,
    agreeApproval: false,
    // Honeypot
    companyFax: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPostSubmit, setShowPostSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const formLoadedAt = useRef(Date.now());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  const handleTurnstileCallback = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  // Expose callback globally for Turnstile
  useEffect(() => {
    (window as unknown as Record<string, unknown>).onTurnstileCallback = handleTurnstileCallback;
    return () => {
      delete (window as unknown as Record<string, unknown>).onTurnstileCallback;
    };
  }, [handleTurnstileCallback]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const allAgreed = formData.agreeRules && formData.agreeWaiver && formData.agreeApproval;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Honeypot is checked server-side only

    if (!allAgreed) {
      setErrorMessage("Please agree to all terms before submitting.");
      return;
    }

    const isDev = window.location.hostname === "localhost";
    if (!isDev && !turnstileToken) {
      setErrorMessage("Please complete the verification check below.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cfTurnstileToken: turnstileToken,
          formLoadedAt: formLoadedAt.current,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
    } catch {
      setErrorMessage("Unable to submit your application. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && !showPostSubmit) {
    return (
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow flex items-center justify-center bg-[#f5f2ec] py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-8 md:p-12">
              <div className="w-16 h-16 bg-[#3d5a45] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2
                className="text-2xl md:text-3xl text-[#162838] mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Application Submitted!
              </h2>
              <p className="text-[#333333] mb-6">
                Thank you for your interest in joining Traditions Field Club.
              </p>
              <p
                className="text-lg md:text-xl text-[#162838] mb-6 font-semibold"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Have you signed our liability waiver?
              </p>
              <p className="text-sm text-[#666666] mb-8">
                All participants are required to sign a waiver before visiting the club.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/waiver"
                  className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  No — Sign Waiver Now
                </a>
                <button
                  onClick={() => setShowPostSubmit(true)}
                  className="inline-block bg-transparent border-2 border-[#162838] text-[#162838] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] hover:text-[#f5f2ec] transition-colors rounded-lg cursor-pointer"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Yes — Already Signed
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isSubmitted && showPostSubmit) {
    return (
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow flex items-center justify-center bg-[#f5f2ec] py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-8 md:p-12">
              <div className="w-16 h-16 bg-[#3d5a45] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2
                className="text-2xl md:text-3xl text-[#162838] mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                You&apos;re All Set!
              </h2>
              <p className="text-[#333333] mb-8">
                We&apos;ve received your membership application and will review it shortly.
                A member of our team will contact you within 2-3 business days to discuss next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/first-time"
                  className="inline-block bg-[#a75235] text-[#f5f2ec] px-6 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  First Time Info
                </a>
                <a
                  href="/activities"
                  className="inline-block bg-transparent border-2 border-[#162838] text-[#162838] px-6 py-3 font-semibold tracking-wide hover:bg-[#162838] hover:text-[#f5f2ec] transition-colors rounded-lg"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  View Activities
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
      />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative py-20 md:py-28 lg:py-32">
          <div
            className="absolute inset-0 bg-[#3d5a45] bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/group_sporting_clays.webp')",
            }}
          >
            <div className="absolute inset-0 bg-[#3d5a45]/70"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Membership Application
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              Begin your journey with Traditions Field Club
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section
          id="application"
          ref={(el) => { sectionRefs.current["application"] = el; }}
          className="py-12 md:py-16 bg-[#f5f2ec]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit}>
              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input
                  type="text"
                  name="companyFax"
                  value={formData.companyFax}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="nope"
                />
              </div>

              {/* Intro */}
              <div
                className={`text-center mb-10 transition-all duration-700 ${
                  isVisible("application") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <p className="text-[#333333] max-w-2xl mx-auto">
                  Complete the application below to apply for membership. All applications are reviewed
                  by our team, and we&apos;ll be in touch to discuss membership options and schedule your
                  first visit.
                </p>
              </div>

              {/* Personal Information */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-6 transition-all duration-700 delay-100 ${
                  isVisible("application") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h3
                  className="text-lg md:text-xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      First Name <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Last Name <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Email <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Phone <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Date of Birth <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Street Address <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      City <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="Charleston"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      State <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="SC"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      ZIP Code <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="29401"
                    />
                  </div>
                </div>
              </div>

              {/* Membership Selection */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-6 transition-all duration-700 delay-200 ${
                  isVisible("application") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h3
                  className="text-lg md:text-xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Membership Selection
                </h3>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Which membership are you interested in? <span className="text-[#a75235]">*</span>
                  </label>
                  <select
                    name="membershipType"
                    required
                    value={formData.membershipType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent bg-white"
                  >
                    <option value="">Select a membership type...</option>
                    <option value="basic">Basic Membership (Individual)</option>
                    <option value="family">Family Membership (Household)</option>
                    <option value="corporate">Corporate Membership (Business)</option>
                    <option value="exclusive">Exclusive Membership (Premium)</option>
                    <option value="undecided">Not sure yet - would like to discuss options</option>
                  </select>
                  <p className="text-sm text-[#666666] mt-2">
                    <a href="/membership" className="text-[#a75235] hover:underline">
                      View membership details and benefits →
                    </a>
                  </p>
                </div>

                {/* Family Members - Show only if Family membership selected */}
                {formData.membershipType === "family" && (
                  <div className="mt-6 pt-6 border-t border-[#e8e4dc]">
                    <h4 className="text-md font-semibold text-[#162838] mb-4">Family Members</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#333333] mb-2">
                          Spouse/Partner Name
                        </label>
                        <input
                          type="text"
                          name="spouseName"
                          value={formData.spouseName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#333333] mb-2">
                          Children (names and ages)
                        </label>
                        <textarea
                          name="childrenInfo"
                          value={formData.childrenInfo}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent resize-none"
                          placeholder="e.g., John Jr. (14), Sarah (11)"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Shooting Experience */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-6 transition-all duration-700 delay-300 ${
                  isVisible("application") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h3
                  className="text-lg md:text-xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Shooting Experience
                </h3>

                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Experience Level <span className="text-[#a75235]">*</span>
                    </label>
                    <select
                      name="experienceLevel"
                      required
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent bg-white"
                    >
                      <option value="">Select your experience level...</option>
                      <option value="beginner">Beginner - New to shooting sports</option>
                      <option value="novice">Novice - Some experience, still learning</option>
                      <option value="intermediate">Intermediate - Comfortable and improving</option>
                      <option value="advanced">Advanced - Experienced shooter</option>
                      <option value="competitive">Competitive - Tournament/competition experience</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Previous Club Memberships
                    </label>
                    <input
                      type="text"
                      name="previousClubs"
                      value={formData.previousClubs}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="List any previous shooting clubs (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      How did you hear about us? <span className="text-[#a75235]">*</span>
                    </label>
                    <select
                      name="howHeard"
                      required
                      value={formData.howHeard}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent bg-white"
                    >
                      <option value="">Select an option...</option>
                      <option value="friend">Friend or Family Referral</option>
                      <option value="member">Current Member Referral</option>
                      <option value="social">Social Media</option>
                      <option value="search">Online Search</option>
                      <option value="event">Event or Show</option>
                      <option value="signage">Drove By / Saw Signage</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-6 transition-all duration-700 delay-400 ${
                  isVisible("application") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h3
                  className="text-lg md:text-xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Emergency Contact
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Contact Name <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="text"
                      name="emergencyName"
                      required
                      value={formData.emergencyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Contact Phone <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      required
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Relationship <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="text"
                      name="emergencyRelationship"
                      required
                      value={formData.emergencyRelationship}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="Spouse, Parent, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-6 transition-all duration-700 delay-500 ${
                  isVisible("application") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h3
                  className="text-lg md:text-xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Additional Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Is there anything else you&apos;d like us to know?
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent resize-none"
                    placeholder="Questions, special requests, or anything else you'd like to share..."
                  />
                </div>
              </div>

              {/* Agreements */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-6 transition-all duration-700 delay-600 ${
                  isVisible("application") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h3
                  className="text-lg md:text-xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Agreements <span className="text-[#a75235]">*</span>
                </h3>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeRules"
                      checked={formData.agreeRules}
                      onChange={handleChange}
                      className="w-5 h-5 shrink-0 mt-0.5 text-[#3d5a45] border-[#e8e4dc] rounded focus:ring-[#3d5a45]"
                    />
                    <span className="text-[#333333]">
                      I agree to abide by all <a href="/terms" className="text-[#a75235] hover:underline">club rules and policies</a>, including all safety regulations.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeWaiver"
                      checked={formData.agreeWaiver}
                      onChange={handleChange}
                      className="w-5 h-5 shrink-0 mt-0.5 text-[#3d5a45] border-[#e8e4dc] rounded focus:ring-[#3d5a45]"
                    />
                    <span className="text-[#333333]">
                      I understand that I will be required to sign a <a href="/waiver" className="text-[#a75235] hover:underline">liability waiver</a> before participating in any activities.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeApproval"
                      checked={formData.agreeApproval}
                      onChange={handleChange}
                      className="w-5 h-5 shrink-0 mt-0.5 text-[#3d5a45] border-[#e8e4dc] rounded focus:ring-[#3d5a45]"
                    />
                    <span className="text-[#333333]">
                      I understand that membership is subject to approval and that submitting this application does not guarantee acceptance.
                    </span>
                  </label>
                </div>
              </div>

              {/* Turnstile + Error + Submit */}
              <div
                className={`text-center transition-all duration-700 delay-700 ${
                  isVisible("application") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {/* Turnstile Widget */}
                <div className="flex justify-center mb-6">
                  <div
                    className="cf-turnstile"
                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    data-callback="onTurnstileCallback"
                    data-theme="light"
                  />
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !allAgreed}
                  className="bg-[#a75235] text-[#f5f2ec] px-12 py-4 font-semibold tracking-wide hover:bg-[#162838] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-lg"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
                {!allAgreed && (
                  <p className="text-sm text-[#a75235] mt-4">
                    Please agree to all terms above to submit your application.
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
