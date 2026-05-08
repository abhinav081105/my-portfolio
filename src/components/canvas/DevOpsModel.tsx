"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function DevOpsModel() {
  const armBaseRef = useRef<THREE.Group>(null);
  const midJointRef = useRef<THREE.Group>(null);
  const topJointRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { x, y } = state.mouse;

    if (armBaseRef.current) {
      armBaseRef.current.rotation.y = THREE.MathUtils.lerp(armBaseRef.current.rotation.y, t * 0.5 + x * 2, 0.1);
    }
    if (midJointRef.current) {
      midJointRef.current.rotation.z = THREE.MathUtils.lerp(midJointRef.current.rotation.z, Math.sin(t) * 0.5 + y * 0.5, 0.1);
    }
    if (topJointRef.current) {
      topJointRef.current.rotation.z = THREE.MathUtils.lerp(topJointRef.current.rotation.z, Math.cos(t) * 0.8 - y * 0.3, 0.1);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 2;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.5 + x * 0.2;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Robot Arm Assembly */}
        <group ref={armBaseRef} position={[0, -1, 0]}>
          {/* Base */}
          <mesh>
            <cylinderGeometry args={[0.8, 1, 0.4, 32]} />
            <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Arm Segment 1 */}
          <group position={[0, 0.2, 0]} ref={midJointRef}>
            <mesh position={[0, 0.7, 0]}>
              <boxGeometry args={[0.3, 1.4, 0.3]} />
              <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Joint */}
            <mesh position={[0, 1.4, 0]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
              <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
            </mesh>

            {/* Arm Segment 2 */}
            <group position={[0, 1.4, 0]} ref={topJointRef}>
              <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                <boxGeometry args={[0.2, 1, 0.2]} />
                <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
              </mesh>
              
              {/* Gripper / Head */}
              <mesh position={[1, 0, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2} />
              </mesh>
            </group>
          </group>
        </group>

        {/* Industrial Pipeline Ring */}
        <mesh ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[2.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={1} />
        </mesh>
        
        {/* Progress Bits */}
        {[...Array(8)].map((_, i) => (
          <group key={i} rotation={[0, 0, (i / 8) * Math.PI * 2]}>
            <mesh position={[2.5, 0, 0]}>
              <boxGeometry args={[0.2, 0.1, 0.1]} />
              <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2} />
            </mesh>
          </group>
        ))}
      </Float>

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#0ea5e9" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ffffff" />
    </group>
  );
}
