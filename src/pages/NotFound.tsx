import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircuitBackground from "@/components/CircuitBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="relative flex-1 flex items-center justify-center px-6 overflow-hidden">
        <CircuitBackground />
        <div className="relative z-10 text-center max-w-xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-primary/30 mb-8 glow-effect">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium gradient-text">Page Not Found</span>
          </div>

          {/* 404 number */}
          <h1 className="text-8xl md:text-9xl font-bold mb-4 leading-none">
            <span className="gradient-text">4</span>
            <span className="text-foreground">0</span>
            <span className="gradient-text">4</span>
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            Lost in the Circuit
          </p>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Home className="w-4 h-4" /> Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium bg-card border border-border text-foreground hover:border-primary/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NotFound;
