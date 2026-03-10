import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/sections/GallerySection";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <section className="py-12 bg-thaagam-light-bg">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Gallery</h1>
            <p className="text-lg text-muted-foreground">See the impact of your generosity.</p>
          </div>
        </section>
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
