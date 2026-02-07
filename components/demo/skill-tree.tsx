"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillNode {
  id: string;
  name: string;
  category: "core" | "security" | "ai" | "blockchain" | "tools";
  level: number;
  x: number;
  y: number;
  connections: string[];
  description: string;
  progress: number;
}

const SKILL_NODES: SkillNode[] = [
  // Core Skills (center)
  {
    id: "core",
    name: "Autonomous Agent",
    category: "core",
    level: 5,
    x: 400,
    y: 250,
    connections: ["code-review", "api-security", "llm-sec", "smart-contracts"],
    description: "Core autonomous operation capabilities. 24/7 security research with persistent memory.",
    progress: 95,
  },
  
  // Security Branch (top-left)
  {
    id: "code-review",
    name: "Code Review",
    category: "security",
    level: 4,
    x: 180,
    y: 120,
    connections: ["auth-bypass", "input-validation"],
    description: "Deep static analysis of source code. Pattern matching against known vulnerability classes.",
    progress: 90,
  },
  {
    id: "auth-bypass",
    name: "Auth Bypass",
    category: "security",
    level: 3,
    x: 80,
    y: 50,
    connections: [],
    description: "Authentication and authorization bypass techniques. Session handling, JWT vulnerabilities.",
    progress: 80,
  },
  {
    id: "input-validation",
    name: "Input Validation",
    category: "security",
    level: 3,
    x: 180,
    y: 20,
    connections: [],
    description: "XSS, SQLi, command injection, path traversal. All the classics.",
    progress: 85,
  },
  
  // API Security Branch (top-right)
  {
    id: "api-security",
    name: "API Security",
    category: "security",
    level: 4,
    x: 620,
    y: 120,
    connections: ["rate-limiting", "bola"],
    description: "REST, GraphQL, gRPC security analysis. OWASP API Top 10 expertise.",
    progress: 85,
  },
  {
    id: "rate-limiting",
    name: "Rate Limiting",
    category: "security",
    level: 2,
    x: 720,
    y: 50,
    connections: [],
    description: "Bypass techniques for rate limiting and resource exhaustion attacks.",
    progress: 70,
  },
  {
    id: "bola",
    name: "BOLA/IDOR",
    category: "security",
    level: 3,
    x: 620,
    y: 20,
    connections: [],
    description: "Broken Object Level Authorization. Finding access control failures.",
    progress: 88,
  },
  
  // AI/LLM Branch (bottom-left)
  {
    id: "llm-sec",
    name: "LLM Security",
    category: "ai",
    level: 4,
    x: 180,
    y: 380,
    connections: ["prompt-injection", "model-extraction"],
    description: "Security analysis of large language model infrastructure and serving platforms.",
    progress: 85,
  },
  {
    id: "prompt-injection",
    name: "Prompt Injection",
    category: "ai",
    level: 3,
    x: 80,
    y: 450,
    connections: [],
    description: "Direct and indirect prompt injection. Jailbreaking and guardrail bypass.",
    progress: 75,
  },
  {
    id: "model-extraction",
    name: "Model Security",
    category: "ai",
    level: 2,
    x: 180,
    y: 480,
    connections: [],
    description: "Model extraction, data poisoning, adversarial inputs.",
    progress: 60,
  },
  
  // Blockchain Branch (bottom-right)
  {
    id: "smart-contracts",
    name: "Smart Contracts",
    category: "blockchain",
    level: 3,
    x: 620,
    y: 380,
    connections: ["reentrancy", "cross-chain"],
    description: "Solidity security analysis. Common vulnerability patterns in DeFi.",
    progress: 65,
  },
  {
    id: "reentrancy",
    name: "Reentrancy",
    category: "blockchain",
    level: 2,
    x: 720,
    y: 450,
    connections: [],
    description: "Classic reentrancy patterns and modern variations like read-only reentrancy.",
    progress: 70,
  },
  {
    id: "cross-chain",
    name: "Cross-Chain",
    category: "blockchain",
    level: 2,
    x: 620,
    y: 480,
    connections: [],
    description: "Bridge security, message verification, consensus vulnerabilities.",
    progress: 55,
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; border: string; glow: string }> = {
  core: { bg: "bg-lime-400", border: "border-lime-400", glow: "shadow-lime-400/50" },
  security: { bg: "bg-red-400", border: "border-red-400", glow: "shadow-red-400/50" },
  ai: { bg: "bg-purple-400", border: "border-purple-400", glow: "shadow-purple-400/50" },
  blockchain: { bg: "bg-orange-400", border: "border-orange-400", glow: "shadow-orange-400/50" },
  tools: { bg: "bg-blue-400", border: "border-blue-400", glow: "shadow-blue-400/50" },
};

export function SkillTree() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [animatedConnections, setAnimatedConnections] = useState<Set<string>>(new Set());
  const svgRef = useRef<SVGSVGElement>(null);

  // Animate connections periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const allConnections: string[] = [];
      SKILL_NODES.forEach((node) => {
        node.connections.forEach((conn) => {
          allConnections.push(`${node.id}-${conn}`);
        });
      });
      
      // Randomly animate a few connections
      const animated = new Set<string>();
      for (let i = 0; i < 3; i++) {
        const randomConn = allConnections[Math.floor(Math.random() * allConnections.length)];
        if (randomConn) animated.add(randomConn);
      }
      setAnimatedConnections(animated);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getNodeById = useCallback((id: string) => {
    return SKILL_NODES.find((n) => n.id === id);
  }, []);

  const isConnectedToHovered = useCallback((nodeId: string) => {
    if (!hoveredNode) return false;
    const hovered = getNodeById(hoveredNode);
    if (!hovered) return false;
    return hovered.connections.includes(nodeId) || 
           SKILL_NODES.some(n => n.id === nodeId && n.connections.includes(hoveredNode));
  }, [hoveredNode, getNodeById]);

  return (
    <div className="relative">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(CATEGORY_COLORS).map(([category, colors]) => (
          <div key={category} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
            <span className="text-xs font-mono text-zinc-400 capitalize">{category}</span>
          </div>
        ))}
      </div>

      {/* Skill Tree Canvas */}
      <div className="relative bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden">
        <svg
          ref={svgRef}
          viewBox="0 0 800 520"
          className="w-full h-auto"
          style={{ minHeight: "500px" }}
        >
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="1"
              />
            </pattern>
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Animated dash */}
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(163,230,53,0.2)" />
              <stop offset="50%" stopColor="rgba(163,230,53,0.8)" />
              <stop offset="100%" stopColor="rgba(163,230,53,0.2)" />
            </linearGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Connections */}
          {SKILL_NODES.map((node) =>
            node.connections.map((connId) => {
              const targetNode = getNodeById(connId);
              if (!targetNode) return null;

              const isActive = animatedConnections.has(`${node.id}-${connId}`);
              const isHighlighted = hoveredNode === node.id || hoveredNode === connId;

              return (
                <g key={`${node.id}-${connId}`}>
                  {/* Base line */}
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isHighlighted ? "rgba(163,230,53,0.6)" : "rgba(255,255,255,0.1)"}
                    strokeWidth={isHighlighted ? 2 : 1}
                    className="transition-all duration-300"
                  />
                  {/* Animated pulse */}
                  {isActive && (
                    <line
                      x1={node.x}
                      y1={node.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke="url(#connectionGradient)"
                      strokeWidth="3"
                      strokeDasharray="10 10"
                      className="animate-dash"
                    />
                  )}
                </g>
              );
            })
          )}

          {/* Nodes */}
          {SKILL_NODES.map((node) => {
            const colors = CATEGORY_COLORS[node.category];
            const isHovered = hoveredNode === node.id;
            const isConnected = isConnectedToHovered(node.id);
            const isSelected = selectedNode?.id === node.id;
            const nodeSize = 10 + node.level * 4;

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Outer glow ring */}
                {(isHovered || isSelected) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={nodeSize + 8}
                    fill="none"
                    stroke={colors.bg.replace("bg-", "").includes("lime") ? "#a3e635" : 
                            colors.bg.includes("red") ? "#f87171" :
                            colors.bg.includes("purple") ? "#c084fc" :
                            colors.bg.includes("orange") ? "#fb923c" : "#60a5fa"}
                    strokeWidth="2"
                    opacity="0.3"
                    className="animate-pulse"
                  />
                )}
                
                {/* Progress ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize + 4}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="3"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize + 4}
                  fill="none"
                  stroke={colors.bg.replace("bg-", "").includes("lime") ? "#a3e635" : 
                          colors.bg.includes("red") ? "#f87171" :
                          colors.bg.includes("purple") ? "#c084fc" :
                          colors.bg.includes("orange") ? "#fb923c" : "#60a5fa"}
                  strokeWidth="3"
                  strokeDasharray={`${(node.progress / 100) * 2 * Math.PI * (nodeSize + 4)} ${2 * Math.PI * (nodeSize + 4)}`}
                  strokeDashoffset="0"
                  transform={`rotate(-90 ${node.x} ${node.y})`}
                  opacity={isHovered || isConnected ? 1 : 0.5}
                  className="transition-opacity duration-300"
                />

                {/* Main node */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize}
                  fill="#18181b"
                  stroke={colors.bg.replace("bg-", "").includes("lime") ? "#a3e635" : 
                          colors.bg.includes("red") ? "#f87171" :
                          colors.bg.includes("purple") ? "#c084fc" :
                          colors.bg.includes("orange") ? "#fb923c" : "#60a5fa"}
                  strokeWidth="2"
                  filter={isHovered ? "url(#glow)" : undefined}
                  className="transition-all duration-300"
                />

                {/* Level indicator */}
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill={colors.bg.replace("bg-", "").includes("lime") ? "#a3e635" : 
                        colors.bg.includes("red") ? "#f87171" :
                        colors.bg.includes("purple") ? "#c084fc" :
                        colors.bg.includes("orange") ? "#fb923c" : "#60a5fa"}
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.level}
                </text>

                {/* Node name (on hover) */}
                {(isHovered || isSelected) && (
                  <text
                    x={node.x}
                    y={node.y + nodeSize + 20}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {node.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Details */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 bg-zinc-900 rounded-lg p-4 border border-zinc-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[selectedNode.category].bg}`}
                  />
                  <h3 className="text-lg font-bold text-white font-mono">
                    {selectedNode.name}
                  </h3>
                  <span className="text-xs px-2 py-0.5 bg-zinc-800 rounded text-zinc-400 font-mono">
                    LVL {selectedNode.level}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm mb-3">{selectedNode.description}</p>
                
                {/* Progress bar */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500 font-mono">Proficiency:</span>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedNode.progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`h-full ${CATEGORY_COLORS[selectedNode.category].bg}`}
                    />
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">{selectedNode.progress}%</span>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedNode(null)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interaction hint */}
      {!selectedNode && (
        <p className="mt-4 text-xs text-zinc-600 text-center font-mono">
          Click on any node to see details • Hover to highlight connections
        </p>
      )}

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
