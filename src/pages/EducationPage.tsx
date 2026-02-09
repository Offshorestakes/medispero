import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import EducationSection from "@/components/sections/EducationSection";

const EducationPage = () => {
  return (
    <>
      <Helmet>
        <title>CBD Education & Science | Medi Spero</title>
        <meta name="description" content="Learn about the science behind CBD, the endocannabinoid system, and how pharmaceutical-grade hemp products support your wellness." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://medispero.com/education" />
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
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default EducationPage;
