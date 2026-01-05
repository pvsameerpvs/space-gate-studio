"use client";

import { motion } from "framer-motion";
import React from "react";

export function CinematicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-[#03040B]">
      {/* Base Gradient */}
      {/* Base Cinematic Video */}
      <div className="absolute inset-0 opacity-100">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/images/hero-vid.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Overlay Gradient for depth - reduced opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03040B]/80 via-[#03040B]/40 to-[#03040B]" />

      {/* Moving Stars / Dust */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/noise.png')", 
          backgroundSize: "200px 200px"
        }}
        animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
        }}
        transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
        }}
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* Floating Nebula Orbs */}
      <motion.div 
        className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vh] rounded-full bg-violet-600/10 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vh] rounded-full bg-blue-600/10 blur-[120px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
