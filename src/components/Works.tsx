"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/profile";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  research: "Research",
  product: "Product",
  competition: "Competition",
};

const CATEGORY_HUE: Record<Project["category"], number> = {
  research: 212,
  product: 270,
  competition: 16,
};

export function Works() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const draggingRef = useRef(false);

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
      draggingRef.current = true;
      el.dataset.dragging = "1";
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
      draggingRef.current = false;
      delete el.dataset.dragging;
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
          カードにマウスを乗せると 3D で反応します。
        </p>
      </div>

      <div className="mt-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
          <span>{projects.length} works</span>
          <span className="block h-px w-12 bg-[var(--color-text-dim)]" />
          <span>Drag · Wheel · Hover</span>
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
        style={{ perspective: "1400px" }}
      >
        <div className="flex gap-8 px-6 lg:px-12 pt-10 pb-14">
          {projects.map((p, i) => (
            <WorkCard
              key={p.title}
              project={p}
              index={i}
              draggingRef={draggingRef}
            />
          ))}
        </div>
      </div>

      <div className="mt-2 h-px bg-black/10 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
          style={{
            width: `${Math.max(8, progress * 100)}%`,
            transition: "width 0.2s",
          }}
        />
      </div>
    </section>
  );
}

function WorkCard({
  project,
  index,
  draggingRef,
}: {
  project: Project;
  index: number;
  draggingRef: React.MutableRefObject<boolean>;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const hue = CATEGORY_HUE[project.category];

  const setVars = useCallback((rx: number, ry: number, mx: number, my: number) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.style.setProperty("--mx", `${mx}%`);
    card.style.setProperty("--my", `${my}%`);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (draggingRef.current) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rotX = (0.5 - y) * 12;
        const rotY = (x - 0.5) * 12;
        setVars(rotX, rotY, x * 100, y * 100);
      });
    },
    [draggingRef, setVars],
  );

  const handleLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setHovered(false);
    setVars(0, 0, 50, 50);
  }, [setVars]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative h-[540px] w-[85vw] max-w-[440px] flex-none snap-start rounded-[28px] border border-black/10 bg-white/60 backdrop-blur-sm"
      style={{
        transform:
          "perspective(1400px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)",
        transformStyle: "preserve-3d",
        transition: hovered
          ? "transform 120ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease"
          : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms ease",
        boxShadow: hovered
          ? `0 30px 60px -25px hsla(${hue}, 80%, 50%, 0.35), 0 8px 24px -12px rgba(10,14,26,0.15)`
          : "0 4px 14px -8px rgba(10,14,26,0.1)",
        willChange: "transform",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] grid-bg opacity-30"
        style={{ transform: "translateZ(0.1px)" }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 280px at var(--mx, 50%) var(--my, 50%), hsla(${hue}, 90%, 60%, 0.18), transparent 65%)`,
        }}
      />

      <div
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 0deg at var(--mx, 50%) var(--my, 50%), transparent 0deg, hsla(${hue}, 90%, 65%, 0.25) 90deg, transparent 180deg)`,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div
        className="relative flex h-full flex-col p-8"
        style={{ transformStyle: "preserve-3d" }}
      >
        <header
          className="flex items-start justify-between gap-4"
          style={{ transform: "translateZ(24px)" }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            <p className="font-display text-3xl text-[var(--color-text)] leading-none tracking-tight">
              0{index + 1}
            </p>
            <p
              className="mt-2"
              style={{ color: `hsl(${hue}, 75%, 45%)` }}
            >
              {CATEGORY_LABEL[project.category]}
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-dim)] text-right">
            {project.period}
          </span>
        </header>

        <div
          className="mt-auto"
          style={{ transform: "translateZ(40px)" }}
        >
          <h3 className="font-display text-3xl leading-tight text-[var(--color-text)]">
            {project.title}
          </h3>
          <p
            className="mt-3 text-sm font-mono"
            style={{ color: `hsl(${hue}, 75%, 45%)` }}
          >
            {project.subtitle}
          </p>
          <div className="mt-5 space-y-3 text-sm text-[var(--color-text-muted)] leading-relaxed max-h-[140px] overflow-hidden">
            {project.description.slice(0, 2).map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
          <div
            className="mt-5 flex flex-wrap gap-1.5"
            style={{ transform: "translateZ(20px)" }}
          >
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

        <div
          className="pointer-events-none absolute bottom-6 right-6 grid h-10 w-10 place-items-center rounded-full text-white transition-all duration-500"
          style={{
            background: `hsl(${hue}, 80%, 52%)`,
            transform: hovered
              ? "translateZ(60px) scale(1) rotate(0deg)"
              : "translateZ(0px) scale(0.85) rotate(-45deg)",
            opacity: hovered ? 1 : 0.7,
          }}
        >
          →
        </div>
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
