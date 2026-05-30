"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/data/profile";
import { SectionHeader } from "./SectionHeader";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  research: "Research",
  competition: "Competition",
  product: "Product",
};

export function ProjectGrid() {
  return (
    <section
      id="projects"
      className="border-t border-[var(--color-border)] px-6 py-16 lg:px-14 lg:py-20"
    >
      <SectionHeader index="03" label="Projects" title="Selected work" />

      <div className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]/50"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {CATEGORY_LABEL[p.category]}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[var(--color-text-dim)]">
                {p.period}
              </span>
            </div>

            <h3 className="mt-4 font-serif text-2xl leading-tight text-[var(--color-text)]">
              {p.title}
            </h3>
            <p className="mt-1.5 text-sm italic text-[var(--color-text-muted)]">{p.subtitle}</p>

            <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
              {p.description[0]}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 5).map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-[var(--color-surface-strong)] px-2.5 py-1 font-mono text-[10px] tracking-wide text-[var(--color-text-muted)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
