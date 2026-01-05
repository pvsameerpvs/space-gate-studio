"use client";

import React, { useEffect } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { useSound } from "@/components/sound/SoundProvider";
import { motion } from "framer-motion";

export function WhoWeAre() {
  const { play } = useSound();
  useEffect(() => { /* hook point for future ambient effects */ }, []);

  return (
    <section id="who" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <Reveal>
                <div className="font-mono text-xs tracking-[0.35em] text-white/60">WHO WE ARE</div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-3 font-brand text-4xl sm:text-5xl">An AI-driven studio in Dubai.</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-4 text-lg font-ui text-white/75 leading-relaxed">
                  We build products that feel alive. Think: space UI, cinematic motion, tactile feedback,
                  and AI-native experiences that users want to share.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-6 font-mono text-xs text-neon-cyan">
                  latency: low • polish: high • ambition: orbital
                </div>
              </Reveal>
            </div>

            {/* Image Content */}
            <Reveal variant="scale-up" delay={0.2}>
              <motion.div 
                className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl skew-y-1"
                whileHover={{ scale: 1.02, skewY: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-neon-blue/20 mix-blend-overlay z-10" />
                <img 
                  src="/images/ai-lab.png" 
                  alt="Space Gate AI Lab" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050612] via-transparent to-transparent opacity-60 z-20" />
              </motion.div>
            </Reveal>
          </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              t: "Experience-first", 
              d: "Every pixel is intentional. Every interaction has feedback.",
              color: "from-cyan-400 to-blue-500",
              border: "group-hover:border-cyan-400/50",
              shadow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            },
            { 
              t: "AI-native", 
              d: "We design flows around automation, personalization, and intelligence.",
              color: "from-purple-400 to-pink-500",
              border: "group-hover:border-purple-400/50",
              shadow: "group-hover:shadow-[0_0_30px_rgba(192,132,252,0.3)]"
            },
            { 
              t: "Built to ship", 
              d: "Fast, scalable, production-ready code with performance discipline.",
              color: "from-amber-300 to-orange-500",
              border: "group-hover:border-amber-400/50",
              shadow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]"
            }
          ].map((x, i) => (
            <Reveal key={x.t} delay={0.1 * i} variant="scale-up" className="h-full">
              <motion.div
                className={`group relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 ${x.border} ${x.shadow}`}
                whileHover={{ 
                  y: -10,
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.05,
                  transition: { duration: 0.2 } 
                }}
                style={{ perspective: 1000 }}
              >
                {/* Holographic Gradient Overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-500 bg-gradient-to-br ${x.color} rounded-2xl`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`mb-4 w-12 h-1 bg-gradient-to-r ${x.color} rounded-full`} />
                  <h3 className="text-2xl font-brand text-white md:text-3xl">{x.t}</h3>
                  <p className="mt-4 text-sm font-ui text-white/60 leading-relaxed">
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
