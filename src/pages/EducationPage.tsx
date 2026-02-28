import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import EducationSection from "@/components/sections/EducationSection";

const RelatedContent = lazy(() => import("@/components/sections/RelatedContent"));

const EducationPage = () => {
  return (
    <>
      <Helmet>
        <title>CBD Education & Science | Medi Spero</title>
        <meta name="description" content="Learn about the science behind CBD, the endocannabinoid system, and how pharmaceutical-grade hemp products support your wellness." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://medispero.com/education" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="CBD Education & Science | Medi Spero" />
        <meta property="og:description" content="Learn about the endocannabinoid system and how pharmaceutical-grade CBD supports wellness." />
        <meta property="og:url" content="https://medispero.com/education" />
        <meta property="og:image" content="https://medispero.com/og-homepage.jpg" />
        <meta property="og:site_name" content="Medi Spero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CBD Education & Science | Medi Spero" />
        <meta name="twitter:description" content="The science behind CBD and how pharmaceutical-grade hemp products support your wellness." />
        <meta name="twitter:image" content="https://medispero.com/og-homepage.jpg" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <BreadcrumbNav items={[{ name: "Home", href: "/" }, { name: "CBD Education" }]} />
        <main id="main-content" className="flex-1">
          <div className="bg-muted/30 py-12">
            <div className="container-wide text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">CBD Education & Science</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">Understanding the science behind CBD and how it supports your body's natural wellness systems.</p>
            </div>
          </div>
          <EducationSection />
          <Suspense fallback={<div className="h-32" />}>
            <RelatedContent tags={["endocannabinoid", "cbd", "science"]} maxProducts={4} maxPosts={3} />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default EducationPage;
