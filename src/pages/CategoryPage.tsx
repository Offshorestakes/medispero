import { useParams, Link } from "react-router-dom";
import { categories as allCategories } from "@/data/categories";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, categories } from "@/data/products";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Condition-specific FAQs for each category
const categoryFAQs: Record<string, { question: string; answer: string }[]> = {
  "anti-anxiety": [
    { question: "Does CBD help with anxiety?", answer: "CBD interacts with the endocannabinoid system and serotonin receptors, which may help regulate mood and reduce anxiety symptoms. Medi Spero offers pharmaceutical-grade CBD isolate products formulated specifically for anxiety relief, all third-party lab tested and Farm Bill compliant." },
    { question: "What CBD dosage is recommended for anxiety?", answer: "For anxiety, most users start with 10–25 mg of CBD daily and gradually increase. Medi Spero CBD isolate products are precisely dosed to make it easy to find your optimal amount. Consult your healthcare provider for personalized guidance." },
    { question: "Is CBD isolate or full-spectrum better for anxiety?", answer: "CBD isolate (99% pure, THC-free) is often preferred for anxiety because it avoids any THC-related effects. Full-spectrum may offer an 'entourage effect' but contains trace THC. Medi Spero offers both options, all lab-tested." },
    { question: "How quickly does CBD work for anxiety relief?", answer: "Sublingual CBD oils take 15–30 minutes for onset. Capsules and edibles take 1–2 hours. Vapes provide the fastest relief within 1–5 minutes. Effects typically last 4–6 hours depending on the delivery method." },
    { question: "Can I take CBD for anxiety alongside prescription medication?", answer: "CBD may interact with certain medications via the CYP450 enzyme pathway. Always consult your healthcare provider before combining CBD with prescription anxiety medications, SSRIs, or benzodiazepines." },
  ],
  "sleep-wellness": [
    { question: "Can CBD improve sleep quality?", answer: "Research suggests CBD may support better sleep by reducing anxiety and promoting relaxation. Medi Spero's sleep formulas combine CBD with CBN (cannabinol), a cannabinoid specifically studied for its sedative properties." },
    { question: "What's the difference between CBD and melatonin for sleep?", answer: "Melatonin is a hormone that signals your body it's time to sleep. CBD works differently — it interacts with the endocannabinoid system to reduce anxiety and promote calm, which may indirectly improve sleep onset and quality. Some users combine both." },
    { question: "When should I take CBD for sleep?", answer: "Take CBD sleep formulas 30–60 minutes before bedtime for optimal results. Consistency is key — using CBD as part of a regular bedtime routine produces better results over time." },
    { question: "Will CBD make me drowsy during the day?", answer: "At typical daytime doses, CBD is generally non-sedating. Medi Spero's sleep-specific formulas contain higher CBD concentrations plus CBN, designed specifically for nighttime use. Daytime CBD products are formulated to support calm without drowsiness." },
    { question: "Is CBN safe for long-term sleep support?", answer: "CBN (cannabinol) is a naturally occurring cannabinoid derived from hemp. It is non-habit-forming and generally well-tolerated. All Medi Spero CBN products are third-party lab tested for purity and safety." },
  ],
  "adhd-focus": [
    { question: "How does CBD affect ADHD symptoms?", answer: "CBD may support focus and attention by interacting with dopamine and serotonin receptors in the brain. While clinical research is ongoing, many users report improved concentration and reduced hyperactivity with consistent CBD use. Medi Spero's ADHD & Focus line is formulated for cognitive clarity." },
    { question: "Is Delta-8 safe for focus support?", answer: "Delta-8 THC is a hemp-derived cannabinoid that produces milder psychoactive effects than Delta-9 THC. Some users report improved focus at low doses. All Medi Spero Delta-8 products contain less than 0.3% Delta-9 THC and are Farm Bill compliant." },
    { question: "What cannabinoid is best for ADHD focus?", answer: "CBD isolate and broad-spectrum CBD are popular choices for ADHD focus support because they provide cannabinoid benefits without THC-related impairment. Medi Spero offers 99% pure CBD isolate and targeted focus formulas." },
    { question: "Can children use CBD for ADHD?", answer: "Medi Spero products are designed for adults 21 and older. For pediatric use of CBD, consult with your child's healthcare provider. The FDA has approved one CBD-based medication (Epidiolex) for certain pediatric conditions." },
    { question: "How long does it take for CBD to help with focus?", answer: "Some users notice improved focus within 30–60 minutes of taking sublingual CBD oil. However, consistent daily use over 2–4 weeks typically produces the most reliable results for ADHD symptom management." },
  ],
  "mood-support": [
    { question: "Can CBD help with depression symptoms?", answer: "CBD interacts with serotonin receptors (5-HT1A), which play a key role in mood regulation. While CBD is not a replacement for prescription antidepressants, some users report improved mood and emotional balance with consistent use. Medi Spero's mood support line includes CBD and hemp-derived Delta-9 products." },
    { question: "Is Delta-9 THC effective for mood elevation?", answer: "Hemp-derived Delta-9 THC at low doses (5–10 mg) may promote feelings of well-being and positive mood. All Medi Spero Delta-9 products contain less than 0.3% THC by dry weight, making them Farm Bill compliant." },
    { question: "What's the difference between CBD and THC for mood?", answer: "CBD primarily works on serotonin and endocannabinoid receptors for calm and balance. THC activates CB1 receptors, which can produce mood elevation and relaxation. Medi Spero offers both CBD-only and combined CBD+THC formulas." },
    { question: "Can I take CBD for mood alongside antidepressants?", answer: "CBD may interact with SSRIs, SNRIs, and other antidepressants via the CYP450 enzyme pathway. Always consult your healthcare provider before combining CBD or THC products with prescription mood medications." },
    { question: "How much CBD should I take for mood support?", answer: "Start with 20–40 mg of CBD daily and adjust based on response. For products containing Delta-9 THC, begin with 2.5–5 mg THC and increase gradually. Medi Spero products are precisely dosed for easy titration." },
  ],
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(c => c.slug === slug);
  const products = slug ? getProductsByCategory(slug) : [];
  const faqs = slug ? categoryFAQs[slug] || [] : [];

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <Link to="/products" className="text-primary hover:underline">
              View All Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  // Category-specific OG images
  const categoryOgImages: Record<string, string> = {
    "anti-anxiety": "https://medispero.com/og-anti-anxiety.jpg",
    "sleep-wellness": "https://medispero.com/og-sleep-wellness.jpg",
    "adhd-focus": "https://medispero.com/og-adhd-focus.jpg",
    "mood-support": "https://medispero.com/og-mood-support.jpg",
  };
  const ogImage = (slug && categoryOgImages[slug]) || "https://medispero.com/og-products.jpg";

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{category.name} | Lab-Tested CBD & Hemp Products | Medi Spero</title>
        <meta name="description" content={`Shop ${category.name} from Medi Spero. ${category.description} Lab-tested, pharmaceutical-grade. Free shipping on orders over $250.`} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={`https://medispero.com/category/${slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${category.name} | Medi Spero`} />
        <meta property="og:description" content={`Shop ${category.name} from Medi Spero. Lab-tested, pharmaceutical-grade. Free shipping $250+.`} />
        <meta property="og:url" content={`https://medispero.com/category/${slug}`} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Medi Spero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category.name} | Medi Spero`} />
        <meta name="twitter:description" content={`Shop ${category.name}. Lab-tested, pharmaceutical-grade CBD products.`} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${category.name} — Lab-Tested CBD Products`,
            description: category.description,
            url: `https://medispero.com/category/${slug}`,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: products.length,
              itemListElement: products.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://medispero.com/product/${p.slug}`,
                name: p.name,
                image: p.images?.[0],
              })),
            },
          })}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>
      <Header />
      <BreadcrumbNav items={[
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: category.name },
      ]} />
      <main id="main-content" className="flex-1">

        {/* Category Header */}
        <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container-wide text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name} — Lab-Tested CBD Products</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
            <p className="text-sm text-secondary font-medium mt-4">
              {products.length} Products
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Category FAQ Section */}
        {faqs.length > 0 && (
          <section className="py-12 bg-card">
            <div className="container-wide max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions About {category.name}</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border border-border rounded-lg px-6 bg-background"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* Related Categories — Internal Linking */}
        <section className="py-12 bg-muted/30">
          <div className="container-wide">
            <h2 className="text-2xl font-bold mb-6">Explore Related Categories</h2>
            <div className="flex flex-wrap gap-3">
              {allCategories
                .filter(c => c.slug !== slug)
                .slice(0, 5)
                .map(c => (
                  <Link
                    key={c.id}
                    to={`/category/${c.slug}`}
                    className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>
                Looking for something specific? Browse our{" "}
                <Link to="/products" className="text-primary hover:underline font-medium">complete CBD product catalog</Link>
                {" "}or learn more about{" "}
                <Link to="/education" className="text-primary hover:underline font-medium">how CBD works</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CategoryPage;
