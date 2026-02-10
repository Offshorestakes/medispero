import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts(8);

  return (
    <section aria-label="Featured products" className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Best Sellers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Customer Favorites
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Our most loved products, backed by thousands of 5-star reviews.
            </p>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              priority={index < 4} // First row loads eagerly for LCP
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
