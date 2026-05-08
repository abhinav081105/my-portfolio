"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { usePortfolioMode } from "@/context/PortfolioModeContext";
import DeveloperModel from "./DeveloperModel";
import DevOpsModel from "./DevOpsModel";
import NetworkingModel from "./NetworkingModel";
import * as THREE from "three";

function SceneContent() {
  const { mode } = usePortfolioMode();
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      scrollRef.current = scrolled;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the whole group based on scroll
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, scrollRef.current * Math.PI * 2, 0.05);
      // Move up/down slightly based on scroll
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollRef.current * 2 - 1, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        {mode === "developer" && <DeveloperModel />}
        {mode === "devops" && <DevOpsModel />}
        {mode === "network" && <NetworkingModel />}
        
        <Environment preset="city" />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={15}
          blur={2.5}
          far={4.5}
        />
      </Suspense>
    </group>
  );
}

export default function Scene() {
  const { mode } = usePortfolioMode();

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-1000">
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <SceneContent />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
      
      {/* Background Glow */}
      <div className={`absolute inset-0 -z-10 blur-[150px] opacity-10 transition-colors duration-1000 ${
        mode === "developer" ? "bg-amber-500" : 
        mode === "devops" ? "bg-cyan-500" : 
        "bg-emerald-500"
      }`} />
    </div>
  );
}
