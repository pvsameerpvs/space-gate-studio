"use client";

import { motion, type Variants } from "framer-motion";
import React from "react";

const variantsMap = {
  simple: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  },
  "fly-in": {
    hidden: { opacity: 0, y: 100, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1 }
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  },
  "slide-right": {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 }
  }
};

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: keyof typeof variantsMap;
}

export function Reveal({ children, delay = 0, className = "", variant = "simple" }: RevealProps) {
  const selectedVariant = variantsMap[variant];

  return (
    <motion.div
      variants={selectedVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
