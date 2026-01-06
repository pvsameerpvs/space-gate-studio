"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ------------------------------------
// SVG CABLE COMPONENT
// ------------------------------------
function Cable({ start, end, color = "#a855f7" }: { start: { x: number; y: number }, end: { x: number; y: number }, color?: string }) {
  // Calculate control points for a smooth S-curve
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  
  // Bezier curve with 2 control points for "bundling" look
  const path = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
      {/* Outer Glow */}
      <path d={path} fill="none" stroke={color} strokeWidth="6" strokeOpacity="0.2" className="blur-sm" />
      {/* Core Line */}
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.8" />
      {/* Animated Flow */}
      <motion.path
        d={path}
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="10 100"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -200 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="opacity-60"
      />
    </svg>
  );
}

// ------------------------------------
// CARD COMPONENT
// ------------------------------------
function TechCard({ 
    title, sub, image, position, index 
}: { 
    title: string, sub: string, image: string, position: string, index: number 
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
            className={`absolute ${position} w-64 md:w-80 h-40 md:h-48 rounded-xl border-2 border-neon-purple/50 bg-black/80 backdrop-blur-xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)] group hover:scale-105 hover:border-neon-cyan/80 transition-all duration-300 cursor-pointer z-20`}
        >
             {/* Background Image */}
             <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity">
                <Image src={image} alt={title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
             </div>

             {/* Content */}
             <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest mb-1">{sub}</div>
                <div className="font-brand text-2xl text-white drop-shadow-md">{title}</div>
             </div>
             
             {/* Tech Overlays */}
             <div className="absolute top-2 right-2 flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-white/40 rounded-full" />)}
             </div>
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-pulse" />
        </motion.div>
    );
}

export function HeroHub() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [center, setCenter] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

    // Update positions on resize
    useEffect(() => {
        const update = () => {
             if (containerRef.current) {
                 const rect = containerRef.current.getBoundingClientRect();
                 setCenter({ x: rect.width / 2, y: rect.height / 2 });
                 setDimensions({ w: rect.width, h: rect.height });
             }
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // Dynamic Connection Points based on % of screen
    const cx = center.x;
    const cy = center.y;
    // Offsets for the cards (approximate centers of the cards)
    // Top Left, Top Right, Bottom Left, Bottom Right
    const connections = [
        { x: cx - (dimensions.w > 768 ? 350 : 160), y: cy - (dimensions.h > 768 ? 200 : 150) },
        { x: cx + (dimensions.w > 768 ? 350 : 160), y: cy - (dimensions.h > 768 ? 200 : 150) },
        { x: cx - (dimensions.w > 768 ? 350 : 160), y: cy + (dimensions.h > 768 ? 200 : 150) },
        { x: cx + (dimensions.w > 768 ? 350 : 160), y: cy + (dimensions.h > 768 ? 200 : 150) },
    ];

  return (
    <div ref={containerRef} className="relative w-full h-full z-20">
        
        {/* SVG Layer for Cables */}
        {connections.map((end, i) => (
             <Cable key={i} start={center} end={end} color={i % 2 === 0 ? "#00e5ff" : "#d500f9"} />
        ))}

        {/* Central Logo Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative w-40 h-40 md:w-56 md:h-56 rounded-3xl bg-black/40 backdrop-blur-2xl border-2 border-white/20 shadow-[0_0_50px_rgba(41,121,255,0.3)] flex items-center justify-center group"
            >
                {/* Logo Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-50 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 blur-xl group-hover:opacity-80 transition-opacity" />
                
                <Image 
                    src="/logo.png" 
                    alt="Space Gate Studio" 
                    width={180} 
                    height={180} 
                    className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10"
                />

                {/* Rotating Border Ring */}
                <div className="absolute -inset-1 rounded-3xl border border-dashed border-white/30 animate-[spin_10s_linear_infinite]" />
            </motion.div>
        </div>

        {/* Corner Content Cards */}
        {/* 1. Top Left */}
        <TechCard 
            index={0}
            position="top-[10%] left-[5%] md:top-[20%] md:left-[10%]"
            title="AI AGENTS"
            sub="AUTONOMOUS SYSTEMS"
            image="/images/ai-lab.png"
        />

        {/* 2. Top Right */}
        <TechCard 
            index={1}
            position="top-[10%] right-[5%] md:top-[20%] md:right-[10%]"
            title="NEURAL NETS"
            sub="DEEP LEARNING"
            image="/images/tech-bg.png"
        />

        {/* 3. Bottom Left */}
        <TechCard 
            index={2}
            position="bottom-[10%] left-[5%] md:bottom-[20%] md:left-[10%]"
            title="SPATIAL UI"
            sub="IMMERSIVE COMPUTING"
            image="/images/hero-bg-cinematic.png"
        />

        {/* 4. Bottom Right */}
         <TechCard 
            index={3}
            position="bottom-[10%] right-[5%] md:bottom-[20%] md:right-[10%]"
            title="PREDICTIVE UX"
            sub="ADAPTIVE INTERFACES"
            image="/images/ai-lab-walkthrough.png"
        />

    </div>
  );
}
