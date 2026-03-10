import { useState } from "react";
import { Button } from "@/components/ui/button";
import { causes, categories, type Cause } from "@/data/causes";

const CauseCard = ({ cause }: { cause: Cause }) => (
  <div className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="relative overflow-hidden aspect-[4/3]">
      <img
        src={cause.image}
        alt={cause.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div className="p-5">
      <h4 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-1">
        {cause.title}
      </h4>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-primary">{cause.price}</span>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 text-xs font-semibold">
          Donate Now
        </Button>
      </div>
    </div>
  </div>
);

export const CausesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? causes
    : causes.filter((c) => c.category === activeCategory);

  return (
    <section className="py-20 bg-thaagam-light-bg" id="causes">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-10">
          Our Causes
        </h2>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.name
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground border border-border hover:border-primary/50"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((cause) => (
            <CauseCard key={cause.id} cause={cause} />
          ))}
        </div>
      </div>
    </section>
  );
};
