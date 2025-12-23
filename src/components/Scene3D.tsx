import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const icosaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.15;
      torusRef.current.rotation.z = time * 0.2;
    }
    
    if (icosaRef.current) {
      icosaRef.current.rotation.y = time * 0.25;
      icosaRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={[-3, 1, -2]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color="#00d4ff"
            wireframe
            emissive="#00d4ff"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={torusRef} position={[3, -1, -3]}>
          <torusGeometry args={[0.6, 0.2, 16, 32]} />
          <meshStandardMaterial
            color="#a855f7"
            wireframe
            emissive="#a855f7"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh ref={icosaRef} position={[0, 2, -4]}>
          <icosahedronGeometry args={[0.4]} />
          <meshStandardMaterial
            color="#00d4ff"
            wireframe
            emissive="#00d4ff"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.6}>
        <mesh position={[-2, -2, -2]}>
          <dodecahedronGeometry args={[0.3]} />
          <meshStandardMaterial
            color="#a855f7"
            wireframe
            emissive="#a855f7"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[2.5, 1.5, -5]}>
          <tetrahedronGeometry args={[0.4]} />
          <meshStandardMaterial
            color="#00d4ff"
            wireframe
            emissive="#00d4ff"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#070b14']} />
        <fog attach="fog" args={['#070b14', 5, 20]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />
        
        <ParticleField />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
