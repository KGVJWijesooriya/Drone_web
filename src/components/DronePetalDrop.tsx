'use client';

import React, { useEffect, useRef } from 'react';
import styles from '@/styles/dronePetalDrop.module.css';

interface Petal {
  x: number;
  y: number;
  z: number; // depth factor 0.5 (far/small) - 1.3 (near/large), drives size + speed + alpha
  size: number;
  speedY: number;
  driftPhase: number;
  driftSpeed: number;
  angle: number; // in-plane rotation (Z axis)
  angleSpeed: number;
  flip: number; // simulated 3D tumble (X/Y axis) — drives autorotation
  flipSpeed: number;
  color: string;
  highlight: string;
  opacity: number;
  baseOpacity: number;
  swayAmplitude: number;
  swayOffset: number;
  wobble: number; // per-petal randomness seed for organic flutter
}

type Timeout = ReturnType<typeof setTimeout>;

// Cheap smoothstep-style easing for the drone's entrance/exit glide.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function DronePetalDrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const droneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Responsive drone parameters (scaled down & slowed down on mobile devices)
    let isMobile = width < 768;
    let droneWidth = isMobile ? 150 : 240;
    let droneHeight = droneWidth / 1.79356;
    let bucketOffsetX = droneWidth * 0.5037;
    let bucketOffsetY = droneHeight * 0.898;
    let bucketMouthWidth = droneWidth * (230 / 669);
    // Slow, graceful flight on mobile (1.5 px/frame) vs desktop (4.2 px/frame)
    let droneSpeed = isMobile ? 1.5 : 4.2;
    let flightDistance = width + droneWidth + 120;

    // Crisp on retina screens without paying full cost on ultra-high-DPI displays.
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      isMobile = width < 768;
      droneWidth = isMobile ? 150 : 240;
      droneHeight = droneWidth / 1.79356;
      bucketOffsetX = droneWidth * 0.5037;
      bucketOffsetY = droneHeight * 0.898;
      bucketMouthWidth = droneWidth * (230 / 669);
      droneSpeed = isMobile ? 1.5 : 4.2;
      flightDistance = width + droneWidth + 120;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const MAX_PETALS = isMobile ? 800 : 1800;

    const petals: Petal[] = [];
    // Each entry pairs a base petal color with a soft, slightly warmer highlight
    // used to fake a light-catching sheen as the petal tumbles — cheap 2-tone
    // shading instead of a per-petal gradient, which keeps animation smooth.
    const petalPalette: { base: string; highlight: string }[] = [
      { base: '#e63946', highlight: '#ff8fa3' },
      { base: '#d90429', highlight: '#ff5c7a' },
      { base: '#9d0208', highlight: '#d6455f' },
      { base: '#c9184a', highlight: '#ff6f91' },
      { base: '#ff4d6d', highlight: '#ffb3c1' },
      { base: '#800f2f', highlight: '#c2455f' },
      { base: '#ff758f', highlight: '#ffd6de' },
    ];

    let droneX = -droneWidth - 40;
    let droneY = height * (isMobile ? 0.14 : 0.18);
    let flightProgress = 0; // 0 -> 1 across the full flight
    let flightTime = 0;

    // Flight schedule state: true immediately on first load, then triggers every 1 min
    let isFlying = !prefersReducedMotion;
    const FLIGHT_INTERVAL_MS = 60000;
    let nextFlightTimer: Timeout | null = null;

    const startNextFlightSchedule = () => {
      if (nextFlightTimer) clearTimeout(nextFlightTimer);
      nextFlightTimer = setTimeout(() => {
        droneX = -droneWidth - 40;
        droneY = height * (isMobile ? 0.12 + Math.random() * 0.05 : 0.14 + Math.random() * 0.08);
        flightTime = 0;
        flightProgress = 0;
        isFlying = true;
      }, FLIGHT_INTERVAL_MS);
    };

    // Create a new petal emerging directly from the bucket opening, with a
    // randomized depth (z) so the stream reads as a 3D cloud rather than a
    // flat curtain — near petals are bigger, faster, and more opaque.
    const createPetal = (originX: number, originY: number) => {
      if (petals.length >= MAX_PETALS) return;

      const z = Math.random() * 0.8 + 0.5; // 0.5 (far) .. 1.3 (near)
      const baseOpacity = (Math.random() * 0.2 + 0.7) * Math.min(1, z);
      const palette = petalPalette[Math.floor(Math.random() * petalPalette.length)];
      const baseSize = isMobile ? 4 : 5;

      petals.push({
        x: originX + (Math.random() - 0.5) * (bucketMouthWidth * 0.9),
        y: originY + Math.random() * 3,
        z,
        size: (Math.random() * baseSize + (isMobile ? 6 : 8)) * z,
        speedY: (Math.random() * 0.45 + 0.5) * z,
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.012 + 0.006,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.025,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.03 + 0.02,
        color: palette.base,
        highlight: palette.highlight,
        opacity: baseOpacity,
        baseOpacity,
        swayAmplitude: (Math.random() * 1.5 + 0.8) * z,
        swayOffset: Math.random() * Math.PI * 2,
        wobble: Math.random() * 1000,
      });
    };

    // Draw a natural, slightly asymmetric petal shape with a soft light/shadow
    // two-tone fill so the tumble reads as genuine 3D rotation rather than a
    // flat card being squished.
    const drawPetal = (p: Petal, windowTime: number) => {
      const flipSin = Math.sin(p.flip);
      const flipCos = Math.cos(p.flip);
      const crossSection = Math.max(0.08, Math.abs(flipCos));

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(crossSection, 1);

      const s = p.size;
      const asym = Math.sin(p.wobble + windowTime * 0.5) * s * 0.08;

      ctx.beginPath();
      ctx.moveTo(0, -s * 0.05);
      ctx.bezierCurveTo(-s * 0.55 + asym, -s * 0.5, -s * 0.95, s * 0.3, 0, s);
      ctx.bezierCurveTo(s * 0.95, s * 0.3, s * 0.55 + asym, -s * 0.5, 0, -s * 0.05);
      ctx.closePath();

      const lightAmount = (flipSin + 1) / 2;
      ctx.fillStyle = lightAmount > 0.6 ? p.highlight : p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      // Thin center vein/highlight streak
      if (s > 8) {
        ctx.globalAlpha = p.opacity * 0.35;
        ctx.strokeStyle = p.highlight;
        ctx.lineWidth = Math.max(0.5, s * 0.04);
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.05);
        ctx.quadraticCurveTo(asym * 0.4, s * 0.45, 0, s * 0.92);
        ctx.stroke();
      }

      ctx.restore();
    };

    let animationFrameId: number;
    let isTabVisible = true;

    const onVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    let lastSpawn = 0;

    const animate = (t: number) => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      if (isFlying) {
        flightTime += 0.035;

        // Smooth easing for the flight trajectory across screen
        const rawProgress = Math.min(1, flightProgress + droneSpeed / flightDistance);
        flightProgress = rawProgress;
        const eased = easeInOutCubic(flightProgress);
        droneX = -droneWidth - 40 + eased * flightDistance;

        const hoverAmplitude = isMobile ? 7 : 10;
        const currentDroneY = droneY + Math.sin(flightTime) * hoverAmplitude + Math.cos(flightTime * 0.6) * 3;

        if (droneRef.current) {
          droneRef.current.style.transform = `translate3d(${droneX}px, ${currentDroneY}px, 0)`;
          droneRef.current.style.visibility = 'visible';
        }

        // Emit petals continuously from the bucket mouth while on screen
        if (droneX > -droneWidth + 15 && droneX < width + 30) {
          const bucketX = droneX + bucketOffsetX;
          const bucketY = currentDroneY + bucketOffsetY;
          lastSpawn += 1;
          const spawnEvery = isMobile ? 2 : (1 + Math.round(Math.sin(flightTime * 3) * 0.5 + 0.5));
          if (lastSpawn >= spawnEvery) {
            createPetal(bucketX, bucketY);
            lastSpawn = 0;
          }
        }

        if (flightProgress >= 1) {
          isFlying = false;
          if (droneRef.current) {
            droneRef.current.style.visibility = 'hidden';
            droneRef.current.style.transform = `translate3d(-500px, -500px, 0)`;
          }
          startNextFlightSchedule();
        }
      }

      if (petals.length > 0) {
        const gust = Math.sin(t * 0.00035) * 0.5 + Math.sin(t * 0.0009 + 1.7) * 0.3;

        for (let i = petals.length - 1; i >= 0; i--) {
          const p = petals[i];

          const flipCos = Math.cos(p.flip);
          const resistance = 1 - Math.abs(flipCos) * 0.35;
          p.y += p.speedY * (0.65 + resistance);

          p.driftPhase += p.driftSpeed;
          const flutter = Math.sin(p.driftPhase) * p.swayAmplitude;
          p.x += flutter + gust * p.z;

          p.angle += p.angleSpeed + gust * 0.01;
          p.flip += p.flipSpeed;

          // Gradual fade out at the bottom of the viewport
          const bottomThreshold = height - 80;
          if (p.y > bottomThreshold) {
            const fadeProgress = (p.y - bottomThreshold) / 80;
            p.opacity = Math.max(0, p.baseOpacity * (1 - fadeProgress));
          }

          drawPetal(p, t * 0.001);

          if (p.y > height + 30 || p.opacity <= 0.01) {
            petals.splice(i, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      if (nextFlightTimer) clearTimeout(nextFlightTimer);
    };
  }, []);

  return (
    <div className={styles.overlay} aria-hidden="true">
      {/* Drone Hardware Layer */}
      <div ref={droneRef} className={styles.droneContainer}>
        <img src="/drone.png" alt="" className={styles.droneImage} draggable={false} />
      </div>

      {/* Rose Petals Canvas Particle Layer */}
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}