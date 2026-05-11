import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KREATONITE® — The Game Changer | 3 EN 1 REAL",
  description:
    "Creatina + Electrolitos + Vitamina B12. Energía, fuerza y enfoque en una sola toma. El suplemento definitivo diseñado para quienes entrenan en serio.",
  keywords:
    "kreatonite, creatina, electrolitos, vitamina b12, suplemento deportivo, fuerza, hidratación, enfoque, Chile",
  openGraph: {
    title: "KREATONITE® — The Game Changer",
    description: "3 EN 1 REAL: Creatina + Electrolitos + Vitamina B12",
    type: "website",
    siteName: "KREATONITE",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: "#a3e635",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,700;0,900;1,700;1,900&family=Barlow:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
