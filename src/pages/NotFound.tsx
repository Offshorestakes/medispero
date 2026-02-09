import { Link } from "react-router-dom";
import { Search, Home, ShoppingBag, FileText, MessageCircle } from "lucide-react";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const popularCategories = [
    { name: "CBD Oils & Tinctures", slug: "/category/cbd-oils" },
    { name: "Anti-Anxiety Products", slug: "/category/anti-anxiety" },
    { name: "Mood & Depression Support", slug: "/category/mood-support" },
    { name: "ADHD & Focus", slug: "/category/adhd-focus" },
    { name: "Sleep & Wellness", slug: "/category/sleep-wellness" },
    { name: "Pharmaceutical Capsules", slug: "/category/pharma-capsules" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-muted/30 py-16">
        <div className="container-wide max-w-2xl text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Oops! This page has taken a wellness break.</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or may have moved. Try searching for your product, or browse our popular categories below.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mb-10">
            <Input
              type="search"
              placeholder="Search for CBD products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              aria-label="Search products"
            />
            <Button type="submit" aria-label="Search">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>

          {/* Popular Categories */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">Browse Popular Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {popularCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={cat.slug}
                  className="rounded-lg border border-border bg-card p-3 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link to="/products" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              <ShoppingBag className="h-4 w-4" /> All Products
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              <FileText className="h-4 w-4" /> Blog
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              <MessageCircle className="h-4 w-4" /> Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default NotFound;
