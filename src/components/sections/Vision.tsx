"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <h2 className="font-brand text-5xl md:text-7xl leading-none text-white">
              FUTURE <br/> 
              <span className="text-neon-purple">READY</span>
            </h2>
          </Reveal>
          
          <div className="space-y-8">
            <Reveal delay={0.2}>
              <p className="font-ui text-lg text-white/70 leading-relaxed">
                We believe in a web that feels less like a document and more like a destination.
                Spatial computing. Generative interfaces. We are building the terminals of tomorrow.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex gap-4">
                {["WebGL", "WebGPU", "React 19"].map(tag => (
                  <div key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 font-mono text-xs text-white/60">
                    {tag}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#03040B] to-transparent z-20" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#03040B] to-transparent z-20" />
    </section>
  );
}
