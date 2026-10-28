"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-wrap">
        <Image
          src="/images/NDSocial/logoAV.jpeg"
          alt="A&V Suplementos"
          width={120}
          height={36}
          style={{ height: 36, width: "auto" }}
        />
        <span>&copy; 2026 A&amp;V Suplementos</span>
      </div>

      <style jsx>{`
        .site-footer {
          border-top: 1px solid var(--color-brand-line, rgba(255, 255, 255, 0.09));
        }
        .footer-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          padding-block: 28px calc(28px + 76px);
          color: var(--color-brand-mute, #9a9a9a);
          font-size: 14px;
        }
      `}</style>
    </footer>
  );
}
