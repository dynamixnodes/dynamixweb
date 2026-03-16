import { useEffect, useRef } from "react";

const CircuitBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate circuit paths that look like actual PCB/processor traces
    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    interface TraceNode {
      x: number;
      y: number;
    }

    interface Trace {
      nodes: TraceNode[];
      speed: number;
      progress: number;
      width: number;
    }

    const generateTrace = (): Trace => {
      const nodes: TraceNode[] = [];
      const startX = Math.random() * w();
      const startY = Math.random() * h();
      nodes.push({ x: startX, y: startY });

      const segments = 4 + Math.floor(Math.random() * 6);
      let cx = startX;
      let cy = startY;
      let horizontal = Math.random() > 0.5;

      for (let i = 0; i < segments; i++) {
        if (horizontal) {
          cx += (Math.random() - 0.5) * 200 + (Math.random() > 0.5 ? 80 : -80);
        } else {
          cy += (Math.random() - 0.5) * 200 + (Math.random() > 0.5 ? 80 : -80);
        }
        cx = Math.max(10, Math.min(w() - 10, cx));
        cy = Math.max(10, Math.min(h() - 10, cy));
        nodes.push({ x: cx, y: cy });
        horizontal = !horizontal;
      }

      return {
        nodes,
        speed: 0.3 + Math.random() * 0.6,
        progress: Math.random(),
        width: 1 + Math.random() * 1.5,
      };
    };

    const traces: Trace[] = Array.from({ length: 18 }, generateTrace);

    interface Chip {
      x: number;
      y: number;
      w: number;
      h: number;
      pins: number;
      pulse: number;
    }

    // Generate "chip" rectangles
    const chips: Chip[] = Array.from({ length: 6 }, () => ({
      x: 50 + Math.random() * (w() - 100),
      y: 50 + Math.random() * (h() - 100),
      w: 30 + Math.random() * 40,
      h: 20 + Math.random() * 30,
      pins: 3 + Math.floor(Math.random() * 4),
      pulse: Math.random() * Math.PI * 2,
    }));

    // Data pulses traveling along traces
    interface Pulse {
      traceIndex: number;
      pos: number;
      speed: number;
      size: number;
    }

    const pulses: Pulse[] = Array.from({ length: 24 }, () => ({
      traceIndex: Math.floor(Math.random() * traces.length),
      pos: Math.random(),
      speed: 0.002 + Math.random() * 0.006,
      size: 2 + Math.random() * 3,
    }));

    const color = "hsl(20, 90%, 48%)";
    const colorDim = "hsla(20, 90%, 48%, 0.3)";
    const colorGlow = "hsla(20, 90%, 55%, 0.6)";
    const colorBright = "hsla(20, 90%, 60%, 0.9)";

    const getPointOnTrace = (trace: Trace, t: number) => {
      const totalSegments = trace.nodes.length - 1;
      const segFloat = t * totalSegments;
      const segIndex = Math.min(Math.floor(segFloat), totalSegments - 1);
      const segT = segFloat - segIndex;
      const a = trace.nodes[segIndex];
      const b = trace.nodes[segIndex + 1];
      return {
        x: a.x + (b.x - a.x) * segT,
        y: a.y + (b.y - a.y) * segT,
      };
    };

    const draw = () => {
      time += 0.016;
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);

      // Draw traces (right-angle PCB-style lines)
      traces.forEach((trace) => {
        ctx.beginPath();
        ctx.strokeStyle = colorDim;
        ctx.lineWidth = trace.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(trace.nodes[0].x, trace.nodes[0].y);
        for (let i = 1; i < trace.nodes.length; i++) {
          ctx.lineTo(trace.nodes[i].x, trace.nodes[i].y);
        }
        ctx.stroke();

        // Draw junction nodes
        trace.nodes.forEach((node, idx) => {
          if (idx === 0 || idx === trace.nodes.length - 1) {
            const pulse = 0.5 + 0.5 * Math.sin(time * 2 + idx);
            ctx.beginPath();
            ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(20, 90%, 50%, ${0.3 + pulse * 0.4})`;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = colorDim;
            ctx.fill();
          }
        });
      });

      // Draw chips
      chips.forEach((chip) => {
        const pulse = 0.4 + 0.3 * Math.sin(time * 1.5 + chip.pulse);
        ctx.strokeStyle = `hsla(20, 90%, 48%, ${pulse})`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(chip.x, chip.y, chip.w, chip.h);

        // Pins
        const pinSpacingH = chip.w / (chip.pins + 1);
        const pinSpacingV = chip.h / (chip.pins + 1);
        for (let p = 1; p <= chip.pins; p++) {
          // Top pins
          ctx.beginPath();
          ctx.moveTo(chip.x + p * pinSpacingH, chip.y);
          ctx.lineTo(chip.x + p * pinSpacingH, chip.y - 8);
          ctx.strokeStyle = colorDim;
          ctx.lineWidth = 1;
          ctx.stroke();
          // Bottom pins
          ctx.beginPath();
          ctx.moveTo(chip.x + p * pinSpacingH, chip.y + chip.h);
          ctx.lineTo(chip.x + p * pinSpacingH, chip.y + chip.h + 8);
          ctx.stroke();
        }
        for (let p = 1; p <= chip.pins; p++) {
          // Left pins
          ctx.beginPath();
          ctx.moveTo(chip.x, chip.y + p * pinSpacingV);
          ctx.lineTo(chip.x - 8, chip.y + p * pinSpacingV);
          ctx.stroke();
          // Right pins
          ctx.beginPath();
          ctx.moveTo(chip.x + chip.w, chip.y + p * pinSpacingV);
          ctx.lineTo(chip.x + chip.w + 8, chip.y + p * pinSpacingV);
          ctx.stroke();
        }

        // Inner glow
        ctx.fillStyle = `hsla(20, 90%, 48%, ${pulse * 0.1})`;
        ctx.fillRect(chip.x, chip.y, chip.w, chip.h);
      });

      // Draw data pulses
      pulses.forEach((pulse) => {
        pulse.pos += pulse.speed;
        if (pulse.pos > 1) pulse.pos = 0;

        const trace = traces[pulse.traceIndex];
        const pt = getPointOnTrace(trace, pulse.pos);

        // Glow
        const gradient = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pulse.size * 4);
        gradient.addColorStop(0, colorBright);
        gradient.addColorStop(0.5, colorGlow);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pulse.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pulse.size, 0, Math.PI * 2);
        ctx.fillStyle = colorBright;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-20"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default CircuitBackground;
