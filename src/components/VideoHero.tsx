'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function VideoHero() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const isTransitioning = useRef(false);

  useEffect(() => {
    // Check if desktop (768px+) — only load videos on desktop
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    if (!video1 || !video2) return;

    // Set playback speed for both videos
    video1.playbackRate = 0.7;
    video2.playbackRate = 0.8;

    // Start playing video 1
    video1.play();

    const handleVideo1End = () => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;

      video2.currentTime = 0;
      video2.play();
      setActiveVideo(1);

      setTimeout(() => {
        isTransitioning.current = false;
      }, 2500);
    };

    const handleVideo2End = () => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;

      video1.currentTime = 0;
      video1.play();
      setActiveVideo(0);

      setTimeout(() => {
        isTransitioning.current = false;
      }, 2500);
    };

    video1.addEventListener('ended', handleVideo1End);
    video2.addEventListener('ended', handleVideo2End);

    return () => {
      video1.removeEventListener('ended', handleVideo1End);
      video2.removeEventListener('ended', handleVideo2End);
    };
  }, [isDesktop]);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#162838]">
      {/* Mobile: Static poster image */}
      {!isDesktop && (
        <Image
          src="/images/hero-poster.webp"
          alt="Aerial view of Traditions Field Club sporting clays property"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-right"
          sizes="100vw"
        />
      )}

      {/* Desktop: Video backgrounds */}
      {isDesktop && (
        <>
          <video
            ref={video1Ref}
            muted
            playsInline
            preload="metadata"
            aria-label="Aerial view of Traditions Field Club sporting clays property"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[2000ms] ${activeVideo === 0 ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          <video
            ref={video2Ref}
            muted
            playsInline
            preload="none"
            aria-label="Sporting clays shooting and property tour at Traditions Field Club"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[2000ms] ${activeVideo === 1 ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/hero-video2.mp4" type="video/mp4" />
          </video>
        </>
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
