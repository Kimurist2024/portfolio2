# Kimura Ryuki — Portfolio (2026 Edition)

Software Engineer / AI Researcher のポートフォリオサイト。Next.js + TypeScript + Tailwind CSS で構築。
中部国際空港 (Centrair) の採用サイトを参考に、ダーク × 青系の動的なビジュアル設計にしている。

## Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **Motion**: Framer Motion (スクロール連動、テキストリビール、パララックス)
- **Smooth Scroll**: Lenis
- **Fonts**: Geist Sans / Geist Mono (next/font)

## Sections

| # | Section | 概要 |
|---|---------|------|
| 00 | Hero | フルスクリーン大型タイポ + リアルタイム JST 時計 + パララックス |
| — | Marquee | スクロール連動の横流れキーワード |
| 01 | About | 自己紹介、経歴 (Delight / Ollo)、Stack 一覧 |
| 02 | Works | 横スクロール式のプロジェクトカード (研究・コンペ・プロダクト) |
| 03 | Journal | 記事一覧 (drafts) |
| 04 | Contact | Email / GitHub / X / Resume への動線 |

## Local Development

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できる。

## Build

```bash
npm run build
npm start
```

## Deploy

Vercel に直接デプロイ可能。`main` ブランチへの push で自動デプロイ。

## Structure

```
src/
├── app/
│   ├── layout.tsx       # ルートレイアウト + メタデータ
│   ├── page.tsx         # ホーム (各セクションを集約)
│   └── globals.css      # デザイントークン + グローバルスタイル
├── components/
│   ├── Navigation.tsx   # 固定ナビゲーション
│   ├── Hero.tsx         # ヒーロー
│   ├── Marquee.tsx      # 横流れキーワード
│   ├── About.tsx        # About + Experience + Stack
│   ├── Works.tsx        # プロジェクト横スクロール
│   ├── Journal.tsx      # 記事一覧
│   ├── Contact.tsx      # コンタクト
│   ├── Footer.tsx       # フッター
│   └── SmoothScroll.tsx # Lenis 連携
└── data/
    └── profile.ts       # コンテンツデータ (経歴 / プロジェクト / 記事)
```

コンテンツの編集は `src/data/profile.ts` に集約している。
