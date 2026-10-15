"use client";

import Image from "next/image";

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function NDSocial() {
  return (
    <div className="py-6 sm:py-8 bg-brand-dark border-t border-brand-gold/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-3 text-brand-silver-dark/50 text-xs sm:text-sm">
        <span>Diseñado por</span>
        <a
          href="https://instagram.com/NDSocial_"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-brand-silver transition-colors min-h-[44px]"
        >
          <div className="relative w-5 h-5 rounded-full overflow-hidden">
            <Image
              src="/images/NDSocial/NDSocial-20.png"
              alt="NDSocial"
              fill
              className="object-contain"
              loading="lazy"
            />
          </div>
          <span className="font-medium">NDSocial</span>
        </a>
      </div>
    </div>
  );
}
