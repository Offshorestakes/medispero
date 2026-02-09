import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const CONSENT_KEY = "medispero_cookie_consent";

type ConsentState = "accepted" | "rejected" | "custom" | null;

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (state: ConsentState) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ state, preferences, timestamp: new Date().toISOString() }));
    setVisible(false);
  };

  const handleAcceptAll = () => {
    setPreferences({ necessary: true, analytics: true, marketing: true });
    saveConsent("accepted");
  };

  const handleRejectAll = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    saveConsent("rejected");
  };

  const handleSavePreferences = () => {
    saveConsent("custom");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-fade-in">
      <div className="container-wide max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-2xl p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary shrink-0" />
            <h3 className="font-semibold text-foreground text-sm">Cookie Preferences</h3>
          </div>
          <button onClick={handleRejectAll} aria-label="Dismiss" className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. 
          By clicking "Accept All", you consent to our use of cookies. 
          See our <Link to="/privacy" className="text-primary underline hover:no-underline">Privacy Policy</Link> for details.
        </p>

        {showDetails && (
          <div className="space-y-3 mb-4 border border-border rounded-lg p-4 bg-muted/30">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">Necessary</span>
                <p className="text-xs text-muted-foreground">Required for the site to function (cart, auth, preferences).</p>
              </div>
              <input type="checkbox" checked disabled className="accent-primary h-4 w-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-foreground">Analytics</span>
                <p className="text-xs text-muted-foreground">Help us understand how visitors use our site.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
                className="accent-primary h-4 w-4"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-foreground">Marketing</span>
                <p className="text-xs text-muted-foreground">Used to deliver relevant ads and track campaigns.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences((p) => ({ ...p, marketing: e.target.checked }))}
                className="accent-primary h-4 w-4"
              />
            </label>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleAcceptAll} size="sm" className="text-xs">
            Accept All
          </Button>
          <Button onClick={handleRejectAll} variant="outline" size="sm" className="text-xs">
            Reject All
          </Button>
          {showDetails ? (
            <Button onClick={handleSavePreferences} variant="secondary" size="sm" className="text-xs">
              Save Preferences
            </Button>
          ) : (
            <Button onClick={() => setShowDetails(true)} variant="ghost" size="sm" className="text-xs">
              Customize
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
