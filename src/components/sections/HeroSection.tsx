import { Link } from "react-router-dom";
import { ArrowRight, Play, Shield, Truck, Award, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/60 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="container-wide relative z-20 py-20">
        <div className="max-w-2xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-up">
            <Shield className="h-4 w-4 text-secondary" />
            <span className="text-sm text-white/90">Third-Party Lab Tested | Farm Bill Compliant</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Premium Hemp Wellness for
            <span className="block text-secondary">Mind, Mood & Body</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Discover pharmaceutical-grade CBD, Delta-8, Delta-9 THC, and specialty formulas for ADHD, anxiety, 
            depression, and sleep. Lab-tested, Farm Bill compliant, and crafted by Medi Spero for your complete wellbeing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild className="btn-secondary text-lg px-8 py-6">
              <Link to="/products">
                Shop All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
              <Link to="/about">
                <Play className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </div>

          {/* Trust Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold">Lab Tested</p>
                <p className="text-white/60 text-sm">100% Pure</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold">Organic Hemp</p>
                <p className="text-white/60 text-sm">USA Grown</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Truck className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold">Free Shipping</p>
                <p className="text-white/60 text-sm">Orders $250+</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold">30-Day</p>
                <p className="text-white/60 text-sm">Money Back</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
