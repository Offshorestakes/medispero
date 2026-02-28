import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Package, Percent, Truck, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WholesalePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Application Received",
      description: "We'll review your wholesale application and contact you within 2-3 business days.",
    });
    
    setIsSubmitting(false);
  };

  const benefits = [
    { icon: Percent, title: "Volume Discounts", desc: "Up to 50% off retail pricing" },
    { icon: Package, title: "Low Minimums", desc: "Starting at just $500" },
    { icon: Truck, title: "Free Shipping", desc: "On orders over $1,000" },
    { icon: Building2, title: "White Label", desc: "Custom branding available" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Wholesale CBD & THC Products | Medi Spero</title>
        <meta name="description" content="Partner with Medi Spero for wholesale CBD and hemp-derived THC products. Competitive pricing, low minimums, and white label options available." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://medispero.com/wholesale" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Wholesale CBD & THC Products | Medi Spero" />
        <meta property="og:description" content="Partner with Medi Spero for wholesale CBD and hemp products. Competitive pricing & white label options." />
        <meta property="og:url" content="https://medispero.com/wholesale" />
        <meta property="og:image" content="https://medispero.com/og-homepage.jpg" />
        <meta property="og:site_name" content="Medi Spero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wholesale CBD Products | Medi Spero" />
        <meta name="twitter:description" content="Wholesale CBD and hemp-derived THC products. Competitive pricing, low minimums." />
        <meta name="twitter:image" content="https://medispero.com/og-homepage.jpg" />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Wholesale Partnership</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Partner with Medi Spero to bring pharmaceutical-grade CBD and hemp products to your customers. 
              Competitive pricing, reliable supply, and exceptional quality.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-card border border-border rounded-2xl">
                  <benefit.icon className="h-10 w-10 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Why Partner With Us?</h2>
                <ul className="space-y-4">
                  {[
                    "Third-party tested, pharmaceutical-grade products",
                    "Full compliance documentation and COAs",
                    "Dedicated wholesale account manager",
                    "Marketing materials and product education",
                    "Flexible payment terms for qualified accounts",
                    "White label and private label options",
                    "Drop shipping available",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Apply for Wholesale Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website (optional)</Label>
                      <Input id="website" type="url" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Tell us about your business</Label>
                      <Textarea id="message" rows={4} placeholder="Business type, expected order volume, etc." />
                    </div>
                    <Button type="submit" className="w-full btn-secondary" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default WholesalePage;
