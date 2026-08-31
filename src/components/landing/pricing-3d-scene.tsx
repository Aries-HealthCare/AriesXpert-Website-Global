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
    scene.fog = new THREE.FogExp2(0x02050e, 0.0014);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 135);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── 1. Floating Holographic Torus Ring (Kinetic Pricing Core) ──
    const torusGeo = new THREE.TorusGeometry(42, 1.4, 16, 120);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(55, 14, -35);
    torusMesh.rotation.x = Math.PI / 3;
    scene.add(torusMesh);

    // Second Inner Ring with Radiant Cyan Glow
    const torusGeo2 = new THREE.TorusGeometry(28, 1.0, 16, 90);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const torusMesh2 = new THREE.Mesh(torusGeo2, torusMat2);
    torusMesh2.position.set(55, 14, -35);
    torusMesh2.rotation.y = Math.PI / 4;
    scene.add(torusMesh2);

    // ── 2. Floating Gold, Emerald & Cyan Value Nodes (Icosahedrons) ──
    const nodeGroup = new THREE.Group();
    const nodeCount = 28;
    const icosaGeo = new THREE.IcosahedronGeometry(3.0, 0);

    const nodeMats = [
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.55 }), // Gold
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.5 }), // Emerald
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.45 }), // Cyan
    ];

    const nodes: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number }; floatSpeed: number; initY: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const mat = nodeMats[i % nodeMats.length];
      const mesh = new THREE.Mesh(icosaGeo, mat);

      const x = (Math.random() - 0.5) * 240;
      const y = (Math.random() - 0.5) * 140;
      const z = (Math.random() - 0.5) * 80 - 25;

      mesh.position.set(x, y, z);
      const scale = Math.random() * 0.9 + 0.6;
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

    // ── 3. Expansive Ambient Particle Constellation ──
    const particleCount = 1400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colViolet = new THREE.Color(0x8b5cf6);
    const colGold = new THREE.Color(0xf59e0b);
    const colCyan = new THREE.Color(0x06b6d4);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 260;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 160;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 100 - 15;

      const r = Math.random();
      const c = r < 0.4 ? colViolet : (r < 0.75 ? colCyan : colGold);
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.35, 'rgba(139, 92, 246, 0.8)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const pTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      map: pTex,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ── Mouse & Resize Event Handlers ──
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetX = (x - 0.5) * 35;
      targetY = -(y - 0.5) * 25;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // ── Animation Loop ──
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0, 0, 0);

      // Rotate Torus Holograms
      torusMesh.rotation.z = elapsedTime * 0.2;
      torusMesh.rotation.y = elapsedTime * 0.15;
      torusMesh2.rotation.z = -elapsedTime * 0.25;
      torusMesh2.rotation.x = elapsedTime * 0.18;

      // Animate floating value nodes
      nodes.forEach((node) => {
        node.mesh.rotation.x += node.rotSpeed.x;
        node.mesh.rotation.y += node.rotSpeed.y;
        node.mesh.position.y = node.initY + Math.sin(elapsedTime * 1.5 + node.initY) * 3.5;
      });

      // Animate particle drift
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.05) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
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
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80 overflow-hidden w-full h-full"
      aria-hidden="true"
    />
  );
}
