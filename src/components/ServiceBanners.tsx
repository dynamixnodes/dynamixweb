import { Link } from "react-router-dom";
import { ArrowRight, Server, Gamepad2, Bot } from "lucide-react";

const services = [
  {
    icon: Server,
    title: "VPS Hosting",
    desc: "High-performance virtual private servers with dedicated resources and full root access.",
    path: "/vps-hosting",
    price: "Starting at $4.99/mo",
  },
  {
    icon: Gamepad2,
    title: "Game Hosting",
    desc: "Optimized game servers with one-click installs, mod support, and ultra-low latency.",
    path: "/game-hosting",
    price: "Starting at $2.99/mo",
    popular: true,
  },
  {
    icon: Bot,
    title: "Bot Hosting",
    desc: "Always-on bot hosting with guaranteed uptime, perfect for Discord bots and automation.",
    path: "/bot-hosting",
    price: "Starting at $1.99/mo",
  },
];

const ServiceBanners = () => {
  return (
    <section id="services" className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-foreground">Our</span>{" "}
          <span className="gradient-text">Services</span>
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
          Everything you need to deploy and scale your projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <div
              key={i}
              className={`group relative p-8 rounded-2xl bg-card border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(20_90%_42%/0.2)] overflow-hidden ${
                s.popular ? "border-primary/50 glow-effect" : "border-border hover:border-primary/50"
              }`}
            >
              {s.popular && (
                <div className="absolute -top-0 right-4 top-4 px-3 py-1 rounded-full text-xs font-bold gradient-primary text-primary-foreground">
                  POPULAR
                </div>
              )}

              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 blur-[60px] gradient-primary transition-opacity duration-500" />

              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
              <p className="text-lg font-semibold gradient-text mb-6">{s.price}</p>

              <Link
                to={s.path}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                View Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBanners;
