"use client";

import Image from "next/image";
import { Zap, Dumbbell, Droplets, Brain } from "lucide-react";

const FEATURES = [
  { Icon: Dumbbell, label: "MÁS FUERZA", sub: "Y POTENCIA" },
  { Icon: Droplets, label: "HIDRATACIÓN", sub: "SUPERIOR" },
  { Icon: Brain, label: "ENFOQUE MENTAL", sub: "Y ENERGÍA" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="bg-hero texture-lines"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "calc(100vh - 62px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Ambient glows */}
      <div style={{ position:"absolute", top:"-5%", right:"-5%", width:"700px", height:"700px",
        background:"radial-gradient(circle, rgba(163,230,53,0.13) 0%, transparent 65%)",
        pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-10%", left:"0", width:"500px", height:"500px",
        background:"radial-gradient(circle, rgba(163,230,53,0.06) 0%, transparent 70%)",
        pointerEvents:"none" }} />

      {/* Lightning accent lines */}
      <div style={{ position:"absolute", top:"30%", left:0, right:0, height:"1px",
        background:"linear-gradient(90deg, transparent, rgba(163,230,53,0.08), transparent)",
        pointerEvents:"none" }} />

      <div className="container" style={{ padding:"64px 24px 72px" }}>
        <div className="hero-layout">
          {/* ────────── LEFT ────────── */}
          <div className="hero-left">
            {/* Badge */}
            <div
              style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                background:"rgba(163,230,53,0.09)",
                border:"1px solid rgba(163,230,53,0.35)",
                borderRadius:"4px", padding:"6px 16px", marginBottom:"22px",
              }}
            >
              <Zap size={13} fill="var(--neon)" color="var(--neon)" />
              <span style={{
                fontFamily:"var(--font-d)", fontSize:"13px", fontWeight:900,
                letterSpacing:"2.5px", color:"var(--neon)",
                textShadow:"0 0 12px rgba(163,230,53,0.5)",
              }}>3 EN 1 REAL</span>
            </div>

            {/* Headlines */}
            <h1 className="neon-text" style={{
              fontFamily:"var(--font-d)",
              fontSize:"clamp(58px, 9vw, 112px)",
              fontWeight:900, lineHeight:"0.87",
              letterSpacing:"3px", textTransform:"uppercase",
              marginBottom:"4px",
            }}>
              KREATONITE
            </h1>
            <h2 style={{
              fontFamily:"var(--font-d)",
              fontSize:"clamp(28px, 4.5vw, 56px)",
              fontWeight:900, color:"#fff", fontStyle:"italic",
              letterSpacing:"4px", textTransform:"uppercase",
              lineHeight:"1.05", marginBottom:"18px",
            }}>
              THE GAME CHANGER
            </h2>

            {/* Formula */}
            <p className="neon-text" style={{
              fontFamily:"var(--font-d)", fontSize:"14px", fontWeight:700,
              letterSpacing:"1.8px", marginBottom:"6px",
            }}>
              CREATINA + ELECTROLITOS + VITAMINA B12
            </p>
            <p style={{ color:"var(--gray-1)", fontSize:"14px", marginBottom:"3px", lineHeight:1.55 }}>
              Energía, fuerza y enfoque en una sola toma.
            </p>
            <p style={{ color:"var(--gray-1)", fontSize:"14px", marginBottom:"32px", lineHeight:1.55 }}>
              Diseñada para quienes entrenan en serio.
            </p>

            {/* CTA Buttons */}
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"44px" }}>
              <a href="#sabores" className="btn-neon anim-btn">
                <Zap size={15} fill="#000" color="#000" />
                COMPRAR AHORA
              </a>
              <a href="#beneficios" className="btn-ghost">
                VER BENEFICIOS
              </a>
            </div>

            {/* Feature icons row */}
            <div style={{ display:"flex", gap:"32px", flexWrap:"wrap" }}>
              {FEATURES.map(({ Icon, label, sub }) => (
                <div key={label} style={{
                  display:"flex", flexDirection:"column",
                  alignItems:"center", gap:"6px",
                }}>
                  <div className="icon-circle" style={{ width:"50px", height:"50px" }}>
                    <Icon size={20} color="var(--neon)" strokeWidth={1.8} />
                  </div>
                  <span style={{
                    fontFamily:"var(--font-d)", color:"#fff",
                    fontSize:"11px", fontWeight:700,
                    letterSpacing:"0.5px", textAlign:"center", textTransform:"uppercase",
                  }}>{label}</span>
                  <span style={{
                    color:"var(--gray-2)", fontSize:"10px",
                    textAlign:"center", textTransform:"uppercase",
                  }}>{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ────────── RIGHT ────────── */}
          <div className="hero-right">
            {/* Glow disc */}
            <div className="anim-glow" style={{
              position:"absolute",
              width:"460px", height:"460px",
              background:"radial-gradient(circle, rgba(163,230,53,0.28) 0%, rgba(163,230,53,0.05) 55%, transparent 70%)",
              borderRadius:"50%",
              pointerEvents:"none",
            }} />

            <div className="anim-float" style={{ position:"relative", zIndex:2 }}>
              <Image
                src="/hero-product.png"
                alt="Kreatonite — 3 EN 1: Creatina + Electrolitos + Vitamina B12"
                width={520}
                height={520}
                priority
                style={{
                  width:"100%", maxWidth:"520px", height:"auto",
                  filter:"drop-shadow(0 0 50px rgba(163,230,53,0.5)) drop-shadow(0 0 100px rgba(163,230,53,0.2))",
                }}
              />
              {/* Product label badge */}
              <div style={{
                position:"absolute", bottom:"28px", left:"50%",
                transform:"translateX(-50%)",
                background:"rgba(0,0,0,0.72)",
                backdropFilter:"blur(10px)",
                border:"1px solid rgba(163,230,53,0.32)",
                borderRadius:"5px", padding:"8px 22px",
                textAlign:"center", whiteSpace:"nowrap",
              }}>
                <span className="neon-text" style={{
                  fontFamily:"var(--font-d)", fontSize:"11px",
                  fontWeight:700, letterSpacing:"1.5px",
                }}>
                  MEJOR VERSIÓN MÁS RÁPIDO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          width: 100%;
        }
        .hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        @media (max-width: 900px) {
          .hero-layout { grid-template-columns: 1fr; }
          .hero-left { text-align: center; order: 2; }
          .hero-right { order: 1; min-height: 280px; }
          .hero-left > div, .hero-left > p, .hero-left > h1, .hero-left > h2 { margin-left: auto; margin-right: auto; }
          .hero-left > div[style*="display:\"flex\""] { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
