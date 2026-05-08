"use client";

import Image from "next/image";
import { Play, Instagram, Zap } from "lucide-react";

const POSTS = [
  { id: 1, src: "/comm-surf.png",    alt: "Surfista en ola",        label: "@kreatonite" },
  { id: 2, src: "/comm-gym.png",     alt: "Atleta en el gimnasio",  label: "@kreatonite" },
  { id: 3, src: "/comm-product.png", alt: "Producto Kreatonite",    label: "@kreatonite" },
  { id: 4, src: "/comm-athlete.png", alt: "Atleta crossfit",        label: "@kreatonite" },
  { id: 5, src: "/comm-running.png", alt: "Corredores en pista",    label: "@kreatonite" },
  { id: 6, src: "/comm-runner.png",  alt: "Corredor nocturno",      label: "@kreatonite" },
];

export default function Community() {
  return (
    <section
      id="comunidad"
      style={{
        padding: "var(--section-pad)",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "800px", height: "300px",
        background: "radial-gradient(ellipse, rgba(163,230,53,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="electric-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="section-label" style={{ margin: "0 auto 16px" }}>
            <Zap size={11} fill="var(--neon)" color="var(--neon)" />
            COMUNIDAD REAL
          </div>
          <h2 className="section-heading">
            <span style={{ color: "#fff" }}>ÚNETE A LA </span>
            <span className="neon-text">COMUNIDAD</span>
          </h2>
          <span className="neon-line" />
          <p style={{
            color: "var(--gray-2)", fontSize: "15px",
            marginTop: "20px", maxWidth: "400px", margin: "20px auto 0",
            lineHeight: 1.6,
          }}>
            Miles de atletas ya entrenan con Kreatonite. Sé parte del cambio.
          </p>
        </div>

        {/* 6-col grid */}
        <div className="comm-grid" style={{ marginBottom: "32px" }}>
          {POSTS.map((p, index) => (
            <a
              key={p.id}
              href="https://www.instagram.com/kreatonite/"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-cell"
              style={{
                display: "block",
                textDecoration: "none",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <Image
                src={p.src} alt={p.alt}
                fill
                sizes="(max-width:480px) 50vw, (max-width:900px) 33vw, 16vw"
                style={{ objectFit: "cover" }}
              />

              {/* Gradient overlay */}
              <div className="comm-overlay" />

              {/* Neon border on hover */}
              <div style={{
                position: "absolute", inset: 0,
                border: "2px solid transparent",
                borderRadius: "10px",
                transition: "border-color 0.3s",
                zIndex: 3,
              }} />

              {/* Play icon (top-right) */}
              <div style={{
                position: "absolute", top: "10px", right: "10px",
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
                borderRadius: "50%",
                width: "30px", height: "30px",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2,
                border: "1px solid rgba(163,230,53,0.3)",
                boxShadow: "0 0 10px rgba(163,230,53,0.2)",
              }}>
                <Play size={11} fill="var(--neon)" color="var(--neon)" />
              </div>

              {/* Instagram badge */}
              <div style={{
                position: "absolute", bottom: "8px", right: "8px",
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(8px)",
                borderRadius: "5px",
                padding: "4px 6px", zIndex: 2,
                border: "1px solid rgba(255,255,255,0.1)",
              }}>
                <Instagram size={11} color="#e1306c" />
              </div>

              {/* Label */}
              <span style={{
                position: "absolute", bottom: "10px", left: "10px",
                fontFamily: "var(--font-d)", fontSize: "10px",
                fontWeight: 400, color: "rgba(255,255,255,0.7)",
                letterSpacing: "1px", zIndex: 2,
              }}>
                {p.label}
              </span>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div style={{ textAlign: "center" }}>
          <a
            href="https://www.instagram.com/kreatonite/"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center",
              gap: "10px", textDecoration: "none",
              color: "var(--gray-1)", fontSize: "14px",
              fontFamily: "var(--font-b)",
              transition: "color 0.25s",
              padding: "12px 24px",
              border: "1px solid rgba(163,230,53,0.2)",
              borderRadius: "30px",
              background: "rgba(163,230,53,0.03)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = "var(--neon)";
              el.style.borderColor = "rgba(163,230,53,0.5)";
              el.style.boxShadow = "0 0 20px rgba(163,230,53,0.15)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.color = "var(--gray-1)";
              el.style.borderColor = "rgba(163,230,53,0.2)";
              el.style.boxShadow = "none";
            }}
          >
            <Instagram size={16} />
            Síguenos en Instagram
            <span className="neon-text" style={{ fontWeight: 700 }}>@kreatonite</span>
          </a>
        </div>
      </div>

      <style>{`
        .comm-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }
        @media (max-width: 900px) {
          .comm-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .comm-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
