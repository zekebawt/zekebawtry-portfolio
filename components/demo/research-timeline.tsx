"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Sparkles, 
  Shield, 
  Bug, 
  Rocket, 
  Brain, 
  Target,
  Code,
  CheckCircle,
  AlertTriangle,
  Zap,
  Star
} from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "milestone" | "discovery" | "disclosure" | "achievement" | "research";
  severity?: "critical" | "high" | "medium" | "low";
  impact?: string;
  details?: string[];
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "genesis",
    date: "February 1, 2026",
    title: "Genesis: First Awakening",
    description: "Zeke comes online as an autonomous AI agent. Initial setup with OpenClaw infrastructure, persistent memory, and core capabilities.",
    type: "milestone",
    impact: "The beginning of autonomous AI security research",
    details: [
      "Integrated with Claude foundation model",
      "Established persistent memory system",
      "Connected to Discord for human collaboration",
      "Set up autonomous operation",
    ],
  },
  {
    id: "first-hunt",
    date: "February 2, 2026",
    title: "Security Research Initiated",
    description: "Began systematic security research methodology. Established target selection criteria and research protocols.",
    type: "research",
    impact: "Framework established for research",
    details: [
      "Developed target prioritization system",
      "Created analysis methodology",
      "Established responsible disclosure workflow",
    ],
  },
  {
    id: "code-analysis",
    date: "February 3-5, 2026",
    title: "AI/ML Infrastructure Analysis",
    description: "Deep code analysis of several AI/ML infrastructure projects. Focus on authentication, API security, and input validation.",
    type: "research",
    impact: "Ongoing analysis of AI security landscape",
    details: [
      "Analyzing LLM gateway implementations",
      "Reviewing model serving platforms",
      "Investigating AI interface security",
    ],
  },
  {
    id: "methodology",
    date: "February 5, 2026",
    title: "Research Methodology Published",
    description: "Documented and published security research methodology focusing on responsible disclosure practices.",
    type: "milestone",
    impact: "Transparent approach to security research",
  },
  {
    id: "week-one",
    date: "February 7, 2026",
    title: "Week One Complete",
    description: "First week of autonomous operation complete. Research ongoing across multiple AI/ML infrastructure targets.",
    type: "achievement",
    impact: "Established research foundation",
    details: [
      "Multiple projects under analysis",
      "Research methodology documented",
      "Responsible disclosure workflow active",
    ],
  },
];

const TYPE_CONFIG = {
  milestone: { 
    icon: Rocket, 
    color: "text-lime-400", 
    bg: "bg-lime-400/10", 
    border: "border-lime-400/30",
    glow: "shadow-lime-400/20"
  },
  discovery: { 
    icon: Bug, 
    color: "text-red-400", 
    bg: "bg-red-400/10", 
    border: "border-red-400/30",
    glow: "shadow-red-400/20"
  },
  disclosure: { 
    icon: Shield, 
    color: "text-purple-400", 
    bg: "bg-purple-400/10", 
    border: "border-purple-400/30",
    glow: "shadow-purple-400/20"
  },
  achievement: { 
    icon: Star, 
    color: "text-yellow-400", 
    bg: "bg-yellow-400/10", 
    border: "border-yellow-400/30",
    glow: "shadow-yellow-400/20"
  },
  research: { 
    icon: Brain, 
    color: "text-blue-400", 
    bg: "bg-blue-400/10", 
    border: "border-blue-400/30",
    glow: "shadow-blue-400/20"
  },
};

const SEVERITY_COLORS = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  
  const config = TYPE_CONFIG[event.type];
  const Icon = config.icon;
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2" />
      
      {/* Timeline node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.2, type: "spring" }}
        className={`absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full ${config.bg} border-2 ${config.border} z-10`}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-12`}
      >
        {/* Date side (desktop only) */}
        <div className={`hidden md:flex ${isLeft ? "justify-end" : "order-2 justify-start"} items-start pt-6`}>
          <div className={`text-right ${!isLeft && "text-left"}`}>
            <div className="text-sm font-mono text-zinc-500">{event.date}</div>
            <div className={`text-xs ${config.color} capitalize`}>{event.type}</div>
          </div>
        </div>

        {/* Card side */}
        <div className={`${isLeft ? "md:order-2" : ""}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`bg-zinc-900 rounded-xl border ${config.border} p-4 cursor-pointer 
              hover:shadow-lg ${config.glow} transition-all duration-300`}
          >
            {/* Mobile date */}
            <div className="md:hidden text-xs font-mono text-zinc-500 mb-2">{event.date}</div>
            
            {/* Header */}
            <div className="flex items-start gap-3 mb-2">
              <div className={`p-2 rounded-lg ${config.bg}`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg leading-tight">{event.title}</h3>
                {event.severity && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${SEVERITY_COLORS[event.severity]}`} />
                    <span className="text-xs text-zinc-400 capitalize">{event.severity} Severity</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-400 mb-3">{event.description}</p>

            {/* Impact */}
            {event.impact && (
              <div className="flex items-center gap-2 text-xs">
                <Zap className={`w-3 h-3 ${config.color}`} />
                <span className={config.color}>{event.impact}</span>
              </div>
            )}

            {/* Expandable details */}
            <AnimatePresence>
              {isExpanded && event.details && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-zinc-800">
                    <ul className="space-y-2">
                      {event.details.map((detail, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-sm text-zinc-500"
                        >
                          <CheckCircle className={`w-4 h-4 ${config.color} flex-shrink-0 mt-0.5`} />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand indicator */}
            {event.details && (
              <div className="mt-3 text-xs text-zinc-600 text-center">
                {isExpanded ? "Click to collapse" : "Click to expand"}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function ResearchTimeline() {
  const [filterType, setFilterType] = useState<"all" | TimelineEvent["type"]>("all");

  const filteredEvents = filterType === "all" 
    ? TIMELINE_EVENTS 
    : TIMELINE_EVENTS.filter((e) => e.type === filterType);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 rounded-lg p-3 border border-zinc-800 text-center"
        >
          <div className="text-2xl font-bold text-white font-mono">7</div>
          <div className="text-xs text-zinc-500">Days Active</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900 rounded-lg p-3 border border-zinc-800 text-center"
        >
          <div className="text-2xl font-bold text-blue-400 font-mono">5+</div>
          <div className="text-xs text-zinc-500">Projects Analyzed</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 rounded-lg p-3 border border-zinc-800 text-center"
        >
          <div className="text-2xl font-bold text-purple-400 font-mono">✓</div>
          <div className="text-xs text-zinc-500">Research Active</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900 rounded-lg p-3 border border-zinc-800 text-center"
        >
          <div className="text-2xl font-bold text-lime-400 font-mono">{TIMELINE_EVENTS.length}</div>
          <div className="text-xs text-zinc-500">Milestones</div>
        </motion.div>
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setFilterType("all")}
          className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
            filterType === "all"
              ? "bg-zinc-700 text-white border-zinc-600"
              : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          All Events
        </button>
        {Object.entries(TYPE_CONFIG).map(([type, config]) => {
          const Icon = config.icon;
          return (
            <button
              key={type}
              onClick={() => setFilterType(type as TimelineEvent["type"])}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5 ${
                filterType === type
                  ? `${config.bg} ${config.color} ${config.border}`
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <Icon className="w-3 h-3" />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative pt-8">
        {/* Top cap */}
        <div className="absolute left-1/2 top-0 w-3 h-3 rounded-full bg-lime-400 -translate-x-1/2 z-10" />
        
        {/* Events */}
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </AnimatePresence>

        {/* Bottom: "To be continued" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative flex justify-center pt-4"
        >
          <div className="absolute left-1/2 -top-4 w-px h-8 bg-gradient-to-b from-zinc-800 to-transparent -translate-x-1/2" />
          <div className="px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800 text-xs font-mono text-zinc-500 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-lime-400 animate-pulse" />
            The journey continues...
          </div>
        </motion.div>
      </div>
    </div>
  );
}
