import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Need <span className="gradient-text">Support</span>?
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            Our team is ready to help you with any issues or questions you may have.
          </p>

          <a
            href="https://discord.com/channels/1472607382751412298/1472907775976935456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold gradient-primary text-primary-foreground hover:opacity-90 transition-opacity float-animation glow-effect"
          >
            🎫 Get Support Via Tickets
          </a>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "💬", title: "Discord", desc: "Join our community for real-time help" },
              { emoji: "📧", title: "Email", desc: "Send us a detailed message" },
              { emoji: "📖", title: "Knowledge Base", desc: "Browse our documentation" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Support;
