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
      {/* Structured Schema Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Memo.ai",
            "operatingSystem": "All",
            "applicationCategory": "EducationalApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "La herramienta de estudio inteligente que convierte tus documentos en flashcards y quizzes gamificados con IA.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "820"
            }
          })
        }}
      />

      {/* Global background halo — top hero aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none select-none overflow-hidden" />

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
