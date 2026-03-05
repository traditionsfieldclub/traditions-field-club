"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import type ReactSignatureCanvas from "react-signature-canvas";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

// Dynamic import — react-signature-canvas uses canvas APIs not available during SSR
const SignatureCanvas = dynamic(() => import("react-signature-canvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] border-2 border-dashed border-[#e8e4dc] rounded-lg bg-[#fafaf8] flex items-center justify-center text-[#999]">
      Loading signature pad...
    </div>
  ),
}) as React.ComponentType<ReactSignatureCanvas["props"] & { ref?: React.Ref<ReactSignatureCanvas> }>;

export default function Waiver() {
  const [formData, setFormData] = useState({
    participantName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    dateOfBirth: "",
    // Minor fields
    isMinor: false,
    parentName: "",
    parentRelationship: "",
    // Acknowledgments
    acknowledgeSafety: false,
    acknowledgeRisk: false,
    acknowledgeRelease: false,
    acknowledgeRules: false,
    agreeToTerms: false,
    // Signature date
    signedDate: new Date().toISOString().split("T")[0],
    // Honeypot
    companyFax: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const signatureRef = useRef<SignaturePadType | null>(null);
  const [signatureEmpty, setSignatureEmpty] = useState(true);
  const formLoadedAt = useRef<number>(Date.now());

  // Turnstile
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  // Explicitly render Turnstile widget — handles both fresh loads and client-side navigation
  useEffect(() => {
    const renderWidget = () => {
      if (window.turnstile && turnstileRef.current && turnstileWidgetId.current === null) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
          callback: (token: string) => setTurnstileToken(token),
          theme: "light",
        });
      }
    };

    // If turnstile API is already loaded (client-side nav), render immediately
    if (window.turnstile) {
      renderWidget();
    } else {
      // Otherwise wait for the script to load
      const interval = setInterval(() => {
        if (window.turnstile) {
          renderWidget();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      // Cleanup widget on unmount
      if (window.turnstile && turnstileWidgetId.current !== null) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

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

  const allAcknowledged =
    formData.acknowledgeSafety &&
    formData.acknowledgeRisk &&
    formData.acknowledgeRelease &&
    formData.acknowledgeRules &&
    formData.agreeToTerms;

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setSignatureEmpty(true);
    }
  };

  const handleSignatureEnd = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      setSignatureEmpty(false);
    }
  };

  const downloadPDF = (base64: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waiver-${formData.participantName.trim().replace(/\s+/g, "-").toLowerCase()}-${formData.signedDate}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Honeypot check
    if (formData.companyFax) {
      return;
    }

    if (!allAcknowledged) {
      setErrorMessage("Please acknowledge all sections of the waiver before signing.");
      return;
    }

    if (signatureEmpty || !signatureRef.current || signatureRef.current.isEmpty()) {
      setErrorMessage("Please draw your signature in the signature pad.");
      return;
    }

    setIsSubmitting(true);

    try {
      const signatureDataUrl = signatureRef.current.getTrimmedCanvas().toDataURL("image/png");

      const response = await fetch("/api/waiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          signatureDataUrl,
          cfTurnstileToken: turnstileToken,
          formLoadedAt: formLoadedAt.current,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      if (result.pdf) {
        setPdfBase64(result.pdf);
      }

      setIsSubmitted(true);
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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
                Waiver Submitted Successfully
              </h2>
              <p className="text-[#333333] mb-6">
                Thank you for completing the waiver. A copy has been sent to the club.
                Please bring a valid ID when you visit.
              </p>

              {pdfBase64 && (
                <button
                  onClick={() => downloadPDF(pdfBase64)}
                  className="inline-flex items-center gap-2 bg-[#3d5a45] text-[#f5f2ec] px-6 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Waiver PDF
                </button>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <a
                  href="/first-time"
                  className="inline-block bg-[#a75235] text-[#f5f2ec] px-6 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  First Time Info
                </a>
                <a
                  href="/contact"
                  className="inline-block bg-transparent border-2 border-[#162838] text-[#162838] px-6 py-3 font-semibold tracking-wide hover:bg-[#162838] hover:text-[#f5f2ec] transition-colors rounded-lg"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Contact Us
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

      <main id="main" className="flex-grow">
        {/* Hero */}
        <section className="bg-[#162838] py-20 md:py-28 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#f5f2ec] tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Liability Waiver
            </h1>
            <p className="text-lg text-[#f5f2ec] max-w-2xl mx-auto opacity-90 mt-4">
              Please read and complete the waiver before your visit
            </p>
          </div>
        </section>

        {/* Waiver Content */}
        <section
          id="waiver"
          ref={(el) => { sectionRefs.current["waiver"] = el; }}
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
                  autoComplete="off"
                />
              </div>

              {/* Waiver Document */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-8 transition-all duration-700 ${
                  isVisible("waiver") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h2
                  className="text-xl md:text-2xl text-[#162838] mb-6 text-center"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  TRADITIONS FIELD CLUB<br />
                  RELEASE AND WAIVER OF LIABILITY, ASSUMPTION OF RISK, AND INDEMNITY AGREEMENT
                </h2>

                <div className="prose prose-sm max-w-none text-[#333333] space-y-4 text-sm leading-relaxed">
                  <p>
                    <strong>PLEASE READ CAREFULLY BEFORE SIGNING. THIS IS A LEGAL DOCUMENT THAT AFFECTS YOUR RIGHTS.</strong>
                  </p>

                  <p>
                    In consideration of being permitted to participate in shooting sports activities, use facilities, equipment, and services at Traditions Field Club, located on Lowcountry Hwy, Ruffin, SC 29475 (&quot;the Club&quot;), I, for myself and on behalf of my heirs, personal representatives, and assigns, agree as follows:
                  </p>

                  <h3 className="text-lg font-semibold text-[#162838] mt-6">1. ACKNOWLEDGMENT OF RISKS</h3>
                  <p>
                    I understand and acknowledge that participation in shooting sports activities, including but not limited to sporting clays, 5-stand, trap, skeet, and archery, involves inherent risks that cannot be eliminated regardless of the care taken to avoid injuries. These risks include, but are not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Accidental discharge of firearms</li>
                    <li>Ricochet or fragmentation of ammunition, shot, or clay targets</li>
                    <li>Equipment malfunction or failure</li>
                    <li>Hearing damage from firearm discharge</li>
                    <li>Eye injury from debris or discharge</li>
                    <li>Falls, trips, or slips on varied terrain</li>
                    <li>Exposure to weather conditions including heat, cold, and lightning</li>
                    <li>Actions of other participants or third parties</li>
                    <li>Negligence of other participants, the Club, its employees, or agents</li>
                    <li>Serious bodily injury or death</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-[#162838] mt-6">2. ASSUMPTION OF RISK</h3>
                  <p>
                    I voluntarily assume full responsibility for any and all risks of injury, illness, death, or property damage arising from my participation in activities at the Club, whether or not caused by the negligence of the Club, its owners, officers, directors, employees, agents, volunteers, or other participants. I acknowledge that I am participating voluntarily and have chosen to do so despite the risks.
                  </p>

                  <h3 className="text-lg font-semibold text-[#162838] mt-6">3. RELEASE AND WAIVER OF LIABILITY</h3>
                  <p>
                    I hereby release, waive, discharge, and covenant not to sue Traditions Field Club, its owners, officers, directors, employees, agents, volunteers, sponsors, and affiliates (collectively &quot;Releasees&quot;) from any and all liability, claims, demands, actions, or causes of action whatsoever arising out of or related to any loss, damage, or injury, including death, that may be sustained by me or my property, while participating in activities at or traveling to or from the Club, whether caused by the negligence of the Releasees or otherwise.
                  </p>

                  <h3 className="text-lg font-semibold text-[#162838] mt-6">4. INDEMNIFICATION</h3>
                  <p>
                    I agree to indemnify, defend, and hold harmless the Releasees from any and all claims, actions, suits, procedures, costs, expenses, damages, and liabilities, including attorney&apos;s fees, brought as a result of my involvement in activities at the Club and to reimburse them for any such expenses incurred.
                  </p>

                  <h3 className="text-lg font-semibold text-[#162838] mt-6">5. SAFETY RULES AND CONDUCT</h3>
                  <p>
                    I agree to abide by all safety rules and regulations of the Club, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Treating all firearms as if they are loaded at all times</li>
                    <li>Never pointing a firearm at anything I do not intend to shoot</li>
                    <li>Keeping my finger off the trigger until ready to shoot</li>
                    <li>Being sure of my target and what is beyond it</li>
                    <li>Wearing eye and ear protection at all times on the range</li>
                    <li>Keeping firearms unloaded and actions open when not in use</li>
                    <li>Not possessing or consuming alcohol or drugs anywhere on club property</li>
                    <li>Following all instructions from Club staff and range officers</li>
                  </ul>
                  <p>
                    I understand that violation of any safety rule may result in immediate removal from the premises and termination of any membership privileges without refund.
                  </p>

                  <h3 className="text-lg font-semibold text-[#162838] mt-6">6. MEDICAL TREATMENT AUTHORIZATION</h3>
                  <p>
                    I authorize the Club and its staff to obtain emergency medical treatment for me if I am unable to provide consent at the time of emergency. I understand that I am responsible for any costs associated with such medical treatment.
                  </p>

                  <h3 className="text-lg font-semibold text-[#162838] mt-6">7. PHOTO AND VIDEO RELEASE</h3>
                  <p>
                    I grant the Club permission to use photographs, video recordings, and other media of my participation in activities for promotional, educational, and marketing purposes without compensation.
                  </p>

                  <h3 className="text-lg font-semibold text-[#162838] mt-6">8. GOVERNING LAW AND DISPUTE RESOLUTION</h3>
                  <p>
                    This Agreement shall be governed by the laws of the State of South Carolina. Any dispute arising from this Agreement shall be resolved exclusively in the courts of Colleton County, South Carolina. If any portion of this Agreement is found to be unenforceable, the remaining portions shall remain in full force and effect.
                  </p>

                  <h3 className="text-lg font-semibold text-[#162838] mt-6">9. ACKNOWLEDGMENT OF UNDERSTANDING</h3>
                  <p>
                    I have read this Release and Waiver of Liability, Assumption of Risk, and Indemnity Agreement, fully understand its terms, understand that I have given up substantial rights by signing it, and sign it freely and voluntarily without any inducement.
                  </p>
                </div>
              </div>

              {/* Participant Information */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-8 transition-all duration-700 delay-100 ${
                  isVisible("waiver") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h3
                  className="text-lg md:text-xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Participant Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Full Legal Name <span className="text-[#a75235]">*</span>
                    </label>
                    <input
                      type="text"
                      name="participantName"
                      required
                      value={formData.participantName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                      placeholder="Enter your full legal name"
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
                      placeholder="email@example.com"
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
                      placeholder="City"
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
                      placeholder="29475"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="mt-8 pt-6 border-t border-[#e8e4dc]">
                  <h4 className="text-md font-semibold text-[#162838] mb-4">Emergency Contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-2">
                        Emergency Contact Name <span className="text-[#a75235]">*</span>
                      </label>
                      <input
                        type="text"
                        name="emergencyContactName"
                        required
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                        placeholder="Contact name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-2">
                        Emergency Contact Phone <span className="text-[#a75235]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="emergencyContactPhone"
                        required
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Minor Section */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-8 transition-all duration-700 delay-200 ${
                  isVisible("waiver") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h3
                  className="text-lg md:text-xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Minor Participant (Under 18)
                </h3>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isMinor"
                    checked={formData.isMinor}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 shrink-0 text-[#3d5a45] border-[#e8e4dc] rounded focus:ring-[#3d5a45]"
                  />
                  <span className="text-[#333333]">This waiver is for a minor participant</span>
                </label>

                {formData.isMinor && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-2">
                        Parent/Guardian Name <span className="text-[#a75235]">*</span>
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        required={formData.isMinor}
                        value={formData.parentName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                        placeholder="Parent/Guardian full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-2">
                        Relationship to Minor <span className="text-[#a75235]">*</span>
                      </label>
                      <input
                        type="text"
                        name="parentRelationship"
                        required={formData.isMinor}
                        value={formData.parentRelationship}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                        placeholder="Parent, Guardian, etc."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-[#666666] bg-[#f5f2ec] p-4 rounded-lg">
                        By signing below, I certify that I am the parent or legal guardian of the minor named above
                        and have the legal authority to execute this waiver on their behalf. I agree to all terms
                        of this waiver on behalf of the minor and accept full responsibility for their participation.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Acknowledgments */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-8 transition-all duration-700 delay-300 ${
                  isVisible("waiver") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h3
                  className="text-lg md:text-xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Acknowledgments <span className="text-[#a75235]">*</span>
                </h3>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acknowledgeSafety"
                      checked={formData.acknowledgeSafety}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 shrink-0 text-[#3d5a45] border-[#e8e4dc] rounded focus:ring-[#3d5a45]"
                    />
                    <span className="text-[#333333]">
                      I have read and understand the <strong>safety rules</strong> outlined in this waiver and agree to follow them at all times.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acknowledgeRisk"
                      checked={formData.acknowledgeRisk}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 shrink-0 text-[#3d5a45] border-[#e8e4dc] rounded focus:ring-[#3d5a45]"
                    />
                    <span className="text-[#333333]">
                      I understand and <strong>voluntarily assume all risks</strong> associated with participating in shooting sports activities, including the risk of serious injury or death.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acknowledgeRelease"
                      checked={formData.acknowledgeRelease}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 shrink-0 text-[#3d5a45] border-[#e8e4dc] rounded focus:ring-[#3d5a45]"
                    />
                    <span className="text-[#333333]">
                      I <strong>release and waive</strong> all claims against Traditions Field Club, its owners, employees, and agents for any injury or damage arising from my participation.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acknowledgeRules"
                      checked={formData.acknowledgeRules}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 shrink-0 text-[#3d5a45] border-[#e8e4dc] rounded focus:ring-[#3d5a45]"
                    />
                    <span className="text-[#333333]">
                      I agree to abide by all <strong>club rules and policies</strong> and understand that violation may result in removal from the premises.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 shrink-0 text-[#3d5a45] border-[#e8e4dc] rounded focus:ring-[#3d5a45]"
                    />
                    <span className="text-[#333333]">
                      I have read this entire waiver, <strong>understand its contents</strong>, and agree to be bound by its terms.
                    </span>
                  </label>
                </div>
              </div>

              {/* Signature */}
              <div
                className={`bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 mb-8 transition-all duration-700 delay-400 ${
                  isVisible("waiver") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h3
                  className="text-lg md:text-xl text-[#162838] mb-6"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Electronic Signature
                </h3>

                <p className="text-sm text-[#666666] mb-6">
                  Please draw your signature in the box below using your mouse or finger (on mobile).
                  This constitutes your electronic signature and agreement to all terms of this waiver.
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Draw Your Signature <span className="text-[#a75235]">*</span>
                  </label>
                  <div className="border-2 border-[#e8e4dc] rounded-lg overflow-hidden bg-white relative">
                    <SignatureCanvas
                      ref={(ref: SignaturePadType | null) => { signatureRef.current = ref; }}
                      canvasProps={{
                        className: "w-full h-[200px] touch-none",
                        style: { width: "100%", height: "200px" },
                      }}
                      penColor="#162838"
                      backgroundColor="rgba(255,255,255,0)"
                      onEnd={handleSignatureEnd}
                    />
                    {signatureEmpty && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-[#ccc] text-sm">Sign here</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="mt-2 text-sm text-[#a75235] hover:text-[#162838] transition-colors font-medium"
                  >
                    Clear Signature
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Date <span className="text-[#a75235]">*</span>
                  </label>
                  <input
                    type="date"
                    name="signedDate"
                    required
                    suppressHydrationWarning
                    value={formData.signedDate}
                    onChange={handleChange}
                    className="w-full max-w-xs px-4 py-3 border border-[#e8e4dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5a45] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Cloudflare Turnstile */}
              <div
                className={`mb-8 flex justify-center transition-all duration-700 delay-500 ${
                  isVisible("waiver") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <div ref={turnstileRef}></div>
                <Script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                  strategy="afterInteractive"
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center" role="alert">
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <div
                className={`text-center transition-all duration-700 delay-500 ${
                  isVisible("waiver") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <button
                  type="submit"
                  disabled={isSubmitting || !allAcknowledged}
                  className="bg-[#a75235] text-[#f5f2ec] px-12 py-4 font-semibold tracking-wide hover:bg-[#162838] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-lg"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  {isSubmitting ? "Submitting..." : "Sign & Submit Waiver"}
                </button>
                {!allAcknowledged && (
                  <p className="text-sm text-[#a75235] mt-4">
                    Please check all acknowledgment boxes above to submit the waiver.
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

// Type for the signature canvas ref
type SignaturePadType = {
  clear: () => void;
  isEmpty: () => boolean;
  getTrimmedCanvas: () => HTMLCanvasElement;
  toDataURL: (type?: string) => string;
};
