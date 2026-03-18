import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Server, Gamepad2, Bot, MessageCircle } from "lucide-react";
import logo from "@/assets/dynamixnodes-logo.png";
import { useCurrency, CurrencyCode } from "@/contexts/CurrencyContext";

const services = [
  { name: "VPS Hosting", icon: Server, path: "/vps-hosting" },
  { name: "Game Hosting", icon: Gamepad2, path: "/game-hosting" },
  { name: "Bot Hosting", icon: Bot, path: "/bot-hosting" },
];

const currencies: CurrencyCode[] = ["INR", "USD", "NPR", "BDT", "PKR", "EUR"];

const Navbar = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={logo} alt="RydenByte" className="w-10 h-10 rounded-lg" />
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">Ryden</span>Byte
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center flex-1 justify-center gap-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Services <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="absolute top-full mt-2 left-0 w-52 bg-card border border-border rounded-lg py-2 shadow-xl animate-scale-in">
                {services.map((s) => (
                  <Link
                    key={s.path}
                    to={s.path}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    <s.icon className="w-4 h-4 text-primary" />
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/chatbot" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Chatbot</Link>
          <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</Link>
        </div>

        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {/* Currency Selector */}
          <div ref={currencyRef} className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-primary border border-primary/40 hover:gradient-primary hover:text-primary-foreground transition-all duration-300"
            >
              {currency} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${currencyOpen ? "rotate-180" : ""}`} />
            </button>
            {currencyOpen && (
              <div className="absolute top-full mt-2 right-0 w-32 bg-card border border-border rounded-lg py-2 shadow-xl animate-scale-in">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      c === currency ? "text-primary font-semibold bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://discord.gg/F8PKTvvMUZ"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg text-sm font-medium text-primary border border-primary/40 hover:gradient-primary hover:text-primary-foreground transition-all duration-300"
          >
            Join Discord
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link to="/" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Home</Link>
            {services.map((s) => (
              <Link key={s.path} to={s.path} className="flex items-center gap-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                <s.icon className="w-4 h-4 text-primary" />
                {s.name}
              </Link>
            ))}
            <Link to="/chatbot" className="flex items-center gap-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
              <MessageCircle className="w-4 h-4 text-primary" />
              Chatbot
            </Link>
            <Link to="/support" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Support</Link>
            
            {/* Mobile Currency */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Currency:</span>
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    c === currency ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <a
              href="https://discord.gg/F8PKTvvMUZ"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg text-sm font-medium text-primary border border-primary/40 text-center"
            >
              Join Discord
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
