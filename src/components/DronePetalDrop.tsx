'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
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

export default function DronePetalDrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const droneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const droneEl = droneRef.current;
    if (!canvas || !droneEl) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isMobile = width < 768;

    // Responsive drone parameters (scaled down & slowed on mobile), recomputed
    // whenever the viewport size crosses the mobile breakpoint.
    let droneWidth = 0;
    let droneHeight = 0;
    let bucketOffsetX = 0;
    let bucketOffsetY = 0;
    let bucketMouthWidth = 0;
    let droneSpeed = 0; // legacy px/frame @60fps reference, converted to a GSAP duration per flight
    let flightDistance = 0;
    let maxPetals = 0;

    const computeDroneParams = () => {
      droneWidth = isMobile ? 150 : 240;
      droneHeight = droneWidth / 1.79356;
      bucketOffsetX = droneWidth * 0.5037;
      bucketOffsetY = droneHeight * 0.898;
      bucketMouthWidth = droneWidth * (230 / 669);
      droneSpeed = isMobile ? 1.5 : 4.2;
      flightDistance = width + droneWidth + 120;
      maxPetals = isMobile ? 800 : 1800;
    };
    computeDroneParams();

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
      computeDroneParams();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

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

    // Create a new petal emerging directly from the bucket opening, with a
    // randomized depth (z) so the stream reads as a 3D cloud rather than a
    // flat curtain — near petals are bigger, faster, and more opaque.
    const createPetal = (originX: number, originY: number) => {
      if (petals.length >= maxPetals) return;

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

    const ctxScope = gsap.context(() => {
      // ==========================================
      // DRONE FLIGHT — fully GSAP-driven
      // ==========================================
      // `proxy` is the single source of truth for the drone's on-screen
      // position/opacity/scale. GSAP tweens write into it; `syncDrone`
      // reads it once per update and applies a single transform, so every
      // moving part (entrance fade, forward flight, exit fade, hover bob)
      // composites into one clean write instead of scattered style writes.
      const proxy = { x: -droneWidth - 40, y: height * 0.16, hoverY: 0, opacity: 0, scale: 0.85 };

      let flightTl: gsap.core.Timeline | null = null;
      let hoverTween: gsap.core.Tween | null = null;
      let flightActive = false;
      let spawnCounter = 0;

      const syncDrone = () => {
        const finalY = proxy.y + proxy.hoverY;
        droneEl.style.transform = `translate3d(${proxy.x}px, ${finalY}px, 0) scale(${proxy.scale})`;
        droneEl.style.opacity = String(proxy.opacity);
      };

      const stopHover = () => {
        hoverTween?.kill();
        hoverTween = null;
      };

      // A gentle, continuous hover bob — built from GSAP's own sine easing
      // via a yoyo tween rather than a hand-rolled Math.sin loop. This is
      // what makes the drone read as "hovering" while it drifts forward.
      const startHover = (amplitude: number) => {
        stopHover();
        proxy.hoverY = 0;
        hoverTween = gsap.to(proxy, {
          hoverY: amplitude,
          duration: 1.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          onUpdate: syncDrone,
        });
      };

      const scheduleNextFlight = () => {
        gsap.delayedCall(60, launchFlight);
      };

      const launchFlight = () => {
        if (prefersReducedMotion) return;

        computeDroneParams(); // pick up the latest responsive values before each flight

        const baseY = height * (isMobile ? 0.12 + Math.random() * 0.05 : 0.14 + Math.random() * 0.08);
        const hoverAmplitude = isMobile ? 7 : 10;
        // Preserve the original px/frame@60fps speed feel, expressed as a
        // GSAP tween duration in seconds.
        const flightSeconds = flightDistance / (droneSpeed * 60);
        const fadeSeconds = flightSeconds * 0.12;

        gsap.set(proxy, { x: -droneWidth - 40, y: baseY, hoverY: 0, opacity: 0, scale: 0.85 });
        syncDrone();
        droneEl.style.visibility = 'visible';
        flightActive = true;
        spawnCounter = 0;
        startHover(hoverAmplitude);

        flightTl = gsap.timeline({
          onComplete: () => {
            flightActive = false;
            droneEl.style.visibility = 'hidden';
            stopHover();
            scheduleNextFlight();
          },
        });

        flightTl
          .to(proxy, { opacity: 1, scale: 1, duration: fadeSeconds, ease: 'power2.out', onUpdate: syncDrone }, 0)
          .to(
            proxy,
            { x: width + droneWidth + 80, duration: flightSeconds, ease: 'power2.inOut', onUpdate: syncDrone },
            0
          )
          .to(
            proxy,
            { opacity: 0, scale: 0.9, duration: fadeSeconds, ease: 'power2.in', onUpdate: syncDrone },
            Math.max(0, flightSeconds - fadeSeconds)
          );
      };

      if (prefersReducedMotion) {
        droneEl.style.visibility = 'hidden';
      } else {
        launchFlight();
      }

      // ==========================================
      // PETAL PARTICLE FIELD — shares GSAP's ticker
      // ==========================================
      // Petals are a large, per-pixel canvas particle system (up to 1800
      // instances), which is far cheaper to run as one procedural loop than
      // as individual GSAP tweens. Hooking that loop into gsap.ticker keeps
      // it on the exact same clock as the drone tweens above, instead of a
      // second unsynced requestAnimationFrame loop racing against GSAP's.
      let isTabVisible = true;
      const onVisibilityChange = () => {
        isTabVisible = document.visibilityState === 'visible';
        if (isTabVisible) {
          flightTl?.resume();
          hoverTween?.resume();
        } else {
          flightTl?.pause();
          hoverTween?.pause();
        }
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      const spawnFromBucket = () => {
        const finalY = proxy.y + proxy.hoverY;
        if (proxy.x <= -droneWidth + 15 || proxy.x >= width + 30) return;

        const bucketX = proxy.x + bucketOffsetX;
        const bucketY = finalY + bucketOffsetY;
        spawnCounter += 1;
        const spawnEvery = isMobile ? 2 : 1 + Math.round(Math.sin(gsap.ticker.time * 3) * 0.5 + 0.5);
        if (spawnCounter >= spawnEvery) {
          createPetal(bucketX, bucketY);
          spawnCounter = 0;
        }
      };

      const tick = (time: number) => {
        if (!isTabVisible) return;

        ctx.clearRect(0, 0, width, height);

        if (flightActive) spawnFromBucket();

        if (petals.length > 0) {
          const gust = Math.sin(time * 0.35) * 0.5 + Math.sin(time * 0.9 + 1.7) * 0.3;

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

            drawPetal(p, time);

            if (p.y > height + 30 || p.opacity <= 0.01) {
              petals.splice(i, 1);
            }
          }
        }
      };

      gsap.ticker.add(tick);

      return () => {
        document.removeEventListener('visibilitychange', onVisibilityChange);
        gsap.ticker.remove(tick);
      };
    }, canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ctxScope.revert(); // kills the flight timeline, hover tween, pending delayedCall, and the ticker listener
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