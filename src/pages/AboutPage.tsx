import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, Users, Target, Eye } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="py-20 bg-thaagam-light-bg">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">About Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thaagam Foundation is a 100% transparent NGO dedicated to alleviating hunger and uplifting communities through food, education, and healthcare.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
            <div className="bg-card p-8 rounded-2xl border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To alleviate hunger and uplift communities through food, education, and healthcare, focusing on long-term solutions that create lasting change. We provide regular updates, allowing donors to see the tangible impact of their contributions.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where no one goes to bed hungry, every child has access to education, and communities thrive with dignity and self-sufficiency. Together, we can transform lives and build a brighter future.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-thaagam-light-bg">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Heart, title: "Compassion", desc: "We serve with empathy and love for all." },
                { icon: Users, title: "Community", desc: "Together we create lasting positive change." },
                { icon: Eye, title: "Transparency", desc: "100% accountability on every donation." },
                { icon: Target, title: "Impact", desc: "Focused on measurable, real-world results." },
              ].map((v, i) => (
                <div key={i} className="bg-card p-6 rounded-2xl border border-border text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h4>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
