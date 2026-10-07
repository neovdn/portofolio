"use client";

import React, { ComponentType } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiPython,
  SiFlutter,
  SiNodedotjs,
  SiDocker,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiGithub,
  SiAlpinedotjs,
  SiPostman,
  SiGit,
} from "react-icons/si";

interface TechItem {
  name: string;
  category: string;
  icon: ComponentType<{ className?: string }>;
}

const row1Tech: TechItem[] = [
  {
    name: "Next.js",
    category: "Full-Stack Framework",
    icon: SiNextdotjs,
  },
  {
    name: "React",
    category: "Web UI Library",
    icon: SiReact,
  },
  {
    name: "React Native",
    category: "Mobile Framework",
    icon: SiReact,
  },
  {
    name: "TypeScript",
    category: "Typed Language",
    icon: SiTypescript,
  },
  {
    name: "Tailwind CSS",
    category: "CSS Framework",
    icon: SiTailwindcss,
  },
  {
    name: "Laravel",
    category: "PHP Framework",
    icon: SiLaravel,
  },
  {
    name: "Python",
    category: "Language & AI",
    icon: SiPython,
  },
  {
    name: "Flutter",
    category: "Mobile Framework",
    icon: SiFlutter,
  },
  {
    name: "Node.js",
    category: "JavaScript Runtime",
    icon: SiNodedotjs,
  },
];

const row2Tech: TechItem[] = [
  {
    name: "Docker",
    category: "Containerization",
    icon: SiDocker,
  },
  {
    name: "MySQL",
    category: "Relational Database",
    icon: SiMysql,
  },
  {
    name: "PostgreSQL",
    category: "Relational Database",
    icon: SiPostgresql,
  },
  {
    name: "Supabase",
    category: "Cloud & Backend",
    icon: SiSupabase,
  },
  {
    name: "Firebase",
    category: "Cloud Platform",
    icon: SiFirebase,
  },
  {
    name: "GitHub",
    category: "Version Control & CI",
    icon: SiGithub,
  },
  {
    name: "Alpine.js",
    category: "Frontend Framework",
    icon: SiAlpinedotjs,
  },
  {
    name: "Git",
    category: "Version Control",
    icon: SiGit,
  },
  {
    name: "Postman",
    category: "API Platform",
    icon: SiPostman,
  },
];

function TechCard({ item }: { item: TechItem }) {
  const Icon = item.icon;

  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={`${item.name} (${item.category})`}
      className="group relative flex items-center gap-3.5 px-4 py-3 sm:px-4.5 sm:py-3.5 bg-[#FFFFFF] border border-[#D9D9D9] hover:border-[#111111] focus:border-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111] rounded-xl transition-all duration-200 select-none cursor-default shadow-xs hover:shadow-sm w-[215px] sm:w-[235px] shrink-0"
    >
      {/* Icon Frame */}
      <div className="w-10 h-10 rounded-lg bg-[#F5F5F3] border border-[#EBEBE8] flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:border-[#111111] transition-colors duration-200">
        <Icon className="w-5 h-5 text-[#111111] group-hover:text-[#F5F5F3] transition-colors duration-200" />
      </div>

      {/* Info Block */}
      <div className="flex-1 min-w-0">
        <span className="font-sans text-xs sm:text-sm font-bold text-[#111111] tracking-tight block truncate">
          {item.name}
        </span>
        <span className="font-mono text-[10px] sm:text-[11px] text-[#737373] tracking-tight block truncate mt-0.5">
          {item.category}
        </span>
      </div>
    </div>
  );
}

export function TechStackSection() {
  // Duplicate arrays to create continuous infinite loops
  const marqueeRow1 = [...row1Tech, ...row1Tech];
  const marqueeRow2 = [...row2Tech, ...row2Tech];

  return (
    <section
      id="stack"
      aria-label="Technologies and Frameworks"
      className="pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-18 border-t border-[#D9D9D9] bg-[#F5F5F3] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8 sm:mb-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="font-mono text-xs text-[#737373] tracking-widest uppercase">
                03 / ARSENAL &amp; TOOLS
              </span>
              <div className="h-[1px] w-8 bg-[#D9D9D9]" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111]">
              Technologies &amp; Frameworks
            </h2>
          </div>

          <p className="font-mono text-xs text-[#737373] max-w-sm sm:text-right leading-relaxed">
            Production-tested stack spanning full-stack web, cross-platform mobile, relational engines, and DevOps.
          </p>
        </div>
      </div>

      {/* Sliding Marquee Tracks Container */}
      <div className="relative w-full space-y-3.5 sm:space-y-4">
        {/* Left & Right Soft Vignette Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#F5F5F3] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#F5F5F3] to-transparent z-10" />

        {/* Row 1: Geser Kiri (Marquee Left) */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee-left pause-on-hover flex gap-3 sm:gap-4 pl-3 sm:pl-4">
            {marqueeRow1.map((item, index) => (
              <TechCard key={`row1-${item.name}-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Geser Kanan (Marquee Right) */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee-right pause-on-hover flex gap-3 sm:gap-4 pl-3 sm:pl-4">
            {marqueeRow2.map((item, index) => (
              <TechCard key={`row2-${item.name}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
