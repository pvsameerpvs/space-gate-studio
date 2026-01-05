"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/fx/Magnetic";
import { Ripple } from "@/components/fx/Ripple";
import { SpaceScene } from "@/components/three/SpaceScene";
import { useSound } from "@/components/sound/SoundProvider";
import { Reveal } from "@/components/motion/Reveal";
import gsap from "gsap";

export function Hero() {
  const { play } = useSound();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Animation cleanup if needed
  }, []);

  return (
    <section id="top" ref={ref} className="relative min-h-[92vh] flex items-center pt-20">
      {/* Background handled globally by CinematicBackground, keeping only hero-specific overlays if needed */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#03040B]/60 to-[#03040B]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <Reveal variant="fly-in" delay={0.2}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="font-mono text-xs text-neon-cyan tracking-widest uppercase">System Online</span>
          </div>
        </Reveal>

        <Reveal variant="fly-in" delay={0.4}>
          <h1 className="font-brand text-6xl md:text-8xl lg:text-9xl tracking-tight text-white mb-8 leading-[0.9]">
            DIGITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple animate-shimmer bg-[length:200%_auto]">
              REALITIES
            </span>
          </h1>
        </Reveal>

        <Reveal variant="fly-in" delay={0.6}>
          <p className="font-ui text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            We architect high-fidelity digital experiences that bridge the gap between 
            imagination and execution.
          </p>
        </Reveal>

        <Reveal variant="scale-up" delay={0.8}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:bg-neon-cyan transition-colors"
              onClick={() => {
                play("click");
                document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              INITIATE PROJECT
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border border-white/20 text-white font-mono text-sm hover:bg-white/5 transition-colors"
            >
              VIEW CASE STUDIES
            </motion.button>
          </div>
        </Reveal>

        <div data-hero className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            ["Micro-Interactions", "everywhere"],
            ["Scroll Cinematics", "GSAP + Lenis"],
            ["Space Visuals", "Three.js"],
            ["Sound Design", "Howler.js"]
          ].map(([a, b]) => (
            <div
              key={a}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-glow"
              onMouseEnter={() => play("hover")}
            >
              <div className="font-mono text-xs text-white/60">{b}</div>
              <div className="mt-1 font-ui text-sm text-white/85">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
