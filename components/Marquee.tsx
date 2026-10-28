"use client";

import { useRef, useEffect, useState } from "react";

const BRANDS = [
  "Star Nutrition",
  "Gold Nutrition",
  "Optimum Nutrition",
  "BSN",
  "Ei",
  "Mervick",
  "Everlast",
  "Granger",
];

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

  // Duplicate 3x for seamless loop
  const items = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div
      className="bg-brand-gold text-brand-black overflow-hidden border-y-2 border-brand-black"
      aria-hidden="true"
    >
      {prefersReduced ? (
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 py-[10px] px-4">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="font-[family-name:var(--font-display)] font-black italic text-[clamp(24px,3.4vw,38px)] uppercase"
            >
              {brand}
            </span>
          ))}
        </div>
      ) : (
        <div
          ref={trackRef}
          className="flex w-max whitespace-nowrap animate-marquee py-[10px]"
          style={{ animationPlayState: paused ? "paused" : "running" }}
          onMouseEnter={() => { if (isPointerFine) setPaused(true); }}
          onMouseLeave={() => { if (isPointerFine) setPaused(false); }}
        >
          {items.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="px-[22px] inline-flex items-center gap-[22px] font-[family-name:var(--font-display)] font-black italic text-[clamp(24px,3.4vw,38px)] uppercase"
            >
              {brand}
              {/* Dot separator (like a weight plate hole) */}
              <span
                className="inline-block w-[.5em] h-[.5em] rounded-full border-[.16em] border-current"
                style={{
                  boxShadow: "inset 0 0 0 .08em var(--color-brand-gold), inset 0 0 0 .2em currentColor",
                }}
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
