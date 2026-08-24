"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface CaseStudyLayoutProps {
  project: Project;
  nextProject?: Project;
}

export function CaseStudyLayout({ project, nextProject }: CaseStudyLayoutProps) {
  const { caseStudy } = project;

  return (
    <article className="min-h-screen bg-[#F5F5F3] text-[#111111] pt-28 pb-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#737373] hover:text-[#111111] transition-colors mb-10 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>BACK TO SELECTED WORK</span>
        </Link>

        {/* Case Study Header */}
        <header className="border-b border-[#D9D9D9] pb-8 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#737373] tracking-widest uppercase">
              PROJECT {project.number} · {project.year}
            </span>
            <div className="h-[1px] w-8 bg-[#D9D9D9]" />
            <span className="font-mono text-xs text-[#111111] px-2 py-0.5 bg-[#EBEBE8] rounded">
              {project.category}
            </span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
            {project.title}
          </h1>

          <p className="font-mono text-base sm:text-lg text-[#737373] mt-2 font-medium">
            {project.subtitle}
          </p>

          <p className="font-sans text-lg sm:text-xl text-[#111111] mt-6 leading-relaxed">
            {project.tagline}
          </p>

          {/* External Links */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-[#F5F5F3] font-mono text-xs uppercase tracking-wider hover:bg-[#262626] transition-colors rounded-sm"
              >
                <span>LIVE DEMO</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EBEBE8] text-[#111111] border border-[#D9D9D9] font-mono text-xs uppercase tracking-wider hover:bg-[#DFDFDC] transition-colors rounded-sm"
              >
                <span>SOURCE CODE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </header>

        {/* Main Cover Image */}
        <div className="relative w-full aspect-[16/10] bg-[#FFFFFF] border border-[#D9D9D9] rounded-xl overflow-hidden mb-16 shadow-sm">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Case Study Body Sections */}
        <div className="space-y-16">
          {/* Section: Overview & My Role */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#D9D9D9] pb-16">
            <div className="md:col-span-4">
              <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider">
                01 / OVERVIEW &amp; ROLE
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <div>
                <h3 className="font-sans text-xl font-bold text-[#111111] mb-2">
                  Project Overview
                </h3>
                <p className="font-sans text-base text-[#737373] leading-relaxed">
                  {caseStudy.overview}
                </p>
              </div>

              <div>
                <h3 className="font-sans text-xl font-bold text-[#111111] mb-2">
                  My Engineering Role
                </h3>
                <p className="font-sans text-base text-[#737373] leading-relaxed">
                  {caseStudy.myRole}
                </p>
              </div>
            </div>
          </section>

          {/* Section: The Problem & The Solution */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#D9D9D9] pb-16">
            <div className="md:col-span-4">
              <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider">
                02 / PROBLEM &amp; SOLUTION
              </h2>
            </div>
            <div className="md:col-span-8 space-y-8">
              <div className="bg-[#FFFFFF] p-6 rounded-lg border border-[#D9D9D9]">
                <h3 className="font-mono text-xs text-[#737373] uppercase tracking-wider mb-2">
                  THE CHALLENGE
                </h3>
                <p className="font-sans text-base text-[#111111] leading-relaxed">
                  {caseStudy.problem}
                </p>
              </div>

              <div className="bg-[#111111] text-[#F5F5F3] p-6 rounded-lg">
                <h3 className="font-mono text-xs text-[#737373] uppercase tracking-wider mb-2">
                  THE ARCHITECTURAL SOLUTION
                </h3>
                <p className="font-sans text-base text-[#E5E5E5] leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>
            </div>
          </section>

          {/* Section: Architecture & System Diagram (If applicable) */}
          {caseStudy.architecture && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#D9D9D9] pb-16">
              <div className="md:col-span-4">
                <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider">
                  03 / SYSTEM ARCHITECTURE
                </h2>
              </div>
              <div className="md:col-span-8 space-y-6">
                <p className="font-sans text-base text-[#737373] leading-relaxed">
                  {caseStudy.architecture.summary}
                </p>

                {/* Embedded Diagram if available */}
                {project.id === "roommaster" && (
                  <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden border border-[#D9D9D9] bg-[#FFFFFF] shadow-sm my-4">
                    <Image
                      src="/projects/roommaster/architecture.svg"
                      alt="RoomMaster System Architecture"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.architecture.components.map((comp) => (
                    <div
                      key={comp.name}
                      className="p-4 bg-[#FFFFFF] border border-[#D9D9D9] rounded-lg space-y-1.5"
                    >
                      <span className="font-mono text-[10px] text-[#737373] uppercase">
                        {comp.layer}
                      </span>
                      <h4 className="font-sans text-sm font-bold text-[#111111]">
                        {comp.name}
                      </h4>
                      <p className="font-sans text-xs text-[#737373] leading-relaxed">
                        {comp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Section: Agentic AI Workflow (If applicable) */}
          {caseStudy.agenticWorkflow && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#D9D9D9] pb-16">
              <div className="md:col-span-4">
                <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider">
                  04 / AGENTIC WORKFLOW
                </h2>
              </div>
              <div className="md:col-span-8 space-y-6">
                <div>
                  <h3 className="font-sans text-xl font-bold text-[#111111]">
                    {caseStudy.agenticWorkflow.title}
                  </h3>
                  <p className="font-sans text-sm text-[#737373] mt-1">
                    {caseStudy.agenticWorkflow.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {caseStudy.agenticWorkflow.steps.map((step) => (
                    <div
                      key={step.step}
                      className="flex items-start gap-4 p-4 bg-[#FFFFFF] border border-[#D9D9D9] rounded-lg"
                    >
                      <span className="font-mono text-xs font-bold text-[#111111] px-2 py-1 bg-[#EBEBE8] rounded">
                        {step.step}
                      </span>
                      <div className="space-y-1">
                        <h4 className="font-sans text-sm font-bold text-[#111111]">
                          {step.label}
                        </h4>
                        <p className="font-sans text-xs text-[#737373] leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Section: Key Features */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#D9D9D9] pb-16">
            <div className="md:col-span-4">
              <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider">
                FEATURE CAPABILITIES
              </h2>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {caseStudy.keyFeatures.map((feat) => (
                <div
                  key={feat.title}
                  className="p-5 bg-[#FFFFFF] border border-[#D9D9D9] rounded-lg"
                >
                  <h3 className="font-sans text-base font-bold text-[#111111] mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="font-sans text-xs text-[#737373] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Technical Decisions */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#D9D9D9] pb-16">
            <div className="md:col-span-4">
              <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider">
                ENGINEERING DECISIONS
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4">
              {caseStudy.technicalDecisions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#FFFFFF] border border-[#D9D9D9] rounded-lg space-y-2"
                >
                  <h3 className="font-mono text-xs font-bold text-[#111111]">
                    DECISION: {item.decision}
                  </h3>
                  <p className="font-sans text-sm text-[#737373] leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Academic Research / Conference (If applicable) */}
          {caseStudy.researchOrConference && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#D9D9D9] pb-16">
              <div className="md:col-span-4">
                <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider">
                  CONFERENCE RESEARCH
                </h2>
              </div>
              <div className="md:col-span-8 p-6 bg-[#FFFFFF] border border-[#D9D9D9] rounded-lg space-y-2">
                <span className="font-mono text-xs text-[#737373]">
                  {caseStudy.researchOrConference.venue}
                </span>
                <h3 className="font-sans text-lg font-bold text-[#111111]">
                  {caseStudy.researchOrConference.title}
                </h3>
                <p className="font-sans text-sm text-[#737373] leading-relaxed">
                  {caseStudy.researchOrConference.summary}
                </p>
              </div>
            </section>
          )}

          {/* Section: Outcome & Impact */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
            <div className="md:col-span-4">
              <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider">
                OUTCOME &amp; RESULT
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="p-6 bg-[#EBEBE8] border border-[#D9D9D9] rounded-lg">
                <p className="font-sans text-base text-[#111111] leading-relaxed font-medium">
                  {caseStudy.outcome}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Pagination / Next Project */}
        {nextProject && (
          <div className="pt-12 border-t border-[#D9D9D9] flex items-center justify-between">
            <Link
              href="/#work"
              className="font-mono text-xs text-[#737373] hover:text-[#111111] transition-colors"
            >
              ← ALL PROJECTS
            </Link>

            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#111111] group"
            >
              <span>NEXT: {nextProject.title}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
