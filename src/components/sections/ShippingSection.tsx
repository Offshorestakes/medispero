import { Truck, Package, Clock, Globe } from "lucide-react";

const ShippingSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Delivery Information
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Fast & Discreet Shipping
          </h2>
          <p className="text-muted-foreground">
            We ship all orders in plain, unmarked packaging to ensure your privacy.
          </p>
        </div>

        {/* Shipping Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card border border-border rounded-2xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-brand-light-blue flex items-center justify-center mb-4">
              <Package className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Free Standard Shipping</h3>
            <p className="text-sm text-muted-foreground">On orders over $75</p>
            <p className="text-xs text-muted-foreground mt-1">5-7 business days</p>
          </div>

          <div className="text-center p-6 bg-card border border-border rounded-2xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-brand-mint flex items-center justify-center mb-4">
              <Truck className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="font-semibold mb-2">Express Shipping</h3>
            <p className="text-sm text-muted-foreground">$12.99 flat rate</p>
            <p className="text-xs text-muted-foreground mt-1">2-3 business days</p>
          </div>

          <div className="text-center p-6 bg-card border border-border rounded-2xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-brand-light-blue flex items-center justify-center mb-4">
              <Clock className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Overnight Shipping</h3>
            <p className="text-sm text-muted-foreground">$24.99 flat rate</p>
            <p className="text-xs text-muted-foreground mt-1">Next business day</p>
          </div>

          <div className="text-center p-6 bg-card border border-border rounded-2xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-brand-mint flex items-center justify-center mb-4">
              <Globe className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="font-semibold mb-2">International</h3>
            <p className="text-sm text-muted-foreground">Rates calculated at checkout</p>
            <p className="text-xs text-muted-foreground mt-1">7-14 business days</p>
          </div>
        </div>

        {/* Returns Policy */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">30-Day Satisfaction Guarantee</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            We're confident you'll love our products. If you're not completely satisfied, 
            return any unused portion within 30 days for a full refund. No questions asked.
          </p>
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-secondary">✓</span> Easy returns
            </li>
            <li className="flex items-center gap-2">
              <span className="text-secondary">✓</span> Full refund
            </li>
            <li className="flex items-center gap-2">
              <span className="text-secondary">✓</span> No restocking fees
            </li>
            <li className="flex items-center gap-2">
              <span className="text-secondary">✓</span> Free return shipping
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShippingSection;
