import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="memo-container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 md:p-20 rounded-[3rem] bg-foreground text-background text-center space-y-8 overflow-hidden shadow-2xl shadow-black/10">
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Eleva tu estudio <br /> al <span className="text-primary italic">siguiente nivel.</span>
              </h2>

              <p className="text-base text-background/60 max-w-lg mx-auto leading-relaxed font-medium">
                Únete a la nueva generación de estudiantes que dominan sus materias con inteligencia artificial.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 relative z-10">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-7 rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 transition-all duration-300"
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  Comenzar ahora gratis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <p className="text-[10px] font-bold text-background/30 uppercase tracking-[0.2em] relative z-10">
              Sin tarjeta de crédito • Instalación instantánea
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
