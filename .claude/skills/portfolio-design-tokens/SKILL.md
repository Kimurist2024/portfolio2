---
name: portfolio-design-tokens
description: このポートフォリオで使うカラー・スペーシング・タイポ・モーションのデザイントークン一覧と、UI 実装時の遵守ルール。新しいコンポーネントを作る前・既存コンポーネントを改修する前に必ず参照する。
---

# Portfolio Design Tokens

すべてのトークンは [src/app/globals.css](../../../src/app/globals.css) の `:root` に定義されている。**新しい色やスペーシングをハードコードしない**。トークンを使うか、必要なら globals.css にトークンを追加してから使う。

## カラー

| Token | 用途 |
|---|---|
| `--color-bg` `#f6f7f9` | ページ背景 (オフホワイト) |
| `--color-bg-soft` `#ecf0f5` | 二次背景 (Marquee の中央など) |
| `--color-surface` | カード等の薄い面 |
| `--color-border` | デフォルトの仕切り線 |
| `--color-text` `#0e1320` | 本文 (ほぼ黒) |
| `--color-text-muted` `#5b6477` | 補助テキスト |
| `--color-text-dim` `#8c93a3` | キャプション、装飾 |
| `--color-accent` `#1f6feb` | プライマリブランド色 (青) |
| `--color-accent-glow` `#4a8cff` | accent のホバー/グロー |
| `--color-accent-deep` `#0b3a7a` | accent の暗い側 |
| `--color-sky` `#6bb6ff` | グラデーション補助 |

### 使い方

```tsx
// ✅ OK
<div className="bg-[var(--color-bg)] text-[var(--color-text)]" />
<div className="border border-black/10" />        // 薄い区切り
<div className="hover:text-[var(--color-accent)]" />

// ❌ NG (ハードコード)
<div className="bg-[#f6f7f9] text-[#0e1320]" />
<div className="bg-white text-black" />
```

### light テーマ前提のルール

このサイトは **ライトテーマ固定**。`text-white` / `bg-white` / `border-white/*` などのダーク前提クラスは使わない。
- 区切り線: `border-black/10` (薄く)、`border-black/15` (はっきり)
- 微妙な面: `bg-black/[0.02]` 〜 `bg-black/[0.05]`
- アクセントの淡塗り: `bg-[var(--color-accent)]/10`

## タイポグラフィ

| Token | 役割 |
|---|---|
| `--text-hero` | フルスクリーンヒーローの巨大見出し |
| `--text-display` | セクション見出し |
| `--text-section` | サブ見出し |
| `--text-lead` | リード文 |

クラス:
- `.font-display` — 800 / letter-spacing -0.04em / line-height 0.95 (見出し用)
- `.font-mono` — Geist Mono / letter-spacing 0.02em (キャプション・ラベル・数値)

```tsx
// セクション見出しの基本形
<h2 className="font-display text-[var(--text-display)] leading-[0.9]">
  <span className="block text-[var(--color-text)]">日本語</span>
  <span className="block italic font-light text-[var(--color-text-muted)]">subtle</span>
  <span className="block gradient-text-blue">accent line.</span>
</h2>

// ラベルは必ず font-mono + uppercase + tracking-[0.3em]
<span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
  01 / About
</span>
```

## グラデーション・ユーティリティ

すべて globals.css 定義済み。再定義しない。

- `.gradient-text` — text → accent → accent-deep (見出し向け)
- `.gradient-text-blue` — accent-glow → accent-deep (青系強調)
- `.grid-bg` — 64px のグリッド線
- `.noise` — ノイズオーバーレイ (`::after`)
- `.float-slow` — 18s ゆっくり浮遊 (装飾ブラー用)
- `.pulse-glow` — 4s 鼓動
- `.shimmer-line` — 横シマー (3s)
- `.marquee-track` — 横流れ (40s linear)

## スペーシング

- セクション間: `py-[var(--space-section)]` (`clamp(6rem, 4rem + 8vw, 14rem)`)
- セクション内ブロック間: `mt-12` 〜 `mt-20`
- パディング: `px-6 lg:px-12` を全セクション共通の左右ガター

```tsx
<section id="..." className="relative px-6 lg:px-12 py-[var(--space-section)] border-t border-black/10">
```

## モーションのイージング

| 用途 | 値 |
|---|---|
| リビール・パララックス | `[0.16, 1, 0.3, 1]` (`--ease-out-expo`) |
| 双方向トランジション | `[0.76, 0, 0.24, 1]` (`--ease-in-out-quart`) |
| 短い hover | デフォルト `transition-all` |

Framer Motion での書き方:

```tsx
transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
```

## レスポンシブ規約

- モバイル → md (768px) → lg (1024px) の 3 ブレークポイントを軸にする
- `font-display` の見出しは `clamp()` で勝手にスケールする — 個別の `text-5xl md:text-7xl` を書かない
- セクションのレイアウトは `grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12` を基本形

## アクセシビリティ

- `prefers-reduced-motion: reduce` の場合、すべての animation/transition は 0.01ms にフォールバック (globals.css 設定済み)
- それでも `whileInView` 系は再生されるので、リビール量は控えめにする (y: 20〜40 程度)
- フォーカス可能な要素は必ず hover とは別に focus-visible で見えるようにする

## チェックリスト (PR 前)

- [ ] ハードコード色 (`#…`, `rgb(…)`, `white`, `black`) を導入していない
- [ ] `text-white` `bg-white` などダーク前提クラスを使っていない
- [ ] 見出しは `font-display`、ラベルは `font-mono uppercase tracking-[0.3em]`
- [ ] セクションは `py-[var(--space-section)]` + `px-6 lg:px-12`
- [ ] イージングは expo / quart のどちらか
