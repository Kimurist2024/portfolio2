"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative px-6 lg:px-12 py-12 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display text-[clamp(3rem,2rem+8vw,11rem)] leading-[0.85] gradient-text tracking-tighter"
          >
            KIMURA<br />RYUKI.
          </motion.h3>
        </div>
        <div className="lg:col-span-5 space-y-2 text-sm">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
            Portfolio © 2026
          </p>
          <p className="text-[var(--color-text-muted)]">
            Designed &amp; built by {profile.name}.
          </p>
          <p className="text-[var(--color-text-dim)] text-xs">
            Next.js · TypeScript · Tailwind CSS · Framer Motion · Lenis
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-dim)]">
        <p>v1.0 · Last updated 2026.05</p>
        <a href="#top" className="hover:text-[var(--color-accent-glow)] transition-colors">
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}
