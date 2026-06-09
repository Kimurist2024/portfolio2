"use client";

import { motion, useReducedMotion } from "framer-motion";
import { revealProps } from "@/lib/motion";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
}

export function SectionHeader({ index, label, title }: SectionHeaderProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div {...revealProps(reduce, { y: 20, duration: 0.6 })}>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
        <span className="h-px w-8 bg-[var(--color-accent)]" />
        <span className="text-[var(--color-text-dim)]">{index}</span>
        <span>{label}</span>
      </div>
      <h2 className="mt-5 font-serif text-[var(--text-section)] font-semibold leading-[0.95] tracking-[-0.02em] text-[var(--color-text)]">
        {title}
      </h2>
    </motion.div>
  );
}
