import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import FloatingFood from './floating-food';
import AnimatedParticles from './animated-particles';
import FloatingShapes from './floating-shapes';

export default function HeroBackground3D() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Simple lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.4} />
          
          {/* 3D Elements */}
          <FloatingFood position={[-3, 1, -2]} type="apple" />
          <FloatingFood position={[3, -1, -3]} type="avocado" />
          <FloatingFood position={[-1, -2, -1]} type="carrot" />
          <FloatingFood position={[2, 2, -4]} type="tomato" />
          
          <AnimatedParticles count={40} color="#22c55e" />
          <FloatingShapes count={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}