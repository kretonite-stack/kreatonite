"use client";

import Image from "next/image";
import { ShoppingCart, Package, Zap } from "lucide-react";

const FLAVORS = [
  {
    id: "limon",
    name: "LIMÓN",
    image: "/flavor-lemon.png",
    alt: "Kreatonite Limón",
    accent: "#c8e63a",
    accentRgb: "200,230,58",
    bg: "linear-gradient(160deg, #0d1e00 0%, #122800 50%, #080f00 100%)",
    btnBg: "linear-gradient(135deg, #d4ff00, #a3e635)",
    label: "SABOR CÍTRICO",
  },
  {
    id: "bosque",
    name: "FRUTOS DEL BOSQUE",
    image: "/flavor-berries.png",
    alt: "Kreatonite Frutos del Bosque",
    accent: "#d946ef",
    accentRgb: "217,70,239",
    bg: "linear-gradient(160deg, #1e0028 0%, #2d0042 50%, #140020 100%)",
    btnBg: "linear-gradient(135deg, #e879f9, #d946ef)",
    label: "SABOR FRUTAL",
  },
  {
    id: "manzana",
    name: "MANZANA",
    image: "/flavor-apple.png",
    alt: "Kreatonite Manzana",
    accent: "#a3e635",
    accentRgb: "163,230,53",
    bg: "linear-gradient(160deg, #001e00 0%, #002e00 50%, #001200 100%)",
    btnBg: "linear-gradient(135deg, #c8ff00, #a3e635)",
    label: "SABOR VERDE",
  },
];

export default function Flavors() {
  return (
    <section
      id="sabores"
      style={{
        padding: "var(--section-pad)",
        background: "var(--dark-1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "900px", height: "500px",
        background: "radial-gradient(ellipse, rgba(163,230,53,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="electric-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ margin: "0 auto 16px" }}>
            <Zap size={11} fill="var(--neon)" color="var(--neon)" />
            ELIGE TU SABOR
          </div>
          <h2 className="section-heading">
            <span style={{ color: "#fff" }}>NUESTROS </span>
            <span className="neon-text">SABORES</span>
          </h2>
          <span className="neon-line" />
          <p style={{
            color: "var(--gray-2)", fontSize: "15px",
            marginTop: "20px", maxWidth: "420px", margin: "20px auto 0",
            lineHeight: 1.6,
          }}>
            Misma fórmula 3-EN-1, diferentes perfiles de sabor para que nunca te aburras
          </p>
        </div>

        {/* Flavor cards */}
        <div
          className="flavors-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {FLAVORS.map((f) => (
            <div
              key={f.id}
              style={{
                background: f.bg,
                border: `1px solid rgba(${f.accentRgb},0.2)`,
                borderRadius: "16px",
                padding: "40px 24px 30px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = f.accent;
                el.style.boxShadow = `0 0 80px rgba(${f.accentRgb},0.25), 0 30px 70px rgba(0,0,0,0.6)`;
                el.style.transform = "translateY(-12px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = `rgba(${f.accentRgb},0.2)`;
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0) scale(1)";
              }}
            >
              {/* Top line accent */}
              <div style={{
                position: "absolute", top: 0, left: "20%", right: "20%", height: "2px",
                background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)`,
                boxShadow: `0 0 10px rgba(${f.accentRgb},0.6)`,
              }} />

              {/* Flavor label badge */}
              <div style={{
                position: "absolute", top: "16px", right: "16px",
                background: `rgba(${f.accentRgb},0.12)`,
                border: `1px solid rgba(${f.accentRgb},0.3)`,
                borderRadius: "3px",
                padding: "3px 10px",
              }}>
                <span style={{
                  fontFamily: "var(--font-d)", fontSize: "9px",
                  color: f.accent, letterSpacing: "2px",
                }}>
                  {f.label}
                </span>
              </div>

              {/* Glow base */}
              <div style={{
                position: "absolute", bottom: 0, left: "50%",
                transform: "translateX(-50%)",
                width: "280px", height: "220px",
                background: `radial-gradient(ellipse, rgba(${f.accentRgb},0.18) 0%, transparent 65%)`,
                pointerEvents: "none",
              }} />

              {/* Product image */}
              <div style={{
                position: "relative", width: "100%", maxWidth: "240px",
                margin: "0 auto 28px",
                aspectRatio: "1",
              }}>
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="240px"
                  style={{
                    objectFit: "contain",
                    filter: `drop-shadow(0 0 30px rgba(${f.accentRgb},0.5)) drop-shadow(0 20px 30px rgba(0,0,0,0.7))`,
                    transform: "perspective(800px) rotateY(-5deg)",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "perspective(800px) rotateY(-15deg) scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "perspective(800px) rotateY(-5deg)";
                  }}
                />
              </div>

              {/* Name */}
              <h3 style={{
                fontFamily: "var(--font-d)",
                fontSize: "clamp(18px, 2.2vw, 26px)",
                fontWeight: 400, color: f.accent,
                letterSpacing: "3px", marginBottom: "4px",
                textShadow: `0 0 20px rgba(${f.accentRgb},0.6)`,
                position: "relative", zIndex: 1,
              }}>
                {f.name}
              </h3>

              <p style={{
                color: "var(--gray-2)", fontSize: "12px",
                marginBottom: "24px", letterSpacing: "1px",
              }}>
                3-EN-1 · 300g · 30 porciones
              </p>

              {/* Buy button */}
              <button
                style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                  background: f.btnBg,
                  color: "#000",
                  fontFamily: "var(--font-d)", fontWeight: 400,
                  fontSize: "15px", letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  padding: "14px", width: "100%",
                  borderRadius: "6px", border: "none",
                  cursor: "pointer",
                  boxShadow: `0 0 25px rgba(${f.accentRgb},0.4)`,
                  transition: "all 0.3s ease",
                  position: "relative", zIndex: 1,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 50px rgba(${f.accentRgb},0.6), 0 8px 20px rgba(0,0,0,0.5)`;
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px rgba(${f.accentRgb},0.4)`;
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <ShoppingCart size={16} />
                COMPRAR
              </button>
            </div>
          ))}
        </div>

        {/* View all */}
        <div style={{ textAlign: "center" }}>
          <a
            href="#"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              border: "2px solid rgba(163,230,53,0.3)",
              color: "var(--neon)",
              fontFamily: "var(--font-d)", fontWeight: 400,
              fontSize: "14px", letterSpacing: "3px",
              textTransform: "uppercase",
              padding: "14px 36px", borderRadius: "6px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              background: "rgba(163,230,53,0.03)",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--neon)";
              el.style.background = "rgba(163,230,53,0.08)";
              el.style.boxShadow = "0 0 40px rgba(163,230,53,0.25)";
              el.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(163,230,53,0.3)";
              el.style.background = "rgba(163,230,53,0.03)";
              el.style.boxShadow = "none";
              el.style.transform = "scale(1)";
            }}
          >
            <Package size={17} />
            VER TODOS LOS PRODUCTOS
          </a>
        </div>
      </div>

      <div className="electric-sep" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />

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
