"use client";

import { useState } from "react";
import { Instagram, Music2, Youtube, ArrowRight } from "lucide-react";
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
  { Icon: Instagram, href: "https://www.instagram.com/kreatonite/", label: "Instagram" },
  { Icon: Music2,    href: "https://www.tiktok.com/@kreatonite",   label: "TikTok" },
  { Icon: Youtube,   href: "https://www.youtube.com/@kreatonite",  label: "YouTube" },
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
      // Code 23505 = unique_violation (ya suscrito)
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
      background: "#000",
      borderTop: "1px solid rgba(163,230,53,0.12)",
      padding: "52px 24px 22px",
      position: "relative",
    }}>
      <div style={{ maxWidth:"var(--max-w)", margin:"0 auto" }}>

        {/* Main grid */}
        <div className="footer-grid" style={{ marginBottom:"40px" }}>

          {/* Brand */}
          <div>
            <span className="neon-text" style={{
              fontFamily:"var(--font-d)", fontSize:"28px",
              fontWeight:900, letterSpacing:"3px", display:"block", lineHeight:1,
            }}>KREATONITE</span>
            <span style={{
              fontFamily:"var(--font-d)", fontSize:"11px",
              color:"var(--gray-3)", letterSpacing:"2px",
              fontStyle:"italic", display:"block", marginTop:"3px",
            }}>THE GAME CHANGER</span>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{
              fontFamily:"var(--font-d)", color:"#fff",
              fontSize:"12px", fontWeight:700,
              letterSpacing:"2px", marginBottom:"16px", textTransform:"uppercase",
            }}>NAVEGACIÓN</h4>
            <ul style={{ listStyle:"none", padding:0 }}>
              {NAV_LINKS.map((l) => (
                <li key={l.label} style={{ marginBottom:"8px" }}>
                  <a href={l.href} className="footer-link">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 style={{
              fontFamily:"var(--font-d)", color:"#fff",
              fontSize:"12px", fontWeight:700,
              letterSpacing:"2px", marginBottom:"16px", textTransform:"uppercase",
            }}>POLÍTICAS</h4>
            <ul style={{ listStyle:"none", padding:0 }}>
              {POLICIES.map((l) => (
                <li key={l.label} style={{ marginBottom:"8px" }}>
                  <a href={l.href} className="footer-link" style={{ fontSize:"12px" }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 style={{
              fontFamily:"var(--font-d)", color:"#fff",
              fontSize:"12px", fontWeight:700,
              letterSpacing:"2px", marginBottom:"16px", textTransform:"uppercase",
            }}>SÍGUENOS</h4>
            <div style={{ display:"flex", gap:"10px" }}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label} href={href} target="_blank"
                  rel="noopener noreferrer" title={label}
                  style={{
                    width:"38px", height:"38px",
                    border:"1px solid rgba(163,230,53,0.2)",
                    borderRadius:"7px", display:"flex",
                    alignItems:"center", justifyContent:"center",
                    color:"var(--gray-1)", textDecoration:"none",
                    transition:"all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--neon)";
                    (e.currentTarget as HTMLElement).style.color = "var(--neon)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 14px rgba(163,230,53,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(163,230,53,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "var(--gray-1)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontFamily:"var(--font-d)", color:"#fff",
              fontSize:"12px", fontWeight:700,
              letterSpacing:"2px", marginBottom:"6px", textTransform:"uppercase",
            }}>SUSCRÍBETE</h4>
            <p style={{
              color:"var(--gray-2)", fontSize:"12px",
              marginBottom:"14px", lineHeight:1.5,
            }}>Recibe ofertas exclusivas y novedades.</p>
            <form onSubmit={submit} style={{ display:"flex" }}>
              <input
                type="email" required
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex:1, minWidth:0,
                  background:"#0d0d0d",
                  border:"1px solid #222", borderRight:"none",
                  borderRadius:"6px 0 0 6px",
                  padding:"10px 14px", color:"#fff",
                  fontSize:"12px", fontFamily:"var(--font-b)", outline:"none",
                }}
              />
              <button
                type="submit"
                style={{
                  background: ok ? "#16a34a" : "var(--neon)",
                  border:"none", borderRadius:"0 6px 6px 0",
                  width:"44px", flexShrink:0,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", transition:"all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 18px rgba(163,230,53,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <ArrowRight size={16} color="#000" />
              </button>
            </form>
            {/* Feedback */}
            {ok && (
              <p style={{ color:"var(--neon)", fontSize:"11px", marginTop:"7px", fontFamily:"var(--font-b)" }}>
                ✓ ¡Suscrito correctamente!
              </p>
            )}
            {nlError && (
              <p style={{ color:"#ef4444", fontSize:"11px", marginTop:"7px", fontFamily:"var(--font-b)" }}>
                {nlError}
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop:"1px solid var(--dark-4)",
          paddingTop:"18px", textAlign:"center",
        }}>
          <p style={{ color:"var(--gray-4)", fontSize:"11px", fontFamily:"var(--font-b)" }}>
            © 2026 KREATONITE. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* FAB scroll top */}
      <button
        className="fab-top"
        onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
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
