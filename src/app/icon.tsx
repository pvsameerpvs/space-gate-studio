import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
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
          backgroundColor: "#050612",
          backgroundImage: "radial-gradient(circle at 30% 30%, rgba(88,231,255,0.5), transparent 55%)",
          color: "white",
          borderRadius: 96,
        }}
      >
        <div style={{ fontSize: 240, letterSpacing: -10, fontWeight: 700, fontFamily: "sans-serif" }}>SG</div>
      </div>
    ),
    { ...size }
  );
}
