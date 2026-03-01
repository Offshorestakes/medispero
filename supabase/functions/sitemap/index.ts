import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const BASE_URL = "https://medispero.com";

// Product and category data embedded for sitemap generation
const categorySlugs = [
  "pharma-capsules",
  "adhd-focus",
  "anti-anxiety",
  "mood-support",
  "cbd-oils",
  "cbd-isolate-powder",
  "cbd-isolate-crystals",
  "cbd-isolate-pure-spectrum",
  "cbd-vape",
  "cbd-capsules",
  "sleep-wellness",
  "cbd-skincare",
  "bundles",
];

const productSlugs = [
  // Pharmaceutical Capsules
  "cbd-daily-wellness-capsules", "cbd-clinical-strength-capsules", "cbd-advanced-therapy-capsules",
  "cbd-maximum-potency-capsules", "cbd-sustained-release-capsules", "thc-micro-dose-capsules",
  // ADHD & Focus
  "adhd-focus-cbd-capsules", "focus-clarity-cbd-oil", "concentration-boost-capsules",
  "adhd-support-tincture", "cognitive-enhance-softgels", "neuro-focus-blend",
  // Anti-Anxiety / Anxiety & Focus
  "cbd-isolate-powder-99-pure", "cbd-isolate-crystals-therapeutic", "cbd-isolate-pure-spectrum-tincture",
  "anxiety-relief-cbd-oil", "calm-focus-capsules", "stress-relief-spray",
  // Mood Support
  "delta9-mood-elevation-tincture", "cbd-mood-balance-softgels", "stress-relief-oral-spray",
  "delta8-calm-gummies", "cbd-calm-herbal-tea", "delta10-mood-chocolate",
  // CBD Oils
  "pharmaceutical-grade-cbd-oil-1000mg", "full-spectrum-cbd-extract-2500mg", "premium-hemp-tincture-1500mg",
  "golden-extract-cbd-oil-3000mg", "lab-grade-cbd-collection-5000mg", "scientific-formula-cbd-oil",
  "pure-concentrate-cbd-oil", "therapeutic-grade-cbd-oil", "high-potency-cbd-extract",
  // CBD Isolate categories
  "cbd-isolate-powder-1g", "cbd-isolate-powder-5g", "cbd-isolate-powder-10g",
  "cbd-isolate-powder-25g", "cbd-isolate-powder-50g", "cbd-isolate-powder-100g",
  "cbd-isolate-powder-250g", "cbd-isolate-powder-500g", "cbd-isolate-powder-1kg",
  "cbd-isolate-crystals-1g", "cbd-isolate-crystals-5g", "cbd-isolate-crystals-10g",
  "cbd-isolate-crystals-25g", "cbd-isolate-crystals-50g", "cbd-isolate-crystals-100g",
  "cbd-isolate-crystals-250g", "cbd-isolate-crystals-500g", "cbd-isolate-crystals-1kg",
  "cbd-pure-spectrum-1g", "cbd-pure-spectrum-5g", "cbd-pure-spectrum-10g",
  "cbd-pure-spectrum-25g", "cbd-pure-spectrum-50g", "cbd-pure-spectrum-100g",
  "cbd-pure-spectrum-250g", "cbd-pure-spectrum-500g", "cbd-pure-spectrum-1kg",
  // CBD Vape
  "cbd-vape-disposable-500mg", "cbd-vape-disposable-1000mg", "cbd-vape-cartridge-500mg",
  "cbd-vape-cartridge-1000mg", "cbd-vape-pod-500mg", "cbd-vape-pod-1000mg",
  // Sleep & Wellness
  "cbd-sleep-tincture", "cbd-recovery-capsules", "cbd-bath-bombs",
];

const blogSlugs = [
  "cbd-for-anxiety-complete-guide",
  "how-to-read-cbd-lab-results",
  "cbd-vs-thc-mental-health",
  "choosing-right-cbd-product",
  "cbd-sleep-research",
  "hemp-industry-pharmaceutical-standards",
];

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/products", priority: "0.9", changefreq: "daily" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/faq", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/lab-results", priority: "0.7", changefreq: "monthly" },
  { path: "/education", priority: "0.7", changefreq: "monthly" },
  { path: "/testimonials", priority: "0.5", changefreq: "monthly" },
  { path: "/wholesale", priority: "0.6", changefreq: "monthly" },
  { path: "/shipping", priority: "0.4", changefreq: "yearly" },
  { path: "/returns", priority: "0.4", changefreq: "yearly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/accessibility", priority: "0.3", changefreq: "yearly" },
];

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildSitemapIndex(): string {
  const now = new Date().toISOString().split("T")[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${BASE_URL}/api/sitemap?type=pages</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>${BASE_URL}/api/sitemap?type=products</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>${BASE_URL}/api/sitemap?type=categories</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>${BASE_URL}/api/sitemap?type=blog</loc><lastmod>${now}</lastmod></sitemap>
</sitemapindex>`;
}

function buildUrlSet(entries: { loc: string; priority: string; changefreq: string }[]): string {
  const now = new Date().toISOString().split("T")[0];
  const urls = entries
    .map(
      (e) =>
        `  <url><loc>${escapeXml(e.loc)}</loc><lastmod>${now}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

serve((req) => {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  let xml: string;

  if (!type) {
    xml = buildSitemapIndex();
  } else if (type === "pages") {
    xml = buildUrlSet(staticPages.map((p) => ({ loc: `${BASE_URL}${p.path}`, priority: p.priority, changefreq: p.changefreq })));
  } else if (type === "products") {
    xml = buildUrlSet(productSlugs.map((s) => ({ loc: `${BASE_URL}/product/${s}`, priority: "0.8", changefreq: "weekly" })));
  } else if (type === "categories") {
    xml = buildUrlSet(categorySlugs.map((s) => ({ loc: `${BASE_URL}/category/${s}`, priority: "0.7", changefreq: "weekly" })));
  } else if (type === "blog") {
    xml = buildUrlSet(blogSlugs.map((s) => ({ loc: `${BASE_URL}/blog/${s}`, priority: "0.7", changefreq: "monthly" })));
  } else {
    return new Response("Not found", { status: 404 });
  }

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
});
