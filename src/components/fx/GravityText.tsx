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
            y: -100, 
            filter: "blur(12px)",
            transform: "rotate(15deg)"
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            transform: "rotate(0deg)"
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: delay + Math.random() * 0.5, // Random stagger for "sand" chaotic feel
            ease: [0.19, 1, 0.22, 1] // Exponential ease out
          }}
          className="inline-block origin-top"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
