import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-thaagam-dark text-background/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg font-display">T</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-background font-display">THAAGAM</h3>
                <p className="text-[10px] uppercase tracking-widest text-background/50">Foundation</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-background/60">
              100% transparent NGO dedicated to alleviating hunger and uplifting communities through food, education, and healthcare.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["About Us", "Causes", "Gallery", "Blog", "Contact"].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase().replace(" ", "-")}`}
                  className="block text-sm text-background/60 hover:text-primary transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Causes */}
          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Our Causes</h4>
            <div className="space-y-2">
              {["Feed Homeless", "Education", "Healthcare", "Plant a Tree", "Animal Welfare"].map((cause) => (
                <p key={cause} className="text-sm text-background/60 hover:text-primary cursor-pointer transition-colors">
                  {cause}
                </p>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:+918069169691" className="flex items-center gap-2 text-sm text-background/60 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                +91 80691 69691
              </a>
              <a href="mailto:office@thaagam.email" className="flex items-center gap-2 text-sm text-background/60 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                office@thaagam.email
              </a>
              <div className="flex items-start gap-2 text-sm text-background/60">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>No.6, Dhanammal street, Spurtank road, Chetpet, Chennai 600-031</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © 2025 Thaagam Foundation. All rights reserved.
          </p>
          <p className="text-sm text-background/40 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-primary fill-primary" /> for a better world
          </p>
        </div>
      </div>
    </footer>
  );
};
