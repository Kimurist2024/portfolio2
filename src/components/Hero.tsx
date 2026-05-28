"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const tokyo = now.toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Tokyo",
        hour12: false,
      });
      setTime(tokyo);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const tagWords = profile.tagline.split("");

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative h-[120vh] w-full overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-[var(--color-accent-deep)]/20 blur-[160px] float-slow" />
        <div className="absolute top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-[var(--color-accent)]/10 blur-[140px] float-slow" style={{ animationDelay: "-6s" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg)]/30 to-[var(--color-bg)]" />
      </motion.div>

      <div className="absolute inset-0 noise" />

      <motion.div
        style={{ opacity }}
        className="sticky top-0 flex h-screen w-full flex-col justify-between px-6 pt-32 pb-8 lg:px-12"
      >
        <div className="flex items-start justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]"
          >
            <div className="flex items-center gap-3">
              <span className="block h-px w-12 bg-[var(--color-accent)]" />
              <span>Portfolio / 2026 Edition</span>
            </div>
            <p className="mt-2 max-w-xs text-[var(--color-text-dim)] tracking-wider">
              Tokyo University of Science<br />
              Department of Information &amp; Computer Technology
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:block text-right font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]"
          >
            <p>JST {time}</p>
            <p className="mt-2 text-[var(--color-text-dim)]">N 35.7° / E 139.7°</p>
          </motion.div>
        </div>

        <motion.div style={{ y: titleY }} className="relative">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-display text-[clamp(3.5rem,2rem+11vw,13rem)] leading-[0.85] tracking-tight"
          >
            <SplitLine delay={0.6}>
              <span className="gradient-text">Build</span>{" "}
              <span className="italic font-light text-[var(--color-text-muted)]">what</span>
            </SplitLine>
            <SplitLine delay={0.8}>
              <span className="text-white">others</span>{" "}
              <span className="gradient-text-blue">imagine.</span>
            </SplitLine>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            style={{ y: subY }}
            className="mt-10 flex flex-wrap items-end justify-between gap-8"
          >
            <div className="max-w-xl">
              <p className="text-[var(--text-lead)] leading-relaxed text-[var(--color-text)]">
                {tagWords.map((c, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + i * 0.015, duration: 0.4 }}
                    style={{ display: "inline-block" }}
                  >
                    {c === " " ? " " : c}
                  </motion.span>
                ))}
              </p>
              <div className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                <span className="block h-2 w-2 rotate-45 bg-[var(--color-accent)]" />
                {profile.role}
              </div>
            </div>

            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)] text-right">
              <p className="text-[var(--color-text-dim)]">— Currently</p>
              <p className="text-white">SWE @ Delight Co., Ltd.</p>
              <p className="text-[var(--color-text-muted)]">+ Research @ TUS</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex items-end justify-between gap-4"
        >
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              ↓
            </motion.span>
            <span>Scroll to dive in</span>
          </div>
          <div className="hidden sm:block text-right font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-dim)]">
            <p>SECTION 00 / HERO</p>
            <p className="mt-1">{profile.nameJa}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SplitLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
