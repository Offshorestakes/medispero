import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Award, Users, Leaf, Heart, Shield, Target } from "lucide-react";
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
                About Medi Spero
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded with a mission to bring premium, transparent CBD wellness products to everyone. 
                We believe in the power of nature to support health and wellbeing.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  At Medi Spero, our name means "Medical Hope" – and that's exactly what we aim to provide. 
                  We're dedicated to delivering the highest quality CBD products that help people live 
                  healthier, more balanced lives.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Every product we create is backed by science, tested by third-party laboratories, 
                  and made with care in the United States. We source our hemp from organic farms 
                  that share our commitment to purity and sustainability.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe transparency is key. That's why we make our lab results available for 
                  every batch, so you know exactly what you're putting in your body.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-video">
                <img 
                  src={aboutHeroImage} 
                  alt="Medi Spero pharmaceutical laboratory and research team" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
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
