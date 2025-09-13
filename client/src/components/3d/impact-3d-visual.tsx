import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, Cone } from '@react-three/drei';
import * as THREE from 'three';

function RotatingImpactVisual() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central sphere representing community */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshLambertMaterial color="#22c55e" transparent opacity={0.8} />
      </Sphere>
      
      {/* Orbiting elements representing local businesses */}
      <Torus args={[2, 0.1, 8, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshLambertMaterial color="#3b82f6" transparent opacity={0.6} />
      </Torus>
      
      {/* Impact indicators */}
      <Cone args={[0.2, 0.8]} position={[2.5, 0, 0]}>
        <meshLambertMaterial color="#f59e0b" />
      </Cone>
      <Cone args={[0.2, 0.8]} position={[-2.5, 0, 0]}>
        <meshLambertMaterial color="#f59e0b" />
      </Cone>
      <Cone args={[0.2, 0.8]} position={[0, 0, 2.5]}>
        <meshLambertMaterial color="#f59e0b" />
      </Cone>
      <Cone args={[0.2, 0.8]} position={[0, 0, -2.5]}>
        <meshLambertMaterial color="#f59e0b" />
      </Cone>
    </group>
  );
}

export default function Impact3DVisual() {
  return (
    <div className="w-full h-64 relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#22c55e" />
        <RotatingImpactVisual />
      </Canvas>
    </div>
  );
}