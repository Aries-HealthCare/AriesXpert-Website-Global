'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let canvas: HTMLCanvasElement;
    try {
      canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02050e, 0.0012);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 140);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── 1. KINETIC BIOMECHANICAL NEURAL WAVE (3,200 Interactive Particles) ──
    const particleCount = 3200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x00d2ff); // Radiant electric cyan
    const color2 = new THREE.Color(0x7c3aed); // Deep royal violet
    const color3 = new THREE.Color(0x10b981); // Clinical emerald
    const colorGold = new THREE.Color(0xf59e0b); // Luxury amber gold

    const rows = 64;
    const cols = 50;
    let pIdx = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (pIdx >= particleCount) break;

        const u = (i / (rows - 1)) * 2 - 1;
        const v = (j / (cols - 1)) * 2 - 1;

        // Expanded wave dimensions to span full widescreen displays
        const x = u * 210 + (Math.random() - 0.5) * 6;
        const y = v * 125 + (Math.random() - 0.5) * 6;
        const z = Math.sin(u * 2.6) * Math.cos(v * 2.6) * 26 + (Math.random() - 0.5) * 8;

        positions[pIdx * 3] = x;
        positions[pIdx * 3 + 1] = y;
        positions[pIdx * 3 + 2] = z;

        originalPositions[pIdx * 3] = x;
        originalPositions[pIdx * 3 + 1] = y;
        originalPositions[pIdx * 3 + 2] = z;

        // Rich Multi-Stage Color Gradient
        const mixRatio = (u + 1) / 2;
        const col = new THREE.Color();
        if (mixRatio < 0.35) {
          col.lerpColors(color1, color2, mixRatio / 0.35);
        } else if (mixRatio < 0.75) {
          col.lerpColors(color2, color3, (mixRatio - 0.35) / 0.4);
        } else {
          col.lerpColors(color3, colorGold, (mixRatio - 0.75) / 0.25);
        }

        colors[pIdx * 3] = col.r;
        colors[pIdx * 3 + 1] = col.g;
        colors[pIdx * 3 + 2] = col.b;

        scales[pIdx] = Math.random() * 2.4 + 1.2;
        pIdx++;
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture with Soft Glowing Gaussian Falloff
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 64;
    canvasTexture.height = 64;
    const ctx = canvasTexture.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(0, 210, 255, 0.95)');
      gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.45)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvasTexture);

    const particleMaterial = new THREE.PointsMaterial({
      size: 3.4,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // ── 2. SYNAPTIC NEURAL PLEXUS NODES ──
    const nodeCount = 48;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = (Math.random() - 0.5) * 230;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 135;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.08,
        y: (Math.random() - 0.5) * 0.08,
        z: (Math.random() - 0.5) * 0.08,
      });
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 5.5,
      color: 0x38bdf8,
      map: particleTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodeSystem = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodeSystem);

    // ── 3. DYNAMIC CONNECTING SYNAPSE LINES ──
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const maxLineSegments = nodeCount * nodeCount;
    const linePositions = new Float32Array(maxLineSegments * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // ── 4. 3D BIOMECHANICAL DNA / SPINAL RESTORATION HELIX ──
    const helixPoints: THREE.Vector3[] = [];
    const helixPoints2: THREE.Vector3[] = [];
    const helixLength = 100;
    for (let i = 0; i < helixLength; i++) {
      const angle = i * 0.22;
      const y = (i - helixLength / 2) * 2.2;
      const radius = 16;
      helixPoints.push(new THREE.Vector3(Math.cos(angle) * radius + 75, y, Math.sin(angle) * radius - 20));
      helixPoints2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius + 75, y, Math.sin(angle + Math.PI) * radius - 20));
    }

    const helixCurve1 = new THREE.CatmullRomCurve3(helixPoints);
    const helixCurve2 = new THREE.CatmullRomCurve3(helixPoints2);

    const helixGeo1 = new THREE.BufferGeometry().setFromPoints(helixCurve1.getPoints(160));
    const helixGeo2 = new THREE.BufferGeometry().setFromPoints(helixCurve2.getPoints(160));

    const helixMat1 = new THREE.LineBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
    });
    const helixMat2 = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });

    const helixMesh1 = new THREE.Line(helixGeo1, helixMat1);
    const helixMesh2 = new THREE.Line(helixGeo2, helixMat2);

    const helixGroup = new THREE.Group();
    helixGroup.add(helixMesh1);
    helixGroup.add(helixMesh2);
    helixGroup.position.set(40, -6, -20);
    helixGroup.rotation.z = -0.25;
    scene.add(helixGroup);

    // ── MOUSE PARALLAX TRACKING ──
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetX = (x - 0.5) * 40;
      targetY = -(y - 0.5) * 28;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── RESPONSIVE FULL-SCREEN RESIZE HANDLER ──
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

    // ── ANIMATION LOOP ──
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0, 0, 0);

      // Animate kinetic wave oscillation
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];

        const wave1 = Math.sin(ox * 0.03 + elapsedTime * 1.2) * 6.5;
        const wave2 = Math.cos(oy * 0.04 + elapsedTime * 1.5) * 5.5;
        const wave3 = Math.sin((ox + oy) * 0.02 + elapsedTime * 0.8) * 4;

        posArray[i * 3 + 2] = originalPositions[i * 3 + 2] + wave1 + wave2 + wave3;
      }
      posAttr.needsUpdate = true;

      // Gentle global rotation
      particleSystem.rotation.z = Math.sin(elapsedTime * 0.1) * 0.05;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.07) * 0.03;

      // Animate synaptic node movements
      const nPosAttr = nodeGeometry.attributes.position as THREE.BufferAttribute;
      const nPosArray = nPosAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        nPosArray[i * 3] += nodeVelocities[i].x;
        nPosArray[i * 3 + 1] += nodeVelocities[i].y;
        nPosArray[i * 3 + 2] += nodeVelocities[i].z;

        if (Math.abs(nPosArray[i * 3]) > 115) nodeVelocities[i].x *= -1;
        if (Math.abs(nPosArray[i * 3 + 1]) > 68) nodeVelocities[i].y *= -1;
        if (Math.abs(nPosArray[i * 3 + 2]) > 40) nodeVelocities[i].z *= -1;
      }
      nPosAttr.needsUpdate = true;

      // Connect near synapse nodes
      let lineIndex = 0;
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const lPosArray = linePosAttr.array as Float32Array;
      const connectDist = 34;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nPosArray[i * 3] - nPosArray[j * 3];
          const dy = nPosArray[i * 3 + 1] - nPosArray[j * 3 + 1];
          const dz = nPosArray[i * 3 + 2] - nPosArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectDist) {
            lPosArray[lineIndex++] = nPosArray[i * 3];
            lPosArray[lineIndex++] = nPosArray[i * 3 + 1];
            lPosArray[lineIndex++] = nPosArray[i * 3 + 2];

            lPosArray[lineIndex++] = nPosArray[j * 3];
            lPosArray[lineIndex++] = nPosArray[j * 3 + 1];
            lPosArray[lineIndex++] = nPosArray[j * 3 + 2];
          }
        }
      }
      lineGeometry.setDrawRange(0, lineIndex / 3);
      linePosAttr.needsUpdate = true;

      // Rotate DNA / Spinal Helix
      helixGroup.rotation.y = elapsedTime * 0.3;

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
      particleGeometry.dispose();
      particleMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      helixGeo1.dispose();
      helixGeo2.dispose();
      helixMat1.dispose();
      helixMat2.dispose();
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
