"use client";

import { useState } from "react";
import { Instagram, Music2, Youtube, ArrowRight, Zap } from "lucide-react";
import { supabase } from "@/lib/supabase";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Tienda", href: "#sabores" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Sobre nosotros", href: "#comparacion" },
  { label: "Contacto", href: "#contacto" },
];

const POLICIES = [
  { label: "Términos y condiciones", href: "#" },
  { label: "Política de privacidad", href: "#" },
  { label: "Cambios y devoluciones", href: "#" },
  { label: "Envíos y entregas", href: "#" },
];

const SOCIALS = [
  { Icon: Instagram, href: "https://www.instagram.com/kreatonite/", label: "Instagram", color: "#e1306c" },
  { Icon: Music2,    href: "https://www.tiktok.com/@kreatonite",    label: "TikTok", color: "#fff" },
  { Icon: Youtube,   href: "https://www.youtube.com/@kreatonite",   label: "YouTube", color: "#ff0000" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [nlError, setNlError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNlError("");

    const { error } = await supabase
      .from("kreatonite_newsletter")
      .insert({ email });

    if (error) {
      if (error.code === "23505") {
        setNlError("¡Ya estás suscrito!");
      } else {
        setNlError("Error. Intenta de nuevo.");
      }
      return;
    }

    setOk(true);
    setEmail("");
    setTimeout(() => setOk(false), 4000);
  };

  return (
    <footer style={{
      background: "transparent",
      borderTop: "1px solid rgba(163,230,53,0.15)",
      padding: "60px 24px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top electric line */}
      <div className="electric-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      {/* Background glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "600px", height: "200px",
        background: "radial-gradient(ellipse, rgba(163,230,53,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Main grid */}
        <div className="footer-grid" style={{ marginBottom: "52px" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{
                width: "32px", height: "32px",
                background: "linear-gradient(135deg, var(--neon-bright), var(--neon))",
                borderRadius: "5px",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 16px rgba(163,230,53,0.5)",
                flexShrink: 0,
              }}>
                <Zap size={18} fill="#000" color="#000" />
              </div>
              <div>
                <span className="neon-text" style={{
                  fontFamily: "var(--font-d)", fontSize: "26px",
                  fontWeight: 400, letterSpacing: "4px",
                  display: "block", lineHeight: 1,
                }}>KREATONITE</span>
                <span style={{
                  fontFamily: "var(--font-c)", fontSize: "9px",
                  color: "var(--gray-3)", letterSpacing: "2.5px",
                  fontStyle: "italic", display: "block", marginTop: "2px",
                }}>THE GAME CHANGER</span>
              </div>
            </div>
            <p style={{
              color: "var(--gray-3)", fontSize: "13px",
              lineHeight: 1.6, maxWidth: "200px",
            }}>
              El suplemento 3-EN-1 diseñado para atletas que entrenan en serio.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-d)", color: "#fff",
              fontSize: "13px", fontWeight: 400,
              letterSpacing: "2.5px", marginBottom: "20px",
              textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span style={{ color: "var(--neon)" }}>–</span> NAVEGACIÓN
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {NAV_LINKS.map((l) => (
                <li key={l.label} style={{ marginBottom: "4px" }}>
                  <a href={l.href} className="footer-link">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-d)", color: "#fff",
              fontSize: "13px", fontWeight: 400,
              letterSpacing: "2.5px", marginBottom: "20px",
              textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span style={{ color: "var(--neon)" }}>–</span> POLÍTICAS
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {POLICIES.map((l) => (
                <li key={l.label} style={{ marginBottom: "4px" }}>
                  <a href={l.href} className="footer-link" style={{ fontSize: "12px" }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-d)", color: "#fff",
              fontSize: "13px", fontWeight: 400,
              letterSpacing: "2.5px", marginBottom: "20px",
              textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span style={{ color: "var(--neon)" }}>–</span> SÍGUENOS
            </h4>
            <div style={{ display: "flex", gap: "10px" }}>
              {SOCIALS.map(({ Icon, href, label, color }) => (
                <a
                  key={label} href={href} target="_blank"
                  rel="noopener noreferrer" title={label}
                  style={{
                    width: "42px", height: "42px",
                    border: "1px solid rgba(163,230,53,0.18)",
                    borderRadius: "8px", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    color: "var(--gray-1)", textDecoration: "none",
                    transition: "all 0.3s ease",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(163,230,53,0.5)";
                    el.style.color = color;
                    el.style.boxShadow = "0 0 20px rgba(163,230,53,0.2)";
                    el.style.transform = "translateY(-3px)";
                    el.style.background = "rgba(163,230,53,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(163,230,53,0.18)";
                    el.style.color = "var(--gray-1)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                    el.style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-d)", color: "#fff",
              fontSize: "13px", fontWeight: 400,
              letterSpacing: "2.5px", marginBottom: "8px",
              textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span style={{ color: "var(--neon)" }}>–</span> SUSCRÍBETE
            </h4>
            <p style={{
              color: "var(--gray-2)", fontSize: "12px",
              marginBottom: "16px", lineHeight: 1.5,
            }}>
              Recibe ofertas exclusivas y novedades.
            </p>
            <form onSubmit={submit} style={{ display: "flex" }}>
              <input
                type="email" required
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1, minWidth: 0,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(163,230,53,0.2)",
                  borderRight: "none",
                  borderRadius: "6px 0 0 6px",
                  padding: "11px 14px", color: "#fff",
                  fontSize: "12px", fontFamily: "var(--font-b)", outline: "none",
                  transition: "border-color 0.25s",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(163,230,53,0.5)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(163,230,53,0.2)"; }}
              />
              <button
                type="submit"
                style={{
                  background: ok ? "#16a34a" : "linear-gradient(135deg, var(--neon-bright), var(--neon))",
                  border: "none", borderRadius: "0 6px 6px 0",
                  width: "46px", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.3s ease",
                  boxShadow: "0 0 16px rgba(163,230,53,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(163,230,53,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(163,230,53,0.3)";
                }}
              >
                <ArrowRight size={16} color="#000" />
              </button>
            </form>

            {ok && (
              <p style={{ color: "var(--neon)", fontSize: "11px", marginTop: "8px" }}>
                ✓ ¡Suscrito correctamente!
              </p>
            )}
            {nlError && (
              <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "8px" }}>
                {nlError}
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(163,230,53,0.08)",
          paddingTop: "20px",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "12px",
        }}>
          <p style={{ color: "var(--gray-4)", fontSize: "11px" }}>
            © 2026 KREATONITE. Todos los derechos reservados.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Zap size={10} fill="var(--neon)" color="var(--neon)" />
            <span style={{ color: "var(--gray-4)", fontSize: "10px", letterSpacing: "1.5px" }}>
              THE GAME CHANGER
            </span>
          </div>
        </div>
      </div>

      {/* FAB scroll top */}
      <button
        className="fab-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
      >
        ↑
      </button>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr 1fr 2fr;
          gap: 36px;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
