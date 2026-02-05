import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const AccessibilityPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Accessibility Statement | Medi Spero</title>
        <meta name="description" content="Medi Spero is committed to making our website accessible to all users. Learn about our accessibility features and accommodations." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Accessibility Statement</h1>
            <p className="text-muted-foreground">Our commitment to inclusive access</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide max-w-3xl prose prose-lg">
            <h2>Our Commitment</h2>
            <p>
              Medi Spero is committed to ensuring digital accessibility for people with disabilities. 
              We continually improve the user experience for everyone and apply relevant accessibility 
              standards.
            </p>

            <h2>Accessibility Features</h2>
            <ul>
              <li>Keyboard navigation support throughout the site</li>
              <li>Alt text for all meaningful images</li>
              <li>Proper heading structure for screen readers</li>
              <li>Sufficient color contrast ratios</li>
              <li>Resizable text without loss of functionality</li>
              <li>Form labels and error messages</li>
              <li>Focus indicators for interactive elements</li>
            </ul>

            <h2>Standards</h2>
            <p>
              We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA 
              standards. These guidelines explain how to make web content more accessible for 
              people with disabilities.
            </p>

            <h2>Assistive Technology</h2>
            <p>
              Our website is designed to be compatible with assistive technologies including:
            </p>
            <ul>
              <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
              <li>Voice recognition software</li>
              <li>Screen magnification tools</li>
              <li>Alternative input devices</li>
            </ul>

            <h2>Need Assistance?</h2>
            <p>
              If you encounter any accessibility barriers or need assistance placing an order, 
              please contact us:
            </p>
            <ul>
              <li>Email: accessibility@medispero.com</li>
              <li>Phone: +1 (334) 746-9312</li>
              <li>WhatsApp: +1 (334) 746-9312</li>
            </ul>
            <p>
              Our customer service team is happy to assist you with browsing, product selection, 
              and order placement.
            </p>

            <h2>Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of our website. Please let us know 
              if you encounter any barriers so we can address them promptly.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AccessibilityPage;
