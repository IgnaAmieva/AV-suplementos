"use client";

import { useRef, useEffect, useState } from "react";

const BRANDS = [
  { name: "STAR NUTRITION", gold: false },
  { name: "GOLD NUTRITION", gold: true },
  { name: "OPTIMUM NUTRITION", gold: false },
  { name: "BSN", gold: false },
  { name: "EI", gold: true },
  { name: "MERVICK", gold: false },
  { name: "EVERLAST", gold: false },
];

const SEPARATOR = "✦";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setPrefersReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setIsPointerFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  // Build the repeated content — we duplicate 3x for seamless loop
  const items = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section
      aria-label="Marcas disponibles"
      className="relative py-6 sm:py-10 lg:py-14 bg-brand-black overflow-hidden border-y border-brand-gold/10"
    >
      {/* Static fallback for reduced motion */}
      {prefersReduced ? (
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 max-w-5xl mx-auto px-4">
          {BRANDS.map((brand) => (
            <span
              key={brand.name}
              className={`font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl uppercase tracking-wide ${
                brand.gold
                  ? "text-brand-gold"
                  : "text-transparent [-webkit-text-stroke:1.5px_var(--color-brand-silver-dark)] [text-stroke:1.5px_var(--color-brand-silver-dark)]"
              }`}
            >
              {brand.name}
            </span>
          ))}
        </div>
      ) : (
        <div
          ref={trackRef}
          className="flex whitespace-nowrap animate-marquee"
          style={{
            animationPlayState: paused ? "paused" : "running",
          }}
          onMouseEnter={() => {
            if (isPointerFine) setPaused(true);
          }}
          onMouseLeave={() => {
            if (isPointerFine) setPaused(false);
          }}
        >
          {items.map((brand, i) => (
            <span key={`${brand.name}-${i}`} className="flex items-center">
              <span
                className={`font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-4xl lg:text-6xl uppercase tracking-wide select-none ${
                  brand.gold
                    ? "text-brand-gold"
                    : "text-transparent [-webkit-text-stroke:1px_var(--color-brand-silver-dark)] sm:[-webkit-text-stroke:1.5px_var(--color-brand-silver-dark)] [text-stroke:1px_var(--color-brand-silver-dark)] sm:[text-stroke:1.5px_var(--color-brand-silver-dark)]"
                }`}
              >
                {brand.name}
              </span>
              <span className="text-brand-gold/30 text-sm sm:text-xl mx-4 sm:mx-6 lg:mx-10 select-none">
                {SEPARATOR}
              </span>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
