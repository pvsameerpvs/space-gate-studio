"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import { useSound } from "@/components/sound/SoundProvider";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { play } = useSound();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => play("whoosh", { volume: 0.16 })}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
