"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, PerspectiveCamera, Float, Text, GradientTexture } from "@react-three/drei";
import * as THREE from "three";

function HeroText3D() {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!textRef.current) return;
    
    // Scroll Physics: Fall down when scrolling
    const scrollY = window.scrollY;
    // Base position is slightly below center to match HTML layout
    // Fall multiplier: 0.015 makes it drop faster than normal scroll
    textRef.current.position.y = -0.8 - (scrollY * 0.015);
    
    // Subtle hover while static
    textRef.current.position.z = 2 + Math.sin(clock.getElapsedTime()) * 0.2;
  });

  return (
    <Text
      ref={textRef}
      fontSize={2.5}
      letterSpacing={0.1}
      position={[0, -0.8, 2]}
      anchorX="center"
      anchorY="middle"
      characters="REALITIES"
    >
      REALITIES
      <meshBasicMaterial toneMapped={false}>
         <GradientTexture
            stops={[0, 0.5, 1]} 
            colors={["#00e5ff", "#2979ff", "#d500f9"]} // Cyan -> Blue -> Purple/Magenta
            size={1024} 
         />
      </meshBasicMaterial>
    </Text>
  );
}

function ParticleSphere() {
  const points = useRef<THREE.Points>(null);
  
  // Generate points for the sphere
  const count = 3000;
  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const spherical = new THREE.Spherical();
    const vec3 = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
        spherical.set(
            4, 
            Math.acos(THREE.MathUtils.mapLinear(i, 0, count, -1, 1)), 
            (Math.PI * (1 + 5 ** 0.5) * i)
        );
        vec3.setFromSpherical(spherical);
        pos[i * 3] = vec3.x;
        pos[i * 3 + 1] = vec3.y;
        pos[i * 3 + 2] = vec3.z;
        orig[i * 3] = vec3.x;
        orig[i * 3 + 1] = vec3.y;
        orig[i * 3 + 2] = vec3.z;
    }
    return [pos, orig];
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionAttribute = points.current.geometry.getAttribute("position");
    
    for (let i = 0; i < count; i++) {
        // Create an elegant undulation effect
        const x = originalPositions[i * 3];
        const y = originalPositions[i * 3 + 1];
        const z = originalPositions[i * 3 + 2];
        
        // Wave modifier based on position and time
        const wave = Math.sin(x * 0.5 + time * 0.5) * Math.cos(y * 0.3 + time * 0.3) * Math.sin(z * 0.5 + time * 0.2);
        const scale = 1 + wave * 0.2; // Breathing intensity

        positionAttribute.setXYZ(i, x * scale, y * scale, z * scale);
    }
    
    positionAttribute.needsUpdate = true;
    points.current.rotation.y = time * 0.05;
    points.current.rotation.z = time * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#2979ff" // Deep Blue from theme
        transparent
        depthWrite={false}
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingCrystals() {
    return (
        <group>
             {[...Array(6)].map((_, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={4} position={[
                    Math.cos(i * Math.PI / 3) * 6,
                    Math.sin(i * Math.PI / 3) * 4,
                    Math.random() * -5
                ]}>
                    <mesh rotation={[Math.random(), Math.random(), 0]}>
                        <octahedronGeometry args={[0.3]} />
                        <meshBasicMaterial color="#d500f9" toneMapped={false} />
                    </mesh>
                </Float>
             ))}
        </group>
    )
}

function Rig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function SpaceScene() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        
        {/* Deep Space Background Stars */}
        <Stars radius={150} depth={50} count={6000} factor={3} saturation={0} fade speed={0.5} />
        
        {/* Main Fluid Sphere */}
        <ParticleSphere />
        
        {/* 3D Falling Text - Suspense wrapped to prevent white screen */}
        <Suspense fallback={null}>
            <HeroText3D />
        </Suspense>

        {/* Floating Accent Crystals */}
        <FloatingCrystals />
        
        <Rig />
      </Canvas>
    </div>
  );
}
