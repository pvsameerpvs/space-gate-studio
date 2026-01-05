"use client";

import React, { useEffect, useRef } from "react";

export function CinematicCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      document.documentElement.style.setProperty("--cursor-x", `${x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${y}px`);
      dot.current?.style.setProperty("left", `${x}px`);
      dot.current?.style.setProperty("top", `${y}px`);
    };

    const tick = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      if (ring.current) {
        ring.current.style.left = `${rx}px`;
        ring.current.style.top = `${ry}px`;
      }
      requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    requestAnimationFrame(tick);

    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring hidden md:block" />
      <div ref={dot} className="cursor-dot hidden md:block" />
    </>
  );
}
