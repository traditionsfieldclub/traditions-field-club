"use client";

import Script from "next/script";

const OWNER = "40651978";

export default function AcuityEmbed({ appointmentType, title }: { appointmentType: string; title: string }) {
  const src = `https://app.acuityscheduling.com/schedule.php?owner=${OWNER}&appointmentType=${appointmentType}&ref=embedded_csp`;
  return (
    <div>
      <iframe
        src={src}
        title={title}
        width="100%"
        height="800"
        frameBorder={0}
        allow="payment"
        className="w-full rounded-lg"
      ></iframe>
      <Script src="https://embed.acuityscheduling.com/js/embed.js" strategy="afterInteractive" />
      <p className="text-sm text-[#666666] text-center mt-4">
        Scheduler not loading?{" "}
        <a href={src.replace("&ref=embedded_csp", "")} target="_blank" rel="noopener noreferrer" className="text-[#a75235] font-semibold hover:underline">
          Open it in a new tab
        </a>{" "}
        or call us at{" "}
        <a href="tel:+18433218152" className="text-[#a75235] font-semibold hover:underline">(843) 321-8152</a>.
      </p>
    </div>
  );
}
