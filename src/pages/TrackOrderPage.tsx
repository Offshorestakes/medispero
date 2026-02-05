import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, CheckCircle, MapPin, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const TrackOrderPage = () => {
  const { user } = useAuth();
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searchResult, setSearchResult] = useState<null | "found" | "not-found">(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.length >= 8) {
      setSearchResult("found");
    } else {
      setSearchResult("not-found");
    }
  };

  const trackingSteps = [
    { icon: CheckCircle, label: "Order Confirmed", date: "Feb 3, 2026 10:30 AM", completed: true },
    { icon: Package, label: "Processing", date: "Feb 3, 2026 2:15 PM", completed: true },
    { icon: Truck, label: "Shipped", date: "Feb 4, 2026 9:00 AM", completed: true },
    { icon: MapPin, label: "Delivered", date: "Expected Feb 7, 2026", completed: false },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Track Your Order | Medi Spero</title>
        <meta name="description" content="Track your Medi Spero order status and shipment in real-time. Enter your order number to get instant updates on your delivery." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Order</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your order details below to check the status of your shipment.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide max-w-2xl">
            {user ? (
              <div className="text-center mb-8 p-4 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">
                  Signed in? View all your orders in your{" "}
                  <Link to="/account" className="text-primary hover:underline font-medium">
                    Account Dashboard
                  </Link>
                </p>
              </div>
            ) : null}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Your Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Order Number</label>
                    <Input
                      placeholder="e.g., MS-20260203-XXXXX"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      type="email"
                      placeholder="Email used for order"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full btn-secondary">
                    Track Order
                  </Button>
                </form>
              </CardContent>
            </Card>

            {searchResult === "found" && (
              <Card className="mt-6">
                <CardHeader className="bg-secondary/5">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <CardTitle>Order #{orderNumber.toUpperCase()}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Carrier: USPS Priority Mail | Tracking: 9400111899223033005012
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {trackingSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          step.completed ? "bg-secondary text-white" : "bg-muted text-muted-foreground"
                        }`}>
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${step.completed ? "" : "text-muted-foreground"}`}>
                            {step.label}
                          </p>
                          <p className="text-sm text-muted-foreground">{step.date}</p>
                        </div>
                        {index < trackingSteps.length - 1 && (
                          <div className="absolute left-5 mt-10 w-0.5 h-6 bg-border" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {searchResult === "not-found" && (
              <Card className="mt-6 border-destructive">
                <CardContent className="pt-6 text-center">
                  <p className="text-destructive font-medium">
                    Order not found. Please check your order number and email.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Need help? Contact us at info@medispero.com
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TrackOrderPage;
