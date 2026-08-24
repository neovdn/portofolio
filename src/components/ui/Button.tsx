"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  external?: boolean;
}

export function Button({
  children,
  className,
  href,
  variant = "primary",
  size = "md",
  external = false,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const variantClasses = {
    primary:
      "bg-[#111111] text-[#F5F5F3] border border-[#111111] hover:bg-[#262626] hover:border-[#262626]",
    secondary:
      "bg-[#EBEBE8] text-[#111111] border border-[#D9D9D9] hover:bg-[#DFDFDC] hover:border-[#B5B5B2]",
    outline:
      "bg-transparent text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-[#F5F5F3]",
    ghost:
      "bg-transparent text-[#737373] hover:text-[#111111] hover:bg-[#EBEBE8]/50",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-[11px]",
    md: "px-4 py-2.5 text-xs",
    lg: "px-6 py-3.5 text-xs tracking-widest font-medium",
  };

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
