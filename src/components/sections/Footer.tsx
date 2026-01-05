"use client";

import React from "react";
import { useSound } from "@/components/sound/SoundProvider";

export function Footer() {
  const { play } = useSound();
  return (
    <footer className="py-12">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-brand text-2xl">Space Gate Studio</div>
          <div className="mt-2 font-mono text-xs text-white/55">Dubai • AI • Motion • Sound • 3D</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Privacy", "Terms", "Careers"].map((t) => (
            <a
              key={t}
              href="#"
              onMouseEnter={() => play("hover")}
              onClick={(e) => { e.preventDefault(); play("click"); }}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/65 hover:text-white hover:bg-white/10 transition"
            >
              {t}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
