"use client";

import React, { useEffect, useRef } from "react";
// import { SpaceScene } from "@/components/three/SpaceScene";
import { useSound } from "@/components/sound/SoundProvider";
import { HeroHub } from "@/components/ui/HeroHub";

export function Hero() {
  const { play } = useSound();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Animation cleanup if needed
  }, []);

  return (
    <section id="top" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#03040B]">
      {/* 3D Space Scene Background (Preserved as requested) */}
      <video 
        className="absolute inset-0 w-full h-full object-cover z-0 scale-110"
        src="/images/hero-section-vid-3.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Overlay to dim background slightly for the UI Hub */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 pointer-events-none" />

      {/* Main Hub & Spoke UI Layer */}
      <HeroHub />

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 opacity-30 animate-bounce pointer-events-none">
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="stroke-white">
            <rect x="1" y="1" width="18" height="28" rx="9" strokeWidth="2" />
            <circle cx="10" cy="8" r="2" fill="white" />
        </svg>
      </div>
    </section>
  );
}
