"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const TOTAL_MS = 2600;

export function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => setShow(false), TOTAL_MS);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[var(--color-bg)]"
          onClick={() => setShow(false)}
          aria-hidden
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[var(--color-accent)]/8 blur-[140px]" />
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-text-muted)]"
            >
              — Portfolio · 2026 —
            </motion.span>

            <svg
              viewBox="0 0 600 220"
              className="w-[80vw] max-w-[600px]"
              role="img"
              aria-label="Ryuhki signature"
            >
              <text
                x="50%"
                y="62%"
                textAnchor="middle"
                className="font-script"
                style={{
                  fontSize: "150px",
                  fontWeight: 700,
                  fill: "var(--color-accent)",
                  fillOpacity: 0,
                  stroke: "var(--color-accent)",
                  strokeWidth: 1.6,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeDasharray: 3000,
                  strokeDashoffset: 3000,
                  animation:
                    "draw-name 1.9s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards, ink-fill 0.6s ease 1.7s forwards",
                  paintOrder: "stroke fill",
                }}
              >
                Ryuhki
              </text>
            </svg>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-32 origin-center bg-[var(--color-accent)]/40"
            />
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.5 }}
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
