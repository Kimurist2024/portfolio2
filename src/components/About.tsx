"use client";

import { motion } from "framer-motion";
import { experiences, profile, skills } from "@/data/profile";

export function About() {
  return (
    <section
      id="about"
      className="relative px-6 lg:px-12 py-[var(--space-section)]"
    >
      <SectionLabel index="01" label="About" />

      <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 lg:sticky lg:top-32 self-start"
        >
          <h2 className="font-display text-[var(--text-display)] leading-[0.9]">
            <span className="block text-white">問題は</span>
            <span className="block italic font-light text-[var(--color-text-muted)]">
              現実世界に
            </span>
            <span className="block gradient-text-blue">ある。</span>
          </h2>

          <div className="mt-10 space-y-5 text-[var(--color-text)] text-base lg:text-lg leading-relaxed max-w-md">
            <p>
              {profile.nameJa}。東京理科大学創域理工学部 情報計算科学科 2 年。
              AI と最適化アルゴリズム、そして高性能計算の境界で、現実世界の問題を解くための実装に取り組んでいます。
            </p>
            <p className="text-[var(--color-text-muted)]">
              機械学習モデルを論文から拾ってきて、現場のデータに馴染ませる。
              C++ で書かれた既存のシミュレータの計算量を一桁削る。
              そういう「研究と現場のあいだ」にある仕事に魅力を感じています。
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
            <Fact label="Based in" value="Tokyo, Japan" />
            <Fact label="Status" value="Open to collab" highlight />
            <Fact label="Focus" value="AI / HPC / Robotics" />
            <Fact label="Speaks" value="Japanese · English" />
          </dl>
        </motion.div>

        <div className="lg:col-span-7 space-y-20">
          <Block heading="Experience" sub="現在の所属と職歴">
            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <motion.article
                  key={exp.company}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, delay: i * 0.1 }}
                  className="group relative border-l border-white/10 pl-8 transition-colors hover:border-[var(--color-accent)]/50"
                >
                  <span
                    className={`absolute -left-[5px] top-1 block h-2.5 w-2.5 rounded-full ${
                      exp.current
                        ? "bg-[var(--color-accent)] pulse-glow"
                        : "bg-white/30"
                    }`}
                  />
                  <header className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl text-white">
                      {exp.company}
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                      {exp.period}
                    </span>
                  </header>
                  <p className="mt-1 text-sm text-[var(--color-accent-glow)] font-mono">
                    {exp.role}
                  </p>
                  <ul className="mt-5 space-y-2 text-[var(--color-text-muted)] leading-relaxed">
                    {exp.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="text-[var(--color-accent)] mt-1.5 block h-1 w-1 flex-none rounded-full bg-current" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] uppercase tracking-widest border border-white/10 px-2.5 py-1 text-[var(--color-text-muted)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </Block>

          <Block heading="Stack" sub="使用してきた技術">
            <div className="space-y-6">
              <StackRow label="Languages" items={[...skills.languages]} />
              <StackRow label="Frameworks" items={[...skills.frameworks]} />
              <StackRow label="Tools" items={[...skills.tools]} />
            </div>
          </Block>
        </div>
      </div>
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

function Fact({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="border-t border-white/10 pt-3">
      <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-dim)]">
        {label}
      </dt>
      <dd
        className={`mt-1 ${
          highlight ? "text-[var(--color-accent-glow)]" : "text-white"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function Block({
  heading,
  sub,
  children,
}: {
  heading: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="mb-8 flex items-baseline gap-4 border-b border-white/10 pb-4">
        <h3 className="font-display text-3xl text-white">{heading}</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-dim)]">
          — {sub}
        </span>
      </header>
      {children}
    </div>
  );
}

function StackRow({ label, items }: { label: string; items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 gap-3 md:grid-cols-[140px_1fr] md:gap-6"
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)] pt-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span
            key={s}
            className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-sm text-white/90 transition-all hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/10 hover:text-white"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
