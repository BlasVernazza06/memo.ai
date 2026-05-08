'use client';

import { Star } from 'lucide-react';

export function TestimonialStrip() {
  return (
    <section className="py-16 bg-muted/30 border-y border-border/30">
      <div className="memo-container text-center">
        <div className="flex items-center justify-center gap-1.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-lg font-semibold tracking-tight max-w-lg mx-auto">
          &ldquo;Desde que uso el plan Pro mis notas están 10x más
          organizadas. La IA no falla.&rdquo;
        </p>
        <p className="text-sm text-muted-foreground mt-3 font-medium">
          — María G., estudiante de Medicina
        </p>
      </div>
    </section>
  );
}
