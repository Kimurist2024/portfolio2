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
  tools: ["AWS", "GCP", "Docker", "Figma", "Git", "MergeKit", "ONNX", "W&B"],
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
    period: "2025.03 — 2025.06",
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
  /** One-line result/status, surfaced on the card. */
  outcome: string;
  /** Short award phrase. Renders as a gold badge and in the highlights strip. */
  award?: string;
  link?: string;
};

export const projects: Project[] = [
  {
    title: "NeuroGolf 2026",
    subtitle: "ARC-AGI の変換規則を最小 ONNX グラフへ圧縮する",
    period: "2026.06 — 2026.07",
    category: "competition",
    stack: ["ONNX", "ONNX Runtime", "Python", "NumPy", "LLM Agents"],
    description: [
      "ARC-AGI の 400 タスクそれぞれの変換規則を、できるだけ小さい ONNX グラフとして再現する Kaggle コンペティション。スコアが max(1, 25 − ln(cost)) と対数で効くため、桁単位の構造圧縮が要求される。チームで参加し、2,963 チーム中 10 位で金メダルを獲得した。",
      "担当は、最適化方針の策定、検証ゲートの設計、候補群を同一条件で検証しての採否判断、順位表の実測値とローカル見込み値の乖離分析、採用候補の統合と最終提出物の構築。候補の実装にはチーム内で共有されたものや生成 AI 由来のものも含まれる。",
      "学習済みネットワークを使う方針を捨て、タスクジェネレータの仕様からゼロパラメータのテンソルプログラムを書き下す方針へ転換。中間テンソルを bool / int8 へ落とし、one-hot 出力をグラフ末尾の Equal で生成することで、コストの支配項だった float32 の中間バッファを消した。",
      "新規生成した入力で全セル一致した候補のみを通す単一の採用経路を設計し、可視例へのフィッティングを構造的に禁止して非公開ベンチでの 0 点事故を抑えた。",
      "提出スコアの投影値とのズレからスコア喪失分を逆算し、原因タスクを一意に特定する診断法を確立。最終的に中央値コスト 124.5、400 タスク中 174 件を cost ≤ 100 まで圧縮した。",
    ],
    outcome: "2,963 チーム中 10 位 — 最終スコア 8025.82",
    award: "Kaggle 金メダル",
    link: "https://github.com/Kimurist2024/neurogolf-solution",
  },
  {
    title: "材質付き三次元再構成",
    subtitle: "SAM 3 × DMS-46 × 3D Gaussian Splatting による材質分布の蒸留と体積推定",
    period: "Ongoing — 研究",
    category: "research",
    stack: [
      "SAM 3",
      "DMS-46",
      "3D Gaussian Splatting",
      "微分可能レンダリング",
      "ArUco",
      "Python",
    ],
    description: [
      "SAM 3 が抽出した物体領域ごとに DMS-46 の 46 種類の材質確率を統合し、その材質分布を 3D Gaussian Splatting へ蒸留することで、各 Gaussian が形状だけでなく材質も保持する三次元表現を構築する研究。",
      "物体領域抽出・材質認識・三次元再構成はそれぞれ独立に発展してきたが、材質情報を形状構築や境界補正に用いる手法は確立されていない。DMS は材質を認識できる一方で物体境界が曖昧になり、SAM は境界を高精度に取れる一方で材質を区別できないためである。",
      "多視点画像との誤差を微分可能レンダリングで最適化して視点間で一貫した材質情報を保持させ、材質境界と物体境界の不一致を境界補正に利用することで、材質情報を形状の改善へ還元する。",
      "得られた材質付きモデルをメッシュ化し、材質ごとの体積を推定する。現在は ArUco マーカーで実尺度を補正しているが、材質・物体境界・多視点の幾何情報を統合し、最終的には単眼 RGB 画像のみで高精度な尺度推定を行うことを目指す。",
      "視点数・遮蔽率・光沢条件・対象の大きさを変化させ、材質認識精度／境界精度／三次元復元精度／体積誤差／処理時間で評価する。既存手法との比較と要素除去実験により各構成要素の有効性を検証し、建築物調査・防災・ロボット環境認識への応用を見据える。",
    ],
    outcome: "材質を保持した三次元モデルから、計測機器なしでの体積推定を目指す",
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
    outcome: "Fly.io にデプロイ・技育展で発表",
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
    outcome: "対話から塗り絵を自動生成／教育現場向け機能も実装",
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
    outcome: "SA・GA・CMA-ES・DP を実装し比較",
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
    outcome: "ByteT5 で古代アッカド語翻訳に挑戦",
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
    outcome: "記号回帰で RF 同等精度＋高い解釈性を実現",
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
    title: "3D Gaussian Splatting に材質情報を持たせる",
    excerpt:
      "各 Gaussian が形状だけでなく材質を保持する表現をどう作るか。セグメンテーションと材質認識の出力を蒸留するときの設計上の勘所を整理する。",
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
