import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Environment, ContactShadows } from '@react-three/drei';
import { generateBasketballTextures } from '../utils/textureGenerator';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Particle system for floating orange dust particles
function ParticleField({ count = 80 }) {
  const pointsRef = useRef(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 15;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 10;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 8;

      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() + 0.1) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return { positions: temp, velocities };
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      positions[idx] += particles.velocities[idx];
      positions[idx + 1] += particles.velocities[idx + 1];
      positions[idx + 2] += particles.velocities[idx + 2];

      if (positions[idx + 1] > 5) {
        positions[idx] = (Math.random() - 0.5) * 15;
        positions[idx + 1] = -5;
        positions[idx + 2] = (Math.random() - 0.5) * 8;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FF6A00"
        size={0.06}
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// The main animated 3D Basketball
function Basketball() {
  const groupRef = useRef(null);
  const meshRef = useRef(null);
  
  // Clean up textures on unmount
  const textures = useMemo(() => generateBasketballTextures(), []);

  // State for mouse interactive parallax/tilt
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });

  // Monitor mouse movement globally for parallax rotation
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP ScrollTrigger Timeline for scroll-based animation on the outer GROUP
  useEffect(() => {
    if (!groupRef.current) return;

    const ballGroup = groupRef.current;
    const isMobile = window.innerWidth < 768;

    // Reset Group properties
    gsap.set(ballGroup.position, { x: 0, y: 0, z: 0 });
    gsap.set(ballGroup.scale, { x: isMobile ? 0.65 : 0.85, y: isMobile ? 0.65 : 0.85, z: isMobile ? 0.65 : 0.85 });
    gsap.set(ballGroup.rotation, { x: 0.2, y: -0.4, z: 0 });

    // Transition 1: From Hero to Details (Scrub: 0.3 for responsive speed)
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: '#details-section',
        start: 'top bottom',
        end: 'top top',
        scrub: 0.3,
      }
    });

    tl1.to(ballGroup.position, {
      x: isMobile ? 0 : 1.5,
      y: isMobile ? -0.7 : -0.1,
      z: isMobile ? -0.2 : 0,
      ease: 'none',
    });
    tl1.to(ballGroup.rotation, {
      x: 0.6,
      y: Math.PI * 0.7,
      z: -0.2,
      ease: 'none',
    }, 0);
    tl1.to(ballGroup.scale, {
      x: isMobile ? 0.6 : 0.8,
      y: isMobile ? 0.6 : 0.8,
      z: isMobile ? 0.6 : 0.8,
      ease: 'none',
    }, 0);

    // Transition 2: From Details to Showcase (aligned from top top to bottom bottom of sticky container)
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '#showcase-section',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

    tl2.to(ballGroup.position, {
      x: isMobile ? 0 : -0.9,
      y: isMobile ? 0.2 : 0.0,
      z: 0.6,
      ease: 'none',
    });
    tl2.to(ballGroup.rotation, {
      x: 0.4,
      y: Math.PI * 1.5,
      z: 0.1,
      ease: 'none',
    }, 0);
    tl2.to(ballGroup.scale, {
      x: isMobile ? 0.75 : 0.95,
      y: isMobile ? 0.75 : 0.95,
      z: isMobile ? 0.75 : 0.95,
      ease: 'none',
    }, 0);

    // Transition 3: From Showcase to CTA
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: '#cta-section',
        start: 'top bottom',
        end: 'top center',
        scrub: 0.3,
      }
    });

    tl3.to(ballGroup.position, {
      x: 0,
      y: isMobile ? 0.6 : 0.2,
      z: 0,
      ease: 'none',
    });
    tl3.to(ballGroup.rotation, {
      x: 0.2,
      y: Math.PI * 2.2,
      z: 0,
      ease: 'none',
    }, 0);
    tl3.to(ballGroup.scale, {
      x: isMobile ? 0.55 : 0.75,
      y: isMobile ? 0.55 : 0.75,
      z: isMobile ? 0.55 : 0.75,
      ease: 'none',
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // useFrame for micro-animations inside the child MESH (no conflicts with outer group)
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // 1. Slow continuous spin on the mesh itself
    meshRef.current.rotation.y += delta * 0.12;

    // 2. Interpolate mouse position for smooth magnetic lag
    mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.08;
    mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.08;

    // 3. Apply magnetic tilt directly to the mesh
    meshRef.current.rotation.x = mouse.current.y * 0.15;
    meshRef.current.rotation.z = -mouse.current.x * 0.15;

    // 4. Subtle floating height animation
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhysicalMaterial
          map={textures.diffuseMap}
          bumpMap={textures.bumpMap}
          bumpScale={0.035}
          roughnessMap={textures.roughnessMap}
          roughness={0.7}
          metalness={0.15}
          clearcoat={0.15}
          clearcoatRoughness={0.3}
          reflectivity={0.6}
        />
      </mesh>
    </group>
  );
}

export default function BasketballScene() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 bg-brand-black ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 1 }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 7.5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#050505']} />
        
        <fog attach="fog" args={['#050505', 6, 12]} />

        <Environment preset="studio" />

        {/* Dynamic cinematic lights */}
        <directionalLight
          position={[6, 6, 4]}
          intensity={2.0}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        <directionalLight
          position={[-6, -2, -2]}
          intensity={0.6}
        />

        <spotLight
          position={[-4, 4, -4]}
          angle={Math.PI / 3}
          penumbra={1}
          intensity={4.0}
          color="#FF6A00"
        />

        <pointLight
          position={[0, 0, -2]}
          intensity={1.5}
          color="#FF6A00"
          distance={8}
        />

        {/* Floating particles */}
        <ParticleField count={90} />

        {/* The Basketball itself */}
        <Basketball />

        {/* Soft floor shadow */}
        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.65}
          scale={7}
          blur={2.8}
          far={4.5}
        />
      </Canvas>
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none mix-blend-screen" />
    </div>
  );
}
