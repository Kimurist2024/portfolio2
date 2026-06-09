"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { withBase } from "@/lib/paths";
import { revealProps } from "@/lib/motion";

const SITEMAP = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

const ELSEWHERE = [
  { label: "GitHub", href: profile.github },
  { label: "X", href: profile.x },
  { label: "Zenn", href: profile.zenn },
  { label: "Qiita", href: profile.qiita },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Résumé", href: withBase("/resume.pdf") },
];

const linkClass =
  "focus-ring inline-flex w-fit items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]";

export function Footer() {
  const reduce = useReducedMotion();
  return (
    <footer className="relative border-t border-[var(--color-border)] px-[var(--gutter)] py-16">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <motion.h3
            {...revealProps(reduce, { y: 40, duration: 0.8 })}
            className="font-display gradient-text text-[clamp(2.5rem,1.6rem+5vw,6rem)] leading-[0.86]"
          >
            Kimura
            <br />
            Ryuki.
          </motion.h3>
          <p className="mt-6 max-w-xs text-[var(--text-body)] leading-relaxed text-[var(--color-text-muted)]">
            数理最適化と AI で、現実世界の問題を解く。
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
            <span className="pulse-dot block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            Open to internships
          </div>
        </div>

        <nav aria-label="Sitemap" className="lg:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-dim)]">
            Sitemap
          </p>
          <ul className="mt-4 space-y-2.5">
            {SITEMAP.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-dim)]">
            Elsewhere
          </p>
          <ul className="mt-4 space-y-2.5">
            {ELSEWHERE.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") || l.href.startsWith("/") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`${linkClass} group`}
                >
                  {l.label}
                  <span aria-hidden className="text-[var(--color-text-dim)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-dim)]">
        <p>© 2026 Kimura Ryuki · Tokyo, Japan</p>
        <p className="hidden sm:block opacity-70">Next.js · TypeScript · Tailwind</p>
        <a href="#top" className="focus-ring transition-colors hover:text-[var(--color-accent)]">
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}
