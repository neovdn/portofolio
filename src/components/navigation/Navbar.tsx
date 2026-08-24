"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { personalInfo } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight, Command } from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState("");

  // Live time ticker (GMT+7 WIB)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection & section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (!isHomePage) return;

      const sections = ["hero", "work", "experience", "github", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navItems = [
    { label: "WORK", href: isHomePage ? "#work" : "/#work", id: "work" },
    { label: "EXPERIENCE", href: isHomePage ? "#experience" : "/#experience", id: "experience" },
    { label: "GITHUB", href: isHomePage ? "#github" : "/#github", id: "github" },
    { label: "CONTACT", href: isHomePage ? "#contact" : "/#contact", id: "contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 sm:px-10 lg:px-16",
          scrolled
            ? "py-3 bg-[#F5F5F3]/90 backdrop-blur-md border-b border-[#D9D9D9]"
            : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-bold tracking-tight text-[#111111]"
          >
            <span className="font-mono text-xs px-1.5 py-0.5 bg-[#111111] text-[#F5F5F3] group-hover:bg-[#262626] transition-colors">
              NV
            </span>
            <span className="font-sans font-semibold tracking-wider text-xs uppercase">
              Neo Videan
            </span>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = isHomePage && activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "font-mono text-xs tracking-wider transition-colors relative py-1",
                    isActive
                      ? "text-[#111111] font-semibold"
                      : "text-[#737373] hover:text-[#111111]"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#111111]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Status & Actions */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Live Availability Status */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded border border-[#D9D9D9] bg-[#EBEBE8]/60 text-[11px] font-mono text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Available</span>
              {timeString && (
                <span className="text-[#737373] border-l border-[#D9D9D9] pl-2">
                  {timeString} WIB
                </span>
              )}
            </div>

            {/* Quick Cmd+K Button */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden lg:flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-[#737373] border border-[#D9D9D9] bg-[#F5F5F3] hover:text-[#111111] hover:border-[#111111] transition-colors rounded"
                title="Open Command Palette (Cmd+K)"
              >
                <Command className="w-3 h-3" />
                <span>K</span>
              </button>
            )}

            {/* CV Link */}
            <Link
              href="/cv"
              className="px-3 py-1 text-xs font-mono tracking-wider bg-[#111111] text-[#F5F5F3] hover:bg-[#262626] transition-colors rounded-sm flex items-center gap-1"
            >
              <span>CV</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#111111] hover:bg-[#EBEBE8] rounded"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#F5F5F3] pt-24 px-6 flex flex-col justify-between pb-10 md:hidden">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-sans font-medium text-[#111111] border-b border-[#D9D9D9] pb-4"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/cv"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-sans font-medium text-[#111111] border-b border-[#D9D9D9] pb-4 flex items-center justify-between"
            >
              <span>CURRICULUM VITAE</span>
              <ArrowUpRight className="w-6 h-6 text-[#737373]" />
            </Link>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#D9D9D9]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>{personalInfo.availability} · {timeString || "09:42"} WIB</span>
            </div>
            <a
              href={personalInfo.socials.email}
              className="text-xs font-mono text-[#737373] hover:text-[#111111]"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
