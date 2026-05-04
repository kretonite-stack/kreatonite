"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";

const NAV = [
  { label: "INICIO", href: "#inicio" },
  { label: "TIENDA", href: "#sabores" },
  { label: "BENEFICIOS", href: "#beneficios" },
  { label: "SOBRE NOSOTROS", href: "#comparacion" },
  { label: "CONTACTO", href: "#contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
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
          background: scrolled ? "rgba(0,0,0,0.97)" : "rgba(0,0,0,0.8)",
          borderBottom: "1px solid rgba(163,230,53,0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transition: "background 0.35s ease",
        }}
      >
        <div
          style={{
            maxWidth: "var(--max-w)",
            margin: "0 auto",
            padding: "0 24px",
            height: "62px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Logo */}
          <a href="#inicio" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span
              className="neon-text"
              style={{
                fontFamily: "var(--font-d)",
                fontSize: "23px",
                fontWeight: 900,
                letterSpacing: "3px",
                lineHeight: 1,
              }}
            >
              KREATONITE
            </span>
          </a>

          {/* Desktop nav — absolutely centered */}
          <nav
            className="md-show"
            style={{
              display: "flex",
              gap: "30px",
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
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--neon)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--gray-1)")
                }
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="#contacto"
              style={{ color: "var(--gray-1)", display: "flex", transition: "color 0.2s" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--neon)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--gray-1)")
              }
            >
              <User size={19} />
            </a>

            <a
              href="#sabores"
              style={{ color: "var(--gray-1)", display: "flex", position: "relative", transition: "color 0.2s" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--neon)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--gray-1)")
              }
            >
              <ShoppingCart size={19} />
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "var(--neon)",
                  color: "#000",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  fontSize: "9px",
                  fontWeight: 900,
                  fontFamily: "var(--font-d)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  letterSpacing: 0,
                }}
              >
                0
              </span>
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="md-hide"
              onClick={() => setOpen(!open)}
              style={{
                background: "none",
                border: "none",
                color: "var(--neon)",
                cursor: "pointer",
                display: "flex",
                padding: "4px",
              }}
              aria-label="Menú"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div
            className="md-hide"
            style={{
              background: "var(--dark-1)",
              borderTop: "1px solid rgba(163,230,53,0.1)",
              padding: "6px 24px 18px",
            }}
          >
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  color: "var(--gray-1)",
                  textDecoration: "none",
                  fontFamily: "var(--font-d)",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--dark-4)",
                }}
              >
                {n.label}
              </a>
            ))}
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
