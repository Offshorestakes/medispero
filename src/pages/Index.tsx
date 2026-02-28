import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AgeVerification from "@/components/AgeVerification";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";

// Lazy load FeaturedProducts — it pulls in the heavy products.ts with 30+ image imports
const FeaturedProducts = lazy(() => import("@/components/sections/FeaturedProducts"));

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
    logo: "https://medispero.com/logo.png",
    image: "https://medispero.com/logo.png",
    description: "Pharmaceutical-grade CBD and hemp wellness products including oils, tinctures, capsules, and isolates for ADHD, anxiety, sleep, and mood support.",
    foundingDate: "2020",
    slogan: "Premium Hemp Wellness for Mind, Mood & Body",
    email: "info@medispero.com",
    telephone: "+1-334-746-9312",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://medispero.com/contact",
      telephone: "+1-334-746-9312",
      email: "info@medispero.com",
      availableLanguage: ["English"],
      areaServed: "US",
    },
    sameAs: [
      "https://www.instagram.com/medispero",
      "https://www.facebook.com/medispero",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is pharmaceutical-grade CBD?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pharmaceutical-grade CBD refers to cannabidiol that meets rigorous purity and potency standards, similar to pharmaceutical drug manufacturing. Medi Spero products are third-party lab tested and contain less than 0.3% THC, compliant with the 2018 Farm Bill.",
        },
      },
      {
        "@type": "Question",
        name: "Does Medi Spero CBD help with ADHD?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Medi Spero offers a dedicated ADHD & Focus Support product line featuring hemp-derived cannabinoids formulated to support concentration and calm. All products are lab-tested and Farm Bill compliant.",
        },
      },
      {
        "@type": "Question",
        name: "Are Medi Spero products Farm Bill compliant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All Medi Spero products contain less than 0.3% THC and are fully compliant with the 2018 Farm Bill. Each product batch is verified by third-party lab testing.",
        },
      },
      {
        "@type": "Question",
        name: "What CBD products does Medi Spero sell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Medi Spero offers pharmaceutical-grade CBD oils and tinctures, CBD capsules, CBD vapes, 99% pure CBD isolate powder and crystals, CBD skincare, sleep and wellness formulas, and value bundles for ADHD, anxiety, mood, and depression support.",
        },
      },
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
        <title>Premium Pharmaceutical-Grade CBD & Hemp Wellness | Medi Spero</title>
        <meta name="description" content="Shop lab-tested, Farm Bill compliant CBD oils, capsules, tinctures, and isolates for ADHD, anxiety, sleep & more. Pharmaceutical-grade hemp wellness by Medi Spero." />
        <meta name="keywords" content="CBD oil, hemp wellness, pharmaceutical CBD, ADHD supplements, anxiety relief, mood support, focus supplements, lab-tested CBD, premium hemp products" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="rating" content="adult" />
        <link rel="canonical" href="https://medispero.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Premium Pharmaceutical-Grade CBD & Hemp Wellness | Medi Spero" />
        <meta property="og:description" content="Shop lab-tested CBD oils, capsules, tinctures & isolates for ADHD, anxiety, sleep and mood. Farm Bill compliant. Medi Spero." />
        <meta property="og:url" content="https://medispero.com/" />
        <meta property="og:image" content="https://medispero.com/og-homepage.jpg" />
        <meta property="og:site_name" content="Medi Spero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Pharmaceutical-Grade CBD & Hemp Wellness | Medi Spero" />
        <meta name="twitter:description" content="Lab-tested, Farm Bill compliant CBD for ADHD, anxiety, sleep & mood. Shop Medi Spero." />
        <meta name="twitter:image" content="https://medispero.com/og-homepage.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <AgeVerification />
        <Header />
        <main id="main-content" role="main" className="flex-1">
          <HeroSection />
          <CategoriesSection />
          <Suspense fallback={<div className="h-96 bg-muted/30" />}>
            <FeaturedProducts />
          </Suspense>
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
