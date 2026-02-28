import { Link } from "react-router-dom";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer role="contentinfo" className="bg-brand-navy text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-wide py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Join the Medi Spero Family</h3>
            <p className="text-white/70 mb-6">
              Subscribe for exclusive offers, wellness tips, and 15% off your first order.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="btn-secondary whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoImage} 
                alt="Medi Spero — Premium pharmaceutical-grade CBD wellness brand"
                className="w-12 h-12 object-contain"
                width={48}
                height={48}
              />
              <div>
                <h4 className="font-bold text-lg">Medi Spero</h4>
                <p className="text-xs text-white/60">Premium Wellness</p>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Your trusted source for premium, lab-tested CBD products. Made in the USA with organic hemp.
            </p>
            <div className="flex gap-4">
              <a href="https://www.tiktok.com/@medispero" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="TikTok">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 3.76.92V6.69Z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-semibold mb-4">Shop Categories</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/products" className="hover:text-white transition-colors">All CBD Products</Link></li>
              <li><Link to="/category/cbd-oils" className="hover:text-white transition-colors">CBD Oils & Tinctures</Link></li>
              <li><Link to="/category/adhd-focus" className="hover:text-white transition-colors">ADHD & Focus Support</Link></li>
              <li><Link to="/category/anti-anxiety" className="hover:text-white transition-colors">Anxiety & Focus CBD</Link></li>
              <li><Link to="/category/mood-support" className="hover:text-white transition-colors">Mood & Depression Support</Link></li>
              <li><Link to="/category/pharma-capsules" className="hover:text-white transition-colors">Pharmaceutical Capsules</Link></li>
              <li><Link to="/category/cbd-isolate-powder" className="hover:text-white transition-colors">99% Pure CBD Isolate</Link></li>
              <li><Link to="/category/cbd-vape" className="hover:text-white transition-colors">CBD Vape Products</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/blog" className="hover:text-white transition-colors">Wellness Blog</Link></li>
              <li><Link to="/education" className="hover:text-white transition-colors">CBD Education & Science</Link></li>
              <li><Link to="/lab-results" className="hover:text-white transition-colors">Lab Results & COAs</Link></li>
              <li><Link to="/testimonials" className="hover:text-white transition-colors">Customer Reviews</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Information</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/wholesale" className="hover:text-white transition-colors">Wholesale Inquiries</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <a href="mailto:info@medispero.com" className="hover:text-white transition-colors">
                  info@medispero.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0" />
                <a 
                  href="https://wa.me/13347469312" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +1 (334) 746-9312
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0" />
                <span>
                  Medi Spero LLC<br />
                  United States
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>© {new Date().getFullYear()} Medi Spero. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
              <a href="/llm.html" className="hover:text-white transition-colors">AI Summary Page</a>
            </div>
          </div>
          
          {/* Legal Disclaimer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-xs text-white/50 text-center">
            <p className="mb-2">
              <strong>FDA Disclaimer:</strong> These statements have not been evaluated by the Food and Drug Administration. 
              These products are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
            <p>
              All Medi Spero products contain less than 0.3% THC and are derived from industrial hemp in compliance with the 2018 Farm Bill. 
              Must be 21+ to purchase. Consult with a physician before use if you have a medical condition or are taking medications.
            </p>
            <p className="mt-2">
              Medi Spero proudly ships pharmaceutical-grade CBD and hemp wellness products nationwide across the United States, 
              serving customers in New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, Dallas, Austin, and all 50 states.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
