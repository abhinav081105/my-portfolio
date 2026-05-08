"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, input, textarea, [role='button']")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      transition: { type: "spring", mass: 0.1, stiffness: 150, damping: 15 }
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 1.5,
      backgroundColor: "rgba(100, 255, 218, 0.1)", // Primary color with low opacity
      border: "1px solid rgba(100, 255, 218, 0.5)",
      transition: { type: "spring", mass: 0.1, stiffness: 150, damping: 15 }
    }
  };

  const dotVariants: Variants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      transition: { type: "spring", mass: 0.01, stiffness: 800, damping: 20 }
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 0,
      transition: { type: "spring", mass: 0.01, stiffness: 800, damping: 20 }
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-9999 mix-blend-difference hidden md:block"
        variants={variants}
        animate={isHovered ? "hover" : "default"}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-10000 mix-blend-difference hidden md:block"
        variants={dotVariants}
        animate={isHovered ? "hover" : "default"}
      />
    </>
  );
}
