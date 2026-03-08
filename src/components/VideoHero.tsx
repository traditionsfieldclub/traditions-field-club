'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoHero() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    if (!video1 || !video2) return;

    // Set playback speed for both videos
    video1.playbackRate = 0.7;
    video2.playbackRate = 0.8;

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
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#162838]">
      {/* Video 1 Background */}
      <video
        ref={video1Ref}
        autoPlay
        muted
        playsInline
        preload="metadata"
        poster="/images/hero-poster.webp"
        aria-label="Aerial view of Traditions Field Club sporting clays property"
        className={`absolute inset-0 w-full h-full object-cover object-right md:object-center transition-opacity duration-[2000ms] ${activeVideo === 0 ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Video 2 Background */}
      <video
        ref={video2Ref}
        muted
        playsInline
        preload="none"
        aria-label="Sporting clays shooting and property tour at Traditions Field Club"
        className={`absolute inset-0 w-full h-full object-cover object-right md:object-center transition-opacity duration-[2000ms] ${activeVideo === 1 ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src="/hero-video2.mp4" type="video/mp4" />
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
