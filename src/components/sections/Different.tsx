"use client";

import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/Reveal";
import { Cpu, Sparkles, Rocket, Smartphone, Globe } from "lucide-react";
import { useSound } from "@/components/sound/SoundProvider";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FlyingText } from "@/components/ui/FlyingText";

const items = [
  { icon: Cpu, title: "AI‑Powered Development", desc: "Intelligent features, automation, personalization." },
  { icon: Sparkles, title: "Animated & Interactive Design", desc: "AAA‑grade motion + micro‑interactions." },
  { icon: Rocket, title: "Fast Launch & Scalable Tech", desc: "Ship quickly. Scale cleanly. Optimize always." },
  { icon: Smartphone, title: "Mobile‑First & Viral‑Ready", desc: "Thumb-friendly UI built for shares & reels." },
  { icon: Globe, title: "Global Standards", desc: "Accessibility, SEO, performance, and polish." }
];

function HoloCard({ item, index, play }: { item: any, index: number, play: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.2, 0.8]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Icon = item.icon;

  return (
    <Reveal delay={0.06 * index} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => play("hover")}
        onClick={() => play("click")}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        className="relative h-full transition-all duration-200"
      >
        <motion.div 
           style={{ filter: useMotionTemplate`brightness(${brightness})` }}
           className="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(88,231,255,0.15)] transition-shadow duration-500"
        >
            {/* Holographic Gradient Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            
            <CardContent className="relative p-8 flex flex-col h-full z-10 transform-gpu translate-z-10">
                <div className="flex items-start justify-between mb-4">
                    <motion.div 
                        className="rounded-2xl border border-white/10 bg-black/20 p-3 shadow-inner"
                        whileHover={{ rotate: 15, scale: 1.1, backgroundColor: "rgba(0, 229, 255, 0.1)" }}
                    >
                        <Icon className="h-6 w-6 text-neon-cyan" />
                    </motion.div>
                </div>

                <div className="font-brand text-xl text-white/95 mb-3 group-hover:text-neon-cyan transition-colors">{item.title}</div>
                <div className="font-ui text-white/70 leading-relaxed text-sm flex-grow">{item.desc}</div>
                
                <motion.div 
                    className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" 
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                />
            </CardContent>
        </motion.div>
      </motion.div>
    </Reveal>
  );
}

export function Different() {
  const { play } = useSound();

  return (
    <section id="different" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="font-mono text-xs tracking-[0.35em] text-neon-purple/80 font-bold mb-4 overflow-hidden">
            <FlyingText text="WHAT MAKES US DIFFERENT" />
          </div>
          <h2 className="font-brand text-4xl sm:text-5xl max-w-2xl leading-tight overflow-visible">
            <FlyingText text="Built to feel like the" delay={0.2} />
            <span className="text-neon-purple block mt-2"><FlyingText text="future." delay={0.6} /></span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {items.map((it, i) => (
             <HoloCard key={it.title} item={it} index={i} play={play} />
          ))}
        </div>
      </div>
    </section>
  );
}
