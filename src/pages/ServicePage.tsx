import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircuitBackground from "@/components/CircuitBackground";
import GameHostingContent from "@/components/GameHostingContent";
import { Check, Server, Gamepad2, Bot, Shield, Cpu, HardDrive, Zap, Globe, Clock, ArrowRight } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const serviceData: Record<string, {
  icon: any;
  titleWhite: string;
  titleOrange: string;
  description: string;
  plans: { name: string; tag?: string; priceINR: number; features: string[]; popular?: boolean }[];
  bottomFeatures: { icon: any; title: string; desc: string }[];
}> = {
  "vps-hosting": {
    icon: Server,
    titleWhite: "POWERFUL",
    titleOrange: "VPS SOLUTIONS",
    description: "Enterprise-grade virtual private servers powered by AMD EPYC processors with NVMe storage and advanced DDoS protection for maximum performance.",
    plans: [
      {
        name: "Ryden VPS",
        tag: "Performance",
        priceINR: 440,
        features: ["8GB RAM", "2 vCore", "20GB NVMe SSD", "AMD EPYC CPU", "DDoS Protection", "Full Root Access"],
        popular: true,
      },
    ],
    bottomFeatures: [
      { icon: Cpu, title: "AMD EPYC CPUs", desc: "Latest generation processors for blazing fast performance" },
      { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade protection against all attack vectors" },
      { icon: HardDrive, title: "NVMe SSD Storage", desc: "Ultra-fast storage with guaranteed IOPS" },
      { icon: Clock, title: "99.9% Uptime SLA", desc: "Industry-leading uptime guarantee with monitoring" },
      { icon: Globe, title: "Global Network", desc: "Low-latency connections across multiple regions" },
      { icon: Zap, title: "Instant Deployment", desc: "Get your server up and running in seconds" },
    ],
  },
  "bot-hosting": {
    icon: Bot,
    titleWhite: "FUTURISTIC",
    titleOrange: "BOT HOSTING",
    description: "Always-on bot hosting with guaranteed uptime, auto-restart capabilities, and custom domain support for Discord bots and automation.",
    plans: [
      { name: "Hobby", priceINR: 150, features: ["512MB RAM", "1 Bot", "Auto Restart", "99.9% Uptime"] },
      { name: "Developer", priceINR: 400, features: ["1GB RAM", "3 Bots", "Auto Restart", "Custom Domain", "Priority Support"], popular: true },
      { name: "Business", priceINR: 800, features: ["2GB RAM", "10 Bots", "Auto Restart", "Custom Domain", "Priority Support", "API Access"] },
    ],
    bottomFeatures: [
      { icon: Clock, title: "99.9% Uptime", desc: "Your bots stay online around the clock" },
      { icon: Zap, title: "Auto Restart", desc: "Automatic crash recovery and restart" },
      { icon: Globe, title: "Custom Domain", desc: "Use your own domain for bot dashboards" },
      { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade protection for your bots" },
      { icon: Cpu, title: "Resource Scaling", desc: "Scale CPU and RAM as your bots grow" },
      { icon: HardDrive, title: "Persistent Storage", desc: "Reliable storage for bot data and logs" },
    ],
  },
};

const gameHostingMeta = {
  icon: Gamepad2,
  titleWhite: "ADVANCED",
  titleOrange: "GAME SERVER",
  description: "Optimized game servers with one-click installs, full mod support, and ultra-low latency for the best gaming experience.",
  bottomFeatures: [
    { icon: Zap, title: "Ultra-Low Latency", desc: "Optimized network routes for lag-free gaming" },
    { icon: Shield, title: "DDoS Protection", desc: "Keep your server online during attacks" },
    { icon: HardDrive, title: "NVMe Storage", desc: "High-speed storage for fast world loading" },
    { icon: Cpu, title: "Mod Support", desc: "Full support for plugins, mods, and custom configs" },
    { icon: Globe, title: "One-Click Install", desc: "Deploy popular games instantly with templates" },
    { icon: Clock, title: "24/7 Monitoring", desc: "Automatic restart and health monitoring" },
  ],
};

const ServicePage = () => {
  const location = useLocation();
  const service = location.pathname.replace("/", "");
  const isGameHosting = service === "game-hosting";
  const { formatPrice } = useCurrency();

  if (isGameHosting) {
    const meta = gameHostingMeta;
    const IconComp = meta.icon;
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
          <CircuitBackground />
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-primary/30 mb-8 glow-effect">
                <IconComp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium gradient-text">Game Hosting</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-tight">
                <span className="text-foreground">{meta.titleWhite}</span>
              </h1>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">{meta.titleOrange}</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{meta.description}</p>
            </div>

            <GameHostingContent />

            {/* Bottom feature boxes */}
            <div className="mt-24 max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                <span className="text-foreground">Features Of Our </span>
                <span className="gradient-text">Game Hosting</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {meta.bottomFeatures.map((feat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group hover:float-animation">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                      <feat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const data = serviceData[service || ""] || serviceData["vps-hosting"];
  const IconComp = data.icon;
  const isVps = service === "vps-hosting";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <CircuitBackground />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-primary/30 mb-8 glow-effect">
              <IconComp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium gradient-text">
                {service?.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-tight">
              <span className="text-foreground">{data.titleWhite}</span>
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">{data.titleOrange}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{data.description}</p>
          </div>

          {/* Plans */}
          <div className={`grid gap-8 max-w-6xl mx-auto ${isVps ? 'grid-cols-1 md:grid-cols-2 max-w-4xl' : 'grid-cols-1 md:grid-cols-3'}`}>
            {isVps && (
              <div className="relative rounded-2xl bg-card border border-border overflow-hidden p-8 select-none hover:float-animation transition-all duration-300" draggable={false}>
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground text-center mb-8">Stats Overview</h3>
                <div className="space-y-6">
                  {[
                    { label: "Performance", value: 100 },
                    { label: "Speed", value: 100 },
                    { label: "Power", value: 100 },
                    { label: "Uptime", value: 100 },
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                        <span className="text-sm font-bold gradient-text">{stat.value}%</span>
                      </div>
                      <div className="relative w-full h-2.5 rounded-full bg-muted">
                        <div className="h-full rounded-full gradient-primary" style={{ width: `${stat.value}%` }} />
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground border-2 border-primary shadow-[0_0_8px_hsl(25_95%_50%/0.5)]"
                          style={{ right: `${100 - stat.value}%`, transform: 'translate(50%, -50%)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="https://discord.gg/2u8888wRur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity mt-8"
                >
                  Take Trial <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
            {data.plans.map((plan, i) => (
              <div
                key={i}
                className={`relative p-10 rounded-2xl bg-card border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(25_95%_50%/0.15)] ${
                  plan.popular ? "border-primary/50 glow-effect" : "border-border"
                }`}
              >
                {plan.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold gradient-primary text-primary-foreground tracking-wide">
                    {plan.tag.toUpperCase()}
                  </div>
                )}
                {plan.popular && !plan.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold gradient-primary text-primary-foreground">
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                <p className="text-4xl font-bold gradient-text mb-8">{formatPrice(plan.priceINR)}<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
                <ul className="space-y-3.5 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://discord.com/channels/1478422228323532883/1478432871889895504"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-medium text-center transition-opacity hover:opacity-90 ${
                    plan.popular || plan.tag ? "gradient-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  Order Now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* Bottom feature boxes */}
          <div className="mt-24 max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              <span className="text-foreground">Features Of Our </span>
              <span className="gradient-text">{service?.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.bottomFeatures.map((feat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServicePage;
