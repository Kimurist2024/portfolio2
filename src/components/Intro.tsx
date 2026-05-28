"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import signature from "@/data/signature.json";

const WRITE_MS = 2400;
const HOLD_MS = 900;
const STROKE_WIDTH = 20;

const padding = 28;
const tb = signature.totalBbox;
const viewBox = `${tb.x1 - padding} ${tb.y1 - padding} ${
  tb.x2 - tb.x1 + padding * 2
} ${tb.y2 - tb.y1 + padding * 2}`;

const glyphs = signature.glyphs;
const N = glyphs.length;
const charDuration = 1 / N;

export function Intro() {
  const [show, setShow] = useState(true);
  const [lengths, setLengths] = useState<number[]>(() =>
    Array(N).fill(0),
  );
  const [progress, setProgress] = useState(0);
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(N).fill(null));

  useEffect(() => {
    const lens = pathRefs.current.map((p) => p?.getTotalLength() ?? 0);
    if (lens.every((l) => l === 0)) return;
    setLengths(lens);
  }, []);

  useEffect(() => {
    if (lengths.every((l) => l === 0)) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(1, elapsed / WRITE_MS);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lengths]);

  useEffect(() => {
    if (progress < 1) return;
    const t = setTimeout(() => setShow(false), HOLD_MS);
    return () => clearTimeout(t);
  }, [progress]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function glyphProgress(i: number): number {
    return Math.max(
      0,
      Math.min(1, (progress - i * charDuration) / charDuration),
    );
  }

  let activeIdx = -1;
  for (let i = 0; i < N; i++) {
    const gp = glyphProgress(i);
    if (gp > 0 && gp < 1) {
      activeIdx = i;
      break;
    }
  }
  if (activeIdx === -1 && progress > 0 && progress < 1) {
    for (let i = N - 1; i >= 0; i--) {
      if (glyphProgress(i) > 0) {
        activeIdx = i;
        break;
      }
    }
  }

  let penX = 0;
  let penY = 0;
  if (
    activeIdx >= 0 &&
    pathRefs.current[activeIdx] &&
    lengths[activeIdx] > 0
  ) {
    const gp = glyphProgress(activeIdx);
    const pt = pathRefs.current[activeIdx]!.getPointAtLength(
      lengths[activeIdx] * gp,
    );
    penX = pt.x;
    penY = pt.y;
  }

  const done = progress >= 1;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[var(--color-bg)]"
          onClick={() => setShow(false)}
          aria-hidden
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[var(--color-accent)]/8 blur-[140px]" />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-text-muted)]"
            >
              — Portfolio · 2026 —
            </motion.span>

            <svg
              viewBox={viewBox}
              className="w-[80vw] max-w-[720px] h-auto"
              preserveAspectRatio="xMidYMid meet"
              style={{ overflow: "visible" }}
            >
              {glyphs.map((g, i) => {
                const len = lengths[i];
                const gp = glyphProgress(i);
                const off = len * (1 - gp);
                return (
                  <path
                    key={i}
                    ref={(el) => {
                      pathRefs.current[i] = el;
                    }}
                    d={g.d}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth={STROKE_WIDTH}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: len || 99999,
                      strokeDashoffset: len ? off : 99999,
                    }}
                  />
                );
              })}

              {!done && activeIdx >= 0 && lengths[activeIdx] > 0 && (
                <g style={{ pointerEvents: "none" }}>
                  <circle
                    cx={penX}
                    cy={penY}
                    r={16}
                    fill="var(--color-accent)"
                    opacity={0.18}
                  />
                  <circle
                    cx={penX}
                    cy={penY}
                    r={8}
                    fill="var(--color-accent)"
                    opacity={0.35}
                  />
                  <circle
                    cx={penX}
                    cy={penY}
                    r={4}
                    fill="var(--color-accent)"
                  />
                </g>
              )}
            </svg>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: done ? 1 : 0,
                scaleX: done ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-32 origin-center bg-[var(--color-accent)]/40"
            />
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: done ? 1 : 0,
                y: done ? 0 : 8,
              }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-text-dim)]"
            >
              Kimura Ryuki / 木村 竜輝
            </motion.span>
          </div>

          <span className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-dim)] opacity-60">
            click / esc to skip
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
