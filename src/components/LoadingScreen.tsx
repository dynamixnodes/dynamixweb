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

  // Generate circuit line positions
  const circuitLines = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    isH: i < 4,
    top: `${15 + (i % 4) * 22}%`,
    left: i < 4 ? `${Math.random() * 20}%` : `${20 + (i % 4) * 18}%`,
    width: i < 4 ? `${40 + Math.random() * 30}%` : undefined,
    height: i >= 4 ? `${40 + Math.random() * 30}%` : undefined,
    delay: `${i * 0.4}s`,
  }));

  const nodes = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    top: `${15 + Math.random() * 70}%`,
    left: `${10 + Math.random() * 80}%`,
    delay: `${Math.random() * 2}s`,
  }));

  return (
    <div
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-6 transition-opacity duration-500 overflow-hidden"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      {/* Circuit background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 6 }).map((_, i) => {
            const y1 = 80 + i * 100;
            const x1 = 50 + Math.random() * 150;
            return (
              <path
                key={`lp${i}`}
                d={`M ${x1} ${y1} L ${x1 + 100} ${y1} L ${x1 + 100} ${y1 + 50} L ${x1 + 200} ${y1 + 50}`}
                fill="none"
                stroke="hsl(25 95% 50%)"
                strokeWidth="1"
                strokeDasharray="8 4"
                opacity="0.6"
                style={{ animation: `circuit-trace 3s linear infinite`, animationDelay: `${i * 0.4}s` }}
              />
            );
          })}
        </svg>

        {circuitLines.map((l) => (
          <div
            key={l.id}
            className={`circuit-line ${l.isH ? "circuit-h" : "circuit-v"}`}
            style={{ top: l.top, left: l.left, width: l.width, height: l.height, animationDelay: l.delay }}
          />
        ))}
        {nodes.map((n) => (
          <div key={n.id} className="circuit-node" style={{ top: n.top, left: n.left, animationDelay: n.delay }} />
        ))}
      </div>

      <div className="absolute w-64 h-64 rounded-full opacity-20 blur-[100px] gradient-primary" />

      <img src={logo} alt="RydenByte" className="w-16 h-16 rounded-xl relative z-10" />
      <h2 className="text-2xl font-bold relative z-10">
        <span className="gradient-text">Ryden</span>Byte
      </h2>

      {/* Circuit-styled loading bar */}
      <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden relative z-10">
        <div
          className="h-full rounded-full transition-all duration-100 ease-out gradient-primary relative"
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, hsl(25 95% 55% / 0.5) 4px, hsl(25 95% 55% / 0.5) 8px)`,
              backgroundSize: '16px 100%',
              animation: 'loading-gradient 1s linear infinite',
            }}
          />
        </div>
      </div>
      <p className="text-sm text-muted-foreground relative z-10">Loading... {Math.min(Math.floor(progress), 100)}%</p>
    </div>
  );
};

export default LoadingScreen;
