"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", msg: data.message });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", msg: data.error || "Failed to send" });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Network error" });
    }
  };

  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-2 row-span-1 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="section-card h-full p-8 flex flex-col justify-between bg-card text-foreground"
        id="contact"
      >
        <div className="relative z-10 mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <span className="text-primary font-mono text-lg">{'//'} </span>
            <span className="text-gradient">GET_IN_TOUCH</span>
          </h2>
          <p className="text-muted-foreground mb-4 max-w-md font-light text-sm">
            Feel free to drop a message. I’ll get back to you soon.
          </p>
        </div>

        {/* Direct contact links */}
        <div className="space-y-4 relative z-10 mb-6">
          <a
            href="mailto:mantripragadaabhinav@gmail.com"
            className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary transition-colors border border-border/30 group/link"
          >
            <div className="p-3 bg-background rounded-lg group-hover/link:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-0.5">
                Primary_Protocol
              </p>
              <p className="text-sm font-medium">mantripragadaabhinav@gmail.com</p>
            </div>
          </a>
          <a
            href="tel:+918185923808"
            className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary transition-colors border border-border/30 group/link"
          >
            <div className="p-3 bg-background rounded-lg group-hover/link:text-primary transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-0.5">
                Voice_Channel
              </p>
              <p className="text-sm font-medium">+91 8185923808</p>
            </div>
          </a>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 bg-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 bg-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="p-3 bg-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 px-6 py-3 rounded-full font-medium flex items-center justify-center"
          >
            SEND MESSAGE
          </button>
        </form>
        {status && (
          <p className={`mt-4 text-sm ${status.type === "success" ? "text-green-500" : "text-red-500"}`}>
            {status.msg}
          </p>
        )}
      </motion.div>
    </div>
  );
}
