import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const BlogPage = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  const categories = [...new Set(blogPosts.map(post => post.category))];

  // Structured data for blog
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Medi Spero Wellness Blog",
    "description": "Expert insights on CBD, THC, anxiety relief, mood support, and natural wellness solutions",
    "url": "https://medispero.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Medi Spero",
      "logo": {
        "@type": "ImageObject",
        "url": "https://medispero.com/logo.png"
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "image": post.image
    }))
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Wellness Blog | CBD & THC for Anxiety, Depression & Mood Support | Medi Spero</title>
        <meta name="description" content="Expert articles on pharmaceutical-grade CBD, Delta-8, and Delta-9 THC for anxiety relief, depression support, and mood enhancement. Evidence-based wellness insights from Medi Spero." />
        <meta name="keywords" content="CBD blog, THC wellness, anxiety relief articles, depression support, mood enhancement, Delta-8 anxiety, Delta-9 mood, CBD education, hemp wellness blog, natural mental health" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://medispero.com/blog" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <Header />
      <BreadcrumbNav items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 py-16 md:py-24">
          <div className="container-wide text-center">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
              Wellness Education
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              CBD & THC Wellness Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Expert insights on pharmaceutical-grade CBD and hemp-derived THC for 
              <span className="text-primary font-semibold"> anxiety relief</span>,{" "}
              <span className="text-secondary font-semibold">mood support</span>, and natural wellness.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Badge key={category} variant="outline" className="px-4 py-2">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="section-padding">
          <div className="container-wide">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className={`group bg-card border border-border rounded-2xl overflow-hidden card-hover ${
                    index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <article>
                    <div className={`relative ${index === 0 ? "aspect-[16/9] lg:aspect-[16/10]" : "aspect-video"}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-6 ${index === 0 ? "lg:p-8" : ""}`}>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className={`font-bold mb-3 group-hover:text-primary transition-colors ${
                        index === 0 ? "text-2xl lg:text-3xl" : "text-xl"
                      }`}>
                        {post.title}
                      </h3>
                      <p className={`text-muted-foreground mb-4 ${index === 0 ? "text-base" : "text-sm line-clamp-2"}`}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {post.author}
                        </span>
                        <span className="text-primary flex items-center gap-1 text-sm font-medium">
                          Read More <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Articles */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map(post => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden card-hover"
                >
                  <article>
                    <div className="relative aspect-video">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-primary flex items-center gap-2 text-sm font-medium">
                        Read Article <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Informed on Wellness
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest research on CBD, THC, and natural approaches 
                to anxiety and mood support. Get exclusive discounts and early access to new products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-foreground bg-white border-0 focus:ring-2 focus:ring-secondary"
                />
                <Button className="btn-secondary whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-6">Understanding CBD and THC for Mental Health</h2>
              
              <p className="text-muted-foreground mb-4">
                At Medi Spero, we're committed to providing pharmaceutical-grade CBD and hemp-derived THC products 
                that support mental wellness naturally. Our blog explores the science behind cannabinoids for 
                anxiety relief, depression support, and mood enhancement.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">CBD for Anxiety and Stress Relief</h3>
              <p className="text-muted-foreground mb-4">
                CBD (cannabidiol) has shown promising results in clinical studies for reducing anxiety symptoms. 
                Unlike traditional anti-anxiety medications, CBD works with your body's endocannabinoid system 
                to promote calm without sedation or risk of dependence. Our pharmaceutical-grade CBD products 
                are third-party tested to ensure purity and potency.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">Delta-8 THC for Natural Calm</h3>
              <p className="text-muted-foreground mb-4">
                Delta-8 THC offers a gentle, legal alternative for those seeking anxiety relief. This hemp-derived 
                cannabinoid provides calming effects without the intense psychoactive experience of traditional THC. 
                Our Delta-8 products are Farm Bill compliant and contain less than 0.3% Delta-9 THC.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">Hemp-Derived Delta-9 for Mood Support</h3>
              <p className="text-muted-foreground mb-4">
                Our hemp-derived Delta-9 THC products offer natural mood elevation and depression support. 
                Legal under the 2018 Farm Bill, these products provide the therapeutic benefits of THC 
                in a safe, controlled manner. Perfect for those seeking natural alternatives to traditional 
                antidepressant medications.
              </p>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 mt-8">
                <p className="text-sm text-muted-foreground">
                  <strong>Disclaimer:</strong> The information provided on this blog is for educational purposes only 
                  and is not intended as medical advice. CBD and THC products are not intended to diagnose, treat, 
                  cure, or prevent any disease. Always consult with a healthcare professional before starting any 
                  new supplement regimen, especially if you are currently taking medications.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPage;
