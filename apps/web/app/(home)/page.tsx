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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden selection:bg-primary/10">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.08),transparent)]" />
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
