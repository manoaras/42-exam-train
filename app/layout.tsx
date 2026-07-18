import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exams · 42 — Trainer",
  description: "Entraînement aux exams Python de 42 : sujets officiels, quiz avec grademe, progression synchronisée.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <footer className="site-footer">
          Version <b>non officielle</b> et <b>non commerciale</b> — outil personnel d&apos;entraînement aux exams.
          Non affilié à l&apos;école 42.
        </footer>
      </body>
    </html>
  );
}
