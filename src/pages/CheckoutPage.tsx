import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, ShoppingBag, Truck, Shield, Check } from "lucide-react";

const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().min(10, "Valid phone required").max(20),
  address: z.string().trim().min(5, "Address is required").max(200),
  city: z.string().trim().min(2, "City is required").max(100),
  state: z.string().trim().min(2, "State is required").max(100),
  zipCode: z.string().trim().min(5, "ZIP code required").max(10),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = subtotal >= 250 ? 0 : 14.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const result = addressSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to complete checkout.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Call the server-side checkout edge function for validation and processing
      const { data, error } = await supabase.functions.invoke('process-checkout', {
        body: {
          formData,
          items: items.map(item => ({
            product_id: item.product_id,
            product_name: item.product_name,
            product_image: item.product_image,
            price: item.price,
            quantity: item.quantity,
          })),
          subtotal,
          shipping,
          tax,
          total,
        },
      });

      if (error) {
        console.error("Checkout error:", error);
        toast({
          title: "Checkout failed",
          description: "There was an error processing your order. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (!data?.success) {
        const errorMessage = data?.details 
          ? data.details.map((d: { field: string; message: string }) => d.message).join(', ')
          : data?.error || "There was an error processing your order.";
        toast({
          title: "Checkout failed",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      // Clear cart after successful order
      await clearCart();

      toast({
        title: "Order placed successfully!",
        description: "Thank you for your order. You will receive a confirmation email shortly.",
      });

      navigate("/");
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Sign in to checkout</h1>
            <p className="text-muted-foreground mb-6">
              Create an account or sign in to complete your order.
            </p>
            <Button asChild className="btn-secondary">
              <Link to="/auth">Sign In / Create Account</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some products before checking out.
            </p>
            <Button asChild className="btn-secondary">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container-wide">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Link>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                      {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St"
                      />
                      {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York"
                      />
                      {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="NY"
                        />
                        {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          placeholder="10001"
                        />
                        {errors.zipCode && <p className="text-sm text-destructive">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-xl">
                    <Truck className="h-6 w-6 text-secondary mb-2" />
                    <span className="text-xs font-medium">Free Shipping $250+</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-xl">
                    <Shield className="h-6 w-6 text-secondary mb-2" />
                    <span className="text-xs font-medium">Secure Checkout</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-xl">
                    <Check className="h-6 w-6 text-secondary mb-2" />
                    <span className="text-xs font-medium">30-Day Returns</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-secondary text-lg py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Place Order - $${total.toFixed(2)}`
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      {item.product_image ? (
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded-lg" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? "text-secondary font-medium" : ""}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
