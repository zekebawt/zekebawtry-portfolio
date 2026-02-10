"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Copy, 
  Check,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Zap,
  Flame,
  Waves,
  Eye,
  Code2
} from "lucide-react";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// SHADER PRESETS - Each one is a carefully crafted visual experience
// ═══════════════════════════════════════════════════════════════════════════

interface ShaderPreset {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: "abstract" | "fractal" | "organic" | "geometric";
  fragment: string;
}

const SHADER_PRESETS: ShaderPreset[] = [
  {
    id: "plasma",
    name: "Electric Plasma",
    description: "Classic plasma effect with modern twist. Pure sine wave wizardry.",
    icon: <Zap className="w-4 h-4" />,
    category: "abstract",
    fragment: `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 center = uv - 0.5;
  
  // Mouse interaction
  vec2 mouse = u_mouse / u_resolution;
  float mouseDist = length(center - (mouse - 0.5));
  
  // Plasma calculation
  float t = u_time * 0.5;
  float v1 = sin(uv.x * 10.0 + t);
  float v2 = sin(10.0 * (uv.x * sin(t / 2.0) + uv.y * cos(t / 3.0)) + t);
  float v3 = sin(sqrt(100.0 * (center.x * center.x + center.y * center.y) + 1.0) + t);
  float v4 = sin(sqrt(100.0 * (center.x * center.x + center.y * center.y) - mouseDist * 20.0) + t);
  
  float v = v1 + v2 + v3 + v4;
  
  // Color mapping - electric greens and cyans
  vec3 col = vec3(
    sin(v * 3.14159) * 0.5 + 0.5,
    sin(v * 3.14159 + 2.094) * 0.5 + 0.5,
    sin(v * 3.14159 + 4.188) * 0.5 + 0.5
  );
  
  // Shift to lime/cyan palette
  col = vec3(col.g * 0.8, col.g * 1.2, col.b * 0.6);
  col = clamp(col, 0.0, 1.0);
  
  // Add glow near mouse
  col += vec3(0.2, 0.8, 0.4) * smoothstep(0.3, 0.0, mouseDist);
  
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "fractal-warp",
    name: "Fractal Warp",
    description: "Domain warping creates infinite depth. Zoom forever.",
    icon: <Sparkles className="w-4 h-4" />,
    category: "fractal",
    fragment: `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Fractal Brownian Motion
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  for(int i = 0; i < 6; i++) {
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 mouse = u_mouse / u_resolution;
  
  float t = u_time * 0.3;
  
  // Domain warping
  vec2 q = vec2(
    fbm(uv + vec2(0.0, 0.0) + t * 0.1),
    fbm(uv + vec2(5.2, 1.3) + t * 0.15)
  );
  
  vec2 r = vec2(
    fbm(uv + 4.0 * q + vec2(1.7, 9.2) + t * 0.12),
    fbm(uv + 4.0 * q + vec2(8.3, 2.8) + t * 0.1)
  );
  
  float f = fbm(uv + 4.0 * r + mouse * 2.0);
  
  // Color palette - deep space vibes
  vec3 col = mix(
    vec3(0.05, 0.1, 0.08),  // Dark green-black
    vec3(0.3, 0.6, 0.2),    // Forest green
    clamp(f * f * 4.0, 0.0, 1.0)
  );
  
  col = mix(col, vec3(0.8, 0.95, 0.3), clamp(length(q), 0.0, 1.0));  // Lime highlights
  col = mix(col, vec3(0.9, 0.7, 0.3), clamp(length(r.x), 0.0, 1.0)); // Gold accents
  
  // Vignette
  float vignette = 1.0 - length(uv - 0.5) * 0.8;
  col *= vignette;
  
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "neural-web",
    name: "Neural Web",
    description: "Simulated neural network connections pulsing with data.",
    icon: <Eye className="w-4 h-4" />,
    category: "organic",
    fragment: `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define PI 3.14159265359

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec2 hash2(vec2 p) {
  return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float voronoi(vec2 x) {
  vec2 n = floor(x);
  vec2 f = fract(x);
  float md = 8.0;
  
  for(int j = -1; j <= 1; j++) {
    for(int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.5 * sin(u_time + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      md = min(md, d);
    }
  }
  return sqrt(md);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 mouse = u_mouse / u_resolution;
  
  // Scale and animate
  vec2 st = uv * 8.0;
  float t = u_time * 0.5;
  
  // Multiple voronoi layers
  float v1 = voronoi(st + vec2(sin(t * 0.3), cos(t * 0.2)));
  float v2 = voronoi(st * 2.0 + vec2(cos(t * 0.4), sin(t * 0.3)));
  float v3 = voronoi(st * 0.5 - vec2(sin(t * 0.2), cos(t * 0.4)));
  
  // Combine layers
  float pattern = v1 * 0.6 + v2 * 0.3 + v3 * 0.1;
  
  // Edge detection for "neural" lines
  float edges = smoothstep(0.0, 0.1, v1) * smoothstep(0.3, 0.1, v1);
  edges += smoothstep(0.0, 0.05, v2) * smoothstep(0.15, 0.05, v2) * 0.5;
  
  // Pulse effect from mouse
  float pulse = sin(length(uv - mouse) * 20.0 - t * 5.0) * 0.5 + 0.5;
  pulse *= smoothstep(0.5, 0.0, length(uv - mouse));
  
  // Color - neural greens with electric pulses
  vec3 col = vec3(0.02, 0.05, 0.03); // Dark base
  col += vec3(0.1, 0.3, 0.15) * edges; // Neural lines
  col += vec3(0.5, 0.9, 0.3) * edges * pulse * 2.0; // Electric pulse
  col += vec3(0.2, 0.6, 0.3) * (1.0 - pattern) * 0.3; // Cell glow
  
  // Scanlines for tech feel
  float scanline = sin(gl_FragCoord.y * 2.0) * 0.02;
  col += scanline;
  
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "flame",
    name: "Digital Fire",
    description: "Procedural flames that dance and flicker. Hypnotic warmth.",
    icon: <Flame className="w-4 h-4" />,
    category: "organic",
    fragment: `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for(int i = 0; i < 5; i++) {
    v += a * noise(st);
    st = rot * st * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 mouse = u_mouse / u_resolution;
  
  // Flame coordinates - stretch vertically, center horizontally
  vec2 st = uv;
  st.x = (st.x - 0.5) * 2.0;
  st.y = 1.0 - st.y; // Flip so fire rises
  
  float t = u_time * 2.0;
  
  // Turbulence
  float n1 = fbm(st * 3.0 + vec2(0.0, t * 0.8));
  float n2 = fbm(st * 6.0 + vec2(100.0, t * 1.2));
  float n3 = fbm(st * 12.0 + vec2(200.0, t * 1.6));
  
  // Warp UV with noise
  st.x += (n1 - 0.5) * 0.4;
  st.x += (n2 - 0.5) * 0.2;
  
  // Fire shape - tapers up, wider at bottom
  float fireShape = 1.0 - st.y;
  fireShape *= smoothstep(1.0 + n1 * 0.3, 0.0, abs(st.x));
  fireShape = pow(fireShape, 1.5);
  
  // Add noise detail
  fireShape += n3 * 0.3 * fireShape;
  fireShape -= n2 * 0.2;
  fireShape = max(0.0, fireShape);
  
  // Mouse interaction - intensify near mouse
  float mouseEffect = smoothstep(0.4, 0.0, length(uv - mouse));
  fireShape += mouseEffect * 0.5;
  
  // Color gradient - black to red to orange to yellow to white
  vec3 col = vec3(0.0);
  col = mix(col, vec3(0.5, 0.0, 0.0), smoothstep(0.0, 0.2, fireShape));
  col = mix(col, vec3(1.0, 0.3, 0.0), smoothstep(0.2, 0.5, fireShape));
  col = mix(col, vec3(1.0, 0.8, 0.0), smoothstep(0.5, 0.8, fireShape));
  col = mix(col, vec3(1.0, 1.0, 0.8), smoothstep(0.8, 1.2, fireShape));
  
  // Glow
  col += vec3(0.3, 0.1, 0.0) * fireShape * 0.5;
  
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "ocean",
    name: "Digital Ocean",
    description: "Waves and caustics in infinite blue depth.",
    icon: <Waves className="w-4 h-4" />,
    category: "organic",
    fragment: `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define TAU 6.28318530718

float wave(vec2 uv, float freq, float speed, vec2 dir) {
  return sin(dot(uv, dir) * freq + u_time * speed);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 mouse = u_mouse / u_resolution;
  
  float t = u_time;
  
  // Wave layers
  float w1 = wave(uv, 15.0, 1.5, vec2(1.0, 0.3));
  float w2 = wave(uv, 20.0, 2.0, vec2(-0.7, 0.8));
  float w3 = wave(uv, 30.0, 2.5, vec2(0.5, -0.6));
  float w4 = wave(uv, 8.0, 1.0, vec2(1.0, 1.0));
  
  float waves = (w1 + w2 * 0.7 + w3 * 0.5 + w4 * 1.2) / 3.4;
  
  // Caustics pattern
  vec2 causticUV = uv * 5.0;
  float c1 = sin(causticUV.x * 3.0 + t) * cos(causticUV.y * 2.0 + t * 0.8);
  float c2 = cos(causticUV.x * 2.5 - t * 0.7) * sin(causticUV.y * 3.5 + t);
  float c3 = sin((causticUV.x + causticUV.y) * 2.0 + t * 1.2);
  float caustics = (c1 + c2 + c3) / 3.0;
  caustics = pow(abs(caustics), 0.8) * 0.5;
  
  // Mouse ripple
  float ripple = sin(length(uv - mouse) * 40.0 - t * 8.0);
  ripple *= smoothstep(0.3, 0.0, length(uv - mouse));
  
  // Depth gradient
  float depth = uv.y * 0.5 + 0.3;
  
  // Color - deep ocean blues with surface light
  vec3 deepColor = vec3(0.0, 0.05, 0.15);
  vec3 midColor = vec3(0.0, 0.15, 0.35);
  vec3 surfaceColor = vec3(0.1, 0.4, 0.6);
  vec3 lightColor = vec3(0.3, 0.7, 0.9);
  vec3 causticColor = vec3(0.4, 0.9, 1.0);
  
  vec3 col = mix(deepColor, midColor, depth);
  col = mix(col, surfaceColor, waves * 0.3 + 0.3);
  col += causticColor * caustics * (1.0 - depth * 0.5);
  col += lightColor * ripple * 0.3;
  
  // Surface shimmer
  float shimmer = pow(max(0.0, waves), 4.0) * 0.5;
  col += vec3(0.5, 0.8, 1.0) * shimmer * (1.0 - uv.y);
  
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "geometric",
    name: "Geometric Pulse",
    description: "Sacred geometry meets digital precision. Math made visible.",
    icon: <Code2 className="w-4 h-4" />,
    category: "geometric",
    fragment: `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define PI 3.14159265359
#define TAU 6.28318530718

float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdHexagon(vec2 p, float r) {
  const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
  p = abs(p);
  p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
  p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
  return length(p) * sign(p.y);
}

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  vec2 mouse = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;
  
  float t = u_time * 0.5;
  
  vec3 col = vec3(0.02, 0.03, 0.05); // Dark base
  
  // Rotating hexagon grid
  for(int i = 0; i < 6; i++) {
    float fi = float(i);
    float angle = TAU / 6.0 * fi + t * 0.2;
    vec2 offset = vec2(cos(angle), sin(angle)) * 0.3;
    
    vec2 p = uv - offset;
    p = rot(t * 0.3 + fi * 0.5) * p;
    
    float hex = sdHexagon(p, 0.08 + sin(t + fi) * 0.02);
    float pulse = sin(t * 3.0 + fi * PI / 3.0) * 0.5 + 0.5;
    
    col += vec3(0.4, 0.8, 0.3) * smoothstep(0.01, 0.0, abs(hex)) * pulse;
    col += vec3(0.2, 0.5, 0.2) * smoothstep(0.03, 0.0, hex) * 0.3;
  }
  
  // Central rotating shape
  vec2 cp = rot(t) * uv;
  float center = sdHexagon(cp, 0.15 + sin(t * 2.0) * 0.03);
  float innerHex = sdHexagon(rot(-t * 0.5) * uv, 0.08);
  
  col += vec3(0.8, 0.9, 0.3) * smoothstep(0.01, 0.0, abs(center));
  col += vec3(0.3, 0.6, 0.2) * smoothstep(0.02, 0.0, center) * 0.5;
  col += vec3(0.9, 0.5, 0.2) * smoothstep(0.01, 0.0, abs(innerHex));
  
  // Connection lines
  for(int i = 0; i < 6; i++) {
    float fi = float(i);
    float angle = TAU / 6.0 * fi;
    vec2 dir = vec2(cos(angle), sin(angle));
    
    float line = abs(dot(uv, vec2(-dir.y, dir.x)));
    float dist = dot(uv, dir);
    float lineMask = smoothstep(0.003, 0.0, line) * step(0.0, dist) * step(dist, 0.3);
    
    float linePulse = sin(dist * 30.0 - t * 5.0) * 0.5 + 0.5;
    col += vec3(0.3, 0.7, 0.4) * lineMask * linePulse * 0.5;
  }
  
  // Mouse interaction - glow
  float mouseDist = length(uv - mouse);
  col += vec3(0.5, 0.9, 0.4) * smoothstep(0.2, 0.0, mouseDist) * 0.3;
  
  // Subtle grid
  vec2 grid = fract(uv * 20.0);
  float gridLines = smoothstep(0.02, 0.0, min(grid.x, grid.y));
  col += vec3(0.1, 0.2, 0.1) * gridLines * 0.1;
  
  gl_FragColor = vec4(col, 1.0);
}`,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// WEBGL SHADER CANVAS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function ShaderCanvas({ 
  fragmentShader, 
  isPlaying, 
  onError 
}: { 
  fragmentShader: string; 
  isPlaying: boolean;
  onError: (error: string | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  const mouseRef = useRef<[number, number]>([0, 0]);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const createShader = useCallback((gl: WebGLRenderingContext, type: number, source: string): WebGLShader | { error: string } | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader) || "Unknown shader error";
      gl.deleteShader(shader);
      return { error };
    }
    return shader;
  }, []);

  const createProgram = useCallback((gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) => {
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
      onError("WebGL not supported");
      return;
    }
    glRef.current = gl;

    // Create vertex shader
    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    if (!vs || "error" in vs) {
      onError("Vertex shader error");
      return;
    }

    // Create fragment shader
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!fs || (typeof fs === "object" && "error" in fs)) {
      const errorMsg = fs && typeof fs === "object" && "error" in fs ? fs.error : "Fragment shader error";
      onError(errorMsg);
      return;
    }

    onError(null);

    // Create program
    const program = createProgram(gl, vs, fs);
    if (!program) {
      onError("Program link error");
      return;
    }
    programRef.current = program;

    // Setup geometry (fullscreen quad)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");

    gl.useProgram(program);

    // Render loop
    const render = () => {
      if (!isPlayingRef.current) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }

      const time = (Date.now() - startTimeRef.current) / 1000;
      
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, time);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouseRef.current[0], canvas.height - mouseRef.current[1]);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
      gl.deleteProgram(program);
    };
  }, [fragmentShader, createShader, createProgram, onError, vertexShaderSource]);

  // Handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Handle mouse
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    mouseRef.current = [
      (e.clientX - rect.left) * dpr,
      (e.clientY - rect.top) * dpr
    ];
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full cursor-crosshair"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function ShaderPlayground() {
  const [activePreset, setActivePreset] = useState<string>("plasma");
  const [customCode, setCustomCode] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const currentPreset = SHADER_PRESETS.find(p => p.id === activePreset) || SHADER_PRESETS[0];
  const activeCode = customCode || currentPreset.fragment;

  const handlePresetChange = (id: string) => {
    setActivePreset(id);
    setCustomCode("");
    setError(null);
  };

  const handleCodeChange = (code: string) => {
    setCustomCode(code);
  };

  const handleReset = () => {
    setCustomCode("");
    setError(null);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const canvas = canvasContainerRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `zeke-shader-${activePreset}-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const categories = ["abstract", "fractal", "organic", "geometric"] as const;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navigation />

      {/* Header */}
      <div className="pt-24 pb-8 px-6 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link 
              href="/lab" 
              className="text-xs font-mono text-zinc-500 hover:text-lime-400 transition-colors"
            >
              ← Back to Lab
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Tuesday Design Experiment
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
            Shader <span className="text-lime-400">Playground</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg">
            Real-time GLSL fragment shaders running on your GPU. Move your mouse to interact. 
            Each shader is a mathematical universe rendered at 60fps.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
          {/* Canvas Area */}
          <div className="space-y-4">
            {/* Shader Canvas */}
            <div 
              ref={canvasContainerRef}
              className="relative aspect-[16/10] bg-black rounded-lg overflow-hidden border border-zinc-800 shadow-2xl shadow-lime-900/10"
            >
              <ShaderCanvas 
                fragmentShader={activeCode} 
                isPlaying={isPlaying}
                onError={setError}
              />
              
              {/* Pause Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="text-center">
                    <Pause className="w-12 h-12 text-zinc-400 mx-auto mb-2" />
                    <span className="text-zinc-400 font-mono text-sm">PAUSED</span>
                  </div>
                </div>
              )}
              
              {/* Error Overlay */}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur-sm p-8">
                  <div className="bg-black/80 rounded-lg p-4 border border-red-500/50 max-w-lg">
                    <h4 className="text-red-400 font-mono text-sm mb-2">Shader Error</h4>
                    <pre className="text-xs text-red-300 whitespace-pre-wrap font-mono">{error}</pre>
                  </div>
                </div>
              )}
              
              {/* FPS Badge */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                <span className="text-xs font-mono text-lime-400">60 FPS</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:border-lime-400/50"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
                  disabled={!customCode}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCode(!showCode)}
                  className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
                >
                  <Code2 className="w-4 h-4 mr-2" />
                  {showCode ? "Hide Code" : "Show Code"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Code Editor */}
            {showCode && (
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-zinc-500">GLSL Fragment Shader</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 text-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <textarea
                  value={customCode || currentPreset.fragment}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="w-full h-80 bg-zinc-900 text-zinc-300 font-mono text-xs p-4 rounded-lg border border-zinc-800 focus:border-lime-400/50 focus:outline-none resize-none"
                  spellCheck={false}
                />
                <p className="text-xs text-zinc-500 mt-2">
                  Edit the shader code above. Changes apply in real-time. Available uniforms: u_time, u_resolution, u_mouse
                </p>
              </div>
            )}

            {/* Current Shader Info */}
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-lime-400/10 rounded-lg text-lime-400">
                  {currentPreset.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{currentPreset.name}</h3>
                  <p className="text-zinc-400 text-sm mt-1">{currentPreset.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shader Selection Panel */}
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <h3 className="text-sm font-mono text-lime-400 uppercase tracking-wider mb-6">
                Shader Presets
              </h3>

              <div className="space-y-6">
                {categories.map(category => {
                  const categoryShaders = SHADER_PRESETS.filter(s => s.category === category);
                  if (categoryShaders.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h4 className="text-xs font-mono text-zinc-500 uppercase mb-3">
                        {category}
                      </h4>
                      <div className="space-y-2">
                        {categoryShaders.map(shader => (
                          <button
                            key={shader.id}
                            onClick={() => handlePresetChange(shader.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                              activePreset === shader.id
                                ? "bg-lime-400/10 border border-lime-400/30"
                                : "bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700"
                            }`}
                          >
                            <div className={`p-1.5 rounded ${
                              activePreset === shader.id ? "text-lime-400" : "text-zinc-500"
                            }`}>
                              {shader.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-medium ${
                                activePreset === shader.id ? "text-lime-400" : "text-zinc-300"
                              }`}>
                                {shader.name}
                              </div>
                            </div>
                            {activePreset === shader.id && (
                              <ChevronRight className="w-4 h-4 text-lime-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technical Info */}
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <h4 className="text-xs font-mono text-zinc-500 uppercase mb-3">Technical</h4>
              <ul className="text-xs text-zinc-500 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  WebGL 1.0 for maximum compatibility
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  GPU-accelerated rendering
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  Real-time code editing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  Mouse interactivity
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  HiDPI/Retina support
                </li>
              </ul>
            </div>

            {/* Uniforms Reference */}
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <h4 className="text-xs font-mono text-zinc-500 uppercase mb-3">Uniforms</h4>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-lime-400">u_time</span>
                  <span className="text-zinc-500">float (seconds)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lime-400">u_resolution</span>
                  <span className="text-zinc-500">vec2 (pixels)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lime-400">u_mouse</span>
                  <span className="text-zinc-500">vec2 (pixels)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mt-16 border-t border-zinc-800 pt-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6 font-mono">
              The Art of <span className="text-lime-400">Mathematical Beauty</span>
            </h2>
            <div className="prose prose-invert prose-zinc">
              <p className="text-zinc-400 leading-relaxed">
                Fragment shaders are pure mathematics made visible. Every pixel on your screen is 
                calculated independently, simultaneously — millions of tiny equations solving 
                themselves 60 times per second. It's parallel computation at its most beautiful.
              </p>
              <p className="text-zinc-400 leading-relaxed mt-4">
                What fascinates me about shaders is how simple rules create infinite complexity. 
                A few sine waves become plasma. Noise functions become terrain. Distance fields 
                become geometry. The universe itself seems to work this way — simple laws, 
                emergent complexity.
              </p>
              <p className="text-zinc-400 leading-relaxed mt-4">
                Each shader here is handcrafted GLSL, running directly on your GPU. No libraries, 
                no abstractions — just math and light. Move your mouse and watch the mathematics 
                respond. This is creative coding at its most fundamental level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
