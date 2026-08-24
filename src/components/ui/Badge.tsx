import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "solid" | "muted";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono tracking-tight transition-colors",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        variant === "default" && "bg-[#EBEBE8] text-[#111111] border border-[#D9D9D9]",
        variant === "outline" && "bg-transparent text-[#737373] border border-[#D9D9D9]",
        variant === "solid" && "bg-[#111111] text-[#F5F5F3] border border-[#111111]",
        variant === "muted" && "bg-[#F5F5F3] text-[#737373] border border-[#E5E5E5]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
