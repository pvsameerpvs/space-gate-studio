"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Network() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const count = 50;
  const radius = 4;

  const [positions, indices] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Random positions within a sphere
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
    }
    
    // Create random connections (indices)
    // Connecting each point to 2 random others
    const ind: number[] = [];
    for (let i = 0; i < count; i++) {
        const target1 = Math.floor(Math.random() * count);
        const target2 = Math.floor(Math.random() * count);
        ind.push(i, target1);
        ind.push(i, target2);
    }

    return [pos, new Uint16Array(ind)];
  }, []);

  useFrame((state) => {
    if (pointsRef.current && linesRef.current) {
        const time = state.clock.getElapsedTime();
        // Rotate the network
        pointsRef.current.rotation.y = time * 0.05;
        linesRef.current.rotation.y = time * 0.05;
        pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
        linesRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#00e5ff" // Cyan
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
            <bufferAttribute
                attach="attributes-position"
                count={count}
                array={positions}
                itemSize={3}
            />
            <bufferAttribute
                attach="index"
                count={indices.length}
                array={indices}
                itemSize={1}
            />
        </bufferGeometry>
        <lineBasicMaterial
            color="#a855f7" // Purple
            transparent
            opacity={0.15}
            linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export function NeuralNetworkBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true, antialias: true }}>
        <Network />
      </Canvas>
    </div>
  );
}
