import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Truck, Package, Clock, Globe, MapPin, Shield, AlertCircle } from "lucide-react";

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Shipping Policy | Fast & Discreet CBD Delivery | Medi Spero</title>
        <meta name="description" content="Free discreet shipping on orders over $250. Standard 5-7 days, Express 2-3 days, Overnight available. All Medi Spero CBD orders ship in plain packaging." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://medispero.com/shipping" />
      </Helmet>
      <Header />
      <BreadcrumbNav items={[{ name: "Home", href: "/" }, { name: "Shipping Policy" }]} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Policy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fast, reliable, and discreet shipping on all orders. Learn about our shipping options, 
              delivery times, and policies.
            </p>
          </div>
        </section>

        {/* Shipping Options */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Shipping Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-light-blue flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Standard Shipping</h3>
                    <p className="text-secondary font-semibold">FREE on orders $250+</p>
                  </div>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Delivery: 5-7 business days</li>
                  <li>• Orders under $250: $14.99 flat rate</li>
                  <li>• USPS First Class or Priority Mail</li>
                  <li>• Full tracking provided</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-mint flex items-center justify-center">
                    <Truck className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Express Shipping</h3>
                    <p className="text-secondary font-semibold">$12.99 flat rate</p>
                  </div>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Delivery: 2-3 business days</li>
                  <li>• USPS Priority Mail Express</li>
                  <li>• Signature confirmation available</li>
                  <li>• Full tracking provided</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-light-blue flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Overnight Shipping</h3>
                    <p className="text-secondary font-semibold">$24.99 flat rate</p>
                  </div>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Delivery: Next business day</li>
                  <li>• Order by 2 PM EST for same-day dispatch</li>
                  <li>• FedEx or UPS Next Day Air</li>
                  <li>• Signature required</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-mint flex items-center justify-center">
                    <Globe className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">International Shipping</h3>
                    <p className="text-secondary font-semibold">Calculated at checkout</p>
                  </div>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Delivery: 7-14 business days</li>
                  <li>• Available to select countries</li>
                  <li>• Customs duties may apply</li>
                  <li>• Full tracking provided</li>
                </ul>
              </div>
            </div>

            {/* Processing Times */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Order Processing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Processing Times</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Orders placed before 2 PM EST: Ship same business day</li>
                    <li>• Orders placed after 2 PM EST: Ship next business day</li>
                    <li>• Weekend orders: Ship Monday</li>
                    <li>• Holiday orders: Ship next business day</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Order Confirmation</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Confirmation email sent immediately after purchase</li>
                    <li>• Shipping confirmation with tracking number sent when shipped</li>
                    <li>• Track your order anytime via our website</li>
                    <li>• SMS updates available at checkout</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Discreet Packaging */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-light-blue flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Discreet Packaging</h2>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-muted-foreground mb-4">
                  Your privacy is our priority. All Medi Spero orders are shipped in plain, unmarked packaging:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ No logos, branding, or product descriptions on exterior</li>
                  <li>✓ Return address shows "MS Fulfillment" only</li>
                  <li>✓ Contents are not visible or identifiable from outside</li>
                  <li>✓ Bank/credit card statements show "MEDI SPERO LLC"</li>
                </ul>
              </div>
            </div>

            {/* Shipping Restrictions */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-mint flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold">Shipping Restrictions</h2>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold mb-3">Domestic Shipping</h3>
                <p className="text-muted-foreground mb-4">
                  We ship to all 50 U.S. states. However, some products may have restrictions in certain states 
                  due to local regulations. Orders to restricted areas will be refunded.
                </p>
                
                <h3 className="font-semibold mb-3">International Shipping</h3>
                <p className="text-muted-foreground mb-4">
                  International customers are responsible for understanding their country's import regulations 
                  regarding CBD and hemp products. Medi Spero is not responsible for packages held, 
                  seized, or destroyed by customs.
                </p>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    We cannot ship to P.O. Boxes for Express or Overnight shipping. Please provide a physical 
                    street address for these shipping methods.
                  </p>
                </div>
              </div>
            </div>

            {/* Lost or Damaged Packages */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Lost or Damaged Packages</h2>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Damaged Packages:</strong> If your order arrives damaged, 
                    contact us within 48 hours with photos of the damage. We'll send a replacement or issue a 
                    full refund at no additional cost.
                  </p>
                  <p>
                    <strong className="text-foreground">Lost Packages:</strong> If your tracking shows delivered 
                    but you haven't received your package, please check with neighbors and your local post office. 
                    If still not found after 3 days, contact us and we'll file a claim and send a replacement.
                  </p>
                  <p>
                    <strong className="text-foreground">Incorrect Address:</strong> Please double-check your 
                    shipping address before completing your order. We are not responsible for packages delivered 
                    to incorrect addresses provided by the customer.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Questions About Your Shipment?</h3>
              <p className="text-muted-foreground mb-6">
                Our customer support team is ready to help with any shipping questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:info@medispero.com" 
                  className="btn-primary inline-flex items-center justify-center"
                >
                  Email Us
                </a>
                <a 
                  href="tel:+13347469312" 
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  Call +1 (334) 746-9312
                </a>
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

export default ShippingPolicyPage;
