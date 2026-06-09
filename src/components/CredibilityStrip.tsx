"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skills, projects, experiences } from "@/data/profile";
import { revealProps } from "@/lib/motion";

const STATS = [
  { value: `${skills.languages.length}+`, label: "Languages" },
  { value: `${projects.length}`, label: "Projects" },
  { value: `${experiences.length}`, label: "Internships" },
];

const AFFILIATIONS = ["東京理科大学", "Delight", "Ollo", "Kaggle", "OR 学会", "技育展"];

export function CredibilityStrip() {
  const reduce = useReducedMotion();
  return (
    <motion.section
      {...revealProps(reduce, { y: 16, duration: 0.5 })}
      className="px-[var(--gutter)] pb-12"
      aria-label="Highlights"
    >
      <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-sm)]">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-5 py-5 ${i > 0 ? "border-l border-[var(--color-border)]" : ""}`}
          >
            <div className="font-serif text-[1.7rem] leading-none text-[var(--color-text)]">
              {s.value}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-dim)]">
        {AFFILIATIONS.map((a, i) => (
          <span key={a} className="flex items-center gap-3">
            {i > 0 && <span className="text-[var(--color-border-strong)]">/</span>}
            {a}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
