"use client";

import { motion, useReducedMotion } from "framer-motion";
import { articles } from "@/data/profile";
import { revealProps } from "@/lib/motion";
import { SectionHeader } from "./SectionHeader";

export function WritingList() {
  const reduce = useReducedMotion();
  return (
    <section
      id="writing"
      className="border-t border-[var(--color-border)] px-[var(--gutter)] py-[var(--space-section-inner)]"
    >
      <SectionHeader index="04" label="Writing" title="Notes & writing" />

      <ul className="mt-10 flex flex-col">
        {articles.map((a, i) => (
          <motion.li key={a.title} {...revealProps(reduce, { y: 16, duration: 0.45, delay: i * 0.05 })}>
            <div className="group -mx-4 rounded-xl border-t border-[var(--color-border)] px-4 py-6 transition-colors duration-300 hover:bg-[var(--color-surface)] [li:first-child_&]:border-t-0">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-dim)]">
                <span className="text-[var(--color-accent)]">{a.tag}</span>
                <span>·</span>
                <span>{a.date}</span>
              </div>
              <h3 className="mt-2 font-serif text-[var(--text-h3)] leading-snug text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                {a.title}
              </h3>
              <p className="mt-2 max-w-[68ch] text-[var(--text-body)] leading-[1.8] text-[var(--color-text-body)]">
                {a.excerpt}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
