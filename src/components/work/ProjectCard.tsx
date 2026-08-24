"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
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
