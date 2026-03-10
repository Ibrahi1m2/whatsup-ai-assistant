import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Instagram, Phone, Mail, MapPin } from "lucide-react";

const contactMethods = [
  { icon: MessageCircle, label: "Chat with us On WhatsApp", href: "https://wa.me/+919790927575", color: "bg-accent" },
  { icon: Instagram, label: "Send Us A DM On Instagram", href: "https://ig.me/m/thaagamfoundation", color: "bg-pink-500" },
  { icon: Phone, label: "Get On Call With Us", href: "tel:+918069169691", color: "bg-primary" },
  { icon: Mail, label: "Send Us An Email", href: "mailto:office@thaagam.email", color: "bg-secondary" },
  { icon: MapPin, label: "Chennai 600-031", href: "https://maps.app.goo.gl/r8k4eQWY9zNC6Fwa6", color: "bg-destructive" },
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", message: "" });

  return (
    <section className="py-20 bg-thaagam-light-bg" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Get In Touch
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Reach out to us. We are here to help you.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact methods */}
          <div className="space-y-4">
            {contactMethods.map((m, i) => (
              <a
                key={i}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center shrink-0`}>
                  <m.icon className="h-5 w-5 text-background" />
                </div>
                <span className="font-medium text-foreground">{m.label}</span>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">Quick Contact Form</h3>
            <form className="space-y-4">
              <Input
                placeholder="Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                placeholder="Email *"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                placeholder="Phone *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input
                placeholder="Address *"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <Textarea
                placeholder="Case Description *"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold">
                Submit Now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
