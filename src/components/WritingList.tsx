"use client";

import { motion } from "framer-motion";
import { articles } from "@/data/profile";
import { SectionHeader } from "./SectionHeader";

export function WritingList() {
  return (
    <section
      id="writing"
      className="border-t border-[var(--color-border)] px-6 py-16 lg:px-14 lg:py-20"
    >
      <SectionHeader index="04" label="Writing" title="Notes & writing" />

      <ul className="mt-10 divide-y divide-[var(--color-border)]">
        {articles.map((a, i) => (
          <motion.li
            key={a.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group py-6 first:pt-0"
          >
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
              <span className="text-[var(--color-accent)]">{a.tag}</span>
              <span>·</span>
              <span>{a.date}</span>
            </div>
            <h3 className="mt-2 font-serif text-xl leading-snug text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
              {a.title}
            </h3>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[var(--color-text-muted)]">
              {a.excerpt}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
