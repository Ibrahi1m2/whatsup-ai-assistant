import { Heart, IndianRupee, UtensilsCrossed, HandHeart } from "lucide-react";

const stats = [
  { icon: HandHeart, value: "6.52 L+", label: "Active Donors" },
  { icon: IndianRupee, value: "₹43.46 Cr+", label: "Donation Raised" },
  { icon: UtensilsCrossed, value: "115.94 L+", label: "Meals Served" },
  { icon: Heart, value: "6.73 L+", label: "Donations Made" },
];

export const StatsSection = () => {
  return (
    <section className="py-16 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
