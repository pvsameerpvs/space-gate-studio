"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, MotionStyle } from "framer-motion";
import Image from "next/image";

// ------------------------------------
// SVG CABLE COMPONENT
// ------------------------------------
function Cable({ start, end, color = "#a855f7", style }: { start: { x: number; y: number }, end: { x: number; y: number }, color?: string, style?: MotionStyle }) {
  if (!start || !end) return null; // Safety check

  // Calculate control points for a smooth S-curve
  const midX = (start.x + end.x) / 2;
  // const midY = (start.y + end.y) / 2; // Unused for simple S-curve horizontal bias

  // Bezier curve with 2 control points for "bundling" look
  // Flowing outwards from center (start) to card (end)
  const path = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;

  return (
    <motion.svg style={{ overflow: 'visible', ...style }} className="absolute inset-0 w-full h-full pointer-events-none z-0">
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
    </motion.svg>
  );
}

// ------------------------------------
// CARD COMPONENT
// ------------------------------------
// ForwardRef to allow parent to measure position
const TechCard = React.forwardRef<HTMLDivElement, { 
    title: string, sub: string, image: string, index: number, align?: 'left' | 'right', style?: MotionStyle
}>(({ title, sub, image, index, align = 'left', style }, ref) => {
    return (
        <motion.div
            ref={ref}
            style={style}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
            className={`
                relative w-64 md:w-80 h-40 md:h-48 rounded-xl border-2 border-neon-purple/50 bg-black/80 backdrop-blur-xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)] 
                group hover:scale-105 hover:border-neon-cyan/80 transition-all duration-300 cursor-pointer z-20
            `}
        >
             {/* Background Image */}
             <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity">
                <Image src={image} alt={title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
             </div>

             {/* Content */}
             <div className={`absolute bottom-0 w-full p-4 ${align === 'right' ? 'text-right' : 'text-left'}`}>
                <div className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest mb-1">{sub}</div>
                <div className="font-brand text-2xl text-white drop-shadow-md">{title}</div>
             </div>
             
             {/* Tech Overlays */}
             <div className={`absolute top-2 ${align === 'right' ? 'left-2' : 'right-2'} flex gap-1`}>
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-white/40 rounded-full" />)}
             </div>
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-pulse" />
        </motion.div>
    );
});
TechCard.displayName = "TechCard";

export function HeroHub() {
    const containerRef = useRef<HTMLDivElement>(null);
    const hubRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    
    // Refs for cards
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Coordinates state
    const [hubCenter, setHubCenter] = useState({ x: 0, y: 0 });
    const [cardPoints, setCardPoints] = useState<{x: number, y: number}[]>([]);

    // Measure positions function
    const measurePositions = () => {
        if (!containerRef.current || !hubRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        
        // 1. Measure Hub Center
        const hubRect = hubRef.current.getBoundingClientRect();
        const hCx = (hubRect.left - containerRect.left) + hubRect.width / 2;
        const hCy = (hubRect.top - containerRect.top) + hubRect.height / 2;
        setHubCenter({ x: hCx, y: hCy });

        // 2. Measure Card "Connection Points" (Centers of inner edge?)
        // Actually simplest is center of card for now, or inner edge.
        const points = cardRefs.current.map((card, i) => {
            if (!card) return { x: 0, y: 0 };
            const rect = card.getBoundingClientRect();
            // Calculate center relative to container
            const cx = (rect.left - containerRect.left) + rect.width / 2;
            const cy = (rect.top - containerRect.top) + rect.height / 2;
            return { x: cx, y: cy }; 
        });
        setCardPoints(points);
    };

    // Update on resize or mount
    useEffect(() => {
        measurePositions();
        window.addEventListener('resize', measurePositions);
        // Small delay to allow layout to settle
        const t = setTimeout(measurePositions, 500); 
        return () => {
            window.removeEventListener('resize', measurePositions);
            clearTimeout(t);
        };
    }, []);

    // Scroll Animations
    // Scroll Animations
    // Calculate deltas from cards to hub center
    // Reduced range [0, 250] for faster animation ("less scroll time")
    const scrollRange = [0, 250];
    
    // Cables fade out quickly
    const cableOpacity = useTransform(scrollY, [0, 100], [1, 0]);

    const x0 = useTransform(scrollY, scrollRange, [0, (hubCenter.x - (cardPoints[0]?.x || 0))]);
    const y0 = useTransform(scrollY, scrollRange, [0, (hubCenter.y - (cardPoints[0]?.y || 0))]);

    const x1 = useTransform(scrollY, scrollRange, [0, (hubCenter.x - (cardPoints[1]?.x || 0))]);
    const y1 = useTransform(scrollY, scrollRange, [0, (hubCenter.y - (cardPoints[1]?.y || 0))]);

    const x2 = useTransform(scrollY, scrollRange, [0, (hubCenter.x - (cardPoints[2]?.x || 0))]);
    const y2 = useTransform(scrollY, scrollRange, [0, (hubCenter.y - (cardPoints[2]?.y || 0))]);

    const x3 = useTransform(scrollY, scrollRange, [0, (hubCenter.x - (cardPoints[3]?.x || 0))]);
    const y3 = useTransform(scrollY, scrollRange, [0, (hubCenter.y - (cardPoints[3]?.y || 0))]);

    const hubOpacity = useTransform(scrollY, [0, 150], [1, 0]);
    const hubScale = useTransform(scrollY, [0, 150], [1, 0.5]);
    const hubDisplay = useTransform(scrollY, (v) => v > 250 ? "none" : "flex");

  return (
    <div ref={containerRef} className="relative w-full h-full z-20 flex flex-col justify-between p-4 md:p-12 lg:p-20 py-24">
        
        {/* SVG Layer for Cables - Absolute behind everything */}
        <div className="absolute inset-0 pointer-events-none z-0">
             {cardPoints.map((end, i) => (
                 <Cable 
                    key={i} 
                    start={hubCenter} 
                    end={end} 
                    color={i % 2 === 0 ? "#00e5ff" : "#d500f9"} 
                    style={{ opacity: cableOpacity }}
                />
             ))}
        </div>

        {/* TOP ROW: Cards 0 and 1 */}
        <div className="flex justify-between items-start w-full z-20">
             <TechCard 
                ref={el => { cardRefs.current[0] = el; }}
                index={0}
                title="AI AGENTS"
                sub="AUTONOMOUS SYSTEMS"
                image="/images/ai-lab.png"
                align="left"
                style={{ x: x0, y: y0, zIndex: 50 }}
            />
             <TechCard 
                ref={el => { cardRefs.current[1] = el; }}
                index={1}
                title="NEURAL NETS"
                sub="DEEP LEARNING"
                image="/images/tech-bg.png"
                align="right"
                style={{ x: x1, y: y1, zIndex: 50 }}
            />
        </div>

        {/* MIDDLE ROW: Central Hub */}
        <div className="flex justify-center items-center flex-grow z-30">
            <motion.div 
                ref={hubRef}
                style={{ opacity: hubOpacity, scale: hubScale, display: hubDisplay }}
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

        {/* BOTTOM ROW: Cards 2 and 3 */}
        <div className="flex justify-between items-end w-full z-20">
            <TechCard 
                ref={el => { cardRefs.current[2] = el; }}
                index={2}
                title="SPATIAL UI"
                sub="IMMERSIVE COMPUTING"
                image="/images/hero-bg-cinematic.png"
                align="left"
                style={{ x: x2, y: y2, zIndex: 50 }}
            />
             <TechCard 
                ref={el => { cardRefs.current[3] = el; }}
                index={3}
                title="PREDICTIVE UX"
                sub="ADAPTIVE INTERFACES"
                image="/images/ai-lab-walkthrough.png"
                align="right"
                style={{ x: x3, y: y3, zIndex: 50 }}
            />
        </div>

    </div>
  );
}
