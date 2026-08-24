"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { WorkSection } from "@/components/work/WorkSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { GithubSection } from "@/components/github/GithubSection";
import { ContactFooter } from "@/components/contact/ContactFooter";
import { CommandPalette } from "@/components/navigation/CommandPalette";

export default function HomePage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F5F5F3] text-[#111111] editorial-grid flex flex-col justify-between selection:bg-[#111111] selection:text-[#F5F5F3]">
      {/* Top Floating Navbar */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Main Portfolio Content Flow */}
      <main className="flex-1 w-full">
        <HeroSection />
        <WorkSection />
        <ExperienceSection />
        <GithubSection />
      </main>

      {/* Closing Statement & Footer */}
      <ContactFooter />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
