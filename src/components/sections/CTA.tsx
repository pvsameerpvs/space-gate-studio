"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/fx/Magnetic";
import { Ripple } from "@/components/fx/Ripple";
import { useSound } from "@/components/sound/SoundProvider";
import { Reveal } from "@/components/motion/Reveal";

export function CTA() {
  const { play } = useSound();

  return (
    <section id="cta" className="relative py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_30%_40%,rgba(0,255,209,0.12),transparent_60%),radial-gradient(900px_600px_at_70%_30%,rgba(170,80,255,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid" />
        <div className="noise" />
        <div className="scanline" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <Reveal variant="scale-up">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10 shadow-glow overflow-hidden relative">
            <div className="absolute -inset-20 opacity-60 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(88,231,255,0.18),rgba(170,80,255,0.18),rgba(0,255,209,0.14),rgba(88,231,255,0.18))] blur-3xl" />
            <div className="relative">
              <div className="font-mono text-xs tracking-[0.35em] text-white/60">CALL TO ACTION</div>
              <h2 className="mt-4 font-brand text-5xl sm:text-6xl leading-[1.05]">
                Open Your <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">Space Gate</span> Today
              </h2>
              <p className="mt-5 max-w-2xl font-ui text-white/75">
                Want a website or app that feels like a living sci‑fi interface? Let’s build something viral, cinematic, and fast.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Magnetic>
                  <Button
                    size="lg"
                    className="group overflow-hidden"
                    onMouseEnter={() => play("hover")}
                    onClick={() => {
                      play("click");
                      play("whoosh", { volume: 0.20 });
                      // Replace with your real CTA endpoint:
                      window.open("mailto:hello@spacegatestudio.com?subject=Open%20My%20Space%20Gate", "_blank");
                    }}
                  >
                    <span className="relative z-10">Initiate Contact</span>
                    <Ripple />
                    <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_25%_30%,rgba(88,231,255,0.30),transparent_60%)]" />
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
                      document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span className="relative z-10">Back to Orbit</span>
                    <Ripple />
                  </Button>
                </Magnetic>
              </div>

              <div className="mt-8 font-mono text-xs text-white/55">
                sound: optional • animations: heavy • performance: disciplined
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
