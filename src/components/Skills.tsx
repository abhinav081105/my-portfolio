"use client";

import { motion } from "framer-motion";
import { Layers, Server, Terminal, Database, Shield, Wrench, Code2 } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function Skills() {
  const skills = [
    { category: "Programming", icon: Terminal, items: ["Java (90%)", "Python (75%)", "C (78%)", "Assembly (58%)"] },
    { category: "Web & Backend", icon: Layers, items: ["HTML/CSS (90%)", "JavaScript (85%)", "Firebase (80%)", "NoSQL (75%)"] },
    { category: "Database", icon: Database, items: ["MongoDB (88%)", "Realtime DB (85%)", "Data Modeling (78%)"] },
    { category: "Core CS", icon: Server, items: ["Networks (75%)", "OS (76%)", "DSA (75%)", "TCP/IP (70%)"] },
    { category: "Cybersecurity", icon: Shield, items: ["Security Fundamentals (65%)", "Network Security (68%)", "Packet Analysis (78%)"] },
    { category: "Tools", icon: Wrench, items: ["Git/GitHub (85%)", "VS Code (90%)", "Packet Tracer (75%)", "Linux (78%)"] },
  ];

  return (
    <div className="col-span-1 md:col-span-3 lg:col-span-4 row-span-2 h-full">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="section-card h-full p-8"
        id="skills"
      >
        <div className="mb-8 relative z-10">
          <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            <span className="text-primary font-mono text-lg">{'//'}</span> 
            <span className="text-gradient">SYS.CAPABILITIES</span>
          </h2>
          <p className="text-muted-foreground mt-1 font-mono text-xs uppercase tracking-widest opacity-70">A diverse set of skills spanning full-stack development, database management, and core CS fundamentals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {skills.map((group, idx) => (
            <motion.div variants={itemAnim} key={idx} className="group flex flex-col gap-3 bg-secondary/30 hover:bg-secondary transition-colors p-5 rounded-xl border border-border/30 relative overflow-hidden">
              <div className="flex items-center gap-2 text-foreground font-semibold mb-2 relative z-10">
                <group.icon className="w-4 h-4 text-primary" />
                <span className="tracking-wide">{group.category}</span>
              </div>
              <div className="flex flex-col gap-3 z-10">
                {group.items.map((item, i) => {
                  const [name, percentage] = item.split(" (");
                  const percentValue = percentage.replace("%)", "");
                  return (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-mono text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        <span>{name}</span>
                        <span className="text-primary/80">{percentValue}%</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-1 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentValue}%` }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                          viewport={{ once: true }}
                          className="bg-primary h-full relative"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
