"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Project } from "@/types";
import { ChevronLeft, ChevronRight, ArrowUpRight, Globe, Lock, Layers } from "lucide-react";
import { GitHubIcon } from "@/components/ui/Icons";

interface ProjectDeckSliderProps {
  projects: Project[];
}

export function ProjectDeckSlider({ projects }: ProjectDeckSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeProject = projects[currentIndex];
  const images =
    activeProject.images && activeProject.images.length > 0
      ? activeProject.images
      : [activeProject.coverImage];

  // Reset preview image to 0 when project changes
  const [prevIndex, setPrevIndex] = useState(currentIndex);
  if (prevIndex !== currentIndex) {
    setPrevIndex(currentIndex);
    setCurrentImageIndex(0);
  }

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length, currentIndex]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const goToProject = useCallback(
    (idx: number) => {
      if (idx === currentIndex) return;
      setDirection(idx > currentIndex ? 1 : -1);
      setCurrentIndex(idx);
    },
    [currentIndex]
  );

  // Keyboard navigation when focused on slider
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Next projects for the stacked deck visual illusion
  const nextProject1 = projects[(currentIndex + 1) % projects.length];

  // Helper to format real full URL with https://
  const getFullDisplayUrl = (url?: string) => {
    if (!url) return "";
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  const primaryUrl = activeProject.liveUrl || activeProject.githubUrl;
  const isLiveDemo = Boolean(activeProject.liveUrl);
  const formattedUrl = getFullDisplayUrl(primaryUrl);

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.985,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  return (
    <div
      ref={sliderRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Featured projects card deck. Use left and right arrow keys to navigate."
      className="outline-hidden focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-4 rounded-2xl transition-all"
    >
      {/* Top Project Selector Tabs & Counter */}
      <div className="mb-4 sm:mb-5 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full no-scrollbar">
          {projects.map((p, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={p.id}
                onClick={() => goToProject(idx)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs transition-all whitespace-nowrap border shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#0A0A0A] text-[#FFFFFF] border-[#0A0A0A] font-bold shadow-xs"
                    : "bg-[#FFFFFF] text-[#525252] border-[#D9D9D9] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
                }`}
                aria-label={`Select project ${p.number}: ${p.title}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className={isActive ? "text-[#FFFFFF]" : "text-[#0A0A0A] font-bold"}>
                  {p.number}
                </span>
                <span className="hidden md:inline font-sans font-semibold text-xs">
                  {p.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Counter and Mini-Deck Indicator */}
        <div className="flex items-center gap-2.5 ml-auto shrink-0 font-mono text-xs">
          <div className="flex items-center gap-1.5 text-[#0A0A0A] bg-[#FFFFFF] px-2.5 py-1 rounded-md border border-[#D9D9D9] font-bold">
            <span>{activeProject.number}</span>
            <span className="text-[#888888]">/</span>
            <span className="text-[#666666]">0{projects.length}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#0A0A0A] bg-[#FFFFFF] px-2 py-1 rounded-md border border-[#D9D9D9] font-semibold">
            <Layers className="w-3.5 h-3.5 text-[#0A0A0A]" />
            <span>DECK</span>
          </div>
        </div>
      </div>

      {/* Main Deck Container with Flanking Navigation Arrows and Stacked Layers */}
      <div className="relative px-2 sm:px-4 lg:px-6 pb-6 sm:pb-8">
        {/* Left Flanking Arrow */}
        <button
          onClick={handlePrev}
          className="absolute -left-2 sm:-left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFFFFF] border-2 border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FFFFFF] transition-all shadow-md flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0A0A0A]"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.4} />
        </button>

        {/* Right Flanking Arrow */}
        <button
          onClick={handleNext}
          className="absolute -right-2 sm:-right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFFFFF] border-2 border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FFFFFF] transition-all shadow-md flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0A0A0A]"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.4} />
        </button>

        {/* Stack Layer 2: Deepest card silhouette */}
        <div
          aria-hidden="true"
          className="absolute inset-x-5 sm:inset-x-8 top-4 sm:top-5 -bottom-4 sm:-bottom-5 bg-[#EFEFEA] border border-[#D9D9D9] rounded-2xl -z-20 transition-all duration-300 opacity-60 shadow-xs"
        />

        {/* Stack Layer 1: Middle card silhouette with peek */}
        <button
          onClick={handleNext}
          type="button"
          aria-label={`Advance to next project in deck: ${nextProject1.title}`}
          className="absolute inset-x-3 sm:inset-x-6 top-2 sm:top-2.5 -bottom-2 sm:-bottom-3 bg-[#FBFBFA] border border-[#CCCCCC] hover:border-[#0A0A0A] rounded-2xl -z-10 transition-all duration-300 shadow-xs flex items-end justify-between px-6 pb-1 text-[11px] font-mono text-[#525252] hover:text-[#0A0A0A] cursor-pointer group/peek"
        >
          <span className="hidden sm:inline-flex items-center gap-1.5 font-medium">
            <span className="text-[#888888]">UP NEXT:</span>
            <span className="text-[#0A0A0A] font-bold">{nextProject1.title}</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 font-bold text-[#0A0A0A]">
            <span>{nextProject1.number} / 0{projects.length}</span>
            <span className="group-hover/peek:translate-x-0.5 transition-transform">→</span>
          </span>
        </button>

        {/* Layer 0: Active Foreground Card (Horizontal Split Layout on Desktop) */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            key={activeProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative border-2 border-[#111111]/30 hover:border-[#0A0A0A] bg-[#FFFFFF] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm flex flex-col lg:flex-row items-stretch"
          >
            {/* LEFT COLUMN: Browser Mockup with Real Address Bar and Image (57% width on desktop) */}
            <div className="w-full lg:w-[57%] border-b lg:border-b-0 lg:border-r border-[#E0E0DC] flex flex-col bg-[#F8F8F6]">
              {/* Browser Omnibar Header with https:// address and deep black styling */}
              <div className="bg-[#FFFFFF] border-b border-[#E0E0DC] px-3.5 py-2.5 flex items-center justify-between gap-2.5 select-none">
                {/* 3 Window Control Dots */}
                <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E2] border border-[#B5B5B2]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E2] border border-[#B5B5B2]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E2] border border-[#B5B5B2]" />
                </div>

                {/* URL Omnibar Pill with Real https:// and Deep Black styling */}
                {primaryUrl ? (
                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-between gap-2 px-3 py-1 bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-[#CCCCCC] hover:border-[#0A0A0A] rounded-md text-xs font-mono transition-all group/url focus-visible:ring-2 focus-visible:ring-[#0A0A0A] min-w-0"
                    title={`Open ${isLiveDemo ? "Live Demo" : "Repository"}: ${formattedUrl}`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      {isLiveDemo ? (
                        <Globe className="w-3.5 h-3.5 text-[#0A0A0A] shrink-0" />
                      ) : (
                        <GitHubIcon className="w-3.5 h-3.5 text-[#0A0A0A] shrink-0" />
                      )}
                      <span className="truncate font-bold text-[#000000]">
                        {formattedUrl}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0A0A0A] text-[#FFFFFF] uppercase font-mono tracking-wider font-bold">
                        {isLiveDemo ? "LIVE" : "SOURCE"}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#0A0A0A] transition-transform group-hover/url:translate-x-0.5 group-hover/url:-translate-y-0.5" />
                    </div>
                  </a>
                ) : (
                  <div className="flex-1 flex items-center gap-2 px-3 py-1 bg-[#F5F5F3] border border-[#D9D9D9] rounded-md text-xs font-mono text-[#525252]">
                    <Lock className="w-3.5 h-3.5 text-[#0A0A0A]" />
                    <span className="truncate font-semibold">internal / private deployment</span>
                  </div>
                )}

                {/* Auxiliary Repo link if project has BOTH live demo and GitHub */}
                {activeProject.liveUrl && activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-[#CCCCCC] hover:border-[#0A0A0A] rounded-md text-[11px] font-mono text-[#0A0A0A] font-bold transition-all shrink-0"
                    title="View GitHub Repository"
                  >
                    <GitHubIcon className="w-3 h-3 text-[#0A0A0A]" />
                    <span>REPO</span>
                  </a>
                )}
              </div>

              {/* Visual Image Showcase Container */}
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full aspect-[16/10] sm:aspect-[16/10] bg-[#EBEBE8] editorial-grid overflow-hidden flex items-center justify-center p-3 sm:p-5 flex-1 min-h-[220px]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeProject.id}-${currentImageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt={`${activeProject.title} - Preview ${currentImageIndex + 1}`}
                      fill
                      className="object-contain drop-shadow-sm rounded"
                      sizes="(max-width: 1024px) 100vw, 650px"
                      priority={currentIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Multi-image indicators and arrows */}
                {images.length > 1 && (
                  <>
                    <div
                      className={`absolute inset-y-0 left-2.5 flex items-center z-10 transition-opacity duration-200 ${
                        isHovered ? "opacity-100" : "opacity-0 sm:opacity-60"
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentImageIndex(
                            (prev) => (prev - 1 + images.length) % images.length
                          );
                        }}
                        className="p-1.5 rounded-full bg-[#0A0A0A]/90 text-[#FFFFFF] hover:bg-[#0A0A0A] transition-colors shadow-sm cursor-pointer"
                        aria-label="Previous preview image"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div
                      className={`absolute inset-y-0 right-2.5 flex items-center z-10 transition-opacity duration-200 ${
                        isHovered ? "opacity-100" : "opacity-0 sm:opacity-60"
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => (prev + 1) % images.length);
                        }}
                        className="p-1.5 rounded-full bg-[#0A0A0A]/90 text-[#FFFFFF] hover:bg-[#0A0A0A] transition-colors shadow-sm cursor-pointer"
                        aria-label="Next preview image"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Image slide dots */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A0A0A]/85 backdrop-blur-xs border border-white/20 z-10">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCurrentImageIndex(i);
                          }}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            i === currentImageIndex
                              ? "bg-white w-4"
                              : "bg-white/40 hover:bg-white/70 w-1.5"
                          }`}
                          aria-label={`Show preview image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Project Metadata, Description & Actions (43% width on desktop) */}
            <div className="w-full lg:w-[43%] p-6 sm:p-7 lg:p-8 flex flex-col justify-between gap-5 bg-[#FFFFFF]">
              {/* Top Header & Title */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#EBEBE8] pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#FFFFFF] bg-[#0A0A0A] px-2 py-0.5 rounded">
                      {activeProject.number}
                    </span>
                    <span className="font-mono text-xs text-[#0A0A0A] font-bold uppercase tracking-wider">
                      {activeProject.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#333333]">
                    {activeProject.year}
                  </span>
                </div>

                <div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A0A0A] leading-tight">
                    {activeProject.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-[#222222] font-semibold mt-1">
                    {activeProject.subtitle}
                  </p>
                </div>

                <p className="font-sans text-sm text-[#262626] leading-relaxed line-clamp-3 sm:line-clamp-4">
                  {activeProject.description}
                </p>
              </div>

              {/* Bottom: Tech Stack & CTA */}
              <div className="space-y-4 pt-3 border-t border-[#EBEBE8]">
                {/* Tech Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeProject.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 font-mono text-[11px] font-semibold bg-[#F5F5F3] text-[#0A0A0A] border border-[#D0D0CD] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {activeProject.technologies.length > 5 && (
                    <span className="font-mono text-[10px] font-bold text-[#525252] px-1">
                      +{activeProject.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5">
                  <Link
                    href={`/work/${activeProject.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0A0A0A] text-[#FFFFFF] hover:bg-[#262626] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors group/cta shadow-xs"
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </Link>

                  {primaryUrl && (
                    <a
                      href={primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-[#CCCCCC] hover:border-[#0A0A0A] font-mono text-xs font-bold text-[#0A0A0A] rounded-lg transition-colors"
                      title="Open website or source in new tab"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#0A0A0A]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Bottom Navigation Dots & Keyboard Hint */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#525252] px-2">
          <span className="hidden sm:inline font-medium">Use ← / → keys or side arrows to slide</span>
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goToProject(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? "w-6 bg-[#0A0A0A]" : "w-2 bg-[#CCCCCC] hover:bg-[#888888]"
                }`}
                aria-label={`Go to project slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="hidden sm:inline-flex items-center gap-1 text-[#0A0A0A] font-bold hover:underline underline-offset-4 cursor-pointer"
          >
            <span>NEXT: {nextProject1.title}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
