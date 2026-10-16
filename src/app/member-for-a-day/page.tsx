"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Picture from "@/components/Picture";
import { trackEvent } from "@/lib/analytics";

const OPENING_DATE = "2026-10-20";

const inputClass =
  "w-full px-4 py-3 border border-[#e8e4dc] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#4d5c47] focus:border-transparent transition-colors";
const labelClass = "block text-sm font-semibold text-[#162838] mb-2";

const empty = {
  name: "",
  email: "",
  phone: "",
  preferredDate: "",
  alternateDate: "",
  partySize: "1",
  experience: "",
  heardFrom: "",
  notes: "",
  companyFax: "",
};

export default function MemberForADay() {
  const [form, setForm] = useState(empty);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const formLoadedAt = useRef(Date.now());
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);
  const minDate = today > OPENING_DATE ? today : OPENING_DATE;

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
    if (window.turnstile) {
      renderWidget();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          renderWidget();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
    return () => {
      if (window.turnstile && turnstileWidgetId.current !== null) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.companyFax) {
      setShowSuccess(true);
      return;
    }
    if (form.preferredDate < OPENING_DATE || (form.alternateDate && form.alternateDate < OPENING_DATE)) {
      setError("Dates must be on or after Tuesday, October 20.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/member-for-a-day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cfTurnstileToken: turnstileToken, formLoadedAt: formLoadedAt.current }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      trackEvent("mfad_booking_request", { party_size: form.partySize });
      setShowSuccess(true);
      setForm(empty);
      setTurnstileToken(null);
      if (window.turnstile && turnstileWidgetId.current !== null) window.turnstile.reset(turnstileWidgetId.current);
    } catch (err) {
      setError(
        (err instanceof Error && err.message !== "Something went wrong" ? err.message + ". " : "") +
          "Please try again, or call us at (843) 321-8152."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-grow bg-[#f5f2ec]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[#162838]">
            <Picture name="sunset-mfad" alt="" imgClassName="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#162838]/70"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Member for a Day
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              $100 per shooter, all in. Starting Tuesday, October 20.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            <div className="lg:col-span-2">
              <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Try it first</span>
              <h2
                className="text-3xl md:text-4xl text-[#162838] mt-2 mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Your day on the property
              </h2>
              <p className="text-2xl text-[#162838] font-semibold mb-4">$100 per shooter, all in</p>
              <p className="text-[#333333] leading-relaxed mb-6">
                Spend a day on the property the way our members do. Starting Tuesday, October 20.
              </p>
              <ul className="space-y-3 text-[#333333] mb-6">
                {[
                  "A guided outing with our team",
                  "50 targets at select signature stations",
                  "Shotgun and shells",
                  "Eye and ear protection",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#4d5c47] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#666666] italic mb-6">
                Join within 30 days and your $100 goes toward your Prime membership.
              </p>
              <p className="text-[#333333] mb-6">
                Prefer to talk it through? Call us at{" "}
                <a href="tel:+18433218152" className="text-[#a75235] font-semibold hover:underline">
                  (843) 321-8152
                </a>
                .
              </p>
              <div className="hidden lg:grid grid-cols-2 gap-3">
                <div className="relative h-[160px] rounded-lg overflow-hidden">
                  <Picture name="photo-shooter-stand" alt="A guest mounting a shotgun at a stand" imgClassName="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="relative h-[160px] rounded-lg overflow-hidden">
                  <Picture name="sunset-mfad" alt="Sunset over a shooting stand at Traditions Field Club" imgClassName="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div id="book" className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 scroll-mt-32">
              <h2
                className="text-2xl md:text-3xl text-[#162838] mb-2"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Book your day
              </h2>
              <p className="text-[#333333] mb-6">
                Tell us when you&apos;d like to come out. We&apos;ll confirm your date within one business day.
              </p>

              {showSuccess ? (
                <div className="p-6 bg-[#f5f2ec] rounded-lg text-center" role="status">
                  <h3 className="text-xl text-[#162838] mb-2" style={{ fontFamily: "var(--font-heading), serif" }}>
                    Request received
                  </h3>
                  <p className="text-[#333333]">
                    Thanks! We&apos;ll confirm your date within one business day. Questions in the meantime? Call (843) 321-8152.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input type="text" name="companyFax" value={form.companyFax} onChange={set} tabIndex={-1} autoComplete="new-password" />
                  </div>

                  <div>
                    <label htmlFor="name" className={labelClass}>Name *</label>
                    <input id="name" name="name" required maxLength={200} value={form.name} onChange={set} className={inputClass} autoComplete="name" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className={labelClass}>Email *</label>
                      <input id="email" name="email" type="email" required maxLength={254} value={form.email} onChange={set} className={inputClass} autoComplete="email" />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone *</label>
                      <input id="phone" name="phone" type="tel" required maxLength={30} value={form.phone} onChange={set} className={inputClass} autoComplete="tel" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="preferredDate" className={labelClass}>Preferred date *</label>
                      <input id="preferredDate" name="preferredDate" type="date" required min={minDate} value={form.preferredDate} onChange={set} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="alternateDate" className={labelClass}>Alternate date</label>
                      <input id="alternateDate" name="alternateDate" type="date" min={minDate} value={form.alternateDate} onChange={set} className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="partySize" className={labelClass}>Party size *</label>
                      <select id="partySize" name="partySize" required value={form.partySize} onChange={set} className={inputClass}>
                        {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
                          <option key={n} value={n}>{n === "10" ? "10 or more" : n}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="experience" className={labelClass}>Experience level *</label>
                      <select id="experience" name="experience" required value={form.experience} onChange={set} className={inputClass}>
                        <option value="">Select one</option>
                        <option value="never">Never shot</option>
                        <option value="some">Some experience</option>
                        <option value="regular">Shoot regularly</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="heardFrom" className={labelClass}>How did you hear about us?</label>
                    <input id="heardFrom" name="heardFrom" maxLength={200} value={form.heardFrom} onChange={set} className={inputClass} placeholder="Instagram, a friend, a member..." />
                  </div>
                  <div>
                    <label htmlFor="notes" className={labelClass}>Notes</label>
                    <textarea id="notes" name="notes" rows={4} maxLength={2000} value={form.notes} onChange={set} className={`${inputClass} resize-none`} placeholder="Anything we should know about your group or your day?" />
                  </div>

                  <div ref={turnstileRef}></div>
                  <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />

                  {error && <p className="text-sm text-[#a75235]" role="alert">{error}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#a75235] text-[#f5f2ec] px-8 py-4 font-semibold tracking-wide hover:bg-[#162838] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-lg"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    {isSubmitting ? "Sending..." : "Request my day"}
                  </button>
                  <p className="text-xs text-[#666666] text-center">
                    $100 per shooter, all in. We&apos;ll confirm your date and details within one business day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
