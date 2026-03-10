import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar } from "lucide-react";

const blogPosts = [
  {
    title: "How ₹30 Can Feed a Homeless Person",
    excerpt: "Learn how your small contribution makes a massive impact on the lives of homeless people in Chennai.",
    date: "Jan 15, 2025",
    image: "https://media.thaagam.ngo/media/deps/causes/card/hl_card_image.jpeg",
  },
  {
    title: "Celebrating Birthdays with Underprivileged Children",
    excerpt: "Discover how you can make your birthday special by sharing joy with children who need it the most.",
    date: "Dec 28, 2024",
    image: "https://www.thaagam.org/static/website/assets/images/birthday/photo-proof.jpeg",
  },
  {
    title: "Planting Trees for a Greener Tomorrow",
    excerpt: "Our tree-planting initiative has planted thousands of saplings across Tamil Nadu.",
    date: "Nov 10, 2024",
    image: "https://media.thaagam.ngo/media/deps/causes/card/planttree.webp",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <section className="py-12 bg-thaagam-light-bg">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">Stories of impact and hope.</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <article key={i} className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
                <img src={post.image} alt={post.title} className="w-full aspect-video object-cover" loading="lazy" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
