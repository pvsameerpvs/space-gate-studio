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
import { GravityText } from "@/components/fx/GravityText";

export function Hero() {
  const { play } = useSound();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Animation cleanup if needed
  }, []);

  return (
    <section id="top" ref={ref} className="relative min-h-[92vh] flex items-center pt-20 overflow-hidden">
      {/* 3D Space Scene Background */}
      <SpaceScene />
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#03040B]/30 to-[#03040B] pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <Reveal variant="fly-in" delay={0.2}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-8 shadow-lg shadow-purple-500/10">
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
              <span className="absolute w-full h-full rounded-full bg-neon-purple/50 animate-ping" />
              <span className="relative w-2 h-2 rounded-full bg-gradient-to-tr from-neon-purple to-neon-cyan shadow-[0_0_8px_theme(colors.neon.purple)]" />
            </div>
            <span className="font-mono text-[10px] text-white/70 tracking-[0.2em] uppercase">System Online</span>
          </div>
        </Reveal>

        <Reveal variant="fly-in" delay={0.4}>
          <h1 className="font-brand text-6xl md:text-8xl lg:text-9xl tracking-tight text-white mb-8 leading-[0.85] overflow-visible">
            <GravityText text="DIGITAL" delay={0.2} className="drop-shadow-2xl" /> <br />
            <GravityText 
              text="REALITIES" 
              delay={0.6}
              className="text-neon-cyan drop-shadow-[0_0_20px_rgba(0,255,209,0.6)]"
            />
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
              className="group relative px-8 py-4 rounded-full overflow-hidden bg-white text-black font-bold tracking-wide transition-all hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]"
              onClick={() => {
                play("click");
                document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-blue opacity-0 group-hover:opacity-20 transition-opacity" />
              <span className="relative">INITIATE PROJECT</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white font-mono text-sm hover:bg-white/10 hover:border-white/20 transition-all hover:shadow-lg"
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
          ].map(([a, b], i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="group relative rounded-xl border border-white/5 bg-white/5 backdrop-blur-md p-6 overflow-hidden transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10"
              onMouseEnter={() => play("hover")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="font-mono text-[10px] text-neon-cyan/70 uppercase tracking-wider mb-2">{b}</div>
                <div className="font-ui text-sm text-white/90 font-medium group-hover:text-white transition-colors">{a}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
