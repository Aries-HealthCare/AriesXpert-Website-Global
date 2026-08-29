'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Pricing3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let canvas: HTMLCanvasElement;
    try {
      canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060d, 0.002);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 120);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Floating Holographic Torus Ring (Kinetic Pricing Core)
    const torusGeo = new THREE.TorusGeometry(32, 1.2, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(35, 10, -30);
    torusMesh.rotation.x = Math.PI / 3;
    scene.add(torusMesh);

    // Second Inner Ring with Cyan Glow
    const torusGeo2 = new THREE.TorusGeometry(22, 0.8, 16, 80);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const torusMesh2 = new THREE.Mesh(torusGeo2, torusMat2);
    torusMesh2.position.set(35, 10, -30);
    torusMesh2.rotation.y = Math.PI / 4;
    scene.add(torusMesh2);

    // 2. Floating Gold & Emerald Value Nodes (Icosahedrons)
    const nodeGroup = new THREE.Group();
    const nodeCount = 18;
    const icosaGeo = new THREE.IcosahedronGeometry(2.5, 0);

    const nodeMats = [
      new THREE.MeshBasicMaterial({ color: 0xd4af37, wireframe: true, transparent: true, opacity: 0.5 }), // Gold
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.45 }), // Emerald
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.4 }), // Blue
    ];

    const nodes: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number }; floatSpeed: number; initY: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const mat = nodeMats[i % nodeMats.length];
      const mesh = new THREE.Mesh(icosaGeo, mat);

      const x = (Math.random() - 0.5) * 160;
      const y = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 60 - 20;

      mesh.position.set(x, y, z);
      const scale = Math.random() * 0.8 + 0.6;
      mesh.scale.set(scale, scale, scale);

      nodeGroup.add(mesh);
      nodes.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.002 + 0.001,
        initY: y,
      });
    }
    scene.add(nodeGroup);

    // 3. Subtle Ambient Particle Constellation (Gleaming Value Field)
    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colViolet = new THREE.Color(0x8b5cf6);
    const colGold = new THREE.Color(0xf59e0b);
    const colCyan = new THREE.Color(0x06b6d4);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 200;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 10;

      const r = Math.random();
      const c = r < 0.4 ? colViolet : (r < 0.75 ? colCyan : colGold);
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Particle sprite texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.4, 'rgba(139, 92, 246, 0.7)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const pTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      map: pTex,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetX = (x - 0.5) * 20;
      targetY = -(y - 0.5) * 15;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;
      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0, 0, 0);

      // Torus rotation
      torusMesh.rotation.x = elapsed * 0.2;
      torusMesh.rotation.y = elapsed * 0.25;

      torusMesh2.rotation.x = -elapsed * 0.18;
      torusMesh2.rotation.z = elapsed * 0.22;

      // Nodes animation
      nodes.forEach((n) => {
        n.mesh.rotation.x += n.rotSpeed.x;
        n.mesh.rotation.y += n.rotSpeed.y;
        n.mesh.position.y = n.initY + Math.sin(elapsed * 1.5 + n.initY) * 3;
      });

      // Subtle particle rotation
      particles.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      torusGeo2.dispose();
      torusMat2.dispose();
      icosaGeo.dispose();
      nodeMats.forEach((m) => m.dispose());
      particleGeo.dispose();
      particleMat.dispose();
      pTex.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-60 overflow-hidden"
      aria-hidden="true"
    />
  );
}
