"use client";

import React, { useEffect } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useSound } from "@/components/sound/SoundProvider";
import { motion } from "framer-motion";
import { NeuralNetworkBackground } from "@/components/three/NeuralNetworkBackground";
import { KineticText } from "@/components/ui/KineticText";
import { FlyingText } from "@/components/ui/FlyingText";

export function WhoWeAre() {
  const { play } = useSound();
  useEffect(() => { /* hook point for future ambient effects */ }, []);

  return (
    <section id="who" className="relative py-24 overflow-hidden">
      {/* 3D Background Layer */}
      <NeuralNetworkBackground />

      <div className="relative mx-auto max-w-6xl px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <Reveal>
                <div className="font-mono text-xs tracking-[0.35em] text-neon-cyan/80 font-bold overflow-hidden">
                  <FlyingText text="WHO WE ARE" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                {/* Replaced static H2 with FlyingText for chaotic reveal */}
                <h2 className="font-brand text-4xl sm:text-5xl leading-tight overflow-visible">
                    <FlyingText text="An AI-driven studio in" delay={0.2} />
                    <span className="text-neon-cyan block mt-2">
                      <FlyingText text="Dubai." delay={0.6} />
                    </span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg font-ui text-white/75 leading-relaxed max-w-lg">
                  We build products that feel alive. Think: <span className="text-white font-bold inline-block"><FlyingText text="space UI," delay={0.8} /></span> cinematic motion, tactile feedback,
                  and AI-native experiences that users want to share.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <div className="font-mono text-xs text-neon-cyan">
                      latency: low • polish: high • ambition: orbital
                   </div>
                </div>
              </Reveal>
            </div>

            {/* Image Content */}
            <Reveal variant="scale-up" delay={0.2}>
              <motion.div 
                className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                {/* Animated colored border/glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
                
                <img 
                  src="/images/ai-lab.png" 
                  alt="Space Gate AI Lab" 
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050612] via-transparent to-transparent opacity-60 z-10" />
                
                {/* Tech Ovelay */}
                <div className="absolute bottom-4 left-4 z-30 font-mono text-[10px] text-white/60 bg-black/50 backdrop-blur px-2 py-1 rounded">
                    SYS.V.2.0 // LABVIEW
                </div>
              </motion.div>
            </Reveal>
          </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            { 
              t: "Experience-first", 
              d: "Every pixel is intentional. Every interaction has feedback.",
              icon: "01",
              gradient: "from-cyan-500/20 to-blue-500/20",
              border: "group-hover:border-cyan-400"
            },
            { 
              t: "AI-native", 
              d: "We design flows around automation, personalization, and intelligence.",
              icon: "02",
              gradient: "from-purple-500/20 to-pink-500/20",
              border: "group-hover:border-purple-400"
            },
            { 
              t: "Built to ship", 
              d: "Fast, scalable, production-ready code with performance discipline.",
              icon: "03",
              gradient: "from-amber-500/20 to-orange-500/20",
              border: "group-hover:border-amber-400"
            }
          ].map((x, i) => (
            <Reveal key={x.t} delay={0.2 + (0.1 * i)} variant="scale-up" className="h-full">
              <motion.div
                className={`group relative h-full rounded-3xl border border-white/5 bg-black/40 p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/5 ${x.border} overflow-hidden hover:-translate-y-2`}
              >
                {/* Number/Icon Background */}
                <div className="absolute -right-4 -top-4 text-[120px] font-bold text-white/5 font-brand select-none group-hover:text-white/10 transition-colors duration-700">
                  {x.icon}
                </div>
                
                {/* Gradient Glow */}
                <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${x.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl`} />

                {/* Content */}
                <div className="relative z-10">
                   <h3 className="text-2xl font-brand text-white mb-4"><KineticText text={x.t} /></h3>
                   <div className="w-12 h-[2px] bg-white/20 mb-4 group-hover:w-full group-hover:bg-white/50 transition-all duration-500" />
                   <p className="font-ui text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                     {x.d}
                   </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
