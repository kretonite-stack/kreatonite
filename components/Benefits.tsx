"use client";

import { Dumbbell, Droplets, Brain, Zap } from "lucide-react";

const BENEFITS = [
  {
    Icon: Dumbbell,
    title: "MÁS FUERZA",
    subtitle: "Y POTENCIA",
    desc: "Mejora tu rendimiento en cada repetición con creatina pura de alta absorción.",
    delay: "0s",
    gradient: "linear-gradient(135deg, rgba(163,230,53,0.08) 0%, transparent 60%)",
  },
  {
    Icon: Droplets,
    title: "HIDRATACIÓN",
    subtitle: "SUPERIOR",
    desc: "Electrolitos para mantener tu cuerpo en equilibrio óptimo durante el entreno.",
    delay: "0.1s",
    gradient: "linear-gradient(135deg, rgba(0,180,255,0.06) 0%, transparent 60%)",
  },
  {
    Icon: Brain,
    title: "ENFOQUE MENTAL",
    subtitle: "Y ENERGÍA",
    desc: "Claridad mental y energía sostenida cuando más lo necesitas.",
    delay: "0.2s",
    gradient: "linear-gradient(135deg, rgba(163,230,53,0.07) 0%, transparent 60%)",
  },
  {
    Icon: Zap,
    title: "RECUPERACIÓN",
    subtitle: "MÁS RÁPIDA",
    desc: "Reduce la fatiga y mejora tu recuperación muscular post-entreno.",
    delay: "0.3s",
    gradient: "linear-gradient(135deg, rgba(255,200,0,0.06) 0%, transparent 60%)",
  },
];

export default function Benefits() {
  return (
    <section
      id="beneficios"
      style={{
        padding: "var(--section-pad)",
        background: "#000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse, rgba(163,230,53,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="electric-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ margin: "0 auto 16px" }}>
            <Zap size={11} fill="var(--neon)" color="var(--neon)" />
            FÓRMULA 3 EN 1
          </div>
          <h2 className="section-heading">
            <span style={{ color: "#fff" }}>BENEFICIOS </span>
            <span className="neon-text">REALES</span>
          </h2>
          <span className="neon-line" />
          <p style={{
            color: "var(--gray-2)", fontSize: "15px",
            marginTop: "20px", maxWidth: "480px", margin: "20px auto 0",
            lineHeight: 1.6,
          }}>
            Una fórmula completa desarrollada para atletas que no aceptan mediocridad
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {BENEFITS.map(({ Icon, title, subtitle, desc, delay, gradient }) => (
            <div
              key={title}
              className="card"
              style={{
                padding: "36px 28px",
                animationDelay: delay,
                background: gradient,
              }}
            >
              {/* Icon */}
              <div style={{
                position: "relative",
                display: "inline-flex",
                marginBottom: "24px",
              }}>
                <div className="icon-circle" style={{ width: "68px", height: "68px" }}>
                  <Icon size={30} color="var(--neon)" strokeWidth={1.4} />
                </div>
                {/* Glow behind icon */}
                <div style={{
                  position: "absolute", inset: "-10px",
                  background: "radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 70%)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }} />
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-d)",
                  fontSize: "24px",
                  fontWeight: 400,
                  color: "#fff",
                  letterSpacing: "1.5px",
                  marginBottom: "2px",
                  lineHeight: 1.1,
                }}
              >
                {title}
              </h3>
              <h4
                className="neon-text"
                style={{
                  fontFamily: "var(--font-d)",
                  fontSize: "24px",
                  fontWeight: 400,
                  letterSpacing: "1.5px",
                  marginBottom: "16px",
                  lineHeight: 1.1,
                }}
              >
                {subtitle}
              </h4>

              {/* Divider */}
              <div style={{
                width: "40px", height: "2px",
                background: "var(--neon)",
                boxShadow: "0 0 8px rgba(163,230,53,0.5)",
                marginBottom: "16px",
                borderRadius: "2px",
              }} />

              <p style={{
                color: "var(--gray-2)",
                fontSize: "14px",
                lineHeight: 1.65,
              }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="electric-sep" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}
