import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

const plansData: Record<string, { title: string; plans: { name: string; price: string; features: string[]; popular?: boolean }[] }> = {
  "vps-hosting": {
    title: "VPS Hosting",
    plans: [
      { name: "Starter", price: "$4.99/mo", features: ["1 vCPU", "1GB RAM", "20GB NVMe SSD", "1TB Bandwidth", "DDoS Protection"] },
      { name: "Pro", price: "$9.99/mo", features: ["2 vCPU", "4GB RAM", "60GB NVMe SSD", "3TB Bandwidth", "DDoS Protection", "Priority Support"], popular: true },
      { name: "Enterprise", price: "$24.99/mo", features: ["4 vCPU", "8GB RAM", "120GB NVMe SSD", "Unlimited Bandwidth", "DDoS Protection", "24/7 Support", "Dedicated IP"] },
    ],
  },
  "game-hosting": {
    title: "Game Hosting",
    plans: [
      { name: "Basic", price: "$2.99/mo", features: ["2GB RAM", "Mod Support", "Auto Backups", "DDoS Protection"] },
      { name: "Standard", price: "$5.99/mo", features: ["4GB RAM", "Mod Support", "Auto Backups", "DDoS Protection", "Priority Queue"], popular: true },
      { name: "Ultimate", price: "$11.99/mo", features: ["8GB RAM", "Unlimited Mods", "Auto Backups", "DDoS Protection", "Priority Queue", "Dedicated IP"] },
    ],
  },
  "bot-hosting": {
    title: "Bot Hosting",
    plans: [
      { name: "Hobby", price: "$1.99/mo", features: ["512MB RAM", "1 Bot", "Auto Restart", "99.9% Uptime"] },
      { name: "Developer", price: "$4.99/mo", features: ["1GB RAM", "3 Bots", "Auto Restart", "Custom Domain", "Priority Support"], popular: true },
      { name: "Business", price: "$9.99/mo", features: ["2GB RAM", "10 Bots", "Auto Restart", "Custom Domain", "Priority Support", "API Access"] },
    ],
  },
  "domain-hosting": {
    title: "Domain Hosting",
    plans: [
      { name: ".com", price: "$9.99/yr", features: ["Free SSL", "DNS Management", "WHOIS Privacy", "Email Forwarding"] },
      { name: ".dev", price: "$12.99/yr", features: ["Free SSL", "DNS Management", "WHOIS Privacy", "Email Forwarding", "DNSSEC"], popular: true },
      { name: ".io", price: "$29.99/yr", features: ["Free SSL", "DNS Management", "WHOIS Privacy", "Email Forwarding", "DNSSEC", "Premium DNS"] },
    ],
  },
};

const ServicePage = () => {
  const { service } = useParams();
  const data = plansData[service || ""] || plansData["vps-hosting"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{data.title}</span> Plans
            </h1>
            <p className="text-muted-foreground text-lg">Choose the perfect plan for your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.plans.map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl bg-card border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(253_100%_66%/0.15)] ${
                  plan.popular ? "border-primary/50 glow-effect" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold gradient-primary text-primary-foreground">
                    POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold gradient-text mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-medium transition-opacity hover:opacity-90 ${
                  plan.popular ? "gradient-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServicePage;
