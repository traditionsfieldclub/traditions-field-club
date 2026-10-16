"use client";

import Script from "next/script";

const OWNER = "40651978";

export default function AcuityEmbed({ appointmentType, title }: { appointmentType: string; title: string }) {
  const directUrl = `https://app.acuityscheduling.com/schedule.php?owner=${OWNER}&appointmentType=${appointmentType}`;
  const src = `https://app.acuityscheduling.com/schedule.php?owner=${OWNER}&appointmentType=${appointmentType}&ref=embedded_csp`;
  return (
    <div>
      <a
        href={directUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full mb-4 border-2 border-[#a75235] text-[#a75235] px-6 py-3 font-semibold tracking-wide hover:bg-[#a75235] hover:text-[#f5f2ec] transition-colors rounded-lg"
        style={{ fontFamily: "var(--font-heading), serif" }}
      >
        Open the booking calendar
      </a>
      <iframe
        src={src}
        title={title}
        width="100%"
        height="800"
        frameBorder={0}
        allow="payment"
        className="w-full rounded-lg min-h-[800px]"
      ></iframe>
      <Script src="https://embed.acuityscheduling.com/js/embed.js" strategy="afterInteractive" />
      <p className="text-sm text-[#666666] text-center mt-4">
        Calendar not loading? Try turning off your VPN or ad blocker, or call or text us at{" "}
        <a href="tel:+18433218152" className="text-[#a75235] font-semibold hover:underline">(843) 321-8152</a>{" "}
        and we&apos;ll book you.
      </p>
    </div>
  );
}
