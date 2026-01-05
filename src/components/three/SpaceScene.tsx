"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function Planet({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.55,
      metalness: 0.15,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.22
    });
    return m;
  }, [color]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.12;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.12;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.3}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </Float>
  );
}

function FoggyGlow() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 2]} intensity={0.8} />
      <pointLight position={[-6, -2, -4]} intensity={0.9} color={"#00ffd1"} />
      <pointLight position={[6, 2, -2]} intensity={0.75} color={"#58e7ff"} />
      <fog attach="fog" args={["#050612", 10, 35]} />
    </>
  );
}

export function SpaceScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <FoggyGlow />
        <Stars radius={120} depth={50} count={1400} factor={4} saturation={0} fade speed={1} />
        <Planet position={[-3.6, 1.3, -2]} color={"#58e7ff"} size={1.2} />
        <Planet position={[3.8, -1.1, -5]} color={"#aa50ff"} size={1.6} />
        <Planet position={[0.2, 2.2, -8]} color={"#00ffd1"} size={0.9} />
      </Canvas>
    </div>
  );
}
