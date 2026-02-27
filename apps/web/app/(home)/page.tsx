'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import CTASection from '@/components/landing/cta-section';
import FeaturesSection from '@/components/landing/features-section';
import Footer from '@/components/landing/footer';
import HeroSection from '@/components/landing/hero-section';
import HowItWorkSection from '@/components/landing/howitworks-section';
import Header from '@/components/landing/landing-header';
import PricingSection from '@/components/landing/pricing-section';
import TestimonialsSection from '@/components/landing/testimonials-section';
import TrustSection from '@/components/landing/trust-section';

export default function Home() {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background gradient blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: 'hsla(199, 89%, 48%, 0.25)' }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: 'hsla(217, 91%, 60%, 0.25)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: 'hsla(199, 89%, 48%, 0.08)' }}
      />

      <AnimatePresence>
        {!isSandboxOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 z-50 pt-4 px-4"
          >
            <Header />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 sm:pt-28 lg:pt-32 relative z-10">
        <HeroSection
          isSandboxOpen={isSandboxOpen}
          setIsSandboxOpen={setIsSandboxOpen}
        />
        <TrustSection />
        <FeaturesSection />
        <HowItWorkSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
