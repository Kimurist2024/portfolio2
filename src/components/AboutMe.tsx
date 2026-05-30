"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";

function Hi({ children }: { children: ReactNode }) {
  return <span className="font-medium text-[var(--color-accent)]">{children}</span>;
}

const BULLETS: ReactNode[] = [
  <>
    <Hi>東京理科大学</Hi> 創域理工学部 情報計算科学科 に在籍
  </>,
  <>
    現在 <Hi>株式会社 Delight</Hi> で SWE インターン — C++ メッシュソフトの性能最適化 / Fortran シミュレーション
  </>,
  <>
    前職 <Hi>Ollo（AI スタートアップ）</Hi> で ML エンジニア — VideoMAE / AVION による動画分類とファインチューニング
  </>,
  <>
    <Hi>Kaggle</Hi>・<Hi>OR 学会</Hi>・<Hi>技育展</Hi> など、コンペティションとハッカソンに継続的に参加
  </>,
  <>
    興味があるのは <Hi>数理最適化</Hi>, <Hi>AI / ML</Hi>, <Hi>バックエンド</Hi>, そして <Hi>システムズ</Hi>
  </>,
  <>AI と最適化の境界で、現実世界の問題に挑むことに情熱を注いでいます</>,
];

export function AboutMe() {
  return (
    <section
      id="about"
      className="border-t border-[var(--color-border)] px-6 py-16 lg:px-14 lg:py-20"
    >
      <SectionHeader index="01" label="About Me" title="About me" />

      <ul className="mt-10 space-y-5">
        {BULLETS.map((b, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4 text-[var(--text-lead)] leading-relaxed text-[var(--color-text-muted)]"
          >
            <span aria-hidden className="mt-1.5 shrink-0 text-[var(--color-accent)]">
              ➤
            </span>
            <span>{b}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
