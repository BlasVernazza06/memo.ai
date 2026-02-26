import HeroSection from "@/components/landing/hero-section";
import Header from "@/components/landing/landing-header";
import TrustSection from "@/components/landing/trust-section";
import FeaturesSection from "@/components/landing/features-section";
import HowItWorkSection from "@/components/landing/howitworks-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import PricingSection from "@/components/landing/pricing-section";
import Footer from "@/components/landing/footer";
import CTASection from "@/components/landing/cta-section";

export default function Home() {
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
      
      <Header />
      
      <main className="pt-24 sm:pt-28 lg:pt-32 relative z-10">
        <HeroSection />
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
