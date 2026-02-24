import { Link } from "react-router-dom";
import logo from "@/assets/dynamixnodes-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="DynamixNodes" className="w-8 h-8 rounded-lg" />
              <span className="font-bold">
                <span className="gradient-text">Dynamix</span>Nodes
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium cloud hosting with unbeatable performance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Services</h4>
            <div className="flex flex-col gap-2">
              <Link to="/vps-hosting" className="text-sm text-muted-foreground hover:text-foreground transition-colors">VPS Hosting</Link>
              <Link to="/game-hosting" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Game Hosting</Link>
              <Link to="/bot-hosting" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Bot Hosting</Link>
              <Link to="/domain-hosting" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Domain Hosting</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Support</h4>
            <div className="flex flex-col gap-2">
              <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Get Help</Link>
              <a href="https://discord.gg/F8PKTvvMUZ" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Discord</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DynamixNodes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
