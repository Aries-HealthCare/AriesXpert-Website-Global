'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import gsap from 'gsap';
import { AlertCircle, Loader2 } from 'lucide-react';

type AnatomyViewerProps = {
  gender: 'male' | 'female';
  aiResult: {
    focusPosition: { x: number; y: number; z: number };
  } | null;
};

const AnatomyViewer: React.FC<AnatomyViewerProps> = ({ gender, aiResult }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const markerRef = useRef<THREE.Mesh | null>(null);
  const fallbackRef = useRef<THREE.Group | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;

    // CAMERA
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 5);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // CLINICAL SURGICAL LIGHTING
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 8.0);
    mainLight.position.set(10, 20, 15);
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(0x00ffff, 10.0, 25);
    rimLight.position.set(-10, 10, -10);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xff00ff, 5.0, 20);
    accentLight.position.set(5, -5, 10);
    scene.add(accentLight);

    // GRID HELPER (Clinical Baseline)
    const grid = new THREE.GridHelper(20, 40, 0x008080, 0x111111);
    grid.position.y = -0.5;
    (grid.material as THREE.Material).opacity = 0.05;
    (grid.material as THREE.Material).transparent = true;
    scene.add(grid);

    createFallbackBody(scene);

    // ANIMATION LOOP
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  const createFallbackBody = (scene: THREE.Scene) => {
    if (fallbackRef.current) scene.remove(fallbackRef.current);

    const group = new THREE.Group();
    const mat = new THREE.MeshPhongMaterial({
      color: 0x008080,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), mat);
    head.position.y = 1.8;

    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.2, 0.7, 16), mat);
    torso.position.y = 1.3;

    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.6), mat);
    leftArm.position.set(-0.35, 1.3, 0);
    leftArm.rotation.z = Math.PI / 12;

    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.6), mat);
    rightArm.position.set(0.35, 1.3, 0);
    rightArm.rotation.z = -Math.PI / 12;

    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.9), mat);
    leftLeg.position.set(-0.15, 0.5, 0);

    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.9), mat);
    rightLeg.position.set(0.15, 0.5, 0);

    group.add(head, torso, leftArm, rightArm, leftLeg, rightLeg);
    scene.add(group);
    fallbackRef.current = group;
  };

  useEffect(() => {
    if (!sceneRef.current) return;

    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }

    setIsLoading(true);

    const loader = new GLTFLoader();
    const filename = gender === 'male' ? 'male%20body.glb' : 'female%20body.glb';
    const path = `/models/${filename}`;

    loader.load(
      path,
      (gltf: any) => {
        const model = gltf.scene;
        modelRef.current = model;
        sceneRef.current?.add(model);

        model.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0xeeeeee,
              transparent: true,
              opacity: 0.85,
              metalness: 0.1,
              roughness: 0.2,
              transmission: 0.7,
              thickness: 1.0,
              emissive: 0x008080,
              emissiveIntensity: 0.15,
              clearcoat: 1.0
            });
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const targetHeight = 3.5;
        const scale = targetHeight / (size.y || 1);
        model.scale.setScalar(scale);

        model.position.x = -center.x * scale;
        model.position.y = (-center.y + (size.y / 2)) * scale - 0.5;
        model.position.z = -center.z * scale;

        if (fallbackRef.current) {
          sceneRef.current?.remove(fallbackRef.current);
          fallbackRef.current = null;
        }
        setIsLoading(false);
      },
      undefined,
      (err: ErrorEvent | any) => {
        console.error("GLTF Load Error:", err);
        console.warn("High-Fidelity Model Load Bypass - Utilizing Clinical Silhouette Fallback.");
        setIsLoading(false);
      }
    );
  }, [gender]);

  useEffect(() => {
    if (!aiResult || !cameraRef.current || !sceneRef.current) return;

    const { focusPosition } = aiResult;
    const target = new THREE.Vector3(focusPosition.x, focusPosition.y, focusPosition.z);

    // Cinematic Clinical Focus Sequence
    gsap.to(cameraRef.current.position, {
      x: target.x + 1.0,
      y: target.y + 0.3,
      z: target.z + 2.0,
      duration: 3.5,
      ease: "power4.inOut",
    });

    // High-Authority Targeting Pulsar
    if (!markerRef.current) {
      const geometry = new THREE.SphereGeometry(0.08, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.95
      });
      markerRef.current = new THREE.Mesh(geometry, material);
      sceneRef.current.add(markerRef.current);
    }

    markerRef.current.position.copy(target);
    markerRef.current.visible = true;

    gsap.killTweensOf(markerRef.current.scale);
    gsap.fromTo(markerRef.current.scale,
      { x: 0.5, y: 0.5, z: 0.5 },
      { x: 3.5, y: 3.5, z: 3.5, repeat: -1, yoyo: true, duration: 0.6, ease: "sine.inOut" }
    );

  }, [aiResult]);

  return (
    <div ref={mountRef} className="w-full h-full bg-[#050505] rounded-[2.5rem] relative overflow-hidden shadow-inner border border-primary/10">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 z-20 backdrop-blur-md">
          <Loader2 className="w-14 h-14 text-primary animate-spin mb-6" />
          <p className="text-white text-sm md:text-base font-bold uppercase tracking-widest drop-shadow-lg text-center px-4">Initialising Surgical <br />Body-Map Core...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 z-30 p-8 text-center">
          <AlertCircle className="w-16 h-16 text-destructive mb-6" />
          <p className="text-white font-black text-xl uppercase tracking-widest mb-2">Diagnostic Core Exception</p>
          <p className="text-muted-foreground text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default AnatomyViewer;