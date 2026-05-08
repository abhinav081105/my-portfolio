"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type PortfolioMode = "developer" | "network" | "devops";

interface PortfolioModeContextType {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
}

const PortfolioModeContext = createContext<PortfolioModeContextType | undefined>(undefined);

export function PortfolioModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>("developer");

  const setMode = (newMode: PortfolioMode) => {
    setModeState(newMode);
    document.documentElement.setAttribute("data-portfolio-mode", newMode);
  };

  useEffect(() => {
    // Set initial attribute
    document.documentElement.setAttribute("data-portfolio-mode", mode);
  }, []);

  return (
    <PortfolioModeContext.Provider value={{ mode, setMode }}>
      {children}
    </PortfolioModeContext.Provider>
  );
}

export function usePortfolioMode() {
  const context = useContext(PortfolioModeContext);
  if (context === undefined) {
    throw new Error("usePortfolioMode must be used within a PortfolioModeProvider");
  }
  return context;
}
