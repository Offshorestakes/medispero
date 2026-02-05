// Medi Spero - CBD/Hemp Product Catalog
// Legal, Farm Bill compliant products only

// Import product images
import cbdOilImage from "@/assets/products/cbd-oil-tincture.jpg";
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
// New product images
import delta8CalmGummiesImage from "@/assets/products/delta8-calm-gummies.jpg";
import delta9MoodTinctureImage from "@/assets/products/delta9-mood-tincture.jpg";
import cbdMoodSoftgelsImage from "@/assets/products/cbd-mood-softgels.jpg";
import delta8AnxietyVapeImage from "@/assets/products/delta8-anxiety-vape.jpg";
import cbdStressSprayImage from "@/assets/products/cbd-stress-spray.jpg";
import thcHempFlowerImage from "@/assets/products/thc-hemp-flower.jpg";
import cbdCalmTeaImage from "@/assets/products/cbd-calm-tea.jpg";
import delta10ChocolateImage from "@/assets/products/delta10-chocolate.jpg";

// Image pools for each category to provide variety
const imagePoolsByCategory: Record<string, string[]> = {
  "cbd-oils": [cbdOilImage, cbdSleepImage, cbdMassageOilImage, delta9MoodTinctureImage],
  "cbd-gummies": [cbdGummiesImage, thcGummiesImage, delta8CalmGummiesImage],
  "cbd-topicals": [cbdTopicalImage, cbdRollOnImage, cbdMassageOilImage],
  "cbd-capsules": [cbdCapsulesImage, cbdMoodSoftgelsImage],
  "sleep-wellness": [cbdSleepImage, cbdBathBombsImage, cbdCalmTeaImage, delta8CalmGummiesImage],
  "pet-cbd": [cbdPetTreatsImage],
  "cbd-skincare": [cbdBathBombsImage, cbdTopicalImage, cbdMassageOilImage],
  "bundles": [cbdOilImage, cbdGummiesImage, cbdTopicalImage, cbdCapsulesImage, cbdSleepImage],
  "thc": [thcVapeImage, thcGummiesImage, hhcFlowerImage, thcHempFlowerImage, delta10ChocolateImage],
  "anti-anxiety": [delta8CalmGummiesImage, cbdCalmTeaImage, delta8AnxietyVapeImage, cbdStressSprayImage, cbdMoodSoftgelsImage],
  "mood-support": [delta9MoodTinctureImage, cbdMoodSoftgelsImage, delta10ChocolateImage, delta8CalmGummiesImage, cbdStressSprayImage],
};

// Helper function to get images based on category with rotation for variety
const getProductImages = (category: string, productIndex: number): string[] => {
  const pool = imagePoolsByCategory[category] || [cbdOilImage, cbdGummiesImage, cbdTopicalImage];
  // Rotate primary image based on product index for visual variety
  const primaryIndex = productIndex % pool.length;
  const primaryImage = pool[primaryIndex];
  // Create gallery with rotated order
  const gallery = [primaryImage];
  for (let i = 1; i < pool.length; i++) {
    gallery.push(pool[(primaryIndex + i) % pool.length]);
  }
  return gallery;
};

// Category images mapping
const getCategoryImage = (categoryId: string): string => {
  switch (categoryId) {
    case "cbd-oils": return cbdOilImage;
    case "cbd-gummies": return cbdGummiesImage;
    case "cbd-topicals": return cbdTopicalImage;
    case "cbd-capsules": return cbdCapsulesImage;
    case "sleep-wellness": return cbdSleepImage;
    case "pet-cbd": return cbdPetTreatsImage;
    case "cbd-skincare": return cbdBathBombsImage;
    case "bundles": return cbdOilImage;
    case "anti-anxiety": return delta8CalmGummiesImage;
    case "mood-support": return delta9MoodTinctureImage;
    default: return cbdOilImage;
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
    id: "cbd-oils",
    name: "CBD Oils & Tinctures",
    slug: "cbd-oils",
    description: "Premium full-spectrum and broad-spectrum CBD oils for daily wellness support",
    image: getCategoryImage("cbd-oils"),
    productCount: 85
  },
  {
    id: "cbd-gummies",
    name: "CBD Gummies",
    slug: "cbd-gummies",
    description: "Delicious, easy-to-dose CBD gummies for stress relief and relaxation",
    image: getCategoryImage("cbd-gummies"),
    productCount: 65
  },
  {
    id: "cbd-topicals",
    name: "CBD Topicals",
    slug: "cbd-topicals",
    description: "Soothing CBD creams, balms, and lotions for targeted relief",
    image: getCategoryImage("cbd-topicals"),
    productCount: 70
  },
  {
    id: "cbd-capsules",
    name: "CBD Capsules",
    slug: "cbd-capsules",
    description: "Convenient, precisely-dosed CBD softgels and capsules",
    image: getCategoryImage("cbd-capsules"),
    productCount: 55
  },
  {
    id: "sleep-wellness",
    name: "Sleep & Relaxation",
    slug: "sleep-wellness",
    description: "CBD products formulated specifically for better sleep and calm",
    image: getCategoryImage("sleep-wellness"),
    productCount: 60
  },
  {
    id: "pet-cbd",
    name: "Pet CBD",
    slug: "pet-cbd",
    description: "Safe, veterinarian-formulated CBD products for your furry friends",
    image: getCategoryImage("pet-cbd"),
    productCount: 40
  },
  {
    id: "cbd-skincare",
    name: "CBD Skincare",
    slug: "cbd-skincare",
    description: "Luxurious CBD-infused skincare for radiant, healthy skin",
    image: getCategoryImage("cbd-skincare"),
    productCount: 50
  },
  {
    id: "bundles",
    name: "Value Bundles",
    slug: "bundles",
    description: "Save more with our curated CBD wellness bundles",
    image: getCategoryImage("bundles"),
    productCount: 25
  },
  {
    id: "anti-anxiety",
    name: "Anti-Anxiety & Calm",
    slug: "anti-anxiety",
    description: "Delta-8 THC and CBD products formulated to reduce anxiety and promote calm naturally",
    image: getCategoryImage("anti-anxiety"),
    productCount: 45
  },
  {
    id: "mood-support",
    name: "Mood & Depression Support",
    slug: "mood-support",
    description: "Hemp-derived Delta-9 and CBD products to support positive mood and emotional balance",
    image: getCategoryImage("mood-support"),
    productCount: 40
  }
];

// Generate products programmatically for scalability
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  // CBD Oils
  const oilStrengths = ["300mg", "500mg", "750mg", "1000mg", "1500mg", "2000mg", "3000mg", "5000mg"];
  const oilFlavors = ["Natural", "Mint", "Citrus", "Berry", "Vanilla", "Unflavored"];
  const oilTypes = ["Full Spectrum", "Broad Spectrum", "CBD Isolate"];
  
  let productId = 1;
  
  oilTypes.forEach(type => {
    oilStrengths.forEach(strength => {
      oilFlavors.forEach(flavor => {
        const price = parseInt(strength) * 0.05 + 19.99;
        products.push({
          id: `oil-${productId}`,
          name: `Medi Spero ${type} CBD Oil - ${strength} ${flavor}`,
          slug: `${type.toLowerCase().replace(' ', '-')}-cbd-oil-${strength.toLowerCase()}-${flavor.toLowerCase()}`,
          category: "cbd-oils",
          subcategory: type.toLowerCase().replace(' ', '-'),
          price: Math.round(price * 100) / 100,
          originalPrice: Math.round(price * 1.2 * 100) / 100,
          rating: 4.5 + Math.random() * 0.5,
          reviewCount: Math.floor(Math.random() * 500) + 50,
          description: `Experience the therapeutic benefits of our premium ${type} CBD Oil. Crafted from organically grown hemp in the USA, this ${strength} tincture delivers consistent, high-quality CBD in every drop. ${flavor} flavor for a pleasant experience. Third-party lab tested for purity and potency. Perfect for daily wellness support, stress management, and natural relief.`,
          shortDescription: `Premium ${type} CBD Oil with ${strength} CBD in refreshing ${flavor} flavor`,
          images: getProductImages("cbd-oils", productId),
          sku: `MS-OIL-${type.substring(0,2).toUpperCase()}-${strength}-${flavor.substring(0,3).toUpperCase()}-${productId}`,
          gtin: `0850${String(productId).padStart(9, '0')}`,
          brand: "Medi Spero",
          inStock: true,
          stockQuantity: Math.floor(Math.random() * 100) + 20,
          strength: strength,
          size: "30ml (1 fl oz)",
          servings: 30,
          ingredients: ["Organic Hemp Extract", "MCT Oil (Coconut)", flavor !== "Unflavored" ? `Natural ${flavor} Flavoring` : ""].filter(Boolean),
          benefits: ["Promotes Relaxation", "Supports Healthy Sleep", "Reduces Everyday Stress", "Supports Overall Wellness"],
          usage: "Take 1 dropper (1ml) under tongue, hold for 60 seconds, then swallow. Use 1-2 times daily or as needed.",
          thirdPartyTested: true,
          organic: true,
          glutenFree: true,
          vegan: true,
          madeInUSA: true,
          tags: ["cbd oil", "tincture", type.toLowerCase(), flavor.toLowerCase(), "wellness"]
        });
        productId++;
      });
    });
  });
  
  // CBD Gummies
  const gummyStrengths = ["10mg", "25mg", "50mg"];
  const gummyCounts = ["30 count", "60 count", "90 count"];
  const gummyTypes = ["Sleep", "Calm", "Energy", "Focus", "Recovery", "Immunity", "Original"];
  
  gummyTypes.forEach(type => {
    gummyStrengths.forEach(strength => {
      gummyCounts.forEach(count => {
        const basePrice = parseInt(count) * parseInt(strength) * 0.03 + 14.99;
        products.push({
          id: `gummy-${productId}`,
          name: `Medi Spero ${type} CBD Gummies - ${strength} per gummy (${count})`,
          slug: `${type.toLowerCase()}-cbd-gummies-${strength.toLowerCase()}-${count.replace(' ', '-').toLowerCase()}`,
          category: "cbd-gummies",
          subcategory: type.toLowerCase(),
          price: Math.round(basePrice * 100) / 100,
          originalPrice: Math.round(basePrice * 1.25 * 100) / 100,
          rating: 4.6 + Math.random() * 0.4,
          reviewCount: Math.floor(Math.random() * 800) + 100,
          description: `Our delicious ${type} CBD Gummies are the perfect way to incorporate CBD into your daily routine. Each gummy contains ${strength} of premium broad-spectrum CBD, carefully formulated for ${type.toLowerCase()} support. Made with natural fruit flavors and colors, these gummies are as tasty as they are effective. Lab-tested for quality assurance.`,
          shortDescription: `Tasty ${type} CBD Gummies with ${strength} CBD per gummy`,
          images: getProductImages("cbd-gummies", productId),
          sku: `MS-GUM-${type.substring(0,3).toUpperCase()}-${strength}-${count.split(' ')[0]}-${productId}`,
          gtin: `0850${String(productId).padStart(9, '0')}`,
          brand: "Medi Spero",
          inStock: true,
          stockQuantity: Math.floor(Math.random() * 150) + 30,
          strength: strength,
          size: count,
          servings: parseInt(count),
          ingredients: ["Broad Spectrum Hemp Extract", "Organic Cane Sugar", "Tapioca Syrup", "Pectin", "Natural Flavors", "Citric Acid"],
          benefits: type === "Sleep" ? ["Promotes Restful Sleep", "Calming Formula", "Non-Habit Forming", "Wake Up Refreshed"] :
                   type === "Calm" ? ["Reduces Stress", "Promotes Relaxation", "Eases Tension", "Daily Calm Support"] :
                   type === "Energy" ? ["Natural Energy Boost", "Mental Clarity", "No Jitters", "Sustained Focus"] :
                   type === "Focus" ? ["Enhanced Concentration", "Mental Clarity", "Productivity Support", "Clear Thinking"] :
                   type === "Recovery" ? ["Muscle Recovery", "Joint Support", "Post-Workout Relief", "Athletic Performance"] :
                   type === "Immunity" ? ["Immune Support", "Antioxidant Rich", "Daily Defense", "Overall Wellness"] :
                   ["Daily Wellness", "Natural Relief", "Stress Support", "Quality CBD"],
          usage: "Take 1-2 gummies daily. For best results, use consistently as part of your daily wellness routine.",
          thirdPartyTested: true,
          organic: false,
          glutenFree: true,
          vegan: true,
          madeInUSA: true,
          tags: ["cbd gummies", type.toLowerCase(), "edibles", "wellness"]
        });
        productId++;
      });
    });
  });
  
  // CBD Topicals
  const topicalTypes = ["Relief Cream", "Muscle Balm", "Roll-On Gel", "Body Lotion", "Massage Oil", "Cooling Cream", "Warming Salve"];
  const topicalSizes = ["1 oz", "2 oz", "4 oz"];
  const topicalStrengths = ["250mg", "500mg", "1000mg", "1500mg", "3000mg"];
  
  topicalTypes.forEach(type => {
    topicalStrengths.forEach(strength => {
      topicalSizes.forEach(size => {
        const basePrice = parseInt(strength) * 0.04 + parseInt(size) * 8 + 9.99;
        products.push({
          id: `topical-${productId}`,
          name: `Medi Spero CBD ${type} - ${strength} (${size})`,
          slug: `cbd-${type.toLowerCase().replace(' ', '-')}-${strength.toLowerCase()}-${size.replace(' ', '')}`,
          category: "cbd-topicals",
          subcategory: type.toLowerCase().replace(' ', '-'),
          price: Math.round(basePrice * 100) / 100,
          originalPrice: Math.round(basePrice * 1.2 * 100) / 100,
          rating: 4.4 + Math.random() * 0.5,
          reviewCount: Math.floor(Math.random() * 400) + 40,
          description: `Our premium CBD ${type} provides targeted relief exactly where you need it. Infused with ${strength} of full-spectrum CBD and botanical ingredients, this topical absorbs quickly to deliver soothing comfort. Perfect for post-workout recovery, everyday aches, and overall skin wellness.`,
          shortDescription: `Soothing CBD ${type} with ${strength} for targeted relief`,
          images: getProductImages("cbd-topicals", productId),
          sku: `MS-TOP-${type.substring(0,3).toUpperCase()}-${strength}-${size.replace(' ', '')}-${productId}`,
          gtin: `0850${String(productId).padStart(9, '0')}`,
          brand: "Medi Spero",
          inStock: true,
          stockQuantity: Math.floor(Math.random() * 80) + 15,
          strength: strength,
          size: size,
          ingredients: ["Full Spectrum Hemp Extract", "Aloe Vera", "Shea Butter", "Coconut Oil", "Menthol", "Arnica", "Vitamin E"],
          benefits: ["Targeted Relief", "Fast Absorption", "Long-Lasting Comfort", "Moisturizes Skin"],
          usage: "Apply generously to affected area and massage until fully absorbed. Use as needed throughout the day.",
          thirdPartyTested: true,
          organic: true,
          glutenFree: true,
          vegan: true,
          madeInUSA: true,
          tags: ["cbd topical", type.toLowerCase(), "relief", "skincare"]
        });
        productId++;
      });
    });
  });
  
  // CBD Capsules
  const capsuleStrengths = ["10mg", "25mg", "50mg", "100mg"];
  const capsuleCounts = ["30 count", "60 count", "90 count", "120 count"];
  const capsuleFormulas = ["Daily Wellness", "Sleep Support", "Stress Relief", "Anti-Inflammatory", "Energy Plus"];
  
  capsuleFormulas.forEach(formula => {
    capsuleStrengths.forEach(strength => {
      capsuleCounts.forEach(count => {
        const basePrice = parseInt(count) * parseInt(strength) * 0.025 + 19.99;
        products.push({
          id: `capsule-${productId}`,
          name: `Medi Spero ${formula} CBD Capsules - ${strength} (${count})`,
          slug: `${formula.toLowerCase().replace(' ', '-')}-cbd-capsules-${strength.toLowerCase()}-${count.replace(' ', '-')}`,
          category: "cbd-capsules",
          subcategory: formula.toLowerCase().replace(' ', '-'),
          price: Math.round(basePrice * 100) / 100,
          originalPrice: Math.round(basePrice * 1.15 * 100) / 100,
          rating: 4.5 + Math.random() * 0.5,
          reviewCount: Math.floor(Math.random() * 350) + 50,
          description: `Convenient and precisely-dosed, our ${formula} CBD Capsules deliver ${strength} of premium CBD per softgel. Perfect for those who prefer a no-fuss approach to CBD supplementation. Each capsule is formulated for ${formula.toLowerCase()} and manufactured in a GMP-certified facility.`,
          shortDescription: `Easy-to-take ${formula} CBD Capsules with ${strength} CBD each`,
          images: getProductImages("cbd-capsules", productId),
          sku: `MS-CAP-${formula.substring(0,3).toUpperCase()}-${strength}-${count.split(' ')[0]}-${productId}`,
          gtin: `0850${String(productId).padStart(9, '0')}`,
          brand: "Medi Spero",
          inStock: true,
          stockQuantity: Math.floor(Math.random() * 100) + 25,
          strength: strength,
          size: count,
          servings: parseInt(count),
          ingredients: ["Full Spectrum Hemp Extract", "MCT Oil", "Gelatin Capsule", "Sunflower Lecithin"],
          benefits: formula === "Sleep Support" ? ["Promotes Restful Sleep", "Calming Effect", "Wake Up Refreshed", "Natural Formula"] :
                   formula === "Stress Relief" ? ["Reduces Anxiety", "Promotes Calm", "Mental Clarity", "Stress Management"] :
                   formula === "Anti-Inflammatory" ? ["Joint Support", "Muscle Recovery", "Reduces Inflammation", "Mobility Support"] :
                   formula === "Energy Plus" ? ["Natural Energy", "Mental Focus", "No Crash", "Sustained Vitality"] :
                   ["Daily Wellness", "Overall Health", "Immune Support", "Balance"],
          usage: "Take 1-2 capsules daily with water, preferably with food. Consistent use recommended for best results.",
          thirdPartyTested: true,
          organic: true,
          glutenFree: true,
          vegan: false,
          madeInUSA: true,
          tags: ["cbd capsules", formula.toLowerCase(), "softgels", "convenient"]
        });
        productId++;
      });
    });
  });
  
  // Sleep & Relaxation Products
  const sleepProducts = [
    { name: "Sleep Tincture with CBN", type: "tincture", strengths: ["500mg CBD + 150mg CBN", "1000mg CBD + 300mg CBN", "1500mg CBD + 500mg CBN"] },
    { name: "Nighttime Gummies with Melatonin", type: "gummies", strengths: ["25mg CBD + 5mg Melatonin", "50mg CBD + 10mg Melatonin"] },
    { name: "Calming Bath Bombs", type: "bath", strengths: ["100mg CBD", "200mg CBD"] },
    { name: "Lavender Sleep Spray", type: "spray", strengths: ["300mg CBD", "600mg CBD"] },
  ];
  
  sleepProducts.forEach(product => {
    product.strengths.forEach(strength => {
      const basePrice = 34.99 + Math.random() * 40;
      products.push({
        id: `sleep-${productId}`,
        name: `Medi Spero ${product.name} - ${strength}`,
        slug: `${product.name.toLowerCase().replace(/ /g, '-')}-${strength.split(' ')[0].toLowerCase()}`,
        category: "sleep-wellness",
        subcategory: product.type,
        price: Math.round(basePrice * 100) / 100,
        originalPrice: Math.round(basePrice * 1.2 * 100) / 100,
        rating: 4.7 + Math.random() * 0.3,
        reviewCount: Math.floor(Math.random() * 600) + 80,
        description: `Fall asleep faster and stay asleep longer with our ${product.name}. This premium formula combines ${strength} for optimal sleep support. Non-habit forming and made with natural ingredients. Wake up feeling refreshed and ready to take on the day.`,
        shortDescription: `Premium ${product.name} with ${strength} for better sleep`,
        images: getProductImages("sleep-wellness", productId),
        sku: `MS-SLP-${product.type.substring(0,3).toUpperCase()}-${productId}`,
        gtin: `0850${String(productId).padStart(9, '0')}`,
        brand: "Medi Spero",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 60) + 15,
        strength: strength,
        size: product.type === "gummies" ? "30 count" : product.type === "bath" ? "6 pack" : "30ml",
        ingredients: ["Hemp Extract", "CBN", "Lavender Extract", "Chamomile", "Melatonin", "MCT Oil"],
        benefits: ["Promotes Deep Sleep", "Reduces Sleep Onset Time", "Non-Habit Forming", "Wake Refreshed"],
        usage: "Use 30 minutes before bedtime for optimal results.",
        thirdPartyTested: true,
        organic: true,
        glutenFree: true,
        vegan: true,
        madeInUSA: true,
        tags: ["sleep", "cbn", "melatonin", "relaxation", "nighttime"]
      });
      productId++;
    });
  });
  
  // Pet CBD Products
  const petTypes = ["Dog", "Cat"];
  const petSizes = ["Small (Under 25 lbs)", "Medium (25-50 lbs)", "Large (Over 50 lbs)"];
  const petProducts = ["Oil Tincture", "Treats", "Calming Chews"];
  
  petTypes.forEach(pet => {
    petProducts.forEach(product => {
      const sizes = pet === "Cat" ? ["Small"] : petSizes;
      sizes.forEach(size => {
        const basePrice = 24.99 + Math.random() * 30;
        const strength = size.includes("Large") ? "600mg" : size.includes("Medium") ? "300mg" : "150mg";
        products.push({
          id: `pet-${productId}`,
          name: `Medi Spero ${pet} CBD ${product} - ${size}`,
          slug: `${pet.toLowerCase()}-cbd-${product.toLowerCase().replace(' ', '-')}-${size.split(' ')[0].toLowerCase()}`,
          category: "pet-cbd",
          subcategory: pet.toLowerCase(),
          price: Math.round(basePrice * 100) / 100,
          originalPrice: Math.round(basePrice * 1.15 * 100) / 100,
          rating: 4.8 + Math.random() * 0.2,
          reviewCount: Math.floor(Math.random() * 300) + 60,
          description: `Give your ${pet.toLowerCase()} the gift of wellness with our veterinarian-formulated CBD ${product}. Specially designed for ${size.toLowerCase()} ${pet.toLowerCase()}s, this ${strength} formula supports calm behavior, joint health, and overall wellness. Made with pet-safe ingredients and no THC.`,
          shortDescription: `Vet-formulated CBD ${product} for ${size.toLowerCase()} ${pet.toLowerCase()}s`,
          images: getProductImages("pet-cbd", productId),
          sku: `MS-PET-${pet.substring(0,1)}-${product.substring(0,3).toUpperCase()}-${productId}`,
          gtin: `0850${String(productId).padStart(9, '0')}`,
          brand: "Medi Spero",
          inStock: true,
          stockQuantity: Math.floor(Math.random() * 50) + 20,
          strength: strength,
          size: product === "Treats" ? "30 count" : product === "Chews" ? "30 count" : "30ml",
          ingredients: ["Broad Spectrum Hemp Extract (0% THC)", "Salmon Oil", "Natural Bacon Flavor", "Coconut Oil"],
          benefits: ["Promotes Calm Behavior", "Supports Joint Health", "Reduces Separation Anxiety", "Improves Mobility"],
          usage: "Administer directly or mix with food. See dosing chart based on pet weight.",
          thirdPartyTested: true,
          organic: true,
          glutenFree: true,
          vegan: false,
          madeInUSA: true,
          tags: ["pet cbd", pet.toLowerCase(), "pet wellness", "veterinarian formulated"]
        });
        productId++;
      });
    });
  });
  
  // CBD Skincare
  const skincareProducts = [
    { name: "Anti-Aging Face Serum", size: "1 oz", strength: "500mg" },
    { name: "Hydrating Face Cream", size: "2 oz", strength: "750mg" },
    { name: "Eye Repair Cream", size: "0.5 oz", strength: "250mg" },
    { name: "Lip Balm", size: "0.15 oz", strength: "50mg" },
    { name: "Face Mask Set", size: "5 pack", strength: "100mg each" },
    { name: "Body Butter", size: "8 oz", strength: "1000mg" },
    { name: "Facial Cleanser", size: "4 oz", strength: "300mg" },
    { name: "Toner", size: "4 oz", strength: "200mg" },
    { name: "Night Repair Cream", size: "2 oz", strength: "1000mg" },
    { name: "Vitamin C + CBD Serum", size: "1 oz", strength: "500mg" },
  ];
  
  skincareProducts.forEach(product => {
    const basePrice = 19.99 + Math.random() * 50;
    products.push({
      id: `skincare-${productId}`,
      name: `Medi Spero CBD ${product.name} - ${product.strength}`,
      slug: `cbd-${product.name.toLowerCase().replace(/ /g, '-')}`,
      category: "cbd-skincare",
      subcategory: "face-care",
      price: Math.round(basePrice * 100) / 100,
      originalPrice: Math.round(basePrice * 1.25 * 100) / 100,
      rating: 4.6 + Math.random() * 0.4,
      reviewCount: Math.floor(Math.random() * 250) + 40,
      description: `Reveal your most radiant skin with our luxurious CBD ${product.name}. Infused with ${product.strength} of premium CBD and powerful botanical extracts, this formula targets fine lines, uneven skin tone, and dryness. Dermatologist tested and suitable for all skin types.`,
      shortDescription: `Luxurious CBD ${product.name} with ${product.strength} for radiant skin`,
      images: getProductImages("cbd-skincare", productId),
      sku: `MS-SKN-${product.name.substring(0,3).toUpperCase()}-${productId}`,
      gtin: `0850${String(productId).padStart(9, '0')}`,
      brand: "Medi Spero",
      inStock: true,
      stockQuantity: Math.floor(Math.random() * 60) + 15,
      strength: product.strength,
      size: product.size,
      ingredients: ["Hemp Extract", "Hyaluronic Acid", "Vitamin E", "Jojoba Oil", "Aloe Vera", "Green Tea Extract"],
      benefits: ["Reduces Fine Lines", "Deep Hydration", "Evens Skin Tone", "Antioxidant Protection"],
      usage: "Apply to clean skin morning and/or night. Gently massage until absorbed.",
      thirdPartyTested: true,
      organic: true,
      glutenFree: true,
      vegan: true,
      madeInUSA: true,
      tags: ["cbd skincare", "anti-aging", "face care", "luxury"]
    });
    productId++;
  });
  
  // Value Bundles
  const bundles = [
    { name: "Starter Wellness Bundle", items: "500mg Oil + 25mg Gummies (30ct)", price: 79.99 },
    { name: "Complete Relaxation Bundle", items: "1000mg Oil + Sleep Gummies + Bath Bombs", price: 129.99 },
    { name: "Pain Relief Bundle", items: "1500mg Oil + 1000mg Cream + Capsules", price: 159.99 },
    { name: "Sleep Essentials Bundle", items: "CBN Sleep Oil + Nighttime Gummies + Lavender Spray", price: 119.99 },
    { name: "Pet Parent Bundle", items: "Dog Oil + Cat Oil + Pet Treats", price: 89.99 },
    { name: "Skincare Essentials Bundle", items: "Face Serum + Eye Cream + Lip Balm", price: 99.99 },
    { name: "Ultimate Wellness Bundle", items: "3000mg Oil + Gummies + Capsules + Cream", price: 249.99 },
    { name: "Daily Calm Bundle", items: "Calm Gummies + Stress Relief Capsules + Roll-On", price: 109.99 },
  ];
  
  bundles.forEach(bundle => {
    products.push({
      id: `bundle-${productId}`,
      name: `Medi Spero ${bundle.name}`,
      slug: `${bundle.name.toLowerCase().replace(/ /g, '-')}`,
      category: "bundles",
      subcategory: "value-bundles",
      price: bundle.price,
      originalPrice: Math.round(bundle.price * 1.35 * 100) / 100,
      rating: 4.9,
      reviewCount: Math.floor(Math.random() * 200) + 100,
      description: `Save big with our ${bundle.name}! This carefully curated collection includes: ${bundle.items}. Perfect for those looking to experience multiple Medi Spero products at a discounted price. All products are third-party tested and made in the USA.`,
      shortDescription: `Value bundle: ${bundle.items}`,
      images: getProductImages("bundles", productId),
      sku: `MS-BND-${productId}`,
      gtin: `0850${String(productId).padStart(9, '0')}`,
      brand: "Medi Spero",
      inStock: true,
      stockQuantity: Math.floor(Math.random() * 30) + 10,
      strength: "Varies",
      size: "Bundle",
      ingredients: ["See individual products"],
      benefits: ["Save 25-35%", "Try Multiple Products", "Complete Wellness Solution", "Free Shipping"],
      usage: "See individual product instructions.",
      thirdPartyTested: true,
      organic: true,
      glutenFree: true,
      vegan: true,
      madeInUSA: true,
      tags: ["bundle", "value", "savings", "gift"]
    });
    productId++;
  });

  // Anti-Anxiety & Calm Products (Delta-8 THC focused)
  const anxietyProducts = [
    { name: "Delta-8 Calm Gummies", type: "gummies", strengths: ["10mg", "25mg", "50mg"], counts: ["30 count", "60 count"] },
    { name: "Delta-8 Anxiety Relief Vape", type: "vape", strengths: ["500mg", "1000mg", "1500mg"] },
    { name: "CBD + Delta-8 Calm Tincture", type: "tincture", strengths: ["500mg + 250mg", "1000mg + 500mg", "1500mg + 750mg"] },
    { name: "Delta-8 Stress Relief Softgels", type: "softgels", strengths: ["10mg", "25mg", "50mg"], counts: ["30 count", "60 count", "90 count"] },
    { name: "CBD Calm Tea Blend", type: "tea", strengths: ["150mg per bag", "300mg per bag"] },
    { name: "Delta-8 Anti-Anxiety Spray", type: "spray", strengths: ["250mg", "500mg", "750mg"] },
  ];
  
  anxietyProducts.forEach(product => {
    const strengths = product.strengths;
    const counts = product.counts || ["1 unit"];
    
    strengths.forEach(strength => {
      counts.forEach(count => {
        const basePrice = product.type === "vape" ? 39.99 : 
                         product.type === "gummies" ? 34.99 :
                         product.type === "tincture" ? 49.99 :
                         product.type === "softgels" ? 44.99 :
                         product.type === "tea" ? 24.99 : 29.99;
        const priceMultiplier = strength.includes("1500") || strength.includes("50mg") ? 1.8 : 
                               strength.includes("1000") || strength.includes("25mg") ? 1.4 : 1;
        const countMultiplier = count.includes("90") ? 1.6 : count.includes("60") ? 1.3 : 1;
        const price = basePrice * priceMultiplier * countMultiplier;
        
        products.push({
          id: `anxiety-${productId}`,
          name: `Medi Spero ${product.name} - ${strength}${count !== "1 unit" ? ` (${count})` : ""}`,
          slug: `${product.name.toLowerCase().replace(/ /g, '-')}-${strength.toLowerCase().replace(/ /g, '-')}${count !== "1 unit" ? `-${count.replace(' ', '-')}` : ""}`,
          category: "anti-anxiety",
          subcategory: product.type,
          price: Math.round(price * 100) / 100,
          originalPrice: Math.round(price * 1.25 * 100) / 100,
          rating: 4.6 + Math.random() * 0.4,
          reviewCount: Math.floor(Math.random() * 450) + 80,
          description: `Experience natural anxiety relief with our ${product.name}. Formulated with premium Delta-8 THC and CBD, this ${product.type} is designed to help you find calm in stressful moments without the intense effects of traditional THC. Farm Bill compliant with less than 0.3% Delta-9 THC. Third-party tested for purity and potency.`,
          shortDescription: `Premium ${product.name} with ${strength} for natural anxiety relief`,
          images: getProductImages("anti-anxiety", productId),
          sku: `MS-ANX-${product.type.substring(0,3).toUpperCase()}-${productId}`,
          gtin: `0850${String(productId).padStart(9, '0')}`,
          brand: "Medi Spero",
          inStock: true,
          stockQuantity: Math.floor(Math.random() * 70) + 20,
          strength: strength,
          size: count !== "1 unit" ? count : product.type === "vape" ? "1ml cartridge" : product.type === "tincture" ? "30ml" : product.type === "spray" ? "30ml" : "1 oz",
          servings: count.includes("count") ? parseInt(count) : 30,
          ingredients: product.type === "gummies" ? ["Delta-8 THC Distillate", "CBD Isolate", "Organic Cane Sugar", "Natural Flavors", "L-Theanine", "Ashwagandha"] :
                      product.type === "tincture" ? ["Delta-8 THC Distillate", "Full Spectrum CBD", "MCT Oil", "Natural Lavender Extract"] :
                      product.type === "tea" ? ["CBD Hemp Flower", "Chamomile", "Passionflower", "Lavender", "Lemon Balm", "Valerian Root"] :
                      ["Delta-8 THC Extract", "CBD Isolate", "Natural Terpenes", "MCT Oil"],
          benefits: ["Reduces Anxiety Naturally", "Promotes Calm & Relaxation", "Non-Intoxicating Effects", "Fast-Acting Relief", "No Prescription Required"],
          usage: product.type === "gummies" ? "Take 1 gummy as needed for anxiety relief. Start low and go slow." :
                product.type === "vape" ? "Inhale 1-3 puffs as needed. Effects felt within minutes." :
                product.type === "tea" ? "Steep 1 tea bag in hot water for 5-7 minutes. Enjoy 1-2 cups daily." :
                "Use as directed. Start with lowest dose and adjust as needed.",
          thirdPartyTested: true,
          organic: product.type === "tea",
          glutenFree: true,
          vegan: true,
          madeInUSA: true,
          tags: ["delta-8", "anti-anxiety", "calm", "stress relief", "thc", product.type]
        });
        productId++;
      });
    });
  });

  // Mood & Depression Support Products (Delta-9 THC focused)
  const moodProducts = [
    { name: "Delta-9 Mood Uplift Gummies", type: "gummies", strengths: ["5mg", "10mg", "25mg"], counts: ["20 count", "40 count", "60 count"] },
    { name: "Delta-9 Mood Tincture", type: "tincture", strengths: ["150mg", "300mg", "600mg"] },
    { name: "CBD + Delta-9 Bliss Chocolates", type: "chocolate", strengths: ["5mg D9 + 10mg CBD", "10mg D9 + 20mg CBD"], counts: ["10 pack", "20 pack"] },
    { name: "Delta-10 Energy & Mood Vape", type: "vape", strengths: ["500mg", "1000mg"] },
    { name: "Full Spectrum Mood Softgels", type: "softgels", strengths: ["25mg", "50mg", "100mg"], counts: ["30 count", "60 count"] },
    { name: "Delta-9 Mood Support Spray", type: "spray", strengths: ["100mg", "200mg", "400mg"] },
  ];
  
  moodProducts.forEach(product => {
    const strengths = product.strengths;
    const counts = product.counts || ["1 unit"];
    
    strengths.forEach(strength => {
      counts.forEach(count => {
        const basePrice = product.type === "chocolate" ? 29.99 : 
                         product.type === "gummies" ? 39.99 :
                         product.type === "tincture" ? 54.99 :
                         product.type === "vape" ? 44.99 :
                         product.type === "softgels" ? 49.99 : 34.99;
        const priceMultiplier = strength.includes("600") || strength.includes("100mg") || strength.includes("25mg D9") ? 1.9 : 
                               strength.includes("300") || strength.includes("50mg") || strength.includes("10mg D9") ? 1.5 : 1;
        const countMultiplier = count.includes("60") || count.includes("20 pack") ? 1.5 : count.includes("40") ? 1.25 : 1;
        const price = basePrice * priceMultiplier * countMultiplier;
        
        products.push({
          id: `mood-${productId}`,
          name: `Medi Spero ${product.name} - ${strength}${count !== "1 unit" ? ` (${count})` : ""}`,
          slug: `${product.name.toLowerCase().replace(/ /g, '-')}-${strength.toLowerCase().replace(/ /g, '-').replace('+', '-plus-')}${count !== "1 unit" ? `-${count.replace(' ', '-')}` : ""}`,
          category: "mood-support",
          subcategory: product.type,
          price: Math.round(price * 100) / 100,
          originalPrice: Math.round(price * 1.3 * 100) / 100,
          rating: 4.7 + Math.random() * 0.3,
          reviewCount: Math.floor(Math.random() * 500) + 100,
          description: `Support a positive mood naturally with our ${product.name}. This Farm Bill compliant formula contains hemp-derived Delta-9 THC (under 0.3% by dry weight) combined with synergistic cannabinoids for a balanced, uplifting experience. Perfect for those seeking natural mood support without a prescription. Lab-tested for safety and potency.`,
          shortDescription: `Hemp-derived ${product.name} with ${strength} for natural mood elevation`,
          images: getProductImages("mood-support", productId),
          sku: `MS-MOD-${product.type.substring(0,3).toUpperCase()}-${productId}`,
          gtin: `0850${String(productId).padStart(9, '0')}`,
          brand: "Medi Spero",
          inStock: true,
          stockQuantity: Math.floor(Math.random() * 60) + 15,
          strength: strength,
          size: count !== "1 unit" ? count : product.type === "vape" ? "1ml cartridge" : product.type === "tincture" ? "30ml" : product.type === "spray" ? "30ml" : "1 unit",
          servings: count.includes("count") || count.includes("pack") ? parseInt(count) : 30,
          ingredients: product.type === "gummies" ? ["Hemp-Derived Delta-9 THC", "Full Spectrum CBD", "Vitamin D3", "B-Complex Vitamins", "Natural Fruit Flavors"] :
                      product.type === "chocolate" ? ["Hemp-Derived Delta-9 THC", "CBD Isolate", "Premium Dark Chocolate", "Organic Cacao", "Natural Vanilla"] :
                      product.type === "tincture" ? ["Hemp-Derived Delta-9 THC", "Full Spectrum Hemp Extract", "MCT Oil", "Natural Citrus Extract"] :
                      ["Delta-9 THC Extract", "CBD", "CBG", "Natural Terpenes", "MCT Oil"],
          benefits: ["Elevates Mood Naturally", "Promotes Positive Outlook", "Reduces Low Mood", "Supports Emotional Balance", "Farm Bill Compliant"],
          usage: product.type === "gummies" || product.type === "chocolate" ? "Take 1 serving as needed. Effects typically felt within 30-60 minutes. Start low and go slow." :
                product.type === "vape" ? "Inhale 1-2 puffs as needed. Effects felt within minutes. Do not exceed 10 puffs daily." :
                "Use as directed on packaging. Start with smallest dose and adjust based on your response.",
          thirdPartyTested: true,
          organic: product.type === "chocolate",
          glutenFree: true,
          vegan: product.type !== "chocolate",
          madeInUSA: true,
          tags: ["delta-9", "mood support", "depression", "emotional wellness", "hemp-derived", product.type]
        });
        productId++;
      });
    });
  });

  return products;
};

export const products = generateProducts();

// Helper functions
export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(p => p.category === categorySlug);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getFeaturedProducts = (count: number = 8): Product[] => {
  return products
    .filter(p => p.rating >= 4.7)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, count);
};

export const getBestSellers = (count: number = 8): Product[] => {
  return products
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, count);
};

export const getNewArrivals = (count: number = 8): Product[] => {
  return products.slice(-count).reverse();
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.includes(lowerQuery))
  );
};

console.log(`Total products generated: ${products.length}`);
