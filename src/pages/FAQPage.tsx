import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  const faqCategories = [
    {
      title: "General CBD Questions",
      faqs: [
        {
          question: "What is CBD?",
          answer: "CBD (cannabidiol) is a naturally occurring compound found in the hemp plant. Unlike THC, CBD is non-psychoactive, meaning it won't get you 'high.' CBD interacts with your body's endocannabinoid system to support overall wellness, including stress relief, better sleep, and natural pain management."
        },
        {
          question: "Is CBD legal?",
          answer: "Yes! CBD derived from industrial hemp containing less than 0.3% THC is federally legal in the United States under the 2018 Farm Bill. All Medi Spero products are made from compliant, domestically grown hemp and contain less than 0.3% THC."
        },
        {
          question: "Will CBD make me fail a drug test?",
          answer: "While our Full Spectrum products contain trace amounts of THC (less than 0.3%), there is a possibility of testing positive on sensitive drug tests. If you're subject to drug testing, we recommend our Broad Spectrum or CBD Isolate products, which contain zero THC."
        },
        {
          question: "What's the difference between Full Spectrum, Broad Spectrum, and CBD Isolate?",
          answer: "Full Spectrum CBD contains all cannabinoids, terpenes, and beneficial compounds from the hemp plant, including trace THC (under 0.3%). Broad Spectrum CBD contains multiple cannabinoids but has THC removed. CBD Isolate is pure CBD with no other cannabinoids. Each type offers different benefits depending on your needs."
        },
        {
          question: "How is CBD extracted?",
          answer: "Medi Spero uses CO2 extraction, the gold standard in the industry. This method uses pressurized carbon dioxide to pull CBD and other beneficial compounds from the hemp plant without using harsh solvents, resulting in a pure, potent, and safe product."
        }
      ]
    },
    {
      title: "Product & Dosage",
      faqs: [
        {
          question: "What CBD product should I start with?",
          answer: "For beginners, we recommend starting with our CBD Oil Tinctures or CBD Gummies. Tinctures offer precise dosing and fast absorption, while gummies provide a convenient, pre-measured dose. Start with a lower strength (500mg-1000mg) and adjust based on your needs."
        },
        {
          question: "How much CBD should I take?",
          answer: "CBD dosing is individual and depends on factors like body weight, metabolism, and desired effects. We recommend starting with 10-25mg daily and gradually increasing until you find your optimal dose. Consistency is key—take CBD at the same time each day for best results."
        },
        {
          question: "How long does it take for CBD to work?",
          answer: "It depends on the delivery method. Sublingual oils typically take 15-30 minutes, while edibles and capsules may take 1-2 hours as they're processed through the digestive system. Topicals work within minutes on localized areas. Effects typically last 4-6 hours."
        },
        {
          question: "Can I take CBD with other medications?",
          answer: "CBD may interact with certain medications. We strongly recommend consulting with your healthcare provider before using CBD if you're taking prescription medications, especially blood thinners, heart medications, or immunosuppressants."
        },
        {
          question: "What's the shelf life of CBD products?",
          answer: "Our CBD products have a shelf life of 12-24 months when stored properly. Keep products in a cool, dry place away from direct sunlight. Each product has an expiration date printed on the packaging."
        }
      ]
    },
    {
      title: "Quality & Safety",
      faqs: [
        {
          question: "Are your products third-party lab tested?",
          answer: "Absolutely! Every Medi Spero product undergoes rigorous third-party testing at ISO-certified laboratories. We test for potency, purity, and safety—screening for pesticides, heavy metals, residual solvents, and microbial contaminants. Lab results (COAs) are available on each product page."
        },
        {
          question: "Where is your hemp sourced?",
          answer: "All our hemp is grown on licensed farms in the United States, primarily in Colorado, Oregon, and Kentucky. We work exclusively with farmers who use organic growing practices and sustainable farming methods."
        },
        {
          question: "Are your products organic?",
          answer: "While we use organically grown hemp and organic carrier oils, the CBD industry currently lacks official USDA organic certification for hemp products. Our products are free from pesticides, herbicides, and chemical fertilizers."
        },
        {
          question: "Are your products vegan and gluten-free?",
          answer: "Most of our products are vegan and gluten-free. Our gummies are made with pectin (not gelatin), and our oils use organic MCT or hemp seed oil. Check individual product pages for specific dietary information."
        }
      ]
    },
    {
      title: "Orders & Shipping",
      faqs: [
        {
          question: "How long will it take to receive my order?",
          answer: "Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days, and Overnight shipping delivers the next business day. Orders placed before 2 PM EST ship the same day. You'll receive tracking information via email once your order ships."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free standard shipping on all orders over $75 within the continental United States. Alaska, Hawaii, and international orders have calculated shipping rates at checkout."
        },
        {
          question: "Is your packaging discreet?",
          answer: "Yes, all orders ship in plain, unmarked packaging with no indication of the contents. Your privacy is important to us."
        },
        {
          question: "Do you ship internationally?",
          answer: "We currently ship to select international destinations. International customers are responsible for understanding and complying with their country's import regulations regarding CBD products. Shipping rates and delivery times are calculated at checkout."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, return any unused portion within 30 days for a full refund. No questions asked. Contact our customer service team to initiate a return."
        },
        {
          question: "How do I return a product?",
          answer: "Contact our customer service team at info@medispero.com or call +1 (334) 746-9312. We'll provide you with a prepaid return label and instructions. Once we receive your return, refunds are processed within 5-7 business days."
        },
        {
          question: "What if my order arrives damaged?",
          answer: "We take great care in packaging, but if your order arrives damaged, contact us immediately with photos of the damage. We'll send a replacement at no cost or issue a full refund—your choice."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FAQ | CBD & Hemp Product Questions | Medi Spero</title>
        <meta name="description" content="Find answers to common questions about CBD, THC products, dosing, shipping, returns, and more. Expert guidance from Medi Spero's wellness team." />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about CBD, our products, ordering, and more. 
              Can't find what you're looking for? Contact our friendly support team.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border border-border rounded-lg px-6 bg-card"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            {/* Contact CTA */}
            <div className="mt-16 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our customer support team is here to help. Reach out anytime!
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

export default FAQPage;
