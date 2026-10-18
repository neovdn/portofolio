"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo } from "@/data/portfolioData";
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Mail,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "@/components/ui/Icons";

export function HeroSection() {
  const emailHref = personalInfo?.socials?.email || `mailto:${personalInfo?.email || ""}`;
  const githubHref = personalInfo?.socials?.github || "https://github.com";
  const linkedinHref = personalInfo?.socials?.linkedin || "https://linkedin.com";
  const instagramHref = personalInfo?.socials?.instagram || "https://instagram.com";

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-start lg:justify-center pt-16 sm:pt-20 md:pt-20 pb-12 lg:py-0"
    >
      {/* =========================================================
          1. CENTERPIECE: 3D AVATAR & STUDIO LIGHTING (TENGAH)
         ========================================================= */}

      {/* ---- MOBILE & TABLET AVATAR (< lg) ---- */}
      {/* Positioned at the top behind hero content, creating an editorial highlight effect */}
      <div className="lg:hidden absolute inset-x-0 top-0 h-[48vh] sm:h-[52vh] md:h-[56vh] min-h-[350px] max-h-[480px] sm:max-h-[540px] md:max-h-[600px] z-10 pointer-events-none flex items-start justify-center overflow-hidden">
        {/* Aura Cahaya — mobile/tablet scale */}
        <div
          aria-hidden="true"
          className="absolute top-4 sm:top-6 md:top-4 left-1/2 -translate-x-1/2 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] rounded-full blur-3xl opacity-95"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 38%, rgba(245,245,243,0) 72%)",
          }}
        />

        {/* Soft Rim Shadow */}
        <div
          aria-hidden="true"
          className="absolute top-12 sm:top-14 md:top-10 left-1/2 -translate-x-1/2 w-[190px] h-[240px] sm:w-[230px] sm:h-[290px] md:w-[270px] md:h-[330px] rounded-full bg-[#111111]/[0.04] blur-[55px]"
        />

        {/* Avatar image — sits behind content, fades at bottom into content zone */}
        <div className="relative z-10 flex items-start justify-center h-full pt-10 sm:pt-12 md:pt-8">
          <Image
            src="/image/avatar.webp"
            alt={personalInfo?.name || "Bernhardth Neo Videan"}
            width={950}
            height={1150}
            priority
            className="h-full w-auto max-w-none object-contain object-top select-none drop-shadow-[0_16px_32px_rgba(17,17,17,0.08)]"
            style={{
              maskImage: "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.7) 22%, black 36%)",
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.7) 22%, black 36%)",
            }}
          />
        </div>

        {/* Bottom gradient overlay — fades avatar into the content area below */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 sm:h-36 md:h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #F5F5F3 0%, rgba(245,245,243,0.98) 25%, rgba(245,245,243,0.75) 55%, rgba(245,245,243,0.2) 80%, rgba(245,245,243,0) 100%)",
          }}
        />
      </div>

      {/* ---- DESKTOP AVATAR (lg+) — Original layout preserved exactly ---- */}
      <div className="pointer-events-none hidden lg:flex absolute inset-x-0 bottom-0 top-14 z-10 items-end justify-center lg:-translate-x-[5%]">
        {/* Aura Cahaya Utama — Lembut & menyatu dengan background #F5F5F3 tanpa cincin abu-abu kaku */}
        <div
          aria-hidden="true"
          className="absolute bottom-[6%] left-1/2 -translate-x-1/2 lg:w-[680px] lg:h-[680px] rounded-full blur-3xl opacity-95"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 38%, rgba(245,245,243,0) 72%)",
          }}
        />

        {/* Soft Rim Shadow di belakang tubuh karakter untuk memberi dimensi kedalaman */}
        <div
          aria-hidden="true"
          className="absolute bottom-[12%] left-1/2 -translate-x-1/2 lg:w-[340px] lg:h-[440px] rounded-full bg-[#111111]/[0.05] blur-[70px]"
        />

        {/* Wrapper Gambar 3D — Diperbesar mendekati full-page & diberi mask-image agar bawahnya memudar halus */}
        <div className="relative z-10 flex items-end justify-center">
          <Image
            src="/image/avatar.webp"
            alt={personalInfo?.name || "Bernhardth Neo Videan"}
            width={950}
            height={1150}
            priority
            className="lg:h-[86vh] max-h-[880px] w-auto object-contain object-bottom select-none drop-shadow-[0_20px_40px_rgba(17,17,17,0.10)]"
            style={{
              maskImage: "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 1.5%, black 4%)",
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 1.5%, black 4%)",
            }}
          />
        </div>
      </div>

      {/* =========================================================
          2. KONTEN UTAMA (KIRI & KANAN SEJAJAR DENGAN NAVBAR)
         ========================================================= */}

      {/* ---- MOBILE & TABLET CONTENT (< lg) ---- */}
      <div className="lg:hidden relative z-20 w-full px-5 sm:px-8 md:px-10">

        {/* Intro block — positioned smoothly below avatar focal point */}
        <div className="flex flex-col items-center text-center mt-[38vh] sm:mt-[42vh] md:mt-[45vh]">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#444444]">
              00 / INTRODUCTION
            </span>
            <span className="h-[1.5px] w-8 bg-[#737373]" />
          </div>

          {/* Name */}
          <h1 className="text-[32px] sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] leading-[1.08]">
            Bernhardth
            <br />
            Neo Videan
          </h1>

          {/* Role */}
          <p className="mt-3 font-mono text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-[#737373]">
            FULL-STACK DEVELOPER
          </p>

          {/* Tagline */}
          <p className="mt-3.5 text-[14px] sm:text-[15px] leading-relaxed text-[#444444] max-w-[320px]">
            I build web, mobile, and AI-powered digital products.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex items-center gap-2.5 sm:gap-3">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#F5F5F3] shadow-sm transition-all hover:bg-[#262626] active:scale-[0.97]"
            >
              <span>EXPLORE WORK</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/documents/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 backdrop-blur-md px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#111111] shadow-sm transition-all hover:border-[#111111] hover:bg-[#F5F5F3] active:scale-[0.97]"
            >
              <FileText className="w-3.5 h-3.5 text-[#444444]" />
              <span>DOWNLOAD CV</span>
            </Link>
          </div>
        </div>

        {/* Subtle visual separator */}
        <div className="flex items-center justify-center gap-4 mt-10 sm:mt-12 mb-8 sm:mb-10">
          <span className="h-[1px] w-12 bg-[#D9D9D9]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9D9D9]" />
          <span className="h-[1px] w-12 bg-[#D9D9D9]" />
        </div>

        {/* About Me block — tablet gets a 2-column layout */}
        <div className="md:flex md:items-start md:gap-10 md:max-w-2xl md:mx-auto">
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-1">
            <h2 className="text-[28px] sm:text-[32px] md:text-4xl font-bold tracking-tight text-[#111111] leading-[1.08]">
              About Me
            </h2>

            <p className="mt-3.5 text-[13.5px] sm:text-[14px] leading-[1.72] text-[#444444] max-w-[380px] md:max-w-none">
              Engineering thoughtful web applications, cross-platform mobile
              experiences, and autonomous AI systems with a deep focus on
              craftsmanship, performance, and user experience.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start md:flex-shrink-0 mt-6 md:mt-1">
            {/* CTA Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#F5F5F3] shadow-sm transition-all hover:bg-[#262626] active:scale-[0.97]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>GET IN TOUCH</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 backdrop-blur-md px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#111111] shadow-sm transition-all hover:border-[#111111] hover:bg-[#F5F5F3] active:scale-[0.97]"
              >
                <GitHubIcon className="w-3.5 h-3.5 text-[#111111]" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 text-[#444444] shadow-xs transition-all hover:border-[#111111] hover:text-[#111111] hover:bg-[#FFFFFF] active:scale-[0.95]"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 text-[#444444] shadow-xs transition-all hover:border-[#111111] hover:text-[#111111] hover:bg-[#FFFFFF] active:scale-[0.95]"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 text-[#444444] shadow-xs transition-all hover:border-[#111111] hover:text-[#111111] hover:bg-[#FFFFFF] active:scale-[0.95]"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={emailHref}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 text-[#444444] shadow-xs transition-all hover:border-[#111111] hover:text-[#111111] hover:bg-[#FFFFFF] active:scale-[0.95]"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---- DESKTOP CONTENT (lg+) — Original layout preserved exactly ---- */}
      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-12 hidden lg:block">
        <div className="max-w-7xl mx-auto grid grid-cols-12 items-center gap-6">

          {/* ---------------- SISI KIRI (4 Kolom) ---------------- */}
          <div className="col-span-4 flex flex-col items-start text-left">
            {/* Eyebrow: Diperbesar dan dipertegas agar terbaca jelas */}
            <div className="inline-flex items-center gap-3 mb-3.5">
              <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[#444444]">
                00 / INTRODUCTION
              </span>
              <span className="h-[1.5px] w-10 bg-[#737373]" />
            </div>

            {/* Nama */}
            <h1 className="text-4xl sm:text-5xl xl:text-[52px] font-bold tracking-tight text-[#111111] leading-[1.08]">
              Bernhardth
              <br />
              Neo Videan
            </h1>

            {/* Role */}
            <p className="mt-3.5 font-mono text-[13px] font-medium uppercase tracking-[0.22em] text-[#737373]">
              FULL-STACK DEVELOPER
            </p>

            {/* Tagline Singkat */}
            <p className="mt-4 text-base leading-relaxed text-[#444444] max-w-[330px]">
              I build web, mobile, and AI-powered digital products.
            </p>

            {/* CTA Buttons Kiri */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#F5F5F3] shadow-sm transition-all hover:bg-[#262626]"
              >
                <span>EXPLORE WORK</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/documents/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 backdrop-blur-md px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#111111] shadow-sm transition-all hover:border-[#111111] hover:bg-[#F5F5F3]"
              >
                <FileText className="w-3.5 h-3.5 text-[#444444]" />
                <span>DOWNLOAD CV</span>
              </Link>
            </div>
          </div>

          {/* ---------------- SPACER TENGAH UNTUK 3D ASSET (4 Kolom) ---------------- */}
          <div className="col-span-4" aria-hidden="true" />

          {/* ---------------- SISI KANAN (4 Kolom) ---------------- */}
          {/* lg:pt-6 menyeimbangkan posisi vertikal dengan eyebrow di sisi kiri */}
          <div className="col-span-4 flex flex-col items-start lg:pl-4 text-left lg:pt-6">
            <h2 className="text-4xl sm:text-5xl xl:text-[48px] font-bold tracking-tight text-[#111111] leading-[1.08]">
              About Me
            </h2>

            {/* Ukuran teks 14px-15px & max-w-[410px] agar tampil proporsional dalam 3-4 baris */}
            <p className="mt-4 text-[14.5px] leading-[1.68] text-[#444444] max-w-[410px]">
              Engineering thoughtful web applications, cross-platform mobile
              experiences, and autonomous AI systems with a deep focus on
              craftsmanship, performance, and user experience.
            </p>

            {/* CTA Buttons Kanan */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#F5F5F3] shadow-sm transition-all hover:bg-[#262626]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>GET IN TOUCH</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 backdrop-blur-md px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#111111] shadow-sm transition-all hover:border-[#111111] hover:bg-[#F5F5F3]"
              >
                <GitHubIcon className="w-3.5 h-3.5 text-[#111111]" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 text-[#444444] shadow-xs transition-all hover:border-[#111111] hover:text-[#111111] hover:bg-[#FFFFFF]"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 text-[#444444] shadow-xs transition-all hover:border-[#111111] hover:text-[#111111] hover:bg-[#FFFFFF]"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 text-[#444444] shadow-xs transition-all hover:border-[#111111] hover:text-[#111111] hover:bg-[#FFFFFF]"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={emailHref}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9D9D9] bg-[#FFFFFF]/90 text-[#444444] shadow-xs transition-all hover:border-[#111111] hover:text-[#111111] hover:bg-[#FFFFFF]"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
          3. SMOOTH BOTTOM GRADIENT TRANSITION KE SECTION BERIKUTNYA
         ========================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 sm:h-20"
        style={{
          background: "linear-gradient(to top, #F5F5F3 0%, rgba(245,245,243,0.9) 20%, rgba(245,245,243,0.7) 40%, rgba(245,245,243,0.45) 58%, rgba(245,245,243,0.25) 72%, rgba(245,245,243,0.1) 85%, rgba(245,245,243,0) 100%)",
        }}
      />
    </section>
  );
}

export default HeroSection;