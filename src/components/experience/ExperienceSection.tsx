"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { experiences } from "@/data/portfolioData";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";

export function ExperienceSection() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoScrollRafRef = useRef<number | null>(null);
  const isBottomPausedRef = useRef<boolean>(false);

  // Update scroll indicator states
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setCanScrollUp(container.scrollTop > 10);
    setCanScrollDown(
      container.scrollTop < container.scrollHeight - container.clientHeight - 10
    );
  };

  // Handle manual user scrolling & pause auto-scroll temporarily
  const handleScroll = () => {
    checkScrollPosition();
    setIsUserScrolling(true);

    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }

    // Resume auto-scroll 3s after user stops scrolling
    userScrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 3000);
  };

  // Auto-scroll loop via requestAnimationFrame
  useEffect(() => {
    let lastTime = performance.now();

    const step = (now: number) => {
      const deltaTime = now - lastTime;
      lastTime = now;

      const container = scrollContainerRef.current;
      if (
        container &&
        !isHovered &&
        !isUserScrolling &&
        !isBottomPausedRef.current
      ) {
        const maxScroll = container.scrollHeight - container.clientHeight;
        if (maxScroll > 10) {
          // Smooth glide speed (~ 26px / second)
          const deltaScroll = (26 * deltaTime) / 1000;
          const nextScrollTop = container.scrollTop + deltaScroll;

          if (nextScrollTop >= maxScroll - 1) {
            container.scrollTop = maxScroll;
            isBottomPausedRef.current = true;

            // Pause at the bottom for 4 seconds so the user can read the earliest role
            setTimeout(() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                // Pause at top for 3 seconds before resuming
                setTimeout(() => {
                  isBottomPausedRef.current = false;
                }, 3000);
              } else {
                isBottomPausedRef.current = false;
              }
            }, 4000);
          } else {
            container.scrollTop = nextScrollTop;
          }
          checkScrollPosition();
        }
      }

      autoScrollRafRef.current = requestAnimationFrame(step);
    };

    autoScrollRafRef.current = requestAnimationFrame(step);

    return () => {
      if (autoScrollRafRef.current) {
        cancelAnimationFrame(autoScrollRafRef.current);
      }
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
    };
  }, [isHovered, isUserScrolling]);

  return (
    <section
      id="experience"
      className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-t border-[#D9D9D9]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 lg:mb-14 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#737373] tracking-widest uppercase">
                02 / TRACK RECORD
              </span>
              <div className="h-[1px] w-8 bg-[#D9D9D9]" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111]">
              Experience &amp; Roles
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <p className="font-mono text-xs text-[#737373] max-w-xs sm:text-right">
              Career trajectory, engineering leadership, and client solutions.
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-xs px-2.5 py-1 bg-[#FFFFFF] border border-[#D9D9D9] rounded-md text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PRESENT — 2021</span>
            </div>
          </div>
        </motion.div>

        {/* Scrollable Viewport Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent="true"
          className="relative bg-[#F5F5F3] rounded-3xl p-2 sm:p-4 border border-[#E0E0DC] overscroll-contain"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Top Subtle Fade Indicator */}
          <div
            className={`absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#F5F5F3] via-[#F5F5F3]/80 to-transparent z-20 pointer-events-none rounded-t-3xl transition-opacity duration-300 ${
              canScrollUp ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Dedicated Scroll Container with Lenis isolation */}
          <div
            ref={scrollContainerRef}
            data-lenis-prevent="true"
            onScroll={handleScroll}
            className="h-[520px] sm:h-[580px] lg:h-[620px] overflow-y-auto pr-2 sm:pr-4 space-y-8 sm:space-y-10 focus:outline-none overscroll-contain"
            tabIndex={0}
            aria-label="Scrollable Experience Timeline"
          >
            {/* Timeline Continuous Stem Line */}
            <div className="relative pt-2 pb-6">
              <div className="absolute left-7 sm:left-8 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#111111] via-[#D9D9D9] to-[#D9D9D9]" />

              <div className="space-y-8 sm:space-y-10">
                {experiences.map((exp, idx) => {
                  const isPresent = idx === 0;

                  return (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.08 }}
                      className="relative flex items-start gap-4 sm:gap-7 group"
                    >
                      {/* Timeline Node with Uniform Scaled Company Logo (Static, No Hover Zoom) */}
                      <div className="relative z-10 shrink-0">
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FFFFFF] border p-2 flex items-center justify-center shadow-xs transition-colors duration-200 ${
                            isPresent
                              ? "border-[#111111] ring-4 ring-[#111111]/5 shadow-sm"
                              : "border-[#D9D9D9] group-hover:border-[#111111]"
                          }`}
                        >
                          {exp.logo ? (
                            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                              <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                fill
                                sizes="48px"
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#737373]" />
                          )}
                        </div>

                        {/* Present Active Pulsing Badge */}
                        {isPresent && (
                          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#FFFFFF]" />
                          </span>
                        )}
                      </div>

                      {/* Content Card Beside Logo */}
                      <div className="flex-1 bg-[#FFFFFF] border border-[#D9D9D9] rounded-2xl p-5 sm:p-7 shadow-xs hover:border-[#111111] hover:shadow-md transition-all duration-300">
                        {/* Header: Role, Company, Period */}
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 pb-4 border-b border-[#EBEBE8]">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                                {exp.role}
                              </h3>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 text-sm">
                              <span className="font-sans font-semibold text-[#111111]">
                                {exp.company}
                              </span>
                              <span className="text-[#B5B5B2] font-mono">•</span>
                              <span className="font-mono text-xs px-2 py-0.5 bg-[#F5F5F3] text-[#111111] border border-[#D9D9D9] rounded">
                                {exp.employmentType}
                              </span>
                            </div>
                          </div>

                          {/* Right Meta */}
                          <div className="flex flex-wrap lg:flex-col lg:items-end gap-2 lg:gap-1 text-xs font-mono text-[#737373]">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F5F5F3] border border-[#E0E0DC] text-[#111111] font-semibold rounded-md">
                              <Calendar className="w-3.5 h-3.5 text-[#737373]" />
                              <span>{exp.period}</span>
                            </div>

                            {exp.location && (
                              <div className="inline-flex items-center gap-1 text-[#737373] px-1">
                                <MapPin className="w-3 h-3" />
                                <span>{exp.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bullet Highlights */}
                        <div className="pt-4">
                          <ul className="space-y-2.5">
                            {exp.highlights.map((highlight, hIdx) => (
                              <li
                                key={hIdx}
                                className="flex items-start gap-3 text-sm sm:text-[15px] text-[#262626] leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="mt-5 pt-4 border-t border-[#EBEBE8] flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-[11px] text-[#737373] uppercase tracking-wider mr-1">
                              Stack:
                            </span>
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-0.5 font-mono text-xs bg-[#F5F5F3] text-[#111111] border border-[#D9D9D9] rounded hover:border-[#737373] transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Timeline Bottom Terminus Marker */}
                <div className="relative flex items-center gap-4 sm:gap-6 pt-4 ml-4 sm:ml-5">
                  <div className="w-6 h-6 rounded-full bg-[#EBEBE8] border-2 border-[#D9D9D9] flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-[#737373]" />
                  </div>
                  <span className="font-mono text-xs text-[#737373] uppercase tracking-wider">
                    Foundation &amp; Early Experience · 2021
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Subtle Fade Indicator */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#F5F5F3] via-[#F5F5F3]/80 to-transparent z-20 pointer-events-none rounded-b-3xl transition-opacity duration-300 ${
              canScrollDown ? "opacity-100" : "opacity-0"
            }`}
          />
        </motion.div>
      </div>
    </section>
  );
}


