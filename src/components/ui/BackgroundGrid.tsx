"use client";

import React from "react";
import { usePortfolioMode } from "@/context/PortfolioModeContext";

export function BackgroundGrid() {
  const { mode } = usePortfolioMode();

  return (
    <div className="fixed inset-0 z-[-1] bg-background overflow-hidden pointer-events-none transition-colors duration-500">
      {/* Dynamic Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] transition-all duration-700"
        style={{
          backgroundImage: 
            mode === "developer" ? "radial-gradient(circle at center, #ffffff 1px, transparent 1px)" :
            mode === "network" ? "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)" :
            "repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 20px)",
          backgroundSize: mode === "network" ? "40px 40px" : "24px 24px"
        }}
      />
      
      {/* Mode-specific lighting */}
      <div className={`absolute top-0 left-0 right-0 h-[600px] blur-3xl opacity-30 transition-all duration-700 ${
        mode === "developer" ? "bg-primary/20" :
        mode === "network" ? "bg-primary/10" :
        "bg-primary/15"
      }`} />

      {/* DevOps specific: "Dashboard" scanline effect */}
      {mode === "devops" && (
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }}
        />
      )}
    </div>
  );
}
