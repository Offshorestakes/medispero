import { useParams, Link } from "react-router-dom";
import { categories as allCategories } from "@/data/categories";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, categories } from "@/data/products";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(c => c.slug === slug);
  const products = slug ? getProductsByCategory(slug) : [];

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <Link to="/products" className="text-primary hover:underline">
              View All Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{category.name} | Lab-Tested CBD & Hemp Products | Medi Spero</title>
        <meta name="description" content={`Shop ${category.name} from Medi Spero. ${category.description} Lab-tested, pharmaceutical-grade. Free shipping on orders over $250.`} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={`https://medispero.com/category/${slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${category.name} | Medi Spero`} />
        <meta property="og:description" content={`Shop ${category.name} from Medi Spero. Lab-tested, pharmaceutical-grade. Free shipping $250+.`} />
        <meta property="og:url" content={`https://medispero.com/category/${slug}`} />
        <meta property="og:image" content="https://medispero.com/og-homepage.jpg" />
        <meta property="og:site_name" content="Medi Spero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category.name} | Medi Spero`} />
        <meta name="twitter:description" content={`Shop ${category.name}. Lab-tested, pharmaceutical-grade CBD products.`} />
        <meta name="twitter:image" content="https://medispero.com/og-homepage.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${category.name} — Lab-Tested CBD Products`,
            description: category.description,
            url: `https://medispero.com/category/${slug}`,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: products.length,
              itemListElement: products.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://medispero.com/product/${p.slug}`,
                name: p.name,
                image: p.images?.[0],
              })),
            },
          })}
        </script>
      </Helmet>
      <Header />
      <BreadcrumbNav items={[
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: category.name },
      ]} />
      <main id="main-content" className="flex-1">

        {/* Category Header */}
        <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container-wide text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name} — Lab-Tested CBD Products</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
            <p className="text-sm text-secondary font-medium mt-4">
              {products.length} Products
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Related Categories — Internal Linking */}
        <section className="py-12 bg-muted/30">
          <div className="container-wide">
            <h2 className="text-2xl font-bold mb-6">Explore Related Categories</h2>
            <div className="flex flex-wrap gap-3">
              {allCategories
                .filter(c => c.slug !== slug)
                .slice(0, 5)
                .map(c => (
                  <Link
                    key={c.id}
                    to={`/category/${c.slug}`}
                    className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>
                Looking for something specific? Browse our{" "}
                <Link to="/products" className="text-primary hover:underline font-medium">complete CBD product catalog</Link>
                {" "}or learn more about{" "}
                <Link to="/education" className="text-primary hover:underline font-medium">how CBD works</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CategoryPage;
