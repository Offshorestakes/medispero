import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms of Service | Medi Spero</title>
        <meta name="description" content="Read Medi Spero's terms of service governing your use of our website and purchase of our CBD and hemp wellness products." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: February 1, 2026</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide max-w-3xl prose prose-lg">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using medispero.com, you agree to be bound by these Terms of Service. 
              If you do not agree, please do not use our website or purchase our products.
            </p>

            <h2>2. Age Requirement</h2>
            <p>
              You must be at least 21 years of age to purchase products from Medi Spero. By placing 
              an order, you confirm that you meet this age requirement.
            </p>

            <h2>3. Product Information</h2>
            <p>
              All products sold by Medi Spero are derived from hemp and contain less than 0.3% 
              Delta-9 THC, in compliance with the 2018 Farm Bill. Products are not intended to 
              diagnose, treat, cure, or prevent any disease.
            </p>

            <h2>4. Ordering and Payment</h2>
            <ul>
              <li>All prices are in USD</li>
              <li>We reserve the right to refuse or cancel orders</li>
              <li>Payment is processed securely through our payment provider</li>
              <li>You are responsible for providing accurate shipping information</li>
            </ul>

            <h2>5. Shipping and Delivery</h2>
            <p>
              We ship to all 50 US states where our products are legal. International shipping 
              may be subject to additional restrictions. See our Shipping Policy for details.
            </p>

            <h2>6. Returns and Refunds</h2>
            <p>
              We offer a 30-day satisfaction guarantee. See our Returns Policy for complete details 
              on how to initiate a return.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, logos, and trademarks, is the 
              property of Medi Spero LLC and protected by applicable laws.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              Medi Spero is not liable for any indirect, incidental, or consequential damages 
              arising from your use of our products or website.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of Alabama, without regard to 
              conflict of law principles.
            </p>

            <h2>10. Contact</h2>
            <p>
              Questions about these terms? Contact us at:<br />
              Email: legal@medispero.com<br />
              Phone: +1 (334) 746-9312
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TermsPage;
