"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

export default function DeveloperModel() {
  const laptopRef = useRef<THREE.Group>(null);
  const codeBlocksRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { x, y } = state.mouse;
    
    if (laptopRef.current) {
      // Base floating animation
      laptopRef.current.position.y = Math.sin(t * 1.5) * 0.1;
      
      // Mouse tracking rotation
      laptopRef.current.rotation.y = THREE.MathUtils.lerp(laptopRef.current.rotation.y, x * 0.5, 0.1);
      laptopRef.current.rotation.x = THREE.MathUtils.lerp(laptopRef.current.rotation.x, -y * 0.2, 0.1);
    }
    
    if (codeBlocksRef.current) {
      codeBlocksRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(t + i) * 0.002;
        child.rotation.x += 0.01 + x * 0.02;
        child.rotation.z += 0.01 + y * 0.02;
      });
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Laptop Base */}
        <group ref={laptopRef}>
          {/* Bottom */}
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[2, 0.1, 1.4]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Screen */}
          <mesh position={[0, 0.7, -0.7]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[2, 1.4, 0.05]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Glowing Screen Content */}
          <mesh position={[0, 0.7, -0.67]} rotation={[-0.2, 0, 0]}>
            <planeGeometry args={[1.8, 1.2]} />
            <meshStandardMaterial 
              color="#f59e0b" 
              emissive="#f59e0b" 
              emissiveIntensity={2} 
              transparent 
              opacity={0.8}
            />
          </mesh>
          {/* Neon Accent */}
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[2.1, 0.02, 1.5]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} />
          </mesh>
        </group>
      </Float>

      {/* Floating Code Blocks */}
      <group ref={codeBlocksRef}>
        {[...Array(6)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 2
            ]}
          >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#f59e0b" : "#d97706"} 
              emissive={i % 2 === 0 ? "#f59e0b" : "#d97706"} 
              emissiveIntensity={1.5} 
            />
          </mesh>
        ))}
      </group>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
    </group>
  );
}
