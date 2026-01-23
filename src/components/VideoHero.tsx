'use client';

import { useEffect, useRef } from 'react';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85; // 15% slower
    }
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-right md:object-center"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-[#162838]/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-[#f5f2ec] px-4">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 tracking-wide"
          style={{ fontFamily: "var(--font-heading), serif" }}
        >
          Traditions Field Club
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          A premier sporting clays and outdoor club in the heart of South Carolina
        </p>
      </div>
    </section>
  );
}
