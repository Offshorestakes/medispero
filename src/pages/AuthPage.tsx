import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const emailSchema = z.string().trim().email({ message: "Invalid email address" }).max(255);
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" }).max(100);

type AuthMode = "login" | "signup" | "forgot";

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (user && !authLoading) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    if (mode !== "forgot") {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
      }

      if (mode === "signup" && password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      await supabase.functions.invoke("send-reset-password", {
        body: { email: email.trim(), redirectTo: `${window.location.origin}/reset-password` },
      });
      setResetSent(true);
      toast({
        title: "Check your email",
        description: "If an account exists with this email, you'll receive a password reset link.",
      });
    } catch {
      toast({
        title: "Check your email",
        description: "If an account exists with this email, you'll receive a password reset link.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (mode === "forgot") {
      await handleForgotPassword();
      return;
    }

    setIsLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email.trim(), password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({ title: "Login failed", description: "Invalid email or password. Please try again.", variant: "destructive" });
          } else if (error.message.includes("Email not confirmed")) {
            toast({ title: "Email not verified", description: "Please check your email and verify your account before signing in.", variant: "destructive" });
          } else {
            toast({ title: "Login failed", description: error.message, variant: "destructive" });
          }
        } else {
          toast({ title: "Welcome back!", description: "You have successfully signed in." });
          navigate("/");
        }
      } else {
        const { error } = await signUp(email.trim(), password);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({ title: "Account exists", description: "This email is already registered. Try signing in instead.", variant: "destructive" });
          } else {
            toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
          }
        } else {
          toast({ title: "Account created!", description: "Please check your email to verify your account before signing in." });
          setMode("login");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
    setResetSent(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const headings: Record<AuthMode, { title: string; subtitle: string }> = {
    login: { title: "Welcome back", subtitle: "Sign in to access your cart and orders" },
    signup: { title: "Create account", subtitle: "Join Medi Spero for exclusive wellness benefits" },
    forgot: { title: "Forgot password?", subtitle: "Enter your email and we'll send you a reset link" },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <h1 className="text-2xl font-bold">{headings[mode].title}</h1>
              <p className="text-muted-foreground mt-2">{headings[mode].subtitle}</p>
            </div>

            {mode === "forgot" && resetSent ? (
              <div className="text-center space-y-4">
                <Mail className="h-12 w-12 text-primary mx-auto" />
                <p className="text-muted-foreground">
                  If an account exists for <strong>{email}</strong>, you'll receive a password reset link shortly. Check your spam folder too.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => switchMode("login")}
                >
                  Back to sign in
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                {mode !== "forgot" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      {mode === "login" && (
                        <button
                          type="button"
                          onClick={() => switchMode("forgot")}
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  </div>
                )}

                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                  </div>
                )}

                <Button type="submit" className="w-full btn-secondary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {mode === "login" ? "Signing in..." : mode === "signup" ? "Creating account..." : "Sending..."}
                    </>
                  ) : (
                    mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"
                  )}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              {mode === "forgot" && !resetSent ? (
                <p className="text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <button type="button" onClick={() => switchMode("login")} className="text-primary font-medium hover:underline">
                    Sign in
                  </button>
                </p>
              ) : mode !== "forgot" && (
                <p className="text-sm text-muted-foreground">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                    className="text-primary font-medium hover:underline"
                  >
                    {mode === "login" ? "Sign up" : "Sign in"}
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
