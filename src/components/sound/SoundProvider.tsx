"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Howl } from "howler";

type SoundName = "hover" | "click" | "whoosh" | "enter";

type SoundCtx = {
  muted: boolean;
  toggleMuted: () => void;
  play: (name: SoundName, opts?: { volume?: number }) => void;
};

const Ctx = createContext<SoundCtx | null>(null);

const base = (src: string, volume: number) =>
  new Howl({ src: [src], volume, preload: true });

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);

  // Instantiate once (client)
  const sounds = useMemo(() => {
    return {
      hover: base("/sounds/hover.wav", 0.22),
      click: base("/sounds/click.wav", 0.26),
      whoosh: base("/sounds/whoosh.wav", 0.18),
      enter: base("/sounds/enter.wav", 0.14),
    };
  }, []);

  const toggleMuted = useCallback(() => setMuted((m) => !m), []);

  const play = useCallback(
    (name: SoundName, opts?: { volume?: number }) => {
      if (muted) return;
      const s = sounds[name];
      if (!s) return;
      if (typeof opts?.volume === "number") s.volume(opts.volume);
      s.play();
    },
    [muted, sounds]
  );

  const value = useMemo(() => ({ muted, toggleMuted, play }), [muted, toggleMuted, play]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSound() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
