"use client";

import React, { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSound } from "@/components/sound/SoundProvider";

gsap.registerPlugin(ScrollTrigger);

export function Vision() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { play } = useSound();

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-glow]"),
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.1,
          scrollTrigger: { trigger: el, start: "top 70%" }
        }
      );

      gsap.to(el.querySelector("[data-bg]"), {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="vision" className="relative py-24 overflow-hidden">
      <div data-bg className="absolute inset-0 -z-10 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_20%_20%,rgba(88,231,255,0.16),transparent_60%),radial-gradient(900px_600px_at_80%_30%,rgba(170,80,255,0.14),transparent_60%),radial-gradient(900px_600px_at_45%_80%,rgba(0,255,209,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid" />
        <div className="noise" />
      </div>

      <div ref={ref} className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="font-mono text-xs tracking-[0.35em] text-white/60">VISION</div>
        </Reveal>

        <h2 data-glow className="mt-4 font-brand text-5xl sm:text-6xl leading-[1.04]">
          <span className="text-white">Cinematic products.</span>{" "}
          <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
            Investor-grade polish.
          </span>
        </h2>

        <p data-glow className="mt-6 max-w-3xl font-ui text-xl text-white/75">
          Space Gate Studio is building the next generation of digital presence—where motion, sound,
          interaction, and intelligence converge into a shareable experience.
        </p>

        <div data-glow className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7 shadow-glow">
          <div className="font-mono text-xs text-white/60">slow scroll • glow text • cinematic pacing</div>
          <div className="mt-3 font-ui text-white/75">
            The future isn’t flat. It moves. It responds. It invites users to play.
          </div>
          <button
            className="mt-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/70 hover:text-white hover:bg-white/10 transition"
            onMouseEnter={() => play("hover")}
            onClick={() => play("click")}
          >
            Engage Sequence
          </button>
        </div>
      </div>
    </section>
  );
}
