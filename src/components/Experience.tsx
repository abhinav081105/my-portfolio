"use client";

import { motion } from "framer-motion";
import { Network, Blocks, QrCode, TrendingUp, History } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      title: "Network Config & Security",
      description: "Configured complex network topologies using Cisco Packet Tracer, implementing TCP/IP, IPv6, CSMA, and ALOHA protocols.",
      icon: Network
    },
    {
      title: "Full-Stack Web Systems",
      description: "Designed and deployed multiple web-based systems for attendance tracking and roll management, handling 280+ students.",
      icon: Blocks
    },
    {
      title: "QR-Based Inventory",
      description: "Built complete inventory tracking solution with QR code integration, database management, and real-time updates.",
      icon: QrCode
    },
    {
      title: "Continuous Growth",
      description: "Actively pursuing knowledge in DevOps culture, cybersecurity, and scalable system architecture through self-study.",
      icon: TrendingUp
    }
  ];

  return (
    <div className="col-span-1 md:col-span-3 lg:col-span-4 row-span-1" id="experience">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="section-card h-full p-8"
      >
        <div className="mb-8 relative z-10">
          <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            <span className="text-primary font-mono text-base">{'//'}</span> 
            <span className="text-gradient">EXPERIENCE & INITIATIVES</span>
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">Building substantial hands-on experience through academic projects and self-driven initiatives.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100, damping: 12 }}
              className="flex flex-col gap-3 p-5 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors border border-border/20 group"
            >
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border/50 group-hover:border-primary/50 transition-colors">
                <exp.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">{exp.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
