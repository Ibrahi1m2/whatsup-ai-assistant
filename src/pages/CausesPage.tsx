import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CausesSection } from "@/components/sections/CausesSection";

const CausesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <section className="py-12 bg-thaagam-light-bg">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Causes</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every contribution creates a ripple of change. Choose a cause close to your heart.
            </p>
          </div>
        </section>
        <CausesSection />
      </main>
      <Footer />
    </div>
  );
};

export default CausesPage;
