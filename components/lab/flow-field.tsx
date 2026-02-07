"use client";

import { useEffect, useRef } from "react";
import { simplex2, seedNoise } from "./noise";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

interface FlowFieldCanvasProps {
  isPlaying: boolean;
  seed: number;
  particleCount: number;
  noiseScale: number;
  speed: number;
  trailLength: number;
}

export function FlowFieldCanvas({
  isPlaying,
  seed,
  particleCount,
  noiseScale,
  speed,
  trailLength,
}: FlowFieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  // Color palette - lime/emerald theme
  const colors = [
    "rgba(163, 230, 53, 0.6)",  // lime-400
    "rgba(132, 204, 22, 0.5)",  // lime-500
    "rgba(74, 222, 128, 0.5)",  // emerald-400
    "rgba(52, 211, 153, 0.4)",  // emerald-400
    "rgba(250, 204, 21, 0.4)",  // yellow-400
  ];

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    seedNoise(seed);
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    timeRef.current = 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
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

      // Fade trail effect
      ctx.fillStyle = `rgba(10, 10, 10, ${1 - trailLength})`;
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const time = timeRef.current;

      for (const p of particles) {
        // Get flow direction from noise
        const angle = simplex2(
          p.x * noiseScale + time * 0.0003,
          p.y * noiseScale + time * 0.0003
        ) * Math.PI * 4;

        // Apply force
        p.vx += Math.cos(angle) * 0.2;
        p.vy += Math.sin(angle) * 0.2;

        // Limit velocity
        const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (vel > speed) {
          p.vx = (p.vx / vel) * speed;
          p.vy = (p.vy / vel) * speed;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      timeRef.current += 16;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, noiseScale, speed, trailLength]);

  // Reinitialize when seed changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "rgb(10, 10, 10)";
    ctx.fillRect(0, 0, rect.width, rect.height);
    initParticles(rect.width, rect.height);
  }, [seed, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: "#0a0a0a" }}
    />
  );
}
