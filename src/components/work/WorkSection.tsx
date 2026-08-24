"use client";

import React from "react";
import Link from "next/link";
import { projects } from "@/data/portfolioData";
import { ProjectCard } from "./ProjectCard";
import { ArrowUpRight } from "lucide-react";

export function WorkSection() {
  return (
    <section id="work" className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-t border-[#D9D9D9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#737373] tracking-widest uppercase">
                01 / SELECTED WORK
              </span>
              <div className="h-[1px] w-8 bg-[#D9D9D9]" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111]">
              Featured Projects
            </h2>
          </div>

          <div className="flex flex-col sm:items-end">
            <p className="font-mono text-xs text-[#737373] max-w-xs sm:text-right">
              Curated digital products engineered across web, mobile, and autonomous AI systems.
            </p>
            <Link
              href="/work"
              className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#111111] hover:underline underline-offset-4 mt-2"
            >
              <span>ARCHIVE (ALL WORK)</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Project Grid (2 columns on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
