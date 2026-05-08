"use client";

import { motion } from "framer-motion";
import { Layers, Server, Terminal, Database, Shield, Wrench, Code2 } from "lucide-react";

import { usePortfolioMode } from "../context/PortfolioModeContext";

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
  const { mode } = usePortfolioMode();

  const skillsData = {
    developer: [
      { category: "Programming", icon: Terminal, items: ["Java (90%)", "Python (75%)", "C/C++ (78%)", "TypeScript (80%)"] },
      { category: "Web & Backend", icon: Layers, items: ["HTML/CSS (90%)", "React/Next.js (85%)", "Node.js (80%)", "REST APIs (85%)"] },
      { category: "Database", icon: Database, items: ["MongoDB (88%)", "PostgreSQL (80%)", "Firebase (85%)"] },
      { category: "Core CS", icon: Server, items: ["DSA (75%)", "OOP (85%)", "System Design (70%)"] },
      { category: "Version Control", icon: Shield, items: ["Git (90%)", "GitHub (85%)", "GitLab (70%)"] },
      { category: "Tools", icon: Wrench, items: ["VS Code (90%)", "Postman (85%)", "Figma (75%)"] },
    ],
    devops: [
      { category: "Containerization", icon: Layers, items: ["Docker (85%)", "Kubernetes (70%)", "Docker Compose (80%)"] },
      { category: "CI/CD", icon: Server, items: ["GitHub Actions (85%)", "Jenkins (75%)", "GitLab CI (70%)"] },
      { category: "Infrastructure", icon: Database, items: ["AWS (75%)", "Terraform (70%)", "Linux (85%)"] },
      { category: "Scripting", icon: Terminal, items: ["Bash (80%)", "Python (75%)", "PowerShell (70%)"] },
      { category: "Monitoring", icon: Shield, items: ["Prometheus (70%)", "Grafana (75%)", "ELK Stack (65%)"] },
      { category: "Tools", icon: Wrench, items: ["Ansible (65%)", "Nginx (80%)", "Vim (75%)"] },
    ],
    network: [
      { category: "Routing & Switching", icon: Server, items: ["OSPF/BGP (80%)", "VLANs (85%)", "Spanning Tree (75%)"] },
      { category: "Protocols", icon: Layers, items: ["TCP/IP (90%)", "DNS/DHCP (85%)", "HTTP/HTTPS (85%)"] },
      { category: "Security", icon: Shield, items: ["Firewalls (80%)", "VPN/IPsec (75%)", "Access Control (85%)"] },
      { category: "Analysis", icon: Database, items: ["Wireshark (85%)", "Packet Analysis (80%)", "Nmap (85%)"] },
      { category: "Administration", icon: Terminal, items: ["Linux Server (85%)", "Windows Server (75%)", "Active Directory (70%)"] },
      { category: "Tools", icon: Wrench, items: ["Packet Tracer (90%)", "GNS3 (80%)", "Putty/SSH (95%)"] },
    ]
  };

  const descriptions = {
    developer: "A diverse set of skills spanning full-stack development, database management, and core CS fundamentals.",
    devops: "A robust set of skills focusing on automation, cloud infrastructure, CI/CD pipelines, and server management.",
    network: "A specialized set of skills covering network architecture, routing protocols, packet analysis, and enterprise security."
  };

  const skills = skillsData[mode];
  const description = descriptions[mode];

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
          <p className="text-muted-foreground mt-1 font-mono text-xs uppercase tracking-widest opacity-70">{description}</p>
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
