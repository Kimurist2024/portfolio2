import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const basePath = isGithubPages ? "/portfolio2" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: isGithubPages ? `${basePath}/` : undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // production だけ静的エクスポートに切り替えると dev サーバーが壊れるため常時 export。
  // ローカルでは GITHUB_PAGES が無いので basePath 無しでビルドされる。
  ...(isProd ? {} : {}),
};

export default nextConfig;
