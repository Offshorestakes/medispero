import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { RefreshCw, Clock, CheckCircle, XCircle, Package, CreditCard, Mail } from "lucide-react";

const RelatedContent = lazy(() => import("@/components/sections/RelatedContent"));

const ReturnsPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Returns & Refund Policy | 30-Day Guarantee | Medi Spero</title>
        <meta name="description" content="Medi Spero offers a 30-day satisfaction guarantee on all CBD products. Easy returns, no questions asked. Learn about our hassle-free refund process." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://medispero.com/returns" />
      </Helmet>
      <Header />
      <BreadcrumbNav items={[{ name: "Home", href: "/" }, { name: "Returns & Refunds" }]} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Returns & Refund Policy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We stand behind the quality of our products with a 30-day satisfaction guarantee. 
              Your happiness is our priority.
            </p>
          </div>
        </section>

        {/* Satisfaction Guarantee */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl p-8 mb-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <RefreshCw className="h-8 w-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">30-Day Satisfaction Guarantee</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're confident you'll love our products. If you're not completely satisfied for any reason, 
                return any unused portion within 30 days of delivery for a full refund. No questions asked.
              </p>
            </div>

            {/* Return Policy Details */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Return Eligibility</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-secondary" />
                    <h3 className="font-bold text-lg">Eligible for Return</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      Products purchased within the last 30 days
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      Unused or partially used products
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      Products in original packaging (opened is okay)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      Damaged or defective items
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      Wrong item received
                    </li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="h-6 w-6 text-destructive" />
                    <h3 className="font-bold text-lg">Not Eligible for Return</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">✗</span>
                      Products purchased more than 30 days ago
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">✗</span>
                      Completely used/empty products
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">✗</span>
                      Gift cards and promotional items
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">✗</span>
                      Products damaged due to customer misuse
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">✗</span>
                      International orders (due to customs)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How to Return */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">How to Initiate a Return</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Contact Customer Support</h3>
                    <p className="text-muted-foreground">
                      Email us at <a href="mailto:info@medispero.com" className="text-primary hover:underline">info@medispero.com</a> or 
                      call <a href="tel:+13347469312" className="text-primary hover:underline">+1 (334) 746-9312</a> with your order number 
                      and reason for return. Our team responds within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Receive Return Authorization</h3>
                    <p className="text-muted-foreground">
                      Once approved, you'll receive a Return Merchandise Authorization (RMA) number and a 
                      prepaid shipping label via email. All domestic return shipping is FREE.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Ship Your Return</h3>
                    <p className="text-muted-foreground">
                      Pack the product(s) securely in the original packaging if possible. Attach the prepaid 
                      shipping label and drop off at any USPS location. Keep your tracking receipt.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Receive Your Refund</h3>
                    <p className="text-muted-foreground">
                      Once we receive and inspect your return, we'll process your refund within 5-7 business days. 
                      Refunds are issued to the original payment method.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-light-blue flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Refund Timing</h3>
                <p className="text-sm text-muted-foreground">
                  5-7 business days after we receive your return. Credit card refunds may take an additional 
                  3-5 days to appear on your statement.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-mint flex items-center justify-center mb-4">
                  <CreditCard className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Refund Method</h3>
                <p className="text-sm text-muted-foreground">
                  Refunds are issued to your original payment method. We cannot refund to a different card 
                  or payment method.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-light-blue flex items-center justify-center mb-4">
                  <Package className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Shipping Costs</h3>
                <p className="text-sm text-muted-foreground">
                  Original shipping charges are non-refundable unless the return is due to our error 
                  (wrong item, damaged, or defective).
                </p>
              </div>
            </div>

            {/* Exchanges */}
            <div className="bg-card border border-border rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
              <p className="text-muted-foreground mb-4">
                We do not offer direct exchanges. If you'd like a different product, please:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                <li>Return your original order following the steps above</li>
                <li>Place a new order for the product you want</li>
                <li>Contact us for a courtesy discount code for the inconvenience</li>
              </ol>
              <p className="text-muted-foreground">
                This ensures you get your new product quickly without waiting for the exchange process.
              </p>
            </div>

            {/* Damaged or Defective Items */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4">Damaged or Defective Items</h2>
              <p className="text-muted-foreground mb-4">
                If your order arrives damaged or you receive a defective product, we'll make it right immediately:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span><strong>Contact us within 48 hours</strong> of delivery with photos of the damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span><strong>Choose replacement or refund</strong> — it's your choice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span><strong>No need to return damaged items</strong> — we trust you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span><strong>Replacement ships immediately</strong> at no extra cost</span>
                </li>
              </ul>
            </div>

            {/* Order Cancellation */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Order Cancellation</h2>
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-muted-foreground mb-4">
                  Need to cancel your order? Here's what you need to know:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Before Shipping:</strong> Orders can be cancelled for a 
                    full refund if they haven't been shipped yet. Contact us immediately at info@medispero.com.
                  </li>
                  <li>
                    <strong className="text-foreground">After Shipping:</strong> Once your order has shipped, 
                    it cannot be cancelled. You'll need to wait for delivery and then initiate a return.
                  </li>
                  <li>
                    <strong className="text-foreground">Processing Time:</strong> We process orders quickly! 
                    Orders placed before 2 PM EST ship the same day, so contact us ASAP if you need to cancel.
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
              <div className="w-14 h-14 mx-auto rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <Mail className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Need Help With a Return?</h3>
              <p className="text-muted-foreground mb-6">
                Our customer support team is here to make returns easy and hassle-free.
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
        <Suspense fallback={<div className="h-32" />}>
          <RelatedContent maxProducts={4} maxPosts={2} />
        </Suspense>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ReturnsPolicyPage;
