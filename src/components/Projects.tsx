"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, Briefcase } from "lucide-react";
import { usePortfolioMode } from "@/context/PortfolioModeContext";

export default function Projects() {
  const { mode } = usePortfolioMode();

  const projectData = {
    developer: [
      {
        title: "Smart Attendance System — Geo-Fencing & Face Recognition",
        year: "2025 – 2026",
        status: "Completed",
        description: "Engineered an AI-powered attendance system integrating real-time face recognition (OpenCV) and GPS geo-fencing, ensuring only physically-present students within campus boundaries can mark attendance.",
        tech: ["Python", "OpenCV", "Firebase", "JavaScript"],
        link: "https://github.com/abhinav081105"
      },
      {
        title: "Leave Management System",
        year: "2025",
        status: "Completed",
        description: "Developed a full-stack leave management portal enabling students to apply, track, and manage leave requests digitally, eliminating paper-based processes entirely.",
        tech: ["JavaScript", "Firebase", "HTML5", "CSS3"],
        link: "https://github.com/abhinav081105"
      },
      {
        title: "QR-Based Inventory Tracker",
        year: "2025",
        status: "Completed",
        description: "Built a real-time inventory management system via QR Code API integration, achieving sub-second scan-to-database-update latency across multiple storage locations.",
        tech: ["JavaScript", "QR Code API", "Firebase"],
        link: "https://github.com/abhinav081105"
      }
    ],
    network: [
      {
        title: "Geo-Fencing & Real-Time Sync Engine",
        year: "2025 – 2026",
        status: "Completed",
        description: "Implemented a dual-layer verification system using Geo-Fencing APIs to enforce strict campus network boundaries. Optimized Firebase Realtime Database for sub-second sync latency across 280+ concurrent endpoints.",
        tech: ["GPS APIs", "Socket.io", "Firebase", "Python"],
        link: "https://github.com/abhinav081105"
      },
      {
        title: "Multi-Level Network Authorization Workflow",
        year: "2025",
        status: "Completed",
        description: "Designed a digital authorization portal with real-time propagation across Student, Faculty, and HOD nodes, reducing administrative latency by 65%.",
        tech: ["TCP/IP Concepts", "Firebase", "Auth Protocols"],
        link: "https://github.com/abhinav081105"
      },
      {
        title: "QR-Sync Low-Latency Data Propagation",
        year: "2025",
        status: "Completed",
        description: "Engineered a QR-based data entry system focusing on sub-second propagation between scanning nodes and centralized NoSQL storage, eliminating packet loss in inventory state.",
        tech: ["Real-time Sync", "QR API", "Database Performance"],
        link: "https://github.com/abhinav081105"
      }
    ],
    devops: [
      {
        title: "AI-Powered Attendance Pipeline Automation",
        year: "2025 – 2026",
        status: "Completed",
        description: "Automated institutional attendance workflows, reducing proxy incidents and increasing data accuracy by 90% through dual-layer verification pipelines.",
        tech: ["Automation", "Workflow Orchestration", "Firebase"],
        link: "https://github.com/abhinav081105"
      },
      {
        title: "Digital Leave Approval Infrastructure",
        year: "2025",
        status: "Completed",
        description: "Modernized legacy paper processes into a multi-level approval pipeline (Student → Faculty → HOD), reducing overall system turnaround time by 65%.",
        tech: ["CI/CD for Workflows", "Analytics", "Firebase"],
        link: "https://github.com/abhinav081105"
      },
      {
        title: "QR-Driven Inventory State Management",
        year: "2025",
        status: "Completed",
        description: "Streamlined inventory audits by 50% through QR-based automated state updates and real-time synchronization between disparate storage locations.",
        tech: ["Monitoring", "Audit Automation", "NoSQL Management"],
        link: "https://github.com/abhinav081105"
      }
    ]
  };

  const currentProjects = projectData[mode];

  return (
    <div className="col-span-1 md:col-span-3 lg:col-span-2 row-span-2 w-full" id="projects">
      <div className="section-card p-8 h-full">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            <span className="text-primary font-mono text-lg">{'//'}</span> 
            <span className="text-gradient">
              {mode === "developer" ? "PROJECT_ROADMAP" : mode === "network" ? "NETWORK_INFRASTRUCTURE" : "DEPLOYMENT_PIPELINES"}
            </span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            {mode === "developer" ? "Tracking the development journey of major systems and applications." : 
             mode === "network" ? "Mapping low-latency synchronization and boundary enforcement protocols." : 
             "Optimizing workflows and automating institutional-scale pipelines."}
          </p>
        </div>

        <div className="relative ml-3 md:ml-4 pb-4">
          <div className="absolute top-0 bottom-0 left-[2px] w-[2px] bg-border/30 z-0"></div>
          
          <motion.div 
            key={mode} // Re-animate on mode change
            className="absolute top-0 bottom-0 left-[2px] w-[2px] bg-primary z-0 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="space-y-12 relative z-10">
            {currentProjects.map((project, idx) => (
              <motion.div 
                key={`${mode}-${idx}`}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, type: "spring", bounce: 0.4 }}
                className="relative pl-8 md:pl-10"
              >
                <div className="absolute left-[-11px] md:left-[-12px] top-1 bg-background p-1">
                  <CheckCircle2 className="w-4 h-4 text-primary bg-background" />
                </div>

                <div className="flex flex-col gap-1 mb-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-bold text-foreground font-pixel">{project.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                      {project.status}
                    </span>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">{project.year}</span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-2xl">
                  {project.description}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono bg-secondary text-secondary-foreground px-2 py-1 rounded-md border border-border/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {mode === "network" ? "INSPECT_NODE" : mode === "devops" ? "VIEW_PIPELINE" : "VIEW_CODE"} <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
