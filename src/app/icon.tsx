import React from "react";

export default function Icon() {
  return (
    <div
      style={{
        width: 512,
        height: 512,
        display: "grid",
        placeItems: "center",
        background: "radial-gradient(circle at 30% 30%, rgba(88,231,255,0.5), transparent 55%), #050612",
        color: "white",
        fontFamily: "serif",
        borderRadius: 96
      }}
    >
      <div style={{ fontSize: 140, letterSpacing: 6 }}>SG</div>
    </div>
  );
}
