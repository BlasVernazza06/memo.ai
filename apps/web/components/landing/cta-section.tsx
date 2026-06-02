import Link from 'next/link';

import { ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-x-clip bg-background">
      {/* Ambient glow bleed from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="memo-container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary via-primary/95 to-indigo-950 text-white text-center space-y-8 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.25)] border border-primary/20 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
            {/* Internal glows */}
            <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-white/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-violet-400/20 blur-[80px] rounded-full pointer-events-none" />

            {/* Badge */}
            <div className="relative z-10 flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm shadow-xs">
                <Sparkles className="w-3 h-3 text-sky-300" />
                Sin tarjeta de crédito
              </span>
            </div>

            <div className="space-y-4 relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Eleva tu estudio <br />
                <span className="text-sky-200 italic">al siguiente nivel.</span>
              </h2>

              <p className="text-base text-white/80 max-w-lg mx-auto leading-relaxed font-medium">
                Únete a la nueva generación de estudiantes que dominan sus materias con inteligencia artificial.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2 relative z-10">
              <Button
                asChild
                className="bg-white hover:bg-white/95 text-primary hover:text-primary/95 px-12 py-7 rounded-2xl text-sm font-black shadow-xl shadow-black/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link href="/auth/register" className="flex items-center gap-2">
                  Comenzar ahora gratis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Link
                href="/auth/login"
                className="text-sm font-bold text-white/70 hover:text-white transition-colors underline underline-offset-4"
              >
                Ya tengo cuenta →
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 pt-2 relative z-10">
              {['Instalación instantánea', 'Cancela cuando quieras', 'Soporte 24/7'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
