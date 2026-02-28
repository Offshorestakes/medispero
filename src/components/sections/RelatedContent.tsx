import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ShoppingBag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { products as allProducts, type Product } from "@/data/products";

interface RelatedContentProps {
  /** Current page category to match related content (e.g. "anti-anxiety", "cbd-oils") */
  category?: string;
  /** Tags to match blog posts against */
  tags?: string[];
  /** Products to exclude (e.g. the current product slug) */
  excludeProductSlug?: string;
  /** Blog post to exclude (e.g. the current post slug) */
  excludeBlogSlug?: string;
  /** Max related products to show */
  maxProducts?: number;
  /** Max related blog posts to show */
  maxPosts?: number;
}

// Map categories to relevant blog/product keywords for cross-matching
const categoryKeywords: Record<string, string[]> = {
  "anti-anxiety": ["anxiety", "stress", "calm", "relief", "focus"],
  "mood-support": ["mood", "depression", "delta-9", "delta-8", "emotional"],
  "adhd-focus": ["adhd", "focus", "concentration", "attention", "cognitive"],
  "cbd-oils": ["cbd oil", "tincture", "sublingual", "full spectrum"],
  "pharma-capsules": ["pharmaceutical", "capsule", "clinical", "dosing"],
  "sleep-wellness": ["sleep", "insomnia", "rest", "melatonin", "recovery"],
  "cbd-vape": ["vape", "inhale", "fast-acting", "disposable"],
  "cbd-isolate-powder": ["isolate", "pure", "99%", "powder", "bulk"],
  "cbd-isolate-crystals": ["isolate", "crystals", "pure", "99%"],
  "cbd-isolate-pure-spectrum": ["isolate", "spectrum", "pure", "tincture"],
};

function scoreBlogPost(
  post: (typeof blogPosts)[0],
  category?: string,
  tags?: string[]
): number {
  let score = 0;
  const keywords = category ? categoryKeywords[category] || [] : [];
  const postText = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();

  for (const kw of keywords) {
    if (postText.includes(kw)) score += 2;
  }
  if (tags) {
    for (const tag of tags) {
      if (post.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))) score += 3;
    }
  }
  if (post.featured) score += 1;
  return score;
}

function getRelatedProducts(
  category?: string,
  excludeSlug?: string,
  max = 4
): Product[] {
  if (!category) {
    // Grab a mix of featured products
    return allProducts
      .filter((p) => p.slug !== excludeSlug)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, max);
  }
  const sameCat = allProducts.filter(
    (p) => p.category === category && p.slug !== excludeSlug
  );
  if (sameCat.length >= max) {
    return sameCat.sort((a, b) => b.rating - a.rating).slice(0, max);
  }
  // Fill with top-rated from other categories
  const others = allProducts
    .filter((p) => p.category !== category && p.slug !== excludeSlug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, max - sameCat.length);
  return [...sameCat, ...others];
}

function getRelatedPosts(
  category?: string,
  tags?: string[],
  excludeSlug?: string,
  max = 3
) {
  return blogPosts
    .filter((p) => p.slug !== excludeSlug)
    .map((post) => ({ post, score: scoreBlogPost(post, category, tags) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((x) => x.post);
}

const RelatedContent = ({
  category,
  tags,
  excludeProductSlug,
  excludeBlogSlug,
  maxProducts = 4,
  maxPosts = 3,
}: RelatedContentProps) => {
  const relatedProducts = getRelatedProducts(category, excludeProductSlug, maxProducts);
  const relatedPosts = getRelatedPosts(category, tags, excludeBlogSlug, maxPosts);

  if (relatedProducts.length === 0 && relatedPosts.length === 0) return null;

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                You May Also Like
              </h2>
              <Link
                to="/products"
                className="text-sm text-primary hover:underline font-medium flex items-center gap-1"
              >
                View All Products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.images[0]}
                      alt={`${product.name} — Medi Spero CBD product`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <p className="text-xs text-muted-foreground mb-1 capitalize">
                      {product.category.replace(/-/g, " ")}
                    </p>
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Blog Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-secondary" />
                Related Articles
              </h2>
              <Link
                to="/blog"
                className="text-sm text-primary hover:underline font-medium flex items-center gap-1"
              >
                View All Articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width={400}
                      height={225}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-secondary font-medium mb-1">
                      {post.category}
                    </p>
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="text-primary text-sm font-medium flex items-center gap-1 mt-3">
                      Read More <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedContent;
