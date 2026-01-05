"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/fx/Magnetic";
import { Ripple } from "@/components/fx/Ripple";
import { SpaceScene } from "@/components/three/SpaceScene";
import { useSound } from "@/components/sound/SoundProvider";
import gsap from "gsap";

export function Hero() {
  const { play } = useSound();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(el.querySelectorAll("[data-hero]"),
      { y: 26, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.05, stagger: 0.08 }
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="top" ref={ref} className="relative min-h-[92vh] flex items-center pt-20">
      <SpaceScene />

      <div className="absolute inset-0 bg-grid" />
      <div className="noise" />
      <div className="scanline" />

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
          data-hero
          initial={false}
          onMouseEnter={() => play("hover")}
        >
          <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_20px_rgba(0,255,209,0.35)]" />
          <span className="font-mono text-[12px] tracking-[0.25em] text-white/70">AI • SPACE • MOTION • SOUND</span>
        </motion.div>

        <h1 data-hero className="mt-6 font-heading text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
          <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
            Space Gate Studio
          </span>
        </h1>

        <p data-hero className="mt-5 max-w-2xl font-play text-lg text-white/75">
          Open the Gate to the Future of Digital Experiences. We craft cinematic, interactive,
          viral‑ready products that feel alive—like an AI lab fused with a space control panel.
        </p>

        <div data-hero className="mt-8 flex flex-col sm:flex-row gap-3">
          <Magnetic>
            <Button
              size="lg"
              className="group overflow-hidden"
              onMouseEnter={() => play("hover")}
              onClick={() => {
                play("click");
                document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10">Open The Gate</span>
              <Ripple />
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_30%,rgba(88,231,255,0.25),transparent_60%)]" />
            </Button>
          </Magnetic>

          <Magnetic strength={0.18}>
            <Button
              size="lg"
              variant="ghost"
              className="group overflow-hidden"
              onMouseEnter={() => play("hover")}
              onClick={() => {
                play("click");
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10">Explore Services</span>
              <Ripple />
            </Button>
          </Magnetic>
        </div>

        <div data-hero className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            ["Micro-Interactions", "everywhere"],
            ["Scroll Cinematics", "GSAP + Lenis"],
            ["Space Visuals", "Three.js"],
            ["Sound Design", "Howler.js"]
          ].map(([a, b]) => (
            <div
              key={a}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-glow"
              onMouseEnter={() => play("hover")}
            >
              <div className="font-mono text-xs text-white/60">{b}</div>
              <div className="mt-1 font-ui text-sm text-white/85">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
