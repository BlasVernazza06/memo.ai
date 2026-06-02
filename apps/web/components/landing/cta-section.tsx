import Link from 'next/link';

import { ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-28 md:py-36 relative overflow-x-clip bg-transparent">
      {/* Ambient glow bleed from top - smooth overlapping transitions */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/[0.04] blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="memo-container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 md:p-20 rounded-xl bg-gradient-to-br from-primary via-primary/95 to-indigo-950 text-white text-center space-y-8 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.3)] border border-primary/20 blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br select-none">
            {/* Internal glows */}
            <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-white/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-violet-400/20 blur-[80px] rounded-full pointer-events-none" />

            {/* Badge */}
            <div className="relative z-10 flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/10 border border-white/20 text-[9px] font-black uppercase tracking-[0.15em] text-white/90 backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-sky-200" />
                Sin tarjeta de crédito
              </span>
            </div>

            <div className="space-y-4 relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] mb-2 font-sans">
                Eleva tu estudio <br />
                <span className="font-serif italic text-sky-200 font-normal tracking-wide">al siguiente nivel.</span>
              </h2>

              <p className="text-sm md:text-base text-white/80 max-w-lg mx-auto leading-relaxed font-medium">
                Únete a la nueva generación de estudiantes que dominan sus materias con inteligencia artificial.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2 relative z-10">
              <Button
                asChild
                className="bg-white hover:bg-white/95 text-primary px-12 py-7 rounded-lg text-xs font-black uppercase tracking-wider shadow-xl shadow-black/10 transition-all duration-300 btn-tactile"
              >
                <Link href="/auth/register" className="flex items-center gap-2">
                  Comenzar ahora gratis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Link
                href="/auth/login"
                className="text-xs font-black text-white/70 hover:text-white transition-colors underline underline-offset-4 uppercase tracking-widest"
              >
                Ya tengo cuenta →
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 relative z-10">
              {['Instalación instantánea', 'Cancela cuando quieras', 'Soporte 24/7'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">
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
