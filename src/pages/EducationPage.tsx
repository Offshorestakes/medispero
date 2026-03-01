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

          {/* Contextual Links Section */}
          <section className="section-padding bg-muted/30">
            <div className="container-wide max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Continue Learning</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">From Our Blog</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/blog/cbd-for-anxiety-complete-guide" className="text-primary hover:underline">CBD for Anxiety: A Complete Guide</a></li>
                    <li><a href="/blog/cbd-thc-for-sleep-disorders" className="text-primary hover:underline">CBD & THC for Sleep Disorders</a></li>
                    <li><a href="/blog/understanding-cannabinoids-mental-health" className="text-primary hover:underline">Cannabinoids & Mental Health Explained</a></li>
                    <li><a href="/blog/pharmaceutical-grade-cbd-explained" className="text-primary hover:underline">What Is Pharmaceutical-Grade CBD?</a></li>
                    <li><a href="/blog/hemp-derived-delta-9-mood-support" className="text-primary hover:underline">Hemp-Derived Delta-9 THC for Mood</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shop by Wellness Goal</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/category/anti-anxiety" className="text-primary hover:underline">CBD Products for Anxiety Relief</a></li>
                    <li><a href="/category/sleep-wellness" className="text-primary hover:underline">CBD & CBN Sleep Formulas</a></li>
                    <li><a href="/category/adhd-focus" className="text-primary hover:underline">CBD for ADHD & Focus Support</a></li>
                    <li><a href="/category/mood-support" className="text-primary hover:underline">CBD for Mood & Depression Support</a></li>
                    <li><a href="/category/cbd-oils" className="text-primary hover:underline">Premium CBD Oils & Tinctures</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

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
