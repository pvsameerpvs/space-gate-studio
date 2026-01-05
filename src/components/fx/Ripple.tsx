"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export function Ripple({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  return (
    <span
      ref={ref}
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden rounded-[inherit]", className)}
      onPointerDown={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const d = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - d / 2;
        const y = e.clientY - rect.top - d / 2;

        const ripple = document.createElement("span");
        ripple.style.position = "absolute";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = `${d}px`;
        ripple.style.height = `${d}px`;
        ripple.style.borderRadius = "999px";
        ripple.style.background = "radial-gradient(circle, rgba(88,231,255,0.35), transparent 60%)";
        ripple.style.transform = "scale(0.2)";
        ripple.style.opacity = "0.9";
        ripple.style.transition = "transform 600ms ease, opacity 700ms ease";
        el.appendChild(ripple);

        requestAnimationFrame(() => {
          ripple.style.transform = "scale(1.15)";
          ripple.style.opacity = "0";
        });
        setTimeout(() => ripple.remove(), 750);
      }}
    />
  );
}
