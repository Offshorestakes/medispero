import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const RelatedContent = lazy(() => import("@/components/sections/RelatedContent"));

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy | Medi Spero</title>
        <meta name="description" content="Medi Spero's privacy policy explains how we collect, use, and protect your personal information when you use our website and services." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: February 1, 2026</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide max-w-3xl prose prose-lg">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly, including name, email, shipping address, 
              phone number, and payment information when you make a purchase. We also automatically 
              collect certain information about your device and browsing activity.
            </p>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to customer service inquiries</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We share information only with service 
              providers who help us operate our business (payment processors, shipping carriers, 
              email services) and when required by law.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures including SSL encryption, secure 
              payment processing, and regular security audits to protect your personal information.
            </p>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>

            <h2>6. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience, 
              analyze site traffic, and personalize content. You can manage cookie preferences 
              through your browser settings.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our website is not intended for individuals under 21 years of age. We do not 
              knowingly collect personal information from minors.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              For privacy-related questions, contact us at:<br />
              Email: privacy@medispero.com<br />
              Phone: +1 (334) 746-9312
            </p>
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

export default PrivacyPolicyPage;
