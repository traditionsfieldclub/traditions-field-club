"use client";

import { useState, useRef } from "react";

interface NewsletterFormProps {
  heading?: string;
  subheading?: string;
  description?: string;
}

export default function NewsletterForm({
  heading = "Join Our Mailing List",
  subheading = "Stay Connected",
  description = "Be the first to know about events, membership openings, and club updates.",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formLoadedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) return;

    // Honeypot — silently fake success if filled
    if (honeypot) {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          formLoadedAt: formLoadedAt.current,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMessage("Unable to subscribe. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[#3d5a45]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="h-[1px] w-12 md:w-20 bg-[#f5f2ec]/30"></span>
          <span className="text-[#f5f2ec]/60 text-sm tracking-[0.3em] uppercase">
            {subheading}
          </span>
          <span className="h-[1px] w-12 md:w-20 bg-[#f5f2ec]/30"></span>
        </div>
        <h2
          className="text-3xl md:text-4xl text-[#f5f2ec] mb-4"
          style={{ fontFamily: "var(--font-heading), serif" }}
        >
          {heading}
        </h2>
        <div className="flex justify-center mb-6">
          <span className="h-[1px] w-16 bg-[#a75235]"></span>
        </div>
        <p className="text-base sm:text-lg text-[#f5f2ec]/80 mb-8 max-w-xl mx-auto">
          {description}
        </p>

        {status === "success" ? (
          <div className="bg-[#f5f2ec]/10 border border-[#f5f2ec]/20 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-[#f5f2ec] font-semibold">You&apos;re subscribed!</p>
            <p className="text-[#f5f2ec]/70 text-sm mt-1">
              Thank you for signing up. We&apos;ll keep you in the loop.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative">
              {/* Honeypot — hidden from users, bots will fill it */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input
                  type="text"
                  name="website_url_confirm"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="new-password"
                />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-transparent focus:outline-none focus:border-[#a75235] transition-colors bg-white text-[#333333]"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg whitespace-nowrap disabled:opacity-50 cursor-pointer"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                {status === "submitting" ? "..." : "Subscribe"}
              </button>
            </form>
            {errorMessage && (
              <p className="text-red-300 text-sm mt-3">{errorMessage}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
