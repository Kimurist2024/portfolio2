"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import pixelData from "@/data/avatar-pixels.json";

type Raw = (number | string)[];
const D = pixelData as unknown as {
  cols: number;
  rows: number;
  skin: string;
  eyeL: [number, number];
  eyeR: [number, number];
  dots: Raw[];
};

interface Dot {
  c: number;
  r: number;
  hex: string;
  g: number;
}

const ALL: Dot[] = D.dots.map((d) => ({
  c: d[0] as number,
  r: d[1] as number,
  hex: d[2] as string,
  g: d.length > 3 ? (d[3] as number) : 0,
}));
const EYES = ALL.filter((d) => d.g === 3 || d.g === 4);

const DOT_FILL = 0.62; // larger dots -> denser, richer fill (less airy)
// Whole-head lean toward the cursor — the eyes/brows are baked into the face
// and move WITH it, so nothing detaches or floats.
const LEAN_TX = 12;
const LEAN_TY = 9;
const LEAN_ROT = 5;
const BLINK_MS = 160;

export function PixelAvatar() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const leanRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");
    if (!offCtx) return;

    let cell = 1;
    let ox = 0;
    let oy = 0;
    let dpr = 1;
    let cssW = 0;
    let cssH = 0;

    const dot = (g: CanvasRenderingContext2D, x: number, y: number, rad: number, fill: string) => {
      g.beginPath();
      g.fillStyle = fill;
      g.arc(x, y, rad, 0, Math.PI * 2);
      g.fill();
    };

    // The complete face, baked once. Eyes & brows are part of it.
    const buildStatic = () => {
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.clearRect(0, 0, cssW, cssH);
      const rad = cell * DOT_FILL;
      for (const d of ALL) dot(offCtx, ox + d.c * cell, oy + d.r * cell, rad, d.hex);
    };

    const blit = () => {
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.drawImage(off, 0, 0, cssW, cssH);
    };

    const resize = () => {
      cssW = wrap.clientWidth;
      cssH = wrap.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const cv of [canvas, off]) {
        cv.width = Math.round(cssW * dpr);
        cv.height = Math.round(cssH * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.min(cssW / (D.cols + 2), cssH / (D.rows + 2));
      ox = (cssW - D.cols * cell) / 2 + cell / 2;
      oy = (cssH - D.rows * cell) / 2 + cell / 2;
      buildStatic();
      blit();
    };

    // Brief blink: cover the (baked) eyes with skin + a lash line, then restore.
    const drawClosed = () => {
      blit();
      const rad = cell * DOT_FILL * 1.15;
      for (const d of EYES) dot(ctx, ox + d.c * cell, oy + d.r * cell, rad, D.skin);
      ctx.strokeStyle = "#3a2c1c";
      ctx.lineWidth = Math.max(2, cell * 0.45);
      ctx.lineCap = "round";
      for (const e of [D.eyeL, D.eyeR]) {
        const ex = ox + e[0] * cell;
        const ey = oy + e[1] * cell;
        ctx.beginPath();
        ctx.moveTo(ex - cell * 2.1, ey);
        ctx.lineTo(ex + cell * 2.1, ey);
        ctx.stroke();
      }
    };

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let blinkStart = -1;
    let wasClosed = false;

    const applyLean = () => {
      const lean = leanRef.current;
      if (lean) {
        lean.style.transform = `translate3d(${cur.x * LEAN_TX}px, ${cur.y * LEAN_TY}px, 0) rotate(${cur.x * LEAN_ROT}deg)`;
      }
    };

    let raf = 0;
    let running = false;
    let visible = true;

    const tick = (now: number) => {
      cur.x += (target.x - cur.x) * 0.16;
      cur.y += (target.y - cur.y) * 0.16;
      applyLean();

      let blinking = false;
      if (blinkStart >= 0) {
        const t = (now - blinkStart) / BLINK_MS;
        if (t >= 1) {
          blinkStart = -1;
          if (wasClosed) {
            blit();
            wasClosed = false;
          }
        } else {
          blinking = true;
          const open = Math.abs(t * 2 - 1); // 1 -> 0 -> 1
          if (open < 0.5) {
            drawClosed();
            wasClosed = true;
          } else if (wasClosed) {
            blit();
            wasClosed = false;
          }
        }
      }

      const moving = Math.abs(target.x - cur.x) > 0.004 || Math.abs(target.y - cur.y) > 0.004;
      if (moving || blinking) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const ensureRunning = () => {
      if (!running && visible && !document.hidden) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const ccx = rect.left + rect.width / 2;
      const ccy = rect.top + rect.height / 2;
      target.x = Math.max(-1, Math.min(1, (e.clientX - ccx) / (window.innerWidth / 2)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - ccy) / (window.innerHeight / 2)));
      ensureRunning();
    };

    let blinkTimer = 0;
    const scheduleBlink = () => {
      const delay = 2800 + Math.floor(performance.now() % 3600);
      blinkTimer = window.setTimeout(() => {
        if (visible && !document.hidden) {
          blinkStart = performance.now();
          ensureRunning();
        }
        scheduleBlink();
      }, delay);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) ensureRunning();
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (!document.hidden) ensureRunning();
    };

    resize();
    window.addEventListener("resize", resize);

    if (!reduceMotion) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      scheduleBlink();
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (blinkTimer) clearTimeout(blinkTimer);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-[56/67] w-[clamp(160px,44vw,210px)] lg:w-[clamp(220px,19vw,300px)]"
    >
      <div className="pointer-events-none absolute inset-4 rounded-full bg-[var(--color-accent)]/14 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-8 bottom-2 h-5 rounded-[50%] bg-[rgba(10,14,26,0.22)] blur-md" />
      <div className="avatar-float absolute inset-0">
        <div ref={leanRef} className="h-full w-full will-change-transform">
          <canvas ref={canvasRef} className="h-full w-full" role="img" aria-label="Kimura Ryuki" />
        </div>
      </div>
    </div>
  );
}
