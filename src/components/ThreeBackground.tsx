import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const WireframeIcosahedron = ({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * speed;
      mesh.current.rotation.y += delta * speed * 1.5;
      
      // Float effect
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh position={position} ref={mesh}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} wireframe={true} transparent opacity={0.3} />
    </mesh>
  );
};

const MouseReactingParticles = () => {
  const { mouse, viewport } = useThree();
  const group = useRef<THREE.Group>(null);
  
  // Create random points for a brutalist "data dust" effect
  const [positions, sizes] = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
      sizes[i] = Math.random() * 2;
    }
    return [positions, sizes];
  }, []);

  useFrame(() => {
    if (group.current) {
      // Gentle rotation based on mouse position
      group.current.rotation.y = (mouse.x * viewport.width) / 200;
      group.current.rotation.x = -(mouse.y * viewport.height) / 200;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial color="#444444" size={0.03} sizeAttenuation={true} transparent opacity={0.6} />
      </points>
    </group>
  );
};

// Large interactive wireframe that tracks the mouse and reacts to audio
const MouseTrackingWireframe = ({ getAnalyserData }: { getAnalyserData: () => Uint8Array | null }) => {
  const { mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !innerRef.current || !outerRef.current) return;

    // Smoothly follow mouse
    const targetX = (mouse.x * state.viewport.width) / 4;
    const targetY = (mouse.y * state.viewport.height) / 4;

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;

    // Base rotation
    groupRef.current.rotation.x += delta * 0.2;
    groupRef.current.rotation.y += delta * 0.3;
    innerRef.current.rotation.y -= delta * 0.5;
    innerRef.current.rotation.z -= delta * 0.2;
    outerRef.current.rotation.x += delta * 0.1;
    outerRef.current.rotation.z += delta * 0.1;

    // React to Audio frequency data
    const audioData = getAnalyserData();
    let audioScale = 1;
    
    if (audioData) {
      let sum = 0;
      for (let i = 0; i < 20; i++) {
        sum += audioData[i];
      }
      const avg = sum / 20;
      
      if (avg > 10) {
        audioScale = 1 + (avg / 255) * 0.5;
      }
    }

    // Apply scaling based on audio + gentle pulse
    const baseScale = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 1;
    const finalScale = baseScale * audioScale;
    
    groupRef.current.scale.set(finalScale, finalScale, finalScale);
    
    // Make it rotate faster when audio hits hard
    if (audioScale > 1.2) {
      groupRef.current.rotation.x += delta * (audioScale * 0.5);
      groupRef.current.rotation.y += delta * (audioScale * 0.5);
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, -2]}>
      {/* Inner dodecahedron */}
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#ffe600" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Outer icosahedron shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color="#3385ff" wireframe transparent opacity={0.1} />
      </mesh>
      {/* Connecting lines — octahedron skeleton */}
      <mesh>
        <octahedronGeometry args={[1.8, 0]} />
        <meshBasicMaterial color="#ff1a1a" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
};


export default function ThreeBackground({ getAnalyserData }: { getAnalyserData?: () => Uint8Array | null }) {
  // Provide a no-op default if not passed
  const analyserFn = getAnalyserData || (() => null);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
        <fog attach="fog" args={['#000000', 3, 15]} />
        <MouseReactingParticles />
        <MouseTrackingWireframe getAnalyserData={analyserFn} />
        <WireframeIcosahedron position={[-4, 2, -3]} color="#ffe600" speed={0.2} /> {/* Electric yellow */}
        <WireframeIcosahedron position={[5, -2, -5]} color="#ff1a1a" speed={0.3} /> {/* Hot red */}
        <WireframeIcosahedron position={[-2, -4, -7]} color="#3385ff" speed={0.15} /> {/* Cold blue */}
        
        {/* Some larger, fainter background shapes */}
        <WireframeIcosahedron position={[6, 4, -10]} color="#ffffff" speed={0.1} />
        <WireframeIcosahedron position={[-6, -5, -12]} color="#ffe600" speed={0.05} />
      </Canvas>
    </div>
  );
}
