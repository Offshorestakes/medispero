import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "California",
    rating: 5,
    text: "I've tried many CBD brands, but Medi Spero is by far the best. Their full-spectrum oil has completely transformed my sleep quality. I wake up feeling refreshed and ready for the day!",
    product: "Full Spectrum CBD Oil 1500mg",
    verified: true
  },
  {
    name: "Michael R.",
    location: "Texas",
    rating: 5,
    text: "As a former athlete, joint discomfort was my daily struggle. The Relief Cream provides targeted relief exactly where I need it. Highly recommend to anyone dealing with muscle and joint issues.",
    product: "CBD Relief Cream 1000mg",
    verified: true
  },
  {
    name: "Jennifer L.",
    location: "New York",
    rating: 5,
    text: "These gummies are a game-changer for my anxiety. The calm I feel is natural and doesn't make me drowsy. Plus, they taste amazing! My whole family now uses Medi Spero products.",
    product: "Calm CBD Gummies 25mg",
    verified: true
  },
  {
    name: "David K.",
    location: "Florida",
    rating: 5,
    text: "I was skeptical at first, but after seeing the lab results and trying the products, I'm a believer. The quality is unmatched, and customer service went above and beyond to help me choose the right products.",
    product: "Daily Wellness CBD Capsules",
    verified: true
  },
  {
    name: "Emily T.",
    location: "Colorado",
    rating: 5,
    text: "My senior dog has been struggling with mobility. The Pet CBD Oil has given her a new lease on life. She's more active and seems so much happier. Thank you, Medi Spero!",
    product: "Dog CBD Oil - Large",
    verified: true
  },
  {
    name: "Robert H.",
    location: "Washington",
    rating: 5,
    text: "The Sleep Tincture with CBN is incredible. I used to toss and turn for hours, but now I fall asleep within 30 minutes and stay asleep. Best investment in my health!",
    product: "Sleep Tincture with CBN",
    verified: true
  }
];

const TestimonialsSection = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
    ));
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground">
            Join thousands of satisfied customers who have made Medi Spero part of their wellness routine.
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex">{renderStars(5)}</div>
            <span className="text-lg font-semibold">4.9/5</span>
            <span className="text-muted-foreground">Based on 15,000+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 relative card-hover"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />

              {/* Rating */}
              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

              {/* Text */}
              <p className="text-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Product */}
              <p className="text-sm text-muted-foreground mb-4">
                Purchased: <span className="text-primary font-medium">{testimonial.product}</span>
              </p>

              {/* Author */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                {testimonial.verified && (
                  <span className="text-xs bg-brand-mint text-secondary px-2 py-1 rounded-full font-medium">
                    ✓ Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
