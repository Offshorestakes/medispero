import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Play, Shield, Truck, Award, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Check if on mobile (viewport width < 768px)
    const isMobile = window.innerWidth < 768;
    
    // On mobile, delay video loading; on desktop, load immediately
    if (prefersReducedMotion) {
      // Don't load video if user prefers reduced motion
      setShouldLoadVideo(false);
    } else if (isMobile) {
      // Delay video loading on mobile for faster LCP
      const timer = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Load immediately on desktop
      setShouldLoadVideo(true);
    }
  }, []);

  // Pause video when not in viewport for performance
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  return (
    <section aria-label="Hero" className="relative min-h-[60vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Video Background with Poster Fallback */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/60 z-10" />
        
        {/* Static gradient fallback — this IS the mobile background for fast LCP */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-brand-navy via-primary/80 to-secondary/40 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />
        
        {/* Video (only on desktop, hidden on mobile for performance) */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`hidden md:block w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Content */}
      <div className="container-wide relative z-20 py-12 md:py-20">
        <div className="max-w-2xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-4 md:mb-6">
            <Shield className="h-4 w-4 text-secondary" />
            <span className="text-sm text-white/90">Third-Party Lab Tested | Farm Bill Compliant</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Premium Hemp Wellness for
            <span className="block text-secondary">Mind, Mood & Body</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed">
            Discover pharmaceutical-grade CBD, Delta-8, Delta-9 THC, and specialty formulas for ADHD, anxiety, 
            depression, and sleep. Lab-tested, Farm Bill compliant, and crafted by Medi Spero for your complete wellbeing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
            <Button asChild className="btn-secondary text-base md:text-lg px-6 md:px-8 py-5 md:py-6">
              <Link to="/products">
                Shop All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-white/30 text-white hover:bg-white/10">
              <Link to="/about">
                <Play className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </div>

          {/* Trust Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Award className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm md:text-base">Lab Tested</p>
                <p className="text-white/60 text-xs md:text-sm">100% Pure</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Leaf className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm md:text-base">Organic Hemp</p>
                <p className="text-white/60 text-xs md:text-sm">USA Grown</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm md:text-base">Free Shipping</p>
                <p className="text-white/60 text-xs md:text-sm">Orders $250+</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm md:text-base">30-Day</p>
                <p className="text-white/60 text-xs md:text-sm">Money Back</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile for performance */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
