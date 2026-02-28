const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BOT_REGEX = /googlebot|bingbot|gptbot|perplexitybot|anthropic-ai|claudebot|facebookexternalhit|twitterbot|linkedinbot|applebot|chatgpt-user|cohere-ai|bard|duckduckbot|slurp|yandexbot|baiduspider/i;

const SITE = 'https://medispero.com';

// Shared HTML shell
function html(p: { title: string; desc: string; canonical: string; h1: string; body: string; jsonLd?: string }) {
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${p.title}</title>
<meta name="description" content="${p.desc}"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<link rel="canonical" href="${p.canonical}"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${p.title}"/>
<meta property="og:description" content="${p.desc}"/>
<meta property="og:url" content="${p.canonical}"/>
<meta property="og:image" content="${SITE}/og-homepage.jpg"/>
<meta property="og:site_name" content="Medi Spero"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${p.title}"/>
<meta name="twitter:description" content="${p.desc}"/>
<meta name="twitter:image" content="${SITE}/og-homepage.jpg"/>
${p.jsonLd || ''}
</head>
<body>
<header><a href="${SITE}">Medi Spero</a></header>
<main>
<h1>${p.h1}</h1>
${p.body}
</main>
<footer>
<nav>
<a href="${SITE}/about">About</a> |
<a href="${SITE}/products">Products</a> |
<a href="${SITE}/blog">Blog</a> |
<a href="${SITE}/faq">FAQ</a> |
<a href="${SITE}/lab-results">Lab Results</a> |
<a href="${SITE}/education">Education</a> |
<a href="${SITE}/contact">Contact</a>
</nav>
<p>These statements have not been evaluated by the FDA. These products are not intended to diagnose, treat, cure, or prevent any disease. Must be 21+ to purchase. &copy; Medi Spero. All rights reserved.</p>
</footer>
</body>
</html>`;
}

// Category nav block reused across pages
const categoryNav = `
<h2>Shop by Category</h2>
<ul>
<li><a href="${SITE}/category/pharma-capsules">Pharmaceutical Capsules — 35 Products</a></li>
<li><a href="${SITE}/category/adhd-focus">ADHD &amp; Focus Support — 40 Products</a></li>
<li><a href="${SITE}/category/anti-anxiety">Anxiety &amp; Focus CBD — 45 Products</a></li>
<li><a href="${SITE}/category/mood-support">Mood &amp; Depression Support — 40 Products</a></li>
<li><a href="${SITE}/category/cbd-oils">CBD Oils &amp; Tinctures — 65 Products</a></li>
<li><a href="${SITE}/category/cbd-isolate-powder">99% Pure CBD Isolate Powder — 40 Products</a></li>
<li><a href="${SITE}/category/cbd-isolate-crystals">99% Pure CBD Isolate Crystals — 35 Products</a></li>
<li><a href="${SITE}/category/cbd-vape">CBD Vape — 24 Products</a></li>
<li><a href="${SITE}/category/cbd-capsules">CBD Capsules — 15 Products</a></li>
<li><a href="${SITE}/category/sleep-wellness">Sleep &amp; Wellness — 15 Products</a></li>
<li><a href="${SITE}/category/cbd-skincare">CBD Skincare — 6 Products</a></li>
<li><a href="${SITE}/category/bundles">Value Bundles — 8 Products</a></li>
</ul>`;

const trustPoints = `
<h2>Why Choose Medi Spero?</h2>
<ul>
<li>Pharmaceutical-grade quality standards</li>
<li>Third-party lab tested at ISO-certified laboratories</li>
<li>2018 Farm Bill compliant — less than 0.3% THC</li>
<li>Supercritical CO₂ extraction for maximum purity</li>
<li>GMP-certified manufacturing facilities in the USA</li>
<li>Free discreet shipping on qualifying orders</li>
<li>30-day satisfaction guarantee</li>
</ul>`;

const orgJsonLd = `<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Medi Spero",
  url: SITE,
  logo: `${SITE}/favicon.png`,
  description: "Pharmaceutical-grade CBD and hemp wellness products for ADHD, anxiety, sleep, and mood support.",
  email: "info@medispero.com",
  telephone: "+1-334-746-9312",
  address: { "@type": "PostalAddress", addressCountry: "US" },
  sameAs: ["https://www.instagram.com/medispero", "https://www.facebook.com/medispero"]
})}</script>`;

// ── Page renderers ──
const pages: Record<string, () => string> = {

  '/': () => html({
    title: 'Premium Pharmaceutical-Grade CBD & Hemp Wellness | Medi Spero',
    desc: 'Shop lab-tested, Farm Bill compliant CBD oils, capsules, tinctures, and isolates for ADHD, anxiety, sleep and mood. Pharmaceutical-grade hemp wellness by Medi Spero.',
    canonical: `${SITE}/`,
    h1: 'Premium Pharmaceutical-Grade CBD & Hemp Wellness | Medi Spero',
    jsonLd: orgJsonLd,
    body: `
<p>Medi Spero offers pharmaceutical-grade CBD and hemp-derived THC products formulated for ADHD, anxiety relief, mood support, depression, and sleep wellness. All products are third-party lab tested at ISO-certified laboratories, Farm Bill compliant (less than 0.3% THC), and manufactured in GMP-certified facilities in the USA.</p>
${categoryNav}
${trustPoints}
<h2>Featured Product Categories</h2>
<h3><a href="${SITE}/category/anti-anxiety">Anxiety &amp; Focus CBD Isolate Products</a></h3>
<p>99%+ pure CBD isolate powder, crystals, and tinctures formulated for targeted anxiety relief and enhanced focus. THC-free, lab-tested, cGMP manufactured.</p>
<h3><a href="${SITE}/category/mood-support">Mood &amp; Depression Support</a></h3>
<p>Hemp-derived Delta-9 THC gummies, tinctures, and capsules for natural mood elevation and emotional balance. Farm Bill compliant.</p>
<h3><a href="${SITE}/category/adhd-focus">ADHD &amp; Focus Support</a></h3>
<p>Specialized cannabinoid formulations designed to support concentration, attention, and cognitive clarity for ADHD management.</p>
<h3><a href="${SITE}/category/cbd-oils">CBD Oils &amp; Tinctures</a></h3>
<p>Premium full-spectrum and broad-spectrum CBD oils in strengths from 500mg to 10,000mg. CO₂ extracted, organic hemp.</p>
`
  }),

  '/about': () => html({
    title: 'About Medi Spero — Pharmaceutical-Grade CBD Wellness Brand',
    desc: "Learn about Medi Spero's mission to deliver pharmaceutical-grade CBD wellness products. Farm Bill compliant, lab-tested, and formulated for results.",
    canonical: `${SITE}/about`,
    h1: 'About Medi Spero — Our Mission in CBD Wellness',
    jsonLd: orgJsonLd,
    body: `
<p>Medi Spero — meaning "Medical Hope" — was founded with a clear purpose: to provide pharmaceutical-grade CBD products that people can trust for real wellness outcomes. After witnessing the inconsistency and lack of transparency in the CBD market, our founders set out to create a brand that holds itself to the same standards as pharmaceutical drug manufacturing.</p>
<p>We recognized that millions of Americans struggling with ADHD, anxiety, depression, and sleep issues were looking for natural alternatives — but couldn't find products backed by rigorous testing and clinical-grade formulation. Medi Spero was built to fill that gap.</p>
<p>Today, we serve over 50,000 customers across the United States with more than 500 products — each one third-party lab tested, Farm Bill compliant, and formulated by experts in cannabinoid science.</p>

<h2>Our Expertise &amp; Credentials</h2>
<h3>Pharmacological Formulation</h3>
<p>Our product formulations are guided by clinical pharmacologists and cannabinoid researchers who understand how CBD interacts with the endocannabinoid system, serotonin receptors, and GABA pathways.</p>
<h3>GMP-Certified Manufacturing</h3>
<p>All Medi Spero products are manufactured in GMP (Good Manufacturing Practice) certified facilities in the United States, following pharmaceutical quality control protocols.</p>
<h3>Published Research</h3>
<p>Our blog and education content is authored by licensed pharmacists, clinical pharmacologists, and integrative medicine specialists. Every health claim is supported by peer-reviewed research citations.</p>

<h2>Manufacturing Standards &amp; Quality Control</h2>
<ul>
<li><strong>Supercritical CO₂ Extraction</strong> — the gold standard in cannabinoid extraction, no residual solvents</li>
<li><strong>Five-Stage Purification</strong> — winterization, decarboxylation, distillation, chromatography, and crystallization</li>
<li><strong>Full-Panel Third-Party Testing</strong> — potency, pesticides, heavy metals, microbial contaminants, residual solvents, mycotoxins</li>
<li><strong>Organic, USA-Grown Hemp</strong> — USDA-certified organic farms, full seed-to-sale traceability</li>
</ul>

<h2>2018 Farm Bill Compliance</h2>
<p>All Medi Spero products are fully compliant with the Agriculture Improvement Act of 2018. Every product batch is independently verified to contain less than 0.3% THC. Certificates of Analysis are available on our <a href="${SITE}/lab-results">Lab Results page</a>.</p>

<h2>Core Values</h2>
<ul>
<li><strong>Quality First</strong> — rigorous testing for purity, potency, and safety</li>
<li><strong>Transparency</strong> — full lab reports available for every batch</li>
<li><strong>Sustainability</strong> — organic farming and eco-friendly packaging</li>
<li><strong>Customer Care</strong> — 30-day satisfaction guarantee</li>
</ul>
`
  }),

  '/blog': () => {
    const blogPosts = [
      { slug: 'cbd-for-anxiety-complete-guide', title: 'CBD for Anxiety: A Complete Guide to Natural Relief', excerpt: 'Discover how pharmaceutical-grade CBD can help manage anxiety symptoms naturally.', author: 'Dr. Sarah Mitchell', date: '2026-01-28', category: 'Anti-Anxiety' },
      { slug: 'delta-8-thc-anxiety-relief', title: 'Delta-8 THC for Anxiety: What the Research Shows', excerpt: 'Learn how hemp-derived Delta-8 THC offers a gentle, legal approach to anxiety management.', author: 'Michael Chen, PharmD', date: '2026-01-25', category: 'Anti-Anxiety' },
      { slug: 'hemp-derived-delta-9-mood-support', title: 'Hemp-Derived Delta-9 THC for Depression and Mood Enhancement', excerpt: 'Explore how legal, hemp-derived Delta-9 THC products can naturally support mood.', author: 'Dr. Amanda Rodriguez', date: '2026-01-22', category: 'Mood Support' },
      { slug: 'pharmaceutical-grade-cbd-explained', title: 'What Makes Pharmaceutical-Grade CBD Different?', excerpt: 'Not all CBD is created equal. Learn what sets pharmaceutical-grade CBD apart.', author: 'Dr. James Park', date: '2026-01-18', category: 'Education' },
      { slug: 'cbd-sleep-science', title: 'The Science of CBD for Sleep: Clinical Evidence and Dosing Guide', excerpt: 'Evidence-based guide to using CBD and CBN for better sleep quality.', author: 'Dr. Sarah Mitchell', date: '2026-01-15', category: 'Sleep & Wellness' },
      { slug: 'adhd-cbd-focus-guide', title: 'CBD for ADHD: Can Cannabinoids Improve Focus and Attention?', excerpt: 'Exploring cannabinoid therapy for ADHD symptom management.', author: 'Dr. Rachel Kim', date: '2026-01-12', category: 'ADHD & Focus' },
      { slug: 'cbd-vs-antidepressants', title: 'CBD vs Traditional Antidepressants: A Comparative Analysis', excerpt: 'How does CBD compare to SSRIs and SNRIs for depression management?', author: 'Dr. Amanda Rodriguez', date: '2026-01-08', category: 'Mood Support' },
      { slug: 'understanding-cbd-lab-results', title: 'How to Read CBD Lab Results: A Consumer Guide', excerpt: 'Learn to interpret Certificates of Analysis and lab test results.', author: 'Michael Chen, PharmD', date: '2026-01-05', category: 'Education' },
      { slug: 'endocannabinoid-system-explained', title: 'The Endocannabinoid System: How CBD Works in Your Body', excerpt: "Your body's master regulatory system and how CBD interacts with it.", author: 'Dr. James Park', date: '2026-01-02', category: 'Education' },
    ];
    const blogJsonLd = `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Medi Spero Wellness Blog",
      description: "Expert insights on CBD, THC, anxiety relief, mood support, and natural wellness",
      url: `${SITE}/blog`,
      publisher: { "@type": "Organization", name: "Medi Spero" },
      blogPost: blogPosts.map(p => ({
        "@type": "BlogPosting",
        headline: p.title,
        description: p.excerpt,
        datePublished: p.date,
        author: { "@type": "Person", name: p.author },
      }))
    })}</script>`;

    return html({
      title: 'CBD Wellness Blog — Research, Guides & Education | Medi Spero',
      desc: 'Explore expert articles on CBD for ADHD, anxiety, sleep, and mood. Backed by science and formulated for real wellness results.',
      canonical: `${SITE}/blog`,
      h1: 'CBD & THC Wellness Blog',
      jsonLd: blogJsonLd,
      body: `
<p>Expert insights on pharmaceutical-grade CBD and hemp-derived THC for anxiety relief, mood support, and natural wellness. Written by licensed pharmacists, clinical pharmacologists, and integrative medicine specialists.</p>
<h2>Featured Articles</h2>
<ul>
${blogPosts.map(p => `<li><a href="${SITE}/blog/${p.slug}">${p.title}</a> — by ${p.author} (${p.category}) — ${p.excerpt}</li>`).join('\n')}
</ul>
<h2>Blog Categories</h2>
<ul>
<li>Anti-Anxiety — CBD and cannabinoid research for anxiety relief</li>
<li>Mood Support — Depression management and mood enhancement</li>
<li>ADHD &amp; Focus — Cannabinoid therapy for attention and concentration</li>
<li>Sleep &amp; Wellness — CBD and CBN for better sleep</li>
<li>Education — Understanding CBD quality, lab results, and the endocannabinoid system</li>
</ul>
<h3>CBD for Anxiety and Stress Relief</h3>
<p>CBD (cannabidiol) has shown promising results in clinical studies for reducing anxiety symptoms. Unlike traditional anti-anxiety medications, CBD works with your body's endocannabinoid system to promote calm without sedation or risk of dependence.</p>
<h3>Delta-8 THC for Natural Calm</h3>
<p>Delta-8 THC offers a gentle, legal alternative for those seeking anxiety relief. This hemp-derived cannabinoid provides calming effects without the intense psychoactive experience of traditional THC.</p>
<h3>Hemp-Derived Delta-9 for Mood Support</h3>
<p>Our hemp-derived Delta-9 THC products offer natural mood elevation and depression support. Legal under the 2018 Farm Bill.</p>
`
    });
  },

  '/faq': () => {
    const faqItems = [
      { q: 'What is CBD?', a: "CBD (cannabidiol) is a naturally occurring compound found in the hemp plant. Unlike THC, CBD is non-psychoactive. It interacts with your body's endocannabinoid system to support overall wellness." },
      { q: 'Is CBD legal?', a: 'Yes! CBD derived from industrial hemp containing less than 0.3% THC is federally legal under the 2018 Farm Bill. All Medi Spero products are compliant.' },
      { q: 'Will CBD make me fail a drug test?', a: 'Full Spectrum products contain trace THC (under 0.3%). If subject to drug testing, we recommend Broad Spectrum or CBD Isolate products with zero THC.' },
      { q: "What's the difference between Full Spectrum, Broad Spectrum, and CBD Isolate?", a: 'Full Spectrum contains all cannabinoids including trace THC. Broad Spectrum has THC removed. CBD Isolate is pure CBD with no other cannabinoids.' },
      { q: 'How is CBD extracted?', a: 'Medi Spero uses CO₂ extraction — the gold standard. No harsh solvents, resulting in pure, potent, and safe products.' },
      { q: 'What CBD product should I start with?', a: 'For beginners, we recommend CBD Oil Tinctures or CBD Gummies. Start with a lower strength (500mg-1000mg) and adjust based on your needs.' },
      { q: 'How much CBD should I take?', a: 'Start with 10-25mg daily and gradually increase. Consistency is key — take CBD at the same time each day.' },
      { q: 'How long does it take for CBD to work?', a: 'Sublingual oils: 15-30 minutes. Edibles/capsules: 1-2 hours. Topicals: within minutes on localized areas. Effects last 4-6 hours.' },
      { q: 'Are your products third-party lab tested?', a: 'Yes! Every product undergoes rigorous testing at ISO-certified laboratories for potency, purity, pesticides, heavy metals, and microbial contaminants.' },
      { q: 'Where is your hemp sourced?', a: 'All hemp is grown on licensed farms in the United States — Colorado, Oregon, and Kentucky — using organic practices.' },
      { q: 'Do you offer free shipping?', a: 'Yes! Free standard shipping on orders over $75 within the continental US.' },
      { q: 'Is your packaging discreet?', a: 'Yes, all orders ship in plain, unmarked packaging.' },
      { q: 'What is your return policy?', a: '30-day satisfaction guarantee. Return any unused portion for a full refund. No questions asked.' },
      { q: 'How do I return a product?', a: 'Email info@medispero.com or call +1 (334) 746-9312. Refunds processed within 5-7 business days.' },
    ];
    const faqJsonLd = `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    })}</script>`;

    return html({
      title: 'FAQ | CBD & Hemp Product Questions | Medi Spero',
      desc: 'Find answers to common questions about CBD, THC products, dosing, shipping, returns, and more. Expert guidance from Medi Spero.',
      canonical: `${SITE}/faq`,
      h1: 'Frequently Asked Questions',
      jsonLd: faqJsonLd,
      body: `
<p>Find answers to common questions about CBD, our products, ordering, and more.</p>
${faqItems.map(f => `<h3>${f.q}</h3>\n<p>${f.a}</p>`).join('\n')}
<h2>Still Have Questions?</h2>
<p>Email us at <a href="mailto:info@medispero.com">info@medispero.com</a> or call <a href="tel:+13347469312">+1 (334) 746-9312</a>.</p>
`
    });
  },

  '/products': () => html({
    title: 'Shop CBD Products — Oils, Capsules, Tinctures & More | Medi Spero',
    desc: "Explore Medi Spero's full catalog of premium CBD products: oils, tinctures, capsules, isolates, vapes, and wellness bundles. Third-party lab tested.",
    canonical: `${SITE}/products`,
    h1: 'Shop Premium CBD Products',
    body: `
<p>Browse our complete collection of 500+ premium CBD and hemp-derived products. All products are third-party lab tested, Farm Bill compliant, organic hemp, and made in the USA.</p>
${categoryNav}
<h2>Top-Selling Products</h2>
<ul>
<li>Medi Spero Clinical Grade CBD-A + CBD Complex — from $249</li>
<li>Medi Spero Delta-9 THC + CBD Therapeutic Capsules — from $379</li>
<li>Medi Spero Full Spectrum Nano-Enhanced Softgels — from $399</li>
<li>Medi Spero CBD Isolate Powder for Anxiety Relief — from $95</li>
<li>Medi Spero Delta-9 THC Mood Elevation Gummies — from $179</li>
<li>Medi Spero CBD + CBN Sleep Complex — from $299</li>
<li>Medi Spero High-Potency CBD Oil — from $189</li>
<li>Medi Spero ADHD Focus Formula Capsules — from $229</li>
</ul>
${trustPoints}
`
  }),

  '/lab-results': () => html({
    title: 'Lab Results & Certificates of Analysis | Medi Spero',
    desc: 'View third-party lab test results and Certificates of Analysis (COA) for all Medi Spero CBD and THC products. 100% transparency guaranteed.',
    canonical: `${SITE}/lab-results`,
    h1: 'Lab Results & Certificates of Analysis',
    body: `
<p>Every Medi Spero product is third-party tested for purity, potency, and safety at ISO-certified laboratories. Enter your batch number on our website to view the Certificate of Analysis for your specific product.</p>

<h2>What We Test For</h2>
<ul>
<li><strong>CBD/THC Potency</strong> — confirms content matches label claims and THC is below 0.3%</li>
<li><strong>Pesticides</strong> — must be below detection limits</li>
<li><strong>Heavy Metals</strong> — lead, mercury, arsenic, cadmium screening</li>
<li><strong>Microbial Contaminants</strong> — mold, bacteria, E. coli</li>
<li><strong>Residual Solvents</strong> — from extraction process</li>
<li><strong>Mycotoxins</strong> — fungal toxin screening</li>
</ul>

<h2>Our Testing Standards</h2>
<h3>Third-Party Verified</h3>
<p>All products tested by ISO 17025-accredited independent laboratories including SC Labs.</p>
<h3>Full Panel Testing</h3>
<p>Every batch undergoes comprehensive testing for potency, pesticides, heavy metals, microbial contaminants, and residual solvents.</p>
<h3>100% Transparency</h3>
<p>Every batch tested and results publicly available. Contact us at <a href="mailto:info@medispero.com">info@medispero.com</a> for any batch COA.</p>
`
  }),

  '/contact': () => html({
    title: 'Contact Medi Spero — Customer Support & Inquiries',
    desc: 'Get in touch with Medi Spero for product questions, order support, wholesale inquiries, and more. We respond within 24 hours.',
    canonical: `${SITE}/contact`,
    h1: 'Contact Medi Spero',
    body: `
<p>We'd love to hear from you. Our customer support team is available to help with product questions, order inquiries, and more.</p>
<h2>Get in Touch</h2>
<ul>
<li><strong>Email:</strong> <a href="mailto:info@medispero.com">info@medispero.com</a></li>
<li><strong>Phone:</strong> <a href="tel:+13347469312">+1 (334) 746-9312</a></li>
</ul>
<p>We typically respond within 24 hours during business days.</p>
<h2>Wholesale Inquiries</h2>
<p>Interested in carrying Medi Spero products? Visit our <a href="${SITE}/wholesale">Wholesale page</a> for more information.</p>
`
  }),

  '/education': () => html({
    title: 'CBD Education Center — Learn About Cannabinoids | Medi Spero',
    desc: 'Learn about CBD, THC, the endocannabinoid system, and how cannabinoids support wellness. Science-backed education from Medi Spero.',
    canonical: `${SITE}/education`,
    h1: 'CBD Education Center',
    body: `
<p>Understanding how CBD and cannabinoids work is the first step to finding the right products for your wellness goals. Explore our science-backed educational resources.</p>
<h2>The Endocannabinoid System</h2>
<p>Your body has a natural endocannabinoid system (ECS) that regulates mood, sleep, appetite, pain, and immune function. CBD and other cannabinoids interact with this system to support balance and homeostasis.</p>
<h2>Types of CBD</h2>
<h3>Full Spectrum CBD</h3>
<p>Contains all cannabinoids, terpenes, and beneficial compounds from hemp, including trace THC (under 0.3%). Benefits from the "entourage effect."</p>
<h3>Broad Spectrum CBD</h3>
<p>Multiple cannabinoids with THC removed. Good for those who want enhanced benefits without any THC.</p>
<h3>CBD Isolate</h3>
<p>99%+ pure CBD. Zero THC. Ideal for those who need to avoid THC entirely or want precise dosing.</p>
<h2>Cannabinoids Explained</h2>
<ul>
<li><strong>CBD (Cannabidiol)</strong> — Non-psychoactive, supports calm, sleep, and inflammation response</li>
<li><strong>CBN (Cannabinol)</strong> — Known for sleep support properties</li>
<li><strong>CBG (Cannabigerol)</strong> — "The focus cannabinoid," supports concentration</li>
<li><strong>Delta-8 THC</strong> — Mild psychoactive, calming, legal under Farm Bill</li>
<li><strong>Delta-9 THC</strong> — Hemp-derived, mood elevation, legal under 0.3% by weight</li>
</ul>
`
  }),
};

// Category pages
const categoryData: Record<string, { name: string; desc: string; count: number }> = {
  'cbd-oils': { name: 'CBD Oils & Tinctures', desc: 'Premium full-spectrum and broad-spectrum CBD oils for daily wellness support', count: 65 },
  'adhd-focus': { name: 'ADHD & Focus Support', desc: 'Specialized CBD and cannabinoid formulas designed to support focus, attention, and cognitive clarity for ADHD management', count: 40 },
  'anti-anxiety': { name: 'Anxiety & Focus CBD', desc: 'Premium CBD isolate products formulated for anxiety relief and enhanced focus. 99%+ pure, THC-free', count: 45 },
  'sleep-wellness': { name: 'Sleep & Wellness', desc: 'Premium CBD and CBN sleep formulas for deep, restorative rest', count: 15 },
  'mood-support': { name: 'Mood & Depression Support', desc: 'High-potency hemp-derived Delta-9 and CBD products to support positive mood and emotional balance', count: 40 },
};

for (const [slug, cat] of Object.entries(categoryData)) {
  pages[`/category/${slug}`] = () => html({
    title: `${cat.name} — Premium CBD Products | Medi Spero`,
    desc: `Shop ${cat.name} from Medi Spero. ${cat.desc}. ${cat.count} products, all third-party lab tested and Farm Bill compliant.`,
    canonical: `${SITE}/category/${slug}`,
    h1: cat.name,
    body: `
<p>${cat.desc}. Browse ${cat.count} products — all pharmaceutical-grade, third-party lab tested, and Farm Bill compliant.</p>
${categoryNav}
${trustPoints}
<p><a href="${SITE}/products">View All Products</a></p>
`
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.searchParams.get('path') || '/';
  const ua = req.headers.get('user-agent') || '';
  const forceRender = url.searchParams.get('force') === 'true';

  // Only serve to bots unless ?force=true
  if (!forceRender && !BOT_REGEX.test(ua)) {
    return new Response(JSON.stringify({ 
      error: 'This endpoint serves pre-rendered HTML for search engine crawlers only.',
      hint: 'Add ?force=true to bypass bot detection for testing.'
    }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const renderer = pages[path];
  if (!renderer) {
    return new Response(JSON.stringify({ error: 'Page not found', available: Object.keys(pages) }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const renderedHtml = renderer();
  return new Response(renderedHtml, {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Robots-Tag': 'index, follow',
    }
  });
});
