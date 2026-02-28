import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact Medi Spero — CBD Product Support & Wholesale | Medi Spero</title>
        <meta name="description" content="Contact Medi Spero for questions about CBD products, orders, or wholesale inquiries. Email info@medispero.com or WhatsApp +1 (334) 746-9312." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://medispero.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Medi Spero — CBD Product Support" />
        <meta property="og:description" content="Questions about CBD products, orders, or wholesale? Contact Medi Spero's support team." />
        <meta property="og:url" content="https://medispero.com/contact" />
        <meta property="og:image" content="https://medispero.com/og-homepage.jpg" />
        <meta property="og:site_name" content="Medi Spero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Medi Spero" />
        <meta name="twitter:description" content="Get in touch with Medi Spero for CBD product questions, orders, or wholesale inquiries." />
        <meta name="twitter:image" content="https://medispero.com/og-homepage.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Medi Spero",
            description: "Contact Medi Spero for CBD product questions, order support, or wholesale inquiries.",
            url: "https://medispero.com/contact",
            mainEntity: {
              "@type": "Organization",
              name: "Medi Spero",
              email: "info@medispero.com",
              telephone: "+1-334-746-9312",
              url: "https://medispero.com",
              areaServed: { "@type": "Country", name: "United States" },
            },
          })}
        </script>
      </Helmet>
      <Header />
      <BreadcrumbNav items={[{ name: "Home", href: "/" }, { name: "Contact Us" }]} />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container-wide text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about our CBD products? Our friendly team is here to help. 
              Reach out and we'll respond as soon as we can.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <Input placeholder="John" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <Input placeholder="Doe" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input type="email" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <Input placeholder="How can we help?" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea 
                      placeholder="Tell us more about your inquiry..." 
                      rows={5}
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full btn-secondary text-lg py-6">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    Whether you have questions about our products, need help with an order, 
                    or want to learn more about CBD, we're here to help.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:info@medispero.com" className="text-primary hover:underline">
                        info@medispero.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>


                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="h-6 w-6 text-[#25D366]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <a 
                        href="https://wa.me/13347469312" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#25D366] hover:underline"
                      >
                        +1 (334) 746-9312
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Fastest response time
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        Medi Spero LLC<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                        Saturday: 10:00 AM - 4:00 PM EST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-8">
                  <h3 className="font-semibold mb-3">Service Area</h3>
                  <div className="rounded-xl overflow-hidden border border-border">
                    <iframe
                      title="Medi Spero service area — United States"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12587725.048583!2d-104.65!3d37.275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1700000000000"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Medi Spero ships premium CBD products nationwide across all 50 states.
                  </p>
                </div>
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

export default ContactPage;
