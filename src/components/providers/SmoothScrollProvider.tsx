"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reset browser auto-scroll restoration so page always opens at top
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // If there's no hash anchor, make sure we initialize at the very top (0, 0)
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    } else {
      const targetEl = document.querySelector(window.location.hash);
      if (targetEl) {
        lenis.scrollTo(targetEl as HTMLElement, { offset: -60 });
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
