// Lightweight categories data — no image imports for fast initial load
// The `image` field is populated lazily when products.ts is loaded

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
    image: "",
    productCount: 35
  },
  {
    id: "adhd-focus",
    name: "ADHD & Focus Support",
    slug: "adhd-focus",
    description: "Specialized CBD and cannabinoid formulas designed to support focus, attention, and cognitive clarity for ADHD management",
    image: "",
    productCount: 40
  },
  {
    id: "anti-anxiety",
    name: "Anxiety & Focus",
    slug: "anti-anxiety",
    description: "Premium CBD isolate products formulated for anxiety relief and enhanced focus. 99%+ pure, THC-free isolate in powder, crystal, and tincture forms for targeted calm and clarity",
    image: "",
    productCount: 45
  },
  {
    id: "mood-support",
    name: "Mood & Depression Support",
    slug: "mood-support",
    description: "High-potency hemp-derived Delta-9 and CBD products to support positive mood and emotional balance",
    image: "",
    productCount: 40
  },
  {
    id: "cbd-oils",
    name: "CBD Oils & Tinctures",
    slug: "cbd-oils",
    description: "Premium full-spectrum and broad-spectrum CBD oils for daily wellness support",
    image: "",
    productCount: 65
  },
  {
    id: "cbd-isolate-powder",
    name: "99% Pure CBD Isolate Powder",
    slug: "cbd-isolate-powder",
    description: "99% pure CBD isolate powder extracted from premium US-grown hemp. THC-free, lab-tested, perfect for custom formulations and precise dosing",
    image: "",
    productCount: 40
  },
  {
    id: "cbd-isolate-crystals",
    name: "99% Pure CBD Isolate Crystals",
    slug: "cbd-isolate-crystals",
    description: "Pharmaceutical-grade 99% pure CBD isolate crystals. Versatile, THC-free crystalline CBD for sublingual use, dabbing, or DIY formulations",
    image: "",
    productCount: 35
  },
  {
    id: "cbd-isolate-pure-spectrum",
    name: "99% Pure CBD Isolate Pure Spectrum",
    slug: "cbd-isolate-pure-spectrum",
    description: "Premium 99% pure spectrum CBD isolate products combining 99% CBD purity with targeted cannabinoid blends for enhanced therapeutic benefits",
    image: "",
    productCount: 35
  },
  {
    id: "cbd-vape",
    name: "CBD Vape",
    slug: "cbd-vape",
    description: "Premium CBD vape cartridges, disposable pens, and pods with full-spectrum and broad-spectrum formulations for fast-acting relief",
    image: "",
    productCount: 24
  },
  {
    id: "cbd-capsules",
    name: "CBD Capsules",
    slug: "cbd-capsules",
    description: "Premium CBD softgel capsules for convenient, precise daily dosing",
    image: "",
    productCount: 15
  },
  {
    id: "sleep-wellness",
    name: "Sleep & Wellness",
    slug: "sleep-wellness",
    description: "Premium CBD and CBN sleep formulas for deep, restorative rest",
    image: "",
    productCount: 15
  },
  {
    id: "cbd-skincare",
    name: "CBD Skincare",
    slug: "cbd-skincare",
    description: "Luxurious CBD-infused skincare for radiant, healthy skin",
    image: "",
    productCount: 6
  },
  {
    id: "bundles",
    name: "Value Bundles",
    slug: "bundles",
    description: "Save more with our curated premium CBD wellness bundles",
    image: "",
    productCount: 8
  }
];
