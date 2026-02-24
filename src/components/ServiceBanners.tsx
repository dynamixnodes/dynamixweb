import { Link } from "react-router-dom";
import { ArrowRight, Server, Gamepad2, Bot, Globe } from "lucide-react";

const services = [
  {
    icon: Server,
    title: "VPS Hosting",
    desc: "High-performance virtual private servers with dedicated resources and full root access.",
    features: ["Full Root Access", "Instant Deployment", "NVMe SSD", "DDoS Protection"],
    path: "/vps-hosting",
    price: "Starting at $4.99/mo",
  },
  {
    icon: Gamepad2,
    title: "Game Hosting",
    desc: "Optimized game servers with one-click installs, mod support, and ultra-low latency.",
    features: ["One-Click Install", "Mod Support", "Auto Backups", "24/7 Support"],
    path: "/game-hosting",
    price: "Starting at $2.99/mo",
  },
  {
    icon: Bot,
    title: "Bot Hosting",
    desc: "Always-on bot hosting with guaranteed uptime, perfect for Discord bots and automation.",
    features: ["24/7 Uptime", "Node.js & Python", "Auto Restart", "Custom Domains"],
    path: "/bot-hosting",
    price: "Starting at $1.99/mo",
  },
  {
    icon: Globe,
    title: "Domain Hosting",
    desc: "Register and manage domains with free SSL, DNS management, and WHOIS privacy.",
    features: ["Free SSL", "DNS Management", "WHOIS Privacy", "Email Forwarding"],
    path: "/domain-hosting",
    price: "Starting at $9.99/yr",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(253_100%_66%/0.15)] overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 blur-[60px] gradient-primary transition-opacity duration-500" />

              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <s.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
              <p className="text-sm font-semibold gradient-text mb-4">{s.price}</p>

              <ul className="space-y-2 mb-6">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full gradient-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

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
