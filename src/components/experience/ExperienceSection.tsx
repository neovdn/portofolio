"use client";

import React, { useState } from "react";
import { experiences } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, MapPin, Calendar } from "lucide-react";

export function ExperienceSection() {
  const [selectedId, setSelectedId] = useState<string>(experiences[0].id);

  const selectedExperience =
    experiences.find((exp) => exp.id === selectedId) || experiences[0];

  return (
    <section id="experience" className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-t border-[#D9D9D9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#737373] tracking-widest uppercase">
              02 / TRACK RECORD
            </span>
            <div className="h-[1px] w-8 bg-[#D9D9D9]" />
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111]">
            Experience &amp; Roles
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#737373] mt-2 max-w-xl">
            Engineering leadership, client engagements, and applied software research.
          </p>
        </div>

        {/* Master-Detail Interactive Split (Desktop & Tablet) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Timeline List */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {experiences.map((exp) => {
              const isSelected = exp.id === selectedId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedId(exp.id)}
                  className={cn(
                    "text-left p-5 rounded-lg border transition-all duration-200 flex items-center justify-between group",
                    isSelected
                      ? "bg-[#FFFFFF] border-[#111111] shadow-sm"
                      : "bg-[#FDFCFA] border-[#D9D9D9] hover:border-[#737373]"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-[#737373]">
                        {exp.period}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#EBEBE8] text-[#111111] rounded">
                        {exp.employmentType}
                      </span>
                    </div>
                    <h3 className="font-sans text-lg font-bold text-[#111111]">
                      {exp.company}
                    </h3>
                    <p className="font-sans text-xs text-[#737373]">
                      {exp.role}
                    </p>
                  </div>

                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isSelected
                        ? "text-[#111111] translate-x-1"
                        : "text-[#D9D9D9] group-hover:text-[#737373]"
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Role Deep Dive */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedExperience.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-[#FFFFFF] border border-[#D9D9D9] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm"
              >
                {/* Role Header */}
                <div className="border-b border-[#EBEBE8] pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#737373] mb-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{selectedExperience.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{selectedExperience.location}</span>
                    </div>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#111111]">
                    {selectedExperience.role}
                  </h3>
                  <p className="font-mono text-sm text-[#737373] font-medium mt-1">
                    @ {selectedExperience.company} · {selectedExperience.employmentType}
                  </p>
                </div>

                {/* Summary Description */}
                <p className="font-sans text-sm sm:text-base text-[#111111] leading-relaxed">
                  {selectedExperience.description}
                </p>

                {/* Key Deliverables / Highlights */}
                <div>
                  <h4 className="font-mono text-xs text-[#737373] uppercase tracking-wider mb-3">
                    KEY DELIVERABLES &amp; IMPACT
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedExperience.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#111111]">
                        <span className="font-mono text-xs text-[#737373] mt-0.5 select-none">
                          0{idx + 1}.
                        </span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Used in this Role */}
                <div className="pt-4 border-t border-[#EBEBE8]">
                  <h4 className="font-mono text-xs text-[#737373] uppercase tracking-wider mb-2.5">
                    TECHNOLOGY STACK
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedExperience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 font-mono text-xs bg-[#F5F5F3] text-[#111111] border border-[#D9D9D9] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
