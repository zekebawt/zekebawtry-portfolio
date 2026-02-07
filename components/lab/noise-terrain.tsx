"use client";

import { useEffect, useRef } from "react";
import { fbm, seedNoise } from "./noise";

interface NoiseTerrainCanvasProps {
  isPlaying: boolean;
  seed: number;
  octaves: number;
  persistence: number;
  scale: number;
  heightMultiplier: number;
}

// Noise Terrain: Real-time procedural landscape visualization
// Uses FBM (Fractal Brownian Motion) for natural-looking terrain

export function NoiseTerrainCanvas({
  isPlaying,
  seed,
  octaves,
  persistence,
  scale,
  heightMultiplier,
}: NoiseTerrainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  // Height to color mapping (terrain colors)
  const getTerrainColor = (height: number): string => {
    // Normalize height to 0-1
    const h = Math.max(0, Math.min(1, (height + 1) / 2));

    if (h < 0.3) {
      // Deep water to shallow water
      const t = h / 0.3;
      return `rgb(${Math.floor(20 + t * 20)}, ${Math.floor(40 + t * 60)}, ${Math.floor(80 + t * 40)})`;
    } else if (h < 0.4) {
      // Beach/sand
      const t = (h - 0.3) / 0.1;
      return `rgb(${Math.floor(180 + t * 30)}, ${Math.floor(160 + t * 40)}, ${Math.floor(100 + t * 30)})`;
    } else if (h < 0.6) {
      // Grass/vegetation
      const t = (h - 0.4) / 0.2;
      return `rgb(${Math.floor(50 + t * 30)}, ${Math.floor(120 - t * 30)}, ${Math.floor(50 + t * 20)})`;
    } else if (h < 0.75) {
      // Forest/hills
      const t = (h - 0.6) / 0.15;
      return `rgb(${Math.floor(40 + t * 20)}, ${Math.floor(80 - t * 20)}, ${Math.floor(40 + t * 10)})`;
    } else if (h < 0.9) {
      // Mountains/rock
      const t = (h - 0.75) / 0.15;
      return `rgb(${Math.floor(80 + t * 40)}, ${Math.floor(70 + t * 40)}, ${Math.floor(60 + t * 40)})`;
    } else {
      // Snow peaks
      const t = (h - 0.9) / 0.1;
      return `rgb(${Math.floor(200 + t * 55)}, ${Math.floor(200 + t * 55)}, ${Math.floor(210 + t * 45)})`;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Lower resolution for performance
      canvas.width = Math.floor(rect.width / 2);
      canvas.height = Math.floor(rect.height / 2);
    };

    resize();
    window.addEventListener("resize", resize);
    seedNoise(seed);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [seed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const animate = () => {
      if (!isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const time = timeRef.current * 0.0005;

      // Generate terrain
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Get noise value with time offset for animation
          const nx = x * scale + time;
          const ny = y * scale;

          const noiseValue = fbm(nx, ny, octaves, persistence);

          // Get terrain color
          const color = getTerrainColor(noiseValue);
          
          // Parse color and apply to image data
          const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (match) {
            const i = (y * width + x) * 4;
            data[i] = parseInt(match[1]);
            data[i + 1] = parseInt(match[2]);
            data[i + 2] = parseInt(match[3]);
            data[i + 3] = 255;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      timeRef.current += 16;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, octaves, persistence, scale, heightMultiplier]);

  // Reset on seed change
  useEffect(() => {
    seedNoise(seed);
    timeRef.current = 0;
  }, [seed]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ 
        background: "#0a0a0a",
        imageRendering: "pixelated" // Intentional pixelated aesthetic
      }}
    />
  );
}
