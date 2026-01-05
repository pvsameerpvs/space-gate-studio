"use client";

import React, { useState } from "react";
import { SoundToggle } from "@/components/sound/SoundToggle";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/fx/Magnetic";
import { Ripple } from "@/components/fx/Ripple";
import { useSound } from "@/components/sound/SoundProvider";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const links = [
  { id: "who-we-are", label: "Who We Are" },
  { id: "different", label: "Different" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "vision", label: "Vision" }
];

export function TopNav() {
  const { play } = useSound();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo Section */}
          <a
            href="#top"
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl shadow-glow transition-all hover:bg-white/10"
            onMouseEnter={() => play("hover")}
            onClick={() => setIsOpen(false)}
          >
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
               <Image 
                 src="/logo.png" 
                 alt="Space Gate" 
                 fill
                 className="object-cover"
               />
            </div>
            <span className="font-brand tracking-wide text-white group-hover:text-neon-cyan transition-colors">Space Gate</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((l) => (
              <a
                key={l.id}
                href={`/${l.id}`}
                className="rounded-full px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition"
                onMouseEnter={() => play("hover")}
                onClick={() => play("click")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <SoundToggle />
            
            <div className="hidden md:block">
              <Magnetic>
                <Button
                  size="sm"
                  className="overflow-hidden bg-white text-black hover:bg-neon-cyan hover:text-black transition-colors"
                  onMouseEnter={() => play("hover")}
                  onClick={() => {
                    play("click");
                    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="relative z-10 font-bold">Launch</span>
                  <Ripple />
                </Button>
              </Magnetic>
            </div>

            {/* Mobile Menu Trigger */}
            <button 
              className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              onClick={() => {
                play("click");
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-[#03040B]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl p-8 pt-24"
          >
            <div className="flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`/${l.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  className="text-2xl font-brand text-white/80 hover:text-neon-cyan transition-colors"
                  onClick={() => {
                    play("click");
                    setIsOpen(false);
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Button
                  className="w-full h-12 bg-neon-cyan text-black font-bold text-lg rounded-full hover:bg-white transition-colors"
                  onClick={() => {
                    play("click");
                    setIsOpen(false);
                    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  INITIATE PROJECT
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
