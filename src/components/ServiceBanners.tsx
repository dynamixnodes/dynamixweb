import { Link } from "react-router-dom";
import { ArrowRight, Server, Gamepad2, Bot, Zap } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const services = [
  {
    icon: Server,
    title: "VPS Hosting",
    desc: "High-performance virtual private servers with dedicated resources and full root access.",
    path: "/vps-hosting",
    priceINR: 440,
    features: ["AMD EPYC CPUs", "NVMe SSD Storage", "DDoS Protection", "Full Root Access"],
  },
  {
    icon: Gamepad2,
    title: "Game Hosting",
    desc: "Optimized game servers with one-click installs, mod support, and ultra-low latency.",
    path: "/game-hosting",
    priceINR: 20,
    popular: true,
    features: ["One-Click Installs", "Mod Support", "Ultra-Low Latency", "24/7 Uptime"],
  },
  {
    icon: Bot,
    title: "Bot Hosting",
    desc: "Always-on bot hosting with guaranteed uptime, perfect for Discord bots and automation.",
    path: "/bot-hosting",
    priceINR: 15,
    features: ["99.9% Uptime", "Auto Restart", "DDoS Protection", "24/7 Monitoring"],
  },
];

const ServiceBanners = () => {
  const { formatPrice } = useCurrency();

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((s, i) => (
            <div
              key={i}
              className={`group relative p-10 rounded-2xl bg-card border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(20_90%_42%/0.2)] overflow-hidden ${
                s.popular ? "border-primary/50 glow-effect" : "border-border hover:border-primary/50"
              }`}
            >
              {s.popular && (
                <div className="absolute right-4 top-4 px-3 py-1 rounded-full text-xs font-bold gradient-primary text-primary-foreground">
                  POPULAR
                </div>
              )}

              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 blur-[60px] gradient-primary transition-opacity duration-500" />

              <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <s.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>

              <ul className="space-y-2.5 mb-6">
                {s.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <p className="text-xl font-semibold gradient-text mb-6">Starting at {formatPrice(s.priceINR)}/mo</p>

              <Link
                to={s.path}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
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
