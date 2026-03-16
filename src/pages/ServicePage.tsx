import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircuitBackground from "@/components/CircuitBackground";
import { Check, Server, Gamepad2, Bot, Shield, Cpu, HardDrive, Zap, Globe, Clock, MemoryStick, MonitorDot } from "lucide-react";

const serviceData: Record<string, {
  icon: any;
  titleWhite: string;
  titleOrange: string;
  description: string;
  plans: { name: string; tag?: string; price: string; features: string[]; popular?: boolean }[];
  bottomFeatures: { icon: any; title: string; desc: string }[];
}> = {
  "vps-hosting": {
    icon: Server,
    titleWhite: "POWERFUL",
    titleOrange: "VPS SOLUTIONS",
    description: "Enterprise-grade virtual private servers powered by AMD EPYC processors with NVMe storage and advanced DDoS protection for maximum performance.",
    plans: [
      {
        name: "Performance",
        tag: "Performance",
        price: "₹300/mo",
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
  "game-hosting": {
    icon: Gamepad2,
    titleWhite: "ADVANCED",
    titleOrange: "GAME SERVER",
    description: "Optimized game servers with one-click installs, full mod support, and ultra-low latency for the best gaming experience.",
    plans: [
      { name: "Basic", price: "₹250/mo", features: ["2GB RAM", "Mod Support", "Auto Backups", "DDoS Protection"] },
      { name: "Standard", price: "₹500/mo", features: ["4GB RAM", "Mod Support", "Auto Backups", "DDoS Protection", "Priority Queue"], popular: true },
      { name: "Ultimate", price: "₹1,000/mo", features: ["8GB RAM", "Unlimited Mods", "Auto Backups", "DDoS Protection", "Priority Queue", "Dedicated IP"] },
    ],
    bottomFeatures: [
      { icon: Zap, title: "Ultra-Low Latency", desc: "Optimized network routes for lag-free gaming" },
      { icon: Shield, title: "DDoS Protection", desc: "Keep your server online during attacks" },
      { icon: HardDrive, title: "Auto Backups", desc: "Automatic world saves and easy restoration" },
      { icon: Cpu, title: "Mod Support", desc: "Full support for plugins, mods, and custom configs" },
      { icon: Globe, title: "One-Click Install", desc: "Deploy popular games instantly with templates" },
      { icon: Clock, title: "24/7 Monitoring", desc: "Automatic restart and health monitoring" },
    ],
  },
  "bot-hosting": {
    icon: Bot,
    titleWhite: "FUTURISTIC",
    titleOrange: "BOT HOSTING",
    description: "Always-on bot hosting with guaranteed uptime, auto-restart capabilities, and custom domain support for Discord bots and automation.",
    plans: [
      { name: "Hobby", price: "₹150/mo", features: ["512MB RAM", "1 Bot", "Auto Restart", "99.9% Uptime"] },
      { name: "Developer", price: "₹400/mo", features: ["1GB RAM", "3 Bots", "Auto Restart", "Custom Domain", "Priority Support"], popular: true },
      { name: "Business", price: "₹800/mo", features: ["2GB RAM", "10 Bots", "Auto Restart", "Custom Domain", "Priority Support", "API Access"] },
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

const ServicePage = () => {
  const { service } = useParams();
  const data = serviceData[service || ""] || serviceData["vps-hosting"];
  const IconComp = data.icon;
  const isVps = service === "vps-hosting";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <CircuitBackground />
        <div className="container mx-auto relative z-10">
          {/* Circular icon box + titles */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-8 glow-effect">
              <IconComp className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="gradient-text text-sm font-semibold tracking-widest uppercase">
                {service?.replace("-", " ")} Hosting
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
              <div className="relative rounded-2xl bg-card border border-border overflow-hidden flex items-center justify-center p-8">
                <div className="text-center">
                  <MonitorDot className="w-24 h-24 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">Windows & Linux Supported</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">Deploy your preferred OS in seconds</p>
                </div>
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
                <p className="text-4xl font-bold gradient-text mb-8">{plan.price}</p>
                <ul className="space-y-3.5 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 rounded-lg font-medium transition-opacity hover:opacity-90 ${
                  plan.popular || plan.tag ? "gradient-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>

          {/* Bottom feature boxes */}
          <div className="mt-24 max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              <span className="text-foreground">Why Choose Our </span>
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
