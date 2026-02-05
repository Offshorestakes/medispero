import { Shield, Leaf, FlaskConical, Award, Truck, HeartHandshake } from "lucide-react";

const trustSignals = [
  {
    icon: FlaskConical,
    title: "Third-Party Lab Tested",
    description: "Every batch is tested by independent labs for purity, potency, and safety. View our certificates of analysis."
  },
  {
    icon: Leaf,
    title: "100% Organic Hemp",
    description: "Sourced from USDA-certified organic farms in Colorado, grown without pesticides or harmful chemicals."
  },
  {
    icon: Award,
    title: "Farm Bill Compliant",
    description: "All products contain less than 0.3% THC and are fully compliant with the 2018 Farm Bill."
  },
  {
    icon: Shield,
    title: "Made in the USA",
    description: "Manufactured in GMP-certified facilities with strict quality control at every step."
  },
  {
    icon: Truck,
    title: "Free Shipping Over $250",
    description: "Fast, discreet shipping on all orders. Free standard shipping when you spend $250 or more."
  },
  {
    icon: HeartHandshake,
    title: "30-Day Money Back",
    description: "Not satisfied? Return any product within 30 days for a full refund. No questions asked."
  }
];

const TrustSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Why Choose Medi Spero
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Quality You Can Trust
          </h2>
          <p className="text-muted-foreground">
            We're committed to providing the highest quality CBD products with complete transparency at every step.
          </p>
        </div>

        {/* Trust Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustSignals.map((signal, index) => (
            <div
              key={index}
              className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                <signal.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{signal.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
