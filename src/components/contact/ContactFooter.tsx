"use client";

import React, { useState } from "react";
import Link from "next/link";
import { personalInfo } from "@/data/portfolioData";
import { useToast } from "@/components/ui/Toast";
import { EmailIcon } from "@/components/ui/Icons";
import { Copy, Check, ArrowUpRight, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function ContactFooter() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    showToast("Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-[#111111] text-[#F5F5F3] pt-24 pb-12 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[500px]">
        {/* Top: High-Impact Statement & Contact Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-[#737373] tracking-widest uppercase">
              05 / CONCLUSION &amp; CONTACT
            </span>
            <div className="h-[1px] w-8 bg-[#333333]" />
          </div>

          <h2 className="font-sans text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-[#F5F5F3] leading-[0.95] max-w-4xl">
            LET&apos;S BUILD SOMETHING.
          </h2>

          <p className="font-sans text-base sm:text-xl text-[#A3A3A3] mt-8 max-w-2xl leading-relaxed">
            Whether you are looking to architect an Agentic AI system, engineer a full-stack platform, or build an intuitive mobile product—let&apos;s start a conversation.
          </p>

          {/* Email Copy & Direct Mail Action */}
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-4 bg-[#F5F5F3] text-[#111111] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#FFFFFF] transition-colors rounded-sm"
            >
              <EmailIcon className="w-4 h-4" />
              <span>SEND AN EMAIL ↗</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-4 bg-[#1E1E1E] text-[#F5F5F3] border border-[#333333] font-mono text-xs uppercase tracking-wider hover:border-[#737373] transition-colors rounded-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981]">COPIED ADDRESS</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#737373]" />
                  <span>{personalInfo.email}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Middle: Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-16 my-12 border-y border-[#262626] font-mono text-xs"
        >
          <div>
            <span className="text-[#737373] block mb-3 uppercase tracking-wider text-[11px]">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-[#D9D9D9]">
              <li>
                <a href="#hero" className="hover:text-[#FFFFFF] transition-colors">
                  Top / Home
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-[#FFFFFF] transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#FFFFFF] transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#stack" className="hover:text-[#FFFFFF] transition-colors">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#github" className="hover:text-[#FFFFFF] transition-colors">
                  Developer Activity
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[#737373] block mb-3 uppercase tracking-wider text-[11px]">
              SOCIALS
            </span>
            <ul className="space-y-2 text-[#D9D9D9]">
              <li>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFFFFF] transition-colors flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFFFFF] transition-colors flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFFFFF] transition-colors flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[#737373] block mb-3 uppercase tracking-wider text-[11px]">
              DOCUMENTS
            </span>
            <ul className="space-y-2 text-[#D9D9D9]">
              <li>
                <Link
                  href="/cv"
                  className="hover:text-[#FFFFFF] transition-colors flex items-center gap-1"
                >
                  <span>Curriculum Vitae</span>
                  <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="hover:text-[#FFFFFF] transition-colors flex items-center gap-1"
                >
                  <span>Projects Archive</span>
                  <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[#737373] block mb-3 uppercase tracking-wider text-[11px]">
              AVAILABILITY
            </span>
            <div className="space-y-1.5 text-[#D9D9D9]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Open for opportunities</span>
              </div>
              <p className="text-[#737373] text-[11px]">
                Timezone: Asia/Jakarta (GMT+7)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Colophon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#737373]"
        >
          <div>
            <span>© 2026 Bernhardth Neo Videan.</span>
            <span className="ml-2 text-[#525252]">
              Minimalism with Craftsmanship.
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#F5F5F3] transition-colors py-1"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
