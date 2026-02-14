import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trackSubscribe } from "@/lib/analytics";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      trackSubscribe(email);
      toast.success("Thanks for subscribing! Check your inbox for your 15% off code.");
      setEmail("");
    }
  };

  return (
    <section aria-label="Newsletter signup" className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text */}
          <div className="text-center lg:text-left text-white">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Mail className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Newsletter</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Get 15% Off Your First Order
            </h2>
            <p className="text-white/80 max-w-md">
              Subscribe for exclusive deals, new product launches, and wellness tips delivered to your inbox.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-w-[280px]"
              required
            />
            <Button 
              type="submit" 
              className="bg-white text-primary hover:bg-white/90 font-semibold whitespace-nowrap"
            >
              Subscribe & Save
            </Button>
          </form>
        </div>

        {/* Privacy note */}
        <p className="text-center lg:text-right text-white/60 text-xs mt-4">
          By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
