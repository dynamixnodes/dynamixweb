const lines = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  isH: i < 6,
  top: `${10 + (i % 6) * 16}%`,
  left: i < 6 ? `${Math.random() * 30}%` : `${20 + (i % 6) * 14}%`,
  width: i < 6 ? `${30 + Math.random() * 40}%` : undefined,
  height: i >= 6 ? `${30 + Math.random() * 40}%` : undefined,
  delay: `${i * 0.6}s`,
}));

const nodes = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  top: `${10 + Math.random() * 80}%`,
  left: `${5 + Math.random() * 90}%`,
  delay: `${Math.random() * 3}s`,
}));

const CircuitBackground = () => (
  <div className="circuit-bg">
    {/* SVG circuit traces */}
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 8 }).map((_, i) => {
        const y1 = 50 + i * 80;
        const x1 = Math.random() * 200;
        return (
          <path
            key={`p${i}`}
            d={`M ${x1} ${y1} L ${x1 + 120} ${y1} L ${x1 + 120} ${y1 + 60} L ${x1 + 240} ${y1 + 60}`}
            fill="none"
            stroke="hsl(20 90% 42%)"
            strokeWidth="1"
            strokeDasharray="8 4"
            opacity="0.5"
            style={{
              animation: `circuit-trace 3s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        );
      })}
    </svg>

    {/* Animated lines */}
    {lines.map((l) => (
      <div
        key={l.id}
        className={`circuit-line ${l.isH ? "circuit-h" : "circuit-v"}`}
        style={{
          top: l.top,
          left: l.left,
          width: l.width,
          height: l.height,
          animationDelay: l.delay,
        }}
      />
    ))}

    {/* Glowing nodes */}
    {nodes.map((n) => (
      <div
        key={n.id}
        className="circuit-node"
        style={{ top: n.top, left: n.left, animationDelay: n.delay }}
      />
    ))}
  </div>
);

export default CircuitBackground;
