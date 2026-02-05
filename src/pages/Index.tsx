import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AgeVerification from "@/components/AgeVerification";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import TrustSection from "@/components/sections/TrustSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import EducationSection from "@/components/sections/EducationSection";
import BlogSection from "@/components/sections/BlogSection";
import ShippingSection from "@/components/sections/ShippingSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

const Index = () => {
  return (
    <>
      <AgeVerification />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <CategoriesSection />
          <FeaturedProducts />
          <TrustSection />
          <EducationSection />
          <TestimonialsSection />
          <BlogSection />
          <ShippingSection />
          <NewsletterSection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
