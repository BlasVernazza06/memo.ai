import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter es la alternativa más cercana a SF Pro disponible en Google Fonts
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "memo.ai - Transforma tus PDFs en material de estudio interactivo",
  description: "La herramienta de estudio inteligente que convierte tus documentos en flashcards y quizzes gamificados con IA.nh",
  keywords: ["estudio", "flashcards", "IA", "PDF", "aprendizaje", "universidad"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light">
      <body
        className={`${inter.variable} antialiased`}
        style={{
          fontFamily: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', var(--font-sans), 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
        }}
      >
        {children}
      </body>
    </html>
  );
}
