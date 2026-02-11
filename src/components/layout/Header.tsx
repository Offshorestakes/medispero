import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User, ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import logoImage from "@/assets/logo.png";
import type { User as SupaUser } from "@supabase/supabase-js";

// Group categories for mobile nav
const categoryGroups = [
  {
    label: "🧠 Mental Wellness",
    slugs: ["pharma-capsules", "adhd-focus", "anti-anxiety", "mood-support"],
  },
  {
    label: "🌿 CBD Products",
    slugs: ["cbd-oils", "cbd-capsules", "cbd-vape", "cbd-skincare"],
  },
  {
    label: "⚗️ CBD Isolates",
    slugs: ["cbd-isolate-powder", "cbd-isolate-crystals", "cbd-isolate-pure-spectrum"],
  },
  {
    label: "🎁 More",
    slugs: ["sleep-wellness", "bundles"],
  },
];

const MobileNav = ({ onClose, user }: { onClose: () => void; user: SupaUser | null }) => {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const toggleGroup = (label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label));
  };

  return (
    <nav aria-label="Mobile navigation" className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
      <div className="flex flex-col gap-1">
        <Link to="/" className="py-2.5 font-medium" onClick={onClose}>
          Home
        </Link>
        <Link to="/products" className="py-2.5 font-medium" onClick={onClose}>
          All Products
        </Link>

        {/* Collapsible category groups */}
        {categoryGroups.map((group) => {
          const isOpen = openGroup === group.label;
          const groupCategories = categories.filter((c) => group.slugs.includes(c.slug));
          return (
            <Collapsible
              key={group.label}
              open={isOpen}
              onOpenChange={() => toggleGroup(group.label)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 font-medium text-left">
                <span>{group.label}</span>
                <ChevronRight
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="flex flex-col gap-0.5 ml-2 border-l-2 border-border pl-3 mb-1">
                  {groupCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={onClose}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}

        <Link to="/about" className="py-2.5 font-medium" onClick={onClose}>
          About Us
        </Link>
        <Link to="/blog" className="py-2.5 font-medium" onClick={onClose}>
          Blog
        </Link>
        <Link to="/contact" className="py-2.5 font-medium" onClick={onClose}>
          Contact
        </Link>
        {!user && (
          <Link to="/auth" className="py-2.5 font-medium text-primary" onClick={onClose}>
            Sign In / Register
          </Link>
        )}
      </div>
    </nav>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { totalItems, setIsOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header role="banner" className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container-wide flex items-center justify-between text-sm">
          <p className="hidden sm:block">🌿 Free shipping on orders over $250 | Lab-tested CBD products</p>
          <p className="sm:hidden text-center w-full">Free shipping over $250 🌿</p>
          <div className="hidden sm:flex items-center gap-4">
            <a href="mailto:info@medispero.com" className="hover:underline">info@medispero.com</a>
            <span>|</span>
            <a href="tel:+13347469312" className="hover:underline">+1 (334) 746-9312</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-wide py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="Medi Spero" 
              className="w-12 h-12 object-contain"
            />
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-foreground tracking-wide">Medi Spero</span>
              <p className="text-xs text-muted-foreground -mt-1">Premium Wellness</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                Shop <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/products" className="w-full">All Products</Link>
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link to={`/category/${category.slug}`} className="w-full">
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to="/lab-results" className="text-sm font-medium hover:text-primary transition-colors">
              Lab Results
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 animate-fade-in">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-48 md:w-64"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Account">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate max-w-[200px]">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" aria-label="Account" asChild>
                <Link to="/auth">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative" 
              aria-label="Cart"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center font-medium">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <MobileNav onClose={() => setIsMenuOpen(false)} user={user} />
        )}
      </div>
    </header>
  );
};

export default Header;
