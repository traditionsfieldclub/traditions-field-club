"use client";

import { useState, useRef } from "react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formLoadedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) return;

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
      setErrorMessage("Unable to subscribe. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-[#a75235]">
        Stay Connected
      </h3>
      <p className="text-sm opacity-75 mb-4">
        Get updates on events, membership openings, and club news.
      </p>

      {status === "success" ? (
        <div className="bg-[#f5f2ec]/10 border border-[#f5f2ec]/20 rounded-lg px-4 py-3 text-center">
          <p className="text-[#f5f2ec] text-sm font-semibold">You&apos;re subscribed!</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#f5f2ec]/20 bg-[#f5f2ec]/10 text-[#f5f2ec] placeholder-[#f5f2ec]/40 focus:outline-none focus:border-[#a75235] transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#a75235] text-[#f5f2ec] px-6 py-2 rounded-md text-sm font-medium uppercase tracking-wider hover:bg-[#8a4229] transition-colors disabled:opacity-50"
            >
              {status === "submitting" ? "..." : "Subscribe"}
            </button>
          </form>
          {errorMessage && (
            <p className="text-red-400 text-xs mt-2">{errorMessage}</p>
          )}
        </>
      )}
    </div>
  );
}
