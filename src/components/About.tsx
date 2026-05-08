"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="col-span-1 md:col-span-3 lg:col-span-2 row-span-1"
      id="about"
    >
      <div className="section-card h-full p-8 flex flex-col justify-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-all duration-500 group-hover:bg-primary/10"></div>
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-2.5 bg-primary/10 text-primary rounded-lg border border-primary/20">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <span className="text-primary font-mono text-base">{'//'}</span> 
            <span className="text-gradient">ABOUT_ME</span>
          </h2>
        </div>

        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed relative z-10">
          <p>
            I'm a final-year Computer Science Engineering student at <strong className="text-foreground font-medium">Lendi Institute of Engineering & Technology</strong>, passionate about creating real-world software solutions that solve practical problems for educational institutions.
          </p>
          <p>
            My focus lies in <strong className="text-foreground font-medium">full-stack web development</strong>, where I design and build systems like attendance portals, roll management platforms, and inventory tracking solutions. I'm deeply interested in cybersecurity fundamentals, DevOps culture, and building scalable systems.
          </p>
          <p>
            I believe in learning by doing—my projects reflect hands-on experience with modern technologies and a commitment to clean, maintainable code architecture.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
