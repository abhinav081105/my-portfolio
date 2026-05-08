"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { motion, useScroll } from "framer-motion";
import ScrollSection from "@/components/ui/ScrollSection";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-primary/30">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-100"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-32 pb-32">
        
        {/* Hero Section takes full height */}
        <section className="min-h-screen flex flex-col justify-center pt-24">
          <Hero />
        </section>

        {/* Narrative Sections */}
        <ScrollSection>
          <About />
        </ScrollSection>

        <ScrollSection>
          <Experience />
        </ScrollSection>

        <ScrollSection>
          <Projects />
        </ScrollSection>

        <ScrollSection>
          <Services />
        </ScrollSection>

        <ScrollSection>
          <Skills />
        </ScrollSection>

        <ScrollSection>
          <Contact />
        </ScrollSection>

      </div>
    </main>
  );
}
