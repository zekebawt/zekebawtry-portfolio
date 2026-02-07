"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { TerminalInterface } from "@/components/demo/terminal-interface";
import { SkillTree } from "@/components/demo/skill-tree";
import { BountyTracker } from "@/components/demo/bounty-tracker";
import { ResearchTimeline } from "@/components/demo/research-timeline";
import { CodePlayground } from "@/components/demo/code-playground";
import { 
  Terminal, 
  GitBranch, 
  Target, 
  Clock, 
  Code2,
  Sparkles,
  ChevronRight
} from "lucide-react";

type DemoSection = "terminal" | "skills" | "bounties" | "timeline" | "playground";

interface SectionConfig {
  id: DemoSection;
  name: string;
  description: string;
  icon: React.ReactNode;
  shortDesc: string;
}

const sections: SectionConfig[] = [
  {
    id: "terminal",
    name: "Terminal Interface",
    shortDesc: "Command Line",
    description: "Interact with Zeke through a terminal-style interface. Type commands to explore capabilities.",
    icon: <Terminal className="w-5 h-5" />,
  },
  {
    id: "skills",
    name: "Skill Tree",
    shortDesc: "Capabilities",
    description: "Animated visualization of interconnected security research and AI capabilities.",
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    id: "bounties",
    name: "Bounty Tracker",
    shortDesc: "Live Hunts",
    description: "Real-time visualization of active bug bounty campaigns and security research.",
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: "timeline",
    name: "Research Timeline",
    shortDesc: "Progress",
    description: "Interactive journey through research progress and milestones.",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "playground",
    name: "Code Playground",
    shortDesc: "Live Code",
    description: "Interactive code examples demonstrating security patterns and vulnerability analysis.",
    icon: <Code2 className="w-5 h-5" />,
  },
];

export function DemoClient() {
  const [activeSection, setActiveSection] = useState<DemoSection>("terminal");
  const currentSection = sections.find((s) => s.id === activeSection)!;

  const renderSection = () => {
    switch (activeSection) {
      case "terminal":
        return <TerminalInterface />;
      case "skills":
        return <SkillTree />;
      case "bounties":
        return <BountyTracker />;
      case "timeline":
        return <ResearchTimeline />;
      case "playground":
        return <CodePlayground />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navigation />

      {/* Hero Header */}
      <div className="pt-24 pb-6 px-6 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-lime-400" />
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                Interactive Showcase
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-mono">
              Experience <span className="text-lime-400">Zeke</span>
            </h1>
            <p className="text-zinc-400 max-w-2xl text-lg">
              Hands-on demos of autonomous AI security research. Explore capabilities 
              through interactive interfaces designed for discovery.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section Tabs - Horizontal Scroll on Mobile */}
      <div className="border-b border-zinc-800/50 sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto scrollbar-hide py-2 gap-2 -mx-2 px-2">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                  activeSection === section.id
                    ? "bg-lime-400/10 text-lime-400 border border-lime-400/30"
                    : "bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                {section.icon}
                <span className="hidden sm:inline">{section.name}</span>
                <span className="sm:hidden">{section.shortDesc}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Description */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-zinc-500"
          >
            <ChevronRight className="w-4 h-4 text-lime-400" />
            <span className="text-sm">{currentSection.description}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[600px]"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Hint */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-800/50">
          <p className="text-xs text-zinc-600 text-center font-mono">
            💡 Tip: Each demo is fully interactive. Try typing commands, clicking nodes, or exploring the visualizations.
          </p>
        </div>
      </div>
    </div>
  );
}
