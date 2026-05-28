export const profile = {
  name: "Kimura Ryuki",
  nameJa: "木村 竜輝",
  role: "Software Engineer / AI Researcher",
  affiliation: "東京理科大学 創域理工学部 情報計算科学科",
  tagline: "AI と最適化の境界で、現実世界の問題に挑む。",
  email: "ryuhki2003@gmail.com",
  github: "https://github.com/Kimurist2024",
  x: "https://x.com/dLb7PgqVBXenB2l",
  zenn: "https://zenn.dev/kimurist",
  qiita: "https://qiita.com/Kimurist2024",
} as const;

export const skills = {
  languages: [
    "Python",
    "C",
    "C++",
    "Rust",
    "OCaml",
    "Fortran",
    "Java",
    "JavaScript",
    "TypeScript",
  ],
  frameworks: [
    "Django",
    "Firebase",
    "Next.js",
    "PyTorch",
    "React",
    "Spring Boot",
    "FastAPI",
    "Flutter",
    "Tailwind CSS",
  ],
  tools: ["AWS", "GCP", "Docker", "Figma", "Git", "MergeKit", "W&B"],
} as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  stack: string[];
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    company: "株式会社 Delight",
    role: "ソフトウェアエンジニア (インターン)",
    period: "2025.08 — 現在",
    current: true,
    stack: ["C++", "Fortran"],
    bullets: [
      "C++ で書かれたメッシュソフトウェアの性能改善に従事。計算量とメモリ効率を意識したパフォーマンス最適化に取り組む。",
      "Fortran で温度・圧力・電位差が車体の膜付着性に与える影響をシミュレーションし、検証を実施。",
    ],
  },
  {
    company: "Ollo (AI スタートアップ)",
    role: "機械学習エンジニア (インターン)",
    period: "2025.03 — 2025.07",
    stack: ["Python", "PyTorch", "VideoMAE", "AVION"],
    bullets: [
      "VideoMAE / AVION(LaViLa + VideoMAE) を用いたマルチラベル動画分類タスクに取り組む。",
      "PyTorch によるモデルのファインチューニングを行い、F1 スコアによる定量評価でモデル性能を改善。",
    ],
  },
];

export type Project = {
  title: string;
  subtitle: string;
  period: string;
  category: "research" | "competition" | "product";
  stack: string[];
  description: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    title: "災害避難経路の最適化",
    subtitle: "Grounding DINO × 3D Gaussian Splatting によるリアルタイム経路探索",
    period: "Ongoing — 研究",
    category: "research",
    stack: ["Grounding DINO", "3D Gaussian Splatting", "Python"],
    description: [
      "災害発生時の安全な避難経路を自動的に導出することを目的とした研究。",
      "Grounding DINO により災害現場の画像から障害物や危険箇所をゼロショット検出。",
      "3D Gaussian Splatting で周辺環境を 3 次元復元し、現実空間に即した経路探索を可能にする。",
      "物体検出と 3D 復元を統合し、通行可能領域の推定および最適経路のリアルタイム検出を目指す。",
    ],
  },
  {
    title: "River Agent",
    subtitle: "自己成長型 AI エージェント",
    period: "2025.11 — 技育展",
    category: "product",
    stack: ["Next.js", "Django", "Docker", "OpenAI", "PostgreSQL", "W&B"],
    description: [
      "AI がユーザのニーズに沿うクエストを生成し、自己成長を支援する自己成長型 AI エージェント。",
      "Fine-tuning したローカル LLM(llama2 / Gemma) と API を併用し、コストを抑えつつ安定したクエスト生成を実現。",
      "Fly.io にデプロイ済み。",
    ],
  },
  {
    title: "AI 塗り絵",
    subtitle: "子どもの夢を可視化する教育アプリ",
    period: "プロダクト",
    category: "product",
    stack: ["Flutter", "FastAPI", "OpenAI (GPT-4o, DALL·E 3)", "Firebase", "Docker"],
    description: [
      "子どもが将来の夢を AI キャラクターと対話し、夢に基づいた塗り絵を自動生成する教育アプリ。",
      "トレーディングカードやキーホルダーの作成機能も実装。",
      "教育現場での利用を想定し、管理者向けの生徒アカウント一括生成機能も開発。",
    ],
  },
  {
    title: "Kaggle Santa 2025",
    subtitle: "クリスマスツリーのパッキング最適化",
    period: "2025.11 — 2026.01",
    category: "competition",
    stack: ["Python", "C++", "Simulated Annealing"],
    description: [
      "Kaggle で開催されたクリスマスツリーのパッキング最適化コンペティションに参加。",
      "焼きなまし法、遺伝的アルゴリズム、CMA-ES、動的計画法など多様な最適化手法を実装・比較。",
    ],
  },
  {
    title: "Deep Past Challenge",
    subtitle: "4000 年前のアッカド語粘土板の機械翻訳",
    period: "2025.12 — 現在",
    category: "competition",
    stack: ["Python", "PyTorch", "ByteT5"],
    description: [
      "Kaggle で開催された古代アッカド語の機械翻訳コンペティションに参加。",
      "ByteT5 トランスフォーマーモデルを用いた翻訳システムを構築。",
    ],
  },
  {
    title: "OR 学会データ解析コンペティション",
    subtitle: "POS データによる書籍販売数予測",
    period: "2025.10 — 現在",
    category: "competition",
    stack: ["Python", "PySR", "Random Forest"],
    description: [
      "書店 35 店舗の日別 POS 販売データを用い、ジャンル別の書籍販売数予測に取り組む。",
      "記号回帰 (PySR) で予測数式モデルを導出し、Random Forest と同等の精度を達成しつつ高い解釈性を実現。",
      "マクローリン展開による項の重要度分析で、ジャンルごとの販売特性の支配要因を定量的に明らかにした。",
    ],
  },
];

export type Article = {
  title: string;
  excerpt: string;
  date: string;
  tag: string;
};

export const articles: Article[] = [
  {
    title: "VideoMAE で何が変わるのか — 自己教師あり動画学習の現在地",
    excerpt:
      "Ollo でのインターンを通じて触れた VideoMAE / AVION の設計思想と、マルチラベル分類における実践的なファインチューニング手法をまとめる。",
    date: "2025.09",
    tag: "Machine Learning",
  },
  {
    title: "C++ メッシュ処理の性能チューニング覚え書き",
    excerpt:
      "計算幾何学的処理を含むメッシュソフトウェアで、データ局所性と SIMD を意識した最適化を進める際の判断軸について。",
    date: "2025.10",
    tag: "Systems",
  },
  {
    title: "Gaussian Splatting を災害対応に転用するという試み",
    excerpt:
      "3D 復元の最新手法を、研究室で取り組む避難経路最適化へどう組み込んでいるか。物体検出との接続点を中心に整理する。",
    date: "2025.11",
    tag: "Research",
  },
  {
    title: "記号回帰 PySR で解釈可能な予測モデルを作る",
    excerpt:
      "OR 学会コンペで使った PySR の使い勝手と、Random Forest と並列で動かしたときの精度/解釈性のトレードオフ。",
    date: "2025.12",
    tag: "Data Science",
  },
];
