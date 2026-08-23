'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Only show video on desktop (768px+)
    const mq = window.matchMedia('(min-width: 768px)');
    setShowVideo(mq.matches);

    const handler = (e: MediaQueryListEvent) => setShowVideo(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    videoRef.current.playbackRate = 0.85;
    // play() returns a Promise that can reject (e.g. browser pauses
    // background video to save power) — swallow it so it doesn't
    // surface as an unhandled rejection. The video stays paused
    // harmlessly if that happens.
    videoRef.current.play().catch(() => {});
  }, [showVideo]);

  return (
    <section className="relative h-[500px] md:min-h-[70vh] md:h-auto lg:min-h-[calc(70vh+220px)] flex items-center justify-center overflow-hidden bg-[#162838]">
      {/* Poster image — always rendered as base layer */}
      <Image
        src="/images/hero-poster.webp"
        alt="Aerial view of Traditions Field Club sporting clays property"
        fill
        priority
        fetchPriority="high"
        className="object-cover object-[calc(30%-40px)_center] md:object-center md:hidden"
        sizes="100vw"
      />

      {/* Desktop: Looping hero video */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Aerial drone footage of sporting clays stations and property at Traditions Field Club"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/hero-video-new.mp4" type="video/mp4" />
        </video>
      )}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-[#162838]/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-[#f5f2ec] px-4">
        {/* Logo image (crest + wordmark, already white) in place of the old text heading, at every breakpoint */}
        <Image
          src="/logo-white-full.png"
          alt="Traditions Field Club"
          width={1400}
          height={798}
          priority
          className="h-24 sm:h-28 md:h-32 lg:h-44 w-auto mx-auto mb-4 lg:mb-8"
        />
        <p
          className="text-base md:text-xl lg:text-2xl max-w-2xl mx-auto opacity-90 uppercase tracking-[0.25em] font-normal"
          style={{ fontFamily: "var(--font-heading), serif" }}
        >
          A premier sporting clays and outdoor club in the heart of South Carolina
        </p>
      </div>

      {/* Scroll cue — standard hint that there's more below, rather than shrinking the hero to force it into view */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#f5f2ec]/80 animate-scroll-cue">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
