import { Shield, Zap, Clock, Server } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-[120px] gradient-primary" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8 blur-[100px] gradient-primary" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="sparkle" style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 3}s`,
          }} />
        ))}
      </div>

      <div className="container mx-auto text-center relative z-10">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-primary/30 mb-8 glow-effect">
          <span className="text-lg text-primary">✦</span>
          <span className="text-sm font-medium text-foreground">Premium Cloud Hosting</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Powerful <span className="gradient-text">Cloud</span> Hosting
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 text-center">
          Play without limits. Deploy powerful game servers & VPS in seconds with unbeatable stability and low latency
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a
            href="#services"
            className="px-8 py-3 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { icon: Shield, label: "DDoS Protection" },
            { icon: Clock, label: "99.9% Uptime" },
            { icon: Zap, label: "Instant Setup" },
            { icon: Server, label: "Global Servers" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border text-sm text-muted-foreground">
              <f.icon className="w-4 h-4 text-primary" />
              {f.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
