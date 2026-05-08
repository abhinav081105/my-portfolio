"use client";

import { motion } from "framer-motion";
import { usePortfolioMode, PortfolioMode } from "@/context/PortfolioModeContext";
import { Terminal, Database, Code2 } from "lucide-react";

export default function ModeSwitcher() {
  const { mode, setMode } = usePortfolioMode();

  const modes: { id: PortfolioMode; label: string; icon: any }[] = [
    { id: "developer", label: "DEV", icon: Code2 },
    { id: "network", label: "NET", icon: Terminal },
    { id: "devops", label: "OPS", icon: Database },
  ];

  return (
    <div className="flex items-center bg-secondary/50 p-1 rounded-full border border-border/50">
      {modes.map((m) => {
        const Icon = m.icon;
        const isActive = mode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`relative px-3 py-1.5 rounded-full flex items-center gap-2 transition-all duration-300 ${
              isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-mode"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? "animate-pulse" : ""}`} />
            <span className="text-[10px] font-pixel relative z-10 hidden sm:block">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}
