import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag, User } from "lucide-react";

const EmailVerifiedPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => navigate("/auth"), 5000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Email Verified!</h1>
            <p className="text-muted-foreground">
              Your email has been successfully verified. Your Medi Spero account is now active and ready to use.
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <Button className="w-full btn-secondary" onClick={() => navigate("/products")}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Start Shopping
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/account")}>
                <User className="mr-2 h-4 w-4" />
                Go to My Account
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmailVerifiedPage;
