"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { useSound } from "@/components/sound/SoundProvider";

import { KineticText } from "@/components/ui/KineticText";
import { FlyingText } from "@/components/ui/FlyingText";
import { NeuralNetworkBackground } from "@/components/three/NeuralNetworkBackground";

export function Vision() {
  const { play } = useSound();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  return (
    <section id="vision" ref={ref} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* 3D Particle Overlay */}
      <NeuralNetworkBackground />

      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0  mix-blend-screen"
      >
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/space-gate.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>
      

      <div className="relative z-10 max-w-4xl px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="font-brand text-5xl md:text-7xl leading-none text-white text-left overflow-visible">
              <FlyingText text="FUTURE" delay={0.1} /> <br/> 
              <span className="text-neon-purple block mt-2"><FlyingText text="READY" delay={0.5} /></span>
            </div>
          </Reveal>
          
        
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#03040B] to-transparent z-20" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#03040B] to-transparent z-20" />
    </section>
  );
}
