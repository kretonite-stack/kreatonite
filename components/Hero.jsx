"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [phase, setPhase] = useState("black");
  const heroRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("flash"),  400);
    const t2 = setTimeout(() => setPhase("reveal"), 900);
    const t3 = setTimeout(() => setPhase("full"),  1800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const isActive      = phase === "reveal" || phase === "full";
  const isFullyActive = phase === "full";

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "640px", background: "#000" }}
    >
      {/* ── FONDO IMAGEN ── */}
      <div
        className="absolute inset-0 z-0"
        style={{ opacity: isActive ? 1 : 0, transition: "opacity 1.4s ease" }}
      >
        <Image
          src="/hero-bg.png"
          alt="Kreatonite background"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* ── FLASH CINEMÁTICO ── */}
      <div
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          background: "#aaff00",
          opacity: phase === "flash" ? 0.6 : 0,
          transition: phase === "flash" ? "opacity 0.15s ease-in" : "opacity 0.6s ease-out",
        }}
      />

      {/* ── PULSO DE ENERGÍA ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at 65% 55%, rgba(170,255,0,0.16) 0%, transparent 55%)",
          opacity: isFullyActive ? 1 : 0,
          transition: "opacity 1.2s ease",
          animation: isFullyActive ? "pulseEnergy 4s ease-in-out infinite" : "none",
        }}
      />

      {/* ── SCANLINES ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 4px)",
        }}
      />

      {/* ── GRADIENTE IZQUIERDO ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 32%, rgba(0,0,0,0.10) 56%, transparent 70%)",
        }}
      />

      {/* ── GRADIENTE INFERIOR ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "28%",
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
        }}
      />

      {/* ── VIDEO TARRO (centrado-derecha) ── */}
      <div
        className="absolute z-20"
        style={{
          left: "50%",
          top: "50%",
          transform: isFullyActive
            ? "translate(-10%, -50%) scale(1)"
            : "translate(-10%, -42%) scale(0.88)",
          opacity: isFullyActive ? 1 : 0,
          transition: "all 1.3s cubic-bezier(0.22,1,0.36,1) 0.7s",
          width: "clamp(300px, 40vw, 580px)",
          pointerEvents: "none",
        }}
      >
        {/* Glow detrás del video */}
        <div
          style={{
            position: "absolute",
            inset: "-30px",
            background:
              "radial-gradient(ellipse at center, rgba(170,255,0,0.30) 0%, transparent 70%)",
            filter: "blur(24px)",
            zIndex: 0,
          }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 0 32px rgba(170,255,0,0.55)) drop-shadow(0 0 60px rgba(170,255,0,0.25))",
            position: "relative",
            zIndex: 1,
          }}
        >
          <source src="/tarro.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── NAVBAR ── */}
      <nav
        className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-10 py-4"
        style={{
          borderBottom: "1px solid rgba(170,255,0,0.12)",
          opacity: isFullyActive ? 1 : 0,
          transform: isFullyActive ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.8s ease 0.3s",
          backdropFilter: "blur(6px)",
          background: "rgba(0,0,0,0.35)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-md"
            style={{ width: 36, height: 36, background: "#aaff00" }}
          >
            <svg viewBox="0 0 24 24" fill="#000" width={20} height={20}>
              <path d="M13 2L4 14h7l-2 8 9-12h-7z" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Black Ops One', sans-serif", fontSize: 16, color: "#fff", letterSpacing: 3 }}>
              KREATONITE
            </div>
            <div style={{ fontSize: 8, color: "#aaff00", letterSpacing: 4, marginTop: -3 }}>
              THE GAME CHANGER
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {["INICIO", "TIENDA", "BENEFICIOS", "SOBRE NOSOTROS", "CONTACTO"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11,
                letterSpacing: 3,
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#aaff00")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.65)")}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} width={22} height={22}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          <button
            style={{
              background: "#aaff00",
              color: "#000",
              border: "none",
              padding: "8px 20px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: 3,
              cursor: "pointer",
              clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
            }}
          >
            🛒 0
          </button>
        </div>
      </nav>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div
        className="absolute inset-0 z-30 flex items-center"
        style={{ paddingLeft: "clamp(32px, 5vw, 80px)", paddingTop: 80 }}
      >
        <div style={{ maxWidth: 540 }}>

          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(170,255,0,0.6)",
              padding: "5px 14px",
              marginBottom: 20,
              background: "rgba(170,255,0,0.06)",
              opacity: isFullyActive ? 1 : 0,
              transform: isFullyActive ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.5s",
            }}
          >
            <div
              style={{
                width: 6, height: 6,
                background: "#aaff00",
                borderRadius: "50%",
                animation: "blink 1.4s ease-in-out infinite",
              }}
            />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, letterSpacing: 4, color: "#aaff00", fontWeight: 700 }}>
              ⚡ SUPLEMENTO DE ÉLITE
            </span>
          </div>

          {/* Título */}
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(64px, 9vw, 110px)",
              fontWeight: 900,
              fontStyle: "italic",
              lineHeight: 0.88,
              color: "#aaff00",
              textShadow:
                "0 0 50px rgba(170,255,0,0.9), 0 0 100px rgba(170,255,0,0.5), 0 0 160px rgba(170,255,0,0.2)",
              animation: isFullyActive ? "titleGlow 3s ease-in-out infinite alternate" : "none",
              letterSpacing: -2,
              margin: "0 0 8px",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0) skewX(-2deg)" : "translateY(40px)",
              transition: "all 1s ease 0.2s",
            }}
          >
            KREATONITE
          </h1>

          {/* Subtítulo */}
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(24px, 3.5vw, 42px)",
              fontWeight: 900,
              fontStyle: "italic",
              color: "#fff",
              letterSpacing: 5,
              margin: "0 0 10px",
              textTransform: "uppercase",
              opacity: isFullyActive ? 1 : 0,
              transform: isFullyActive ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.8s ease 0.7s",
            }}
          >
            THE GAME CHANGER
          </h2>

          {/* Fórmula */}
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 12,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: isFullyActive ? 1 : 0,
              transition: "opacity 0.8s ease 0.9s",
            }}
          >
            <span style={{ display: "inline-block", width: 20, height: 1, background: "#aaff00" }} />
            <span style={{ color: "#aaff00", fontWeight: 700 }}>· 3 EN 1 REAL</span>
            {" "}CREATINA + ELECTROLITOS + VITAMINA B12
          </div>

          {/* Descripción */}
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.55)",
              marginBottom: 28,
              opacity: isFullyActive ? 1 : 0,
              transition: "opacity 0.8s ease 1.1s",
            }}
          >
            Energía limpia, fuerza explosiva y enfoque mental en una sola toma.
            <br />
            Diseñado para quienes entrenan en serio.
          </p>

          {/* Botones */}
          <div
            style={{
              display: "flex",
              gap: 14,
              marginBottom: 36,
              opacity: isFullyActive ? 1 : 0,
              transform: isFullyActive ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 1.3s",
            }}
          >
            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#aaff00", color: "#000",
                padding: "15px 28px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 12, fontWeight: 900, letterSpacing: 3,
                border: "none", cursor: "pointer",
                clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
                animation: "btnPulse 2.5s ease-in-out infinite",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#ccff33"; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#aaff00"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              ⚡ COMPRAR AHORA
            </button>
            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "transparent", color: "#fff",
                padding: "15px 28px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 12, fontWeight: 700, letterSpacing: 3,
                border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer",
                clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#aaff00"; e.currentTarget.style.color = "#aaff00"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
            >
              VER BENEFICIOS
            </button>
          </div>

          {/* Divisor */}
          <div
            style={{
              width: "100%", height: 1,
              background: "linear-gradient(90deg, rgba(170,255,0,0.4), rgba(170,255,0,0.1), transparent)",
              marginBottom: 20,
              opacity: isFullyActive ? 1 : 0,
              transition: "opacity 0.8s ease 1.5s",
            }}
          />

          {/* Stats */}
          <div
            style={{
              display: "flex",
              opacity: isFullyActive ? 1 : 0,
              transform: isFullyActive ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 1.6s",
            }}
          >
            {[
              { num: "10K+", lbl: "ATLETAS",   icon: "⊕" },
              { num: "4.9",  lbl: "RATING",    icon: "★" },
              { num: "30",   lbl: "PORCIONES", icon: "◈" },
              { num: "3EN1", lbl: "FÓRMULA",   icon: "⬡" },
            ].map((s, i) => (
              <div
                key={s.lbl}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  paddingRight: 24, marginRight: 24,
                  borderRight: i < 3 ? "1px solid rgba(170,255,0,0.15)" : "none",
                }}
              >
                <span style={{ color: "#aaff00", fontSize: 18, opacity: 0.8 }}>{s.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Black Ops One', sans-serif", fontSize: 22, color: "#aaff00" }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.4)", marginTop: -3 }}>
                    {s.lbl}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES DERECHA (debajo del video) ── */}
      <div
        className="absolute z-40"
        style={{
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          opacity: isFullyActive ? 1 : 0,
          transition: "opacity 1s ease 2s",
        }}
      >
        {[
          { title: "MÁS FUERZA",     sub: "Y POTENCIA",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="#aaff00" strokeWidth={2} width={15} height={15}><path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z"/></svg> },
          { title: "HIDRATACIÓN",    sub: "SUPERIOR",
            icon: <svg viewBox="0 0 24 24" fill="#aaff00" width={15} height={15}><path d="M13 2L4 14h7l-2 8 9-12h-7z"/></svg> },
          { title: "ENFOQUE MENTAL", sub: "Y ENERGÍA",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="#aaff00" strokeWidth={2} width={15} height={15}><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg> },
        ].map((f) => (
          <div
            key={f.title}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(0,0,0,0.60)",
              border: "1px solid rgba(170,255,0,0.2)",
              padding: "10px 13px", minWidth: 165,
              backdropFilter: "blur(10px)",
              transition: "all 0.3s", cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(170,255,0,0.7)";
              e.currentTarget.style.background = "rgba(170,255,0,0.07)";
              e.currentTarget.style.transform = "translateX(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(170,255,0,0.2)";
              e.currentTarget.style.background = "rgba(0,0,0,0.60)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <div style={{ width: 32, height: 32, border: "1px solid rgba(170,255,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(170,255,0,0.05)", flexShrink: 0 }}>
              {f.icon}
            </div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 900, letterSpacing: 2, color: "#aaff00" }}>{f.title}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.4)" }}>{f.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── CSS ANIMATIONS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Barlow+Condensed:ital,wght@0,400;0,700;0,900;1,900&display=swap');
        @keyframes blink {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:.3; transform:scale(1.5); }
        }
        @keyframes titleGlow {
          from { text-shadow: 0 0 40px rgba(170,255,0,.7),0 0 80px rgba(170,255,0,.3); }
          to   { text-shadow: 0 0 70px rgba(170,255,0,1),0 0 130px rgba(170,255,0,.7),0 0 200px rgba(170,255,0,.25); }
        }
        @keyframes btnPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(170,255,0,.3); }
          50%     { box-shadow: 0 0 30px 8px rgba(170,255,0,.15); }
        }
        @keyframes pulseEnergy {
          0%,100% { opacity:.5; }
          50%     { opacity:1; }
        }
      `}</style>
    </section>
  );
}
