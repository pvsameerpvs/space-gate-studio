"use client";

import React, { useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { useSound } from "@/components/sound/SoundProvider";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Smartphone, Monitor, BrainCircuit, Zap, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Mobile App Development",
    icon: Smartphone,
    desc: "Native performance. Gesture-driven UI.",
    bullets: ["iOS + Android with premium UI", "Haptics & micro-interactions", "Scalable offline-first logic"]
  },
  {
    title: "Website Development",
    icon: Monitor,
    desc: "WebGL. Next.js. Absolute speed.",
    bullets: ["Next.js App Router", "3D & Lenis scroll", "SEO-optimized architecture"]
  },
  {
    title: "AI Integrations",
    icon: BrainCircuit,
    desc: "Agents. Vectors. Neural search.",
    bullets: ["LLM-powered copilots", "Predictive analytics", "Personalized user journeys"]
  },
  {
    title: "Motion & UX Design",
    icon: Zap,
    desc: "Fluidity. Physics. Feedback.",
    bullets: ["AAA game feel", "Sound design implementation", "Design systems"]
  }
];

export function Services() {
  const { play } = useSound();
  
  // Spotlight logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      id="services" 
      className="relative py-24 overflow-hidden group"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
          style={{ backgroundImage: "url(/images/tech-bg.png)" }}
          animate={{ x: [-20, 0, -20], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03040B] via-[#03040B]/80 to-[#03040B]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 font-mono text-[10px] text-neon-cyan tracking-wider mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                </span>
                SYSTEMS ONLINE
              </div>
              <h2 className="font-brand text-5xl md:text-6xl text-white">
                Capabilities
              </h2>
            </div>
            <p className="max-w-md text-right font-mono text-xs text-white/50 tracking-widest hidden md:block">
              // DEPLOYING NEXT-GEN INTERFACES<br/>
              // TARGET: GLOBAL SCALE
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={0.1 * i} className="w-full" variant="fly-in">
                <div 
                  className="group/card relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm"
                  onMouseEnter={() => play("hover")}
                  onClick={() => play("click")}
                >
                  {/* Spotlight Gradient */}
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/card:opacity-100"
                    style={{
                      background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(88, 231, 255, 0.15),
                          transparent 80%
                        )
                      `
                    }}
                  />
                  
                  <CardContent className="relative p-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="rounded-2xl bg-white/5 p-4 border border-white/10 group-hover/card:bg-neon-cyan/10 group-hover/card:border-neon-cyan/30 transition-colors duration-500">
                        <Icon className="h-8 w-8 text-white/80 group-hover/card:text-neon-cyan transition-colors duration-500" />
                      </div>
                      <ArrowRight className="h-6 w-6 text-white/20 -rotate-45 group-hover/card:rotate-0 group-hover/card:text-neon-cyan transition-all duration-500" />
                    </div>

                    {/* Content */}
                    <h3 className="font-brand text-2xl mb-2 text-white group-hover/card:text-neon-cyan transition-colors">{s.title}</h3>
                    <p className="font-mono text-xs text-neon-purple mb-6 uppercase tracking-wider">{s.desc}</p>
                    
                    <ul className="mt-auto space-y-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3 font-ui text-sm text-white/60 group-hover/card:text-white/80 transition-colors">
                          <div className="h-[1px] w-3 bg-white/20 group-hover/card:w-5 group-hover/card:bg-neon-cyan transition-all duration-300" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-0 group-hover/card:opacity-20 transition-opacity duration-700" />
                      <div className="absolute top-0 left-0 w-full h-[200%] bg-[linear-gradient(to_bottom,transparent,rgba(88,231,255,0.1),transparent)] -translate-y-[100%] group-hover/card:animate-scan" />
                    </div>
                  </CardContent>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
