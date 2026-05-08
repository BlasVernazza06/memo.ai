'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function PricingHeader() {
  return (
    <div className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="memo-container flex items-center justify-between h-14">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          Volver al inicio
        </Link>
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-base font-bold tracking-tight">
            memo<span className="text-primary">.ai</span>
          </span>
        </Link>
        <div className="w-28" />
      </div>
    </div>
  );
}
