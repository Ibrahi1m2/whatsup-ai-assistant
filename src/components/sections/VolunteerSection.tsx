import { Button } from "@/components/ui/button";

export const VolunteerSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://www.thaagam.org/static/website/assets/images/volunteer.webp"
              alt="Volunteers"
              className="rounded-2xl shadow-xl w-full"
              loading="lazy"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Become a Volunteer
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Welcome to THAAGAM FOUNDATION! We invite you to engage with us and support
              our mission to impact our community positively. Your involvement helps us provide nutritious meals
              to the homeless, distribute essential items, support children's education, aid young hospital patients,
              donate blankets during cold weather, and organize tree-planting events for a greener future.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 font-semibold">
              Become a Volunteer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
