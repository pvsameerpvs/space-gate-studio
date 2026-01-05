"use client";

import React, { useEffect } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { useSound } from "@/components/sound/SoundProvider";

export function WhoWeAre() {
  const { play } = useSound();
  useEffect(() => { /* hook point for future ambient effects */ }, []);

  return (
    <section id="who" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="font-mono text-xs tracking-[0.35em] text-white/60">WHO WE ARE</div>
              <h2 className="mt-3 font-brand text-4xl sm:text-5xl">An AI-driven studio in Dubai.</h2>
              <p className="mt-4 max-w-2xl font-ui text-white/75">
                We build products that feel alive. Think: space UI, cinematic motion, tactile feedback,
                and AI-native experiences that users want to share.
              </p>
            </div>
            <div className="font-mono text-xs text-white/60">
              latency: low • polish: high • ambition: orbital
            </div>
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
