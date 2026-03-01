export interface PageSEO {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  canonical: string;
  ogImage: string;
}

const BASE_URL = "https://medispero.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;

export const seoConfig: Record<string, PageSEO> = {

  // ── MAIN PAGES ─────────────────────────────────────────

  "/": {
    title: "Medi Spero | Pharmaceutical-Grade CBD & Hemp Wellness",
    description: "Pharmaceutical-grade CBD oils, Delta-8, Delta-9 & hemp wellness products. Lab-tested, Farm Bill compliant. Free shipping over $250.",
    ogTitle: "Medi Spero — Premium Pharmaceutical-Grade CBD Wellness",
    ogDescription: "Lab-tested CBD oils, Delta-8, Delta-9 & hemp products. Farm Bill compliant. Free discreet shipping on orders over $250.",
    canonical: `${BASE_URL}/`,
    ogImage: `${BASE_URL}/og-home.jpg`,
  },

  "/products": {
    title: "All CBD Products | Medi Spero",
    description: "Browse 280+ pharmaceutical-grade CBD products — oils, isolate, capsules, vapes & bundles. Third-party lab tested. 30-day guarantee.",
    ogTitle: "Shop All CBD Products — Medi Spero",
    ogDescription: "280+ lab-tested CBD products including oils, isolate powder, capsules, vapes and wellness bundles. Pharmaceutical-grade quality.",
    canonical: `${BASE_URL}/products`,
    ogImage: `${BASE_URL}/og-products.jpg`,
  },

  "/about": {
    title: "About Medi Spero | Premium CBD Wellness Brand",
    description: "Learn about Medi Spero's mission to deliver pharmaceutical-grade, lab-tested CBD and hemp wellness products for anxiety, sleep, ADHD & mood.",
    ogTitle: "About Medi Spero — Our CBD Wellness Mission",
    ogDescription: "Medi Spero delivers pharmaceutical-grade, third-party lab-tested CBD products formulated for anxiety, sleep, ADHD, and mood support.",
    canonical: `${BASE_URL}/about`,
    ogImage: `${BASE_URL}/og-about.jpg`,
  },

  "/contact": {
    title: "Contact Medi Spero | CBD Wellness Support",
    description: "Get in touch with Medi Spero. Email, WhatsApp or online form. Expert CBD wellness support — questions on products, orders & lab results.",
    ogTitle: "Contact Medi Spero — CBD Wellness Support Team",
    ogDescription: "Reach Medi Spero by email or WhatsApp for product questions, order help, and CBD wellness support.",
    canonical: `${BASE_URL}/contact`,
    ogImage: `${BASE_URL}/og-contact.jpg`,
  },

  "/blog": {
    title: "CBD Wellness Blog | Medi Spero",
    description: "Expert guides on pharmaceutical-grade CBD, Delta-8, Delta-9, hemp wellness, anxiety, sleep, ADHD, and mood support from Medi Spero.",
    ogTitle: "Medi Spero CBD Wellness Blog — Expert Guides & Research",
    ogDescription: "Educational guides on CBD, Delta-8, Delta-9, anxiety, sleep, ADHD and mood support. Science-backed hemp wellness content.",
    canonical: `${BASE_URL}/blog`,
    ogImage: `${BASE_URL}/og-blog.jpg`,
  },

  "/faq": {
    title: "CBD FAQ | Common Questions | Medi Spero",
    description: "Answers to common CBD questions — dosing, legality, lab testing, Farm Bill compliance, ADHD, anxiety, sleep & shipping. Medi Spero FAQ.",
    ogTitle: "CBD Frequently Asked Questions — Medi Spero",
    ogDescription: "Get clear answers on CBD dosing, legality, lab testing, Farm Bill compliance, and what makes pharmaceutical-grade CBD different.",
    canonical: `${BASE_URL}/faq`,
    ogImage: `${BASE_URL}/og-faq.jpg`,
  },

  "/lab-results": {
    title: "CBD Lab Results & COAs | Medi Spero",
    description: "View third-party Certificate of Analysis (COA) lab results for every Medi Spero CBD batch. Verified potency, purity & safety testing.",
    ogTitle: "Third-Party CBD Lab Results & Certificates of Analysis — Medi Spero",
    ogDescription: "Every Medi Spero product batch is independently lab-tested. View COAs confirming potency, purity, pesticide-free and heavy-metal-free results.",
    canonical: `${BASE_URL}/lab-results`,
    ogImage: `${BASE_URL}/og-lab-results.jpg`,
  },

  "/education": {
    title: "CBD Education Center | Medi Spero",
    description: "Learn how CBD, Delta-8, Delta-9 & hemp cannabinoids work. Educational guides on pharmaceutical-grade CBD for anxiety, sleep, ADHD & more.",
    ogTitle: "CBD Education Center — How Cannabinoids Work | Medi Spero",
    ogDescription: "Science-based education on CBD, Delta-8, Delta-9 THC, and CBN. Learn how cannabinoids support anxiety, ADHD, sleep, and mood.",
    canonical: `${BASE_URL}/education`,
    ogImage: `${BASE_URL}/og-education.jpg`,
  },

  "/testimonials": {
    title: "CBD Customer Reviews | Medi Spero",
    description: "Read verified customer reviews of Medi Spero pharmaceutical-grade CBD products. Real results for anxiety, ADHD, sleep & mood support.",
    ogTitle: "What Customers Say About Medi Spero CBD Products",
    ogDescription: "Verified reviews from real Medi Spero customers. See how pharmaceutical-grade CBD has supported anxiety relief, better sleep, ADHD focus, and mood.",
    canonical: `${BASE_URL}/testimonials`,
    ogImage: `${BASE_URL}/og-testimonials.jpg`,
  },

  // ── CATEGORY PAGES ────────────────────────────────────

  "/category/cbd-oils": {
    title: "CBD Oils & Tinctures | Medi Spero",
    description: "Shop 65 pharmaceutical-grade CBD oils and tinctures. Full-spectrum and broad-spectrum formulas for daily wellness. Third-party lab tested.",
    ogTitle: "Pharmaceutical-Grade CBD Oils & Tinctures — Medi Spero",
    ogDescription: "65 lab-tested CBD oils and tinctures. Full-spectrum and broad-spectrum formulas for daily wellness. Farm Bill compliant.",
    canonical: `${BASE_URL}/category/cbd-oils`,
    ogImage: `${BASE_URL}/og-cbd-oils.jpg`,
  },

  "/category/cbd-capsules": {
    title: "CBD Capsules | Medi Spero",
    description: "Precision-dosed CBD capsules for daily wellness support. Pharmaceutical-grade, third-party lab tested, Farm Bill compliant. Shop Medi Spero.",
    ogTitle: "Pharmaceutical-Grade CBD Capsules — Medi Spero",
    ogDescription: "Precision-dosed CBD capsules for consistent daily wellness. Lab-tested, pharmaceutical-grade, and 2018 Farm Bill compliant.",
    canonical: `${BASE_URL}/category/cbd-capsules`,
    ogImage: `${BASE_URL}/og-cbd-capsules.jpg`,
  },

  "/category/cbd-isolate-powder": {
    title: "99% Pure CBD Isolate Powder | Medi Spero",
    description: "Shop 99% pure CBD isolate powder — THC-free, lab-tested, pharmaceutical-grade. Perfect for custom formulations and precise dosing.",
    ogTitle: "99% Pure CBD Isolate Powder — THC-Free | Medi Spero",
    ogDescription: "Pharmaceutical-grade 99% pure CBD isolate powder. THC-free, third-party lab tested. Ideal for custom wellness formulations and precise dosing.",
    canonical: `${BASE_URL}/category/cbd-isolate-powder`,
    ogImage: `${BASE_URL}/og-cbd-isolate.jpg`,
  },

  "/category/cbd-vape": {
    title: "CBD Vape Products | Medi Spero",
    description: "Shop premium CBD vape cartridges, disposable pens & pods. Full-spectrum pharmaceutical-grade formulations. Third-party lab tested.",
    ogTitle: "Premium CBD Vape Cartridges & Pens — Medi Spero",
    ogDescription: "Lab-tested CBD vape cartridges, disposable pens and pods. Full-spectrum pharmaceutical-grade formulations. Farm Bill compliant.",
    canonical: `${BASE_URL}/category/cbd-vape`,
    ogImage: `${BASE_URL}/og-cbd-vape.jpg`,
  },

  "/category/anti-anxiety": {
    title: "CBD for Anxiety Relief | Medi Spero",
    description: "Shop 45 pharmaceutical-grade CBD products for anxiety relief. Lab-tested CBD isolate, tinctures & capsules formulated to support calm.",
    ogTitle: "CBD for Anxiety Relief — Pharmaceutical-Grade | Medi Spero",
    ogDescription: "45 lab-tested CBD products formulated to support anxiety relief and calm. CBD isolate, tinctures, and capsules. Farm Bill compliant.",
    canonical: `${BASE_URL}/category/anti-anxiety`,
    ogImage: `${BASE_URL}/og-anti-anxiety.jpg`,
  },

  "/category/mood-support": {
    title: "CBD for Mood & Depression Support | Medi Spero",
    description: "Hemp-derived Delta-9 and CBD products for mood and depression support. Pharmaceutical-grade, lab-tested, Farm Bill compliant.",
    ogTitle: "CBD for Mood & Depression Support — Medi Spero",
    ogDescription: "Hemp-derived Delta-9 THC and CBD formulas for positive mood and emotional balance. Pharmaceutical-grade, lab-tested. Farm Bill compliant.",
    canonical: `${BASE_URL}/category/mood-support`,
    ogImage: `${BASE_URL}/og-mood-support.jpg`,
  },

  "/category/pharma-capsules": {
    title: "Pharmaceutical CBD Capsules | Medi Spero",
    description: "Medical-grade pharmaceutical CBD & THC capsules, precision-dosed for therapeutic wellness. Third-party lab tested, 2018 Farm Bill compliant.",
    ogTitle: "Medical-Grade Pharmaceutical CBD Capsules — Medi Spero",
    ogDescription: "Precision-dosed medical-grade CBD and THC capsules for therapeutic wellness. Third-party lab tested, fully Farm Bill compliant.",
    canonical: `${BASE_URL}/category/pharma-capsules`,
    ogImage: `${BASE_URL}/og-pharma-capsules.jpg`,
  },

  "/category/adhd-focus": {
    title: "CBD for ADHD & Focus Support | Medi Spero",
    description: "Shop 40 CBD products for ADHD and focus support. Hemp-derived cannabinoid formulas designed to support concentration and cognitive clarity.",
    ogTitle: "CBD for ADHD & Focus Support — Medi Spero",
    ogDescription: "40 hemp-derived CBD products designed to support concentration, focus, and cognitive clarity for ADHD. Lab-tested, Farm Bill compliant.",
    canonical: `${BASE_URL}/category/adhd-focus`,
    ogImage: `${BASE_URL}/og-adhd-focus.jpg`,
  },

  "/category/sleep-wellness": {
    title: "CBD for Sleep & Wellness | Medi Spero",
    description: "CBD and CBN sleep formulas for deep, restorative rest. Pharmaceutical-grade sleep wellness products. Third-party lab tested by Medi Spero.",
    ogTitle: "CBD for Sleep & Deep Rest — Pharmaceutical-Grade | Medi Spero",
    ogDescription: "CBD and CBN sleep formulas for deep, restorative rest. Pharmaceutical-grade, third-party lab tested. Support healthy sleep with Medi Spero.",
    canonical: `${BASE_URL}/category/sleep-wellness`,
    ogImage: `${BASE_URL}/og-sleep-wellness.jpg`,
  },

  "/category/bundles": {
    title: "CBD Wellness Bundles | Medi Spero",
    description: "Shop Medi Spero curated CBD wellness bundles. Premium pharmaceutical-grade products for anxiety, sleep, ADHD & mood — bundled & lab-tested.",
    ogTitle: "Curated CBD Wellness Bundles — Medi Spero",
    ogDescription: "Save with Medi Spero's curated CBD wellness bundles. Pharmaceutical-grade products for anxiety, sleep, ADHD, and mood. All lab-tested.",
    canonical: `${BASE_URL}/category/bundles`,
    ogImage: `${BASE_URL}/og-bundles.jpg`,
  },

  // ── BLOG POSTS ────────────────────────────────────────

  "/blog/cbd-for-anxiety-complete-guide": {
    title: "CBD for Anxiety: A Complete Guide | Medi Spero",
    description: "Discover how pharmaceutical-grade CBD may support anxiety relief. Dosing tips, product types, and what the science says — by Medi Spero.",
    ogTitle: "CBD for Anxiety: A Complete Guide to Natural Relief",
    ogDescription: "How pharmaceutical-grade CBD may support anxiety. Learn about dosing, product types, CBD vs Delta-8, and what the current science shows.",
    canonical: `${BASE_URL}/blog/cbd-for-anxiety-complete-guide`,
    ogImage: `${BASE_URL}/og-blog-cbd-anxiety.jpg`,
  },

  "/blog/delta-8-thc-anxiety-relief": {
    title: "Delta-8 THC for Anxiety Relief | Medi Spero",
    description: "Can Delta-8 THC help with anxiety? Explore the science, dosing, and how hemp-derived Delta-8 differs from Delta-9 THC for anxiety relief.",
    ogTitle: "Delta-8 THC for Anxiety Relief — What the Science Says",
    ogDescription: "Does Delta-8 THC relieve anxiety? Compare Delta-8 vs Delta-9 effects, explore dosing guidance, and learn which products suit you best.",
    canonical: `${BASE_URL}/blog/delta-8-thc-anxiety-relief`,
    ogImage: `${BASE_URL}/og-blog-delta8-anxiety.jpg`,
  },

  "/blog/hemp-derived-delta-9-mood-support": {
    title: "Hemp Delta-9 THC for Mood Support | Medi Spero",
    description: "Learn how hemp-derived Delta-9 THC may support mood balance and emotional wellness. Farm Bill compliant. Dosing guide by Medi Spero.",
    ogTitle: "Hemp-Derived Delta-9 THC for Mood Support — Complete Guide",
    ogDescription: "How hemp-derived Delta-9 THC may support positive mood and emotional balance. Farm Bill compliant product guide and dosing recommendations.",
    canonical: `${BASE_URL}/blog/hemp-derived-delta-9-mood-support`,
    ogImage: `${BASE_URL}/og-blog-delta9-mood.jpg`,
  },

  "/blog/pharmaceutical-grade-cbd-explained": {
    title: "What Is Pharmaceutical-Grade CBD? | Medi Spero",
    description: "Pharmaceutical-grade CBD means rigorous purity, potency, and lab testing standards. Learn what it means and why it matters for your wellness.",
    ogTitle: "What Is Pharmaceutical-Grade CBD? Why It Matters for You",
    ogDescription: "Pharmaceutical-grade CBD meets stricter purity and potency standards than standard CBD. Learn the difference and why it matters for your health.",
    canonical: `${BASE_URL}/blog/pharmaceutical-grade-cbd-explained`,
    ogImage: `${BASE_URL}/og-blog-pharma-cbd.jpg`,
  },

  "/blog/cbd-thc-for-sleep-disorders": {
    title: "CBD & THC for Sleep Disorders | Medi Spero",
    description: "Can CBD and THC improve sleep? Explore evidence-based dosing, product types, and how cannabinoids support deep, restorative sleep.",
    ogTitle: "CBD & THC for Sleep Disorders — Evidence-Based Guide",
    ogDescription: "How CBD and THC may support better sleep. Evidence-based guide covering cannabinoid types, dosing strategies, and product recommendations.",
    canonical: `${BASE_URL}/blog/cbd-thc-for-sleep-disorders`,
    ogImage: `${BASE_URL}/og-blog-cbd-sleep.jpg`,
  },

  "/blog/understanding-cannabinoids-mental-health": {
    title: "Cannabinoids & Mental Health | Medi Spero",
    description: "How do CBD, THC, and CBN affect mental health? A complete guide to cannabinoids for anxiety, depression, ADHD, mood, and sleep support.",
    ogTitle: "Cannabinoids & Mental Health — CBD, THC, and CBN Explained",
    ogDescription: "A complete guide to how CBD, Delta-8, Delta-9 THC, and CBN interact with mental health — covering anxiety, depression, ADHD, mood, and sleep.",
    canonical: `${BASE_URL}/blog/understanding-cannabinoids-mental-health`,
    ogImage: `${BASE_URL}/og-blog-cannabinoids-mental-health.jpg`,
  },

  // ── POLICY & UTILITY PAGES ────────────────────────────

  "/shipping": {
    title: "Shipping Policy | Medi Spero CBD",
    description: "Medi Spero ships CBD products to all 50 US states. Free discreet shipping on orders over $250. Standard delivery 5–7 business days.",
    ogTitle: "Medi Spero Shipping Policy — Free USA CBD Delivery",
    ogDescription: "Ships to all 50 US states. Free discreet shipping on CBD orders over $250. Standard delivery in 5–7 business days.",
    canonical: `${BASE_URL}/shipping`,
    ogImage: DEFAULT_OG_IMAGE,
  },

  "/returns": {
    title: "Returns & Refund Policy | Medi Spero",
    description: "Medi Spero offers a 30-day satisfaction guarantee. Return any unused CBD product within 30 days for a full refund. Learn how.",
    ogTitle: "Medi Spero 30-Day CBD Return & Refund Policy",
    ogDescription: "Not satisfied? Return any unused Medi Spero CBD product within 30 days for a full refund. No questions asked.",
    canonical: `${BASE_URL}/returns`,
    ogImage: DEFAULT_OG_IMAGE,
  },

  "/privacy": {
    title: "Privacy Policy | Medi Spero",
    description: "Read Medi Spero's privacy policy. Learn how we collect, use, and protect your personal information when you shop for CBD products.",
    ogTitle: "Medi Spero Privacy Policy",
    ogDescription: "How Medi Spero collects, uses, and protects your personal data when you shop for CBD wellness products online.",
    canonical: `${BASE_URL}/privacy`,
    ogImage: DEFAULT_OG_IMAGE,
  },

  "/terms": {
    title: "Terms of Service | Medi Spero",
    description: "Review Medi Spero's terms of service for purchasing pharmaceutical-grade CBD and hemp wellness products. Age verification and use requirements.",
    ogTitle: "Medi Spero Terms of Service",
    ogDescription: "Terms governing the purchase and use of Medi Spero pharmaceutical-grade CBD products. Includes age verification and compliance requirements.",
    canonical: `${BASE_URL}/terms`,
    ogImage: DEFAULT_OG_IMAGE,
  },

  "/accessibility": {
    title: "Accessibility Statement | Medi Spero",
    description: "Medi Spero is committed to digital accessibility for all users. Read our accessibility statement and learn how to request assistance.",
    ogTitle: "Medi Spero Accessibility Statement",
    ogDescription: "Our commitment to making Medi Spero's CBD wellness website accessible to all users, including those using assistive technologies.",
    canonical: `${BASE_URL}/accessibility`,
    ogImage: DEFAULT_OG_IMAGE,
  },

  "/wholesale": {
    title: "CBD Wholesale Program | Medi Spero",
    description: "Partner with Medi Spero for wholesale pharmaceutical-grade CBD. Bulk pricing on lab-tested CBD oils, isolate, capsules & hemp products.",
    ogTitle: "Medi Spero CBD Wholesale Program — Bulk Pricing",
    ogDescription: "Wholesale pharmaceutical-grade CBD for retailers and distributors. Bulk pricing on lab-tested CBD oils, isolate powder, capsules, and hemp products.",
    canonical: `${BASE_URL}/wholesale`,
    ogImage: `${BASE_URL}/og-wholesale.jpg`,
  },

  "/track-order": {
    title: "Track Your Order | Medi Spero",
    description: "Track your Medi Spero CBD order in real time. Enter your order number to get live delivery updates and estimated arrival dates.",
    ogTitle: "Track Your Medi Spero CBD Order",
    ogDescription: "Real-time order tracking for Medi Spero CBD purchases. Enter your order number for live delivery status and estimated arrival.",
    canonical: `${BASE_URL}/track-order`,
    ogImage: DEFAULT_OG_IMAGE,
  },
};

export function getSEO(pathname: string): PageSEO {
  return (
    seoConfig[pathname] ??
    seoConfig[pathname.replace(/\/$/, "")] ?? {
      title: "Medi Spero | Pharmaceutical-Grade CBD & Hemp Wellness",
      description:
        "Pharmaceutical-grade CBD oils, Delta-8, Delta-9 & hemp wellness products. Lab-tested, Farm Bill compliant. Free shipping over $250.",
      ogTitle: "Medi Spero — Premium CBD Wellness",
      ogDescription:
        "Lab-tested pharmaceutical-grade CBD products for anxiety, sleep, ADHD and mood support. Farm Bill compliant.",
      canonical: `${BASE_URL}${pathname}`,
      ogImage: `${BASE_URL}/og-default.jpg`,
    }
  );
}
