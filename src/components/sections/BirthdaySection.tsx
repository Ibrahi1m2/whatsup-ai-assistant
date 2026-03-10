import { Button } from "@/components/ui/button";
import { Camera, Video, Monitor, Image } from "lucide-react";

const features = [
  { icon: Camera, text: "Get Photo Proof Of Your Donation" },
  { icon: Video, text: "Get a Video of Your Birthday Celebration" },
  { icon: Monitor, text: "Virtual Celebration Available" },
  { icon: Image, text: "Collage Image of Food Parcel" },
];

export const BirthdaySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Birthday Coming Up? 🎂
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Celebrate with the poor and homeless kids and share your joy!
            </p>
            <div className="space-y-4 mb-8">
              {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <feat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">{feat.text}</p>
                </div>
              ))}
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 font-semibold">
              Donate Now
            </Button>
          </div>
          <div className="relative">
            <img
              src="https://www.thaagam.org/static/website/assets/images/birthday/photo-proof.jpeg"
              alt="Birthday celebration with children"
              className="rounded-2xl shadow-xl w-full"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-4 shadow-lg">
              <p className="text-2xl font-bold font-display">500+</p>
              <p className="text-xs">Birthdays Celebrated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
