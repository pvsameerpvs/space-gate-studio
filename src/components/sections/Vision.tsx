"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSound } from "@/components/sound/SoundProvider";

export function Vision() {
  const { play } = useSound();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="vision" ref={ref} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/space-gate.png)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <div className="relative z-10 max-w-4xl px-4 text-center">
        <motion.div style={{ opacity }}>
          <div className="font-mono text-xs tracking-[0.5em] text-neon-cyan mb-6">VISION</div>
          <h2 className="font-brand text-5xl md:text-7xl lg:text-8xl leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Open The Gate
          </h2>
          <p className="mt-8 text-lg md:text-xl font-play text-white/80 max-w-2xl mx-auto leading-relaxed">
            We envision a future where digital interfaces are indistinguishable from magic.
            Where every interaction tells a story, and every click feels like a launch sequence.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#03040B] to-transparent z-20" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#03040B] to-transparent z-20" />
    </section>
  );
}
