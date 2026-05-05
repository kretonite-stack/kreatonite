"use client";

import { useState } from "react";
import { X, Check, Send, MessageCircle, User, Mail, MessageSquare, AlertCircle, Zap } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

const BASIC_CONS = ["Solo creatina", "Sin electrolitos", "Sin vitaminas", "Menor rendimiento"];
const KREA_PROS = [
  "3 EN 1 REAL",
  "Creatina + Electrolitos + Vitamina B12",
  "Hidratación superior",
  "Más energía y enfoque",
  "Mejores resultados",
];

/* ── 3D Jar — Basic ── */
function JarBasic() {
  return (
    <div style={{
      width: "110px", height: "140px",
      background: "linear-gradient(180deg, #252525 0%, #1a1a1a 40%, #141414 100%)",
      borderRadius: "12px 12px 16px 16px",
      margin: "0 auto 18px",
      border: "1px solid #2a2a2a",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
      transform: "perspective(500px) rotateY(8deg)",
    }}>
      {/* Lid */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "26px",
        background: "linear-gradient(180deg, #303030, #252525)",
        borderBottom: "1px solid #1a1a1a",
      }} />
      {/* Shine */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "30%", bottom: 0,
        background: "linear-gradient(90deg, rgba(255,255,255,0.04), transparent)",
        pointerEvents: "none",
      }} />
      <span style={{
        fontFamily: "var(--font-d)", fontSize: "12px",
        color: "#3a3a3a", letterSpacing: "1px",
        marginTop: "20px", textAlign: "center",
        lineHeight: 1.3,
      }}>
        CREATINA<br />BÁSICA
      </span>
    </div>
  );
}

function JarKrea() {
  return (
    <div style={{
      width: "110px", height: "140px",
      background: "linear-gradient(180deg, #0f2200 0%, #0a1800 40%, #060e00 100%)",
      borderRadius: "12px 12px 16px 16px",
      margin: "0 auto 18px",
      border: "2px solid rgba(163,230,53,0.6)",
      boxShadow: "0 0 40px rgba(163,230,53,0.35), 0 10px 30px rgba(0,0,0,0.6), inset 0 0 30px rgba(163,230,53,0.05)",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 1,
      transform: "perspective(500px) rotateY(-8deg)",
      animation: "electric-border 3s ease-in-out infinite",
    }}>
      {/* Lid */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "26px",
        background: "linear-gradient(180deg, #1c3d00, #142e00)",
        borderBottom: "1px solid rgba(163,230,53,0.35)",
      }} />
      {/* Green shine */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "35%", bottom: 0,
        background: "linear-gradient(90deg, rgba(163,230,53,0.08), transparent)",
        pointerEvents: "none",
      }} />
      <span className="neon-text" style={{
        fontFamily: "var(--font-d)", fontSize: "13px",
        letterSpacing: "1.5px", marginTop: "20px", zIndex: 1,
        textAlign: "center",
      }}>
        KREATONITE
      </span>
      <div style={{
        marginTop: "6px",
        background: "linear-gradient(135deg, var(--neon-bright), var(--neon))",
        color: "#000",
        fontSize: "8px", fontWeight: 900, padding: "3px 8px",
        borderRadius: "3px", fontFamily: "var(--font-d)",
        letterSpacing: "1px", zIndex: 1,
        boxShadow: "0 0 10px rgba(163,230,53,0.5)",
      }}>
        3-EN-1
      </div>
    </div>
  );
}

/* ── Contact form ── */
function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: sbError } = await supabase
      .from("kreatonite_contactos")
      .insert({ nombre: form.nombre, email: form.email, mensaje: form.mensaje });

    if (sbError) {
      setError("No se pudo enviar. Intenta de nuevo.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
    setForm({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const iconStyle = {
    position: "absolute" as const,
    left: "14px",
    pointerEvents: "none" as const,
    color: "rgba(163,230,53,0.4)",
  };

  return (
    <div style={{
      background: "rgba(10,15,3,0.8)",
      border: "1px solid rgba(163,230,53,0.2)",
      borderRadius: "16px",
      padding: "36px",
      backdropFilter: "blur(20px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "150px", height: "150px",
        background: "radial-gradient(circle at 100% 0%, rgba(163,230,53,0.08) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Top line */}
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: "2px",
        background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.6), transparent)",
        boxShadow: "0 0 10px rgba(163,230,53,0.4)",
      }} />

      {/* Section title */}
      <div style={{ marginBottom: "28px" }}>
        <div className="section-label" style={{ marginBottom: "12px" }}>
          <Zap size={11} fill="var(--neon)" color="var(--neon)" />
          CONTÁCTANOS
        </div>
        <h2 className="section-heading" style={{ marginBottom: "4px" }}>
          <span style={{ color: "#fff" }}>ESCRÍB</span>
          <span className="neon-text">ENOS</span>
        </h2>
        <div style={{
          width: "50px", height: "3px",
          background: "var(--neon)",
          boxShadow: "0 0 12px var(--neon)", borderRadius: "2px",
        }} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Name */}
        <div style={{ position: "relative" }}>
          <User size={15} style={{ ...iconStyle, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text" required placeholder="Nombre completo"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="input-field" style={{ paddingLeft: "42px" }}
          />
        </div>

        {/* Email */}
        <div style={{ position: "relative" }}>
          <Mail size={15} style={{ ...iconStyle, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="email" required placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field" style={{ paddingLeft: "42px" }}
          />
        </div>

        {/* Message */}
        <div style={{ position: "relative" }}>
          <MessageSquare size={15} style={{ ...iconStyle, top: "15px" }} />
          <textarea
            required rows={4} placeholder="Tu mensaje"
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            className="input-field" style={{ paddingLeft: "42px", resize: "vertical" }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit" disabled={loading}
          className="btn-neon"
          style={{
            background: sent ? "linear-gradient(135deg, #22c55e, #16a34a)" : undefined,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Send size={16} />
          {sent ? "¡ENVIADO! ✓" : loading ? "ENVIANDO..." : "ENVIAR MENSAJE"}
        </button>

        {error && (
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "6px", padding: "10px 14px",
          }}>
            <AlertCircle size={14} color="#ef4444" />
            <span style={{ color: "#ef4444", fontSize: "13px" }}>{error}</span>
          </div>
        )}

        {/* WhatsApp */}
        <a
          href="https://wa.me/56951143426"
          target="_blank" rel="noopener noreferrer"
          className="btn-wsp"
        >
          <MessageCircle size={18} color="var(--wsp)" />
          ESCRÍBENOS POR WHATSAPP
        </a>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */
export default function Comparison() {
  return (
    <section
      id="comparacion"
      style={{
        padding: "var(--section-pad)",
        background: "var(--dark-1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "30%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="electric-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="comp-grid">

          {/* ── LEFT: VS panel ── */}
          <div>
            <div className="section-label" style={{ marginBottom: "24px" }}>
              <Zap size={11} fill="var(--neon)" color="var(--neon)" />
              LA DIFERENCIA ES CLARA
            </div>

            {/* VS cards row */}
            <div className="vs-row">
              {/* Basic */}
              <div style={{
                background: "linear-gradient(145deg, #0e0e0e, #111)",
                border: "1px solid #1e1e1e",
                borderRadius: "12px 0 0 12px",
                padding: "28px 20px",
                flex: 1,
              }}>
                <JarBasic />
                <h3 style={{
                  fontFamily: "var(--font-d)", fontSize: "18px",
                  color: "var(--gray-3)", letterSpacing: "1.5px",
                  textAlign: "center", marginBottom: "20px",
                }}>
                  CREATINA BÁSICA
                </h3>
                {BASIC_CONS.map((c) => (
                  <div key={c} className="list-item">
                    <div className="list-badge" style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.28)",
                    }}>
                      <X size={11} color="#ef4444" />
                    </div>
                    <span style={{ color: "var(--gray-3)", fontSize: "13px" }}>{c}</span>
                  </div>
                ))}
              </div>

              {/* VS badge */}
              <div style={{
                display: "flex", alignItems: "center",
                padding: "0 16px", zIndex: 2, flexShrink: 0,
                position: "relative",
              }}>
                <span style={{
                  fontFamily: "var(--font-d)", fontSize: "44px",
                  fontWeight: 400, color: "#fff", letterSpacing: "2px",
                  animation: "vs-pulse 3s ease-in-out infinite",
                  display: "block",
                }}>VS</span>
              </div>

              {/* Kreatonite */}
              <div style={{
                background: "linear-gradient(145deg, #080e00, #0c1600)",
                border: "2px solid rgba(163,230,53,0.4)",
                borderRadius: "0 12px 12px 0",
                padding: "28px 20px",
                boxShadow: "0 0 50px rgba(163,230,53,0.08), inset 0 0 40px rgba(163,230,53,0.03)",
                flex: 1, position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: "140px", height: "140px",
                  background: "radial-gradient(circle, rgba(163,230,53,0.1) 0%, transparent 65%)",
                  pointerEvents: "none",
                }} />
                {/* Top glow line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.7), transparent)",
                  boxShadow: "0 0 10px rgba(163,230,53,0.5)",
                }} />
                <JarKrea />
                <h3 className="neon-text" style={{
                  fontFamily: "var(--font-d)", fontSize: "18px",
                  letterSpacing: "1.5px", textAlign: "center",
                  marginBottom: "20px", position: "relative", zIndex: 1,
                }}>
                  KREATONITE
                </h3>
                {KREA_PROS.map((p) => (
                  <div key={p} className="list-item" style={{ position: "relative", zIndex: 1 }}>
                    <div className="list-badge" style={{
                      background: "rgba(163,230,53,0.1)",
                      border: "1px solid rgba(163,230,53,0.4)",
                    }}>
                      <Check size={11} color="var(--neon)" />
                    </div>
                    <span style={{ color: "#e5e7eb", fontSize: "13px" }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tagline */}
            <div style={{
              marginTop: "36px",
              padding: "24px",
              background: "rgba(163,230,53,0.04)",
              border: "1px solid rgba(163,230,53,0.15)",
              borderRadius: "10px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
            }}>
              <p style={{
                fontFamily: "var(--font-d)",
                fontSize: "clamp(18px, 2.5vw, 26px)",
                fontWeight: 400, color: "#fff",
                letterSpacing: "2px", textTransform: "uppercase",
              }}>
                NO SOMOS CUALQUIER CREATINA.{" "}
                <span className="neon-text" style={{ fontStyle: "italic" }}>
                  SOMOS KREATONITE.
                </span>
              </p>
            </div>
          </div>

          {/* ── RIGHT: Contact form ── */}
          <div id="contacto">
            <ContactForm />
          </div>
        </div>
      </div>

      <div className="electric-sep" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />

      <style>{`
        .comp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }
        .vs-row {
          display: flex;
          align-items: stretch;
        }
        @media (max-width: 960px) {
          .comp-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .vs-row { flex-direction: column; }
          .vs-row > div:first-child { border-radius: 12px 12px 0 0 !important; }
          .vs-row > div:last-child { border-radius: 0 0 12px 12px !important; }
        }
      `}</style>
    </section>
  );
}
