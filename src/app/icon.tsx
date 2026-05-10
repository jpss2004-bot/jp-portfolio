import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

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
          background: "#0b0f14",
          color: "#43e6a5",
          fontSize: 16,
          fontWeight: 700,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        JP
      </div>
    ),
    {
      ...size,
    }
  );
}
