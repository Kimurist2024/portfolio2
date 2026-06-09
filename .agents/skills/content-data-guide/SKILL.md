---
name: content-data-guide
description: src/data/profile.ts のスキーマと編集ガイドライン。プロジェクト、経歴、記事、スキル、プロフィール基本情報を追加・編集するときの場所と書式を一元化する。新しいコンテンツを足すときに必ず参照する。
---

# Content Data Guide

ポートフォリオの**コンテンツは全て** [src/data/profile.ts](../../../src/data/profile.ts) に集約されている。UI コンポーネントは表示ロジックのみを持ち、文言を直接書かない。

## 構造一覧

| 変数 | 型 | 用途 |
|---|---|---|
| `profile` | `const` object | 名前 / 役職 / 連絡先 / SNS |
| `skills` | `{ languages, frameworks, tools }` | スキルラベルの配列 |
| `experiences` | `Experience[]` | 職歴 / インターン (新しい順) |
| `projects` | `Project[]` | 研究・コンペ・プロダクト (重要度順) |
| `articles` | `Article[]` | Journal (記事) のリスト |

## profile (基本情報)

```ts
export const profile = {
  name: "Kimura Ryuki",
  nameJa: "木村 竜輝",
  role: "Software Engineer / AI Researcher",
  affiliation: "東京理科大学 創域理工学部 情報計算科学科",
  tagline: "AI と最適化の境界で、現実世界の問題に挑む。",
  email: "ryuhki2003@gmail.com",
  github: "https://github.com/Kimurist2024",
  x: "https://x.com/dLb7PgqVBXenB2l",
} as const;
```

タグラインは Hero の 1 文字ごとフェード対象。**全角 40 字程度まで**。

## experiences (職歴)

```ts
export type Experience = {
  company: string;
  role: string;
  period: string;       // "2025.08 — 現在" or "2025.03 — 2025.07"
  current?: boolean;    // 現職なら true (左側の青いドットが pulse する)
  stack: string[];      // 3〜6 個まで
  bullets: string[];    // 2〜4 個。1 行 80 字目安
};
```

**並び順**: 配列の前 = 上に表示。新しいものを上に。`current: true` は最大 1〜2 件。

## projects (作品集)

```ts
export type Project = {
  title: string;        // 日本語 OK / 短く
  subtitle: string;     // 一行で内容説明
  period: string;       // "2025.11 — 2026.01" や "Ongoing — 研究"
  category: "research" | "competition" | "product";
  stack: string[];      // 5〜8 個まで
  description: string[];// 段落配列。Works カードは先頭 2 段落だけ表示する制限あり
  link?: string;        // 外部リンク (オプション)
};
```

### category の使い分け

| category | 例 |
|---|---|
| `research` | 災害避難経路の最適化 / 研究室テーマ |
| `competition` | Kaggle / OR 学会コンペ |
| `product` | River Agent / AI 塗り絵 |

UI 表示は [Works.tsx](../../../src/components/Works.tsx) の `CATEGORY_LABEL` でラベル変換している。新しい category を追加するなら **必ず両方を更新**する。

### description のフォーマット

- 1 段落 = 1 文 〜 1.5 文
- 「概要 → 手法 → 成果」の順に並べる
- Works カード上では先頭 2 段落しか出ない。詳細は 3〜4 段落目に。

## articles (Journal)

```ts
export type Article = {
  title: string;
  excerpt: string;   // 60〜90 字
  date: string;      // "2025.12" (年.月)
  tag: string;       // "Machine Learning" / "Systems" / "Research" / "Data Science"
};
```

公開準備中はそのまま並べておく ([Journal.tsx](../../../src/components/Journal.tsx) のフッターに "Drafts" の注記あり)。
公開時は `Article` 型に `slug?: string` を追加して `link` ベタ書きを避け、[Journal.tsx](../../../src/components/Journal.tsx) でルーティングを足す方針。

## skills (タグ)

```ts
export const skills = {
  languages: [...],
  frameworks: [...],
  tools: [...],
} as const;
```

About セクションの `StackRow` で 3 行に分けて表示。1 カテゴリ 8〜10 個まで。

## 追加・編集の手順

### 例: 新しいプロジェクトを追加

1. [src/data/profile.ts](../../../src/data/profile.ts) の `projects` 配列に追加
2. category が既存に当てはまるか確認 (新規なら `Works.tsx` の `CATEGORY_LABEL` も更新)
3. dev server (`npm run dev`) で表示確認 — Works カードの先頭 2 段落しか出ないので順序に注意
4. `npm run build` が通ることを確認
5. コミット

### 例: 経歴を昇進・更新

1. 該当 `Experience` の `period` を `"2025.08 — 現在"` から `"2025.08 — 2026.04"` に変更
2. 新しい現職に `current: true` を付け、古い方の `current` を消す
3. ビルド & 確認

## ハードコードしてはいけないもの

- ✕ 文言 (タイトル、説明、日付)
- ✕ 外部リンク URL
- ✕ スキルラベル

→ 全部 `profile.ts` に集約する。UI コンポーネントには `from "@/data/profile"` 経由で import。

## 型のメンテ

新しいフィールドを追加するときは **型を先に変える**:

```ts
// 例: Project に featured フラグ追加
export type Project = {
  // ...既存...
  featured?: boolean;
};
```

その後 UI 側でオプショナルチェイン (`p.featured && ...`) で扱う。既存データは未指定 = false 扱いになる。
