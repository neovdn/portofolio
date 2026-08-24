import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { projects } from "@/data/portfolioData";
import { Navbar } from "@/components/navigation/Navbar";
import { ContactFooter } from "@/components/contact/ContactFooter";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "All Work & Projects · Bernhardth Neo Videan",
  description: "Complete archive of selected digital products, full-stack web applications, mobile software, and AI systems.",
};

export default function WorkIndexPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="border-b border-[#D9D9D9] pb-10 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#737373] hover:text-[#111111] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>BACK TO HOME</span>
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#737373] tracking-widest uppercase">
              INDEX / ALL WORK
            </span>
            <div className="h-[1px] w-8 bg-[#D9D9D9]" />
          </div>

          <h1 className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-[#111111]">
            Selected Projects Archive
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#737373] mt-3 max-w-2xl">
            A comprehensive overview of production digital products, research prototypes, mobile platforms, and client engineering engagements.
          </p>
        </div>

        {/* List of all projects */}
        <div className="space-y-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D9D9] hover:border-[#111111] rounded-xl transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#111111]">
                      {project.number}
                    </span>
                    <span className="font-mono text-[11px] text-[#737373] uppercase">
                      {project.category}
                    </span>
                    <span className="font-mono text-[11px] text-[#737373]">
                      · {project.year}
                    </span>
                  </div>

                  <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#111111] group-hover:underline underline-offset-4">
                    {project.title}
                  </h2>

                  <p className="font-sans text-sm text-[#737373] max-w-2xl">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex flex-col md:items-end gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 font-mono text-[11px] bg-[#F5F5F3] text-[#737373] border border-[#D9D9D9] rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#111111] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <ContactFooter />
    </div>
  );
}
