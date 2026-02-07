import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

const TestimonialsPage = () => {
  return (
    <>
      <Helmet>
        <title>Customer Reviews & Testimonials | Medi Spero</title>
        <meta name="description" content="Read real reviews from verified Medi Spero customers. See why thousands trust our pharmaceutical-grade CBD and hemp wellness products." />
        <link rel="canonical" href="https://medispero.com/testimonials" />
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
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default TestimonialsPage;
