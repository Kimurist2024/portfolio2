import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy — staged baseline.
 *
 * This baseline keeps full static generation (no per-request nonce) while
 * still locking the page down to same-origin resources. framer-motion writes
 * inline `style=""` attributes and Next.js injects inline hydration scripts,
 * so `'unsafe-inline'` is required for `style-src`/`script-src` at this stage.
 *
 * STRICT UPGRADE PATH (when stricter CSP is wanted): generate a per-request
 * nonce in `src/proxy.ts` (Next 16 renamed `middleware` → `proxy`), switch to
 * `script-src 'self' 'nonce-…' 'strict-dynamic'` and `style-src 'self'
 * 'nonce-…'`, and opt pages into dynamic rendering. That disables static
 * optimization, so it is intentionally deferred until needed.
 */
function buildCsp(): string {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "font-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' blob: data:",
    "object-src 'none'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "connect-src 'self'",
    // Only upgrade in production — on localhost this would break http dev.
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ];
  return directives.join("; ");
}

const securityHeaders = [
  { key: "Content-Security-Policy", value: buildCsp() },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // HSTS: browsers ignore this on localhost, so it is safe to always send.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Deployed on Vercel at the domain root, so no basePath/assetPrefix.
  // `withBase()` reads this and becomes a no-op.
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
  trailingSlash: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
