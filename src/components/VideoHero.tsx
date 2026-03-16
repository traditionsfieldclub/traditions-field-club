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
    videoRef.current.play();
  }, [showVideo]);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#162838]">
      {/* Poster image — always rendered as base layer */}
      <Image
        src="/images/hero-poster.webp"
        alt="Aerial view of Traditions Field Club sporting clays property"
        fill
        priority
        fetchPriority="high"
        className="object-cover object-right md:object-center"
        sizes="100vw"
      />

      {/* Desktop: Looping hero video */}
      {showVideo && (
        <video
          ref={videoRef}
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
