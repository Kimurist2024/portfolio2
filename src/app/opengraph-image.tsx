import { ImageResponse } from "next/og";

export const alt = "Kimura Ryuki — Software Engineer / AI Researcher";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1020 0%, #0e1f3f 55%, #0b3a7a 100%)",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "monospace" }}>
          <div style={{ width: 14, height: 14, background: "#4a8cff", transform: "rotate(45deg)" }} />
          <div style={{ fontSize: 24, letterSpacing: 6, color: "#9fb4d8", textTransform: "uppercase" }}>
            Portfolio — 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 116, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>
            Kimura Ryuki
          </div>
          <div style={{ fontSize: 36, color: "#cdd8ee", marginTop: 20, fontFamily: "monospace" }}>
            Software Engineer / AI Researcher
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#9fb4d8" }}>
          数理最適化と AI で、現実世界の問題を解く。
        </div>
      </div>
    ),
    { ...size },
  );
}
