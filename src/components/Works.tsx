"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/profile";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  research: "Research",
  product: "Product",
  competition: "Competition",
};

export function Works() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const canScrollLeft = el.scrollLeft > 0;
      const canScrollRight =
        el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
      const goingRight = e.deltaY > 0;
      if ((goingRight && canScrollRight) || (!goingRight && canScrollLeft)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      isDown = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      isDown = false;
      el.style.cursor = "";
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClickCapture, true);

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollBy = (delta: number) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section
      id="works"
      className="relative px-6 lg:px-12 pt-[var(--space-section)] pb-32 border-t border-black/10"
    >
      <SectionLabel index="02" label="Selected Works" />

      <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
        <h2 className="font-display text-[var(--text-display)] leading-[0.9] max-w-3xl">
          <span className="block text-[var(--color-text)]">手を動かして</span>
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

      <div className="mt-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
          <span>{projects.length} works</span>
          <span className="block h-px w-12 bg-[var(--color-text-dim)]" />
          <span>Drag · Wheel · Arrow</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-440)}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/15 text-[var(--color-text)] transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(440)}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/15 text-[var(--color-text)] transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar mt-6 -mx-6 lg:-mx-12 overflow-x-auto overflow-y-hidden cursor-grab select-none"
      >
        <div className="flex gap-6 px-6 lg:px-12 pb-2">
          {projects.map((p, i) => (
            <WorkCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>

      <div className="mt-6 h-px bg-black/10 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
          style={{ width: `${Math.max(8, progress * 100)}%`, transition: "width 0.2s" }}
        />
      </div>
    </section>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-[520px] w-[85vw] max-w-[440px] flex-none snap-start overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-black/[0.03] to-black/[0.01] transition-all hover:border-[var(--color-accent)]/40 hover:shadow-[0_30px_60px_-30px_rgba(31,111,235,0.25)]"
    >
      <div className="absolute inset-0 opacity-40 grid-bg" />

      <div className="relative flex h-full flex-col p-8">
        <header className="flex items-start justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            <p>
              0{index + 1} / 0{projects.length}
            </p>
            <p className="mt-1 text-[var(--color-accent)]">
              {CATEGORY_LABEL[project.category]}
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-dim)] text-right">
            {project.period}
          </span>
        </header>

        <div className="mt-auto">
          <h3 className="font-display text-3xl leading-tight text-[var(--color-text)]">
            {project.title}
          </h3>
          <p className="mt-3 text-[var(--color-accent)] text-sm font-mono">
            {project.subtitle}
          </p>
          <div className="mt-5 space-y-3 text-sm text-[var(--color-text-muted)] leading-relaxed max-h-[140px] overflow-hidden">
            {project.description.slice(0, 2).map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 6).map((s) => (
              <span
                key={s}
                className="border border-black/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-[30%] bg-gradient-to-r from-[var(--color-accent)] to-transparent transition-all duration-500 group-hover:w-full" />
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
      <span className="text-[var(--color-text)]">/ {label}</span>
    </motion.div>
  );
}
