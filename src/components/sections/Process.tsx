"use client";

import React, { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { useSound } from "@/components/sound/SoundProvider";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { title: "Idea & Strategy", desc: "Define the mission, audience, and viral loops." },
  { title: "Design & Animation", desc: "Cinematic UI, motion system, micro-interactions." },
  { title: "AI & Development", desc: "Build the product core with scalable architecture." },
  { title: "Testing & Optimization", desc: "Performance budgets, device testing, polish." },
  { title: "Launch & Growth", desc: "Deploy, iterate, amplify—measure what matters." }
];

export function Process() {
  const { play } = useSound();
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const el = lineRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 55%",
            scrub: true
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="font-mono text-xs tracking-[0.35em] text-white/60">PROCESS</div>
          <h2 className="mt-3 font-brand text-4xl sm:text-5xl">A timeline that ships.</h2>
          <p className="mt-4 max-w-2xl font-ui text-white/75">
            Scroll-triggered, cinematic, and engineered—because the process should feel as premium as the result.
          </p>
        </Reveal>

        <div className="relative mt-12 grid grid-cols-1 md:grid-cols-[1fr_24px_1fr] gap-4">
          <div className="hidden md:block" />
          <div className="relative hidden md:block">
            <div ref={lineRef} className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-neon-cyan via-purple-500 to-neon-purple opacity-70 shadow-[0_0_15px_rgba(88,231,255,0.5)]" />
          </div>
          <div className="hidden md:block" />

          {steps.map((s, i) => (
            <React.Fragment key={s.title}>
              <div className={i % 2 === 0 ? "" : "md:col-start-3"}>
                <Reveal delay={0.05 * i}>
                  <Card
                    className="group hover:border-neon-cyan/50 transition-colors duration-500"
                    onMouseEnter={() => play("hover")}
                    onClick={() => play("click")}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,209,0.14),transparent_60%)]" />
                    <CardContent className="relative">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center font-mono text-xs text-white/70 group-hover:text-neon-cyan group-hover:border-neon-cyan transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="font-brand text-2xl group-hover:text-neon-cyan transition-colors">{s.title}</div>
                      </div>
                      <div className="mt-2 font-ui text-white/70">{s.desc}</div>
                    </CardContent>
                  </Card>
                </Reveal>
              </div>

              <div className="relative hidden md:flex items-start justify-center">
                <div className="mt-5 h-4 w-4 rounded-full bg-neon-cyan shadow-[0_0_30px_rgba(0,255,209,0.8)] z-10 animate-pulse" />
              </div>

              <div className={i % 2 === 0 ? "md:col-start-3" : ""} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
