"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const images = project.images && project.images.length > 0 ? project.images : [project.coverImage];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-switch images if project has multiple images
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border border-[#D9D9D9] bg-[#FFFFFF] rounded-xl overflow-hidden hover:border-[#111111] transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Card Info Bar */}
      <div className="p-6 sm:p-8 pb-4">
        <div className="flex items-center justify-between border-b border-[#EBEBE8] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[#111111]">
              {project.number}
            </span>
            <span className="font-mono text-xs text-[#737373] uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <span className="font-mono text-xs text-[#737373]">
            {project.year}
          </span>
        </div>

        <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] group-hover:text-[#111111] transition-colors">
          {project.title}
        </h3>

        <p className="font-mono text-xs sm:text-sm text-[#737373] mt-1 font-medium">
          {project.subtitle}
        </p>

        <p className="font-sans text-sm text-[#737373] leading-relaxed mt-4 line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Visual Image Showcase Container */}
      <div className="relative w-full aspect-[16/10] bg-[#EBEBE8] overflow-hidden border-y border-[#D9D9D9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentImageIndex]}
              alt={`${project.title} - Preview ${currentImageIndex + 1}`}
              fill
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-image indicators and navigation controls */}
        {images.length > 1 && (
          <>
            {/* Left / Right arrow navigation (visible on hover) */}
            <div className={`absolute inset-y-0 left-2 flex items-center z-10 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
              <button
                onClick={handlePrevImage}
                className="p-1.5 rounded-full bg-[#111111]/80 text-[#F5F5F3] hover:bg-[#111111] transition-colors shadow"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className={`absolute inset-y-0 right-2 flex items-center z-10 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
              <button
                onClick={handleNextImage}
                className="p-1.5 rounded-full bg-[#111111]/80 text-[#F5F5F3] hover:bg-[#111111] transition-colors shadow"
                aria-label="Next image"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pagination dots & label */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111111]/75 backdrop-blur-sm border border-white/20 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentImageIndex ? "bg-white w-4" : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#111111]/70 backdrop-blur-sm text-[10px] font-mono text-white font-medium z-10">
              {currentImageIndex === 0 ? "DESKTOP VIEW" : "MOBILE VIEW"}
            </div>
          </>
        )}
      </div>

      {/* Bottom Metadata & Action Bar */}
      <div className="p-6 sm:p-8 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Technologies Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 font-mono text-[11px] bg-[#F5F5F3] text-[#737373] border border-[#D9D9D9] rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="font-mono text-[10px] text-[#737373] px-1">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* View Case Study CTA */}
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#111111] uppercase tracking-wider group-hover:underline underline-offset-4"
        >
          <span>VIEW CASE STUDY</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}
