"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function FluidCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for "fluid" feel
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleHover = (e: MouseEvent) => {
        if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
            setIsHovering(true);
        } else {
            setIsHovering(false);
        }
    }

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-neon-cyan pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(0, 229, 255, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      {/* Trailing Dot */}
      <motion.div
         className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-purple pointer-events-none z-[9999]"
         style={{
            x: cursorX, // Direct tracking for "leader"
            y: cursorY,
            translateX: 12, // Center offset
            translateY: 12
         }}
      />
    </>
  );
}
