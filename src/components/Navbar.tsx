import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Causes", path: "/causes" },
  { name: "Blog", path: "/blog" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg font-display">T</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground font-display leading-tight">THAAGAM</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest -mt-0.5">Foundation</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6">
              Donate Monthly 💝
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button className="w-full mt-4 bg-primary text-primary-foreground rounded-full">
              Donate Monthly 💝
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
