import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CausesSection } from "@/components/sections/CausesSection";
import { BirthdaySection } from "@/components/sections/BirthdaySection";
import { TransparencySection } from "@/components/sections/TransparencySection";
import { VolunteerSection } from "@/components/sections/VolunteerSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { GallerySection } from "@/components/sections/GallerySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <StatsSection />
        <CausesSection />
        <BirthdaySection />
        <TransparencySection />
        <VolunteerSection />
        <ContactSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
