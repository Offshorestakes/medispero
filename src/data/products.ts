// Medi Spero - Premium Pharmaceutical CBD/Hemp Product Catalog
// Legal, Farm Bill compliant products only
// CBD Isolate categories: $95-$3,900 | All other categories: $95-$750

// Import product images - CBD Oils (SEO-optimized authentic product images)
import cbdOilPharmaGrade from "@/assets/products/cbd-oil-pharmaceutical-grade-1000ml.jpg";
import cbdOilFullSpectrum from "@/assets/products/cbd-oil-full-spectrum-extract.jpg";
import cbdOilHempTincture from "@/assets/products/cbd-oil-hemp-tincture-premium.jpg";
import cbdOilGoldenExtract from "@/assets/products/cbd-oil-golden-extract.jpg";
import cbdOilLabCollection from "@/assets/products/cbd-oil-lab-grade-collection.jpg";
import cbdOilScientific from "@/assets/products/cbd-oil-scientific-laboratory.jpg";
import cbdOilPureConcentrate from "@/assets/products/cbd-oil-pure-concentrate.jpg";
import cbdOilTherapeutic from "@/assets/products/cbd-oil-therapeutic-grade.jpg";
import cbdOilHighPotency from "@/assets/products/cbd-oil-high-potency-extract.jpg";
// Legacy product images (for other categories)
import cbdIsolatePowderImage from "@/assets/products/cbd-isolate-powder.jpg";
import cbdIsolateCrystalsImage from "@/assets/products/cbd-isolate-crystals.jpg";
import cbdIsolatePureSpectrumImage from "@/assets/products/cbd-isolate-pure-spectrum.jpg";
import thcVapeImage from "@/assets/products/thc-vape-cartridge.jpg";
import cbdCapsulesImage from "@/assets/products/cbd-capsules.jpg";
import thcGummiesImage from "@/assets/products/thc-gummies.jpg";
import cbdSleepImage from "@/assets/products/cbd-sleep-tincture.jpg";
import hhcFlowerImage from "@/assets/products/hhc-flower.jpg";
import cbdBathBombsImage from "@/assets/products/cbd-bath-bombs.jpg";
// Anti-Anxiety & Mood product images
import delta8CalmGummiesImage from "@/assets/products/delta8-calm-gummies.jpg";
import delta9MoodTinctureImage from "@/assets/products/delta9-mood-tincture.jpg";
import cbdMoodSoftgelsImage from "@/assets/products/cbd-mood-softgels.jpg";
import delta8AnxietyVapeImage from "@/assets/products/delta8-anxiety-vape.jpg";
import cbdStressSprayImage from "@/assets/products/cbd-stress-spray.jpg";
import thcHempFlowerImage from "@/assets/products/thc-hemp-flower.jpg";
import cbdCalmTeaImage from "@/assets/products/cbd-calm-tea.jpg";
import delta10ChocolateImage from "@/assets/products/delta10-chocolate.jpg";
// Pharmaceutical Capsules images (SEO-optimized)
import pharmaCapsulesImage from "@/assets/products/pharmaceutical-grade-cbd-capsule.jpg";
import adhdFocusCapsulesImage from "@/assets/products/adhd-focus-capsules.png";

// Image pools for each category to provide variety
const imagePoolsByCategory: Record<string, string[]> = {
  "cbd-oils": [cbdOilPharmaGrade, cbdOilFullSpectrum, cbdOilHempTincture, cbdOilGoldenExtract, cbdOilLabCollection, cbdOilScientific, cbdOilPureConcentrate, cbdOilTherapeutic, cbdOilHighPotency],
  "cbd-isolate-powder": [cbdIsolatePowderImage, cbdIsolateCrystalsImage, cbdIsolatePureSpectrumImage],
  "cbd-isolate-crystals": [cbdIsolateCrystalsImage, cbdIsolatePowderImage, cbdIsolatePureSpectrumImage],
  "cbd-isolate-pure-spectrum": [cbdIsolatePureSpectrumImage, cbdIsolatePowderImage, cbdIsolateCrystalsImage],
  "cbd-capsules": [cbdCapsulesImage, cbdMoodSoftgelsImage, pharmaCapsulesImage],
  "sleep-wellness": [cbdSleepImage, cbdBathBombsImage, cbdCalmTeaImage, delta8CalmGummiesImage],
  "cbd-skincare": [cbdBathBombsImage, cbdIsolatePureSpectrumImage],
  "bundles": [cbdOilPharmaGrade, cbdIsolatePowderImage, cbdCapsulesImage, cbdSleepImage],
  "thc": [thcVapeImage, thcGummiesImage, hhcFlowerImage, thcHempFlowerImage, delta10ChocolateImage],
  "anti-anxiety": [cbdIsolatePowderImage, cbdIsolateCrystalsImage, cbdIsolatePureSpectrumImage, cbdMoodSoftgelsImage, cbdStressSprayImage],
  "mood-support": [delta9MoodTinctureImage, cbdMoodSoftgelsImage, delta10ChocolateImage, delta8CalmGummiesImage, cbdStressSprayImage],
  "pharma-capsules": [pharmaCapsulesImage, adhdFocusCapsulesImage, cbdCapsulesImage],
  "adhd-focus": [adhdFocusCapsulesImage, pharmaCapsulesImage, cbdMoodSoftgelsImage, cbdCapsulesImage],
};

// Helper function to get images based on category with rotation for variety
const getProductImages = (category: string, productIndex: number): string[] => {
  const pool = imagePoolsByCategory[category] || [cbdOilPharmaGrade, cbdIsolatePowderImage, cbdIsolateCrystalsImage];
  const primaryIndex = productIndex % pool.length;
  const primaryImage = pool[primaryIndex];
  const gallery = [primaryImage];
  for (let i = 1; i < pool.length; i++) {
    gallery.push(pool[(primaryIndex + i) % pool.length]);
  }
  return gallery;
};

// Category images mapping
const getCategoryImage = (categoryId: string): string => {
  switch (categoryId) {
    case "cbd-oils": return cbdOilPharmaGrade;
    case "cbd-isolate-powder": return cbdIsolatePowderImage;
    case "cbd-isolate-crystals": return cbdIsolateCrystalsImage;
    case "cbd-isolate-pure-spectrum": return cbdIsolatePureSpectrumImage;
    case "cbd-capsules": return cbdCapsulesImage;
    case "sleep-wellness": return cbdSleepImage;
    case "cbd-skincare": return cbdBathBombsImage;
    case "bundles": return cbdOilFullSpectrum;
    case "anti-anxiety": return cbdIsolatePowderImage;
    case "mood-support": return delta9MoodTinctureImage;
    case "pharma-capsules": return pharmaCapsulesImage;
    case "adhd-focus": return cbdMoodSoftgelsImage;
    default: return cbdOilPharmaGrade;
  }
};

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  images: string[];
  videoUrl?: string;
  sku: string;
  gtin: string;
  brand: string;
  inStock: boolean;
  stockQuantity: number;
  strength: string;
  size: string;
  servings?: number;
  ingredients: string[];
  benefits: string[];
  usage: string;
  thirdPartyTested: boolean;
  organic: boolean;
  glutenFree: boolean;
  vegan: boolean;
  madeInUSA: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "pharma-capsules",
    name: "Pharmaceutical Capsules",
    slug: "pharma-capsules",
    description: "Medical-grade pharmaceutical CBD and THC capsules, precision-dosed for therapeutic applications",
    image: getCategoryImage("pharma-capsules"),
    productCount: 35
  },
  {
    id: "adhd-focus",
    name: "ADHD & Focus Support",
    slug: "adhd-focus",
    description: "Specialized CBD and cannabinoid formulas designed to support focus, attention, and cognitive clarity for ADHD management",
    image: getCategoryImage("adhd-focus"),
    productCount: 40
  },
  {
    id: "anti-anxiety",
    name: "Anxiety & Focus",
    slug: "anti-anxiety",
    description: "Premium CBD isolate products formulated for anxiety relief and enhanced focus. 99%+ pure, THC-free isolate in powder, crystal, and tincture forms for targeted calm and clarity",
    image: getCategoryImage("anti-anxiety"),
    productCount: 45
  },
  {
    id: "mood-support",
    name: "Mood & Depression Support",
    slug: "mood-support",
    description: "High-potency hemp-derived Delta-9 and CBD products to support positive mood and emotional balance",
    image: getCategoryImage("mood-support"),
    productCount: 40
  },
  {
    id: "cbd-oils",
    name: "CBD Oils & Tinctures",
    slug: "cbd-oils",
    description: "Premium full-spectrum and broad-spectrum CBD oils for daily wellness support",
    image: getCategoryImage("cbd-oils"),
    productCount: 65
  },
  {
    id: "cbd-isolate-powder",
    name: "CBD Isolate Powder",
    slug: "cbd-isolate-powder",
    description: "99%+ pure CBD isolate powder extracted from premium US-grown hemp. THC-free, lab-tested, perfect for custom formulations and precise dosing",
    image: getCategoryImage("cbd-isolate-powder"),
    productCount: 40
  },
  {
    id: "cbd-isolate-crystals",
    name: "CBD Isolate Crystals",
    slug: "cbd-isolate-crystals",
    description: "Pharmaceutical-grade CBD isolate crystals with 99.9% purity. Versatile, THC-free crystalline CBD for sublingual use, dabbing, or DIY formulations",
    image: getCategoryImage("cbd-isolate-crystals"),
    productCount: 35
  },
  {
    id: "cbd-isolate-pure-spectrum",
    name: "CBD Isolate Pure Spectrum",
    slug: "cbd-isolate-pure-spectrum",
    description: "Premium pure spectrum CBD isolate products combining 99%+ CBD purity with targeted cannabinoid blends for enhanced therapeutic benefits",
    image: getCategoryImage("cbd-isolate-pure-spectrum"),
    productCount: 35
  },
  {
    id: "cbd-capsules",
    name: "CBD Capsules",
    slug: "cbd-capsules",
    description: "Premium CBD softgel capsules for convenient, precise daily dosing",
    image: getCategoryImage("cbd-capsules"),
    productCount: 15
  },
  {
    id: "sleep-wellness",
    name: "Sleep & Wellness",
    slug: "sleep-wellness",
    description: "Premium CBD and CBN sleep formulas for deep, restorative rest",
    image: getCategoryImage("sleep-wellness"),
    productCount: 15
  },
  {
    id: "cbd-skincare",
    name: "CBD Skincare",
    slug: "cbd-skincare",
    description: "Luxurious CBD-infused skincare for radiant, healthy skin",
    image: getCategoryImage("cbd-skincare"),
    productCount: 6
  },
  {
    id: "bundles",
    name: "Value Bundles",
    slug: "bundles",
    description: "Save more with our curated premium CBD wellness bundles",
    image: getCategoryImage("bundles"),
    productCount: 8
  }
];

// Generate premium-priced products programmatically
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let productId = 1;

  // PHARMACEUTICAL CAPSULES ($95-$750)
  const pharmaFormulas = [
    { name: "Clinical Grade CBD-A + CBD Complex", strength: "5000mg", price: 249, desc: "Pharmaceutical-grade acidic cannabinoid complex for maximum bioavailability" },
    { name: "Delta-9 THC + CBD Therapeutic Capsules", strength: "3000mg + 3000mg", price: 379, desc: "Balanced 1:1 ratio for comprehensive symptom management" },
    { name: "Full Spectrum Nano-Enhanced Softgels", strength: "10000mg", price: 399, desc: "Nano-emulsified for 4x faster absorption than standard capsules" },
    { name: "Delta-8 THC Medical Grade Capsules", strength: "5000mg", price: 289, desc: "Pharmaceutical purity Delta-8 for anxiety and stress management" },
    { name: "CBD + CBN + CBG Entourage Complex", strength: "7500mg Total", price: 349, desc: "Triple cannabinoid formula for enhanced therapeutic effects" },
    { name: "High-Potency CBD Isolate Capsules", strength: "15000mg", price: 449, desc: "99.9% pure CBD isolate in precision-dosed pharmaceutical capsules" },
    { name: "Delta-9 Mood Stabilizer Capsules", strength: "2500mg", price: 229, desc: "Targeted Delta-9 formulation for mood regulation and emotional balance" },
    { name: "CBD + Curcumin Anti-Inflammatory", strength: "6000mg CBD + 2000mg Curcumin", price: 319, desc: "Synergistic anti-inflammatory formula with enhanced bioavailability" },
    { name: "Clinical Sleep Complex Capsules", strength: "5000mg CBD + 1500mg CBN", price: 299, desc: "Pharmaceutical sleep formula with optimized cannabinoid ratios" },
    { name: "Neurological Support Capsules", strength: "8000mg", price: 379, desc: "Targeted support for cognitive function and neural health" },
    { name: "Delta-8 + CBD Anxiety Relief", strength: "4000mg + 4000mg", price: 329, desc: "Dual cannabinoid formula for comprehensive anxiety management" },
    { name: "Medical Grade Recovery Capsules", strength: "10000mg", price: 349, desc: "High-potency formula for post-surgical and athletic recovery" },
    { name: "Endocannabinoid System Optimizer", strength: "7500mg Multi-Cannabinoid", price: 389, desc: "Complete ECS support with full-spectrum cannabinoid profile" },
    { name: "Premium Pharmaceutical CBD-V Blend", strength: "3000mg CBD-V + 5000mg CBD", price: 449, desc: "Rare CBD-V cannabinoid blend for specialized therapeutic needs" },
    { name: "Delta-9 + Delta-8 Synergy Capsules", strength: "2500mg + 2500mg", price: 269, desc: "Dual-THC formula for balanced psychoactive and therapeutic effects" },
  ];

  pharmaFormulas.forEach((formula, index) => {
    const sizes = ["60 count", "90 count", "120 count"];
    sizes.forEach((size, sizeIndex) => {
      const countMultiplier = size.includes("120") ? 1.5 : size.includes("90") ? 1.25 : 1;
      const price = Math.min(750, Math.max(95, Math.round(formula.price * countMultiplier)));
      const originalPrice = Math.min(750, Math.round(price * 1.15));
      
      products.push({
        id: `pharma-${productId}`,
        name: `Medi Spero ${formula.name} - ${formula.strength} (${size})`,
        slug: `pharmaceutical-${formula.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${size.replace(' ', '-')}`,
        category: "pharma-capsules",
        subcategory: "medical-grade",
        price: price,
        originalPrice: originalPrice,
        rating: 4.8 + Math.random() * 0.2,
        reviewCount: Math.floor(Math.random() * 200) + 150,
        description: `${formula.desc} Our pharmaceutical-grade capsules are manufactured in FDA-registered, cGMP-certified facilities with rigorous quality control. Each batch undergoes comprehensive third-party testing for potency, purity, and safety. Recommended for individuals seeking professional-grade cannabinoid therapy.`,
        shortDescription: `Medical-grade ${formula.name} with ${formula.strength} pharmaceutical purity`,
        images: getProductImages("pharma-capsules", productId),
        sku: `MS-PHR-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 30) + 10,
        strength: formula.strength,
        size: size,
        servings: parseInt(size),
        ingredients: ["Pharmaceutical Grade Hemp Extract", "Nano-Emulsified MCT Oil", "Hydroxypropyl Methylcellulose Capsule", "Sunflower Lecithin", "Mixed Tocopherols"],
        benefits: ["Pharmaceutical-Grade Purity", "cGMP Certified Manufacturing", "Third-Party Lab Verified", "Maximum Bioavailability", "Consistent Dosing"],
        usage: "Take 1-2 capsules daily with food or as directed by your healthcare provider. Consult physician before use.",
        thirdPartyTested: true,
        organic: true,
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["pharmaceutical", "medical-grade", "premium", "high-potency", "capsules"]
      });
      productId++;
    });
  });

  // ANXIETY & FOCUS PRODUCTS ($95-$750) - CBD Isolate-based products (Referenced from Extract Labs CBD Isolate)
  const anxietyProducts = [
    { name: "CBD Isolate Powder for Anxiety Relief", strength: "1g (1,000mg)", price: 95, desc: "99%+ pure CBD isolate powder for targeted anxiety relief. THC-free, dissolves easily for sublingual or beverage use" },
    { name: "CBD Isolate Powder - Calm Formula", strength: "5g (5,000mg)", price: 195, desc: "Bulk CBD isolate powder for daily calm and focus. Pharmaceutical-grade purity for custom anxiety management formulations" },
    { name: "CBD Isolate Powder - Focus Blend", strength: "10g (10,000mg)", price: 349, desc: "High-volume CBD isolate powder blended with CBG for enhanced focus and concentration. Ideal for professionals and students" },
    { name: "CBD Isolate Crystals - Anxiety Support", strength: "1g (1,000mg)", price: 99, desc: "Sparkling CBD isolate crystals for fast sublingual absorption. Precision-dosed for acute anxiety episodes" },
    { name: "CBD Isolate Crystals - Daily Calm", strength: "3.5g (3,500mg)", price: 249, desc: "Therapeutic-grade crystalline CBD for consistent daily calm. Dissolves instantly for rapid bioavailability" },
    { name: "CBD Isolate Crystals - Bulk Focus", strength: "14g (14,000mg)", price: 549, desc: "Wholesale-grade CBD crystals for high-volume users seeking sustained focus and anxiety management" },
    { name: "Pure Spectrum CBD Tincture - Calm & Focus", strength: "1,500mg", price: 149, desc: "THC-free pure spectrum CBD tincture optimized for anxiety reduction and mental clarity" },
    { name: "Pure Spectrum CBD Tincture - High Potency", strength: "5,000mg", price: 299, desc: "Concentrated pure spectrum CBD oil for intensive anxiety and focus support. Lab-verified 99%+ purity" },
    { name: "CBG Isolate Powder - Focus Enhancement", strength: "2g (2,000mg)", price: 179, desc: "Pure cannabigerol isolate known as the 'focus cannabinoid' for enhanced concentration and cognitive clarity" },
    { name: "CBD + CBG Isolate Blend - Clarity", strength: "5g (2,500mg each)", price: 279, desc: "Synergistic dual-isolate blend for optimal anxiety relief with enhanced focus. Zero THC, maximum clarity" },
    { name: "Nano CBD Isolate - Rapid Calm", strength: "3g (3,000mg)", price: 269, desc: "Water-soluble nano-emulsified CBD isolate for 4x faster absorption. Instant calm when you need it most" },
    { name: "CBD Isolate Powder - Professional Grade", strength: "28g (28,000mg/1oz)", price: 649, desc: "Professional-grade bulk CBD isolate for practitioners, formulators, and wellness brands. Full batch documentation included" },
    { name: "CBD Isolate Powder - Clinical Strength", strength: "100g (100,000mg)", price: 1899, desc: "Clinical-grade CBD isolate powder for intensive therapeutic protocols. Highest purity available with comprehensive lab documentation" },
    { name: "CBD Isolate Crystals - Mega Pack", strength: "56g (56,000mg/2oz)", price: 999, desc: "Premium CBD isolate crystals in the largest available quantity. Best value per gram for serious wellness enthusiasts" },
    { name: "Pure Spectrum CBD - Clinical Drops", strength: "15,000mg", price: 599, desc: "Maximum concentration pure spectrum CBD for clinical-level anxiety management and sustained focus enhancement" },
  ];

  anxietyProducts.forEach((product) => {
    const variants = ["Standard", "Professional", "Clinical"];
    variants.forEach((variant, vIndex) => {
      const priceMultiplier = vIndex === 2 ? 1.8 : vIndex === 1 ? 1.4 : 1;
      const price = Math.min(750, Math.max(95, Math.round(product.price * priceMultiplier)));
      
      products.push({
        id: `anxiety-${productId}`,
        name: `Medi Spero ${product.name} - ${variant}`,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${variant.toLowerCase()}`,
        category: "anti-anxiety",
        subcategory: "cbd-isolate",
        price: price,
        originalPrice: Math.round(price * 1.2),
        rating: 4.7 + Math.random() * 0.3,
        reviewCount: Math.floor(Math.random() * 350) + 100,
        description: `${product.desc}. This premium CBD isolate formulation is designed for those seeking serious anxiety relief and enhanced focus without prescription medications. 99%+ purity, THC non-detectable, manufactured in cGMP-certified facilities with full third-party lab verification.`,
        shortDescription: `Premium ${product.name} for natural anxiety relief and focus enhancement`,
        images: getProductImages("anti-anxiety", productId),
        sku: `MS-ANX-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 50) + 15,
        strength: product.strength,
        size: variant,
        ingredients: ["99%+ Pure CBD Isolate", "Supercritical CO2 Extracted", "US-Grown Industrial Hemp", "Natural Terpenes"],
        benefits: ["99%+ Purity Verified", "THC Non-Detectable", "Anxiety & Focus Support", "Third-Party Lab Tested", "cGMP Manufactured"],
        usage: "Place desired amount under tongue and hold for 60-90 seconds. Can also be added to food, beverages, or used in custom formulations. Start with 10-25mg and adjust as needed.",
        thirdPartyTested: true,
        organic: true,
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["cbd isolate", "anxiety-relief", "focus", "thc-free", "99-pure", "calm"]
      });
      productId++;
    });
  });

  // MOOD & DEPRESSION SUPPORT ($95-$750)
  const moodProducts = [
    { name: "Delta-9 THC Mood Elevation Gummies", type: "gummies", strength: "750mg D9", price: 179, desc: "Precise-dose Delta-9 gummies for mood enhancement and emotional balance" },
    { name: "Delta-9 THC Professional Tincture", type: "tincture", strength: "1500mg", price: 289, desc: "High-potency Delta-9 tincture for comprehensive mood support" },
    { name: "CBD + Delta-9 Euphoria Chocolates", type: "chocolate", strength: "500mg D9 + 1000mg CBD", price: 229, desc: "Luxury Belgian chocolate with premium cannabinoid infusion" },
    { name: "Delta-10 THC Energy & Mood Cartridge", type: "vape", strength: "2000mg", price: 199, desc: "Uplifting Delta-10 formulation for energy and positive mood" },
    { name: "Full Spectrum Mood Support Capsules", type: "capsules", strength: "5000mg", price: 319, desc: "Complete cannabinoid profile for holistic mood regulation" },
    { name: "Delta-9 + CBD Microdose Tablets", type: "tablets", strength: "150mg D9 + 750mg CBD", price: 159, desc: "Precision microdosing for subtle mood enhancement" },
    { name: "Delta-9 THC + St. John's Wort Blend", type: "capsules", strength: "750mg D9 + 1500mg SJW", price: 349, desc: "Traditional botanical synergy with modern cannabinoid science" },
    { name: "CBD + 5-HTP Serotonin Support", type: "capsules", strength: "3000mg CBD + 500mg 5-HTP", price: 279, desc: "Targeted serotonin pathway support with CBD" },
    { name: "Delta-9 Sublingual Mood Strips", type: "strips", strength: "500mg", price: 119, desc: "Discreet, fast-dissolving strips for on-the-go mood support" },
    { name: "Premium Mood Enhancement Bundle", type: "bundle", strength: "Multi-Product", price: 549, desc: "Complete mood support system with multiple delivery methods" },
  ];

  moodProducts.forEach((product) => {
    const variants = ["30-Day Supply", "60-Day Supply", "90-Day Supply"];
    variants.forEach((variant, vIndex) => {
      const priceMultiplier = vIndex === 2 ? 2.2 : vIndex === 1 ? 1.5 : 1;
      const price = Math.min(750, Math.max(95, Math.round(product.price * priceMultiplier)));
      
      products.push({
        id: `mood-${productId}`,
        name: `Medi Spero ${product.name} - ${variant}`,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${variant.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        category: "mood-support",
        subcategory: product.type,
        price: price,
        originalPrice: Math.round(price * 1.25),
        rating: 4.8 + Math.random() * 0.2,
        reviewCount: Math.floor(Math.random() * 400) + 120,
        description: `${product.desc} This Farm Bill compliant formula contains hemp-derived Delta-9 THC (under 0.3% by dry weight) for legal, effective mood support. Developed in consultation with mental health professionals for optimal therapeutic benefit.`,
        shortDescription: `Premium ${product.name} for natural mood elevation and emotional balance`,
        images: getProductImages("mood-support", productId),
        sku: `MS-MOD-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 40) + 10,
        strength: product.strength,
        size: variant,
        ingredients: ["Hemp-Derived Delta-9 THC", "Full Spectrum CBD", "Organic Botanicals", "Natural Terpenes", "Adaptogenic Herbs"],
        benefits: ["Natural Mood Enhancement", "Emotional Balance Support", "Non-Prescription Formula", "Holistic Approach", "Third-Party Verified"],
        usage: "Take as directed on package. Individual response varies. Start with lower dose and adjust as needed. Not a replacement for professional mental health care.",
        thirdPartyTested: true,
        organic: product.type === "chocolate",
        glutenFree: true,
        vegan: product.type !== "chocolate",
        madeInUSA: true,
        tags: ["delta-9", "mood-support", "premium", "depression-support", "emotional-balance", product.type]
      });
      productId++;
    });
  });

  // ADHD & FOCUS SUPPORT ($95-$750)
  const adhdProducts = [
    { name: "Focus Enhancement CBD Capsules", type: "capsules", strength: "5000mg CBD + 2500mg CBG", price: 289, desc: "Precision-formulated for sustained focus and attention support" },
    { name: "Delta-8 THC Clarity Gummies", type: "gummies", strength: "1500mg Delta-8", price: 179, desc: "Microdosed Delta-8 for calm focus without overstimulation" },
    { name: "CBD + L-Theanine Focus Tincture", type: "tincture", strength: "4000mg + 1500mg", price: 249, desc: "Synergistic blend for enhanced concentration and mental clarity" },
    { name: "CBG Focus Amplifier Softgels", type: "softgels", strength: "3000mg CBG", price: 329, desc: "Pure CBG isolate for targeted cognitive enhancement" },
    { name: "Delta-10 THC Energy & Focus Vape", type: "vape", strength: "2500mg", price: 199, desc: "Uplifting Delta-10 for productive, focused energy" },
    { name: "ADHD Support Complex Capsules", type: "capsules", strength: "Multi-Cannabinoid 7500mg", price: 399, desc: "Comprehensive formula with CBD, CBG, and adaptogenic herbs for ADHD management" },
    { name: "CBD + Ginkgo Biloba Focus Blend", type: "capsules", strength: "4000mg + 1000mg", price: 269, desc: "Traditional nootropic enhanced with premium CBD" },
    { name: "Microdose Focus Sublingual Strips", type: "strips", strength: "1000mg", price: 99, desc: "Convenient, precise dosing for on-the-go focus support" },
    { name: "CBD + Lion's Mane Cognitive Support", type: "capsules", strength: "5000mg + 2000mg", price: 359, desc: "Mushroom-enhanced formula for neural health and focus" },
    { name: "Delta-8 + CBD Study Aid Tincture", type: "tincture", strength: "2000mg + 4000mg", price: 299, desc: "Balanced formula for extended study sessions and mental endurance" },
  ];

  adhdProducts.forEach((product) => {
    const variants = ["Standard", "Professional", "Clinical"];
    variants.forEach((variant, vIndex) => {
      const priceMultiplier = vIndex === 2 ? 1.6 : vIndex === 1 ? 1.3 : 1;
      const price = Math.min(750, Math.max(95, Math.round(product.price * priceMultiplier)));
      
      products.push({
        id: `adhd-${productId}`,
        name: `Medi Spero ${product.name} - ${variant} Strength`,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${variant.toLowerCase()}`,
        category: "adhd-focus",
        subcategory: product.type,
        price: price,
        originalPrice: Math.round(price * 1.2),
        rating: 4.7 + Math.random() * 0.3,
        reviewCount: Math.floor(Math.random() * 300) + 80,
        description: `${product.desc} This premium ADHD support formula is designed for individuals seeking natural alternatives to traditional ADHD medications. Farm Bill compliant and manufactured in cGMP-certified facilities. Consult your healthcare provider before use, especially if taking other medications.`,
        shortDescription: `Premium ${product.name} for natural ADHD and focus support`,
        images: getProductImages("adhd-focus", productId),
        sku: `MS-ADHD-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 45) + 15,
        strength: product.strength,
        size: variant,
        ingredients: ["Premium Hemp Extract", "CBG Isolate", "L-Theanine", "Lion's Mane Extract", "Ginkgo Biloba", "Bacopa Monnieri", "Natural Terpenes"],
        benefits: ["Enhanced Focus & Attention", "Cognitive Clarity", "Non-Stimulant Formula", "Natural ADHD Support", "Third-Party Lab Tested"],
        usage: "Take as directed. Start with the lowest dose and adjust based on individual response. Best taken in the morning or early afternoon. Consult healthcare provider before use.",
        thirdPartyTested: true,
        organic: false,
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["adhd", "focus", "cognitive", "concentration", "attention", product.type]
      });
      productId++;
    });
  });

  // CBD OILS & TINCTURES ($95-$750)
  const oilProducts = [
    { name: "Ultra-Premium Full Spectrum CBD Oil", strength: "10000mg", price: 329, type: "Full Spectrum" },
    { name: "Clinical Strength Broad Spectrum Oil", strength: "7500mg", price: 269, type: "Broad Spectrum" },
    { name: "Pure CBD Isolate Premium Tincture", strength: "15000mg", price: 449, type: "Isolate" },
    { name: "CBD + CBG Wellness Oil", strength: "5000mg + 2500mg", price: 299, type: "Full Spectrum" },
    { name: "Nano-Enhanced Rapid Absorption Oil", strength: "5000mg", price: 349, type: "Nano CBD" },
    { name: "Maximum Potency Full Spectrum", strength: "20000mg", price: 649, type: "Full Spectrum" },
    { name: "CBN + CBD Night Oil", strength: "3000mg + 1500mg", price: 279, type: "Specialty" },
    { name: "Organic Hemp Flower Extract", strength: "8000mg", price: 319, type: "Full Spectrum" },
  ];

  oilProducts.forEach((product) => {
    const flavors = ["Natural", "Mint", "Citrus"];
    flavors.forEach((flavor) => {
      products.push({
        id: `oil-${productId}`,
        name: `Medi Spero ${product.name} - ${product.strength} ${flavor}`,
        slug: `${product.type.toLowerCase().replace(' ', '-')}-oil-${product.strength.toLowerCase()}-${flavor.toLowerCase()}`,
        category: "cbd-oils",
        subcategory: product.type.toLowerCase().replace(' ', '-'),
        price: product.price,
        originalPrice: Math.round(product.price * 1.2),
        rating: 4.7 + Math.random() * 0.3,
        reviewCount: Math.floor(Math.random() * 500) + 100,
        description: `Experience the pinnacle of CBD quality with our ${product.name}. This ${product.strength} premium tincture is crafted from organically grown Colorado hemp using supercritical CO2 extraction. Each batch is third-party tested for potency, purity, and safety. ${product.type} formula with ${flavor} flavor for an exceptional daily wellness experience.`,
        shortDescription: `Ultra-premium ${product.type} CBD Oil with ${product.strength} in ${flavor} flavor`,
        images: getProductImages("cbd-oils", productId),
        sku: `MS-OIL-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 60) + 20,
        strength: product.strength,
        size: "60ml (2 fl oz)",
        servings: 60,
        ingredients: ["Organic Hemp Extract", "Organic MCT Oil", flavor !== "Natural" ? `Natural ${flavor} Flavoring` : ""].filter(Boolean),
        benefits: ["Pharmaceutical-Grade Quality", "Maximum Bioavailability", "Organic Ingredients", "Third-Party Tested"],
        usage: "Take 1 dropper (1ml) under tongue, hold for 60-90 seconds, then swallow. Use 1-2 times daily or as directed.",
        thirdPartyTested: true,
        organic: true,
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["cbd oil", "premium", "tincture", product.type.toLowerCase(), flavor.toLowerCase()]
      });
      productId++;
    });
  });

  // CBD ISOLATE POWDER ($95-$3,900) - Referenced from Extract Labs, Hemp Health Inc, Crescent Canna
  const isolatePowderProducts = [
    { name: "99%+ Pure CBD Isolate Powder", strength: "1g (1,000mg)", price: 95, desc: "Award-winning 99%+ pure CBD isolate powder extracted from premium US-grown hemp using supercritical CO2 extraction. THC non-detectable, perfect for sublingual use or adding to foods and beverages" },
    { name: "Bulk CBD Isolate Powder", strength: "5g (5,000mg)", price: 195, desc: "Pharmaceutical-grade bulk CBD isolate powder for custom formulations, research, and high-volume personal use. Certified 99.7% purity with full panel COA" },
    { name: "Nano CBD Isolate Powder", strength: "10g (10,000mg)", price: 349, desc: "Water-soluble nano-emulsified CBD isolate powder with 4x enhanced bioavailability. Dissolves instantly in any liquid for rapid absorption and maximum efficacy" },
    { name: "CBG Isolate Powder", strength: "5g (5,000mg)", price: 279, desc: "Premium cannabigerol (CBG) isolate powder, the 'mother cannabinoid' known for its potent anti-inflammatory and neuroprotective properties. 99%+ purity verified" },
    { name: "CBN Isolate Powder", strength: "1g (1,000mg)", price: 149, desc: "Ultra-pure cannabinol (CBN) isolate powder for sleep support and relaxation. Extracted from aged hemp using advanced chromatography for exceptional purity" },
    { name: "CBD + CBG Isolate Powder Blend", strength: "10g (5,000mg each)", price: 379, desc: "Synergistic dual-cannabinoid isolate blend combining CBD and CBG for enhanced entourage effects without THC. Ideal for focus, inflammation, and daily wellness" },
    { name: "Wholesale CBD Isolate Powder", strength: "28g (28,000mg/1oz)", price: 549, desc: "Professional-grade wholesale CBD isolate for formulators, practitioners, and wellness brands. Comes with full batch documentation and third-party verification" },
    { name: "Ultra-Fine Micronized CBD Powder", strength: "100g (100,000mg)", price: 1499, desc: "Micronized to sub-10-micron particle size for maximum surface area and absorption. Pharmaceutical-grade processing for consistent, predictable results" },
    { name: "Kilogram CBD Isolate Powder", strength: "1kg (1,000,000mg)", price: 3900, desc: "Bulk kilogram CBD isolate powder for commercial formulation, white-label manufacturing, and large-scale wellness operations. Includes full batch COA and compliance documentation" },
  ];

  isolatePowderProducts.forEach((product) => {
    const sizes = ["Standard", "Professional", "Bulk"];
    sizes.forEach((size, sIndex) => {
      const priceMultiplier = sIndex === 2 ? 1.6 : sIndex === 1 ? 1.3 : 1;
      const price = Math.min(3900, Math.max(95, Math.round(product.price * priceMultiplier)));

      products.push({
        id: `isolate-powder-${productId}`,
        name: `Medi Spero ${product.name} - ${size}`,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${size.toLowerCase()}`,
        category: "cbd-isolate-powder",
        subcategory: "isolate-powder",
        price: price,
        originalPrice: Math.round(price * 1.2),
        rating: 4.8 + Math.random() * 0.2,
        reviewCount: Math.floor(Math.random() * 400) + 120,
        description: `${product.desc}. Manufactured in FDA-registered, cGMP-certified facilities with rigorous quality control at every stage. Each batch undergoes comprehensive third-party testing for potency, purity, heavy metals, pesticides, and residual solvents. Medi Spero CBD Isolate Powder is the gold standard for those seeking THC-free, pharmaceutical-grade cannabidiol.`,
        shortDescription: `Premium ${product.strength} CBD Isolate Powder - 99%+ purity, THC-free`,
        images: getProductImages("cbd-isolate-powder", productId),
        sku: `MS-ISP-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 50) + 15,
        strength: product.strength,
        size: size,
        ingredients: ["99%+ Pure CBD Isolate", "Supercritical CO2 Extracted", "US-Grown Industrial Hemp"],
        benefits: ["99%+ Purity Guaranteed", "THC Non-Detectable", "cGMP Certified", "Full Panel Lab Tested", "Versatile Use"],
        usage: "Place desired amount under tongue and hold for 60-90 seconds. Can also be added to foods, beverages, or used in DIY formulations. Start with 10-25mg and adjust as needed.",
        thirdPartyTested: true,
        organic: true,
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["cbd isolate", "cbd powder", "thc-free", "99% pure", "bulk cbd", "isolate powder"]
      });
      productId++;
    });
  });

  // CBD ISOLATE CRYSTALS ($95-$3,900) - Referenced from Extract Labs, Hemp Health Inc, Crescent Canna
  const isolateCrystalsProducts = [
    { name: "Premium CBD Isolate Crystals", strength: "1g (1,000mg)", price: 99, desc: "Sparkling, translucent CBD isolate crystals with verified 99.9% purity. Perfect for precise dosing, dabbing, or dissolving under the tongue for fast-acting relief" },
    { name: "Therapeutic Grade CBD Crystals", strength: "3.5g (3,500mg)", price: 199, desc: "Medical-grade crystalline CBD with pharmaceutical purity standards. Large, well-formed crystals ideal for sublingual administration and custom tincture preparation" },
    { name: "CBG Isolate Crystals", strength: "5g (5,000mg)", price: 319, desc: "Rare cannabigerol in pure crystalline form for targeted anti-inflammatory, antibacterial, and neuroprotective support. Lab-verified 99%+ purity" },
    { name: "Bulk CBD Isolate Crystals", strength: "14g (14,000mg)", price: 349, desc: "Wholesale-grade CBD isolate crystals for high-volume users and formulators. Consistent crystal structure ensures even dosing and predictable dissolution rates" },
    { name: "Delta-8 THC Isolate Crystals", strength: "5g (5,000mg)", price: 269, desc: "Premium Delta-8 THC in pure crystalline form for experienced users seeking precise, potent cannabinoid therapy. Farm Bill compliant with <0.3% Delta-9 THC" },
    { name: "CBD + CBN Isolate Crystal Blend", strength: "10g (5,000mg each)", price: 449, desc: "Dual-cannabinoid crystal blend optimized for evening use and sleep support. Combines the calming properties of CBD with the sedative benefits of CBN" },
    { name: "Ultra-Pure Research Grade Crystals", strength: "28g (28,000mg/1oz)", price: 599, desc: "Research-grade CBD isolate crystals with comprehensive analytical certification. Suitable for clinical research, product development, and professional formulation" },
    { name: "Kilogram CBD Isolate Crystals", strength: "1kg (1,000,000mg)", price: 3900, desc: "Bulk kilogram CBD isolate crystals for commercial manufacturing. Premium-grade crystalline structure with full batch documentation and compliance certification" },
  ];

  isolateCrystalsProducts.forEach((product) => {
    const sizes = ["Standard", "Professional", "Clinical"];
    sizes.forEach((size, sIndex) => {
      const priceMultiplier = sIndex === 2 ? 1.5 : sIndex === 1 ? 1.25 : 1;
      const price = Math.min(3900, Math.max(95, Math.round(product.price * priceMultiplier)));

      products.push({
        id: `isolate-crystal-${productId}`,
        name: `Medi Spero ${product.name} - ${size}`,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${size.toLowerCase()}`,
        category: "cbd-isolate-crystals",
        subcategory: "isolate-crystals",
        price: price,
        originalPrice: Math.round(price * 1.15),
        rating: 4.7 + Math.random() * 0.3,
        reviewCount: Math.floor(Math.random() * 350) + 100,
        description: `${product.desc}. Every Medi Spero isolate crystal undergoes triple-stage purification and independent third-party verification. Our proprietary crystallization process yields uniform, high-clarity crystals that dissolve consistently for predictable, reliable results every time.`,
        shortDescription: `Pharmaceutical-grade ${product.strength} CBD Isolate Crystals - 99.9% purity`,
        images: getProductImages("cbd-isolate-crystals", productId),
        sku: `MS-ISC-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 40) + 10,
        strength: product.strength,
        size: size,
        ingredients: ["99.9% Pure CBD Isolate Crystals", "CO2 Extracted", "Premium US-Grown Hemp"],
        benefits: ["99.9% Crystalline Purity", "Versatile Administration", "THC Non-Detectable", "Rapid Sublingual Absorption", "Lab Certified"],
        usage: "Place crystals under tongue for 60-90 seconds for sublingual absorption. May also be used for dabbing, vaporizing, or dissolving into carrier oils. Start with 10-25mg.",
        thirdPartyTested: true,
        organic: true,
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["cbd crystals", "cbd isolate", "crystalline cbd", "thc-free", "dabbable", "sublingual"]
      });
      productId++;
    });
  });

  // CBD CAPSULES ($95-$750)
  const capsuleProducts = [
    { name: "Daily Wellness CBD Softgels", formula: "Daily Wellness", strength: "75mg per capsule", price: 129 },
    { name: "Professional Sleep Support Capsules", formula: "Sleep Support", strength: "100mg + CBN per capsule", price: 179 },
    { name: "Athletic Recovery Capsules", formula: "Recovery", strength: "100mg per capsule", price: 159 },
    { name: "Focus & Clarity Capsules", formula: "Focus", strength: "75mg + CBG per capsule", price: 169 },
    { name: "Anti-Inflammatory Support Capsules", formula: "Anti-Inflammatory", strength: "100mg per capsule", price: 189 },
  ];

  capsuleProducts.forEach((product) => {
    const counts = ["60 count", "90 count", "120 count"];
    counts.forEach((count, cIndex) => {
      const priceMultiplier = cIndex === 2 ? 1.8 : cIndex === 1 ? 1.4 : 1;
      const price = Math.min(750, Math.max(95, Math.round(product.price * priceMultiplier)));
      
      products.push({
        id: `capsule-${productId}`,
        name: `Medi Spero ${product.name} (${count})`,
        slug: `${product.formula.toLowerCase().replace(' ', '-')}-capsules-${count.replace(' ', '-')}`,
        category: "cbd-capsules",
        subcategory: product.formula.toLowerCase().replace(' ', '-'),
        price: price,
        originalPrice: Math.round(price * 1.15),
        rating: 4.7 + Math.random() * 0.3,
        reviewCount: Math.floor(Math.random() * 250) + 80,
        description: `Our ${product.name} provide ${product.strength} in an easy-to-swallow softgel format. Perfect for those who prefer precise, consistent dosing without the taste of oils. Manufactured in GMP-certified facilities.`,
        shortDescription: `Premium ${product.formula} CBD Capsules with ${product.strength}`,
        images: getProductImages("cbd-capsules", productId),
        sku: `MS-CAP-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 70) + 20,
        strength: product.strength,
        size: count,
        servings: parseInt(count),
        ingredients: ["Full Spectrum Hemp Extract", "MCT Oil", "Softgel Capsule", "Sunflower Lecithin"],
        benefits: product.formula === "Sleep Support" ? ["Restful Sleep", "Non-Habit Forming", "Wake Refreshed", "Calming"] :
                 product.formula === "Recovery" ? ["Muscle Recovery", "Joint Support", "Athletic Performance", "Anti-Inflammatory"] :
                 product.formula === "Focus" ? ["Mental Clarity", "Concentration", "Productivity", "Cognitive Support"] :
                 ["Daily Wellness", "Balance", "Immune Support", "Overall Health"],
        usage: "Take 1-2 capsules daily with food for best absorption. Use consistently for optimal results.",
        thirdPartyTested: true,
        organic: true,
        glutenFree: true,
        vegan: false,
        madeInUSA: true,
        tags: ["cbd capsules", "premium", product.formula.toLowerCase(), "softgels"]
      });
      productId++;
    });
  });

  // SLEEP & RELAXATION ($95-$750)
  const sleepProducts = [
    { name: "Maximum Strength Sleep Tincture", strength: "5000mg CBD + 1500mg CBN", price: 299 },
    { name: "Premium Nighttime Gummies", strength: "100mg CBD + 30mg CBN + 10mg Melatonin per gummy", price: 249 },
    { name: "Luxury CBD Bath Bomb Collection", strength: "500mg per bomb", price: 129 },
    { name: "Lavender Dream Sleep Spray", strength: "3000mg CBD", price: 179 },
    { name: "Deep Sleep Capsules", strength: "75mg CBD + 25mg CBN per capsule", price: 219 },
  ];

  sleepProducts.forEach((product) => {
    const variants = ["Standard", "Professional", "Clinical"];
    variants.forEach((variant, vIndex) => {
      const priceMultiplier = vIndex === 2 ? 1.6 : vIndex === 1 ? 1.3 : 1;
      const price = Math.min(750, Math.max(95, Math.round(product.price * priceMultiplier)));
      
      products.push({
        id: `sleep-${productId}`,
        name: `Medi Spero ${product.name} - ${variant}`,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${variant.toLowerCase()}`,
        category: "sleep-wellness",
        subcategory: "sleep",
        price: price,
        originalPrice: Math.round(price * 1.2),
        rating: 4.8 + Math.random() * 0.2,
        reviewCount: Math.floor(Math.random() * 400) + 100,
        description: `Experience the deepest, most restorative sleep with our ${product.name}. This premium formula combines ${product.strength} for optimal sleep support. Non-habit forming and crafted with natural ingredients.`,
        shortDescription: `Premium ${product.name} with ${product.strength} for exceptional sleep`,
        images: getProductImages("sleep-wellness", productId),
        sku: `MS-SLP-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 45) + 15,
        strength: product.strength,
        size: variant,
        ingredients: ["Hemp Extract", "CBN", "Lavender Extract", "Chamomile", "Passionflower", "MCT Oil"],
        benefits: ["Deep, Restorative Sleep", "Fall Asleep Faster", "Wake Refreshed", "Non-Habit Forming"],
        usage: "Use 30-60 minutes before bedtime. Do not drive or operate machinery after use.",
        thirdPartyTested: true,
        organic: true,
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["sleep", "cbn", "premium", "relaxation", "nighttime"]
      });
      productId++;
    });
  });

  // CBD ISOLATE PURE SPECTRUM ($95-$3,900) - Referenced from Extract Labs, Hemp Health Inc, Crescent Canna
  const isolatePureSpectrumProducts = [
    { name: "Pure Spectrum CBD Isolate Tincture", strength: "1,500mg", price: 149, desc: "Premium CBD isolate dissolved in organic MCT oil for maximum bioavailability. THC-free pure spectrum formula delivers clean, consistent CBD without any psychoactive compounds" },
    { name: "Pure Spectrum CBD + CBG Tincture", strength: "3,000mg CBD + 1,500mg CBG", price: 299, desc: "Advanced dual-isolate formula combining pure CBD and CBG for synergistic anti-inflammatory and focus-enhancing benefits without THC or other compounds" },
    { name: "Pure Spectrum CBD Softgels", strength: "75mg per softgel (4,500mg total)", price: 229, desc: "Precision-dosed CBD isolate softgels in a pure spectrum formulation. Each capsule delivers exactly 75mg of 99%+ pure CBD for consistent, convenient daily wellness" },
    { name: "Pure Spectrum CBD Isolate Oil", strength: "10,000mg", price: 399, desc: "Ultra-concentrated pure spectrum CBD isolate oil for those seeking maximum potency without THC. Supercritical CO2 extracted and triple-lab verified for pharmaceutical purity" },
    { name: "Pure Spectrum Water-Soluble CBD", strength: "3,000mg", price: 279, desc: "Nano-emulsified pure spectrum CBD isolate in water-soluble format. Up to 5x greater absorption than standard oils, dissolves perfectly in any beverage" },
    { name: "Pure Spectrum CBD + CBN Night Oil", strength: "2,500mg CBD + 1,000mg CBN", price: 269, desc: "Evening-optimized pure spectrum blend combining CBD and CBN isolates for deep, restorative sleep support. THC-free with no morning grogginess" },
    { name: "Pure Spectrum Full Panel Isolate Kit", strength: "Multi-Cannabinoid 7,500mg", price: 449, desc: "Complete pure spectrum kit featuring CBD, CBG, and CBN isolates with mixing tools and dosing guide. Perfect for creating personalized cannabinoid formulations" },
    { name: "Pure Spectrum Clinical CBD Drops", strength: "15,000mg", price: 549, desc: "Clinical-strength pure spectrum CBD drops designed for intensive therapeutic protocols. Highest concentration available with verified 99%+ purity and full analytical documentation" },
    { name: "Pure Spectrum Bulk Isolate Oil", strength: "100,000mg (100g)", price: 2499, desc: "Bulk pure spectrum CBD isolate oil for commercial manufacturing and wholesale operations. Full compliance documentation and batch-specific COA included" },
  ];

  isolatePureSpectrumProducts.forEach((product) => {
    const variants = ["30-Day Supply", "60-Day Supply", "90-Day Supply"];
    variants.forEach((variant, vIndex) => {
      const priceMultiplier = vIndex === 2 ? 1.5 : vIndex === 1 ? 1.25 : 1;
      const price = Math.min(3900, Math.max(95, Math.round(product.price * priceMultiplier)));

      products.push({
        id: `isolate-spectrum-${productId}`,
        name: `Medi Spero ${product.name} - ${variant}`,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${variant.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        category: "cbd-isolate-pure-spectrum",
        subcategory: "pure-spectrum",
        price: price,
        originalPrice: Math.round(price * 1.25),
        rating: 4.8 + Math.random() * 0.2,
        reviewCount: Math.floor(Math.random() * 300) + 100,
        description: `${product.desc}. Medi Spero Pure Spectrum products represent the pinnacle of isolate-based wellness—combining 99%+ purity with advanced delivery systems for unmatched bioavailability. Every product is manufactured in our FDA-registered, cGMP-certified facility and verified by independent laboratories.`,
        shortDescription: `Premium Pure Spectrum ${product.strength} CBD Isolate - THC-free, lab-verified`,
        images: getProductImages("cbd-isolate-pure-spectrum", productId),
        sku: `MS-IPS-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 45) + 12,
        strength: product.strength,
        size: variant,
        ingredients: ["99%+ CBD Isolate", "Organic MCT Oil", "Natural Terpene Blend", "Sunflower Lecithin"],
        benefits: ["THC Non-Detectable", "Pure Spectrum Formulation", "Enhanced Bioavailability", "Pharmaceutical-Grade Purity", "Consistent Dosing"],
        usage: "Take as directed on package. For tinctures: place under tongue and hold 60-90 seconds. For softgels: take with food. Consult healthcare provider before use.",
        thirdPartyTested: true,
        organic: true,
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["pure spectrum", "cbd isolate", "thc-free", "premium", "pharmaceutical-grade", "bioavailable"]
      });
      productId++;
    });
  });

  // CBD SKINCARE ($95-$750)
  const skincareProducts = [
    { name: "Luxury Anti-Aging Face Serum", strength: "2500mg", price: 249 },
    { name: "Premium Hydrating Face Cream", strength: "3000mg", price: 199 },
    { name: "Professional Eye Repair Complex", strength: "1500mg", price: 179 },
    { name: "CBD + Retinol Night Cream", strength: "3000mg + Retinol", price: 289 },
    { name: "Vitamin C + CBD Brightening Serum", strength: "2000mg + Vitamin C", price: 229 },
    { name: "Luxury Body Butter", strength: "5000mg", price: 159 },
  ];

  skincareProducts.forEach((product) => {
    products.push({
      id: `skincare-${productId}`,
      name: `Medi Spero ${product.name} - ${product.strength}`,
      slug: `premium-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      category: "cbd-skincare",
      subcategory: "face-care",
      price: product.price,
      originalPrice: Math.round(product.price * 1.25),
      rating: 4.7 + Math.random() * 0.3,
      reviewCount: Math.floor(Math.random() * 200) + 60,
      description: `Transform your skincare routine with our ${product.name}. This luxurious formula combines ${product.strength} of premium CBD with advanced botanical extracts for visible, lasting results. Dermatologist tested and suitable for all skin types.`,
      shortDescription: `Luxury ${product.name} with ${product.strength} for radiant, youthful skin`,
      images: getProductImages("cbd-skincare", productId),
      sku: `MS-SKN-${productId.toString().padStart(4, '0')}`,
      gtin: `0850${String(productId).padStart(9, '0')}`,
      brand: "Medi Spero",
      inStock: true,
      stockQuantity: Math.floor(Math.random() * 35) + 10,
      strength: product.strength,
      size: "2 oz",
      ingredients: ["Hemp Extract", "Hyaluronic Acid", "Vitamin E", "Jojoba Oil", "Retinol", "Vitamin C", "Aloe Vera"],
      benefits: ["Reduces Fine Lines", "Deep Hydration", "Brightens Skin", "Anti-Aging"],
      usage: "Apply to clean skin morning and/or night. Gently massage until absorbed. Use sunscreen during the day.",
      thirdPartyTested: true,
      organic: true,
      glutenFree: true,
      vegan: true,
      madeInUSA: true,
      tags: ["cbd skincare", "luxury", "anti-aging", "premium", "face-care"]
    });
    productId++;
  });

  // VALUE BUNDLES ($95-$750)
  const bundles = [
    { name: "Complete Wellness System", items: "10000mg Oil + CBD Isolate Powder (5g) + Pure Spectrum Tincture", price: 449 },
    { name: "Ultimate Sleep & Relaxation Kit", items: "Sleep Tincture + CBN Isolate Crystals + Pure Spectrum Night Oil", price: 349 },
    { name: "Professional Pain Relief Bundle", items: "15000mg Oil + CBD Isolate Powder (10g) + Recovery Capsules", price: 549 },
    { name: "Anxiety & Mood Support System", items: "CBD Isolate Powder + Pure Spectrum CBD Softgels + Stress Capsules", price: 399 },
    { name: "CBD Isolate Starter Collection", items: "CBD Isolate Powder (1g) + CBD Crystals (1g) + Pure Spectrum Tincture", price: 249 },
    { name: "Luxury Skincare Complete Set", items: "Serum + Eye Cream + Night Cream + Body Butter", price: 499 },
    { name: "Ultimate Wellness Bundle", items: "Full Product Range - 10+ Premium Items", price: 749 },
    { name: "Pharmaceutical Grade Starter", items: "Pharma Capsules + Tincture + CBD Isolate Powder (5g)", price: 599 },
  ];

  bundles.forEach((bundle) => {
    products.push({
      id: `bundle-${productId}`,
      name: `Medi Spero ${bundle.name}`,
      slug: `premium-${bundle.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      category: "bundles",
      subcategory: "value-bundles",
      price: Math.min(750, bundle.price),
      originalPrice: Math.min(750, Math.round(bundle.price * 1.4)),
      rating: 4.9,
      reviewCount: Math.floor(Math.random() * 150) + 100,
      description: `Our most comprehensive wellness package. The ${bundle.name} includes: ${bundle.items}. Save over 30% compared to individual purchases. Perfect for serious wellness enthusiasts or as an extraordinary gift.`,
      shortDescription: `Premium bundle: ${bundle.items}`,
      images: getProductImages("bundles", productId),
      sku: `MS-BND-${productId.toString().padStart(4, '0')}`,
      gtin: `0850${String(productId).padStart(9, '0')}`,
      brand: "Medi Spero",
      inStock: true,
      stockQuantity: Math.floor(Math.random() * 20) + 5,
      strength: "Varies",
      size: "Complete Bundle",
      ingredients: ["See individual products"],
      benefits: ["Save 30-40%", "Complete Solution", "Premium Quality", "Free Priority Shipping"],
      usage: "See individual product instructions for each item in the bundle.",
      thirdPartyTested: true,
      organic: true,
      glutenFree: true,
      vegan: true,
      madeInUSA: true,
      tags: ["bundle", "premium", "value", "gift", "complete-system"]
    });
    productId++;
  });

  return products;
};

export const products = generateProducts();

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (limit: number = 8): Product[] => {
  // Return products with highest ratings
  return [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
