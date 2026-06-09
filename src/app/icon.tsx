import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1f6feb 0%, #0b3a7a 100%)",
          color: "#ffffff",
          fontSize: 40,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          borderRadius: 14,
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
