import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";

const categoryImages: Record<string, string> = {
  "pharma-capsules": "💊",
  "anti-anxiety": "🧘",
  "adhd-focus": "🧠",
  "mood-support": "😊",
  "cbd-oils": "🧴",
  "cbd-isolate-powder": "⚗️",
  "cbd-isolate-crystals": "💎",
  "cbd-isolate-pure-spectrum": "🔬",
  "cbd-capsules": "💊",
  "sleep-wellness": "😴",
  "cbd-skincare": "✨",
  "bundles": "🎁"
};

const CategoriesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Shop by Category
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Find Your Perfect CBD Solution
          </h2>
          <p className="text-muted-foreground">
            Explore our curated collection of premium CBD products designed for every wellness need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="category-card group p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-lg"
            >
              {/* Emoji/Icon */}
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {categoryImages[category.slug] || "🌿"}
              </div>

              {/* Category Name */}
              <h3 className="font-semibold text-sm sm:text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {category.name}
              </h3>

              {/* Product Count */}
              <p className="text-sm text-muted-foreground mb-3">
                {category.productCount} Products
              </p>

              {/* Arrow */}
              <div className="flex items-center justify-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Shop Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
