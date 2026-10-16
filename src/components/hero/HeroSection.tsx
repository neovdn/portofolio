"use client";

import React from "react";
import Link from "next/link";
import { personalInfo } from "@/data/portfolioData";
import { FrostedGlass } from "./FrostedGlass";
import { GitHubIcon, LinkedInIcon, InstagramIcon, EmailIcon } from "@/components/ui/Icons";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-24 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Introduction & Professional Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Index & Sub-headline */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#737373] tracking-widest uppercase">
              00 / INTRODUCTION
            </span>
            <div className="h-[1px] w-8 bg-[#D9D9D9]" />
          </div>

          {/* Name & Title */}
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.1]">
            {personalInfo.name}
          </h1>

          <p className="font-mono text-sm sm:text-base text-[#737373] tracking-wider uppercase mt-3">
            {personalInfo.title}
          </p>

          {/* Core Philosophy / Headline */}
          <p className="font-sans text-xl sm:text-2xl text-[#111111] font-medium leading-snug mt-8 max-w-xl">
            {personalInfo.tagline}
          </p>

          <p className="font-sans text-sm sm:text-base text-[#737373] leading-relaxed mt-4 max-w-xl">
            {personalInfo.shortBio}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#111111] text-[#F5F5F3] font-mono text-xs uppercase tracking-wider hover:bg-[#262626] transition-colors rounded-sm"
            >
              <FileText className="w-4 h-4" />
              <span>VIEW CV</span>
            </Link>

            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#EBEBE8] text-[#111111] border border-[#D9D9D9] font-mono text-xs uppercase tracking-wider hover:bg-[#DFDFDC] transition-colors rounded-sm"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>GITHUB ↗</span>
            </a>

            <a
              href="#work"
              className="inline-flex items-center gap-1.5 px-4 py-3 text-[#737373] hover:text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <span>EXPLORE WORK</span>
              <span className="text-xs">↓</span>
            </a>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center gap-6 mt-10 pt-8 border-t border-[#D9D9D9] text-xs font-mono text-[#737373]">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#111111] transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#111111] transition-colors"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#111111] transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <a
              href={personalInfo.socials.email}
              className="flex items-center gap-1.5 hover:text-[#111111] transition-colors"
            >
              <EmailIcon className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Interactive Frosted Glass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <FrostedGlass />
        </motion.div>
      </div>
    </section>
  );
}
