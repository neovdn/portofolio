"use client";

import React from "react";
import Link from "next/link";
import { projects } from "@/data/portfolioData";
import { ProjectDeckSlider } from "./ProjectDeckSlider";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function WorkSection() {
  return (
    <section id="work" className="py-10 lg:py-16 px-4 sm:px-8 lg:px-12 border-t border-[#D9D9D9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 lg:mb-8 gap-4"
        >
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
              Curated digital products engineered across web, mobile, and autonomous systems.
            </p>
            <Link
              href="/work"
              className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#111111] hover:underline underline-offset-4 mt-2"
            >
              <span>ARCHIVE (ALL WORK)</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        {/* Interactive Stacked Project Deck Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, delay: 0.12, ease }}
        >
          <ProjectDeckSlider projects={projects} />
        </motion.div>
      </div>
    </section>
  );
}
