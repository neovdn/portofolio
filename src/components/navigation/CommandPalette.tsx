"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { projects, personalInfo } from "@/data/portfolioData";
import { useToast } from "@/components/ui/Toast";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "@/components/ui/Icons";
import { Search, X, FolderGit2, FileText, ArrowRight, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = [
    // Navigation
    { id: "nav-hero", label: "Jump to Home / Introduction", category: "Navigation", icon: ArrowRight, action: () => { router.push("/#hero"); onClose(); } },
    { id: "nav-work", label: "Jump to Selected Work", category: "Navigation", icon: ArrowRight, action: () => { router.push("/#work"); onClose(); } },
    { id: "nav-exp", label: "Jump to Experience", category: "Navigation", icon: ArrowRight, action: () => { router.push("/#experience"); onClose(); } },
    { id: "nav-git", label: "Jump to Developer Activity", category: "Navigation", icon: ArrowRight, action: () => { router.push("/#github"); onClose(); } },
    { id: "nav-contact", label: "Jump to Contact", category: "Navigation", icon: ArrowRight, action: () => { router.push("/#contact"); onClose(); } },
    
    // Projects
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      label: `Case Study: ${p.title} (${p.subtitle})`,
      category: "Projects",
      icon: FolderGit2,
      action: () => { router.push(`/work/${p.slug}`); onClose(); },
    })),

    // Actions
    { id: "action-cv", label: "View Curriculum Vitae (CV)", category: "Actions", icon: FileText, action: () => { router.push("/cv"); onClose(); } },
    { id: "action-copy-email", label: `Copy Email (${personalInfo.email})`, category: "Actions", icon: EmailIcon, action: () => { navigator.clipboard.writeText(personalInfo.email); showToast("Email copied to clipboard!"); onClose(); } },
    { id: "action-github", label: "Open GitHub Profile (@neovdn)", category: "Actions", icon: GitHubIcon, action: () => { window.open(personalInfo.socials.github, "_blank"); onClose(); } },
    { id: "action-linkedin", label: "Open LinkedIn Profile", category: "Actions", icon: LinkedInIcon, action: () => { window.open(personalInfo.socials.linkedin, "_blank"); onClose(); } },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input on mount/open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 px-4 bg-[#111111]/40 backdrop-blur-sm">
          <div className="fixed inset-0" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#D9D9D9] rounded-xl shadow-2xl overflow-hidden z-10"
          >
            <div className="flex items-center px-4 py-3.5 border-b border-[#EBEBE8] gap-3">
              <Search className="w-4 h-4 text-[#737373]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command, section, or project..."
                className="w-full bg-transparent font-mono text-xs text-[#111111] placeholder-[#737373] focus:outline-none"
              />
              <button
                onClick={handleClose}
                className="p-1 text-[#737373] hover:text-[#111111] rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-[#737373]">
                  No results found for &quot;{query}&quot;
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors font-mono text-xs ${
                        isSelected
                          ? "bg-[#111111] text-[#F5F5F3]"
                          : "text-[#111111] hover:bg-[#F5F5F3]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isSelected ? "text-[#F5F5F3]" : "text-[#737373]"}`} />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase ${isSelected ? "text-[#A3A3A3]" : "text-[#737373]"}`}>
                          {item.category}
                        </span>
                        {isSelected && <CornerDownLeft className="w-3 h-3 text-[#A3A3A3]" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2 border-t border-[#EBEBE8] bg-[#F9F9F8] text-[10px] font-mono text-[#737373]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span>Neo Portfolio V2</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
