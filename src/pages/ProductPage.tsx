import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getProductBySlug, getFeaturedProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
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
} from "lucide-react";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const relatedProducts = getFeaturedProducts(4);

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

  // Structured data for product
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    gtin: product.gtin,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: `https://medispero.com/product/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Medi Spero",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

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
                  <Button className="flex-1 btn-secondary text-lg py-6 gap-2">
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
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-5 w-5" />
                    Share
                  </Button>
                </div>

                {/* Shipping Info */}
                <div className="space-y-3 p-4 border border-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-secondary" />
                    <span className="text-sm">Free shipping on orders over $75</span>
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

            {/* Full Description */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                <h3 className="text-xl font-semibold mb-3">Benefits</h3>
                <ul className="space-y-2 mb-6">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-secondary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mb-3">How to Use</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.usage}
                </p>

                <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
                <p className="text-muted-foreground">
                  {product.ingredients.join(", ")}
                </p>
              </div>

              <div>
                <div className="sticky top-24 p-6 bg-muted/50 rounded-2xl">
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
                      <span>Manufactured in GMP-certified facilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-secondary mt-0.5" />
                      <span>No artificial colors or preservatives</span>
                    </li>
                  </ul>
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
