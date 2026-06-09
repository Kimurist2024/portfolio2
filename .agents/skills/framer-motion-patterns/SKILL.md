---
name: framer-motion-patterns
description: このポートフォリオで使うFramer Motionの再利用パターン集。テキストリビール、スクロールパララックス、横スクロールカード、ホバー演出、Marqueeなど。新しい動きを追加する前にここで該当パターンを探す。
---

# Framer Motion Patterns (for this portfolio)

すべての motion 値はトークン化されたイージング (`[0.16, 1, 0.3, 1]` = expo-out / `[0.76, 0, 0.24, 1]` = inout-quart) を使う。`prefers-reduced-motion` は globals.css で 0.01ms にフォールバックさせている。

## 1. テキストリビール (1 行ずつ持ち上げ)

`overflow-hidden` の親 + `y: 110% → 0%` の motion.span。
[Hero.tsx](../../../src/components/Hero.tsx) と [Contact.tsx](../../../src/components/Contact.tsx) で `SplitLine` 関数として実装済み。

```tsx
function SplitLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }} // or whileInView={{ y: "0%" }} viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
```

**使い時**: 見出しの初動。1 行ごとに `delay={0.6}, {0.8}, {1.0}` のように 0.15〜0.2 秒ずつずらす。

## 2. 文字ごとフェードイン

タグライン用。文字配列を `.split("")` して 1 文字ずつ Motion 化:

```tsx
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
```

**注意**: 半角スペースは `inline-block` の影響で詰まることがある。` ` (no-break space) で回避する。

## 3. スクロールパララックス

`useScroll` でセクションのスクロール進行を取り、`useTransform` で要素ごとに違う y/x/opacity に変換。

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"], // セクション top が viewport top に来た瞬間 → 抜け切る瞬間
});

const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
const subY = useTransform(scrollYProgress, [0, 1], [0, -200]);
const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
```

レイヤごとに動く距離を変える → 奥行きが出る。背景は `y: 300` 程度ゆっくり、前景タイトルは `-100` 程度逆方向。

## 4. whileInView リビール (汎用)

スクロールしてビューに入ったときに 1 回だけ再生する基本形:

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
>
```

**`margin: "-80px"`** を入れて、要素が完全に画面に入る前に発火させる。リスト要素なら `delay: i * 0.05〜0.1` でステア演出。

## 5. 横スクロールカード (操作性重視版)

❌ **避ける**: sticky + `useTransform` で `x: 0 → -66%` する scrolljack 方式。縦スクロールが奪われて操作性が悪い。

✅ **使う**: ネイティブ `overflow-x: auto` + Snap + ドラッグ + ホイール変換。

```tsx
"use client";
import { useRef, useEffect } from "react";

export function HorizontalRail({ children }: { children: React.ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    // wheel → horizontal: 上下ホイール時、横にしか動かない要素なので deltaY を横に振り替える
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // 元から横ホイールならスルー
      // この要素内でだけ横スクロール — 上下ページスクロールを完全には奪わない
      const canScrollLeft = el.scrollLeft > 0;
      const canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
      const goingRight = e.deltaY > 0;
      if ((goingRight && canScrollRight) || (!goingRight && canScrollLeft)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    // pointer drag
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e: PointerEvent) => {
      isDown = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = () => {
      isDown = false;
      el.style.cursor = "grab";
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={railRef}
      className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory cursor-grab select-none"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex gap-6 px-6 lg:px-12 pb-6">{children}</div>
    </div>
  );
}
```

各カードは `snap-start flex-none w-[85vw] max-w-[560px]`。

**重要なポイント**:
- 「上下スクロール → 横スクロール変換」は端まで来たら preventDefault せずページの上下スクロールに戻る (ユーザーが詰まらない)
- Lenis スムーススクロールを使っている場合、wheel イベントが奪われる可能性 → wheel リスナーを `{ passive: false }` で `capture: true` にする選択肢もある
- `scrollbar-width: none` + 必要なら `::-webkit-scrollbar { display: none }` を globals に追加

## 6. ホバーで下線が走る

Journal セクションで使用 ([Journal.tsx](../../../src/components/Journal.tsx)):

```tsx
<motion.article className="group relative">
  {/* content */}
  <motion.div
    initial={{ scaleX: 0 }}
    whileHover={{ scaleX: 1 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-[var(--color-accent)] to-transparent"
  />
</motion.article>
```

scale でアニメするので絶対パスのレイアウトコストはゼロ。

## 7. Marquee (横流れ)

CSS 単独で OK ([Marquee.tsx](../../../src/components/Marquee.tsx)):

```tsx
<div className="marquee-track">  {/* globals.css の .marquee-track が animation を定義 */}
  {[...ITEMS, ...ITEMS].map(...)} {/* 2回繰り返して -50% でループ */}
</div>
```

スクロール連動でわずかに横ずれさせる演出も乗せられる:
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
<motion.div style={{ x }} className="marquee-track">...</motion.div>
```

## 8. Animate Presence (モバイルメニューなど)

[Navigation.tsx](../../../src/components/Navigation.tsx):

```tsx
<AnimatePresence>
  {open && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* メニュー本体。子要素にも staggered な initial/animate を入れる */}
    </motion.div>
  )}
</AnimatePresence>
```

## チェックリスト

- [ ] イージングは `[0.16, 1, 0.3, 1]` か `[0.76, 0, 0.24, 1]`
- [ ] `whileInView` には `viewport={{ once: true, margin: "-80px" }}`
- [ ] スクロール連動には `useRef` + `useScroll({ target, offset })` を使う (window 全体は使わない)
- [ ] horizontal scroll は **scrolljack しない** — overflow-x: auto + drag/wheel 変換
- [ ] 重い `useTransform` を複数走らせる場合は `motion.div style={{ y }}` のように style 経由で渡す
