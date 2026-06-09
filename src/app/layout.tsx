import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial serif — the single display voice. Loaded as a variable font so
// every weight 400–600 is available, with the optical-sizing axis on.
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const SITE_URL = "https://portfolio-kimurists-projects.vercel.app";
const TITLE = "Kimura Ryuki — Software Engineer / AI Researcher";
const DESCRIPTION =
  "数理最適化と AI で現実世界の問題を解く、東京理科大学のソフトウェアエンジニア / AI リサーチャー。研究・インターン・コンペティションの記録。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "Kimura Ryuki",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <script
          // Apply the saved theme before paint to avoid a color flash.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t&&t!=='ocean'){document.documentElement.dataset.theme=t;}}catch(e){}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
