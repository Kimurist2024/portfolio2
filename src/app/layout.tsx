import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["600", "700"],
});

// Editorial serif for display headings (the magazine-style section titles).
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kimura Ryuki — Portfolio",
  description:
    "Software Engineer / AI Researcher. AI と最適化の境界で、現実世界の問題に挑む。",
  openGraph: {
    title: "Kimura Ryuki — Portfolio",
    description:
      "Software Engineer / AI Researcher. AI と最適化の境界で、現実世界の問題に挑む。",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} ${fraunces.variable} h-full antialiased`}
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
