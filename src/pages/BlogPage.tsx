import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";

// Import blog images
import cbdOilImage from "@/assets/products/cbd-oil-tincture.jpg";
import delta8Image from "@/assets/products/delta8-calm-gummies.jpg";
import delta9Image from "@/assets/products/delta9-mood-tincture.jpg";
import cbdSleepImage from "@/assets/products/cbd-sleep-tincture.jpg";
import cbdStressImage from "@/assets/products/cbd-stress-spray.jpg";
import cbdMoodImage from "@/assets/products/cbd-mood-softgels.jpg";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "cbd-for-anxiety-complete-guide",
    title: "CBD for Anxiety: A Complete Guide to Natural Relief",
    excerpt: "Discover how pharmaceutical-grade CBD can help manage anxiety symptoms naturally, without the side effects of traditional medications.",
    content: `Anxiety affects millions of Americans, and many are seeking natural alternatives to prescription medications. CBD (cannabidiol) has emerged as a promising option for anxiety relief, with growing scientific evidence supporting its effectiveness.

**How CBD Works for Anxiety**

CBD interacts with the body's endocannabinoid system, which plays a crucial role in regulating mood, stress response, and emotional balance. Unlike THC, CBD doesn't produce psychoactive effects, making it an appealing option for those seeking relief without the "high."

**Benefits of CBD for Anxiety:**
- Reduces symptoms of generalized anxiety disorder (GAD)
- May help with social anxiety
- Promotes relaxation without sedation
- Non-addictive with minimal side effects
- Can be used alongside other treatments

**Choosing the Right CBD Product:**
For anxiety relief, we recommend starting with a full-spectrum CBD oil or tincture. These products provide fast-acting relief and allow for precise dosing. Start with a low dose (10-25mg) and gradually increase until you find your optimal level.`,
    image: cbdOilImage,
    category: "Anti-Anxiety",
    tags: ["CBD", "anxiety", "mental health", "natural relief"],
    author: "Dr. Sarah Mitchell",
    date: "2026-01-28",
    readTime: "8 min read",
    featured: true
  },
  {
    id: "2",
    slug: "delta-8-thc-anxiety-relief",
    title: "Delta-8 THC for Anxiety: What the Research Shows",
    excerpt: "Learn how hemp-derived Delta-8 THC offers a gentle, legal approach to anxiety management with fewer side effects than traditional THC.",
    content: `Delta-8 THC has gained significant attention as a legal alternative for anxiety relief. This hemp-derived cannabinoid offers many of the calming benefits of traditional THC with reduced psychoactive intensity.

**Understanding Delta-8 THC:**

Delta-8 is a naturally occurring cannabinoid found in hemp plants. It's chemically similar to Delta-9 THC (the primary psychoactive compound in cannabis) but produces milder effects, making it ideal for those seeking anxiety relief without overwhelming intoxication.

**Why Choose Delta-8 for Anxiety?**
- Produces a calm, clear-headed effect
- Legal in most states (Farm Bill compliant)
- Less likely to cause paranoia than Delta-9
- Available in various forms: gummies, vapes, tinctures
- Lab-tested for safety and potency

**Dosage Recommendations:**
For anxiety relief, start with 5-10mg of Delta-8 and wait 2 hours before taking more. Effects are typically felt within 30-60 minutes when taken orally.`,
    image: delta8Image,
    category: "Anti-Anxiety",
    tags: ["Delta-8", "THC", "anxiety", "hemp-derived"],
    author: "Michael Chen, PharmD",
    date: "2026-01-25",
    readTime: "7 min read",
    featured: true
  },
  {
    id: "3",
    slug: "hemp-derived-delta-9-mood-support",
    title: "Hemp-Derived Delta-9 THC for Depression and Mood Enhancement",
    excerpt: "Explore how legal, hemp-derived Delta-9 THC products can naturally support mood and help manage symptoms of depression.",
    content: `Depression is one of the most common mental health conditions, and many people are looking for natural alternatives to traditional antidepressants. Hemp-derived Delta-9 THC offers a legal, plant-based approach to mood support.

**How Delta-9 THC Supports Mood:**

Delta-9 THC interacts with the brain's endocannabinoid receptors, which regulate mood, pleasure, and emotional processing. Research suggests that cannabinoids may help increase serotonin levels and promote feelings of well-being.

**Farm Bill Compliant Delta-9:**
Our hemp-derived Delta-9 products contain less than 0.3% THC by dry weight, making them federally legal while still providing therapeutic benefits.

**Benefits for Mood Support:**
- Elevates mood naturally
- Reduces feelings of sadness and hopelessness
- Promotes relaxation and stress relief
- Enhances pleasure and enjoyment
- Supports emotional balance

**Product Recommendations:**
For mood support, we recommend our Delta-9 Mood Uplift Gummies or Mood Tincture. Start with a low dose and take consistently for best results.`,
    image: delta9Image,
    category: "Mood Support",
    tags: ["Delta-9", "depression", "mood", "antidepressant alternative"],
    author: "Dr. Amanda Rodriguez",
    date: "2026-01-22",
    readTime: "9 min read",
    featured: true
  },
  {
    id: "4",
    slug: "pharmaceutical-grade-cbd-explained",
    title: "What Makes Pharmaceutical-Grade CBD Different?",
    excerpt: "Not all CBD is created equal. Learn what sets pharmaceutical-grade CBD apart and why quality matters for therapeutic benefits.",
    content: `With thousands of CBD products on the market, understanding quality differences is crucial. Pharmaceutical-grade CBD represents the highest standard of purity, potency, and safety.

**What is Pharmaceutical-Grade CBD?**

Pharmaceutical-grade CBD meets the same rigorous standards as prescription medications, including:
- 99%+ purity levels
- Consistent potency across batches
- Third-party lab verification
- GMP-certified manufacturing
- Full traceability from seed to sale

**Why Quality Matters:**

Lower-quality CBD products may contain contaminants, inconsistent CBD levels, or undisclosed ingredients. Pharmaceutical-grade CBD ensures you receive the therapeutic benefits you're seeking.

**How to Identify Quality CBD:**
- Look for third-party lab reports (COAs)
- Check for GMP certification
- Verify organic, USA-grown hemp sources
- Review extraction methods (CO2 is preferred)
- Confirm THC levels are below 0.3%

At Medi Spero, all our products meet pharmaceutical-grade standards and undergo rigorous testing.`,
    image: cbdMoodImage,
    category: "Education",
    tags: ["CBD", "pharmaceutical grade", "quality", "lab testing"],
    author: "Dr. Sarah Mitchell",
    date: "2026-01-18",
    readTime: "6 min read"
  },
  {
    id: "5",
    slug: "cbd-vs-antidepressants",
    title: "CBD vs Traditional Antidepressants: What You Need to Know",
    excerpt: "Compare CBD to traditional antidepressants and understand how cannabinoids may offer a natural approach to mental health support.",
    content: `As more people seek alternatives to traditional psychiatric medications, CBD has emerged as a popular option. Here's how CBD compares to conventional antidepressants.

**Traditional Antidepressants:**
- SSRIs, SNRIs, and other classes
- Require prescription
- Often take 4-6 weeks to work
- Common side effects: weight gain, sexual dysfunction, drowsiness
- Can be difficult to discontinue

**CBD for Mental Health:**
- Available without prescription
- Effects may be felt quickly
- Minimal side effects
- Non-addictive
- Can be used alongside other treatments (consult your doctor)

**Important Considerations:**
CBD is not intended to replace prescribed medications. Always consult with your healthcare provider before making changes to your treatment plan. CBD can complement traditional approaches or serve as a starting point for those with mild symptoms.

**Our Recommendation:**
For mood support, try our Full Spectrum Mood Softgels or CBD + Delta-8 Calm Tincture. Both are formulated specifically for emotional wellness.`,
    image: cbdStressImage,
    category: "Mood Support",
    tags: ["CBD", "antidepressants", "mental health", "natural alternatives"],
    author: "Michael Chen, PharmD",
    date: "2026-01-15",
    readTime: "8 min read"
  },
  {
    id: "6",
    slug: "cbd-for-sleep-and-anxiety",
    title: "How CBD Helps Break the Anxiety-Insomnia Cycle",
    excerpt: "Anxiety and sleep problems often go hand-in-hand. Discover how CBD can help address both issues naturally.",
    content: `Anxiety and insomnia are closely linked—stress keeps you awake, and poor sleep worsens anxiety. CBD offers a natural solution to break this cycle.

**The Anxiety-Sleep Connection:**

When you're anxious, your body produces stress hormones that make it difficult to relax and fall asleep. Over time, sleep deprivation can intensify anxiety, creating a vicious cycle.

**How CBD Helps:**
- Reduces cortisol levels
- Calms racing thoughts
- Promotes relaxation without sedation
- Improves sleep quality and duration
- Addresses both symptoms simultaneously

**Best CBD Products for Sleep & Anxiety:**
1. CBD + CBN Sleep Tincture - CBN is a natural sedative
2. Calm Tea Blend - Relaxing herbal formula with CBD
3. Sleep Gummies with Melatonin - Dual-action formula

**Usage Tips:**
Take CBD 30-60 minutes before bed for best results. Combine with good sleep hygiene: reduce screen time, keep a consistent schedule, and create a relaxing bedtime routine.`,
    image: cbdSleepImage,
    category: "Anti-Anxiety",
    tags: ["CBD", "sleep", "anxiety", "insomnia", "relaxation"],
    author: "Dr. Amanda Rodriguez",
    date: "2026-01-10",
    readTime: "7 min read"
  }
];

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
        <link rel="canonical" href="https://medispero.com/blog" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <Header />

      <main className="flex-1">
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
                <article 
                  key={post.id}
                  className={`group bg-card border border-border rounded-2xl overflow-hidden card-hover ${
                    index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
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
                      <Button variant="ghost" size="sm" className="gap-1 text-primary">
                        Read More <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </article>
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
                <article 
                  key={post.id}
                  className="group bg-card border border-border rounded-2xl overflow-hidden card-hover"
                >
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
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      Read Article <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
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