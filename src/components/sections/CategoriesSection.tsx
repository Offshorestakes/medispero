import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

const categoryImages: Record<string, { src: string; alt: string }> = {
  "pharma-capsules": { src: "/images/categories/pharma-capsules.webp", alt: "Pharmaceutical-grade CBD capsule for therapeutic wellness" },
  "anti-anxiety": { src: "/images/categories/anti-anxiety.webp", alt: "CBD dropper bottle with lavender for anxiety relief" },
  "adhd-focus": { src: "/images/categories/adhd-focus.webp", alt: "Neural brain illustration representing ADHD focus and cognitive clarity" },
  "mood-support": { src: "/images/categories/mood-support.webp", alt: "Warm sunrise hemp bottle for mood and emotional wellness support" },
  "cbd-oils": { src: "/images/categories/cbd-oils.webp", alt: "Premium amber CBD oil dropper bottle with hemp leaves" },
  "cbd-isolate-powder": { src: "/images/categories/cbd-isolate-powder.webp", alt: "99% pure CBD isolate powder in laboratory glass dish" },
  "cbd-isolate-crystals": { src: "/images/categories/cbd-isolate-crystals.webp", alt: "Pharmaceutical-grade CBD isolate crystals in glass container" },
  "cbd-isolate-pure-spectrum": { src: "/images/categories/cbd-isolate-pure-spectrum.webp", alt: "CBD spectrum analysis lab test tubes with golden liquid" },
  "cbd-vape": { src: "/images/categories/cbd-vape.webp", alt: "Premium CBD vape cartridge with golden oil" },
  "cbd-capsules": { src: "/images/categories/cbd-capsules.webp", alt: "CBD softgel capsules for convenient daily dosing" },
  "sleep-wellness": { src: "/images/categories/sleep-wellness.webp", alt: "Nighttime CBD sleep formula with crescent moon and lavender" },
  "cbd-skincare": { src: "/images/categories/cbd-skincare.webp", alt: "Luxurious CBD-infused skincare cream in elegant glass jar" },
  "bundles": { src: "/images/categories/bundles.webp", alt: "Curated premium CBD wellness bundle gift box" },
};

const CategoriesSection = () => {
  return (
    <section aria-label="Product categories" className="section-padding bg-background">
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
          {categories.map((category, index) => {
            const img = categoryImages[category.slug];
            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="category-card group p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-lg"
              >
                {/* Category Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-xl overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                  {img ? (
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={80}
                      height={80}
                      loading={index < 4 ? "eager" : "lazy"}
                      fetchPriority={index < 4 ? "high" : undefined}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-3xl">🌿</div>
                  )}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
