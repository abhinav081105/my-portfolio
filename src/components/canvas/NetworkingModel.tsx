"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

export default function NetworkingModel() {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Mesh>(null);

  // Generate random nodes on a sphere
  const nodes = useMemo(() => {
    const points = [];
    for (let i = 0; i < 40; i++) {
      const phi = Math.acos(-1 + (2 * i) / 40);
      const theta = Math.sqrt(40 * Math.PI) * phi;
      points.push(new THREE.Vector3().setFromSphericalCoords(2, phi, theta));
    }
    return points;
  }, []);

  // Generate random connections between nodes
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 60; i++) {
      const start = nodes[Math.floor(Math.random() * nodes.length)];
      const end = nodes[Math.floor(Math.random() * nodes.length)];
      if (start !== end) {
        lines.push([start, end]);
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { x, y } = state.mouse;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.2 + x * 0.5, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(t * 0.1) * 0.2 - y * 0.5, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Wireframe Globe */}
        <mesh ref={globeRef}>
          <icosahedronGeometry args={[2, 2]} />
          <meshStandardMaterial 
            color="#10b981" 
            wireframe 
            transparent 
            opacity={0.3} 
            emissive="#10b981" 
            emissiveIntensity={0.5} 
          />
        </mesh>

        {/* Nodes */}
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial 
              color="#34d399" 
              emissive="#34d399" 
              emissiveIntensity={2} 
            />
          </mesh>
        ))}

        {/* Pulsing Arcs */}
        {connections.map((points, i) => (
          <Line
            key={i}
            points={points}
            color="#10b981"
            lineWidth={0.5}
            transparent
            opacity={0.2}
          />
        ))}
        
        {/* Central Core */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#10b981" 
            emissiveIntensity={1} 
            transparent 
            opacity={0.5}
          />
        </mesh>
      </Float>

      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
    </group>
  );
}
