"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experiences } from "@/data/profile";
import { revealProps } from "@/lib/motion";
import { SectionHeader } from "./SectionHeader";

export function ExperienceList() {
  const reduce = useReducedMotion();
  return (
    <section
      id="experience"
      className="border-t border-[var(--color-border)] px-[var(--gutter)] py-[var(--space-section-inner)]"
    >
      <SectionHeader index="02" label="Experience" title="Where I've built things" />

      <div className="mt-12 max-w-[68ch] space-y-10">
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.company}
            {...revealProps(reduce, { y: 24, duration: 0.55, delay: i * 0.08 })}
            className="relative border-l border-[var(--color-border)] pl-6"
          >
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-serif text-[var(--text-h3)] text-[var(--color-text)]">
                {exp.company}
                {exp.current && (
                  <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
                    ● Now
                  </span>
                )}
              </h3>
              <span className="font-mono text-xs tracking-wider text-[var(--color-text-dim)]">
                {exp.period}
              </span>
            </div>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{exp.role}</p>

            <ul className="mt-4 space-y-2">
              {exp.bullets.map((b, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-[var(--text-body)] leading-[1.8] text-[var(--color-text-body)]"
                >
                  <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-dim)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {exp.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]"
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
