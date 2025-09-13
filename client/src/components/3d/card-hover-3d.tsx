import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Card3DProps {
  isHovered: boolean;
  type?: 'food' | 'restaurant' | 'nutrition';
}

function FloatingIcon({ isHovered, type }: Card3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(isHovered ? 1.2 : 1);
    }
  });

  const getColor = () => {
    switch (type) {
      case 'food': return '#22c55e';
      case 'restaurant': return '#3b82f6';
      case 'nutrition': return '#f59e0b';
      default: return '#22c55e';
    }
  };

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 12, 8]} />
      <meshLambertMaterial color={getColor()} />
    </mesh>
  );
}

export default function CardHover3D({ isHovered, type = 'food' }: Card3DProps) {
  return (
    <div className="w-16 h-16 absolute top-4 right-4 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.4} />
        <FloatingIcon isHovered={isHovered} type={type} />
      </Canvas>
    </div>
  );
}