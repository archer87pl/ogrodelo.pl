import { ImageResponse } from "next/og";

export const alt = "Ogrodelo.pl — Darmowe kalkulatory ogrodowe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
          <span style={{ fontSize: 72 }}>🌿</span>
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#1e4a1e",
            }}
          >
            Ogrodelo.pl
          </span>
        </div>
        <p
          style={{
            fontSize: 36,
            color: "#2d6a2d",
            lineHeight: 1.35,
            maxWidth: 900,
            margin: 0,
          }}
        >
          Darmowe kalkulatory ogrodowe — nawadnianie, żywopłot, plan ogrodu, katalog kwitnienia i więcej.
        </p>
      </div>
    ),
    { ...size }
  );
}
