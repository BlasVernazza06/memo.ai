import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="container rounded-lg bg-primary/15  border border-border mx-auto p-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            ¿Listo para{" "}
            <span className="text-primary">transformar</span> tu forma de estudiar?
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Únete a miles de estudiantes que ya están aprobando con StudyFlow.
            Comienza gratis hoy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 h-12 rounded-full shadow-lg shadow-primary/25">
              <Link href="/dashboard">
                Comenzar ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Sin tarjeta de crédito • Prueba gratuita de 7 días
          </p>
        </div>
      </div>
    </section>
  );
};