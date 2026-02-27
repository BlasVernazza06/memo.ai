import type { Metadata } from 'next';

import { Outfit } from 'next/font/google';

import { ThemeProvider } from '@repo/ui/components/theme-provider';

import { AuthProvider } from '@/lib/auth-provider';

import './globals.css';

const outfit = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  icons: {
    icon: '/logo-app.webp',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
