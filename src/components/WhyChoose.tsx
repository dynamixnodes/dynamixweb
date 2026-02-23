import { Shield, Zap, Clock, MapPin, Headphones, Server } from "lucide-react";

const features = [
  { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade protection for your servers" },
  { icon: Server, title: "NVMe SSD Storage", desc: "Lightning-fast performance with NVMe drives" },
  { icon: Zap, title: "Instant Setup", desc: "Get your server running in minutes" },
  { icon: MapPin, title: "Global Locations", desc: "Low latency for players worldwide" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help you succeed" },
  { icon: Clock, title: "99.9% Uptime", desc: "Reliable infrastructure you can trust" },
];

const WhyChoose = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Why Choose <span className="gradient-text">Dynamix Nodes</span>?
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
          Enterprise-grade features that power your success
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(253_100%_66%/0.15)]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
