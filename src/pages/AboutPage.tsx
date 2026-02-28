import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Award, Users, Leaf, Heart, Shield, Target, FlaskConical, FileText, CheckCircle, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import aboutHeroImage from "@/assets/about-hero.jpg";

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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Medi Spero",
  url: "https://medispero.com",
  logo: "https://medispero.com/favicon.png",
  description: "Medi Spero is a premium hemp wellness brand specializing in pharmaceutical-grade CBD products formulated for ADHD, anxiety, focus, mood, depression, and sleep support.",
  foundingDate: "2023",
  founder: {
    "@type": "Person",
    name: "The Medi Spero Team",
  },
  sameAs: ["https://www.tiktok.com/@medispero"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@medispero.com",
    contactType: "customer service",
  },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Medi Spero — Pharmaceutical-Grade CBD Wellness Brand</title>
        <meta name="description" content="Learn about Medi Spero's mission to deliver pharmaceutical-grade CBD wellness products. Farm Bill compliant, lab-tested, and formulated for results." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://medispero.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Medi Spero — Pharmaceutical-Grade CBD Wellness Brand" />
        <meta property="og:description" content="Learn about Medi Spero's mission to deliver pharmaceutical-grade CBD wellness products. Farm Bill compliant, lab-tested." />
        <meta property="og:url" content="https://medispero.com/about" />
        <meta property="og:image" content="https://medispero.com/og-homepage.jpg" />
        <meta property="og:site_name" content="Medi Spero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Medi Spero — CBD Wellness Brand" />
        <meta name="twitter:description" content="Pharmaceutical-grade CBD wellness. Farm Bill compliant, lab-tested, formulated for results." />
        <meta name="twitter:image" content="https://medispero.com/og-homepage.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      <Header />
      <BreadcrumbNav items={[{ name: "Home", href: "/" }, { name: "About Us" }]} />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                About Medi Spero — Our Mission in CBD Wellness
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded with a mission to bring pharmaceutical-grade, transparent CBD wellness products 
                to everyone seeking natural alternatives for ADHD, anxiety, sleep, and mood support.
              </p>
            </div>
          </div>
        </section>

        {/* Founding Story */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Founding Story</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Medi Spero — meaning "Medical Hope" — was founded with a clear purpose: to provide 
                  pharmaceutical-grade CBD products that people can trust for real wellness outcomes. 
                  After witnessing the inconsistency and lack of transparency in the CBD market, our 
                  founders set out to create a brand that holds itself to the same standards as 
                  pharmaceutical drug manufacturing.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We recognized that millions of Americans struggling with ADHD, anxiety, depression, 
                  and sleep issues were looking for natural alternatives — but couldn't find products 
                  backed by rigorous testing and clinical-grade formulation. Medi Spero was built to 
                  fill that gap.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we serve over 50,000 customers across the United States with more than 500 
                  products — each one third-party lab tested, Farm Bill compliant, and formulated by 
                  experts in cannabinoid science.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-video">
                <img 
                  src={aboutHeroImage} 
                  alt="Medi Spero pharmaceutical laboratory and research team developing CBD formulations" 
                  className="w-full h-full object-cover"
                  width={640}
                  height={360}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Expertise & Credentials */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Expertise & Credentials</h2>
              <p className="text-muted-foreground">
                Medi Spero's formulations are developed by a team with deep expertise in pharmacology, 
                cannabinoid science, and nutraceutical manufacturing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-2xl border border-border">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <FlaskConical className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pharmacological Formulation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our product formulations are guided by clinical pharmacologists and cannabinoid 
                  researchers who understand how CBD interacts with the endocannabinoid system, 
                  serotonin receptors, and GABA pathways.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Building2 className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">GMP-Certified Manufacturing</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  All Medi Spero products are manufactured in GMP (Good Manufacturing Practice) 
                  certified facilities in the United States, following the same quality control 
                  protocols used in pharmaceutical drug production.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Published Research</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our blog and education content is authored by licensed pharmacists, clinical 
                  pharmacologists, and integrative medicine specialists. Every health claim is 
                  supported by peer-reviewed research citations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing & Quality Control */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Manufacturing Standards & Quality Control</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Supercritical CO₂ Extraction</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We use supercritical carbon dioxide extraction — the gold standard in cannabinoid 
                    extraction — to produce CBD without residual solvents, preserving the full spectrum 
                    of beneficial compounds.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Five-Stage Purification</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Every batch undergoes winterization, decarboxylation, distillation, chromatography, 
                    and crystallization (for isolates) to achieve 99%+ purity in our isolate products 
                    and consistent potency across all product lines.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Full-Panel Third-Party Testing</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Every product batch is tested by ISO-certified independent laboratories for potency, 
                    pesticides, heavy metals (lead, mercury, arsenic, cadmium), microbial contaminants, 
                    residual solvents, and mycotoxins. Results are published as{" "}
                    <Link to="/lab-results" className="text-primary hover:underline font-medium">
                      Certificates of Analysis (COA)
                    </Link>.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Organic, USA-Grown Hemp</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    All hemp is sourced from USDA-certified organic farms in the United States, 
                    grown without pesticides or harmful chemicals. We maintain full seed-to-sale 
                    traceability for every product.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Farm Bill Compliance */}
        <section className="section-padding bg-primary/5">
          <div className="container-wide max-w-4xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">2018 Farm Bill Compliance</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  All Medi Spero products are fully compliant with the Agriculture Improvement Act of 2018 
                  (the "2018 Farm Bill"). This federal law legalized the production and sale of hemp and 
                  hemp-derived products containing less than 0.3% Delta-9 THC by dry weight.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every product batch is independently verified to contain less than 0.3% THC. Our 
                  Certificates of Analysis confirm compliance and are available for every batch on our{" "}
                  <Link to="/lab-results" className="text-primary hover:underline font-medium">
                    Lab Results page
                  </Link>. We work with SC Labs, an ISO 17025-accredited testing laboratory, 
                  to ensure accuracy and reliability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground">
                These principles guide everything we do at Medi Spero.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-muted-foreground">
                  We never compromise on quality. Every product undergoes rigorous testing to ensure purity, potency, and safety.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe you deserve to know what's in your products. Full lab reports are available for every batch.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  From organic farming practices to eco-friendly packaging, we're committed to protecting our planet.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Care</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. Our dedicated team is always here to help with any questions or concerns.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously research and develop new formulations to bring you the most effective CBD products.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We're building a community of wellness advocates who believe in the power of natural alternatives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-brand-navy text-white">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">500+</div>
                <div className="text-white/70">Products</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">50K+</div>
                <div className="text-white/70">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">4.9</div>
                <div className="text-white/70">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">100%</div>
                <div className="text-white/70">Lab Tested</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AboutPage;
