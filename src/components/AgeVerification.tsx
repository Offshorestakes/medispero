import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, AlertCircle } from "lucide-react";

const AgeVerification = () => {
  const [showDenied, setShowDenied] = useState(false);

  const handleVerify = (isOver21: boolean) => {
    if (isOver21) {
      // Set cookie for persistence (1 year)
      document.cookie = "age_verified=true; max-age=31536000; path=/; SameSite=Lax";
      // Also keep localStorage for backward compat
      localStorage.setItem("ageVerified", "true");
      // Toggle visibility via CSS class — no React re-render needed
      document.documentElement.classList.add("age-verified");
    } else {
      setShowDenied(true);
    }
  };

  if (showDenied) {
    return (
      <div className="age-gate-overlay" data-nosnippet>
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl animate-fade-up">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            You must be 21 years or older to access this website. Please come back when you meet the age requirement.
          </p>
          <Button
            onClick={() => window.location.href = "https://www.google.com"}
            variant="outline"
            className="w-full"
          >
            Leave Website
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="age-gate-overlay" data-nosnippet>
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl animate-fade-up">
        {/* Logo */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span className="text-white font-bold text-3xl">M</span>
        </div>
        
        <h2 className="text-2xl font-bold mb-1">Welcome to Medi Spero</h2>
        <p className="text-muted-foreground text-sm mb-6">Premium CBD Wellness</p>

        {/* Verification Card */}
        <div className="bg-muted rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold">Age Verification Required</span>
          </div>
          <p className="text-sm text-muted-foreground">
            You must be 21 years of age or older to enter this website. By entering, you agree to our Terms of Service and Privacy Policy.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2 italic">
            Note: This is an advisory age gate. Purchases require account verification.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => handleVerify(true)} 
            className="w-full btn-secondary text-lg py-6"
          >
            Yes, I am 21 or older
          </Button>
          <Button 
            onClick={() => handleVerify(false)} 
            variant="outline" 
            className="w-full"
          >
            No, I am under 21
          </Button>
        </div>

        {/* Legal text */}
        <p className="text-xs text-muted-foreground mt-6">
          All products contain less than 0.3% THC and are compliant with the 2018 Farm Bill. 
          This site is intended for legal use only.
        </p>
      </div>
    </div>
  );
};

export default AgeVerification;
