import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  // Filter products
  let filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Sort products
  switch (sortBy) {
    case "price-low":
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filteredProducts = [...filteredProducts].reverse();
      break;
    default:
      // Featured - keep original order
      break;
  }

  // Paginate
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="container-wide">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium">All Products</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container-wide text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All CBD Products</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our complete collection of premium CBD products. Third-party lab tested, organic hemp, made in USA.
            </p>
            <p className="text-sm text-secondary font-medium mt-4">
              {filteredProducts.length} Products
            </p>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="section-padding">
          <div className="container-wide">
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
              <div className="flex flex-wrap items-center gap-4">
                <Select value={selectedCategory} onValueChange={(value) => { setSelectedCategory(value); setCurrentPage(1); }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductsPage;
