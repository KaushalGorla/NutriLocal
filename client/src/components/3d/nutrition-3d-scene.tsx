import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

// CSS Fallback Component
function CSS3DFallback() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl overflow-hidden">
      {/* 3D CSS animated elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Large Realistic CSS Burger */}
        <div 
          className="absolute animate-float"
          style={{ 
            left: '15%',
            top: '5%',
            transform: 'perspective(400px) rotateX(10deg) rotateY(-15deg) scale(1.4)',
            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.4))'
          }}
        >
          {/* Top bun with realistic sesame seeds */}
          <div className="relative w-32 h-12 rounded-t-full shadow-2xl mb-1"
               style={{ 
                 background: 'radial-gradient(ellipse 100% 80% at center 20%, #fbbf24, #f59e0b, #d97706, #92400e)',
                 border: '3px solid #78350f',
                 boxShadow: 'inset 0 -2px 8px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.3)'
               }}>
            {/* More realistic sesame seeds */}
            <div className="absolute top-2 left-4 w-1.5 h-1.5 bg-yellow-50 rounded-full shadow-sm"></div>
            <div className="absolute top-3 left-8 w-1.5 h-1.5 bg-yellow-50 rounded-full shadow-sm"></div>
            <div className="absolute top-1.5 left-12 w-1.5 h-1.5 bg-yellow-50 rounded-full shadow-sm"></div>
            <div className="absolute top-2.5 right-6 w-1.5 h-1.5 bg-yellow-50 rounded-full shadow-sm"></div>
            <div className="absolute top-1.5 right-10 w-1.5 h-1.5 bg-yellow-50 rounded-full shadow-sm"></div>
            <div className="absolute top-3 right-14 w-1.5 h-1.5 bg-yellow-50 rounded-full shadow-sm"></div>
            {/* Highlight on top */}
            <div className="absolute top-1 left-1/4 w-12 h-3 rounded-full opacity-40"
                 style={{ background: 'linear-gradient(to right, transparent, #ffffff, transparent)' }} />
          </div>
          
          {/* Crispy lettuce with realistic texture */}
          <div className="w-30 h-4 mx-1 shadow-lg -mb-1 relative"
               style={{ 
                 background: 'linear-gradient(45deg, #22c55e, #16a34a, #15803d, #166534)',
                 clipPath: 'polygon(0% 30%, 8% 0%, 20% 25%, 35% 5%, 50% 20%, 65% 0%, 80% 15%, 92% 5%, 100% 35%, 95% 70%, 85% 100%, 70% 85%, 50% 95%, 30% 80%, 15% 100%, 5% 75%)',
                 filter: 'brightness(1.2) contrast(1.1)',
                 boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.3), 0 2px 6px rgba(0,0,0,0.2)'
               }}>
            {/* Lettuce veins */}
            <div className="absolute inset-0 opacity-30"
                 style={{ background: 'repeating-linear-gradient(60deg, transparent, transparent 3px, #dcfce7 3px, #dcfce7 4px)' }} />
          </div>
          
          {/* Juicy tomato slices */}
          <div className="flex justify-center gap-2 -mb-1">
            <div className="w-8 h-4 rounded-full shadow-lg relative overflow-hidden"
                 style={{ background: 'radial-gradient(circle at 25% 25%, #fca5a5, #f87171, #ef4444, #dc2626)' }}>
              {/* Tomato seeds */}
              <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-yellow-200 rounded-full opacity-80"></div>
              <div className="absolute top-2 left-3 w-0.5 h-0.5 bg-yellow-200 rounded-full opacity-80"></div>
              <div className="absolute top-1.5 right-2 w-0.5 h-0.5 bg-yellow-200 rounded-full opacity-80"></div>
            </div>
            <div className="w-8 h-4 rounded-full shadow-lg relative overflow-hidden"
                 style={{ background: 'radial-gradient(circle at 25% 25%, #fca5a5, #f87171, #ef4444, #dc2626)' }}>
              {/* Tomato seeds */}
              <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-yellow-200 rounded-full opacity-80"></div>
              <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-yellow-200 rounded-full opacity-80"></div>
            </div>
          </div>
          
          {/* Melted cheese slice */}
          <div className="w-28 h-3 mx-2 shadow-lg relative"
               style={{ 
                 background: 'linear-gradient(135deg, #fef3c7, #fbbf24, #f59e0b, #d97706)',
                 clipPath: 'polygon(3% 0%, 97% 0%, 100% 80%, 95% 100%, 5% 100%, 0% 80%)',
                 transform: 'skew(-3deg)',
                 boxShadow: '0 3px 8px rgba(0,0,0,0.2), inset 0 1px 3px rgba(255,255,255,0.4)'
               }}>
            {/* Cheese holes */}
            <div className="absolute top-1 left-4 w-1 h-1 bg-yellow-300 rounded-full opacity-60"></div>
            <div className="absolute top-0.5 right-6 w-0.5 h-0.5 bg-yellow-300 rounded-full opacity-60"></div>
          </div>
          
          {/* Thick juicy beef patty */}
          <div className="w-28 h-8 mx-2 shadow-2xl relative overflow-hidden"
               style={{ 
                 background: 'radial-gradient(ellipse at center, #a16207, #92400e, #78350f, #451a03)',
                 border: '2px solid #451a03',
                 borderRadius: '50% 50% 40% 40%',
                 boxShadow: '0 6px 20px rgba(0,0,0,0.4), inset 0 2px 4px rgba(0,0,0,0.3)'
               }}>
            {/* Realistic grill marks */}
            <div className="absolute inset-0 opacity-80"
                 style={{
                   background: 'repeating-linear-gradient(45deg, transparent, transparent 3px, #451a03 3px, #451a03 4px), repeating-linear-gradient(-45deg, transparent, transparent 8px, #451a03 8px, #451a03 9px)'
                 }} />
            {/* Meat texture */}
            <div className="absolute inset-1 opacity-40 rounded-full"
                 style={{ background: 'radial-gradient(circle, #a16207 20%, transparent 21%), radial-gradient(circle at 40% 40%, #92400e 15%, transparent 16%)' }} />
          </div>
          
          {/* Bottom bun with realistic texture */}
          <div className="w-32 h-8 rounded-b-2xl shadow-2xl mt-1"
               style={{ 
                 background: 'linear-gradient(to bottom, #f59e0b, #d97706, #92400e, #78350f)',
                 border: '3px solid #78350f',
                 borderTop: 'none',
                 boxShadow: '0 8px 20px rgba(0,0,0,0.4), inset 0 2px 6px rgba(255,255,255,0.2)'
               }}>
            {/* Bottom bun texture */}
            <div className="absolute bottom-1 left-1/4 w-16 h-2 rounded-full opacity-30"
                 style={{ background: 'linear-gradient(to right, transparent, #fbbf24, transparent)' }} />
          </div>
        </div>
        
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

      // Realistic fallback burger function
      const createFallbackBurger = () => {
        const burgerGroup = new THREE.Group();
        
        // Enhanced materials with better realism
        
        // Bottom bun with sesame seed bumps
        const bottomBunGeometry = new THREE.CylinderGeometry(1.2, 1.15, 0.4, 32);
        const bottomBunMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xd97706,
          roughness: 0.6,
          metalness: 0.1,
          bumpScale: 0.02
        });
        const bottomBun = new THREE.Mesh(bottomBunGeometry, bottomBunMaterial);
        bottomBun.position.y = -0.8;
        bottomBun.castShadow = true;
        bottomBun.receiveShadow = true;
        burgerGroup.add(bottomBun);

        // Lettuce layer with irregular shape
        const lettuceGeometry = new THREE.CylinderGeometry(1.0, 1.1, 0.08, 32);
        const lettuceMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x22c55e,
          roughness: 0.8,
          transparent: true,
          opacity: 0.9
        });
        const lettuce = new THREE.Mesh(lettuceGeometry, lettuceMaterial);
        lettuce.position.y = -0.4;
        lettuce.scale.set(1, 0.3, 1);
        lettuce.castShadow = true;
        burgerGroup.add(lettuce);

        // Tomato slices
        for (let i = 0; i < 2; i++) {
          const tomatoGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
          const tomatoMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xef4444,
            roughness: 0.3,
            metalness: 0.1
          });
          const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
          tomato.position.set(i * 0.3 - 0.15, -0.25, i * 0.2 - 0.1);
          tomato.castShadow = true;
          burgerGroup.add(tomato);
        }

        // Cheese with melted edges
        const cheeseGeometry = new THREE.CylinderGeometry(1.1, 1.05, 0.08, 32);
        const cheeseMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xfbbf24,
          roughness: 0.2,
          metalness: 0.05,
          transparent: true,
          opacity: 0.95
        });
        const cheese = new THREE.Mesh(cheeseGeometry, cheeseMaterial);
        cheese.position.y = -0.15;
        cheese.castShadow = true;
        burgerGroup.add(cheese);

        // Thick realistic beef patty with texture
        const pattyGeometry = new THREE.CylinderGeometry(1.0, 0.95, 0.3, 32);
        const pattyMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x78350f,
          roughness: 0.9,
          metalness: 0.1,
          bumpScale: 0.05
        });
        const patty = new THREE.Mesh(pattyGeometry, pattyMaterial);
        patty.position.y = -0.05;
        patty.castShadow = true;
        patty.receiveShadow = true;
        burgerGroup.add(patty);

        // Top bun with realistic shape and sesame seeds
        const topBunGeometry = new THREE.SphereGeometry(1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const topBunMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xd97706,
          roughness: 0.6,
          metalness: 0.1,
          bumpScale: 0.02
        });
        const topBun = new THREE.Mesh(topBunGeometry, topBunMaterial);
        topBun.position.y = 0.4;
        topBun.castShadow = true;
        topBun.receiveShadow = true;
        burgerGroup.add(topBun);

        // Add sesame seeds as small spheres
        for (let i = 0; i < 8; i++) {
          const seedGeometry = new THREE.SphereGeometry(0.03, 8, 8);
          const seedMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xfef3c7,
            roughness: 0.8
          });
          const seed = new THREE.Mesh(seedGeometry, seedMaterial);
          const angle = (i / 8) * Math.PI * 2;
          const radius = 0.6 + Math.random() * 0.3;
          seed.position.set(
            Math.cos(angle) * radius,
            0.45 + Math.random() * 0.1,
            Math.sin(angle) * radius
          );
          seed.castShadow = true;
          burgerGroup.add(seed);
        }

        burgerGroup.position.set(0, 2, 0);
        burgerGroup.scale.set(2, 2, 2);
        return burgerGroup;
      };

      // Load realistic burger model
      const loader = new GLTFLoader();
      let burgerModel: THREE.Group | null = null;
      
      // Try to load realistic burger model from online, with fallback
      loader.load(
        'https://models.readyplayer.me/64e4efc7681ac4e2a3f0e3a8.glb',
        (gltf) => {
          burgerModel = gltf.scene;
          burgerModel.scale.set(3, 3, 3);
          burgerModel.position.set(0, 2, 0);
          
          // Enhance materials for better appearance
          burgerModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.needsUpdate = true;
              }
            }
          });
          
          group.add(burgerModel);
          console.log('Realistic burger model loaded successfully');
        },
        (progress) => {
          console.log('Loading burger model:', (progress.loaded / progress.total * 100) + '% loaded');
        },
        (error) => {
          console.log('Could not load realistic burger model, using fallback');
          // Use fallback burger if realistic model fails to load
          const fallbackBurger = createFallbackBurger();
          burgerModel = fallbackBurger;
          group.add(fallbackBurger);
        }
      );


      scene.add(group);

      // Animation loop
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

        // Animate the burger model
        if (burgerModel) {
          burgerModel.rotation.y += 0.01;
          burgerModel.position.y = 2 + Math.sin(Date.now() * 0.001) * 0.3;
        }


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