"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { projects, type Project } from "@/data/profile";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  research: "Research",
  product: "Product",
  competition: "Competition",
};

export function Works() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section id="works" className="relative">
      <div className="px-6 lg:px-12 pt-[var(--space-section)] pb-12">
        <SectionLabel index="02" label="Selected Works" />
        <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
          <h2 className="font-display text-[var(--text-display)] leading-[0.9] max-w-3xl">
            <span className="block text-white">手を動かして</span>
            <span className="block italic font-light text-[var(--color-text-muted)]">
              作ってきた
            </span>
            <span className="block gradient-text-blue">プロジェクト</span>
          </h2>
          <p className="max-w-sm text-[var(--color-text-muted)] leading-relaxed">
            研究、コンペティション、プロダクト。
            どれも「実装まで持っていく」ところまでやることを大事にしています。
          </p>
        </div>
      </div>

      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-6 lg:px-12">
            {projects.map((p, i) => (
              <WorkCard key={p.title} project={p} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative h-[70vh] w-[85vw] max-w-[560px] flex-none overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm transition-all"
    >
      <div className="absolute inset-0 opacity-50 grid-bg" />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute -inset-px rounded-3xl"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(74,158,255,0.15), transparent 40%)",
        }}
      />

      <div className="relative flex h-full flex-col p-8 lg:p-10">
        <header className="flex items-start justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            <p>0{index + 1} / 0{projects.length}</p>
            <p className="mt-1 text-[var(--color-accent-glow)]">
              {CATEGORY_LABEL[project.category]}
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-dim)] text-right">
            {project.period}
          </span>
        </header>

        <div className="mt-auto">
          <h3 className="font-display text-3xl lg:text-4xl leading-tight text-white">
            {project.title}
          </h3>
          <p className="mt-3 text-[var(--color-accent-glow)] text-sm font-mono">
            {project.subtitle}
          </p>
          <div className="mt-6 space-y-3 text-sm text-[var(--color-text-muted)] leading-relaxed max-h-[180px] overflow-hidden">
            {project.description.slice(0, 2).map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          animate={{ width: hovered ? "100%" : "30%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-glow)] to-transparent"
        />
      </div>
    </motion.article>
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]"
    >
      <span className="block h-px w-12 bg-[var(--color-accent)]" />
      <span className="text-[var(--color-text-dim)]">{index}</span>
      <span className="text-white">/ {label}</span>
    </motion.div>
  );
}
