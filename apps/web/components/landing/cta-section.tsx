import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-[2rem] bg-primary/5 border border-primary/10 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              ¿Listo para <span className="text-primary">transformar</span> tu
              forma de estudiar?
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Únete a miles de estudiantes que ya están aprobando con Memo.ai.
              Empieza gratis hoy mismo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 h-12 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
              >
                <Link href="/dashboard" className="flex items-center">
                  Comenzar ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground/80">
              Sin tarjeta de crédito • Setup en 1 minuto
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
