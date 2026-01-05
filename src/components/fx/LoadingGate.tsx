"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export function LoadingGate() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -inset-10 rounded-full blur-3xl bg-gradient-to-r from-[rgba(88,231,255,0.22)] via-[rgba(170,80,255,0.16)] to-[rgba(0,255,209,0.12)]" />
            <motion.div
              className="relative rounded-3xl border border-white/10 bg-white/5 px-8 py-7 backdrop-blur-xl shadow-glow overflow-hidden"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-center">
                <div className="font-brand text-2xl tracking-wide">SPACE GATE</div>
                <div className="mt-1 font-mono text-xs text-white/60">booting cinematic UI</div>
              </div>
              <div className="mt-5 h-2 w-72 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full w-1/2 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple"
                  animate={{ x: ["-60%", "160%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <div className="scanline" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
