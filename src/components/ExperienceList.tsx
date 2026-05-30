"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/profile";
import { SectionHeader } from "./SectionHeader";

export function ExperienceList() {
  return (
    <section
      id="experience"
      className="border-t border-[var(--color-border)] px-6 py-16 lg:px-14 lg:py-20"
    >
      <SectionHeader index="02" label="Experience" title="Experience" />

      <div className="mt-10 space-y-10">
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative border-l border-[var(--color-border)] pl-6"
          >
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-serif text-xl text-[var(--color-text)]">
                {exp.company}
                {exp.current && (
                  <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
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
                <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-dim)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {exp.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]"
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
