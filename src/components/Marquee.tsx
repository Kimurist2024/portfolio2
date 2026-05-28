"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ITEMS = [
  "AI & Optimization",
  "3D Reconstruction",
  "Self-Supervised Learning",
  "Symbolic Regression",
  "High-Performance C++",
  "Multi-Agent Systems",
  "Disaster Robotics",
];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div
      ref={ref}
      className="relative border-y border-white/5 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg-soft)] to-[var(--color-bg)] py-10 overflow-hidden"
    >
      <motion.div style={{ x }} className="marquee-track">
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display text-5xl md:text-7xl text-[var(--color-text-muted)]"
          >
            <span className="whitespace-nowrap">{t}</span>
            <span className="text-[var(--color-accent)]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
