import { Brain, Heart, Moon, Dumbbell, Smile, Shield } from "lucide-react";
import { useState } from "react";

// Import education images
import scientistLabImage from "@/assets/education/scientist-lab.jpg";
import doctorConsultationImage from "@/assets/education/doctor-consultation.jpg";
import brainEndocannabinoidImage from "@/assets/education/brain-endocannabinoid.jpg";

const benefits = [
  {
    icon: Brain,
    title: "Supports Mental Clarity",
    description: "CBD may help promote focus, reduce brain fog, and support cognitive function for clearer thinking throughout your day."
  },
  {
    icon: Heart,
    title: "Promotes Heart Health",
    description: "Research suggests CBD may support cardiovascular wellness by helping maintain healthy blood pressure and reducing everyday stress."
  },
  {
    icon: Moon,
    title: "Improves Sleep Quality",
    description: "Many users report better sleep onset and quality with CBD, helping you wake up feeling refreshed and energized."
  },
  {
    icon: Dumbbell,
    title: "Aids Muscle Recovery",
    description: "CBD's natural properties may help soothe post-workout discomfort and support faster muscle recovery for athletes."
  },
  {
    icon: Smile,
    title: "Reduces Daily Stress",
    description: "CBD interacts with your body's endocannabinoid system to promote a sense of calm and help manage everyday stress."
  },
  {
    icon: Shield,
    title: "Supports Immune Function",
    description: "The anti-inflammatory properties of CBD may help support your body's natural immune response and overall wellness."
  }
];

const educationImages = [
  {
    src: scientistLabImage,
    alt: "Pharmaceutical scientist examining CBD products in laboratory",
    title: "Pharmaceutical-Grade Quality",
    description: "Our products are manufactured in FDA-registered, cGMP-certified facilities with rigorous quality control."
  },
  {
    src: doctorConsultationImage,
    alt: "Doctor consulting with patient about CBD wellness",
    title: "Physician-Informed Formulas",
    description: "Developed in consultation with healthcare professionals for optimal therapeutic benefit."
  },
  {
    src: brainEndocannabinoidImage,
    alt: "Visualization of the endocannabinoid system in the brain",
    title: "Endocannabinoid System Support",
    description: "CBD interacts with ECS receptors to promote balance and homeostasis throughout your body."
  }
];

const EducationSection = () => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section className="section-padding bg-brand-navy text-white">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Health & Wellness
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            The Science of CBD Wellness
          </h2>
          <p className="text-white/70">
            Discover how CBD interacts with your body's endocannabinoid system to support overall health and wellbeing.
          </p>
        </div>

        {/* Featured Images Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {educationImages.map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-2xl">
              {/* Placeholder skeleton */}
              {!loadedImages[index] && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 animate-pulse h-64" />
              )}
              <img 
                src={image.src} 
                alt={image.alt}
                loading="lazy"
                decoding="async"
                onLoad={() => handleImageLoad(index)}
                className={`w-full h-64 object-cover transition-all duration-500 group-hover:scale-105 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg font-semibold text-white mb-1">{image.title}</h3>
                <p className="text-white/70 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">What is the Endocannabinoid System?</h3>
          <p className="text-white/80 max-w-3xl mx-auto leading-relaxed">
            The endocannabinoid system (ECS) is a complex cell-signaling system identified in the early 1990s. 
            It plays a crucial role in regulating a range of functions and processes, including sleep, mood, appetite, 
            memory, reproduction, and pain sensation. CBD (cannabidiol) interacts with ECS receptors to help maintain 
            balance and promote homeostasis throughout your body.
          </p>
          <p className="text-white/60 text-sm mt-4">
            * These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
