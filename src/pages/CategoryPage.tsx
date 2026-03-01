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
  "cbd-oils": [
    { question: "How does CBD oil work?", answer: "CBD oil is absorbed sublingually (under the tongue) into the bloodstream, where it interacts with CB1 and CB2 receptors in the endocannabinoid system. This helps regulate pain, mood, sleep, and immune response. Medi Spero CBD oils are pharmaceutical-grade and third-party lab tested." },
    { question: "What are the benefits of full-spectrum vs broad-spectrum CBD oil?", answer: "Full-spectrum CBD oil contains all cannabinoids including trace THC (<0.3%) for an 'entourage effect.' Broad-spectrum removes THC while retaining other cannabinoids. Both are effective — choose based on whether you want to avoid THC entirely." },
    { question: "How much CBD oil should I take daily?", answer: "Start with 10–25 mg per day and increase gradually. Most Medi Spero oils include a graduated dropper for precise dosing. Factors like body weight, metabolism, and desired effects influence optimal dosage." },
    { question: "What should I look for when choosing a CBD oil provider?", answer: "Look for third-party lab testing (COAs), organic USA-grown hemp, CO₂ extraction, and clearly labeled potency. Medi Spero meets all these criteria with pharmaceutical-grade manufacturing standards." },
    { question: "How should I store CBD oil?", answer: "Store CBD oil in a cool, dark place away from direct sunlight. Refrigeration can extend shelf life. Medi Spero CBD oils have a shelf life of 12–24 months when stored properly." },
  ],
  "pharma-capsules": [
    { question: "How do pharmaceutical CBD capsules work?", answer: "Pharmaceutical CBD capsules deliver a precise, pre-measured dose of cannabidiol through the digestive system. They are formulated with bioavailability-enhancing carriers for consistent absorption. Medi Spero capsules are manufactured in GMP-certified facilities." },
    { question: "What are the benefits of CBD capsules over oils?", answer: "Capsules offer exact dosing without measuring, no hemp taste, longer shelf life, and discreet consumption. They are ideal for users who want a consistent daily CBD regimen without the hassle of droppers." },
    { question: "Are pharmaceutical-grade capsules stronger than regular CBD?", answer: "Pharmaceutical-grade refers to manufacturing standards, not potency. It means stricter purity testing, GMP-certified production, and verified potency. Medi Spero capsules range from 25 mg to 100 mg CBD per capsule." },
    { question: "How long do CBD capsules take to work?", answer: "CBD capsules typically take 45–90 minutes to take effect as they pass through the digestive system. Effects last 6–8 hours, making them ideal for sustained, all-day relief." },
    { question: "What should I look for when choosing CBD capsules?", answer: "Look for verified potency via COAs, GMP-certified manufacturing, clear ingredient lists, and appropriate CBD concentration for your needs. Medi Spero provides all batch-level lab results." },
  ],
  "cbd-vape": [
    { question: "How does CBD vaping work?", answer: "CBD vape products heat cannabidiol extract into an inhalable vapor. This delivers CBD directly to the lungs for rapid absorption into the bloodstream, providing the fastest onset of any delivery method — typically within 1–5 minutes." },
    { question: "Is vaping CBD safe?", answer: "Medi Spero CBD vape products use pharmaceutical-grade distillate without vitamin E acetate, PG, VG, or artificial additives. All vape products are third-party lab tested for purity and safety. However, long-term vaping research is still evolving." },
    { question: "How much CBD should I vape?", answer: "Start with 1–2 puffs and wait 10 minutes to assess effects. Each Medi Spero vape puff delivers approximately 2–5 mg of CBD depending on the product. Increase gradually until you find your optimal dose." },
    { question: "What's the difference between CBD vape cartridges, disposables, and pods?", answer: "Cartridges attach to a 510-thread battery (sold separately). Disposables are all-in-one devices — use and discard. Pods work with specific pod systems. Medi Spero offers all three formats in 500 mg and 1000 mg options." },
    { question: "What should I look for when choosing a CBD vape provider?", answer: "Look for third-party lab testing, no cutting agents (vitamin E acetate, PG, VG), transparent ingredient lists, and pharmaceutical-grade extraction. Medi Spero publishes COAs for every vape product batch." },
  ],
  "cbd-isolate-powder": [
    { question: "How does CBD isolate powder work?", answer: "CBD isolate powder is 99%+ pure cannabidiol in crystalline form. It dissolves in oils or can be taken sublingually. Because it contains zero THC, it provides CBD benefits without any psychoactive effects. Medi Spero's isolate is pharmaceutical-grade and lab-verified." },
    { question: "What are the benefits of CBD isolate powder?", answer: "CBD isolate powder offers precise dosing, zero THC, no hemp taste, and versatility — mix it into foods, beverages, skincare, or take it sublingually. It's ideal for custom formulations and users subject to drug testing." },
    { question: "How do I use CBD isolate powder?", answer: "Place it under your tongue for 60 seconds, mix into a carrier oil, add to smoothies, or use in DIY topicals. Medi Spero offers sizes from 1g to 1kg for personal use or bulk formulation." },
    { question: "What should I look for when choosing CBD isolate?", answer: "Look for 99%+ purity verified by third-party COAs, THC-free certification, organic hemp source, and CO₂ extraction. Medi Spero's isolate meets all pharmaceutical-grade standards." },
    { question: "Is CBD isolate powder better than full-spectrum for anxiety?", answer: "CBD isolate is THC-free, which some users prefer for anxiety since THC can occasionally increase anxiety at higher doses. Full-spectrum offers the entourage effect. Both are effective — personal preference determines the best choice." },
  ],
  "cbd-isolate-crystals": [
    { question: "What are CBD isolate crystals?", answer: "CBD isolate crystals are 99%+ pure CBD in crystalline form, extracted from premium USA-grown hemp. They are THC-free and can be used sublingually, dabbed, or dissolved into carrier oils. Medi Spero crystals are pharmaceutical-grade and batch-tested." },
    { question: "How do CBD crystals differ from CBD powder?", answer: "Both are 99%+ pure CBD isolate. Crystals have a coarser, rock-like texture ideal for dabbing or precise weighing. Powder is finer and dissolves more easily in liquids. The CBD content and purity are identical." },
    { question: "Can I dab CBD crystals?", answer: "Yes. CBD isolate crystals can be vaporized using a dab rig or wax pen at 350–400°F for fast-acting effects. This delivers CBD directly to the lungs for rapid absorption within 1–5 minutes." },
    { question: "What sizes of CBD isolate crystals does Medi Spero offer?", answer: "Medi Spero offers CBD isolate crystals in 1g, 5g, 10g, 25g, 50g, 100g, 250g, 500g, and 1kg sizes. Bulk options are available for wholesale buyers and formulators." },
    { question: "Are CBD isolate crystals legal?", answer: "Yes. CBD isolate crystals derived from hemp containing less than 0.3% Delta-9 THC are legal under the 2018 Farm Bill. Medi Spero crystals are certified THC-free by independent lab testing." },
  ],
  "cbd-isolate-pure-spectrum": [
    { question: "What is Pure Spectrum CBD isolate?", answer: "Pure Spectrum CBD isolate combines 99% pure CBD with targeted minor cannabinoid blends (CBG, CBN, CBC) for enhanced therapeutic benefits. It offers the purity of isolate with some entourage effect benefits. All Medi Spero Pure Spectrum products are THC-free and lab-tested." },
    { question: "How does Pure Spectrum differ from regular CBD isolate?", answer: "Regular CBD isolate is pure CBD only. Pure Spectrum adds precision-blended minor cannabinoids for targeted effects — like CBN for sleep or CBG for focus — while remaining THC-free." },
    { question: "What are the benefits of Pure Spectrum for wellness?", answer: "Pure Spectrum products offer targeted cannabinoid support: CBN for sleep, CBG for inflammation and focus, CBC for mood. This allows users to customize their cannabinoid intake for specific wellness goals." },
    { question: "Is Pure Spectrum THC-free?", answer: "Yes. All Medi Spero Pure Spectrum products contain zero THC, verified by third-party lab testing. They are safe for users who need to avoid THC due to drug testing or personal preference." },
    { question: "What sizes are available for Pure Spectrum isolate?", answer: "Medi Spero offers Pure Spectrum isolate in 1g, 5g, 10g, 25g, 50g, 100g, 250g, 500g, and 1kg sizes. Bulk and wholesale pricing is available for larger quantities." },
  ],
  "cbd-capsules": [
    { question: "How do CBD capsules work?", answer: "CBD capsules deliver cannabidiol through the digestive system for slow, sustained absorption. Each capsule contains a pre-measured dose for consistent daily use. Medi Spero CBD capsules are made with pharmaceutical-grade CBD and bioavailability-enhancing carriers." },
    { question: "What's the difference between CBD capsules and softgels?", answer: "Capsules use a hard shell (vegetarian or gelatin), while softgels use a soft gelatin shell with liquid CBD inside. Softgels may absorb slightly faster. Medi Spero offers both formats." },
    { question: "How many CBD capsules should I take per day?", answer: "Start with one capsule daily and adjust based on your response. Most Medi Spero capsules contain 25–50 mg CBD each. Consult your healthcare provider for personalized dosing recommendations." },
    { question: "Can I take CBD capsules with food?", answer: "Yes. Taking CBD capsules with a meal containing healthy fats can improve absorption by up to 5x compared to taking them on an empty stomach." },
    { question: "Are Medi Spero CBD capsules vegan?", answer: "Medi Spero offers both gelatin and vegetarian capsule options. Check individual product pages for specific dietary information. All capsules are gluten-free." },
  ],
  "cbd-skincare": [
    { question: "How does CBD skincare work?", answer: "CBD topicals interact with cannabinoid receptors in the skin (CB2 receptors) to help reduce inflammation, redness, and discomfort. CBD also has antioxidant properties that may support skin health and anti-aging." },
    { question: "What skin conditions can CBD help with?", answer: "CBD skincare may help with dryness, inflammation, acne, eczema, and psoriasis symptoms. It is also used for muscle and joint soreness when applied topically. All Medi Spero skincare products are lab-tested." },
    { question: "Will CBD cream make me feel high?", answer: "No. Topical CBD does not enter the bloodstream in significant amounts. It works locally on the skin and underlying tissue. Medi Spero skincare products contain less than 0.3% THC." },
    { question: "How often should I apply CBD skincare?", answer: "Apply CBD cream or balm 2–3 times daily to affected areas. For best results, use consistently as part of your daily skincare routine." },
    { question: "What should I look for in CBD skincare products?", answer: "Look for third-party lab testing, natural ingredients, appropriate CBD concentration, and no artificial fragrances or parabens. Medi Spero skincare uses pharmaceutical-grade CBD with organic botanical ingredients." },
  ],
  "bundles": [
    { question: "What are CBD wellness bundles?", answer: "CBD wellness bundles are curated product combinations designed for specific wellness goals — such as anxiety relief, better sleep, or ADHD focus support. Medi Spero bundles offer savings of 15–25% compared to buying products individually." },
    { question: "What bundles does Medi Spero offer?", answer: "Medi Spero offers bundles for anxiety relief, sleep wellness, ADHD focus, mood support, daily wellness, and starter kits. Each bundle includes 2–4 complementary products selected by our wellness team." },
    { question: "Are bundles a good way to try CBD for the first time?", answer: "Yes. Starter bundles provide a variety of CBD product types (oil, capsules, topical) at a discounted price, letting you discover which delivery method works best for your needs." },
    { question: "Can I customize a CBD bundle?", answer: "Currently, Medi Spero offers pre-curated bundles. For custom orders or wholesale bundles, contact our team at info@medispero.com." },
    { question: "Do bundles include lab results?", answer: "Yes. Every product in a Medi Spero bundle is individually third-party lab tested. Certificates of Analysis (COAs) are available for each product on our Lab Results page." },
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
