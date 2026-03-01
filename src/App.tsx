import { lazy, Suspense, useEffect } from "react";
import { captureUtmParams } from "@/lib/utm";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import { useSEO } from "@/hooks/useSEO";

// Eagerly load the homepage for fast LCP
import Index from "./pages/Index";

// Lazy load non-critical global components
const CartDrawer = lazy(() => import("./components/cart/CartDrawer"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));

// Lazy load all other routes for smaller initial bundle
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ShippingPolicyPage = lazy(() => import("./pages/ShippingPolicyPage"));
const ReturnsPolicyPage = lazy(() => import("./pages/ReturnsPolicyPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const AccountDashboard = lazy(() => import("./pages/AccountDashboard"));
const LabResultsPage = lazy(() => import("./pages/LabResultsPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage"));
const WholesalePage = lazy(() => import("./pages/WholesalePage"));
const TrackOrderPage = lazy(() => import("./pages/TrackOrderPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const EmailVerifiedPage = lazy(() => import("./pages/EmailVerifiedPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MarketingCopyPage = lazy(() => import("./pages/MarketingCopyPage"));
const PinterestFeedPage = lazy(() => import("./pages/PinterestFeedPage"));
const GoogleFeedPage = lazy(() => import("./pages/GoogleFeedPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const SEOManager = () => {
  useSEO();
  return null;
};

const App = () => {
  useEffect(() => {
    captureUtmParams();
  }, []);

  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SEOManager />
              <ScrollToTop />
              <Suspense fallback={null}>
                <CartDrawer />
              </Suspense>
              <Suspense fallback={null}>
                <CookieConsent />
              </Suspense>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/shipping" element={<ShippingPolicyPage />} />
                  <Route path="/returns" element={<ReturnsPolicyPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/account" element={<AccountDashboard />} />
                  <Route path="/lab-results" element={<LabResultsPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/accessibility" element={<AccessibilityPage />} />
                  <Route path="/wholesale" element={<WholesalePage />} />
                  <Route path="/track-order" element={<TrackOrderPage />} />
                  <Route path="/testimonials" element={<TestimonialsPage />} />
                  <Route path="/education" element={<EducationPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/email-verified" element={<EmailVerifiedPage />} />
                  <Route path="/marketing-copy" element={<MarketingCopyPage />} />
                  <Route path="/pinterest-feed" element={<PinterestFeedPage />} />
                  <Route path="/google-feed" element={<GoogleFeedPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
