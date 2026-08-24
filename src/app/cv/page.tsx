"use client";

import React from "react";
import Link from "next/link";
import { personalInfo, experiences, projects } from "@/data/portfolioData";
import { Navbar } from "@/components/navigation/Navbar";
import { ContactFooter } from "@/components/contact/ContactFooter";
import { ArrowLeft, Printer } from "lucide-react";

export default function CVPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto w-full">
        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-6 mb-10 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#737373] hover:text-[#111111] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>BACK TO HOME</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] text-[#F5F5F3] font-mono text-xs uppercase tracking-wider hover:bg-[#262626] transition-colors rounded-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>
          </div>
        </div>

        {/* Printable CV Container Sheet */}
        <div className="bg-[#FFFFFF] border border-[#D9D9D9] p-8 sm:p-12 rounded-xl shadow-sm space-y-12 print:border-none print:shadow-none print:p-0">
          {/* Header */}
          <header className="border-b border-[#EBEBE8] pb-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
                  {personalInfo.name}
                </h1>
                <p className="font-mono text-sm text-[#737373] uppercase tracking-wider mt-1">
                  {personalInfo.title}
                </p>
              </div>

              <div className="font-mono text-xs text-[#737373] space-y-1 sm:text-right">
                <p>{personalInfo.location} · {personalInfo.timezone}</p>
                <p>
                  <a href={`mailto:${personalInfo.email}`} className="text-[#111111] hover:underline">
                    {personalInfo.email}
                  </a>
                </p>
                <p>
                  <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#111111]">
                    github.com/neovdn
                  </a>
                  {" · "}
                  <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#111111]">
                    linkedin.com/in/neovdn
                  </a>
                </p>
              </div>
            </div>

            <p className="font-sans text-sm text-[#111111] leading-relaxed mt-6">
              {personalInfo.shortBio}
            </p>
          </header>

          {/* Core Technical Capabilities */}
          <section className="space-y-4">
            <h2 className="font-mono text-xs font-bold text-[#737373] uppercase tracking-wider border-b border-[#EBEBE8] pb-2">
              TECHNICAL EXPERTISE
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[#737373] block text-[11px]">WEB &amp; FULL-STACK</span>
                <p className="text-[#111111]">Next.js, React, TypeScript, Tailwind CSS, Node.js, REST &amp; GraphQL</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#737373] block text-[11px]">AI &amp; AGENTIC SYSTEMS</span>
                <p className="text-[#111111]">LangChain, OpenAI GPT-4, ReAct Pattern, Tool Calling, Function Schemas</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#737373] block text-[11px]">MOBILE ENGINEERING</span>
                <p className="text-[#111111]">Flutter, Dart, React Native, Firebase, Location Geofencing, Biometrics</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#737373] block text-[11px]">DATABASES &amp; CLOUD</span>
                <p className="text-[#111111]">Supabase, PostgreSQL (RLS &amp; ACID), Firebase Firestore, Docker, Git</p>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="space-y-6">
            <h2 className="font-mono text-xs font-bold text-[#737373] uppercase tracking-wider border-b border-[#EBEBE8] pb-2">
              PROFESSIONAL EXPERIENCE
            </h2>

            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-sans text-base font-bold text-[#111111]">
                      {exp.role} <span className="font-normal text-[#737373]">@ {exp.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-[#737373]">
                      {exp.period} · {exp.location}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#737373] leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-1 pt-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#111111]">
                        <span className="text-[#737373]">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 font-mono text-[10px] bg-[#F5F5F3] border border-[#E5E5E5] text-[#737373] rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Flagship Projects */}
          <section className="space-y-6">
            <h2 className="font-mono text-xs font-bold text-[#737373] uppercase tracking-wider border-b border-[#EBEBE8] pb-2">
              FEATURED PROJECTS &amp; CASE STUDIES
            </h2>

            <div className="space-y-6">
              {projects.map((p) => (
                <div key={p.id} className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-sans text-sm font-bold text-[#111111]">
                      {p.title} — <span className="font-normal text-[#737373]">{p.subtitle}</span>
                    </h3>
                    <span className="font-mono text-xs text-[#737373]">{p.year}</span>
                  </div>
                  <p className="font-sans text-xs text-[#737373] leading-relaxed">
                    {p.description}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="font-mono text-[10px] text-[#737373]">TECH:</span>
                    <span className="font-mono text-[10px] text-[#111111]">
                      {p.technologies.join(" · ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Research & Presentations */}
          <section className="space-y-3">
            <h2 className="font-mono text-xs font-bold text-[#737373] uppercase tracking-wider border-b border-[#EBEBE8] pb-2">
              RESEARCH &amp; CONFERENCES
            </h2>
            <div>
              <h3 className="font-sans text-sm font-bold text-[#111111]">
                Agentic AI Co-Pilots in Operational Hospitality Management
              </h3>
              <p className="font-mono text-xs text-[#737373]">
                Academic Research &amp; Presentation, 2026
              </p>
              <p className="font-sans text-xs text-[#737373] mt-1 leading-relaxed">
                Authored and presented architectural research on LangChain ReAct loops and deterministic SQL execution gates for hospitality workflow automation.
              </p>
            </div>
          </section>
        </div>
      </main>

      <ContactFooter />
    </div>
  );
}
