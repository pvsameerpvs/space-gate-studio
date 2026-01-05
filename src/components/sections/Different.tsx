"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/Reveal";
import { Cpu, Sparkles, Rocket, Smartphone, Globe } from "lucide-react";
import { useSound } from "@/components/sound/SoundProvider";
import { motion } from "framer-motion";

const items = [
  { icon: Cpu, title: "AI‑Powered Development", desc: "Intelligent features, automation, personalization." },
  { icon: Sparkles, title: "Animated & Interactive Design", desc: "AAA‑grade motion + micro‑interactions." },
  { icon: Rocket, title: "Fast Launch & Scalable Tech", desc: "Ship quickly. Scale cleanly. Optimize always." },
  { icon: Smartphone, title: "Mobile‑First & Viral‑Ready", desc: "Thumb-friendly UI built for shares & reels." },
  { icon: Globe, title: "Global Standards", desc: "Accessibility, SEO, performance, and polish." }
];

export function Different() {
  const { play } = useSound();

  return (
    <section id="different" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="font-mono text-xs tracking-[0.35em] text-white/60">WHAT MAKES US DIFFERENT</div>
          <h2 className="mt-3 font-brand text-4xl sm:text-5xl">Built to feel like the future.</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={0.06 * i}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="h-full"
                  onMouseEnter={() => play("hover")}
                  onClick={() => play("click")}
                >
                  <Card className="group h-full overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(170,80,255,0.15),transparent_60%)]" />
                    <CardContent className="relative p-6">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_0_30px_rgba(88,231,255,0.1)]"
                          whileHover={{ rotate: 15, scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                        >
                          <Icon className="h-6 w-6 text-neon-cyan" />
                        </motion.div>
                        <div className="font-brand text-xl text-white/90">{it.title}</div>
                      </div>
                      <div className="mt-4 font-ui text-white/70 leading-relaxed">{it.desc}</div>
                      
                      <motion.div 
                        className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" 
                        initial={{ scaleX: 0.5, opacity: 0.5 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
