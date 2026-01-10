"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

export function KineticText({ text, className = "" }: { text: string; className?: string }) {
  // Split text into words and characters
  const words = text.split(" ");
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      rotate: 10,
    },
    hover: {
        scale: 1.2,
        rotate: [0, -10, 10, 0],
        color: "#00e5ff",
        textShadow: "0 0 8px rgb(0, 229, 255)",
        transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <div key={i} className="flex">
          {word.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={child}
              whileHover="hover"
              className="inline-block cursor-default"
            >
              {char}
            </motion.span>
          ))}
          {/* Add space after word unless it's the last one */}
          {i !== words.length - 1 && <span className="w-2 md:w-4 inline-block">&nbsp;</span>}
        </div>
      ))}
    </motion.div>
  );
}
