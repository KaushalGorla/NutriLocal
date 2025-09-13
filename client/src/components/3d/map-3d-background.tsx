import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import AnimatedParticles from './animated-particles';
import FloatingShapes from './floating-shapes';

export default function Map3DBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Subtle lighting for map section */}
          <ambientLight intensity={0.6} />
          <pointLight position={[3, 3, 3]} intensity={0.4} color="#3b82f6" />
          
          {/* Fewer, more subtle elements for map background */}
          <AnimatedParticles count={40} color="#3b82f6" />
          <FloatingShapes count={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}