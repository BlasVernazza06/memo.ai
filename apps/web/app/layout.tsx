import { Outfit, Fraunces } from 'next/font/google';

import type { Metadata } from 'next';

import { ThemeProvider } from '@repo/ui/components/theme-provider';
import { Toaster } from '@repo/ui/components/ui/sonner';

import { AuthProvider } from '@/lib/auth-provider';
import { StreakCelebrationProvider } from '@/components/streak/streak-celebration';

import './globals.css';

const outfit = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const fraunces = Fraunces({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://memo-ai.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo-app.webp',
    apple: '/logo-app.webp',
  },
  title: 'memo.ai - Transforma tus PDFs en material de estudio interactivo',
  description:
    'La herramienta de estudio inteligente que convierte tus documentos en flashcards y quizzes gamificados con IA.',
  keywords: [
    'estudio',
    'flashcards',
    'IA',
    'PDF',
    'aprendizaje',
    'universidad',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${outfit.variable} ${fraunces.variable} font-sans`}>
        <div className="grain-overlay" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <Toaster />
        <StreakCelebrationProvider />
      </body>
    </html>
  );
}
