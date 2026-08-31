'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Experts3DScene() {
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

    // ── 1. Concentric Biometric Verification Rings (Three.js Wireframe) ──
    const ringGeo1 = new THREE.TorusGeometry(36, 1.2, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.position.set(-50, 15, -30);
    ringMesh1.rotation.x = Math.PI / 3.5;
    scene.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(24, 0.9, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.26,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.position.set(-50, 15, -30);
    ringMesh2.rotation.y = Math.PI / 4;
    scene.add(ringMesh2);

    // ── 2. Floating Clinical Accreditation Nodes (Icosahedrons) ──
    const nodeGroup = new THREE.Group();
    const nodeCount = 20;
    const icosaGeo = new THREE.IcosahedronGeometry(2.6, 0);

    const nodeMats = [
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.5 }), // Cyan
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.45 }), // Emerald
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.5 }), // Gold
    ];

    const nodes: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number }; floatSpeed: number; initY: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const mat = nodeMats[i % nodeMats.length];
      const mesh = new THREE.Mesh(icosaGeo, mat);

      const x = (Math.random() - 0.5) * 230;
      const y = (Math.random() - 0.5) * 130;
      const z = (Math.random() - 0.5) * 70 - 20;

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

    // ── 3. Expansive Ambient Medical Constellation Field ──
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colCyan = new THREE.Color(0x38bdf8);
    const colViolet = new THREE.Color(0x8b5cf6);
    const colEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 250;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 150;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 90 - 10;

      const r = Math.random();
      const c = r < 0.4 ? colCyan : (r < 0.75 ? colViolet : colEmerald);
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
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.85)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const pTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 2.6,
      vertexColors: true,
      map: pTex,
      transparent: true,
      opacity: 0.72,
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

      // Rotate biometric rings
      ringMesh1.rotation.z = elapsedTime * 0.18;
      ringMesh1.rotation.y = elapsedTime * 0.12;
      ringMesh2.rotation.z = -elapsedTime * 0.22;
      ringMesh2.rotation.x = elapsedTime * 0.15;

      // Animate floating nodes
      nodes.forEach((node) => {
        node.mesh.rotation.x += node.rotSpeed.x;
        node.mesh.rotation.y += node.rotSpeed.y;
        node.mesh.position.y = node.initY + Math.sin(elapsedTime * 1.4 + node.initY) * 3.0;
      });

      // Animate particle constellation
      particleSystem.rotation.y = elapsedTime * 0.025;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.04) * 0.02;

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
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
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
