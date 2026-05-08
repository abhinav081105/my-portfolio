"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePortfolioMode } from "@/context/PortfolioModeContext";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const nameVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 80, damping: 12 } }
};

const nameLetters = "ABHINAV_".split("");

export default function Hero() {
  const { mode } = usePortfolioMode();

  const titles = {
    developer: "FULL-STACK ENGINEER",
    network: "NETWORK INFRASTRUCTURE ENGINEER",
    devops: "CLOUD & DEVOPS ENGINEER"
  };

  const statusText = {
    developer: "SYS.STATUS: ONLINE",
    network: "NODE.STATUS: ACTIVE",
    devops: "PIPELINE.STATUS: STABLE"
  };

  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const yImage = useTransform(scrollY, [0, 500], [0, 250]);
  const opacityImage = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="w-full relative min-h-[80vh] flex items-center">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full relative z-10"
      >
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-16 w-full">
          <motion.div 
            className="flex flex-col justify-center flex-1 w-full"
            style={{ y: yText, opacity: opacityText }}
          >
            <motion.div variants={item} className="flex items-center gap-3 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-xs font-mono tracking-[0.2em] text-primary">{statusText[mode]}</span>
            </motion.div>
            
            <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter text-foreground mb-6 leading-[0.9] perspective-1000">
              <span className="block text-3xl md:text-5xl lg:text-6xl text-muted-foreground mb-4 font-bold tracking-tight">HI, I'M</span>
              <div className="flex overflow-hidden pb-4">
                {nameLetters.map((letter, index) => (
                  <motion.span 
                    key={index} 
                    variants={nameVariants}
                    className="inline-block text-gradient hover:text-primary transition-colors duration-300 cursor-default"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.h1>
            
            <motion.h2 variants={item} className="text-xl md:text-3xl text-muted-foreground font-mono mb-8 border-l-4 border-primary pl-6 py-1 tracking-tight">
              &gt; {titles[mode]}
            </motion.h2>
            
            <motion.p variants={item} className="text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed max-w-2xl font-light">
              {mode === "developer" && "Building practical web applications and software solutions. Passionate about creating systems that make a real difference through clean, maintainable architecture."}
              {mode === "network" && "Architecting secure, low-latency network environments and boundary-enforced synchronization systems. Focused on connectivity and real-time data integrity."}
              {mode === "devops" && "Streamlining software delivery pipelines and automating institutional-scale workflows. Expert in reducing system turnaround times and operational overhead."}
            </motion.p>
            
            <motion.div variants={item} className="flex flex-wrap items-center gap-6 mt-auto">
              <a href="#projects" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 px-8 py-4 rounded-full font-medium flex items-center gap-2 group text-lg">
                {mode === "network" ? "EXPLORE_NODES" : mode === "devops" ? "MONITOR_PIPELINES" : "INITIATE_PROJECTS"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="#contact" className="bg-transparent border border-border hover:bg-secondary text-foreground transition-colors px-8 py-4 rounded-full font-medium flex items-center gap-2 text-lg">
                CONNECT
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={item} 
            className="flex items-center justify-center lg:justify-end flex-1"
            style={{ y: yImage, opacity: opacityImage }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 hover:border-primary/50 transition-colors duration-500 shadow-2xl group bg-card/50 backdrop-blur-sm">
              <Image 
                src="/assets/images/profile.jpg" 
                alt="Abhinav's Profile" 
                fill
                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                sizes="(max-width: 768px) 256px, 384px"
                priority
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}


