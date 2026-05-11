"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV = [
  { label: "INICIO", href: "/" },
  { label: "PRODUCTOS", href: "/productos" },
  { label: "BENEFICIOS", href: "/beneficios" },
  { label: "RETIRO / DESPACHO", href: "/centros-retiro" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: scrolled
            ? "rgba(0,0,0,0.97)"
            : "rgba(0,0,0,0.7)",
          borderBottom: scrolled
            ? "1px solid rgba(163,230,53,0.3)"
            : "1px solid rgba(163,230,53,0.1)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transition: "all 0.4s ease",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.7), 0 0 30px rgba(163,230,53,0.05)" : "none",
        }}
      >
        {/* Top electric line */}
        {scrolled && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.5) 30%, rgba(200,255,0,0.8) 50%, rgba(163,230,53,0.5) 70%, transparent)",
            boxShadow: "0 0 10px rgba(163,230,53,0.4)",
          }} />
        )}

        <div
          style={{
            maxWidth: "var(--max-w)",
            margin: "0 auto",
            padding: "0 24px",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Logo */}
          <a href="#inicio" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "28px", height: "28px",
              background: "linear-gradient(135deg, var(--neon-bright), var(--neon))",
              borderRadius: "4px",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 14px rgba(163,230,53,0.5)",
              flexShrink: 0,
            }}>
              <Zap size={16} fill="#000" color="#000" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span
                className="neon-text-xl"
                style={{
                  fontFamily: "var(--font-d)",
                  fontSize: "22px",
                  fontWeight: 400,
                  letterSpacing: "4px",
                  lineHeight: 1,
                }}
              >
                KREATONITE
              </span>
              <span style={{
                fontFamily: "var(--font-c)",
                fontSize: "7px",
                color: "var(--gray-3)",
                letterSpacing: "3px",
                marginTop: "1px",
              }}>
                THE GAME CHANGER
              </span>
            </div>
          </a>

          {/* Desktop nav — centered */}
          <nav
            className="md-show"
            style={{
              display: "flex",
              gap: "6px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                style={{
                  color: "var(--gray-1)",
                  textDecoration: "none",
                  fontFamily: "var(--font-d)",
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "1.8px",
                  transition: "all 0.25s ease",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--neon)";
                  el.style.background = "rgba(163,230,53,0.06)";
                  el.style.textShadow = "0 0 12px rgba(163,230,53,0.5)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--gray-1)";
                  el.style.background = "transparent";
                  el.style.textShadow = "none";
                }}
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="/acceso-cliente"
              title="Acceso Cliente"
              style={{
                color: "var(--gray-1)",
                display: "flex",
                transition: "all 0.25s",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--neon)";
                el.style.borderColor = "rgba(163,230,53,0.3)";
                el.style.background = "rgba(163,230,53,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--gray-1)";
                el.style.borderColor = "transparent";
                el.style.background = "transparent";
              }}
            >
              <User size={18} />
            </a>

            <a
              href="/sistema/login"
              target="_blank"
              title="Acceso Colaboradores"
              style={{
                color: "var(--gray-1)",
                display: "flex",
                transition: "all 0.25s",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--neon)";
                el.style.borderColor = "rgba(163,230,53,0.3)";
                el.style.background = "rgba(163,230,53,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--gray-1)";
                el.style.borderColor = "transparent";
                el.style.background = "transparent";
              }}
            >
              <Zap size={18} />
            </a>

            <a
              href="/checkout"
              title="Carrito"
              style={{
                color: "#000",
                display: "flex",
                position: "relative",
                padding: "8px 14px",
                borderRadius: "5px",
                background: "var(--neon)",
                textDecoration: "none",
                transition: "all 0.25s ease",
                boxShadow: "0 0 16px rgba(163,230,53,0.4)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 0 30px rgba(163,230,53,0.6)";
                el.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 0 16px rgba(163,230,53,0.4)";
                el.style.transform = "scale(1)";
              }}
            >
              <ShoppingCart size={17} />
              <span style={{
                position: "absolute",
                top: "-6px", right: "-6px",
                background: "#000",
                color: "var(--neon)",
                borderRadius: "50%",
                width: "16px", height: "16px",
                fontSize: "9px", fontWeight: 900,
                fontFamily: "var(--font-d)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(163,230,53,0.5)",
              }}>
                {totalItems}
              </span>
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="md-hide"
              onClick={() => setOpen(!open)}
              style={{
                background: "rgba(163,230,53,0.08)",
                border: "1px solid rgba(163,230,53,0.25)",
                borderRadius: "6px",
                color: "var(--neon)",
                cursor: "pointer",
                display: "flex",
                padding: "8px",
              }}
              aria-label="Menú"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div
            className="md-hide"
            style={{
              background: "rgba(5,5,5,0.98)",
              borderTop: "1px solid rgba(163,230,53,0.15)",
              padding: "8px 20px 20px",
              backdropFilter: "blur(20px)",
            }}
          >
            {NAV.map((n, i) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "var(--gray-1)",
                  textDecoration: "none",
                  fontFamily: "var(--font-d)",
                  fontSize: "16px",
                  fontWeight: 400,
                  letterSpacing: "2px",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(163,230,53,0.08)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--neon)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gray-1)")}
              >
                <Zap size={10} fill="var(--neon)" color="var(--neon)" />
                {n.label}
              </a>
            ))}
            {/* Mobile ERP Access */}
            <a
              href="/sistema/login"
              target="_blank"
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "var(--neon)",
                textDecoration: "none",
                fontFamily: "var(--font-d)",
                fontSize: "16px",
                fontWeight: 400,
                letterSpacing: "2px",
                padding: "14px 0",
                transition: "all 0.2s",
              }}
            >
              <Zap size={10} fill="var(--neon)" color="var(--neon)" />
              SISTEMA CONTROL
            </a>
          </div>
        )}
      </header>

      {/* Desktop nav (non-mobile CSS override) */}
      <style>{`
        @media (min-width: 769px) {
          .md-show { display: flex !important; }
          .md-hide { display: none !important; }
        }
        @media (max-width: 768px) {
          .md-show { display: none !important; }
          .md-hide { display: flex !important; }
        }
      `}</style>
    </>
  );
}
