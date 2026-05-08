"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollSection({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Create a more dynamic scroll reveal
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1.2", "1 1"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
