import { Award, Camera, Video } from "lucide-react";

const commitments = [
  {
    icon: Award,
    title: "Donor Recognition",
    desc: "Every donation is acknowledged with the donor's name, creating a transparent record of contributions.",
  },
  {
    icon: Camera,
    title: "Photo Documentation",
    desc: "Every donor's contribution is backed with photo proof, showing the true impact of their support.",
  },
  {
    icon: Video,
    title: "Video Documentation",
    desc: "Transparency in every donor contribution is shown through video, highlighting the real difference their support makes.",
  },
];

export const TransparencySection = () => {
  return (
    <section className="py-20 bg-thaagam-light-bg">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Our Commitment to Transparency
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          We believe in complete openness. Every rupee you donate is accounted for.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {commitments.map((item, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-8 text-center border border-border hover:shadow-lg transition-shadow group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
