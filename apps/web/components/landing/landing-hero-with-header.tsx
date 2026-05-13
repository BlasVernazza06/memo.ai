'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';

import HeroSection from '@/components/landing/hero-section';
import Header from '@/components/landing/landing-header';

export default function LandingHeroWithHeader() {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);

  return (
    <>
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

      <HeroSection
        isSandboxOpen={isSandboxOpen}
        setIsSandboxOpen={setIsSandboxOpen}
      />
    </>
  );
}
