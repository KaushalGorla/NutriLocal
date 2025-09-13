import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// CSS Fallback Component
function CSS3DFallback() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl overflow-hidden">
      {/* 3D CSS animated elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Calories Ring */}
        <div 
          className="absolute w-24 h-24 border-8 border-green-500 rounded-full animate-spin"
          style={{ 
            left: '15%',
            top: '25%',
            animationDuration: '4s',
            transform: 'perspective(100px) rotateX(60deg)'
          }}
        />
        
        {/* Protein Sphere */}
        <div 
          className="absolute w-16 h-16 bg-blue-500 rounded-full animate-float shadow-lg"
          style={{ 
            left: '45%',
            top: '20%',
            background: 'radial-gradient(circle at 30% 30%, #60a5fa, #3b82f6)'
          }}
        />
        
        {/* Food Items */}
        <div 
          className="absolute w-12 h-12 bg-red-500 rounded-full animate-bounce"
          style={{ 
            right: '20%',
            top: '30%',
            background: 'radial-gradient(circle at 30% 30%, #f87171, #ef4444)',
            animationDelay: '0.5s'
          }}
        />
        
        <div 
          className="absolute w-8 h-16 bg-orange-500 rounded-full animate-pulse"
          style={{ 
            left: '25%',
            bottom: '35%',
            background: 'linear-gradient(to bottom, #fb923c, #f97316)',
            transform: 'rotate(25deg)',
            animationDelay: '1s'
          }}
        />
        
        <div 
          className="absolute w-10 h-10 bg-green-600 rounded-full animate-ping"
          style={{ 
            right: '35%',
            bottom: '30%',
            background: 'radial-gradient(circle at 30% 30%, #22c55e, #16a34a)',
            animationDelay: '1.5s'
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-float"
            style={{
              left: `${20 + (i * 8)}%`,
              top: `${15 + (i * 6)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + (i * 0.5)}s`
            }}
          />
        ))}
      </div>
      
      {/* Nutrition info overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <h3 className="font-bold text-lg mb-2">Nutrition Goals</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
            <div className="font-semibold">Calories</div>
            <div className="text-xs text-muted-foreground">1,680/2,000</div>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-1"></div>
            <div className="font-semibold">Protein</div>
            <div className="text-xs text-muted-foreground">98g/120g</div>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-1"></div>
            <div className="font-semibold">Options</div>
            <div className="text-xs text-muted-foreground">3 nearby</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Nutrition3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      console.log('WebGL not supported, using CSS fallback');
      setUseFallback(true);
      setIsLoaded(true);
      return;
    }

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf8fafc);
      sceneRef.current = scene;

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 8;
      camera.position.y = 2;

      // Renderer with fallback
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        failIfMajorPerformanceCaveat: false
      });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;

      mountRef.current.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      // Create 3D nutrition visualization
      const group = new THREE.Group();

      // Calories progress ring
      const caloriesRingGeometry = new THREE.TorusGeometry(1.5, 0.1, 8, 100);
      const caloriesRingMaterial = new THREE.MeshLambertMaterial({ color: 0x22c55e });
      const caloriesRing = new THREE.Mesh(caloriesRingGeometry, caloriesRingMaterial);
      caloriesRing.position.set(-3, 1, 0);
      caloriesRing.rotation.x = Math.PI / 2;
      group.add(caloriesRing);

      // Protein progress sphere
      const proteinSphereGeometry = new THREE.SphereGeometry(0.8, 16, 16);
      const proteinSphereMaterial = new THREE.MeshLambertMaterial({ color: 0x3b82f6 });
      const proteinSphere = new THREE.Mesh(proteinSphereGeometry, proteinSphereMaterial);
      proteinSphere.position.set(0, 1, 0);
      group.add(proteinSphere);

      // Food items
      const foodItems: THREE.Object3D[] = [];
      
      // Apple
      const appleGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const appleMaterial = new THREE.MeshLambertMaterial({ color: 0xff4444 });
      const apple = new THREE.Mesh(appleGeometry, appleMaterial);
      apple.position.set(3, 1, 0);
      apple.scale.set(1, 1.2, 1);
      group.add(apple);
      foodItems.push(apple);

      // Carrot
      const carrotGeometry = new THREE.CylinderGeometry(0.1, 0.3, 1, 8);
      const carrotMaterial = new THREE.MeshLambertMaterial({ color: 0xff8c00 });
      const carrot = new THREE.Mesh(carrotGeometry, carrotMaterial);
      carrot.position.set(-1, -1, 1);
      carrot.rotation.z = Math.PI / 6;
      group.add(carrot);
      foodItems.push(carrot);

      // Broccoli (represented as small spheres)
      const broccoliGroup = new THREE.Group();
      for (let i = 0; i < 5; i++) {
        const broccoliGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const broccoliMaterial = new THREE.MeshLambertMaterial({ color: 0x16a34a });
        const broccoliPiece = new THREE.Mesh(broccoliGeometry, broccoliMaterial);
        broccoliPiece.position.set(
          (Math.random() - 0.5) * 0.8,
          Math.random() * 0.5,
          (Math.random() - 0.5) * 0.8
        );
        broccoliGroup.add(broccoliPiece);
      }
      broccoliGroup.position.set(1, -1, -1);
      group.add(broccoliGroup);
      foodItems.push(broccoliGroup);

      scene.add(group);

      // Animation loop
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

        // Rotate the calories ring
        caloriesRing.rotation.z += 0.01;

        // Float the protein sphere
        proteinSphere.position.y = 1 + Math.sin(Date.now() * 0.001) * 0.3;

        // Rotate food items
        foodItems.forEach((item, index) => {
          item.rotation.y += 0.005 * (index + 1);
          if (item !== broccoliGroup) {
            item.rotation.x += 0.003 * (index + 1);
          }
        });

        // Rotate the entire group slowly
        group.rotation.y += 0.002;

        renderer.render(scene, camera);
      };

      animate();
      setIsLoaded(true);

      // Handle resize
      const handleResize = () => {
        if (!mountRef.current || !camera || !renderer) return;
        
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (error) {
      console.error('Error initializing 3D scene:', error);
      setUseFallback(true);
      setIsLoaded(true);
    }
  }, []);

  // Use fallback if WebGL fails
  if (useFallback) {
    return <CSS3DFallback />;
  }

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mountRef} 
        className="w-full h-full rounded-3xl overflow-hidden"
        style={{ minHeight: '300px' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-3xl">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
      
      {/* Overlay with nutrition info (only show if Three.js loaded) */}
      {isLoaded && !useFallback && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <h3 className="font-bold text-lg mb-2">Nutrition Goals</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
              <div className="font-semibold">Calories</div>
              <div className="text-xs text-muted-foreground">1,680/2,000</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-1"></div>
              <div className="font-semibold">Protein</div>
              <div className="text-xs text-muted-foreground">98g/120g</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-1"></div>
              <div className="font-semibold">Options</div>
              <div className="text-xs text-muted-foreground">3 nearby</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}