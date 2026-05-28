"use client";

import { motion } from "framer-motion";
import { articles } from "@/data/profile";

export function Journal() {
  return (
    <section
      id="journal"
      className="relative px-6 lg:px-12 py-[var(--space-section)] border-t border-white/5"
    >
      <SectionLabel index="03" label="Journal" />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <h2 className="font-display text-[var(--text-display)] leading-[0.9] lg:col-span-7">
          <span className="block text-white">考えていることを</span>
          <span className="block gradient-text-blue italic font-light">書く。</span>
        </h2>
        <p className="lg:col-span-4 lg:col-start-9 text-[var(--color-text-muted)] leading-relaxed">
          研究・実装・コンペで触れた手法について、自分の言葉でまとめている記事のリスト。
          まだ公開準備中のものもあります。
        </p>
      </div>

      <div className="mt-20 space-y-0">
        {articles.map((article, i) => (
          <motion.article
            key={article.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
            className="group relative cursor-pointer border-t border-white/10 last:border-b py-8 transition-all hover:bg-white/[0.015]"
          >
            <div className="grid grid-cols-12 items-center gap-4 lg:gap-8">
              <div className="col-span-12 lg:col-span-1 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-text-dim)]">
                0{i + 1}
              </div>
              <div className="col-span-12 lg:col-span-7">
                <h3 className="font-display text-2xl lg:text-3xl text-white leading-tight transition-colors group-hover:text-[var(--color-accent-glow)]">
                  {article.title}
                </h3>
                <p className="mt-2 text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
                  {article.excerpt}
                </p>
              </div>
              <div className="col-span-6 lg:col-span-2">
                <span className="inline-flex border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                  {article.tag}
                </span>
              </div>
              <div className="col-span-6 lg:col-span-2 flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-[var(--color-text-muted)]">
                  {article.date}
                </span>
                <span className="block h-8 w-8 rounded-full border border-white/20 grid place-items-center text-white/60 transition-all group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent-glow)] group-hover:rotate-45">
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 10L10 2M10 2H4M10 2V8" />
                  </svg>
                </span>
              </div>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-[var(--color-accent)] to-transparent"
            />
          </motion.article>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-dim)] text-right"
      >
        ※ Drafts. Will be linked once published.
      </motion.p>
    </section>
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
      <span className="text-white">/ {label}</span>
    </motion.div>
  );
}
