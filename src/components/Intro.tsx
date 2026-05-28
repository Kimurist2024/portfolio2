"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import signature from "@/data/signature.json";

const WRITE_MS = 2200;
const HOLD_MS = 1100;

const padding = 28;
const bb = signature.bbox;
const viewBox = `${bb.x1 - padding} ${bb.y1 - padding} ${
  bb.x2 - bb.x1 + padding * 2
} ${bb.y2 - bb.y1 + padding * 2}`;

export function Intro() {
  const [show, setShow] = useState(true);
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    setPathLength(len);
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
  }, []);

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

  let penX = 0;
  let penY = 0;
  if (pathRef.current && pathLength > 0 && progress < 1) {
    const pt = pathRef.current.getPointAtLength(pathLength * progress);
    penX = pt.x;
    penY = pt.y;
  }

  const dashOffset = pathLength * (1 - progress);
  const done = progress >= 0.98;

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
              <path
                ref={pathRef}
                d={signature.d}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={20}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: pathLength || 99999,
                  strokeDashoffset: pathLength
                    ? dashOffset
                    : 99999,
                }}
              />

              {!done && pathLength > 0 && (
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
