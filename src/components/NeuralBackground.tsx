import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
}

function ParticleSystem({ count = 150 }: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    
    return [pos, vel];
  }, [count]);
  
  const linePositions = useMemo(() => {
    return new Float32Array(count * count * 6);
  }, [count]);
  
  const lineColors = useMemo(() => {
    return new Float32Array(count * count * 6);
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    // Update particle positions
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Boundary check
      if (Math.abs(posArray[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    
    // Update connections
    if (linesRef.current) {
      let lineIndex = 0;
      const linePos = linesRef.current.geometry.attributes.position.array as Float32Array;
      const lineCol = linesRef.current.geometry.attributes.color.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < 2.5 && lineIndex < count * 12) {
            linePos[lineIndex * 6] = posArray[i * 3];
            linePos[lineIndex * 6 + 1] = posArray[i * 3 + 1];
            linePos[lineIndex * 6 + 2] = posArray[i * 3 + 2];
            linePos[lineIndex * 6 + 3] = posArray[j * 3];
            linePos[lineIndex * 6 + 4] = posArray[j * 3 + 1];
            linePos[lineIndex * 6 + 5] = posArray[j * 3 + 2];
            
            const alpha = 1 - dist / 2.5;
            // Cyan to purple gradient based on distance
            lineCol[lineIndex * 6] = 0 * alpha;
            lineCol[lineIndex * 6 + 1] = 0.94 * alpha;
            lineCol[lineIndex * 6 + 2] = 1 * alpha;
            lineCol[lineIndex * 6 + 3] = 0.44 * alpha;
            lineCol[lineIndex * 6 + 4] = 0 * alpha;
            lineCol[lineIndex * 6 + 5] = 1 * alpha;
            
            lineIndex++;
          }
        }
      }
      
      // Clear remaining lines
      for (let i = lineIndex * 6; i < count * 12; i++) {
        linePos[i] = 0;
        lineCol[i] = 0;
      }
      
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00F0FF"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

function NeuralBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice && containerRef.current) {
      containerRef.current.style.display = 'none';
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #050505 100%)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSystem count={120} />
      </Canvas>
    </div>
  );
}

export default NeuralBackground;
