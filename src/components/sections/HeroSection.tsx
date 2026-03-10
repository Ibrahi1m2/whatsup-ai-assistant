import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://media.thaagam.ngo/media/deps/causes/card/hl_card_image.jpeg')",
        }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <p className="text-primary-foreground/70 text-sm font-medium uppercase tracking-widest mb-4">
            Thaagam Foundation
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-background leading-tight mb-6">
            Change lives with{" "}
            <span className="text-primary">Thaagam Foundation.</span>
          </h1>
          <p className="text-background/70 text-lg md:text-xl mb-8 max-w-lg">
            Feed a homeless person for just ₹30. Every meal matters. Every life counts.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 text-lg font-semibold shadow-lg shadow-primary/30">
              <Heart className="mr-2 h-5 w-5" /> Donate Now
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-lg font-semibold border-background/30 text-background hover:bg-background/10">
              Learn More
            </Button>
          </div>
        </div>

        {/* Why Thaagam card */}
        <div className="absolute bottom-8 right-4 md:right-8 max-w-sm hidden md:block">
          <div className="bg-thaagam-dark/90 backdrop-blur-md rounded-2xl p-6 border border-background/10">
            <h3 className="font-display text-xl font-bold text-background mb-3">Why Thaagam?</h3>
            <p className="text-sm text-background/60 leading-relaxed">
              Thaagam Foundation operates with 100% transparency, ensuring that every donation directly supports those in need. Our mission is to alleviate hunger and uplift communities through food, education, and healthcare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
