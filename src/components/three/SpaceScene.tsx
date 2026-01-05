"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Stars, Environment } from "@react-three/drei";
import * as THREE from "three";

function Planet({ position, texturePath, size, color }: { position: [number, number, number]; texturePath: string; size: number; color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, texturePath);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.05;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.3}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.7} 
          metalness={0.3} 
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function FoggyGlow() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 3, 2]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-6, -2, -4]} intensity={2.0} color={"#00ffd1"} distance={20} />
      <pointLight position={[6, 2, -2]} intensity={1.8} color={"#aa50ff"} distance={20} />
      <fog attach="fog" args={["#03040B", 10, 40]} />
    </>
  );
}

export function SpaceScene() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#03040B]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <FoggyGlow />
        <Stars radius={120} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
        
        {/* Cyan Ice Planet */}
        <Planet position={[-3.5, 1.2, -3]} texturePath="/textures/planet_ice.png" size={1.4} color="#00ffd1" />
        
        {/* Purple Rock Planet */}
        <Planet position={[3.8, -1.5, -4]} texturePath="/textures/planet_rock.png" size={1.8} color="#aa50ff" />
        
        {/* Distant small moon */}
        <Planet position={[1.5, 2.5, -10]} texturePath="/textures/planet_ice.png" size={0.6} color="#ffffff" />
      </Canvas>
    </div>
  );
}
