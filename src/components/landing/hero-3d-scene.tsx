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
    scene.fog = new THREE.FogExp2(0x05070f, 0.0018);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 140);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Biomechanical Kinetic Wave Matrix (Particles representing spine & joint biomechanics)
    const particleCount = 1800;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x0088ff); // Electric blue
    const color2 = new THREE.Color(0x7c3aed); // Violet / Purple
    const color3 = new THREE.Color(0x34d399); // Healing emerald
    const colorGold = new THREE.Color(0xd4af37); // Metallic gold

    const rows = 45;
    const cols = 40;
    let pIdx = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (pIdx >= particleCount) break;

        const u = (i / (rows - 1)) * 2 - 1;
        const v = (j / (cols - 1)) * 2 - 1;

        const x = u * 130 + (Math.random() - 0.5) * 4;
        const y = v * 85 + (Math.random() - 0.5) * 4;
        const z = Math.sin(u * 3) * Math.cos(v * 3) * 20 + (Math.random() - 0.5) * 8;

        positions[pIdx * 3] = x;
        positions[pIdx * 3 + 1] = y;
        positions[pIdx * 3 + 2] = z;

        originalPositions[pIdx * 3] = x;
        originalPositions[pIdx * 3 + 1] = y;
        originalPositions[pIdx * 3 + 2] = z;

        // Color interpolation
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

        scales[pIdx] = Math.random() * 2.2 + 0.8;
        pIdx++;
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 64;
    canvasTexture.height = 64;
    const ctx = canvasTexture.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(124, 58, 237, 0.8)');
      gradient.addColorStop(0.7, 'rgba(0, 136, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvasTexture);

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 2. 3D Floating Synaptic Neural Nodes (Plexus)
    const nodeCount = 35;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = (Math.random() - 0.5) * 160;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.08,
        y: (Math.random() - 0.5) * 0.08,
        z: (Math.random() - 0.5) * 0.08,
      });
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 4.5,
      color: 0x5eead4,
      map: particleTexture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodeSystem = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodeSystem);

    // 3. Dynamic Connecting Line Mesh
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const maxLineSegments = nodeCount * nodeCount;
    const linePositions = new Float32Array(maxLineSegments * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // 4. Subtle 3D DNA / Spinal Helix Strand
    const helixPoints: THREE.Vector3[] = [];
    const helixPoints2: THREE.Vector3[] = [];
    const helixLength = 80;
    for (let i = 0; i < helixLength; i++) {
      const angle = i * 0.22;
      const y = (i - helixLength / 2) * 1.8;
      const radius = 12;
      helixPoints.push(new THREE.Vector3(Math.cos(angle) * radius + 55, y, Math.sin(angle) * radius));
      helixPoints2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius + 55, y, Math.sin(angle + Math.PI) * radius));
    }

    const helixCurve1 = new THREE.CatmullRomCurve3(helixPoints);
    const helixCurve2 = new THREE.CatmullRomCurve3(helixPoints2);

    const helixGeo1 = new THREE.BufferGeometry().setFromPoints(helixCurve1.getPoints(120));
    const helixGeo2 = new THREE.BufferGeometry().setFromPoints(helixCurve2.getPoints(120));

    const helixMat1 = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const helixMat2 = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const helixMesh1 = new THREE.Line(helixGeo1, helixMat1);
    const helixMesh2 = new THREE.Line(helixGeo2, helixMat2);

    const helixGroup = new THREE.Group();
    helixGroup.add(helixMesh1);
    helixGroup.add(helixMesh2);
    helixGroup.position.set(20, -5, -20);
    helixGroup.rotation.z = -0.3;
    scene.add(helixGroup);

    // Mouse Interaction
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

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
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
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0, 0, 0);

      // Animate kinetic biomechanical wave
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];

        // Harmonic wave oscillation resembling muscle activation & kinetic movement
        const wave1 = Math.sin(ox * 0.04 + elapsedTime * 1.2) * 5;
        const wave2 = Math.cos(oy * 0.05 + elapsedTime * 1.5) * 4;
        const wave3 = Math.sin((ox + oy) * 0.03 + elapsedTime * 0.8) * 3;

        posArray[i * 3 + 2] = originalPositions[i * 3 + 2] + wave1 + wave2 + wave3;
      }
      posAttr.needsUpdate = true;

      // Animate particle system slight rotation
      particleSystem.rotation.z = Math.sin(elapsedTime * 0.15) * 0.05;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.1) * 0.05;

      // Animate synaptic nodes
      const nPosAttr = nodeGeometry.attributes.position as THREE.BufferAttribute;
      const nPosArray = nPosAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        nPosArray[i * 3] += nodeVelocities[i].x;
        nPosArray[i * 3 + 1] += nodeVelocities[i].y;
        nPosArray[i * 3 + 2] += nodeVelocities[i].z;

        // Bounce within boundary
        if (Math.abs(nPosArray[i * 3]) > 80) nodeVelocities[i].x *= -1;
        if (Math.abs(nPosArray[i * 3 + 1]) > 50) nodeVelocities[i].y *= -1;
        if (Math.abs(nPosArray[i * 3 + 2]) > 30) nodeVelocities[i].z *= -1;
      }
      nPosAttr.needsUpdate = true;

      // Update connecting line segments
      let lineIndex = 0;
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const lPosArray = linePosAttr.array as Float32Array;
      const connectDist = 28;

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

      // Animate Helix Rotation
      helixGroup.rotation.y = elapsedTime * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
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
      className="absolute inset-0 pointer-events-none z-0 opacity-75 overflow-hidden"
      aria-hidden="true"
    />
  );
}
