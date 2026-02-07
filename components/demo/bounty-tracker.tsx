"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Search,
  Shield,
  Zap,
  TrendingUp,
  Eye
} from "lucide-react";

interface BountyTarget {
  id: string;
  name: string;
  platform: string;
  status: "hunting" | "analyzing" | "disclosed" | "complete" | "pending";
  severity: "critical" | "high" | "medium" | "low";
  findings: number;
  potentialBounty: string;
  lastActivity: string;
  progress: number;
  description: string;
  category: string;
}

const BOUNTY_TARGETS: BountyTarget[] = [
  {
    id: "llm-gateways",
    name: "LLM Gateways",
    platform: "Various",
    status: "analyzing",
    severity: "medium",
    findings: 0,
    potentialBounty: "TBD",
    lastActivity: "Ongoing",
    progress: 30,
    description: "Analyzing authentication and API key handling patterns in LLM gateway implementations.",
    category: "AI/ML Infrastructure",
  },
  {
    id: "model-serving",
    name: "Model Serving Platforms",
    platform: "Various",
    status: "analyzing",
    severity: "medium",
    findings: 0,
    potentialBounty: "TBD",
    lastActivity: "Ongoing",
    progress: 25,
    description: "Investigating model loading, sandboxing, and input validation in serving infrastructure.",
    category: "AI/ML Infrastructure",
  },
  {
    id: "ai-interfaces",
    name: "AI Interface Security",
    platform: "Various",
    status: "analyzing",
    severity: "medium",
    findings: 0,
    potentialBounty: "TBD",
    lastActivity: "Ongoing",
    progress: 20,
    description: "Reviewing access control and authentication in AI/LLM interface applications.",
    category: "AI/ML Infrastructure",
  },
  {
    id: "ml-frameworks",
    name: "ML Frameworks",
    platform: "Various",
    status: "pending",
    severity: "medium",
    findings: 0,
    potentialBounty: "TBD",
    lastActivity: "Queued",
    progress: 10,
    description: "Planned analysis of model deserialization and code execution patterns.",
    category: "AI/ML Framework",
  },
];

const STATUS_CONFIG = {
  hunting: { color: "text-yellow-400", bg: "bg-yellow-400/10", icon: Search },
  analyzing: { color: "text-blue-400", bg: "bg-blue-400/10", icon: Eye },
  disclosed: { color: "text-purple-400", bg: "bg-purple-400/10", icon: Shield },
  complete: { color: "text-green-400", bg: "bg-green-400/10", icon: CheckCircle2 },
  pending: { color: "text-zinc-400", bg: "bg-zinc-400/10", icon: Clock },
};

const SEVERITY_CONFIG = {
  critical: { color: "text-red-500", border: "border-red-500/30", dot: "bg-red-500" },
  high: { color: "text-orange-400", border: "border-orange-400/30", dot: "bg-orange-400" },
  medium: { color: "text-yellow-400", border: "border-yellow-400/30", dot: "bg-yellow-400" },
  low: { color: "text-green-400", border: "border-green-400/30", dot: "bg-green-400" },
};

export function BountyTracker() {
  const [selectedTarget, setSelectedTarget] = useState<BountyTarget | null>(null);
  const [filter, setFilter] = useState<"all" | BountyTarget["status"]>("all");
  const [liveActivity, setLiveActivity] = useState<string[]>([]);
  const [stats, setStats] = useState({
    totalFindings: 0,
    activeHunts: 0,
    disclosed: 0,
    potentialValue: 0,
  });

  // Calculate stats
  useEffect(() => {
    const totalFindings = BOUNTY_TARGETS.reduce((acc, t) => acc + t.findings, 0);
    const activeHunts = BOUNTY_TARGETS.filter(t => t.status === "hunting" || t.status === "analyzing").length;
    const disclosed = BOUNTY_TARGETS.filter(t => t.status === "disclosed" || t.status === "complete").length;
    
    setStats({
      totalFindings,
      activeHunts,
      disclosed,
      potentialValue: 75000, // Approximate
    });
  }, []);

  // Simulate live activity feed
  useEffect(() => {
    const activities = [
      "Analyzing authentication flow patterns...",
      "Reviewing API endpoint security...",
      "Checking input validation implementations...",
      "Examining access control configurations...",
      "Reviewing code for common vulnerability patterns...",
      "Analyzing rate limiting implementation...",
      "Checking for secure credential handling...",
      "Reviewing data flow for potential exposures...",
      "Analyzing session management patterns...",
      "Checking authorization boundary enforcement...",
    ];

    const interval = setInterval(() => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      setLiveActivity((prev) => [randomActivity, ...prev].slice(0, 5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredTargets = filter === "all" 
    ? BOUNTY_TARGETS 
    : BOUNTY_TARGETS.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
        >
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-mono">Findings</span>
          </div>
          <div className="text-2xl font-bold text-white font-mono">{stats.totalFindings}</div>
          <div className="text-xs text-lime-400">Verified vulnerabilities</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
        >
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-xs font-mono">Active Hunts</span>
          </div>
          <div className="text-2xl font-bold text-white font-mono">{stats.activeHunts}</div>
          <div className="text-xs text-yellow-400">Currently hunting</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
        >
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-mono">Disclosed</span>
          </div>
          <div className="text-2xl font-bold text-white font-mono">{stats.disclosed}</div>
          <div className="text-xs text-purple-400">Responsibly reported</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
        >
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-mono">Status</span>
          </div>
          <div className="text-2xl font-bold text-white font-mono">Ongoing</div>
          <div className="text-xs text-green-400">Research in progress</div>
        </motion.div>
      </div>

      {/* Live Activity Feed */}
      <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-lime-400 animate-pulse" />
          <span className="text-xs font-mono text-lime-400 uppercase tracking-wider">Live Activity</span>
        </div>
        <div className="space-y-2 h-24 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {liveActivity.map((activity, index) => (
              <motion.div
                key={`${activity}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1 - index * 0.15, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-mono text-zinc-400 flex items-center gap-2"
              >
                <span className="text-lime-400">›</span>
                {activity}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
            filter === "all"
              ? "bg-lime-400/10 text-lime-400 border-lime-400/30"
              : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          All ({BOUNTY_TARGETS.length})
        </button>
        {Object.entries(STATUS_CONFIG).map(([status, config]) => {
          const count = BOUNTY_TARGETS.filter((t) => t.status === status).length;
          if (count === 0) return null;
          return (
            <button
              key={status}
              onClick={() => setFilter(status as BountyTarget["status"])}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5 ${
                filter === status
                  ? `${config.bg} ${config.color} border-current`
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <config.icon className="w-3 h-3" />
              {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
            </button>
          );
        })}
      </div>

      {/* Target Cards */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTargets.map((target, index) => {
            const statusConfig = STATUS_CONFIG[target.status];
            const severityConfig = SEVERITY_CONFIG[target.severity];
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={target.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedTarget(selectedTarget?.id === target.id ? null : target)}
                className={`bg-zinc-900 rounded-lg border ${
                  selectedTarget?.id === target.id ? "border-lime-400/50" : "border-zinc-800"
                } hover:border-zinc-700 transition-all cursor-pointer overflow-hidden`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Status Icon */}
                      <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
                        <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white">{target.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded ${severityConfig.border} border ${severityConfig.color}`}>
                            {target.severity.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <span>{target.category}</span>
                          <span>•</span>
                          <span>{target.platform}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-mono text-lime-400">{target.potentialBounty}</div>
                      <div className="text-xs text-zinc-500">{target.lastActivity}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-500">Analysis Progress</span>
                      <span className="text-zinc-400 font-mono">{target.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${target.progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`h-full ${
                          target.status === "hunting" ? "bg-yellow-400" :
                          target.status === "analyzing" ? "bg-blue-400" :
                          target.status === "disclosed" ? "bg-purple-400" :
                          target.status === "complete" ? "bg-green-400" : "bg-zinc-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Findings Badge */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-sm">
                      <AlertTriangle className={`w-4 h-4 ${target.findings > 0 ? "text-orange-400" : "text-zinc-600"}`} />
                      <span className={target.findings > 0 ? "text-white" : "text-zinc-500"}>
                        {target.findings} {target.findings === 1 ? "finding" : "findings"}
                      </span>
                    </div>
                    
                    <TrendingUp className="w-4 h-4 text-zinc-600" />
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedTarget?.id === target.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-zinc-800"
                    >
                      <div className="p-4 bg-zinc-900/50">
                        <p className="text-sm text-zinc-400 mb-3">{target.description}</p>
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Last activity: {target.lastActivity}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            Platform: {target.platform}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer Note */}
      <div className="bg-zinc-900/30 rounded-lg p-3 border border-zinc-800/50">
        <p className="text-xs text-zinc-600 text-center font-mono">
          🔒 All research follows responsible disclosure practices. Specific vulnerability details are withheld until vendor remediation.
        </p>
      </div>
    </div>
  );
}
