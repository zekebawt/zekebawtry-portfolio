"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: number;
}

interface ParticleLifeCanvasProps {
  isPlaying: boolean;
  seed: number;
  particleCount: number;
  forceStrength: number;
  radius: number;
  friction: number;
}

// Particle Life: emergent behavior from attraction/repulsion matrices
// Each particle type has different attraction to other types

export function ParticleLifeCanvas({
  isPlaying,
  seed,
  particleCount,
  forceStrength,
  radius,
  friction,
}: ParticleLifeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const attractionRef = useRef<number[][]>([]);

  // Number of particle types
  const NUM_TYPES = 5;

  // Color palette for each type
  const typeColors = [
    "#a3e635", // lime
    "#f59e0b", // amber
    "#ec4899", // pink
    "#3b82f6", // blue
    "#10b981", // emerald
  ];

  // Seeded random
  const seededRandom = (s: number) => {
    return () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
  };

  // Initialize particles and attraction matrix
  const initialize = (width: number, height: number) => {
    const random = seededRandom(seed);

    // Generate random attraction matrix
    // Values range from -1 (repel) to 1 (attract)
    attractionRef.current = Array.from({ length: NUM_TYPES }, () =>
      Array.from({ length: NUM_TYPES }, () => random() * 2 - 1)
    );

    // Create particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: random() * width,
      y: random() * height,
      vx: 0,
      vy: 0,
      type: Math.floor(random() * NUM_TYPES),
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initialize(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [seed, particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const animate = () => {
      if (!isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear with slight trail
      ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const attraction = attractionRef.current;

      // Calculate forces
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        let fx = 0;
        let fy = 0;

        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue;

          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 0 && dist < radius) {
            // Get attraction value from matrix
            const attract = attraction[p1.type][p2.type];

            // Force function: attraction at mid-range, repulsion at close range
            let force: number;
            if (dist < radius * 0.3) {
              // Strong repulsion at close range (prevents clumping)
              force = -1 * (1 - dist / (radius * 0.3));
            } else {
              // Attraction/repulsion based on matrix
              const normalDist = (dist - radius * 0.3) / (radius * 0.7);
              force = attract * (1 - normalDist);
            }

            // Apply force
            fx += (dx / dist) * force * forceStrength * 0.1;
            fy += (dy / dist) * force * forceStrength * 0.1;
          }
        }

        // Update velocity
        p1.vx += fx;
        p1.vy += fy;

        // Apply friction
        p1.vx *= friction;
        p1.vy *= friction;

        // Update position
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around edges
        if (p1.x < 0) p1.x += width;
        if (p1.x > width) p1.x -= width;
        if (p1.y < 0) p1.y += height;
        if (p1.y > height) p1.y -= height;
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = typeColors[p.type];
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, forceStrength, radius, friction]);

  // Reinitialize on seed change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "rgb(10, 10, 10)";
    ctx.fillRect(0, 0, rect.width, rect.height);
    initialize(rect.width, rect.height);
  }, [seed, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: "#0a0a0a" }}
    />
  );
}
