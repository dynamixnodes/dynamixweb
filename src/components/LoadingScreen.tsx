import { useState, useEffect } from "react";
import logo from "@/assets/dynamixnodes-logo.png";

const LoadingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-6 transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      {/* Sparkles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Ambient glow */}
      <div className="absolute w-64 h-64 rounded-full opacity-20 blur-[100px] gradient-primary" />

      <img src={logo} alt="DynamixNodes" className="w-16 h-16 rounded-xl" />
      <h2 className="text-2xl font-bold">
        <span className="gradient-text">Dynamix</span> Nodes
      </h2>

      {/* Loading bar */}
      <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100 ease-out"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg, hsl(253 100% 66%), hsl(255 100% 63%), hsl(30 100% 60%))",
            backgroundSize: "200% 100%",
            animation: "loading-gradient 1.5s linear infinite",
          }}
        />
      </div>
      <p className="text-sm text-muted-foreground">Loading... {Math.min(Math.floor(progress), 100)}%</p>
    </div>
  );
};

export default LoadingScreen;
