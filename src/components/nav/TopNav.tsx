"use client";

import React from "react";
import { SoundToggle } from "@/components/sound/SoundToggle";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/fx/Magnetic";
import { Ripple } from "@/components/fx/Ripple";
import { useSound } from "@/components/sound/SoundProvider";

const links = [
  { id: "who-we-are", label: "Who We Are" },
  { id: "different", label: "Different" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "vision", label: "Vision" }
];

export function TopNav() {
  const { play } = useSound();

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl shadow-glow"
          onMouseEnter={() => play("hover")}
        >
          <span className="font-brand tracking-wide">Space Gate</span>
          <span className="font-mono text-[11px] text-white/60 group-hover:text-white/80 transition">studio</span>
        </a>

        <div className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <a
              key={l.id}
              href={`/${l.id}`}
              className="rounded-full px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition"
              onMouseEnter={() => play("hover")}
              onClick={() => play("click")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SoundToggle />
          <Magnetic>
            <Button
              size="sm"
              className="overflow-hidden"
              onMouseEnter={() => play("hover")}
              onClick={() => {
                play("click");
                document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10">Launch</span>
              <Ripple />
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition" />
            </Button>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
