"use client";

import { motion } from "framer-motion";
import React from "react";

interface GravityTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function GravityText({ text, className = "", delay = 0 }: GravityTextProps) {
  const characters = text.split("");

  return (
    <span className={`inline-block whitespace-pre ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ 
            opacity: 0, 
            y: -150, 
            filter: "blur(15px)",
            scale: 1.5,
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: delay + index * 0.08, // Sequential flowing delay
            type: "spring",
            damping: 18,
            stiffness: 80,
            mass: 1.2
          }}
          className="inline-block origin-bottom"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
