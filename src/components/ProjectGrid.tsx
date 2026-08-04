"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects, type Project } from "@/data/profile";
import { revealProps } from "@/lib/motion";
import { SectionHeader } from "./SectionHeader";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  research: "Research",
  competition: "Competition",
  product: "Product",
};

const LIFT =
  "transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:border-[color-mix(in_oklab,var(--color-accent)_55%,transparent)]";

export function ProjectGrid() {
  const reduce = useReducedMotion();
  return (
    <section
      id="projects"
      className="relative border-t border-[var(--color-border)] px-[var(--gutter)] py-[var(--space-section-inner)]"
    >
      {/* one faint theme-aware glow anchoring the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-24 h-72 w-72 rounded-full bg-[var(--color-accent)]/8 blur-[120px]"
      />

      <div className="relative">
        <SectionHeader index="03" label="Projects" title="Selected work" />
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-7">
        {projects.map((p, i) => {
          const card = (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
                  {CATEGORY_LABEL[p.category]}
                </span>
                <span className="font-mono text-[10px] tracking-wider text-[var(--color-text-dim)]">
                  {p.period}
                </span>
              </div>

              {/* Award gets its own line so the category/period rail stays aligned
                  across every card in the grid. */}
              {p.award && (
                <div className="mt-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-award-border)] bg-[var(--color-award-surface)] px-2.5 py-1 font-mono text-[10px] tracking-wide text-[var(--color-award)]">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-[var(--color-award)] ring-2 ring-[var(--color-award-surface)]"
                    />
                    {p.award}
                  </span>
                </div>
              )}

              <h3 className="mt-4 font-serif text-[var(--text-h3)] leading-tight text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                {p.title}
              </h3>
              <p className="mt-1.5 font-serif text-sm italic text-[var(--color-text-muted)]">
                {p.subtitle}
              </p>

              <p className="mt-4 flex-1 text-[var(--text-body)] leading-[1.75] text-[var(--color-text-body)]">
                {p.description[0]}
              </p>

              <p className="mt-5 flex items-start gap-2 font-mono text-[11px] leading-snug text-[var(--color-text)]">
                <span className={p.award ? "text-[var(--color-award)]" : "text-[var(--color-accent)]"}>
                  →
                </span>
                {p.outcome}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 5).map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-[var(--color-surface-strong)] px-2.5 py-1 font-mono text-[10px] tracking-wide text-[var(--color-text-muted)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </>
          );

          const className = `group flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-md)] ${LIFT}`;

          return (
            <motion.div key={p.title} {...revealProps(reduce, { y: 24, duration: 0.5, delay: (i % 2) * 0.08 })}>
              {p.link ? (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`focus-ring ${className}`}
                >
                  {card}
                </a>
              ) : (
                <article className={className}>{card}</article>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
