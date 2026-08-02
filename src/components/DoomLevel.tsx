import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, Box, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSoundEffects } from '@/hooks/useSoundEffects';

// W A S D Movement controller
const Player = () => {
  const { camera } = useThree();
  const speed = 5.0;
  
  const moveState = useRef({ forward: false, backward: false, left: false, right: false });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = true;
          break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = false;
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(
      0, 0, (moveState.current.backward ? 1 : 0) - (moveState.current.forward ? 1 : 0)
    );
    const sideVector = new THREE.Vector3(
      (moveState.current.left ? 1 : 0) - (moveState.current.right ? 1 : 0), 0, 0
    );

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed * delta);
    
    // Apply movement relative to camera rotation
    // Note: We only rotate horizontally for movement direction
    const camRotation = camera.rotation.y;
    
    const moveX = direction.x * Math.cos(camRotation) + direction.z * Math.sin(camRotation);
    const moveZ = direction.z * Math.cos(camRotation) - direction.x * Math.sin(camRotation);

    // Simple collision bounds (restrict to a 20x20 area for the maze)
    const newX = camera.position.x + moveX;
    const newZ = camera.position.z + moveZ;

    // Outer walls
    if (newX > -10 && newX < 10) camera.position.x = newX;
    if (newZ > -10 && newZ < 10) camera.position.z = newZ;
    
    // Keep camera at head height
    camera.position.y = 1.6;
  });

  return null;
};

const Map = () => {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>

      {/* Walls - Brutalist concrete style */}
      {/* Outer bounds */}
      <Box args={[20, 3, 1]} position={[0, 1.5, -10]}><meshStandardMaterial color="#333333" /></Box>
      <Box args={[20, 3, 1]} position={[0, 1.5, 10]}><meshStandardMaterial color="#333333" /></Box>
      <Box args={[1, 3, 20]} position={[-10, 1.5, 0]}><meshStandardMaterial color="#333333" /></Box>
      <Box args={[1, 3, 20]} position={[10, 1.5, 0]}><meshStandardMaterial color="#333333" /></Box>

      {/* Internal Maze Pillars */}
      <Box args={[4, 3, 1]} position={[-4, 1.5, -5]}><meshStandardMaterial color="#222" /></Box>
      <Box args={[1, 3, 6]} position={[4, 1.5, -3]}><meshStandardMaterial color="#2a2a2a" /></Box>
      <Box args={[6, 3, 1]} position={[2, 1.5, 3]}><meshStandardMaterial color="#333" /></Box>
      <Box args={[1, 3, 4]} position={[-3, 1.5, 5]}><meshStandardMaterial color="#252525" /></Box>
    </group>
  );
};

const Collectible = ({ onCollect, playSuccessSound }: { onCollect: () => void, playSuccessSound: () => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [collected, setCollected] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current || collected) return;
    
    // Rotate and float
    meshRef.current.rotation.y += delta;
    meshRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;

    // Check distance to player
    const distance = camera.position.distanceTo(meshRef.current.position);
    if (distance < 1.5) {
      setCollected(true);
      playSuccessSound();
      onCollect();
    }
  });

  if (collected) return null;

  return (
    <group position={[7, 1, -7]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#ffe600" emissive="#ffe600" emissiveIntensity={0.5} wireframe />
      </mesh>
      <Text position={[0, 1, 0]} fontSize={0.3} color="#ffe600" anchorX="center" anchorY="middle">
        RESUME
      </Text>
      <pointLight color="#ffe600" intensity={2} distance={5} />
    </group>
  );
};

export default function DoomLevel() {
  const [isActive, setIsActive] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { playSuccess } = useSoundEffects();

  useEffect(() => {
    const triggerDoom = () => {
      setIsActive(true);
    };

    window.addEventListener('trigger-doom', triggerDoom);
    return () => window.removeEventListener('trigger-doom', triggerDoom);
  }, []);

  const handleCollect = () => {
    // Trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // End game after a short delay
    setTimeout(() => {
      setIsActive(false);
      // Unlock pointer if possible
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
    }, 1000);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100000] bg-black">
      {!isLocked && (
        <div className="absolute inset-0 z-[100001] flex flex-col items-center justify-center bg-black/80 text-white pointer-events-none px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-hot-red uppercase tracking-widest glitch" data-text="TERMINAL_DOOM">
            TERMINAL_DOOM
          </h1>
          <p className="text-lg md:text-xl mb-2">CLICK ANYWHERE TO START</p>
          <p className="text-xs text-hot-red mb-8 font-mono">(KEYBOARD & MOUSE REQUIRED)</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-gray-400 font-mono">
            <p>W A S D to move</p>
            <p>MOUSE to look</p>
            <p>FIND THE GLOWING DISK</p>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 1.6, 8], fov: 75 }}>
        <fog attach="fog" args={['#000', 0, 15]} />
        <ambientLight intensity={0.2} />
        
        {/* Flashlight attached to player implicitly via distance */}
        <pointLight position={[0, 2, 0]} intensity={1} distance={8} />

        <PointerLockControls 
          onLock={() => setIsLocked(true)} 
          onUnlock={() => setIsLocked(false)} 
        />
        
        <Player />
        <Map />
        <Collectible onCollect={handleCollect} playSuccessSound={playSuccess} />
      </Canvas>
    </div>
  );
}
