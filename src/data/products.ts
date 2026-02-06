// Medi Spero - Premium Pharmaceutical CBD/Hemp Product Catalog
// Legal, Farm Bill compliant products only - Premium Pricing ($150-$950)

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
import cbdGummiesImage from "@/assets/products/cbd-gummies.jpg";
import cbdTopicalImage from "@/assets/products/cbd-topical-cream.jpg";
import thcVapeImage from "@/assets/products/thc-vape-cartridge.jpg";
import cbdCapsulesImage from "@/assets/products/cbd-capsules.jpg";
import cbdRollOnImage from "@/assets/products/cbd-roll-on.jpg";
import thcGummiesImage from "@/assets/products/thc-gummies.jpg";
import cbdSleepImage from "@/assets/products/cbd-sleep-tincture.jpg";
import hhcFlowerImage from "@/assets/products/hhc-flower.jpg";
import cbdMassageOilImage from "@/assets/products/cbd-massage-oil.jpg";
import cbdPetTreatsImage from "@/assets/products/cbd-pet-treats.jpg";
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
// Pharmaceutical Capsules images (SEO-optimized: pharmaceutical-grade-cbd-capsule)
import pharmaCapsulesImage from "@/assets/products/pharmaceutical-grade-cbd-capsule.jpg";

// Image pools for each category to provide variety
const imagePoolsByCategory: Record<string, string[]> = {
  "cbd-oils": [cbdOilPharmaGrade, cbdOilFullSpectrum, cbdOilHempTincture, cbdOilGoldenExtract, cbdOilLabCollection, cbdOilScientific, cbdOilPureConcentrate, cbdOilTherapeutic, cbdOilHighPotency],
  "cbd-gummies": [cbdGummiesImage, thcGummiesImage, delta8CalmGummiesImage],
  "cbd-topicals": [cbdTopicalImage, cbdRollOnImage, cbdMassageOilImage],
  "cbd-capsules": [cbdCapsulesImage, cbdMoodSoftgelsImage],
  "sleep-wellness": [cbdSleepImage, cbdBathBombsImage, cbdCalmTeaImage, delta8CalmGummiesImage],
  "pet-cbd": [cbdPetTreatsImage],
  "cbd-skincare": [cbdBathBombsImage, cbdTopicalImage, cbdMassageOilImage],
  "bundles": [cbdOilPharmaGrade, cbdGummiesImage, cbdTopicalImage, cbdCapsulesImage, cbdSleepImage],
  "thc": [thcVapeImage, thcGummiesImage, hhcFlowerImage, thcHempFlowerImage, delta10ChocolateImage],
  "anti-anxiety": [delta8CalmGummiesImage, cbdCalmTeaImage, delta8AnxietyVapeImage, cbdStressSprayImage, cbdMoodSoftgelsImage],
  "mood-support": [delta9MoodTinctureImage, cbdMoodSoftgelsImage, delta10ChocolateImage, delta8CalmGummiesImage, cbdStressSprayImage],
  "pharma-capsules": [pharmaCapsulesImage],
  "adhd-focus": [cbdMoodSoftgelsImage, pharmaCapsulesImage, cbdCapsulesImage, delta10ChocolateImage],
};

// Helper function to get images based on category with rotation for variety
const getProductImages = (category: string, productIndex: number): string[] => {
  const pool = imagePoolsByCategory[category] || [cbdOilPharmaGrade, cbdGummiesImage, cbdTopicalImage];
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
    case "cbd-gummies": return cbdGummiesImage;
    case "cbd-topicals": return cbdTopicalImage;
    case "cbd-capsules": return cbdCapsulesImage;
    case "sleep-wellness": return cbdSleepImage;
    case "pet-cbd": return cbdPetTreatsImage;
    case "cbd-skincare": return cbdBathBombsImage;
    case "bundles": return cbdOilFullSpectrum;
    case "anti-anxiety": return delta8CalmGummiesImage;
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
    name: "Anti-Anxiety & Calm",
    slug: "anti-anxiety",
    description: "Premium Delta-8 THC and CBD products formulated to reduce anxiety and promote calm naturally",
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
    id: "cbd-gummies",
    name: "CBD Gummies",
    slug: "cbd-gummies",
    description: "Delicious, easy-to-dose CBD gummies for stress relief and relaxation",
    image: getCategoryImage("cbd-gummies"),
    productCount: 50
  },
  {
    id: "cbd-topicals",
    name: "CBD Topicals",
    slug: "cbd-topicals",
    description: "Soothing CBD creams, balms, and lotions for targeted relief",
    image: getCategoryImage("cbd-topicals"),
    productCount: 45
  },
  {
    id: "cbd-capsules",
    name: "CBD Capsules",
    slug: "cbd-capsules",
    description: "Convenient, precisely-dosed CBD softgels and capsules",
    image: getCategoryImage("cbd-capsules"),
    productCount: 40
  },
  {
    id: "sleep-wellness",
    name: "Sleep & Relaxation",
    slug: "sleep-wellness",
    description: "CBD products formulated specifically for better sleep and calm",
    image: getCategoryImage("sleep-wellness"),
    productCount: 35
  },
  {
    id: "pet-cbd",
    name: "Pet CBD",
    slug: "pet-cbd",
    description: "Safe, veterinarian-formulated CBD products for your furry friends",
    image: getCategoryImage("pet-cbd"),
    productCount: 25
  },
  {
    id: "cbd-skincare",
    name: "CBD Skincare",
    slug: "cbd-skincare",
    description: "Luxurious CBD-infused skincare for radiant, healthy skin",
    image: getCategoryImage("cbd-skincare"),
    productCount: 30
  },
  {
    id: "bundles",
    name: "Value Bundles",
    slug: "bundles",
    description: "Save more with our curated premium CBD wellness bundles",
    image: getCategoryImage("bundles"),
    productCount: 15
  }
];

// Generate premium-priced products programmatically
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let productId = 1;

  // PHARMACEUTICAL CAPSULES ($380-$700)
  const pharmaFormulas = [
    { name: "Clinical Grade CBD-A + CBD Complex", strength: "5000mg", price: 549, desc: "Pharmaceutical-grade acidic cannabinoid complex for maximum bioavailability" },
    { name: "Delta-9 THC + CBD Therapeutic Capsules", strength: "3000mg + 3000mg", price: 679, desc: "Balanced 1:1 ratio for comprehensive symptom management" },
    { name: "Full Spectrum Nano-Enhanced Softgels", strength: "10000mg", price: 699, desc: "Nano-emulsified for 4x faster absorption than standard capsules" },
    { name: "Delta-8 THC Medical Grade Capsules", strength: "5000mg", price: 589, desc: "Pharmaceutical purity Delta-8 for anxiety and stress management" },
    { name: "CBD + CBN + CBG Entourage Complex", strength: "7500mg Total", price: 649, desc: "Triple cannabinoid formula for enhanced therapeutic effects" },
    { name: "High-Potency CBD Isolate Capsules", strength: "15000mg", price: 699, desc: "99.9% pure CBD isolate in precision-dosed pharmaceutical capsules" },
    { name: "Delta-9 Mood Stabilizer Capsules", strength: "2500mg", price: 529, desc: "Targeted Delta-9 formulation for mood regulation and emotional balance" },
    { name: "CBD + Curcumin Anti-Inflammatory", strength: "6000mg CBD + 2000mg Curcumin", price: 619, desc: "Synergistic anti-inflammatory formula with enhanced bioavailability" },
    { name: "Clinical Sleep Complex Capsules", strength: "5000mg CBD + 1500mg CBN", price: 599, desc: "Pharmaceutical sleep formula with optimized cannabinoid ratios" },
    { name: "Neurological Support Capsules", strength: "8000mg", price: 679, desc: "Targeted support for cognitive function and neural health" },
    { name: "Delta-8 + CBD Anxiety Relief", strength: "4000mg + 4000mg", price: 629, desc: "Dual cannabinoid formula for comprehensive anxiety management" },
    { name: "Medical Grade Recovery Capsules", strength: "10000mg", price: 649, desc: "High-potency formula for post-surgical and athletic recovery" },
    { name: "Endocannabinoid System Optimizer", strength: "7500mg Multi-Cannabinoid", price: 689, desc: "Complete ECS support with full-spectrum cannabinoid profile" },
    { name: "Premium Pharmaceutical CBD-V Blend", strength: "3000mg CBD-V + 5000mg CBD", price: 699, desc: "Rare CBD-V cannabinoid blend for specialized therapeutic needs" },
    { name: "Delta-9 + Delta-8 Synergy Capsules", strength: "2500mg + 2500mg", price: 569, desc: "Dual-THC formula for balanced psychoactive and therapeutic effects" },
  ];

  pharmaFormulas.forEach((formula, index) => {
    const sizes = ["60 count", "90 count", "120 count"];
    sizes.forEach((size, sizeIndex) => {
      const countMultiplier = size.includes("120") ? 1.4 : size.includes("90") ? 1.2 : 1;
      const price = Math.round(formula.price * countMultiplier);
      const originalPrice = Math.round(price * 1.15);
      
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

  // ANTI-ANXIETY & CALM PRODUCTS ($150-$550)
  const anxietyProducts = [
    { name: "Delta-8 THC Professional Calm Gummies", type: "gummies", strength: "1500mg", price: 249, desc: "Clinical-strength Delta-8 gummies for profound anxiety relief" },
    { name: "Delta-8 THC Medical Vaporizer Kit", type: "vape", strength: "3000mg", price: 389, desc: "Complete medical-grade vaporizer system with premium distillate" },
    { name: "CBD + Delta-8 Anxiolytic Tincture", type: "tincture", strength: "5000mg + 2500mg", price: 449, desc: "Dual-action formula for comprehensive anxiety management" },
    { name: "Delta-8 THC Extended Release Softgels", type: "softgels", strength: "3000mg", price: 329, desc: "Time-release technology for all-day calm" },
    { name: "Premium CBD Calm Tea Collection", type: "tea", strength: "2000mg", price: 189, desc: "Luxury organic tea blend with therapeutic CBD levels" },
    { name: "Delta-8 Sublingual Anti-Anxiety Spray", type: "spray", strength: "2500mg", price: 279, desc: "Fast-acting sublingual spray for acute anxiety episodes" },
    { name: "Delta-8 + CBN Nighttime Calm", type: "tincture", strength: "4000mg + 1500mg", price: 419, desc: "Evening formula for anxiety-related sleep issues" },
    { name: "CBD + L-Theanine Calm Complex", type: "capsules", strength: "5000mg CBD + 1000mg L-Theanine", price: 369, desc: "Synergistic calm formula with amino acid support" },
    { name: "Delta-8 THC Premium Flower Collection", type: "flower", strength: "28g High-Potency", price: 489, desc: "Premium Delta-8 infused hemp flower for traditional consumption" },
    { name: "CBD + Ashwagandha Stress Relief", type: "capsules", strength: "4000mg + 1500mg", price: 339, desc: "Adaptogenic blend for chronic stress management" },
  ];

  anxietyProducts.forEach((product) => {
    const variants = product.type === "flower" ? ["14g", "28g"] : ["Standard", "Professional", "Clinical"];
    variants.forEach((variant, vIndex) => {
      const priceMultiplier = vIndex === 2 ? 1.8 : vIndex === 1 ? 1.4 : 1;
      const price = Math.round(product.price * priceMultiplier);
      
      products.push({
        id: `anxiety-${productId}`,
        name: `Medi Spero ${product.name} - ${variant} Strength`,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${variant.toLowerCase()}`,
        category: "anti-anxiety",
        subcategory: product.type,
        price: price,
        originalPrice: Math.round(price * 1.2),
        rating: 4.7 + Math.random() * 0.3,
        reviewCount: Math.floor(Math.random() * 350) + 100,
        description: `${product.desc} This premium formulation is designed for those seeking serious anxiety relief without prescription medications. Farm Bill compliant with less than 0.3% Delta-9 THC. Manufactured in our state-of-the-art facilities with pharmaceutical-grade standards.`,
        shortDescription: `Premium ${product.name} for professional-grade anxiety relief`,
        images: getProductImages("anti-anxiety", productId),
        sku: `MS-ANX-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 50) + 15,
        strength: product.strength,
        size: variant,
        ingredients: ["Premium Delta-8 THC Distillate", "Full Spectrum CBD Extract", "Organic MCT Oil", "Natural Terpenes", "L-Theanine", "Ashwagandha Extract"],
        benefits: ["Clinically-Formulated Anxiety Relief", "Non-Prescription Alternative", "Fast-Acting Formula", "Third-Party Lab Tested", "No Prescription Required"],
        usage: "Use as directed. Start with lowest dose and adjust based on individual response. Consult healthcare provider if taking other medications.",
        thirdPartyTested: true,
        organic: product.type === "tea" || product.type === "flower",
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["delta-8", "anti-anxiety", "premium", "calm", "stress-relief", product.type]
      });
      productId++;
    });
  });

  // MOOD & DEPRESSION SUPPORT ($180-$650)
  const moodProducts = [
    { name: "Delta-9 THC Mood Elevation Gummies", type: "gummies", strength: "750mg D9", price: 279, desc: "Precise-dose Delta-9 gummies for mood enhancement and emotional balance" },
    { name: "Delta-9 THC Professional Tincture", type: "tincture", strength: "1500mg", price: 389, desc: "High-potency Delta-9 tincture for comprehensive mood support" },
    { name: "CBD + Delta-9 Euphoria Chocolates", type: "chocolate", strength: "500mg D9 + 1000mg CBD", price: 329, desc: "Luxury Belgian chocolate with premium cannabinoid infusion" },
    { name: "Delta-10 THC Energy & Mood Cartridge", type: "vape", strength: "2000mg", price: 299, desc: "Uplifting Delta-10 formulation for energy and positive mood" },
    { name: "Full Spectrum Mood Support Capsules", type: "capsules", strength: "5000mg", price: 419, desc: "Complete cannabinoid profile for holistic mood regulation" },
    { name: "Delta-9 + CBD Microdose Tablets", type: "tablets", strength: "150mg D9 + 750mg CBD", price: 259, desc: "Precision microdosing for subtle mood enhancement" },
    { name: "Delta-9 THC + St. John's Wort Blend", type: "capsules", strength: "750mg D9 + 1500mg SJW", price: 449, desc: "Traditional botanical synergy with modern cannabinoid science" },
    { name: "CBD + 5-HTP Serotonin Support", type: "capsules", strength: "3000mg CBD + 500mg 5-HTP", price: 379, desc: "Targeted serotonin pathway support with CBD" },
    { name: "Delta-9 Sublingual Mood Strips", type: "strips", strength: "500mg", price: 219, desc: "Discreet, fast-dissolving strips for on-the-go mood support" },
    { name: "Premium Mood Enhancement Bundle", type: "bundle", strength: "Multi-Product", price: 649, desc: "Complete mood support system with multiple delivery methods" },
  ];

  moodProducts.forEach((product) => {
    const variants = ["30-Day Supply", "60-Day Supply", "90-Day Supply"];
    variants.forEach((variant, vIndex) => {
      const priceMultiplier = vIndex === 2 ? 2.2 : vIndex === 1 ? 1.5 : 1;
      const price = Math.round(product.price * priceMultiplier);
      
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

  // ADHD & FOCUS SUPPORT ($175-$599)
  const adhdProducts = [
    { name: "Focus Enhancement CBD Capsules", type: "capsules", strength: "5000mg CBD + 2500mg CBG", price: 389, desc: "Precision-formulated for sustained focus and attention support" },
    { name: "Delta-8 THC Clarity Gummies", type: "gummies", strength: "1500mg Delta-8", price: 279, desc: "Microdosed Delta-8 for calm focus without overstimulation" },
    { name: "CBD + L-Theanine Focus Tincture", type: "tincture", strength: "4000mg + 1500mg", price: 349, desc: "Synergistic blend for enhanced concentration and mental clarity" },
    { name: "CBG Focus Amplifier Softgels", type: "softgels", strength: "3000mg CBG", price: 429, desc: "Pure CBG isolate for targeted cognitive enhancement" },
    { name: "Delta-10 THC Energy & Focus Vape", type: "vape", strength: "2500mg", price: 299, desc: "Uplifting Delta-10 for productive, focused energy" },
    { name: "ADHD Support Complex Capsules", type: "capsules", strength: "Multi-Cannabinoid 7500mg", price: 499, desc: "Comprehensive formula with CBD, CBG, and adaptogenic herbs for ADHD management" },
    { name: "CBD + Ginkgo Biloba Focus Blend", type: "capsules", strength: "4000mg + 1000mg", price: 369, desc: "Traditional nootropic enhanced with premium CBD" },
    { name: "Microdose Focus Sublingual Strips", type: "strips", strength: "1000mg", price: 199, desc: "Convenient, precise dosing for on-the-go focus support" },
    { name: "CBD + Lion's Mane Cognitive Support", type: "capsules", strength: "5000mg + 2000mg", price: 459, desc: "Mushroom-enhanced formula for neural health and focus" },
    { name: "Delta-8 + CBD Study Aid Tincture", type: "tincture", strength: "2000mg + 4000mg", price: 399, desc: "Balanced formula for extended study sessions and mental endurance" },
  ];

  adhdProducts.forEach((product) => {
    const variants = ["Standard", "Professional", "Clinical"];
    variants.forEach((variant, vIndex) => {
      const priceMultiplier = vIndex === 2 ? 1.6 : vIndex === 1 ? 1.3 : 1;
      const price = Math.round(product.price * priceMultiplier);
      
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

  // CBD OILS & TINCTURES ($175-$750)
  const oilProducts = [
    { name: "Ultra-Premium Full Spectrum CBD Oil", strength: "10000mg", price: 429, type: "Full Spectrum" },
    { name: "Clinical Strength Broad Spectrum Oil", strength: "7500mg", price: 369, type: "Broad Spectrum" },
    { name: "Pure CBD Isolate Premium Tincture", strength: "15000mg", price: 549, type: "Isolate" },
    { name: "CBD + CBG Wellness Oil", strength: "5000mg + 2500mg", price: 399, type: "Full Spectrum" },
    { name: "Nano-Enhanced Rapid Absorption Oil", strength: "5000mg", price: 449, type: "Nano CBD" },
    { name: "Maximum Potency Full Spectrum", strength: "20000mg", price: 749, type: "Full Spectrum" },
    { name: "CBN + CBD Night Oil", strength: "3000mg + 1500mg", price: 379, type: "Specialty" },
    { name: "Organic Hemp Flower Extract", strength: "8000mg", price: 419, type: "Full Spectrum" },
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

  // CBD GUMMIES ($150-$450)
  const gummyProducts = [
    { name: "Professional Strength Sleep Gummies", type: "Sleep", strength: "100mg CBD + 25mg CBN per gummy", price: 349, count: "30 count" },
    { name: "Clinical Calm CBD Gummies", type: "Calm", strength: "75mg per gummy", price: 299, count: "30 count" },
    { name: "High-Potency Recovery Gummies", type: "Recovery", strength: "100mg per gummy", price: 379, count: "30 count" },
    { name: "Focus & Clarity Premium Gummies", type: "Focus", strength: "50mg CBD + 25mg CBG per gummy", price: 329, count: "30 count" },
    { name: "Immune Support CBD Gummies", type: "Immunity", strength: "75mg per gummy", price: 289, count: "30 count" },
    { name: "Daily Wellness Premium Gummies", type: "Wellness", strength: "100mg per gummy", price: 349, count: "30 count" },
  ];

  gummyProducts.forEach((product) => {
    const sizes = ["30 count", "60 count", "90 count"];
    sizes.forEach((size, sIndex) => {
      const priceMultiplier = sIndex === 2 ? 2.4 : sIndex === 1 ? 1.7 : 1;
      const price = Math.round(product.price * priceMultiplier);
      
      products.push({
        id: `gummy-${productId}`,
        name: `Medi Spero ${product.name} (${size})`,
        slug: `${product.type.toLowerCase()}-premium-gummies-${size.replace(' ', '-')}`,
        category: "cbd-gummies",
        subcategory: product.type.toLowerCase(),
        price: price,
        originalPrice: Math.round(price * 1.2),
        rating: 4.8 + Math.random() * 0.2,
        reviewCount: Math.floor(Math.random() * 600) + 150,
        description: `Our ${product.name} represent the pinnacle of edible CBD. Each gummy contains ${product.strength} of pharmaceutical-grade cannabinoids for maximum effectiveness. Made with organic fruit purees and natural flavors. Vegan, gluten-free, and delicious.`,
        shortDescription: `Premium ${product.type} CBD Gummies with ${product.strength}`,
        images: getProductImages("cbd-gummies", productId),
        sku: `MS-GUM-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 80) + 25,
        strength: product.strength,
        size: size,
        servings: parseInt(size),
        ingredients: ["Broad Spectrum Hemp Extract", "Organic Cane Sugar", "Organic Fruit Puree", "Pectin", "Natural Flavors", "Citric Acid"],
        benefits: product.type === "Sleep" ? ["Deep, Restful Sleep", "Non-Habit Forming", "Wake Refreshed", "Natural Formula"] :
                 product.type === "Calm" ? ["Anxiety Relief", "Stress Reduction", "Mental Clarity", "Daily Calm"] :
                 product.type === "Recovery" ? ["Athletic Recovery", "Muscle Relief", "Joint Support", "Performance"] :
                 product.type === "Focus" ? ["Enhanced Focus", "Mental Clarity", "Productivity", "Concentration"] :
                 product.type === "Immunity" ? ["Immune Support", "Antioxidant Rich", "Daily Defense", "Wellness"] :
                 ["Daily Wellness", "Balance", "Energy", "Vitality"],
        usage: "Take 1-2 gummies daily or as needed. Best taken consistently for optimal results.",
        thirdPartyTested: true,
        organic: false,
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["cbd gummies", "premium", product.type.toLowerCase(), "edibles"]
      });
      productId++;
    });
  });

  // CBD TOPICALS ($175-$450)
  const topicalProducts = [
    { name: "Medical Grade Relief Cream", strength: "5000mg", price: 299, type: "cream" },
    { name: "Professional Muscle Recovery Balm", strength: "4000mg", price: 279, type: "balm" },
    { name: "Clinical Cooling Roll-On Gel", strength: "3000mg", price: 229, type: "roll-on" },
    { name: "Premium Sports Recovery Lotion", strength: "5000mg", price: 319, type: "lotion" },
    { name: "Therapeutic Massage Oil", strength: "6000mg", price: 349, type: "oil" },
    { name: "Intensive Warming Salve", strength: "4500mg", price: 289, type: "salve" },
  ];

  topicalProducts.forEach((product) => {
    const sizes = ["2 oz", "4 oz", "8 oz"];
    sizes.forEach((size, sIndex) => {
      const priceMultiplier = sIndex === 2 ? 2.2 : sIndex === 1 ? 1.5 : 1;
      const price = Math.round(product.price * priceMultiplier);
      
      products.push({
        id: `topical-${productId}`,
        name: `Medi Spero ${product.name} - ${product.strength} (${size})`,
        slug: `premium-${product.type}-${product.strength.toLowerCase()}-${size.replace(' ', '')}`,
        category: "cbd-topicals",
        subcategory: product.type,
        price: price,
        originalPrice: Math.round(price * 1.15),
        rating: 4.6 + Math.random() * 0.4,
        reviewCount: Math.floor(Math.random() * 300) + 80,
        description: `Our ${product.name} delivers ${product.strength} of full-spectrum CBD directly to affected areas. Enhanced with premium botanicals and essential oils for maximum therapeutic benefit. Fast-absorbing, non-greasy formula perfect for targeted relief.`,
        shortDescription: `Professional-grade ${product.name} with ${product.strength} CBD`,
        images: getProductImages("cbd-topicals", productId),
        sku: `MS-TOP-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 50) + 15,
        strength: product.strength,
        size: size,
        ingredients: ["Full Spectrum Hemp Extract", "Organic Aloe Vera", "Shea Butter", "Arnica", "Menthol", "Eucalyptus", "Vitamin E"],
        benefits: ["Deep Penetrating Relief", "Fast Absorption", "Long-Lasting Effects", "Pharmaceutical Grade"],
        usage: "Apply generously to affected areas and massage until absorbed. Reapply as needed throughout the day.",
        thirdPartyTested: true,
        organic: true,
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["cbd topical", "premium", product.type, "relief", "pain-management"]
      });
      productId++;
    });
  });

  // CBD CAPSULES (Standard line, not pharma) ($150-$400)
  const capsuleProducts = [
    { name: "Daily Wellness CBD Softgels", formula: "Daily Wellness", strength: "75mg per capsule", price: 229 },
    { name: "Professional Sleep Support Capsules", formula: "Sleep Support", strength: "100mg + CBN per capsule", price: 279 },
    { name: "Athletic Recovery Capsules", formula: "Recovery", strength: "100mg per capsule", price: 259 },
    { name: "Focus & Clarity Capsules", formula: "Focus", strength: "75mg + CBG per capsule", price: 269 },
    { name: "Anti-Inflammatory Support Capsules", formula: "Anti-Inflammatory", strength: "100mg per capsule", price: 289 },
  ];

  capsuleProducts.forEach((product) => {
    const counts = ["60 count", "90 count", "120 count"];
    counts.forEach((count, cIndex) => {
      const priceMultiplier = cIndex === 2 ? 1.8 : cIndex === 1 ? 1.4 : 1;
      const price = Math.round(product.price * priceMultiplier);
      
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

  // SLEEP & RELAXATION ($175-$450)
  const sleepProducts = [
    { name: "Maximum Strength Sleep Tincture", strength: "5000mg CBD + 1500mg CBN", price: 399 },
    { name: "Premium Nighttime Gummies", strength: "100mg CBD + 30mg CBN + 10mg Melatonin per gummy", price: 349 },
    { name: "Luxury CBD Bath Bomb Collection", strength: "500mg per bomb", price: 189 },
    { name: "Lavender Dream Sleep Spray", strength: "3000mg CBD", price: 279 },
    { name: "Deep Sleep Capsules", strength: "75mg CBD + 25mg CBN per capsule", price: 319 },
  ];

  sleepProducts.forEach((product) => {
    const variants = ["Standard", "Professional", "Clinical"];
    variants.forEach((variant, vIndex) => {
      const priceMultiplier = vIndex === 2 ? 1.6 : vIndex === 1 ? 1.3 : 1;
      const price = Math.round(product.price * priceMultiplier);
      
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

  // PET CBD ($150-$350)
  const petProducts = [
    { name: "Professional Grade Dog CBD Oil", pet: "Dog", strength: "3000mg", price: 249 },
    { name: "Calming Dog Treats Premium", pet: "Dog", strength: "50mg per treat", price: 199 },
    { name: "Dog Joint Support Formula", pet: "Dog", strength: "2500mg + Glucosamine", price: 279 },
    { name: "Premium Cat CBD Oil", pet: "Cat", strength: "1500mg", price: 189 },
    { name: "Calming Cat Treats", pet: "Cat", strength: "25mg per treat", price: 169 },
  ];

  petProducts.forEach((product) => {
    const sizes = ["Standard", "Large", "Family"];
    sizes.forEach((size, sIndex) => {
      const priceMultiplier = sIndex === 2 ? 1.8 : sIndex === 1 ? 1.4 : 1;
      const price = Math.round(product.price * priceMultiplier);
      
      products.push({
        id: `pet-${productId}`,
        name: `Medi Spero ${product.name} - ${size} Size`,
        slug: `${product.pet.toLowerCase()}-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${size.toLowerCase()}`,
        category: "pet-cbd",
        subcategory: product.pet.toLowerCase(),
        price: price,
        originalPrice: Math.round(price * 1.15),
        rating: 4.9,
        reviewCount: Math.floor(Math.random() * 200) + 80,
        description: `Veterinarian-formulated premium CBD for your beloved ${product.pet.toLowerCase()}. Our ${product.name} contains ${product.strength} of THC-free broad-spectrum CBD, specifically designed for pet safety and wellness.`,
        shortDescription: `Vet-formulated ${product.name} with ${product.strength} for ${product.pet.toLowerCase()}s`,
        images: getProductImages("pet-cbd", productId),
        sku: `MS-PET-${productId.toString().padStart(4, '0')}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 40) + 15,
        strength: product.strength,
        size: size,
        ingredients: ["Broad Spectrum Hemp Extract (0% THC)", "Salmon Oil", "Natural Flavoring", "MCT Oil"],
        benefits: ["Calming Effect", "Joint Support", "Anxiety Relief", "Overall Wellness"],
        usage: "Administer based on pet weight. See dosing chart on package. Consult veterinarian before use.",
        thirdPartyTested: true,
        organic: true,
        glutenFree: true,
        vegan: false,
        madeInUSA: true,
        tags: ["pet cbd", product.pet.toLowerCase(), "premium", "veterinarian-formulated"]
      });
      productId++;
    });
  });

  // CBD SKINCARE ($175-$450)
  const skincareProducts = [
    { name: "Luxury Anti-Aging Face Serum", strength: "2500mg", price: 349 },
    { name: "Premium Hydrating Face Cream", strength: "3000mg", price: 299 },
    { name: "Professional Eye Repair Complex", strength: "1500mg", price: 279 },
    { name: "CBD + Retinol Night Cream", strength: "3000mg + Retinol", price: 389 },
    { name: "Vitamin C + CBD Brightening Serum", strength: "2000mg + Vitamin C", price: 329 },
    { name: "Luxury Body Butter", strength: "5000mg", price: 259 },
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

  // VALUE BUNDLES ($450-$950)
  const bundles = [
    { name: "Complete Wellness System", items: "10000mg Oil + 100mg Gummies (60ct) + 5000mg Cream", price: 749 },
    { name: "Ultimate Sleep & Relaxation Kit", items: "Sleep Tincture + CBN Gummies + Bath Bombs + Spray", price: 649 },
    { name: "Professional Pain Relief Bundle", items: "15000mg Oil + Medical Cream + Recovery Capsules", price: 849 },
    { name: "Anxiety & Mood Support System", items: "Delta-8 Tincture + Calm Gummies + Stress Capsules", price: 699 },
    { name: "Premium Pet Parent Collection", items: "Dog Oil (3000mg) + Cat Oil + Treats + Joint Support", price: 549 },
    { name: "Luxury Skincare Complete Set", items: "Serum + Eye Cream + Night Cream + Body Butter", price: 799 },
    { name: "Ultimate Wellness Bundle", items: "Full Product Range - 10+ Premium Items", price: 949 },
    { name: "Pharmaceutical Grade Starter", items: "Pharma Capsules + Tincture + Topical", price: 899 },
  ];

  bundles.forEach((bundle) => {
    products.push({
      id: `bundle-${productId}`,
      name: `Medi Spero ${bundle.name}`,
      slug: `premium-${bundle.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      category: "bundles",
      subcategory: "value-bundles",
      price: bundle.price,
      originalPrice: Math.round(bundle.price * 1.4),
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
