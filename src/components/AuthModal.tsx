import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with auth backend
    console.log(mode, { email, password, name });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/60 backdrop-blur-sm" onClick={() => onOpenChange(false)}>
      <div
        className="relative w-full max-w-md mx-4 p-8 rounded-2xl bg-card border border-border animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-1 text-center">
          {mode === "register" ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {mode === "register" ? "Join RydenByte today" : "Sign in to your account"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {mode === "register" ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          {mode === "register" ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "register" ? "login" : "register")}
            className="text-primary hover:underline font-medium"
          >
            {mode === "register" ? "Sign in" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
