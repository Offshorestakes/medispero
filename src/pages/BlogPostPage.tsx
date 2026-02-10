import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft, ArrowRight, User, Tag, Share2, BookOpen } from "lucide-react";
import { getPostBySlug, getRelatedPosts, BlogPost } from "@/data/blogPosts";
import DosageCalculator from "@/components/blog/DosageCalculator";
import SymptomQuiz from "@/components/blog/SymptomQuiz";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post);

  // Calculate word count for schema
  const wordCount = post.content.split(/\s+/).length;

  // Article Schema (NewsArticle for Google News/Discover visibility)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "alternativeHeadline": post.excerpt,
    "description": post.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": `https://medispero.com${post.image}`,
      "width": 1200,
      "height": 630,
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "wordCount": wordCount,
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorTitle,
      "url": "https://medispero.com/about",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Medi Spero",
      "url": "https://medispero.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://medispero.com/logo.png",
        "width": 512,
        "height": 512,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://medispero.com/blog/${post.slug}`,
    },
    "isAccessibleForFree": true,
    "inLanguage": "en-US",
  };

  // BreadcrumbList Schema for blog navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://medispero.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://medispero.com/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category,
        "item": `https://medispero.com/blog?category=${encodeURIComponent(post.category)}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": `https://medispero.com/blog/${post.slug}`,
      },
    ],
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{post.title} | Medi Spero Wellness Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <link rel="canonical" href={`https://medispero.com/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`https://medispero.com${post.image}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`https://medispero.com${post.image}`} />
        
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 h-[50vh] md:h-[60vh]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          </div>
          
          <div className="relative container-wide pt-32 pb-12 md:pt-48 md:pb-16">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            
            <Badge className="mb-4 bg-primary text-primary-foreground">
              {post.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mb-6">
              {post.title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{post.author}</p>
                  <p className="text-xs">{post.authorTitle}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", { 
                    month: "long", 
                    day: "numeric", 
                    year: "numeric" 
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="container-wide py-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none dark:prose-invert
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-strong:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:marker:text-primary
              prose-table:border-border prose-th:bg-muted prose-th:p-3 prose-td:p-3 prose-td:border-border
              prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-6
              prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            ">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Interactive Elements for new deep-dive posts */}
            {(post.slug === "cbd-thc-adhd-focus-concentration" || 
              post.slug === "cbd-delta8-anxiety-stress-relief" || 
              post.slug === "cbd-thc-depression-mood-enhancement") && (
              <div className="mt-12 space-y-0">
                <DosageCalculator />
                <SymptomQuiz />
              </div>
            )}

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-12 p-6 md:p-8 bg-muted/50 rounded-2xl">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{post.author}</h4>
                  <p className="text-sm text-primary mb-3">{post.authorTitle}</p>
                  <p className="text-muted-foreground text-sm">
                    {post.author} is a leading expert in cannabinoid therapeutics with over 15 years 
                    of experience in clinical pharmacology. Their research focuses on the therapeutic 
                    applications of CBD and hemp-derived cannabinoids for mental health conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="section-padding bg-muted/30">
            <div className="container-wide">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Related Articles</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group bg-card border border-border rounded-2xl overflow-hidden card-hover"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">
                          {relatedPost.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(relatedPost.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Experience Pharmaceutical-Grade Wellness
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Ready to try the products discussed in this article? Shop our collection of 
                lab-tested CBD, Delta-8, and Delta-9 products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-secondary">
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/blog">More Articles</Link>
                </Button>
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

export default BlogPostPage;
