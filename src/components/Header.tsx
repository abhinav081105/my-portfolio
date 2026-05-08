"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { User, Code2, Briefcase, Mail } from "lucide-react";
import ModeSwitcher from "./ModeSwitcher";

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = [
    { name: "About", icon: User, href: "#about" },
    { name: "Skills", icon: Code2, href: "#skills" },
    { name: "Projects", icon: Briefcase, href: "#projects" },
    { name: "Contact", icon: Mail, href: "#contact" },
  ];

  return (
    <motion.header 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
    >
      <nav className="section-card px-4 md:px-6 py-3 flex items-center justify-between backdrop-blur-md bg-card/80 border border-border/50">
        <div className="font-pixel text-xs tracking-tight text-primary flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="hidden sm:inline">ABHINAV_SYS</span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <ul className="flex items-center gap-4 md:gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href} 
                  className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <item.icon className="w-3.5 h-3.5 hidden md:block" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-border/50 hidden sm:block" />

          <ModeSwitcher />
        </div>
      </nav>
    </motion.header>
  );
}
