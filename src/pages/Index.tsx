import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AgeVerification from "@/components/AgeVerification";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";

// Lazy load below-fold sections
const TrustSection = lazy(() => import("@/components/sections/TrustSection"));
const NewsletterSection = lazy(() => import("@/components/sections/NewsletterSection"));

const Index = () => {
  // Organization Schema for brand visibility
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://medispero.com/#organization",
    name: "Medi Spero",
    url: "https://medispero.com",
    logo: {
      "@type": "ImageObject",
      url: "https://medispero.com/logo.png",
      width: 512,
      height: 512,
    },
    image: "https://medispero.com/logo.png",
    description: "Premium pharmaceutical-grade CBD & hemp wellness products. Lab-tested cannabinoid formulations for ADHD, anxiety, mood support, and overall wellness.",
    foundingDate: "2020",
    slogan: "Premium Hemp Wellness for Mind, Mood & Body",
    email: "info@medispero.com",
    telephone: "+1-334-746-9312",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-334-746-9312",
        email: "info@medispero.com",
        contactType: "customer service",
        availableLanguage: ["English"],
        areaServed: "US",
      },
    ],
    sameAs: [
      "https://www.facebook.com/medispero",
      "https://www.instagram.com/medispero",
      "https://twitter.com/medispero",
    ],
  };

  // LocalBusiness Schema for local search visibility
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": "https://medispero.com/#store",
    name: "Medi Spero",
    url: "https://medispero.com",
    logo: "https://medispero.com/logo.png",
    image: "https://medispero.com/logo.png",
    description: "Premium pharmaceutical-grade CBD and hemp wellness products. Specializing in lab-tested cannabinoid formulations for mental wellness, focus, anxiety relief, and holistic health.",
    email: "info@medispero.com",
    telephone: "+1-334-746-9312",
    priceRange: "$$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card, Debit Card, Cryptocurrency",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };

  // WebSite Schema for sitelinks search box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://medispero.com/#website",
    url: "https://medispero.com",
    name: "Medi Spero",
    description: "Premium Pharmaceutical-Grade CBD & Hemp Wellness Products",
    publisher: {
      "@id": "https://medispero.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://medispero.com/products?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Helmet>
        <title>Medi Spero | Premium Pharmaceutical-Grade CBD & Hemp Wellness</title>
        <meta name="description" content="Shop premium pharmaceutical-grade CBD oils, capsules, and hemp wellness products. Lab-tested formulations for ADHD, anxiety, mood support & focus. Free shipping on orders over $250." />
        <meta name="keywords" content="CBD oil, hemp wellness, pharmaceutical CBD, ADHD supplements, anxiety relief, mood support, focus supplements, lab-tested CBD, premium hemp products" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="rating" content="adult" />
        <link rel="canonical" href="https://medispero.com" />
        <meta property="og:title" content="Medi Spero | Premium Pharmaceutical-Grade CBD & Hemp Wellness" />
        <meta property="og:description" content="Shop premium pharmaceutical-grade CBD oils, capsules, and hemp wellness products. Lab-tested formulations for mental wellness and holistic health." />
        <meta property="og:url" content="https://medispero.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Medi Spero" />
        <meta property="og:image" content="https://medispero.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Medi Spero | Premium CBD & Hemp Wellness" />
        <meta name="twitter:description" content="Pharmaceutical-grade CBD & hemp wellness products. Lab-tested, premium quality." />
        <meta name="twitter:image" content="https://medispero.com/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>
      <AgeVerification />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" role="main" className="flex-1">
          <HeroSection />
          <CategoriesSection />
          <FeaturedProducts />
          <Suspense fallback={<div className="h-32" />}>
            <TrustSection />
          </Suspense>
          <Suspense fallback={<div className="h-20" />}>
            <NewsletterSection />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
