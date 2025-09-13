import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingShapesProps {
  count?: number;
}

export default function FloatingShapes({ count = 6 }: FloatingShapesProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  const shapes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.2,
      color: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 4)],
      rotationSpeed: Math.random() * 0.02 + 0.005,
      floatSpeed: Math.random() * 1 + 0.5,
    }));
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const shape = shapes[i];
        if (child && shape) {
          child.rotation.x += shape.rotationSpeed;
          child.rotation.y += shape.rotationSpeed * 1.5;
          child.position.y = shape.position[1] + Math.sin(state.clock.elapsedTime * shape.floatSpeed) * 0.5;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={shape.id} position={shape.position} scale={shape.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshLambertMaterial color={shape.color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}