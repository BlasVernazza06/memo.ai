'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@repo/ui/components/ui/button';

export function PricingCTA() {
  return (
    <section className="py-20 border-t border-border/30">
      <div className="memo-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Listo para empezar?
          </h2>
          <p className="text-muted-foreground font-light">
            No necesitas tarjeta de crédito para el plan Free.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button asChild size="lg" className="rounded-xl font-bold px-8">
              <Link href="/auth/sign-up">Empezar gratis</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl font-bold px-8"
            >
              <Link href="/#features">Ver características</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
