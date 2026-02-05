import { Link } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "CBD vs. THC: Understanding the Key Differences",
    excerpt: "Learn about the distinct properties of CBD and THC, their effects on the body, and why CBD is legal while THC remains controlled.",
    image: "/placeholder.svg",
    category: "Education",
    author: "Dr. Sarah Johnson",
    date: "January 15, 2025",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "How to Choose the Right CBD Dosage for You",
    excerpt: "Finding the perfect CBD dosage depends on several factors. This comprehensive guide will help you start your CBD journey safely.",
    image: "/placeholder.svg",
    category: "Guides",
    author: "Michael Chen, PharmD",
    date: "January 10, 2025",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "The Complete Guide to CBD for Better Sleep",
    excerpt: "Struggling with sleep? Discover how CBD can help regulate your sleep cycle and promote more restful nights naturally.",
    image: "/placeholder.svg",
    category: "Wellness",
    author: "Dr. Emily Rodriguez",
    date: "January 5, 2025",
    readTime: "6 min read"
  }
];

const BlogSection = () => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Our Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              CBD Education & Insights
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Expert articles to help you make informed decisions about your wellness journey.
            </p>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="bg-card border border-border rounded-2xl overflow-hidden group card-hover"
            >
              {/* Image */}
              <div className="aspect-video bg-muted overflow-hidden relative">
                {/* Placeholder skeleton */}
                {!loadedImages[post.id] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 animate-pulse" />
                )}
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(post.id)}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${loadedImages[post.id] ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <span className="text-xs font-medium text-secondary uppercase tracking-wider">
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span className="line-clamp-1">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
