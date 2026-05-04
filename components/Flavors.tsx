"use client";

import Image from "next/image";
import { ShoppingCart, Package } from "lucide-react";

const FLAVORS = [
  {
    id: "limon",
    name: "LIMÓN",
    image: "/flavor-lemon.png",
    alt: "Kreatonite Limón",
    accent: "#c8e63a",
    bg: "linear-gradient(160deg, #0b1a00, #0e2200 60%, #080f00)",
    glow: "rgba(200,230,58,0.22)",
    border: "rgba(200,230,58,0.25)",
    btnBg: "#c8e63a",
  },
  {
    id: "bosque",
    name: "FRUTOS DEL BOSQUE",
    image: "/flavor-berries.png",
    alt: "Kreatonite Frutos del Bosque",
    accent: "#d946ef",
    bg: "linear-gradient(160deg, #1e0028, #280038 60%, #170022)",
    glow: "rgba(217,70,239,0.22)",
    border: "rgba(217,70,239,0.28)",
    btnBg: "#d946ef",
  },
  {
    id: "manzana",
    name: "MANZANA",
    image: "/flavor-apple.png",
    alt: "Kreatonite Manzana",
    accent: "#a3e635",
    bg: "linear-gradient(160deg, #001a00, #002500 60%, #001200)",
    glow: "rgba(163,230,53,0.22)",
    border: "rgba(163,230,53,0.28)",
    btnBg: "#a3e635",
  },
];

export default function Flavors() {
  return (
    <section
      id="sabores"
      className="bg-black"
      style={{ padding: "var(--section-pad)" }}
    >
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h2 className="section-heading">
            <span style={{ color: "#fff" }}>NUESTROS </span>
            <span className="neon-text">SABORES</span>
          </h2>
          <span className="neon-line" />
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            marginBottom: "32px",
          }}
          className="flavors-grid"
        >
          {FLAVORS.map((f) => (
            <div
              key={f.id}
              style={{
                background: f.bg,
                border: `1px solid ${f.border}`,
                borderRadius: "12px",
                padding: "36px 20px 26px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.35s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = f.accent;
                el.style.boxShadow = `0 0 60px ${f.glow}, 0 20px 50px rgba(0,0,0,0.5)`;
                el.style.transform = "translateY(-8px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = f.border;
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0) scale(1)";
              }}
            >
              {/* Glow base */}
              <div style={{
                position:"absolute", bottom:0, left:"50%",
                transform:"translateX(-50%)",
                width:"240px", height:"200px",
                background:`radial-gradient(ellipse, ${f.glow} 0%, transparent 70%)`,
                pointerEvents:"none",
              }} />

              {/* Product image */}
              <div style={{
                position:"relative", width:"100%", maxWidth:"220px",
                margin:"0 auto 20px",
                aspectRatio:"1",
              }}>
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="220px"
                  style={{
                    objectFit:"contain",
                    filter:`drop-shadow(0 0 30px ${f.glow})`,
                  }}
                />
              </div>

              {/* Name */}
              <h3 style={{
                fontFamily:"var(--font-d)",
                fontSize:"clamp(16px, 2vw, 22px)",
                fontWeight:900, color:"#fff",
                letterSpacing:"2px", marginBottom:"18px",
                textShadow:`0 0 20px ${f.glow}`,
                position:"relative", zIndex:1,
              }}>
                {f.name}
              </h3>

              {/* Buy button */}
              <button
                style={{
                  display:"flex", alignItems:"center",
                  justifyContent:"center", gap:"8px",
                  background: f.btnBg,
                  color: "#000",
                  fontFamily:"var(--font-d)", fontWeight:900,
                  fontSize:"14px", letterSpacing:"2px",
                  textTransform:"uppercase",
                  padding:"13px", width:"100%",
                  borderRadius:"5px", border:"none",
                  cursor:"pointer",
                  boxShadow:`0 0 20px ${f.glow}`,
                  transition:"all 0.25s ease",
                  position:"relative", zIndex:1,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 38px ${f.glow}`;
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${f.glow}`;
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <ShoppingCart size={15} />
                COMPRAR
              </button>
            </div>
          ))}
        </div>

        {/* View all */}
        <div style={{ textAlign:"center" }}>
          <a
            href="#"
            style={{
              display:"inline-flex", alignItems:"center", gap:"10px",
              border:"1.5px solid rgba(163,230,53,0.35)",
              color:"var(--neon)",
              fontFamily:"var(--font-d)", fontWeight:700,
              fontSize:"13px", letterSpacing:"2px",
              textTransform:"uppercase",
              padding:"12px 30px", borderRadius:"5px",
              textDecoration:"none",
              transition:"all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--neon)";
              (e.currentTarget as HTMLElement).style.background = "rgba(163,230,53,0.06)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(163,230,53,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(163,230,53,0.35)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <Package size={16} />
            VER TODOS LOS PRODUCTOS
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .flavors-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .flavors-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
