"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSound } from "./SoundProvider";

export function SoundToggle() {
  const { muted, toggleMuted, play } = useSound();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10"
      onClick={() => {
        toggleMuted();
        play("click", { volume: 0.22 });
      }}
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      title={muted ? "Unmute sounds" : "Mute sounds"}
    >
      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      <span className="hidden sm:inline">{muted ? "Muted" : "Sound"}</span>
    </Button>
  );
}
