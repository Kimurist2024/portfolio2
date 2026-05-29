"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const metaY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const tagChars = profile.tagline.split("");

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative h-[140vh] w-full overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-[var(--color-accent-deep)]/20 blur-[160px] float-slow" />
        <div
          className="absolute top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-[var(--color-accent)]/10 blur-[140px] float-slow"
          style={{ animationDelay: "-6s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg)]/30 to-[var(--color-bg)]" />
      </motion.div>

      <div className="absolute inset-0 noise" />

      <motion.div
        style={{ opacity }}
        className="sticky top-0 flex h-screen w-full flex-col px-6 pt-32 pb-10 lg:px-12"
      >
        {/* Main — headline + supporting meta, optically centered */}
        <div className="flex flex-1 flex-col justify-center">
          <motion.div style={{ y: titleY }}>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="font-display text-[clamp(2.75rem,1.5rem+7.5vw,9rem)] leading-[0.95] tracking-tight"
            >
              <SplitLine delay={0.4}>
                <span className="gradient-text-blue">Build</span>{" "}
                <span className="italic font-light text-[var(--color-text-muted)]">
                  what
                </span>
              </SplitLine>
              <SplitLine delay={0.55}>
                <span className="text-[var(--color-text)]">others</span>{" "}
                <span className="gradient-text-blue">imagine.</span>
              </SplitLine>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              style={{ y: metaY }}
              className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
            >
              <div className="max-w-xl">
                <p className="text-[var(--text-lead)] leading-relaxed text-[var(--color-text)]">
                  {tagChars.map((c, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 + i * 0.012, duration: 0.4 }}
                      style={{ display: "inline-block" }}
                    >
                      {c === " " ? " " : c}
                    </motion.span>
                  ))}
                </p>
                <div className="mt-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                  <span className="block h-2 w-2 rotate-45 bg-[var(--color-accent)]" />
                  {profile.role}
                </div>
              </div>

              <div className="font-mono text-xs uppercase tracking-[0.28em] md:text-right">
                <p className="text-[var(--color-text-dim)]">Currently</p>
                <p className="mt-2 text-[var(--color-text)]">
                  SWE · Delight Co., Ltd.
                </p>
                <p className="mt-1 text-[var(--color-text-muted)]">
                  Research · Tokyo Univ. of Science
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom — single scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            ↓
          </motion.span>
          <span>Scroll to dive in</span>
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
