'use client';

import { useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './landing-header';
import HeroSection from './hero-section';

interface LandingInteractiveWrapperProps {
  children: ReactNode;
}

export default function LandingInteractiveWrapper({ children }: LandingInteractiveWrapperProps) {
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
      
      <main className="pt-24 sm:pt-28 lg:pt-32 relative z-10">
        <HeroSection 
          isSandboxOpen={isSandboxOpen} 
          setIsSandboxOpen={setIsSandboxOpen} 
        />
        {children}
      </main>
    </>
  );
}
