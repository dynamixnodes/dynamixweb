import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Cloud, Gamepad2, Bot, Globe } from "lucide-react";
import logo from "@/assets/dynamixnodes-logo.png";

const services = [
  { name: "VPS Hosting", icon: Cloud, path: "/vps-hosting" },
  { name: "Game Hosting", icon: Gamepad2, path: "/game-hosting" },
  { name: "Bot Hosting", icon: Bot, path: "/bot-hosting" },
  { name: "Domain Hosting", icon: Globe, path: "/domain-hosting" },
];

const Navbar = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="DynamixNodes" className="w-10 h-10 rounded-lg" />
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">Dynamix</span>Nodes
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
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

          <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</Link>

          <a
            href="https://discord.gg/F8PKTvvMUZ"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg text-sm font-medium gradient-border hover:opacity-90 transition-opacity"
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
            <Link to="/support" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Support</Link>
            <a
              href="https://discord.gg/F8PKTvvMUZ"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg text-sm font-medium gradient-border text-center"
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
