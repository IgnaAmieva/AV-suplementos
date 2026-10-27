"use client";

import { useRef, useEffect, useMemo } from "react";
import { useCart } from "./CartContext";
import { getProductById, PLATE_COLORS } from "@/data/productos";

const MAX_VISIBLE = 7;

/**
 * Olympic barbell SVG that visualises the cart as colored bumper plates.
 * Each cart line becomes one plate per quantity unit, coloured by category.
 * Max 7 discs per side; overflow shown as "+N discos más".
 *
 * @param animate  – bounce-in the newest plate + shake the bar (true in rack, false in panel)
 */
export default function BarbellBar({ animate = false }: { animate?: boolean }) {
  const { items } = useCart();
  const svgRef = useRef<SVGSVGElement>(null);
  const prevCountRef = useRef(0);

  // Flatten cart items into an array of category slugs (one per unit)
  const plates = useMemo(() => {
    const out: string[] = [];
    items.forEach((item) => {
      const p = getProductById(item.option);
      const cat = p?.categoria ?? "varios";
      for (let i = 0; i < item.quantity; i++) out.push(cat);
    });
    return out;
  }, [items]);

  const shown = plates.slice(0, MAX_VISIBLE);
  const overflow = plates.length - shown.length;
  const totalCount = plates.length;

  // Animate newest plate + bar shake
  useEffect(() => {
    if (!animate || !svgRef.current) return;
    if (totalCount <= prevCountRef.current) {
      prevCountRef.current = totalCount;
      return;
    }
    prevCountRef.current = totalCount;

    const svg = svgRef.current;
    const lastIdx = shown.length - 1;
    if (lastIdx < 0) return;

    const leftPlate = svg.querySelector(`[data-side="L"][data-i="${lastIdx}"]`) as SVGGElement | null;
    const rightPlate = svg.querySelector(`[data-side="R"][data-i="${lastIdx}"]`) as SVGGElement | null;

    // Slide-in animation
    const slideIn = (el: SVGGElement, fromX: number) => {
      el.style.transition = "none";
      el.style.transform = `translateX(${fromX}px)`;
      el.getBoundingClientRect(); // force reflow
      el.style.transition = "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)";
      el.style.transform = "translateX(0)";
    };

    if (leftPlate) slideIn(leftPlate, -260);
    if (rightPlate) slideIn(rightPlate, 260);

    // Bar shake
    let frame = 0;
    const shakeFrames = [0, 5, -4, 3, -2, 1, 0];
    const shakeTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (frame >= shakeFrames.length) {
          clearInterval(interval);
          svg.style.transform = "";
          return;
        }
        svg.style.transform = `translateY(${shakeFrames[frame]}px)`;
        frame++;
      }, 50);
    }, 380);

    return () => clearTimeout(shakeTimer);
  }, [totalCount, animate, shown.length]);

  // Build plate pairs
  const platePairs = shown.map((cat, i) => {
    const [color, label] = PLATE_COLORS[cat] ?? ["#888", "+"];
    const h = 176 - i * 6;
    const w = 22;
    const xl = 184 - i * (w + 4) - w;
    const xr = 696 + i * (w + 4);
    const y = 100 - h / 2;
    const isLight = color === "#EDEDED" || color === "#E8B92A" || color === "#C9A227";
    const txtCol = isLight ? "#111" : "#fff";

    const plate = (x: number, side: string) => (
      <g key={`${side}-${i}`} data-side={side} data-i={i}>
        <rect x={x} y={y} width={w} height={h} rx={5} fill={color} />
        <rect x={x + 3} y={y + 8} width={w - 6} height={h - 16} rx={3} fill="none" stroke="rgba(0,0,0,.25)" />
        <text
          x={x + w / 2}
          y={100}
          fill={txtCol}
          fontFamily="'Barlow Condensed', sans-serif"
          fontWeight={800}
          fontSize={12}
          textAnchor="middle"
          transform={`rotate(-90 ${x + w / 2} 100)`}
        >
          {label}
        </text>
      </g>
    );

    return (
      <g key={i}>
        {plate(xl, "L")}
        {plate(xr, "R")}
      </g>
    );
  });

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 880 200"
      className="w-full max-w-[880px]"
      aria-label="Tu pedido como barra cargada"
      role="img"
    >
      <defs>
        <pattern id="kn" width={6} height={6} patternUnits="userSpaceOnUse">
          <path d="M0 0L6 6M6 0L0 6" stroke="#777" strokeWidth={1} />
        </pattern>
      </defs>

      {/* Bar */}
      <rect x={20} y={92} width={840} height={16} rx={8} fill="#BDBDBD" />
      {/* Knurl texture */}
      <rect x={300} y={92} width={280} height={16} fill="url(#kn)" opacity={0.6} />
      {/* Collars */}
      <rect x={196} y={78} width={14} height={44} rx={3} fill="#9a9a9a" />
      <rect x={670} y={78} width={14} height={44} rx={3} fill="#9a9a9a" />

      {/* Plates */}
      {platePairs}

      {/* Overflow text */}
      {overflow > 0 && (
        <text
          x={440}
          y={70}
          fill="#E8C55A"
          fontFamily="'Barlow Condensed', sans-serif"
          fontWeight={900}
          fontSize={26}
          textAnchor="middle"
        >
          +{overflow} discos más
        </text>
      )}

      {/* Empty state */}
      {plates.length === 0 && (
        <text
          x={440}
          y={160}
          fill="#666"
          fontFamily="'Barlow Condensed', sans-serif"
          fontWeight={700}
          fontSize={20}
          letterSpacing={3}
          textAnchor="middle"
        >
          SUMÁ UN PRODUCTO Y CARGÁ LA BARRA
        </text>
      )}
    </svg>
  );
}
