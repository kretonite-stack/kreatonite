"use client";

import { useState } from "react";
import { X, Check, Send, MessageCircle, User, Mail, MessageSquare, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

const BASIC_CONS = ["Solo creatina", "Sin electrolitos", "Sin vitaminas", "Menor rendimiento"];
const KREA_PROS = [
  "3 EN 1 REAL",
  "Creatina + Electrolitos + Vitamina B12",
  "Hidratación superior",
  "Más energía y enfoque",
  "Mejores resultados",
];

/* ── CSS jar primitive ── */
function JarBasic() {
  return (
    <div style={{
      width:"100px", height:"120px",
      background:"linear-gradient(180deg, #222 0%, #181818 100%)",
      borderRadius:"10px 10px 14px 14px",
      margin:"0 auto 14px",
      border:"1px solid #2e2e2e",
      position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
    }}>
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:"22px",
        background:"#2a2a2a", borderBottom:"1px solid #333",
      }} />
      <span style={{
        fontFamily:"var(--font-d)", fontSize:"11px",
        color:"#4a4a4a", letterSpacing:"1px",
        marginTop:"16px", textAlign:"center",
      }}>CREATINA{"\n"}BÁSICA</span>
    </div>
  );
}

function JarKrea() {
  return (
    <div style={{
      width:"100px", height:"120px",
      background:"linear-gradient(180deg, #0e1c00 0%, #0a1400 100%)",
      borderRadius:"10px 10px 14px 14px",
      margin:"0 auto 14px",
      border:"2px solid rgba(163,230,53,0.5)",
      boxShadow:"0 0 24px rgba(163,230,53,0.3)",
      position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      zIndex:1,
    }}>
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:"22px",
        background:"#182e00", borderBottom:"1px solid rgba(163,230,53,0.28)",
      }} />
      <span className="neon-text" style={{
        fontFamily:"var(--font-d)", fontSize:"11px",
        letterSpacing:"1.5px", marginTop:"16px", zIndex:1,
      }}>KREATONITE</span>
      <div style={{
        marginTop:"5px", background:"var(--neon)", color:"#000",
        fontSize:"7px", fontWeight:900, padding:"2px 7px",
        borderRadius:"2px", fontFamily:"var(--font-d)",
        letterSpacing:"0.5px", zIndex:1,
      }}>3-EN-1</div>
    </div>
  );
}

/* ── Contact form ── */
function ContactForm() {
  const [form, setForm] = useState({ nombre:"", email:"", mensaje:"" });
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
    setForm({ nombre:"", email:"", mensaje:"" });
    setTimeout(() => setSent(false), 5000);
  };

  const iconStyle = {
    position: "absolute" as const,
    left: "14px",
    pointerEvents: "none" as const,
  };

  return (
    <div>
      {/* Section title */}
      <h2 className="section-heading" style={{ marginBottom:"6px" }}>
        <span style={{ color:"#fff" }}>CONTÁCT</span>
        <span className="neon-text">ANOS</span>
      </h2>
      <div style={{
        width:"50px", height:"3px", background:"var(--neon)",
        marginBottom:"28px",
        boxShadow:"0 0 12px var(--neon)", borderRadius:"2px",
      }} />

      <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
        {/* Name */}
        <div style={{ position:"relative" }}>
          <User size={15} color="#333" style={{ ...iconStyle, top:"50%", transform:"translateY(-50%)" }} />
          <input
            type="text" required placeholder="Nombre completo"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="input-field" style={{ paddingLeft:"40px" }}
          />
        </div>

        {/* Email */}
        <div style={{ position:"relative" }}>
          <Mail size={15} color="#333" style={{ ...iconStyle, top:"50%", transform:"translateY(-50%)" }} />
          <input
            type="email" required placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field" style={{ paddingLeft:"40px" }}
          />
        </div>

        {/* Message */}
        <div style={{ position:"relative" }}>
          <MessageSquare size={15} color="#333" style={{ ...iconStyle, top:"14px" }} />
          <textarea
            required rows={4} placeholder="Tu mensaje"
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            className="input-field" style={{ paddingLeft:"40px", resize:"vertical" }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit" disabled={loading}
          style={{
            display:"flex", alignItems:"center",
            justifyContent:"center", gap:"10px",
            background: sent ? "#16a34a" : "var(--neon)",
            color:"#000",
            fontFamily:"var(--font-d)", fontWeight:900,
            fontSize:"14px", letterSpacing:"2px",
            textTransform:"uppercase",
            padding:"14px", borderRadius:"6px",
            border:"none", cursor: loading ? "not-allowed" : "pointer",
            boxShadow:"0 0 20px rgba(163,230,53,0.3)",
            transition:"all 0.25s ease",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <Send size={16} />
          {sent ? "¡ENVIADO! ✓" : loading ? "ENVIANDO..." : "ENVIAR MENSAJE"}
        </button>

        {/* Error message */}
        {error && (
          <div style={{
            display:"flex", alignItems:"center", gap:"8px",
            background:"rgba(239,68,68,0.1)",
            border:"1px solid rgba(239,68,68,0.35)",
            borderRadius:"6px", padding:"10px 14px",
          }}>
            <AlertCircle size={14} color="#ef4444" />
            <span style={{ color:"#ef4444", fontSize:"13px", fontFamily:"var(--font-b)" }}>{error}</span>
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
   MAIN COMPONENT — Comparison (left) + Contact (right)
   ══════════════════════════════════════════════ */
export default function Comparison() {
  return (
    <section
      id="comparacion"
      className="bg-dark"
      style={{
        padding: "var(--section-pad)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="container">
        <div className="comp-grid">
          {/* ── LEFT: VS panel ── */}
          <div>
            {/* VS cards row */}
            <div className="vs-row">
              {/* Basic */}
              <div style={{
                background:"linear-gradient(145deg, #0d0d0d, #111)",
                border:"1px solid #1e1e1e",
                borderRadius:"10px 0 0 10px",
                padding:"28px 18px",
                opacity:0.7, flex:1,
              }}>
                <JarBasic />
                <h3 style={{
                  fontFamily:"var(--font-d)", fontSize:"17px",
                  color:"var(--gray-2)", letterSpacing:"1px",
                  textAlign:"center", marginBottom:"16px",
                }}>CREATINA BÁSICA</h3>
                {BASIC_CONS.map((c) => (
                  <div key={c} className="list-item">
                    <div className="list-badge" style={{
                      background:"rgba(239,68,68,0.1)",
                      border:"1px solid rgba(239,68,68,0.32)",
                    }}>
                      <X size={10} color="#ef4444" />
                    </div>
                    <span style={{ color:"var(--gray-3)", fontSize:"12px" }}>{c}</span>
                  </div>
                ))}
              </div>

              {/* VS badge */}
              <div style={{
                display:"flex", alignItems:"center",
                padding:"0 14px", zIndex:2, flexShrink:0,
              }}>
                <span style={{
                  fontFamily:"var(--font-d)", fontSize:"40px",
                  fontWeight:900, color:"#fff", letterSpacing:"2px",
                  textShadow:"0 0 20px rgba(255,255,255,0.2)",
                }}>VS</span>
              </div>

              {/* Kreatonite */}
              <div style={{
                background:"linear-gradient(145deg, #090e00, #0c1500)",
                border:"2px solid rgba(163,230,53,0.32)",
                borderRadius:"0 10px 10px 0",
                padding:"28px 18px",
                boxShadow:"0 0 30px rgba(163,230,53,0.06), inset 0 0 30px rgba(163,230,53,0.03)",
                flex:1, position:"relative", overflow:"hidden",
              }}>
                <div style={{
                  position:"absolute", top:0, right:0,
                  width:"120px", height:"120px",
                  background:"radial-gradient(circle, rgba(163,230,53,0.08) 0%, transparent 70%)",
                  pointerEvents:"none",
                }} />
                <JarKrea />
                <h3 className="neon-text" style={{
                  fontFamily:"var(--font-d)", fontSize:"17px",
                  letterSpacing:"1px", textAlign:"center",
                  marginBottom:"16px", position:"relative", zIndex:1,
                }}>KREATONITE</h3>
                {KREA_PROS.map((p) => (
                  <div key={p} className="list-item" style={{ position:"relative", zIndex:1 }}>
                    <div className="list-badge" style={{
                      background:"rgba(163,230,53,0.1)",
                      border:"1px solid rgba(163,230,53,0.4)",
                    }}>
                      <Check size={10} color="var(--neon)" />
                    </div>
                    <span style={{ color:"#e5e7eb", fontSize:"12px" }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tagline */}
            <p style={{
              fontFamily:"var(--font-d)",
              fontSize:"clamp(17px, 2.5vw, 24px)",
              fontWeight:900, color:"#fff",
              letterSpacing:"2px", textAlign:"center",
              marginTop:"30px", textTransform:"uppercase",
            }}>
              NO SOMOS CUALQUIER CREATINA.{" "}
              <span className="neon-text" style={{ fontStyle:"italic" }}>
                SOMOS KREATONITE.
              </span>
            </p>
          </div>

          {/* ── RIGHT: Contact form ── */}
          <div id="contacto">
            <ContactForm />
          </div>
        </div>
      </div>

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
        .vs-row > div:first-child {
          border-radius: 10px 0 0 10px;
        }
        .vs-row > div:last-child {
          border-radius: 0 10px 10px 0;
        }
        @media (max-width: 900px) {
          .comp-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
          .vs-row { flex-direction: column; }
          .vs-row > div:first-child { border-radius: 10px 10px 0 0 !important; }
          .vs-row > div:last-child { border-radius: 0 0 10px 10px !important; }
        }
      `}</style>
    </section>
  );
}
