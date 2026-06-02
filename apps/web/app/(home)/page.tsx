import CTASection from '@/components/landing/cta-section';
import FeaturesSection from '@/components/landing/features/features-section';
import Footer from '@/components/landing/footer';
import HowItWorkSection from '@/components/landing/howitworks-section';
import LandingHeroWithHeader from '@/components/landing/landing-hero-with-header';
import PricingSection from '@/components/landing/pricing/pricing-section';
import TestimonialsSection from '@/components/landing/testimonials/testimonials-section';
import TrustSection from '@/components/landing/trust-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-clip selection:bg-primary/10">
      {/* Global ambient layer — smooth overlapping flowing radials */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top hero halo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.12),transparent_70%)]" />
        
        {/* Flowing glow between Trust and Features */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/[0.035] blur-[150px] rounded-full" />
        
        {/* Flowing glow between Features and How It Works */}
        <div className="absolute top-[35%] left-[15%] w-[700px] h-[550px] bg-primary/[0.03] blur-[160px] rounded-full" />
        
        {/* Flowing glow between How It Works and Testimonials */}
        <div className="absolute top-[55%] right-[10%] w-[750px] h-[600px] bg-violet-500/[0.035] blur-[180px] rounded-full" />
        
        {/* Flowing glow between Testimonials and Pricing */}
        <div className="absolute top-[75%] left-[5%] w-[700px] h-[550px] bg-sky-500/[0.025] blur-[160px] rounded-full" />
        
        {/* Flowing glow around Pricing and CTA */}
        <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-primary/[0.04] blur-[180px] rounded-full" />
      </div>

      <LandingHeroWithHeader />

      <main className="pt-24 sm:pt-28 lg:pt-32 relative z-10">
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
