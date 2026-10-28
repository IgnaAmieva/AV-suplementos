"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  // Force scroll to top on page load (prevent browser scroll restoration)
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Disable on touch devices — native scroll feels better on mobile
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let lenis: InstanceType<typeof import("lenis").default> | null = null;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Handle anchor clicks
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          const href = (e.currentTarget as HTMLAnchorElement).getAttribute(
            "href"
          );
          if (!href || href === "#") return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis?.scrollTo(target as HTMLElement, { offset: -80 });
          }
        });
      });
    });

    return () => {
      lenis?.destroy();
    };
  }, []);

  return null;
}
