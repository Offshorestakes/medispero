import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

const RelatedContent = lazy(() => import("@/components/sections/RelatedContent"));

const TestimonialsPage = () => {
  return (
    <>
      <Helmet>
        <title>Customer Reviews & Testimonials | Medi Spero</title>
        <meta name="description" content="Read real reviews from verified Medi Spero customers. See why thousands trust our pharmaceutical-grade CBD and hemp wellness products." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://medispero.com/testimonials" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Customer Reviews & Testimonials | Medi Spero" />
        <meta property="og:description" content="Real reviews from verified Medi Spero customers. See why thousands trust our CBD products." />
        <meta property="og:url" content="https://medispero.com/testimonials" />
        <meta property="og:image" content="https://medispero.com/og-homepage.jpg" />
        <meta property="og:site_name" content="Medi Spero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Customer Reviews | Medi Spero" />
        <meta name="twitter:description" content="Real reviews from verified Medi Spero CBD customers." />
        <meta name="twitter:image" content="https://medispero.com/og-homepage.jpg" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="bg-muted/30 py-12">
            <div className="container-wide text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Reviews</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">Real stories from real customers who trust Medi Spero for their wellness journey.</p>
            </div>
          </div>
          <TestimonialsSection />
          <Suspense fallback={<div className="h-32" />}>
            <RelatedContent tags={["reviews", "anxiety", "mood"]} maxProducts={4} maxPosts={3} />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default TestimonialsPage;
