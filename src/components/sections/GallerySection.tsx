import { Instagram } from "lucide-react";

const images = [
  "https://www.thaagam.org/static/website/assets/images/Home_Gallery/gal_1.webp",
  "https://www.thaagam.org/static/website/assets/images/Home_Gallery/gal_2.webp",
  "https://www.thaagam.org/static/website/assets/images/Home_Gallery/gal_3.webp",
  "https://www.thaagam.org/static/website/assets/images/Home_Gallery/gal_4.webp",
  "https://www.thaagam.org/static/website/assets/images/Home_Gallery/gal_5.webp",
  "https://www.thaagam.org/static/website/assets/images/Home_Gallery/gal_6.webp",
];

export const GallerySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
              <img
                src={img}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-thaagam-dark/0 group-hover:bg-thaagam-dark/40 transition-colors" />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/thaagamfoundation/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <Instagram className="h-5 w-5" />
            Follow @Thaagam on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};
