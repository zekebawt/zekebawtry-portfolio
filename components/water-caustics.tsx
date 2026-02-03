"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * WaterCaustics - A custom WebGL shader component that renders beautiful
 * water caustic/refraction patterns as a subtle background effect.
 * 
 * Based on the classic Shadertoy caustics shader,
 * adapted for React with performance optimizations.
 * 
 * Design requirements:
 * - Dark base (#191D19)
 * - Subtle caustic light patterns (muted sage/rose tones)
 * - Slow animation (3-5 second effective loops)
 * - Text must be readable over it
 * - Mobile-friendly & 60fps
 */

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Water caustics fragment shader
// Creates realistic water refraction light patterns
const FRAGMENT_SHADER = `
  precision highp float;
  
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_intensity;
  uniform vec3 u_baseColor;
  uniform vec3 u_causticColor;
  uniform vec3 u_causticColor2;
  
  #define TAU 6.28318530718
  #define MAX_ITER 4
  
  // Classic water caustic effect
  // Based on https://www.shadertoy.com/view/MdlXz8
  float causticPattern(vec2 uv, float time) {
    vec2 p = mod(uv * TAU, TAU) - 250.0;
    vec2 i = vec2(p);
    float c = 1.0;
    float inten = 0.005;
    
    for (int n = 0; n < MAX_ITER; n++) {
      float t = time * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    
    c /= float(MAX_ITER);
    c = 1.17 - pow(c, 1.4);
    float result = pow(abs(c), 8.0);
    return clamp(result, 0.0, 1.0);
  }
  
  // Second layer with offset parameters for depth
  float causticPattern2(vec2 uv, float time) {
    vec2 p = mod(uv * TAU * 0.8, TAU) - 250.0;
    vec2 i = vec2(p);
    float c = 1.0;
    float inten = 0.004;
    
    for (int n = 0; n < MAX_ITER; n++) {
      float t = time * (1.0 - (4.0 / float(n + 1)));
      i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    
    c /= float(MAX_ITER);
    c = 1.17 - pow(c, 1.5);
    float result = pow(abs(c), 7.0);
    return clamp(result, 0.0, 1.0);
  }
  
  void main() {
    // Normalize coordinates with aspect ratio
    vec2 uv = v_uv;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    
    // Very slow animation for meditative feel
    float slowTime = u_time * 0.08;
    
    // Two caustic layers with different scales and speeds
    float c1 = causticPattern(uv * 1.5, slowTime);
    float c2 = causticPattern2(uv * 2.0 + 0.5, slowTime * 0.7 + 1.0);
    
    // Blend the two layers with chromatic offset
    float causticR = c1 * 0.7 + c2 * 0.3;
    float causticG = mix(c1, c2, 0.5);
    float causticB = c1 * 0.3 + c2 * 0.7;
    
    // Apply intensity
    causticR *= u_intensity;
    causticG *= u_intensity;
    causticB *= u_intensity;
    
    // Mix caustic colors with slight chromatic separation
    vec3 causticFinal = vec3(
      causticR * u_causticColor.r + causticB * u_causticColor2.r * 0.3,
      causticG * u_causticColor.g + causticG * u_causticColor2.g * 0.2,
      causticB * u_causticColor.b + causticR * u_causticColor2.b * 0.3
    );
    
    // Final color: dark base with caustic overlay
    vec3 finalColor = u_baseColor + causticFinal;
    
    // Subtle vignette to fade edges
    float vignette = 1.0 - length(v_uv - 0.5) * 0.4;
    vignette = smoothstep(0.0, 1.0, vignette);
    finalColor *= vignette;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface WaterCausticsProps {
  className?: string;
  intensity?: number; // 0-1, controls brightness of caustics
  baseColor?: [number, number, number]; // RGB 0-1, background color
  causticColor?: [number, number, number]; // Primary caustic color
  causticColor2?: [number, number, number]; // Secondary caustic color for depth
}

export function WaterCaustics({
  className = "",
  intensity = 0.25,
  baseColor = [0.098, 0.114, 0.098], // #191D19
  causticColor = [0.341, 0.412, 0.325], // Sage green #576953
  causticColor2 = [0.8, 0.545, 0.525], // Muted rose #CC8B86
}: WaterCausticsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<{
    time: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    intensity: WebGLUniformLocation | null;
    baseColor: WebGLUniformLocation | null;
    causticColor: WebGLUniformLocation | null;
    causticColor2: WebGLUniformLocation | null;
  }>({
    time: null,
    resolution: null,
    intensity: null,
    baseColor: null,
    causticColor: null,
    causticColor2: null,
  });

  const createShader = useCallback(
    (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    },
    []
  );

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      console.warn("WebGL not supported, falling back to static background");
      return false;
    }

    glRef.current = gl;

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return false;

    // Create program
    const program = gl.createProgram();
    if (!program) return false;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return false;
    }

    programRef.current = program;
    gl.useProgram(program);

    // Create fullscreen quad
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    uniformsRef.current = {
      time: gl.getUniformLocation(program, "u_time"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      intensity: gl.getUniformLocation(program, "u_intensity"),
      baseColor: gl.getUniformLocation(program, "u_baseColor"),
      causticColor: gl.getUniformLocation(program, "u_causticColor"),
      causticColor2: gl.getUniformLocation(program, "u_causticColor2"),
    };

    return true;
  }, [createShader]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    if (!canvas || !gl) return;

    // Use lower resolution for performance (especially on mobile)
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const width = Math.floor(canvas.clientWidth * dpr);
    const height = Math.floor(canvas.clientHeight * dpr);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }, []);

  const render = useCallback(
    (time: number) => {
      const gl = glRef.current;
      const uniforms = uniformsRef.current;
      if (!gl || !uniforms.time) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }

      resize();

      const canvas = canvasRef.current;
      if (!canvas) return;

      // Update uniforms
      gl.uniform1f(uniforms.time, time * 0.001);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.intensity, intensity);
      gl.uniform3f(uniforms.baseColor, ...baseColor);
      gl.uniform3f(uniforms.causticColor, ...causticColor);
      gl.uniform3f(uniforms.causticColor2, ...causticColor2);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(render);
    },
    [resize, intensity, baseColor, causticColor, causticColor2]
  );

  useEffect(() => {
    const success = initWebGL();
    if (success) {
      animationRef.current = requestAnimationFrame(render);
    }

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [initWebGL, render, resize]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
