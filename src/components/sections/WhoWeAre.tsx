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
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="font-mono text-xs tracking-[0.35em] text-white/60">WHO WE ARE</div>
              <h2 className="mt-3 font-brand text-4xl sm:text-5xl">An AI-driven studio in Dubai.</h2>
              <p className="mt-4 text-lg font-ui text-white/75 leading-relaxed">
                We build products that feel alive. Think: space UI, cinematic motion, tactile feedback,
                and AI-native experiences that users want to share.
              </p>
              <div className="mt-6 font-mono text-xs text-neon-cyan">
                latency: low • polish: high • ambition: orbital
              </div>
            </div>

            {/* Image Content */}
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
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "Experience-first", d: "Every pixel is intentional. Every interaction has feedback." },
            { t: "AI-native", d: "We design flows around automation, personalization, and intelligence." },
            { t: "Built to ship", d: "Fast, scalable, production-ready code with performance discipline." }
          ].map((x, i) => (
            <Reveal key={x.t} delay={0.08 * i}>
              <Card
                className="group hover:border-white/20 transition"
                onMouseEnter={() => play("hover")}
                onClick={() => play("click")}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_20%_20%,rgba(88,231,255,0.18),transparent_55%)]" />
                <CardContent className="relative">
                  <div className="font-brand text-2xl">{x.t}</div>
                  <div className="mt-2 font-ui text-white/70">{x.d}</div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
