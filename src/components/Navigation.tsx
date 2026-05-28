"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { withBase } from "@/lib/paths";

const NAV_ITEMS = [
  { label: "About", href: "#about", index: "01" },
  { label: "Works", href: "#works", index: "02" },
  { label: "Journal", href: "#journal", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 backdrop-blur-xl bg-[var(--color-bg)]/75 border-b border-black/5"
            : "py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <a
            href="#top"
            className="group flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
          >
            <span className="block h-2 w-2 rounded-full bg-[var(--color-accent)] pulse-glow" />
            <span className="text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-text)]">
              K.R / Portfolio · 2026
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative px-5 py-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <span className="mr-1.5 text-[10px] text-[var(--color-text-dim)] group-hover:text-[var(--color-accent)] transition-colors">
                  {item.index}
                </span>
                {item.label}
                <span className="absolute inset-x-5 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--color-accent)] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={withBase("/resume.pdf")}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-black/10 bg-black/[0.02] px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-[var(--color-text)] transition-all hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
            >
              <span className="relative z-10">Resume</span>
              <svg
                className="relative z-10 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 10L10 2M10 2H4M10 2V8" />
              </svg>
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-black/10"
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-[var(--color-text)]" />
              <span className="block h-px w-5 bg-[var(--color-text)]" />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--color-bg)]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-6 py-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="h-10 w-10 rounded-full border border-black/10 text-lg"
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>
              <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="group flex items-baseline gap-4 border-b border-black/10 py-6"
                  >
                    <span className="font-mono text-xs text-[var(--color-text-dim)]">
                      {item.index}
                    </span>
                    <span className="font-display text-5xl text-[var(--color-text)]">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
