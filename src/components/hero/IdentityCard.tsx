"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { Sparkles, Terminal } from "lucide-react";

export function IdentityCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to dampen movement naturally
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform to subtle rotation angles (max 8 degrees)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);

  // Dynamic glare coordinates
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative flex items-center justify-center p-4 sm:p-8 perspective-1000 select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive 3D Card Surface */}
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-xl bg-[#FFFFFF] border border-[#D9D9D9] p-6 sm:p-7 shadow-xl transition-shadow duration-300"
      >
        {/* Subtle Light Glare Layer */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%)`,
          }}
        />

        {/* Card Header: Brand & Identity Meta */}
        <div className="flex items-center justify-between pb-5 border-b border-[#D9D9D9]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111111]" />
            <span className="font-mono text-xs font-semibold tracking-wider text-[#111111]">
              NV // IDENT
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#737373]">
            <Terminal className="w-3 h-3 text-[#111111]" />
            <span>2026.08</span>
          </div>
        </div>

        {/* Portrait Photograph / Visual Centerpiece */}
        <div className="mt-5 relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#D9D9D9] bg-[#1C1C1C]">
          <Image
            src="/profile/avatar.svg"
            alt={personalInfo.name}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Status Overlay */}
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#111111]/80 backdrop-blur-sm border border-[#333333] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] font-mono text-[#F5F5F3] font-medium">
              FULL-STACK &amp; AI
            </span>
          </div>
        </div>

        {/* Identity Details */}
        <div className="mt-5 space-y-3">
          <div>
            <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-[#111111]">
              {personalInfo.name}
            </h3>
            <p className="font-mono text-xs text-[#737373] uppercase tracking-wider mt-0.5">
              {personalInfo.title}
            </p>
          </div>

          <div className="pt-3 border-t border-[#EBEBE8] grid grid-cols-2 gap-3 text-[11px] font-mono">
            <div>
              <span className="text-[#737373] block text-[10px]">FOCUS</span>
              <span className="text-[#111111] font-medium">Web / Mobile / AI</span>
            </div>
            <div>
              <span className="text-[#737373] block text-[10px]">STUDIO</span>
              <span className="text-[#111111] font-medium">CodeVela</span>
            </div>
          </div>
        </div>

        {/* Card Footer Micro Bar */}
        <div className="mt-5 pt-3 border-t border-[#D9D9D9] flex items-center justify-between text-[10px] font-mono text-[#737373]">
          <span>LOC: INDONESIA (GMT+7)</span>
          <span className="flex items-center gap-1 text-[#111111]">
            <Sparkles className="w-3 h-3 text-[#111111]" />
            CRAFTED
          </span>
        </div>
      </motion.div>
    </div>
  );
}
