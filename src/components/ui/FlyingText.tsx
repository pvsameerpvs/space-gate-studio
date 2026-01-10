"use client";

import React from "react";
import { motion } from "framer-motion";

interface FlyingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function FlyingText({ text, className = "", delay = 0 }: FlyingTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, i) => (
        <div key={i} className="flex whitespace-nowrap mr-2 lg:mr-4">
          {word.split("").map((char, index) => (
            <motion.span
              key={`${i}-${index}`}
              custom={index + (i * 5)} // rough index for diversity
              variants={{
                hidden: () => ({
                  opacity: 0,
                  x: (Math.random() - 0.5) * 500, // Random X between -250 and 250
                  y: (Math.random() - 0.5) * 500, // Random Y between -250 and 250
                  z: (Math.random() - 0.5) * 500, // Random Z depth
                  rotate: Math.random() * 360,     // Random rotation
                  scale: Math.random() * 2 + 0.5,  // Random scale
                  filter: "blur(10px)"
                }),
                visible: () => ({
                  opacity: 1,
                  x: 0,
                  y: 0,
                  z: 0,
                  rotate: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                    duration: 0.8,
                    delay: delay + Math.random() * 0.5 // Random delay for "swarming" effect
                  }
                })
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.span>
  );
}
