import { useState, useRef } from "react";
import { Check, Cpu, HardDrive, MapPin, Sparkles, Lightbulb, ChevronDown, ArrowRight, Shield, Clock, Zap, Globe, Send, Database, Archive, Layers } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";

const minecraftPlans = [
  { name: "Ryden - Dirt", ram: 2, cpu: 0.5, storage: 8, priceINR: 20 },
  { name: "Ryden - Copper", ram: 4, cpu: 1, storage: 16, priceINR: 45 },
  { name: "Ryden - Iron", ram: 8, cpu: 2, storage: 32, priceINR: 90 },
  { name: "Ryden - Gold", ram: 12, cpu: 4, storage: 48, priceINR: 180 },
  { name: "Ryden - Diamond", ram: 16, cpu: 6, storage: 64, priceINR: 365 },
  { name: "Ryden - Emerald", ram: 32, cpu: 8, storage: 128, priceINR: 630 },
  { name: "Ryden - Netherite", ram: 64, cpu: 12, storage: 256, priceINR: 1000 },
  { name: "Ryden - Bedrock", ram: Infinity, cpu: Infinity, storage: Infinity, priceINR: 5000 },
];

const commonFeatures = ["Mod Support", "24/7 Uptime", "Low Latency", "DDoS Protection"];

const cpuSteps = [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

function estimatePrice(ram: number, cpu: number, storage: number): number {
  // Use known plans to interpolate price
  const plans = minecraftPlans.filter(p => p.ram !== Infinity);
  // Calculate resource score for input
  const score = ram + cpu * 4 + storage * 0.25;

  // Find surrounding plans
  let lower = plans[0];
  let upper = plans[plans.length - 1];
  const planScores = plans.map(p => ({ ...p, score: p.ram + p.cpu * 4 + p.storage * 0.25 }));

  for (let i = 0; i < planScores.length - 1; i++) {
    if (score >= planScores[i].score && score <= planScores[i + 1].score) {
      lower = planScores[i];
      upper = planScores[i + 1];
      break;
    }
  }

  if (score <= planScores[0].score) return planScores[0].priceINR;
  if (score >= planScores[planScores.length - 1].score) return planScores[planScores.length - 1].priceINR;

  const lowerScore = lower.ram + lower.cpu * 4 + lower.storage * 0.25;
  const upperScore = upper.ram + upper.cpu * 4 + upper.storage * 0.25;
  const t = (score - lowerScore) / (upperScore - lowerScore);
  return Math.round(lower.priceINR + t * (upper.priceINR - lower.priceINR));
}

const GameHostingContent = () => {
  const { formatPrice, currency } = useCurrency();
  const [location, setLocation] = useState("India");
  const [locationOpen, setLocationOpen] = useState(false);
  const [ram, setRam] = useState(4);
  const [cpu, setCpu] = useState(1);
  const [cpuIndex, setCpuIndex] = useState(1);
  const [storage, setStorage] = useState(8);
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  const customPrice = estimatePrice(ram, cpu, storage);

  const handleCpuChange = (val: number[]) => {
    const idx = val[0];
    setCpuIndex(idx);
    setCpu(cpuSteps[idx] || 1);
  };

  const handleAiSuggest = async () => {
    if (!aiInput.trim() || aiLoading) return;
    setAiLoading(true);
    setAiResponse("");
    try {
      const planInfo = minecraftPlans.map(p =>
        p.ram === Infinity
          ? `${p.name}: Unlimited RAM, Unlimited vCores, Unlimited Storage - ${formatPrice(p.priceINR)}/mo`
          : `${p.name}: ${p.ram}GB RAM, ${p.cpu} vCore(s), ${p.storage}GB Storage - ${formatPrice(p.priceINR)}/mo`
      ).join("\n");

      const res = await supabase.functions.invoke("minecraft-suggest", {
        body: { message: aiInput, plans: planInfo, currency },
      });

      if (res.error) throw res.error;
      setAiResponse(res.data?.suggestion || "Sorry, I couldn't generate a suggestion.");
    } catch {
      setAiResponse("Failed to get suggestion. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-24">
      {/* Minecraft Badge */}
      <div className="text-center">
        <span className="inline-block px-6 py-2.5 rounded-full gradient-primary text-primary-foreground text-sm font-bold tracking-wide pointer-events-none select-none">
          Minecraft
        </span>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {minecraftPlans.map((plan, i) => (
          <div
            key={i}
            className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_hsl(25_95%_50%/0.1)] group"
          >
            <style>{`.group:hover { animation: float 3s ease-in-out infinite; }`}</style>
            <h3 className="text-lg font-bold text-foreground mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold gradient-text mb-6">{formatPrice(plan.priceINR)}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
            <ul className="space-y-2.5 mb-6">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {plan.ram === Infinity ? "∞ GB RAM" : `${plan.ram}GB RAM`}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {plan.cpu === Infinity ? "∞ vCore" : `${plan.cpu} vCore`}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {plan.storage === Infinity ? "∞ GB Storage" : `${plan.storage}GB Storage`}
              </li>
              {commonFeatures.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="https://discord.com/channels/1478422228323532883/1478432871889895504"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Order Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>

      {/* Custom Plans Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="text-foreground">Custom </span>
          <span className="gradient-text">Plans</span>
        </h2>
      </div>

      {/* Custom Plan Builder + AI Suggestor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Build Your Custom Plan */}
        <div className="p-8 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Build Your Custom Plan</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-8">Select your requirements and we'll show you the best plan for you</p>

          {/* Location */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Location</span>
            </div>
            <div ref={locationRef} className="relative">
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-muted border border-border text-sm text-foreground"
              >
                {location}
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${locationOpen ? "rotate-180" : ""}`} />
              </button>
              {locationOpen && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-lg py-1 shadow-xl z-10">
                  {["India", "Singapore"].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setLocation(loc); setLocationOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${loc === location ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RAM */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 6V4" /><path d="M10 6V4" /><path d="M14 6V4" /><path d="M18 6V4" /><path d="M6 18v2" /><path d="M10 18v2" /><path d="M14 18v2" /><path d="M18 18v2" /><rect x="6" y="10" width="4" height="4" /></svg>
                <span className="text-sm font-medium text-foreground">RAM</span>
              </div>
              <span className="text-sm font-bold text-primary">{ram} GB</span>
            </div>
            <Slider
              value={[ram]}
              onValueChange={(v) => setRam(v[0])}
              min={1}
              max={128}
              step={1}
              className="w-full"
            />
          </div>

          {/* CPU Cores */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">CPU Cores</span>
              </div>
              <span className="text-sm font-bold text-primary">{cpu} vCore</span>
            </div>
            <Slider
              value={[cpuIndex]}
              onValueChange={handleCpuChange}
              min={0}
              max={cpuSteps.length - 1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Storage */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Storage</span>
              </div>
              <span className="text-sm font-bold text-primary">{storage} GB</span>
            </div>
            <Slider
              value={[storage]}
              onValueChange={(v) => setStorage(v[0])}
              min={4}
              max={512}
              step={4}
              className="w-full"
            />
          </div>

          {/* Price */}
          <div className="p-4 rounded-xl bg-muted border border-border text-center">
            <span className="text-3xl font-bold text-primary">{formatPrice(customPrice)}</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </div>

        {/* AI Suggestor */}
        <div className="p-8 rounded-2xl bg-card border border-border flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Ryden AI Suggestor</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">Tell us what you need and our AI will suggest the perfect Minecraft plan for you</p>

          <div className="flex-1 min-h-[200px] mb-4 p-4 rounded-xl bg-muted border border-border overflow-auto">
            {aiResponse ? (
              <p className="text-sm text-foreground whitespace-pre-wrap">{aiResponse}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">AI suggestion will appear here...</p>
            )}
            {aiLoading && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAiSuggest()}
              placeholder="e.g., 20 players survival server with mods"
              className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleAiSuggest}
              disabled={aiLoading || !aiInput.trim()}
              className="px-4 py-3 rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Utility Store */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          <span className="text-foreground">Utility </span>
          <span className="gradient-text">Store</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Backup */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Archive className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Backup</h3>
            <p className="text-sm text-muted-foreground mb-4">Automatic server backups with easy one-click restoration to keep your data safe.</p>
            <p className="text-2xl font-bold text-primary mb-4">{formatPrice(35)}<span className="text-sm text-muted-foreground font-normal">/unit</span></p>
            <a
              href="https://discord.com/channels/1478422228323532883/1478432871889895504"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Order Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Allocation */}
          <div className="relative p-6 rounded-2xl bg-card border border-border">
            <div className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold gradient-primary text-primary-foreground">
              EXTERNAL
            </div>
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Allocation</h3>
            <p className="text-sm text-muted-foreground mb-4">Additional port allocations for your server to run multiple services simultaneously.</p>
            <p className="text-2xl font-bold text-primary mb-4">{formatPrice(100)}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
            <a
              href="https://discord.com/channels/1478422228323532883/1478432871889895504"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Order Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Database */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Database className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Database</h3>
            <p className="text-sm text-muted-foreground mb-4">Managed database instances for plugins and mods that require persistent data storage.</p>
            <p className="text-2xl font-bold text-primary mb-4">{formatPrice(85)}<span className="text-sm text-muted-foreground font-normal">/unit</span></p>
            <a
              href="https://discord.com/channels/1478422228323532883/1478432871889895504"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Order Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHostingContent;
