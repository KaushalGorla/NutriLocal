import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingFoodProps {
  position?: [number, number, number];
  type?: 'apple' | 'carrot' | 'avocado' | 'tomato';
}

export default function FloatingFood({ position = [0, 0, 0], type = 'apple' }: FloatingFoodProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Random animation values
  const { rotationSpeed, floatSpeed, floatRange } = useMemo(() => ({
    rotationSpeed: Math.random() * 0.02 + 0.01,
    floatSpeed: Math.random() * 2 + 1,
    floatRange: Math.random() * 0.5 + 0.3,
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.x += rotationSpeed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatSpeed) * floatRange;
    }
  });

  const getColor = () => {
    switch (type) {
      case 'apple': return '#ff4444';
      case 'carrot': return '#ff8c00';
      case 'avocado': return '#568203';
      case 'tomato': return '#ff6347';
      default: return '#32cd32';
    }
  };

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 12]} />
        <meshLambertMaterial color={getColor()} />
      </mesh>
    </group>
  );
}