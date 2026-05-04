"use client";

import Image from "next/image";
import { Play, Instagram } from "lucide-react";

const POSTS = [
  { id: 1, src: "/comm-surf.png",    alt: "Surfista en ola",          label: "@kreatonite" },
  { id: 2, src: "/comm-gym.png",     alt: "Atleta en el gimnasio",    label: "@kreatonite" },
  { id: 3, src: "/comm-product.png", alt: "Producto Kreatonite",      label: "@kreatonite" },
  { id: 4, src: "/comm-athlete.png", alt: "Atleta crossfit",          label: "@kreatonite" },
  { id: 5, src: "/comm-running.png", alt: "Corredores en pista",      label: "@kreatonite" },
  { id: 6, src: "/comm-runner.png",  alt: "Corredor nocturno",        label: "@kreatonite" },
];

export default function Community() {
  return (
    <section
      id="comunidad"
      className="bg-dark"
      style={{
        padding: "var(--section-pad)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign:"center", marginBottom:"44px" }}>
          <h2 className="section-heading">
            <span style={{ color:"#fff" }}>ÚNETE A LA </span>
            <span className="neon-text">COMUNIDAD</span>
          </h2>
          <span className="neon-line" />
        </div>

        {/* 6-col grid */}
        <div className="comm-grid" style={{ marginBottom:"24px" }}>
          {POSTS.map((p) => (
            <a
              key={p.id}
              href="https://www.instagram.com/kreatonite/"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-cell"
              style={{ display:"block", textDecoration:"none" }}
            >
              <Image
                src={p.src} alt={p.alt}
                fill
                sizes="(max-width:480px) 50vw, (max-width:900px) 33vw, 16vw"
                style={{ objectFit:"cover" }}
              />

              {/* Gradient overlay */}
              <div className="comm-overlay" />

              {/* Play icon (top-right) */}
              <div style={{
                position:"absolute", top:"8px", right:"8px",
                background:"rgba(0,0,0,0.65)", borderRadius:"50%",
                width:"26px", height:"26px",
                display:"flex", alignItems:"center", justifyContent:"center",
                zIndex:2,
              }}>
                <Play size={10} fill="var(--neon)" color="var(--neon)" />
              </div>

              {/* Instagram badge (bottom-right) */}
              <div style={{
                position:"absolute", bottom:"6px", right:"6px",
                background:"rgba(0,0,0,0.7)", borderRadius:"4px",
                padding:"3px 5px", zIndex:2,
              }}>
                <Instagram size={10} color="#e1306c" />
              </div>

              {/* Label bottom-left */}
              <span style={{
                position:"absolute", bottom:"8px", left:"8px",
                fontFamily:"var(--font-d)", fontSize:"9px",
                fontWeight:700, color:"rgba(255,255,255,0.7)",
                letterSpacing:"0.5px", zIndex:2,
              }}>
                {p.label}
              </span>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div style={{ textAlign:"center" }}>
          <a
            href="https://www.instagram.com/kreatonite/"
            target="_blank" rel="noopener noreferrer"
            style={{
              display:"inline-flex", alignItems:"center",
              gap:"6px", textDecoration:"none",
              color:"var(--gray-1)", fontSize:"13px",
              fontFamily:"var(--font-b)",
              transition:"color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray-1)")}
          >
            Síguenos en Instagram
            <span className="neon-text" style={{ fontWeight:700 }}>@kreatonite</span>
          </a>
        </div>
      </div>

      <style>{`
        .comm-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
        }
        .comm-cell { position: relative; }
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
