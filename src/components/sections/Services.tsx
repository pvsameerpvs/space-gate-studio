"use client";

import React from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useSound } from "@/components/sound/SoundProvider";

const services = [
  {
    title: "Mobile App Development",
    bullets: ["iOS + Android with premium UI", "Animations, haptics, gesture-driven flows", "Fast iterations & scalable architecture"]
  },
  {
    title: "Website Development",
    bullets: ["Next.js App Router production builds", "SEO + performance budgets", "Interactive 3D & cinematic scroll"]
  },
  {
    title: "AI Features",
    bullets: ["AI copilots, chat, search & automations", "Personalized user journeys", "Analytics-driven optimization"]
  },
  {
    title: "UI/UX & Motion Design",
    bullets: ["AAA game UI aesthetics", "Micro-interactions & sound design", "Design system + component library"]
  }
];

export function Services() {
  const { play } = useSound();

  return (
    <section id="services" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="font-mono text-xs tracking-[0.35em] text-white/60">SERVICES</div>
          <h2 className="mt-3 font-brand text-4xl sm:text-5xl">Full-stack. Full-cinematic.</h2>
          <p className="mt-4 max-w-2xl font-ui text-white/75">
            We don’t just build features. We build experiences—interactive, responsive, and engineered to perform.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={0.06 * i}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                onMouseEnter={() => play("hover")}
                onClick={() => play("click")}
              >
                <Card className="group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[linear-gradient(120deg,rgba(88,231,255,0.12),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(170,80,255,0.16),transparent_55%)]" />
                  <CardContent className="relative">
                    <div className="flex items-center justify-between gap-6">
                      <div className="font-brand text-2xl">{s.title}</div>
                      <div className="h-9 w-9 rounded-full border border-white/10 bg-white/5 animate-floaty" />
                    </div>

                    <ul className="mt-4 space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 font-ui text-white/72">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_18px_rgba(0,255,209,0.35)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex gap-2">
                      {["Neon UI", "Motion", "Perf", "AI"].map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
