"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { personalInfo } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Hide on scroll-down, reveal on scroll-up
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        // Always show when near top
        if (currentY < 80) {
          setVisible(true);
        } else if (delta > 6) {
          // Scrolling down — hide
          setVisible(false);
          setMobileMenuOpen(false);
        } else if (delta < -6) {
          // Scrolling up — show
          setVisible(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;

        // Section spy
        if (!isHomePage) return;
        const sections = ["hero", "work", "experience", "stack", "github", "contact"];
        const scrollPosition = currentY + 200;
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
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navItems = [
    { label: "WORK", href: isHomePage ? "#work" : "/#work", id: "work" },
    { label: "EXPERIENCE", href: isHomePage ? "#experience" : "/#experience", id: "experience" },
    { label: "STACK", href: isHomePage ? "#stack" : "/#stack", id: "stack" },
    { label: "GITHUB", href: isHomePage ? "#github" : "/#github", id: "github" },
    { label: "CONTACT", href: isHomePage ? "#contact" : "/#contact", id: "contact" },
  ];

  return (
    <>
      {/* Floating Island Navbar — hides on scroll-down, shows on scroll-up */}
      <header
        className={cn(
          "fixed top-4 sm:top-6 left-0 right-0 z-40 px-4 sm:px-8 lg:px-12 pointer-events-none",
          "transition-all duration-300 ease-in-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="relative max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

          {/* Brand — bare black box, no container */}
          <Link
            href={isHomePage ? "#hero" : "/#hero"}
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | HTMLElement | string, options?: object) => void } }).__lenis;
                if (lenis) {
                  lenis.scrollTo(0, { duration: 1.0 });
                } else {
                  const heroEl = document.getElementById("hero");
                  if (heroEl) {
                    heroEl.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }
                window.history.pushState(null, "", "#hero");
                setActiveSection("hero");
              }
            }}
            className="font-mono text-xs font-bold px-2 py-1 bg-[#111111] text-[#F5F5F3] hover:bg-[#262626] transition-colors cursor-pointer"
            aria-label="Home — Bernhardth Neo Videan"
          >
            NV
          </Link>

          {/* Center Navigation Pill (Desktop) — Dikunci tepat di sumbu tengah 50% layar */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 px-2.5 py-2 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#D9D9D9] shadow-sm">
            {navItems.map((item) => {
              const isActive = isHomePage && activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "font-mono text-[11px] font-semibold tracking-wider px-3.5 py-1.5 rounded-full transition-all",
                    isActive
                      ? "text-[#111111] bg-[#EBEBE8]"
                      : "text-[#444444] hover:text-[#111111] hover:bg-[#EBEBE8]/70"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search / Command Palette */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FFFFFF]/90 backdrop-blur-md border border-[#D9D9D9] shadow-sm hover:border-[#111111] hover:bg-[#F5F5F3] transition-all cursor-pointer"
                title="Open Command Palette (Cmd+K)"
                aria-label="Open Command Search"
              >
                <Search className="w-3.5 h-3.5 text-[#444444]" />
              </button>
            )}

            {/* CV Button */}
            <Link
              href="/cv"
              className="hidden sm:flex items-center gap-1 h-9 px-3.5 rounded-xl bg-[#111111] text-[#F5F5F3] hover:bg-[#262626] font-mono text-[11px] font-semibold tracking-wider shadow-sm transition-all"
              title="Curriculum Vitae"
            >
              <span>CV</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#FFFFFF]/90 backdrop-blur-md border border-[#D9D9D9] shadow-sm hover:bg-[#EBEBE8] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#111111]" /> : <Menu className="w-4 h-4 text-[#111111]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F5F5F3] pt-24 px-6 flex flex-col justify-between pb-10 md:hidden">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9D9D9]">
              <span className="font-mono text-xs text-[#737373] tracking-widest uppercase">
                NAVIGATION
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-[#111111]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-sans font-medium text-[#111111] border-b border-[#D9D9D9] pb-3"
              >
                {item.label}
              </a>
            ))}

            <Link
              href="/cv"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-sans font-medium text-[#111111] border-b border-[#D9D9D9] pb-3 flex items-center justify-between"
            >
              <span>CURRICULUM VITAE</span>
              <ArrowUpRight className="w-5 h-5 text-[#737373]" />
            </Link>
          </div>

          <div className="flex flex-col gap-2 pt-6 border-t border-[#D9D9D9]">
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