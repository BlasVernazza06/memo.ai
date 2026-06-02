'use client';

import AiSandbox from './ai-sandbox';
import { BrowserMockup } from './hero/browser-mockup';
import { FloatingCards } from './hero/floating-cards';
import { HeroBackground } from './hero/hero-background';
import { HeroContent } from './hero/hero-content';

interface HeroSectionProps {
  isSandboxOpen: boolean;
  setIsSandboxOpen: (value: boolean) => void;
}

export default function HeroSection({
  isSandboxOpen,
  setIsSandboxOpen,
}: HeroSectionProps) {
  return (
    <section className="relative pt-30 pb-32 overflow-x-clip">
      <AiSandbox
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />

      <HeroBackground />

      <div className="memo-container relative z-10">
        <HeroContent onOpenSandbox={() => setIsSandboxOpen(true)} />

        {/* Visual Mockup Section - 3D PC/Browser Focus */}
        <div className="relative mt-20 mx-auto max-w-6xl perspective-[2000px]">
          {/* Background Glows for the Mockup */}
          <div className="absolute -inset-20 bg-primary/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />

          <BrowserMockup />
          <FloatingCards />
        </div>
      </div>
    </section>
  );
}
