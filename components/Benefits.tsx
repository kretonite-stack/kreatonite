"use client";

import { Dumbbell, Droplets, Brain, Zap } from "lucide-react";

const BENEFITS = [
  {
    Icon: Dumbbell,
    title: "MÁS FUERZA",
    subtitle: "Y POTENCIA",
    desc: "Mejora tu rendimiento en cada repetición con creatina pura de alta absorción.",
  },
  {
    Icon: Droplets,
    title: "HIDRATACIÓN",
    subtitle: "SUPERIOR",
    desc: "Electrolitos para mantener tu cuerpo en equilibrio óptimo.",
  },
  {
    Icon: Brain,
    title: "ENFOQUE MENTAL",
    subtitle: "Y ENERGÍA",
    desc: "Claridad mental cuando más lo necesitas.",
  },
  {
    Icon: Zap,
    title: "RECUPERACIÓN",
    subtitle: "MÁS RÁPIDA",
    desc: "Reduce la fatiga y mejora tu recuperación muscular.",
  },
];

export default function Benefits() {
  return (
    <section
      id="beneficios"
      className="bg-dark"
      style={{
        padding: "var(--section-pad)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h2 className="section-heading">
            <span style={{ color: "#fff" }}>BENEFICIOS </span>
            <span className="neon-text">REALES</span>
          </h2>
          <span className="neon-line" />
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          {BENEFITS.map(({ Icon, title, subtitle, desc }) => (
            <div key={title} className="card" style={{ padding: "30px 24px" }}>
              <div className="icon-circle" style={{ marginBottom: "20px" }}>
                <Icon size={32} color="var(--neon)" strokeWidth={1.5} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-d)",
                  fontSize: "19px",
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "1px",
                  marginBottom: "1px",
                  lineHeight: 1.1,
                }}
              >
                {title}
              </h3>
              <h4
                className="neon-text"
                style={{
                  fontFamily: "var(--font-d)",
                  fontSize: "19px",
                  fontWeight: 900,
                  letterSpacing: "1px",
                  marginBottom: "14px",
                }}
              >
                {subtitle}
              </h4>
              <p style={{ color: "var(--gray-2)", fontSize: "13px", lineHeight: 1.6 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
