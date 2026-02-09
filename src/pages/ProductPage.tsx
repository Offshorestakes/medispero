import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { trackViewItem } from "@/lib/analytics";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getProductBySlug, getFeaturedProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronRight,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Award,
  Check,
  FileText,
  AlertTriangle,
  Beaker,
  Pill,
  Clock,
  Scale,
  Info,
  Download,
  ExternalLink,
} from "lucide-react";

// Dosing guidelines based on product category and strength
const getDosingGuide = (product: ReturnType<typeof getProductBySlug>) => {
  if (!product) return null;
  
  const category = product.category;
  const isPharma = category === "pharma-capsules";
  const isAnxiety = category === "anti-anxiety";
  const isMood = category === "mood-support";
  const isOil = category === "cbd-oils";
  const isGummy = false;
  const isCapsule = category === "cbd-capsules";
  const isTopical = false;
  const isSleep = category === "sleep-wellness";
  const isVape = category === "cbd-vape";
  
  if (isPharma) {
    return {
      title: "Pharmaceutical Dosing Protocol",
      guidelines: [
        { level: "Starting Dose", dose: "1 capsule daily", timing: "Morning with food", notes: "Assess tolerance for 3-5 days" },
        { level: "Maintenance Dose", dose: "1-2 capsules daily", timing: "Morning and/or evening", notes: "After initial assessment period" },
        { level: "Therapeutic Dose", dose: "2-3 capsules daily", timing: "As directed by healthcare provider", notes: "For targeted symptom management" },
      ],
      warnings: [
        "Consult healthcare provider before use, especially if taking other medications",
        "Do not exceed recommended dosage without medical supervision",
        "Effects may take 2-4 weeks of consistent use to fully manifest",
        "Not recommended for pregnant or nursing women",
      ],
      interactions: "May interact with blood thinners, anti-seizure medications, and certain antidepressants. Consult pharmacist.",
    };
  }
  
  if (isAnxiety || isMood) {
    return {
      title: "Cannabinoid Therapy Protocol",
      guidelines: [
        { level: "Microdose", dose: "2.5-5mg THC / 10-20mg CBD", timing: "1-2x daily", notes: "Subtle effects, best for beginners" },
        { level: "Low Dose", dose: "5-10mg THC / 20-40mg CBD", timing: "As needed", notes: "Mild relaxation and mood support" },
        { level: "Standard Dose", dose: "10-25mg THC / 40-80mg CBD", timing: "1-2x daily", notes: "Noticeable therapeutic effects" },
        { level: "High Dose", dose: "25mg+ THC / 80mg+ CBD", timing: "Under medical guidance", notes: "For experienced users only" },
      ],
      warnings: [
        "Start low and go slow - individual tolerance varies significantly",
        "Do not drive or operate machinery after consumption",
        "May cause drowsiness, dry mouth, or changes in appetite",
        "Effects may be delayed 1-2 hours for edibles",
      ],
      interactions: "THC may enhance effects of sedatives and alcohol. Use caution with CNS depressants.",
    };
  }
  
  if (isOil) {
    return {
      title: "CBD Oil Sublingual Protocol",
      guidelines: [
        { level: "Beginner", dose: "10-20mg CBD", timing: "Once daily, morning or evening", notes: "Hold under tongue 60-90 seconds" },
        { level: "Intermediate", dose: "20-40mg CBD", timing: "Twice daily", notes: "Consistent timing for best results" },
        { level: "Advanced", dose: "40-80mg CBD", timing: "2-3x daily", notes: "For significant wellness support" },
      ],
      warnings: [
        "Sublingual administration provides faster absorption than oral ingestion",
        "May cause mild drowsiness in some individuals",
        "Store in cool, dark place away from direct sunlight",
      ],
      interactions: "CBD may affect metabolism of certain medications via CYP450 pathway. Consult pharmacist if on prescription medications.",
    };
  }
  
  if (isGummy || isCapsule) {
    return {
      title: "Oral CBD Administration Guide",
      guidelines: [
        { level: "Starting", dose: "1 gummy/capsule", timing: "Once daily with food", notes: "Assess tolerance for 5-7 days" },
        { level: "Regular", dose: "1-2 gummies/capsules", timing: "Once or twice daily", notes: "Maintain consistent schedule" },
        { level: "Maximum", dose: "2-3 gummies/capsules", timing: "As needed, max 3x daily", notes: "Do not exceed recommended daily intake" },
      ],
      warnings: [
        "Effects may take 45-90 minutes to onset due to digestion",
        "Taking with fatty foods may improve absorption",
        "Keep out of reach of children",
      ],
      interactions: "CBD may affect the metabolism of certain medications. Consult your healthcare provider.",
    };
  }
  
  if (isTopical) {
    return {
      title: "Topical Application Protocol",
      guidelines: [
        { level: "Spot Treatment", dose: "Pea-sized amount", timing: "Apply to affected area 2-3x daily", notes: "Massage until fully absorbed" },
        { level: "General Use", dose: "Quarter-sized amount", timing: "Apply as needed throughout day", notes: "Avoid broken skin or open wounds" },
        { level: "Intensive", dose: "Generous application", timing: "Before bed or post-workout", notes: "Can cover with light bandage if desired" },
      ],
      warnings: [
        "For external use only - do not ingest",
        "Avoid contact with eyes and mucous membranes",
        "Discontinue use if irritation occurs",
        "Wash hands after application unless treating hands",
      ],
      interactions: "Topical application has minimal systemic absorption and low interaction potential.",
    };
  }
  
  if (isVape) {
    return {
      title: "CBD Vape Usage Guide",
      guidelines: [
        { level: "Beginner", dose: "1-2 short puffs", timing: "As needed", notes: "Wait 5-10 min to assess effects" },
        { level: "Regular", dose: "2-4 puffs", timing: "2-3 times daily", notes: "Adjust based on individual response" },
        { level: "Experienced", dose: "4-6 puffs", timing: "As needed throughout day", notes: "Do not exceed comfortable limits" },
      ],
      warnings: [
        "Must be 21+ to purchase and use",
        "Do not use if pregnant or nursing",
        "Effects are felt within 1-5 minutes",
        "Store upright in a cool, dry place away from direct sunlight",
      ],
      interactions: "Inhaled cannabinoids may enhance effects of sedatives. Use caution with CNS depressants.",
    };
  }
  
  if (isSleep) {
    return {
      title: "Sleep Support Protocol",
      guidelines: [
        { level: "Light Support", dose: "Standard dose", timing: "30 minutes before bed", notes: "Create consistent bedtime routine" },
        { level: "Moderate Support", dose: "1.5x standard dose", timing: "45-60 minutes before bed", notes: "Combine with sleep hygiene practices" },
        { level: "Maximum Support", dose: "2x standard dose", timing: "60 minutes before bed", notes: "For occasional use during difficult periods" },
      ],
      warnings: [
        "Non-habit forming, but establish healthy sleep patterns",
        "Do not drive or operate machinery after taking",
        "May cause morning grogginess if dose is too high",
        "Avoid screens and stimulating activities after taking",
      ],
      interactions: "May enhance effects of other sleep aids or sedatives. Use with caution.",
    };
  }
  
  return {
    title: "General Usage Guidelines",
    guidelines: [
      { level: "Starting", dose: "As directed on label", timing: "Once daily", notes: "Begin with lowest recommended dose" },
      { level: "Maintenance", dose: "Standard dose", timing: "As needed", notes: "Adjust based on individual response" },
    ],
    warnings: [
      "Read all product labels and warnings before use",
      "Consult healthcare provider if you have medical conditions",
      "Not intended to diagnose, treat, cure, or prevent any disease",
    ],
    interactions: "Consult your healthcare provider regarding potential medication interactions.",
  };
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, setIsOpen } = useCart();

  const relatedProducts = getFeaturedProducts(4);
  const dosingGuide = getDosingGuide(product);

  useEffect(() => {
    if (product) {
      trackViewItem({
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        category: product.category,
      });
    }
  }, [product?.id]);

  const handleAddToCart = async () => {
    if (!product) return;
    await addItem({
      product_id: product.id,
      product_name: product.name,
      product_image: product.images[0],
      price: product.price,
      quantity: quantity,
    });
    setQuantity(1);
    setIsOpen(true);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link to="/products" className="text-primary hover:underline">
              View All Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const isPharmaProduct = product.category === "pharma-capsules" || 
                          product.category === "anti-anxiety" || 
                          product.category === "mood-support";

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? "fill-brand-gold text-brand-gold"
            : "text-muted-foreground/30"
        }`}
      />
    ));
  };

  // Generate unique COA batch number based on product
  const coaBatchNumber = `MS-${product.sku.replace('MS-', '')}-${new Date().getFullYear()}`;
  const coaDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Product Schema (JSON-LD) for Google Shopping visibility
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map(img => `https://medispero.com${img}`),
    sku: product.sku,
    mpn: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    offers: {
      "@type": "Offer",
      url: `https://medispero.com/product/${product.slug}`,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Medi Spero",
        url: "https://medispero.com",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toFixed(1),
      bestRating: "5",
      worstRating: "1",
      reviewCount: product.reviewCount,
    },
  };

  // BreadcrumbList Schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://medispero.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://medispero.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        item: `https://medispero.com/category/${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://medispero.com/product/${product.slug}`,
      },
    ],
  };

  // FAQ Schema for product page featured snippets
  const productFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${product.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: product.description,
        },
      },
      {
        "@type": "Question",
        name: `How do I use ${product.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: product.usage || "Follow the dosing instructions on the product label. Start with the lowest recommended dose and adjust as needed. Consult your healthcare provider before use.",
        },
      },
      {
        "@type": "Question",
        name: `Is ${product.name} lab tested?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every Medi Spero product undergoes rigorous third-party testing at ISO-certified laboratories for potency, purity, and safety. Certificates of Analysis (COAs) are available on each product page.",
        },
      },
      {
        "@type": "Question",
        name: `Will ${product.name} make me fail a drug test?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Full Spectrum products contain trace THC (under 0.3%) and may cause a positive result on sensitive drug tests. If you are subject to drug testing, consider our Broad Spectrum or CBD Isolate products which contain zero THC.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{product.name} | ${product.price.toFixed(2)} | Medi Spero</title>
        <meta name="description" content={`${product.shortDescription} Free shipping on orders over $250. Lab-tested, pharmaceutical-grade ${product.category.replace("-", " ")} from Medi Spero.`} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="rating" content="adult" />
        <meta property="og:title" content={`${product.name} | Medi Spero`} />
        <meta property="og:description" content={product.shortDescription} />
        <meta property="og:image" content={`https://medispero.com${product.images[0]}`} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://medispero.com/product/${product.slug}`} />
        <meta property="product:price:amount" content={product.price.toFixed(2)} />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content={product.inStock ? "in stock" : "out of stock"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | Medi Spero`} />
        <meta name="twitter:description" content={product.shortDescription} />
        <link rel="canonical" href={`https://medispero.com/product/${product.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(productFaqSchema)}
        </script>
      </Helmet>
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="container-wide">
            <nav className="flex items-center gap-2 text-sm flex-wrap">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link to="/products" className="text-muted-foreground hover:text-foreground">
                Products
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link
                to={`/category/${product.category}`}
                className="text-muted-foreground hover:text-foreground"
              >
                {product.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-muted rounded-2xl overflow-hidden relative">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {discount > 0 && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-lg px-3 py-1">
                      -{discount}%
                    </Badge>
                  )}
                  {isPharmaProduct && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1">
                      Pharmaceutical Grade
                    </Badge>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors shrink-0 ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* COA Section */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-primary">Certificate of Analysis (COA)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Every Medi Spero product is third-party lab tested for potency, purity, and safety.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Batch Number</p>
                      <p className="font-medium">{coaBatchNumber}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Test Date</p>
                      <p className="font-medium">{coaDate}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 flex-1"
                      onClick={() => {
                        window.open("https://client.sclabs.com/", "_blank", "noopener,noreferrer");
                      }}
                    >
                      <Download className="h-4 w-4" />
                      View COA Report
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 flex-1"
                      onClick={() => {
                        window.open("https://www.sclabs.com/hemp/", "_blank", "noopener,noreferrer");
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      About Our Lab Partner
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Tested by: SC Laboratories (ISO/IEC 17025 Accredited, DEA Licensed) | Denver, CO
                  </p>
                </div>
              </div>

              {/* Product Info */}
              <div>
                {/* Category & Brand */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">
                    {product.category.replace("-", " ")}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-secondary font-medium">{product.brand}</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="font-semibold">{product.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">
                    ({product.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <Badge className="bg-destructive text-destructive-foreground">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </Badge>
                    </>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.thirdPartyTested && (
                    <span className="trust-badge">
                      <Award className="h-4 w-4" /> Lab Tested
                    </span>
                  )}
                  {product.organic && (
                    <span className="trust-badge">
                      <Check className="h-4 w-4" /> Organic
                    </span>
                  )}
                  {product.madeInUSA && (
                    <span className="trust-badge">
                      <Shield className="h-4 w-4" /> Made in USA
                    </span>
                  )}
                  {product.vegan && (
                    <span className="trust-badge">
                      <Check className="h-4 w-4" /> Vegan
                    </span>
                  )}
                  {isPharmaProduct && (
                    <span className="trust-badge">
                      <Beaker className="h-4 w-4" /> cGMP Certified
                    </span>
                  )}
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-xl">
                  <div>
                    <p className="text-sm text-muted-foreground">Strength</p>
                    <p className="font-medium">{product.strength}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-medium">{product.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SKU</p>
                    <p className="font-medium text-sm">{product.sku}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className={`font-medium ${product.inStock ? "text-secondary" : "text-destructive"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-muted transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="px-6 text-lg font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-muted transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <Button 
                    className="flex-1 btn-secondary text-lg py-6 gap-2"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </Button>
                </div>

                {/* Wishlist and Share */}
                <div className="flex gap-4 mb-8">
                  <Button variant="outline" className="gap-2">
                    <Heart className="h-5 w-5" />
                    Add to Wishlist
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={async () => {
                      const shareData = {
                        title: product.name,
                        text: product.shortDescription,
                        url: window.location.href,
                      };
                      try {
                        if (navigator.share) {
                          await navigator.share(shareData);
                        } else {
                          await navigator.clipboard.writeText(window.location.href);
                          alert("Link copied to clipboard!");
                        }
                      } catch (err) {
                        // User cancelled share or error
                      }
                    }}
                  >
                    <Share2 className="h-5 w-5" />
                    Share
                  </Button>
                </div>

                {/* Shipping Info */}
                <div className="space-y-3 p-4 border border-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-secondary" />
                    <span className="text-sm">Free discreet shipping on orders over $150</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-secondary" />
                    <span className="text-sm">30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-secondary" />
                    <span className="text-sm">Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dosing Guide Section */}
            {dosingGuide && (
              <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Pill className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{dosingGuide.title}</h2>
                    <p className="text-sm text-muted-foreground">Evidence-based dosing recommendations</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {dosingGuide.guidelines.map((guide, index) => (
                    <div key={index} className="p-4 bg-background rounded-xl border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="h-4 w-4 text-secondary" />
                        <span className="font-semibold text-secondary">{guide.level}</span>
                      </div>
                      <p className="text-lg font-bold mb-1">{guide.dose}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <Clock className="h-3 w-3" />
                        <span>{guide.timing}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{guide.notes}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <h3 className="font-semibold text-destructive">Important Warnings</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-destructive/80">
                      {dosingGuide.warnings.map((warning, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-destructive shrink-0" />
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-primary">Drug Interactions</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {dosingGuide.interactions}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Full Description with Accordion */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="benefits">
                    <AccordionTrigger className="text-xl font-semibold">
                      <span className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-secondary" /> Benefits
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pt-2">
                        {product.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-secondary" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="usage">
                    <AccordionTrigger className="text-xl font-semibold">
                      <span className="flex items-center gap-2">
                        <Pill className="h-5 w-5 text-secondary" /> How to Use
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed pt-2">
                        {product.usage}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="ingredients">
                    <AccordionTrigger className="text-xl font-semibold">
                      <span className="flex items-center gap-2">
                        <Beaker className="h-5 w-5 text-secondary" /> Ingredients
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground pt-2">
                        {product.ingredients.join(", ")}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="coa">
                    <AccordionTrigger className="text-xl font-semibold">
                      <span className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-secondary" /> Lab Testing & COA
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 space-y-4">
                        <p className="text-muted-foreground">
                          Every batch of Medi Spero products undergoes rigorous third-party laboratory testing to ensure the highest standards of quality, safety, and potency.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <p className="font-semibold text-secondary">Cannabinoid Profile</p>
                            <p className="text-muted-foreground">✓ Verified</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <p className="font-semibold text-secondary">Pesticides</p>
                            <p className="text-muted-foreground">✓ None Detected</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <p className="font-semibold text-secondary">Heavy Metals</p>
                            <p className="text-muted-foreground">✓ Below Limits</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <p className="font-semibold text-secondary">Microbials</p>
                            <p className="text-muted-foreground">✓ None Detected</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Laboratory: SC Labs (Santa Cruz, CA) | ISO 17025 Accredited | License: C8-0000040-LIC
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <div className="sticky top-24 space-y-6">
                  <div className="p-6 bg-muted/50 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-4">Product Highlights</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-0.5" />
                        <span>Third-party lab tested for purity and potency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-0.5" />
                        <span>Contains less than 0.3% THC (Farm Bill compliant)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-0.5" />
                        <span>Made from organically grown hemp</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-0.5" />
                        <span>Manufactured in cGMP-certified facilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-0.5" />
                        <span>No artificial colors or preservatives</span>
                      </li>
                    </ul>
                  </div>

                  {/* Medical Disclaimer */}
                  <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <h3 className="font-semibold text-destructive">Medical Disclaimer</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      These statements have not been evaluated by the Food and Drug Administration. 
                      This product is not intended to diagnose, treat, cure, or prevent any disease. 
                      Consult your healthcare provider before use, especially if you are pregnant, 
                      nursing, have a medical condition, or are taking any medications. 
                      Keep out of reach of children. Must be 21+ to purchase.
                    </p>
                  </div>

                  {/* Legal Notice */}
                  <div className="p-4 bg-muted border border-border rounded-xl">
                    <h3 className="font-semibold mb-2 text-sm">Legal Compliance</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This product is derived from hemp and complies with the Agricultural 
                      Improvement Act of 2018 (Farm Bill). Contains less than 0.3% Delta-9 THC 
                      by dry weight. Some states have additional restrictions on cannabinoid 
                      products. Please verify local laws before ordering.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductPage;
