"use client";

import React from "react";
import Image from "next/image";
import { personalInfo } from "@/data/portfolioData";
import { GitHubIcon, LinkedInIcon, InstagramIcon, EmailIcon } from "@/components/ui/Icons";
import { FileText, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[640px] max-h-[1080px] overflow-hidden"
    >
      {/* ─── Monochromatic radial spotlight ─────────────────────────────
          Anchored to the center of the full section so it bleeds across
          all three columns — the visible "light source" behind the avatar.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {/* Outer soft halo */}
        <div className="absolute w-[140vw] h-[140vh] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.85)_0%,_rgba(245,245,243,0.4)_50%,_transparent_72%)] blur-3xl" />
        {/* Mid focused ring */}
        <div className="absolute w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,1)_0%,_rgba(230,230,228,0.75)_40%,_transparent_70%)] blur-2xl" />
        {/* Bright tight core */}
        <div className="absolute w-[30vw] h-[30vw] max-w-[420px] max-h-[420px] rounded-full bg-white blur-xl opacity-95" />
      </div>

      {/* ─── Full-viewport 3-column layout ──────────────────────────────
          The section is h-screen. We use absolute inset-0 + grid so the
          avatar column can stretch from navbar to bottom edge.
      ──────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pt-20 grid grid-cols-12 max-w-none">

        {/* ── LEFT (cols 1-4): intro content, vertically centered ─────── */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="col-span-4 flex flex-col justify-center px-10 lg:px-16 xl:px-20 pb-16 z-10"
        >
          {/* Index label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] text-[#737373] tracking-widest uppercase">
              00 / INTRODUCTION
            </span>
            <div className="h-px w-8 bg-[#D9D9D9]" />
          </div>

          {/* Name */}
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] font-bold tracking-[-0.03em] text-[#111111] leading-[1.05]">
            {personalInfo.name}
          </h1>

          {/* Title */}
          <p className="font-mono text-xs sm:text-sm text-[#737373] tracking-[0.2em] uppercase mt-3">
            {personalInfo.title}
          </p>

          {/* Tagline */}
          <p className="font-sans text-lg sm:text-xl text-[#111111] font-medium leading-snug mt-8 max-w-[340px]">
            {personalInfo.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-[#F5F5F3] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#262626] transition-all rounded-full shadow-md"
            >
              <span>EXPLORE WORK</span>
              <span>↓</span>
            </a>

            <a
              href="/documents/cv.pdf"
              download="Bernhardth_Neo_Videan_CV.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFFFFF]/90 text-[#111111] border border-[#C8C8C8] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#EBEBE8] transition-all rounded-full shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD CV</span>
            </a>
          </div>
        </motion.div>

        {/* ── CENTER (cols 5-8): avatar — tall, bottom-anchored ────────── */}
        <div className="col-span-4 relative flex items-end justify-center overflow-hidden z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.06, ease: "easeOut" }}
            className="relative w-full flex items-end justify-center"
          >
            <Image
              src="/image/avatar.webp"
              alt="Bernhardth Neo Videan — 3D character portrait"
              width={800}
              height={597}
              priority
              className="w-auto object-contain select-none pointer-events-none"
              style={{ height: "80vh", maxHeight: "820px" }}
            />
          </motion.div>
        </div>

        {/* ── RIGHT (cols 9-12): about me, bio, buttons, socials ──────── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="col-span-4 flex flex-col justify-center px-10 lg:px-14 xl:px-16 pb-16 z-10"
        >
          {/* About heading */}
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] font-bold tracking-[-0.03em] text-[#111111] leading-[1.05]">
            About Me
          </h2>

          {/* Bio — same size as tagline on left for visual balance */}
          <p className="font-sans text-base sm:text-lg text-[#555555] leading-relaxed mt-6 max-w-[360px]">
            {personalInfo.shortBio}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-[#F5F5F3] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#262626] transition-all rounded-full shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>GET IN TOUCH</span>
              <span>↓</span>
            </a>

            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFFFFF]/90 text-[#111111] border border-[#C8C8C8] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#EBEBE8] transition-all rounded-full shadow-sm"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>GITHUB ↗</span>
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5 mt-6">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/80 text-[#444444] hover:bg-[#111111] hover:text-[#F5F5F3] hover:border-[#111111] flex items-center justify-center transition-all duration-200"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/80 text-[#444444] hover:bg-[#111111] hover:text-[#F5F5F3] hover:border-[#111111] flex items-center justify-center transition-all duration-200"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/80 text-[#444444] hover:bg-[#111111] hover:text-[#F5F5F3] hover:border-[#111111] flex items-center justify-center transition-all duration-200"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.email}
              aria-label="Email"
              className="w-9 h-9 rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/80 text-[#444444] hover:bg-[#111111] hover:text-[#F5F5F3] hover:border-[#111111] flex items-center justify-center transition-all duration-200"
            >
              <EmailIcon className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* ─── Gradient fade — blends avatar feet into next section ────────
          Positioned at the very bottom of the section, z-20 so it renders
          on top of the avatar. Tall enough to fully dissolve the feet.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-20 bg-gradient-to-b from-transparent to-[#F5F5F3]"
      />
    </section>
  );
}
