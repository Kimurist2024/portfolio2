"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
}

export function SectionHeader({ index, label, title }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
        <span className="h-px w-8 bg-[var(--color-accent)]" />
        <span className="text-[var(--color-text-dim)]">{index}</span>
        <span>{label}</span>
      </div>
      <h2 className="mt-4 font-serif text-[clamp(2rem,1rem+3.2vw,3.4rem)] font-medium leading-[1.04] tracking-tight text-[var(--color-text)]">
        {title}
      </h2>
    </motion.div>
  );
}
