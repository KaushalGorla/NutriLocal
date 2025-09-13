import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

// CSS Fallback Component
function CSS3DFallback() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl overflow-hidden">
      {/* 3D CSS animated elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Realistic CSS Burger */}
        <div 
          className="absolute animate-float"
          style={{ 
            left: '25%',
            top: '15%',
            transform: 'perspective(300px) rotateX(15deg) rotateY(-10deg)',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
          }}
        >
          {/* Top bun with sesame seeds */}
          <div className="relative w-24 h-8 rounded-t-full shadow-2xl mb-0.5"
               style={{ 
                 background: 'radial-gradient(ellipse at center top, #f59e0b, #d97706, #92400e)',
                 border: '2px solid #78350f'
               }}>
            {/* Sesame seeds */}
            <div className="absolute top-1 left-3 w-1 h-1 bg-yellow-100 rounded-full"></div>
            <div className="absolute top-2 left-6 w-1 h-1 bg-yellow-100 rounded-full"></div>
            <div className="absolute top-1 right-4 w-1 h-1 bg-yellow-100 rounded-full"></div>
            <div className="absolute top-2 right-7 w-1 h-1 bg-yellow-100 rounded-full"></div>
          </div>
          
          {/* Lettuce with irregular edges */}
          <div className="w-22 h-3 mx-1 shadow-lg -mb-1"
               style={{ 
                 background: 'linear-gradient(45deg, #22c55e, #16a34a, #15803d)',
                 clipPath: 'polygon(0% 20%, 15% 0%, 35% 15%, 50% 5%, 70% 20%, 85% 10%, 100% 25%, 90% 80%, 75% 95%, 50% 85%, 25% 100%, 10% 75%)',
                 filter: 'brightness(1.1)'
               }} />
          
          {/* Tomato slices */}
          <div className="flex justify-center gap-1 -mb-1">
            <div className="w-6 h-3 rounded-full shadow-md"
                 style={{ background: 'radial-gradient(circle at 30% 30%, #f87171, #ef4444, #dc2626)' }} />
            <div className="w-6 h-3 rounded-full shadow-md"
                 style={{ background: 'radial-gradient(circle at 30% 30%, #f87171, #ef4444, #dc2626)' }} />
          </div>
          
          {/* Cheese slice */}
          <div className="w-20 h-2 mx-2 shadow-lg"
               style={{ 
                 background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
                 clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
                 transform: 'skew(-5deg)'
               }} />
          
          {/* Beef patty with texture */}
          <div className="w-20 h-5 mx-2 shadow-2xl"
               style={{ 
                 background: 'radial-gradient(circle at center, #92400e, #78350f, #451a03)',
                 border: '1px solid #451a03',
                 borderRadius: '50% 50% 45% 45%',
                 position: 'relative'
               }}>
            {/* Grill marks */}
            <div className="absolute inset-0 opacity-60"
                 style={{
                   background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #451a03 2px, #451a03 3px)'
                 }} />
          </div>
          
          {/* Bottom bun */}
          <div className="w-24 h-5 rounded-b-xl shadow-2xl mt-0.5"
               style={{ 
                 background: 'linear-gradient(to bottom, #f59e0b, #d97706, #92400e)',
                 border: '2px solid #78350f',
                 borderTop: 'none'
               }} />
        </div>
        
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

      // Fallback burger function
      const createFallbackBurger = () => {
        const burgerGroup = new THREE.Group();
        
        // Bottom bun
        const bottomBunGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.3, 16);
        const bottomBunMaterial = new THREE.MeshLambertMaterial({ color: 0xd97706 });
        const bottomBun = new THREE.Mesh(bottomBunGeometry, bottomBunMaterial);
        bottomBun.position.y = -0.8;
        burgerGroup.add(bottomBun);

        // Patty
        const pattyGeometry = new THREE.CylinderGeometry(1.0, 1.0, 0.2, 16);
        const pattyMaterial = new THREE.MeshLambertMaterial({ color: 0x92400e });
        const patty = new THREE.Mesh(pattyGeometry, pattyMaterial);
        patty.position.y = -0.5;
        burgerGroup.add(patty);

        // Cheese
        const cheeseGeometry = new THREE.CylinderGeometry(1.1, 1.1, 0.1, 16);
        const cheeseMaterial = new THREE.MeshLambertMaterial({ color: 0xfbbf24 });
        const cheese = new THREE.Mesh(cheeseGeometry, cheeseMaterial);
        cheese.position.y = -0.3;
        burgerGroup.add(cheese);

        // Top bun
        const topBunGeometry = new THREE.SphereGeometry(1.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const topBunMaterial = new THREE.MeshLambertMaterial({ color: 0xd97706 });
        const topBun = new THREE.Mesh(topBunGeometry, topBunMaterial);
        topBun.position.y = 0.5;
        burgerGroup.add(topBun);

        burgerGroup.position.set(0, 1, 0);
        return burgerGroup;
      };

      // Load realistic burger model
      const loader = new GLTFLoader();
      let burgerModel: THREE.Group | null = null;
      
      // Try to load burger model from online, with fallback
      loader.load(
        'https://threejs.org/examples/models/gltf/Hamburger/Hamburger.gltf',
        (gltf) => {
          burgerModel = gltf.scene;
          burgerModel.scale.set(1.5, 1.5, 1.5);
          burgerModel.position.set(0, 1, 0);
          
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

        // Animate the burger model
        if (burgerModel) {
          burgerModel.rotation.y += 0.01;
          burgerModel.position.y = 1 + Math.sin(Date.now() * 0.001) * 0.3;
        }

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