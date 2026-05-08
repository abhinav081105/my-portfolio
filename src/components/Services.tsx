"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout, Lightbulb } from "lucide-react";

import { usePortfolioMode } from "../context/PortfolioModeContext";

export default function Services() {
  const { mode } = usePortfolioMode();

  const servicesData = {
    developer: [
      { title: "Full-Stack Web Dev", description: "End-to-end web application development using modern technologies. From responsive frontends to robust backend systems.", icon: Layout },
      { title: "Backend Development", description: "Scalable server-side solutions with Node.js and SQL/NoSQL databases. API development and cloud integration.", icon: Code2 },
      { title: "Database Management", description: "Database design, management, and optimization. Data modeling and admin-level operations.", icon: Database },
      { title: "Academic Mentorship", description: "Helping students build practical web projects for academic requirements. Mentoring and code review.", icon: Lightbulb }
    ],
    devops: [
      { title: "CI/CD Pipeline Setup", description: "Designing and implementing automated continuous integration and deployment pipelines using GitHub Actions and Jenkins.", icon: Layout },
      { title: "Cloud Infrastructure", description: "Provisioning and managing scalable cloud infrastructure using Infrastructure as Code (Terraform) and AWS.", icon: Code2 },
      { title: "Containerization", description: "Dockerizing applications and managing container orchestration platforms like Kubernetes.", icon: Database },
      { title: "System Monitoring", description: "Setting up robust monitoring, logging, and alerting systems using Prometheus and Grafana.", icon: Lightbulb }
    ],
    network: [
      { title: "Network Design", description: "Designing secure, scalable, and highly available enterprise network architectures.", icon: Layout },
      { title: "Security & Firewalls", description: "Implementing robust firewall policies, VPNs, and access control mechanisms to secure infrastructure.", icon: Code2 },
      { title: "Protocol Analysis", description: "Deep packet inspection, network troubleshooting, and performance optimization using Wireshark.", icon: Database },
      { title: "Server Administration", description: "Managing and configuring Linux/Windows servers, Active Directory, and domain services.", icon: Lightbulb }
    ]
  };

  const descriptions = {
    developer: "Practical, scalable, and student-focused software solutions.",
    devops: "Automated, scalable, and reliable infrastructure solutions.",
    network: "Secure, performant, and highly available network solutions."
  };

  const services = servicesData[mode];
  const description = descriptions[mode];

  return (
    <div className="col-span-1 md:col-span-3 lg:col-span-2 row-span-1" id="services">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="section-card h-full p-8"
      >
        <div className="mb-6 relative z-10">
          <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <span className="text-primary font-mono text-base">{'//'}</span> 
            <span className="text-gradient">SERVICES</span>
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-colors group"
            >
              <service.icon className="w-5 h-5 text-primary mb-3 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="font-semibold text-sm text-foreground mb-1.5">{service.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
